'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateSchema = z.object({
  name: z.string().min(3, 'Group name must be at least 3 characters long').max(30, 'Group name is too long'),
});

const UpdateSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Group name must be at least 3 characters long').max(30, 'Group name is too long'),
});

type CreateGroupData = {
  name: string;
};

type UpdateGroupData = {
  id: string;
  name: string;
};

export async function createGroup(createData: CreateGroupData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a group');

  const validatedFields = CreateSchema.safeParse({
    name: createData.name,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());
  const { name } = validatedFields.data;
  const trimmedName = name.trim();

  return await db.$transaction(async (trx) => {
    const existingGroup = await trx.group.findFirst({
      where: {
        name: trimmedName,
        createdById: session.user.id,
      },
      select: {
        id: true,
      },
    });
    if (existingGroup) throw new Error('You already own a group with that name');

    const group = await trx.group.create({
      data: {
        name: trimmedName,
        createdBy: {
          connect: {
            id: session.user.id,
          },
        },
        members: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    await trx.groupPlan.create({
      data: {
        groupId: group.id,
      },
    });

    return { message: `Group ${group.name} created.`, redirect: `/group/${group.id}` };
  });
}

export async function updateGroup(updateData: UpdateGroupData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a group');

  const validatedFields = UpdateSchema.safeParse({
    id: updateData.id,
    name: updateData.name,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());
  const { id, name } = validatedFields.data;
  const trimmedName = name.trim();

  return await db.$transaction(async (trx) => {
    const existingGroup = await trx.group.findUnique({
      where: { id },
      select: { createdById: true },
    });
    if (!existingGroup) throw new Error('Group by given ID does not exist');
    if (existingGroup.createdById !== session.user.id)
      throw new Error('You do not have permission to update this group');

    await trx.group.update({
      where: { id },
      data: { name: trimmedName },
    });

    revalidatePath(`/group/${id}`);
    return { message: `Group ${name} was updated.`, redirect: `/group/${id}` };
  });
}

export async function deleteGroup(deleteData: { groupId: string }) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to delete a group');

  const deletedGroup = await db.$transaction(async (trx) => {
    const existingGroup = await trx.group.findUnique({
      where: {
        id: deleteData.groupId,
        createdById: session.user.id,
      },
      select: {
        name: true,
      },
    });
    if (!existingGroup) throw new Error('Group by given ID does not exist or you do not own it');

    await trx.group.delete({
      where: {
        id: deleteData.groupId,
      },
    });

    return existingGroup;
  });

  return { message: `Group ${deletedGroup.name} was deleted.`, redirect: `/` };
}

export async function removeMember(removeData: { groupId: string; memberId: string }) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to remove a member from a group');

  return await db.$transaction(async (trx) => {
    const existingGroup = await trx.group.findUnique({
      where: {
        id: removeData.groupId,
      },
      select: {
        id: true,
        name: true,
        createdById: true,
        members: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!existingGroup) throw new Error('Group not found');

    const isInGroup = existingGroup.members.some((m) => m.id === session.user.id);
    if (!isInGroup) throw new Error('You are not a member of this group');

    const existingCharacter = await trx.character.findFirst({
      where: {
        ownerId: removeData.memberId,
        groupId: removeData.groupId,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!existingCharacter) throw new Error('Character not found');

    const isGroupCreator = existingGroup.createdById === session.user.id;
    const isSelfRemoving = removeData.memberId === session.user.id;
    if (!isGroupCreator && !isSelfRemoving) throw new Error('You cannot remove this member from the group');

    if (isGroupCreator && isSelfRemoving) {
      const remainingMembers = existingGroup.members.filter((m) => m.id !== session.user.id);
      if (remainingMembers.length === 0) {
        await trx.group.delete({
          where: {
            id: removeData.groupId,
          },
        });
        revalidatePath('/');
        return { message: 'Everyone has left the group.', redirect: `/` };
      } else {
        await trx.group.update({
          where: {
            id: removeData.groupId,
          },
          data: {
            createdById: remainingMembers[0]!.id,
          },
        });
      }
    }

    await trx.group.update({
      where: {
        id: removeData.groupId,
      },
      data: {
        members: {
          disconnect: {
            id: removeData.memberId,
          },
        },
      },
    });

    await trx.character.delete({
      where: {
        id: existingCharacter.id,
      },
    });

    revalidatePath(`/group/${removeData.groupId}`);
    return {
      message: `${existingCharacter.name} was removed from ${existingGroup.name}.`,
      redirect: `/group/${removeData.groupId}`,
    };
  });
}

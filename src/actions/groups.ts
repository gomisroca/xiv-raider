'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateSchema = z.object({
  name: z.string().min(3, 'Group name must be at least 3 characters long').max(100, 'Group name is too long'),
});

const UpdateSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Group name must be at least 3 characters long').max(100, 'Group name is too long'),
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
  const { data } = validatedFields;

  const existingGroup = await db.group.findFirst({
    where: {
      name: data.name,
      createdById: session.user.id,
    },
  });
  if (existingGroup) throw new Error('You already own a group with that name');

  const group = await db.$transaction(async (trx) => {
    const group = await trx.group.create({
      data: {
        name: data.name,
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

    return group;
  });

  return { message: 'Group created.', redirect: `/group/${group.id}` };
}

export async function updateGroup(updateData: UpdateGroupData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a group');

  const validatedFields = UpdateSchema.safeParse({
    id: updateData.id,
    name: updateData.name,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());
  const { data } = validatedFields;

  const existingGroup = await db.group.findUnique({
    where: {
      id: data.id,
    },
  });
  if (!existingGroup) throw new Error('Group by given ID does not exist');

  await db.group.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
    },
  });

  revalidatePath(`/group/${data.id}`);
  return { message: 'Group updated.', redirect: `/group/${data.id}` };
}

export async function removeMember(removeData: { groupId: string; memberId: string }) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to remove a member from a group');

  const existingGroup = await db.group.findUnique({
    where: {
      id: removeData.groupId,
      members: {
        some: {
          id: session.user.id,
        },
      },
    },
    include: {
      members: true,
    },
  });
  const existingCharacter = await db.character.findFirst({
    where: {
      ownerId: removeData.memberId,
      groupId: removeData.groupId,
    },
  });
  if (!existingGroup || !existingCharacter) throw new Error('Group with member by given ID does not exist');

  if (session.user.id === existingGroup.createdById || session.user.id === removeData.memberId) {
    await db.$transaction(async (trx) => {
      if (session.user.id === existingGroup.createdById) {
        const remainingMembers = existingGroup.members.filter((member) => member.id !== session.user.id);
        if (remainingMembers.length === 0) {
          await trx.group.delete({
            where: {
              id: removeData.groupId,
            },
          });
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
    });
  } else throw new Error('You cannot remove this member from the group');

  revalidatePath(`/group/${removeData.groupId}`);
  return { message: 'Member removed from group.', redirect: `/group/${removeData.groupId}` };
}

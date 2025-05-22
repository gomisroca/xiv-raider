'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { z } from 'zod';

const GroupSchema = z.object({
  name: z.string().min(3, 'Group name must be at least 3 characters long').max(100, 'Group name is too long'),
});

type CreateGroupData = {
  name: string;
};

export async function createGroup(createData: CreateGroupData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a group');

  const validatedFields = GroupSchema.safeParse({
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

  const group = await db.group.create({
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

  return { message: 'Group created.', redirect: `/group/${group.id}` };
}

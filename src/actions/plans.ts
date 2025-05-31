'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { Priority } from 'generated/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const UpdateSchema = z.object({
  groupId: z.string(),
  priority_1: z.nativeEnum(Priority),
  priority_2: z.nativeEnum(Priority),
  priority_3: z.nativeEnum(Priority),
  priority_4: z.nativeEnum(Priority),
});

export async function updatePlan(updateData: z.infer<typeof UpdateSchema>) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a group plan');

  const validatedFields = UpdateSchema.safeParse({
    groupId: updateData.groupId,
    priority_1: updateData.priority_1,
    priority_2: updateData.priority_2,
    priority_3: updateData.priority_3,
    priority_4: updateData.priority_4,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());
  const { groupId, priority_1, priority_2, priority_3, priority_4 } = validatedFields.data;

  return await db.$transaction(async (trx) => {
    const existingGroup = await trx.group.findFirst({
      where: {
        id: groupId,
        createdById: session.user.id,
      },
    });
    if (!existingGroup) throw new Error('You cannot update the group plan of a group that does not belong to you');

    const existingPlan = await trx.groupPlan.findUnique({ where: { groupId } });
    if (!existingPlan) {
      await trx.groupPlan.create({
        data: {
          groupId,
          priority_1,
          priority_2,
          priority_3,
          priority_4,
        },
      });
    } else {
      await trx.groupPlan.update({
        where: {
          groupId,
        },
        data: {
          priority_1,
          priority_2,
          priority_3,
          priority_4,
        },
      });
    }

    revalidatePath(`/group/${groupId}`);
    return { message: `Plan for group ${existingGroup.name} was updated.`, redirect: `/group/${groupId}` };
  });
}

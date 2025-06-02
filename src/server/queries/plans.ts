import 'server-only';
import { db } from '@/server/db';
import { cache } from 'react';
import { auth } from '../auth';

export const getPlan = cache(async (groupId: string) => {
  const session = await auth();
  if (!session) return null;

  try {
    const plan = await db.groupPlan
      .findUniqueOrThrow({
        where: {
          groupId,
          group: {
            createdById: session.user.id,
          },
        },
        select: {
          priority_1: true,
          priority_2: true,
          priority_3: true,
          priority_4: true,
        },
      })
      .catch((error) => {
        console.error('Failed to get group plan:', error);
        return null;
      });

    return plan;
  } catch (error) {
    console.error('Failed to get group plan:', error);
    return null;
  }
});

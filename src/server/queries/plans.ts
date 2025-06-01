import 'server-only';
import { db } from '@/server/db';
import { cache } from 'react';

export const getPlan = cache(async (groupId: string) => {
  try {
    const plan = await db.groupPlan.findUniqueOrThrow({
      where: {
        groupId,
      },
      select: {
        priority_1: true,
        priority_2: true,
        priority_3: true,
        priority_4: true,
      },
    });

    return plan;
  } catch (error) {
    console.error('Failed to get group plan:', error);
    throw new Error('An unexpected error occurred');
  }
});

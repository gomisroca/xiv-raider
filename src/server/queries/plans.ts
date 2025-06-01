import 'server-only';
import { db } from '@/server/db';
import { cache } from 'react';

export const getPlan = cache(async (groupId: string) => {
  try {
    const plan = await db.groupPlan.findUnique({
      where: {
        groupId,
      },
    });

    return plan;
  } catch (error) {
    console.error('Failed to get group plan:', error);
    throw new Error('An unexpected error occurred');
  }
});

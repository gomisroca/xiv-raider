import 'server-only';
import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { cache } from 'react';

export const getExtendedGroup = cache(async (id: string) => {
  try {
    const session = await auth();
    const group = await db.group.findUniqueOrThrow({
      where: {
        id,
        members: {
          some: {
            id: session?.user.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        createdById: true,
        members: {
          select: { id: true },
        },
        characters: {
          select: {
            id: true,
            name: true,
            job: true,
            owner: { select: { id: true, name: true } },
            gear: {
              select: { id: true, type: true, lootType: true, status: true },
            },
          },
        },
      },
    });

    console.log('Found group:', group.id);
    return group;
  } catch (error) {
    console.error('Failed to get group:', error);
    throw new Error('An unexpected error occurred');
  }
});

export const getGroup = cache(async (id: string) => {
  try {
    const session = await auth();
    const group = await db.group.findUniqueOrThrow({
      where: {
        id,
        createdById: session?.user.id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return group;
  } catch (error) {
    console.error('Failed to get group:', error);
    throw new Error('An unexpected error occurred');
  }
});

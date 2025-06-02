import 'server-only';
import { db } from '@/server/db';
import { cache } from 'react';
import { auth } from '../auth';

export const getCharacter = cache(async (id: string) => {
  const session = await auth();
  if (!session) return null;

  try {
    const character = await db.character
      .findUniqueOrThrow({
        where: {
          id,
          group: {
            members: {
              some: {
                id: session.user.id,
              },
            },
          },
        },
        select: {
          id: true,
          name: true,
          job: true,
          owner: { select: { id: true, name: true } },
          gear: {
            select: { id: true, type: true, lootType: true, status: true },
          },
        },
      })
      .catch((error) => {
        console.error('Failed to get character:', error);
        return null;
      });

    return character;
  } catch (error) {
    console.error('Failed to get character:', error);
    return null;
  }
});

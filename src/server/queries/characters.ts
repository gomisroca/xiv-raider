import 'server-only';
import { db } from '@/server/db';
import { cache } from 'react';

export const getCharacter = cache(async (id: string) => {
  try {
    const character = await db.character.findUniqueOrThrow({
      where: {
        id,
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
    });

    return character;
  } catch (error) {
    console.error('Failed to get character:', error);
    throw new Error('An unexpected error occurred');
  }
});

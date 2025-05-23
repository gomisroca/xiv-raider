import 'server-only';
import { db } from '@/server/db';

export async function getCharacter(id: string) {
  try {
    const character = await db.character.findUnique({
      where: {
        id,
      },
      include: {
        gear: true,
      },
    });

    return character;
  } catch (error) {
    console.error('Failed to get character:', error);
    throw new Error('An unexpected error occurred');
  }
}

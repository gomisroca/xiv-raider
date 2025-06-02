import 'server-only';
import { db } from '@/server/db';
import { auth } from '@/server/auth';
import { cached } from '@/utils/redis';
import { type ExtendedCharacter } from 'types';
import { type Prisma } from 'generated/prisma';

function getCleanCharacter({
  character,
  userId,
}: {
  character: Prisma.CharacterGetPayload<{
    select: {
      id: true;
      name: true;
      job: true;
      owner: { select: { id: true; name: true } };
      gear: {
        select: { id: true; type: true; lootType: true; status: true };
      };
      group: {
        select: {
          members: { select: { id: true } };
        };
      };
    };
  }> | null;
  userId: string;
}): ExtendedCharacter | null {
  if (!character?.group) return null;

  const isMember = character?.group.members.some((m) => m.id === userId);
  if (!isMember) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { group, ...characterWithoutGroup } = character;

  return characterWithoutGroup;
}

export const getCharacter = async (id: string) => {
  const session = await auth();
  if (!session) return null;

  const character = await cached(
    `character:${id}`,
    async () => {
      try {
        const character = await db.character
          .findUniqueOrThrow({
            where: { id },
            select: {
              id: true,
              name: true,
              job: true,
              owner: { select: { id: true, name: true } },
              gear: {
                select: { id: true, type: true, lootType: true, status: true },
              },
              group: {
                select: {
                  members: { select: { id: true } },
                },
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
    },
    60 * 5 // Cache for 5 minutes
  );

  return getCleanCharacter({ character, userId: session.user.id });
};

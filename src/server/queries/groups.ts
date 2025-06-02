import 'server-only';
import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { cached } from '@/utils/redis';

export const getExtendedGroup = async (id: string) => {
  const session = await auth();
  if (!session) return null;

  return cached(
    `ex-group:${id}`,
    async () => {
      try {
        const group = await db.group
          .findUniqueOrThrow({
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
          })
          .catch((error) => {
            console.error('Failed to get group:', error);
            return null;
          });

        return group;
      } catch (error) {
        console.error('Failed to get group:', error);
        return null;
      }
    },
    60 * 5
  );
};

export const getGroup = async (id: string) => {
  const session = await auth();
  if (!session) return null;

  return cached(
    `group:${id}`,
    async () => {
      try {
        const group = await db.group
          .findUniqueOrThrow({
            where: {
              id,
              createdById: session?.user.id,
            },
            select: {
              id: true,
              name: true,
            },
          })
          .catch((error) => {
            console.error('Failed to get group:', error);
            return null;
          });

        return group;
      } catch (error) {
        console.error('Failed to get group:', error);
        return null;
      }
    },
    60 * 5
  );
};

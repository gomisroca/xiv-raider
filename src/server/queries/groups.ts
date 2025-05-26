import 'server-only';
import { auth } from '@/server/auth';
import { db } from '@/server/db';

export async function getGroup(id: string) {
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
      include: {
        createdBy: true,
        members: true,
        characters: {
          include: {
            owner: true,
          },
        },
      },
    });

    return group;
  } catch (error) {
    console.error('Failed to get group:', error);
    throw new Error('An unexpected error occurred');
  }
}

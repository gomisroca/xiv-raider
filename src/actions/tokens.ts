'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';

export async function generateToken({ groupId }: { groupId: string }) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create an invite token');

  return await db.$transaction(async (trx) => {
    const group = await trx.group.findUnique({
      where: {
        id: groupId,
        createdById: session.user.id,
      },
      include: {
        members: true,
      },
    });
    if (!group) throw new Error('You do not have permission to create an invite token for this group');

    const token = await trx.inviteToken.create({
      data: {
        group: {
          connect: {
            id: groupId,
          },
        },
        maxUses: 10,
        remainingUses: 10,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    return { message: 'Group invite token created.', redirect: `/invite?code=${token.id}` };
  });
}

export async function consumeToken({ tokenId }: { tokenId: string }) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to join a group');

  // Find token and group
  return await db.$transaction(async (trx) => {
    const token = await trx.inviteToken.findUnique({
      where: {
        id: tokenId,
      },
      include: {
        group: {
          select: {
            id: true,
            name: true,
            members: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    if (!token || token.remainingUses <= 0 || (token.expiresAt && token.expiresAt < new Date()))
      throw new Error('Invalid or expired invite token');

    const alreadyMember = token.group.members.some((m) => m.id === session.user.id);
    if (alreadyMember) throw new Error('You are already a member of this group');

    // Update group and token
    await trx.group.update({
      where: {
        id: token.group.id,
      },
      data: {
        members: {
          connect: {
            id: session.user.id,
          },
        },
        updatedAt: new Date(),
      },
    });

    // Decrement or delete token
    if (token.remainingUses === 1) {
      await trx.inviteToken.delete({
        where: { id: token.id },
      });
    } else {
      await trx.inviteToken.update({
        where: { id: token.id },
        data: {
          remainingUses: { decrement: 1 },
        },
      });
    }

    return { message: `You joined the group ${token.group.name}.`, redirect: `/group/${token.group.id}` };
  });
}

import 'server-only';
import { db } from '@/server/db';
import { cache } from 'react';

export const getToken = cache(async (tokenId: string) => {
  try {
    const token = await db.inviteToken.findUniqueOrThrow({
      where: {
        id: tokenId,
      },
      include: {
        group: true,
      },
    });
    if (!token) throw new Error('Invalid invite token');

    return token;
  } catch (error) {
    console.error('Failed to get invite token:', error);
    throw new Error('An unexpected error occurred');
  }
});

import 'server-only';
import { db } from '@/server/db';

export async function getToken(tokenId: string) {
  const token = await db.inviteToken.findUnique({
    where: {
      id: tokenId,
    },
    include: {
      group: true,
    },
  });
  if (!token) throw new Error('Invalid invite token');

  return token;
}

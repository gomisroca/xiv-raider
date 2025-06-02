import { auth } from '@/server/auth';
// Components
import NotAllowed from '@/app/_components/ui/not-allowed';
// Types
import { type JSX } from 'react';

export async function withSessionAccess(
  callback: (access: boolean) => Promise<JSX.Element> | JSX.Element
): Promise<JSX.Element> {
  const session = await auth();
  if (!session) return <NotAllowed />;
  return await callback(true);
}

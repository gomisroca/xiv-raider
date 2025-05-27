'use client';

import { consumeToken } from '@/actions/tokens';
import Button from '@/app/_components/ui/button';
import { useRedirect } from '@/hooks/useRedirect';
import { type ActionReturn } from 'types';

export default function JoinButton({ tokenId }: { tokenId: string }) {
  const redirect = useRedirect();

  const action = async (tokenId: string) => {
    const action: ActionReturn = await consumeToken({ tokenId });
    if (action.redirect) redirect(false, action.redirect);
  };

  return (
    <Button onClick={() => action(tokenId)} name="Join" className="w-fit font-semibold uppercase">
      Join
    </Button>
  );
}

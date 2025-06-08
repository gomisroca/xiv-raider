'use client';

import { consumeToken } from '@/actions/tokens';
import Button from '@/app/_components/ui/button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { useSetAtom } from 'jotai';
import { type ActionReturn } from 'types';

export default function JoinButton({ tokenId }: { tokenId: string }) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);

  const action = async (tokenId: string) => {
    const action: ActionReturn = await consumeToken({ tokenId });

    setMessage({
      content: action.message,
      error: action.error,
    });

    if (action.redirect) redirect(false, action.redirect);
  };

  return (
    <Button onClick={() => action(tokenId)} name="Join" className="w-36">
      Join
    </Button>
  );
}

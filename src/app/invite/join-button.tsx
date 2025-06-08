'use client';

import { consumeToken } from '@/actions/tokens';
import Button from '@/app/_components/ui/button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useSetAtom } from 'jotai';
import { type ActionReturn } from 'types';

export default function JoinButton({ tokenId }: { tokenId: string }) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);

  const action = async (tokenId: string) => {
    try {
      // Optimistically set the message
      setMessage({
        content: `You have joined the group.`,
        error: false,
      });

      // Call the consumeToken action
      const action: ActionReturn = await consumeToken({ tokenId });

      if (action.redirect) redirect(false, action.redirect);
    } catch (error) {
      setMessage({
        content: toErrorMessage(error, 'Failed to join group'),
        error: true,
      });
    }
  };

  return (
    <Button onClick={() => action(tokenId)} name="Join" className="w-36">
      Join
    </Button>
  );
}

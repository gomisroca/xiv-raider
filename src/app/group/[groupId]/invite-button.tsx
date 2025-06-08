'use client';

import { generateToken } from '@/actions/tokens';
import Button from '@/app/_components/ui/button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useSetAtom } from 'jotai';
import { type ActionReturn } from 'types';

export default function InviteButton({ groupId }: { groupId: string }) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);

  const action = async (groupId: string) => {
    try {
      // Call the createGroup action with the form data
      const action: ActionReturn = await generateToken({ groupId });

      // If the action returns a redirect, redirect to the specified page
      if (action.redirect) redirect(false, action.redirect);
    } catch (error) {
      // Update the message if an error occurred
      setMessage({
        content: toErrorMessage(error, 'Failed to create group invite'),
        error: true,
      });
    }
  };

  return (
    <Button onClick={() => action(groupId)} name="Invite" className="w-fit text-sm *:px-2 md:text-base" skew="high">
      Invite
    </Button>
  );
}

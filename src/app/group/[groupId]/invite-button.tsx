'use client';

import { generateToken } from '@/actions/tokens';
import Button from '@/app/_components/ui/button';
import { useRedirect } from '@/hooks/useRedirect';
import { type ActionReturn } from 'types';

export default function InviteButton({ groupId }: { groupId: string }) {
  const redirect = useRedirect();

  const action = async (groupId: string) => {
    // Call the createGroup action with the form data
    const action: ActionReturn = await generateToken({ groupId });

    // If the action returns a redirect, redirect to the specified page
    if (action.redirect) redirect(false, action.redirect);
  };

  return (
    <Button onClick={() => action(groupId)} name="Invite" className="w-fit text-sm *:px-2 md:text-base" skew="high">
      Invite
    </Button>
  );
}

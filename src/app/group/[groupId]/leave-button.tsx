'use client';

import { removeMember } from '@/actions/groups';
import Button from '@/app/_components/ui/button';
import { useRedirect } from '@/hooks/useRedirect';
import { type ActionReturn } from 'types';

export default function LeaveButton({ groupId, memberId }: { groupId: string; memberId: string }) {
  const redirect = useRedirect();

  const action = async () => {
    const confirmed = confirm(`Are you sure you want to leave the group?`);
    if (!confirmed) return;

    // Call the removeMember action with the form data
    const action: ActionReturn = await removeMember({ groupId, memberId });

    // If the action returns a redirect, redirect to the specified page
    if (action.redirect) redirect(false, action.redirect);
  };

  return (
    <Button onClick={() => action()} name="Leave" className="w-fit bg-red-500 font-semibold uppercase dark:bg-red-600">
      Leave Group
    </Button>
  );
}

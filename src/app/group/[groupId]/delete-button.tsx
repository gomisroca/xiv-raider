'use client';

import { deleteGroup } from '@/actions/groups';
import Button from '@/app/_components/ui/button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { useSetAtom } from 'jotai';
import { type ActionReturn } from 'types';

export default function DeleteButton({ groupId }: { groupId: string }) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);

  const action = async () => {
    const confirmed = confirm(`Are you sure you want to delete the group?`);
    if (!confirmed) return;

    // Call the removeMember action with the form data
    const action: ActionReturn = await deleteGroup({ groupId });

    setMessage({
      content: action.message,
      error: action.error,
    });

    // If the action returns a redirect, redirect to the specified page
    if (action.redirect) redirect(false, action.redirect);
  };

  return (
    <Button
      onClick={() => action()}
      name="Delete"
      className="w-fit bg-red-500 text-sm font-semibold uppercase md:text-base dark:bg-red-600">
      Delete Group
    </Button>
  );
}

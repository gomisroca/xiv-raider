'use client';

import { deleteGroup } from '@/actions/groups';
import Button from '@/app/_components/ui/button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useSetAtom } from 'jotai';
import { type ActionReturn } from 'types';

export default function DeleteButton({ groupId }: { groupId: string }) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);

  const action = async () => {
    try {
      const confirmed = confirm(`Are you sure you want to delete the group?`);
      if (!confirmed) return;

      // Optimistically set the message
      setMessage({
        content: `Group was deleted.`,
        error: false,
      });

      // Call the removeMember action with the form data
      const action: ActionReturn = await deleteGroup({ groupId });

      // If the action returns a redirect, redirect to the specified page
      if (action.redirect) redirect(false, action.redirect);
    } catch (error) {
      // Update the message if an error occurred
      setMessage({
        content: toErrorMessage(error, 'Failed to delete group'),
        error: true,
      });
    }
  };

  return (
    <Button
      onClick={() => action()}
      name="Delete"
      className="w-fit text-sm font-semibold uppercase *:px-2 hover:bg-red-500 md:text-base hover:dark:bg-red-600"
      skew="high">
      Delete Group
    </Button>
  );
}

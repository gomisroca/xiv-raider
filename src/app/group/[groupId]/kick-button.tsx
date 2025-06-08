'use client';

import { removeMember } from '@/actions/groups';
import Button from '@/app/_components/ui/button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useSetAtom } from 'jotai';
import { FaTrash } from 'react-icons/fa6';
import { type ActionReturn } from 'types';

export default function KickButton({
  groupId,
  memberName,
  memberId,
}: {
  groupId: string;
  memberName: string;
  memberId: string;
}) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);

  const action = async () => {
    try {
      const confirmed = confirm(`Are you sure you want to kick ${memberName} from the group?`);
      if (!confirmed) return;

      // Optimistically set the message
      setMessage({
        content: `${memberName} was kicked from the group.`,
        error: false,
      });

      // Call the removeMember action with the form data
      const action: ActionReturn = await removeMember({ groupId, memberId });

      // If the action returns a redirect, redirect to the specified page
      if (action.redirect) redirect(false, action.redirect);
    } catch (error) {
      // Update the message if an error occurred
      setMessage({
        content: toErrorMessage(error, 'Failed to kick member from group'),
        error: true,
      });
    }
  };

  return (
    <Button
      onClick={() => action()}
      name="Kick"
      className="text-sm hover:bg-red-500 md:text-base hover:dark:bg-red-600">
      <FaTrash size={20} />
    </Button>
  );
}

'use client';

import { removeMember } from '@/actions/groups';
import Button from '@/app/_components/ui/button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
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
    const confirmed = confirm(`Are you sure you want to kick ${memberName} from the group?`);
    if (!confirmed) return;

    // Call the removeMember action with the form data
    const action: ActionReturn = await removeMember({ groupId, memberId });

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
      name="Kick"
      className="skew-x-0 skew-y-0 text-sm hover:skew-x-0 hover:skew-y-0 hover:bg-red-500 md:text-base hover:dark:bg-red-600">
      <FaTrash size={20} />
    </Button>
  );
}

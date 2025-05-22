import { getGroup } from '@/server/queries/groups';
import InviteButton from './invite-button';
import { auth } from '@/server/auth';
import NotAllowed from '@/app/_components/ui/not-allowed';

export default async function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;

  const session = await auth();

  const group = await getGroup(groupId);

  if (!session || !group?.members.find((member) => member.id === session.user.id)) return <NotAllowed />;

  return (
    <div className="flex flex-col items-center justify-center">
      {group?.name}
      <InviteButton groupId={groupId} />
    </div>
  );
}

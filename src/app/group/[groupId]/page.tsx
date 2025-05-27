import { getGroup } from '@/server/queries/groups';
import InviteButton from './invite-button';
import { auth } from '@/server/auth';
import NotAllowed from '@/app/_components/ui/not-allowed';
import Link from '@/app/_components/ui/link';
import { FaPencil } from 'react-icons/fa6';
import PlanWidget from './(planner)/plan-widget';

export default async function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;

  const session = await auth();

  const group = await getGroup(groupId);

  if (!session || !group?.members.find((member) => member.id === session.user.id)) return <NotAllowed />;

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="flex items-center justify-between gap-2">
        <h4 className="text-xl font-bold">{group?.name}</h4>
        {!group.characters.find((character) => character.ownerId === session.user.id) && (
          <Link href={`/group/${groupId}/create`} className="w-fit font-semibold uppercase">
            Add Character
          </Link>
        )}
        {session.user.id === group.createdBy.id && (
          <div className="flex items-center gap-2">
            <Link href={`/group/${groupId}/plan`} className="w-fit font-semibold uppercase">
              Update Plan
            </Link>
            <InviteButton groupId={groupId} />
          </div>
        )}
      </header>
      <main className="flex flex-col gap-2 p-4">
        <PlanWidget group={group} />
        {group.characters.map((character) => (
          <div key={character.id} className="flex gap-1">
            <Link href={`/group/${groupId}/${character.id}`} className="w-fit font-semibold uppercase">
              {character.name} - {character.owner.name}
            </Link>
            {session.user.id === group.createdBy.id && (
              <Link href={`/group/${groupId}/${character.id}/update`} className="w-fit font-semibold uppercase">
                <FaPencil />
              </Link>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}

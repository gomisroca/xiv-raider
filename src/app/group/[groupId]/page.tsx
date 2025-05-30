import { getGroup } from '@/server/queries/groups';
import InviteButton from './invite-button';
import { auth } from '@/server/auth';
import NotAllowed from '@/app/_components/ui/not-allowed';
import Link from '@/app/_components/ui/link';
import { getPlan } from '@/server/queries/plans';
import BossLootList from './boss-list';
import MemberList from './member-list';
import LeaveButton from './leave-button';

export default async function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;

  const session = await auth();

  const group = await getGroup(groupId);
  const plan = await getPlan(group.id);
  if (!group || !plan) return null;

  if (!session || !group?.members.find((member) => member.id === session.user.id)) return <NotAllowed />;

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="flex w-full items-center justify-between gap-2">
        <h4 className="text-2xl font-bold">{group?.name}</h4>
        <aside className="flex items-center gap-2">
          {!group.characters.find((character) => character.ownerId === session.user.id) && (
            <Link name="Add Character" href={`/group/${groupId}/create`} className="w-fit font-semibold uppercase">
              Add Character
            </Link>
          )}
          {session.user.id === group.createdBy.id && (
            <div className="flex items-center gap-2">
              <Link name="Update Plan" href={`/group/${groupId}/plan`} className="w-fit font-semibold uppercase">
                Update Plan
              </Link>
              <InviteButton groupId={groupId} />
            </div>
          )}
          <LeaveButton groupId={groupId} memberId={session.user.id} />
        </aside>
      </header>
      <section className="flex flex-col gap-2 p-4">
        <BossLootList characters={group.characters} plan={plan} />
        <MemberList group={group} plan={plan} session={session} />
      </section>
    </div>
  );
}

import InviteButton from './invite-button';
import Link from '@/app/_components/ui/link';
import BossLootList from './boss-list';
import MemberList from './member-list';
import LeaveButton from './leave-button';
import DeleteButton from './delete-button';
import { withGroupViewAccess } from '@/utils/wrappers/withGroupAccess';
import { type ExtendedGroup } from 'types';
import { type Session } from 'next-auth';

async function GroupHeader({ group, session }: { group: ExtendedGroup; session: Session }) {
  return (
    <header className="flex w-full items-center justify-between gap-2">
      <h4 className="text-2xl font-bold">{group?.name}</h4>
      <aside className="flex items-center gap-2">
        {!group.characters.find((character) => character.owner.id === session.user.id) && (
          <Link name="Add Character" href={`/group/${group.id}/create`} className="w-fit font-semibold uppercase">
            Add Character
          </Link>
        )}
        {session.user.id === group.createdById && (
          <div className="flex items-center gap-2">
            <Link name="Update Group" href={`/group/${group.id}/update`} className="w-fit font-semibold uppercase">
              Update Group
            </Link>
            <Link name="Update Plan" href={`/group/${group.id}/plan`} className="w-fit font-semibold uppercase">
              Update Plan
            </Link>
            <InviteButton groupId={group.id} />
            <DeleteButton groupId={group.id} />
          </div>
        )}
        <LeaveButton groupId={group.id} memberId={session.user.id} />
      </aside>
    </header>
  );
}

export default async function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;

  return withGroupViewAccess(groupId, async ({ group, plan, session }) => (
    <div className="flex flex-col items-center justify-center">
      <GroupHeader group={group} session={session} />
      <section className="flex flex-col gap-2 p-4">
        <BossLootList groupId={group.id} characters={group.characters} plan={plan} />
        <MemberList group={group} plan={plan} session={session} />
      </section>
    </div>
  ));
}

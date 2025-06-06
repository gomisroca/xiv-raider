import InviteButton from './invite-button';
import Link from '@/app/_components/ui/link';
import BossLootList from './boss-list';
import MemberList from './member-list';
import LeaveButton from './leave-button';
import DeleteButton from './delete-button';
import { withGroupViewAccess } from '@/utils/wrappers/withGroupAccess';
import { type ExtendedGroup } from 'types';
import { type Session } from 'next-auth';
import { Title } from '@/app/_components/ui/title';

async function GroupHeader({ group, session }: { group: ExtendedGroup; session: Session }) {
  return (
    <header className="flex w-full flex-col items-start justify-start gap-y-2 sm:gap-y-4 md:items-center md:justify-center">
      <Title content={group?.name} />
      <aside className="flex flex-wrap items-center justify-start gap-1 sm:gap-2 md:justify-center">
        {!group.characters.find((character) => character.owner.id === session.user.id) && (
          <Link
            name="Add Character"
            href={`/group/${group.id}/create`}
            className="w-fit text-sm font-semibold uppercase md:text-base">
            Add Character
          </Link>
        )}
        {session.user.id === group.createdById && (
          <>
            <Link
              name="Update Group"
              href={`/group/${group.id}/update`}
              className="w-fit text-sm font-semibold uppercase md:text-base">
              Update Group
            </Link>
            <Link
              name="Update Plan"
              href={`/group/${group.id}/plan`}
              className="w-fit text-sm font-semibold uppercase md:text-base">
              Update Plan
            </Link>
            <InviteButton groupId={group.id} />
            <DeleteButton groupId={group.id} />
          </>
        )}
        <LeaveButton groupId={group.id} memberId={session.user.id} />
      </aside>
    </header>
  );
}

export default async function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;

  return withGroupViewAccess(groupId, async ({ group, plan, session }) => (
    <div className="flex w-full flex-col items-center justify-center">
      <GroupHeader group={group} session={session} />
      <section className="mt-10 flex min-h-[70vh] w-full flex-col items-center justify-start gap-2 md:p-4">
        {group.characters.length > 0 ? (
          <>
            <BossLootList groupId={group.id} characters={group.characters} plan={plan} />
            <MemberList group={group} plan={plan} session={session} />
          </>
        ) : (
          <>
            <h2 className="text-4xl font-semibold tracking-widest uppercase">No characters found</h2>
            <p>Please add a character to get started.</p>
          </>
        )}
      </section>
    </div>
  ));
}

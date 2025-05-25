import { auth } from '@/server/auth';
import Link from '@/app/_components/ui/link';
import CreateButton from './create-button';
import { type Group } from 'generated/prisma';

function GroupLink({ group }: { group: Group }) {
  return (
    <Link key={group.id} href={`/group/${group.id}`} className="h-20 w-70 text-xl font-semibold uppercase">
      {group.name}
    </Link>
  );
}

export default async function Home() {
  const session = await auth();

  return (
    <>
      {session && session.user.groups.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {session.user.groups.map((group) => (
            <GroupLink key={group.id} group={group} />
          ))}

          <CreateButton session={session} size="small" />
        </div>
      ) : (
        <CreateButton session={session} />
      )}
    </>
  );
}

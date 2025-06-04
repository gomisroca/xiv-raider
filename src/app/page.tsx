import { auth } from '@/server/auth';
import Link from '@/app/_components/ui/link';
import CreateButton from './create-button';
import { type Group } from 'generated/prisma';
import LoginButton from './_components/ui/login-button';

function GroupLink({ group }: { group: Group }) {
  return (
    <Link
      key={group.id}
      href={`/group/${group.id}`}
      name={group.name}
      className="h-96 w-72 max-w-xl overflow-hidden text-4xl font-semibold uppercase md:h-86 md:w-full md:text-6xl">
      {group.name}
    </Link>
  );
}

export default async function Home() {
  const session = await auth();

  return (
    <>
      {session ? (
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <div className="flex w-full flex-wrap items-center justify-center gap-2">
            {session.user.groups.map((group) => (
              <GroupLink key={group.id} group={group} />
            ))}
          </div>
          <CreateButton session={session} size={session.user.groups.length > 0 ? 'small' : 'normal'} />
        </div>
      ) : (
        <section className="flex max-w-lg flex-col items-center gap-[1lh] rounded-lg bg-radial-[at_50%_0%] from-zinc-900/10 via-zinc-50 via-80% p-4 leading-snug tracking-tight dark:from-zinc-100/10 dark:via-zinc-950">
          <h6 className="text-xl font-semibold tracking-wide">Welcome to XIV Raider!</h6>
          <p>XIV Raider is a group management tool for the Final Fantasy XIV community.</p>
          <p>
            Here, you will be able to create or join groups, manage your members, organize the loot distribution, and
            keep track of who needs what items.
          </p>
          <p>To get started, you must be logged in with your Discord account. Click the button below to log in.</p>
          <LoginButton size="large" />
        </section>
      )}
    </>
  );
}

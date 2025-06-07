import { auth } from '@/server/auth';
import Link from '@/app/_components/ui/link';
import { type Group } from 'generated/prisma';
import LoginButton from './_components/ui/login-button';
import CreateButton from './create-button';
import { Title } from './_components/ui/title';

function GroupLink({ group }: { group: Group }) {
  return (
    <Link
      key={group.id}
      href={`/group/${group.id}`}
      name={group.name}
      className="h-45 w-full max-w-xl overflow-hidden text-3xl font-semibold uppercase md:h-64 md:w-full md:text-6xl">
      {group.name}
    </Link>
  );
}

export default async function Home() {
  const session = await auth();

  return (
    <>
      {session ? (
        <section className="flex w-full flex-col items-center justify-center gap-2 px-4 md:px-0">
          <div className="flex w-full flex-wrap items-center justify-center gap-2">
            {session.user.groups.map((group) => (
              <GroupLink key={group.id} group={group} />
            ))}
          </div>
          <CreateButton session={session} size={session.user.groups.length > 0 ? 'small' : 'normal'} />
        </section>
      ) : (
        <section className="flex max-w-lg flex-col items-center gap-[1lh] bg-gradient-to-b from-zinc-50 to-transparent to-70% px-4 py-6 text-center leading-snug tracking-tight dark:from-zinc-950">
          <header className="flex flex-col items-center justify-center gap-1 leading-snug">
            <Title content="XIV Raider" />
            <p className="text-xs tracking-tighter uppercase md:text-sm">A Final Fantasy XIV group management tool</p>
          </header>
          <p>Manage your static, organize the loot distribution, and keep track of who needs what items.</p>
          <p>Log in with your Discord account to get started.</p>
          <LoginButton size="large" />
        </section>
      )}
    </>
  );
}

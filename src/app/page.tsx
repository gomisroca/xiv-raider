import { auth } from '@/server/auth';
import Link from '@/app/_components/ui/link';
import CreateButton from './create-button';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {session && session.user.groups.length > 0 ? (
        session.user.groups.map((group) => (
          <Link key={group.id} href={`/group/${group.id}`}>
            {group.name}
          </Link>
        ))
      ) : (
        <CreateButton session={session} />
      )}
    </main>
  );
}

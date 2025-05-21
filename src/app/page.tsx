import { auth } from '@/server/auth';
import Link from '@/app/_components/ui/link';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>{session ? 'Sign out' : 'Sign in'}</Link>
      {session?.user && <h1 className="text-xl">Welcome back, {session.user.name}!</h1>}
    </main>
  );
}

import JoinButton from './join-button';
import Link from '@/app/_components/ui/link';
import { type Metadata } from 'next';
import { withGroupInviteViewAccess } from '@/utils/wrappers/withGroupAccess';

export const metadata: Metadata = {
  title: 'XIV Raider | Invite',
  description: 'Join a group using an invite code.',
  openGraph: {
    title: 'XIV Raider | Invite',
    description: 'Join a group using an invite code.',
  },
};

export default async function InvitePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const code = (await searchParams).code;
  if (!code) return null;

  return withGroupInviteViewAccess(code, (token) => (
    <div className="flex flex-col items-center justify-center gap-2">
      <p>
        You have been invited to <span className="font-semibold">{token.group.name}</span>.
      </p>
      <section className="flex items-center gap-2">
        <JoinButton tokenId={code} />
        <Link name="Home" href="/" className="w-36">
          Go Back
        </Link>
      </section>
    </div>
  ));
}

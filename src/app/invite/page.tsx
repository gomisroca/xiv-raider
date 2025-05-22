import JoinButton from './join-button';
import { auth } from '@/server/auth';
import NotAllowed from '../_components/ui/not-allowed';
import Link from '../_components/ui/link';
import { getToken } from '@/server/queries/tokens';

export default async function InvitePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const code = (await searchParams).code;
  if (!code) return null;

  const session = await auth();
  if (!session) return <NotAllowed />;

  const tokenData = await getToken(code);
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p>
        You have been invited to <span className="font-semibold">{tokenData.group.name}</span>.
      </p>
      <section className="flex items-center gap-2">
        <JoinButton tokenId={code} />
        <Link href="/" className="font-semibold uppercase">
          Leave
        </Link>
      </section>
    </div>
  );
}

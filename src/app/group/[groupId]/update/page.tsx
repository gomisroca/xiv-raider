// Libraries
import { auth } from '@/server/auth';
// Components
import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import NotAllowed from '@/app/_components/ui/not-allowed';
import UpdateGroupForm from './form';
import { getGroup } from '@/server/queries/groups';
import { type Metadata } from 'next';

type Props = {
  params: Promise<{ groupId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { groupId } = await params;
  const group = await getGroup(groupId);

  return {
    title: `XIV Raider | ${group.name}`,
  };
}
export default async function UpdateGroup({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  const session = await auth();
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  const group = await getGroup(groupId);
  if (!group) return null;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <UpdateGroupForm group={group} />
    </Suspense>
  );
}

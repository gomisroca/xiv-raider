// Libraries
import { auth } from '@/server/auth';
// Components
import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import NotAllowed from '@/app/_components/ui/not-allowed';
import UpdateGroupForm from './form';
import { getGroup } from '@/server/queries/groups';

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

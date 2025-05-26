// Libraries
import { auth } from '@/server/auth';
// Components
import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import NotAllowed from '@/app/_components/ui/not-allowed';
import UpdatePlanForm from './form';
import { getPlan } from '@/server/queries/plans';

export default async function UpdatePlan({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  const session = await auth();
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  const plan = await getPlan(groupId);
  if (!plan) return null;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <UpdatePlanForm plan={plan} groupId={groupId} />
    </Suspense>
  );
}

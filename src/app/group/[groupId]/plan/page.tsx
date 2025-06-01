// Libraries
import { auth } from '@/server/auth';
// Components
import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import NotAllowed from '@/app/_components/ui/not-allowed';
import UpdatePlanForm from './form';
import { getPlan } from '@/server/queries/plans';
import { type Metadata } from 'next';

type Props = { params: Promise<{ groupId: string }> };

export const metadata: Metadata = {
  title: 'XIV Raider | Update Group Plan',
};

export default async function UpdatePlan({ params }: Props) {
  const { groupId } = await params;

  const session = await auth();
  if (!session) return <NotAllowed />;

  const plan = await getPlan(groupId);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <UpdatePlanForm plan={plan} groupId={groupId} />
    </Suspense>
  );
}

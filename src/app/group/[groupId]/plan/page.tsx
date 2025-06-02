import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import UpdatePlanForm from './form';
import { type Metadata } from 'next';
import { withPlanUpdateAccess } from '@/utils/wrappers/withGroupAccess';

type Props = { params: Promise<{ groupId: string }> };

export const metadata: Metadata = {
  title: 'XIV Raider | Update Group Plan',
  description: 'Update the plan for your group.',
  openGraph: {
    title: 'XIV Raider | Update Group Plan',
    description: 'Update the plan for your group.',
  },
};

export default async function UpdatePlan({ params }: Props) {
  const { groupId } = await params;

  return withPlanUpdateAccess(groupId, (plan) => (
    <Suspense fallback={<LoadingSpinner />}>
      <UpdatePlanForm plan={plan} groupId={groupId} />
    </Suspense>
  ));
}

import Modal from '@/app/_components/ui/modal';
import UpdatePlanForm from '@/app/group/[groupId]/plan/form';
import { withPlanUpdateAccess } from '@/utils/wrappers/withGroupAccess';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import MetadataSetter from '@/app/_components/ui/metadata-setter';

type Props = { params: Promise<{ groupId: string }> };

export default async function UpdatePlanModal({ params }: Props) {
  const { groupId } = await params;

  return withPlanUpdateAccess(groupId, (plan) => (
    <Modal>
      <Suspense fallback={<LoadingSpinner />}>
        <MetadataSetter title="XIV Raider | Update Group Plan" description="Update the plan for your group." />
        <UpdatePlanForm plan={plan} groupId={groupId} modal />
      </Suspense>
    </Modal>
  ));
}

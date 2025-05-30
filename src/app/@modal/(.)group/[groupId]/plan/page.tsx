import Modal from '@/app/_components/ui/modal';
import UpdatePlanForm from '@/app/group/[groupId]/plan/form';
import { getPlan } from '@/server/queries/plans';

export default async function UpdatePlanModal({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  const plan = await getPlan(groupId);
  return (
    <Modal>
      <UpdatePlanForm plan={plan ?? undefined} groupId={groupId} modal />
    </Modal>
  );
}

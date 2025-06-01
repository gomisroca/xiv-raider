import Modal from '@/app/_components/ui/modal';
import TitleSetter from '@/app/_components/ui/title-setter';
import UpdatePlanForm from '@/app/group/[groupId]/plan/form';
import { getPlan } from '@/server/queries/plans';

export default async function UpdatePlanModal({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  const plan = await getPlan(groupId);
  return (
    <Modal>
      <TitleSetter title="XIV Raider | Update Group Plan" />
      <UpdatePlanForm plan={plan ?? undefined} groupId={groupId} modal />
    </Modal>
  );
}

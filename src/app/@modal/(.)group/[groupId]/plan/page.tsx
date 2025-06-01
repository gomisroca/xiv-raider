import Modal from '@/app/_components/ui/modal';
import TitleSetter from '@/app/_components/ui/title-setter';
import UpdatePlanForm from '@/app/group/[groupId]/plan/form';
import { getPlan } from '@/server/queries/plans';

type Props = { params: Promise<{ groupId: string }> };

export default async function UpdatePlanModal({ params }: Props) {
  const { groupId } = await params;
  const plan = await getPlan(groupId);
  return (
    <Modal>
      <TitleSetter title="XIV Raider | Update Group Plan" />
      <UpdatePlanForm plan={plan} groupId={groupId} modal />
    </Modal>
  );
}

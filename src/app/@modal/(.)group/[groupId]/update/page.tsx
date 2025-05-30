import Modal from '@/app/_components/ui/modal';
import UpdateGroupForm from '@/app/group/[groupId]/update/form';
import { getGroup } from '@/server/queries/groups';

export default async function UpdateGroupModal({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  const group = await getGroup(groupId);
  return (
    <Modal>
      <UpdateGroupForm group={group} modal />
    </Modal>
  );
}

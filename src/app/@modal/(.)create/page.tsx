import Modal from '@/app/_components/ui/modal';
import TitleSetter from '@/app/_components/ui/title-setter';
import CreateGroupForm from '@/app/create/form';

export default function CreateGroupModal() {
  return (
    <Modal>
      <TitleSetter title="XIV Raider | Create Group" />
      <CreateGroupForm modal />
    </Modal>
  );
}

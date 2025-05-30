import Modal from '@/app/_components/ui/modal';
import CreateCharacterForm from '@/app/group/[groupId]/(character)/create/form';

export default function CreateCharacterModal() {
  return (
    <Modal>
      <CreateCharacterForm modal />
    </Modal>
  );
}

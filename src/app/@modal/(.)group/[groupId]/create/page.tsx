import Modal from '@/app/_components/ui/modal';
import TitleSetter from '@/app/_components/ui/title-setter';
import CreateCharacterForm from '@/app/group/[groupId]/(character)/create/form';

export default async function CreateCharacterModal() {
  return (
    <Modal>
      <TitleSetter title="XIV Raider | Create Character" />
      <CreateCharacterForm modal />
    </Modal>
  );
}

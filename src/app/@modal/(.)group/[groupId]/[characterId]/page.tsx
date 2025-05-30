import Modal from '@/app/_components/ui/modal';
import CharacterPage from '@/app/group/[groupId]/(character)/[characterId]/page';

export default function CharacterModal({ params }: { params: Promise<{ characterId: string }> }) {
  return (
    <Modal>
      <CharacterPage params={params} />
    </Modal>
  );
}

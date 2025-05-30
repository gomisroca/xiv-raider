import Modal from '@/app/_components/ui/modal';
import UpdateCharacterForm from '@/app/group/[groupId]/(character)/[characterId]/update/form';
import { getCharacter } from '@/server/queries/characters';

export default async function UpdateCharacterModal({
  params,
}: {
  params: Promise<{ groupId: string; characterId: string }>;
}) {
  const { groupId, characterId } = await params;
  const character = await getCharacter(characterId);
  if (!character) return null;
  return (
    <Modal>
      <UpdateCharacterForm character={character} groupId={groupId} modal />
    </Modal>
  );
}

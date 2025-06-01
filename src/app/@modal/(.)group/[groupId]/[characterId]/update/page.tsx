import Modal from '@/app/_components/ui/modal';
import TitleSetter from '@/app/_components/ui/title-setter';
import UpdateCharacterForm from '@/app/group/[groupId]/(character)/[characterId]/update/form';
import { getCharacter } from '@/server/queries/characters';

type Props = {
  params: Promise<{ groupId: string; characterId: string }>;
};

export default async function UpdateCharacterModal({ params }: Props) {
  const { groupId, characterId } = await params;
  const character = await getCharacter(characterId);

  return (
    <Modal>
      <TitleSetter title={`XIV Raider | ${character.name}`} />
      <UpdateCharacterForm character={character} groupId={groupId} modal />
    </Modal>
  );
}

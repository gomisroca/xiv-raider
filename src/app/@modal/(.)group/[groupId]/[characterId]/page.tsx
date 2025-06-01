import Modal from '@/app/_components/ui/modal';
import CharacterPage from '@/app/group/[groupId]/(character)/[characterId]/page';
import { getCharacter } from '@/server/queries/characters';
import TitleSetter from '@/app/_components/ui/title-setter';

type Props = {
  params: Promise<{ characterId: string }>;
};

export default async function CharacterModal({ params }: Props) {
  const { characterId } = await params;
  const character = await getCharacter(characterId);
  return (
    <Modal>
      <TitleSetter title={`XIV Raider | ${character.name}`} />
      <CharacterPage params={params} />
    </Modal>
  );
}

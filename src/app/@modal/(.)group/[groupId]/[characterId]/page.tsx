import Modal from '@/app/_components/ui/modal';
import { CharacterData } from '@/app/group/[groupId]/(character)/[characterId]/page';
import MetadataSetter from '@/app/_components/ui/metadata-setter';
import { withCharacterViewAccess } from '@/utils/wrappers/withCharacterAccess';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';

type Props = {
  params: Promise<{ characterId: string }>;
};

export default async function CharacterModal({ params }: Props) {
  const { characterId } = await params;

  return withCharacterViewAccess(characterId, (character) => (
    <Modal>
      <Suspense fallback={<LoadingSpinner />}>
        <MetadataSetter
          title={`XIV Raider | ${character.name}`}
          description={`Character details for ${character.name}.`}
        />
        <CharacterData character={character} />
      </Suspense>
    </Modal>
  ));
}

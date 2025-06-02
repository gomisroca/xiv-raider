import Modal from '@/app/_components/ui/modal';
import MetadataSetter from '@/app/_components/ui/metadata-setter';
import UpdateCharacterForm from '@/app/group/[groupId]/(character)/[characterId]/update/form';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import { withCharacterUpdateAccess } from '@/utils/wrappers/withCharacterAccess';

type Props = {
  params: Promise<{ groupId: string; characterId: string }>;
};

export default async function UpdateCharacterModal({ params }: Props) {
  const { groupId, characterId } = await params;

  return withCharacterUpdateAccess(characterId, (character) => (
    <Modal>
      <Suspense fallback={<LoadingSpinner />}>
        <MetadataSetter title={`XIV Raider | ${character.name}`} description={`Update ${character.name}'s details.`} />
        <UpdateCharacterForm character={character} groupId={groupId} modal />
      </Suspense>
    </Modal>
  ));
}

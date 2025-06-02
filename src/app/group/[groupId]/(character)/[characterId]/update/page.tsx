import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import UpdateCharacterForm from './form';
import { getCharacter } from '@/server/queries/characters';
import { type Metadata } from 'next';
import { withCharacterUpdateAccess } from '@/utils/wrappers/withCharacterAccess';

type Props = {
  params: Promise<{ groupId: string; characterId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { characterId } = await params;
  const character = await getCharacter(characterId);

  return {
    title: `XIV Raider | ${character?.name}`,
    description: `Update ${character?.name}'s details.`,
    openGraph: {
      title: `XIV Raider | ${character?.name}`,
      description: `Update ${character?.name}'s details.`,
    },
  };
}

export default async function UpdateCharacter({ params }: Props) {
  const { groupId, characterId } = await params;

  return withCharacterUpdateAccess(characterId, (character) => (
    <Suspense fallback={<LoadingSpinner />}>
      <UpdateCharacterForm character={character} groupId={groupId} />
    </Suspense>
  ));
}

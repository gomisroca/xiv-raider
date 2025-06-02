import { getCharacter } from '@/server/queries/characters';
import type { Metadata } from 'next';
import { withCharacterViewAccess } from '@/utils/wrappers/withCharacterAccess';
import CharacterData from './character-data';

type Props = {
  params: Promise<{ characterId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { characterId } = await params;
  const character = await getCharacter(characterId);

  return {
    title: `XIV Raider | ${character?.name}`,
    description: `Character details for ${character?.name}.`,
    openGraph: {
      title: `XIV Raider | ${character?.name}`,
      description: `Character details for ${character?.name}.`,
    },
  };
}

export default async function CharacterPage({ params }: Props) {
  const { characterId } = await params;

  return withCharacterViewAccess(characterId, (character) => (
    <div className="flex flex-col items-center justify-center gap-2">
      <CharacterData character={character} />
    </div>
  ));
}

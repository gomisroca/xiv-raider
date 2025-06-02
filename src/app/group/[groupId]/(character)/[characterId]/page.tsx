import { getCharacter } from '@/server/queries/characters';
import { GearIcon } from '@/app/_components/ui/icons';
import type { Metadata } from 'next';
import { withCharacterViewAccess } from '@/utils/wrappers/withCharacterAccess';
import { type ExtendedCharacter } from 'types';

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

function CharacterDetails({ character }: { character: ExtendedCharacter }) {
  return (
    <header className="flex flex-col items-center justify-center gap-1">
      <h4 className="text-xl font-bold">{character.name}</h4>
      <div className="flex items-center gap-2">
        <p className="font-semibold text-zinc-400">{character.owner.name}</p>
        <p className="text-sm text-zinc-400">{character.job}</p>
      </div>
    </header>
  );
}

function CharacterGear({ character }: { character: ExtendedCharacter }) {
  return (
    <section className="grid grid-cols-2 space-y-1 gap-x-4 p-4">
      {character.gear.map((gear) => (
        <div key={gear.id} className="flex items-center justify-center gap-1 last:col-start-2">
          <GearIcon gearSlot={gear.type} />
          <span>{gear.status}</span>
        </div>
      ))}
    </section>
  );
}

export async function CharacterData({ character }: { character: ExtendedCharacter }) {
  return (
    <>
      <CharacterDetails character={character} />
      <CharacterGear character={character} />
    </>
  );
}

export default async function CharacterPage({ params }: Props) {
  const { characterId } = await params;

  return withCharacterViewAccess(characterId, (character) => (
    <div className="flex flex-col items-center justify-center gap-2">
      <CharacterDetails character={character} />
    </div>
  ));
}

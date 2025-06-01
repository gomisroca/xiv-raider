import { getCharacter } from '@/server/queries/characters';
import { GearIcon } from '@/app/_components/ui/icons';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ characterId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { characterId } = await params;
  const character = await getCharacter(characterId);

  return {
    title: `XIV Raider | ${character.name}`,
  };
}

export default async function CharacterPage({ params }: Props) {
  const { characterId } = await params;
  const character = await getCharacter(characterId);
  if (!character) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <header className="flex flex-col items-center justify-center gap-2">
        <h4 className="text-xl font-bold">
          {character.name} - {character.owner.name}
        </h4>
        <p className="text-sm text-zinc-400">{character.job}</p>
      </header>
      <section className="grid grid-cols-2 space-y-1 gap-x-4 p-4">
        {character.gear.map((gear) => (
          <div key={gear.id} className="jusitfy-center flex items-center gap-1 last:col-start-2">
            <GearIcon gearSlot={gear.type} />
            <span>{gear.status}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

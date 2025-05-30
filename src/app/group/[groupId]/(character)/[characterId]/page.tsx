import { getCharacter } from '@/server/queries/characters';
import { GearIcon } from '@/app/_components/ui/icons';

export default async function CharacterPage({ params }: { params: Promise<{ characterId: string }> }) {
  const { characterId } = await params;
  const character = await getCharacter(characterId);
  if (!character) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <header className="flex items-center justify-between gap-2">
        <h4 className="text-xl font-bold">
          {character.name} - {character.owner.name}
        </h4>
      </header>
      <section className="flex flex-col gap-2 p-4">
        {character.gear.map((gear) => (
          <div key={gear.id} className="flex gap-1">
            <GearIcon gearSlot={gear.type} />
            <span>{gear.status}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

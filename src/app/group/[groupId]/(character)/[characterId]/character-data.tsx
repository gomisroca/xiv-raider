import { GearIcon, JobIcon } from '@/app/_components/ui/icons';
import { type ExtendedCharacter } from 'types';
import { GearStatusLabels } from '@/utils/enums';
import { Title } from '@/app/_components/ui/title';

function CharacterDetails({ character }: { character: ExtendedCharacter }) {
  return (
    <header className="flex flex-col items-center justify-center gap-1">
      <JobIcon job={character.job} />
      <Title content={character.name} />
      <p className="font-semibold text-zinc-400">{character.owner.name}</p>
    </header>
  );
}

function CharacterGear({ character }: { character: ExtendedCharacter }) {
  return (
    <section className="grid grid-cols-2 space-y-1 gap-x-4 p-4">
      {character.gear.map((gear) => (
        <div key={gear.id} className="flex items-center justify-center gap-1 last:col-start-2">
          <GearIcon gearSlot={gear.type} />
          <span>{GearStatusLabels[gear.status] ?? gear.status}</span>
        </div>
      ))}
    </section>
  );
}

export default async function CharacterData({ character }: { character: ExtendedCharacter }) {
  return (
    <>
      <CharacterDetails character={character} />
      <CharacterGear character={character} />
    </>
  );
}

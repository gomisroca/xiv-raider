import { BossLootMap, type PlanPriority } from '@/utils/enums';
import { GearIcon, JobIcon, LootIcon } from '@/app/_components/ui/icons';
import { getByPriority, getSortedCharacters } from '@/utils/mappers';
import { type GroupPlan } from 'generated/prisma';
import { type ExtendedCharacter } from 'types';

function PriorityDisplay({
  priorities,
  character,
}: {
  priorities: { priority: PlanPriority; chars: ExtendedCharacter[] }[];
  character: ExtendedCharacter;
}) {
  const priorityIndex = priorities.findIndex((p) => p.chars.includes(character));
  const priority = priorityIndex !== -1 ? priorityIndex + 1 : priorities.length + 1;
  const priorityColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-orange-400'];

  const bgColor = priorityColors[priority - 1] ?? 'bg-orange-400';

  return (
    <span className={`flex w-10 items-center justify-center gap-1 rounded-lg font-semibold ${bgColor}`}>
      {priority}
    </span>
  );
}

export default async function PlanBossList({ characters, plan }: { characters: ExtendedCharacter[]; plan: GroupPlan }) {
  const priorities = getByPriority(characters, plan);
  const sortedCharacters = getSortedCharacters(characters, plan, BossLootMap);

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      {Object.entries(sortedCharacters).map(([boss, needs]) => (
        <div key={boss}>
          <h2 className="text-lg font-semibold">{boss}</h2>
          {needs.length === 0 ? (
            <p className="pl-4 text-sm italic">No needs from this boss.</p>
          ) : (
            <ul className="flex list-disc flex-col gap-1 pl-4 odd:bg-zinc-500">
              {needs.map(({ character, needs }) => (
                <li key={character.id} className="flex items-center justify-start gap-1">
                  <PriorityDisplay priorities={priorities} character={character} />
                  <JobIcon job={character.job} />
                  <strong>{character.name}</strong>
                  {needs.map(({ slot, status }) => (
                    <span key={slot} className="mr-2 inline-flex items-center gap-1 rounded-lg bg-zinc-200 px-2 py-1">
                      <GearIcon gearSlot={slot} />
                      <LootIcon status={status} />
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

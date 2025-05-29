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
  const priorityColors = [
    'bg-green-400 dark:bg-green-600',
    'bg-blue-400 dark:bg-blue-600',
    'bg-yellow-400 dark:bg-yellow-600',
    'bg-orange-400  dark:bg-orange-600',
  ];

  const bgColor = priorityColors[priority - 1] ?? 'bg-orange-400 dark:bg-orange-600';

  return (
    <span className={`flex w-10 items-center justify-center gap-1 rounded-lg font-semibold ${bgColor}`}>
      {priority}
    </span>
  );
}

export default async function BossLootList({ characters, plan }: { characters: ExtendedCharacter[]; plan: GroupPlan }) {
  const priorities = getByPriority(characters, plan);
  const sortedCharacters = getSortedCharacters(characters, plan, BossLootMap);

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      {Object.entries(sortedCharacters).map(([boss, needs]) => (
        <div key={boss} className="w-full">
          <h2 className="text-lg font-semibold">{boss}</h2>
          {needs.length === 0 ? (
            <p className="pl-4 text-sm italic">No needs from this boss.</p>
          ) : (
            <ul className="flex list-none flex-col">
              {needs.map(({ character, needs }) => (
                // If you are the owner of the character, you can click on the this to mark it as done.
                // Have to add a filter to see already done loot (should be easy enough, just have to get 'BiS' too), we can click that too to unmark it.
                <li
                  key={character.id}
                  className="flex w-full items-center justify-between gap-1 py-1 transition-colors duration-200 ease-in-out odd:bg-zinc-100 hover:bg-zinc-300 odd:dark:bg-zinc-900 hover:dark:bg-zinc-700">
                  <section className="flex items-center justify-start gap-1">
                    <PriorityDisplay priorities={priorities} character={character} />
                    <JobIcon job={character.job} />
                    <strong>{character.name}</strong>
                  </section>
                  <section className="flex justify-end gap-1">
                    {needs.map(({ slot, status }) => (
                      <span
                        key={slot}
                        className="mr-2 inline-flex items-center gap-1 rounded-lg bg-zinc-200 px-2 py-1 dark:bg-zinc-800">
                        <GearIcon gearSlot={slot} />
                        <LootIcon status={status} />
                      </span>
                    ))}
                  </section>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

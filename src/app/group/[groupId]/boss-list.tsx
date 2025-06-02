'use client';

import { BossLootMap, type PlanPriority } from '@/utils/enums';
import { JobIcon } from '@/app/_components/ui/icons';
import { type SelectPlan, type ExtendedCharacter } from 'types';
import LootButton from './loot-button';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { getByPriority, getSortedCharacters } from '@/utils/mappers';

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

export default function BossLootList({
  groupId,
  characters,
  plan,
}: {
  groupId: string;
  characters: ExtendedCharacter[];
  plan: SelectPlan;
}) {
  const priorities = getByPriority(characters, plan);
  const sortedCharacters = getSortedCharacters(characters, plan, BossLootMap);

  const [collapsedBosses, setCollapsedBosses] = useState<Record<string, boolean>>({});

  const toggleCollapse = (boss: string) => {
    setCollapsedBosses((prev) => ({
      ...prev,
      [boss]: !prev[boss],
    }));
  };

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      {Object.entries(sortedCharacters).map(([boss, needs]) => {
        const isCollapsed = collapsedBosses[boss];

        return (
          <div key={boss} className="w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{boss}</h2>
              <button
                onClick={() => toggleCollapse(boss)}
                className="cursor-pointer p-2 text-sm text-sky-500 hover:underline dark:text-sky-600">
                {isCollapsed ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {!isCollapsed && (
              <>
                {needs.length === 0 ? (
                  <p className="pl-4 text-sm italic">No needs from this boss.</p>
                ) : (
                  <ul className="flex list-none flex-col">
                    {needs.map(({ character, needs }) => (
                      <li
                        key={character.id}
                        className="flex w-full items-center justify-between gap-1 py-1 transition-colors duration-200 ease-in-out odd:bg-zinc-100 hover:bg-zinc-300 odd:dark:bg-zinc-900 hover:dark:bg-zinc-700">
                        <section className="flex items-center justify-start gap-1">
                          <PriorityDisplay priorities={priorities} character={character} />
                          <JobIcon job={character.job} />
                          <strong>{character.name}</strong>
                        </section>
                        <section className="flex justify-end gap-1">
                          {needs.map(({ id, slot, lootType, status }) => (
                            <LootButton
                              key={slot}
                              groupId={groupId}
                              character={character}
                              gearId={id}
                              slot={slot}
                              lootType={lootType}
                              status={status}
                            />
                          ))}
                        </section>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

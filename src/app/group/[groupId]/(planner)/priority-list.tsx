import { getByPriority } from '@/utils/mappers';
import { type GroupPlan } from 'generated/prisma';
import { type ExtendedCharacter } from 'types';

export default async function PlanPriorityList({
  characters,
  plan,
}: {
  characters: ExtendedCharacter[];
  plan: GroupPlan;
}) {
  const charactersByPriority = getByPriority(characters, plan);

  return (
    <div className="flex items-start justify-evenly gap-2">
      {charactersByPriority.map(({ priority, chars }, idx) => (
        <div key={priority}>
          <p className="font-semibold">
            Priority #{idx + 1}: {priority}
          </p>
          <ul className="list-disc pl-4">
            {chars.map((char) => (
              <li key={char.id}>
                {char.name} ({char.job})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

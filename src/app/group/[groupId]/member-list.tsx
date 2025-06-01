import { JobIcon } from '@/app/_components/ui/icons';
import Link from '@/app/_components/ui/link';
import { PlanPriorityJobs, type PlanPriority } from '@/utils/enums';
import { type Session } from 'next-auth';
import { FaPencil } from 'react-icons/fa6';
import KickButton from './kick-button';
import { type SelectPlan, type ExtendedGroup } from 'types';

export default async function MemberList({
  group,
  plan,
  session,
}: {
  group: ExtendedGroup;
  plan: SelectPlan;
  session: Session | null;
}) {
  const priorities: PlanPriority[] = [plan.priority_1, plan.priority_2, plan.priority_3, plan.priority_4];

  // Create a map of priorities to characters
  const charactersByPriority = priorities.map((priority) => {
    const jobs = PlanPriorityJobs[priority];
    const chararacters = group.characters.filter((char) => jobs.includes(char.job)); // cast if needed
    return { priority, chararacters };
  });

  const characterOwner = session?.user.id === group.createdById;

  return (
    <div className="flex items-center justify-center gap-4">
      {charactersByPriority.map(({ priority, chararacters }, idx) => (
        <div key={priority} className="text-sm">
          <p className="font-medium">
            Priority #{idx + 1}: <span className="text-lg font-semibold">{priority}</span>
          </p>
          <ul className="flex list-none flex-col gap-1">
            {chararacters.map((character) => (
              <li key={character.id} className="flex w-full items-center justify-start">
                <Link
                  name={`View ${character.name}`}
                  href={`/group/${group.id}/${character.id}`}
                  className={`flex flex-1 items-center justify-start gap-1 font-semibold uppercase ${characterOwner && 'rounded-r-none'}`}>
                  <JobIcon job={character.job} />
                  <h6>{character.name}</h6>
                </Link>
                {characterOwner && (
                  <Link
                    name={`Update ${character.name}`}
                    href={`/group/${group.id}/${character.id}/update`}
                    className="rounded-l-none border-l-1 border-zinc-400 font-semibold uppercase">
                    <FaPencil />
                  </Link>
                )}
                {session?.user.id === group.createdById && (
                  <KickButton groupId={group.id} memberName={character.name} memberId={character.id} />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

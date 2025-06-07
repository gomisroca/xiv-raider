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
    <div className="grid w-full grid-cols-1 items-center justify-center gap-2 md:grid-cols-2 md:gap-4">
      {charactersByPriority.map(({ priority, chararacters }, idx) => (
        <div
          key={priority}
          className="flex w-full skew-x-6 skew-y-3 flex-col items-center justify-center gap-y-2 text-sm">
          <p className="font-medium">
            Priority #{idx + 1}: <span className="text-lg font-semibold uppercase">{priority}</span>
          </p>
          <ul className="flex list-none flex-col gap-2">
            {chararacters.map((character) => (
              <li key={character.id} className="flex items-center justify-start gap-1">
                <Link
                  name={`View ${character.name}`}
                  href={`/group/${group.id}/${character.id}`}
                  className="flex w-fit skew-x-0 skew-y-0 items-center justify-start gap-2 font-semibold uppercase hover:skew-x-0 hover:skew-y-0">
                  <JobIcon job={character.job} />
                  <span>{character.name}</span>
                </Link>
                {characterOwner && (
                  <Link
                    name={`Update ${character.name}`}
                    href={`/group/${group.id}/${character.id}/update`}
                    className="border-r-none skew-x-0 skew-y-0 border-zinc-400 font-semibold uppercase hover:skew-x-0 hover:skew-y-0">
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

import { getPlan } from '@/server/queries/plans';
import { type Prisma } from 'generated/prisma';
import PlanPriorityList from './priority-list';
import PlanBossList from './boss-list';

type ExtendedGroup = Prisma.GroupGetPayload<{
  include: {
    createdBy: true;
    members: true;
    characters: {
      include: { owner: true; gear: true };
    };
  };
}>;

export default async function PlanWidget({ group }: { group: ExtendedGroup }) {
  const plan = await getPlan(group.id);
  if (!plan || !group) return null;

  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <PlanPriorityList characters={group.characters} plan={plan} />
      <PlanBossList characters={group.characters} plan={plan} />
    </div>
  );
}

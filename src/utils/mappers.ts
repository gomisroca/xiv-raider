import { type GearSlot, type GearStatus, type GroupPlan } from 'generated/prisma';
import { PlanPriorityJobs, type PlanPriority } from './enums';
import { type ExtendedCharacter } from 'types';

export function getBossNeeds(
  characters: ExtendedCharacter[],
  bossLootMap: Record<string, { slot: GearSlot; status: GearStatus }[]>
): Record<
  string,
  {
    character: ExtendedCharacter;
    needs: { slot: GearSlot; status: GearStatus }[];
  }[]
> {
  const result: Record<string, { character: ExtendedCharacter; needs: { slot: GearSlot; status: GearStatus }[] }[]> =
    {};

  for (const [boss, loot] of Object.entries(bossLootMap)) {
    result[boss] = characters
      .map((char) => {
        const needs = char.gear
          .filter((gear) => loot.some((drop) => drop.slot === gear.type && drop.status === gear.status))
          .map((gear) => ({ slot: gear.type, status: gear.status }));

        return needs.length > 0 ? { character: char, needs } : null;
      })
      .filter(Boolean) as {
      character: ExtendedCharacter;
      needs: { slot: GearSlot; status: GearStatus }[];
    }[];
  }

  return result;
}

export function getByPriority(
  characters: ExtendedCharacter[],
  plan: GroupPlan
): { priority: PlanPriority; chars: ExtendedCharacter[] }[] {
  const priorities: PlanPriority[] = [plan.priority_1, plan.priority_2, plan.priority_3, plan.priority_4];

  const charactersByPriority = priorities.map((priority) => {
    const jobs = PlanPriorityJobs[priority];
    const chars = characters.filter((char) => jobs.includes(char.job));
    return { priority, chars };
  });

  return charactersByPriority;
}

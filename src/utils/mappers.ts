import { type GearStatus, type LootType, type GearSlot } from 'generated/prisma';
import { PlanPriorityJobs, type PlanPriority } from './enums';
import { type SelectPlan, type ExtendedCharacter } from 'types';

export function getBossNeeds(
  characters: ExtendedCharacter[],
  bossLootMap: Record<string, { slot: GearSlot; lootType: LootType }[]>
): Record<
  string,
  {
    character: ExtendedCharacter;
    needs: { id: string; slot: GearSlot; lootType: LootType; status: GearStatus }[];
  }[]
> {
  const result: Record<
    string,
    { character: ExtendedCharacter; needs: { id: string; slot: GearSlot; lootType: LootType; status: GearStatus }[] }[]
  > = {};

  for (const [boss, loot] of Object.entries(bossLootMap)) {
    result[boss] = characters
      .map((char) => {
        const needs = char.gear
          .filter((gear) => loot.some((drop) => drop.slot === gear.type && drop.lootType === gear.lootType))
          .map((gear) => ({ id: gear.id, slot: gear.type, lootType: gear.lootType, status: gear.status }));

        return needs.length > 0 ? { character: char, needs } : null;
      })
      .filter(Boolean) as {
      character: ExtendedCharacter;
      needs: { id: string; slot: GearSlot; lootType: LootType; status: GearStatus }[];
    }[];
  }

  return result;
}

export function getByPriority(
  characters: ExtendedCharacter[],
  plan: SelectPlan
): { priority: PlanPriority; chars: ExtendedCharacter[] }[] {
  const priorities: PlanPriority[] = [plan.priority_1, plan.priority_2, plan.priority_3, plan.priority_4];

  const charactersByPriority = priorities.map((priority) => {
    const jobs = PlanPriorityJobs[priority];
    const chars = characters.filter((char) => jobs.includes(char.job));
    return { priority, chars };
  });

  return charactersByPriority;
}

type SortedLoot = Record<
  string,
  {
    character: ExtendedCharacter;
    needs: { id: string; slot: GearSlot; lootType: LootType; status: GearStatus }[];
    priority: number;
  }[]
>;

export function getSortedCharacters(
  characters: ExtendedCharacter[],
  plan: SelectPlan,
  bossLootMap: Record<string, { slot: GearSlot; lootType: LootType }[]>
): SortedLoot {
  const priorities = getByPriority(characters, plan);
  const bossNeeds = getBossNeeds(characters, bossLootMap);

  const priorityMap = new Map<string, number>();
  priorities.forEach((p, index) => {
    p.chars.forEach((char) => {
      priorityMap.set(char.id, index);
    });
  });

  const sorted: SortedLoot = {};

  for (const [boss, needs] of Object.entries(bossNeeds)) {
    sorted[boss] = needs
      .map((entry) => ({
        ...entry,
        priority: priorityMap.get(entry.character.id) ?? Infinity,
      }))
      .sort((a, b) => a.priority - b.priority);
  }

  return sorted;
}

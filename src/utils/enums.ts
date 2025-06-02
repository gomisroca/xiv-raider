import { GearSlot, type GearStatus, type Job, LootType } from 'generated/prisma';

export const GearSlots = [
  'Weapon',
  'Head',
  'Body',
  'Gloves',
  'Legs',
  'Feet',
  'Earrings',
  'Necklace',
  'Bracelet',
  'Ring1',
  'Ring2',
] as const;
export const GearStatuses = ['Obtained', 'Unobtained'] as const;
export const LootTypes = ['Tomestone', 'RaidDrop'] as const;

export const GearSlotLabels: Record<GearSlot, string> = {
  Weapon: 'Weapon',
  Head: 'Head',
  Body: 'Body',
  Gloves: 'Gloves',
  Legs: 'Legs',
  Feet: 'Feet',
  Earrings: 'Earrings',
  Necklace: 'Necklace',
  Bracelet: 'Bracelet',
  Ring1: 'Ring',
  Ring2: 'Ring',
};

export const GearStatusLabels: Record<GearStatus, string> = {
  Obtained: '✔️',
  Unobtained: '✖️',
};

export const LootTypeLabels: Record<LootType, string> = {
  Tomestone: 'Tomestone',
  RaidDrop: 'Raid Drop',
};

export const Jobs = [
  'WAR',
  'PLD',
  'DRK',
  'GNB',
  'WHM',
  'SCH',
  'AST',
  'SGE',
  'MNK',
  'SAM',
  'RPR',
  'DRG',
  'NIN',
  'VPR',
  'BRD',
  'MCH',
  'DNC',
  'BLM',
  'PCT',
  'SMN',
  'RDM',
] as const;

export const PlanPriorities = ['Melee', 'Ranged', 'Tank', 'Healer'] as const;
export const PlanPriorityJobs: Record<PlanPriority, Job[]> = {
  Melee: ['MNK', 'SAM', 'RPR', 'DRG', 'NIN', 'VPR'],
  Ranged: ['BRD', 'MCH', 'DNC', 'BLM', 'PCT', 'SMN', 'RDM'],
  Tank: ['WAR', 'PLD', 'DRK', 'GNB'],
  Healer: ['WHM', 'SCH', 'AST', 'SGE'],
};

export const BossLootMap: Record<string, { slot: GearSlot; lootType: LootType }[]> = {
  'Dancing Green': [
    {
      slot: GearSlot.Earrings,
      lootType: LootType.RaidDrop,
    },
    {
      slot: GearSlot.Necklace,
      lootType: LootType.RaidDrop,
    },
    {
      slot: GearSlot.Bracelet,
      lootType: LootType.RaidDrop,
    },
    {
      slot: GearSlot.Ring1,
      lootType: LootType.RaidDrop,
    },
    {
      slot: GearSlot.Ring2,
      lootType: LootType.RaidDrop,
    },
  ],
  'Sugar Riot': [
    {
      slot: GearSlot.Feet,
      lootType: LootType.RaidDrop,
    },
    {
      slot: GearSlot.Gloves,
      lootType: LootType.RaidDrop,
    },
    {
      slot: GearSlot.Head,
      lootType: LootType.RaidDrop,
    },
    {
      slot: GearSlot.Earrings,
      lootType: LootType.Tomestone,
    },
    {
      slot: GearSlot.Necklace,
      lootType: LootType.Tomestone,
    },
    {
      slot: GearSlot.Bracelet,
      lootType: LootType.Tomestone,
    },
    {
      slot: GearSlot.Ring1,
      lootType: LootType.Tomestone,
    },
    {
      slot: GearSlot.Ring2,
      lootType: LootType.Tomestone,
    },
  ],
  'Brute Abombinator': [
    {
      slot: GearSlot.Body,
      lootType: LootType.RaidDrop,
    },
    {
      slot: GearSlot.Legs,
      lootType: LootType.RaidDrop,
    },
    {
      slot: GearSlot.Head,
      lootType: LootType.Tomestone,
    },
    {
      slot: GearSlot.Body,
      lootType: LootType.Tomestone,
    },
    {
      slot: GearSlot.Gloves,
      lootType: LootType.Tomestone,
    },
    {
      slot: GearSlot.Legs,
      lootType: LootType.Tomestone,
    },
    {
      slot: GearSlot.Feet,
      lootType: LootType.Tomestone,
    },
    {
      slot: GearSlot.Weapon,
      lootType: LootType.Tomestone,
    },
  ],
  'Howling Blade': [
    {
      slot: GearSlot.Weapon,
      lootType: LootType.RaidDrop,
    },
  ],
};

export type PlanPriority = (typeof PlanPriorities)[number];

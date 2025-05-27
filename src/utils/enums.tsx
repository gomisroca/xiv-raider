import { GearSlot, GearStatus } from 'generated/prisma';
import type { ReactElement } from 'react';
import {
  GiVisoredHelm,
  GiArmorVest,
  GiGloves,
  GiBroadsword,
  GiLegArmor,
  GiBoots,
  GiEarrings,
  GiNecklace,
  GiBracer,
  GiRing,
} from 'react-icons/gi';

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
export const GearSlotIcons: Record<GearSlot, ReactElement> = {
  Weapon: <GiBroadsword size={20} />,
  Head: <GiVisoredHelm size={20} />,
  Body: <GiArmorVest size={20} />,
  Gloves: <GiGloves size={20} />,
  Legs: <GiLegArmor size={20} />,
  Feet: <GiBoots size={20} />,
  Earrings: <GiEarrings size={20} />,
  Necklace: <GiNecklace size={20} />,
  Bracelet: <GiBracer size={20} />,
  Ring1: <GiRing size={20} />,
  Ring2: <GiRing size={20} />,
};

export const GearStatuses = ['BiS', 'NeedsTomestone', 'NeedsRaidDrop'] as const;
export const GearStatusLabels: Record<GearStatus, string> = {
  BiS: 'Best in Slot',
  NeedsTomestone: 'Tomestone',
  NeedsRaidDrop: 'Raid Drop',
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

export const BossLootMap: Record<string, { slot: GearSlot; status: GearStatus }[]> = {
  'Dancing Green': [
    {
      slot: GearSlot.Earrings,
      status: GearStatus.NeedsRaidDrop,
    },
    {
      slot: GearSlot.Necklace,
      status: GearStatus.NeedsRaidDrop,
    },
    {
      slot: GearSlot.Bracelet,
      status: GearStatus.NeedsRaidDrop,
    },
    {
      slot: GearSlot.Ring1,
      status: GearStatus.NeedsRaidDrop,
    },
    {
      slot: GearSlot.Ring2,
      status: GearStatus.NeedsRaidDrop,
    },
  ],
  'Sugar Riot': [
    {
      slot: GearSlot.Feet,
      status: GearStatus.NeedsRaidDrop,
    },
    {
      slot: GearSlot.Gloves,
      status: GearStatus.NeedsRaidDrop,
    },
    {
      slot: GearSlot.Head,
      status: GearStatus.NeedsRaidDrop,
    },
    {
      slot: GearSlot.Earrings,
      status: GearStatus.NeedsTomestone,
    },
    {
      slot: GearSlot.Necklace,
      status: GearStatus.NeedsTomestone,
    },
    {
      slot: GearSlot.Bracelet,
      status: GearStatus.NeedsTomestone,
    },
    {
      slot: GearSlot.Ring1,
      status: GearStatus.NeedsTomestone,
    },
    {
      slot: GearSlot.Ring2,
      status: GearStatus.NeedsTomestone,
    },
  ],
  'Brute Abombinator': [
    {
      slot: GearSlot.Body,
      status: GearStatus.NeedsRaidDrop,
    },
    {
      slot: GearSlot.Legs,
      status: GearStatus.NeedsRaidDrop,
    },
    {
      slot: GearSlot.Head,
      status: GearStatus.NeedsTomestone,
    },
    {
      slot: GearSlot.Body,
      status: GearStatus.NeedsTomestone,
    },
    {
      slot: GearSlot.Gloves,
      status: GearStatus.NeedsTomestone,
    },
    {
      slot: GearSlot.Legs,
      status: GearStatus.NeedsTomestone,
    },
    {
      slot: GearSlot.Feet,
      status: GearStatus.NeedsTomestone,
    },
    {
      slot: GearSlot.Weapon,
      status: GearStatus.NeedsTomestone,
    },
  ],
  'Howling Blade': [
    {
      slot: GearSlot.Weapon,
      status: GearStatus.NeedsRaidDrop,
    },
  ],
};

export type Job = (typeof Jobs)[number];
export type PlanPriority = (typeof PlanPriorities)[number];
export type GearSlots = (typeof GearSlots)[number];
export type GearStatuses = (typeof GearStatuses)[number];

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

export const GearStatuses = ['BiS', 'NeedsTomestone', 'NeedsRaidDrop'] as const;

export const PlanPriorities = ['Melee', 'Ranged', 'Tank', 'Healer'] as const;

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

export const GearStatusLabels: Record<GearStatus, string> = {
  BiS: 'Best in Slot',
  NeedsTomestone: 'Need Tomestone',
  NeedsRaidDrop: 'Need Raid Drop',
};

export type GearSlot = (typeof GearSlots)[number];
export type GearStatus = (typeof GearStatuses)[number];

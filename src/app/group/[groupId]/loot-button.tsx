'use client';

import { updateGearSlot } from '@/actions/characters';
import Button from '@/app/_components/ui/button';
import { GearIcon, LootIcon } from '@/app/_components/ui/icons';
import { type LootType, type GearSlot, type GearStatus } from 'generated/prisma';
import { type ExtendedCharacter } from 'types';

export default function LootButton({
  character,
  gearId,
  slot,
  lootType,
  status,
}: {
  character: ExtendedCharacter;
  gearId: string;
  slot: GearSlot;
  lootType: LootType;
  status: GearStatus;
}) {
  const handleStatusChange = async () => {
    await updateGearSlot({
      groupId: character.groupId,
      gearId,
    });
  };

  return (
    <Button
      name="Update Gear Slot"
      onClick={() => handleStatusChange()}
      className={`mr-2 inline-flex w-fit items-center gap-1 rounded-lg bg-zinc-200 px-2 py-1 hover:bg-sky-500 dark:bg-zinc-800 dark:hover:bg-sky-600 ${status === 'Obtained' && 'opacity-35 hover:opacity-70'}`}>
      <GearIcon gearSlot={slot} />
      <LootIcon lootType={lootType} />
    </Button>
  );
}

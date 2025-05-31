'use client';

import { updateGearSlot } from '@/actions/characters';
import Button from '@/app/_components/ui/button';
import { GearIcon, LootIcon } from '@/app/_components/ui/icons';
import { messageAtom } from '@/atoms/message';
import { type LootType, type GearSlot, type GearStatus } from 'generated/prisma';
import { useSetAtom } from 'jotai';
import { type ActionReturn, type ExtendedCharacter } from 'types';

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
  const setMessage = useSetAtom(messageAtom);

  const handleStatusChange = async () => {
    const newStatus = status === 'Obtained' ? 'Unobtained' : 'Obtained';
    const confirmed = confirm(`Are you sure you want to mark ${character.name}'s ${slot} as ${newStatus}?`);

    if (!confirmed) return;

    const action: ActionReturn = await updateGearSlot({
      groupId: character.groupId,
      gearId,
    });

    setMessage({
      content: action.message,
      error: action.error,
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

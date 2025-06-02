'use client';

import { updateGearSlot } from '@/actions/characters';
import Button from '@/app/_components/ui/button';
import { GearIcon, LootIcon } from '@/app/_components/ui/icons';
import { messageAtom } from '@/atoms/message';
import { GearSlotLabels } from '@/utils/enums';
import { type LootType, type GearSlot, type GearStatus } from 'generated/prisma';
import { useSetAtom } from 'jotai';
import { startTransition, useOptimistic } from 'react';
import { type ActionReturn, type ExtendedCharacter } from 'types';

export default function LootButton({
  groupId,
  character,
  gearId,
  slot,
  lootType,
  status,
}: {
  groupId: string;
  character: ExtendedCharacter;
  gearId: string;
  slot: GearSlot;
  lootType: LootType;
  status: GearStatus;
}) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic<GearStatus>(status);
  const setMessage = useSetAtom(messageAtom);

  const handleStatusChange = async () => {
    const newStatus = status === 'Obtained' ? 'Unobtained' : 'Obtained';
    startTransition(() => {
      setOptimisticStatus(newStatus);
    });
    const confirmed = confirm(
      `Are you sure you want to mark ${character.name}'s ${GearSlotLabels[slot] ?? slot} as ${newStatus}?`
    );

    if (!confirmed) return;

    const action: ActionReturn = await updateGearSlot({
      groupId,
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
      className={`mr-2 inline-flex w-fit items-center gap-1 rounded-lg bg-zinc-200 px-2 py-1 hover:bg-sky-500 dark:bg-zinc-800 dark:hover:bg-sky-600 ${optimisticStatus === 'Obtained' && 'opacity-35 hover:opacity-70'}`}>
      <GearIcon gearSlot={slot} />
      <LootIcon lootType={lootType} />
    </Button>
  );
}

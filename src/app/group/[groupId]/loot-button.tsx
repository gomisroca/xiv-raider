'use client';

import { updateGearSlot } from '@/actions/characters';
import Button from '@/app/_components/ui/button';
import { GearIcon, LootIcon } from '@/app/_components/ui/icons';
import { messageAtom } from '@/atoms/message';
import { GearSlotLabels } from '@/utils/enums';
import { toErrorMessage } from '@/utils/errors';
import { type LootType, type GearSlot, type GearStatus } from 'generated/prisma';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { type ExtendedCharacter } from 'types';

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
  const [optimisticStatus, setOptimisticStatus] = useState<GearStatus>(status);
  const setMessage = useSetAtom(messageAtom);

  const handleStatusChange = async () => {
    const oldStatus = optimisticStatus;
    try {
      const newStatus = optimisticStatus === 'Obtained' ? 'Unobtained' : 'Obtained';

      const confirmed = confirm(
        `Are you sure you want to mark ${character.name}'s ${GearSlotLabels[slot] ?? slot} as ${newStatus}?`
      );
      if (!confirmed) return;

      // Optimistically set the status and message
      setOptimisticStatus(newStatus);
      setMessage({
        content: `${character.name}'s ${GearSlotLabels[slot] ?? slot} status was set to ${newStatus.toLowerCase()}`,
        error: false,
      });

      await updateGearSlot({
        groupId,
        gearId,
      });
    } catch (error) {
      // Update the status and message if an error occurred
      setOptimisticStatus(oldStatus);
      setMessage({
        content: toErrorMessage(error, 'Failed to update character'),
        error: true,
      });
    }
  };

  return (
    <Button
      name="Update Gear Slot"
      onClick={handleStatusChange}
      className={`inline-flex h-fit w-fit items-center gap-[2px] p-1 *:skew-2 *:px-1 *:py-[2px] md:gap-1 ${optimisticStatus === 'Obtained' ? 'opacity-35 hover:opacity-70' : ''}`}>
      <GearIcon gearSlot={slot} />
      <LootIcon lootType={lootType} />
    </Button>
  );
}

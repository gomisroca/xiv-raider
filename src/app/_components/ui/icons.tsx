import Image from 'next/image';
import { Job, LootType } from 'generated/prisma';

export function JobIcon({ job }: { job: Job }) {
  return (
    <Image
      className="h-[24px] w-[24px] md:h-[30px] md:w-[30px]"
      alt={job}
      src={`/jobs/${job}.png`}
      width="30"
      height="30"
    />
  );
}

export function GearIcon({ gearSlot }: { gearSlot: string }) {
  if (gearSlot === 'Ring1' || gearSlot === 'Ring2') gearSlot = 'Ring';
  return (
    <div className="flex h-[20px] w-[20px] items-center justify-center rounded-lg bg-zinc-100 md:h-[30px] md:w-[30px] dark:bg-zinc-900">
      <Image
        alt={gearSlot}
        src={`/items/${gearSlot}.png`}
        width="25"
        height="25"
        className="brightness-0 dark:brightness-200"
      />
    </div>
  );
}

export function LootIcon({ lootType }: { lootType: LootType }) {
  return (
    <Image
      className="h-[20px] w-[20px] md:h-[30px] md:w-[30px]"
      alt={lootType === 'RaidDrop' ? 'chest' : 'tomestone'}
      src={`/items/${lootType === 'RaidDrop' ? 'chest' : 'tomestone'}.png`}
      width="30"
      height="30"
    />
  );
}

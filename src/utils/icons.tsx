import Image from 'next/image';
import { type Job } from './enums';

export function JobIcon({ job }: { job: Job }) {
  return <Image alt={job} src={`/jobs/${job}.png`} width="30" height="30" />;
}

export function GearIcon({ gearSlot }: { gearSlot: string }) {
  if (gearSlot === 'Ring1' || gearSlot === 'Ring2') gearSlot = 'Ring';
  return <Image alt={gearSlot} src={`/items/${gearSlot}.png`} width="30" height="30" className="contrast-200" />;
}

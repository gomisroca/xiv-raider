'use client';

import { redirect } from 'next/navigation';
import Button from './_components/ui/button';
import type { Session } from 'next-auth';
import { GoPlus } from 'react-icons/go';
import { twMerge } from 'tailwind-merge';

export default function CreateButton({
  session,
  size = 'normal',
}: {
  session: Session | null;
  size?: 'normal' | 'small';
}) {
  if (!session) return null;
  return (
    <Button
      onClick={() => redirect('/create')}
      name="Create group"
      skew="high"
      className={twMerge(
        'group max-w-xl text-2xl font-semibold uppercase md:text-4xl',
        size === 'small' ? 'h-30 w-full md:h-40' : 'h-96 w-full md:h-86'
      )}>
      <GoPlus
        className={twMerge(
          'pointer-events-none transition duration-200 ease-in-out group-active:scale-75',
          size === 'small' ? 'h-30 w-30' : 'h-64 w-64 md:h-72 md:w-72'
        )}
      />
    </Button>
  );
}

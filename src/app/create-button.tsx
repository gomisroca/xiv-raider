'use client';

import { signIn } from 'next-auth/react';
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
  const handleCreate = async () => {
    if (!session) {
      const confirmed = confirm('You must be logged in to create a group.');
      if (!confirmed) return;

      await signIn('discord');
    } else redirect('/create');
  };

  return (
    <Button
      onClick={handleCreate}
      name="Create group"
      className={twMerge(
        'group w-full max-w-xl text-2xl font-semibold uppercase md:h-86 md:text-4xl',
        size === 'small' ? 'h-16 w-20 md:h-20' : 'h-44'
      )}>
      <GoPlus
        className={twMerge(
          'pointer-events-none h-72 w-72 transition duration-200 ease-in-out group-active:scale-75',
          size === 'small' ? 'h-20 w-20' : 'h-72 w-72'
        )}
      />
    </Button>
  );
}

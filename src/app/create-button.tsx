'use client';

import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Button from './_components/ui/button';
import type { Session } from 'next-auth';
import { GoPlus } from 'react-icons/go';

export default function CreateButton({ session }: { session: Session | null }) {
  const handleCreate = async () => {
    if (!session && window.confirm('You must be logged in to create a group.')) await signIn('discord');
    else redirect('/create');
  };

  return (
    <Button
      onClick={handleCreate}
      name="Create group"
      className="group h-44 w-full max-w-xl text-2xl font-semibold uppercase md:h-86 md:text-4xl">
      <GoPlus className="pointer-events-none h-72 w-72 transition duration-200 ease-in-out group-active:scale-75" />
    </Button>
  );
}

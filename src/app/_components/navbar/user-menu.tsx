'use client';

import { type Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Button from '@/app/_components/ui/button';
import { FaKey } from 'react-icons/fa6';
import { IoExit } from 'react-icons/io5';

export default function UserMenu({ session }: { session: Session | null }) {
  return (
    <Button
      onClick={() => (session ? signOut() : signIn('discord'))}
      name={session ? 'Log Out' : 'Log In'}
      skew="high"
      className="-translate-x-3 -translate-y-19 shadow-md">
      {session ? <IoExit size={20} /> : <FaKey size={20} />}
    </Button>
  );
}

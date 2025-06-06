'use client';

import { type Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Button from '@/app/_components/ui/button';
import { FaKey } from 'react-icons/fa6';
import { MdExitToApp } from 'react-icons/md';

export default function UserMenu({ session }: { session: Session | null }) {
  return (
    <>
      {session ? (
        <Button onClick={() => signOut()} name="User menu" className="shadow-md">
          <MdExitToApp size={20} />
        </Button>
      ) : (
        <Button onClick={() => signIn('discord')} name="Log in" className="shadow-md">
          <FaKey size={20} />
        </Button>
      )}
    </>
  );
}

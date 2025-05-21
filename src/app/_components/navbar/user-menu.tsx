'use client';

import { type Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Button from '@/app/_components/ui/button';
import { FaKey, FaUser } from 'react-icons/fa6';

export default function UserMenu({ session }: { session: Session | null }) {
  return (
    <>
      {session ? (
        <Button onClick={() => signOut()} name="User menu">
          <FaUser size={20} />
        </Button>
      ) : (
        <Button onClick={() => signIn('discord')} name="Log in">
          <FaKey size={20} />
        </Button>
      )}
    </>
  );
}

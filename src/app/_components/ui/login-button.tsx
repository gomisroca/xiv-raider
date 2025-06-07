'use client';

import { signIn } from 'next-auth/react';
import Button from './button';
import { twMerge } from 'tailwind-merge';
import { FaKey } from 'react-icons/fa6';

export default function LoginButton({ size = 'normal' }: { size?: 'normal' | 'large' }) {
  return (
    <Button
      name="Login"
      onClick={() => signIn('discord')}
      className={twMerge(
        'mx-auto gap-2 px-4 font-semibold tracking-wide uppercase',
        size === 'large' ? 'h-14 w-2/3 text-4xl md:h-20' : 'w-fit'
      )}>
      <FaKey size={30} />
      <span>Login</span>
    </Button>
  );
}

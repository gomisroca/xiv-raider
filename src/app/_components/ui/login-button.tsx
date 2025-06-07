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
        'gap-2 font-semibold tracking-wide uppercase',
        size === 'large' ? 'h-18 w-2/3 text-4xl' : 'w-full'
      )}>
      <div className="flex items-center justify-center gap-1">
        <FaKey size={30} />
        <span>Login</span>
      </div>
    </Button>
  );
}

'use client';

/**
 * Display a message to the user, with an optional error state. Uses jotai's atoms to store the message.
 *
 * @example
 * setMessage({ content: 'Hello, world!', error: false })
 */

import { messageAtom } from '@/atoms/message';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const Message = () => {
  const [message, setMessage] = useAtom(messageAtom); // Hook to get and set the message atom

  const pathname = usePathname(); // Get the current path

  // Clear message and error on route change
  useEffect(() => {
    if (message) {
      setMessage(null);
    }
  }, [pathname]);

  // Automatically hide popup after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage(null);
    }, 5000);

    // Cleanup timeout when popup state changes
    return () => clearTimeout(timeout);
  }, [message]);

  if (!message) return null;

  return (
    <dialog
      className={twMerge(
        'fixed right-0 bottom-10 left-0 z-[9999] m-auto flex w-[90vw] flex-col items-center justify-center gap-2 rounded-lg bg-sky-500 p-2 text-lg font-semibold text-zinc-50 transition duration-200 ease-in-out xl:w-[30vw] dark:bg-sky-600 dark:text-zinc-200',
        message.error && 'bg-rose-500 dark:bg-rose-600'
      )}>
      {message.content}
    </dialog>
  );
};

export default Message;

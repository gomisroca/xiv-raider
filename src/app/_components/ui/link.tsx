/**
 * Wrapper of Next's Link component with established styling and functionality.
 *
 * @example
 * <Link href="/about" className="w-full">About</Link>
 */

import NextLink from 'next/link';
import { twMerge } from 'tailwind-merge';

interface Props {
  href: string;
  children: React.ReactNode;
  name: string;
  className?: string;
}

function Link({ href, children, name, className }: Props) {
  return (
    <div
      className={twMerge(
        'group flex h-[50px] w-[55px] skew-x-6 skew-y-3 cursor-pointer bg-black p-2 transition duration-200 ease-in-out hover:z-10 hover:scale-125 hover:skew-5 active:scale-90 active:skew-2 active:shadow-lg dark:bg-white',
        className
      )}>
      <NextLink
        href={href}
        aria-label={name}
        className="flex w-full skew-1 cursor-pointer items-center justify-center bg-sky-500 p-2 font-semibold text-black uppercase transition duration-200 ease-in-out group-hover:bg-sky-400 dark:bg-sky-600 dark:text-white dark:group-hover:bg-sky-500">
        {children}
      </NextLink>
    </div>
  );
}

export default Link;

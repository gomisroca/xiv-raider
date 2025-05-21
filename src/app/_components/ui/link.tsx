/**
 * Wrapper of Next's Link component with established styling and functionality.
 *
 * @example
 * <Link href="/about" className="w-full">About</Link>
 */

const pulseAnimation = `
  @keyframes pulse-scale {
    0% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.05) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }
`;

import NextLink from 'next/link';
import { twMerge } from 'tailwind-merge';

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function Link({ href, children, className }: Props) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pulseAnimation }} />
      <NextLink
        href={href}
        className={twMerge(
          'dark:text- flex h-[36px] cursor-pointer items-center justify-center rounded-lg bg-sky-500 p-2 text-zinc-50 transition duration-200 ease-in-out hover:animate-[pulse-scale_1.5s_ease-in-out_infinite] active:scale-90 active:rotate-[-1deg] active:animate-none active:shadow-lg dark:bg-sky-600 dark:text-zinc-200',
          className
        )}>
        {children}
      </NextLink>
    </>
  );
}

export default Link;

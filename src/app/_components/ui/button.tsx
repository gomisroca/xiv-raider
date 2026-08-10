'use client';

/**
 * Button component with established styling and functionality.
 *
 * @example
 * <Button type="submit" name="Submit" onClick={() => console.log('Button clicked!')}>Submit</Button>
 */

import { twMerge } from 'tailwind-merge';

interface Props {
  onClick?: () => void;
  type?: 'submit' | 'button';
  name: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

function Button({ onClick, type = 'button', name, disabled = false, children, className }: Props) {
  return (
    <div
      className={twMerge(
        'group flex h-12.5 w-13.75 cursor-pointer bg-black p-2 transition duration-200 ease-in-out hover:z-10 hover:scale-125 active:scale-90 active:shadow-lg dark:bg-white',
        className
      )}>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={name}
        className={twMerge(
          'flex w-full cursor-pointer items-center justify-center bg-sky-500 font-semibold text-black uppercase transition duration-200 ease-in-out *:pointer-events-none *:w-full *:text-black group-hover:bg-sky-400 dark:bg-sky-600 dark:text-white dark:*:text-white dark:group-hover:bg-sky-500',
          disabled &&
            'cursor-not-allowed bg-transparent opacity-50 hover:bg-transparent active:bg-transparent dark:bg-transparent dark:hover:bg-transparent dark:active:bg-transparent'
        )}>
        {children}
      </button>
    </div>
  );
}

export default Button;

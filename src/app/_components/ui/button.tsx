'use client';

/**
 * Button component with established styling and functionality.
 *
 * @example
 * <Button type="submit" name="Submit" onClick={() => console.log('Button clicked!')}>Submit</Button>
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
    <>
      <style dangerouslySetInnerHTML={{ __html: pulseAnimation }} />
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={twMerge(
          'flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-lg bg-sky-500 p-2 transition duration-200 ease-in-out *:text-zinc-50 hover:animate-[pulse-scale_1.5s_ease-in-out_infinite] active:scale-90 active:rotate-[-1deg] active:animate-none active:shadow-lg dark:bg-sky-600 dark:*:text-zinc-200',
          className,
          disabled &&
            'cursor-not-allowed bg-transparent opacity-50 hover:animate-none hover:bg-transparent active:bg-transparent dark:bg-transparent dark:hover:bg-transparent dark:active:bg-transparent'
        )}>
        <span className="sr-only">{name}</span>
        {children}
      </button>
    </>
  );
}

export default Button;

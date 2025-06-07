import { twMerge } from 'tailwind-merge';

export function Title({
  content,
  size = 'normal',
  className,
}: {
  content: string;
  size?: 'normal' | 'large';
  className?: string;
}) {
  const mainSize = size === 'normal' ? 'text-2xl md:text-3xl' : 'text-2xl md:text-5xl';

  return (
    <div className={twMerge('pointer-events-none relative skew-1 text-center', className)}>
      <h2
        className={twMerge(
          'relative z-10 flex items-center justify-start gap-2 font-semibold tracking-widest uppercase',
          mainSize
        )}>
        {content.split(' ').map((word, wordIndex) => (
          <span key={wordIndex} className="relative inline-block">
            <span className="relative text-black dark:text-white">
              <span className={mainSize}>{word[0]}</span>
              <span>{word.slice(1)}</span>
            </span>

            {wordIndex < content.split(' ').length - 1 && ' '}
          </span>
        ))}
      </h2>
    </div>
  );
}

import { twMerge } from 'tailwind-merge';

export async function Title({ content, size = 'normal' }: { content: string; size?: 'normal' | 'large' }) {
  return (
    <div className="px-4 text-center">
      <h2
        className={twMerge(
          'flex items-center gap-2 font-semibold tracking-widest uppercase',
          size === 'normal' ? 'text-2xl md:text-3xl' : 'text-2xl md:text-5xl'
        )}>
        {content.split(' ').map((word, wordIndex) => (
          <span key={wordIndex} className="flex items-start">
            <span
              className={twMerge('text-sky-500', size === 'normal' ? 'text-3xl md:text-4xl' : 'text-3xl md:text-6xl')}>
              {word[0]}
            </span>
            <span>{word.slice(1)}</span>
            {wordIndex < content.split(' ').length - 1 && ' '}
          </span>
        ))}
      </h2>
      <div className="mx-auto h-1 w-24 rounded-full bg-sky-500"></div>
    </div>
  );
}

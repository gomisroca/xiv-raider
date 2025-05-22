/**
 * Loading spinner component with customizable size and color.
 *
 * @example
 * <LoadingSpinner size="small" />
 */

// Options for size and color
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export default function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-dotted border-sky-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:border-r-transparent`}
        role="status"
        aria-label="Loading">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !border-0 !p-0 !whitespace-nowrap ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}

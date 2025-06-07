'use client';

/**
 * Button to submit a form. Uses `useFormStatus` hook to determine if the form is pending or not.
 *
 * @example
 * <SubmitButton baseText="Submit" pendingText="Submitting..." />
 */

// Libraries
import { useFormStatus } from 'react-dom';
import { twMerge } from 'tailwind-merge';
// Components
import Button from '@/app/_components/ui/button';

export default function SubmitButton({
  baseText,
  pendingText,
  className,
}: {
  baseText: string;
  pendingText: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      name={baseText}
      className={twMerge('w-full font-semibold whitespace-nowrap', className)}
      disabled={pending}>
      {pending ? pendingText : baseText}
    </Button>
  );
}

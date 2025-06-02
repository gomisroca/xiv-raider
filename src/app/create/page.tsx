import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import CreateGroupForm from '@/app/create/form';
import { type Metadata } from 'next';
import { withSessionAccess } from '@/utils/wrappers/withSessionAccess';

export const metadata: Metadata = {
  title: 'XIV Raider | Create Group',
  description: 'Create a new group.',
  openGraph: {
    title: 'XIV Raider | Create Group',
    description: 'Create a new group.',
  },
};

export default async function CreateGroup() {
  return withSessionAccess(() => (
    <Suspense fallback={<LoadingSpinner />}>
      <CreateGroupForm />
    </Suspense>
  ));
}

// Libraries
import { auth } from '@/server/auth';
// Components
import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import NotAllowed from '@/app/_components/ui/not-allowed';
import CreateCharacterForm from './form';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XIV Raider | Create Character',
};

export default async function CreateCharacter() {
  const session = await auth();
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CreateCharacterForm />
    </Suspense>
  );
}

// Libraries
import { auth } from '@/server/auth';
// Components
import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import CreateGroupForm from '@/app/create/form';
import NotAllowed from '@/app/_components/ui/not-allowed';

export default async function CreateGroup() {
  const session = await auth();
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CreateGroupForm />
    </Suspense>
  );
}

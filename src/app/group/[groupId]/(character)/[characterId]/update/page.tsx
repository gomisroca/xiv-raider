// Libraries
import { auth } from '@/server/auth';
// Components
import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import NotAllowed from '@/app/_components/ui/not-allowed';
import UpdateCharacterForm from './form';
import { getCharacter } from '@/server/queries/characters';

export default async function UpdateCharacter({
  params,
}: {
  params: Promise<{ groupId: string; characterId: string }>;
}) {
  const { groupId, characterId } = await params;
  const session = await auth();
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  const character = await getCharacter(characterId);
  if (!character) return null;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <UpdateCharacterForm character={character} groupId={groupId} />
    </Suspense>
  );
}

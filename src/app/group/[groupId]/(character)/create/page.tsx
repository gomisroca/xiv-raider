import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import CreateCharacterForm from './form';
import { type Metadata } from 'next';
import { withCharacterCreateAccess } from '@/utils/wrappers/withCharacterAccess';

type Props = {
  params: Promise<{ groupId: string }>;
};

export const metadata: Metadata = {
  title: 'XIV Raider | Create Character',
  description: 'Create a new character.',
  openGraph: {
    title: 'XIV Raider | Create Character',
    description: 'Create a new character.',
  },
};

export default async function CreateCharacter({ params }: Props) {
  const { groupId } = await params;

  return withCharacterCreateAccess(groupId, () => (
    <Suspense fallback={<LoadingSpinner />}>
      <CreateCharacterForm />
    </Suspense>
  ));
}

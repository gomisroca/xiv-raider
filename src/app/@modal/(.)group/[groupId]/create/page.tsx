import Modal from '@/app/_components/ui/modal';
import TitleSetter from '@/app/_components/ui/metadata-setter';
import CreateCharacterForm from '@/app/group/[groupId]/(character)/create/form';
import { withCharacterCreateAccess } from '@/utils/wrappers/withCharacterAccess';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';

type Props = {
  params: Promise<{ groupId: string }>;
};

export default async function CreateCharacterModal({ params }: Props) {
  const { groupId } = await params;

  return withCharacterCreateAccess(groupId, () => (
    <Modal>
      <Suspense fallback={<LoadingSpinner />}>
        <TitleSetter title="XIV Raider | Create Character" description="Create a new character." />
        <CreateCharacterForm modal />
      </Suspense>
    </Modal>
  ));
}

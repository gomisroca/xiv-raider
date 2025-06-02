import Modal from '@/app/_components/ui/modal';
import CreateGroupForm from '@/app/create/form';
import MetadataSetter from '@/app/_components/ui/metadata-setter';
import LoadingSpinner from '@/app/_components/ui/spinner';
import { Suspense } from 'react';
import { withSessionAccess } from '@/utils/wrappers/withSessionAccess';

export default async function CreateGroupModal() {
  return withSessionAccess(() => (
    <Modal>
      <Suspense fallback={<LoadingSpinner />}>
        <MetadataSetter title="XIV Raider | Create Group" description="Create a new group." />
        <CreateGroupForm modal />
      </Suspense>
    </Modal>
  ));
}

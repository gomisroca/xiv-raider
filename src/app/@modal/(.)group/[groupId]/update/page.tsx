import Modal from '@/app/_components/ui/modal';
import MetadataSetter from '@/app/_components/ui/metadata-setter';
import UpdateGroupForm from '@/app/group/[groupId]/update/form';
import { withGroupUpdateAccess } from '@/utils/wrappers/withGroupAccess';
import LoadingSpinner from '@/app/_components/ui/spinner';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ groupId: string }>;
};

export default async function UpdateGroupModal({ params }: Props) {
  const { groupId } = await params;

  return withGroupUpdateAccess(groupId, (group) => (
    <Modal>
      <Suspense fallback={<LoadingSpinner />}>
        <MetadataSetter title={`XIV Raider | ${group.name}`} description={`Update ${group.name}'s details.`} />
        <UpdateGroupForm group={group} modal />
      </Suspense>
    </Modal>
  ));
}

import { Suspense } from 'react';
import LoadingSpinner from '@/app/_components/ui/spinner';
import UpdateGroupForm from './form';
import { getGroup } from '@/server/queries/groups';
import { type Metadata } from 'next';
import { withGroupUpdateAccess } from '@/utils/wrappers/withGroupAccess';

type Props = {
  params: Promise<{ groupId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { groupId } = await params;
  const group = await getGroup(groupId);

  return {
    title: `XIV Raider | ${group?.name}`,
    description: `Update ${group?.name}'s details.`,
    openGraph: {
      title: `XIV Raider | ${group?.name}`,
      description: `Update ${group?.name}'s details.`,
    },
  };
}
export default async function UpdateGroup({ params }: Props) {
  const { groupId } = await params;

  return withGroupUpdateAccess(groupId, (group) => (
    <Suspense fallback={<LoadingSpinner />}>
      <UpdateGroupForm group={group} />
    </Suspense>
  ));
}

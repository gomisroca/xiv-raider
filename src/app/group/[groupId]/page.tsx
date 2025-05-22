import { getGroup } from '@/server/queries/groups';

export default async function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;

  const group = await getGroup(groupId);

  return <div>{group?.name}</div>;
}

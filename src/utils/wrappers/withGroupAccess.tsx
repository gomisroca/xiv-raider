import { auth } from '@/server/auth';
// Components
import { notFound } from 'next/navigation';
import NotAllowed from '@/app/_components/ui/not-allowed';
// Queries
import { getPlan } from '@/server/queries/plans';
import { getExtendedGroup, getGroup } from '@/server/queries/groups';
import { getToken } from '@/server/queries/tokens';
// Types
import { type JSX } from 'react';
import { type ExtendedGroup, type SelectGroup, type SelectPlan } from 'types';
import { type Session } from 'next-auth';
export async function withGroupViewAccess(
  groupId: string,
  callback: ({
    group,
    plan,
    session,
  }: {
    group: ExtendedGroup;
    plan: SelectPlan;
    session: Session;
  }) => Promise<JSX.Element> | JSX.Element
): Promise<JSX.Element> {
  const session = await auth();

  const group = await getExtendedGroup(groupId);
  const plan = await getPlan(groupId);
  if (!group || !plan) return notFound();

  if (!session || !group?.members.find((member) => member.id === session.user.id)) return <NotAllowed />;

  return await callback({ group, plan, session });
}

export async function withGroupInviteViewAccess(
  code: string,
  callback: (token: { group: { name: string } }) => Promise<JSX.Element> | JSX.Element
): Promise<JSX.Element> {
  const session = await auth();
  if (!session) return <NotAllowed />;

  const token = await getToken(code);
  if (!token) return notFound();

  return await callback(token);
}

export async function withPlanUpdateAccess(
  groupId: string,
  callback: (plan: SelectPlan) => Promise<JSX.Element> | JSX.Element
): Promise<JSX.Element> {
  const session = await auth();
  if (!session) return <NotAllowed />;

  const plan = await getPlan(groupId);
  if (!plan) return notFound();

  return await callback(plan);
}

export async function withGroupUpdateAccess(
  groupId: string,
  callback: (group: SelectGroup) => Promise<JSX.Element> | JSX.Element
): Promise<JSX.Element> {
  const session = await auth();
  if (!session) return <NotAllowed />;

  const group = await getGroup(groupId);
  if (!group) return notFound();

  return await callback(group);
}

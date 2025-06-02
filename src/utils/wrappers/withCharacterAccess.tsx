import { auth } from '@/server/auth';
// Components
import { notFound } from 'next/navigation';
import NotAllowed from '@/app/_components/ui/not-allowed';
// Queries
import { getCharacter } from '@/server/queries/characters';
import { getExtendedGroup } from '@/server/queries/groups';
// Types
import { type JSX } from 'react';
import { type ExtendedCharacter } from 'types';

export async function withCharacterViewAccess(
  characterId: string,
  callback: (character: ExtendedCharacter) => Promise<JSX.Element> | JSX.Element
): Promise<JSX.Element> {
  const character = await getCharacter(characterId);
  if (!character) return notFound();

  return await callback(character);
}

export async function withCharacterCreateAccess(
  groupId: string,
  callback: (access: boolean) => Promise<JSX.Element> | JSX.Element
): Promise<JSX.Element> {
  const group = await getExtendedGroup(groupId);
  if (!group) return notFound();

  const session = await auth();
  if (!session || group.members.some((m) => m.id === session.user.id)) return <NotAllowed />;

  return await callback(true);
}

export async function withCharacterUpdateAccess(
  characterId: string,
  callback: (character: ExtendedCharacter) => Promise<JSX.Element> | JSX.Element
): Promise<JSX.Element> {
  const character = await getCharacter(characterId);
  if (!character) return notFound();

  const session = await auth();
  if (!session || character.owner.id !== session.user.id) return <NotAllowed />;

  return await callback(character);
}

import { getCharacter } from '@/server/queries/characters';
import { GearIcon } from '@/app/_components/ui/icons';
import { type Prisma } from 'generated/prisma';
import Head from 'next/head';

export async function getServerSideProps({ params }: { params: { characterId: string } }) {
  const { characterId } = params;
  const character = await getCharacter(characterId);
  if (!character) return { notFound: true };
  return { props: { character } };
}

export default async function CharacterPage({
  character,
}: {
  character: Prisma.CharacterGetPayload<{ include: { gear: true; owner: true } }>;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Head>
        <title>
          {character.name} - {character.owner.name}
        </title>
      </Head>
      <header className="flex items-center justify-between gap-2">
        <h4 className="text-xl font-bold">
          {character.name} - {character.owner.name}
        </h4>
      </header>
      <section className="grid grid-cols-2 space-y-1 gap-x-4 p-4">
        {character.gear.map((gear) => (
          <div key={gear.id} className="jusitfy-center flex items-center gap-1 last:col-start-2">
            <GearIcon gearSlot={gear.type} />
            <span>{gear.status}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

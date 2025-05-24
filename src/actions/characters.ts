'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { GearSlot, GearStatus, Job } from 'generated/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateSchema = z.object({
  name: z.string().min(2),
  job: z.nativeEnum(Job),
  groupId: z.string(),
  gearPieces: z.array(
    z.object({
      type: z.nativeEnum(GearSlot),
      status: z.nativeEnum(GearStatus),
    })
  ),
});

export async function createCharacter(createData: z.infer<typeof CreateSchema>) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a character');

  const validatedFields = CreateSchema.safeParse({
    name: createData.name,
    job: createData.job,
    groupId: createData.groupId,
    gearPieces: createData.gearPieces,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());
  const { data } = validatedFields;

  const existingCharacter = await db.character.findFirst({
    where: {
      ownerId: session.user.id,
      groupId: data.groupId,
    },
  });
  if (existingCharacter) throw new Error('You already own a character in this group');

  await db.$transaction(async (trx) => {
    // Create the character
    await trx.character.create({
      data: {
        name: data.name,
        job: data.job,
        ownerId: session.user.id,
        groupId: data.groupId,
        // Create all gear pieces at once
        gear: {
          create: data.gearPieces.map((piece) => ({
            type: piece.type,
            status: piece.status,
          })),
        },
      },
    });
  });

  revalidatePath(`/group/${data.groupId}`);
  return { message: 'Character created.', redirect: `/group/${data.groupId}` };
}

const UpdateSchema = z.object({
  id: z.string(),
  job: z.nativeEnum(Job),
  groupId: z.string(),
  name: z.string().min(2),
  gearPieces: z.array(
    z.object({
      type: z.nativeEnum(GearSlot),
      status: z.nativeEnum(GearStatus),
    })
  ),
});
export async function updateCharacter(updateData: z.infer<typeof UpdateSchema>) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a character');

  const validatedFields = UpdateSchema.safeParse({
    id: updateData.id,
    job: updateData.job,
    groupId: updateData.groupId,
    name: updateData.name,
    gearPieces: updateData.gearPieces,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());
  const { data } = validatedFields;

  const existingCharacter = await db.character.findUnique({
    where: {
      id: data.id,
      ownerId: session.user.id,
    },
    include: {
      gear: true,
    },
  });
  if (!existingCharacter) throw new Error('You cannot update a character that does not belong to you');

  await db.$transaction(async (trx) => {
    // Create the character
    await trx.character.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        job: data.job,
      },
    });

    // Create a map of existing gear pieces by type for efficient lookups
    const existingGearMap = new Map(existingCharacter.gear.map((gear) => [gear.type, gear]));

    // Process each gear piece in the update data
    for (const gearPiece of data.gearPieces) {
      const existingGear = existingGearMap.get(gearPiece.type);

      if (existingGear) {
        // Update existing gear piece if status has changed
        if (existingGear.status !== gearPiece.status) {
          await trx.gearPiece.update({
            where: { id: existingGear.id },
            data: { status: gearPiece.status },
          });
        }
        // Remove from map to track what we've processed
        existingGearMap.delete(gearPiece.type);
      } else {
        // Create new gear piece if it doesn't exist
        await trx.gearPiece.create({
          data: {
            type: gearPiece.type,
            status: gearPiece.status,
            characterId: data.id,
          },
        });
      }
    }

    // Delete any remaining gear pieces that weren't in the update data
    // (This is unlikely with your fixed gear slots, but included for completeness)
    for (const [, remainingGear] of existingGearMap) {
      await trx.gearPiece.delete({
        where: { id: remainingGear.id },
      });
    }
  });

  revalidatePath(`/group/${data.groupId}`);
  return { message: 'Character updated.', redirect: `/group/${data.groupId}` };
}

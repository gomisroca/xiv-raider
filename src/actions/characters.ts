'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { GearSlot, GearStatus, Job, LootType } from 'generated/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateSchema = z.object({
  name: z.string().min(2),
  job: z.nativeEnum(Job),
  groupId: z.string(),
  gearPieces: z.array(
    z.object({
      type: z.nativeEnum(GearSlot),
      lootType: z.nativeEnum(LootType),
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
  const { name, job, groupId, gearPieces } = validatedFields.data;
  const trimmedName = name.trim();

  return await db.$transaction(async (trx) => {
    const existingCharacter = await trx.character.findFirst({
      where: {
        ownerId: session.user.id,
        groupId,
      },
      select: {
        id: true,
      },
    });
    if (existingCharacter) throw new Error('You already own a character in this group');

    // Create the character
    await trx.character.create({
      data: {
        name: trimmedName,
        job,
        ownerId: session.user.id,
        groupId,
        // Create all gear pieces at once
        gear: {
          create: gearPieces.map((piece) => ({
            type: piece.type,
            lootType: piece.lootType,
            status: piece.status,
          })),
        },
      },
    });

    revalidatePath(`/group/${groupId}`);
    return { message: `Character ${trimmedName} was created.`, redirect: `/group/${groupId}` };
  });
}

const UpdateSchema = z.object({
  id: z.string(),
  job: z.nativeEnum(Job),
  groupId: z.string(),
  name: z.string().min(2),
  gearPieces: z.array(
    z.object({
      type: z.nativeEnum(GearSlot),
      lootType: z.nativeEnum(LootType),
      status: z.nativeEnum(GearStatus),
    })
  ),
});
export async function updateCharacter(updateData: z.infer<typeof UpdateSchema>) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a character');

  const validatedFields = UpdateSchema.safeParse({
    id: updateData.id,
    name: updateData.name,
    job: updateData.job,
    groupId: updateData.groupId,
    gearPieces: updateData.gearPieces,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());
  const { id, name, job, groupId, gearPieces } = validatedFields.data;
  const trimmedName = name.trim();

  return await db.$transaction(async (trx) => {
    const existingCharacter = await trx.character.findUnique({
      where: {
        id,
        ownerId: session.user.id,
      },
      include: {
        gear: true,
      },
    });
    if (!existingCharacter) throw new Error('You cannot update a character that does not belong to you');

    // Create the character
    await trx.character.update({
      where: {
        id,
      },
      data: {
        name: trimmedName,
        job,
      },
    });

    // Create a map of existing gear pieces by type for efficient lookups
    const existingGearMap = new Map(existingCharacter.gear.map((gear) => [gear.type, gear]));

    // Process each gear piece in the update data
    for (const gearPiece of gearPieces) {
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
            lootType: gearPiece.lootType,
            status: gearPiece.status,
            characterId: id,
          },
        });
      }
    }

    // Delete any remaining gear pieces that weren't in the update data
    for (const [, remainingGear] of existingGearMap) {
      await trx.gearPiece.delete({
        where: { id: remainingGear.id },
      });
    }

    revalidatePath(`/group/${groupId}`);
    return { message: `Character ${trimmedName} was updated.`, redirect: `/group/${groupId}` };
  });
}

const UpdateGearSchema = z.object({
  groupId: z.string(),
  gearId: z.string(),
});
export async function updateGearSlot(updateData: z.infer<typeof UpdateGearSchema>) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a character');

  const validatedFields = UpdateGearSchema.safeParse({
    groupId: updateData.groupId,
    gearId: updateData.gearId,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());
  const { groupId, gearId } = validatedFields.data;

  return await db.$transaction(async (trx) => {
    const existingGearPiece = await trx.gearPiece.findUnique({
      where: {
        id: gearId,
      },
      select: {
        type: true,
        status: true,
        character: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!existingGearPiece) throw new Error('You cannot update a gear piece that does not belong to you');

    const newStatus = existingGearPiece.status === 'Obtained' ? 'Unobtained' : 'Obtained';

    await db.gearPiece.update({
      where: {
        id: gearId,
      },
      data: {
        status: newStatus,
      },
    });

    revalidatePath(`/group/${groupId}`);
    return {
      message: `${existingGearPiece.character.name}'s ${existingGearPiece.type} status was set to ${newStatus.toLowerCase()}.`,
      redirect: `/group/${groupId}`,
    };
  });
}

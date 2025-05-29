/*
  Warnings:

  - The values [BiS,NeedsTomestone,NeedsRaidDrop] on the enum `GearStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `lootType` to the `GearPiece` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LootType" AS ENUM ('Tomestone', 'RaidDrop');

-- AlterEnum
BEGIN;
CREATE TYPE "GearStatus_new" AS ENUM ('Unobtained', 'Obtained');
ALTER TABLE "GearPiece" ALTER COLUMN "status" TYPE "GearStatus_new" USING ("status"::text::"GearStatus_new");
ALTER TYPE "GearStatus" RENAME TO "GearStatus_old";
ALTER TYPE "GearStatus_new" RENAME TO "GearStatus";
DROP TYPE "GearStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "GearPiece" ADD COLUMN     "lootType" "LootType" NOT NULL;

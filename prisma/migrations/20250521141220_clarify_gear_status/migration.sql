/*
  Warnings:

  - The values [Tomestone,Raid] on the enum `GearStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GearStatus_new" AS ENUM ('BiS', 'NeedsTomestone', 'NeedsRaidDrop');
ALTER TABLE "GearPiece" ALTER COLUMN "status" TYPE "GearStatus_new" USING ("status"::text::"GearStatus_new");
ALTER TYPE "GearStatus" RENAME TO "GearStatus_old";
ALTER TYPE "GearStatus_new" RENAME TO "GearStatus";
DROP TYPE "GearStatus_old";
COMMIT;

/*
  Warnings:

  - You are about to drop the column `uses` on the `InviteToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InviteToken" DROP COLUMN "uses",
ADD COLUMN     "maxUses" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "remainingUses" INTEGER NOT NULL DEFAULT 10;

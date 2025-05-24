/*
  Warnings:

  - Added the required column `job` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Job" AS ENUM ('WAR', 'PLD', 'DRK', 'GNB', 'WHM', 'SCH', 'AST', 'SGE', 'MNK', 'SAM', 'RPR', 'DRG', 'NIN', 'VPR', 'BRD', 'MCH', 'DNC', 'BLM', 'PCT', 'SMN', 'RDM');

-- DropForeignKey
ALTER TABLE "GearPiece" DROP CONSTRAINT "GearPiece_characterId_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "job" "Job" NOT NULL;

-- AddForeignKey
ALTER TABLE "GearPiece" ADD CONSTRAINT "GearPiece_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

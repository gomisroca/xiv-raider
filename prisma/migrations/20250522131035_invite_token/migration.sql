/*
  Warnings:

  - You are about to drop the column `token` on the `InviteToken` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "InviteToken_token_key";

-- AlterTable
ALTER TABLE "InviteToken" DROP COLUMN "token";

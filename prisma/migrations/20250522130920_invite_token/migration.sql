/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `InviteToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `InviteToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "InviteToken_groupId_key";

-- AlterTable
ALTER TABLE "InviteToken" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "InviteToken_token_key" ON "InviteToken"("token");

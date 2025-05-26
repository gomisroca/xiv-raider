-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('Melee', 'Ranged', 'Healer', 'Tank');

-- CreateTable
CREATE TABLE "GroupPlan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "priority_1" "Priority" NOT NULL DEFAULT 'Melee',
    "priority_2" "Priority" NOT NULL DEFAULT 'Ranged',
    "priority_3" "Priority" NOT NULL DEFAULT 'Tank',
    "priority_4" "Priority" NOT NULL DEFAULT 'Healer',
    "groupId" TEXT NOT NULL,

    CONSTRAINT "GroupPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupPlan_groupId_key" ON "GroupPlan"("groupId");

-- AddForeignKey
ALTER TABLE "GroupPlan" ADD CONSTRAINT "GroupPlan_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

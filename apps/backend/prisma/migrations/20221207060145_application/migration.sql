/*
  Warnings:

  - You are about to drop the column `application` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `jsonApplication` on the `Membership` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "application",
DROP COLUMN "jsonApplication";

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "membershipId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "jsonMessage" TEXT NOT NULL,
    "fitsSchedule" BOOLEAN NOT NULL,
    "days" TEXT[],
    "timePeriods" TEXT[],

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_membershipId_userId_fkey" FOREIGN KEY ("membershipId", "userId") REFERENCES "Membership"("campaign_id", "userId") ON DELETE CASCADE ON UPDATE CASCADE;

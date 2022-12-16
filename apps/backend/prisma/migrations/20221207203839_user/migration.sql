/*
  Warnings:

  - You are about to drop the column `campaignId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `campaignMessageId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `privateMessageId` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `relatedId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_campaignMessageId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_privateMessageId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "campaignId",
DROP COLUMN "campaignMessageId",
DROP COLUMN "privateMessageId",
ADD COLUMN     "relatedId" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `relatedId` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `campaignId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campaignMessageId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privateMessageId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'PrivateMessage';

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "relatedId",
ADD COLUMN     "campaignId" TEXT NOT NULL,
ADD COLUMN     "campaignMessageId" TEXT NOT NULL,
ADD COLUMN     "privateMessageId" TEXT NOT NULL,
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_campaignMessageId_fkey" FOREIGN KEY ("campaignMessageId") REFERENCES "CampaignMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_privateMessageId_fkey" FOREIGN KEY ("privateMessageId") REFERENCES "PrivateMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

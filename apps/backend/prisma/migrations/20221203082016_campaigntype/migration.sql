/*
  Warnings:

  - The `campaignType` column on the `campaigns` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "campaigns" DROP COLUMN "campaignType",
ADD COLUMN     "campaignType" TEXT NOT NULL DEFAULT 'Campaign';

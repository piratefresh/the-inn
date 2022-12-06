-- CreateEnum
CREATE TYPE "CampaignType" AS ENUM ('Campaign', 'One_Shot');

-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "campaignType" "CampaignType" NOT NULL DEFAULT 'Campaign';

/*
  Warnings:

  - The values [OneShot] on the enum `CampaignType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CampaignType_new" AS ENUM ('Campaign', 'One_Shot');
ALTER TABLE "campaigns" ALTER COLUMN "campaignType" DROP DEFAULT;
ALTER TABLE "campaigns" ALTER COLUMN "campaignType" TYPE "CampaignType_new" USING ("campaignType"::text::"CampaignType_new");
ALTER TYPE "CampaignType" RENAME TO "CampaignType_old";
ALTER TYPE "CampaignType_new" RENAME TO "CampaignType";
DROP TYPE "CampaignType_old";
ALTER TABLE "campaigns" ALTER COLUMN "campaignType" SET DEFAULT 'Campaign';
COMMIT;

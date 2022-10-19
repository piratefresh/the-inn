/*
  Warnings:

  - The primary key for the `Membership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `oauthToken` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `oauthTokenSecret` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `additional_details` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `gm_id` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `is_online` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `json_additional_details` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `json_summary` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `max_seats` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `time_periods` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `virtual_table` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `voip_system` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,provider_account_id,user_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameSystem` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gmId` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOnline` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jsonSummary` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_user_id_fkey";

-- DropForeignKey
ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_gm_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropIndex
DROP INDEX "accounts_provider_provider_account_id_key";

-- AlterTable
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Membership_pkey" PRIMARY KEY ("campaign_id", "userId");

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "oauthToken",
DROP COLUMN "oauthTokenSecret",
ADD COLUMN     "oauth_token" TEXT,
ADD COLUMN     "oauth_token_secret" TEXT;

-- AlterTable
ALTER TABLE "campaigns" DROP COLUMN "additional_details",
DROP COLUMN "created_at",
DROP COLUMN "end_date",
DROP COLUMN "gm_id",
DROP COLUMN "image_url",
DROP COLUMN "is_online",
DROP COLUMN "json_additional_details",
DROP COLUMN "json_summary",
DROP COLUMN "max_seats",
DROP COLUMN "start_date",
DROP COLUMN "time_periods",
DROP COLUMN "updated_at",
DROP COLUMN "virtual_table",
DROP COLUMN "voip_system",
ADD COLUMN     "additionalDetails" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gameSystem" TEXT NOT NULL,
ADD COLUMN     "gmId" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "isOnline" BOOLEAN NOT NULL,
ADD COLUMN     "jsonAdditionalDetails" TEXT,
ADD COLUMN     "jsonSummary" TEXT NOT NULL,
ADD COLUMN     "maxSeats" INTEGER NOT NULL DEFAULT 4,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "timePeriods" TEXT[],
ADD COLUMN     "timezone" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "virtualTable" TEXT,
ADD COLUMN     "voipSystem" TEXT;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
DROP COLUMN "email_verified",
DROP COLUMN "first_name",
DROP COLUMN "image_url",
DROP COLUMN "last_name",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_user_id_key" ON "accounts"("provider", "provider_account_id", "user_id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_gmId_fkey" FOREIGN KEY ("gmId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

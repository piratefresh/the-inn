/*
  Warnings:

  - You are about to drop the column `endDate` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `extraImage` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `game_system` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `geolocation_lat` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `geolocation_lng` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `gmId` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `isOnline` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[session_token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `end_date` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gm_id` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_online` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `json_summary` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_token` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('GM', 'PLAYER');

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_userId_fkey";

-- DropForeignKey
ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_gmId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropIndex
DROP INDEX "sessions_sessionToken_key";

-- AlterTable
ALTER TABLE "campaigns" DROP COLUMN "endDate",
DROP COLUMN "extraImage",
DROP COLUMN "game_system",
DROP COLUMN "geolocation_lat",
DROP COLUMN "geolocation_lng",
DROP COLUMN "gmId",
DROP COLUMN "image",
DROP COLUMN "isOnline",
DROP COLUMN "startDate",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gallery" TEXT[],
ADD COLUMN     "gm_id" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "is_online" BOOLEAN NOT NULL,
ADD COLUMN     "json_additional_details" TEXT,
ADD COLUMN     "json_summary" TEXT NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "virtual_table" TEXT,
ALTER COLUMN "max_seats" SET DEFAULT 4;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "sessionToken",
DROP COLUMN "userId",
ADD COLUMN     "session_token" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email_verified" TIMESTAMP(3),
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Player";

-- CreateTable
CREATE TABLE "Membership" (
    "role" "MembershipRole" NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("campaign_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_gm_id_fkey" FOREIGN KEY ("gm_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

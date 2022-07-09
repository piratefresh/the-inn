/*
  Warnings:

  - You are about to drop the column `extraImage` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `game_system` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `geolocation_lat` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `geolocation_lng` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('GM', 'PLAYER');

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_userId_fkey";

-- AlterTable
ALTER TABLE "campaigns" DROP COLUMN "extraImage",
DROP COLUMN "game_system",
DROP COLUMN "geolocation_lat",
DROP COLUMN "geolocation_lng",
ADD COLUMN     "gallery" TEXT[],
ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "endDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "max_seats" SET DEFAULT 4;

-- DropTable
DROP TABLE "Player";

-- CreateTable
CREATE TABLE "Membership" (
    "role" "MembershipRole" NOT NULL,
    "campaignId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("campaignId","userId")
);

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `campaignId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `players` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "campaignId";

-- DropTable
DROP TABLE "players";

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "campaignId" TEXT NOT NULL,
    "userId" TEXT[],

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_campaignId_userId_key" ON "Player"("campaignId", "userId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

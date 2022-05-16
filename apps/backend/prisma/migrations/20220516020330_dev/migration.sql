/*
  Warnings:

  - You are about to drop the `_players` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_players" DROP CONSTRAINT "_players_A_fkey";

-- DropForeignKey
ALTER TABLE "_players" DROP CONSTRAINT "_players_B_fkey";

-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "_players";

-- CreateTable
CREATE TABLE "players" (
    "id" SERIAL NOT NULL,
    "campaignId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

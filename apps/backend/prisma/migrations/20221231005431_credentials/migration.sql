/*
  Warnings:

  - You are about to drop the column `access_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `id_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `oauth_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `oauth_token_secret` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider_account_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `token_type` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,providerAccountId,userId]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerAccountId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropIndex
DROP INDEX "accounts_provider_provider_account_id_user_id_key";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "access_token",
DROP COLUMN "expires_at",
DROP COLUMN "id_token",
DROP COLUMN "oauth_token",
DROP COLUMN "oauth_token_secret",
DROP COLUMN "provider_account_id",
DROP COLUMN "refresh_token",
DROP COLUMN "session_state",
DROP COLUMN "token_type",
DROP COLUMN "user_id",
ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "idToken" TEXT,
ADD COLUMN     "oauthToken" TEXT,
ADD COLUMN     "oauthTokenSecret" TEXT,
ADD COLUMN     "providerAccountId" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "sessionState" TEXT,
ADD COLUMN     "tokenType" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_userId_key" ON "accounts"("provider", "providerAccountId", "userId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `name` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT 'John',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT 'Test';

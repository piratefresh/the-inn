/*
  Warnings:

  - You are about to drop the column `first_Name` on the `users` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "first_Name",
ADD COLUMN     "first_name" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - Added the required column `first_Name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "firstName",
DROP COLUMN "imageUrl",
DROP COLUMN "lastName",
ADD COLUMN     "first_Name" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "last_name" TEXT NOT NULL;

/*
  Warnings:

  - Added the required column `title` to the `campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "title" TEXT NOT NULL;

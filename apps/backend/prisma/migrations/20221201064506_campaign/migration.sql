/*
  Warnings:

  - Added the required column `address` to the `campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "address" TEXT NOT NULL;

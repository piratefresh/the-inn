-- AlterEnum
ALTER TYPE "MembershipRole" ADD VALUE 'PENDING';

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "application" TEXT,
ADD COLUMN     "jsonApplication" TEXT;

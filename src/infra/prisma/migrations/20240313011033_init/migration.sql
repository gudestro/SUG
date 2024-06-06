/*
  Warnings:

  - Added the required column `status` to the `Allocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Allocation" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "status" TEXT NOT NULL;

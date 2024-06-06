/*
  Warnings:

  - Added the required column `status` to the `Construction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Construction" ADD COLUMN     "status" TEXT NOT NULL;

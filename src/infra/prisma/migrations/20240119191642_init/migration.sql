/*
  Warnings:

  - You are about to drop the `UserRules` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PermissionsUser" DROP CONSTRAINT "PermissionsUser_userRulesId_fkey";

-- DropForeignKey
ALTER TABLE "UserRules" DROP CONSTRAINT "UserRules_userId_fkey";

-- AlterTable
ALTER TABLE "PermissionsUser" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "UserRules";

-- AddForeignKey
ALTER TABLE "PermissionsUser" ADD CONSTRAINT "PermissionsUser_userRulesId_fkey" FOREIGN KEY ("userRulesId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

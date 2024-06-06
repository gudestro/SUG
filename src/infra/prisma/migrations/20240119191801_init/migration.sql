/*
  Warnings:

  - You are about to drop the column `userRulesId` on the `PermissionsUser` table. All the data in the column will be lost.
  - Added the required column `userId` to the `PermissionsUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PermissionsUser" DROP CONSTRAINT "PermissionsUser_userRulesId_fkey";

-- AlterTable
ALTER TABLE "PermissionsUser" DROP COLUMN "userRulesId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PermissionsUser" ADD CONSTRAINT "PermissionsUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

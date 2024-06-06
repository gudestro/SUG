/*
  Warnings:

  - You are about to drop the column `permissionsToUsersId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `PermissionsToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PermissionsToUsers" DROP CONSTRAINT "PermissionsToUsers_permissionsId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_permissionsToUsersId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "permissionsToUsersId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "PermissionsToUsers";

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionsUser" (
    "id" SERIAL NOT NULL,
    "permissionsId" INTEGER NOT NULL,
    "permissionId" INTEGER,

    CONSTRAINT "PermissionsUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsUser" ADD CONSTRAINT "PermissionsUser_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

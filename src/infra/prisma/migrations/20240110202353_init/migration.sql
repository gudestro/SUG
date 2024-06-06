-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT,
    "office" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "numberHouse" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "permissionsToUsersId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionsToUsers" (
    "id" SERIAL NOT NULL,
    "permissionsId" INTEGER NOT NULL,

    CONSTRAINT "PermissionsToUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_permissionsToUsersId_fkey" FOREIGN KEY ("permissionsToUsersId") REFERENCES "PermissionsToUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsToUsers" ADD CONSTRAINT "PermissionsToUsers_permissionsId_fkey" FOREIGN KEY ("permissionsId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

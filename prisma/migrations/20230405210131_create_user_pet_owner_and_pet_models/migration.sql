-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "IdentificationType" AS ENUM ('tattoo', 'puce');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetOwner" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT,
    "zipCode" TEXT,
    "city" TEXT,
    "phone" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PetOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "petOwnerId" INTEGER NOT NULL,
    "specie" TEXT,
    "gender" "Gender",
    "name" TEXT,
    "breed" TEXT,
    "coat" TEXT,
    "birthCountry" TEXT,
    "birthDate" TIMESTAMP(3),
    "deceased" BOOLEAN,
    "deceaseDate" TIMESTAMP(3),
    "picture" TEXT,
    "identificationType" "IdentificationType",
    "identificationDate" TIMESTAMP(3),
    "identificationPlace" TEXT,
    "identificationNumber" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PetOwner_userId_key" ON "PetOwner"("userId");

-- AddForeignKey
ALTER TABLE "PetOwner" ADD CONSTRAINT "PetOwner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_petOwnerId_fkey" FOREIGN KEY ("petOwnerId") REFERENCES "PetOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

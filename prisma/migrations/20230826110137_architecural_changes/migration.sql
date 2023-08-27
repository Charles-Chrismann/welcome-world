/*
  Warnings:

  - You are about to drop the column `forwarded_for` on the `Ip` table. All the data in the column will be lost.
  - You are about to drop the column `horo` on the `Ip` table. All the data in the column will be lost.
  - You are about to drop the column `methode` on the `Ip` table. All the data in the column will be lost.
  - You are about to drop the column `protocol` on the `Ip` table. All the data in the column will be lost.
  - You are about to drop the column `referer` on the `Ip` table. All the data in the column will be lost.
  - You are about to drop the column `remote_user` on the `Ip` table. All the data in the column will be lost.
  - You are about to drop the column `route` on the `Ip` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Ip` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Ip` table. All the data in the column will be lost.
  - You are about to drop the column `user_agent` on the `Ip` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `Ip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ip" DROP COLUMN "forwarded_for",
DROP COLUMN "horo",
DROP COLUMN "methode",
DROP COLUMN "protocol",
DROP COLUMN "referer",
DROP COLUMN "remote_user",
DROP COLUMN "route",
DROP COLUMN "size",
DROP COLUMN "status",
DROP COLUMN "user_agent",
ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Request" (
    "ipId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "remote_user" TEXT NOT NULL,
    "horo" TIMESTAMP(3) NOT NULL,
    "methode" TEXT NOT NULL,
    "route" TEXT,
    "protocol" TEXT,
    "status" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "referer" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "forwarded_for" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "countryId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "region" TEXT NOT NULL,
    "regionName" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "regionId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinates" (
    "timezoneId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timezone" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT NOT NULL,

    CONSTRAINT "Timezone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "countryId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isp" TEXT NOT NULL,
    "org" TEXT NOT NULL,
    "as" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ip" ADD CONSTRAINT "Ip_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_ipId_fkey" FOREIGN KEY ("ipId") REFERENCES "Ip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinates" ADD CONSTRAINT "Coordinates_timezoneId_fkey" FOREIGN KEY ("timezoneId") REFERENCES "Timezone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `regionId` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `timezoneId` on the `Coordinates` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `Region` table. All the data in the column will be lost.
  - You are about to drop the column `ipId` on the `Request` table. All the data in the column will be lost.
  - Added the required column `region_id` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone_id` to the `Coordinates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_id` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_id` to the `Region` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip_id` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_regionId_fkey";

-- DropForeignKey
ALTER TABLE "Coordinates" DROP CONSTRAINT "Coordinates_timezoneId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Region" DROP CONSTRAINT "Region_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_ipId_fkey";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "regionId",
ADD COLUMN     "region_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Coordinates" DROP COLUMN "timezoneId",
ADD COLUMN     "timezone_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "countryId",
ADD COLUMN     "country_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Region" DROP COLUMN "countryId",
ADD COLUMN     "country_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "ipId",
ADD COLUMN     "ip_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_ip_id_fkey" FOREIGN KEY ("ip_id") REFERENCES "Ip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinates" ADD CONSTRAINT "Coordinates_timezone_id_fkey" FOREIGN KEY ("timezone_id") REFERENCES "Timezone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

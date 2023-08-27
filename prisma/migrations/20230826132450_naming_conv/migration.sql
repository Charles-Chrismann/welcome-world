/*
  Warnings:

  - You are about to drop the column `countryCode` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `regionName` on the `Region` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[country_code]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country_code` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_name` to the `Region` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Country_countryCode_key";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "countryCode",
ADD COLUMN     "country_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Region" DROP COLUMN "regionName",
ADD COLUMN     "region_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Country_country_code_key" ON "Country"("country_code");

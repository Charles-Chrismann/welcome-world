/*
  Warnings:

  - You are about to drop the column `country_id` on the `Organization` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_country_id_fkey";

-- AlterTable
ALTER TABLE "Ip" ADD COLUMN     "country_id" INTEGER;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "country_id";

-- AddForeignKey
ALTER TABLE "Ip" ADD CONSTRAINT "Ip_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

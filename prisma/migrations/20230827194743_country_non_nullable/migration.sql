/*
  Warnings:

  - Made the column `country_id` on table `Ip` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Ip" DROP CONSTRAINT "Ip_country_id_fkey";

-- AlterTable
ALTER TABLE "Ip" ALTER COLUMN "country_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Ip" ADD CONSTRAINT "Ip_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

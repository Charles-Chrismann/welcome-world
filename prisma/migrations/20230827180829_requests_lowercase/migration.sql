/*
  Warnings:

  - Added the required column `ip_id` to the `Coordinate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coordinate" ADD COLUMN     "ip_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Coordinate" ADD CONSTRAINT "Coordinate_ip_id_fkey" FOREIGN KEY ("ip_id") REFERENCES "Ip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

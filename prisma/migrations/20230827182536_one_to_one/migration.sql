/*
  Warnings:

  - A unique constraint covering the columns `[ip_id]` on the table `Coordinate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Coordinate_ip_id_key" ON "Coordinate"("ip_id");

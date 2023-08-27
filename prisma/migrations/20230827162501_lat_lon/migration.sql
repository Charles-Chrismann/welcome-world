/*
  Warnings:

  - You are about to drop the column `lat` on the `Coordinate` table. All the data in the column will be lost.
  - You are about to drop the column `lon` on the `Coordinate` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Coordinate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Coordinate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coordinate" DROP COLUMN "lat",
DROP COLUMN "lon",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

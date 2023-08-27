/*
  Warnings:

  - You are about to drop the `Coordinates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coordinates" DROP CONSTRAINT "Coordinates_timezone_id_fkey";

-- DropTable
DROP TABLE "Coordinates";

-- CreateTable
CREATE TABLE "Coordinate" (
    "timezone_id" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Coordinate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coordinate" ADD CONSTRAINT "Coordinate_timezone_id_fkey" FOREIGN KEY ("timezone_id") REFERENCES "Timezone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

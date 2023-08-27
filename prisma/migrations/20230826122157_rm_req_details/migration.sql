/*
  Warnings:

  - You are about to drop the column `size` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "size",
DROP COLUMN "status";

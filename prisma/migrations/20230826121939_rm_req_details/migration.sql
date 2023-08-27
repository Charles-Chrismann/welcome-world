/*
  Warnings:

  - You are about to drop the column `forwarded_for` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `remote_user` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "forwarded_for",
DROP COLUMN "remote_user";

/*
  Warnings:

  - You are about to drop the column `organizationId` on the `Ip` table. All the data in the column will be lost.
  - Added the required column `organization_id` to the `Ip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ip" DROP CONSTRAINT "Ip_organizationId_fkey";

-- AlterTable
ALTER TABLE "Ip" DROP COLUMN "organizationId",
ADD COLUMN     "organization_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Ip" ADD CONSTRAINT "Ip_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

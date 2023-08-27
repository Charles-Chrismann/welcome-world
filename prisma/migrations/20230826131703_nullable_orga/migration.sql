-- DropForeignKey
ALTER TABLE "Ip" DROP CONSTRAINT "Ip_organization_id_fkey";

-- AlterTable
ALTER TABLE "Ip" ALTER COLUMN "organization_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ip" ADD CONSTRAINT "Ip_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

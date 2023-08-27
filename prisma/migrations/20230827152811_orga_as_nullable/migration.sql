-- DropIndex
DROP INDEX "Organization_as_key";

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "as" DROP NOT NULL;

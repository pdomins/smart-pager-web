-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "avgTimePerTable" TEXT,
ADD COLUMN     "operatingHours" JSONB,
ADD COLUMN     "type" TEXT;

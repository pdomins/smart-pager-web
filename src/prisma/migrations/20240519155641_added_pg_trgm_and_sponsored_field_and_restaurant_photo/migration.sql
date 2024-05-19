-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "picture" TEXT,
ADD COLUMN     "sponsored" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Restaurant_name_idx" ON "Restaurant" USING GIN ("name" gin_trgm_ops);

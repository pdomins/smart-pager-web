-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL,
    "seatedAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "waitingTimeMinutes" INTEGER,
    "restaurantId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

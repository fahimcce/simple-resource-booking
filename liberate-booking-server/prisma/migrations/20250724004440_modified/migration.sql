/*
  Warnings:

  - You are about to drop the column `resourceId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the `resources` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `resource` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_resourceId_fkey";

-- DropIndex
DROP INDEX "bookings_resourceId_startTime_endTime_idx";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "resourceId",
ADD COLUMN     "resource" TEXT NOT NULL;

-- DropTable
DROP TABLE "resources";

-- CreateIndex
CREATE INDEX "bookings_resource_startTime_endTime_idx" ON "bookings"("resource", "startTime", "endTime");

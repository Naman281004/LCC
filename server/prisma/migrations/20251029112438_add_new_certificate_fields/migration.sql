/*
  Warnings:

  - You are about to drop the column `courseDuration` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `courseName` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `expiryDate` on the `Certificate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registrationNumber]` on the table `Certificate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `course` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationNumber` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "courseDuration",
DROP COLUMN "courseName",
DROP COLUMN "expiryDate",
ADD COLUMN     "course" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "registrationNumber" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_registrationNumber_key" ON "Certificate"("registrationNumber");

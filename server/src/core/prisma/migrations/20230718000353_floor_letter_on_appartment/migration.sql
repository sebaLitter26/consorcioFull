/*
  Warnings:

  - You are about to drop the column `content` on the `Appartment` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Tenant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[floor,letter,buildingId]` on the table `Appartment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `floor` to the `Appartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `letter` to the `Appartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observation` to the `Appartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observation` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observation` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Appartment_content_idx";

-- AlterTable
ALTER TABLE "Appartment" DROP COLUMN "content",
ADD COLUMN     "floor" INTEGER NOT NULL,
ADD COLUMN     "letter" CHAR(1) NOT NULL,
ADD COLUMN     "observation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "content",
ADD COLUMN     "observation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "content",
ADD COLUMN     "observation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Appartment_floor_letter_buildingId_key" ON "Appartment"("floor", "letter", "buildingId");

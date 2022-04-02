/*
  Warnings:

  - You are about to drop the column `max` on the `stocks` table. All the data in the column will be lost.
  - You are about to drop the column `min` on the `stocks` table. All the data in the column will be lost.
  - Added the required column `high` to the `stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `low` to the `stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stocks" DROP COLUMN "max",
DROP COLUMN "min",
ADD COLUMN     "high" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "low" DOUBLE PRECISION NOT NULL;

/*
  Warnings:

  - Added the required column `volume` to the `stock_market_index_daily_variations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stock_market_index_daily_variations" ADD COLUMN     "volume" DECIMAL(65,30) NOT NULL;

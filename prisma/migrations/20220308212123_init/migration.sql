/*
  Warnings:

  - Added the required column `volume` to the `stock_market_company_values` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stock_market_company_values" ADD COLUMN     "volume" DECIMAL(65,30) NOT NULL;

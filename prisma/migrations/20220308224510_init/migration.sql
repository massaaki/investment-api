/*
  Warnings:

  - You are about to drop the column `volume` on the `stock_market_company_values` table. All the data in the column will be lost.
  - You are about to alter the column `volume` on the `stock_market_index_daily_variations` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "stock_market_company_values" DROP COLUMN "volume";

-- AlterTable
ALTER TABLE "stock_market_index_daily_variations" ALTER COLUMN "volume" SET DATA TYPE INTEGER;

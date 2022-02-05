/*
  Warnings:

  - Added the required column `code` to the `stock_market_companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stock_market_companies" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "stock_market_companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_market_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_market_company_values" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "stockMarketCompanyId" TEXT,

    CONSTRAINT "stock_market_company_values_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stock_market_company_values" ADD CONSTRAINT "stock_market_company_values_stockMarketCompanyId_fkey" FOREIGN KEY ("stockMarketCompanyId") REFERENCES "stock_market_companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

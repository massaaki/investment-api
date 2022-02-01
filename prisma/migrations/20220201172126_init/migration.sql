-- CreateTable
CREATE TABLE "stock_market_indexes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "opensAt" TEXT NOT NULL,
    "closesAt" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_market_indexes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_market_index_daily_variations" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,
    "isOpened" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "stockMarketIndexId" TEXT,

    CONSTRAINT "stock_market_index_daily_variations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_market_indexes_code_key" ON "stock_market_indexes"("code");

-- AddForeignKey
ALTER TABLE "stock_market_index_daily_variations" ADD CONSTRAINT "stock_market_index_daily_variations_stockMarketIndexId_fkey" FOREIGN KEY ("stockMarketIndexId") REFERENCES "stock_market_indexes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

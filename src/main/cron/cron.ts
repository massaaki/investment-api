import cron from 'node-cron';

import { createOrUpdateStockDailyVariation } from './stock-market-index-daily-variation/create-or-update';

export function startCrawler() {
  console.log('Crawler (Market Stock Index) - Started');
  cron.schedule('*/30 * * * *', async () => {
    console.log('cron running');
    await createOrUpdateStockDailyVariation();
  })
}
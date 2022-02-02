import 'reflect-metadata';
import app from "./config/app";
import { env } from './config/env';
import { createOrUpdateStockDailyVariation } from './cron/stock-market-index-daily-variation/create-or-update';

app.listen(env.port, async () => {
  console.log(`Server running at http://localhost:${env.port}`);


  //cron jobs
  // await createOrUpdateStockDailyVariation();
});

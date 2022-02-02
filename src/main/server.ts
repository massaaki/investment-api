import 'reflect-metadata';
import app from "./config/app";
import { env } from './config/env';
import { startCrawler } from './cron/cron';


// startCrawler()
app.listen(env.port, async () => {
  console.log(`Server running at http://localhost:${env.port}`);
});

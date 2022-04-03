import base from './base';

import signup from './signup';
import login from './login';
import renewRefreshToken from './renew-refresh-token';
import sayHello from './say-hello';
import me from './me';

// Stock market Index
import createStockMarketIndex from './stock-market-index/create-stock-market-index-typedef'
import createStockMarketIndexDailyVariation from './stock-market-index-daily-variation/create-stock-market-index-daily-variation-typedef'
import getListStockMarketIndexVariation from './stock-market-index-daily-variation/get-list-stock-market-index-variation'

//Stock
import createStock from './stock/create-stock-typedef'

export default [
  base,
  signup,
  login,
  renewRefreshToken,
  sayHello,
  me,
  createStockMarketIndex,
  createStockMarketIndexDailyVariation,
  getListStockMarketIndexVariation,
  createStock
]
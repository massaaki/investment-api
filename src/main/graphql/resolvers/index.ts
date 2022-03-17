import signup from './signup';
import login from './login';
import renewRefreshToken from './renew-refresh-token';
import sayHello from './say-hello';
import me from './me';

// Stock Market Index
import createStockMarketIndex from './stock-market-index/create-stock-market-index-resolver'
import createStockMarketIndexDailyVariation from './stock-market-index-daily-variation/create-stock-market-index-daily-variation'
import getListStockMarketIndexVariation from './stock-market-index-daily-variation/get-list-stock-market-index-variation'

export default [
  signup,
  login,
  renewRefreshToken,
  sayHello,
  me,
  createStockMarketIndex,
  createStockMarketIndexDailyVariation,
  getListStockMarketIndexVariation
];
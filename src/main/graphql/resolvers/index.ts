import signup from './signup';
import login from './login';
import renewRefreshToken from './renew-refresh-token';
import sayHello from './say-hello';
import me from './me';

// Stock Market Index
import createStockMarketIndex from './stock-market-index/create-stock-market-index-resolver'

export default [
  signup,
  login,
  renewRefreshToken,
  sayHello,
  me,
  createStockMarketIndex
];
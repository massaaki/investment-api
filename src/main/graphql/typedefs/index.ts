import base from './base';

import signup from './signup';
import login from './login';
import renewRefreshToken from './renew-refresh-token';
import sayHello from './say-hello';
import me from './me';

// Stock market Index
import createStockMarketIndex from './stock-market-index/create-stock-market-index-typedef'

export default [
  base,
  signup,
  login,
  renewRefreshToken,
  sayHello,
  me,
  createStockMarketIndex
]
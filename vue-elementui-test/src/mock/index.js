import Mock from 'mockjs';  // https://github.com/nuysoft/Mock
import AdsVerifyData from './AdsVerifyData';
import MsgReceivedData from './MsgReceivedData';
import StandardManageData from './StandardManageData';
import UserManageData from './UserManageData';
import MarketDataData from './MarketDataData';

Mock.mock(/\/UserManageData\/list/, 'get', UserManageData.getList);
Mock.mock(/\/AdsVerifyData\/list/, 'get', AdsVerifyData.getList);
Mock.mock(/\/StandardManageData\/list/, 'get', StandardManageData.getList);
Mock.mock(/\/MarketDataData\/list/, 'get', MarketDataData.getList);
Mock.mock(/\/MsgReceivedData\/list/, 'get', MsgReceivedData.getList);

export default Mock;

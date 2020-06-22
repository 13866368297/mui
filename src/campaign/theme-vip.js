import { fetchAsync } from './http-client';
import { userInfo } from './user-info';
import {
  checkIfThemeVipUrl, checkAllThemeOrderUrl
} from './urls';

/**
 * 主题查询是否是会员
 */
const checkIfThemeVip = () => {
  let clienttraceid = userInfo && userInfo['x-clienttraceid'] ? userInfo['x-clienttraceid'] : '';
  const queryHeader = {
    'Content-Type': 'application/json',//*
    'x-appid': '10005',//10005 - 营销
    'x-devicemodel': userInfo.deviceModel || '',
    'x-uid': userInfo.userId || '',
    'x-sign': userInfo.sign || '',
    'x-hc': userInfo.hc || '',
    'authtype': 'ST',
    'x-clienttraceid': clienttraceid,
    'usertoken': userInfo.UserToken || '',
    'versionCode': userInfo.appVersionCode || '', //*
    'terminaltype': '0', //固定传0  与端侧一致
    'devicetype': userInfo.idType || '',
    'deviceid': userInfo.deviceid || '',
  };
  return fetchAsync(`${checkIfThemeVipUrl}?productType=1`, 'get', {}, false, queryHeader).then(res => {
    return res;
  });
};

/**
 * 主题查询套餐订购记录
 * @param {String} productCode 会员产品ID，多个可以逗号分隔，如：1111,2222,333
 * 
 */
const themeOrderAll = (productCode) => {
  let clienttraceid = userInfo && userInfo['x-clienttraceid'] ? userInfo['x-clienttraceid'] : '';
  const queryHeader = {
    'x-appid': '10005',//10005 - 营销
    'x-devicemodel': userInfo.deviceModel || '',
    'x-uid': userInfo.userId || '',
    'x-sign': userInfo.sign || '',
    'x-hc': userInfo.hc || '',
    'authtype': 'ST',
    'x-clienttraceid': clienttraceid,
    'usertoken': userInfo.UserToken || '',
    'versionCode': userInfo.appVersionCode || '',
    'terminaltype': '0', //固定传0  与端侧一致
    'devicetype': userInfo.idType || '',
    'deviceid': userInfo.deviceid || '',
    'emuiversion': userInfo.themeVersion || '9.0'
  };
  return fetchAsync(`${checkAllThemeOrderUrl}?start=0&limit=150&orderType=1&productCodes=${productCode}`, 'get', {}, false, queryHeader).then(res => {
    return res;
  });
};

/**
 * 查询是否购买本套餐产品
 * 
 * @param {boolean} flag  套餐购买状态：false:未购买     true ：已经购买
 * 
 */

const isBuyedProduct = (productCode) => {
  return themeOrderAll(productCode).then(data => {
    let flag = false;
    if (data && data.resultcode === '00000' && data.orderRecordInfoList) {
      for (let k = 0, len = data.orderRecordInfoList.length; k < len; k++) {
        if (data.orderRecordInfoList[k].status === 2) {
          flag = true;
          break;
        }
      }
    }
    return flag;
  });
};

export {
  checkIfThemeVip,
  themeOrderAll,
  isBuyedProduct
};
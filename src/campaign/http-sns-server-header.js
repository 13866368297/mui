
import { userInfo } from './user-info';
import { xpageTraceId } from './trace-id-singleton';

const createRandomString = (len) => {
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < len; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};
const getUCTTime = () => {
  const d = new Date();
  return d.toISOString();
};

/*
* 计算加密值 Hex(HMAC_SHA256(http body+RequestURI, key)，其中加密算法参考，其中加密算法参考附录4.7安全公共组件说明key=AppSecret+Nonce+Created
* get没有请求体body，url=v1/ttmusic/order/hires/auth
*/
const getResponse = (bodyurl, nonce, created) => {
  try {
    var responseStr = window.JsInterface.getsecresp(JSON.stringify({
      'bodyurl': bodyurl,
      'nonce': nonce,
      'created': created
    }));
    return responseStr;
  } catch (e) {
    return null;
  }
};

// 获取AT鉴权token
const getCsToken = () => {
  try {
    var csTokenStr = window.JsInterface.getCsToken();
    return csTokenStr;
  } catch (e) {
    return null;
  }
};
/**
 *
 * @param {String} bodyUrl 请求路径
 * @param {Boolean} inAppbutNotUseToken 在App内但是不加response 和token两个字段
 */
const getSNSServerHeader = (bodyUrl, inAppbutNotUseToken) => {
  const nonce = createRandomString(32);
  const created = getUCTTime();
  const xdeviceid = userInfo.deviceid ? userInfo.deviceid : (xpageTraceId || new Date().getTime());
  const appkey = userInfo.appkey ? userInfo.appkey : 'app-music-baseline';
  const deviceModel = userInfo.deviceModel ? userInfo.deviceModel : '';
  const screen = userInfo.screen ? userInfo.screen : '';
  const brand = userInfo.brand ? userInfo.brand : '';
  const rom = userInfo.rom ? userInfo.rom : '';
  const emuiVersionName = userInfo.emuiVersionName ? userInfo.emuiVersionName : '';
  const os = userInfo.os ? userInfo.os : '';
  const appVersionName = userInfo.appVersionName ? userInfo.appVersionName : '8.0.5.1';
  const userAgent = 'version=' + appVersionName + ',model=' + deviceModel + ',screen=' + screen + ',brand=' + brand + ',rom=' + rom + ',emui=' + emuiVersionName + ',os=' + os;
  let authorization;
  if (userInfo) {
    const response = getResponse(bodyUrl, nonce, created);
    const csToken = getCsToken();
    authorization = 'Digest username=' + appkey + ',nonce=' + nonce + ',created=' + created + ',response=security:' + response + ',token=' + csToken;
    // 在APP但是头域authorization 不加token
    if (inAppbutNotUseToken) {
      authorization = 'Digest username=' + appkey + ',nonce=' + nonce + ',created=' + created;
    }
  } else {
    authorization = 'Digest username=' + appkey + ',nonce=' + nonce + ',created=' + created;
  }
  const Xbearer = userInfo.Xbearer ? userInfo.Xbearer : '';
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Mobile-Agent': userAgent,
    'Authorization': authorization,
    'x-bearer': Xbearer,
    'x-deviceid': xdeviceid,
    'x-client-version': appVersionName,
    'x-pagetraceid': xpageTraceId
  };

};
export {
  getSNSServerHeader
};
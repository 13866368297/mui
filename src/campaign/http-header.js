import { userInfo } from './user-info';
import { xpageTraceId } from './trace-id-singleton';
const initHeader = {
  'Content-Type': 'application/json; charset=utf-8',
  'User-Agent': null,
  'campaign-token': null,
  osVersion: null,
  sign: null,
  token: null,
  tokenkey: null,
  'x-client-version': null,
  'x-clienttraceid': null,
  'x-deviceid': null,
  'x-appid': null,
  'x-devicetype': null
};

const deviceModel = userInfo.deviceModel || '';
const screen = userInfo.screen || '';
const brand = userInfo.brand || '';
const rom = userInfo.rom || '';
const emuiVersionName = userInfo.emuiVersionName || '';
const os = userInfo.os || '';
const lang = userInfo.lang || '';

const userAgent = 'model=' + deviceModel + ',screen=' + screen + ',brand=' + brand + ',rom=' + rom + ',emui=' + emuiVersionName + ',os=' + os;
const xdeviceid = userInfo.deviceid || '';
const token = userInfo.safeToken || userInfo.UserToken || '';
const appkey = userInfo.appkey || '';
const appVersionName = userInfo.appVersionName || '12.11.0.1';
const clienttraceid = userInfo['x-clienttraceid'] || +new Date();
// idType是主题用的，deviceType是音乐用的
let devicetype = userInfo.idType || userInfo.deviceType || '';
if (userInfo.idType === 0 || userInfo.deviceType === 0) {
  devicetype = 0;
}
const xpagetraceid = xpageTraceId;

const getUserEmuiVersion = function () {
  const emuiVersionName = userInfo.emuiVersionName || 'EmotionUI_8.0.0';
  const version = emuiVersionName.split('_')[1];

  if (version && version.split('.')[0] === '8') {
    return '8.0';
  } else if (version && version.split('.')[0] === '9') {
    return '9.0';
  }

  return '8.0';
};


const parseQueryString = function (argu) {
  var str = argu.split('?')[1];
  if (!str) return;
  var result = {};
  var temp = str.split('&');

  for (var i = 0; i < temp.length; i++) {
    var temp2 = temp[i].split('=');
    result[temp2[0]] = temp2[1];
  }
  return result;
};
const getParams = function () {
  let a = window.location.href.split('camp/');
  let a1 = parseQueryString(window.location.search);
  let b, c;
  if (a && a[1]) {
    b = a[1].substr(0, 18);
  }
  if (a1) {
    c = a1.operator;
  }
  return 'campid=' + b + ',operator=' + c;
};

const header = {
  osVersion: getUserEmuiVersion(),
  sign: userInfo.sign || '',
  token: token,
  tokenkey: appkey,
  'x-clienttraceid': clienttraceid,
  'x-client-version': appVersionName,
  'x-deviceid': xdeviceid,
  'x-devicetype': devicetype,
  'Client-Agent': userAgent,
  'User-Agent': userAgent,
  'x-camp-params': getParams(),
  'x-lang':lang,
  'deviceid': xdeviceid,
  'deviceDigest':userInfo.deviceDigest ||'',
  'x-pagetraceid': xpagetraceid
};

export default Object.assign({}, initHeader, header);

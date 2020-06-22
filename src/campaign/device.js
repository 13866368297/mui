const userAgent = navigator.userAgent || navigator.vendor || window.opera;

// Operating Systems
const isAndroid = /android/i.test(userAgent);
const isIOS = /iPad|iPhone|iPod/i.test(userAgent) && !window.MSStream;
const isWindowsPhone = /windows phone/i.test(userAgent);

// Applications
const isWeixin = /micromessenger/i.test(userAgent);
const isWeibo = /weibo/i.test(userAgent);
const isSogou = /sogoumobilebrowser/i.test(userAgent);
const isBaidu = /baidu/i.test(userAgent);
const isFacebook = /fbav/i.test(userAgent);

const isWebview = /wv\)/i.test(userAgent);

// Huawei mobile
const isHuawei = /huawei|honor|honour/i.test(userAgent) && isAndroid;
const isHuaweiApp = isHuawei && isWebview && !isWeixin && !isWeibo && !isSogou && !isBaidu && !isFacebook;

const getMobileOS = () => {
  if (isAndroid) {
    return 'an';
  } else if (isIOS) {
    return 'ios';
  } else if (isWindowsPhone) {
    return 'wp';
  }

  return 'unknown';
};
let locale = 'zh_CN';
let pageDirection = '';

const getPageLanguage = () => {
  return locale;
};

const setPageLanguage = (lan) => {
  locale = lan;
};

const getPageDirection = () => {
  return pageDirection;
};

const setPageDirection = (dir) => {
  if(dir === 'rtl'){
    pageDirection = 'direction-rtl';
  }
};

export default {
  isAndroid,
  isIOS,
  isWindowsPhone,
  isWeixin,
  isWeibo,
  isSogou,
  isBaidu,
  isFacebook,
  isWebview,
  isHuawei,
  isHuaweiApp,
  getMobileOS,
  getPageLanguage,
  setPageLanguage,
  getPageDirection,
  setPageDirection
};

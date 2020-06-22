import { userInfo } from './user-info';
import { fetchAsync } from './http-client';
import { themeUserAuthUrl, musicUserAuthUrl } from './urls';
import { CampaignManager } from './campaign-manager';

const userAuth = () => {
  if (CampaignManager.isMusicApp) {
    return _userMusicAuth();
  } else if (CampaignManager.isThemeApp) {
    return _userThemeAuth();
  }else if(CampaignManager.isRadioApp){
    return _userRadioAuth();
  } else {
    console.log('It is not music or theme or Radio APP');
    return Promise.reject();
  }
};

const _userThemeAuth = () => {
  if (!userInfo.userStatus || !userInfo.UserToken) {
    return Promise.reject();
  }

  const authReq = {
    deviceId: userInfo.deviceid,
    sign: userInfo.sign,
    userToken: userInfo.UserToken,
    deviceType: userInfo.idType
  };

  return fetchAsync(themeUserAuthUrl, 'post', authReq, false);
};

const _userMusicAuth = () => {
  // eslint-disable-next-line eqeqeq
  if (!userInfo.isLogin || userInfo.status != 1 || !userInfo.safeToken) {
    return Promise.reject();
  }

  const authReq = {
    appId: userInfo.appId,
    cpId: userInfo.cpId,
    accessToken: userInfo.safeToken,
    version: userInfo.appVersionCode,
    terminalId: userInfo.deviceid,
    openId: userInfo.ownerId
  };

  return fetchAsync(musicUserAuthUrl, 'post', authReq, false);
};

const _userRadioAuth = () => {
  // eslint-disable-next-line eqeqeq
  if (!userInfo.isLogin || userInfo.status != 1 || !userInfo.safeToken) {
    return Promise.reject();
  }
  const authReq = {
    appId: userInfo.appId,
    cpId: userInfo.cpId,
    accessToken: userInfo.safeToken,
    version: userInfo.appVersionCode,
    terminalId: userInfo.deviceid,
    openId: userInfo.ownerId,
    terminalType: userInfo.deviceType + ''
  };

  return fetchAsync(musicUserAuthUrl, 'post', authReq, false);

};

export {
  userAuth
};

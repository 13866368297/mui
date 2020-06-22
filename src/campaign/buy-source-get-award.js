import { fetchAsync, fetchTextAsync } from './http-client';
import { themeUserBuySourceList, getAwardCollectUrl, getAwardListUrl } from './urls';
import { userInfo } from './user-info';
import { CampaignManager } from './campaign-manager';

const buyThemeSourceGetIds = (options) => {
  const body = {
    sign: userInfo.sign,
    userToken: userInfo.UserToken,
    deviceId: userInfo.deviceid,
    appVersion: userInfo.appVersionName,
    deviceType: userInfo.idType,
    beginTime: options.beginTime,
    endTime: options.endTime,
    body: options.sourceId
  };
  return fetchAsync(themeUserBuySourceList, 'post', body, true).then(data => {
    return data;
  });
};

const getBuySourceAwardList = (campAlias) => {
  return fetchAsync(getAwardListUrl, 'post', {
    campAliasList: campAlias
  }, false).then(response => {
    let awardList = response && response.awardList;
    return awardList;
  });
};

const getAwardCollect = (options, headers={}) => {
  const body = {
    campAlias: options.campAlias || CampaignManager.campAlias,
    userToken: userInfo.UserToken,
    awardId: options.awardId
  };
  return fetchTextAsync(getAwardCollectUrl, 'post', body, true, headers);
};



export {
  buyThemeSourceGetIds,
  getBuySourceAwardList,
  getAwardCollect,
};

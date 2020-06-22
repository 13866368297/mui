import {
  musicCampJoinUrl,
  themeCampJoinUrl,
  getAwardListUrl,
  getUserAwardInfoUrl,
  getUserCampHisUrl,
  getLatestCampHisUrl,
  updateLotteryUserInfoUrl,
  musicLotteryTimesUrl,
  themeLotteryTimesUrl,
  getLotteryAwardInfoUrl,
  trackingProcessInfoUrl
} from './urls';
import { fetchAsync, fetchTextAsync } from './http-client';
import { userInfo } from './user-info';
import { CampaignManager } from './campaign-manager';

const _joinMusicCamp = (campAlias, headers = {}, type) => {
  if (!userInfo || !userInfo.deviceid) {
    throw new Error('Mondatory parameters are missed');
  }

  const body = {
    campAlias: campAlias || CampaignManager.campAlias,
    osVersion: userInfo && userInfo.os,
    sign: userInfo && userInfo.sign,
    userToken: userInfo && userInfo.safeToken,
    terminalId:  userInfo && userInfo.deviceid,
    deviceId: userInfo && userInfo.deviceid || null,
    appVersion: userInfo && userInfo.appVersionName || null,
    deviceType: userInfo && (userInfo.deviceType || 0 === userInfo.deviceType) ? userInfo.deviceType : null,
  };

  return fetchTextAsync(musicCampJoinUrl, 'post', body, true, headers, type);
};

// Join Lottery and get award information
const _joinThemeCamp = (campAlias, header= {}, type='global') => {
  let emuiVersion;
  if (userInfo && userInfo.emuiVersionName && userInfo.emuiVersionName.split('_')[1]) {
    if (userInfo.emuiVersionName.split('_')[1].split('.')[0] === '8') {
      emuiVersion = '8.0';
    } else if (userInfo.emuiVersionName.split('_')[1].split('.')[0] === '9') {
      emuiVersion = '9.0';
    } else if (userInfo.emuiVersionName.split('_')[1].split('.')[0] === '10') {
      emuiVersion = '10.0';
    } else {
      emuiVersion = '8.0';
    }
  }

  const body = {
    campAlias: campAlias || CampaignManager.campAlias,
    osVersion: emuiVersion,
    sign: userInfo && userInfo.sign,
    userToken: userInfo && userInfo.UserToken,
    deviceId: userInfo && userInfo.deviceid,
    appVersion: userInfo && userInfo.appVersionName,
    deviceType: userInfo && userInfo.idType
  };

  return fetchTextAsync(themeCampJoinUrl, 'post', body, true, header, type);
};


const _joinRadioCamp = (campAlias) => {
  if (!userInfo || !userInfo.deviceid) {
    throw new Error('Mondatory parameters are missed');
  }

  const body = {
    campAlias: campAlias || CampaignManager.campAlias,
    osVersion: userInfo.os,
    sign: userInfo.sign,
    userToken: userInfo.safeToken,
    terminalId: userInfo.deviceid,
    deviceId: userInfo.deviceid || null,
    appVersion: userInfo.appVersionName || null,
    deviceType: (userInfo.deviceType || 0 === userInfo.deviceType) ? userInfo.deviceType : null,
  };

  return fetchTextAsync(musicCampJoinUrl, 'post', body, true);
};

/**
 * 参与抽奖，抽奖次数会消耗一次
 * @param {String} [campAlias] 活动别名，不传参就使用CampaignMananger.campAlias默认
 * @returns {Promise} awardInfo的奖品对象Promise
 */
const joinCamp = (campAlias, header = {}, type='global') => {
  if (CampaignManager.isMusicApp) {
    return _joinMusicCamp(campAlias, header, type);
  } else if (CampaignManager.isThemeApp) {
    return _joinThemeCamp(campAlias, header, type);
  } else if (CampaignManager.isRadioApp) {
    return _joinRadioCamp(campAlias);
  } else {
    return Promise.reject(new Error('It is not Music or Theme or Radio App'));
  }
};

const getAwardList = (campAlias, queryType = '0', headers = {} ,hasThanksJoining = false, thanksJoiningPosition = undefined) => {
  let alias= campAlias || CampaignManager.campAlias;
  return fetchAsync(getAwardListUrl, 'post', {
    campAliasList: [alias],
    queryType: queryType
  }, false, headers).then(response => {
    let awardList = response && response.awardList && response.awardList[alias];

    if (hasThanksJoining && Array.isArray(awardList)) {
      if (thanksJoiningPosition) {
        awardList.splice((thanksJoiningPosition - 1), 0, {
          awardId: '0'
        });
      } else {
        awardList.push({
          awardId: '0'
        });
      }
    }

    return awardList;
  });
};

const getUserAwardInfo = () => {
  const body = {
    campAlias: CampaignManager.campAlias,
    onlyAward: 1
  };

  return fetchTextAsync(getUserAwardInfoUrl, 'post', body)
    .then(response => response && response.awardList);
};

const getUserAwardsByAliasList = (campAliasList, header = {}) => {
  const body = {
    campAliasList: campAliasList || [CampaignManager.campAlias],
    queryType: 1
  };

  return fetchTextAsync(getUserCampHisUrl, 'post', body, true, header)
    .then(response => response && response.awardList);
};

/**
 * 查询中奖的用户名单
 * @param {Array} [campAliasList] 活动别名列表，不传参使用CampaignManager.campAlias
 * @param {Number} queryType 1：只返回中奖记录，按中奖时间返回；2：只返回中奖记录，且保持小额奖品（小于12元）、大额奖品各展示50%。
 * @returns {Object} Promise对象
 */
const getLatestAwardsByAliasList = (campAliasList, queryType = 1, header = {}) => {
  const body = {
    campAliasList: campAliasList || [CampaignManager.campAlias],
    queryType
  };
  return fetchTextAsync(getLatestCampHisUrl, 'post', body, false, header)
    .then(response => response && response.awardList && response.awardList.award);
};

const fillAddress = (user, campAlias, type = 1, header={}) => {
  const body = {
    campAlias: campAlias || CampaignManager.campAlias,
    type: type, // 补全奖品类型 1.补全活动抽奖领奖信息 2.补全人工抽奖领奖信息 3.补全拼团抽奖领奖信息
    recordId: user.recordId, //领奖记录ID
    userRealName: user.name,
    phoneNum: user.telephone,
    userAddress: user.address
  };

  return fetchAsync(updateLotteryUserInfoUrl, 'post', body, true, header);
};

const getMusicLotteryTimes = (campAlias, header={}) => {
  const body = {
    campAlias: campAlias || CampaignManager.campAlias,
    appId: userInfo.appId
  };
  return fetchAsync(musicLotteryTimesUrl, 'post', body, true, header);
};

const getThemeLotteryTimes = (campAlias, headers = {}) => {
  let emuiVersion;
  if (userInfo && userInfo.emuiVersionName && userInfo.emuiVersionName.split('_')[1]) {
    if (userInfo.emuiVersionName.split('_')[1].split('.')[0] === '8') {
      emuiVersion = '8.0';
    } else if (userInfo.emuiVersionName.split('_')[1].split('.')[0] === '9') {
      emuiVersion = '9.0';
    } else if (userInfo.emuiVersionName.split('_')[1].split('.')[0] === '10') {
      emuiVersion = '10.0';
    } else {
      emuiVersion = '8.0';
    }
  }
  const body = {
    campAlias: campAlias || CampaignManager.campAlias,
    osVersion: emuiVersion,
    sign: userInfo.sign,
    userToken: userInfo.UserToken,
    deviceId: userInfo.deviceid || null,
    appVersion: userInfo.appVersionName || null,
    deviceType: userInfo.idType
  };

  return fetchAsync(themeLotteryTimesUrl, 'post', body, true, headers);
};

/**
 * 查询抽奖次数，并更新到CampaignManager.lotteryTimes里
 * @param {String} [campAlias] 活动别名，如果不传参，使用默认的CampaignManager.campAlias
 * @returns {Promise} 返回含有整形数字的抽奖次数Promise对象，查询出错返回0
 */
const getLotteryTimes = (campAlias) => {
  const _updateTimes = (data) => {
    let times = (data && data.restTimes) || 0;
    times < 0 && (times = 0);
    CampaignManager.usedTimes = data.usedTimes;
    CampaignManager.lotteryTimes = times;
    return times;
  };
  if (CampaignManager.isMusicApp) {
    return getMusicLotteryTimes(campAlias).then(_updateTimes);
  } else if (CampaignManager.isThemeApp) {
    return getThemeLotteryTimes(campAlias).then(_updateTimes);
  } else if (CampaignManager.isRadioApp) {
    return getMusicLotteryTimes(campAlias).then(_updateTimes);
  }else {
    console.log('It is not music or theme or Radio APP');
    CampaignManager.lotteryTimes = 0;
    return Promise.resolve(0);
  }
};

const getFlashLotteryInfo = (campAlias, queryType, header = {}) => {
  const body = {
    campAlias: campAlias || CampaignManager.campAlias,
    queryType: queryType || 0
  };
  const isNeedAuthFirst = queryType + '' === '1';
  return fetchAsync(getLotteryAwardInfoUrl, 'post', body, isNeedAuthFirst, header);
};

const getTrackingProcessInfo = (recordId) => {
  const body = {
    recordIdList: [recordId]
  };
  return fetchAsync(trackingProcessInfoUrl, 'post',body, false,{});
};

export {
  joinCamp,
  getAwardList,
  getLotteryTimes,
  getMusicLotteryTimes,
  getThemeLotteryTimes,
  getUserAwardInfo,
  getUserAwardsByAliasList,
  getLatestAwardsByAliasList,
  fillAddress,
  getFlashLotteryInfo,
  getTrackingProcessInfo
};

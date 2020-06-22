import { fetchAsync, fetchJson } from './http-client';
import {
  musicMedalUrl,
  musicSubscriptionUrl,
  musicSubscriptionDetailUrl,
  musicColumnDetailUrl,
  musicSongInfoUrl,
  musicTopicQueryUrl,
  musicTopicPraiseUrl,
  queryDevicesignatureUrl,
  queryIsCollectedUrl,
  addCollectionUrl,
  deleteCollectionUrl,
  thirdPartyTokenUrl,
  queryUserOrderInfoUrl,
  trackingProcessInfoUrl
} from './urls';
import { hasUserInfo } from './user-info';
import { reportPoint } from './report-point';
import { CampaignManager } from './campaign-manager';
import { urlParamEncode } from'./util';

const wiseMarketReg = /wisemarketing/i;
const wiseMarketAgentUrl = 'https://musiccamptest.hwcloudtest.cn:18443';

const extraParam = {
  snsFlag: true,
  inAppbutNotUseToken: false, // 默认带token
  cors: (() => {
    const pageUrl = window.location.href;
    if(wiseMarketReg.test(pageUrl)) {
      return true;
    }
    return false;
  })()
};
const getUrl = (url) => {
  const pageUrl = window.location.href;
  if(wiseMarketReg.test(pageUrl)){
    return wiseMarketAgentUrl + url;
  }
  return url;
};

const getMusicMedal = () => {
  return fetchAsync(musicMedalUrl, 'get', null, false, {}, 'global', extraParam).then(data => {
    console.log('========>Medal', data);
    return data;
  });
};

const getMusicSubscription = () => {
  return fetchAsync(musicSubscriptionUrl, 'get', null, false, {}, 'global', extraParam).then(data => {
    console.log('======>Subscription', data);
    return data;
  });
};

const getMusicSubscriptionNew = (flag = 1) => {
  // flag查询标识：1.查询是否订购过连续包月类套餐
  const queryStr = flag ? 1 : 0;
  const url = `${musicSubscriptionDetailUrl}?flag=${queryStr}`;

  return fetchAsync(url, 'get', null, false, {}, 'global', extraParam);
};

/**
 *  查询音乐栏目下具体信息
 */
const getMusicColumnDetail = (columnId, hasRecommend, limit, start) => {
  extraParam.inAppbutNotUseToken = true;
  const param = {
    columnID: columnId,
    limit,
    start,
  };
  hasRecommend && (param.hasRecommend = hasRecommend);
  const url = getUrl(musicColumnDetailUrl);

  return fetchAsync(url, 'get', param, false, {}, 'global' , extraParam).then(data => {
    return data;
  });
};


const _showResDetail = (params) => {
  // if (!checkVersion({
  //   version: 121102100
  // })) {
  //   console.log('Version is lower than 121102100');
  //   return;
  // }

  try {
    window.JsInterface.showResDetail(params);
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * 通过ID跳转到个性皮肤
 * @param {String} skinId 个性皮肤ID
 */
const redirectPersonalitySkin = (skinId) => {
  reportPoint('music101404', {componentID: skinId});

  const params = JSON.stringify({
    type: '2',
    id: skinId
  });

  console.log('redirect to skin', params);
  _showResDetail(params);
};

/**
 * 获取歌曲播放URL和歌曲类型
 * @param {String} songId 歌曲ID
 * 待弃用
 */
const getSongPlayInfo = (songId) => {
  const url = musicSongInfoUrl;
  const authorization = 'Digest username=10021449,nonce=hiEXPqXS7dW2ABtadvQP49pwgavo85RT,created=2019-09-19T10:24:34Z';

  return fetchAsync(url, 'post', {
    contentCode: songId,
    contentType: '1'
  }, false, {
    Authorization: authorization,
    'x-deviceid': Math.floor(Math.random() * 10000000) + ''
  }).then(res => {
    return {
      playURL: res.fileURL,
      songInfo: res.songInfo,
      isFree: res.type === '1'
    };
  });
};

/**
 * 通过Subject ID查询topic，一次只能查询20条，最多查5次
 * @param {String} subjectId 话题类别ID，subject是circle的子集，topic是subject的子集
 * @param {Number} start 起始位置
 * @param {Number} limit 限制条数
 */
const getTopics = (subjectId, start, limit) => {
  const url = musicTopicQueryUrl;
  if(!(hasUserInfo && CampaignManager.isLogin)){
    extraParam.inAppbutNotUseToken = true;
  }
  const params = {
    contentCode: subjectId,
    limit: limit + '',
    musicSwitch: '0000000000000001',
    start: start + '',
  };

  return fetchAsync(url, 'get', params, false, {}, 'global', extraParam);
};

/**
 * 话题点赞或者取消点赞
 * @param {String} topicId 话题ID
 * @param {Boolean} givePraise 点赞传true，取消点赞传false
 */
const praiseTopic = (topicId, givePraise) => {
  const url = musicTopicPraiseUrl;

  const params = {
    objectID: topicId,
    objectType: '2', // '2' topic, '3' comment
    reverseFlag: givePraise ? '0' : '1',
  };

  return fetchAsync(url, 'post', params, false, {}, '', extraParam);
};
/**
 * 获取手机铃声
 */
const queryDevicesignature = () => {
  return fetchAsync(queryDevicesignatureUrl, 'get', null, false, {}, 'global', extraParam);
};
/**
 * 通过ID跳转到个性播放器
 * @param {String} playerId 个性播放器ID
 */
const redirectPersonalityPlayer = (playerId) => {
  reportPoint('music101404', {componentID: playerId});

  const params = JSON.stringify({
    type: '1',
    id: playerId
  });

  console.log('redirect to player', params);
  _showResDetail(params);
};

const _redirectCatalog = (pageType) => {
  // if (!checkVersion({
  //   version: 121102100
  // })) {
  //   console.log('Version is lower than 121102100');
  //   return;
  // }

  const params = JSON.stringify({
    pageType,
  });

  console.log('rediect catalog', params);

  try {
    window.JsInterface.gotoPlayerSkin(params);
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * 跳转到个性皮肤类别（更多）
 */
const redirectSkinCatalog = () => {
  reportPoint('music101404', {componentID: 'skin'});

  console.log('redirect to skin catalog, pageType 4');
  _redirectCatalog('4');
};

/**
 * 跳转到个性播放器类别（更多）
 */
const redirectPlayerCatalog = () => {
  reportPoint('music101404', {componentID: 'player'});

  console.log('redirect to player catalog, pageType 3');
  _redirectCatalog('3');
};
/**
 * @description 查询是否收藏
 * @param {Object} queryInfo
 * @param queryInfo.contentID
 * @param queryInfo.contentType
 */
const queryIsCollected = (queryInfo) => {
  const url = queryIsCollectedUrl + '?contentID=' + queryInfo.contentID + '&contentType=' + queryInfo.contentType;
  return fetchAsync(url, 'get', null, false, {}, 'global', extraParam);
};

/**
 * @description 添加收藏
 * @param {Object} adInfo
 * @param addInfo.contentID // required
 * @param addInfo.contentType // required
 */
const addCollection = (addInfo = {}) => {
  return fetchAsync(addCollectionUrl, 'post', addInfo, false, {}, 'global', extraParam);
};

/**
 * @description 删除收藏
 * @param {Object} deleteInfo
 * @param deleteInfo.contentID // required
 * @param deleteInfo.contentType // required
 */
const deleteCollection = (deleteInfo) => {
  return fetchAsync(deleteCollectionUrl, 'post', deleteInfo, false, {}, 'global', extraParam);
};

const getThirdPartyToken = (spID) => {
  const url = thirdPartyTokenUrl + '?spID=' + spID;
  return fetchJson(url, 'get', null, false, {}, 'global', extraParam);
};

/**
 * @description 查询用户订单信息
 * @param {Array} productCodes 产品编码ID 列表
 * @returns
 * {
 * "result":{
 *    "resultCode":"000000",
 *    "resultMessage":"Success!"
 * },
 * "orderRecordInfos":[]
 * }
 */
const queryUserOrderInfo = (productCodes) => {
  const paramsString = urlParamEncode({productCodes});
  const url = `${queryUserOrderInfoUrl}?${paramsString}` ;
  return fetchAsync(url,'get', null, false, {}, 'global', extraParam);
};

/**
 * @description 查询物流信息
 * @param {Array} recordIdList 中奖ID列表 
 */
const trackProcessInfo = (recordIdList, headers = {}) => {
  const reqBody = {recordIdList};
  return fetchAsync(trackingProcessInfoUrl, 'post', reqBody, false, headers);
};
export {
  getMusicMedal,
  getMusicSubscription,
  getMusicSubscriptionNew,
  getSongPlayInfo,
  getTopics,
  getMusicColumnDetail,
  redirectPersonalitySkin,
  redirectPersonalityPlayer,
  redirectSkinCatalog,
  redirectPlayerCatalog,
  praiseTopic,
  queryDevicesignature,
  queryIsCollected,
  addCollection,
  deleteCollection,
  getThirdPartyToken,
  queryUserOrderInfo,
  trackProcessInfo
};

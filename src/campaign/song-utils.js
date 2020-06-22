import { fetchAsync } from './http-client';
import { urlParamEncode } from './util';
import { hasUserInfo } from './user-info';
import device from './device';

import {
  queryMusiclistSimpleUrl,
  querySongSimpleUrl,
  musicSongInfoUrl
} from './urls';
const extraParam = {
  snsFlag: true,
  inAppbutNotUseToken: false
};
const wiseMarketAgentUrl = 'https://musiccamptest.hwcloudtest.cn:18443';

/**
 *
 * @param {Array} musicListIDs 歌单列表
 */
const queryMusiclistSimple = (musicListIDs) => {
  // 不带userToken
  extraParam.inAppbutNotUseToken = true;
  const idString = urlParamEncode({musicListIDs});

  const pageUrl = window.location.href;
  let url = queryMusiclistSimpleUrl +'?' + idString;
  if(pageUrl.includes('wisemarketing')) { // 如果是在模板理 要跨域请求
    url = wiseMarketAgentUrl + url;
    extraParam.cors = true;
  }
  return fetchAsync(url, 'get', null, false, {}, 'global', extraParam);
};

/**
 * 获取歌曲元数据
 * @param {Array} songIDs 歌曲列表
 */
const querySongSimple = (songIDs) => {
  const idString = urlParamEncode({songCodes: songIDs});

  extraParam.inAppbutNotUseToken = true;

  if(hasUserInfo && device.isHuaweiApp) {
    extraParam.inAppbutNotUseToken = false;
  }

  const url = querySongSimpleUrl + '?' + idString;
  return fetchAsync(url, 'get', null, false, {}, 'global', extraParam);
};

/**
 * 获取歌曲播放URL 和是否免费属性
 * @param {String} songId 歌曲ID
 */
const getSongPlayURL = (songId) => {
  extraParam.inAppbutNotUseToken = true;

  const pageUrl = window.location.href;
  let url = musicSongInfoUrl;
  if(pageUrl.includes('wisemarketing')) {
    url = wiseMarketAgentUrl + url;
    extraParam.cors = true;
  }

  const body = {
    contentCode: songId,
    contentType: '1'
  };

  return fetchAsync(url, 'post', body, false, {}, 'global', extraParam).then(res => {
    return {
      result: res.result,
      songId: songId,
      playURL: res.fileURL,
      isFree: res.type === '1'
    };
  });
};

/**
 * 组合查询歌曲源数据和歌曲播放列表
 * @param {Array} songIDs
 */
const getSongInfoUrl = (songIDs) => {
  const getUrlPromiseList = songIDs.map((id) => {
    return getSongPlayURL(id);
  });
  return Promise.all(
    getUrlPromiseList.concat(
      querySongSimple(songIDs).then(data => {return data.songSimpleInfos;}
      ))).then(data => {
    let songInfos = data[data.length-1];
    for(let i in songInfos){
      let playInfo = data[i];
      for(let j in songInfos) {
        if(songInfos[j].contentID === playInfo.songId) {
          songInfos[i].playURL = data[j].playURL;
          songInfos[i].isFree = data[j].isFree;
          break;
        }
      }
    }
    console.log('music data', songInfos);
    return songInfos;
  });
};
export {
  queryMusiclistSimple,
  querySongSimple,
  getSongPlayURL,
  getSongInfoUrl
};
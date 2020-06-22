import { fetchAsync } from './http-client';
import { reportVoteUrl, getVoteStatInfoUrl, getUserVoteInfoUrl } from './urls';
import { CampaignManager } from './campaign-manager';

const reportVote = (voteId, voteType, campAlias, headers = {}, type='') => {
  const body = {
    campAlias: campAlias || CampaignManager.campAlias,
    objectType: voteType,
    objectIds: voteId
  };
  return fetchAsync(reportVoteUrl, 'post', body, true, headers, type);
};

const getVoteStatInfo = (objectType, campAlias, headers = {}, type = '') => {
  // if (votePromise) {
  //   return votePromise;
  // }

  const body = {
    campAlias: campAlias || CampaignManager.campAlias,
    objectType: objectType,
  };

  return fetchAsync(getVoteStatInfoUrl, 'post', body, false, headers, type);
};

const getUserVoteInfo = (objectType, beginTime, endTime, campAlias, extParam, headers={}, type='') => {
  const body = {
    campAlias: campAlias || CampaignManager.campAlias,
    beginTime: beginTime,
    endTime: endTime,
    objectType: objectType,
    extParam: extParam || {}
  };

  return fetchAsync(getUserVoteInfoUrl, 'post', body, true, headers, type).then(data => {
    let noVoteRecord = {};
    if(!Array.isArray(data.voteInfoList)){
      return noVoteRecord;
    }
    return data.voteInfoList;
  });
};

export {
  reportVote,
  getVoteStatInfo,
  getUserVoteInfo
};

import { fetchAsync } from './http-client';
import {
  getVitalityAmountUrl,
  getVitalityDetailUrl,
  redeemVitalityGift
} from './urls';
import { CampaignManager } from './campaign-manager';

const getUserVitalityAmount = (campAlias, batchId) => {
  const body = {
    campAlias: campAlias || CampaignManager.campAlias,
    batchId: batchId
  };

  return fetchAsync(getVitalityAmountUrl, 'post', body, true);
};

const getVitalityDetail = (batchId, queryType, cursor, pageSum) => {
  const body = {
    batchId: batchId,
    queryType: queryType,
    cursor: cursor,
    pageSum: pageSum
  };

  return fetchAsync(getVitalityDetailUrl, 'post', body, true);
};

const redeemVitalityGifts = (campAlias, awardId) => {
  const body = {
    campAlias: campAlias || CampaignManager.campAlias,
    awardId: awardId
  };

  return fetchAsync(redeemVitalityGift, 'post', body, true);
};

export {
  getUserVitalityAmount,
  getVitalityDetail,
  redeemVitalityGifts
};

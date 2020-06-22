import { fetchAsync } from './http-client';
import {
  getDownloadRecord,
  getDownloadProcess,
  getAwardListUrl
} from './urls';
import { CampaignManager } from './campaign-manager';

const getDownloadRecords = (campAlias) => {
  const body = {
    campAlias: campAlias || CampaignManager.campAlias
  };

  return fetchAsync(getDownloadRecord, 'post', body, true);
};

const getCurrentProgress = (campAlias) => {
  const body = {
    campAlias: campAlias || CampaignManager.campAlias
  };

  return fetchAsync(getDownloadProcess, 'post', body, true);
};

const getAwardListByCampAlias = (campAlias) => {
  const body = {
    campAliasList: campAlias || [CampaignManager.campAlias]
  };

  return fetchAsync(getAwardListUrl, 'post', body, false);
};

export {
  getDownloadRecords,
  getCurrentProgress,
  getAwardListByCampAlias
};
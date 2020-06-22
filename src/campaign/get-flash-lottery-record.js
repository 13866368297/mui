import { fetchAsync } from './http-client';
import { getLotteryAwardInfoUrl } from './urls';
import { CampaignManager } from './campaign-manager';

const getFlashRecord = (campAlias, queryType) => {
  const body = {
    campAlias: campAlias || CampaignManager.campAlias,
    queryType: queryType
  };
  return fetchAsync(getLotteryAwardInfoUrl, 'post', body, true).then(data => {
    if (data.failed) {
      return true;
    }

    return false;
  });
};
export {
  getFlashRecord
};
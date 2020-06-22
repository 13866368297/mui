import { getCampaignList } from './urls';
import { fetchTextAsync } from './http-client';

const _getCampaignList = (positionName,pageNum,pageSum) => {
  const body = {
    model: 'ntx-100',
    pageNum:pageNum,
    pageSum:pageSum,
    positionName: positionName,
    type: '1',
    version: '2.1.4.300',
    zone: '208.2.36.33',
  };
  return fetchTextAsync(getCampaignList, 'post', body, false).then(response => {return response && response.campaigns;});
};

export {
  _getCampaignList
};
import { fetchAsync } from './http-client';
import { getCampHisUrl } from './urls';

const rewardList = (_CampAlias,pageSum) => {
  return fetchAsync(getCampHisUrl, 'post', {
    campAlias: _CampAlias,
    pageNum: 0,
    pageSum: pageSum
  }).then(data => {
    return data && data.awardList;
  });
};


export {
  rewardList
};

import { fetchAsync } from './http-client';
import { hitopidUrl } from './urls';

const getIdByHitopid = (type, hitopid) => {
  if (!type || !hitopid) {
    return;
  }

  const url = `${hitopidUrl}?type=${type}&hitopid=${hitopid}&contentPrivType=1,2,3,4&isVipVersion=1`;

  return fetchAsync(url,'get',{},false).then(data => {
    if (!Array.isArray(data.list) || !data.list[0] || !data.list[0].ID) {
      console.log('getHitopid return invalid data');
      return;
    }

    return data.list[0].ID;
  });
};

export {
  getIdByHitopid
};

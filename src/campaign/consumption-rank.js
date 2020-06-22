import { fetchAsync} from './http-client';
import { getConsumeRankInfo } from './urls';
import { userInfo } from './user-info';

const queryConsumptionRankLists = (taskId, headers ={}) => {
  const outersign = '062L11064111CN@863F150ACB855B692D9139A17F1168516F223DF81728F00C140D2490F311713E';
  const queryRankReq = {
    sign: userInfo && userInfo.sign ? userInfo.sign : outersign,
    taskId: taskId,
    deviceId: userInfo && userInfo.deviceid ? userInfo.deviceid : '',
    userToken: userInfo && userInfo.UserToken ? userInfo.UserToken : '',
    deviceType: userInfo && userInfo.idType ? userInfo.idType : '',
    terminalType: userInfo && userInfo.deviceModel ? userInfo.deviceModel : ''
  };
  return fetchAsync(getConsumeRankInfo, 'post', queryRankReq, false, headers);
};

export {
  queryConsumptionRankLists
};
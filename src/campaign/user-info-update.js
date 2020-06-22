import { CampaignManager } from './campaign-manager';
import { userAuth } from './user-auth';
import { initUserInfo } from './user-info';

const updateUserInfo = () => {
  const oldLoginStatus = CampaignManager.isLogin;

  initUserInfo();

  // 由未登录状态变化未已登录状态，调用鉴权
  if (!oldLoginStatus && CampaignManager.isLogin) {
    CampaignManager.isAuthSuccessPromise = userAuth().then((data) => {
      CampaignManager.shareId = data.shareId;
      console.log('Auth Success');
      return true;
    }, (data) => {
      console.log('Auth Failed');
      return false;
    });
  }
};

updateUserInfo();

export { updateUserInfo };

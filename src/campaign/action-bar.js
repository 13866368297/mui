import { userInfo } from './user-info';

const SUPPORT_FULL_SCREEN_VERSION = 121101100;

const _controlActionBar = (show) => {
  try {
    if (userInfo.appVersionCode > SUPPORT_FULL_SCREEN_VERSION) {
      window.JsInterface.showActionBar(show);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const showActionBar = () => {
  _controlActionBar(true);
};

const hideActionBar = () => {
  _controlActionBar(false);
};

export {
  showActionBar,
  hideActionBar
};

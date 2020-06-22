let userInfo = {};
let hasUserInfo = false;

const initUserInfo = () => {
  try {
    userInfo = JSON.parse(window.JsInterface.getParams());
  } catch (e) {
    console.log('getParams ERROR:', e.message);
    userInfo = {};
  }

  hasUserInfo = !!Object.keys(userInfo).length;
};

initUserInfo();

export { userInfo, hasUserInfo, initUserInfo };

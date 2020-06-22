import { userInfo } from './user-info';
import { getCampBasicInfoUrl, getCurrentSystemTimeUrl } from './urls';
import { fetchAsync } from './http-client';
import { userAuth } from './user-auth';

const SdkType = {
  Music: 'music',
  Theme: 'theme',
  Radio: 'radio'
};

const matches = location.href.match(/camp\/(.*?)\//);
const campId = (matches && matches[1]) || '';

const CampaignManager = {
  useCampaignServer: true,
  campAlias: '',
  campId: campId,
  campStatus: '',
  campStatusPromise: undefined,
  campType: '',
  comingTip: '',
  currentTime: undefined,
  endTime: undefined,
  endTimeOrigin: undefined,
  hasAuth: true,
  isAuthSuccessPromise: undefined,
  shareId: undefined,
  joinVersion: 0,
  loginTip: '',
  lotteryTimes: 0,
  usedTimes:0,
  musicShareVersion: 80002316,
  versionTip: '',
  sdkType: '',
  startTime: undefined,
  startTimeOrigin: undefined,
  title: '',
  subTitle: '',
  themeShareVersion: 902300,
  authFlag: false,
  userID: '',
  userNickName: '',
  // TODO: 移除所有get操作，对性能有影响
  get isMusicApp() {
    return CampaignManager.isMusicSdk &&
      userInfo && !!userInfo.appPackageName &&
      (userInfo.appPackageName.toLowerCase() === 'com.android.mediacenter');
  },

  get isThemeApp() {
    return CampaignManager.isThemeSdk &&
      userInfo && !!userInfo.appPackageName &&
      (userInfo.appPackageName.toLowerCase() === 'com.huawei.android.thememanager');
  },

  get isRadioApp() {
    return CampaignManager.isRadioSdk &&
      userInfo && !!userInfo.appPackageName &&
      (userInfo.appPackageName.toLowerCase() === 'com.huawei.android.fmradio');
  },

  get isMusicSdk() {
    return CampaignManager.sdkType === SdkType.Music;
  },

  get isThemeSdk() {
    return CampaignManager.sdkType === SdkType.Theme;
  },

  get isRadioSdk() {
    return CampaignManager.sdkType === SdkType.Radio;
  },

  get isShareVersionOK() {
    return (CampaignManager.isMusicApp && userInfo.appVersionCode >= CampaignManager.musicShareVersion) ||
      (CampaignManager.isThemeApp && userInfo.appVersionCode >= CampaignManager.themeShareVersion);
  },

  get isLogin() {
    // eslint-disable-next-line eqeqeq
    return (userInfo.isLogin && userInfo.status == '1') || userInfo.userStatus;
  }
};

const toTimeStamp = (time) => {
  if(!time) {
    return '';
  }
  const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g;
  let newTime = time.replace(pattern, '$1/$2/$3 $4:$5:$6');
  newTime = new Date(newTime).getTime();
  return newTime;
};

const initCampHis = (hasQueryColumnsFlag) => {
  if (!CampaignManager.campAlias) {
    console.error('campAlias is not set');
    return Promise.reject('campAlias is not set');
  }

  const params = {
    campAlias: CampaignManager.campAlias
  };

  if(hasQueryColumnsFlag) {
    params.queryColumnsFlag = 1;
  }
  
  return CampaignManager.campHisPromise = fetchAsync(getCampBasicInfoUrl, 'post', params, false).then(data => {
    if (data.failed) {
      console.error('Get camp basic information failed');
      return {};
    }

    data.campBasicInfo.campId && (CampaignManager.campId = data.campBasicInfo.campId);
    CampaignManager.campType && data.campBasicInfo.campType && (CampaignManager.campType = data.campBasicInfo.campType);
    CampaignManager.campDesc = data.campBasicInfo.campDesc || '';
    CampaignManager.subTitle = data.campBasicInfo.subtitle || '';
    CampaignManager.startTimeOrigin = data.campBasicInfo.startTime || undefined;
    CampaignManager.endTimeOrigin = data.campBasicInfo.endTime || undefined;
    CampaignManager.extendInfo = data.campBasicInfo.extendInfo && JSON.parse(data.campBasicInfo.extendInfo) || {};
    
    CampaignManager.joinStat = data.campBasicInfo.joinStat || 0;
    CampaignManager.joinDayStat = data.campBasicInfo.joinDayStat || 0;
    CampaignManager.viewStat = data.campBasicInfo.viewStat || 0;
    CampaignManager.viewDayStat = data.campBasicInfo.viewDayStat || 0;
    
    let startTime = toTimeStamp(data.campBasicInfo.startTime);
    let endTime = toTimeStamp(data.campBasicInfo.endTime);

    //const campDateList = data.campaign && data.campaign.campExpiredate && data.campaign.campExpiredate.split(',') || [];
    if (!startTime || !endTime) {
      console.log('Not get start/end time from server');
    }
    CampaignManager.startTime = startTime;
    CampaignManager.endTime = endTime;

    const campDataObj = {
      subTitle: CampaignManager.subTitle,
      startTime: CampaignManager.startTime,
      startTimeOrigin: CampaignManager.startTimeOrigin,
      endTime: CampaignManager.endTime,
      endTimeOrigin: CampaignManager.endTimeOrigin,
      campDesc: CampaignManager.campDesc,
      extendInfo: CampaignManager.extendInfo,
      columnInfos: data.columnInfos
    };

    hasQueryColumnsFlag && (campDataObj.columnInfos = data.columnInfos || []);

    return campDataObj;
  });
};

const getCurrentSystemTime = (headers={}) => {
  return fetchAsync(getCurrentSystemTimeUrl, 'get', null, false, headers);
};

const _initCampaignManager = (options) => {
  CampaignManager.sdkType = options.sdkType;
  CampaignManager.campAlias = options.campAlias;
  CampaignManager.campType = options.campType;
  CampaignManager.comingTip = options.comingTip;
  CampaignManager.hasAuth = options.hasAuth;
  CampaignManager.useCampaignServer = options.useCampaignServer;
  CampaignManager.joinVersion = options.joinVersion;
  CampaignManager.loginTip = options.loginTip;
  CampaignManager.versionTip = options.versionTip;
  CampaignManager.title = options.title || document.title;
  CampaignManager.subTitle = options.subTitle;
  CampaignManager.startTime = options.startTime;
  CampaignManager.startTimeOrigin = options.startTimeOrigin;
  CampaignManager.endTime = options.endTime;
  CampaignManager.endTimeOrigin = options.endTimeOrigin;
};

/**
 * 活动初始化
 * @param {Object} options 初始化选项
 * @param {String} options.sdkType
 * @param {String} options.campAlias
 * @param {String} options.wxShareImage
 * @param {String} options.wxTitle
 * @param {String} options.wxDescription
 * @param {String} [options.title]
 * @param {String} [options.subTitle]
 * @param {Number} [options.joinVersion]
 * @param {String} [options.campType=10]
 * @param {String} [options.versionTip]
 * @param {String} [options.loginTip]
 * @param {String} [options.comingTip]
 * @param {Boolean} [options.hasAuth=true]
 * @param {Boolean} [options.useCampaignServer=true]
 */
const initCampAndAuth = (options) => {
  const defaultOptions = {
    campType: '10',
    useCampaignServer: true,
    hasAuth: true,
    loginTip: '亲，你还没有登录呢~',
    comingTip: '活动未开始',
    joinVersion: options.sdkType === SdkType.Music ? 8004300 : 820382,
    versionTip: options.sdkType === SdkType.Music ? '本活动仅支持8.0.4.300及以上版本客户端参与' : '版本过低，请升级版本'
  };

  _initCampaignManager(Object.assign({}, defaultOptions, options));

  if (CampaignManager.hasAuth) {
    CampaignManager.isAuthSuccessPromise = userAuth().then((data) => {
      CampaignManager.shareId = data.shareId;
      CampaignManager.userID = data.userID;
      CampaignManager.userNickName = data.nickName;
      CampaignManager.authFlag = true;
      console.log('Auth Success');
      return true;
    }, (data) => {
      console.log('Auth Failed');
      return false;
    });
  }
};

const getCampBasicInfo = (campAlias, header) => {
  const queryBasicInfo ={
    campAlias, campAlias
  };
  return fetchAsync(getCampBasicInfoUrl, 'post', queryBasicInfo, false, header);
};
export {
  CampaignManager,
  SdkType,
  initCampHis,
  getCurrentSystemTime,
  initCampAndAuth,
  getCampBasicInfo
};

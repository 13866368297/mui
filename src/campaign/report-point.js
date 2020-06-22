import { CampaignManager } from './campaign-manager';
import { fetchAsync } from './http-client';
import { reportCdrUrl } from './urls';
import { userInfo, hasUserInfo } from './user-info';
import device from './device';
import { GoToActivityHomePagePoint, GoToActivityShareHomePagePoint } from './points';
import { formatDate } from './date-format';
import { getQueryParams } from './search-params';
import { xpageTraceId } from './trace-id-singleton';

let options = {};

/**
 * 打点配置项
 * @param {Object} [value] 配置项
 * @param {String} [value.frame]
 * @param {String} [value.adPositionId]
 */
const setPointOption = (value) => {
  options = Object.assign({}, options, value);
};

const nodeTypeEnum = {
  TEXT_ELEMENT: 3,
  ELEMENT_NODE: 1,
  DOCUMENT_NODE: 9,
  DOCUMENT_FRAGMENT_NODE: 11,
  CDATA_SECTION_NODE: 4
};

const getTarget = (event) => {
  return event.target || event.srcElement;
};

const getValidTarget = (node) => {
  return node.nodeType === nodeTypeEnum.TEXT_ELEMENT ?
    node.parentNode :
    node.nodeType === nodeTypeEnum.CDATA_SECTION_NODE ? null : node.correspondingUseElement ? node.correspondingUseElement : node;
};

const _reportPoint = (point, opts) => {
  const params = getQueryParams();
  let operator = params['operator'];

  // 坑：服务器可能未转义URL，直接追加query string，导致问号重复
  if (operator) {
    operator = operator.split('?')[0];
    if (operator.match('#/')) {
      operator = operator.split('#/')[0];
    }
  }

  let idtype;
  if (CampaignManager.isThemeApp) {
    idtype = userInfo.idType;
  } else if ((CampaignManager.isMusicApp || CampaignManager.isRadioApp) && (userInfo.deviceType || 0 === userInfo.deviceType)) {
    idtype = userInfo.deviceType;
  }

  const _report = () => {
    let extParamsReq = {
      campname: CampaignManager.title,
      operator: operator,
      appVersionName: userInfo.appVersionName,
      appLayout: userInfo.appLayout,
      isVIP: userInfo.vipStatue || userInfo.memberStatus,
      campType: CampaignManager.campType,
      // frame,
      rte: device.getMobileOS(),
      appid: CampaignManager.isMusicSdk ? '100001' : '100002',
      clientTraceId: userInfo ? userInfo['x-clienttraceid'] : '',
      pageTraceId: xpageTraceId,
      deviceModel: userInfo.deviceModel || ''
    };
    extParamsReq = Object.assign(extParamsReq, opts);
  
    if (CampaignManager.startTime && CampaignManager.endTime) {
      // Fixed timezone, using Beijing Time
      const startTime = new Date(CampaignManager.startTime);
      const endTime = new Date(CampaignManager.endTime);
      startTime.setTime(startTime.getTime() + (8 * 60 + startTime.getTimezoneOffset()) * 60 * 1000);
      endTime.setTime(endTime.getTime() + (8 * 60 + endTime.getTimezoneOffset()) * 60 * 1000);

      extParamsReq.starttime = formatDate(startTime, 'yyyy-MM-dd hh:mm:ss');
      extParamsReq.endtime = formatDate(endTime, 'yyyy-MM-dd hh:mm:ss');
    }

    const reportReq = {
      campAlias: CampaignManager.campAlias,
      campId: CampaignManager.campId,
      terminalId: userInfo.deviceid,
      actType: point,
      idType: idtype,
      extParams: JSON.stringify(extParamsReq),
      adPositionId: opts.adPositionId
    };


    return fetchAsync(reportCdrUrl, 'post', reportReq, false);
  };

  return (CampaignManager.campStatusPromise && CampaignManager.campStatusPromise.then(_report))
    || (!CampaignManager.campStatusPromise && _report());
};

/**
 * 上报打点数据
 * @param {String} point 打点号
 * @param {Object} [options] 配置项
 * @param {String} [options.frame]
 * @param {String} [options.adPositionId]
 * @param {String} [options.songId]
 * @param {String} [options.songName]
 * @param {String} [options.componentID]
 * @param {String} [options.customfield1] 预留字段
 * @param {String} [options.customfield2]
 * @param {String} [options.customfield3]
 * @param {String} [options.customfield4]
 * @param {String} [options.customfield5]
 * @param {String} [options.customfield6]
 */
const reportPoint = (point, options = {}) => {
  if (hasUserInfo || device.isHuaweiApp) {
    return _reportPoint(point, options);
  } else {
    let newPoint = point.startsWith('share') ? point : 'share' + point.charAt(0).toUpperCase() + point.slice(1);
    if (newPoint === 'shareMusic100282') {
      newPoint = 'shareMusic100021';
    }

    return _reportPoint(newPoint, options);
  }
};

const isNodeTheRoot = (node) => {
  return 'BODY' === node.nodeName || null === node.parentNode;
};

const getReportPoint = (node) => {
  const point = node.getAttribute('data-point');
  if (point) {
    return point;
  }

  if (!isNodeTheRoot(node.parentNode)) {
    return getReportPoint(node.parentNode);
  }
};

const handleClickEvent = (event) => {
  let node = getTarget(event);
  node = getValidTarget(node);
  const point = getReportPoint(node);

  if (point) {
    reportPoint(point);
  }
};

const handleDOMLoaded = () => {
  if (!CampaignManager.useCampaignServer) {
    return;
  }

  if (CampaignManager.isMusicApp || CampaignManager.isThemeApp || CampaignManager.isRadioApp ||
    (device.isHuaweiApp && CampaignManager.isThemeSdk)) {
    reportPoint(GoToActivityHomePagePoint, options);
  } else {
    reportPoint(GoToActivityShareHomePagePoint, options);
  }
};

const handleUnloadEvent = () => {
  window.removeEventListener('load', handleDOMLoaded, false);
  document.removeEventListener('click', handleClickEvent, true);
};

/**
 * tips: 模板同步过来
 * @description 运维大数据打点接口
 * @param opts.logType interface/runtime
 * @param opts.logLevel INFO/ERROR/WARN
 * @param opts.interfaceName 接口名称/ schema链接 / 外链完整URL /静态资源完整链接
 * @param opts.xtraceId 单次接口调用唯一
 * @param opts.retCode 返回码
 * @param opts.retMsg 返回消息
 */
const customOMByJsonString = (opts) => {
  const queryParams = getQueryParams();

  const sensetiveKeys = [
    'sign',
    'deviceid',
    'safeToken',
    'UserToken'
  ];
  const insensetiveKeys = [
    'appVersionName',
    'hc',
    'userStatus',
    'deviceModel',
    'idType',
    'clienttraceid',
    'appkey',
    'isLogin',
    'appPackageName',
    'emuiVersionName'
  ];
  const logInfo = {};
  sensetiveKeys.forEach(function(key){
    logInfo[key] = userInfo[key] ? 'not blank' : 'blank';
  });

  insensetiveKeys.forEach((key) => {
    logInfo[key] = userInfo[key];
  });

  let appId = '';
  if (CampaignManager.isMusicSdk) {
    appId = '100001';
  } else if (CampaignManager.isThemeSdk) {
    appId = '100002';
  }else if (CampaignManager.isRadioSdk) {
    appId = '100003';
  }
  
  let uuid = localStorage.getItem('Campaign_LOG_H5_OM501');
  if(!uuid) {
    uuid = genID(32);
    localStorage.setItem('Campaign_LOG_H5_OM501', uuid);
  } 
  const defaultParams = [
    { 'key': 'campName', 'value': CampaignManager.title || document.title},
    { 'key': 'campId', 'value': getCampIdFromUrl(location.href)},
    { 'key': 'logType', 'value': opts.logType},
    { 'key': 'logLevel', 'value': opts.logLevel},
    { 'key': 'interfaceName', 'value': opts.interfaceName},

    { 'key': 'x-clienttraceid', 'value': userInfo['x-clienttraceid'] || ''},
    { 'key': 'pageTraceId', 'value': xpageTraceId},
    { 'key': 'x-traceid', 'value': opts.xtraceId},

    { 'key': 'appVersionCode', 'value': userInfo['appVersionCode'] || ''},
    { 'key': 'emuiVersionName', 'value': userInfo['emuiVersionName'] || ''},
    { 'key': 'deviceModel', 'value': userInfo['deviceModel'] || ''},
    { 'key': 'logInfo', 'value':  logInfo},
    { 'key': 'retCode', 'value':  opts.retCode || ''}, 
    { 'key': 'retMsg', 'value':  opts.retMsg || ''}, 
    { 'key': 'logTime', 'value':  formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss SS')}, 
    { 'key': 'operator', 'value': queryParams.operator || ''},
    { 'key': 'appId', 'value': appId},
    { 'key': 'isLogin', 'value': userInfo.isLogin || ''},
    { 'key': 'hc', 'value': userInfo.hc || ''},
    { 'key': 'tag', 'value': opts.tag || ''},
    { 'key': 'userAgent', 'value': navigator.userAgent},
    { 'key': 'uuid', 'value': uuid}
  ];
  if(!CampaignManager.isAuthSuccessPromise) {
    defaultParams.push(    
      { 'key': 'isAuth', 'value': false},
    );
    try {
      if(CampaignManager.isThemeSdk) {
        window.JsInterface && window.JsInterface.bireport && window.JsInterface.bireport('H5_OM501', JSON.stringify(defaultParams));
      }else {
        window.JsInterface && window.JsInterface.customOMByJsonString && window.JsInterface.customOMByJsonString('H5_OM501', JSON.stringify(defaultParams));
  
      }
    } catch (e) {
    }
  }else {
    CampaignManager.isAuthSuccessPromise.then(authSuccess => {
      defaultParams.push(    
        { 'key': 'isAuth', 'value': authSuccess},
      );
      try {
        if(CampaignManager.isThemeSdk) {
          window.JsInterface && window.JsInterface.bireport && window.JsInterface.bireport('H5_OM501', JSON.stringify(defaultParams));
        }else {
          window.JsInterface && window.JsInterface.customOMByJsonString && window.JsInterface.customOMByJsonString('H5_OM501', JSON.stringify(defaultParams));
    
        }
      } catch (e) {
      }
    });

  }
};

const genID = (length) => {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
};
(() => {
  window.addEventListener('load', handleDOMLoaded, false);
  document.addEventListener('click', handleClickEvent, true);
  window.addEventListener('unload', handleUnloadEvent, false);
})();

const getCampIdFromUrl = (url) => {
  return (/camp\/(\d+)\/(.+)\.html/g.exec(url) || [])[1] || CampaignManager.campId;
};

export {
  reportPoint,
  setPointOption,
  customOMByJsonString
};

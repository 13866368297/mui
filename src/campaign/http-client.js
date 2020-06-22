import ResponseStatus from './response-status';
import header from './http-header';
import {getSNSServerHeader} from './http-sns-server-header';
import { CampaignManager } from './campaign-manager';
import retCodeHandle from './retCodeHandle/index';
import {customOMByJsonString } from './report-point';
import { genID } from './trace-id-singleton';

let _headers = header;
let rangeType = 'global';
function _status(response, headers) {
  response.option = {
    xTraceId: headers['x-traceid'],
    url: response.url
  };
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function _updateToken(response) {
  const token = response.headers.get('campaign-token');
  token && setHeaders({ 'campaign-token': token });

  return Promise.resolve(response);
}

function _json(response) {
  const opts = response.option;
  return response.json().then(data => {
    data.report = opts;
    return Promise.resolve(data);
  });
}

function _text(response) {
  let opts = response.option;
  try {
    opts = JSON.stringify(opts);
  } catch (err) {
    opts = '';
    console.log(err);
  }
  return response.text().then((res) => {
    res = res.slice(0, res.length - 1) + ',"report":' + opts + '}';
    return Promise.resolve(res);
  });
}

function _convertNumberToString(response, keyword) {
  if (typeof response === 'object') {
    try {
      response = JSON.stringify(response);
    } catch (err) {
      return Promise.reject(response);
    }
  }

  const pattern = new RegExp(`"${keyword}":(\\d+),`, 'g');
  // TODO: 将来会弃用 把recordId整型转为为string类型 解决JSON.parse精度不够问题
  const replacedText = response.replace(pattern, `"${keyword}":"$1",`);

  return Promise.resolve(replacedText);
}

function _replaceRecordId(response) {
  return _convertNumberToString(response, 'recordId');
}

function _replaceCampId(response) {
  return _convertNumberToString(response, 'campId');
}

function _converToJsonObject(response) {
  let json = {};
  try {
    json = JSON.parse(response);
  } catch (err) {
    err.message && (response.message = err.message);
    return Promise.reject(response);
  }

  return Promise.resolve(json);
}
function reportBigData(interfaceName, xtraceId, retCode, retMsg) {
  const params = {
    logType: 'interface',
    logLevel: 'INFO',
    interfaceName,
    xtraceId,
    retCode,
    retMsg,
    tag: 'API'
  };
  customOMByJsonString(params);
}
function _responseStatusHandle(response) {
  let logInfo = '';
  let retCode = '';
  if ((response.retCode && response.retCode !== '0') ||
      (response.result && response.result.resultCode !== '000000') || 
      (response.resultCode && response.resultCode !=='0') ||  
      (response.resultcode && response.resultcode !=='0')) {
    if(response.retCode !== '0') {
      retCodeHandle(response.retCode, rangeType);
      ResponseStatus[response.retCode] && console.error(ResponseStatus[response.retCode].description);
      retCode = response.retCode;
      logInfo = `${response.retDesc || 'default_failed'}`;
    }else if(response.result && response.result.resultCode !== '000000') {
      retCode = response.result.resultCode;
      logInfo = `${response.result.resultMessage || 'default_failed'}`;
    }else if(response && response.resultCode !== '0'){
      retCode = response.resultCode;
      logInfo = `${response.resultInfo || 'default_failed'}`;
    }else if(response && response.resultcode !== '0'){
      retCode = response.resultcode;
      logInfo = `${response.resultInfo || 'default_failed'}`;
    }
    reportBigData(response.report.url, response.report.xTraceId, retCode, logInfo);
    return Promise.reject(response);
  } else {
    if(response.retCode === '0') {
      retCode = response.retCode;
      logInfo = `${response.retDesc || 'default_success'}`;
    }else if(response.result && response.result.resultCode==='000000') {
      retCode = response.result.resultCode;
      logInfo = `${response.result.resultMessage || 'default_success'}`;
    }else if(response.resultcode && response.resultcode === '0'){
      retCode = response.resultcode;
      logInfo = `${response.resultInfo || 'default_success'}`;
    }else if(response.resultCode && response.resultCode === '0'){
      retCode = response.resultCode;
      logInfo = `${response.resultInfo || 'default_success'}`;
    }
    reportBigData(response.report.url, response.report.xTraceId, retCode, logInfo);

    delete response.report;
    return Promise.resolve(response);
  }
}

function _exceptionHandler(data) {
  data.failed = data.message || true;
  // return promise resolve here, do not catch exception again.
  return Promise.resolve(data);
}

function setHeaders(value) {
  _headers = Object.assign({}, _headers, value);
}

function fetchRaw(url, method, body, headers = {}, type = 'global', cors = false) {
  // 每一次请求都需要刷新一遍x-traceid
  headers['x-traceid'] = genID(32);

  // 运维大数据打点
  reportBigData(url, headers['x-traceid']);
  rangeType = type;
  const options = {
    method: method || 'get',
    headers,
    credentials: 'include'
  };
  //支持跨域请求
  if(cors) {
    options.mode = 'cors';
    // 以下两个头部自定义参数在预检请求时不允许
    delete options.headers['Mobile-Agent'];
    delete options.headers['x-traceid'];
  }

  const m = options.method.toLowerCase();
  if (body && m !== 'get' && m !== 'head') {
    try {
      if (headers['Content-Type'].indexOf('x-www-form-urlencoded') > -1) {
        options.body = '';
        Object.keys(body).forEach(k => options.body += `&${k}=${body[k]}`);
        options.body = options.body.slice(1);
      } else {
        options.body = JSON.stringify(body);
      }
    } catch(err) {
      return Promise.reject(new Error('body parameter is not invalid'));
    }
  } else if (body && m === 'get') {
    let params = '';
    Object.keys(body).map(k => params += `&${k}=${encodeURIComponent(body[k])}`);

    if (url.indexOf('?') === -1) {
      params = '?' + params.slice(1);
    }

    url += params;
  }

  return fetch(url, options)
    .then(res => _status(res, headers));
}

function fetchJson(url, method, body, withAuth = true, headers, type = 'global', extraParam = {}) {
  return _fetchAsync(url, method, body, withAuth, headers, type, extraParam)
    .then(_json)
    .then(_responseStatusHandle);
}

function fetchText(url, method, body, withAuth = true, headers, type = 'global', extraParam = {}) {
  return _fetchAsync(url, method, body, withAuth, headers, type, extraParam)
    .then(_text)
    .then(_responseStatusHandle);
}

function fetchAsync(url, method, body, withAuth = true, headers = {}, type = 'global', extraParam = {}) {
  return _fetchAsync(url, method, body, withAuth, headers, type, extraParam)
    .then(_json)
    .then(_responseStatusHandle)
    .catch(err => _exceptionHandler(err));
}

function fetchTextAsync(url, method, body, withAuth = true, headers = {}, type = 'global', extraParam = {}) {
  return _fetchAsync(url, method, body, withAuth, headers, type, extraParam)
    .then(_text)
    .then(_replaceRecordId)
    .then(_replaceCampId)
    .then(_converToJsonObject)
    .then(_responseStatusHandle)
    .catch(err => _exceptionHandler(err));
}

function _fetchAsync(url, method, body, withAuth, headers, type, extraParam) {
  if (CampaignManager.isMusicSdk) {
    setHeaders({'x-appid': '100001'});
  } else if (CampaignManager.isThemeSdk) {
    setHeaders({'x-appid': '100002'});
  }else if (CampaignManager.isRadioSdk) {
    setHeaders({'x-appid': '100003'});
  }

  let newHeaders;
  // 判断请求是微服务接口或者营销服务器接口
  if(extraParam && extraParam.snsFlag){
    const _snsHeader = getSNSServerHeader(url, extraParam.inAppbutNotUseToken);
    newHeaders = Object.assign({}, _snsHeader, headers);
  }else {
    newHeaders = Object.assign({}, _headers, headers);
  }

  const cors = extraParam && extraParam.cors;

  if (!withAuth) {
    return fetchRaw(url, method, body, newHeaders, type, cors)
      .then(_updateToken);
  } else if (withAuth && CampaignManager.hasAuth && CampaignManager.isAuthSuccessPromise) {
    let authPromise = false;
    if(window.isCampReadyPromise){
      authPromise = window.isCampReadyPromise;
    }else {
      authPromise = CampaignManager.isAuthSuccessPromise;
    }
    return authPromise.then(isAuthSuccess => {
      newHeaders = Object.assign({}, _headers, headers);
      if (isAuthSuccess) {
        return fetchRaw(url, method, body, newHeaders, type)
          .then(_updateToken);
      } else {
        // Auth Failed
        return Promise.reject(new Error(`API: ${url} returns back directly since auth failed`));
      }
    });
  } else {
    return Promise.resolve({failed: `The API ${url} should be called after auth success`});
  }
}

export {
  fetchJson,
  fetchText,
  fetchRaw,
  fetchAsync,
  fetchTextAsync,
  setHeaders
};

const _escape2Html = function (str) {
  var arrEntities = {
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'amp': '&',
    'quot': '"'
  };

  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
    return arrEntities[t];
  });
};

const parseUrl = function (url) {
  var a = document.createElement('a');
  a.href = _escape2Html(decodeURIComponent(url || window.location.href));
  return {
    protocol: a.protocol.replace(':', ''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function () {
      var ret = {},
        seg = a.search.replace(/^\?/, '').split('?')[0].split('&'),
        len = seg.length,
        i = 0,
        s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    file: (a.pathname.match(/\/([^/?#]+)$/i) || ['', ''])[1],
    path: a.pathname.replace(/^([^/])/, '/$1')
  };
};

export default parseUrl;

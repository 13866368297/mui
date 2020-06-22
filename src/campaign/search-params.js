var getQueryParams = function (url) {
  url || (url = window.location.search);
  var search = url.split('?')[1] || '',
    pattern = /([^&=]+)=([^&]*)/g,
    params = {},
    q;
  
  while ((q = pattern.exec(search)) && q) {
    params[decodeURIComponent(q[1])] = decodeURIComponent(q[2]);
  }

  return params;
};

export {
  getQueryParams
};

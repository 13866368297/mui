function testSupportsPassive () {
  let support = false;
  try {
    let opts = Object.defineProperty({}, 'passive', {
      get: function () {
        support = true;
        return support;
      }
    });
    window.addEventListener('test', null, opts);
  } catch (e) {
    console.log(e);
  }
  return support;
}

const supportsPassive = testSupportsPassive();

function addPassiveEventListener (el, type, action, capture) {
  if (supportsPassive) {
    el.addEventListener(type, action, {
      capture: capture,
      passive: true
    });
  } else {
    el.addEventListener(type, action, capture);
  }
}

function removePassiveEventListener (el, type, action, capture) {
  el.removeEventListener(type, action, capture);
}

const urlParamEncode = (param) => {
  // {a: 1, b:2}
  // {a: [1,2,3]} => a=1&a=2&a=3
  if(param === null) return '';
  const _result = [];
  for (let key in param) {
    let value = param[key];

    if (Array.isArray(value)) {
      value.forEach(function(_value) {
        _result.push(key + '=' + _value);
      });
    } else {
      _result.push(key + '=' + value);
    }
  }
  return _result.join('&');
};

export {
  supportsPassive,
  addPassiveEventListener,
  removePassiveEventListener,
  urlParamEncode
};

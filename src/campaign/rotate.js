let _timer;
let _animateStartTime;
let _animateStartAngle;
let _angle;
let _parameters;
let _img;

let supportedCSS, supportedCSSOrigin, styles = document.getElementsByTagName('head')[0].style,
  toCheck = 'transformProperty WebkitTransform OTransform msTransform MozTransform'.split(' ');

for (let a = 0; a < toCheck.length; a++) {
  if (styles[toCheck[a]] !== undefined) {
    supportedCSS = toCheck[a];
    break;
  }
}

if (supportedCSS) {
  supportedCSSOrigin = supportedCSS.replace(/[tT]ransform/, 'TransformOrigin');
  if (supportedCSSOrigin[0] === 'T') supportedCSSOrigin[0] = 't';
}

const rotate = function (img, parameters) {
  _img = img;
  _parameters = parameters;
  _angle = parameters.angle;
  _animateStart();
};


const _animateStart = function () {
  if (_timer) {
    clearTimeout(_timer);
  }
  _animateStartTime = +new Date;
  _animateStartAngle = _angle;
  _animate();
};

const _animate = function () {
  var actualTime = +new Date;
  var checkEnd = actualTime - _animateStartTime > _parameters.duration;

  if (checkEnd) {
    clearTimeout(_timer);
  } else {
    if (_img) {
      var angle = _defaultEasing(
        actualTime - _animateStartTime,
        _animateStartAngle,
        _parameters.animateTo - _animateStartAngle,
        _parameters.duration);
      _rotate((~~(angle * 10)) / 10);
    }

    _timer = setTimeout(function () {
      _animate();
    }, 10);
  }

  if (_parameters.callback && checkEnd) {
    _angle = _parameters.animateTo;
    _rotate(_angle);
    _parameters.callback.call();
  }
};

const _defaultEasing = function (t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};

const _rotate = function (angle) {
  _angle = angle;
  _img.style[supportedCSS] = 'rotate(' + (angle % 360) + 'deg)';
  _img.style[supportedCSSOrigin] = '50% 50%';
};

export default rotate;

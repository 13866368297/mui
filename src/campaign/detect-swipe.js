function detectSwipe(el, callback = () => {}) {
  var swipeDir,
    startX,
    startY,
    distX,
    distY;

  var handleTouchStart = function (e) {
    var touchobj = e.changedTouches[0];
    swipeDir = 'none';
    startX = touchobj.pageX;
    startY = touchobj.pageY;
  };

  var handleTouchEnd = function (e) {
    var touchobj = e.changedTouches[0];
    distX = touchobj.pageX - startX;
    distY = touchobj.pageY - startY;
    if (Math.abs(distX) > Math.abs(distY)) {
      swipeDir = (distX < 0) ? 'left' : 'right';
    } else if (Math.abs(distY) > Math.abs(distX)) {
      swipeDir = (distY < 0) ? 'up' : 'down';
    }
    callback(swipeDir);
  };

  el.addEventListener('touchstart', handleTouchStart, false);
  el.addEventListener('touchend', handleTouchEnd, false);

  return function () {
    el.removeEventListener('touchstart', handleTouchStart, false);
    el.removeEventListener('touchend', handleTouchEnd, false);
  };
}

export {
  detectSwipe
};

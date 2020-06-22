import html2canvas from 'html2canvas';

const _canvas2Image = (canvas) => {
  let image = new Image();
  let sharePicUrl = '';
  image.crossOrigin = 'anonymous';
  image.crossOrigin = '*';
  image.src = canvas.toDataURL('image/jpeg', 1.0);
  sharePicUrl = canvas.toDataURL('image/jpeg', 1.0);
  return sharePicUrl;
};

const screenShot = (cntElem) => {
  let shareContent = cntElem; //需要截图的包裹的（原生的）DOM 对象
  let width = 0; //获取dom 宽度
  let height = 0; //获取dom 高度
  width = shareContent.offsetWidth; //获取dom 宽度
  height = shareContent.offsetHeight; //获取dom 高度
  let canvas = document.createElement('canvas'); //创建一个canvas节点
  let scale = 2; //定义任意放大倍数 支持小数
  canvas.width = width * scale; //定义canvas 宽度 * 缩放
  canvas.height = height * scale; //定义canvas高度 *缩放
  canvas.getContext('2d').scale(scale, scale); //获取context,设置scale
  let opts = {
    scale: scale,
    canvas: canvas,
    // width: width,
    // height: height,
    useCORS: true
  };
  return html2canvas(shareContent, opts).then(function (canvas) {
    let context = canvas.getContext('2d');
    // 【重要】关闭抗锯齿
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    let screenShotUrl = _canvas2Image(canvas);
    return new Promise((resolve) => {
      resolve(screenShotUrl);
    });
  });

};

export default screenShot;
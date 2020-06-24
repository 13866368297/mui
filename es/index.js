import DemoButton from 'C:/Users/hwx5328447/Desktop/vant/mui/src/components-base/demo-button';
var version = '1.0.0';

function install(Vue) {
  var components = [DemoButton];
  components.forEach(function (item) {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { install, version, DemoButton };
export default {
  install: install,
  version: version
};
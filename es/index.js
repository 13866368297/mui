import DemoButton from 'C:/Users/hongjunjie/Desktop/vant/mui/src/components-base/demo-button';
import fetch from 'C:/Users/hongjunjie/Desktop/vant/mui/src/plugins/fetch';
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

export { install, version, DemoButton, fetch };
export default {
  install: install,
  version: version
};
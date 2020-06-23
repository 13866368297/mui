import Dialog from './dialog';
import DemoButton from './demo-button';
var version = '1.0.0';

function install(Vue) {
  var components = [Dialog, DemoButton];
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

export { install, version, Dialog, DemoButton };
export default {
  install: install,
  version: version
};
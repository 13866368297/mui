import Dialog from './dialog';
import DemoButton from './demo-button';
import fetch from './fetch';
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

export { install, version, Dialog, DemoButton, fetch };
export default {
  install: install,
  version: version
};
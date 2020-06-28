import Button from 'C:/Users/hwx5328447/Desktop/vant/mui/src/components-base/button';
import Dialog from 'C:/Users/hwx5328447/Desktop/vant/mui/src/components-base/dialog';
import fetch from 'C:/Users/hwx5328447/Desktop/vant/mui/src/plugins/fetch';
const version = '1.0.0';

function install(Vue) {
  const components = [
    Button,
    Dialog
  ];

  components.forEach(item => {
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

export {
  install,
  version,
  Button,
  Dialog,
  fetch
};

export default {
  install,
  version
};

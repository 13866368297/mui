import Dialog from 'C:/Users/hwx5328447/Desktop/vant/mui/src/components/dialog';
import DemoButton from 'C:/Users/hwx5328447/Desktop/vant/mui/src/components-base/demo-button';
import Log from 'C:/Users/hwx5328447/Desktop/vant/mui/src/components/dialog';

const version = '1.0.0';

function install(Vue) {
  const components = [
    Dialog,
    DemoButton,
    Log
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
  Dialog,
  DemoButton,
  Log
};

export default {
  install,
  version
};

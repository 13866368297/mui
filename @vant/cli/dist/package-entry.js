import DemoButton from 'C:/Users/hwx5328447/Desktop/vant/mui/src/demo-button';
import Log from 'C:/Users/hwx5328447/Desktop/vant/mui/src/log';

const version = '1.0.0';

function install(Vue) {
  const components = [
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
  DemoButton,
  Log
};

export default {
  install,
  version
};

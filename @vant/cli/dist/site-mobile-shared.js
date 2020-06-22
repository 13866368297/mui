import Vue from 'vue';
import PackageEntry from './package-entry';
import './package-style';

import DemoButton from 'C:/Users/hwx5328447/Desktop/vant/mui/src/demo-button/demo/index.vue';

Vue.use(PackageEntry);

DemoButton.name = 'demo-demo-button';

export const demos = {
  DemoButton
};
export const config = {
  "name": "mui",
  "build": {
    "css": {
      "preprocessor": "sass"
    },
    "site": {
      "publicPath": "/mui/"
    },
    "srcDir": [
      "src1/compoennts",
      "src1/compoennts-base"
    ]
  },
  "site": {
    "title": "mui",
    "logo": "https://img.yzcdn.cn/vant/logo.png",
    "nav": [
      {
        "title": "基础组件",
        "items": [
          {
            "path": "demo-button",
            "title": "DemoButton 按钮"
          }
        ]
      }
    ]
  }
}

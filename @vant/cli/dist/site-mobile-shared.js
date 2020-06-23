import Vue from 'vue';
import PackageEntry from './package-entry';
import './package-style';

import Dialog from 'C:/Users/hwx5328447/Desktop/vant/mui/src/components/dialog/demo/index.vue';
import DemoButton from 'C:/Users/hwx5328447/Desktop/vant/mui/src/components-base/demo-button/demo/index.vue';

Vue.use(PackageEntry);

Dialog.name = 'demo-dialog';
DemoButton.name = 'demo-demo-button';

export const demos = {
  Dialog,
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
    "srcDir": "src",
    "componentsDir": [
      "src/components",
      "src/components-base",
      "src/utils"
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
          },
          {
            "path": "dialog",
            "title": "弹框"
          }
        ]
      }
    ]
  }
}

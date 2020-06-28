import Vue from 'vue';
import PackageEntry from './package-entry';
import './package-style';

import Button from 'C:/Users/hwx5328447/Desktop/vant/mui/src/components-base/button/demo/index.vue';
import Dialog from 'C:/Users/hwx5328447/Desktop/vant/mui/src/components-base/dialog/demo/index.vue';

Vue.use(PackageEntry);

Button.name = 'demo-button';
Dialog.name = 'demo-dialog';

export const demos = {
  Button,
  Dialog
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
      "src/components-base"
    ],
    "pluginsDir": [
      "src/plugins"
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
            "path": "button",
            "title": "Button 按钮"
          },
          {
            "path": "dialog",
            "title": "Dialog 弹框"
          }
        ]
      }
    ]
  }
}

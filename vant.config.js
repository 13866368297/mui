module.exports = {
  name: 'mui',
  build: {
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: '/mui/',
    },
    srcDir: "src",
    componentsDir:["src/components","src/components-base","src/utils"]
  },
  site: {
    title: 'mui',
    logo: 'https://img.yzcdn.cn/vant/logo.png',
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'demo-button',
            title: 'DemoButton 按钮',
          },
          {
            path: 'dialog',
            title: '弹框',
          },
        ],
      },
    ],
  },
};

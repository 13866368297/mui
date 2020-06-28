# Button 按钮

### 介绍

Button 是一个示例按钮组件

### 引入

```js
import Vue from 'vue';
import { Button } from 'mui';

Vue.use(Button);
```

## 代码演示

### 按钮类型

支持`default`、`primary`、`info`、`warning`、`danger`五种类型，默认为`default`

```html
<van-button>默认按钮</van-button>
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
```

### 自定义颜色

通过`color`属性可以自定义按钮的颜色

```html
<van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">渐变色按钮</van-button>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| type | 按钮类型 | *string* | `primary` |
| color `1.0.0` | 按钮颜色 | *string* | - |

### Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| click | 点击时触发 | event: Event |

### Slots

| 名称 | 说明 |
|------|------|
| default | 默认插槽 |

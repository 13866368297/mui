# Dialog 按钮

### 介绍

Dialog 是一个示例按钮组件

### 引入

```js
import Vue from 'vue';
import { Dialog } from 'mui';

Vue.use(Dialog);
```

## 代码演示

### 基础用法

```html
<demo-button type="primary" />
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

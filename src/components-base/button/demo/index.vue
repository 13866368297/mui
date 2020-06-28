<template>
  <demo-section>
    <demo-block title="基础用法">
      <mui-button class="button">默认按钮</mui-button>
      <mui-button type="primary" class="button">主要按钮</mui-button>
      <mui-button type="info" class="button">信息按钮</mui-button>
      <mui-button type="warning" class="button">警告按钮</mui-button>
      <mui-button type="danger" class="button">危险按钮</mui-button>
    </demo-block>
    <demo-block title="自定义颜色">
      <mui-button @click="log" color="linear-gradient(to right, rgb(75, 176, 255), rgb(97, 73, 246))" class="button">按钮</mui-button>
    </demo-block>
  </demo-section>
</template>
<script>
export default {
  methods:{
    log(){
      console.log("log======");
    }
  }
}
</script>
<style lang="scss">
    .button{
      margin-left: 15px;
      margin-top: 15px;
    }
</style>  
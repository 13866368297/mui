<template>
  <demo-section>
    <demo-block title="文字提示">
      <mui-button type="primary" class="space-between" @click="showToast">文字提示</mui-button>
      <mui-button type="primary" class="space-between">提示弹框（无标题）</mui-button>
    </demo-block>
    <demo-block title="加载提示">
      <mui-button type="primary" class="space-between">加载提示</mui-button>
    </demo-block>
    <demo-block title="自定义图标">
      <mui-button type="primary" class="space-between">自定义图标</mui-button>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data(){
    return {
      show: false
    }
  },
  methods: {
    showToast() {
      this.$toast("这是一条长文字提示，超过一定字数就会换行");
    }
  }
};
</script>
<style lang="scss">
.space-between {
  margin: 15px 0 0 15px;
}
</style>

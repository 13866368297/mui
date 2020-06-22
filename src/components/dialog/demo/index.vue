<template>
  <demo-section>
    <demo-block title="基础用法">
      <!-- <demo-button type="primary" style="margin-left: 15px;" @touchstart="showDialog">显示Dialog</demo-button> -->
      <div @click="showDialog">显示Dialog</div>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  methods: {
    showDialog() {
      console.log('======');
      this.$dialog();
    }
  }
};
</script>

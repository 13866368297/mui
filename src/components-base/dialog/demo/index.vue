<template>
  <demo-section>
    <demo-block title="提示弹框">
      <mui-button type="primary" class="space-between" @click="showDialog">提示弹框</mui-button>
      <mui-button type="primary" class="space-between" @click="showDialogNoTitle">提示弹框（无标题）</mui-button>
    </demo-block>
    <demo-block title="确认弹框">
      <mui-button type="primary" class="space-between" @click="showDialogWithConfirm">确认弹框</mui-button>
    </demo-block>
    <demo-block title="组件调用">
      <mui-button type="primary" class="space-between" @click="show = true">组件调用</mui-button>
      <mui-dialog v-model="show" title="标题" show-cancel-button>
        <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />
      </mui-dialog>
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
    showDialog() {
      this.$dialog({
        title: '标题',
        message: '弹窗内容',
        confirmButtonText: "好的"
      });
    },
    showDialogNoTitle() {
      this.$dialog.alert({ message: '提示弹框（无标题）' });
    },
    showDialogWithConfirm() {
      this.$dialog.confirm();
    }
  }
};
</script>
<style lang="scss">
.space-between {
  margin: 15px 0 0 15px;
}
</style>

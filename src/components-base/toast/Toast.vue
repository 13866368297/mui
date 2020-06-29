<template>
  <div class="toast" v-show="visiable">
    <div class="message">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'mui-toast',
  props: {
    message: String
  },
  data() {
    return {
      visiable: true
    };
  },
  mounted() {},
  methods: {
    show() {
      this.visiable = true;
    },
    hide() {
      this.visiable = false;
    }
  }
};
</script>

<style scoped lang="scss">
.toast {
  background-color: rgba(50, 50, 51, 0.88);
  border-radius: 8px;
  transform: translate3d(-50%, -50%, 0);
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  font-size: 14px;
  line-height: 20px;
  white-space: pre-wrap;
  display: flex;
  text-align: center;
  color: #fff;
  min-width: 96px;
  padding: 8px 12px;
  max-width: 70%;
  width: fit-content;
}
</style>
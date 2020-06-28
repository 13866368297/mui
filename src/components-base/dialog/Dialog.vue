<template>
  <div class="layer" v-show="processVisiable">
    <div class="content">
      <div class="title">{{title}}</div>
      <div class="message">
        <slot>{{message}}</slot>
      </div>
      <div class="btns">
        <div class="btn cancel" v-if="showCancelButton" @click="cancelEvent">{{cancelButtonText}}</div>
        <div class="btn confirm" @click="confirmEvent">{{confirmButtonText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mui-dialog',
  props: {
    title: String,
    message: String,
    cancelButtonText: String,
    confirmButtonText: String,
    showCancelButton: Boolean,
    value: {
      type: Boolean,
      default: undefined
    }
  },
  data() {
    return {
      visiable: true,
      isComponentCall: typeof this.value === "boolean"
    };
  },
  mounted() {
    console.log(this.value,typeof this.value === "boolean");
  },
  methods: {
    show() {
      this.visiable = true;
    },
    hide() {
      this.visiable = false;
    },
    confirmEvent() {
      if(!this.isComponentCall){
        this.hide();
        this.resolve();
      }else{
        this.$emit('input',false)
      }
    },
    cancelEvent() {
      if(!this.isComponentCall){
        this.hide();
        this.reject();
      }else{
        this.$emit('input',false)
      }
    }
  },
  computed: {
    processVisiable() {
      return this.isComponentCall ? this.value : this.visiable;
    }
  },
  watch: {
    visiable(visiable) {
      if (visiable) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    }
  }
};
</script>

<style scoped lang="scss">
.layer {
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
  box-shadow: 2px 2px 2px 2px #f0f0f0;
  .content {
    width: 80%;
    margin: 160px auto;
    border-radius: 10px;
    background: #fff;
    position: relative;
    .title {
      max-height: 40vh;
      padding: 12px 24px 0;
      overflow-y: auto;
      font-size: 16px;
      line-height: 30px;
      white-space: pre-wrap;
      text-align: center;
      padding-top: 12px;
      color: #646566;
    }
    .message {
      max-height: 40vh;
      padding: 12px 24px 24px;
      overflow-y: auto;
      font-size: 14px;
      line-height: 20px;
      white-space: pre-wrap;
      text-align: center;
      img {
        box-sizing: border-box;
        width: 100%;
        padding: 25px 20px 0;
      }
    }
    .btns {
      display: flex;
      height: 40px;
      border-top: 1px solid #f0f0f0;
      .btn {
        flex: 1;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        &.confirm {
          color: #1989fa;
        }
        &:last-child {
          border-left: 1px solid #f0f0f0;
        }
      }
    }
  }
}
</style>
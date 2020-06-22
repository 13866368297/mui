<template>
  <div class="layer" v-show="visiable">
    <div class="content">
      <img :src="closeImage" class="close" @click="hide">
      <div class="title">{{title}}</div>
      <div class="message">{{message}}</div>
      <div class="btns">
        <!-- <render :render="render"></render> -->
        <div class="btn cancel" v-if="cancel" @click="cancelEvent">{{cancel.text}}</div>
        <div class="btn confirm" v-if="confirm" @click="confirmEvent">{{confirm.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      require: true
    },
    message: {
      require: true
    },
    cancel: {
      // default: function() {
      //   return { text: "取消" };
      // }
    },
    confirm: {
      require: true,
      default: function() {
        return { text: "确认" };
      }
    }
  },
  data() {
    return {
      visiable: false,
      closeImage: null
    };
  },
  methods: {
    show() {
      this.visiable = true;
    },
    hide() {
      this.visiable = false;
    },
    confirmEvent(){
        this.hide()
        this.confirm.callback && this.confirm.callback()
    },
    cancelEvent(){
        this.hide()
        this.cancel.callback && this.cancel.callback()
        
    }
  },
  components: {
    // render
  },
  watch:{
      visiable(visiable){
          if(visiable){
              document.body.style.overflow = "hidden"
          }else{
              document.body.style.overflow = "visible"
          }
      }
  }
};
</script>

<style  scoped lang="scss">
.layer {
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
  font-size:40px;
  line-height: 60px;
  overflow: hidden;
  box-shadow: 2px 2px 2px 2px #f0f0f0;
  .content{
      width: 80%;
      // height: 440px;
      margin:500px auto;
      border-radius:30px;
      background: #fff;
      padding:50px;
      position: relative;
      .title{
          font-size:50px;
          line-height: 100px;
      }
      .message{
          // height: 110px;
          padding:30px 0;
      }
      .btns{
          display: flex;
          margin-top: 10px;
          .btn{
              flex:1;
              line-height: 100px;
              text-align: center;
              color:#fd3f66;
              border-radius:100px;
              background: #f7f7f7;
              border:1px solid #f0f0f0;
              &:last-child{
                  margin-left: 20px;
              }
          }
      }
      .close{
        position: absolute;
        right:30px;
        top:30px;
        width: 70px;
        height: 70px;
      }
  }
}
</style>
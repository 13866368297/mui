<template>
  <button class="mu-button" :class="{['mu-button--'+type]:type}" :style="buttonColor" @click="onClick">
    <slot />
  </button>
</template>

<script>
// import {log} from '../../utils/index.js'
// log()
export default {
  name: 'mui-button',
  props: {
    color: String,
    type: {
      type: String,
      default: 'default',
    },
  },
  methods:{
    onClick(){
      this.$emit("click")
    }
  },
  computed:{
    buttonColor(){
      if(this.color){
        return {'background': this.color, "color": "#fff"}
      }
    }
  }
};
</script>

<style lang="scss">
.mu-button {
  min-width: 120px;
  color: #fff;
  height: 36px;
  line-height: 36px;
  border: none;
  border-radius: 2px;
  &--default {
    color: #323233;
    border: 1px solid #ebedf0;
  }

  &--primary {
    background-color: #07c160;
  }

  &--info {
    background-color: #1989fa;
  }

  &--danger {
    background-color: #ee0a24;
  }

  &--warning {
    background-color: #ff976a;
  }
}
</style>

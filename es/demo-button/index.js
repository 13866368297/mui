import './index-sfc.css';

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('button', {
    staticClass: "demo-button"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__ = [];
export default {
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  name: 'demo-button',
  props: {
    color: String,
    type: {
      type: String,
      default: 'primary'
    }
  }
};
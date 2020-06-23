"use strict";

exports.__esModule = true;
exports.default = void 0;

require("./Dialog-sfc.css");

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visiable,
      expression: "visiable"
    }],
    staticClass: "layer"
  }, [_c('div', {
    staticClass: "content"
  }, [_c('img', {
    staticClass: "close",
    attrs: {
      "src": _vm.closeImage
    },
    on: {
      "click": _vm.hide
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
    staticClass: "message"
  }, [_vm._v(_vm._s(_vm.message))]), _vm._v(" "), _c('div', {
    staticClass: "btns"
  }, [_vm.cancel ? _c('div', {
    staticClass: "btn cancel",
    on: {
      "click": _vm.cancelEvent
    }
  }, [_vm._v(_vm._s(_vm.cancel.text))]) : _vm._e(), _vm._v(" "), _vm.confirm ? _c('div', {
    staticClass: "btn confirm",
    on: {
      "click": _vm.confirmEvent
    }
  }, [_vm._v(_vm._s(_vm.confirm.text))]) : _vm._e()])])]);
};

var __vue_staticRenderFns__ = [];
var _default2 = {
  _scopeId: 'data-v-36b64130',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  props: {
    title: {
      require: true
    },
    message: {
      require: true
    },
    cancel: {// default: function() {
      //   return { text: "取消" };
      // }
    },
    confirm: {
      require: true,
      default: function _default() {
        return {
          text: "确认"
        };
      }
    }
  },
  data: function data() {
    return {
      visiable: false,
      closeImage: null
    };
  },
  methods: {
    show: function show() {
      this.visiable = true;
    },
    hide: function hide() {
      this.visiable = false;
    },
    confirmEvent: function confirmEvent() {
      this.hide();
      this.confirm.callback && this.confirm.callback();
    },
    cancelEvent: function cancelEvent() {
      this.hide();
      this.cancel.callback && this.cancel.callback();
    }
  },
  components: {// render
  },
  watch: {
    visiable: function visiable(_visiable) {
      if (_visiable) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
    }
  }
};
exports.default = _default2;
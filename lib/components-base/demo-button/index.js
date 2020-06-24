"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

require("../../utils/b");

var _c2 = _interopRequireDefault(require("c"));

require("./index-sfc.css");

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('button', {
    staticClass: "demo-button"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__ = [];
var _default = {
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
exports.default = _default;
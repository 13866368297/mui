"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _vue = _interopRequireDefault(require("vue"));

var _Dialog = _interopRequireDefault(require("./Dialog.vue"));

var Ctro = _vue.default.extend(_Dialog.default);

var instance;

function Dialog(props) {
  if (!instance) {
    instance = new Ctro({
      propsData: (0, _extends2.default)({}, props)
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
  } else {
    if (props && Object.keys(props)) {
      for (var _i = 0, _Object$keys = Object.keys(props); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        instance[key] = props[key];
      }
    }
  }

  instance.show();
  return instance;
}

Dialog.close = function () {
  if (instance) instance.hide();
};

_vue.default.prototype.$dialog = Dialog;
var _default = _Dialog.default;
exports.default = _default;
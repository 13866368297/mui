"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.install = install;
exports.default = exports.version = void 0;

var _dialog = _interopRequireDefault(require("./dialog"));

exports.Dialog = _dialog.default;

var _demoButton = _interopRequireDefault(require("./demo-button"));

exports.DemoButton = _demoButton.default;

var _fetch = _interopRequireDefault(require("./fetch"));

exports.fetch = _fetch.default;
var version = '1.0.0';
exports.version = version;

function install(Vue) {
  var components = [_dialog.default, _demoButton.default];
  components.forEach(function (item) {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var _default = {
  install: install,
  version: version
};
exports.default = _default;
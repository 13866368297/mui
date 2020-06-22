import _extends from "@babel/runtime/helpers/esm/extends";
import Vue from 'vue';
import MuDialog from './Dialog.vue';
var Ctro = Vue.extend(MuDialog);
var instance;

function Dialog(props) {
  if (!instance) {
    instance = new Ctro({
      propsData: _extends({}, props)
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

Vue.prototype.$dialog = Dialog;
export default MuDialog;
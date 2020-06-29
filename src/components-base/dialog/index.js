import Vue from 'vue'
import MuDialog from './Dialog.vue'
const Ctro = Vue.extend(MuDialog)
let instance

const defaultOptions = {
    title: "",
    message: "",
    showCancelButton: false,
    cancelButtonText: "取消",
    confirmButtonText: "确认"
}

function Dialog(props) {
    props = {...defaultOptions,...props}
    return new Promise((resolve, reject) => {
        if (!instance) {
            instance = new Ctro({
                propsData: props
            })
            instance.$mount()
            document.body.appendChild(instance.$el)
            Object.assign(instance,{resolve,reject})
        } else {
            Object.assign(instance, props,{resolve,reject})
            instance.show()
        }
    })
}
Dialog.alert = Dialog
Dialog.confirm = (props) => Dialog(Object.assign({}, props, {showCancelButton: true}))
Dialog.close = () => {
    if (instance) instance.hide()
}
Vue.prototype.$dialog = Dialog
export default MuDialog
import Vue from 'vue'
import MuDialog from './Dialog.vue'
const Ctro = Vue.extend(MuDialog)
let instance
function Dialog(props) {
    if (!instance) {
        instance = new Ctro({
            propsData: {
                ...props
            }
        })
        instance.$mount()
        document.body.appendChild(instance.$el)
    } else {
        if(props && Object.keys(props)){
            for (let key of Object.keys(props)) {
                instance[key] = props[key]
            }
        }
    }
    instance.show()
    return instance
}
Dialog.close = ()=>{
    if(instance)instance.hide()
}
Vue.prototype.$dialog = Dialog
export default MuDialog
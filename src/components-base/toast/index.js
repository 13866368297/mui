import Vue from 'vue'
import MuToast from './Toast.vue'
import {
    isObject
} from "../../utils"
const Ctro = Vue.extend(MuToast)
let instance

const defaultOptions = {
    message: "",
    duration: 2000
}

function parseOptions(message) {
    return isObject(message) ? message : {
        message
    }
}

function Toast(props) {
    props = {
        ...defaultOptions,
        ...parseOptions(props)
    }
    if (!instance) {
        instance = new Ctro({
            propsData: props
        })
        instance.$mount()
        document.body.appendChild(instance.$el)
    } else {
        Object.assign(instance, props)
        instance.show()
    }
    setTimeout(()=>{
        instance.hide()
    },props.duration)
}

Vue.prototype.$toast = Toast
export default MuToast
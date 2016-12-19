import VueLayer from './src/vue-layer'

export default class {
    static install(Vue, options) {
        Vue.component('vue-layer', VueLayer);
    }
}
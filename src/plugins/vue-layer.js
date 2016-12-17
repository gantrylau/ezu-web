import Vue from 'vue';

export default class VueLayer {
    static install(Vue, options) {
        Vue.prototype.$layer = window.layer;
    }
}
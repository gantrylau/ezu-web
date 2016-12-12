import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Home from './components/system/home.vue'

import DataFactory from './config/dataFactory'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        menus: []
    },
});

let mock = true;

Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if (mock)
            response.body = JSON.parse(response.bodyText || '');
        return response
    });
});

Vue.config.debug = true;//开启错误提示

if (mock)
    DataFactory.mock();


const app = new Vue({
    store,
    render: h => h(Home)
}).$mount('#app');
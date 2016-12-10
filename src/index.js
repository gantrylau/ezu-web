import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource);

let mock = true;

Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if (mock)
            response.body = JSON.parse(response.bodyText || '');
        return response
    });

});

Vue.config.debug = true;//开启错误提示

import Home from './components/system/home.vue'

import DataFactory from './config/dataFactory'

if (mock)
    DataFactory.mock();


const app = new Vue({
    render: h => h(Home)
}).$mount('#app');
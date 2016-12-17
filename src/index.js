import Vue from 'vue';
import VueResource from 'vue-resource';
import layout from './components/system/layout';
import dataFactory from './config/dataFactory';
import router from './config/router';
import store from './store/index';
import vueLayer from './plugins/vue-layer';

Vue.use(VueResource);

Vue.use(vueLayer);

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
    dataFactory.mock();


const app = new Vue({
    store,
    router: router,
    render: h => h(layout)
}).$mount('#app');
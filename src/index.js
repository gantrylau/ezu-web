import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'

import './plugins/utils'

import 'element-ui/lib/theme-default/index.css'

import layout from 'views/layout'
import dataFactory from './config/dataFactory'
import router from './config/router'
import store from 'store'

Vue.use(VueResource);
Vue.use(ElementUI);

let mock = false;

Vue.http.interceptors.push((request, next) => {
    let loading = null;
    if (request.loadingText) {
        loading = ElementUI.Loading.service({
            fullscreen : true,
            text       : request.loadingText,
            customClass: 'request-loading'
        });
    }
    next((response) => {
        if (loading != null)
            loading.close();

        if (mock)
            response.body = JSON.parse(response.bodyText || '');

        if (!response.body.success && response.body.errorCode==='auth.session.expire') {
            ElementUI.MessageBox('登录授权已过期，请重新登录', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                router.push({name:'login'});
            });
        } else if (request.showError != false && !response.body.success) {
            ElementUI.Message({
                showClose: true,
                message  : response.body.errorMsg || '出错了',
                type     : 'error'
            });
        } else if (request.successText) {
            ElementUI.Message({
                showClose: true,
                message  : request.successText,
                type     : 'success'
            })
        }

        return response
    });
});

Vue.config.debug = true;//开启错误提示

if (mock)
    dataFactory.mock();

router.beforeEach((to, from, next) => {
    next();
});

const app = new Vue({
    store,
    router,
    template:'<router-view></router-view>'
}).$mount('#app');
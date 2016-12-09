import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.debug = true;//开启错误提示

import Home from './components/system/home.vue'

import DataFactory from './config/dataFactory'

DataFactory.mock();


const app = new Vue({
    render: h => h(Home)
}).$mount('#app');

// new Vue({
//     el      : '#app',
//     template: `<div><h1>Hello App!</h1>
//     <p>
// <router-link to="/foo">Go to Foo</router-link>
// <router-link to="/bar">Go to Bar</router-link>
// </p>
// <router-view></router-view></div>`
// });

// 现在，应用已经启动了！
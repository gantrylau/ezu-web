import Vue from 'vue';
import VueResource from 'vue-resource';
import layout from './components/system/layout';
import dataFactory from './config/dataFactory';
import router from './config/router';
import store from './store/index';
import vueLayer from './plugins/vue-layer/index';

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

// Vue.directive('layer', {
//     bind  : function (el, binding) {
//         el.style.display = 'none';
//     },
//     update: function (el, binding, vnode) {
//         let options     = binding.value;
//         options.content = vnode.child;
//         // options.end     = function () {
//         // };
//         if (options.show) {
//             window.layer.open(options);
//         } else {
//
//         }
//     },
//     unbind: function () {
//         // 清理工作
//         // 例如，删除 bind() 添加的事件监听器
//         console.log(333)
//     }
// });

const app = new Vue({
    store,
    router: router,
    render: h => h(layout)
}).$mount('#app');
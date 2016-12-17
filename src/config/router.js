import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const home     = resolve => require(['../components/system/home'], resolve);
const userList = resolve => require(['../components/user/user-list'], resolve);

const routerView = {
    template: '<router-view></router-view>'
};

let routes = [
    {path: '/', name: 'home', component: home},
    {
        path     : '/sys',
        name     : 'system',
        component: routerView,
        children : [
            {path: 'user/list', name: 'userList', component: userList}
        ]
    }
];

export default new VueRouter({
    mode  : 'history',
    base  : '/',
    routes: routes
});
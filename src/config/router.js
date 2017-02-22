import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const home    = resolve => require(['views/home'], resolve);
const userMgr = resolve => require(['views/system/user-mgr'], resolve);
const roleMgr = resolve => require(['views/system/role-mgr'], resolve);
const menuMgr = resolve => require(['views/system/menu-mgr'], resolve);

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
            {path: 'user/list', name: 'userMgr', component: userMgr},
            {path: 'role/list', name: 'roleMgr', component: roleMgr},
            {path: 'menu/list', name: 'menuMgr', component: menuMgr}
        ]
    }
];

export default new VueRouter({
    mode  : 'history',
    base  : '/',
    routes: routes
});
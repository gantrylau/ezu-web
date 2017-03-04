import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const layout  = resolve => require(['views/layout'], resolve);
const home    = resolve => require(['views/home'], resolve);
const userMgr = resolve => require(['views/system/user-mgr'], resolve);
const roleMgr = resolve => require(['views/system/role-mgr'], resolve);
const menuMgr = resolve => require(['views/system/menu-mgr'], resolve);
const login   = resolve => require(['views/login'], resolve);
const myHouse = resolve => require(['views/rent/my-house'], resolve);

const routerView = {
    template: '<router-view></router-view>'
};

let routes = [
    {
        path     : '',
        component: layout,
        children : [
            {path: '/', name: 'home', component: home},
            {
                path     : '/sys',
                component: routerView,
                children : [
                    {path: 'user/list', name: 'userMgr', component: userMgr},
                    {path: 'role/list', name: 'roleMgr', component: roleMgr},
                    {path: 'menu/list', name: 'menuMgr', component: menuMgr}
                ]
            },
            {
                path     : '/rent',
                component: routerView,
                children : [
                    {path: 'my-house', name: 'myHouse', component: myHouse}
                ]
            }
        ]
    },
    {path: '/login', name: 'login', component: login},
];

export default new VueRouter({
    mode  : 'history',
    base  : '/',
    routes: routes
});
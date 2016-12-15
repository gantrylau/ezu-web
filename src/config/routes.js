// const helper = require('./helper');
const home     = resolve => require(['../components/system/home'], resolve);
const userList = resolve => require(['../components/user/user-list'], resolve);


let routes = [
    {path: '/', name: 'home', component: home},
    {path: '/user/list', name: 'userList', component: userList}
];

module.exports = routes;
// const helper = require('./helper');
const userList = resolve => require(['../components/user/user-list'], resolve);

let routes = [
    {path: '/user/list', name: 'userList', component: userList}
];

module.exports = routes;
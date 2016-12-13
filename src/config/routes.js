const UserList = resolve => require(['../components/user/user-list'], resolve);

let routes = [
    {path: '/user/list', component: UserList}
];

module.exports = routes;
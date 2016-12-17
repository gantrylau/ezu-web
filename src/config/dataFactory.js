import Mock from 'mockjs';

function success(data) {
    return {
        success: true,
        data   : data,
        message: ''
    }
}

export default {
    mock() {
        Mock.mock('/api/sys/menus', 'get', success([
            {id: 1, name: '首页', alias: 'home'},
            {id: 2, name: '系统菜单'},
            {id: 3, name: '用户管理', pid: 2},
            {id: 4, name: '用户列表', pid: 2, alias: 'userList'},
            {id: 5, name: '11111'},
            {id: 6, name: '22222'},
            {id: 7, name: '角色管理', pid: 2},
            {id: 8, name: '菜单管理', pid: 2},
        ]));
    }
};
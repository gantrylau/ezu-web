import Mock from 'mockjs';

// class DataFactory {
//
// }

function success(data) {
    return {
        success: true,
        data   : data,
        message: ''
    }
}

module.exports = {
    mock() {
        Mock.mock('/api/sys/menus', 'get', success([
            {id: 1, name: '系统菜单'},
            {id: 2, name: '用户管理', pid: 1},
            {id: 3, name: '用户列表', pid: 2}
        ]));
    }
};
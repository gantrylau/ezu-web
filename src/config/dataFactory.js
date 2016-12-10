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
            {id: 1, name: '系统菜单'}
        ]));
    }
};
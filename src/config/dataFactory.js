import Mock from 'mockjs';

// class DataFactory {
//
// }

module.exports = {
    mock() {
        Mock.mock('/api/test', {
            id: 1
        });
    }
};
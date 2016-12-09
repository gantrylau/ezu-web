import Mock from 'mockjs';

// class DataFactory {
//
// }

module.exports = {
    mock() {
        Mock.mock('/api/test', function (options) {
            options.dataType = 'JSON';
            return {
                "object": {
                    "120000": "天津市",
                    "130000": "河北省",
                    "140000": "山西省"
                }
            }
        });
    }
};
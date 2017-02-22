/**
 * Created by gantrylau on 2017/2/13.
 */
(function() {
    String.prototype.render = function (values) {
        var str = this;
        for (var key in values) {
            str = str.replace('\$\{' + key + '\}', values.key);
        }
        return str;
    }
})();
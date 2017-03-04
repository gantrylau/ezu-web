(function () {
    function utils() {
        function isBlank(obj) {
            if (!obj)
                return true;
            if (obj instanceof Array)
                return obj.length < 1;
            if (obj instanceof String)
                return obj.length == 0;
            if (obj instanceof Object)
                return obj.keys.length == 0;
            return true;
        }

        return {
            isBlank: isBlank
        }
    }

    $.utils = new utils();
})();
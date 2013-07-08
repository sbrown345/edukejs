(function (global) {
    'use strict';
    global.assert = {
        test: {
            isInt32: function (v) {
                return typeof v === "number" && (v | 0) === v;
            }
        },

        int32: function (value) {
            assertValue(assert.test.isInt32, value);
        },

        argumentsAre: {
            int32: function (array) {
                return assertArray(assert.test.isInt32, array);
            }
        }
    };

    function checkArray(testFn, value) {
        for (var i = 0; i < value.length; i++) {
            if (!testFn(value[i])) {
                return false;
            }
        }

        return true;
    }

    function assertArray(testFn, value) {
        console.assert(checkArray(testFn, value), ["array failed", testFn.toString(), value]);
    }

    function assertValue(testFn, value) {
        console.assert(testFn(value), "value failed");
    }
})(window);
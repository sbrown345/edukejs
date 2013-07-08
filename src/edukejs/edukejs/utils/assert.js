(function (global) {
    'use strict';
    global.assert = {
        test: {
            isString: function (v) {
                return typeof v === "string";
            },
            isInt32: function (v) {
                return typeof v === "number" && (v | 0) === v;
            },
            isType: function (type, v) {
                return v instanceof type;
            }
        },

        int32: function (v) {
            assertValue(assert.test.isInt32, v);
            return assert;
        },

        isType: function (type, v) {
            assertType(assert.test.isType, type, v);
            return assert;
        },

        isString: function (v) {
            assert.test.isString(v);
            return assert;
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

    function assertType(testFn, type, value) {
        console.assert(testFn(type, value), "value is not of type " + type);
    }
})(window);
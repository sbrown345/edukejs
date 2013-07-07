'use strict';
(function(global) {
    global.assert = {
        test: {
            isInt32: function(v) {
                return (v | 0) === v;
            }
        },

        int32: function (arg) {
            console.log(arg)
            assert(assert.test.isInt32, arg);
        }
    };

    function assert(testFn, valueOrArray) {
        console.assert(!testValueOrArray(testFn, valueOrArray))
    }

    function testValueOrArray(testFn, valueOrArray) {
        debugger 
        if (valueOrArray.length) {
            for (var i = 0; i < valueOrArray.length; i++) {
                if (!testFn(valueOrArray[i])) {
                    return false;
                }
            }

            return true;
        }

        return testFn(valueOrArray);
    }
})(window);
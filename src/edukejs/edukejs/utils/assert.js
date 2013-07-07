'use strict';
(function (global) {
    global.assert = {
        int32: function(arg) {
            assert(isInt32, arg);
        }
    };
    
    function assert(testFn, valueOrArray) {
        console.assert(!testValueOrArray(testFn, valueOrArray))
    }

    function isInt32(v) {
        return (v | 0) === v;
    }
    
    function testValueOrArray(testFn, valueOrArray) {
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
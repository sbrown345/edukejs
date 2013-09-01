var assert;
(function () {
    'use strict';

    assert = {
        failedCount: 0,

        integer: function (v: number) {
            assertValue(assert.test.isInt, v);
            return assert;
        },

        int32: function (v: number) {
            assertValue(assert.test.isInt32, v);
            return assert;
        },

        uint32: function (v: number) {
            assertValue(assert.test.isUint32, v);
            return assert;
        },

        int16: function (v: number) {
            assertValue(assert.test.isInt16, v);
            return assert;
        },

        "char": function (v: number) {
            assertValue(assert.test.isUint8, v);
            return assert;
        },

        uint8: function (v: number) {
            assertValue(assert.test.isUint8, v);
            return assert;
        },

        int8: function (v: number) {
            assertValue(assert.test.isInt8, v);
            return assert;
        },

        isType: function (type, v: any) {
            assertType(assert.test.isType, type, v);
            return assert;
        },

        isString: function (v: string) {
            trackAssert(assert.test.isString(v), v + "is not a string");
            return assert;
        },

        areEqual: function (expected: any, actual: any) {
            trackAssert(assert.test.areEqual(expected, actual), "a and b are not equal. a: " + expected + ", b: " + actual);
            return assert;
        },

        // check js arguments object against original c arguments (as a string)
        originalArgs: function (fnName: string, argsObj: Object, originalArgsStr: string) {
            assertStringArgsWithArgsObject(originalArgsStr, argsObj);
            return assert;
        },

        // check js arguments object against original c arguments with the type commented out (in the function method e.g. test(/*int32_t*/ a) {} )
        originalArgsFromFunction: function (argsObj: Object, fn: Object) {
            var fnWithArgsRegex = /^function\s*([^\(]*)\(\s*([^\)]*)\)/m; // ht AngularJS
            var commentStartRegEx = /\/\*/g;
            var commentEndRegEx = /\*\//g;
            var fnWithArgsText = fn.toString();
            var match = fnWithArgsText.match(fnWithArgsRegex);
            var fnName = match[1].trim();
            fnWithArgsText = match[2];
            fnWithArgsText = fnWithArgsText.replace(commentStartRegEx, "");
            fnWithArgsText = fnWithArgsText.replace(commentEndRegEx, "");

            logFnInput(fnName, fnWithArgsText, argsObj);
            assertStringArgsWithArgsObject(fnWithArgsText, argsObj);

            return assert;
        },

        argumentsAre: {
            int32: function (array: number[]) {
                assertArray(assert.test.isInt32, array);
                return assert;
            }
        },

        test: {
            isString: function (v: string): boolean {
                return v === null || typeof v === "string";
            },
            isInt: function (v: number): boolean {
                return (!isNaN(v) && Math.floor(v) === v);
            },
            isInt32: function (v: number): boolean {
                return assert.test.isTypedArrayValue(Int32Array, v);
            },
            isUint32: function (v: number): boolean {
                return assert.test.isTypedArrayValue(Uint32Array, v);
            },
            isInt16: function (v: number): boolean {
                return assert.test.isTypedArrayValue(Int16Array, v);
            },
            isUint16: function (v: number): boolean {
                return assert.test.isTypedArrayValue(Uint16Array, v);
            },
            isInt8: function (v: number): boolean {
                return assert.test.isTypedArrayValue(Int8Array, v);
            },
            isUint8: function (v: number): boolean {
                return assert.test.isTypedArrayValue(Uint8Array, v);
            },
            isType: function (type, v): boolean {
                return v instanceof type;
            },
            isTypedArrayValueTypedArrayCache: {},
            isTypedArrayValue: function (typedArrayType, v: number): boolean {
                var array = assert.test.isTypedArrayValueTypedArrayCache[typedArrayType.name]
                 || (assert.test.isTypedArrayValueTypedArrayCache[typedArrayType.name] = new typedArrayType(1));
                array[0] = v;
                return array[0] === v;
            },
            areEqual: function (expected: any, actual: any): boolean {
                return expected == actual;
            }
        },

        // an assertion to only run once
        run: function(key: string, expression: boolean, message?: string) {
            if(runAssertionCounts[key] === undefined) {
                console.assert(expression, message);
                runAssertionCounts[key] = 1; // run once
                
                if(!expression) {
                    debugger;
                }
            }
        }
    };

    var runAssertionCounts = {};

    function checkArray(testFn, value: any[]) {
        for (var i = 0; i < value.length; i++) {
            if (!testFn(value[i])) {
                return false;
            }
        }

        return true;
    }

    var argDictionary = {
        "int32_t": assert.int32,
        "uint8_t": assert.uint8,
        "char": assert.uint8,
        "string": assert.isString,
    };

    function assertStringArgsWithArgsObject(fnWithArgsText: string, argsObj: Object) {
        fnWithArgsText.split(",").forEach(function (v, i) {
            var argMatch = v.trim().match(/[^\s]+/g);
            var name = argMatch.pop();
            var type = argMatch.join(" ");
            var testType = argDictionary[type];
            var argValue = argsObj[i];

            if (testType) {
                testType(argValue);
            }
            else {
                throw "unknown type " + v;
            }
        });
    }

    function logFnInput(fnName: string, fnWithArgsText: string, argsObj: Object): void {
        var hash = {};
        fnWithArgsText.split(",").forEach(function (v, i) {
            var argMatch = v.trim().match(/[^\s]+/g);
            var name = argMatch.pop();
            var type = argMatch.join(" ");
            var argValue = argsObj[i];

            hash[type + " " + name] = argValue;
        });

        console.log(fnName, hash);
    }

    function assertArray(testFn, value: any[]) {
        trackAssert(checkArray(testFn, value), ["array failed", testFn.toString(), value]);
    }

    function assertValue(testFn, value) {
        trackAssert(testFn(value), "value failed");
    }

    function assertType(testFn, type, value) {
        trackAssert(testFn(type, value), "value is not of type " + type);
    }

    function trackAssert(result, message: any) {
        console.assert(result, message);
        if (!result) {
            debugger;
            assert.failedCount++;
        }
    }
})();

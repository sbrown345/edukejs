/// <reference path="libs/qunit.js" />
/// <reference path="../utils/assert.js" />
'use strict';

test("isInt32", function() {
    strictEqual(assert.test.isInt32(1), true, "1 is an int32");
    strictEqual(assert.test.isInt32(1.1), false, "1.1 is not an int");
    strictEqual(assert.test.isInt32("1"), false, "'1' string is not an int");
    strictEqual(assert.test.isInt32({}), false, "object string is not an int");
    var minInt = -2147483648;
    var maxInt = 2147483647;
    strictEqual(assert.test.isInt32(minInt), true, "–2,147,483,648. is an int32");
    strictEqual(assert.test.isInt32(maxInt), true, "2,147,483,647. is an int32");
    strictEqual(assert.test.isInt32(minInt - 1), false, "–2,147,483,648 - 1. is not an int32");
    strictEqual(assert.test.isInt32(maxInt + 1), false, "2,147,483,647 + 1. is not an int32");
});
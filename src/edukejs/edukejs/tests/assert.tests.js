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

test("isString", function() {
    strictEqual(assert.test.isString("str"), true, "1 is a string");
    strictEqual(assert.test.isString(1.1), false, "1.1 is not a string");
    strictEqual(assert.test.isString([2]), false, "[2] string is not a string");
    strictEqual(assert.test.isString({}), false, "object string is not a string");
});

test("isType", function() {
    strictEqual(assert.test.isType(Uint8Array, new Uint8Array(1)), true, "is a Uint8Array");
    strictEqual(assert.test.isType(Uint8Array, [1]), false, "[1] is not a Uint8Array");
    strictEqual(assert.test.isType(Uint8Array, "1"), false, "'1' string is not a Uint8Array");
    strictEqual(assert.test.isType(Uint8Array, {}), false, "object string is not a Uint8Array");

    strictEqual(assert.test.isType(Int32Array, new Int32Array(1)), true, "is a Int32Array");
    strictEqual(assert.test.isType(Int32Array, [115656]), false, "[1] is not a Int32Array");
    strictEqual(assert.test.isType(Int32Array, "1"), false, "'1' string is not a Int32Array");
    strictEqual(assert.test.isType(Int32Array, {}), false, "object string is not a Int32Array");
});
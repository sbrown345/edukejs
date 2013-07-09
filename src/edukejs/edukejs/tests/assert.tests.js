/// <reference path="libs/qunit.js" />
///// <reference path="../utils/assert.js" />
/// <reference path="../eduke.js" />
'use strict';

test("isUint8", function () {
    strictEqual(assert.test.isUint8(1), true, "1 is an uint8");
    strictEqual(assert.test.isUint8(1.1), false, "1.1 is not an uint8");
    strictEqual(assert.test.isUint8("1"), false, "'1' string is not an uint8");
    strictEqual(assert.test.isUint8({}), false, "object is not an uint8");
    var min = 0;
    var max = 255;
    strictEqual(assert.test.isUint8(min), true, min + " is an uint8");
    strictEqual(assert.test.isUint8(max), true, max + " is an uint8");
    strictEqual(assert.test.isUint8(min - 1), false, (min - 1) + " is not an uint8");
    strictEqual(assert.test.isUint8(max + 1), false, (max + 1) + "  is not an uint8");
});

test("isInt32", function () {
    strictEqual(assert.test.isInt32(1), true, "1 is an int32");
    strictEqual(assert.test.isInt32(1.1), false, "1.1 is not an int");
    strictEqual(assert.test.isInt32("1"), false, "'1' string is not an int");
    strictEqual(assert.test.isInt32({}), false, "object is not an int");
    var min = -2147483648;
    var max = 2147483647;
    strictEqual(assert.test.isInt32(min), true, min + " is an int32");
    strictEqual(assert.test.isInt32(max), true, max + " is an int32");
    strictEqual(assert.test.isInt32(min - 1), false, (min - 1) + " is not an int32");
    strictEqual(assert.test.isInt32(max + 1), false, (max + 1) + "  is not an int32");
});

test("isString", function () {
    strictEqual(assert.test.isString("str"), true, "1 is a string");
    strictEqual(assert.test.isString(1.1), false, "1.1 is not a string");
    strictEqual(assert.test.isString([2]), false, "[2] string is not a string");
    strictEqual(assert.test.isString({}), false, "object is not a string");
});

test("isType", function () {
    strictEqual(assert.test.isType(Uint8Array, new Uint8Array(1)), true, "is a Uint8Array");
    strictEqual(assert.test.isType(Uint8Array, [1]), false, "[1] is not a Uint8Array");
    strictEqual(assert.test.isType(Uint8Array, "1"), false, "'1' string is not a Uint8Array");
    strictEqual(assert.test.isType(Uint8Array, {}), false, "object is not a Uint8Array");

    strictEqual(assert.test.isType(Int32Array, new Int32Array(1)), true, "is a Int32Array");
    strictEqual(assert.test.isType(Int32Array, [115656]), false, "[1] is not a Int32Array");
    strictEqual(assert.test.isType(Int32Array, "1"), false, "'1' string is not a Int32Array");
    strictEqual(assert.test.isType(Int32Array, {}), false, "object is not a Int32Array");
});

test("originalArgs", function () {
    assert.originalArgs([1, 2], "int32_t x, int32_t y"),
    strictEqual(assert.failedCount, 0, "is array of ints");

    assert.originalArgs([1, -222222222222222], "int32_t x, int32_t y");
    strictEqual(assert.failedCount, 1, "is not array of ints");

    assert.originalArgs([3, 255], "char x, char y");
    strictEqual(assert.failedCount, 1, "is array of chars");
});
/// <reference path="libs/qunit.js" />
///// <reference path="../utils/assert.js" />
/// <reference path="../eduke.js" />

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

test("isTypedArrayValue (isInt32)", function () {
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


test("isTypedArrayValue (isUint32)", function () {
    strictEqual(assert.test.isUint32(1), true, "1 is a uint32");
    strictEqual(assert.test.isUint32(1.1), false, "1.1 is not a uint32");
    strictEqual(assert.test.isUint32("1"), false, "'1' string is not a uint32");
    strictEqual(assert.test.isUint32({}), false, "object is not a uint32");
    var min = 0;
    var max = 4294967295;
    strictEqual(assert.test.isUint32(min), true, min + " is a uint32");
    strictEqual(assert.test.isUint32(max), true, max + " is a uint32");
    strictEqual(assert.test.isUint32(min - 1), false, (min - 1) + " is not a uint32");
    strictEqual(assert.test.isUint32(max + 1), false, (max + 1) + "  is not a uint32");
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
    assert.originalArgs("fnName", [1, 2], "int32_t x, int32_t y"),
    strictEqual(assert.failedCount, 0, "is array of ints");

    assert.originalArgs("fnName", [1, -222222222222222], "int32_t x, int32_t y");
    strictEqual(assert.failedCount, 1, "is not array of ints");

    assert.originalArgs("fnName", [3, 255], "char x, char y");
    strictEqual(assert.failedCount, 1, "is array of chars");
});

test("Bsprintf", function () {
    var array = new Uint8Array(10);
    Bsprintf(array, "test%s", "AAAA");
    strictEqual(array.toString(), "testAAAA", "array matches");

    array = new Uint8Array(10);
    Bsprintf(array, "%i %i test", 20, 20);
    strictEqual(array.toString(), "20 20 test", "array matches");

    // todo: this breaks...
    //array = new Uint8Array(10);
    //Bsprintf(array, "test %f %i test %s", 5.5, 20, "again");
    //strictEqual(array.toString(), "test 5.5 20 tset again", "array matches");
});

test("memcmp", function () {
    strictEqual(memcmp(new Uint8Array([97, 98]), [97, 98], 2), 0, "array matches");
    strictEqual(memcmp(new Uint8Array([100, 98]), [98, 99], 2), 1, "buf1 is greater");
    strictEqual(memcmp(new Uint8Array([90, 98]), [98, 99], 2), -1, "buf1 is less than");
});

test("strcmp", function () {
    strictEqual(memcmp("AA", "AA", 2), 0, "strings match");
    strictEqual(memcmp("ZZ", "AA", 2), 1, "first string is greater than second");
    strictEqual(memcmp("AA", "ZZ", 2), -1, "first string is less than second");
});

test("strlen", function () {
    strictEqual(strlen(new Uint8Array([9, 9, 9, 0, 0])), 3, "string length is 3");
    strictEqual(strlen(new Uint8Array([9, 9, 9, 9, 9])), 5, "string length is 5");
});

test("strtoll", function () {
    strictEqual(strtoll("    10",0, null, 10), 10, "string is 10");
    strictEqual(strtoll("    +10",0, null, 10), 10, "string is 10");
    strictEqual(strtoll("    -10",0, null, 10), -10, "string is -10");
    strictEqual(strtoll("    -010",0, null, 10), -10, "string is -10");
    strictEqual(strtoll("    +010",0, null, 10), 10, "string is 10");
    strictEqual(strtoll("20",0, null, 10), 20, "string is 20");
    strictEqual(strtoll("+20",0, null, 10), 20, "string is 20");
    strictEqual(strtoll("-20",0, null, 10), -20, "string is -20");
    strictEqual(strtoll("-1",0, null, 10), -1, "string is -1");
    strictEqual(strtoll("-1",0, null, 10), -1, "string is 20");
    strictEqual(strtoll("-9999999 sdfasdf sddf asdf sdf sdaf sd",0, null, 10), -9999999, "string is -9999999");
    strictEqual(strtoll("sdfasddfsdfsd fsds dfs d 10",0, null, 10), 0, "string is 0");
    strictEqual(strtoll(" +0123456789  fsds dfs d 10",0, null, 10), 0123456789, "string is 0123456789");

    strictEqual(strtoll("    10",5, null, 10), 10, "string is 10");
    strictEqual(strtoll("111",1, null, 11), 10, "string is 11");
});

test("uint8array string conversions", function () {
    strictEqual("abc".toUint8Array().toString(), "abc", "'abc' is returned");
});

// duke funcs
test("hash_getcode", function () {
    strictEqual(hash_getcode("az"), 5860926, "correct hashcode");
    strictEqual(hash_getcode("DUKE"), 2088718394, "correct hashcode");
});
﻿
var int32 = function (v: number): number {
    return v | 0;
};

var uint32 = function (v: number): number {
    return v >>> 0;
};

function newStructArray($class, count) {
    var array = new Array(count);
    for (var i = 0; i < count; i++) {
        array[i] = new $class();
    }

    array[-1] = new $class(); // various places check for a -1 which doesn't crash C. (this probably breaks v8 perf opt)
    return array;
}

function clearStructArray($class, array : Array) : void {
    for (var i = 0; i < array.length; i++) {
        array[i] = new $class();
    }
}

function multiDimArray(arrayClass, num, arrLength) {
    var multiDimArray = new Array(num);
    for (var i = 0; i < num; i++) {
        multiDimArray[i] = new arrayClass(arrLength);
    }
    return multiDimArray;
}

//function Ref(val) {
//    this.$ = val;
//}

class Ref {
    $: any;

    constructor(val: any) {
        this.$ = val;
    }
}
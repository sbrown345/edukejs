
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

class Ptr {
    //buf: ArrayBuffer;
    array: Uint8Array;
    idx: number;

    constructor(array: Uint8Array, index: number = 0) {
        //this.buf = array.buffer;
        this.array = array;
        this.idx = index;
    }
}


class Ref {
    $: any;

    constructor(val: any) {
        this.$ = val;
    }
}

class R<T> {
    $: T;

    constructor(val: T) {
        this.$ = val;
    }
}

interface String {
  toUint8Array: () => Uint8Array;
}

String.prototype.toUint8Array = function () : Uint8Array {
    var array = new Uint8Array(this.length);
    for (var i = 0; i < this.length; i++) {
        array[i] = this.charCodeAt(i);
    }

    return array;
}

interface Uint8Array {
  asString: () => string;
}

Uint8Array.prototype.asString = function () : string {
    var str = "";
    for (var i = 0; i < this.length; i++) {
        str = String.fromCharCode(this[i]);
    }

    return str;
}
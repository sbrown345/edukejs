
var int32 = function (v: number): number {
    return v | 0;
};

var uint32 = function (v: number): number {
    return v >>> 0;
};

var unsigned = uint32;

function newStructArray($class: any, count: number) {
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
    view: DataView;

    getInt16() {
        if (!this.view) {
            this.view = new DataView(this.array.buffer);
        }

        return this.view.getInt16(this.idx, true);
    }

    constructor(array: Uint8Array, index: number = 0) {
        //this.buf = array.buffer;
        this.array = array;
        this.idx = index;
    }
}

class P {
    buf: ArrayBuffer;
    idx: number;

    constructor(buffer: ArrayBuffer, index: number = 0) {
        this.buf = buffer;
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
  toString: () => string;
}

Uint8Array.prototype.toString = function () : string {
    var str = "";
    for (var i = 0; i < this.length; i++) {
        if(!this[i]) {
            break;
        }
        str += String.fromCharCode(this[i]);
    }

    return str;
};
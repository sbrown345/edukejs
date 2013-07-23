﻿
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

    getUint8() {
        if (!this.view) {
            this.view = new DataView(this.array.buffer); // this breaks if a subarray is passed in
        }

        return this.view.getUint8(this.idx); // same as getValue!!
    }

    getInt16() {
        if (!this.view) {
            this.view = new DataView(this.array.buffer);// this breaks if a subarray is passed in
        }

        return this.view.getInt16(this.idx, true);
    }

    getInt32() {
        if (!this.view) {
            this.view = new DataView(this.array.buffer);// this breaks if a subarray is passed in
        }

        return this.view.getInt32(this.idx, true);
    }

    setValue(v: number) {
        this.array[this.idx] = v;
    }

    getValue(): number {
        return this.array[this.idx];
    }

    constructor(array: Uint8Array, index: number = 0) {
        //this.buf = array.buffer; 
        this.array = array; // don't change this to buffer because makepalookup will break because of the subarray stuff - subarrays arraybuffer doesn't take into account the index
        this.idx = index;

        if (array.BYTES_PER_ELEMENT !== 1) {
             throw "must be uint8 array (instance of didnt' work!!";
        }

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
  toInt8Array: () => Int8Array;
}

String.prototype.toInt8Array= function () : Int8Array {
    var array = new Int8Array(this.length);
    for (var i = 0; i < this.length; i++) {
        array[i] = this.charCodeAt(i);
    }

    return array;
}

interface Int8Array {
  toString: () => string;
}

Int8Array.prototype.toString = function () : string {
    var str = "";
    for (var i = 0; i < this.length; i++) {
        if(!this[i]) {
            break;
        }
        str += String.fromCharCode(this[i]);
    }

    return str;
};
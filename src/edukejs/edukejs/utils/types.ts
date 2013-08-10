interface ITypeInfo {
    typeInfo: string[][];
    size: number;
}

function ITypeInfoLogger(v: ITypeInfo, typeInfo: string[][]) {
    for (var j = 0; j < typeInfo.length; j++) {
        var name = typeInfo[j][0];   
        var type = typeInfo[j][1];   
        console.log(name + ": " + v[name] + "\t\t(" + type + ")");
    }
}

function ITypeInfoCopier(dest: ITypeInfo, source: ITypeInfo, typeInfo: string[][]) {
    for (var j = 0; j < typeInfo.length; j++) {
        var name = typeInfo[j][0];   
        dest[name] = source[name]; 
    }
}

var int8ConvertArray = new Int8Array(1);
var int8 = function (v: number): number {
   int8ConvertArray[0] = v;
    return int8ConvertArray[0];
};

var uint8ConvertArray = new Uint8Array(1);
var uint8 = function (v: number): number {
   uint8ConvertArray[0] = v;
    return uint8ConvertArray[0];
};

var int32 = function (v: number): number {
    return v | 0;   
};

var uint32 = function (v: number): number {
    return v >>> 0;
};

var unsigned = uint32;

function newStructArray<T>($class: any, count: number): T[] {
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

function multiDimArray <T>(arrayClass, num, arrLength): T[] {
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

    getInt8() {
        if (!this.view) {
            this.view = new DataView(this.array.buffer); // this breaks if a subarray is passed in
        }

        return this.view.getInt8(this.idx); // same as getValue!!
    }

    getUint16() {
        if (!this.view) {
            this.view = new DataView(this.array.buffer);// this breaks if a subarray is passed in
        }

        return this.view.getUint16(this.idx, true);
    }


    getInt16() {
        if (!this.view) {
            this.view = new DataView(this.array.buffer);// this breaks if a subarray is passed in
        }

        return this.view.getInt16(this.idx, true);
    }

    getUint32() {
        if (!this.view) {
            this.view = new DataView(this.array.buffer);// this breaks if a subarray is passed in
        }

        return this.view.getUint32(this.idx, true);
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
    arr: Uint8Array;
    idx: number;

    s(v: number, offset: number = 0): void {
        this.arr[this.idx + offset] = v;
    }

    v(offset: number = 0): number {
        return this.arr[this.idx + offset];
    }

    incr(): void {
        this.idx++;
    }

    constructor(buffer: ArrayBuffer, indexOffset: number = 0) {
        this.buf = buffer;
        this.arr = new Uint8Array(buffer);
        this.idx = indexOffset;
    }
}

////class Pt {
////    arr: Array;
////    idx: number;

////    s(v: number, offset: number = 0): void {
////        this.arr[this.idx + offset] = v;
////    }

////    v(offset: number = 0): number {
////        return this.arr[this.idx + offset];
////    }

////    incr(): void {
////        this.idx++;
////    }

////    constructor(arr: Array, indexOffset: number = 0) {
////        this.arr = arr;
////        this.idx = indexOffset;
////    }
////}


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

String.prototype.toUint8Array= function () : Uint8Array {
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
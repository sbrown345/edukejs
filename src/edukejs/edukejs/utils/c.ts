﻿/// <reference path="assert.ts" />

var NULL = null;
var TRUE = 1;
var FALSE = 0;

function exit(code: number) {
    todoThrow();
}

var fileHandles = [null, null, null, null, null];

function _open(path: string, oflags: number, mode: number): number {
    //var xhr = new XMLHttpRequest();
    //if (xhr.overrideMimeType) {
    //    xhr.overrideMimeType('text/plain; charset=x-user-defined');
    //}
    //xhr.open('GET', path, false);
    //xhr.send();

    //if (typeof VBArray !== "undefined") { // IE 9/10
    //    var data = new VBArray(xhr.responseBody).toArray();
    //    var buf = new ArrayBuffer(data.length);
    //    var dest = new Uint8Array(buf);
    //    var i;
    //    for (i = 0; i < data.length; ++i) {
    //        dest[i] = data[i];
    //    }

    //    return buf;
    //} else {
    //    var src = xhr.responseText;
    //    var buf = new ArrayBuffer(src.length);
    //    var dest = new Uint8Array(buf);
    //    var i;
    //    for (i = 0; i < src.length; ++i) {
    //        dest[i] = src.charCodeAt(i) & 255;
    //    }

    //    return buf;
    //}

    return 4; // it happened to be 4 debugging the original
}

function memset(array: any, startIndex: number, value: number, num: number) : void {
    assert.int32(startIndex).uint8(value).int32(num);

    for (var i = startIndex; i < num; i++) {
        array[i] = value;
    }
}

function read(fileHandle: number, dstBuf: Uint8Array, maxCharCount: number) : number {
    var source = fileHandles[fileHandle];
    var i : number = 0;
    for (; i < maxCharCount; i++) {
        dstBuf[i] = source[i];
    }

    return i;
}

function sizeof(obj: any) : number {
    if (obj.size !== undefined) {
        return obj.size;
    }
    
    return obj.buffer.byteLength;
}

function strcpy(destination: Uint8Array, source: string) : void {
    assert.isType(Uint8Array, destination).isString(source);

    for (var i = 0; i < source.length; i++) {
        destination[i] = source.charCodeAt(i);
    }
}
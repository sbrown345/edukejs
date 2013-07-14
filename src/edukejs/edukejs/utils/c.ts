/// <reference path="assert.ts" />

var NULL = null;
var TRUE:number = 1;
var FALSE:number = 0;

function exit(code: number) {
    todoThrow();
}

var fileHandles : Ptr[] = [null, null, null, null, null];

function _close(handle : number) {
    // reset fake file handler pointer
    if(fileHandles[handle]) {
        fileHandles[handle].idx = 0;
    }
}

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

function lseek(fileHandle: number, offset: number, origin: number) : void {
    var source = fileHandles[fileHandle]; 
    switch(origin) {
        case BSEEK_SET:
            source.idx = offset;
            break;
        default:
            todoThrow();
    }
}

var min = Math.min;
var ma = Math.max;

function memcmp(buf1 : Uint8Array, buf2 : Uint8Array, count : number) : number {
    for (var i = 0; i < count; i++) {
        if(buf1[i] === buf2[i]) {
            continue;
        }   

        if(buf1[i] > buf2[i]) {
            return 1;
        }

        if(buf1[i] < buf2[i]) {
            return -1;
        }
    }

    return 0;
}

function memset(array: any, startIndex: number, value: number, num: number) : void {
    assert.int32(startIndex).uint8(value).int32(num);

    var uint8Array = new Uint8Array(array.buffer);
    for (var i = startIndex; i < num; i++) {
        uint8Array[i] = value;
    }
}

var printf = console.log.bind(console);

function read(fileHandle: number, dstBuf: Ptr, maxCharCount: number) : number {
    var source = fileHandles[fileHandle]; 
    var count = 0;
    for (var i = 0; i < maxCharCount && source.idx + i < source.array.length; i++) {
        if(dstBuf.idx + i > dstBuf.array.length) {
            throw "index does not exist";
        }
        dstBuf.array[dstBuf.idx + i] = source.array[source.idx + i];
        count++;
    }
    source.idx += count;
    return count;
}

//// read from buffer until a 0, or the end of the source
//function readString(fileHandle: number, dstStr: R<string>, maxCharCount: number) : number {
//    var source = fileHandles[fileHandle]; 
//    var count = 0;
//    for (var i = 0; i < maxCharCount && source.idx + i < source.array.length && source.array[source.idx + i] !== 0; i++) {
//        dstStr.$ += String.fromCharCode(source.array[source.idx + i]);
//        count++;
//    }
//    source.idx += count;
//    return dstStr.$.length;
//}

function sizeof(obj: any) : number {
    if (obj.size !== undefined) {
        return obj.size;
    }
    
    return obj.buffer.byteLength;
}

function strcmp(str1: string, str2: string) : number {
    assert.isString(str1).isString(str2);
    if (str1 == str2) {
        return 0;
    }

    if(str1 > str2) {
        return 1;
    }

    return -1;
}

function strcpy(destination: Uint8Array, source: string) : void {
    assert.isType(Uint8Array, destination).isString(source);

    for (var i = 0; i < source.length; i++) {
        destination[i] = source.charCodeAt(i);
    }
}

function strupr(str: string) : string {
    return str.toUpperCase();
}

function isalnum(c: string) : boolean {
    return (c >= "0" && c <= "9")
        || (c >= "A" && c <= "Z")
        || (c >= "a" && c <= "z");
}

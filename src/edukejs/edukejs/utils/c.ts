/// <reference path="assert.ts" />

var NULL = null; // ""==null = false,  ""==0 = true           (todo: would be wise to check all these later on)
var TRUE:number = 1;
var FALSE:number = 0;

var INT32_MIN = -2147483648;
var INT32_MAX = 2147483647;
var UINT32_MAX = 4294967295;

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

function memset(buffer: ArrayBuffer, startIndex: number, value: number, num: number) : void {
    assert.int32(startIndex).uint8(value).int32(num);

    var uint8Array = new Uint8Array(buffer);
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

    if(obj.buffer) {
        return obj.buffer.byteLength;
    }

    return obj.length;
}

function strcat(destination: string, source: string): string {
    return destination + source;
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

function strncmp(str1: string, str2: string, num: number) : number {
    assert.isString(str1).isString(str2);
    return strcmp(str1.substr(0, num), str2.substr(0, num));
}

function strcpy(destination: Uint8Array, source: string) : Uint8Array {
    assert.isType(Uint8Array, destination).isString(source);

    for (var i = 0; i < source.length; i++) {
        destination[i] = source.charCodeAt(i);
    }

    return destination;
}

function strncpy(destination: Uint8Array, source: string, numChars: number) : Uint8Array {
    assert.isType(Uint8Array, destination).isString(source);

    for (var i = 0; i < source.length && i < numChars; i++) {
        destination[i] = source.charCodeAt(i);
    }

     destination[i]= 0;

    return destination;
}

function strlen(charArray: Uint8Array) : number {
    var len = 0;
    for (; len < charArray.length && charArray[len]; len++) {}
    return len;
}

function strupr(str: string) : string {
    return str.toUpperCase();
}

function strtoll(str: string, i: number, endptr: R<string>, base: number) : number {
    if(base !== 10) {
        todoThrow();
    }

    if(endptr) {
        todoThrow();
    }

    //var i = 0;

    for (; i < str.length && /\s/.test(str[i]); i++) {
        //console.log("%i whitespace", i);
    }

    if(!/[\d-+]/.test(str[i])) {
        return 0;
    }

    var output = "";
    if(str[i] === "-" || str[i] === "+") {
        //console.log("%i -/= symb: %s", i, str[i]);
        output += str[i];
        i++;
    }

    for (; i < str.length && /[\d]/.test(str[i]); i++) {
        //console.log("%i digit %s", i, str[i]);
        output+= str[i];
    }

    //console.log("parse: %s = %i", output, parseInt(output, base));
    return parseInt(output, base);
}

function tolower(s: string): string {
    return s.toLowerCase();
}

function toupper(s: string): string {
    return s.toUpperCase();
}

function isalnum(c: string) : boolean {
    return (c >= "0" && c <= "9")
        || (c >= "A" && c <= "Z")
        || (c >= "a" && c <= "z");
}

function isdigit(c: string) : number  {
    return (c >= "0" && c <= "9") ?  1 : 0;
}

var uint8_t = {size:1};
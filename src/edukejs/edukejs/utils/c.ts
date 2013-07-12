/// <reference path="assert.ts" />

var NULL = 0;
var TRUE = 1;
var FALSE = 0;

function exit(code: number) {
    todoThrow();
}

function memset(array: any, startIndex: number, value: number, num: number) {
    assert.int32(startIndex).uint8(value).int32(num);

    for (var i = startIndex; i < num; i++) {
        array[i] = value;
    }
}

function sizeof(obj: any) {
    if (obj.size !== undefined) {
        return obj.size;
    }
    
    return obj.buffer.byteLength;
}

function strcpy(destination: Uint8Array, source: string) {
    assert.isType(Uint8Array, destination).isString(source);

    for (var i = 0; i < source.length; i++) {
        destination[i] = source.charCodeAt(i);
    }
}
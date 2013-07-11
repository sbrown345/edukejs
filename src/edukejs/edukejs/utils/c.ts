/// <reference path="assert.ts" />

'use strict';

var NULL = 0;
var TRUE = 1;
var FALSE = 0;

function exit(code: number) {
    todoThrow();
}

function strcpy(destination: Uint8Array, source: string) {
    assert.isType(Uint8Array, destination).isString(source);

    for (var i = 0; i < source.length; i++) {
        destination[i] = source.charCodeAt(i);
    }
}
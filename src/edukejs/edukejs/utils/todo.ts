﻿var shareware = false;
var hardcoded = {
    grpSize: shareware ? 11035779 : 44356548,
    grpCRC: shareware ? -1740973789 : -46280719,
    skipChecksum: true,
};

// keep track of things to do
function todo(reason?) {
    console.log("todo", reason);
}

function todoUnimportant(reason?) {
}

function todoThrow(message : string = "") {
    debugger;
    console.error("todo \n" + message);
    throw "!";
}

// track all temp hardcoded stuff
function tempHC(fn: () => void): void {
    fn();
}

// the first version will take the most direct route, add these markers in to track
function path(location: string) : void {
    var stack = (new Error()).stack;
    var depth = stack.split("\n").length - 4; // skip first line, this function, load gamme, xhr load
    depth = Math.max(0, depth);
    var spacing = Array(depth+1).join(" ");
    console.info("%cpath: %s%s", "color: green", spacing, location);
}

interface Error {
    stack: string;
}
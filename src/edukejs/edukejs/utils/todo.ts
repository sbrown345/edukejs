var shareware = false;
var hardcoded = {
    grpSize: shareware ? 11035779 : 44356548,
    grpCRC: shareware ? -1740973789 : -46280719,
};

// keep track of things to do
function todo(reason?) {
    console.log("todo", reason);
}

function todoThrow() {
    throw "todo";
}
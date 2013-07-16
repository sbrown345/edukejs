var DEBUG_COMPILE = true;

var dlog = function (log: boolean, format: string, ...args: any[]) {
    if(!log) return;
    args.unshift(format.trim());
    console.log.apply(console, args);
};
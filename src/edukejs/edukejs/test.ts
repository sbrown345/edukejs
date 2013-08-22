function normal(sf: number, ...optionalParams: any[]) {
    return 1;
}

function testDivThing(sf: number, undefArg = 2) {
    var a = 2; /* doc1 commets*/
    return a /= 3;
}

/*checked div*/
function testDiv(/*int32*/a1: number, a2: string): number {
    return 4 / 5/*last?*/; /* doc2 commets*/
}



 /* doc1 commets*/
class TestClass {
    num: number;
    constructor() {
        {
            this.num = 6 /7/*last?*/; // dvok
        }
    }
}
/* lightgl */
declare module goog 
{
    module math 
    {
        interface Long 
        {
            shiftLeft(numBits: number): Long;
            toNumber(): number;
        }

        module Long 
        {
            export function fromNumber(value: number): Long;
        }
    }
}



//#ifndef __crc32_h__
//#define __crc32_h__

//#include "compat.h"

//#ifdef EXTERNC
//extern "C" {
//#endif

//extern uint32_t crc32table[256];

//void initcrc32table(void);

//uint32_t crc32once(uint8_t *blk, uint32_t len);

function crc32init(/*uint32_t **/crcvar : Ref) : void
{
    if (!crcvar) return;
    crcvar.$ = 0xffffffff >>> 0;
}

function crc32block(/*uint32_t **/crcvar : Ref, /*uint8_t **/blk : Ptr, /*uint32_t*/ len : number) : void
{
    var crc : number = uint32(crcvar.$);
    while (len--) {
        crc = uint32(crc32table[((crc ^ (blk.array[blk.idx++])) & 0xff) >>> 0] ^ (crc >>> 8));
    }
    crcvar.$ = crc;
    console.log("crc", crc);
}

/*static inline uint32_t*/function crc32finish(/*uint32_t **/crcvar : Ref) : number
{
    crcvar.$ = (crcvar.$ ^ 0xffffffff) >>> 0;
    return crcvar.$;
}

//#ifdef EXTERNC
//}
//#endif

//#endif

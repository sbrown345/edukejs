

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

function crc32block(/*uint32_t **/crcvar : Ref, /*uint8_t **/blk : Uint8Array, /*uint32_t*/ len : number) : void
{
    var crc : number = crcvar.$;
    var blkIdx = 0;
    while (len--) crc = crc32table[((crc ^ (blk[++blkIdx])) & 0xff) >>> 0] ^ (crc >>> 8);
    crcvar.$ = crc;
}

/*static inline uint32_t*/function crc32finish(/*uint32_t **/crcvar : Ref) : number
{
    crcvar.$ =  (crcvar.$ ^ 0xffffffff) >>> 0;
    return crcvar.$;
}

//#ifdef EXTERNC
//}
//#endif

//#endif

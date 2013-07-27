/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/todo.ts" />

/// <reference path="build.h.ts" />

//#ifndef _texcache_h_
//# define _texcache_h_

//#ifdef USE_OPENGL

 var TEXCACHEMAGIC="QLZ1";
 var GLTEXCACHEADSIZ=8192;
 var TEXCACHEHASHSIZE=1024;

//enum texcacherr_t
//{
//    TEXCACHERR_NOERROR,
//    TEXCACHERR_OUTOFMEMORY,
//    TEXCACHERR_BUFFERUNDERRUN,
//    TEXCACHERR_DEDXT,
//    TEXCACHERR_COMPTEX,
//    TEXCACHERR_GETTEXLEVEL,
//    TEXCACHEERRORS
//};

class texcacheitem_t
{
    name: string;//[BMAX_PATH];
    offset: number;           //int32_t 
    len: number;              //int32_t 
    next: texcacheitem_t;

    constructor() {
        this.name = "";
        this.offset = 0;
        this.len = 0;
        this.next = new texcacheitem_t();
    }
};

class texcacheindex extends texcacheitem_t { }

class globaltexcache{
    filehandle: number; filepos: number; numentries: number; //int32_t
    index: number; //FILE *
    list: pthtyp[];//[GLTEXCACHEADSIZ];
    firstindex: texcacheindex; currentindex: texcacheindex; ptrs: texcacheindex [];//[MAXTILES<<1];
    hashes: hashtable_t;
    memcache: memcache;

    constructor() {
        this.filehandle = 0; this.filepos = 0; this.numentries = 0;
        this.index = 0;
        this.list = newStructArray(pthtyp, GLTEXCACHEADSIZ);
        this.hashes = new hashtable_t(0, null);
        this.memcache = new memcache();
    }
} ;

class memcache {
    ptr: Uint8Array;
    size: number; //size
    // Set to 1 when we failed (re)allocating space for the memcache or failing to
    // read into it (which would presumably generate followup errors spamming the
    // log otherwise):
    noalloc: number; //int32
}

var texcache: globaltexcache;

//extern char TEXCACHEFILE[BMAX_PATH];

//extern void texcache_freeptrs(void);
//extern void texcache_syncmemcache(void);
//extern void texcache_init(void);
//extern void texcache_clearmemcache(void);
//extern int32_t texcache_loadoffsets(void);
//extern int32_t texcache_readdata(void *dest, int32_t len);
//extern pthtyp *texcache_fetch(int32_t dapicnum, int32_t dapalnum, int32_t dashade, int32_t dameth);
//extern int32_t texcache_loadskin(const texcacheheader *head, int32_t *doalloc, GLuint *glpic, int32_t *xsiz, int32_t *ysiz);
//extern int32_t texcache_loadtile(const texcacheheader *head, int32_t *doalloc, pthtyp *pth);
//extern void texcache_writetex(const char *fn, int32_t len, int32_t dameth, char effect, texcacheheader *head);
//extern int32_t texcache_readtexheader(const char *fn, int32_t len, int32_t dameth, char effect, texcacheheader *head, int32_t modelp);
//extern void texcache_openfiles(void);
//extern void texcache_setupmemcache(void);
//extern void texcache_checkgarbage(void);
//extern void texcache_setupindex(void);

//#endif
//#endif
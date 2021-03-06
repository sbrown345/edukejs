//#ifndef HIGHTILE_PRIV_H
//#define HIGHTILE_PRIV_H

class hicskybox_t {
    ignore: number; //int
    face: Uint8Array; //char [6]

    constructor() {
        this.ignore= 0;
        this.face= new Uint8Array(6);
    }
};

class hicreplctyp {
    next: hicreplctyp;
    filename: string;
    skybox: hicskybox_t;
    palnum: number; ignore: number; flags: number; filler: number;//char
    alphacut: number; xscale: number; yscale: number; specpower: number; specfactor: number; //float

    constructor() {
        this.next = null;
        this.skybox = null;
        this.palnum = null;
        this.xscale= null;
        this.flags= null;
        this.filler = null;
        this.alphacut = 0;
        this.xscale = 0;
        this.yscale = 0;
        this.specpower = 0;
        this.specfactor = 0;
        this.yscale = 0;
    }
} //hicreplctyp;

//extern palette_t hictinting[MAXPALOOKUPS];
//extern hicreplctyp *hicreplc[MAXTILES];
//extern char hicfirstinit;

//typedef struct texcachehead_t
//{
//    char magic[4];	// 'PMST', was 'Polymost'
//    int xdim, ydim;	// of image, unpadded
//    int flags;		// 1 = !2^x, 2 = has alpha, 4 = lzw compressed
//    int quality;    // r_downsize at the time the cache was written
//} texcacheheader;

//typedef struct texcachepic_t
//{
//    int size;
//    int format;
//    int xdim, ydim;	// of mipmap (possibly padded)
//    int border, depth;
//} texcachepicture;

//hicreplctyp * hicfindsubst(int picnum, int palnum, int skybox);
//#define HICEFFECTMASK (1|2|4|8)

//#endif

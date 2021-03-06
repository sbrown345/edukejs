//#ifndef _polymost_h_
//# define _polymost_h_

//#ifdef USE_OPENGL

//#include "hightile.h"

class coltype { /*char*/ r: number; g: number; b: number; a: number; public static size = 4;
    constructor() {
        this.r=0;this.g=0;this.b=0;this.a=0;
    }
}

function coltypeArrayToBuffer(coltypeArray: coltype[]) : ArrayBufferView {
    var arr = new Uint8Array(coltypeArray.length * coltype.size);
    for (var i = 0; i < coltypeArray.length; i++) {
        arr[i*4+0] = coltypeArray[i].r;
        arr[i*4+1] = coltypeArray[i].g;
        arr[i*4+2] = coltypeArray[i].b;
        arr[i*4+3] = coltypeArray[i].a;
    }

    return arr;
}

//extern int32_t rendmode;
//extern float gtang;
//extern float glox1, gloy1;
//extern double gxyaspect, grhalfxdown10x;
//extern double gcosang, gsinang, gcosang2, gsinang2;
//extern double gchang, gshang, gctang, gstang, gvisibility;

//struct glfiltermodes {
//	const char *name;
//	int32_t min,mag;
//};
//#define NUMGLFILTERMODES 6
//extern struct glfiltermodes glfiltermodes[NUMGLFILTERMODES];

////void phex(char v, char *s);
//void uploadtexture(int32_t doalloc, int32_t xsiz, int32_t ysiz, int32_t intexfmt, int32_t texfmt, coltype *pic, int32_t tsizx, int32_t tsizy, int32_t dameth);
//void polymost_drawsprite(int32_t snum);
//void polymost_drawmaskwall(int32_t damaskwallcnt);
//void polymost_dorotatesprite(int32_t sx, int32_t sy, int32_t z, int16_t a, int16_t picnum,
//                             int8_t dashade, char dapalnum, int32_t dastat, uint8_t daalpha, int32_t cx1, int32_t cy1, int32_t cx2, int32_t cy2, int32_t uniqid);
//void polymost_fillpolygon(int32_t npoints);
//void polymost_initosdfuncs(void);
//void polymost_drawrooms(void);

//void polymost_glinit(void);
//void polymost_glreset(void);

//enum {
var INVALIDATE_ALL=0,
    INVALIDATE_ART=1;
//};

//void gltexinvalidate(int32_t dapicnum, int32_t dapalnum, int32_t dameth);
//void gltexinvalidatetype(int32_t type);
//int32_t polymost_printext256(int32_t xpos, int32_t ypos, int16_t col, int16_t backcol, const char *name, char fontsize);

//extern float curpolygonoffset;

//extern float shadescale;
var shadescale_unboundedL: number;//extern int32_t
//extern float alphahackarray[MAXTILES];

var r_usenewshading: number;       //extern int32_t 
var r_usetileshades: number;       //extern int32_t 

//extern int16_t globalpicnum;
//extern int32_t globalpal;

function getshadefactor(/*int32_t */shade: number): number /*float*/
{
    var shadebound = (shadescale_unbounded || shade>=numshades) ? numshades : numshades-1;
    var clamped_shade = min(max(shade*shadescale, 0), shadebound);
    if (getrendermode() == REND_POLYMOST && r_usetileshades &&
        (!usehightile || !hicfindsubst(globalpicnum, globalpal, 0)) &&
        (!usemodels || md_tilehasmodel(globalpicnum, globalpal) < 0)) return 1.0;
    return ((numshades-clamped_shade))/numshades;
}

class pthtyp
{
    next: pthtyp;
    glpic: WebGLTexture; //number
    picnum: number;
    palnum: number;     //char
    shade: number;      //char
    effects: number;    //char
    flags: number;      // 1 = clamped (dameth&4), 2 = hightile, 4 = skybox face, 8 = hasalpha, 16 = hasfullbright, 128 = invalidated //char
    skyface: number;    //char
    hicr: hicreplctyp;  

    sizx: number; sizy: number; //uint16_t
    scalex: number; scaley: number; //float 
    ofb: pthtyp; // only fullbright //struct pthtyp_t *

    constructor() {
        this.init();
    }

    init() {
        this.next = null;
        this.glpic = null;
        this.picnum = 0;
        this.palnum = 0;
        this.shade = 0;
        this.effects = 0;
        this.flags = 0;
        this.skyface = 0;
        this.hicr = null;
        this.sizx = 0; this.sizy = 0;
        this.scalex = 0.0; this.scaley = 0.0;
        this.ofb = null;
    }
} /*pthtyp*/;

//extern int32_t gloadtile_art(int32_t,int32_t,int32_t,int32_t,pthtyp *,int32_t);
//extern int32_t gloadtile_hi(int32_t,int32_t,int32_t,hicreplctyp *,int32_t,pthtyp *,int32_t,char);

//extern int32_t globalnoeffect;
//extern int32_t drawingskybox;
//extern int32_t hicprecaching;
//extern double gyxscale, gxyaspect, ghalfx, grhalfxdown10;

//extern char ptempbuf[MAXWALLSB<<1];

//static inline void polymost_setupdetailtexture(int32_t *texunits, int32_t tex)
//{
//    bglActiveTextureARB(++*texunits);

//    bglEnable(GL_TEXTURE_2D);
//    bglBindTexture(GL_TEXTURE_2D, tex);

//    bglTexEnvf(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_COMBINE_ARB);
//    bglTexEnvf(GL_TEXTURE_ENV, GL_COMBINE_RGB_ARB, GL_MODULATE);

//    bglTexEnvf(GL_TEXTURE_ENV, GL_SOURCE0_RGB_ARB, GL_PREVIOUS_ARB);
//    bglTexEnvf(GL_TEXTURE_ENV, GL_OPERAND0_RGB_ARB, GL_SRC_COLOR);

//    bglTexEnvf(GL_TEXTURE_ENV, GL_SOURCE1_RGB_ARB, GL_TEXTURE);
//    bglTexEnvf(GL_TEXTURE_ENV, GL_OPERAND1_RGB_ARB, GL_SRC_COLOR);

//    bglTexEnvf(GL_TEXTURE_ENV, GL_COMBINE_ALPHA_ARB, GL_REPLACE);
//    bglTexEnvf(GL_TEXTURE_ENV, GL_SOURCE0_ALPHA_ARB, GL_PREVIOUS_ARB);
//    bglTexEnvf(GL_TEXTURE_ENV, GL_OPERAND0_ALPHA_ARB, GL_SRC_ALPHA);

//    bglTexEnvf(GL_TEXTURE_ENV, GL_RGB_SCALE_ARB, 2.0f);

//    bglTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_WRAP_S,GL_REPEAT);
//    bglTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_WRAP_T,GL_REPEAT);
//}

//static inline void polymost_setupglowtexture(int32_t *texunits, int32_t tex)
//{
//    bglActiveTextureARB(++*texunits);

//    bglEnable(GL_TEXTURE_2D);
//    bglBindTexture(GL_TEXTURE_2D, tex);

//    bglTexEnvf(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_COMBINE_ARB);
//    bglTexEnvf(GL_TEXTURE_ENV, GL_COMBINE_RGB_ARB, GL_INTERPOLATE_ARB);

//    bglTexEnvf(GL_TEXTURE_ENV, GL_SOURCE0_RGB_ARB, GL_PREVIOUS_ARB);
//    bglTexEnvf(GL_TEXTURE_ENV, GL_OPERAND0_RGB_ARB, GL_SRC_COLOR);

//    bglTexEnvf(GL_TEXTURE_ENV, GL_SOURCE1_RGB_ARB, GL_TEXTURE);
//    bglTexEnvf(GL_TEXTURE_ENV, GL_OPERAND1_RGB_ARB, GL_SRC_COLOR);

//    bglTexEnvf(GL_TEXTURE_ENV, GL_SOURCE2_RGB_ARB, GL_TEXTURE);
//    bglTexEnvf(GL_TEXTURE_ENV, GL_OPERAND2_RGB_ARB, GL_ONE_MINUS_SRC_ALPHA);

//    bglTexEnvf(GL_TEXTURE_ENV, GL_COMBINE_ALPHA_ARB, GL_REPLACE);
//    bglTexEnvf(GL_TEXTURE_ENV, GL_SOURCE0_ALPHA_ARB, GL_PREVIOUS_ARB);
//    bglTexEnvf(GL_TEXTURE_ENV, GL_OPERAND0_ALPHA_ARB, GL_SRC_ALPHA);

//    bglTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_WRAP_S,GL_REPEAT);
//    bglTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_WRAP_T,GL_REPEAT);
//}
//#include "texcache.h"

//#endif

//#endif

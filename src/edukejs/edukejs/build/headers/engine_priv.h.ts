//#ifndef ENGINE_PRIV_H
//#define ENGINE_PRIV_H

var MAXCLIPNUM=1024;
var MAXPERMS=512;
var MAXTILEFILES=256;
//// MAXYSAVES is 983040 (!) right now:
//#define MAXYSAVES ((MAXXDIM*MAXSPRITES)>>7)
//#define MAXNODESPERLINE (MAXYSAVES/MAXYDIM)  // 307
var MAXCLIPDIST=1024;

//// Uncomment to clear the screen before each top-level draw (classic only).
//// FIXME: doesn't work with mirrors.
////#define ENGINE_CLEAR_SCREEN

//#ifdef YAX_ENABLE
var YAX_MAXDRAWS  = 8;
//#endif

//#ifdef __cplusplus
//extern "C" {
//#endif
//    extern intptr_t asm1, asm2, asm3, asm4;
//    extern int32_t globalx1, globaly2;
//#ifdef __cplusplus
//};
//#endif

//extern uint8_t basepalcount;
//extern uint8_t curbasepal;

//extern int16_t thesector[MAXWALLSB], thewall[MAXWALLSB];
//extern int16_t bunchfirst[MAXWALLSB], bunchlast[MAXWALLSB];
var /*int16_t */maskwall = new Int16Array(MAXWALLSB), maskwallcnt: number;
//extern spritetype *tspriteptr[MAXSPRITESONSCREEN + 1];
//extern int32_t xdimen, xdimenrecip, halfxdimen, xdimenscale, xdimscale, ydimen;
//extern intptr_t frameoffset;
//extern int32_t globalposx, globalposy, globalposz, globalhoriz;
//extern int16_t globalang, globalcursectnum;
//extern int32_t globalpal, cosglobalang, singlobalang;
//extern int32_t cosviewingrangeglobalang, sinviewingrangeglobalang;
//extern int32_t globalhisibility, globalpisibility, globalcisibility;
//extern int32_t globvis, globalvisibility;
//extern int32_t xyaspect;
//extern int32_t globalshade;
//extern int16_t globalpicnum;

//extern int32_t globalorientation;

//extern int16_t editstatus;

//extern int16_t searchit;
//extern int32_t searchx, searchy;
//extern int16_t searchsector, searchwall, searchstat;
//extern int16_t searchbottomwall, searchisbottom;

var /*char */inpreparemirror: number = 0;

//extern int32_t curbrightness, gammabrightness;
//extern char britable[16][256];
//extern char picsiz[MAXTILES];
//extern int16_t sectorborder[256], sectorbordercnt;
//extern int32_t qsetmode;
var /*int32_t */hitallsprites: number;

//extern int32_t xb1[MAXWALLSB];
//extern int32_t rx1[MAXWALLSB], ry1[MAXWALLSB];
//extern int16_t p2[MAXWALLSB];
//extern int16_t numscans, numbunches;

//#ifdef USE_OPENGL

// For GL_EXP2 fog:
var FOGSCALE=0.0000768;

//extern palette_t palookupfog[MAXPALOOKUPS];
//void calc_and_apply_fog(int32_t tile, int32_t shade, int32_t vis, int32_t pal);
//void calc_and_apply_fog_factor(int32_t tile, int32_t shade, int32_t vis, int32_t pal, float factor);
//#endif

//// int32_t wallmost(int16_t *mostbuf, int32_t w, int32_t sectnum, char dastat);
//int32_t wallfront(int32_t l1, int32_t l2);
//int32_t animateoffs(int16_t tilenum, int16_t fakevar);

//void set_globalang(int16_t ang);

function DO_TILE_ANIM(Picnum: number, Fakevar: any):void {// do { 
    todoThrow("Picnum - inline this!!!!! Picnum is a value");
    // maybe try http://www.codeproject.com/Articles/3853/Wave-a-Standard-conformant-C-preprocessor-library
        if (picanm[Picnum].sf&PICANM_ANIMTYPE_MASK) Picnum += animateoffs(Picnum, Fakevar); 
   // } while (0); 
}

function /*int32_t */bad_tspr(tspr:spritetype):number
{
    // NOTE: tspr.owner >= MAXSPRITES (could be model) has to be handled by
    // caller.
    return (tspr.owner < 0 || /*(unsigned) */tspr.picnum >= MAXTILES)?1:0;
}

//
// getpalookup (internal)
//
function getpalookup(davis: number, dashade: number)
{
    return(min(max(dashade+(davis>>8),0),numshades-1));
}

//static inline int32_t getpalookupsh(int32_t davis)
//{
//    return getpalookup(davis, globalshade)<<8;
//}

//void dorotspr_handle_bit2(int32_t *sx, int32_t *sy, int32_t *z, int32_t dastat,
//                          int32_t cx1_plus_cx2, int32_t cy1_plus_cy2,
//                          int32_t *ret_ouryxaspect, int32_t *ret_ourxyaspect);

//////// yax'y stuff //////
//#ifdef USE_OPENGL
//extern void polymost_scansector(int32_t sectnum);
//#endif
//int32_t engine_addtsprite(int16_t z, int16_t sectnum);
//#ifdef YAX_ENABLE
//extern int32_t g_nodraw, scansector_retfast;
//extern int32_t yax_globallev, yax_globalbunch;
//extern int32_t yax_globalcf, yax_nomaskpass, yax_nomaskdidit;
//extern uint8_t haveymost[YAX_MAXBUNCHES>>3];
//extern uint8_t yax_gotsector[MAXSECTORS>>3];

function /*static inline int32_t */yax_isislandwall(/*int32_t */line: number, /*int32_t */cf: number): number
{
    return (yax_vnextsec(line, cf)>=0)?1:0;
}
//#endif

//#ifdef YAX_DEBUG
//extern char m32_debugstr[64][128];
//extern int32_t m32_numdebuglines;
//# define yaxdebug(fmt, ...)  do { if (m32_numdebuglines<64) Bsnprintf(m32_debugstr[m32_numdebuglines++], 128, fmt, ##__VA_ARGS__); } while (0)
//# define yaxprintf(fmt, ...) do { initprintf(fmt, ##__VA_ARGS__); } while (0)
//#else
var yaxdebug = console.log.bind(console);
//# define yaxprintf(fmt, ...)
//#endif


//extern int32_t indrawroomsandmasks;


//#if defined(_MSC_VER) && !defined(NOASM)

//static inline void setgotpic(int32_t a)
//{
//	_asm {
//		push ebx
//		mov eax, a
//		mov ebx, eax
//		cmp byte ptr walock[eax], 200
//		jae skipit
//		mov byte ptr walock[eax], 199
//skipit:
//		shr eax, 3
//		and ebx, 7
//		mov dl, byte ptr gotpic[eax]
//		mov bl, byte ptr pow2char[ebx]
//		or dl, bl
//		mov byte ptr gotpic[eax], dl
//		pop ebx
//	}
//}

//#elif defined(__GNUC__) && defined(__i386__) && !defined(NOASM)	// _MSC_VER

//#define setgotpic(a) \
//({ int32_t __a=(a); \
//	__asm__ __volatile__ ( \
//			       "movl %%eax, %%ebx\n\t" \
//			       "cmpb $200, "ASMSYM("walock")"(%%eax)\n\t" \
//			       "jae 0f\n\t" \
//			       "movb $199, "ASMSYM("walock")"(%%eax)\n\t" \
//			       "0:\n\t" \
//			       "shrl $3, %%eax\n\t" \
//			       "andl $7, %%ebx\n\t" \
//			       "movb "ASMSYM("gotpic")"(%%eax), %%dl\n\t" \
//			       "movb "ASMSYM("pow2char")"(%%ebx), %%bl\n\t" \
//			       "orb %%bl, %%dl\n\t" \
//			       "movb %%dl, "ASMSYM("gotpic")"(%%eax)" \
//			       : "=a" (__a) : "a" (__a) \
//			       : "ebx", "edx", "memory", "cc"); \
//				       __a; })

//#else	// __GNUC__ && __i386__

function setgotpic(tilenume:  number): void
{
	if (walock[tilenume] < 200) walock[tilenume] = 199;
	gotpic[tilenume>>3] |= pow2char[tilenume&7];
}

//#endif

function bricolor(wpptr: palette_t, dacol: number): void;
function bricolor(wpptr: coltype, dacol: number): void;
function bricolor(wpptr: any, dacol: number): void 
{
    if (gammabrightness)
    {
        wpptr.r = curpalette[dacol].r;
        wpptr.g = curpalette[dacol].g;
        wpptr.b = curpalette[dacol].b;
    }
    else
    {
        wpptr.r = britable[curbrightness][ curpalette[dacol].r ];
        wpptr.g = britable[curbrightness][ curpalette[dacol].g ];
        wpptr.b = britable[curbrightness][ curpalette[dacol].b ];
    }
}

//#endif	/* ENGINE_PRIV_H */

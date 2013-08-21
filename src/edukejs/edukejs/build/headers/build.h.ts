// "Build Engine & Tools" Copyright (c) 1993-1997 Ken Silverman
// Ken Silverman's official web site: "http://www.advsys.net/ken"
// See the included license file "BUILDLIC.TXT" for license info.
//
// This file has been modified from Ken Silverman's original release
// by Jonathon Fowler (jf@jonof.id.au)


//#ifndef __build_h__
//#define __build_h__

//#include "compat.h"
//#include "pragmas.h"
//#include "glbuild.h"

//#ifdef EXTERNC
//extern "C" {
//#endif

//enum rendmode_t {
var REND_CLASSIC = 0,
    REND_POLYMOST = 3,
    REND_POLYMER = 4;
//};

var PI=3.14159265358979323846;

var MAXSECTORSV8 = 4096;
var MAXWALLSV8 = 16384;
var MAXSPRITESV8 = 16384;

var MAXSECTORSV7 = 1024;
var MAXWALLSV7 = 8192;
var MAXSPRITESV7 = 4096;

//#ifndef GEKKO
var MAXSECTORS = MAXSECTORSV8;
var MAXWALLS = MAXWALLSV8;
var MAXSPRITES = MAXSPRITESV8;

var MAXXDIM = 7680;
var MAXYDIM = 3200;

//#ifdef LUNATIC
//# define NEW_MAP_FORMAT
//// A marker for LuaJIT C function callbacks, but not merely:
//# define LUNATIC_CB ATTRIBUTE((used))
//// Used for variables and functions referenced from Lua:
//# define LUNATIC_EXTERN ATTRIBUTE((used))
//#else
//# ifdef NEW_MAP_FORMAT
//#  error "New map format can only be used with Lunatic"
//# endif
//# define LUNATIC_EXTERN static
//#endif

//// additional space beyond wall, in walltypes:
var M32_FIXME_WALLS = 512;
var M32_FIXME_SECTORS = 2;
//#else
//# define MAXSECTORS MAXSECTORSV7
//# define MAXWALLS MAXWALLSV7
//# define MAXSPRITES MAXSPRITESV7

//# define MAXXDIM 860
//# define MAXYDIM 490

//# define M32_FIXME_WALLS 0
//# define M32_FIXME_SECTORS 0
//#endif

var MAXWALLSB = ((MAXWALLS>>2)+(MAXWALLS>>3));

var MAXTILES = 30720;
var MAXVOXELS = 4096;
var MAXSTATUS = 1024;
var MAXPLAYERS = 16;
var MAXBASEPALS = 8;
var MAXPALOOKUPS = 256;
var MAXPSKYMULTIS = 8;
var MAXPSKYTILES = 256;
var MAXSPRITESONSCREEN = 4096;
var MAXUNIQHUDID = 256; //Extra slots so HUD models can store animation state without messing game sprites

var RESERVEDPALS = 4; // don't forget to increment this when adding reserved pals
var DETAILPAL  =(MAXPALOOKUPS - 1);
var GLOWPAL    =(MAXPALOOKUPS - 2);
var SPECULARPAL=(MAXPALOOKUPS - 3);
var NORMALPAL  =(MAXPALOOKUPS - 4);

var TSPR_TEMP=99;
var TSPR_MIRROR=100;

var PR_LIGHT_PRIO_MAX       =0;
var PR_LIGHT_PRIO_MAX_GAME  =1;
var PR_LIGHT_PRIO_HIGH      =2;
var PR_LIGHT_PRIO_HIGH_GAME =3;
var PR_LIGHT_PRIO_LOW       =4;
var PR_LIGHT_PRIO_LOW_GAME  =5;

//// Convenient sprite iterators, must not be used if any sprites inside the loop
//// are potentially deleted or their sector changed...
//#define SPRITES_OF(Statnum, Iter)  Iter=headspritestat[Statnum]; Iter>=0; Iter=nextspritestat[Iter]
//#define SPRITES_OF_SECT(Sectnum, Iter)  Iter=headspritesect[Sectnum]; Iter>=0; Iter=nextspritesect[Iter]
//// ... in which case this iterator may be used:
//#define SPRITES_OF_SECT_SAFE(Sectnum, Iter, Next)  Iter=headspritesect[Sectnum]; \
//    Iter>=0 && (Next=nextspritesect[Iter], 1); Iter=Next

//#define CLEARLINES2D(Startline, Numlines, Color) \
//    clearbuf((char *)(frameplace + ((Startline)*bytesperline)), (bytesperline*(Numlines))>>2, (Color))


//////////// True Room over Room (YAX == rot -17 of "PRO") //////////
//#define YAX_ENABLE
////#define YAX_DEBUG
////#define ENGINE_SCREENSHOT_DEBUG

//#ifdef YAX_ENABLE
//# if !defined NEW_MAP_FORMAT
//#  define YAX_ENABLE__COMPAT
//# endif
//#endif

//////////// yax defs //////////
function SECTORFLD(Sect: number,Fld: string, Cf: number): number;
function SECTORFLD(Sect: number,Fld: string, Cf: number, setFn: (v:number)=>{}): number;
function SECTORFLD(Sect: number,Fld: string, Cf: number, value: number): number;
function SECTORFLD(Sect: number,Fld: string, Cf: number, setFnOrValue: any = null): number {
    function getPropertyName() {
        return ((Cf) ? ("floor" + Fld) : ("ceiling" + Fld));
    }
    
    var s = sector[Sect];
    var propName = getPropertyName();
    if(typeof setFnOrValue === "function") {
        s[propName] = setFnOrValue(s[propName]);
    }
    else if(typeof setFnOrValue === "number") {
        s[propName] = setFnOrValue;
    }

    return s[propName];
}

var YAX_CEILING = 0;  // don't change!
var YAX_FLOOR = 1;  // don't change!

//# ifdef NEW_MAP_FORMAT
//#  define YAX_MAXBUNCHES 512
//#  define YAX_BIT__COMPAT 1024
//function YAX_NEXTWALLBIT__COMPAT(Cf: number): number {return 1<<(10+Cf);}
//#  define YAX_NEXTWALLBITS__COMPAT (YAX_NEXTWALLBIT__COMPAT(0)|YAX_NEXTWALLBIT__COMPAT(1))
//# else
var YAX_MAXBUNCHES = 256;
var YAX_BIT = 1024;
//   // "has next wall when constrained"-bit (1<<10: ceiling, 1<<11: floor)
function YAX_NEXTWALLBIT(Cf: number): number {return 1<<(10+Cf);}
//#  define YAX_NEXTWALLBITS (YAX_NEXTWALLBIT(0)|YAX_NEXTWALLBIT(1))
//# endif

//int32_t get_alwaysshowgray(void);  // editor only
//void yax_updategrays(int32_t posze);

//#ifdef YAX_ENABLE
//# ifdef NEW_MAP_FORMAT
//   // New map format -- no hijacking of otherwise used members.
//#  define YAX_PTRNEXTWALL(Ptr, Wall, Cf) (*(&Ptr[Wall].upwall + Cf))
//#  define YAX_NEXTWALLDEFAULT(Cf) (-1)
//# else
//   // More user tag hijacking: lotag/extra. :/
function YAX_PTRNEXTWALL(Ptr:walltype[], Wall: number, Cf: number): number {return (Ptr[Wall].lotag + 2*Cf);}
//#  define YAX_NEXTWALLDEFAULT(Cf) (((Cf)==YAX_CEILING) ? 0 : -1)
//   extern int16_t yax_bunchnum[MAXSECTORS][2];
//   extern int16_t yax_nextwall[MAXWALLS][2];
//# endif

function YAX_NEXTWALL(Wall: number, Cf: number): number{return YAX_PTRNEXTWALL(wall, Wall, Cf);};

//# define YAX_ITER_WALLS(Wal, Itervar, Cfvar) Cfvar=0, Itervar=(Wal); Itervar!=-1; \
//    Itervar=yax_getnextwall(Itervar, Cfvar), \
//        (void)(Itervar==-1 && Cfvar==0 && (Cfvar=1) && (Itervar=yax_getnextwall((Wal), Cfvar)))

//# define SECTORS_OF_BUNCH(Bunchnum, Cf, Itervar) Itervar = headsectbunch[Cf][Bunchnum]; \
//    Itervar != -1; Itervar = nextsectbunch[Cf][Itervar]

//extern int32_t r_tror_nomaskpass;

//# ifdef NEW_MAP_FORMAT
//// Moved below declarations of sector, wall, sprite.
//# else
//int16_t yax_getbunch(int16_t i, int16_t cf);
//void yax_getbunches(int16_t i, int16_t *cb, int16_t *fb);
//int16_t yax_getnextwall(int16_t wal, int16_t cf);
//void yax_setnextwall(int16_t wal, int16_t cf, int16_t thenextwall);
//# endif

//void yax_setbunch(int16_t i, int16_t cf, int16_t bunchnum);
//void yax_setbunches(int16_t i, int16_t cb, int16_t fb);
//int16_t yax_vnextsec(int16_t line, int16_t cf);
//void yax_update(int32_t resetstat);
//int32_t yax_getneighborsect(int32_t x, int32_t y, int32_t sectnum, int32_t cf);

function/*static inline int32_t */yax_waltosecmask(/*int32_t */walclipmask: number): number
{
    // blocking: walstat&1 --> secstat&512
    // hitscan: walstat&64 --> secstat&2048
    return ((walclipmask&1)<<9) | ((walclipmask&64)<<5);
}
//void yax_preparedrawrooms(void);
//void yax_drawrooms(void (*SpriteAnimFunc)(int32_t,int32_t,int32_t,int32_t),
//                   int16_t sectnum, int32_t didmirror, int32_t smoothr);
//# define YAX_SKIPSECTOR(i) if (graysectbitmap[(i)>>3]&(1<<((i)&7))) continue
//# define YAX_SKIPWALL(i) if (graywallbitmap[(i)>>3]&(1<<((i)&7))) continue
//#else
//# define yax_preparedrawrooms()
//# define yax_drawrooms(SpriteAnimFunc, sectnum, didmirror, smoothr)
//# define YAX_SKIPSECTOR(i) (i)=(i)
//# define YAX_SKIPWALL(i) (i)=(i)
//#endif

var CLIPMASK0: number=(((1)<<16)+1);
var CLIPMASK1: number=(((256)<<16)+64);

//// max x/y val (= max editorgridextent in Mapster32)
//#define BXY_MAX 524288

//enum {
var ROTATESPRITE_FULL16 = 2048,
//    // ROTATESPRITE_MAX-1 is the mask of all externally available orientation bits
    ROTATESPRITE_MAX = 4096,

    RS_CENTERORIGIN = (1<<30);
//};

//    //Make all variables in BUILD.H defined in the ENGINE,
//    //and externed in GAME
//#ifdef ENGINE
//#  define EXTERN
//#else
//#  define EXTERN extern
//#endif

//#ifdef __cplusplus

//static inline void sector_tracker_hook(uintptr_t address);
//static inline void wall_tracker_hook(uintptr_t address);
//static inline void sprite_tracker_hook(uintptr_t address);

//#define __TRACKER_NAME SectorTracker
//#define __TRACKER_GLOBAL_HOOK sector_tracker_hook
//#include "tracker.hpp"
//#undef __TRACKER_NAME
//#undef __TRACKER_GLOBAL_HOOK

//#define __TRACKER_NAME WallTracker
//#define __TRACKER_GLOBAL_HOOK wall_tracker_hook
//#include "tracker.hpp"
//#undef __TRACKER_NAME
//#undef __TRACKER_GLOBAL_HOOK

//#define __TRACKER_NAME SpriteTracker
//#define __TRACKER_GLOBAL_HOOK sprite_tracker_hook
//#include "tracker.hpp"
//#undef __TRACKER_NAME
//#undef __TRACKER_GLOBAL_HOOK

//#define Tracker(Container, Type) Container##Tracker<Type>
function TrackerCast(x: number): number{return x;}

//#else

//#define Tracker(Container, Type) Type
//#define TrackerCast(x) x

//#endif // __cplusplus

//// Links to various ABIs specifying (or documenting non-normatively) the
//// alignment requirements of aggregates:
////
////  System V AMD64: http://www.x86-64.org/documentation/abi-0.99.pdf
////   (x86-64.org down as of 2013-02-02?)
////  "An array uses the same alignment as its elements, except that a local or global
////   array variable of length at least 16 bytes or a C99 variable-length array variable
////   always has alignment of at least 16 bytes."
////   (Not reproducible with GCC or LuaJIT on Ubuntu)
////
////  Win64: http://msdn.microsoft.com/en-us/library/9dbwhz68.aspx
////
////  x86: http://en.wikipedia.org/wiki/Data_structure_alignment#Typical_alignment_of_C_structs_on_x86


////ceilingstat/floorstat:
////   bit 0: 1 = parallaxing, 0 = not                                 "P"
////   bit 1: 1 = groudraw, 0 = not
////   bit 2: 1 = swap x&y, 0 = not                                    "F"
////   bit 3: 1 = double smooshiness                                   "E"
////   bit 4: 1 = x-flip                                               "F"
////   bit 5: 1 = y-flip                                               "F"
////   bit 6: 1 = Align texture to first wall of sector                "R"
////   bits 8-7:                                                       "T"
////          00 = normal floors
////          01 = masked floors
////          10 = transluscent masked floors
////          11 = reverse transluscent masked floors
////   bit 9: 1 = blocking ceiling/floor
////   bit 10: 1 = YAX'ed ceiling/floor
////   bit 11: 1 = hitscan-sensitive ceiling/floor
////   bits 12-15: reserved

////////////////////// Version 7 map format ////////////////////

//40 bytes
class sectortypev7 implements ITypeInfo
{
    wallptr : number; wallnum: number;                                      //Tracker(Sector, int16_t) 
    ceilingz : number; floorz: number;                                               //Tracker(Sector, int32_t) 
    ceilingstat : number; floorstat: number;                                        //Tracker(Sector, uint16_t)
    ceilingpicnum : number; ceilingheinum: number;                                   //Tracker(Sector, int16_t) 
    ceilingshade: number;                                                          //Tracker(Sector, int8_t)  
    ceilingpal : number; /*CM_FLOORZ:*/ ceilingxpanning : number; ceilingypanning: number;    //Tracker(Sector, uint8_t) 
    floorpicnum : number; floorheinum: number;                                       //Tracker(Sector, int16_t) 
    floorshade: number;                                                            //Tracker(Sector, int8_t)  
    floorpal : number; floorxpanning : number; floorypanning: number;                         //Tracker(Sector, uint8_t) 
    visibility: number; filler: number;
    private _lotag:Uint16Array;private _hitag:Uint16Array;                      //Tracker(Sector, uint16_t) 
    private _extra:Int16Array;                                                  //Tracker(Sector, int16_t)  
    
    get lotag(): number  {return this._lotag[0];}
    set lotag(val: number) {this._lotag[0] = val; }
    get hitag(): number  {return this._hitag[0];}
    set hitag(val: number) {this._hitag[0] = val; }
    get extra(): number  {return this._extra[0];}
    set extra(val: number) {this._extra[0] = val; }                                                            //Tracker(Sector, int16_t) 

    public static size = 40;
    public static typeInfo = [
        ["wallptr", "int16_t"], ["wallnum", "int16_t"],
        ["ceilingz", "int32_t"], ["floorz", "int32_t"],
        ["ceilingstat", "uint16_t"], ["floorstat", "uint16_t"],
        ["ceilingpicnum", "int16_t"], ["ceilingheinum", "int16_t"],
        ["ceilingshade", "int8_t"], 
        ["ceilingpal", "uint8_t"], ["ceilingxpanning", "uint8_t"], ["ceilingypanning", "uint8_t"], 
        ["floorpicnum", "int16_t"], ["floorheinum", "int16_t"],
        ["floorshade", "uint8_t"],
        ["floorpal", "uint8_t"], ["floorxpanning", "uint8_t"], ["floorypanning", "uint8_t"],
        ["visibility", "uint8_t"], ["filler", "uint8_t"],
        ["lotag", "uint16_t"], ["hitag", "uint16_t"],
        ["extra", "int16_t"]
    ];

    constructor () {
        this.init();
    }

    public init() {
        this.wallptr = 0, this.wallnum = 0;                                      //Tracker(Sector, int16_t) 
        this.ceilingz = 0, this.floorz = 0;                                               //Tracker(Sector, int32_t) 
        this.ceilingstat = 0, this.floorstat = 0;                                        //Tracker(Sector, uint16_t)
        this.ceilingpicnum = 0, this.ceilingheinum = 0;                                   //Tracker(Sector, int16_t) 
        this.ceilingshade = 0;                                                          //Tracker(Sector, int8_t)  
        this.ceilingpal = 0, /*CM_FLOORZ:*/ this.ceilingxpanning = 0, this.ceilingypanning = 0;    //Tracker(Sector, uint8_t) 
        this.floorpicnum = 0, this.floorheinum = 0;                                       //Tracker(Sector, int16_t) 
        this.floorshade = 0;                                                            //Tracker(Sector, int8_t)  
        this.floorpal = 0, this.floorxpanning = 0, this.floorypanning = 0;                         //Tracker(Sector, uint8_t) 
        /*CM_CEILINGZ:*/ this.visibility = 0, this.filler = 0;                           //Tracker(Sector, uint8_t) 
        this._lotag = new Uint16Array(1), this._hitag = new Uint16Array(1);                                                  //Tracker(Sector, uint16_t)
        this._extra = new Int16Array(1); 
    }
}// sectortypev7;

////cstat:
////   bit 0: 1 = Blocking wall (use with clipmove, getzrange)         "B"
////   bit 1: 1 = bottoms of invisible walls swapped, 0 = not          "2"
////   bit 2: 1 = align picture on bottom (for doors), 0 = top         "O"
////   bit 3: 1 = x-flipped, 0 = normal                                "F"
////   bit 4: 1 = masking wall, 0 = not                                "M"
////   bit 5: 1 = 1-way wall, 0 = not                                  "1"
////   bit 6: 1 = Blocking wall (use with hitscan / cliptype 1)        "H"
////   bit 7: 1 = Transluscence, 0 = not                               "T"
////   bit 8: 1 = y-flipped, 0 = normal                                "F"
////   bit 9: 1 = Transluscence reversing, 0 = normal                  "T"
////   bits 10 and 11: reserved (in use by YAX)
////   bits 12-15: reserved  (14: temp use by editor)

//32 bytes
class walltypev7 implements ITypeInfo
{
    x : number; y : number;                                        //Tracker(Wall, int32_t)  
    point2 : number; nextwall : number; nextsector : number;                //Tracker(Wall, int16_t)  
    _cstat : Uint16Array;                                       //Tracker(Wall, uint16_t) 
    picnum : number; overpicnum : number;                          //Tracker(Wall, int16_t)  
    shade : number;                                       //Tracker(Wall, int8_t)   
    pal : number; xrepeat : number; yrepeat : number; xpanning : number; ypanning : number;   //Tracker(Wall, uint8_t)  
    lotag : number; hitag : number;                                //Tracker(Wall, uint16_t) 
    extra : number;                                       //Tracker(Wall, int16_t)  

    get cstat(): number  {return this._cstat[0];}
    set cstat(val: number) {this._cstat[0] = val;} //Tracker(Sprite, uint16_t)

    public static size = 32;
    public static typeInfo = [
        ["x", "int32_t"], ["y", "int32_t"],
        ["point2", "int16_t"], ["nextwall", "int16_t"], ["nextsector", "int16_t"],
        ["cstat", "uint16_t"],
        ["picnum", "int16_t"], ["overpicnum", "int16_t"],
        ["shade", "int8_t"],
        ["pal", "uint8_t"], ["xrepeat", "uint8_t"], ["yrepeat", "uint8_t"], ["xpanning", "uint8_t"], ["ypanning", "uint8_t"],
        ["lotag", "uint16_t"], ["hitag", "uint16_t"],
        ["extra", "int16_t"]
    ];

    constructor() {
        this.init();
    }

    public init() {
        this.x = 0, this.y = 0;                                        //Tracker(Wall, int32_t)  
        this.point2 = 0, this.nextwall = 0, this.nextsector = 0;                //Tracker(Wall, int16_t)  
        this._cstat = new Uint16Array(1);                                       //Tracker(Wall, uint16_t) 
        this.picnum = 0, this.overpicnum = 0;                          //Tracker(Wall, int16_t)  
        this.shade = 0;                                       //Tracker(Wall, int8_t)   
        this.pal = 0, this.xrepeat = 0, this.yrepeat = 0, this.xpanning = 0, this.ypanning = 0;   //Tracker(Wall, uint8_t)  
        this.lotag = 0, this.hitag = 0;                                //Tracker(Wall, uint16_t) 
        this.extra = 0;                                       //Tracker(Wall, int16_t)  
    }
} //walltypev7;


//enum {
//    SPR_XFLIP = 4,
//    SPR_YFLIP = 8,

//    SPR_WALL = 16,
//    SPR_FLOOR = 32,
//    SPR_ALIGN_MASK = 32+16,
//};

////cstat:
////   bit 0: 1 = Blocking sprite (use with clipmove, getzrange)       "B"
////   bit 1: 1 = transluscence, 0 = normal                            "T"
////   bit 2: 1 = x-flipped, 0 = normal                                "F"
////   bit 3: 1 = y-flipped, 0 = normal                                "F"
////   bits 5-4: 00 = FACE sprite (default)                            "R"
////             01 = WALL sprite (like masked walls)
////             10 = FLOOR sprite (parallel to ceilings&floors)
////   bit 6: 1 = 1-sided sprite, 0 = normal                           "1"
////   bit 7: 1 = Real centered centering, 0 = foot center             "C"
////   bit 8: 1 = Blocking sprite (use with hitscan / cliptype 1)      "H"
////   bit 9: 1 = Transluscence reversing, 0 = normal                  "T"
////   bit 10: reserved (in use by a renderer hack, see CSTAT_SPRITE_MDHACK)
////   bit 11: 1 = determine shade based only on its own shade member (see CON's spritenoshade command)
////   bit 12: reserved
////   bit 13: 1 = does not cast shadow
////   bit 14: 1 = invisible but casts shadow
////   bit 15: 1 = Invisible sprite, 0 = not invisible

//44 bytes
class spritetype implements ITypeInfo, IVec3
{
    // check it's not passed by ref!
    //public toVec3(): vec3_t {
    //    return new vec3_t(this.x, this.y, this.z);
    //}

    x:number; y:number; z:number;         //Tracker(Sprite, int32_t)  

    private _cstat: Uint16Array;
    picnum:number;                            //Tracker(Sprite, int16_t)  
    shade:number;                             //Tracker(Sprite, int8_t)   
    pal:number; clipdist:number; filler:number;   //Tracker(Sprite, uint8_t)  
    xrepeat:number; yrepeat:number;                  //Tracker(Sprite, uint8_t)  
    xoffset:number; yoffset:number;                  //Tracker(Sprite, int8_t)   
    sectnum:number; statnum:number;                  //Tracker(Sprite, int16_t)  
    ang:number; owner:number; private _xvel:Int16Array; private _yvel:Int16Array; private _zvel:Int16Array;      //Tracker(Sprite, int16_t)  
    private _lotag:Uint16Array;private _hitag:Uint16Array;                      //Tracker(Sprite, uint16_t) 
    private _extra:Int16Array;                             //Tracker(Sprite, int16_t)  


    
    get cstat(): number  {return this._cstat[0];}
    set cstat(val: number) {this._cstat[0] = val;} //Tracker(Sprite, uint16_t)

    get xvel(): number  {return this._xvel[0];}
    set xvel(val: number) {this._xvel[0] = val; }
    get yvel(): number  {return this._yvel[0];}
    set yvel(val: number) {this._yvel[0] = val; }
    get zvel(): number  {return this._zvel[0];}
    set zvel(val: number) {this._zvel[0] = val; }
    get lotag(): number  {return this._lotag[0];}
    set lotag(val: number) {this._lotag[0] = val; }
    get hitag(): number  {return this._hitag[0];}
    set hitag(val: number) {this._hitag[0] = val; }
    get extra(): number  {return this._extra[0];}
    set extra(val: number) {this._extra[0] = val; }

    public static size = 44;
    public static typeInfo = [
        ["x", "int32_t"], ["y", "int32_t"],["z", "int32_t"],
        ["cstat", "uint16_t"],
        ["picnum", "int16_t"],
        ["shade", "int8_t"],
        ["pal", "uint8_t"], ["clipdist", "uint8_t"],["filler", "uint8_t"],
        ["xrepeat", "uint8_t"], ["yrepeat", "uint8_t"],
        ["xoffset", "int8_t"], ["yoffset", "int8_t"],
        ["sectnum", "int16_t"], ["statnum", "int16_t"],
        ["ang", "int16_t"], ["owner", "int16_t"],["xvel", "int16_t"],["yvel", "int16_t"],["zvel", "int16_t"],
        ["lotag", "uint16_t"], ["hitag", "uint16_t"],
        ["extra", "int16_t"]
    ];
        
    constructor() {
        this.init();
    }

    init(): void {
        this.x = 0, this.y = 0, this.z = 0;         //Tracker(Sprite, int32_t)  
        this._cstat = new Uint16Array(1);            //Tracker(Sprite, uint16_t) //todo: force this to be u16??????
        this.picnum = 0;                            //Tracker(Sprite, int16_t)  
        this.shade = 0;                             //Tracker(Sprite, int8_t)   
        this.pal = 0, this.clipdist = 0, this.filler = 0;   //Tracker(Sprite, uint8_t)  
        this.xrepeat = 0, this.yrepeat = 0;                  //Tracker(Sprite, uint8_t)  
        this.xoffset = 0, this.yoffset = 0;                  //Tracker(Sprite, int8_t)   
        this.sectnum = 0, this.statnum = 0;                  //Tracker(Sprite, int16_t)  
        this.ang = 0, this.owner = 0, this._xvel = new Int16Array(1), this._yvel = new Int16Array(1), this._zvel = new Int16Array(1);      //Tracker(Sprite, int16_t)  
        this._lotag = new Uint16Array(1), this._hitag = new Uint16Array(1);                     //Tracker(Sprite, uint16_t) 
        this._extra = new Int16Array(1);                             //Tracker(Sprite, int16_t)  
    }
} //spritetype;
////////////////////// END Version 7 map format ////////////////

//#ifdef NEW_MAP_FORMAT
////////////////////// Lunatic new-generation map format ////////////////////

//// 44 bytes
//typedef struct
//{
//    Tracker(Sector, int16_t) wallptr, wallnum;

//    Tracker(Sector, int16_t) ceilingpicnum, ceilingheinum, ceilingbunch;
//    Tracker(Sector, uint16_t) ceilingstat;
//    Tracker(Sector, int32_t) ceilingz;
//    Tracker(Sector, int8_t) ceilingshade;
//    Tracker(Sector, uint8_t) ceilingpal, /*CM_FLOORZ:*/ ceilingxpanning, ceilingypanning;

//    Tracker(Sector, int16_t) floorpicnum, floorheinum, floorbunch;
//    Tracker(Sector, uint16_t) floorstat;
//    Tracker(Sector, int32_t) floorz;
//    Tracker(Sector, int8_t) floorshade;
//    Tracker(Sector, uint8_t) floorpal, floorxpanning, floorypanning;

//    Tracker(Sector, uint8_t) /*CM_CEILINGZ:*/ visibility, filler;
//    Tracker(Sector, uint16_t) lotag, hitag;
//    Tracker(Sector, int16_t) extra;
//} sectortypevx;

//# define SECTORVX_SZ1 offsetof(sectortypevx, ceilingpicnum)
//# define SECTORVX_SZ4 sizeof(sectortypevx)-offsetof(sectortypevx, visibility)

//static inline void copy_v7_from_vx_sector(sectortypev7 *v7sec, const sectortypevx *vxsec)
//{
//    /* [wallptr..wallnum] */
//    Bmemcpy(v7sec, vxsec, SECTORVX_SZ1);

//    /* ceiling* */
//    v7sec->ceilingpicnum = vxsec->ceilingpicnum;
//    v7sec->ceilingheinum = vxsec->ceilingheinum;
//    v7sec->ceilingstat = vxsec->ceilingstat;
//    v7sec->ceilingz = vxsec->ceilingz;
//    v7sec->ceilingshade = vxsec->ceilingshade;
//    v7sec->ceilingpal = vxsec->ceilingpal;
//    v7sec->ceilingxpanning = vxsec->ceilingxpanning;
//    v7sec->ceilingypanning = vxsec->ceilingypanning;

//    /* floor* */
//    v7sec->floorpicnum = vxsec->floorpicnum;
//    v7sec->floorheinum = vxsec->floorheinum;
//    v7sec->floorstat = vxsec->floorstat;
//    v7sec->floorz = vxsec->floorz;
//    v7sec->floorshade = vxsec->floorshade;
//    v7sec->floorpal = vxsec->floorpal;
//    v7sec->floorxpanning = vxsec->floorxpanning;
//    v7sec->floorypanning = vxsec->floorypanning;

//    /* [visibility..extra] */
//    Bmemcpy(&v7sec->visibility, &vxsec->visibility, SECTORVX_SZ4);

//    /* Clear YAX_BIT of ceiling and floor. (New-map format build saves TROR
//     * maps as map-text.) */
//    v7sec->ceilingstat &= ~YAX_BIT__COMPAT;
//    v7sec->floorstat &= ~YAX_BIT__COMPAT;
//}

//static inline void inplace_vx_from_v7_sector(sectortypevx *vxsec)
//{
//    const sectortypev7 *v7sec = (sectortypev7 *)vxsec;
//    sectortypev7 bakv7sec;

//    // Can't do this in-place since the members were rearranged.
//    Bmemcpy(&bakv7sec, v7sec, sizeof(sectortypev7));

//    /* [wallptr..wallnum] is already at the right place */

//    /* ceiling* */
//    vxsec->ceilingpicnum = bakv7sec.ceilingpicnum;
//    vxsec->ceilingheinum = bakv7sec.ceilingheinum;
//    vxsec->ceilingstat = bakv7sec.ceilingstat;
//    vxsec->ceilingz = bakv7sec.ceilingz;
//    vxsec->ceilingshade = bakv7sec.ceilingshade;
//    vxsec->ceilingpal = bakv7sec.ceilingpal;
//    vxsec->ceilingxpanning = bakv7sec.ceilingxpanning;
//    vxsec->ceilingypanning = bakv7sec.ceilingypanning;

//    /* floor* */
//    vxsec->floorpicnum = bakv7sec.floorpicnum;
//    vxsec->floorheinum = bakv7sec.floorheinum;
//    vxsec->floorstat = bakv7sec.floorstat;
//    vxsec->floorz = bakv7sec.floorz;
//    vxsec->floorshade = bakv7sec.floorshade;
//    vxsec->floorpal = bakv7sec.floorpal;
//    vxsec->floorxpanning = bakv7sec.floorxpanning;
//    vxsec->floorypanning = bakv7sec.floorypanning;

//    /* [visibility..extra] */
//    Bmemmove(&vxsec->visibility, &bakv7sec.visibility, SECTORVX_SZ4);
//}

//static inline void inplace_vx_tweak_sector(sectortypevx *vxsec, int32_t yaxp)
//{
//    if (yaxp)
//    {
//        int32_t cisext = (vxsec->ceilingstat&YAX_BIT__COMPAT);
//        int32_t fisext = (vxsec->floorstat&YAX_BIT__COMPAT);

//        vxsec->ceilingbunch = cisext ? vxsec->ceilingxpanning : -1;
//        vxsec->floorbunch = fisext ? vxsec->floorxpanning : -1;

//        if (cisext)
//            vxsec->ceilingxpanning = 0;
//        if (fisext)
//            vxsec->floorxpanning = 0;
//    }
//    else
//    {
//        vxsec->ceilingbunch = vxsec->floorbunch = -1;
//    }

//    /* Clear YAX_BIT of ceiling and floor (map-int VX doesn't use it). */
//    vxsec->ceilingstat &= ~YAX_BIT__COMPAT;
//    vxsec->floorstat &= ~YAX_BIT__COMPAT;
//}

//# undef SECTORVX_SZ1
//# undef SECTORVX_SZ4

//// 36 bytes
//typedef struct
//{
//    Tracker(Wall, int32_t) x, y;
//    Tracker(Wall, int16_t) point2, nextwall, nextsector;
//    Tracker(Wall, int16_t) upwall, dnwall;
//    Tracker(Wall, uint16_t) cstat;
//    Tracker(Wall, int16_t) picnum, overpicnum;
//    Tracker(Wall, int8_t) shade;
//    Tracker(Wall, uint8_t) pal, xrepeat, yrepeat, xpanning, ypanning;
//    Tracker(Wall, uint16_t) lotag, hitag;
//    Tracker(Wall, int16_t) extra;
//} walltypevx;

//# define WALLVX_SZ2 sizeof(walltypevx)-offsetof(walltypevx, cstat)

//static inline void copy_v7_from_vx_wall(walltypev7 *v7wal, const walltypevx *vxwal)
//{
//    /* [x..nextsector] */
//    Bmemcpy(v7wal, vxwal, offsetof(walltypevx, upwall));
//    /* [cstat..extra] */
//    Bmemcpy(&v7wal->cstat, &vxwal->cstat, WALLVX_SZ2);
//    /* Clear YAX_NEXTWALLBITS. */
//    v7wal->cstat &= ~YAX_NEXTWALLBITS__COMPAT;
//}

//static inline void inplace_vx_from_v7_wall(walltypevx *vxwal)
//{
//    const walltypev7 *v7wal = (walltypev7 *)vxwal;

//    /* [cstat..extra] */
//    Bmemmove(&vxwal->cstat, &v7wal->cstat, WALLVX_SZ2);
//}

//static inline void inplace_vx_tweak_wall(walltypevx *vxwal, int32_t yaxp)
//{
//    if (yaxp)
//    {
//        int32_t haveupwall = (vxwal->cstat & YAX_NEXTWALLBIT__COMPAT(YAX_CEILING));
//        int32_t havednwall = (vxwal->cstat & YAX_NEXTWALLBIT__COMPAT(YAX_FLOOR));

//        vxwal->upwall = haveupwall ? vxwal->lotag : -1;
//        vxwal->dnwall = havednwall ? vxwal->extra : -1;

//        if (haveupwall)
//            vxwal->lotag = 0;
//        if (havednwall)
//            vxwal->extra = -1;
//    }
//    else
//    {
//        vxwal->upwall = vxwal->dnwall = -1;
//    }

//    /* Clear YAX_NEXTWALLBITS (map-int VX doesn't use it). */
//    vxwal->cstat &= ~YAX_NEXTWALLBITS__COMPAT;
//}

//# undef WALLVX_SZ2

//// NOTE: spritetype is currently the same for V7/8/9 and VX in-memory map formats.

//typedef sectortypevx sectortype;
//typedef walltypevx walltype;
////////////////////// END Lunatic new-generation map format ////////////////
//#else
class sectortype extends sectortypev7 {}
class walltype extends walltypev7 {}
//#endif

class spriteext_t {
    mdanimtims: number;                       //    uint32_t
    mdanimcur: number;                         //    int16_t 
    angoff: number; pitch: number; roll: number;               //    int16_t 
    xoff: number; yoff: number; zoff: number;                  //    int32_t 
    flags: number;                             //    uint8_t 
    xpanning: number; ypanning: number;                //    uint8_t 
    filler: number;                            //    uint8_t 
    alpha:number; //    float 

    constructor() {
        this.init();
    }

    public init() {
        this.mdanimtims = 0;                       //    uint32_t
        this.mdanimcur = 0;                         //    int16_t 
        this.angoff = 0, this.pitch = 0, this.roll = 0;               //    int16_t 
        this.xoff = 0, this.yoff = 0, this.zoff = 0;                  //    int32_t 
        this.flags = 0;                             //    uint8_t 
        this.xpanning = 0, this.ypanning = 0;                //    uint8_t 
        this.filler = 0;                            //    uint8_t 
        this.alpha = 0.0;//    float 
    }

//    // NOTE: keep 'tspr' on an 8-byte boundary:
//    spritetype *tspr;
//#if !defined UINTPTR_MAX
//# error Need UINTPTR_MAX define to select between 32- and 64-bit structs
//#endif
//#if UINTPTR_MAX == 0xffffffff
//    /* On a 32-bit build, pad the struct so it has the same size everywhere. */
//    intptr_t dummy_;
//#endif
} //spriteext_t;

class spritesmooth_t {
    smoothduration: number;                     //float 
    mdcurframe: number; mdoldframe: number;            //int16_t 
    mdsmooth: number;                          //int16_t 
    filler: Uint8Array;     

    constructor() {
        this.init();
    }
    init() {
        this.smoothduration = 0.0;                     //float 
        this.mdcurframe = 0, this.mdoldframe = 0;            //int16_t 
        this.mdsmooth = 0;                          //int16_t 
        this.filler = new Uint8Array(2);                         //uint8_t [2]
    }
} //spritesmooth_t;

//#define SPREXT_NOTMD 1
var SPREXT_NOMDANIM=2;
//#define SPREXT_AWAY1 4
//#define SPREXT_AWAY2 8
//#define SPREXT_TSPRACCESS 16
//#define SPREXT_TEMPINVISIBLE 32

//#define CSTAT_SPRITE_MDHACK 1024

var guniqhudid: number = 0;            //EXTERN int32_t 
var spritesortcnt: number = 0;         //EXTERN int32_t 
var g_loadedMapVersion: number = 0;    //extern int32_t 

//#if !defined DEBUG_MAIN_ARRAYS
//EXTERN spriteext_t *spriteext;
//EXTERN spritesmooth_t *spritesmooth;

var sector: sectortypev7[];//EXTERN sectortype *sector;
var wall: walltype[];//EXTERN walltype *wall;
var sprite: spritetype[];//EXTERN spritetype *sprite;
var tsprite: spritetype[];//EXTERN spritetype *tsprite;
//#else
var spriteext: spriteext_t[];//EXTERN spriteext_t spriteext[MAXSPRITES+MAXUNIQHUDID];
var spritesmooth: spritesmooth_t[];//EXTERN spritesmooth_t spritesmooth[MAXSPRITES+MAXUNIQHUDID];

//EXTERN sectortype sector[MAXSECTORS + M32_FIXME_SECTORS];
//EXTERN walltype wall[MAXWALLS + M32_FIXME_WALLS];
//EXTERN spritetype sprite[MAXSPRITES];
//EXTERN spritetype tsprite[MAXSPRITESONSCREEN];
//#endif

//EXTERN uint32_t sectorchanged[MAXSECTORS + M32_FIXME_SECTORS];
//EXTERN uint32_t wallchanged[MAXWALLS + M32_FIXME_WALLS];
//EXTERN uint32_t spritechanged[MAXSPRITES];

//#ifdef NEW_MAP_FORMAT
//static inline int16_t yax_getbunch(int16_t i, int16_t cf)
//{
//    return cf ? sector[i].floorbunch : sector[i].ceilingbunch;
//}

//static inline void yax_getbunches(int16_t i, int16_t *cb, int16_t *fb)
//{
//    *cb = yax_getbunch(i, YAX_CEILING);
//    *fb = yax_getbunch(i, YAX_FLOOR);
//}

//static inline int16_t yax_getnextwall(int16_t wal, int16_t cf)
//{
//    return cf ? wall[wal].dnwall : wall[wal].upwall;
//}

//static inline void yax_setnextwall(int16_t wal, int16_t cf, int16_t thenextwall)
//{
//    YAX_NEXTWALL(wal, cf) = thenextwall;
//}
//#endif

//static inline void sector_tracker_hook(uintptr_t address)
//{
//    address -= (uintptr_t)(sector);
//    address /= sizeof(sectortype);

//    if (address > MAXSECTORS + M32_FIXME_SECTORS) return;

//    sectorchanged[address]++;
//}

//static inline void wall_tracker_hook(uintptr_t address)
//{
//    address -= (uintptr_t)(wall);
//    address /= sizeof(walltype);

//    if (address > MAXWALLS + M32_FIXME_WALLS) return;

//    wallchanged[address]++;
//}

//static inline void sprite_tracker_hook(uintptr_t address)
//{
//    if (address >= (uintptr_t)(sprite) &&
//        address < (uintptr_t)(sprite) + MAXSPRITES * sizeof(spritetype))
//    {
//        address -= (uintptr_t)(sprite);
//        address /= sizeof(spritetype);

//        spritechanged[address]++;
//    }
//}

//EXTERN int16_t maskwall[MAXWALLSB], maskwallcnt;
var thewall = new Int16Array(MAXWALLSB);
//EXTERN spritetype *tspriteptr[MAXSPRITESONSCREEN + 1];

var xdim = 0, ydim = 0, numpages = 0;       //EXTERN int32_t 
var yxaspect = 0, viewingrange = 0;     //EXTERN int32_t 
//#ifdef __cplusplus
//extern "C" {
//#endif
var ylookup = new Int32Array(MAXYDIM+1); //EXTERN intptr_t 
//#ifdef __cplusplus
//};
//#endif

var MAXVALIDMODES=256;
var validmodecnt : number; //EXTERN int32_t 
class validmode_t {
    xdim: number; ydim: number; //int32_t
    bpp: number;                                 //char 
    fs: number;    // bit 0 = fullscreen flag    //char 
    filler: Uint8Array;//[2];                           //char 
    extra: number; // internal use  //int32_t

    constructor() {
        this.xdim = 0;this.ydim = 0;
        this.bpp = 0;
        this.fs = 0;
        this.filler = new Uint8Array(2);
        this.extra = 0;
    }
};
var validmode: validmode_t[] = newStructArray(validmode_t, MAXVALIDMODES);

var numyaxbunches: number;//EXTERN int32_t 
//#ifdef YAX_ENABLE
//// Singly-linked list of sectnums grouped by bunches and ceiling (0)/floor (1)
//// Usage e.g.:
////   int16_t bunchnum = yax_getbunch(somesector, YAX_CEILING);
//// Iteration over all sectors whose floor bunchnum equals 'bunchnum' (i.e. "all
//// floors of the other side"):
////   for (i=headsectbunch[1][bunchnum]; i!=-1; i=nextsectbunch[1][i])
////       <do stuff with sector i...>

var headsectbunch: Int16Array[] = multiDimArray<Int16Array>(Int16Array, 2, YAX_MAXBUNCHES), nextsectbunch: Int16Array[] = multiDimArray<Int16Array>(Int16Array, 2, MAXSECTORS);
//#endif

var Numsprites: number; //EXTERN int32_t
var numsectors: number, numwalls: number; //EXTERN int16_t 
var display_mirror: number;//EXTERN char 
/*@type {number}*/ var totalclock: number=0;
var numframes = 0, randomseed = 0; //EXTERN int32_t 
var sintable = new Int16Array(2048);
var palette = new Uint8Array(768);
var numshades:number;//EXTERN int16_t 
var palookup: Uint8Array[] = new Array(MAXPALOOKUPS); //EXTERN char *
var basepaltableptr: Uint8Array[]; //EXTERN uint8_t **
var parallaxtype: number, showinvisibility: number; //EXTERN char
var parallaxyoffs: number, parallaxyscale:number;               //EXTERN int32_t
var g_visibility: number, parallaxvisibility:number;            //EXTERN int32_t
var g_rotatespriteNoWidescreen: number;                  //EXTERN int32_t

var windowx1:number, windowy1:number, windowx2:number, windowy2:number; //EXTERN int32_t 
var startumost = new Int16Array(MAXXDIM), startdmost = new Int16Array(MAXXDIM); //EXTERN int16_t 

// original multi-psky handling (only one per map)
var pskyoff = new Int16Array(MAXPSKYTILES), pskybits: number;
// new multi-psky -- up to MAXPSKYMULTIS
var pskynummultis: number; //int16_t 
var pskymultiyscale = new Int32Array(MAXPSKYMULTIS);                                   //EXTERN int32_t 
var pskymultilist = new Int16Array(MAXPSKYMULTIS), pskymultibits = new Int16Array(MAXPSKYMULTIS);       //EXTERN int16_t 
var pskymultioff = multiDimArray<Int16Array>(Int16Array, MAXPSKYMULTIS, MAXPSKYTILES);                        //EXTERN int16_t 

//// last sprite in the freelist, that is the spritenum for which
////   .statnum==MAXSTATUS && nextspritestat[spritenum]==-1
//// (or -1 if freelist is empty):
var tailspritefree = 0;//EXTERN int16_t 

var headspritesect= new Int16Array(MAXSECTORS+1), headspritestat= new Int16Array(MAXSTATUS+1);       //EXTERN int16_t 
var prevspritesect= new Int16Array(MAXSPRITES), prevspritestat= new Int16Array(MAXSPRITES);          //EXTERN int16_t 
var nextspritesect= new Int16Array(MAXSPRITES), nextspritestat= new Int16Array(MAXSPRITES);          //EXTERN int16_t 

var tilesizx = new Int16Array(MAXTILES), tilesizy = new Int16Array(MAXTILES);
var picsiz = new Uint8Array(MAXTILES);
var walock = new Uint8Array(MAXTILES);
//#ifdef __cplusplus
//extern "C" {
//#endif
//extern const char pow2char[8];
var pow2long: Int32Array;
//#ifdef __cplusplus
//};
//#endif

//// picanm[].sf:
//// |bit(1<<7)
//// |animtype|animtype|texhitscan|nofullbright|speed|speed|speed|speed|
//enum {
var PICANM_ANIMTYPE_NONE = 0,
    PICANM_ANIMTYPE_OSC = (1<<6),
    PICANM_ANIMTYPE_FWD = (2<<6),
    PICANM_ANIMTYPE_BACK = (3<<6),
    
    PICANM_ANIMTYPE_SHIFT = 6,
    PICANM_ANIMTYPE_MASK = (3<<6),  // must be 192
    PICANM_MISC_MASK = (3<<4),
    PICANM_TEXHITSCAN_BIT = (2<<4),
    PICANM_NOFULLBRIGHT_BIT = (1<<4),
    PICANM_ANIMSPEED_MASK = 15;  // must be 15
//};

// NOTE: If the layout of this struct is changed, loadpics() must be modified
// accordingly.
class picanm_t {
     num: number;  // animate number //uint8_t
     xofs: number; yofs: number; //int8_t
     sf: number;  // anim. speed and flags //uint8_t
     size: number;

    setProps(ab: ArrayBuffer, offsetIndex: number) {
        var dv = new DataView(ab, offsetIndex * this.size);
        this.num = dv.getUint8(0);
        this.xofs = dv.getInt8(1);
        this.yofs = dv.getInt8(2);
        this.sf = dv.getUint8(3);
    }

    constructor() {
        this.num=0;
        this.xofs=0;this.yofs=0;
        this.sf=0;
    }   
    
    public static size = 4;   
}
var picanm: picanm_t[] = newStructArray(picanm_t, MAXTILES);
var waloff: ArrayBuffer[] = new Array(MAXTILES);  // stores pointers to cache  -- SA //EXTERN intptr_t 

//EXTERN int32_t windowpos, windowx, windowy;

//    //These variables are for auto-mapping with the draw2dscreen function.
//    //When you load a new board, these bits are all set to 0 - since
//    //you haven't mapped out anything yet.  Note that these arrays are
//    //bit-mapped.
//    //If you want draw2dscreen() to show sprite #54 then you say:
//    //   spritenum = 54;
//    //   show2dsprite[spritenum>>3] |= (1<<(spritenum&7));
//    //And if you want draw2dscreen() to not show sprite #54 then you say:
//    //   spritenum = 54;
//    //   show2dsprite[spritenum>>3] &= ~(1<<(spritenum&7));

 var show2dsector = new Uint8Array((MAXSECTORS+7)>>3);      //EXTERN char
 var show2dwall = new Uint8Array((MAXWALLS+7)>>3);          //EXTERN char
 var show2dsprite = new Uint8Array((MAXSPRITES+7)>>3);      //EXTERN char

//// In the editor, gotpic is only referenced from inline assembly;
//// the compiler needs that hint or building with LTO will discard it.
//#ifndef __clang__
//# define GOTPIC_USED ATTRIBUTE((used))
//#else
//# define GOTPIC_USED
//#endif

var gotpic = new Uint8Array((MAXTILES+7)>>3);
var gotsector = new Uint8Array((MAXSECTORS+7)>>3); ////EXTERN char 

//EXTERN char editorcolors[256];

var faketilesiz = new Int32Array(MAXTILES);
//EXTERN char *faketiledata[MAXTILES];

//EXTERN char spritecol2d[MAXTILES][2];
//extern char vgapal16[4*256];

//extern uint32_t drawlinepat;

//extern void faketimerhandler(void);

//extern char apptitle[256];
class palette_t {
    private _values: Uint8Array;

    constructor(r: number = 0, g: number = 0, b: number = 0, f: number = 0) {
        this._values = new Uint8Array([r, g, b, f]);
    }

    public get r(): number {return this._values[0];}
    public set r(v: number) {this._values[0] = v;}
     
    public get g(): number {return this._values[1];}
    public set g(v: number) {this._values[1] = v;}

    public get b(): number {return this._values[2];}
    public set b(v: number) {this._values[2] = v;}

    public get f(): number {return this._values[3];}
    public set f(v: number) {this._values[3] = v;}
}
//extern palette_t curpalette[256], curpalettefaded[256], palfadergb;
//extern char palfadedelta;

//extern int32_t novoxmips;

//#ifdef DEBUGGINGAIDS
//extern float debug1, debug2;
//#endif

//extern int16_t tiletovox[MAXTILES];
//extern int32_t usevoxels, voxscale[MAXVOXELS];

//#ifdef USE_OPENGL
//extern int32_t usemodels, usehightile;
//extern int32_t rendmode;
//#endif
//EXTERN int32_t h_xsize[MAXTILES], h_ysize[MAXTILES];
//EXTERN int8_t h_xoffs[MAXTILES], h_yoffs[MAXTILES];

//extern const char *engineerrstr;

//EXTERN int32_t editorzrange[2];

function getrendermode(): number
{
//#ifndef USE_OPENGL
    //return REND_CLASSIC;
//#else
    return rendmode;
//#endif
}

///*************************************************************************
//POSITION VARIABLES:

//        POSX is your x - position ranging from 0 to 65535
//        POSY is your y - position ranging from 0 to 65535
//            (the length of a side of the grid in EDITBORD would be 1024)
//        POSZ is your z - position (height) ranging from 0 to 65535, 0 highest.
//        ANG is your angle ranging from 0 to 2047.  Instead of 360 degrees, or
//             2 * PI radians, I use 2048 different angles, so 90 degrees would
//             be 512 in my system.

//SPRITE VARIABLES:

//    EXTERN short headspritesect[MAXSECTORS+1], headspritestat[MAXSTATUS+1];
//    EXTERN short prevspritesect[MAXSPRITES], prevspritestat[MAXSPRITES];
//    EXTERN short nextspritesect[MAXSPRITES], nextspritestat[MAXSPRITES];

//    Example: if the linked lists look like the following:
//         ????????????????
//               Sector lists:               Status lists:               
//         ????????????????J
//           Sector0:  4, 5, 8             Status0:  2, 0, 8             
//           Sector1:  16, 2, 0, 7         Status1:  4, 5, 16, 7, 3, 9   
//           Sector2:  3, 9                                              
//         ????????????????
//    Notice that each number listed above is shown exactly once on both the
//        left and right side.  This is because any sprite that exists must
//        be in some sector, and must have some kind of status that you define.


//Coding example #1:
//    To go through all the sprites in sector 1, the code can look like this:

//        sectnum = 1;
//        i = headspritesect[sectnum];
//        while (i != -1)
//        {
//            nexti = nextspritesect[i];

//            //your code goes here
//            //ex: printf("Sprite %d is in sector %d\n",i,sectnum);

//            i = nexti;
//        }

//Coding example #2:
//    To go through all sprites with status = 1, the code can look like this:

//        statnum = 1;        //status 1
//        i = headspritestat[statnum];
//        while (i != -1)
//        {
//            nexti = nextspritestat[i];

//            //your code goes here
//            //ex: printf("Sprite %d has a status of 1 (active)\n",i,statnum);

//            i = nexti;
//        }

//             insertsprite(short sectnum, short statnum);
//             deletesprite(short spritenum);
//             changespritesect(short spritenum, short newsectnum);
//             changespritestat(short spritenum, short newstatnum);

//TILE VARIABLES:
//        NUMTILES - the number of tiles found TILES.DAT.
//        TILESIZX[MAXTILES] - simply the x-dimension of the tile number.
//        TILESIZY[MAXTILES] - simply the y-dimension of the tile number.
//        WALOFF[MAXTILES] - the actual address pointing to the top-left
//                                 corner of the tile.
//        PICANM[MAXTILES] - flags for animating the tile.

//TIMING VARIABLES:
//        TOTALCLOCK - When the engine is initialized, TOTALCLOCK is set to zero.
//            From then on, it is incremented 120 times a second by 1.  That
//            means that the number of seconds elapsed is totalclock / 120.
//        NUMFRAMES - The number of times the draw3dscreen function was called
//            since the engine was initialized.  This helps to determine frame
//            rate.  (Frame rate = numframes * 120 / totalclock.)

//OTHER VARIABLES:

//        STARTUMOST[320] is an array of the highest y-coordinates on each column
//                that my engine is allowed to write to.  You need to set it only
//                once.
//        STARTDMOST[320] is an array of the lowest y-coordinates on each column
//                that my engine is allowed to write to.  You need to set it only
//                once.
//        SINTABLE[2048] is a sin table with 2048 angles rather than the
//            normal 360 angles for higher precision.  Also since SINTABLE is in
//            all integers, the range is multiplied by 16383, so instead of the
//            normal -1<sin(x)<1, the range of sintable is -16383<sintable[]<16383
//            If you use this sintable, you can possibly speed up your code as
//            well as save space in memory.  If you plan to use sintable, 2
//            identities you may want to keep in mind are:
//                sintable[ang&2047]       = sin(ang * (3.141592/1024)) * 16383
//                sintable[(ang+512)&2047] = cos(ang * (3.141592/1024)) * 16383
//        NUMSECTORS - the total number of existing sectors.  Modified every time
//            you call the loadboard function.
//***************************************************************************/

//typedef struct {
//    int32_t x, y;
//} vec2_t;

interface IVec3 {
    x: number; y: number; z: number;
}

class vec3_t implements IVec3{
    x: number; y: number; z: number;//    int32_t

    constructor(x = 0, y = 0, z = 0) {
        this.init(x, y, z);
    }

    init(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    copyTo(v: IVec3) {
        v.x = this.x;
        v.y = this.y;
        v.z = this.z;
    }

    copyFrom(v: IVec3) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    }
};

class hitdata_t {
    pos: vec3_t ;
    sprite: number; wall: number; sect: number;//    int16_t 

    constructor() {
        this.pos = new vec3_t();
        this.sprite = 0; this.wall = 0; this.sect = 0;
    }
}


//int32_t    preinitengine(void);	// a partial setup of the engine used for launch windows
//int32_t    initengine(void);
//void   uninitengine(void);
//void   initspritelists(void);
//int32_t   loadboard(const char *filename, char flags, vec3_t *dapos, int16_t *daang, int16_t *dacursectnum);
//int32_t   loadmaphack(const char *filename);
//void delete_maphack_lights();
//#ifdef HAVE_CLIPSHAPE_FEATURE
//int32_t clipmapinfo_load(void);
//#endif
//int32_t   saveboard(const char *filename, const vec3_t *dapos, int16_t daang, int16_t dacursectnum);
//void set_tilesiz(int32_t picnum, int16_t dasizx, int16_t dasizy);
//int32_t tile_exists(int32_t picnum);
//int32_t   loadpics(const char *filename, int32_t askedsize);
//void   loadtile(int16_t tilenume);
//int32_t   qloadkvx(int32_t voxindex, const char *filename);
//intptr_t   allocatepermanenttile(int16_t tilenume, int32_t xsiz, int32_t ysiz);
////void   copytilepiece(int32_t tilenume1, int32_t sx1, int32_t sy1, int32_t xsiz, int32_t ysiz, int32_t tilenume2, int32_t sx2, int32_t sy2);
//void   makepalookup(int32_t palnum, const char *remapbuf, int8_t r, int8_t g, int8_t b, char dastat);
////void   setvgapalette(void);
//void   setbasepaltable(uint8_t **basepaltable, uint8_t basepalcount);
//void   setbrightness(char dabrightness, uint8_t dapalid, uint8_t flags);
//void   setpalettefade(char r, char g, char b, char offset);
//void   squarerotatetile(int16_t tilenume);
//void fade_screen_black(int32_t moreopaquep);

//int32_t   setgamemode(char davidoption, int32_t daxdim, int32_t daydim, int32_t dabpp);
//void   nextpage(void);
//void   setaspect_new();
//void   setview(int32_t x1, int32_t y1, int32_t x2, int32_t y2);
//void   setaspect(int32_t daxrange, int32_t daaspect);
//void   flushperms(void);

//void plotlines2d(const int32_t *xx, const int32_t *yy, int32_t numpoints, char col) ATTRIBUTE((nonnull(1,2)));

//void   plotpixel(int32_t x, int32_t y, char col);
//char   getpixel(int32_t x, int32_t y);
//void   setviewtotile(int16_t tilenume, int32_t xsiz, int32_t ysiz);
//void   setviewback(void);
//void   preparemirror(int32_t dax, int32_t day, int16_t daang, int16_t dawall,
//                     int32_t *tposx, int32_t *tposy, int16_t *tang);
//void   completemirror(void);

//int32_t   drawrooms(int32_t daposx, int32_t daposy, int32_t daposz,
//                    int16_t daang, int32_t dahoriz, int16_t dacursectnum);
//void   drawmasks(void);
//void   clearview(int32_t dacol);
//void   clearallviews(int32_t dacol);
//void   drawmapview(int32_t dax, int32_t day, int32_t zoome, int16_t ang);
//void   rotatesprite_(int32_t sx, int32_t sy, int32_t z, int16_t a, int16_t picnum,
//                    int8_t dashade, char dapalnum, int32_t dastat, uint8_t daalpha,
//                    int32_t cx1, int32_t cy1, int32_t cx2, int32_t cy2);
//void   drawline256(int32_t x1, int32_t y1, int32_t x2, int32_t y2, char col);
//int32_t    printext16(int32_t xpos, int32_t ypos, int16_t col, int16_t backcol,
//                      const char *name, char fontsize) ATTRIBUTE((nonnull(5)));
//void   printext256(int32_t xpos, int32_t ypos, int16_t col, int16_t backcol,
//                   const char *name, char fontsize) ATTRIBUTE((nonnull(5)));

//////////// specialized rotatesprite wrappers for (very) often used cases //////////
//static inline void rotatesprite(int32_t sx, int32_t sy, int32_t z, int16_t a, int16_t picnum,
//                                int8_t dashade, char dapalnum, int32_t dastat,
//                                int32_t cx1, int32_t cy1, int32_t cx2, int32_t cy2)
//{
//    rotatesprite_(sx, sy, z, a, picnum, dashade, dapalnum, dastat, 0, cx1, cy1, cx2, cy2);
//}
// Don't clip at all, i.e. the whole screen real estate is available:
function rotatesprite_fs(sx: number, sy: number, z: number, a: number, picnum: number,
                                   dashade: number, dapalnum: number, dastat: number): void
{
    rotatesprite_(sx, sy, z, a, picnum, dashade, dapalnum, dastat, 0, 0,0,xdim-1,ydim-1);
}

//static inline void rotatesprite_win(int32_t sx, int32_t sy, int32_t z, int16_t a, int16_t picnum,
//                                    int8_t dashade, char dapalnum, int32_t dastat)
//{
//    rotatesprite_(sx, sy, z, a, picnum, dashade, dapalnum, dastat, 0, windowx1,windowy1,windowx2,windowy2);
//}

//void bfirst_search_init(int16_t *list, uint8_t *bitmap, int32_t *eltnumptr, int32_t maxnum, int16_t firstelt);
//void bfirst_search_try(int16_t *list, uint8_t *bitmap, int32_t *eltnumptr, int16_t elt);

//int32_t   clipmove(vec3_t *vect, int16_t *sectnum, int32_t xvect, int32_t yvect, int32_t walldist,
//                   int32_t ceildist, int32_t flordist, uint32_t cliptype) ATTRIBUTE((nonnull(1,2)));
//int32_t clipmovex(vec3_t *pos, int16_t *sectnum, int32_t xvect, int32_t yvect,
//                  int32_t walldist, int32_t ceildist, int32_t flordist, uint32_t cliptype,
//                  uint8_t noslidep) ATTRIBUTE((nonnull(1,2)));
//int32_t   clipinsidebox(int32_t x, int32_t y, int16_t wallnum, int32_t walldist);
//int32_t   clipinsideboxline(int32_t x, int32_t y, int32_t x1, int32_t y1,
//                            int32_t x2, int32_t y2, int32_t walldist);
//int32_t   pushmove(vec3_t *vect, int16_t *sectnum, int32_t walldist,
//                   int32_t ceildist, int32_t flordist, uint32_t cliptype) ATTRIBUTE((nonnull(1,2)));
//void   getzrange(const vec3_t *vect, int16_t sectnum, int32_t *ceilz, int32_t *ceilhit, int32_t *florz,
//                 int32_t *florhit, int32_t walldist, uint32_t cliptype) ATTRIBUTE((nonnull(1,3,4,5,6)));
//int32_t   hitscan(const vec3_t *sv, int16_t sectnum, int32_t vx, int32_t vy, int32_t vz,
//                  hitdata_t *hitinfo, uint32_t cliptype) ATTRIBUTE((nonnull(1,6)));
//void   neartag(int32_t xs, int32_t ys, int32_t zs, int16_t sectnum, int16_t ange,
//               int16_t *neartagsector, int16_t *neartagwall, int16_t *neartagsprite,
//               int32_t *neartaghitdist, int32_t neartagrange, uint8_t tagsearch,
//               int32_t (*blacklist_sprite_func)(int32_t)) ATTRIBUTE((nonnull(6,7,8)));
//int32_t   cansee(int32_t x1, int32_t y1, int32_t z1, int16_t sect1,
//                 int32_t x2, int32_t y2, int32_t z2, int16_t sect2);
//void   updatesector(int32_t x, int32_t y, int16_t *sectnum) ATTRIBUTE((nonnull(3)));
//void updatesectorbreadth(int32_t x, int32_t y, int16_t *sectnum) ATTRIBUTE((nonnull(3)));
//void updatesectorexclude(int32_t x, int32_t y, int16_t *sectnum,
//                         const uint8_t *excludesectbitmap) ATTRIBUTE((nonnull(3,4)));
//void   updatesectorz(int32_t x, int32_t y, int32_t z, int16_t *sectnum) ATTRIBUTE((nonnull(4)));
//int32_t   inside(int32_t x, int32_t y, int16_t sectnum);
//void   dragpoint(int16_t pointhighlight, int32_t dax, int32_t day, uint8_t flags);
//void   setfirstwall(int16_t sectnum, int16_t newfirstwall);

//extern const int16_t *chsecptr_onextwall;
//int32_t checksectorpointer(int16_t i, int16_t sectnum);

//void   getmousevalues(int32_t *mousx, int32_t *mousy, int32_t *bstatus) ATTRIBUTE((nonnull(1,2,3)));
//int32_t    krand(void);
//int32_t   ksqrt(uint32_t num);
//int32_t   __fastcall getangle(int32_t xvect, int32_t yvect);

function /*uint32_t */uhypsq(/*int32_t*/ dx: number, /*int32_t */dy: number): number
{
    return uint32(uint32(dx*dx) + uint32(dy*dy));
}

//void   rotatepoint(int32_t xpivot, int32_t ypivot, int32_t x, int32_t y,
//                   int16_t daang, int32_t *x2, int32_t *y2) ATTRIBUTE((nonnull(6,7)));
//int32_t   lastwall(int16_t point);
//int32_t   nextsectorneighborz(int16_t sectnum, int32_t thez, int16_t topbottom, int16_t direction);

//int32_t   getceilzofslopeptr(const sectortype *sec, int32_t dax, int32_t day) ATTRIBUTE((nonnull(1)));
//int32_t   getflorzofslopeptr(const sectortype *sec, int32_t dax, int32_t day) ATTRIBUTE((nonnull(1)));
//void   getzsofslopeptr(const sectortype *sec, int32_t dax, int32_t day,
//                       int32_t *ceilz, int32_t *florz) ATTRIBUTE((nonnull(1,4,5)));

function /*int32_t */getceilzofslope(/*int16_t */sectnum: number, /*int32_t */dax: number, /*int32_t*/ day: number): number
{
    return getceilzofslopeptr(sector[sectnum], dax, day);
}

function /*int32_t*/ getflorzofslope(/*int16_t*/ sectnum: number, /*int32_t*/ dax: number, /*int32_t */day: number): number
{
    return window["getflorzofslopeptr"](sector[sectnum], dax, day);
}

function getzsofslope(/*int16_t */sectnum: number, /*int32_t */dax: number, /*int32_t */day: number, /*int32_t **/ceilz: R<number>, /*int32_t **/florz: R<number>): void
{
    window["getzsofslopeptr"](sector[sectnum], dax, day, ceilz, florz);
}

//// Is <wal> a red wall in a safe fashion, i.e. only if consistency invariant
//// ".nextsector >= 0 iff .nextwall >= 0" holds.
//static inline int32_t redwallp(const walltype *wal)
//{
//    return (wal->nextwall >= 0 && wal->nextsector >= 0);
//}

//void   alignceilslope(int16_t dasect, int32_t x, int32_t y, int32_t z);
//void   alignflorslope(int16_t dasect, int32_t x, int32_t y, int32_t z);
//int32_t   sectorofwall(int16_t theline);
//int32_t   sectorofwall_noquick(int16_t theline);
//int32_t   loopnumofsector(int16_t sectnum, int16_t wallnum);
//void setslope(int32_t sectnum, int32_t cf, int16_t slope);

//int32_t lineintersect(int32_t x1, int32_t y1, int32_t z1, int32_t x2, int32_t y2, int32_t z2, int32_t x3,
//                      int32_t y3, int32_t x4, int32_t y4, int32_t *intx, int32_t *inty, int32_t *intz);

//int32_t rayintersect(int32_t x1, int32_t y1, int32_t z1, int32_t vx, int32_t vy, int32_t vz, int32_t x3,
//                     int32_t y3, int32_t x4, int32_t y4, int32_t *intx, int32_t *inty, int32_t *intz);

//void do_insertsprite_at_headofstat(int16_t spritenum, int16_t statnum);
//int32_t insertspritestat(int16_t statnum);
//void do_insertsprite_at_headofsect(int16_t spritenum, int16_t sectnum);
//void do_deletespritesect(int16_t deleteme);

//int32_t insertsprite(int16_t sectnum, int16_t statnum);
//int32_t deletesprite(int16_t spritenum);

//int32_t   changespritesect(int16_t spritenum, int16_t newsectnum);
//int32_t   changespritestat(int16_t spritenum, int16_t newstatnum);
//int32_t   setsprite(int16_t spritenum, const vec3_t *) ATTRIBUTE((nonnull(2)));
//int32_t   setspritez(int16_t spritenum, const vec3_t *) ATTRIBUTE((nonnull(2)));

//int32_t spriteheightofsptr(const spritetype *spr, int32_t *height, int32_t alsotileyofs);
function /*int32_t */spriteheightofs(/*int16_t */i: number, /*int32_t **/height: R<number>, /*int32_t */alsotileyofs: number):number
{
    return window["spriteheightofsptr"](sprite[i], height, alsotileyofs);
}

//int32_t   screencapture(const char *filename, char inverseit, const char *versionstr) ATTRIBUTE((nonnull(1)));

//int32_t   getclosestcol(int32_t r, int32_t g, int32_t b);

//// PLAG: line utility functions
//typedef struct  s_equation {
//    float       a, b, c;
//}               _equation;
//typedef struct  s_point2d {
//    float       x, y;
//}               _point2d;
//int32_t             wallvisible(int32_t x, int32_t y, int16_t wallnum);

//#define STATUS2DSIZ 144
//#define STATUS2DSIZ2 26

////void   qsetmode640350(void);
////void   qsetmode640480(void);
//void   qsetmodeany(int32_t,int32_t);
//void   clear2dscreen(void);
//void   draw2dgrid(int32_t posxe, int32_t posye, int32_t posze, int16_t cursectnum,
//                  int16_t ange, int32_t zoome, int16_t gride);
//void   draw2dscreen(const vec3_t *pos, int16_t cursectnum,
//                    int16_t ange, int32_t zoome, int16_t gride) ATTRIBUTE((nonnull(1)));
//int32_t   drawline16(int32_t x1, int32_t y1, int32_t x2, int32_t y2, char col);
//void   drawcircle16(int32_t x1, int32_t y1, int32_t r, int32_t eccen, char col);

//int32_t   setrendermode(int32_t renderer);

//#ifdef USE_OPENGL
//void    setrollangle(int32_t rolla);
//#endif

////  pal: pass -1 to invalidate all palettes for the tile, or >=0 for a particular palette
////  how: pass -1 to invalidate all instances of the tile in texture memory, or a bitfield
////         bit 0: opaque or masked (non-translucent) texture, using repeating
////         bit 1: ignored
////         bit 2: 33% translucence, using repeating
////         bit 3: 67% translucence, using repeating
////         bit 4: opaque or masked (non-translucent) texture, using clamping
////         bit 5: ignored
////         bit 6: 33% translucence, using clamping
////         bit 7: 67% translucence, using clamping
////       clamping is for sprites, repeating is for walls
//void invalidatetile(int16_t tilenume, int32_t pal, int32_t how);

//void setpolymost2dview(void);   // sets up GL for 2D drawing

//int32_t polymost_drawtilescreen(int32_t tilex, int32_t tiley, int32_t wallnum, int32_t dimen, int32_t tilezoom,
//                                int32_t usehitile, uint8_t *loadedhitile);
//void polymost_glreset(void);
//void polymost_precache(int32_t dapicnum, int32_t dapalnum, int32_t datype);

//#ifdef USE_OPENGL
//extern int32_t glanisotropy;
//extern int32_t glusetexcompr;
//extern int32_t gltexfiltermode;
//extern int32_t glredbluemode;
//extern int32_t glusetexcache, glusememcache;
//extern int32_t glmultisample, glnvmultisamplehint;
//extern int32_t glwidescreen, glprojectionhacks;
//extern int32_t gltexmaxsize;
//void gltexapplyprops (void);
//void texcache_invalidate(void);

//extern int32_t r_detailmapping;
//extern int32_t r_glowmapping;
//extern int32_t r_vertexarrays;
//extern int32_t r_vbos;
//extern int32_t r_vbocount;
//extern int32_t r_animsmoothing;
//extern int32_t r_parallaxskyclamping;
//extern int32_t r_parallaxskypanning;
//extern int32_t r_fullbrights;
//extern int32_t r_downsize;
//extern int32_t r_downsizevar;
//extern int32_t mdtims, omdtims;
//extern int32_t glrendmode;
//#endif

//void hicinit(void);
//// effect bitset: 1 = greyscale, 2 = invert
//void hicsetpalettetint(int32_t palnum, char r, char g, char b, char effect);
//// flags bitset: 1 = don't compress
//int32_t hicsetsubsttex(int32_t picnum, int32_t palnum, const char *filen, float alphacut,
//                       float xscale, float yscale, float specpower, float specfactor, char flags);
//int32_t hicsetskybox(int32_t picnum, int32_t palnum, char *faces[6]);
//int32_t hicclearsubst(int32_t picnum, int32_t palnum);

//int32_t Ptile2tile(int32_t tile, int32_t pallet) ATTRIBUTE((pure));
//int32_t md_loadmodel(const char *fn);
//int32_t md_setmisc(int32_t modelid, float scale, int32_t shadeoff, float zadd, float yoffset, int32_t flags);
//// int32_t md_tilehasmodel(int32_t tilenume, int32_t pal);

//extern const char *G_DefaultDefFile(void);
//extern const char *G_DefFile(void);
//extern char *g_defNamePtr;

//extern char **g_defModules;
//extern int32_t g_defModulesNum;

//#ifdef HAVE_CLIPSHAPE_FEATURE
//extern char **g_clipMapFiles;
//extern int32_t g_clipMapFilesNum;
//#endif

//#ifdef USE_OPENGL
class tile2model_t
{
    // maps build tiles to particular animation frames of a model
    modelid: number;                                                              //int32_t
    skinnum: number;                                                              //int32_t
    framenum: number;   // calculate the number from the name when declaring      //int32_t
    smoothduration: number;                                                       //float  
    next: number;                                                                 //int32_t
    pal: number;                                                                    // char   

    constructor() {
        this.modelid= 0;                                                            
        this.skinnum= 0;                                                            
        this.framenum= 0;   
        this.smoothduration= 0;                                                     
        this.next= 0;                                                               
        this.pal= 0;      
    }
} //tile2model_t;

var EXTRATILES = (MAXTILES/8)|0;

var mdinited: number; //EXTERN int32_t 
var tile2model = newStructArray(tile2model_t, MAXTILES+EXTRATILES);

function md_tilehasmodel(tilenume: number,pal: number): number
{
    if (!mdinited) return -1;
    return tile2model[Ptile2tile(tilenume,pal)].modelid;
}
//#endif  // defined USE_OPENGL

//int32_t md_defineframe(int32_t modelid, const char *framename, int32_t tilenume,
//                       int32_t skinnum, float smoothduration, int32_t pal);
//int32_t md_defineanimation(int32_t modelid, const char *framestart, const char *frameend,
//                           int32_t fps, int32_t flags);
//int32_t md_defineskin(int32_t modelid, const char *skinfn, int32_t palnum, int32_t skinnum,
//                      int32_t surfnum, float param, float specpower, float specfactor);
//int32_t md_definehud (int32_t modelid, int32_t tilex, double xadd, double yadd, double zadd,
//                      double angadd, int32_t flags, int32_t fov);
//int32_t md_undefinetile(int32_t tile);
//int32_t md_undefinemodel(int32_t modelid);

//int32_t loaddefinitionsfile(const char *fn);

//// if loadboard() fails with -2 return, try loadoldboard(). if it fails with
//// -2, board is dodgy
//int32_t loadoldboard(const char *filename, char fromwhere, vec3_t *dapos, int16_t *daang, int16_t *dacursectnum);


//// Hash functions

class hashitem_t { // size is 12/24 bits.
    str: string;
    key: number;
    next: hashitem_t;

    constructor() {
        this.str = "";
        this.key = 0;
        this.next = null;
    }
}

class hashtable_t {
    size: number; //int32_t
    items: hashitem_t[];

    constructor(size: number, items: hashitem_t[]) {
        this.size = size;
        this.items = items;
    }
}

//void hash_init(hashtable_t *t);
//void hash_free(hashtable_t *t);
//int32_t  hash_findcase(const hashtable_t *t, const char *s);
//int32_t  hash_find(const hashtable_t *t, const char *s);
//void hash_add(hashtable_t *t, const char *s, int32_t key, int32_t replace);
//void hash_delete(hashtable_t *t, const char *s);

//#ifdef POLYMER
//# include "polymer.h"
//#else
//# ifdef USE_OPENGL
//#  include "polymost.h"
//# endif
//#endif

//extern void initialize_engine_globals(void);

//static inline void push_nofog(void)
//{
//#ifdef USE_OPENGL
//    if (getrendermode() >= REND_POLYMOST)
//    {
//        bglPushAttrib(GL_ENABLE_BIT);
//        bglDisable(GL_FOG);
//    }
//#endif
//}

//static inline void pop_nofog(void)
//{
//#ifdef USE_OPENGL
//    if (getrendermode() >= REND_POLYMOST)
//        bglPopAttrib();
//#endif
//}


//#ifdef EXTERNC
//}
//#endif

//#endif // __build_h__

/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/todo.ts" />
/// <reference path="../../utils/types.ts" />

/// <reference path="../../build/headers/prlights.h.ts" />

/// <reference path="../../eduke32/headers/function.h.ts" />
/// <reference path="../../eduke32/headers/global.h.ts" />
/// <reference path="../../eduke32/headers/player.h.ts" />
/// <reference path="../../eduke32/headers/premap.h.ts" />

//-------------------------------------------------------------------------
/*
Copyright (C) 2010 EDuke32 developers and contributors

This file is part of EDuke32.

EDuke32 is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License version 2
as published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
*/
//-------------------------------------------------------------------------

//#ifndef __actors_h__
//#define __actors_h__

//#include "player.h"

 var MAXSLEEPDIST      = 16384;
 var SLEEPTIME         = 1536;
 var ZOFFSET           = (1<<8);

//#define ACTOR_MAXFALLINGZVEL 6144
//#define ACTOR_ONWATER_ADDZ (24<<8)

//// KEEPINSYNC lunatic/con_lang.lua
var STAT_DEFAULT       = 0;
var STAT_ACTOR         = 1;
var STAT_ZOMBIEACTOR   = 2;
var STAT_EFFECTOR      = 3;
var STAT_PROJECTILE    = 4;
var STAT_MISC          = 5;
var STAT_STANDABLE     = 6;
var STAT_LOCATOR       = 7;
var STAT_ACTIVATOR     = 8;
var STAT_TRANSPORT     = 9;
var STAT_PLAYER        = 10;
var STAT_FX            = 11;
var STAT_FALLER        = 12;
var STAT_DUMMYPLAYER   = 13;
var STAT_LIGHT         = 14;
var STAT_NETALLOC      = MAXSTATUS-1;


//// Defines the motion characteristics of an actor
//enum amoveflags_t {
var face_player         = 1,
    geth                = 2,
    getv                = 4,
    random_angle        = 8,
    face_player_slow    = 16,
    spin                = 32,
    face_player_smart   = 64,
    fleeenemy           = 128,
    jumptoplayer        = 257,
    seekplayer          = 512,
    furthestdir         = 1024,
    dodgebullet         = 4096;
//};

//// Defines for 'useractor' keyword
//enum uactortypes_t {
//    notenemy,
//    enemy,
//    enemystayput
//};

//// These macros are there to give names to the t_data[]/T*/vm.g_t[] indices
//// when used with actors. Greppability of source code is certainly a virtue.
function AC_COUNT(t:Int32Array):number {return t[0]; }  /* the actor's count */
///* The ID of the actor's current move. In C-CON, the bytecode offset to the
// * move composite: */
function AC_MOVE_ID(t: Int32Array): number {return (t)[1];}
function AC_MOVE_ID_SET(t: Int32Array, v: number): void { (t)[1] = v;}
//#define AC_ACTION_COUNT(t) ((t)[2])  /* the actor's action count */
function AC_CURFRAME(t: Int32Array) { return (t)[3]; }  /* the actor's current frame offset */
///* The ID of the actor's current action. In C-CON, the bytecode offset to the
// * action composite: */
function AC_ACTION_ID(t: Int32Array): number {return (t)[4];}
function AC_ACTION_ID_SET(t: Int32Array, v: number): void {(t)[4] = v;}
//#define AC_AI_ID(t) ((t)[5])  /* the ID of the actor's current ai */

//#ifdef LUNATIC
//struct action {
//    // These members MUST be in this exact order because FFI cdata of this type
//    // can be initialized by passing a table with numeric indices (con.action).
//    int16_t startframe, numframes;
//    int16_t viewtype, incval, delay;
//};

//struct move {
//    // These members MUST be in this exact order.
//    int16_t hvel, vvel;
//};

//#pragma pack(push,1)
//typedef struct { int32_t id; struct move mv; } con_move_t;
//typedef struct { int32_t id; struct action ac; } con_action_t;
//#pragma pack(pop)
//#endif

class projectile_t {
    public static size = 64;

    workslike:number; cstat:number; // 8b                      //    int32_t    
    hitradius:number; range:number; flashcolor:number; // 12b         //    int32_t    
    spawns:number; sound:number; isound:number; vel:number; // 8b            //    int16_t    
    decal:number; trail:number; tnum:number; drop:number; // 8b              //    int16_t    
    offset:number; bounces:number; bsound:number; // 6b               //    int16_t    
    toffset:number; // 2b                               //    int16_t    
    extra:number; extra_rand:number; // 4b                     //    int16_t    
    sxrepeat:number; syrepeat:number; txrepeat:number; tyrepeat:number; // 4b//    int8_t     
    shade:number; xrepeat:number; yrepeat:number; pal:number; // 4b          //    int8_t     
    movecnt:number; // 1b                               //    int8_t     
    clipdist:number; // 1b                              //    uint8_t    
    filler:Int8Array; // 2b                             //    int8_t     
    userdata:number; // 4b                              //    int32_t    

    constructor() {
        this.workslike=0;this. cstat=0; // 8b                      //    int32_t    
        this.hitradius=0;this. range=0;this. flashcolor=0; // 12b         //    int32_t    
        this.spawns=0;this. sound=0;this. isound=0;this. vel=0; // 8b            //    int16_t    
        this.decal=0;this. trail=0;this. tnum=0;this. drop=0; // 8b              //    int16_t    
        this.offset=0;this. bounces=0;this. bsound=0; // 6b               //    int16_t    
        this.toffset=0; // 2b                               //    int16_t    
        this.extra=0;this. extra_rand=0; // 4b                     //    int16_t    
        this.sxrepeat=0;this. syrepeat=0;this. txrepeat=0;this. tyrepeat=0; // 4b//    int8_t     
        this.shade=0;this. xrepeat=0;this. yrepeat=0;this. pal=0; // 4b          //    int8_t     
        this.movecnt=0; // 1b                               //    int8_t     
        this.clipdist=0; // 1b                              //    uint8_t    
        this.filler = new Int8Array(2); // 2b                             //    int8_t     
        this.userdata = 0; // 4b                              //    int32_t    
    }

    public copyTo(p: projectile_t): void {
        p.workslike=this.workslike; p.cstat=this.cstat; // 8b                      //    int32_t    
        p.hitradius=this.hitradius; p.range=this.range; p.flashcolor=this.flashcolor; // 12b         //    int32_t    
        p.spawns=this.spawns;p. sound=this.sound;p. isound=this.isound;p.vel=this.vel; // 8b            //    int16_t    
        p.decal=this.decal;p. trail=this.trail;p. tnum=this.tnum;p. drop=this.drop; // 8b              //    int16_t    
        p.offset=this.offset;p. bounces=this.bounces;p. bsound=this.bsound; // 6b               //    int16_t    
        p.toffset=this.toffset; // 2b                               //    int16_t    
        p.extra=this.extra;p. extra_rand=this.extra_rand; // 4b                     //    int16_t    
        p.sxrepeat=this.sxrepeat;p.syrepeat=this.syrepeat;p.txrepeat=this.txrepeat;p.tyrepeat=this.tyrepeat; // 4b//    int8_t     
        p.shade=this.shade;p. xrepeat=this.xrepeat;p. yrepeat=this.yrepeat;p. pal=this.pal; // 4b          //    int8_t     
        p.movecnt=this.movecnt; // 1b                               //    int8_t     
        p.clipdist=this.clipdist; // 1b                              //    uint8_t    
        p.filler = new Int8Array([this.filler[0], this.filler[1]]); // 2b                             //    int8_t     
        p.userdata = this.userdata; // 4b                              //    int32_t    
    }
}

//// Select an actor's actiontics and movflags locations depending on
//// whether we compile the Lunatic build.
//// <spr>: sprite pointer
//// <a>: actor_t pointer
//#ifdef LUNATIC
//# define AC_ACTIONTICS(spr, a) ((a).actiontics)
//# define AC_MOVFLAGS(spr, a) ((a).movflags)
//#else
function AC_ACTIONTICS(spr: spritetype, a:actor_t) {return (spr).lotag;}
function AC_MOVFLAGS(spr: spritetype, a:actor_t) {return (spr).hitag;}
//#endif

//#pragma pack(push,1)
//// (+ 40 16 16 4 8 6 8 6 4 20)
class actor_t {
    t_data: Int32Array;//[10];  // 40b sometimes used to hold offsets to con code //    int32_t t_

//#ifdef LUNATIC
//    // total: 16b
//    struct move mv;
//    struct action ac;
//    // Gets incremented by TICSPERFRAME on each A_Execute() call:
//    uint16_t actiontics;
//#endif

    flags: number; //4b                                 //int32_t 
    bpos: vec3_t; //12b                                 //vec3_t  
    floorz: number;ceilingz: number;lastvx: number;lastvy: number; //16b        //int32_t 
    lasttransport: number; //4b                         //int32_t 
                                                //
    picnum: number;ang: number;extra: number;owner: number; //8b                //int16_t 
    movflag: number;tempang: number;timetosleep: number; //6b           //int16_t 
                                                //
    actorstayput: number; dispicnum: number;                    //int16_t 
//#if !defined LUNATIC
//    // NOTE: shootzvel is not used any more.
    shootzvel_: number;//    int16_t 
//#else
//    // Movement flags, sprite[i].hitag in C-CON:
//    uint16_t movflags;
//#endif
    cgg: number; //    int16_t 

    lightId:number; lightcount:number; lightmaxrange: number; //6b//    int16_t 
//#ifdef POLYMER
    lightptr: _prlight; //4b/8b
//#else
//    void *lightptr;
//#endif

//// pad struct to 128 bytes
//#if !defined UINTPTR_MAX
//# error Need UINTPTR_MAX define to select between 32- and 64-bit structs
//#endif
//#if UINTPTR_MAX == 0xffffffff
//    /* 32-bit */
//# if !defined LUNATIC
//    int8_t filler[20];
//# else
//    int8_t filler[4];
//# endif
//#else
//    /* 64-bit */
//# if !defined LUNATIC
//    int8_t filler[16];
//# else
//    /* no padding */
//#endif
//#endif

    constructor() {
        this.init();
    }

    init() {
        this.t_data = new Int32Array(10);

        this.flags = 0; //4b                                 //int32_t 
        this.bpos = new vec3_t(); //12b                                 //vec3_t  
        this.floorz = 0;this.ceilingz = 0;this.lastvx = 0;this.lastvy = 0; //16b        //int32_t 
        this.lasttransport=0; //4b                         //int32_t 
   
        this.picnum = 0;this.ang = 0;this.extra = 0;this.owner = 0; //8b                //int16_t 
        this.movflag = 0;this.tempang = 0;this.timetosleep = 0; //6b           //int16_t 
 
        this.actorstayput = 0;this. dispicnum = 0;                    //int16_t 

        this.shootzvel_ = 0;

        this.cgg = 0;

        this.lightptr = null;

        this.lightId=0; this.lightcount=0; this.lightmaxrange=0;

        //todo: light
    }
}

//// this struct needs to match the beginning of actor_t above
//typedef struct {
//    int32_t t_data[10];  // 40b sometimes used to hold offsets to con code

//#ifdef LUNATIC
//    struct move mv;
//    struct action ac;
//    uint16_t actiontics;
//#endif

//    int32_t flags; //4b
//    vec3_t bpos; //12b
//    int32_t floorz,ceilingz,lastvx,lastvy; //16b
//    int32_t lasttransport; //4b

//    int16_t picnum,ang,extra,owner; //8b
//    int16_t movflag,tempang,timetosleep; // 6b

//    int16_t actorstayput, dispicnum;
//#if !defined LUNATIC
//    int16_t shootzvel_;
//#else
//    uint16_t movflags;
//#endif
//    int16_t cgg;

//    spritetype sprite;
//    int16_t netIndex;

//} netactor_t;
//#pragma pack(pop)

class tiledata_t {
    public static size = 80;
//#if !defined LUNATIC
    execPtr: number; //    intptr_t *// pointer to CON script for this tile, formerly actorscrptr
    loadPtr: number; //    intptr_t *// pointer to load time CON script, formerly actorLoadEventScrPtr or something
//#endif
    flags: number;//    uint32_t     // formerly SpriteFlags, ActorType

    cacherange: number;//    int32_t ; // formerly SpriteCache

//    // todo: make this a pointer and allocate at runtime
    defproj:projectile_t;


    constructor() {
        this.execPtr=0;
        this.loadPtr=0;
        this.flags=0;
        this.cacherange=0;
        this.defproj=new projectile_t();
    }
} //tiledata_t;

//// KEEPINSYNC lunatic/con_lang.lua
//enum sflags_t {
var SPRITE_SHADOW           = 0x00000001,
     SPRITE_NVG              = 0x00000002,
     SPRITE_NOSHADE          = 0x00000004,
     SPRITE_PROJECTILE       = 0x00000008,
     SPRITE_DECAL            = 0x00000010,
     SPRITE_BADGUY           = 0x00000020,
     SPRITE_NOPAL            = 0x00000040,
     SPRITE_NOEVENTCODE      = 0x00000080,
     SPRITE_NOLIGHT          = 0x00000100,
     SPRITE_USEACTIVATOR     = 0x00000200,
     SPRITE_NULL             = 0x00000400, // null sprite in multiplayer
     SPRITE_NOCLIP           = 0x00000800, // clipmove it with cliptype 0
     SPRITE_NOFLOORSHADOW    = 0x00001000, // for temp. internal use, per-tile flag not checked
     SPRITE_SMOOTHMOVE       = 0x00002000,
     SPRITE_NOTELEPORT       = 0x00004000,
     SPRITE_BADGUYSTAYPUT    = 0x00008000,
     SPRITE_CACHE            = 0x00010000,
     // rotation-fixed wrt a pivot point to prevent position diverging due to
     // roundoff error accumulation:
     SPRITE_ROTFIXED         = 0x00020000,
     SPRITE_HARDCODED_BADGUY = 0x00040000,
     SPRITE_DIDNOSE7WATER    = 0x00080000; // used temporarily
//};

//// Custom projectiles "workslike" flags.
//// XXX: Currently not predefined from CON.
//enum pflags_t {
var PROJECTILE_HITSCAN             = 0x00000001,
    PROJECTILE_RPG                 = 0x00000002,
    PROJECTILE_BOUNCESOFFWALLS     = 0x00000004,
    PROJECTILE_BOUNCESOFFMIRRORS   = 0x00000008,
    PROJECTILE_KNEE                = 0x00000010,
    PROJECTILE_WATERBUBBLES        = 0x00000020,
    PROJECTILE_TIMED               = 0x00000040,
    PROJECTILE_BOUNCESOFFSPRITES   = 0x00000080,
    PROJECTILE_SPIT                = 0x00000100,
    PROJECTILE_COOLEXPLOSION1      = 0x00000200,
    PROJECTILE_BLOOD               = 0x00000400,
    PROJECTILE_LOSESVELOCITY       = 0x00000800,
    PROJECTILE_NOAIM               = 0x00001000,
    PROJECTILE_RANDDECALSIZE       = 0x00002000,
    PROJECTILE_EXPLODEONTIMER      = 0x00004000,
    PROJECTILE_RPG_IMPACT          = 0x00008000,
    PROJECTILE_RADIUS_PICNUM       = 0x00010000,
    PROJECTILE_ACCURATE_AUTOAIM    = 0x00020000,
    PROJECTILE_FORCEIMPACT         = 0x00040000,
    PROJECTILE_REALCLIPDIST        = 0x00080000,
    PROJECTILE_ACCURATE            = 0x00100000;
//};

var g_tile: tiledata_t[] = newStructArray(tiledata_t, MAXTILES);
var actor: actor_t[] = newStructArray<actor_t>(actor_t, MAXSPRITES);//extern actor_t          
//extern int32_t          block_deletesprite;
//extern int32_t          g_noEnemies;
//extern int32_t          otherp;
//extern int32_t          ticrandomseed;
var g_parsingActorPtr: number; //extern intptr_t         *
//extern projectile_t     SpriteProjectile[MAXSPRITES];



//void                A_AddToDeleteQueue(int32_t i);
//int32_t             A_CheckEnemyTile(int32_t pn);
//int32_t             A_CheckSwitchTile(int32_t i);
//void                A_DeleteSprite(int32_t s);
//void                A_DoGuts(int32_t sp,int32_t gtype,int32_t n);
//void                A_DoGutsDir(int32_t sp,int32_t gtype,int32_t n);
//int32_t             A_IncurDamage(int32_t sn);
//void                A_MoveCyclers(void);
//void                A_MoveDummyPlayers(void);
//int32_t             A_MoveSprite(int32_t spritenum,const vec3_t *change,uint32_t cliptype);
//void                A_PlayAlertSound(int32_t i);
//void                A_RadiusDamage(int32_t i,int32_t r,int32_t hp1,int32_t hp2,int32_t hp3,int32_t hp4);
//void                A_SpawnMultiple(int32_t sp,int32_t pic,int32_t n);

//void                G_AddGameLight(int32_t radius,int32_t srcsprite,int32_t zoffset,int32_t range,int32_t color,int32_t priority);
//void                G_ClearCameraView(DukePlayer_t *ps);
//void                G_DoInterpolations(int32_t smoothratio);
//void                G_MoveWorld(void);
//int32_t             G_SetInterpolation(int32_t *posptr);
//void                G_StopInterpolation(int32_t *posptr);

//// PK 20110701: changed input argument: int32_t i (== sprite, whose sectnum...) -. sectnum directly
//void                Sect_ClearInterpolation(int32_t sectnum);
//void                Sect_SetInterpolation(int32_t sectnum);

//#include "actors_inline.h"

//#endif

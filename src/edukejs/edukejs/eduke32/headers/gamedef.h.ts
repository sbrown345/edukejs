/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/todo.ts" />
/// <reference path="../../utils/types.ts" />

/// <reference path="../../eduke32/headers/function.h.ts" />
/// <reference path="../../eduke32/headers/global.h.ts" />
/// <reference path="../../eduke32/headers/player.h.ts" />
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

//#ifndef _gamedef_h_
//#define _gamedef_h_

//#include "build.h"  // hashtable_t
//#include "common.h"  // tokenlist

var MAXGAMEEVENTS = 128;
var LABEL_HASPARM2 = 1;
var LABEL_ISSTRING = 2;

var MAXCHEATLEN =   20;
//#define NUMCHEATCODES           (int32_t)(sizeof(CheatStrings)/sizeof(CheatStrings[0]))

//extern hashtable_t h_gamefuncs;

//#if !defined LUNATIC
//extern hashtable_t h_gamevars;
//extern hashtable_t h_arrays;
//extern hashtable_t h_labels;

//extern int32_t g_iReturnVarID;      // var ID of "RETURN"
//extern int32_t g_iWeaponVarID;      // var ID of "WEAPON"
//extern int32_t g_iWorksLikeVarID;   // var ID of "WORKSLIKE"
//extern int32_t g_iZRangeVarID;      // var ID of "ZRANGE"
//extern int32_t g_iAngRangeVarID;    // var ID of "ANGRANGE"
//extern int32_t g_iAimAngleVarID;    // var ID of "AUTOAIMANGLE"
//extern int32_t g_iLoTagID;          // var ID of "LOTAG"
//extern int32_t g_iHiTagID;          // var ID of "HITAG"
//extern int32_t g_iTextureID;        // var ID of "TEXTURE"
//extern int32_t g_iThisActorID;      // var ID of "THISACTOR"
//extern int32_t g_iSpriteVarID;
//extern int32_t g_iSectorVarID;
//extern int32_t g_iWallVarID;
//extern int32_t g_iPlayerVarID;
//extern int32_t g_iActorVarID;

//extern intptr_t *apScriptGameEvent[MAXGAMEEVENTS];
//#endif

//extern int32_t otherp;
//extern int32_t lastvisinc;
//extern char CheatStrings[][MAXCHEATLEN];
//extern char g_szScriptFileName[BMAX_PATH];
//extern int32_t g_totalLines,g_lineNumber;
//extern int32_t g_numCompilerErrors,g_numCompilerWarnings,g_numQuoteRedefinitions;
//extern int32_t g_scriptVersion;
//extern uint32_t g_scriptDateVersion;  // YYYYMMDD
//extern char g_szBuf[1024];

//extern const char *EventNames[];  // MAXEVENTS

//#if !defined LUNATIC
//var g_scriptPtr: number; //extern intptr_t *

class memberlabel_t 
{
    name : string;   //const char *
    lId : number;        //int32_t 
    flags : number;      //int32_t 
    maxParm2 : number;   //int32_t 

    constructor(name: string, lId: number, flags: number, maxParm2: number) {
        this.name = name;
        this.lId = lId;
        this.flags = flags;
        this.maxParm2 = maxParm2;
    }
};

//extern const memberlabel_t SectorLabels[];
//extern const memberlabel_t WallLabels[];
//extern const memberlabel_t ActorLabels[];
//extern const memberlabel_t PlayerLabels[];
//extern const memberlabel_t ProjectileLabels[];
//extern const memberlabel_t userdeflabels[];
//extern const memberlabel_t InputLabels[];
//extern const memberlabel_t TsprLabels[];
//#endif

//int32_t C_AllocQuote(int32_t qnum);
//void C_InitQuotes(void);
//void C_InitProjectiles(void);

class vmstate_t{
    g_i: number; g_p: number; g_x: number;      //int32_t     
    g_t: Int32Array;               //int32_t *    
    g_sp: spritetype;                  //spritetype *
    g_flags: number;             //int32_t     
    constructor(g_i = 0, g_p = 0, g_x = 0, g_t: Int32Array = null, g_sp:spritetype = null, g_flags = 0) {
        this.g_i = g_i; this.g_p = g_p; this.g_x = g_x;
        this.g_t = g_t;
        this.g_sp = g_sp;
        this.g_flags = g_flags;
    }
    copyFrom(v: vmstate_t) {
        this.g_i = v.g_i; this.g_p = v.g_p; this.g_x = v.g_x;
        this.g_t = v.g_t;
        this.g_sp = v.g_sp;
        this.g_flags = v.g_flags;
    }
}

//extern vmstate_t vm;

//#if !defined LUNATIC
//void C_ReportError(int32_t iError);
//void C_Compile(const char *filenam);

//var g_errorLineNum: number;//extern int32_t 
//extern int32_t g_tw;
//extern const char *keyw[];

//// KEEPINSYNC lunatic/con_lang.lua
//enum SystemString_t {
var STR_MAPNAME=0,
    STR_MAPFILENAME=1,
    STR_PLAYERNAME=2,
    STR_VERSION=3,
    STR_GAMETYPE=4,
    STR_VOLUMENAME=5;
//};

//enum ScriptError_t
//{
var ERROR_CLOSEBRACKET = 0,
   ERROR_EVENTONLY = 1,
   ERROR_EXCEEDSMAXTILES = 2,
   ERROR_EXPECTEDKEYWORD = 3,
   ERROR_FOUNDWITHIN = 4,
   ERROR_ISAKEYWORD = 5,
   ERROR_NOENDSWITCH = 6,
   ERROR_NOTAGAMEDEF = 7,
   ERROR_NOTAGAMEVAR = 8,
   ERROR_NOTAGAMEARRAY = 9,
   ERROR_GAMEARRAYBNC = 10,
   ERROR_GAMEARRAYBNO = 11,
   ERROR_INVALIDARRAYWRITE = 12,
   ERROR_OPENBRACKET = 13,
   ERROR_PARAMUNDEFINED = 14,
   ERROR_SYMBOLNOTRECOGNIZED = 15,
   ERROR_SYNTAXERROR = 16,
   ERROR_VARREADONLY = 17,
   ERROR_ARRAYREADONLY = 18,
   ERROR_VARTYPEMISMATCH = 19,
   WARNING_BADGAMEVAR = 20,
   WARNING_DUPLICATECASE = 21,
   WARNING_DUPLICATEDEFINITION = 22,
   WARNING_EVENTSYNC = 23,
   WARNING_LABELSONLY = 24,
   WARNING_NAMEMATCHESVAR = 25;
//};

//enum PlayerLabel_t
//{
var PLAYER_ZOOM=0,
    PLAYER_EXITX=1,
    PLAYER_EXITY=2,
    PLAYER_LOOGIEX=3,
    PLAYER_LOOGIEY=4,
    PLAYER_NUMLOOGS=5,
    PLAYER_LOOGCNT=6,
    PLAYER_POSX=7,
    PLAYER_POSY=8,
    PLAYER_POSZ=9,
    PLAYER_HORIZ=10,
    PLAYER_OHORIZ=11,
    PLAYER_OHORIZOFF=12,
    PLAYER_INVDISPTIME=13,
    PLAYER_BOBPOSX=14,
    PLAYER_BOBPOSY=15,
    PLAYER_OPOSX=16,
    PLAYER_OPOSY=17,
    PLAYER_OPOSZ=18,
    PLAYER_PYOFF=19,
    PLAYER_OPYOFF=20,
    PLAYER_POSXV=21,
    PLAYER_POSYV=22,
    PLAYER_POSZV=23,
    PLAYER_LAST_PISSED_TIME=24,
    PLAYER_TRUEFZ=25,
    PLAYER_TRUECZ=26,
    PLAYER_PLAYER_PAR=27,
    PLAYER_VISIBILITY=28,
    PLAYER_BOBCOUNTER=29,
    PLAYER_WEAPON_SWAY=30,
    PLAYER_PALS_TIME=31,
    PLAYER_RANDOMFLAMEX=32,
    PLAYER_CRACK_TIME=33,
    PLAYER_AIM_MODE=34,
    PLAYER_ANG=35,
    PLAYER_OANG=36,
    PLAYER_ANGVEL=37,
    PLAYER_CURSECTNUM=38,
    PLAYER_LOOK_ANG=39,
    PLAYER_LAST_EXTRA=40,
    PLAYER_SUBWEAPON=41,
    PLAYER_AMMO_AMOUNT=42,
    PLAYER_WACKEDBYACTOR=43,
    PLAYER_FRAG=44,
    PLAYER_FRAGGEDSELF=45,
    PLAYER_CURR_WEAPON=46,
    PLAYER_LAST_WEAPON=47,
    PLAYER_TIPINCS=48,
    PLAYER_HORIZOFF=49,
    PLAYER_WANTWEAPONFIRE=50,
    PLAYER_HOLODUKE_AMOUNT=51,
    PLAYER_NEWOWNER=52,
    PLAYER_HURT_DELAY=53,
    PLAYER_HBOMB_HOLD_DELAY=54,
    PLAYER_JUMPING_COUNTER=55,
    PLAYER_AIRLEFT=56,
    PLAYER_KNEE_INCS=57,
    PLAYER_ACCESS_INCS=58,
    PLAYER_FTA=59,
    PLAYER_FTQ=60,
    PLAYER_ACCESS_WALLNUM=61,
    PLAYER_ACCESS_SPRITENUM=62,
    PLAYER_KICKBACK_PIC=63,
    PLAYER_GOT_ACCESS=64,
    PLAYER_WEAPON_ANG=65,
    PLAYER_FIRSTAID_AMOUNT=66,
    PLAYER_SOMETHINGONPLAYER=67,
    PLAYER_ON_CRANE=68,
    PLAYER_I=69,
    PLAYER_ONE_PARALLAX_SECTNUM=70,
    PLAYER_OVER_SHOULDER_ON=71,
    PLAYER_RANDOM_CLUB_FRAME=72,
    PLAYER_FIST_INCS=73,
    PLAYER_ONE_EIGHTY_COUNT=74,
    PLAYER_CHEAT_PHASE=75,
    PLAYER_DUMMYPLAYERSPRITE=76,
    PLAYER_EXTRA_EXTRA8=77,
    PLAYER_QUICK_KICK=78,
    PLAYER_HEAT_AMOUNT=79,
    PLAYER_ACTORSQU=80,
    PLAYER_TIMEBEFOREEXIT=81,
    PLAYER_CUSTOMEXITSOUND=82,
    PLAYER_WEAPRECS=83,
    PLAYER_WEAPRECCNT=84,
    PLAYER_INTERFACE_TOGGLE_FLAG=85,
    PLAYER_ROTSCRNANG=86,
    PLAYER_DEAD_FLAG=87,
    PLAYER_SHOW_EMPTY_WEAPON=88,
    PLAYER_SCUBA_AMOUNT=89,
    PLAYER_JETPACK_AMOUNT=90,
    PLAYER_STEROIDS_AMOUNT=91,
    PLAYER_SHIELD_AMOUNT=92,
    PLAYER_HOLODUKE_ON=93,
    PLAYER_PYCOUNT=94,
    PLAYER_WEAPON_POS=95,
    PLAYER_FRAG_PS=96,
    PLAYER_TRANSPORTER_HOLD=97,
    PLAYER_LAST_FULL_WEAPON=98,
    PLAYER_FOOTPRINTSHADE=99,
    PLAYER_BOOT_AMOUNT=100,
    PLAYER_SCREAM_VOICE=101,
    PLAYER_GM=102,
    PLAYER_ON_WARPING_SECTOR=103,
    PLAYER_FOOTPRINTCOUNT=104,
    PLAYER_HBOMB_ON=105,
    PLAYER_JUMPING_TOGGLE=106,
    PLAYER_RAPID_FIRE_HOLD=107,
    PLAYER_ON_GROUND=108,
    PLAYER_NAME=109,
    PLAYER_INVEN_ICON=110,
    PLAYER_BUTTONPALETTE=111,
    PLAYER_JETPACK_ON=112,
    PLAYER_SPRITEBRIDGE=113,
    PLAYER_LASTRANDOMSPOT=114,
    PLAYER_SCUBA_ON=115,
    PLAYER_FOOTPRINTPAL=116,
    PLAYER_HEAT_ON=117,
    PLAYER_HOLSTER_WEAPON=118,
    PLAYER_FALLING_COUNTER=119,
    PLAYER_GOTWEAPON=120,
    PLAYER_REFRESH_INVENTORY=121,
    PLAYER_PALETTE=122,
    PLAYER_TOGGLE_KEY_FLAG=123,
    PLAYER_KNUCKLE_INCS=124,
    PLAYER_WALKING_SND_TOGGLE=125,
    PLAYER_PALOOKUP=126,
    PLAYER_HARD_LANDING=127,
    PLAYER_MAX_SECRET_ROOMS=128,
    PLAYER_SECRET_ROOMS=129,
    PLAYER_PALS=130,
    PLAYER_MAX_ACTORS_KILLED=131,
    PLAYER_ACTORS_KILLED=132,
    PLAYER_RETURN_TO_CENTER=133,
    PLAYER_RUNSPEED=134,
    PLAYER_SBS=135,
    PLAYER_RELOADING=136,
    PLAYER_AUTO_AIM=137,
    PLAYER_MOVEMENT_LOCK=138,
    PLAYER_SOUND_PITCH=139,
    PLAYER_WEAPONSWITCH=140,
    PLAYER_TEAM=141,
    PLAYER_MAX_PLAYER_HEALTH=142,
    PLAYER_MAX_SHIELD_AMOUNT=143,
    PLAYER_MAX_AMMO_AMOUNT=144,
    PLAYER_LAST_QUICK_KICK=145,
    PLAYER_AUTOSTEP=146,
    PLAYER_AUTOSTEP_SBW=147,
    PLAYER_END=148;

//};

//enum UserdefsLabel_t
//{
var USERDEFS_GOD=0,
    USERDEFS_WARP_ON=1,
    USERDEFS_CASHMAN=2,
    USERDEFS_EOG=3,
    USERDEFS_SHOWALLMAP=4,
    USERDEFS_SHOW_HELP=5,
    USERDEFS_SCROLLMODE=6,
    USERDEFS_CLIPPING=7,
    USERDEFS_USER_NAME=8,
    USERDEFS_RIDECULE=9,
    USERDEFS_SAVEGAME=10,
    USERDEFS_PWLOCKOUT=11,
    USERDEFS_RTSNAME=12,
    USERDEFS_OVERHEAD_ON=13,
    USERDEFS_LAST_OVERHEAD=14,
    USERDEFS_SHOWWEAPONS=15,
    USERDEFS_PAUSE_ON=16,
    USERDEFS_FROM_BONUS=17,
    USERDEFS_CAMERASPRITE=18,
    USERDEFS_LAST_CAMSPRITE=19,
    USERDEFS_LAST_LEVEL=20,
    USERDEFS_SECRETLEVEL=21,
    USERDEFS_CONST_VISIBILITY=22,
    USERDEFS_UW_FRAMERATE=23,
    USERDEFS_CAMERA_TIME=24,
    USERDEFS_FOLFVEL=25,
    USERDEFS_FOLAVEL=26,
    USERDEFS_FOLX=27,
    USERDEFS_FOLY=28,
    USERDEFS_FOLA=29,
    USERDEFS_RECCNT=30,
    USERDEFS_ENTERED_NAME=31,
    USERDEFS_SCREEN_TILTING=32,
    USERDEFS_SHADOWS=33,
    USERDEFS_FTA_ON=34,
    USERDEFS_EXECUTIONS=35,
    USERDEFS_AUTO_RUN=36,
    USERDEFS_COORDS=37,
    USERDEFS_TICKRATE=38,
    USERDEFS_M_COOP=39,
    USERDEFS_COOP=40,
    USERDEFS_SCREEN_SIZE=41,
    USERDEFS_LOCKOUT=42,
    USERDEFS_CROSSHAIR=43,
    USERDEFS_WCHOICE=44,
    USERDEFS_PLAYERAI=45,
    USERDEFS_RESPAWN_MONSTERS=46,
    USERDEFS_RESPAWN_ITEMS=47,
    USERDEFS_RESPAWN_INVENTORY=48,
    USERDEFS_RECSTAT=49,
    USERDEFS_MONSTERS_OFF=50,
    USERDEFS_BRIGHTNESS=51,
    USERDEFS_M_RESPAWN_ITEMS=52,
    USERDEFS_M_RESPAWN_MONSTERS=53,
    USERDEFS_M_RESPAWN_INVENTORY=54,
    USERDEFS_M_RECSTAT=55,
    USERDEFS_M_MONSTERS_OFF=56,
    USERDEFS_DETAIL=57,
    USERDEFS_M_FFIRE=58,
    USERDEFS_FFIRE=59,
    USERDEFS_M_PLAYER_SKILL=60,
    USERDEFS_M_LEVEL_NUMBER=61,
    USERDEFS_M_VOLUME_NUMBER=62,
    USERDEFS_MULTIMODE=63,
    USERDEFS_PLAYER_SKILL=64,
    USERDEFS_LEVEL_NUMBER=65,
    USERDEFS_VOLUME_NUMBER=66,
    USERDEFS_M_MARKER=67,
    USERDEFS_MARKER=68,
    USERDEFS_MOUSEFLIP=69,
    USERDEFS_STATUSBARSCALE=70,
    USERDEFS_DRAWWEAPON=71,
    USERDEFS_MOUSEAIMING=72,
    USERDEFS_WEAPONSWITCH=73,
    USERDEFS_DEMOCAMS=74,
    USERDEFS_COLOR=75,
    USERDEFS_MSGDISPTIME=76,
    USERDEFS_STATUSBARMODE=77,
    USERDEFS_M_NOEXITS=78,
    USERDEFS_NOEXITS=79,
    USERDEFS_AUTOVOTE=80,
    USERDEFS_AUTOMSG=81,
    USERDEFS_IDPLAYERS=82,
    USERDEFS_TEAM=83,
    USERDEFS_VIEWBOB=84,
    USERDEFS_WEAPONSWAY=85,
    USERDEFS_ANGLEINTERPOLATION=86,
    USERDEFS_OBITUARIES=87,
    USERDEFS_LEVELSTATS=88,
    USERDEFS_CROSSHAIRSCALE=89,
    USERDEFS_ALTHUD=90,
    USERDEFS_DISPLAY_BONUS_SCREEN=91,
    USERDEFS_SHOW_LEVEL_TEXT=92,
    USERDEFS_WEAPONSCALE=93,
    USERDEFS_TEXTSCALE=94,
    USERDEFS_RUNKEY_MODE=95,
    USERDEFS_END=96;

//};

//enum SectorLabel_t
//{
var SECTOR_WALLPTR =	0,
    SECTOR_WALLNUM =	1,
    SECTOR_CEILINGZ =	2,
    SECTOR_FLOORZ =	3,
    SECTOR_CEILINGSTAT =	4,
    SECTOR_FLOORSTAT =	5,
    SECTOR_CEILINGPICNUM =	6,
    SECTOR_CEILINGSLOPE =	7,
    SECTOR_CEILINGSHADE =	8,
    SECTOR_CEILINGPAL =	9,
    SECTOR_CEILINGXPANNING =	10,
    SECTOR_CEILINGYPANNING =	11,
    SECTOR_FLOORPICNUM =	12,
    SECTOR_FLOORSLOPE =	13,
    SECTOR_FLOORSHADE =	14,
    SECTOR_FLOORPAL =	15,
    SECTOR_FLOORXPANNING =	16,
    SECTOR_FLOORYPANNING =	17,
    SECTOR_VISIBILITY =	18,
    SECTOR_ALIGNTO =	19,
    SECTOR_LOTAG =	20,
    SECTOR_HITAG =	21,
    SECTOR_EXTRA =	22,
    SECTOR_CEILINGBUNCH =	23,
    SECTOR_FLOORBUNCH =	24,
    SECTOR_ULOTAG =	25,
    SECTOR_UHITAG =	26,
    SECTOR_END =	27	;

//};

//enum WallLabel_t
//{
var WALL_X=0,
    WALL_Y=1,
    WALL_POINT2=2,
    WALL_NEXTWALL=3,
    WALL_NEXTSECTOR=4,
    WALL_CSTAT=5,
    WALL_PICNUM=6,
    WALL_OVERPICNUM=7,
    WALL_SHADE=8,
    WALL_PAL=9,
    WALL_XREPEAT=10,
    WALL_YREPEAT=11,
    WALL_XPANNING=12,
    WALL_YPANNING=13,
    WALL_LOTAG=14,
    WALL_HITAG=15,
    WALL_EXTRA=16,
    WALL_ULOTAG=17,
    WALL_UHITAG=18,
    WALL_END=19;

//};

//enum ActorLabel_t
//{
var ACTOR_X=0,
    ACTOR_Y=1,
    ACTOR_Z=2,
    ACTOR_CSTAT=3,
    ACTOR_PICNUM=4,
    ACTOR_SHADE=5,
    ACTOR_PAL=6,
    ACTOR_CLIPDIST=7,
    ACTOR_DETAIL=8,
    ACTOR_XREPEAT=9,
    ACTOR_YREPEAT=10,
    ACTOR_XOFFSET=11,
    ACTOR_YOFFSET=12,
    ACTOR_SECTNUM=13,
    ACTOR_STATNUM=14,
    ACTOR_ANG=15,
    ACTOR_OWNER=16,
    ACTOR_XVEL=17,
    ACTOR_YVEL=18,
    ACTOR_ZVEL=19,
    ACTOR_LOTAG=20,
    ACTOR_HITAG=21,
    ACTOR_EXTRA=22,
    ACTOR_HTCGG=23,
    ACTOR_HTPICNUM=24,
    ACTOR_HTANG=25,
    ACTOR_HTEXTRA=26,
    ACTOR_HTOWNER=27,
    ACTOR_HTMOVFLAG=28,
    ACTOR_HTTEMPANG=29,
    ACTOR_HTACTORSTAYPUT=30,
    ACTOR_HTDISPICNUM=31,
    ACTOR_HTTIMETOSLEEP=32,
    ACTOR_HTFLOORZ=33,
    ACTOR_HTCEILINGZ=34,
    ACTOR_HTLASTVX=35,
    ACTOR_HTLASTVY=36,
    ACTOR_HTBPOSX=37,
    ACTOR_HTBPOSY=38,
    ACTOR_HTBPOSZ=39,
    ACTOR_HTG_T=40,
    ACTOR_ANGOFF=41,
    ACTOR_PITCH=42,
    ACTOR_ROLL=43,
    ACTOR_MDXOFF=44,
    ACTOR_MDYOFF=45,
    ACTOR_MDZOFF=46,
    ACTOR_MDFLAGS=47,
    ACTOR_XPANNING=48,
    ACTOR_YPANNING=49,
    ACTOR_HTFLAGS=50,
    ACTOR_ALPHA=51,
    ACTOR_ULOTAG=52,
    ACTOR_UHITAG=53,
    ACTOR_END=54;

//};

//enum InputLabel_t
//{
var INPUT_AVEL=0,
    INPUT_HORZ=1,
    INPUT_FVEL=2,
    INPUT_SVEL=3,
    INPUT_BITS=4,
    INPUT_EXTBITS=5,
    INPUT_END=6;

//};

//#endif
//// KEEPINSYNC lunatic/con_lang.lua
//enum ProjectileLabel_t
//{
var PROJ_WORKSLIKE       =0,
    PROJ_SPAWNS=1,
    PROJ_SXREPEAT=2,
    PROJ_SYREPEAT=3,
    PROJ_SOUND=4,
    PROJ_ISOUND =5,
    PROJ_VEL=6,
    PROJ_EXTRA=7,
    PROJ_DECAL=8,
    PROJ_TRAIL=9,
    PROJ_TXREPEAT  =10,
    PROJ_TYREPEAT=11,
    PROJ_TOFFSET=12,
    PROJ_TNUM=13,
    PROJ_DROP=14,
    PROJ_CSTAT  =15,
    PROJ_CLIPDIST=16,
    PROJ_SHADE=17,
    PROJ_XREPEAT=18,
    PROJ_YREPEAT=19,
    PROJ_PAL=20,
    PROJ_EXTRA_RAND=21,
    PROJ_HITRADIUS=22,
    PROJ_MOVECNT=23,
    PROJ_OFFSET=24,
    PROJ_BOUNCES  =25,
    PROJ_BSOUND=26,
    PROJ_RANGE=27,
    PROJ_FLASH_COLOR=28,
    PROJ_USERDATA=29,
    PROJ_END=30;
//};
//#if !defined LUNATIC

//enum ScriptKeywords_t
//{
var CON_DEFINELEVELNAME     = 0,
    CON_ACTOR               = 1,
    CON_ADDAMMO             = 2,
    CON_IFRND               = 3,
    CON_ENDA                = 4,
    CON_IFCANSEE            = 5,
    CON_IFHITWEAPON         = 6,
    CON_ACTION              = 7,
    CON_IFPDISTL            = 8,
    CON_IFPDISTG            = 9,
    CON_ELSE                = 10,
    CON_STRENGTH            = 11,
    CON_BREAK               = 12,
    CON_SHOOT               = 13,
    CON_PALFROM             = 14,
    CON_SOUND               = 15,
    CON_FALL                = 16,
    CON_STATE               = 17,
    CON_ENDS                = 18,
    CON_DEFINE              = 19,
    CON_RETURN              = 20,
    CON_IFAI                = 21,
    CON_KILLIT              = 22,
    CON_ADDWEAPON           = 23,
    CON_AI                  = 24,
    CON_ADDPHEALTH          = 25,
    CON_IFDEAD              = 26,
    CON_IFSQUISHED          = 27,
    CON_SIZETO              = 28,
    CON_LEFTBRACE           = 29,
    CON_RIGHTBRACE          = 30,
    CON_SPAWN               = 31,
    CON_MOVE                = 32,
    CON_IFWASWEAPON         = 33,
    CON_IFACTION            = 34,
    CON_IFACTIONCOUNT       = 35,
    CON_RESETACTIONCOUNT    = 36,
    CON_DEBRIS              = 37,
    CON_PSTOMP              = 38,
    CON_BLOCKCOMMENT        = 39, // deprecated
    CON_CSTAT               = 40,
    CON_IFMOVE              = 41,
    CON_RESETPLAYER         = 42,
    CON_IFONWATER           = 43,
    CON_IFINWATER           = 44,
    CON_IFCANSHOOTTARGET    = 45,
    CON_IFCOUNT             = 46,
    CON_RESETCOUNT          = 47,
    CON_ADDINVENTORY        = 48,
    CON_IFACTORNOTSTAYPUT   = 49,
    CON_HITRADIUS           = 50,
    CON_IFP                 = 51,
    CON_COUNT               = 52,
    CON_IFACTOR             = 53,
    CON_MUSIC               = 54,
    CON_INCLUDE             = 55,
    CON_IFSTRENGTH          = 56,
    CON_DEFINESOUND         = 57,
    CON_GUTS                = 58,
    CON_IFSPAWNEDBY         = 59,
    CON_GAMESTARTUP         = 60,
    CON_WACKPLAYER          = 61,
    CON_IFGAPZL             = 62,
    CON_IFHITSPACE          = 63,
    CON_IFOUTSIDE           = 64,
    CON_IFMULTIPLAYER       = 65,
    CON_OPERATE             = 66,
    CON_IFINSPACE           = 67,
    CON_DEBUG               = 68,
    CON_ENDOFGAME           = 69,
    CON_IFBULLETNEAR        = 70,
    CON_IFRESPAWN           = 71,
    CON_IFFLOORDISTL        = 72,
    CON_IFCEILINGDISTL      = 73,
    CON_SPRITEPAL           = 74,
    CON_IFPINVENTORY        = 75,
    CON_BETANAME            = 76,
    CON_CACTOR              = 77,
    CON_IFPHEALTHL          = 78,
    CON_DEFINEQUOTE         = 79,
    CON_QUOTE               = 80,
    CON_IFINOUTERSPACE      = 81,
    CON_IFNOTMOVING         = 82,
    CON_RESPAWNHITAG        = 83,
    CON_TIP                 = 84,
    CON_IFSPRITEPAL         = 85,
    CON_MONEY               = 86,
    CON_SOUNDONCE           = 87,
    CON_ADDKILLS            = 88,
    CON_STOPSOUND           = 89,
    CON_IFAWAYFROMWALL      = 90,
    CON_IFCANSEETARGET      = 91,
    CON_GLOBALSOUND         = 92,
    CON_LOTSOFGLASS         = 93,
    CON_IFGOTWEAPONCE       = 94,
    CON_GETLASTPAL          = 95,
    CON_PKICK               = 96,
    CON_MIKESND             = 97,
    CON_USERACTOR           = 98,
    CON_SIZEAT              = 99,
    CON_ADDSTRENGTH         = 100,
    CON_CSTATOR             = 101,
    CON_MAIL                = 102,
    CON_PAPER               = 103,
    CON_TOSSWEAPON          = 104,
    CON_SLEEPTIME           = 105,
    CON_NULLOP              = 106,
    CON_DEFINEVOLUMENAME    = 107,
    CON_DEFINESKILLNAME     = 108,
    CON_IFNOSOUNDS          = 109,
    CON_CLIPDIST            = 110,
    CON_IFANGDIFFL          = 111,
    CON_GAMEVAR             = 112,
    CON_IFVARL              = 113,
    CON_IFVARG              = 114,
    CON_SETVARVAR           = 115,
    CON_SETVAR              = 116,
    CON_ADDVARVAR           = 117,
    CON_ADDVAR              = 118,
    CON_IFVARVARL           = 119,
    CON_IFVARVARG           = 120,
    CON_ADDLOGVAR           = 121,
    CON_ADDLOG              = 122,
    CON_ONEVENT             = 123,
    CON_ENDEVENT            = 124,
    CON_IFVARE              = 125,
    CON_IFVARVARE           = 126,
    CON_SPGETLOTAG          = 127,
    CON_SPGETHITAG          = 128,
    CON_SECTGETLOTAG        = 129,
    CON_SECTGETHITAG        = 130,
    CON_IFSOUND             = 131,
    CON_GETTEXTUREFLOOR     = 132,
    CON_GETTEXTURECEILING   = 133,
    CON_INITTIMER           = 134,
    CON_STARTTRACK          = 135,
    CON_RANDVAR             = 136,
    CON_ENHANCED            = 137,
    CON_GETANGLETOTARGET    = 138,
    CON_GETACTORANGLE       = 139,
    CON_SETACTORANGLE       = 140,
    CON_MULVAR              = 141,
    CON_MULVARVAR           = 142,
    CON_DIVVAR              = 143,
    CON_DIVVARVAR           = 144,
    CON_MODVAR              = 145,
    CON_MODVARVAR           = 146,
    CON_ANDVAR              = 147,
    CON_ANDVARVAR           = 148,
    CON_ORVAR               = 149,
    CON_ORVARVAR            = 150,
    CON_GETPLAYERANGLE      = 151,
    CON_SETPLAYERANGLE      = 152,
    CON_LOCKPLAYER          = 153,
    CON_SETSECTOR           = 154,
    CON_GETSECTOR           = 155,
    CON_SETACTOR            = 156,
    CON_GETACTOR            = 157,
    CON_SETWALL             = 158,
    CON_GETWALL             = 159,
    CON_FINDNEARACTOR       = 160,
    CON_FINDNEARACTORVAR    = 161,
    CON_SETACTORVAR         = 162,
    CON_GETACTORVAR         = 163,
    CON_ESPAWN              = 164,
    CON_GETPLAYER           = 165,
    CON_SETPLAYER           = 166,
    CON_SQRT                = 167,
    CON_EVENTLOADACTOR      = 168,
    CON_ESPAWNVAR           = 169,
    CON_GETUSERDEF          = 170,
    CON_SETUSERDEF          = 171,
    CON_SUBVARVAR           = 172,
    CON_SUBVAR              = 173,
    CON_IFVARN              = 174,
    CON_IFVARVARN           = 175,
    CON_IFVARAND            = 176,
    CON_IFVARVARAND         = 177,
    CON_MYOS                = 178,
    CON_MYOSPAL             = 179,
    CON_DISPLAYRAND         = 180,
    CON_SIN                 = 181,
    CON_XORVARVAR           = 182,
    CON_XORVAR              = 183,
    CON_RANDVARVAR          = 184,
    CON_MYOSX               = 185,
    CON_MYOSPALX            = 186,
    CON_GMAXAMMO            = 187,
    CON_SMAXAMMO            = 188,
    CON_STARTLEVEL          = 189,
    CON_ESHOOT              = 190,
    CON_QSPAWN              = 191,
    CON_ROTATESPRITE        = 192,
    CON_DEFINEPROJECTILE    = 193,
    CON_SPRITESHADOW        = 194,
    CON_COS                 = 195,
    CON_ESHOOTVAR           = 196,
    CON_FINDNEARACTOR3D     = 197,
    CON_FINDNEARACTOR3DVAR  = 198,
    CON_FLASH               = 199,
    CON_QSPAWNVAR           = 200,
    CON_EQSPAWN             = 201,
    CON_EQSPAWNVAR          = 202,
    CON_MINITEXT            = 203,
    CON_GAMETEXT            = 204,
    CON_DIGITALNUMBER       = 205,
    CON_ADDWEAPONVAR        = 206,
    CON_SETPROJECTILE       = 207,
    CON_ANGOFF              = 208,
    CON_UPDATESECTOR        = 209,
    CON_INSERTSPRITEQ       = 210,
    CON_ANGOFFVAR           = 211,
    CON_WHILEVARN           = 212,
    CON_SWITCH              = 213,
    CON_CASE                = 214,
    CON_DEFAULT             = 215,
    CON_ENDSWITCH           = 216,
    CON_SHOOTVAR            = 217,
    CON_SOUNDVAR            = 218,
    CON_FINDPLAYER          = 219,
    CON_FINDOTHERPLAYER     = 220,
    CON_ACTIVATEBYSECTOR    = 221,
    CON_OPERATESECTORS      = 222,
    CON_OPERATERESPAWNS     = 223,
    CON_OPERATEACTIVATORS   = 224,
    CON_OPERATEMASTERSWITCHES   = 225,
    CON_CHECKACTIVATORMOTION    = 226,
    CON_ZSHOOT              = 227,
    CON_DIST                = 228,
    CON_LDIST               = 229,
    CON_SHIFTVARL           = 230,
    CON_SHIFTVARR           = 231,
    CON_SPRITENVG           = 232,
    CON_GETANGLE            = 233,
    CON_WHILEVARVARN        = 234,
    CON_HITSCAN             = 235,
    CON_TIME                = 236,
    CON_GETPLAYERVAR        = 237,
    CON_SETPLAYERVAR        = 238,
    CON_MULSCALE            = 239,
    CON_SETASPECT           = 240,
    CON_EZSHOOT             = 241,
    CON_SPRITENOSHADE       = 242,
    CON_MOVESPRITE          = 243,
    CON_CHECKAVAILWEAPON    = 244,
    CON_SOUNDONCEVAR        = 245,
    CON_UPDATESECTORZ       = 246,
    CON_STOPALLSOUNDS       = 247,
    CON_SSP                 = 248,
    CON_STOPSOUNDVAR        = 249,
    CON_DISPLAYRANDVAR      = 250,
    CON_DISPLAYRANDVARVAR   = 251,
    CON_CHECKAVAILINVEN     = 252,
    CON_GLOBALSOUNDVAR      = 253,
    CON_GUNIQHUDID          = 254,
    CON_GETPROJECTILE       = 255,
    CON_GETTHISPROJECTILE   = 256,
    CON_SETTHISPROJECTILE   = 257,
    CON_DEFINECHEAT         = 258,
    CON_CHEATKEYS           = 259,
    CON_USERQUOTE           = 260,
    CON_PRECACHE            = 261,
    CON_DEFINEGAMEFUNCNAME  = 262,
    CON_REDEFINEQUOTE       = 263,
    CON_QSPRINTF            = 264,
    CON_GETPNAME            = 265,
    CON_QSTRCAT             = 266,
    CON_QSTRCPY             = 267,
    CON_SETSPRITE           = 268,
    CON_ROTATEPOINT         = 269,
    CON_DRAGPOINT           = 270,
    CON_GETZRANGE           = 271,
    CON_CHANGESPRITESTAT    = 272,
    CON_GETCEILZOFSLOPE     = 273,
    CON_GETFLORZOFSLOPE     = 274,
    CON_NEARTAG             = 275,
    CON_DEFINEGAMETYPE      = 276,
    CON_CHANGESPRITESECT    = 277,
    CON_SPRITEFLAGS         = 278,
    CON_SAVEGAMEVAR         = 279,
    CON_READGAMEVAR         = 280,
    CON_FINDNEARSPRITE      = 281,
    CON_FINDNEARSPRITEVAR   = 282,
    CON_FINDNEARSPRITE3D    = 283,
    CON_FINDNEARSPRITE3DVAR = 284,
    CON_DYNAMICREMAP        = 285,
    CON_SETINPUT            = 286,
    CON_GETINPUT            = 287,
    CON_SAVE                = 288,
    CON_CANSEE              = 289,
    CON_CANSEESPR           = 290,
    CON_FINDNEARACTORZ      = 291,
    CON_FINDNEARACTORZVAR   = 292,
    CON_FINDNEARSPRITEZ     = 293,
    CON_FINDNEARSPRITEZVAR  = 294,
    CON_ZSHOOTVAR           = 295,
    CON_EZSHOOTVAR          = 296,
    CON_GETCURRADDRESS      = 297,
    CON_JUMP                = 298,
    CON_QSTRLEN             = 299,
    CON_GETINCANGLE         = 300,
    CON_QUAKE               = 301,
    CON_SHOWVIEW            = 302,
    CON_HEADSPRITESTAT      = 303,
    CON_PREVSPRITESTAT      = 304,
    CON_NEXTSPRITESTAT      = 305,
    CON_HEADSPRITESECT      = 306,
    CON_PREVSPRITESECT      = 307,
    CON_NEXTSPRITESECT      = 308,
    CON_GETKEYNAME          = 309,
    CON_QSUBSTR             = 310,
    CON_GAMETEXTZ           = 311,
    CON_DIGITALNUMBERZ      = 312,
    CON_SPRITENOPAL         = 313,
    CON_HITRADIUSVAR        = 314,
    CON_ROTATESPRITE16      = 315,
    CON_GAMEARRAY           = 316,
    CON_SETARRAY            = 317,
    CON_RESIZEARRAY         = 318,
    CON_WRITEARRAYTOFILE    = 319,
    CON_READARRAYFROMFILE   = 320,
    CON_STARTTRACKVAR       = 321,
    CON_QGETSYSSTR          = 322,
    CON_GETTICKS            = 323,
    CON_GETTSPR             = 324,
    CON_SETTSPR             = 325,
    CON_SAVEMAPSTATE        = 326,
    CON_LOADMAPSTATE        = 327,
    CON_CLEARMAPSTATE       = 328,
    CON_SCRIPTSIZE          = 329,
    CON_SETGAMENAME         = 330,
    CON_CMENU               = 331,
    CON_GETTIMEDATE         = 332,
    CON_ACTIVATECHEAT       = 333,
    CON_SETGAMEPALETTE      = 334,
    CON_SETDEFNAME          = 335,
    CON_SETCFGNAME          = 336,
    CON_IFVAROR             = 337,
    CON_IFVARVAROR          = 338,
    CON_IFVARXOR            = 339,
    CON_IFVARVARXOR         = 340,
    CON_IFVAREITHER         = 341,
    CON_IFVARVAREITHER      = 342,
    CON_GETARRAYSIZE        = 343,
    CON_SAVENN              = 344,
    CON_COPY                = 345,
    CON_INV                 = 346,
    CON_SECTOROFWALL        = 347,
    CON_QSTRNCAT            = 348,
    CON_IFACTORSOUND        = 349,
    CON_STOPACTORSOUND      = 350,
    CON_IFCLIENT            = 351,
    CON_IFSERVER            = 352,
    CON_SECTSETINTERPOLATION  = 353,
    CON_SECTCLEARINTERPOLATION  = 354,
    CON_CLIPMOVE            = 355,
    CON_LINEINTERSECT       = 356,
    CON_RAYINTERSECT        = 357,
    CON_CALCHYPOTENUSE      = 358,
    CON_CLIPMOVENOSLIDE     = 359,
    CON_INCLUDEDEFAULT      = 360,
    CON_SETACTORSOUNDPITCH  = 361,
    CON_ECHO                = 362,
    CON_SHOWVIEWUNBIASED    = 363,
    CON_ROTATESPRITEA       = 364,
    CON_SHADETO             = 365,
    CON_ENDOFLEVEL          = 366,
    CON_IFPLAYERSL          = 367,
    CON_ACTIVATE            = 368,
    CON_QSTRDIM             = 369,
    CON_SCREENTEXT          = 370,
    CON_DYNAMICSOUNDREMAP   = 371,
    CON_SCREENSOUND         = 372,
    CON_END = 373;
//};
//#endif


//#endif

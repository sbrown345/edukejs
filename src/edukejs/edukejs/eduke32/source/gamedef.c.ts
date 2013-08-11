/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/logging.ts" />
/// <reference path="../../utils/todo.ts" />
/// <reference path="../../utils/types.ts" />

/// <reference path="../../build/headers/baselayer.h.ts" />
/// <reference path="../../build/headers/build.h.ts" />
/// <reference path="../../build/headers/cache1d.h.ts" />
/// <reference path="../../build/headers/compat.h.ts" />
/// <reference path="../../build/headers/engine_priv.h.ts" />
/// <reference path="../../build/headers/hightile.h.ts" />
/// <reference path="../../build/headers/mdsprite.h.ts" />
/// <reference path="../../build/headers/osd.h.ts" />
/// <reference path="../../build/headers/pragmas.h.ts" />
/// <reference path="../../build/headers/scancodes.h.ts" />
/// <reference path="../../build/headers/pragmas.h.ts" />
/// <reference path="../../build/headers/scancodes.h.ts" />
/// <reference path="../../build/headers/pragmas.h.ts" />
/// <reference path="../../build/headers/scancodes.h.ts" />

/// <reference path="../../build/source/baselayer.c.ts" />
/// <reference path="../../build/source/build.c.ts" />
/// <reference path="../../build/source/compat.c.ts" />
/// <reference path="../../build/source/crc32.c.ts" />
/// <reference path="../../build/source/engine.c.ts" />
/// <reference path="../../build/source/polymost.c.ts" />
/// <reference path="../../build/source/hightile.c.ts" />

/// <reference path="../../eduke32/headers/_functio.h.ts" />
/// <reference path="../../eduke32/headers/_rts.h.ts" />
/// <reference path="../../eduke32/headers/actors.h.ts" />
/// <reference path="../../eduke32/headers/common_game.h.ts" />
/// <reference path="../../eduke32/headers/duke3d.h.ts" />
/// <reference path="../../eduke32/headers/function.h.ts" />
/// <reference path="../../eduke32/headers/game.h.ts" />
/// <reference path="../../eduke32/headers/gamedef.h.ts" />
/// <reference path="../../eduke32/headers/gameexec.h.ts" />
/// <reference path="../../eduke32/headers/global.h.ts" />
/// <reference path="../../eduke32/headers/grpscan.h.ts" />
/// <reference path="../../eduke32/headers/namesdyn.h.ts" />
/// <reference path="../../eduke32/headers/player.h.ts" />
/// <reference path="../../eduke32/headers/quotes.h.ts" />
/// <reference path="../../eduke32/headers/sector.h.ts" />
/// <reference path="../../eduke32/headers/sounds.h.ts" />
/// <reference path="../../eduke32/headers/soundsdyn.h.ts" />

/// <reference path="../../eduke32/source/actors.c.ts" />
/// <reference path="../../eduke32/source/astub.c.ts" />
/// <reference path="../../eduke32/source/common.c.ts" />
/// <reference path="../../eduke32/source/config.c.ts" />
/// <reference path="../../eduke32/source/game.c.ts" />
/// <reference path="../../eduke32/source/gamevars.c.ts" />
/// <reference path="../../eduke32/source/glbuild.c.ts" />
/// <reference path="../../eduke32/source/global.c.ts" />
/// <reference path="../../eduke32/source/grpscan.c.ts" />
/// <reference path="../../eduke32/source/menus.c.ts" />
/// <reference path="../../eduke32/source/namesdyn.c.ts" />
/// <reference path="../../eduke32/source/net.c.ts" />
/// <reference path="../../eduke32/source/osd.c.ts" />
/// <reference path="../../eduke32/source/player.c.ts" />
/// <reference path="../../eduke32/source/premap.c.ts" />
/// <reference path="../../eduke32/source/rts.c.ts" />
/// <reference path="../../eduke32/source/sector.c.ts" />
/// <reference path="../../eduke32/source/osdfuncs.c.ts" />
/// <reference path="../../eduke32/source/sounds.c.ts" />
/// <reference path="../../eduke32/source/soundsdyn.c.ts" />
/// <reference path="../../eduke32/source/winbits.c.ts" />
/// <reference path="../../eduke32/source/winlayer.c.ts" />
/// <reference path="../../eduke32/source/winbits.c.ts" />
/// <reference path="../../eduke32/source/winlayer.c.ts" />

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

//#include "duke3d.h"
//#include "namesdyn.h"
//#include "gamedef.h"
//#include "gameexec.h"
//#include "savegame.h"
//#include "common.h"
//#include "common_game.h"

//#include "osd.h"

//#ifdef _WIN32
//#define WIN32_LEAN_AND_MEAN
//#include <windows.h>
//#include <shellapi.h>
//#endif

var NUMKEYWORDS : number;

var g_scriptVersion = 13; // 13 = 1.3D-style CON files, 14 = 1.4/1.5 style CON files
var g_scriptDateVersion = 99999999;  // YYYYMMDD
//#if !defined LUNATIC
var  g_scriptLastKeyword: number; // = NUMKEYWORDS-1;//g_scriptLastKeyword

var NUMKEYWDATES : number;
//// { keyw, date } means that at the date, all keywords up to keyw inclusive are available

class keyword_t {
    keyw: number;   //uint32_t
    date: number;     //uint32_t

    constructor (keyw:number, date:number) {
        this.keyw = keyw;
        this.date = date;
    }
}

var g_keywdate : keyword_t[] =
[
    // beginning of eduke32 svn
    new keyword_t( CON_CANSEE, 20060423 ),    
    new keyword_t( CON_CANSEESPR, 20060424 ),
    // some stuff here not representable this way
    new keyword_t( CON_FINDNEARSPRITEZVAR, 20060516 ),
    new keyword_t( CON_EZSHOOT, 20060701 ),
    new keyword_t( CON_EZSHOOTVAR, 20060822 ),
    new keyword_t( CON_JUMP, 20060828 ),
    new keyword_t( CON_QSTRLEN, 20060930 ),
    new keyword_t( CON_QUAKE, 20070105 ),
    new keyword_t( CON_SHOWVIEW, 20070208 ),
    new keyword_t( CON_NEXTSPRITESECT, 20070819 ),
    new keyword_t( CON_GETKEYNAME, 20071024 ),  // keyw numbers have been
    new keyword_t( CON_SPRITENOPAL, 20071220 ), // shuffled around here
    new keyword_t( CON_HITRADIUSVAR, 20080216 ),
    new keyword_t( CON_ROTATESPRITE16, 20080314 ),
    new keyword_t( CON_SETARRAY, 20080401 ),
    new keyword_t( CON_READARRAYFROMFILE, 20080405 ),
    new keyword_t( CON_STARTTRACKVAR, 20080510 ),
    new keyword_t( CON_QGETSYSSTR, 20080709 ),
    new keyword_t( CON_GETTICKS, 20080711 ),
    new keyword_t( CON_SETTSPR, 20080713 ),
    new keyword_t( CON_CLEARMAPSTATE, 20080716 ),
    new keyword_t( CON_SCRIPTSIZE, 20080720 ),
    new keyword_t( CON_SETGAMENAME, 20080722 ),
    new keyword_t( CON_CMENU, 20080725 ),
    new keyword_t( CON_GETTIMEDATE, 20080809 ),
    new keyword_t( CON_ACTIVATECHEAT, 20080810 ),
    new keyword_t( CON_SETGAMEPALETTE, 20080816 ),
    new keyword_t( CON_SETCFGNAME, 20080817 ),
    new keyword_t( CON_IFVARVAREITHER, 20080907 ),
    new keyword_t( CON_SAVENN, 20080915 ),
    new keyword_t( CON_COPY, 20090219 ),
//    new keyword_t( CON_INV, 20090619 ),
    new keyword_t( CON_QSTRNCAT, 20090712 ),
    new keyword_t( CON_STOPACTORSOUND, 20090715 ),
    new keyword_t( CON_IFSERVER, 20100722 ),
    new keyword_t( CON_CALCHYPOTENUSE, 20100927 ),
    new keyword_t( CON_CLIPMOVENOSLIDE, 20101009 ),
    new keyword_t( CON_INCLUDEDEFAULT, 20110615 ),
    new keyword_t( CON_SETACTORSOUNDPITCH, 20111102 ),
    new keyword_t( CON_ECHO, 20120304 ),
    new keyword_t( CON_SHOWVIEWUNBIASED, 20120331 ),
    new keyword_t( CON_ROTATESPRITEA, 20130324 ),
    new keyword_t( CON_ACTIVATE, 20130522 ),
    new keyword_t( CON_SCREENTEXT, 20130529 ),
    new keyword_t( CON_DYNAMICSOUNDREMAP, 20130530 ),
    new keyword_t( CON_SCREENSOUND, 20130628 ),
];
NUMKEYWDATES = g_keywdate.length;
//#endif

var g_szScriptFileName = "(none)";  // file we're currently compiling  //char g_szScriptFileName[BMAX_PATH] 

var g_totalLines:number,g_lineNumber:number;//int32_t 
//char g_szBuf[1024];

//#if !defined LUNATIC
var g_szCurrentBlockName/*[256]*/ = "(none)", g_szLastBlockName/*[256]*/ = "NULL";
var g_checkingIfElse = 0, g_processingState = 0, g_lastKeyword = -1;//static int32_t 

//// The pointer to the start of the case table in a switch statement.
//// First entry is 'default' code.
var g_caseScriptPtr=0;
//static intptr_t *previous_event=NULL;
var g_numCases = 0;
var g_checkingSwitch = 0, g_currentEvent = -1;
var g_labelsOnly = 0, g_skipKeywordCheck = 0, g_dynamicTileMapping = 0, g_dynamicSoundMapping = 0;
var g_numBraces = 0;////static int32_t 

//static int32_t C_ParseCommand(int32_t loop);
//static int32_t C_SetScriptSize(int32_t size);
//#endif

var g_numQuoteRedefinitions = 0; //int32_t 

//#ifdef LUNATIC
//weapondata_t g_playerWeapon[MAXPLAYERS][MAX_WEAPONS];
//#else
//// pointers to weapon gamevar data
//intptr_t *aplWeaponClip[MAX_WEAPONS];       // number of items in magazine
//intptr_t *aplWeaponReload[MAX_WEAPONS];     // delay to reload (include fire)
//intptr_t *aplWeaponFireDelay[MAX_WEAPONS];      // delay to fire
//intptr_t *aplWeaponHoldDelay[MAX_WEAPONS];      // delay after release fire button to fire (0 for none)
//intptr_t *aplWeaponTotalTime[MAX_WEAPONS];      // The total time the weapon is cycling before next fire.
//intptr_t *aplWeaponFlags[MAX_WEAPONS];      // Flags for weapon
//intptr_t *aplWeaponShoots[MAX_WEAPONS];     // what the weapon shoots
//intptr_t *aplWeaponSpawnTime[MAX_WEAPONS];      // the frame at which to spawn an item
//intptr_t *aplWeaponSpawn[MAX_WEAPONS];      // the item to spawn
//intptr_t *aplWeaponShotsPerBurst[MAX_WEAPONS];  // number of shots per 'burst' (one ammo per 'burst')
//intptr_t *aplWeaponWorksLike[MAX_WEAPONS];      // What original the weapon works like
//intptr_t *aplWeaponInitialSound[MAX_WEAPONS];   // Sound made when weapon starts firing. zero for no sound
//intptr_t *aplWeaponFireSound[MAX_WEAPONS];      // Sound made when firing (each time for automatic)
//intptr_t *aplWeaponSound2Time[MAX_WEAPONS];     // Alternate sound time
//intptr_t *aplWeaponSound2Sound[MAX_WEAPONS];    // Alternate sound sound ID
//intptr_t *aplWeaponReloadSound1[MAX_WEAPONS];    // Sound of magazine being removed
//intptr_t *aplWeaponReloadSound2[MAX_WEAPONS];    // Sound of magazine being inserted
//intptr_t *aplWeaponSelectSound[MAX_WEAPONS];     // Sound of weapon being selected
//intptr_t *aplWeaponFlashColor[MAX_WEAPONS];     // Muzzle flash color
//#endif

var g_iReturnVarID=-1;      // var ID of "RETURN"      //int32_t 
var g_iWeaponVarID=-1;      // var ID of "WEAPON"      //int32_t 
var g_iWorksLikeVarID=-1;   // var ID of "WORKSLIKE"   //int32_t 
var g_iZRangeVarID=-1;      // var ID of "ZRANGE"      //int32_t 
var g_iAngRangeVarID=-1;    // var ID of "ANGRANGE"    //int32_t 
var g_iAimAngleVarID=-1;    // var ID of "AUTOAIMANGLE"//int32_t 
var g_iLoTagID=-1;          // var ID of "LOTAG"       //int32_t 
var g_iHiTagID=-1;          // var ID of "HITAG"       //int32_t 
var g_iTextureID=-1;        // var ID of "TEXTURE"     //int32_t 
var g_iThisActorID=-1;      // var ID of "THISACTOR"   //int32_t 
var g_iSpriteVarID=-1;                                 //int32_t 
var g_iSectorVarID=-1;                                 //int32_t 
var g_iWallVarID=-1;                                   //int32_t 
var g_iPlayerVarID=-1;                                 //int32_t 
var g_iActorVarID=-1;                                  //int32_t 

var apScriptGameEvent: Int32Array = new Int32Array(MAXGAMEEVENTS);

//#if !defined LUNATIC
var g_parsingEventPtr: number = NULL; ////static intptr_t *

aGameVars = newStructArray(gamevar_t, MAXGAMEVARS);
aGameArrays = newStructArray(gamearray_t, MAXGAMEARRAYS);
//int32_t g_gameVarCount=0;
//int32_t g_gameArrayCount=0;

var textptr : string; //static char *
var textptrIdx: number;
//#endif

var g_numCompilerErrors:number,g_numCompilerWarnings:number; ///int32_t 

//extern int32_t g_maxSoundPos;

//enum
//{
var LABEL_ANY    = -1,
    LABEL_DEFINE = 1,
    LABEL_STATE  = 2,
    LABEL_ACTOR  = 4,
    LABEL_ACTION = 8,
    LABEL_AI     = 16,
    LABEL_MOVE   = 32;
//};

//#if !defined LUNATIC
function C_GetLabelType(type: number): string
{
    var i: number;
    var x: string; //[64];
    debugger;
    var LabelTypeText =
    [
        "define",
        "state",
        "actor",
        "action",
        "ai",
        "move"
    ];

    x = "";//x[0] = 0;
    for (i=0; i<6; i++)
    {
        if (!(type & (1<<i))) continue;
        if (x) x = Bstrcat(x, " or ");
        x = Bstrcat(x, LabelTypeText[i]);
    }
    return Bstrdup(x);
}


var keyw : string[] =
[
    "definelevelname",          // 0  defines level name
    "actor",                    // 1  defines an actor
    "addammo",                  // 2  adds ammo to a weapon
    "ifrnd",                    // 3  checks against a randomizer
    "enda",                     // 4  ends an actor definition
    "ifcansee",                 // 5  checks if the player can see an object
    "ifhitweapon",              // 6  checks if an object was hit by a weapon
    "action",                   // 7  defines an action if used outside a state or actor, otherwise triggers actor to perform action
    "ifpdistl",                 // 8  checks if player distance is less than value
    "ifpdistg",                 // 9  checks if player distance is more than value
    "else",                     // 10 used with if checks
    "strength",                 // 11 sets health
    "break",                    // 12 stops processing
    "shoot",                    // 13 shoots a projectile
    "palfrom",                  // 14 used for player screen shading effect, sets p->pals
    "sound",                    // 15 plays a sound that was defined with definesound
    "fall",                     // 16 causes actor to fall to sector floor height
    "state",                    // 17 begins defining a state if used outside a state or actor, otherwise calls a state
    "ends",                     // 18 ends defining a state
    "define",                   // 19 defines a value
    "return",                   // 20
    "ifai",                     // 21 checks if actor is currently performing a specific ai function
    "killit",                   // 22 kills an actor
    "addweapon",                // 23 adds a weapon to the closest player
    "ai",                       // 24 sets an ai function to be used by an actor
    "addphealth",               // 25 adds health to the player
    "ifdead",                   // 26 checks if actor is dead
    "ifsquished",               // 27 checks if actor has been squished
    "sizeto",                   // 28 gradually increases actor size until it matches parameters given
    "{",                        // 29 used to indicate segments of code
    "}",                        // 30 used to indicate segments of code
    "spawn",                    // 31 spawns an actor
    "move",                     // 32
    "ifwasweapon",              // 33
    "ifaction",                 // 34
    "ifactioncount",            // 35
    "resetactioncount",         // 36
    "debris",                   // 37
    "pstomp",                   // 38
    "<null>",                   // 39 was previously used to define the start of a comment block
    "cstat",                    // 40
    "ifmove",                   // 41
    "resetplayer",              // 42
    "ifonwater",                // 43
    "ifinwater",                // 44
    "ifcanshoottarget",         // 45
    "ifcount",                  // 46
    "resetcount",               // 47
    "addinventory",             // 48
    "ifactornotstayput",        // 49
    "hitradius",                // 50
    "ifp",                      // 51
    "count",                    // 52
    "ifactor",                  // 53
    "music",                    // 54
    "include",                  // 55
    "ifstrength",               // 56
    "definesound",              // 57
    "guts",                     // 58
    "ifspawnedby",              // 59
    "gamestartup",              // 60
    "wackplayer",               // 61
    "ifgapzl",                  // 62
    "ifhitspace",               // 63
    "ifoutside",                // 64
    "ifmultiplayer",            // 65
    "operate",                  // 66
    "ifinspace",                // 67
    "debug",                    // 68
    "endofgame",                // 69
    "ifbulletnear",             // 70
    "ifrespawn",                // 71
    "iffloordistl",             // 72
    "ifceilingdistl",           // 73
    "spritepal",                // 74
    "ifpinventory",             // 75
    "betaname",                 // 76
    "cactor",                   // 77
    "ifphealthl",               // 78
    "definequote",              // 79
    "quote",                    // 80
    "ifinouterspace",           // 81
    "ifnotmoving",              // 82
    "respawnhitag",             // 83
    "tip",                      // 84
    "ifspritepal",              // 85
    "money",                    // 86
    "soundonce",                // 87
    "addkills",                 // 88
    "stopsound",                // 89
    "ifawayfromwall",           // 90
    "ifcanseetarget",           // 91
    "globalsound",              // 92
    "lotsofglass",              // 93
    "ifgotweaponce",            // 94
    "getlastpal",               // 95
    "pkick",                    // 96
    "mikesnd",                  // 97
    "useractor",                // 98
    "sizeat",                   // 99
    "addstrength",              // 100  [#]
    "cstator",                  // 101
    "mail",                     // 102
    "paper",                    // 103
    "tossweapon",               // 104
    "sleeptime",                // 105
    "nullop",                   // 106
    "definevolumename",         // 107
    "defineskillname",          // 108
    "ifnosounds",               // 109
    "clipdist",                 // 110
    "ifangdiffl",               // 111  Last Duke3D 1.5 CON command
    "gamevar",                  // 112
    "ifvarl",                   // 113
    "ifvarg",                   // 114
    "setvarvar",                // 115
    "setvar",                   // 116
    "addvarvar",                // 117
    "addvar",                   // 118
    "ifvarvarl",                // 119
    "ifvarvarg",                // 120
    "addlogvar",                // 121
    "addlog",                   // 122
    "onevent",                  // 123
    "endevent",                 // 124
    "ifvare",                   // 125
    "ifvarvare",                // 126
    "spgetlotag",               // 127
    "spgethitag",               // 128
    "sectgetlotag",             // 129
    "sectgethitag",             // 130
    "ifsound",                  // 131
    "gettexturefloor",          // 132
    "gettextureceiling",        // 133
    "inittimer",                // 134
    "starttrack",               // 135
    "randvar",                  // 136
    "enhanced",                 // 137
    "getangletotarget",         // 138
    "getactorangle",            // 139
    "setactorangle",            // 140
    "mulvar",                   // 141
    "mulvarvar",                // 142
    "divvar",                   // 143
    "divvarvar",                // 144
    "modvar",                   // 145
    "modvarvar",                // 146
    "andvar",                   // 147
    "andvarvar",                // 148
    "orvar",                    // 149
    "orvarvar",                 // 150
    "getplayerangle",           // 151
    "setplayerangle",           // 152
    "lockplayer",               // 153
    "setsector",                // 154
    "getsector",                // 155
    "setactor",                 // 156
    "getactor",                 // 157
    "setwall",                  // 158
    "getwall",                  // 159
    "findnearactor",            // 160
    "findnearactorvar",         // 161
    "setactorvar",              // 162
    "getactorvar",              // 163
    "espawn",                   // 164
    "getplayer",                // 165
    "setplayer",                // 166
    "sqrt",                     // 167
    "eventloadactor",           // 168
    "espawnvar",                // 169
    "getuserdef",               // 170
    "setuserdef",               // 171
    "subvarvar",                // 172
    "subvar",                   // 173
    "ifvarn",                   // 174
    "ifvarvarn",                // 175
    "ifvarand",                 // 176
    "ifvarvarand",              // 177
    "myos",                     // 178
    "myospal",                  // 179
    "displayrand",              // 180
    "sin",                      // 181
    "xorvarvar",                // 182
    "xorvar",                   // 183
    "randvarvar",               // 184
    "myosx",                    // 185
    "myospalx",                 // 186
    "gmaxammo",                 // 187
    "smaxammo",                 // 188
    "startlevel",               // 189
    "eshoot",                   // 190
    "qspawn",                   // 191
    "rotatesprite",             // 192
    "defineprojectile",         // 193
    "spriteshadow",             // 194
    "cos",                      // 195
    "eshootvar",                // 196
    "findnearactor3d",          // 197
    "findnearactor3dvar",       // 198
    "flash",                    // 199
    "qspawnvar",                // 200
    "eqspawn",                  // 201
    "eqspawnvar",               // 202
    "minitext",                 // 203
    "gametext",                 // 204
    "digitalnumber",            // 205
    "addweaponvar",             // 206
    "setprojectile",            // 207
    "angoff",                   // 208
    "updatesector",             // 209
    "insertspriteq",            // 210
    "angoffvar",                // 211
    "whilevarn",                // 212
    "switch",                   // 213
    "case",                     // 214
    "default",                  // 215
    "endswitch",                // 216
    "shootvar",                 // 217
    "soundvar",                 // 218
    "findplayer",               // 219
    "findotherplayer",          // 220
    "activatebysector",         // 221 sectnum, spriteid
    "operatesectors",           // 222 sectnum, spriteid
    "operaterespawns",          // 223 lotag
    "operateactivators",        // 224 lotag, player index
    "operatemasterswitches",    // 225 lotag
    "checkactivatormotion",     // 226 lotag
    "zshoot",                   // 227 zvar projnum
    "dist",                     // 228 sprite1 sprite2
    "ldist",                    // 229 sprite1 sprite2
    "shiftvarl",                // 230
    "shiftvarr",                // 231
    "spritenvg",                // 232
    "getangle",                 // 233
    "whilevarvarn",             // 234
    "hitscan",                  // 235
    "time",                     // 236
    "getplayervar",             // 237
    "setplayervar",             // 238
    "mulscale",                 // 239
    "setaspect",                // 240
    "ezshoot",                  // 241
    "spritenoshade",            // 242
    "movesprite",               // 243
    "checkavailweapon",         // 244
    "soundoncevar",             // 245
    "updatesectorz",            // 246
    "stopallsounds",            // 247
    "ssp",                      // 248
    "stopsoundvar",             // 249
    "displayrandvar",           // 250
    "displayrandvarvar",        // 251
    "checkavailinven",          // 252
    "globalsoundvar",           // 253
    "guniqhudid",               // 254
    "getprojectile",            // 255
    "getthisprojectile",        // 256
    "setthisprojectile",        // 257
    "definecheat",              // 258
    "cheatkeys",                // 259
    "userquote",                // 260
    "precache",                 // 261
    "definegamefuncname",       // 262
    "redefinequote",            // 263
    "qsprintf",                 // 264
    "getpname",                 // 265
    "qstrcat",                  // 266
    "qstrcpy",                  // 267
    "setsprite",                // 268
    "rotatepoint",              // 269
    "dragpoint",                // 270
    "getzrange",                // 271
    "changespritestat",         // 272
    "getceilzofslope",          // 273
    "getflorzofslope",          // 274
    "neartag",                  // 275
    "definegametype",           // 276
    "changespritesect",         // 277
    "spriteflags",              // 278
    "savegamevar",              // 279
    "readgamevar",              // 280
    "findnearsprite",           // 281
    "findnearspritevar",        // 282
    "findnearsprite3d",         // 283
    "findnearsprite3dvar",      // 284
    "dynamicremap",             // 285
    "setinput",                 // 286
    "getinput",                 // 287
    "save",                     // 288
    "cansee",                   // 289  Beginning EDuke32 SVN
    "canseespr",                // 290
    "findnearactorz",           // 291
    "findnearactorzvar",        // 292
    "findnearspritez",          // 293
    "findnearspritezvar",       // 294
    "zshootvar",                // 295
    "ezshootvar",               // 296
    "getcurraddress",           // 297
    "jump",                     // 298
    "qstrlen",                  // 299
    "getincangle",              // 300
    "quake",                    // 301
    "showview",                 // 302
    "headspritestat",           // 303
    "prevspritestat",           // 304
    "nextspritestat",           // 305
    "headspritesect",           // 306
    "prevspritesect",           // 307
    "nextspritesect",           // 308
    "getkeyname",               // 309
    "qsubstr",                  // 310
    "gametextz",                // 311
    "digitalnumberz",           // 312
    "spritenopal",              // 313
    "hitradiusvar",             // 314
    "rotatesprite16",           // 315
    "gamearray",                // 316
    "setarray",                 // 317
    "resizearray",              // 318
    "writearraytofile",         // 319
    "readarrayfromfile",        // 320
    "starttrackvar",            // 321
    "qgetsysstr",               // 322
    "getticks",                 // 323
    "gettspr",                  // 324
    "settspr",                  // 325
    "savemapstate",             // 326
    "loadmapstate",             // 327
    "clearmapstate",            // 328
    "scriptsize",               // 329
    "setgamename",              // 330
    "cmenu",                    // 331
    "gettimedate",              // 332
    "activatecheat",            // 333
    "setgamepalette",           // 334
    "setdefname",               // 335
    "setcfgname",               // 336
    "ifvaror",                  // 337
    "ifvarvaror",               // 338
    "ifvarxor",                 // 339
    "ifvarvarxor",              // 340
    "ifvareither",              // 341
    "ifvarvareither",           // 342
    "getarraysize",             // 343
    "savenn",                   // 344
    "copy",                     // 345
    "<null>",                   // 346 internal inversion function
    "sectorofwall",             // 347
    "qstrncat",                 // 348
    "ifactorsound",             // 349
    "stopactorsound",           // 350
    "ifclient",                 // 351
    "ifserver",                 // 352
    "sectsetinterpolation",     // 353
    "sectclearinterpolation",   // 354
    "clipmove",                 // 355
    "lineintersect",            // 356
    "rayintersect",             // 357
    "calchypotenuse",           // 358
    "clipmovenoslide",          // 359
    "includedefault",           // 360
    "setactorsoundpitch",       // 361
    "echo",                     // 362
    "showviewunbiased",         // 363
    "rotatespritea",            // 364
    "shadeto",                  // 365
    "endoflevel",               // 366
    "ifplayersl",               // 367
    "activate",                 // 368
    "qstrdim",                  // 369
    "screentext",               // 370
    "dynamicsoundremap",        // 371
    "screensound",              // 372
    "<null>"
];
NUMKEYWORDS = keyw.length;
//    "<null>"
//};
//#endif

// KEEPINSYNC with enum GameEvent_t and lunatic/con_lang.lua
var EventNames/*[MAXEVENTS]*/ =
[
    "EVENT_INIT",
    "EVENT_ENTERLEVEL",
    "EVENT_RESETWEAPONS",
    "EVENT_RESETINVENTORY",
    "EVENT_HOLSTER",
    "EVENT_LOOKLEFT",
    "EVENT_LOOKRIGHT",
    "EVENT_SOARUP",
    "EVENT_SOARDOWN",
    "EVENT_CROUCH",
    "EVENT_JUMP",
    "EVENT_RETURNTOCENTER",
    "EVENT_LOOKUP",
    "EVENT_LOOKDOWN",
    "EVENT_AIMUP",
    "EVENT_FIRE",
    "EVENT_CHANGEWEAPON",
    "EVENT_GETSHOTRANGE",
    "EVENT_GETAUTOAIMANGLE",
    "EVENT_GETLOADTILE",
    "EVENT_CHEATGETSTEROIDS",
    "EVENT_CHEATGETHEAT",
    "EVENT_CHEATGETBOOT",
    "EVENT_CHEATGETSHIELD",
    "EVENT_CHEATGETSCUBA",
    "EVENT_CHEATGETHOLODUKE",
    "EVENT_CHEATGETJETPACK",
    "EVENT_CHEATGETFIRSTAID",
    "EVENT_QUICKKICK",
    "EVENT_INVENTORY",
    "EVENT_USENIGHTVISION",
    "EVENT_USESTEROIDS",
    "EVENT_INVENTORYLEFT",
    "EVENT_INVENTORYRIGHT",
    "EVENT_HOLODUKEON",
    "EVENT_HOLODUKEOFF",
    "EVENT_USEMEDKIT",
    "EVENT_USEJETPACK",
    "EVENT_TURNAROUND",
    "EVENT_DISPLAYWEAPON",
    "EVENT_FIREWEAPON",
    "EVENT_SELECTWEAPON",
    "EVENT_MOVEFORWARD",
    "EVENT_MOVEBACKWARD",
    "EVENT_TURNLEFT",
    "EVENT_TURNRIGHT",
    "EVENT_STRAFELEFT",
    "EVENT_STRAFERIGHT",
    "EVENT_WEAPKEY1",
    "EVENT_WEAPKEY2",
    "EVENT_WEAPKEY3",
    "EVENT_WEAPKEY4",
    "EVENT_WEAPKEY5",
    "EVENT_WEAPKEY6",
    "EVENT_WEAPKEY7",
    "EVENT_WEAPKEY8",
    "EVENT_WEAPKEY9",
    "EVENT_WEAPKEY10",
    "EVENT_DRAWWEAPON",
    "EVENT_DISPLAYCROSSHAIR",
    "EVENT_DISPLAYREST",
    "EVENT_DISPLAYSBAR",
    "EVENT_RESETPLAYER",
    "EVENT_INCURDAMAGE",
    "EVENT_AIMDOWN",
    "EVENT_GAME",
    "EVENT_PREVIOUSWEAPON",
    "EVENT_NEXTWEAPON",
    "EVENT_SWIMUP",
    "EVENT_SWIMDOWN",
    "EVENT_GETMENUTILE",
    "EVENT_SPAWN",
    "EVENT_LOGO",
    "EVENT_EGS",
    "EVENT_DOFIRE",
    "EVENT_PRESSEDFIRE",
    "EVENT_USE",
    "EVENT_PROCESSINPUT",
    "EVENT_FAKEDOMOVETHINGS",
    "EVENT_DISPLAYROOMS",
    "EVENT_KILLIT",
    "EVENT_LOADACTOR",
    "EVENT_DISPLAYBONUSSCREEN",
    "EVENT_DISPLAYMENU",
    "EVENT_DISPLAYMENUREST",
    "EVENT_DISPLAYLOADINGSCREEN",
    "EVENT_ANIMATESPRITES",
    "EVENT_NEWGAME",
    "EVENT_SOUND",
    "EVENT_CHECKTOUCHDAMAGE",
    "EVENT_CHECKFLOORDAMAGE",
    "EVENT_LOADGAME",
    "EVENT_SAVEGAME",
    "EVENT_PREGAME",
    "EVENT_CHANGEMENU"
];
assert.areEqual(MAXEVENTS, EventNames.length);

//#if !defined LUNATIC
var SectorLabels : memberlabel_t[]=
[
    new memberlabel_t("wallptr", SECTOR_WALLPTR, 0, 0 ),
    new memberlabel_t("wallnum", SECTOR_WALLNUM, 0, 0 ),
    new memberlabel_t("ceilingz", SECTOR_CEILINGZ, 0, 0 ),
    new memberlabel_t("floorz", SECTOR_FLOORZ, 0, 0 ),
    new memberlabel_t("ceilingstat", SECTOR_CEILINGSTAT, 0, 0 ),
    new memberlabel_t("floorstat", SECTOR_FLOORSTAT, 0, 0 ),
    new memberlabel_t("ceilingpicnum", SECTOR_CEILINGPICNUM, 0, 0 ),
    new memberlabel_t("ceilingslope", SECTOR_CEILINGSLOPE, 0, 0 ),
    new memberlabel_t("ceilingshade", SECTOR_CEILINGSHADE, 0, 0 ),
    new memberlabel_t("ceilingpal", SECTOR_CEILINGPAL, 0, 0 ),
    new memberlabel_t("ceilingxpanning", SECTOR_CEILINGXPANNING, 0, 0 ),
    new memberlabel_t("ceilingypanning", SECTOR_CEILINGYPANNING, 0, 0 ),
    new memberlabel_t("floorpicnum", SECTOR_FLOORPICNUM, 0, 0 ),
    new memberlabel_t("floorslope", SECTOR_FLOORSLOPE, 0, 0 ),
    new memberlabel_t("floorshade", SECTOR_FLOORSHADE, 0, 0 ),
    new memberlabel_t("floorpal", SECTOR_FLOORPAL, 0, 0 ),
    new memberlabel_t("floorxpanning", SECTOR_FLOORXPANNING, 0, 0 ),
    new memberlabel_t("floorypanning", SECTOR_FLOORYPANNING, 0, 0 ),
    new memberlabel_t("visibility", SECTOR_VISIBILITY, 0, 0 ),
//    { "filler", SECTOR_ALIGNTO, 0, 0 ),
    new memberlabel_t( "alignto", SECTOR_ALIGNTO, 0, 0 ), // aka filler, not used
    new memberlabel_t( "lotag", SECTOR_LOTAG, 0, 0 ),
    new memberlabel_t( "hitag", SECTOR_HITAG, 0, 0 ),
    new memberlabel_t( "extra", SECTOR_EXTRA, 0, 0 ),
    new memberlabel_t( "ceilingbunch", SECTOR_CEILINGBUNCH, 0, 0 ),
    new memberlabel_t( "floorbunch", SECTOR_FLOORBUNCH, 0, 0 ),
    new memberlabel_t( "ulotag", SECTOR_ULOTAG, 0, 0 ),
    new memberlabel_t( "uhitag", SECTOR_UHITAG, 0, 0 ),
    new memberlabel_t( "", -1, 0, 0  )     // END OF LIST
];

var  WallLabels : memberlabel_t[] =
[
    new memberlabel_t( "x", WALL_X, 0, 0 ),
    new memberlabel_t( "y", WALL_Y, 0, 0 ),
    new memberlabel_t( "point2", WALL_POINT2, 0, 0 ),
    new memberlabel_t( "nextwall", WALL_NEXTWALL, 0, 0 ),
    new memberlabel_t( "nextsector", WALL_NEXTSECTOR, 0, 0 ),
    new memberlabel_t( "cstat", WALL_CSTAT, 0, 0 ),
    new memberlabel_t( "picnum", WALL_PICNUM, 0, 0 ),
    new memberlabel_t( "overpicnum", WALL_OVERPICNUM, 0, 0 ),
    new memberlabel_t( "shade", WALL_SHADE, 0, 0 ),
    new memberlabel_t( "pal", WALL_PAL, 0, 0 ),
    new memberlabel_t( "xrepeat", WALL_XREPEAT, 0, 0 ),
    new memberlabel_t( "yrepeat", WALL_YREPEAT, 0, 0 ),
    new memberlabel_t( "xpanning", WALL_XPANNING, 0, 0 ),
    new memberlabel_t( "ypanning", WALL_YPANNING, 0, 0 ),
    new memberlabel_t( "lotag", WALL_LOTAG, 0, 0 ),
    new memberlabel_t( "hitag", WALL_HITAG, 0, 0 ),
    new memberlabel_t( "extra", WALL_EXTRA, 0, 0 ),
    new memberlabel_t( "ulotag", WALL_ULOTAG, 0, 0 ),
    new memberlabel_t( "uhitag", WALL_UHITAG, 0, 0 ),
    new memberlabel_t( "", -1, 0, 0  )     // END OF LIST
];

var ActorLabels : memberlabel_t[]=
[
    new memberlabel_t( "x", ACTOR_X, 0, 0 ),
    new memberlabel_t( "y", ACTOR_Y, 0, 0 ),
    new memberlabel_t( "z", ACTOR_Z, 0, 0 ),
    new memberlabel_t( "cstat", ACTOR_CSTAT, 0, 0 ),
    new memberlabel_t( "picnum", ACTOR_PICNUM, 0, 0 ),
    new memberlabel_t( "shade", ACTOR_SHADE, 0, 0 ),
    new memberlabel_t( "pal", ACTOR_PAL, 0, 0 ),
    new memberlabel_t( "clipdist", ACTOR_CLIPDIST, 0, 0 ),
//    new memberlabel_t( "filler", ACTOR_DETAIL, 0, 0 ),
    new memberlabel_t( "detail", ACTOR_DETAIL, 0, 0 ), // aka filler, not used
    new memberlabel_t( "xrepeat", ACTOR_XREPEAT, 0, 0 ),
    new memberlabel_t( "yrepeat", ACTOR_YREPEAT, 0, 0 ),
    new memberlabel_t( "xoffset", ACTOR_XOFFSET, 0, 0 ),
    new memberlabel_t( "yoffset", ACTOR_YOFFSET, 0, 0 ),
    new memberlabel_t( "sectnum", ACTOR_SECTNUM, 0, 0 ),
    new memberlabel_t( "statnum", ACTOR_STATNUM, 0, 0 ),
    new memberlabel_t( "ang", ACTOR_ANG, 0, 0 ),
    new memberlabel_t( "owner", ACTOR_OWNER, 0, 0 ),
    new memberlabel_t( "xvel", ACTOR_XVEL, 0, 0 ),
    new memberlabel_t( "yvel", ACTOR_YVEL, 0, 0 ),
    new memberlabel_t( "zvel", ACTOR_ZVEL, 0, 0 ),
    new memberlabel_t( "lotag", ACTOR_LOTAG, 0, 0 ),
    new memberlabel_t( "hitag", ACTOR_HITAG, 0, 0 ),
    new memberlabel_t( "extra", ACTOR_EXTRA, 0, 0 ),

    // ActorExtra labels...
    new memberlabel_t( "htcgg", ACTOR_HTCGG, 0, 0 ),
    new memberlabel_t( "htpicnum", ACTOR_HTPICNUM, 0, 0 ),
    new memberlabel_t( "htang", ACTOR_HTANG, 0, 0 ),
    new memberlabel_t( "htextra", ACTOR_HTEXTRA, 0, 0 ),
    new memberlabel_t( "htowner", ACTOR_HTOWNER, 0, 0 ),
    new memberlabel_t( "htmovflag", ACTOR_HTMOVFLAG, 0, 0 ),
    new memberlabel_t( "httempang", ACTOR_HTTEMPANG, 0, 0 ),
    new memberlabel_t( "htactorstayput", ACTOR_HTACTORSTAYPUT, 0, 0 ),
    new memberlabel_t( "htdispicnum", ACTOR_HTDISPICNUM, 0, 0 ),
    new memberlabel_t( "httimetosleep", ACTOR_HTTIMETOSLEEP, 0, 0 ),
    new memberlabel_t( "htfloorz", ACTOR_HTFLOORZ, 0, 0 ),
    new memberlabel_t( "htceilingz", ACTOR_HTCEILINGZ, 0, 0 ),
    new memberlabel_t( "htlastvx", ACTOR_HTLASTVX, 0, 0 ),
    new memberlabel_t( "htlastvy", ACTOR_HTLASTVY, 0, 0 ),
    new memberlabel_t( "htbposx", ACTOR_HTBPOSX, 0, 0 ),
    new memberlabel_t( "htbposy", ACTOR_HTBPOSY, 0, 0 ),
    new memberlabel_t( "htbposz", ACTOR_HTBPOSZ, 0, 0 ),
    new memberlabel_t( "htg_t", ACTOR_HTG_T, LABEL_HASPARM2, 10 ),

    // model flags

    new memberlabel_t( "angoff", ACTOR_ANGOFF, 0, 0 ),
    new memberlabel_t( "pitch", ACTOR_PITCH, 0, 0 ),
    new memberlabel_t( "roll", ACTOR_ROLL, 0, 0 ),
    new memberlabel_t( "mdxoff", ACTOR_MDXOFF, 0, 0 ),
    new memberlabel_t( "mdyoff", ACTOR_MDYOFF, 0, 0 ),
    new memberlabel_t( "mdzoff", ACTOR_MDZOFF, 0, 0 ),
    new memberlabel_t( "mdflags", ACTOR_MDFLAGS, 0, 0 ),
    new memberlabel_t( "xpanning", ACTOR_XPANNING, 0, 0 ),
    new memberlabel_t( "ypanning", ACTOR_YPANNING, 0, 0 ),

    new memberlabel_t( "htflags", ACTOR_HTFLAGS, 0, 0 ),

    new memberlabel_t( "alpha", ACTOR_ALPHA, 0, 0 ),

    new memberlabel_t( "ulotag", ACTOR_ULOTAG, 0, 0 ),
    new memberlabel_t( "uhitag", ACTOR_UHITAG, 0, 0 ),

    new memberlabel_t( "", -1, 0, 0  )     // END OF LIST
];

var TsprLabels : memberlabel_t[]=
[
    // tsprite access

    new memberlabel_t( "tsprx", ACTOR_X, 0, 0 ),
    new memberlabel_t( "tspry", ACTOR_Y, 0, 0 ),
    new memberlabel_t( "tsprz", ACTOR_Z, 0, 0 ),
    new memberlabel_t( "tsprcstat", ACTOR_CSTAT, 0, 0 ),
    new memberlabel_t( "tsprpicnum", ACTOR_PICNUM, 0, 0 ),
    new memberlabel_t( "tsprshade", ACTOR_SHADE, 0, 0 ),
    new memberlabel_t( "tsprpal", ACTOR_PAL, 0, 0 ),
    new memberlabel_t( "tsprclipdist", ACTOR_CLIPDIST, 0, 0 ),
//    new memberlabel_t( "tsprfiller", ACTOR_DETAIL, 0, 0 ),
    new memberlabel_t( "tsprdetail", ACTOR_DETAIL, 0, 0 ), // aka filler, not used
    new memberlabel_t( "tsprxrepeat", ACTOR_XREPEAT, 0, 0 ),
    new memberlabel_t( "tspryrepeat", ACTOR_YREPEAT, 0, 0 ),
    new memberlabel_t( "tsprxoffset", ACTOR_XOFFSET, 0, 0 ),
    new memberlabel_t( "tspryoffset", ACTOR_YOFFSET, 0, 0 ),
    new memberlabel_t( "tsprsectnum", ACTOR_SECTNUM, 0, 0 ),
    new memberlabel_t( "tsprstatnum", ACTOR_STATNUM, 0, 0 ),
    new memberlabel_t( "tsprang", ACTOR_ANG, 0, 0 ),
    new memberlabel_t( "tsprowner", ACTOR_OWNER, 0, 0 ),
//#if 1
    new memberlabel_t( "tsprxvel", ACTOR_XVEL, 0, 0 ),
    new memberlabel_t( "tspryvel", ACTOR_YVEL, 0, 0 ),
    new memberlabel_t( "tsprzvel", ACTOR_ZVEL, 0, 0 ),
    new memberlabel_t( "tsprlotag", ACTOR_LOTAG, 0, 0 ),
    new memberlabel_t( "tsprhitag", ACTOR_HITAG, 0, 0 ),
    new memberlabel_t( "tsprextra", ACTOR_EXTRA, 0, 0 ),
//#endif

    new memberlabel_t( "", -1, 0, 0  )     // END OF LIST
];

var PlayerLabels : memberlabel_t[]=
[
    new memberlabel_t( "zoom", PLAYER_ZOOM, 0, 0 ),
    new memberlabel_t( "exitx", PLAYER_EXITX, 0, 0 ),
    new memberlabel_t( "exity", PLAYER_EXITY, 0, 0 ),
    new memberlabel_t( "loogiex", PLAYER_LOOGIEX, LABEL_HASPARM2, 64 ),
    new memberlabel_t( "loogiey", PLAYER_LOOGIEY, LABEL_HASPARM2, 64 ),
    new memberlabel_t( "numloogs", PLAYER_NUMLOOGS, 0, 0 ),
    new memberlabel_t( "loogcnt", PLAYER_LOOGCNT, 0, 0 ),
    new memberlabel_t( "posx", PLAYER_POSX, 0, 0 ),
    new memberlabel_t( "posy", PLAYER_POSY, 0, 0 ),
    new memberlabel_t( "posz", PLAYER_POSZ, 0, 0 ),
    new memberlabel_t( "horiz", PLAYER_HORIZ, 0, 0 ),
    new memberlabel_t( "ohoriz", PLAYER_OHORIZ, 0, 0 ),
    new memberlabel_t( "ohorizoff", PLAYER_OHORIZOFF, 0, 0 ),
    new memberlabel_t( "invdisptime", PLAYER_INVDISPTIME, 0, 0 ),
    new memberlabel_t( "bobposx", PLAYER_BOBPOSX, 0, 0 ),
    new memberlabel_t( "bobposy", PLAYER_BOBPOSY, 0, 0 ),
    new memberlabel_t( "oposx", PLAYER_OPOSX, 0, 0 ),
    new memberlabel_t( "oposy", PLAYER_OPOSY, 0, 0 ),
    new memberlabel_t( "oposz", PLAYER_OPOSZ, 0, 0 ),
    new memberlabel_t( "pyoff", PLAYER_PYOFF, 0, 0 ),
    new memberlabel_t( "opyoff", PLAYER_OPYOFF, 0, 0 ),
    new memberlabel_t( "posxv", PLAYER_POSXV, 0, 0 ),
    new memberlabel_t( "posyv", PLAYER_POSYV, 0, 0 ),
    new memberlabel_t( "poszv", PLAYER_POSZV, 0, 0 ),
    new memberlabel_t( "last_pissed_time", PLAYER_LAST_PISSED_TIME, 0, 0 ),
    new memberlabel_t( "truefz", PLAYER_TRUEFZ, 0, 0 ),
    new memberlabel_t( "truecz", PLAYER_TRUECZ, 0, 0 ),
    new memberlabel_t( "player_par", PLAYER_PLAYER_PAR, 0, 0 ),
    new memberlabel_t( "visibility", PLAYER_VISIBILITY, 0, 0 ),
    new memberlabel_t( "bobcounter", PLAYER_BOBCOUNTER, 0, 0 ),
    new memberlabel_t( "weapon_sway", PLAYER_WEAPON_SWAY, 0, 0 ),
    new memberlabel_t( "pals_time", PLAYER_PALS_TIME, 0, 0 ),
    new memberlabel_t( "randomflamex", PLAYER_RANDOMFLAMEX, 0, 0 ),
    new memberlabel_t( "crack_time", PLAYER_CRACK_TIME, 0, 0 ),
    new memberlabel_t( "aim_mode", PLAYER_AIM_MODE, 0, 0 ),
    new memberlabel_t( "ang", PLAYER_ANG, 0, 0 ),
    new memberlabel_t( "oang", PLAYER_OANG, 0, 0 ),
    new memberlabel_t( "angvel", PLAYER_ANGVEL, 0, 0 ),
    new memberlabel_t( "cursectnum", PLAYER_CURSECTNUM, 0, 0 ),
    new memberlabel_t( "look_ang", PLAYER_LOOK_ANG, 0, 0 ),
    new memberlabel_t( "last_extra", PLAYER_LAST_EXTRA, 0, 0 ),
    new memberlabel_t( "subweapon", PLAYER_SUBWEAPON, 0, 0 ),
    new memberlabel_t( "ammo_amount", PLAYER_AMMO_AMOUNT, LABEL_HASPARM2, MAX_WEAPONS ),
    new memberlabel_t( "wackedbyactor", PLAYER_WACKEDBYACTOR, 0, 0 ),
    new memberlabel_t( "frag", PLAYER_FRAG, 0, 0 ),
    new memberlabel_t( "fraggedself", PLAYER_FRAGGEDSELF, 0, 0 ),
    new memberlabel_t( "curr_weapon", PLAYER_CURR_WEAPON, 0, 0 ),
    new memberlabel_t( "last_weapon", PLAYER_LAST_WEAPON, 0, 0 ),
    new memberlabel_t( "tipincs", PLAYER_TIPINCS, 0, 0 ),
    new memberlabel_t( "horizoff", PLAYER_HORIZOFF, 0, 0 ),
    new memberlabel_t( "wantweaponfire", PLAYER_WANTWEAPONFIRE, 0, 0 ),
    new memberlabel_t( "holoduke_amount", PLAYER_HOLODUKE_AMOUNT, 0, 0 ),
    new memberlabel_t( "newowner", PLAYER_NEWOWNER, 0, 0 ),
    new memberlabel_t( "hurt_delay", PLAYER_HURT_DELAY, 0, 0 ),
    new memberlabel_t( "hbomb_hold_delay", PLAYER_HBOMB_HOLD_DELAY, 0, 0 ),
    new memberlabel_t( "jumping_counter", PLAYER_JUMPING_COUNTER, 0, 0 ),
    new memberlabel_t( "airleft", PLAYER_AIRLEFT, 0, 0 ),
    new memberlabel_t( "knee_incs", PLAYER_KNEE_INCS, 0, 0 ),
    new memberlabel_t( "access_incs", PLAYER_ACCESS_INCS, 0, 0 ),
    new memberlabel_t( "fta", PLAYER_FTA, 0, 0 ),
    new memberlabel_t( "ftq", PLAYER_FTQ, 0, 0 ),
    new memberlabel_t( "access_wallnum", PLAYER_ACCESS_WALLNUM, 0, 0 ),
    new memberlabel_t( "access_spritenum", PLAYER_ACCESS_SPRITENUM, 0, 0 ),
    new memberlabel_t( "kickback_pic", PLAYER_KICKBACK_PIC, 0, 0 ),
    new memberlabel_t( "got_access", PLAYER_GOT_ACCESS, 0, 0 ),
    new memberlabel_t( "weapon_ang", PLAYER_WEAPON_ANG, 0, 0 ),
    new memberlabel_t( "firstaid_amount", PLAYER_FIRSTAID_AMOUNT, 0, 0 ),
    new memberlabel_t( "somethingonplayer", PLAYER_SOMETHINGONPLAYER, 0, 0 ),
    new memberlabel_t( "on_crane", PLAYER_ON_CRANE, 0, 0 ),
    new memberlabel_t( "i", PLAYER_I, 0, 0 ),
    new memberlabel_t( "one_parallax_sectnum", PLAYER_ONE_PARALLAX_SECTNUM, 0, 0 ),
    new memberlabel_t( "over_shoulder_on", PLAYER_OVER_SHOULDER_ON, 0, 0 ),
    new memberlabel_t( "random_club_frame", PLAYER_RANDOM_CLUB_FRAME, 0, 0 ),
    new memberlabel_t( "fist_incs", PLAYER_FIST_INCS, 0, 0 ),
    new memberlabel_t( "one_eighty_count", PLAYER_ONE_EIGHTY_COUNT, 0, 0 ),
    new memberlabel_t( "cheat_phase", PLAYER_CHEAT_PHASE, 0, 0 ),
    new memberlabel_t( "dummyplayersprite", PLAYER_DUMMYPLAYERSPRITE, 0, 0 ),
    new memberlabel_t( "extra_extra8", PLAYER_EXTRA_EXTRA8, 0, 0 ),
    new memberlabel_t( "quick_kick", PLAYER_QUICK_KICK, 0, 0 ),
    new memberlabel_t( "heat_amount", PLAYER_HEAT_AMOUNT, 0, 0 ),
    new memberlabel_t( "actorsqu", PLAYER_ACTORSQU, 0, 0 ),
    new memberlabel_t( "timebeforeexit", PLAYER_TIMEBEFOREEXIT, 0, 0 ),
    new memberlabel_t( "customexitsound", PLAYER_CUSTOMEXITSOUND, 0, 0 ),
    new memberlabel_t( "weaprecs", PLAYER_WEAPRECS, LABEL_HASPARM2, MAX_WEAPONS ),
    new memberlabel_t( "weapreccnt", PLAYER_WEAPRECCNT, 0, 0 ),
    new memberlabel_t( "interface_toggle_flag", PLAYER_INTERFACE_TOGGLE_FLAG, 0, 0 ),
    new memberlabel_t( "rotscrnang", PLAYER_ROTSCRNANG, 0, 0 ),
    new memberlabel_t( "dead_flag", PLAYER_DEAD_FLAG, 0, 0 ),
    new memberlabel_t( "show_empty_weapon", PLAYER_SHOW_EMPTY_WEAPON, 0, 0 ),
    new memberlabel_t( "scuba_amount", PLAYER_SCUBA_AMOUNT, 0, 0 ),
    new memberlabel_t( "jetpack_amount", PLAYER_JETPACK_AMOUNT, 0, 0 ),
    new memberlabel_t( "steroids_amount", PLAYER_STEROIDS_AMOUNT, 0, 0 ),
    new memberlabel_t( "shield_amount", PLAYER_SHIELD_AMOUNT, 0, 0 ),
    new memberlabel_t( "holoduke_on", PLAYER_HOLODUKE_ON, 0, 0 ),
    new memberlabel_t( "pycount", PLAYER_PYCOUNT, 0, 0 ),
    new memberlabel_t( "weapon_pos", PLAYER_WEAPON_POS, 0, 0 ),
    new memberlabel_t( "frag_ps", PLAYER_FRAG_PS, 0, 0 ),
    new memberlabel_t( "transporter_hold", PLAYER_TRANSPORTER_HOLD, 0, 0 ),
    new memberlabel_t( "last_full_weapon", PLAYER_LAST_FULL_WEAPON, 0, 0 ),
    new memberlabel_t( "footprintshade", PLAYER_FOOTPRINTSHADE, 0, 0 ),
    new memberlabel_t( "boot_amount", PLAYER_BOOT_AMOUNT, 0, 0 ),
    new memberlabel_t( "scream_voice", PLAYER_SCREAM_VOICE, 0, 0 ),
    new memberlabel_t( "gm", PLAYER_GM, 0, 0 ),
    new memberlabel_t( "on_warping_sector", PLAYER_ON_WARPING_SECTOR, 0, 0 ),
    new memberlabel_t( "footprintcount", PLAYER_FOOTPRINTCOUNT, 0, 0 ),
    new memberlabel_t( "hbomb_on", PLAYER_HBOMB_ON, 0, 0 ),
    new memberlabel_t( "jumping_toggle", PLAYER_JUMPING_TOGGLE, 0, 0 ),
    new memberlabel_t( "rapid_fire_hold", PLAYER_RAPID_FIRE_HOLD, 0, 0 ),
    new memberlabel_t( "on_ground", PLAYER_ON_GROUND, 0, 0 ),
    new memberlabel_t( "name", PLAYER_NAME,  LABEL_ISSTRING, 32 ),
    new memberlabel_t( "inven_icon", PLAYER_INVEN_ICON, 0, 0 ),
    new memberlabel_t( "buttonpalette", PLAYER_BUTTONPALETTE, 0, 0 ),
    new memberlabel_t( "jetpack_on", PLAYER_JETPACK_ON, 0, 0 ),
    new memberlabel_t( "spritebridge", PLAYER_SPRITEBRIDGE, 0, 0 ),
    new memberlabel_t( "lastrandomspot", PLAYER_LASTRANDOMSPOT, 0, 0 ),
    new memberlabel_t( "scuba_on", PLAYER_SCUBA_ON, 0, 0 ),
    new memberlabel_t( "footprintpal", PLAYER_FOOTPRINTPAL, 0, 0 ),
    new memberlabel_t( "heat_on", PLAYER_HEAT_ON, 0, 0 ),
    new memberlabel_t( "holster_weapon", PLAYER_HOLSTER_WEAPON, 0, 0 ),
    new memberlabel_t( "falling_counter", PLAYER_FALLING_COUNTER, 0, 0 ),
    new memberlabel_t( "gotweapon", PLAYER_GOTWEAPON, LABEL_HASPARM2, MAX_WEAPONS ),
    new memberlabel_t( "refresh_inventory", PLAYER_REFRESH_INVENTORY, 0, 0 ),
    new memberlabel_t( "palette", PLAYER_PALETTE, 0, 0 ),
    new memberlabel_t( "toggle_key_flag", PLAYER_TOGGLE_KEY_FLAG, 0, 0 ),
    new memberlabel_t( "knuckle_incs", PLAYER_KNUCKLE_INCS, 0, 0 ),
    new memberlabel_t( "walking_snd_toggle", PLAYER_WALKING_SND_TOGGLE, 0, 0 ),
    new memberlabel_t( "palookup", PLAYER_PALOOKUP, 0, 0 ),
    new memberlabel_t( "hard_landing", PLAYER_HARD_LANDING, 0, 0 ),
    new memberlabel_t( "max_secret_rooms", PLAYER_MAX_SECRET_ROOMS, 0, 0 ),
    new memberlabel_t( "secret_rooms", PLAYER_SECRET_ROOMS, 0, 0 ),
    new memberlabel_t( "pals", PLAYER_PALS, LABEL_HASPARM2, 3 ),
    new memberlabel_t( "max_actors_killed", PLAYER_MAX_ACTORS_KILLED, 0, 0 ),
    new memberlabel_t( "actors_killed", PLAYER_ACTORS_KILLED, 0, 0 ),
    new memberlabel_t( "return_to_center", PLAYER_RETURN_TO_CENTER, 0, 0 ),
    new memberlabel_t( "runspeed", PLAYER_RUNSPEED, 0, 0 ),
    new memberlabel_t( "sbs", PLAYER_SBS, 0, 0 ),
    new memberlabel_t( "reloading", PLAYER_RELOADING, 0, 0 ),
    new memberlabel_t( "auto_aim", PLAYER_AUTO_AIM, 0, 0 ),
    new memberlabel_t( "movement_lock", PLAYER_MOVEMENT_LOCK, 0, 0 ),
    new memberlabel_t( "sound_pitch", PLAYER_SOUND_PITCH, 0, 0 ),
    new memberlabel_t( "weaponswitch", PLAYER_WEAPONSWITCH, 0, 0 ),
    new memberlabel_t( "team", PLAYER_TEAM, 0, 0 ),
    new memberlabel_t( "max_player_health", PLAYER_MAX_PLAYER_HEALTH, 0, 0 ),
    new memberlabel_t( "max_shield_amount", PLAYER_MAX_SHIELD_AMOUNT, 0, 0 ),
    new memberlabel_t( "max_ammo_amount", PLAYER_MAX_AMMO_AMOUNT, LABEL_HASPARM2, MAX_WEAPONS ),
    new memberlabel_t( "last_quick_kick", PLAYER_LAST_QUICK_KICK, 0, 0 ),
    new memberlabel_t( "autostep", PLAYER_AUTOSTEP, 0, 0 ),
    new memberlabel_t( "autostep_sbw", PLAYER_AUTOSTEP_SBW, 0, 0 ),
    new memberlabel_t( "", -1, 0, 0  )     // END OF LIST
];

var ProjectileLabels  : memberlabel_t[] =
[
    new memberlabel_t( "workslike", PROJ_WORKSLIKE, 0, 0 ),
    new memberlabel_t( "spawns", PROJ_SPAWNS, 0, 0 ),
    new memberlabel_t( "sxrepeat", PROJ_SXREPEAT, 0, 0 ),
    new memberlabel_t( "syrepeat", PROJ_SYREPEAT, 0, 0 ),
    new memberlabel_t( "sound", PROJ_SOUND, 0, 0 ),
    new memberlabel_t( "isound", PROJ_ISOUND, 0, 0 ),
    new memberlabel_t( "vel", PROJ_VEL, 0, 0 ),
    new memberlabel_t( "extra", PROJ_EXTRA, 0, 0 ),
    new memberlabel_t( "decal", PROJ_DECAL, 0, 0 ),
    new memberlabel_t( "trail", PROJ_TRAIL, 0, 0 ),
    new memberlabel_t( "txrepeat", PROJ_TXREPEAT, 0, 0 ),
    new memberlabel_t( "tyrepeat", PROJ_TYREPEAT, 0, 0 ),
    new memberlabel_t( "toffset", PROJ_TOFFSET, 0, 0 ),
    new memberlabel_t( "tnum", PROJ_TNUM, 0, 0 ),
    new memberlabel_t( "drop", PROJ_DROP, 0, 0 ),
    new memberlabel_t( "cstat", PROJ_CSTAT, 0, 0 ),
    new memberlabel_t( "clipdist", PROJ_CLIPDIST, 0, 0 ),
    new memberlabel_t( "shade", PROJ_SHADE, 0, 0 ),
    new memberlabel_t( "xrepeat", PROJ_XREPEAT, 0, 0 ),
    new memberlabel_t( "yrepeat", PROJ_YREPEAT, 0, 0 ),
    new memberlabel_t( "pal", PROJ_PAL, 0, 0 ),
    new memberlabel_t( "extra_rand", PROJ_EXTRA_RAND, 0, 0 ),
    new memberlabel_t( "hitradius", PROJ_HITRADIUS, 0, 0 ),
    new memberlabel_t( "velmult", PROJ_MOVECNT, 0, 0 ),
    new memberlabel_t( "offset", PROJ_OFFSET, 0, 0 ),
    new memberlabel_t( "bounces", PROJ_BOUNCES, 0, 0 ),
    new memberlabel_t( "bsound", PROJ_BSOUND, 0, 0 ),
    new memberlabel_t( "range", PROJ_RANGE, 0, 0 ),
    new memberlabel_t( "flashcolor", PROJ_FLASH_COLOR, 0, 0 ),
    new memberlabel_t( "userdata", PROJ_USERDATA, 0, 0 ),
    new memberlabel_t( "", -1, 0, 0  )     // END OF LIST
];

var UserdefsLabels  : memberlabel_t[] =
[
    //        new memberlabel_t( "<null>", 1, 0, 0 ),
    new memberlabel_t( "god", USERDEFS_GOD, 0, 0 ),
    new memberlabel_t( "warp_on", USERDEFS_WARP_ON, 0, 0 ),
    new memberlabel_t( "cashman", USERDEFS_CASHMAN, 0, 0 ),
    new memberlabel_t( "eog", USERDEFS_EOG, 0, 0 ),
    new memberlabel_t( "showallmap", USERDEFS_SHOWALLMAP, 0, 0 ),
    new memberlabel_t( "show_help", USERDEFS_SHOW_HELP, 0, 0 ),
    new memberlabel_t( "scrollmode", USERDEFS_SCROLLMODE, 0, 0 ),
    new memberlabel_t( "clipping", USERDEFS_CLIPPING, 0, 0 ),
    new memberlabel_t( "user_name", USERDEFS_USER_NAME, LABEL_HASPARM2, MAXPLAYERS ),
    new memberlabel_t( "ridecule", USERDEFS_RIDECULE, LABEL_HASPARM2 | LABEL_ISSTRING, 10 ),
    new memberlabel_t( "savegame", USERDEFS_SAVEGAME, LABEL_HASPARM2 | LABEL_ISSTRING, 10 ),
    new memberlabel_t( "pwlockout", USERDEFS_PWLOCKOUT, LABEL_ISSTRING, 128 ),
    new memberlabel_t( "rtsname;", USERDEFS_RTSNAME,  LABEL_ISSTRING, 128 ),
    new memberlabel_t( "overhead_on", USERDEFS_OVERHEAD_ON, 0, 0 ),
    new memberlabel_t( "last_overhead", USERDEFS_LAST_OVERHEAD, 0, 0 ),
    new memberlabel_t( "showweapons", USERDEFS_SHOWWEAPONS, 0, 0 ),

    new memberlabel_t( "pause_on", USERDEFS_PAUSE_ON, 0, 0 ),
    new memberlabel_t( "from_bonus", USERDEFS_FROM_BONUS, 0, 0 ),
    new memberlabel_t( "camerasprite", USERDEFS_CAMERASPRITE, 0, 0 ),
    new memberlabel_t( "last_camsprite", USERDEFS_LAST_CAMSPRITE, 0, 0 ),
    new memberlabel_t( "last_level", USERDEFS_LAST_LEVEL, 0, 0 ),
    new memberlabel_t( "secretlevel", USERDEFS_SECRETLEVEL, 0, 0 ),

    new memberlabel_t( "const_visibility", USERDEFS_CONST_VISIBILITY, 0, 0 ),
    new memberlabel_t( "uw_framerate", USERDEFS_UW_FRAMERATE, 0, 0 ),
    new memberlabel_t( "camera_time", USERDEFS_CAMERA_TIME, 0, 0 ),
    new memberlabel_t( "folfvel", USERDEFS_FOLFVEL, 0, 0 ),
    new memberlabel_t( "folavel", USERDEFS_FOLAVEL, 0, 0 ),
    new memberlabel_t( "folx", USERDEFS_FOLX, 0, 0 ),
    new memberlabel_t( "foly", USERDEFS_FOLY, 0, 0 ),
    new memberlabel_t( "fola", USERDEFS_FOLA, 0, 0 ),
    new memberlabel_t( "reccnt", USERDEFS_RECCNT, 0, 0 ),

    new memberlabel_t( "entered_name", USERDEFS_ENTERED_NAME, 0, 0 ),
    new memberlabel_t( "screen_tilting", USERDEFS_SCREEN_TILTING, 0, 0 ),
    new memberlabel_t( "shadows", USERDEFS_SHADOWS, 0, 0 ),
    new memberlabel_t( "fta_on", USERDEFS_FTA_ON, 0, 0 ),
    new memberlabel_t( "executions", USERDEFS_EXECUTIONS, 0, 0 ),
    new memberlabel_t( "auto_run", USERDEFS_AUTO_RUN, 0, 0 ),
    new memberlabel_t( "coords", USERDEFS_COORDS, 0, 0 ),
    new memberlabel_t( "tickrate", USERDEFS_TICKRATE, 0, 0 ),
    new memberlabel_t( "m_coop", USERDEFS_M_COOP, 0, 0 ),
    new memberlabel_t( "coop", USERDEFS_COOP, 0, 0 ),
    new memberlabel_t( "screen_size", USERDEFS_SCREEN_SIZE, 0, 0 ),
    new memberlabel_t( "lockout", USERDEFS_LOCKOUT, 0, 0 ),
    new memberlabel_t( "crosshair", USERDEFS_CROSSHAIR, 0, 0 ),
    new memberlabel_t( "wchoice[MAXPLAYERS][MAX_WEAPONS]", USERDEFS_WCHOICE, 0, 0 ),
    new memberlabel_t( "playerai", USERDEFS_PLAYERAI, 0, 0 ),
    new memberlabel_t( "respawn_monsters", USERDEFS_RESPAWN_MONSTERS, 0, 0 ),
    new memberlabel_t( "respawn_items", USERDEFS_RESPAWN_ITEMS, 0, 0 ),
    new memberlabel_t( "respawn_inventory", USERDEFS_RESPAWN_INVENTORY, 0, 0 ),
    new memberlabel_t( "recstat", USERDEFS_RECSTAT, 0, 0 ),
    new memberlabel_t( "monsters_off", USERDEFS_MONSTERS_OFF, 0, 0 ),
    new memberlabel_t( "brightness", USERDEFS_BRIGHTNESS, 0, 0 ),
    new memberlabel_t( "m_respawn_items", USERDEFS_M_RESPAWN_ITEMS, 0, 0 ),
    new memberlabel_t( "m_respawn_monsters", USERDEFS_M_RESPAWN_MONSTERS, 0, 0 ),
    new memberlabel_t( "m_respawn_inventory", USERDEFS_M_RESPAWN_INVENTORY, 0, 0 ),
    new memberlabel_t( "m_recstat", USERDEFS_M_RECSTAT, 0, 0 ),
    new memberlabel_t( "m_monsters_off", USERDEFS_M_MONSTERS_OFF, 0, 0 ),
    new memberlabel_t( "detail", USERDEFS_DETAIL, 0, 0 ),
    new memberlabel_t( "m_ffire", USERDEFS_M_FFIRE, 0, 0 ),
    new memberlabel_t( "ffire", USERDEFS_FFIRE, 0, 0 ),
    new memberlabel_t( "m_player_skill", USERDEFS_M_PLAYER_SKILL, 0, 0 ),
    new memberlabel_t( "m_level_number", USERDEFS_M_LEVEL_NUMBER, 0, 0 ),
    new memberlabel_t( "m_volume_number", USERDEFS_M_VOLUME_NUMBER, 0, 0 ),
    new memberlabel_t( "multimode", USERDEFS_MULTIMODE, 0, 0 ),
    new memberlabel_t( "player_skill", USERDEFS_PLAYER_SKILL, 0, 0 ),
    new memberlabel_t( "level_number", USERDEFS_LEVEL_NUMBER, 0, 0 ),
    new memberlabel_t( "volume_number", USERDEFS_VOLUME_NUMBER, 0, 0 ),
    new memberlabel_t( "m_marker", USERDEFS_M_MARKER, 0, 0 ),
    new memberlabel_t( "marker", USERDEFS_MARKER, 0, 0 ),
    new memberlabel_t( "mouseflip", USERDEFS_MOUSEFLIP, 0, 0 ),
    new memberlabel_t( "statusbarscale", USERDEFS_STATUSBARSCALE, 0, 0 ),
    new memberlabel_t( "drawweapon", USERDEFS_DRAWWEAPON, 0, 0 ),
    new memberlabel_t( "mouseaiming", USERDEFS_MOUSEAIMING, 0, 0 ),
    new memberlabel_t( "weaponswitch", USERDEFS_WEAPONSWITCH, 0, 0 ),
    new memberlabel_t( "democams", USERDEFS_DEMOCAMS, 0, 0 ),
    new memberlabel_t( "color", USERDEFS_COLOR, 0, 0 ),
    new memberlabel_t( "msgdisptime", USERDEFS_MSGDISPTIME, 0, 0 ),
    new memberlabel_t( "statusbarmode", USERDEFS_STATUSBARMODE, 0, 0 ),
    new memberlabel_t( "m_noexits", USERDEFS_M_NOEXITS, 0, 0 ),
    new memberlabel_t( "noexits", USERDEFS_NOEXITS, 0, 0 ),
    new memberlabel_t( "autovote", USERDEFS_AUTOVOTE, 0, 0 ),
    new memberlabel_t( "automsg", USERDEFS_AUTOMSG, 0, 0 ),
    new memberlabel_t( "idplayers", USERDEFS_IDPLAYERS, 0, 0 ),
    new memberlabel_t( "team", USERDEFS_TEAM, 0, 0 ),
    new memberlabel_t( "viewbob", USERDEFS_VIEWBOB, 0, 0 ),
    new memberlabel_t( "weaponsway", USERDEFS_WEAPONSWAY, 0, 0 ),
    new memberlabel_t( "angleinterpolation", USERDEFS_ANGLEINTERPOLATION, 0, 0 ),
    new memberlabel_t( "obituaries", USERDEFS_OBITUARIES, 0, 0 ),
    new memberlabel_t( "levelstats", USERDEFS_LEVELSTATS, 0, 0 ),
    new memberlabel_t( "crosshairscale", USERDEFS_CROSSHAIRSCALE, 0, 0 ),
    new memberlabel_t( "althud", USERDEFS_ALTHUD, 0, 0 ),
    new memberlabel_t( "display_bonus_screen", USERDEFS_DISPLAY_BONUS_SCREEN, 0, 0 ),
    new memberlabel_t( "show_level_text", USERDEFS_SHOW_LEVEL_TEXT, 0, 0 ),
    new memberlabel_t( "weaponscale", USERDEFS_WEAPONSCALE, 0, 0 ),
    new memberlabel_t( "textscale", USERDEFS_TEXTSCALE, 0, 0 ),
    new memberlabel_t( "runkey_mode", USERDEFS_RUNKEY_MODE, 0, 0 ),
    new memberlabel_t( "", -1, 0, 0  )     // END OF LIST
];

var InputLabels : memberlabel_t[]=
[
    new memberlabel_t( "avel", INPUT_AVEL, 0, 0 ),
    new memberlabel_t( "horz", INPUT_HORZ, 0, 0 ),
    new memberlabel_t( "fvel", INPUT_FVEL, 0, 0 ),
    new memberlabel_t( "svel", INPUT_SVEL, 0, 0 ),
    new memberlabel_t( "bits", INPUT_BITS, 0, 0 ),
    new memberlabel_t( "extbits", INPUT_EXTBITS, 0, 0 ),
    new memberlabel_t( "", -1, 0, 0  )     // END OF LIST
];

//#endif

var bitptr: Uint8Array; // pointer to bitmap of which bytecode positions contain pointers //char *
var BITPTR_POINTER = 1;

//#if !defined LUNATIC
var h_gamevars = new hashtable_t(MAXGAMEVARS>>1, null);
var h_arrays = new hashtable_t(MAXGAMEARRAYS>>1, null);
var h_labels = new hashtable_t(11264>>1 ,null);

var h_keywords = new hashtable_t(CON_END>>1, null);

var sectorH  = new hashtable_t(SECTOR_END>>1, null);
var wallH    = new hashtable_t(WALL_END>>1, null);
var userdefH = new hashtable_t(USERDEFS_END>>1, null);

var projectileH = new hashtable_t(PROJ_END>>1, null);
var playerH     = new hashtable_t(PLAYER_END>>1, null);
var inputH      = new hashtable_t(INPUT_END>>1, null);
var actorH      = new hashtable_t(ACTOR_END>>1, null);
var tspriteH    = new hashtable_t(ACTOR_END>>1, null);

function C_InitHashes(): void
{
    var i : number;

    hash_init(h_gamevars);
    hash_init(h_arrays);
    hash_init(h_labels);
    inithashnames();
    initsoundhashnames();

    
    hash_init(h_keywords);
    hash_init(sectorH);
    hash_init(wallH);
    hash_init(userdefH);
    hash_init(projectileH);
    hash_init(playerH);
    hash_init(inputH);
    hash_init(actorH);
    hash_init(tspriteH);

    g_scriptLastKeyword = NUMKEYWORDS-1;
    // determine last CON keyword for backward compatibility with older mods
    if (g_scriptDateVersion < g_keywdate[NUMKEYWDATES-1].date)
    {
        for (i=NUMKEYWDATES-1; i>=0; i--)
        {
            if (g_scriptDateVersion >= g_keywdate[i].date)
            {
                g_scriptLastKeyword = g_keywdate[i].keyw;
                break;
            }
        }

        if (i<0)
            g_scriptLastKeyword = g_keywdate[0].keyw-1;  // may be slightly imprecise
    }

    for (i=g_scriptLastKeyword; i>=0; i--) hash_add(h_keywords,keyw[i],i,0);
    for (i=0; SectorLabels[i].lId >= 0; i++) hash_add(sectorH,SectorLabels[i].name,i,0);
    for (i=0; WallLabels[i].lId >= 0; i++) hash_add(wallH,WallLabels[i].name,i,0);
    for (i=0; UserdefsLabels[i].lId >= 0; i++) hash_add(userdefH,UserdefsLabels[i].name,i,0);
    for (i=0; ProjectileLabels[i].lId >= 0; i++) hash_add(projectileH,ProjectileLabels[i].name,i,0);
    for (i=0; PlayerLabels[i].lId >= 0; i++) hash_add(playerH,PlayerLabels[i].name,i,0);
    for (i=0; InputLabels[i].lId >= 0; i++) hash_add(inputH,InputLabels[i].name,i,0);
    for (i=0; ActorLabels[i].lId >= 0; i++) hash_add(actorH,ActorLabels[i].name,i,0);
    for (i=0; TsprLabels[i].lId >= 0; i++) hash_add(tspriteH,TsprLabels[i].name,i,0);

    assert.areEqual("extra", ProjectileLabels[7].name);
    assert.areEqual(6, TsprLabels[6].lId);
}

//// "magic" number for { and }, overrides line number in compiled code for later detection
var IFELSE_MAGIC = 31337;
var g_ifElseAborted = 0;

function C_SetScriptSize(/*int32_t*/ newsize: number) : number 
{
    todo("C_SetScriptSize, not needed to load into game");
    //var oscriptPtr = unsigned(g_scriptPtr-scriptIdx);
    //var ocaseScriptPtr = unsigned(g_caseScriptPtr-scriptIdx);
    //var oparsingEventPtr = unsigned(g_parsingEventPtr-scriptIdx);
    //var oparsingActorPtr = unsigned(g_parsingActorPtr-scriptIdx);
    //var newscript: Int32Array;
    //var i: number, j: number;
    //var osize: number = g_scriptSize;
    //var scriptptrs: Uint8Array;
    //var newbitptr: Uint8Array;

    //scriptptrs = new Uint8Array(g_scriptSize);//(char *)Bcalloc(1, g_scriptSize * sizeof(uint8_t));

    //for (i=g_scriptSize-1; i>=0; i--)
    //{
    //    if (bitptr[i>>3]&(BITPTR_POINTER<<(i&7)))
    //    {
    //        if ((intptr_t)script[i] < (intptr_t)&script[0] || (intptr_t)script[i] >= (intptr_t)&script[g_scriptSize])
    //        {
    //            g_numCompilerErrors++;
    //            initprintf("Internal compiler error at %\" PRIdPTR \" (0x%\" PRIxPTR \")\n",i,i);
    //        }

    //        scriptptrs[i] = 1;
    //        script[i] -= (intptr_t)&script[0];
    //    }
    //    else scriptptrs[i] = 0;
    //}

    //G_Util_PtrToIdx2(g_tile[0].execPtr, MAXTILES, sizeof(tiledata_t), script, P2I_FWD_NON0);
    //G_Util_PtrToIdx2(g_tile[0].loadPtr, MAXTILES, sizeof(tiledata_t), script, P2I_FWD_NON0);
    //G_Util_PtrToIdx(apScriptGameEvent, MAXGAMEEVENTS, script, P2I_FWD_NON0);

    //initprintf("Resizing code buffer to %d*%d bytes\n",newsize, sizeof(intptr_t));

    //newscript = new Int32Array(newsize);//(intptr_t *)Brealloc(script, newsize * sizeof(intptr_t));
    //newbitptr = new Uint8Array((((newsize+7)>>3)+1));//(char *)Bcalloc(1,(((newsize+7)>>3)+1) * sizeof(uint8_t));

    //if (!newscript || !newbitptr) //maybe check idx???
    //{
    //    C_ReportError(-1);
    //    initprintf("%s:%d: out of memory: Aborted (%ud)\n",g_szScriptFileName,g_lineNumber,(unsigned)(g_scriptPtr-scriptIdx));
    //    initprintf("%s", tempbuf);
    //    g_numCompilerErrors++;
    //    return 1;
    //}

    //if (newsize >= osize)
    //{
    //    Bmemset(&newscript[0]+osize,0,(newsize-osize) * sizeof(uint8_t));
    //    Bmemcpy(newbitptr,bitptr,sizeof(uint8_t) *((osize+7)>>3));
    //}
    //else
    //    Bmemcpy(newbitptr,bitptr,sizeof(uint8_t) *((newsize+7)>>3));

    //Bfree(bitptr);
    //bitptr = newbitptr;
    //if (script != newscript)
    //{
    //    initprintf("Relocating compiled code from to 0x%\" PRIxPTR \" to 0x%\" PRIxPTR \"\n", (intptr_t)script, (intptr_t)newscript);
    //    script = newscript;
    //}

    //g_scriptSize = newsize;
    //g_scriptPtr = (intptr_t *)(script+oscriptPtr);

    //if (g_caseScriptPtr)
    //    g_caseScriptPtr = (intptr_t *)(script+ocaseScriptPtr);

    //if (g_parsingEventPtr)
    //    g_parsingEventPtr = (intptr_t *)(script+oparsingEventPtr);

    //if (g_parsingActorPtr)
    //    g_parsingActorPtr = (intptr_t *)(script+oparsingActorPtr);

    //for (i=(((newsize>=osize)?osize:newsize))-1; i>=0; i--)
    //    if (scriptptrs[i])
    //    {
    //        j = (intptr_t)script[i]+(intptr_t)&script[0];
    //        script[i] = j;
    //    }

    //G_Util_PtrToIdx2(&g_tile[0].execPtr, MAXTILES, sizeof(tiledata_t), script, P2I_BACK_NON0);
    //G_Util_PtrToIdx2(&g_tile[0].loadPtr, MAXTILES, sizeof(tiledata_t), script, P2I_BACK_NON0);
    //G_Util_PtrToIdx(apScriptGameEvent, MAXGAMEEVENTS, script, P2I_BACK_NON0);

    //Bfree(scriptptrs);
    return 0;
}

function ispecial(/*const char */c: string) : number
{
    assert.areEqual(1, c.length).isString(c);
    if (c == ' ' || c.charCodeAt(0) == 0x0d || c == '(' || c == ')' ||
            c == ',' || c == ';' || (c.charCodeAt(0) == 0x0a /*&& ++g_lineNumber*/))
        return 1;

    return 0;
}

//#define C_NextLine() while (textptr.charCodeAt(textptrIdx) != 0x0a && textptr.charCodeAt(textptrIdx) != 0x0d && textptr.charCodeAt(textptrIdx) != 0) textptrIdx++
function C_NextLine() {
     while (textptr.charCodeAt(textptrIdx) != 0x0a && textptr.charCodeAt(textptrIdx) != 0x0d && textptr.charCodeAt(textptrIdx) != 0) 
         textptrIdx++;
}

function C_SkipComments() : number
{
    do
    {
        switch (textptr[textptrIdx])
        {
        case '\n':
            g_lineNumber++;
        case ' ':
        case '\t':
        case '\r':
        case String.fromCharCode(0x1a):
            textptrIdx++;
            break;
        case '/':
            switch (textptr[textptrIdx+1])
            {
            case '/': // C++ style comment
                if (!(g_numCompilerErrors || g_numCompilerWarnings) && g_scriptDebug > 1)
                    initprintf("%s:%d: debug: got comment.\n",g_szScriptFileName,g_lineNumber);
                C_NextLine();
                continue;
            case '*': // beginning of a C style comment
                if (!(g_numCompilerErrors || g_numCompilerWarnings) && g_scriptDebug > 1)
                    initprintf("%s:%d: debug: got start of comment block.\n",g_szScriptFileName,g_lineNumber);
                do
                {
                    if (textptr[textptrIdx] == '\n')
                        g_lineNumber++;
                    textptrIdx++;
                }
                while (textptr[textptrIdx] && (textptr[textptrIdx+0] != '*' || textptr[textptrIdx+1] != '/'));

                if (!textptr[textptrIdx])
                {
                    debugger;
                    if (!(g_numCompilerErrors || g_numCompilerWarnings) && g_scriptDebug)
                        initprintf("%s:%d: debug: EOF in comment!\n",g_szScriptFileName,g_lineNumber);
                    C_ReportError(-1);
                    initprintf("%s:%d: error: found `/*' with no `*/'.\n",g_szScriptFileName,g_lineNumber);
                    g_parsingActorPtr = NULL; g_processingState = g_numBraces = 0;
                    g_numCompilerErrors++;
                    continue;
                }

                if (!(g_numCompilerErrors || g_numCompilerWarnings) && g_scriptDebug > 1)
                    initprintf("%s:%d: debug: got end of comment block.\n",g_szScriptFileName,g_lineNumber);

                textptrIdx+=2;
                continue;
            }
            continue;

        default:
            if (ispecial(textptr[textptrIdx]))
            {
                textptrIdx++;
                continue;
            }
        case undefined:
        case 0: // EOF
            return ((g_scriptPtr-scriptIdx) > (g_scriptSize-32)) ? C_SetScriptSize(g_scriptSize<<1) : 0;
        }
    }
    while (1);
}

//#define GetDefID(szGameLabel) hash_find(h_gamevars,szGameLabel)
//#define GetADefID(szGameLabel) hash_find(h_arrays,szGameLabel)

function isaltok(/*const char */c: string) : number
{
    assert.isString(c).areEqual(1, c.length);
    return (isalnum(c) || c == '{' || c == '}' || c == '/' || c == '\\' ||
            c == '*' || c == '-' || c == '_' || c == '.') ? 1 : 0;
}

//static inline int32_t C_GetLabelNameID(const memberlabel_t *pLabel, hashtable_t *tH, const char *psz)
//{
//    // find the label psz in the table pLabel.
//    // returns the ID for the label, or -1

//    int32_t l = hash_findcase(tH,psz);
//    return (l >= 0) ? pLabel[l].lId : -1;
//}

//static inline int32_t C_GetLabelNameOffset(hashtable_t *tH, const char *psz)
//{
//    // find the label psz in the table pLabel.
//    // returns the offset in the array for the label, or -1

//    return hash_findcase(tH,psz);
//}

function C_GetNextLabelName() : void
{
    var i = 0;

    C_SkipComments();

    while (ispecial(textptr[textptrIdx]) == 0 && textptr[textptrIdx]!='['&& textptr[textptrIdx]!=']' && textptr[textptrIdx]!='\t' && textptr[textptrIdx]!='\n' && textptr[textptrIdx]!='\r')
        label[(g_numLabels<<6)+(i++)] = textptr.charCodeAt(textptrIdx++);
    label[(g_numLabels<<6)+i] = 0;
    
    if (!(g_numCompilerErrors|g_numCompilerWarnings) && g_scriptDebug > 1)
        initprintf("%s:%d: debug: got label `%s'.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
}

function C_GetKeyword() : number
{
    var i: number;
    var temptextptr: number;

    C_SkipComments();

    temptextptr = textptrIdx;

    if (textptr.charCodeAt(temptextptr) == 0 || isNaN(textptr.charCodeAt(temptextptr))) // EOF
        return -2;

    while (isaltok(textptr[temptextptr]) == 0)
    {
        temptextptr++;
        if (textptr.charCodeAt(temptextptr) == 0 || isNaN(textptr.charCodeAt(temptextptr)))
            return 0;
    }

    i = 0;
    while (isaltok(textptr[temptextptr]))
        tempbuf[i++] = textptr.charCodeAt(temptextptr++);
    tempbuf[i] = 0;

    return hash_find(h_keywords,tempbuf.toString());
}

function C_GetNextKeyword(): number //Returns its code #
{
    var i:number, l:number;

    C_SkipComments();

    if (textptr.charCodeAt(textptrIdx) == 0 || isNaN(textptr.charCodeAt(textptrIdx))) // EOF
        return -2;

    l = 0;
    while (isaltok(textptr[textptrIdx+l]))
    {
        tempbuf[l] = textptr.charCodeAt(textptrIdx+l);
        l++;
    }
    tempbuf[l] = 0;

    if ((i = hash_find(h_keywords,tempbuf.toString())) >= 0)
    {
        if (i == CON_LEFTBRACE || i == CON_RIGHTBRACE || i == CON_NULLOP)
            script[g_scriptPtr] = i + (IFELSE_MAGIC<<12);
        else script[g_scriptPtr] = i + (g_lineNumber<<12);
        dlog(DEBUG_SCRIPT_CHANGE, "script change %i", script[g_scriptPtr]);

        bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
        textptrIdx += l;
        g_scriptPtr++;

        if (!(g_numCompilerErrors || g_numCompilerWarnings) && g_scriptDebug)
            initprintf("%s:%d: debug: translating keyword `%s'.\n",g_szScriptFileName,g_lineNumber,keyw[i]);
        return i;
    }

    textptrIdx += l;
    g_numCompilerErrors++;

    if ((tempbuf[0] == '{'.charCodeAt(0) || tempbuf[0] == '}'.charCodeAt(0)) && tempbuf[1] != 0)
    {
        C_ReportError(-1);
        initprintf("%s:%d: error: expected whitespace between `%c' and `%s'.\n",g_szScriptFileName,g_lineNumber,String.fromCharCode(tempbuf[0]),tempbuf.subarray(1).toString());
    }
    else C_ReportError(ERROR_EXPECTEDKEYWORD);
    
    return -1;
}

function parse_decimal_number() : number // (textptr)
{
    // decimal constants -- this is finicky business
    var num = strtoll(textptr, textptrIdx, NULL, 10);  // SB: original returned long

    if (num >= INT32_MIN && num <= INT32_MAX)
    {
        // all OK
    }
    else if (num > INT32_MAX && num <= UINT32_MAX)
    {
        // Number interpreted as uint32, but packed as int32 (on 32-bit archs)
        // (CON code in the wild exists that does this).  Note that such conversion
        // is implementation-defined (C99 6.3.1.3) but GCC does the 'expected' thing.
//#if 0
//        initprintf("%s:%d: warning: number greater than INT32_MAX converted to a negative one.\n",
//                   g_szScriptFileName,g_lineNumber);
//        g_numCompilerWarnings++;
//#endif
    }
    else
    {
        // out of range, this is arguably worse

        initprintf("%s:%d: warning: number out of the range of a 32-bit integer encountered.\n",
                   g_szScriptFileName,g_lineNumber);
        g_numCompilerWarnings++;
    }
    //dlog(DEBUG_COMPILE, "parse_decimal_number, %i",  num|0);
    return int32(num);
}

function parse_hex_constant(/*const char *hexnum*/hexnum: string) : number
{
    var x = 0;//int64_t
    todoThrow();
    //sscanf(hexnum, "%" PRIx64 "", &x);

    //if (x > UINT32_MAX)
    //{
    //    initprintf("%s:%d: warning: number 0x%" PRIx64 " truncated to 32 bits.\n",
    //               g_szScriptFileName,g_lineNumber, x);
    //    g_numCompilerWarnings++;
    //}

    return x;
}

//static void C_GetNextVarType(int32_t type)
//{
//    int32_t i=0,f=0;

//    C_SkipComments();

//    if (!type && !g_labelsOnly && (isdigit(textptr[textptrIdx]) || ((textptr[textptrIdx] == '-') && (isdigit(textptr[textptrIdx+1])))))
//    {
//        bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));

//        script[g_scriptPtr++] = MAXGAMEVARS;

//        if (tolower(textptr[textptrIdx+1])=='x')  // hex constants
//            script[g_scriptPtr] = parse_hex_constant(textptr+2);
//        else
//            script[g_scriptPtr] = parse_decimal_number();

//        if (!(g_numCompilerErrors || g_numCompilerWarnings) && g_scriptDebug)
//            initprintf("%s:%d: debug: accepted constant %ld in place of gamevar.\n",
//                       g_szScriptFileName,g_lineNumber,(long)script[g_scriptPtr]);

//        bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//        g_scriptPtr++;
//#if 1
//        while (!ispecial(textptr[textptrIdx]) && textptr[textptrIdx] != ']') textptrIdx++;
//#else
//        C_GetNextLabelName();
//#endif
//        return;
//    }
//    else if ((textptr[textptrIdx] == '-')/* && !isdigit(textptr[textptrIdx+1])*/)
//    {
//        if (!type)
//        {
//            if (!(g_numCompilerErrors || g_numCompilerWarnings) && g_scriptDebug)
//                initprintf("%s:%d: debug: flagging gamevar as negative.\n",g_szScriptFileName,g_lineNumber); //,Batol(textptr));
//            f = (MAXGAMEVARS<<1);
//        }
//        else
//        {
//            g_numCompilerErrors++;
//            C_ReportError(ERROR_SYNTAXERROR);
//            C_GetNextLabelName();
//            return;
//        }

//        textptrIdx++;
//    }

//    C_GetNextLabelName();

//    if (!g_skipKeywordCheck && hash_find(h_keywords,label.subarray(g_numLabels<<6).toString())>=0)
//    {
//        g_numCompilerErrors++;
//        C_ReportError(ERROR_ISAKEYWORD);
//        return;
//    }

//    C_SkipComments(); //skip comments and whitespace
//    if ((textptr[textptrIdx] == '['))     //read of array as a gamevar
//    {
//        int32_t lLabelID = -1;

//        f |= (MAXGAMEVARS<<2);
//        textptrIdx++;
//        i=GetADefID(label.subarray(g_numLabels<<6).toString());
//        if (i < 0)
//        {
//            i=GetDefID(label.subarray(g_numLabels<<6).toString());
//            if (i < g_iSpriteVarID || i > g_iActorVarID)
//                i = -1;

//            if (i < 0)
//            {
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_NOTAGAMEARRAY);
//                return;
//            }
//            f &= ~(MAXGAMEVARS<<2); // not an array
//            f |= (MAXGAMEVARS<<3);
//        }

//        bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//        script[g_scriptPtr++]=(i|f);
//        C_GetNextVarType(0);
//        C_SkipComments();

//        if (textptr[textptrIdx] != ']')
//        {
//            g_numCompilerErrors++;
//            C_ReportError(ERROR_GAMEARRAYBNC);
//            return;
//        }
//        textptrIdx++;

//        //writing arrays in this way is not supported because it would require too many changes to other code

//        if (type)
//        {
//            g_numCompilerErrors++;
//            C_ReportError(ERROR_INVALIDARRAYWRITE);
//            return;
//        }

//        if (f & (MAXGAMEVARS<<3))
//        {
//            while (textptr[textptrIdx] != '.')
//            {
//                if (textptr[textptrIdx] == 0xa)
//                    break;
//                if (!textptr[textptrIdx])
//                    break;

//                textptrIdx++;
//            }

//            if (textptr[textptrIdx] != '.')
//            {
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_SYNTAXERROR);
//                return;
//            }
//            textptrIdx++;
//            /// now pointing at 'xxx'
//            C_GetNextLabelName();
//            /*initprintf("found xxx label of \"%s\"\n",   label.subarray(g_numLabels<<6).toString());*/

//            if (i == g_iSpriteVarID)
//                lLabelID=C_GetLabelNameOffset(&actorH,Bstrtolower(label.subarray(g_numLabels<<6).toString()));
//            else if (i == g_iSectorVarID)
//                lLabelID=C_GetLabelNameOffset(&sectorH,Bstrtolower(label.subarray(g_numLabels<<6).toString()));
//            else if (i == g_iWallVarID)
//                lLabelID=C_GetLabelNameOffset(&wallH,Bstrtolower(label.subarray(g_numLabels<<6).toString()));
//            else if (i == g_iPlayerVarID)
//                lLabelID=C_GetLabelNameOffset(&playerH,Bstrtolower(label.subarray(g_numLabels<<6).toString()));
//            else if (i == g_iActorVarID)
//                lLabelID=GetDefID(label.subarray(g_numLabels<<6).toString());

//            //printf("LabelID is %d\n",lLabelID);
//            if (lLabelID == -1)
//            {
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_SYMBOLNOTRECOGNIZED);
//                return;
//            }

//            bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));

//            if (i == g_iSpriteVarID)
//            {
//                script[g_scriptPtr++]=ActorLabels[lLabelID].lId;

//                //printf("member's flags are: %02Xh\n",ActorLabels[lLabelID].flags);
//                if (ActorLabels[lLabelID].flags & LABEL_HASPARM2)
//                {
//                    //printf("Member has PARM2\n");
//                    // get parm2
//                    // get the ID of the DEF
//                    C_GetNextVarType(0);
//                }
//            }
//            else if (i == g_iSectorVarID)
//                script[g_scriptPtr++]=SectorLabels[lLabelID].lId;
//            else if (i == g_iWallVarID)
//                script[g_scriptPtr++]=SectorLabels[lLabelID].lId;
//            else if (i == g_iPlayerVarID)
//            {
//                script[g_scriptPtr++]=PlayerLabels[lLabelID].lId;

//                //printf("member's flags are: %02Xh\n",ActorLabels[lLabelID].flags);
//                if (PlayerLabels[lLabelID].flags & LABEL_HASPARM2)
//                {
//                    //printf("Member has PARM2\n");
//                    // get parm2
//                    // get the ID of the DEF
//                    C_GetNextVarType(0);
//                }
//            }
//            else if (i == g_iActorVarID)
//                script[g_scriptPtr++]=lLabelID;
//        }
//        return;
//    }
////    initprintf("not an array");
//    i=GetDefID(label.subarray(g_numLabels<<6).toString());
//    if (i<0)   //gamevar not found
//    {
//        if (!type && !g_labelsOnly)
//        {
//            //try looking for a define instead
//            Bstrcpy(tempbuf,label.subarray(g_numLabels<<6).toString());
//            i = hash_find(h_labels,tempbuf);
//            if (i>=0)
//            {
//                if (labeltype[i] & LABEL_DEFINE)
//                {
//                    if (!(g_numCompilerErrors || g_numCompilerWarnings) && g_scriptDebug)
//                        initprintf("%s:%d: debug: accepted defined label `%s' instead of gamevar.\n",g_szScriptFileName,g_lineNumber,label+(i<<6));
//                    bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                    script[g_scriptPtr++] = MAXGAMEVARS;
//                    bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                    script[g_scriptPtr++] = labelcode[i];
//                    return;
//                }
//            }
//            g_numCompilerErrors++;
//            C_ReportError(ERROR_NOTAGAMEVAR);
//            return;
//        }
//        g_numCompilerErrors++;
//        C_ReportError(ERROR_NOTAGAMEVAR);
//        textptrIdx++;
//        return;

//    }
//    if (type == GAMEVAR_READONLY && aGameVars[i].dwFlags & GAMEVAR_READONLY)
//    {
//        g_numCompilerErrors++;
//        C_ReportError(ERROR_VARREADONLY);
//        return;
//    }
//    else if (aGameVars[i].dwFlags & type)
//    {
//        g_numCompilerErrors++;
//        C_ReportError(ERROR_VARTYPEMISMATCH);
//        return;
//    }

//    if (!(g_numCompilerErrors || g_numCompilerWarnings) && g_scriptDebug > 1)
//        initprintf("%s:%d: debug: accepted gamevar `%s'.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());

//    bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//    script[g_scriptPtr++]=(i|f);
//}

//#define C_GetNextVar() C_GetNextVarType(0)

//static inline void C_GetManyVarsType(int32_t type, int32_t num)
//{
//    int32_t i;
//    for (i=num-1; i>=0; i--)
//        C_GetNextVarType(type);
//}

//#define C_GetManyVars(num) C_GetManyVarsType(0,num)

//// returns:
////  -1 on EOF or wrong type or error
////   0 if literal value
////   LABEL_* (>0) if that type and matched
////
//// script[g_scriptPtr] will contain the value OR 0 if wrong type or error
function C_GetNextValue(type: number): number
{
    var i:number, l:number;

    C_SkipComments();

    if (textptr.charCodeAt(textptrIdx) == 0 || isNaN(textptr.charCodeAt(textptrIdx))) // EOF 
        return -1;

    l = 0;
    while (isaltok(textptr[textptrIdx+l]))
    {
        tempbuf[l] = textptr.charCodeAt(textptrIdx+l);
        l++;
    }
    tempbuf[l] = 0;

    if (!g_skipKeywordCheck && hash_find(h_keywords,tempbuf.toString() /*label.subarray(g_numLabels<<6).toString()*/)>=0)
    {
        g_numCompilerErrors++;
        C_ReportError(ERROR_ISAKEYWORD);
        textptrIdx+=l;
    }
    
    i = hash_find(h_labels,tempbuf.toString());
    if (i>=0)
    {
        var el:string, gl:string;//char *

        if (labeltype[i] & type)
        {
            if (!(g_numCompilerErrors || g_numCompilerWarnings) && g_scriptDebug > 1)
            {
                gl = /*(char *)*/C_GetLabelType(labeltype[i]);
                initprintf("%s:%d: debug: accepted %s label `%s'.\n",g_szScriptFileName,g_lineNumber,gl,label.subarray(i<<6).toString());
                gl = null;//Bfree(gl);
            }

            bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
            script[g_scriptPtr++] = labelcode[i];
            dlog(DEBUG_SCRIPT_CHANGE, "script change %i", script[g_scriptPtr]);
            
            textptrIdx += l;
            return labeltype[i];
        }
        bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
        script[g_scriptPtr++] = 0;
        textptrIdx += l;
        el = C_GetLabelType(type);
        gl = C_GetLabelType(labeltype[i]);
        C_ReportError(-1);
        initprintf("%s:%d: warning: expected %s, found %s.\n",g_szScriptFileName,g_lineNumber,el,gl);
        g_numCompilerWarnings++;
        el = null;//Bfree(el);
        gl = null;//Bfree(gl);
        return -1;  // valid label name, but wrong type
    }

    if (isdigit(textptr[textptrIdx]) == 0 && textptr[textptrIdx] != '-')
    {
        C_ReportError(ERROR_PARAMUNDEFINED);
        g_numCompilerErrors++;
        bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
        script[g_scriptPtr] = 0;
        g_scriptPtr++;
        textptrIdx+=l;
        return -1; // error!
    }

    if (isdigit(textptr[textptrIdx]) && g_labelsOnly)
    {
        C_ReportError(WARNING_LABELSONLY);
        g_numCompilerWarnings++;
    }

    i = l-1;
    do
    {
        // FIXME: check for 0-9 A-F for hex
        if (textptr[textptrIdx+0] == '0' && textptr[textptrIdx+1] == 'x') break; // kill the warning for hex
        if (!isdigit(textptr[textptrIdx + i--]))
        {
            C_ReportError(-1);
            initprintf("%s:%d: warning: invalid character `%c' in definition!\n",g_szScriptFileName,g_lineNumber,textptr[textptrIdx + i+1]);
            g_numCompilerWarnings++;
            break;
        }
    }
    while (i > 0);

    bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));

    if (tolower(textptr[textptrIdx+1])=='x')
        script[g_scriptPtr] = parse_hex_constant(textptr+2);
    else
        script[g_scriptPtr] = parse_decimal_number();
    dlog(DEBUG_SCRIPT_CHANGE, "script change %i", script[g_scriptPtr]);
    if (!(g_numCompilerErrors || g_numCompilerWarnings) && g_scriptDebug > 1)
        initprintf("%s:%d: debug: accepted constant %i.\n",
                   g_szScriptFileName,g_lineNumber,/*(long)*/script[g_scriptPtr]);
    dlog(DEBUG_SCRIPT_CHANGE, "script change %i", script[g_scriptPtr]);
    g_scriptPtr++;

    textptrIdx += l;

    return 0;   // literal value
}

//static inline int32_t C_IntPow2(int32_t v)
//{
//    return ((v!=0) && (v&(v-1))==0);
//}

//static inline uint32_t C_Pow2IntLogBase2(int32_t v)
//{
//    static const uint32_t b[] = {0xAAAAAAAA, 0xCCCCCCCC, 0xF0F0F0F0,
//                                 0xFF00FF00, 0xFFFF0000
//                                };
//    register uint32_t r = (v & b[0]) != 0;
//    int32_t i = 4;

//    for (; i > 0; i--)
//        r |= ((v & b[i]) != 0) << i;

//    return r;
//}

function C_CheckMalformedBranch(lastScriptPtr: number): number
{
    switch (C_GetKeyword())
    {
    case CON_RIGHTBRACE:
    case CON_ENDA:
    case CON_ENDEVENT:
    case CON_ENDS:
    case CON_ELSE:
        g_scriptPtr = lastScriptPtr;// + &script[0];
        g_ifElseAborted = 1;
        C_ReportError(-1);
        g_numCompilerWarnings++;
        initprintf("%s:%d: warning: malformed `%s' branch\n",g_szScriptFileName,g_lineNumber,
                   keyw[script[g_scriptPtr] & 0xFFF]);
        return 1;
    }
    return 0;
}

function C_CheckEmptyBranch(tw: number, lastScriptPtr: number): number
{
    // ifrnd and the others actually do something when the condition is executed
    if ((Bstrncmp(keyw[tw], "if", 2) && tw != CON_ELSE) ||
            tw == CON_IFRND || tw == CON_IFHITWEAPON || tw == CON_IFCANSEE || tw == CON_IFCANSEETARGET ||
            tw == CON_IFPDISTL || tw == CON_IFPDISTG || tw == CON_IFGOTWEAPONCE)
    {
        g_ifElseAborted = 0;
        return 0;
    }

    if ((script[g_scriptPtr] & 0xFFF) != CON_NULLOP || script[g_scriptPtr]>>12 != IFELSE_MAGIC)
        g_ifElseAborted = 0;

    if (g_ifElseAborted)
    {
        C_ReportError(-1);
        g_numCompilerWarnings++;
        g_scriptPtr = lastScriptPtr;// + &script[0];
        initprintf("%s:%d: warning: empty `%s' branch\n",g_szScriptFileName,g_lineNumber,
                   keyw[script[g_scriptPtr] & 0xFFF]);
        script[g_scriptPtr] = (CON_NULLOP + (IFELSE_MAGIC<<12));
        return 1;
    }
    return 0;
}

//static int32_t C_CountCaseStatements()
//{
//    int32_t lCount;
//    char *temptextptr = textptr;
//    int32_t temp_ScriptLineNumber = g_lineNumber;
//    intptr_t scriptoffset = (unsigned)(g_scriptPtr-scriptIdx);
//    intptr_t caseoffset = (unsigned)(g_caseScriptPtr-scriptIdx);
////    int32_t i;

//    g_numCases=0;
//    g_caseScriptPtr=NULL;
//    //Bsprintf(g_szBuf,"CSS: %.12s",textptr);
//    //AddLog(g_szBuf);
//    C_ParseCommand(1);
//    // since we processed the endswitch, we need to re-increment g_checkingSwitch
//    g_checkingSwitch++;

//    textptr=temptextptr;
//    g_scriptPtr = (intptr_t *)(script+scriptoffset);

//    g_lineNumber = temp_ScriptLineNumber;

//    lCount=g_numCases;
//    g_numCases=0;
//    g_caseScriptPtr = (intptr_t *)(script+caseoffset);
//    g_numCases = 0;
//    return lCount;
//}

function C_Include(confile: string) :  void
{
    var temp_ScriptLineNumber: number;
    var temp_ifelse_check: number;
    var j: number;
    var origtptr: string, origtptrIxd: number, mptr: Ptr; //char *
    var parentScriptFileName = "";//[255];
    var fp: number;

    fp = kopen4loadfrommod(confile,g_loadFromGroupOnly);
    if (fp < 0)
    {
        g_numCompilerErrors++;
        initprintf("%s:%d: error: could not find file `%s'.\n",g_szScriptFileName,g_lineNumber,confile);
        return;
    }

    j = kfilelength(fp);

    mptr = new Ptr(new Uint8Array(j+1));
    //if (!mptr)
    //{
    //    kclose(fp);
    //    g_numCompilerErrors++;
    //    initprintf("%s:%d: error: could not allocate %d bytes to include `%s'.\n",
    //        g_szScriptFileName,g_lineNumber,j,confile);
    //    return;
    //}

    initprintf("Including: %s (%d bytes)\n",confile, j);
    kread(fp, mptr, j);
    kclose(fp);
    mptr.array[j] = 0;
    
    if (textptr[textptrIdx] == '"') // skip past the closing quote if it's there so we don't screw up the next line
        textptrIdx++;
    origtptr = textptr;
    origtptrIxd = textptrIdx;

    parentScriptFileName = g_szScriptFileName;
    g_szScriptFileName = confile;
    temp_ScriptLineNumber = g_lineNumber;
    g_lineNumber = 1;
    temp_ifelse_check = g_checkingIfElse;
    g_checkingIfElse = 0;

    textptr = mptr.array.toString();
    textptrIdx = 0;

    C_SkipComments();

    C_ParseCommand(1);

    g_szScriptFileName = parentScriptFileName;
    g_totalLines += g_lineNumber;
    g_lineNumber = temp_ScriptLineNumber;
    g_checkingIfElse = temp_ifelse_check;

    textptr = origtptr;
    textptrIdx = origtptrIxd;

    //Bfree(mptr);
}
//#endif  // !defined LUNATIC

//#ifdef _WIN32
function check_filename_case(fn: string): void
{
    var fp: number;
    if ((fp = kopen4loadfrommod(fn, g_loadFromGroupOnly)) >= 0)
        kclose(fp);
}
//#else
//static void check_filename_case(const char *fn) { UNREFERENCED_PARAMETER(fn); }
//#endif

function G_DoGameStartup(/*const int32_t **/params: Int32Array): void
{
    var j = 0;

    ud.const_visibility = params[j++];
    g_impactDamage = params[j++];
    g_maxPlayerHealth = g_player[0].ps.max_player_health = g_player[0].ps.max_shield_amount = params[j++];
    g_startArmorAmount = params[j++];
    g_actorRespawnTime = params[j++];

    if (g_scriptVersion >= 11)
        g_itemRespawnTime = params[j++];
    else
        g_itemRespawnTime = g_actorRespawnTime;

    if (g_scriptVersion >= 11)
        g_playerFriction = params[j++];

    if (g_scriptVersion == 14)
        g_spriteGravity = params[j++];

    if (g_scriptVersion >= 11)
    {
        g_rpgBlastRadius = params[j++];
        g_pipebombBlastRadius = params[j++];
        g_shrinkerBlastRadius = params[j++];
        g_tripbombBlastRadius = params[j++];
        g_morterBlastRadius = params[j++];
        g_bouncemineBlastRadius = params[j++];
        g_seenineBlastRadius = params[j++];
    }

    g_player[0].ps.max_ammo_amount[PISTOL_WEAPON] = params[j++];
    g_player[0].ps.max_ammo_amount[SHOTGUN_WEAPON] = params[j++];
    g_player[0].ps.max_ammo_amount[CHAINGUN_WEAPON] = params[j++];
    g_player[0].ps.max_ammo_amount[RPG_WEAPON] = params[j++];
    g_player[0].ps.max_ammo_amount[HANDBOMB_WEAPON] = params[j++];
    g_player[0].ps.max_ammo_amount[SHRINKER_WEAPON] = params[j++];
    g_player[0].ps.max_ammo_amount[DEVISTATOR_WEAPON] = params[j++];
    g_player[0].ps.max_ammo_amount[TRIPBOMB_WEAPON] = params[j++];

    if (g_scriptVersion >= 13)
    {
        g_player[0].ps.max_ammo_amount[FREEZE_WEAPON] = params[j++];

        if (g_scriptVersion == 14)
            g_player[0].ps.max_ammo_amount[GROW_WEAPON] = params[j++];

        g_damageCameras = params[j++];
        g_numFreezeBounces = params[j++];
        g_freezerSelfDamage = params[j++];

        if (g_scriptVersion == 14)
        {
            g_spriteDeleteQueueSize = params[j++];
            g_spriteDeleteQueueSize = clamp(g_spriteDeleteQueueSize, 0, 1024);

            g_tripbombLaserMode = params[j++];
        }
    }
}

//#ifdef LUNATIC
//void C_DefineSound(int32_t sndidx, const char *fn, int32_t args[5])
//{
//    Bassert((unsigned)sndidx < MAXSOUNDS);

//    {
//        sound_t *const snd = &g_sounds[sndidx];

//        Bfree(snd->filename);
//        snd->filename = dup_filename(fn);
//        check_filename_case(snd->filename);

//        snd->ps = args[0];
//        snd->pe = args[1];
//        snd->pr = args[2];
//        snd->m = args[3] & ~32;
//        if (args[3] & 1)
//            snd->m |= 32;
//        snd->vo = args[4];

//        if (sndidx > g_maxSoundPos)
//            g_maxSoundPos = sndidx;
//    }
//}

//void C_DefineMusic(int32_t vol, int32_t lev, const char *fn)
//{
//    if (vol==-1)
//    {
//        Bassert((unsigned)lev < MAXVOLUMES);

//        Bstrncpyz(EnvMusicFilename[lev], fn, BMAX_PATH);
//        check_filename_case(EnvMusicFilename[lev]);
//    }
//    else
//    {
//        Bassert((unsigned)vol < MAXVOLUMES+1);
//        Bassert((unsigned)lev < MAXLEVELS);

//        {
//            map_t *const map = &MapInfo[(MAXLEVELS*vol)+lev];

//            Bfree(map->musicfn);
//            map->musicfn = dup_filename(fn);
//            check_filename_case(map->musicfn);
//        }
//    }
//}

//void C_DefineQuote(int32_t qnum, const char *qstr)
//{
//    C_AllocQuote(qnum);
//    Bstrncpyz(ScriptQuotes[qnum], qstr, MAXQUOTELEN);
//}

//void C_DefineVolumeName(int32_t vol, const char *name)
//{
//    Bassert((unsigned)vol < MAXVOLUMES);
//    Bstrncpyz(EpisodeNames[vol], name, sizeof(EpisodeNames[vol]));
//    g_numVolumes = max(g_numVolumes, vol+1);
//}

//void C_DefineSkillName(int32_t skill, const char *name)
//{
//    Bassert((unsigned)skill < MAXSKILLS);
//    Bstrncpyz(SkillNames[skill], name, sizeof(SkillNames[skill]));
//    g_numSkills = max(g_numSkills, skill+1);
//}

//void C_DefineLevelName(int32_t vol, int32_t lev, const char *fn,
//                       int32_t partime, int32_t designertime,
//                       const char *levelname)
//{
//    Bassert((unsigned)vol < MAXVOLUMES);
//    Bassert((unsigned)lev < MAXLEVELS);

//    {
//        map_t *const map = &MapInfo[(MAXLEVELS*vol)+lev];

//        Bfree(map->filename);
//        map->filename = dup_filename(fn);

//        // TODO: truncate to 32 chars?
//        Bfree(map->name);
//        map->name = Bstrdup(levelname);

//        map->partime = REALGAMETICSPERSEC * partime;
//        map->designertime = REALGAMETICSPERSEC * designertime;
//    }
//}

//void C_DefineGameFuncName(int32_t idx, const char *name)
//{
//    assert((unsigned)idx < NUMGAMEFUNCTIONS);

//    Bstrncpyz(gamefunctions[idx], name, MAXGAMEFUNCLEN);
//    Bstrncpyz(keydefaults[3*idx], name, MAXGAMEFUNCLEN);

//    hash_add(h_gamefuncs, gamefunctions[idx], idx, 0);
//}

//void C_DefineGameType(int32_t idx, int32_t flags, const char *name)
//{
//    Bassert((unsigned)idx < MAXGAMETYPES);

//    GametypeFlags[idx] = flags;
//    Bstrncpyz(GametypeNames[idx], name, sizeof(GametypeNames[idx]));
//    g_numGametypes = idx+1;
//}
//#endif

//LUNATIC_EXTERN int32_t C_SetDefName(const char *name)
//{
//    clearDefNamePtr();
//    g_defNamePtr = dup_filename(name);
//    if (g_defNamePtr)
//        initprintf("Using DEF file: %s.\n", g_defNamePtr);
//    return (g_defNamePtr==NULL);
//}

//LUNATIC_EXTERN void C_DefineProjectile(int32_t j, int32_t what, int32_t val)
//{
//    switch (what)
//    {
//    case PROJ_WORKSLIKE:
//        g_tile[j].defproj.workslike = ProjectileData[j].workslike = val; break;
//    case PROJ_SPAWNS:
//        g_tile[j].defproj.spawns = ProjectileData[j].spawns = val; break;
//    case PROJ_SXREPEAT:
//        g_tile[j].defproj.sxrepeat = ProjectileData[j].sxrepeat = val; break;
//    case PROJ_SYREPEAT:
//        g_tile[j].defproj.syrepeat = ProjectileData[j].syrepeat = val; break;
//    case PROJ_SOUND:
//        g_tile[j].defproj.sound = ProjectileData[j].sound = val; break;
//    case PROJ_ISOUND:
//        g_tile[j].defproj.isound = ProjectileData[j].isound = val; break;
//    case PROJ_VEL:
//        g_tile[j].defproj.vel = ProjectileData[j].vel = val; break;
//    case PROJ_EXTRA:
//        g_tile[j].defproj.extra = ProjectileData[j].extra = val; break;
//    case PROJ_DECAL:
//        g_tile[j].defproj.decal = ProjectileData[j].decal = val; break;
//    case PROJ_TRAIL:
//        g_tile[j].defproj.trail = ProjectileData[j].trail = val; break;
//    case PROJ_TXREPEAT:
//        g_tile[j].defproj.txrepeat = ProjectileData[j].txrepeat = val; break;
//    case PROJ_TYREPEAT:
//        g_tile[j].defproj.tyrepeat = ProjectileData[j].tyrepeat = val; break;
//    case PROJ_TOFFSET:
//        g_tile[j].defproj.toffset = ProjectileData[j].toffset = val; break;
//    case PROJ_TNUM:
//        g_tile[j].defproj.tnum = ProjectileData[j].tnum = val; break;
//    case PROJ_DROP:
//        g_tile[j].defproj.drop = ProjectileData[j].drop = val; break;
//    case PROJ_CSTAT:
//        g_tile[j].defproj.cstat = ProjectileData[j].cstat = val; break;
//    case PROJ_CLIPDIST:
//        g_tile[j].defproj.clipdist = ProjectileData[j].clipdist = val; break;
//    case PROJ_SHADE:
//        g_tile[j].defproj.shade = ProjectileData[j].shade = val; break;
//    case PROJ_XREPEAT:
//        g_tile[j].defproj.xrepeat = ProjectileData[j].xrepeat = val; break;
//    case PROJ_YREPEAT: 
//        g_tile[j].defproj.yrepeat = ProjectileData[j].yrepeat = val; break;
//    case PROJ_PAL:
//        g_tile[j].defproj.pal = ProjectileData[j].pal = val; break;
//    case PROJ_EXTRA_RAND:
//        g_tile[j].defproj.extra_rand = ProjectileData[j].extra_rand = val; break;
//    case PROJ_HITRADIUS:
//        g_tile[j].defproj.hitradius = ProjectileData[j].hitradius = val; break;
//    case PROJ_MOVECNT:
//        g_tile[j].defproj.movecnt = ProjectileData[j].movecnt = val; break;
//    case PROJ_OFFSET:
//        g_tile[j].defproj.offset = ProjectileData[j].offset = val; break;
//    case PROJ_BOUNCES:
//        g_tile[j].defproj.bounces = ProjectileData[j].bounces = val; break;
//    case PROJ_BSOUND:
//        g_tile[j].defproj.bsound = ProjectileData[j].bsound = val; break;
//    case PROJ_RANGE:
//        g_tile[j].defproj.range = ProjectileData[j].range = val; break;
//    case PROJ_USERDATA:
//        g_tile[j].defproj.userdata = ProjectileData[j].userdata = val; break;
//    default: break;
//    }

//    g_tile[j].flags |= SPRITE_PROJECTILE;
//}

function C_AllocQuote(qnum: number) : number
{
    if (!ScriptQuotes[qnum])
    {
        ScriptQuotes[qnum] = new Uint8Array(MAXQUOTELEN);
        if (!ScriptQuotes[qnum])
        {
            Bsprintf(tempbuf, "Failed allocating %d byte quote text buffer.", MAXQUOTELEN);
            G_GameExit(tempbuf.toString());
        }

        return 1;
    }

    return 0;
}

function C_InitQuotes(): void
{
    var i:number;
    
    for (i=127; i>=0; i--)
        C_AllocQuote(i);

    for (i=MAXQUOTELEN-7; i>=0; i--)
        if (Bstrncmp(ScriptQuotes[13].subarray(i).toString(),"SPACE",5) == 0)
        {
            var tmp = "";
            tmp += ScriptQuotes[13].subarray(0,i).toString();
            tmp+= "OPEN";
            tmp+=ScriptQuotes[13].subarray(i+5).toString();;
            Bstrncpy(ScriptQuotes[13],tmp,MAXQUOTELEN-1);
            i = MAXQUOTELEN-7;
            //Bmemset(tempbuf.buffer,0,sizeof(tempbuf));
            //Bstrncpy(tempbuf,ScriptQuotes[13].toString(),i);
            //Bstrcat(tempbuf,"OPEN");
            //Bstrcat(tempbuf,ScriptQuotes[13].subarray(i+5).toString());
            //Bstrncpy(ScriptQuotes[13],tempbuf,MAXQUOTELEN-1);
            //i = MAXQUOTELEN-7;
        }

    // most of these are based on Blood, obviously
    {
        var PlayerObituaries =
        [
            "^02%s^02 beat %s^02 like a cur",
            "^02%s^02 broke %s",
            "^02%s^02 body bagged %s",
            "^02%s^02 boned %s^02 like a fish",
            "^02%s^02 castrated %s",
            "^02%s^02 creamed %s",
            "^02%s^02 crushed %s",
            "^02%s^02 destroyed %s",
            "^02%s^02 diced %s",
            "^02%s^02 disemboweled %s",
            "^02%s^02 erased %s",
            "^02%s^02 eviscerated %s",
            "^02%s^02 flailed %s",
            "^02%s^02 flattened %s",
            "^02%s^02 gave AnAl MaDnEsS to %s",
            "^02%s^02 gave %s^02 Anal Justice",
            "^02%s^02 hosed %s",
            "^02%s^02 hurt %s^02 real bad",
            "^02%s^02 killed %s",
            "^02%s^02 made dog meat out of %s",
            "^02%s^02 made mincemeat out of %s",
            "^02%s^02 manhandled %s",
            "^02%s^02 massacred %s",
            "^02%s^02 mutilated %s",
            "^02%s^02 murdered %s",
            "^02%s^02 neutered %s",
            "^02%s^02 punted %s",
            "^02%s^02 reamed %s",
            "^02%s^02 ripped %s^02 a new orifice",
            "^02%s^02 rocked %s",
            "^02%s^02 sent %s^02 to hell",
            "^02%s^02 shredded %s",
            "^02%s^02 slashed %s",
            "^02%s^02 slaughtered %s",
            "^02%s^02 sliced %s",
            "^02%s^02 smacked %s around",
            "^02%s^02 smashed %s",
            "^02%s^02 snuffed %s",
            "^02%s^02 sodomized %s",
            "^02%s^02 splattered %s",
            "^02%s^02 sprayed %s",
            "^02%s^02 squashed %s",
            "^02%s^02 throttled %s",
            "^02%s^02 toasted %s",
            "^02%s^02 vented %s",
            "^02%s^02 ventilated %s",
            "^02%s^02 wasted %s",
            "^02%s^02 wrecked %s",
        ];

        var PlayerSelfObituaries =
        [
            "^02%s^02 is excrement",
            "^02%s^02 is hamburger",
            "^02%s^02 suffered scrotum separation",
            "^02%s^02 volunteered for population control",
            "^02%s^02 has suicided",
            "^02%s^02 bled out",
        ];

        g_numObituaries = PlayerObituaries.length;
        for (i=g_numObituaries-1; i>=0; i--)
        {
            if (C_AllocQuote(i+OBITQUOTEINDEX))
                Bstrcpy(ScriptQuotes[i+OBITQUOTEINDEX],PlayerObituaries[i]);
        }

        g_numSelfObituaries = PlayerSelfObituaries.length;
        for (i=g_numSelfObituaries-1; i>=0; i--)
        {
            if (C_AllocQuote(i+SUICIDEQUOTEINDEX))
                 Bstrcpy(ScriptQuotes[i+SUICIDEQUOTEINDEX],PlayerSelfObituaries[i]);
        }
    }
}

//#if !defined LUNATIC
function C_ParseCommand(loop: number): number
{
    var i:number, j=0, k=0, tw:number, otw:number;
////    char *temptextptr;
    var tempscrptr: number = NULL; // intptr_t *
    
    do
    {
        if (quitevent)
        {
            initprintf("Aborted.\n");
            G_Shutdown();
            exit(0);
        }

        if (g_numCompilerErrors > 63 || (textptr[textptrIdx] == '\0') || (textptr[textptrIdx+1] == '\0') || C_SkipComments())
            return 1;

        if (g_scriptDebug)
            C_ReportError(-1);

        tempscrptr = NULL; // temptextptr = NULL;
        otw = g_lastKeyword;
        
        switch ((g_lastKeyword = tw = C_GetNextKeyword()))
        {
        default:
            debugger;
            throw "todo " + tw + ": " + keyw[tw];
        case -1:
        case -2:
            return 1; //End
        case CON_STATE:
            if (!g_parsingActorPtr && g_processingState == 0)
            {
                C_GetNextLabelName();
                g_scriptPtr--;
                labelcode[g_numLabels] = g_scriptPtr-scriptIdx;
                labeltype[g_numLabels] = LABEL_STATE;

                g_processingState = 1;
                g_szCurrentBlockName = label.subarray(g_numLabels<<6).toString();

                if (hash_find(h_keywords,label.subarray(g_numLabels<<6).toString())>=0)
                {
                    g_numCompilerErrors++;
                    C_ReportError(ERROR_ISAKEYWORD);
                    continue;
                }

                if (hash_find(h_gamevars,label.subarray(g_numLabels<<6).toString())>=0)
                {
                    g_numCompilerWarnings++;
                    C_ReportError(WARNING_NAMEMATCHESVAR);
                }

                hash_add(h_labels,label.subarray(g_numLabels<<6).toString(),g_numLabels,0);
                g_numLabels++;
                continue;
            }

            C_GetNextLabelName();

            if ((j = hash_find(h_labels,label.subarray(g_numLabels<<6).toString())) >= 0)
            {
                if (labeltype[j] & LABEL_STATE)
                {
                    if (!(g_numCompilerErrors || g_numCompilerWarnings) && g_scriptDebug > 1)
                        initprintf("%s:%d: debug: accepted state label `%s'.\n",g_szScriptFileName,g_lineNumber,label.subarray(j<<6).toString());
                    script[g_scriptPtr] = /*(intptr_t)*/(scriptIdx+labelcode[j]);

                    // 'state' type labels are always script addresses, as far as I can see
                    bitptr[(g_scriptPtr-scriptIdx)>>3] |= (BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));

                    g_scriptPtr++;
                    continue;
                }
                else
                {
                    var gl = C_GetLabelType(labeltype[j]);
                    C_ReportError(-1);
                    initprintf("%s:%d: warning: expected state, found %s.\n",g_szScriptFileName,g_lineNumber,gl);
                    g_numCompilerWarnings++;
                    //Bfree(gl);
                    script[g_scriptPtr-1] = CON_NULLOP; // get rid of the state, leaving a nullop to satisfy if conditions
                    bitptr[(g_scriptPtr-scriptIdx-1)>>3] &= ~(1<<((g_scriptPtr-scriptIdx-1)&7));
                    continue;  // valid label name, but wrong type
                }
            }
            else
            {
                C_ReportError(-1);
                initprintf("%s:%d: error: state `%s' not found.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
                g_numCompilerErrors++;
            }
            g_scriptPtr++;
            continue;

        case CON_ENDS:
            if (g_processingState == 0)
            {
                C_ReportError(-1);
                initprintf("%s:%d: error: found `ends' without open `state'.\n",g_szScriptFileName,g_lineNumber);
                g_numCompilerErrors++;
            }
            //            else
            {
                if (g_numBraces > 0)
                {
                    C_ReportError(ERROR_OPENBRACKET);
                    g_numCompilerErrors++;
                }
                else if (g_numBraces < 0)
                {
                    C_ReportError(ERROR_CLOSEBRACKET);
                    g_numCompilerErrors++;
                }
                if (g_checkingSwitch > 0)
                {
                    C_ReportError(ERROR_NOENDSWITCH);
                    g_numCompilerErrors++;

                    g_checkingSwitch = 0; // can't be checking anymore...
                }

                g_processingState = 0;
                g_szCurrentBlockName = "(none)";
            }
            continue;

//        case CON_SETTHISPROJECTILE:
//        case CON_SETPROJECTILE:
//        case CON_GETTHISPROJECTILE:
//        case CON_GETPROJECTILE:
//            {
//                int32_t lLabelID;

//                // syntax getwall[<var>].x <VAR>
//                // gets the value of wall[<var>].xxx into <VAR>

//                // now get name of .xxx
//                while ((textptr[textptrIdx] != '['))
//                {
//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx] == '[')
//                    textptrIdx++;

//                // get the ID of the DEF
//                if (tw == CON_SETTHISPROJECTILE)
//                    g_labelsOnly = 1;
//                C_GetNextVar();
//                g_labelsOnly = 0;
//                // now get name of .xxx
//                while (textptr[textptrIdx] != '.')
//                {
//                    if (textptr[textptrIdx] == 0xa)
//                        break;
//                    if (!textptr[textptrIdx])
//                        break;

//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx]!='.')
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYNTAXERROR);
//                    continue;
//                }
//                textptrIdx++;
//                /// now pointing at 'xxx'
//                C_GetNextLabelName();
//                //printf("found xxx label of \"%s\"\n",   label.subarray(g_numLabels<<6).toString());

//                lLabelID=C_GetLabelNameOffset(&projectileH,Bstrtolower(label.subarray(g_numLabels<<6).toString()));
//                //printf("LabelID is %d\n",lLabelID);
//                if (lLabelID == -1)
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYMBOLNOTRECOGNIZED);
//                    continue;
//                }

//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=ProjectileLabels[lLabelID].lId;

//                //printf("member's flags are: %02Xh\n",PlayerLabels[lLabelID].flags);

//                // now at target VAR...

//                // get the ID of the DEF
//                switch (tw)
//                {
//                case CON_SETPROJECTILE:
//                case CON_SETTHISPROJECTILE:
//                    C_GetNextVar();
//                    break;
//                default:
//                    C_GetNextVarType(GAMEVAR_READONLY);
//                    break;
//                }
//                continue;
//            }

//        case CON_GAMEVAR:
//            // syntax: gamevar <var1> <initial value> <flags>
//            // defines var1 and sets initial value.
//            // flags are used to define usage
//            // (see top of this files for flags)
//            //printf("Got gamedef. Getting Label. '%.20s'\n",textptr);

//            if (isdigit(textptr[textptrIdx]) || (textptr[textptrIdx] == '-'))
//            {
//                C_GetNextLabelName();
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_SYNTAXERROR);
//                C_GetNextValue(LABEL_DEFINE);
//                C_GetNextValue(LABEL_DEFINE);
//                g_scriptPtr -= 3; // we complete the process anyways just to skip past the fucked up section
//                continue;
//            }

//            C_GetNextLabelName();
//            //printf("Got Label '%.20s'\n",textptr);
//            // Check to see it's already defined

//            if (hash_find(h_keywords,label.subarray(g_numLabels<<6).toString())>=0)
//            {
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_ISAKEYWORD);
//                continue;
//            }

//            //printf("Translating number  '%.20s'\n",textptr);
//            C_GetNextValue(LABEL_DEFINE); // get initial value
//            //printf("Done Translating number.  '%.20s'\n",textptr);

//            C_GetNextValue(LABEL_DEFINE); // get flags
//            //Bsprintf(g_szBuf,"Adding GameVar=\"%s\", val=%l, flags=%lX",label.subarray(g_numLabels<<6).toString(),
//            //      script[g_scriptPtr-2], script[g_scriptPtr-1]);
//            //AddLog(g_szBuf);
//            if ((script[g_scriptPtr-1]&GAMEVAR_USER_MASK)==3)
//            {
//                g_numCompilerWarnings++;
//                script[g_scriptPtr-1]^=GAMEVAR_PERPLAYER;
//                C_ReportError(WARNING_BADGAMEVAR);
//            }
//            Gv_NewVar(label.subarray(g_numLabels<<6).toString(),script[g_scriptPtr-2],
//                (script[g_scriptPtr-1])
//                // can't define default or secret
//                & (~(GAMEVAR_DEFAULT | GAMEVAR_SECRET))
//                );
//            //AddLog("Added gamevar");
//            g_scriptPtr -= 3; // no need to save in script...
//            continue;

//        case CON_GAMEARRAY:
//            if (isdigit(textptr[textptrIdx]) || (textptr[textptrIdx] == '-'))
//            {
//                C_GetNextLabelName();
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_SYNTAXERROR);
//                C_GetNextValue(LABEL_DEFINE);
//                C_GetNextValue(LABEL_DEFINE);
//                g_scriptPtr -= 2; // we complete the process anyways just to skip past the fucked up section
//                continue;
//            }
//            C_GetNextLabelName();
//            //printf("Got Label '%.20s'\n",textptr);
//            // Check to see it's already defined

//            if (hash_find(h_keywords,label.subarray(g_numLabels<<6).toString())>=0)
//            {
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_ISAKEYWORD);
//                continue;
//            }

//            i = hash_find(h_gamevars,label.subarray(g_numLabels<<6).toString());
//            if (i>=0)
//            {
//                g_numCompilerWarnings++;
//                C_ReportError(WARNING_NAMEMATCHESVAR);
//            }

//            C_GetNextValue(LABEL_DEFINE);
//            Gv_NewArray(label.subarray(g_numLabels<<6).toString(),NULL,script[g_scriptPtr-1], GAMEARRAY_NORMAL);

//            g_scriptPtr -= 2; // no need to save in script...
//            continue;


        case CON_DEFINE:
            {
                dlog(DEBUG_COMPILE, "Got definition. Getting Label. '%.20s'\n",textptr.substr(textptrIdx, 20));
                C_GetNextLabelName();
                dlog(DEBUG_COMPILE, "Got label. '%.20s'\n",textptr.substr(textptrIdx, 20));
                // Check to see it's already defined

                if (hash_find(h_keywords,label.subarray(g_numLabels<<6).toString())>=0)
                {
                    g_numCompilerErrors++;
                    C_ReportError(ERROR_ISAKEYWORD);
                    continue;
                }

                i = hash_find(h_gamevars,label.subarray(g_numLabels<<6).toString());
                if (i>=0)
                {
                    g_numCompilerWarnings++;
                    C_ReportError(WARNING_NAMEMATCHESVAR);
                }

                //printf("Translating. '%.20s'\n",textptr);
                C_GetNextValue(LABEL_DEFINE);
                //printf("Translated. '%.20s'\n",textptr);

                i = hash_find(h_labels,label.subarray(g_numLabels<<6).toString());
                if (i>=0)
                {
                    // if (i >= g_numDefaultLabels)

                    if (labelcode[i] != script[g_scriptPtr-1])
                    {
                        g_numCompilerWarnings++;
                        initprintf("%s:%d: warning: ignored redefinition of `%s' to %d (old: %d).\n",g_szScriptFileName,
                                   g_lineNumber,label.subarray(g_numLabels<<6).toString(), (script[g_scriptPtr-1]), labelcode[i]);
                        //C_ReportError(WARNING_DUPLICATEDEFINITION);
                    }
                }
                else
                {
                    dlog(DEBUG_COMPILE, "Defining Definition \"%s\" to be '%d'\n",label.subarray(g_numLabels<<6).toString(),script[g_scriptPtr-1]);
                    hash_add(h_labels,label.subarray(g_numLabels<<6).toString(),g_numLabels,0);
                    labeltype[g_numLabels] = LABEL_DEFINE;
                    labelcode[g_numLabels++] = script[g_scriptPtr-1];
                    if (script[g_scriptPtr-1] >= 0 && script[g_scriptPtr-1] < MAXTILES && g_dynamicTileMapping)
                        G_ProcessDynamicTileMapping(label.subarray((g_numLabels-1)<<6).toString(),script[g_scriptPtr-1]);
                }
                g_scriptPtr -= 2;
                continue;
            }

        case CON_PALFROM:
            for (j=3; j>=0; j--)
            {
                if (C_GetKeyword() == -1)
                    C_GetNextValue(LABEL_DEFINE);
                else break;
            }

            while (j>-1)
            {
                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
                script[g_scriptPtr++] = 0;
                j--;
            }
            continue;

        case CON_MOVE:
            if (g_parsingActorPtr || g_processingState)
            {
                if ((C_GetNextValue(LABEL_MOVE|LABEL_DEFINE) == 0) && (script[g_scriptPtr-1] != 0) && (script[g_scriptPtr-1] != 1))
                {
                    C_ReportError(-1);
                    bitptr[(g_scriptPtr-scriptIdx-1)>>3] &= ~(1<<((g_scriptPtr-scriptIdx-1)&7));
                    script[g_scriptPtr-1] = 0;
                    initprintf("%s:%d: warning: expected a move, found a constant.\n",g_szScriptFileName,g_lineNumber);
                    g_numCompilerWarnings++;
                }

                j = 0;
                while (C_GetKeyword() == -1)
                {
                    C_GetNextValue(LABEL_DEFINE);
                    g_scriptPtr--;
                    j |= script[g_scriptPtr];
                }
                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
                script[g_scriptPtr] = j;

                g_scriptPtr++;
            }
            else
            {
                g_scriptPtr--;
                C_GetNextLabelName();
                // Check to see it's already defined

                if (hash_find(h_keywords,label.subarray(g_numLabels<<6).toString())>=0)
                {
                    g_numCompilerErrors++;
                    C_ReportError(ERROR_ISAKEYWORD);
                    continue;
                }

                if (hash_find(h_gamevars,label.subarray(g_numLabels<<6).toString())>=0)
                {
                    g_numCompilerWarnings++;
                    C_ReportError(WARNING_NAMEMATCHESVAR);
                }

                if ((i = hash_find(h_labels,label.subarray(g_numLabels<<6).toString())) >= 0)
                {
                    g_numCompilerWarnings++;
                    initprintf("%s:%d: warning: duplicate move `%s' ignored.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
                }
                else
                {
                    hash_add(h_labels,label.subarray(g_numLabels<<6).toString(),g_numLabels,0);
                    labeltype[g_numLabels] = LABEL_MOVE;
                    labelcode[g_numLabels++] = g_scriptPtr-scriptIdx;
                }

                for (j=1; j>=0; j--)
                {
                    if (C_GetKeyword() != -1) break;
                    C_GetNextValue(LABEL_DEFINE);
                }

                for (k=j; k>=0; k--)
                {
                    bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
                    script[g_scriptPtr] = 0;
                    g_scriptPtr++;
                }
            }
            continue;

        case CON_MUSIC:
            {
                // NOTE: this doesn't get stored in the PCode...
             
                // music 1 stalker.mid dethtoll.mid streets.mid watrwld1.mid snake1.mid
                //    thecall.mid ahgeez.mid dethtoll.mid streets.mid watrwld1.mid snake1.mid
                g_scriptPtr--;
                C_GetNextValue(LABEL_DEFINE); // Volume Number (0/4)
                g_scriptPtr--;

                k = script[g_scriptPtr]-1;

                if (k >= 0) // if it's background music
                {
                    i = 0;
                    // get the file name...
                    while (C_GetKeyword() == -1)
                    {
                        C_SkipComments();
                        j = 0;
                        tempbuf[j] = '/'.charCodeAt(0);
                        while (isaltok(textptr[textptrIdx+j]))
                        {
                            tempbuf[j+1] = textptr.charCodeAt(textptrIdx + j);
                            j++;
                        }
                        tempbuf[j+1] = 0;

                        if (!MapInfo[(k*MAXLEVELS)+i].musicfn)
                            MapInfo[(k*MAXLEVELS)+i].musicfn = "";//(char *)Bcalloc(Bstrlen(tempbuf)+1,sizeof(uint8_t));
                        else if ((Bstrlen(tempbuf)+1) > sizeof(MapInfo[(k*MAXLEVELS)+i].musicfn))
                            todoThrow("MapInfo[(k*MAXLEVELS)+i].musicfn = (char *)Brealloc(MapInfo[(k*MAXLEVELS)+i].musicfn,(Bstrlen(tempbuf)+1));");

                        MapInfo[(k*MAXLEVELS)+i].musicfn = tempbuf.toString();

                        check_filename_case(tempbuf.toString());

                        textptrIdx += j;
                        if (i > MAXLEVELS-1) break;
                        i++;
                    }
                }
                else
                {
                    i = 0;
                    while (C_GetKeyword() == -1)
                    {
                        C_SkipComments();
                        j = 0;

                        EnvMusicFilename[i]="";
                        while (isaltok(textptr[textptrIdx+j]))
                        {
                            EnvMusicFilename[i] += textptr[textptrIdx + j];
                            j++;
                        }
                        //EnvMusicFilename[i][j] = '\0';

                        check_filename_case(EnvMusicFilename[i]);

                        textptrIdx += j;
                        if (i > MAXVOLUMES-1) break;
                        i++;
                    }
                }
            }
            continue;

        case CON_INCLUDE:
            g_scriptPtr--;
            
            C_SkipComments();

            j = 0;
            while (isaltok(textptr[textptrIdx]))
            {
                tempbuf[j] =  textptr.charCodeAt(textptrIdx++);
                j++;
            }
            tempbuf[j] = 0;

            C_Include(tempbuf.toString());
            continue;

        case CON_INCLUDEDEFAULT:
            C_SkipComments();
            C_Include(G_DefaultConFile());
            continue;

        case CON_AI:
            if (g_parsingActorPtr || g_processingState)
            {
                C_GetNextValue(LABEL_AI);
            }
            else
            {
                g_scriptPtr--;
                C_GetNextLabelName();

                if (hash_find(h_keywords,label.subarray(g_numLabels<<6).toString())>=0)
                {
                    g_numCompilerErrors++;
                    C_ReportError(ERROR_ISAKEYWORD);
                    continue;
                }

                i = hash_find(h_gamevars,label.subarray(g_numLabels<<6).toString());
                if (i>=0)
                {
                    g_numCompilerWarnings++;
                    C_ReportError(WARNING_NAMEMATCHESVAR);
                }

                i = hash_find(h_labels,label.subarray(g_numLabels<<6).toString());
                if (i>=0)
                {
                    g_numCompilerWarnings++;
                    initprintf("%s:%d: warning: duplicate ai `%s' ignored.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
                }
                else
                {
                    labeltype[g_numLabels] = LABEL_AI;
                    hash_add(h_labels,label.subarray(g_numLabels<<6).toString(),g_numLabels,0);
                    labelcode[g_numLabels++] = g_scriptPtr-scriptIdx;
                }

                for (j=0; j<3; j++)
                {
                    if (C_GetKeyword() != -1) break;
                    if (j == 1)
                        C_GetNextValue(LABEL_ACTION);
                    else if (j == 2)
                    {
                        if ((C_GetNextValue(LABEL_MOVE|LABEL_DEFINE) == 0) && (script[g_scriptPtr-1] != 0) && (script[g_scriptPtr-1] != 1))
                        {
                            C_ReportError(-1);
                            bitptr[(g_scriptPtr-scriptIdx-1)>>3] &= ~(1<<((g_scriptPtr-scriptIdx-1)&7));
                            script[g_scriptPtr-1] = 0;
                            initprintf("%s:%d: warning: expected a move, found a constant.\n",g_szScriptFileName,g_lineNumber);
                            g_numCompilerWarnings++;
                        }
                        k = 0;
                        while (C_GetKeyword() == -1)
                        {
                            C_GetNextValue(LABEL_DEFINE);
                            g_scriptPtr--;
                            k |= script[g_scriptPtr];
                        }
                        bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
                        script[g_scriptPtr] = k;
                        g_scriptPtr++;
                        j = 666;
                        break;
                    }
                }

                if (j == 666)
                    continue;

                for (k=j; k<3; k++)
                {
                    bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
                    script[g_scriptPtr] = 0;
                    g_scriptPtr++;
                }
            }
            continue;

        case CON_ACTION:
            if (g_parsingActorPtr || g_processingState)
            {
                C_GetNextValue(LABEL_ACTION);
            }
            else
            {
                g_scriptPtr--;
                C_GetNextLabelName();
                // Check to see it's already defined

                if (hash_find(h_keywords,label.subarray(g_numLabels<<6).toString())>=0)
                {
                    g_numCompilerErrors++;
                    C_ReportError(ERROR_ISAKEYWORD);
                    continue;
                }

                i = hash_find(h_gamevars,label.subarray(g_numLabels<<6).toString());
                if (i>=0)
                {
                    g_numCompilerWarnings++;
                    C_ReportError(WARNING_NAMEMATCHESVAR);
                }

                i = hash_find(h_labels,label.subarray(g_numLabels<<6).toString());
                if (i>=0)
                {
                    g_numCompilerWarnings++;
                    initprintf("%s:%d: warning: duplicate action `%s' ignored.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
                }
                else
                {
                    labeltype[g_numLabels] = LABEL_ACTION;
                    labelcode[g_numLabels] = g_scriptPtr-scriptIdx;
                    hash_add(h_labels,label.subarray(g_numLabels<<6).toString(),g_numLabels,0);
                    g_numLabels++;
                }

                for (j=4; j>=0; j--)
                {
                    if (C_GetKeyword() != -1) break;
                    C_GetNextValue(LABEL_DEFINE);
                }
                for (k=j; k>=0; k--)
                {
                    bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
                    script[g_scriptPtr++] = 0;
                }
            }
            continue;

        case CON_ACTOR:
        case CON_USERACTOR:
        case CON_EVENTLOADACTOR:
            if (g_processingState || g_parsingActorPtr)
            {
                C_ReportError(ERROR_FOUNDWITHIN);
                g_numCompilerErrors++;
            }

            g_numBraces = 0;
            g_scriptPtr--;
            g_parsingActorPtr = g_scriptPtr;

            if (tw == CON_USERACTOR)
            {
                C_GetNextValue(LABEL_DEFINE);
                g_scriptPtr--;
            }

            // save the actor name w/o consuming it
            C_SkipComments();
            j = 0;
            g_szCurrentBlockName = "";
            while (isaltok(textptr[textptrIdx+j]))
            {
                g_szCurrentBlockName += textptr[textptrIdx+j];
                j++;
            }

            if (tw == CON_USERACTOR)
            {
                j = script[g_scriptPtr];

                if (j > 6 || (j&3)==3)
                {
                    C_ReportError(-1);
                    initprintf("%s:%d: warning: invalid useractor type. Must be 0, 1, 2" + 
                               " (notenemy, enemy, enemystayput) or have 4 added (\"doesn't move\").\n",
                               g_szScriptFileName,g_lineNumber);
                    g_numCompilerWarnings++;
                    j = 0;
                }
            }

            C_GetNextValue(LABEL_DEFINE);
            g_scriptPtr--;

            if ((script[g_scriptPtr] >>> 0) >= MAXTILES)
            {
                C_ReportError(ERROR_EXCEEDSMAXTILES);
                g_numCompilerErrors++;
                continue;
            }

            if (tw == CON_EVENTLOADACTOR)
            {
                g_tile[script[g_scriptPtr]].loadPtr = g_parsingActorPtr;
                g_checkingIfElse = 0;
                continue;
            }

            g_tile[script[g_scriptPtr]].execPtr = g_parsingActorPtr;

            if (tw == CON_USERACTOR)
            {
                if (j & 1)
                    g_tile[script[g_scriptPtr]].flags |= SPRITE_BADGUY;

                if (j & 2)
                    g_tile[script[g_scriptPtr]].flags |= (SPRITE_BADGUY|SPRITE_BADGUYSTAYPUT);

                if (j & 4)
                    g_tile[script[g_scriptPtr]].flags |= SPRITE_ROTFIXED;
            }

            for (j=0; j<4; j++)
            {
                bitptr[(g_parsingActorPtr+j-scriptIdx)>>3] &= ~(1<<((g_parsingActorPtr+j-scriptIdx)&7));
                script[g_parsingActorPtr+j] = 0;
                if (j == 3)
                {
                    j = 0;
                    while (C_GetKeyword() == -1)
                    {
                        C_GetNextValue(LABEL_DEFINE);
                        g_scriptPtr--;
                        j |= script[g_scriptPtr];
                    }
                    bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
                    script[g_scriptPtr] = j;
                    g_scriptPtr++;
                    break;
                }
                else
                {
                    if (C_GetKeyword() != -1)
                    {
                        for (i=4-j; i; i--)
                        {
                            bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
                            script[g_scriptPtr++] = 0;
                        }
                        break;
                    }
                    switch (j)
                    {
                    case 0:
                        C_GetNextValue(LABEL_DEFINE);
                        break;
                    case 1:
                        C_GetNextValue(LABEL_ACTION);
                        break;
                    case 2:
                        // XXX: LABEL_MOVE|LABEL_DEFINE, what is this shit? compatibility?
                        if ((C_GetNextValue(LABEL_MOVE|LABEL_DEFINE) == 0) && (script[g_scriptPtr-1] != 0) && (script[g_scriptPtr-1] != 1))
                        {
                            C_ReportError(-1);
                            bitptr[(g_scriptPtr-scriptIdx-1)>>3] &= ~(1<<((g_scriptPtr-scriptIdx-1)&7));
                            script[g_scriptPtr-1] = 0;
                            initprintf("%s:%d: warning: expected a move, found a constant.\n",g_szScriptFileName,g_lineNumber);
                            g_numCompilerWarnings++;
                        }
                        break;
                    }
                    if (script[g_scriptPtr-1] >= 0 /*(intptr_t)&script[0]*/ && script[g_scriptPtr-1] < g_scriptSize /*(intptr_t)&script[g_scriptSize]*/)
                        bitptr[(g_parsingActorPtr+j-scriptIdx)>>3] |= (BITPTR_POINTER<<((g_parsingActorPtr+j-scriptIdx)&7));
                    else bitptr[(g_parsingActorPtr+j-scriptIdx)>>3] &= ~(1<<((g_parsingActorPtr+j-scriptIdx)&7));
                    script[g_parsingActorPtr+j] = script[g_scriptPtr-1];
                }
            }
            g_checkingIfElse = 0;
            continue;

//        case CON_ONEVENT:
//            if (g_processingState || g_parsingActorPtr)
//            {
//                C_ReportError(ERROR_FOUNDWITHIN);
//                g_numCompilerErrors++;
//            }

//            g_numBraces = 0;
//            g_scriptPtr--;
//            g_parsingEventPtr = g_scriptPtr;
//            g_parsingActorPtr = g_scriptPtr;

//            C_SkipComments();
//            j = 0;
//            while (isaltok(textptr[textptrIdx+j]))
//            {
//                g_szCurrentBlockName[j] = textptr[textptrIdx+j];         /// TODO THIS IS STRING !!STRING!!!!
//                j++;
//            }
//            g_szCurrentBlockName[j] = 0;
//            //        g_labelsOnly = 1;
//            C_GetNextValue(LABEL_DEFINE);
//            g_labelsOnly = 0;
//            g_scriptPtr--;
//            j= script[g_scriptPtr];  // type of event
//            g_currentEvent = j;
//            //Bsprintf(g_szBuf,"Adding Event for %d at %lX",j, g_parsingEventPtr);
//            //AddLog(g_szBuf);
//            if (j > MAXGAMEEVENTS-1 || j < 0)
//            {
//                initprintf("%s:%d: error: invalid event ID.\n",g_szScriptFileName,g_lineNumber);
//                g_numCompilerErrors++;
//                continue;
//            }
//            // if event has already been declared then store previous script location
//            if (apScriptGameEvent[j])
//            {
//                previous_event =apScriptGameEvent[j];
//            }
//            apScriptGameEvent[j]=g_parsingEventPtr;

//            g_checkingIfElse = 0;

//            continue;

//        case CON_INSERTSPRITEQ:
//            continue;

//        case CON_QSPRINTF:
//            C_GetManyVars(2);

//            j = 0;

//            while (C_GetKeyword() == -1 && j < 32)
//                C_GetNextVar(), j++;

//            script[g_scriptPtr++] = CON_NULLOP + (g_lineNumber<<12);
//            continue;

        case CON_ESPAWN:
        case CON_ESHOOT:
        case CON_QSPAWN:
        case CON_EQSPAWN:
        case CON_STRENGTH:
        case CON_SHOOT:
        case CON_ADDPHEALTH:
        case CON_SPAWN:
        case CON_CSTAT:
        case CON_COUNT:
        case CON_ENDOFGAME:
        case CON_ENDOFLEVEL:
        case CON_SPRITEPAL:
        case CON_CACTOR:
        case CON_MONEY:
        case CON_ADDKILLS:
        case CON_DEBUG:
        case CON_ADDSTRENGTH:
        case CON_CSTATOR:
        case CON_MAIL:
        case CON_PAPER:
        case CON_SLEEPTIME:
        case CON_CLIPDIST:
        case CON_LOTSOFGLASS:
        case CON_SAVENN:
        case CON_SAVE:
        case CON_ANGOFF:
        case CON_QUOTE:
        case CON_SOUND:
        case CON_GLOBALSOUND:
        case CON_SOUNDONCE:
        case CON_STOPSOUND:
            C_GetNextValue(LABEL_DEFINE);
            if (tw == CON_CSTAT)
            {
                if (script[g_scriptPtr-1] == 32767)
                {
                    script[g_scriptPtr-1] = 32768;
                    C_ReportError(-1);
                    initprintf("%s:%d: warning: tried to set cstat 32767, using 32768 instead.\n",g_szScriptFileName,g_lineNumber);
                    g_numCompilerWarnings++;
                }
                else if ((script[g_scriptPtr-1] & 32) && (script[g_scriptPtr-1] & 16))
                {
                    i = script[g_scriptPtr-1];
                    script[g_scriptPtr-1] ^= 48;
                    C_ReportError(-1);
                    initprintf("%s:%d: warning: tried to set cstat %d, using %d instead.\n",g_szScriptFileName,g_lineNumber,i,(script[g_scriptPtr-1]));
                    g_numCompilerWarnings++;
                }
            }
            continue;

//        case CON_HITRADIUSVAR:
//            C_GetManyVars(5);
//            continue;
        case CON_HITRADIUS:
            C_GetNextValue(LABEL_DEFINE);
            C_GetNextValue(LABEL_DEFINE);
            C_GetNextValue(LABEL_DEFINE);
        case CON_ADDAMMO:
        case CON_ADDWEAPON:
        case CON_SIZETO:
        case CON_SIZEAT:
        case CON_DEBRIS:
        case CON_ADDINVENTORY:
        case CON_GUTS:
            C_GetNextValue(LABEL_DEFINE);
            C_GetNextValue(LABEL_DEFINE);
            continue;

        case CON_ELSE:
            if (g_checkingIfElse)
            {
                var offset: number;
                var lastScriptPtr = g_scriptPtr -/* &script[0] -*/ 1;

                g_ifElseAborted = 0;
                g_checkingIfElse--;

                if (C_CheckMalformedBranch(lastScriptPtr))
                    continue;

                tempscrptr = g_scriptPtr;
                offset = unsigned(tempscrptr-scriptIdx);
                g_scriptPtr++; //Leave a spot for the fail location
                C_ParseCommand(0);

                if (C_CheckEmptyBranch(tw, lastScriptPtr))
                    continue;

                tempscrptr = /*(intptr_t *)*/scriptIdx+offset;
                script[tempscrptr] = /*(intptr_t)*/ g_scriptPtr;
                bitptr[(tempscrptr-scriptIdx)>>3] |= (BITPTR_POINTER<<((tempscrptr-scriptIdx)&7));
            }
            else
            {
                g_scriptPtr--;
                tempscrptr = g_scriptPtr;
                g_numCompilerWarnings++;
                C_ReportError(-1);

                initprintf("%s:%d: warning: found `else' with no `if'.\n",g_szScriptFileName,g_lineNumber);

                if (C_GetKeyword() == CON_LEFTBRACE)
                {
                    C_GetNextKeyword();
                    g_numBraces++;

                    C_ParseCommand(1);
                }
                else C_ParseCommand(0);

                g_scriptPtr = tempscrptr;
            }
            continue;

//        case CON_SETSECTOR:
//        case CON_GETSECTOR:
//            {
//                int32_t lLabelID;

//                // syntax getsector[<var>].x <VAR>
//                // gets the value of sector[<var>].xxx into <VAR>

//                // now get name of .xxx
//                while ((textptr[textptrIdx] != '['))
//                {
//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx] == '[')
//                    textptrIdx++;

//                // get the ID of the DEF
//                g_labelsOnly = 1;
//                C_GetNextVar();
//                g_labelsOnly = 0;
//                // now get name of .xxx
//                while (textptr[textptrIdx] != '.')
//                {
//                    if (textptr[textptrIdx] == 0xa)
//                        break;
//                    if (!textptr[textptrIdx])
//                        break;

//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx]!='.')
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYNTAXERROR);
//                    continue;
//                }
//                textptrIdx++;
//                /// now pointing at 'xxx'
//                C_GetNextLabelName();
//                //printf("found xxx label of \"%s\"\n",   label.subarray(g_numLabels<<6).toString());

//                lLabelID=C_GetLabelNameID(SectorLabels,&sectorH,Bstrtolower(label.subarray(g_numLabels<<6).toString()));

//                if (lLabelID == -1)
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYMBOLNOTRECOGNIZED);
//                    continue;
//                }
//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=lLabelID;

//                // now at target VAR...

//                // get the ID of the DEF
//                if (tw==CON_GETSECTOR)
//                    C_GetNextVarType(GAMEVAR_READONLY);
//                else
//                    C_GetNextVar();
//                continue;
//            }

//        case CON_FINDNEARACTOR:
//        case CON_FINDNEARACTOR3D:
//        case CON_FINDNEARSPRITE:
//        case CON_FINDNEARSPRITE3D:
//        case CON_FINDNEARACTORZ:
//        case CON_FINDNEARSPRITEZ:
//            {
//                // syntax findnearactor <type> <maxdist> <getvar>
//                // gets the sprite ID of the nearest actor within max dist
//                // that is of <type> into <getvar>
//                // -1 for none found

//                C_GetNextValue(LABEL_DEFINE); // get <type>
//                C_GetNextValue(LABEL_DEFINE); // get maxdist

//                switch (tw)
//                {
//                case CON_FINDNEARACTORZ:
//                case CON_FINDNEARSPRITEZ:
//                    C_GetNextValue(LABEL_DEFINE);
//                default:
//                    break;
//                }

//                // target var
//                // get the ID of the DEF
//                C_GetNextVarType(GAMEVAR_READONLY);
//                continue;
//            }

//        case CON_FINDNEARACTORVAR:
//        case CON_FINDNEARACTOR3DVAR:
//        case CON_FINDNEARSPRITEVAR:
//        case CON_FINDNEARSPRITE3DVAR:
//        case CON_FINDNEARACTORZVAR:
//        case CON_FINDNEARSPRITEZVAR:
//            {
//                C_GetNextValue(LABEL_DEFINE); // get <type>

//                // get the ID of the DEF
//                C_GetNextVar();
//                switch (tw)
//                {
//                case CON_FINDNEARACTORZVAR:
//                case CON_FINDNEARSPRITEZVAR:
//                    C_GetNextVar();
//                default:
//                    break;
//                }
//                // target var
//                // get the ID of the DEF
//                C_GetNextVarType(GAMEVAR_READONLY);
//                continue;
//            }

//        case CON_SQRT:
//            {
//                // syntax sqrt <invar> <outvar>
//                // gets the sqrt of invar into outvar

//                // get the ID of the DEF
//                C_GetNextVar();
//                // target var
//                // get the ID of the DEF
//                C_GetNextVarType(GAMEVAR_READONLY);
//                continue;
//            }

//        case CON_SETWALL:
//        case CON_GETWALL:
//            {
//                int32_t lLabelID;

//                // syntax getwall[<var>].x <VAR>
//                // gets the value of wall[<var>].xxx into <VAR>

//                // now get name of .xxx
//                while ((textptr[textptrIdx] != '['))
//                {
//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx] == '[')
//                    textptrIdx++;

//                // get the ID of the DEF
//                g_labelsOnly = 1;
//                C_GetNextVar();
//                g_labelsOnly = 0;
//                // now get name of .xxx
//                while (textptr[textptrIdx] != '.')
//                {
//                    if (textptr[textptrIdx] == 0xa)
//                        break;
//                    if (!textptr[textptrIdx])
//                        break;

//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx]!='.')
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYNTAXERROR);
//                    continue;
//                }
//                textptrIdx++;
//                /// now pointing at 'xxx'
//                C_GetNextLabelName();
//                //printf("found xxx label of \"%s\"\n",   label.subarray(g_numLabels<<6).toString());

//                lLabelID=C_GetLabelNameID(WallLabels,&wallH,Bstrtolower(label.subarray(g_numLabels<<6).toString()));

//                if (lLabelID == -1)
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYMBOLNOTRECOGNIZED);
//                    continue;
//                }
//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=lLabelID;

//                // now at target VAR...

//                // get the ID of the DEF
//                if (tw == CON_GETWALL)
//                    C_GetNextVarType(GAMEVAR_READONLY);
//                else
//                    C_GetNextVar();
//                continue;
//            }

//        case CON_SETPLAYER:
//        case CON_GETPLAYER:
//            {
//                int32_t lLabelID;

//                // syntax getwall[<var>].x <VAR>
//                // gets the value of wall[<var>].xxx into <VAR>

//                // now get name of .xxx
//                while ((textptr[textptrIdx] != '['))
//                {
//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx] == '[')
//                    textptrIdx++;

//                // get the ID of the DEF
//                g_labelsOnly = 1;
//                C_GetNextVar();
//                g_labelsOnly = 0;
//                // now get name of .xxx
//                while (textptr[textptrIdx] != '.')
//                {
//                    if (textptr[textptrIdx] == 0xa)
//                        break;
//                    if (!textptr[textptrIdx])
//                        break;

//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx]!='.')
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYNTAXERROR);
//                    continue;
//                }
//                textptrIdx++;
//                /// now pointing at 'xxx'
//                C_GetNextLabelName();
//                //printf("found xxx label of \"%s\"\n",   label.subarray(g_numLabels<<6).toString());

//                lLabelID=C_GetLabelNameOffset(&playerH,Bstrtolower(label.subarray(g_numLabels<<6).toString()));
//                //printf("LabelID is %d\n",lLabelID);
//                if (lLabelID == -1)
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYMBOLNOTRECOGNIZED);
//                    continue;
//                }

//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=PlayerLabels[lLabelID].lId;

//                //printf("member's flags are: %02Xh\n",PlayerLabels[lLabelID].flags);
//                if (PlayerLabels[lLabelID].flags & LABEL_HASPARM2)
//                {
//                    //printf("Member has PARM2\n");
//                    // get parm2
//                    // get the ID of the DEF
//                    C_GetNextVar();
//                }
//                else
//                {
//                    //printf("Member does not have Parm2\n");
//                }

//                // now at target VAR...

//                // get the ID of the DEF
//                if (tw==CON_GETPLAYER)
//                    C_GetNextVarType(GAMEVAR_READONLY);
//                else
//                    C_GetNextVar();
//                continue;
//            }

//        case CON_SETINPUT:
//        case CON_GETINPUT:
//            {
//                int32_t lLabelID;

//                // syntax getwall[<var>].x <VAR>
//                // gets the value of wall[<var>].xxx into <VAR>

//                // now get name of .xxx
//                while ((textptr[textptrIdx] != '['))
//                {
//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx] == '[')
//                    textptrIdx++;

//                // get the ID of the DEF
//                g_labelsOnly = 1;
//                C_GetNextVar();
//                g_labelsOnly = 0;
//                // now get name of .xxx
//                while (textptr[textptrIdx] != '.')
//                {
//                    if (textptr[textptrIdx] == 0xa)
//                        break;
//                    if (!textptr[textptrIdx])
//                        break;

//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx]!='.')
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYNTAXERROR);
//                    continue;
//                }
//                textptrIdx++;
//                /// now pointing at 'xxx'
//                C_GetNextLabelName();
//                //printf("found xxx label of \"%s\"\n",   label.subarray(g_numLabels<<6).toString());

//                lLabelID=C_GetLabelNameOffset(&inputH,Bstrtolower(label.subarray(g_numLabels<<6).toString()));
//                //printf("LabelID is %d\n",lLabelID);
//                if (lLabelID == -1)
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYMBOLNOTRECOGNIZED);
//                    continue;
//                }

//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=InputLabels[lLabelID].lId;

//                // now at target VAR...

//                // get the ID of the DEF
//                if (tw==CON_GETINPUT)
//                    C_GetNextVarType(GAMEVAR_READONLY);
//                else
//                    C_GetNextVar();
//                continue;
//            }

//        case CON_SETUSERDEF:
//        case CON_GETUSERDEF:
//            {
//                int32_t lLabelID;

//                // syntax [gs]etuserdef.x <VAR>
//                // gets the value of ud.xxx into <VAR>

//                // now get name of .xxx
//                while (textptr[textptrIdx] != '.')
//                {
//                    if (textptr[textptrIdx] == 0xa)
//                        break;
//                    if (!textptr[textptrIdx])
//                        break;

//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx]!='.')
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYNTAXERROR);
//                    continue;
//                }
//                textptrIdx++;
//                /// now pointing at 'xxx'
//                C_GetNextLabelName();
//                //printf("found xxx label of \"%s\"\n",   label.subarray(g_numLabels<<6).toString());

//                lLabelID=C_GetLabelNameID(UserdefsLabels,&userdefH,Bstrtolower(label.subarray(g_numLabels<<6).toString()));

//                if (lLabelID == -1)
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYMBOLNOTRECOGNIZED);
//                    continue;
//                }
//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=lLabelID;

//                // now at target VAR...

//                // get the ID of the DEF
//                if (tw==CON_GETUSERDEF)
//                    C_GetNextVarType(GAMEVAR_READONLY);
//                else
//                    C_GetNextVar();
//                continue;
//            }

//        case CON_SETACTORVAR:
//        case CON_SETPLAYERVAR:
//        case CON_GETACTORVAR:
//        case CON_GETPLAYERVAR:
//            {
//                // syntax [gs]etactorvar[<var>].<varx> <VAR>
//                // gets the value of the per-actor variable varx into VAR

//                // now get name of <var>
//                while ((textptr[textptrIdx] != '['))
//                {
//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx] == '[')
//                    textptrIdx++;

//                // get the ID of the DEF
//                g_labelsOnly = 1;
//                C_GetNextVar();
//                g_labelsOnly = 0;
//                // now get name of .<varx>
//                while (textptr[textptrIdx] != '.')
//                {
//                    if (textptr[textptrIdx] == 0xa)
//                        break;
//                    if (!textptr[textptrIdx])
//                        break;

//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx]!='.')
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYNTAXERROR);
//                    continue;
//                }
//                textptrIdx++;

//                if (g_scriptPtr[-1] == g_iThisActorID) // convert to "setvarvar"
//                {
//                    g_scriptPtr--;
//                    g_scriptPtr[-1]=CON_SETVARVAR;
//                    if (tw == CON_SETACTORVAR || tw == CON_SETPLAYERVAR)
//                    {
//                        C_GetNextVarType(GAMEVAR_READONLY);
//                        C_GetNextVar();
//                    }
//                    else
//                    {
//                        g_scriptPtr++;
//                        C_GetNextVar();
//                        g_scriptPtr-=2;
//                        C_GetNextVarType(GAMEVAR_READONLY);
//                        g_scriptPtr++;
//                    }
//                    continue;
//                }

//                /// now pointing at 'xxx'

//                // get the ID of the DEF
//                C_GetNextLabelName();
//                //printf("found label of \"%s\"\n",   label.subarray(g_numLabels<<6).toString());

//                // Check to see if it's a keyword
//                if (hash_find(h_keywords,label.subarray(g_numLabels<<6).toString())>=0)
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_ISAKEYWORD);
//                    continue;
//                }

//                i=GetDefID(label.subarray(g_numLabels<<6).toString());
//                //printf("Label \"%s\" ID is %d\n",label.subarray(g_numLabels<<6).toString(), i);
//                if (i<0)
//                {
//                    // not a defined DEF
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_NOTAGAMEVAR);
//                    continue;
//                }
//                if (aGameVars[i].dwFlags & GAMEVAR_READONLY)
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_VARREADONLY);
//                    continue;
//                }

//                switch (tw)
//                {
//                case CON_SETACTORVAR:
//                    {
//                        if (!(aGameVars[i].dwFlags & GAMEVAR_PERACTOR))
//                        {
//                            g_numCompilerErrors++;
//                            C_ReportError(-1);
//                            initprintf("%s:%d: error: variable `%s' is not per-actor.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
//                            continue;
//                        }
//                        break;
//                    }
//                case CON_SETPLAYERVAR:
//                    {
//                        if (!(aGameVars[i].dwFlags & GAMEVAR_PERPLAYER))
//                        {
//                            g_numCompilerErrors++;
//                            C_ReportError(-1);
//                            initprintf("%s:%d: error: variable `%s' is not per-player.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
//                            continue;
//                        }
//                        break;
//                    }
//                }

//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=i; // the ID of the DEF (offset into array...)

//                switch (tw)
//                {
//                case CON_GETACTORVAR:
//                case CON_GETPLAYERVAR:
//                    C_GetNextVarType(GAMEVAR_READONLY);
//                    break;
//                default:
//                    C_GetNextVar();
//                    break;
//                }
//                continue;
//            }

//        case CON_SETACTOR:
//        case CON_GETACTOR:
//            {
//                int32_t lLabelID;

//                // syntax getwall[<var>].x <VAR>
//                // gets the value of wall[<var>].xxx into <VAR>

//                // now get name of .xxx
//                while ((textptr[textptrIdx] != '['))
//                    textptrIdx++;

//                if (textptr[textptrIdx] == '[')
//                    textptrIdx++;

//                // get the ID of the DEF
//                g_labelsOnly = 1;
//                C_GetNextVar();
//                g_labelsOnly = 0;
//                // now get name of .xxx

//                while (textptr[textptrIdx] != '.')
//                {
//                    if (textptr[textptrIdx] == 0xa)
//                        break;
//                    if (!textptr[textptrIdx])
//                        break;

//                    textptrIdx++;
//                }

//                if (textptr[textptrIdx] != '.')
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYNTAXERROR);
//                    continue;
//                }
//                textptrIdx++;
//                /// now pointing at 'xxx'

//                C_GetNextLabelName();
//                //printf("found xxx label of \"%s\"\n",   label.subarray(g_numLabels<<6).toString());

//                lLabelID=C_GetLabelNameOffset(&actorH,Bstrtolower(label.subarray(g_numLabels<<6).toString()));
//                //printf("LabelID is %d\n",lLabelID);
//                if (lLabelID == -1)
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYMBOLNOTRECOGNIZED);
//                    continue;
//                }

//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=ActorLabels[lLabelID].lId;

//                //printf("member's flags are: %02Xh\n",ActorLabels[lLabelID].flags);
//                if (ActorLabels[lLabelID].flags & LABEL_HASPARM2)
//                {
//                    //printf("Member has PARM2\n");
//                    // get parm2
//                    // get the ID of the DEF
//                    C_GetNextVar();
//                }

//                // now at target VAR...

//                // get the ID of the DEF
//                if (tw == CON_GETACTOR)
//                    C_GetNextVarType(GAMEVAR_READONLY);
//                else
//                    C_GetNextVar();
//                continue;
//            }

//        case CON_GETTSPR:
//        case CON_SETTSPR:
//            {
//                int32_t lLabelID;
//#if 0
//                if (g_currentEvent != EVENT_ANIMATESPRITES)
//                {
//                    C_ReportError(-1);
//                    initprintf("%s:%d: warning: found `%s' outside of EVENT_ANIMATESPRITES\n",g_szScriptFileName,g_lineNumber,tempbuf);
//                    g_numCompilerWarnings++;
//                }
//#endif
//                // syntax getwall[<var>].x <VAR>
//                // gets the value of wall[<var>].xxx into <VAR>

//                // now get name of .xxx
//                while ((textptr[textptrIdx] != '['))
//                {
//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx] == '[')
//                    textptrIdx++;

//                // get the ID of the DEF
//                g_labelsOnly = 1;
//                C_GetNextVar();
//                g_labelsOnly = 0;
//                // now get name of .xxx
//                while (textptr[textptrIdx] != '.')
//                {
//                    if (textptr[textptrIdx] == 0xa)
//                        break;
//                    if (!textptr[textptrIdx])
//                        break;

//                    textptrIdx++;
//                }
//                if (textptr[textptrIdx]!='.')
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYNTAXERROR);
//                    continue;
//                }
//                textptrIdx++;
//                /// now pointing at 'xxx'
//                C_GetNextLabelName();
//                //printf("found xxx label of \"%s\"\n",   label.subarray(g_numLabels<<6).toString());

//                lLabelID=C_GetLabelNameOffset(&tspriteH,Bstrtolower(label.subarray(g_numLabels<<6).toString()));
//                //printf("LabelID is %d\n",lLabelID);
//                if (lLabelID == -1)
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(ERROR_SYMBOLNOTRECOGNIZED);
//                    continue;
//                }

//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=TsprLabels[lLabelID].lId;

//                //printf("member's flags are: %02Xh\n",ActorLabels[lLabelID].flags);

//                // now at target VAR...

//                // get the ID of the DEF
//                if (tw == CON_GETTSPR)
//                    C_GetNextVarType(GAMEVAR_READONLY);
//                else
//                    C_GetNextVar();
//                continue;
//            }

//        case CON_STOPACTORSOUND:
//            C_GetManyVars(2);
//            continue;

//        case CON_SETACTORSOUNDPITCH:
//            C_GetManyVars(3);
//            continue;

//        case CON_SECTOROFWALL:
//            C_GetNextVarType(GAMEVAR_READONLY);
//            C_GetNextVar();
//            continue;

//        case CON_GETTICKS:
//        case CON_GETCURRADDRESS:
//            C_GetNextVarType(GAMEVAR_READONLY);
//            continue;

//        case CON_ESHOOTVAR:
//        case CON_ESPAWNVAR:
//        case CON_QSPAWNVAR:
//        case CON_EQSPAWNVAR:
//        case CON_OPERATERESPAWNS:
//        case CON_OPERATEMASTERSWITCHES:
//        case CON_CHECKACTIVATORMOTION:
//        case CON_TIME:
//        case CON_INITTIMER:
//        case CON_LOCKPLAYER:
//        case CON_SHOOTVAR:
//        case CON_QUAKE:
//        case CON_JUMP:
//        case CON_CMENU:
//        case CON_SOUNDVAR:
//        case CON_GLOBALSOUNDVAR:
//        case CON_STOPSOUNDVAR:
//        case CON_SCREENSOUND:
//        case CON_SOUNDONCEVAR:
//        case CON_ANGOFFVAR:
//        case CON_CHECKAVAILWEAPON:
//        case CON_CHECKAVAILINVEN:
//        case CON_GUNIQHUDID:
//        case CON_SAVEGAMEVAR:
//        case CON_USERQUOTE:
//        case CON_ECHO:
//        case CON_STARTTRACKVAR:
//        case CON_CLEARMAPSTATE:
//        case CON_ACTIVATECHEAT:
//        case CON_SETGAMEPALETTE:
//            C_GetNextVar();
//            continue;
//        case CON_READGAMEVAR:
//            C_GetNextVarType(GAMEVAR_READONLY);
//            continue;

//        case CON_ENHANCED:
//            // don't store in pCode...
//            g_scriptPtr--;
//            //printf("We are enhanced, baby...\n");
//            C_GetNextValue(LABEL_DEFINE);
//            g_scriptPtr--;
//            if (script[g_scriptPtr] > BYTEVERSION_JF)
//            {
//                g_numCompilerWarnings++;
//                initprintf("%s:%d: warning: need build %d, found build %d\n",g_szScriptFileName,g_lineNumber,k,BYTEVERSION_JF);
//            }
//            continue;

//        case CON_DYNAMICREMAP:
//            g_scriptPtr--;
//            if (g_dynamicTileMapping)
//            {
//                initprintf("%s:%d: warning: duplicate dynamicremap statement\n",g_szScriptFileName,g_lineNumber);
//                g_numCompilerWarnings++;
//            }
//            else
//#ifdef DYNTILEREMAP_ENABLE
//                initprintf("Using dynamic tile remapping\n");

//            g_dynamicTileMapping = 1;
//#else
//            {
//                initprintf("%s:%d: warning: dynamic tile remapping is disabled in this build\n",g_szScriptFileName,g_lineNumber);
//                g_numCompilerWarnings++;
//            }
//#endif
//            continue;

//        case CON_DYNAMICSOUNDREMAP:
//            g_scriptPtr--;
//            if (g_dynamicSoundMapping)
//            {
//                initprintf("%s:%d: warning: duplicate dynamicsoundremap statement\n",g_szScriptFileName,g_lineNumber);
//                g_numCompilerWarnings++;
//            }
//            else
//#ifdef DYNSOUNDREMAP_ENABLE
//                initprintf("Using dynamic sound remapping\n");

//            g_dynamicSoundMapping = 1;
//#else
//            {
//                initprintf("%s:%d: warning: dynamic sound remapping is disabled in this build\n",g_szScriptFileName,g_lineNumber);
//                g_numCompilerWarnings++;
//            }
//#endif
//            continue;

//        case CON_RANDVAR:
//        case CON_ZSHOOT:
//        case CON_EZSHOOT:
//        case CON_SETVAR:
//        case CON_ADDVAR:
//        case CON_SUBVAR:
//        case CON_DISPLAYRANDVAR:
//        case CON_MULVAR:
//        case CON_DIVVAR:
//        case CON_MODVAR:
//        case CON_ANDVAR:
//        case CON_ORVAR:
//        case CON_XORVAR:
//        case CON_SHIFTVARL:
//        case CON_SHIFTVARR:

//            {
//                intptr_t *inst = g_scriptPtr-1;
//                char *tptr = textptr;
//                // syntax: [rand|add|set]var    <var1> <const1>
//                // sets var1 to const1
//                // adds const1 to var1 (const1 can be negative...)
//                //printf("Found [add|set]var at line= %d\n",g_lineNumber);

//                // get the ID of the DEF
//                if (tw != CON_ZSHOOT && tw != CON_EZSHOOT)
//                    C_GetNextVarType(GAMEVAR_READONLY);
//                else C_GetNextVar();

//                C_GetNextValue(LABEL_DEFINE); // the number to check against...

//                if (tw == CON_DIVVAR || tw == CON_MULVAR)
//                {
//                    int32_t i = script[g_scriptPtr-1];
//                    j = klabs(i);

//                    if (i == -1)
//                    {
//                        *inst = CON_INV+(g_lineNumber<<12);
//                        g_scriptPtr--;
//                        continue;
//                    }

//                    if (C_IntPow2(j))
//                    {
//                        *inst = ((tw == CON_DIVVAR) ? CON_SHIFTVARR : CON_SHIFTVARL)+(g_lineNumber<<12);
//                        script[g_scriptPtr-1] = C_Pow2IntLogBase2(j);
//                        //                    initprintf("%s:%d: replacing multiply/divide with shift\n",g_szScriptFileName,g_lineNumber);

//                        if (i == j)
//                            continue;

//                        script[g_scriptPtr++] = CON_INV+(g_lineNumber<<12);
//                        textptr = tptr;
//                        C_GetNextVarType(GAMEVAR_READONLY);
//                        C_GetNextValue(LABEL_DEFINE);
//                        g_scriptPtr--;
//                        //                    initprintf("%s:%d: adding inversion\n",g_szScriptFileName,g_lineNumber);
//                    }
//                }
//            }
//            continue;
//        case CON_WRITEARRAYTOFILE:
//        case CON_READARRAYFROMFILE:
//            C_GetNextLabelName();
//            i=GetADefID(label.subarray(g_numLabels<<6).toString());
//            if (i > (-1))
//            {
//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=i;
//            }
//            else
//            {
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_NOTAGAMEARRAY);
//                return 1;
//            }
//            C_GetNextValue(LABEL_DEFINE);
//            continue;
//        case CON_COPY:
//            C_GetNextLabelName();
//            i=GetADefID(label.subarray(g_numLabels<<6).toString());
//            if (i > (-1))
//            {
//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=i;
//            }
//            else
//            {
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_NOTAGAMEARRAY);
//                return 1;
//            }
//            C_SkipComments();// skip comments and whitespace
//            if (textptr[textptrIdx] != '[')

//            {
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_GAMEARRAYBNO);
//                return 1;
//            }
//            textptrIdx++;
//            C_GetNextVar();
//            C_SkipComments();// skip comments and whitespace
//            if (textptr[textptrIdx] != ']')
//            {
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_GAMEARRAYBNC);
//                return 1;
//            }
//            textptrIdx++;
//        case CON_SETARRAY:
//            C_GetNextLabelName();
//            i=GetADefID(label.subarray(g_numLabels<<6).toString());
//            if (i > (-1))
//            {
//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=i;

//                if (aGameArrays[i].dwFlags & GAMEARRAY_READONLY)
//                {
//                    C_ReportError(ERROR_ARRAYREADONLY);
//                    g_numCompilerErrors++;
//                    return 1;
//                }
//            }
//            else
//            {
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_NOTAGAMEARRAY);
//                return 1;
//            }

//            C_SkipComments();// skip comments and whitespace
//            if (textptr[textptrIdx] != '[')
//            {
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_GAMEARRAYBNO);
//                return 1;
//            }
//            textptrIdx++;
//            C_GetNextVar();
//            C_SkipComments();// skip comments and whitespace
//            if (textptr[textptrIdx] != ']')
//            {
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_GAMEARRAYBNC);
//                return 1;
//            }
//            textptrIdx++;
//            C_GetNextVar();
//            continue;
//        case CON_GETARRAYSIZE:
//        case CON_RESIZEARRAY:
//            C_GetNextLabelName();
//            i=GetADefID(label.subarray(g_numLabels<<6).toString());
//            if (i >= 0)
//            {
//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++] = i;
//                if (tw==CON_RESIZEARRAY && (aGameArrays[i].dwFlags & GAMEARRAY_TYPE_MASK))
//                {
//                    C_ReportError(-1);
//                    initprintf("can't resize system array `%s'.", label.subarray(g_numLabels<<6).toString());
//                    return 1;
//                }
//            }
//            else
//            {
//                g_numCompilerErrors++;
//                C_ReportError(ERROR_NOTAGAMEARRAY);
//                return 1;
//            }

//            C_SkipComments();
//            C_GetNextVarType(tw==CON_GETARRAYSIZE ? GAMEVAR_READONLY : 0);
//            continue;

//        case CON_RANDVARVAR:
//        case CON_SETVARVAR:
//        case CON_ADDVARVAR:
//        case CON_SUBVARVAR:
//        case CON_MULVARVAR:
//        case CON_DIVVARVAR:
//        case CON_MODVARVAR:
//        case CON_ANDVARVAR:
//        case CON_ORVARVAR:
//        case CON_XORVARVAR:
//        case CON_DISPLAYRANDVARVAR:
//        case CON_SIN:
//        case CON_COS:
//            C_GetNextVarType(GAMEVAR_READONLY);
//            C_GetNextVar();
//            continue;

//        case CON_SMAXAMMO:
//        case CON_ADDWEAPONVAR:
//        case CON_ACTIVATEBYSECTOR:
//        case CON_OPERATESECTORS:
//        case CON_OPERATEACTIVATORS:
//        case CON_SSP:
//        case CON_GMAXAMMO:
//        case CON_DIST:
//        case CON_LDIST:
//        case CON_GETINCANGLE:
//        case CON_GETANGLE:
//        case CON_MULSCALE:
//        case CON_SETASPECT:
//            // get the ID of the DEF
//            switch (tw)
//            {
//            case CON_DIST:
//            case CON_LDIST:
//            case CON_GETANGLE:
//            case CON_GETINCANGLE:
//            case CON_MULSCALE:
//                C_GetNextVarType(GAMEVAR_READONLY);
//                break;
//            default:
//                C_GetNextVar();
//                break;
//            }

//            // get the ID of the DEF
//            if (tw == CON_GMAXAMMO)
//                C_GetNextVarType(GAMEVAR_READONLY);
//            else C_GetNextVar();

//            switch (tw)
//            {
//            case CON_DIST:
//            case CON_LDIST:
//            case CON_GETANGLE:
//            case CON_GETINCANGLE:
//                C_GetNextVar();
//                break;
//            case CON_MULSCALE:
//                C_GetManyVars(2);
//                break;
//            }
//            continue;

//        case CON_FLASH:
//        case CON_SAVEMAPSTATE:
//        case CON_LOADMAPSTATE:
//            if (tw != CON_FLASH)
//            {
//                if (g_currentEvent == EVENT_ANIMATESPRITES)
//                {
//                    initprintf("%s:%d: warning: found `%s' inside EVENT_ANIMATESPRITES\n",
//                               g_szScriptFileName,g_lineNumber,tempbuf);
//                    g_numCompilerWarnings++;
//                }
//            }
//            continue;

//        case CON_ACTIVATE:
//            script[g_scriptPtr-1] = CON_OPERATEACTIVATORS;
//            C_GetNextValue(LABEL_DEFINE);
//            script[g_scriptPtr++] = 0;
//            continue;

//        case CON_DRAGPOINT:
//        case CON_GETKEYNAME:
//            C_GetManyVars(3);
//            continue;

//        case CON_GETFLORZOFSLOPE:
//        case CON_GETCEILZOFSLOPE:
//            C_GetManyVars(3);
//            C_GetNextVarType(GAMEVAR_READONLY);
//            continue;

//        case CON_DEFINEPROJECTILE:
//            {
//                int32_t y, z;

//                if (g_processingState || g_parsingActorPtr)
//                {
//                    C_ReportError(ERROR_FOUNDWITHIN);
//                    g_numCompilerErrors++;
//                }

//                g_scriptPtr--;

//                C_GetNextValue(LABEL_DEFINE);
//                j = script[g_scriptPtr-1];

//                C_GetNextValue(LABEL_DEFINE);
//                y = script[g_scriptPtr-1];
//                C_GetNextValue(LABEL_DEFINE);
//                z = script[g_scriptPtr-1];

//                if ((unsigned)j >= MAXTILES)
//                {
//                    C_ReportError(ERROR_EXCEEDSMAXTILES);
//                    g_numCompilerErrors++;
//                    continue;
//                }

//                C_DefineProjectile(j, y, z);
//                continue;
//            }

//        case CON_SPRITEFLAGS:
//            if (!g_parsingActorPtr && g_processingState == 0)
//            {
//                g_scriptPtr--;

//                C_GetNextValue(LABEL_DEFINE);
//                g_scriptPtr--;
//                j = script[g_scriptPtr];

//                C_GetNextValue(LABEL_DEFINE);
//                g_scriptPtr--;

//                if ((unsigned)j >= MAXTILES)
//                {
//                    C_ReportError(ERROR_EXCEEDSMAXTILES);
//                    g_numCompilerErrors++;
//                    continue;
//                }

//                g_tile[j].flags = script[g_scriptPtr];

//                continue;
//            }
//            C_GetNextVar();
//            continue;

//        case CON_SPRITESHADOW:
//        case CON_SPRITENVG:
//        case CON_SPRITENOSHADE:
//        case CON_SPRITENOPAL:
//        case CON_PRECACHE:
//            if (g_processingState || g_parsingActorPtr)
//            {
//                C_ReportError(ERROR_FOUNDWITHIN);
//                g_numCompilerErrors++;
//            }

//            g_scriptPtr--;

//            C_GetNextValue(LABEL_DEFINE);
//            g_scriptPtr--;
//            j = script[g_scriptPtr];

//            if ((unsigned)j >= MAXTILES)
//            {
//                C_ReportError(ERROR_EXCEEDSMAXTILES);
//                g_numCompilerErrors++;
//                continue;
//            }

//            switch (tw)
//            {
//            case CON_SPRITESHADOW:
//                g_tile[script[g_scriptPtr]].flags |= SPRITE_SHADOW;
//                break;
//            case CON_SPRITENVG:
//                g_tile[script[g_scriptPtr]].flags |= SPRITE_NVG;
//                break;
//            case CON_SPRITENOSHADE:
//                g_tile[script[g_scriptPtr]].flags |= SPRITE_NOSHADE;
//                break;
//            case CON_SPRITENOPAL:
//                g_tile[script[g_scriptPtr]].flags |= SPRITE_NOPAL;
//                break;
//            case CON_PRECACHE:
//                C_GetNextValue(LABEL_DEFINE);
//                g_scriptPtr--;
//                i = script[g_scriptPtr];
//                if ((unsigned)i >= MAXTILES)
//                {
//                    C_ReportError(ERROR_EXCEEDSMAXTILES);
//                    g_numCompilerErrors++;
//                }
//                g_tile[j].cacherange = i;

//                C_GetNextValue(LABEL_DEFINE);
//                g_scriptPtr--;
//                if (script[g_scriptPtr])
//                    g_tile[j].flags |= SPRITE_CACHE;                

//                break;
//            }
//            continue;

//        case CON_IFACTORSOUND:
//        case CON_IFVARVARG:
//        case CON_IFVARVARL:
//        case CON_IFVARVARE:
//        case CON_IFVARVARN:
//        case CON_IFVARVARAND:
//        case CON_IFVARVAROR:
//        case CON_IFVARVARXOR:
//        case CON_IFVARVAREITHER:
//        case CON_WHILEVARVARN:
//            {
//                intptr_t offset;
//                intptr_t lastScriptPtr = g_scriptPtr - &script[0] - 1;

//                g_ifElseAborted = 0;

//                C_GetManyVars(2);

//                if (C_CheckMalformedBranch(lastScriptPtr))
//                    continue;

//                tempscrptr = g_scriptPtr;
//                offset = (unsigned)(g_scriptPtr-scriptIdx);
//                g_scriptPtr++; // Leave a spot for the fail location

//                C_ParseCommand(0);

//                if (C_CheckEmptyBranch(tw, lastScriptPtr))
//                    continue;

//                tempscrptr = (intptr_t *)script+offset;
//                script[tempscrptr] = (intptr_t) g_scriptPtr;
//                bitptr[(tempscrptr-scriptIdx)>>3] |= (BITPTR_POINTER<<((tempscrptr-scriptIdx)&7));

//                if (tw != CON_WHILEVARVARN)
//                {
//                    j = C_GetKeyword();

//                    if (j == CON_ELSE || j == CON_LEFTBRACE)
//                        g_checkingIfElse++;
//                }
//                continue;
//            }

//        case CON_SPGETLOTAG:
//        case CON_SPGETHITAG:
//        case CON_SECTGETLOTAG:
//        case CON_SECTGETHITAG:
//        case CON_GETTEXTUREFLOOR:
//        case CON_GETTEXTURECEILING:
//            // no paramaters...
//            continue;

//        case CON_STARTTRACK:
//            // one parameter (track#)
//            C_GetNextValue(LABEL_DEFINE);
//            continue;

//        case CON_IFVARL:
//        case CON_IFVARG:
//        case CON_IFVARE:
//        case CON_IFVARN:
//        case CON_IFVARAND:
//        case CON_IFVAROR:
//        case CON_IFVARXOR:
//        case CON_IFVAREITHER:
//        case CON_WHILEVARN:
//            {
//                intptr_t offset;
//                intptr_t lastScriptPtr = (g_scriptPtr-scriptIdx-1);

//                g_ifElseAborted = 0;
//                // get the ID of the DEF
//                C_GetNextVar();
//                C_GetNextValue(LABEL_DEFINE); // the number to check against...

//                if (C_CheckMalformedBranch(lastScriptPtr))
//                    continue;

//                tempscrptr = g_scriptPtr;
//                offset = (unsigned)(tempscrptr-scriptIdx);
//                g_scriptPtr++; //Leave a spot for the fail location

//                C_ParseCommand(0);

//                if (C_CheckEmptyBranch(tw, lastScriptPtr))
//                    continue;

//                tempscrptr = (intptr_t *)script+offset;
//                script[tempscrptr] = (intptr_t) g_scriptPtr;
//                bitptr[(tempscrptr-scriptIdx)>>3] |= (BITPTR_POINTER<<((tempscrptr-scriptIdx)&7));

//                if (tw != CON_WHILEVARN)
//                {
//                    j = C_GetKeyword();

//                    if (j == CON_ELSE || j == CON_LEFTBRACE)
//                        g_checkingIfElse++;
//                }

//                continue;
//            }
//        case CON_ADDLOGVAR:
//            C_GetNextVar();
//            continue;

//        case CON_ROTATESPRITE16:
//        case CON_ROTATESPRITE:
//            if (!g_parsingEventPtr && g_processingState == 0)
//            {
//                C_ReportError(ERROR_EVENTONLY);
//                g_numCompilerErrors++;
//            }

//            // syntax:
//            // int32_t x, int32_t y, int32_t z, short a, short tilenum, int8_t shade, char orientation, x1, y1, x2, y2
//            // myospal adds char pal

//            // get the ID of the DEFs

//            C_GetManyVars(12);
//            continue;

//        case CON_ROTATESPRITEA:
//            if (!g_parsingEventPtr && g_processingState == 0)
//            {
//                C_ReportError(ERROR_EVENTONLY);
//                g_numCompilerErrors++;
//            }

//            C_GetManyVars(13);
//            continue;

//        case CON_SHOWVIEW:
//        case CON_SHOWVIEWUNBIASED:
//            if (!g_parsingEventPtr && g_processingState == 0)
//            {
//                C_ReportError(ERROR_EVENTONLY);
//                g_numCompilerErrors++;
//            }

//            C_GetManyVars(10);
//            continue;

//        case CON_GETZRANGE:
//            C_GetManyVars(4);
//            C_GetManyVarsType(GAMEVAR_READONLY,4);
//            C_GetManyVars(2);
//            continue;

//        case CON_SECTSETINTERPOLATION:
//        case CON_SECTCLEARINTERPOLATION:
//            C_GetNextVar();
//            continue;

//        case CON_CLIPMOVE:
//        case CON_CLIPMOVENOSLIDE:
//            // <retvar>,<x>,<y>,z,<sectnum>, xvect,yvect,walldist,floordist,ceildist,clipmask
//            C_GetManyVarsType(GAMEVAR_READONLY,3);
//            C_GetNextVar();
//            C_GetNextVarType(GAMEVAR_READONLY);
//            C_GetManyVars(6);
//            continue;

//        case CON_CALCHYPOTENUSE:
//            C_GetNextVarType(GAMEVAR_READONLY);
//            C_GetManyVars(2);
//            continue;

//        case CON_LINEINTERSECT:
//        case CON_RAYINTERSECT:
//            // lineintersect x y z  x y z  x y  x y  <intx> <inty> <intz> <ret>
//            // rayintersect x y z  vx vy vz  x y  x y  <intx> <inty> <intz> <ret>
//            C_GetManyVars(10);
//            C_GetManyVarsType(GAMEVAR_READONLY,4);
//            continue;

//        case CON_HITSCAN:
//        case CON_CANSEE:
//            // get the ID of the DEF
//            C_GetManyVars(tw==CON_CANSEE?8:7);
//            C_GetManyVarsType(GAMEVAR_READONLY,tw==CON_CANSEE?1:6);
//            if (tw==CON_HITSCAN) C_GetNextVar();
//            continue;

//        case CON_CANSEESPR:
//            C_GetManyVars(2);
//            C_GetNextVarType(GAMEVAR_READONLY);
//            continue;

//        case CON_NEARTAG:
//            C_GetManyVars(5);
//            C_GetManyVarsType(GAMEVAR_READONLY,4);
//            C_GetManyVars(2);
//            continue;

//        case CON_ROTATEPOINT:
//            C_GetManyVars(5);
//            C_GetManyVarsType(GAMEVAR_READONLY,2);
//            continue;

//        case CON_GETTIMEDATE:
//            C_GetManyVarsType(GAMEVAR_READONLY,8);
//            continue;

//        case CON_MOVESPRITE:
//        case CON_SETSPRITE:
//            C_GetManyVars(4);
//            if (tw == CON_MOVESPRITE)
//            {
//                C_GetNextVar();
//                C_GetNextVarType(GAMEVAR_READONLY);
//            }
//            continue;

//        case CON_MINITEXT:
//        case CON_GAMETEXT:
//        case CON_GAMETEXTZ:
//        case CON_DIGITALNUMBER:
//        case CON_DIGITALNUMBERZ:
//        case CON_SCREENTEXT:
//            if (!g_parsingEventPtr && g_processingState == 0)
//            {
//                C_ReportError(ERROR_EVENTONLY);
//                g_numCompilerErrors++;
//            }

//            switch (tw)
//            {
//            case CON_SCREENTEXT:
//                C_GetManyVars(8);
//            case CON_GAMETEXTZ:
//            case CON_DIGITALNUMBERZ:
//                C_GetManyVars(1);
//            case CON_GAMETEXT:
//            case CON_DIGITALNUMBER:
//                C_GetManyVars(6);
//            default:
//                C_GetManyVars(5);
//                break;
//            }
//            continue;

//        case CON_UPDATESECTOR:
//        case CON_UPDATESECTORZ:
//            C_GetManyVars(2);
//            if (tw==CON_UPDATESECTORZ)
//                C_GetNextVar();
//            C_GetNextVarType(GAMEVAR_READONLY);
//            continue;

//        case CON_MYOS:
//        case CON_MYOSPAL:
//        case CON_MYOSX:
//        case CON_MYOSPALX:
//            if !(g_parsingEventPtr && g_processingState == 0)
//            {
//                C_ReportError(ERROR_EVENTONLY);
//                g_numCompilerErrors++;
//            }

//            // syntax:
//            // int32_t x, int32_t y, short tilenum, int8_t shade, char orientation
//            // myospal adds char pal

//            C_GetManyVars(5);
//            if (tw==CON_MYOSPAL || tw==CON_MYOSPALX)
//            {
//                // Parse: pal

//                // get the ID of the DEF
//                C_GetNextVar();
//            }
//            continue;

//        case CON_FINDPLAYER:
//        case CON_FINDOTHERPLAYER:
//        case CON_DISPLAYRAND:

//            // syntax: displayrand <var>
//            // gets rand (not game rand) into <var>

//            // Get The ID of the DEF
//            C_GetNextVarType(GAMEVAR_READONLY);
//            continue;

//        case CON_SWITCH:
//            {
//                intptr_t tempoffset;

//                g_checkingSwitch++; // allow nesting (if other things work)
//                C_GetNextVar();

//                tempscrptr= g_scriptPtr;
//                tempoffset = (unsigned)(tempscrptr-scriptIdx);
//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=0; // leave spot for end location (for after processing)
//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=0; // count of case statements
//                g_caseScriptPtr=g_scriptPtr;        // the first case's pointer.
//                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                script[g_scriptPtr++]=0; // leave spot for 'default' location (null if none)

////                temptextptr=textptr;
//                // probably does not allow nesting...

//                j=C_CountCaseStatements();
//                //        initprintf("Done Counting Case Statements for switch %d: found %d.\n", g_checkingSwitch,j);
//                g_scriptPtr+=j*2;
//                C_SkipComments();
//                g_scriptPtr-=j*2; // allocate buffer for the table
//                tempscrptr = (intptr_t *)(script+tempoffset);

//                //AddLog(g_szBuf);

//                if (j<0)
//                {
//                    return 1;
//                }

//                if (tempscrptr)
//                {
//                    tempscrptr[1]=(intptr_t)j;  // save count of cases
//                }
//                else
//                {
//                    //Bsprintf(g_szBuf,"ERROR::%s %d",__FILE__,__LINE__);
//                    //AddLog(g_szBuf);
//                }

//                while (j--)
//                {
//                    // leave room for statements
//                    bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                    script[g_scriptPtr++]=0; // value check
//                    bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
//                    script[g_scriptPtr++]=0; // code offset
//                    C_SkipComments();
//                }

//                g_numCases=0;
//                C_ParseCommand(1);
//                tempscrptr = (intptr_t *)(script+tempoffset);

//                //Bsprintf(g_szBuf,"SWITCHXX: '%.22s'",textptr);
//                //AddLog(g_szBuf);
//                // done processing switch.  clean up.
//                if (g_checkingSwitch<1)
//                {
//                    //    Bsprintf(g_szBuf,"ERROR::%s %d: g_checkingSwitch=%d",__FILE__,__LINE__, g_checkingSwitch);
//                    //    AddLog(g_szBuf);
//                }
//                g_numCases=0;
//                if (tempscrptr)
//                {
//                    intptr_t t,n;
//                    for (i=3; i<3+tempscrptr[1]*2-2; i+=2) // sort them
//                    {
//                        t=tempscrptr[i]; n=i;
//                        for (j=i+2; j<3+tempscrptr[1]*2; j+=2)
//                            if (tempscrptr[j]<t) {t=tempscrptr[j]; n=j;}
//                            if (n!=i)
//                            {
//                                t=tempscrptr[i  ]; tempscrptr[i  ]=tempscrptr[n  ]; tempscrptr[n  ]=t;
//                                t=tempscrptr[i+1]; tempscrptr[i+1]=tempscrptr[n+1]; tempscrptr[n+1]=t;
//                            }
//                    }
//                    //            for (j=3;j<3+tempscrptr[1]*2;j+=2)initprintf("%5d %8x\n",tempscrptr[j],tempscrptr[j+1]);
//                    tempscrptr[0]= (intptr_t)g_scriptPtr - (intptr_t)&script[0];    // save 'end' location
//                    //            bitptr[(tempscrptr-scriptIdx)>>3] |= (BITPTR_POINTER<<((tempscrptr-scriptIdx)&7));
//                }
//                else
//                {
//                    //Bsprintf(g_szBuf,"ERROR::%s %d",__FILE__,__LINE__);
//                    //AddLog(g_szBuf);
//                }
//                g_caseScriptPtr=NULL;
//                // decremented in endswitch.  Don't decrement here...
//                //                    g_checkingSwitch--; // allow nesting (maybe if other things work)
//                tempscrptr=NULL;
//                if (g_checkingSwitch)
//                {
//                    //Bsprintf(g_szBuf,"ERROR::%s %d: g_checkingSwitch=%d",__FILE__,__LINE__, g_checkingSwitch);
//                    //AddLog(g_szBuf);
//                }
//                //AddLog("End of Switch statement");
//            }
//            continue;

//        case CON_CASE:
//            {
//                intptr_t tempoffset = 0;
//                //AddLog("Found Case");

//                if (g_checkingSwitch < 1)
//                {
//                    g_numCompilerErrors++;
//                    C_ReportError(-1);
//                    initprintf("%s:%d: error: found `case' statement when not in switch\n",g_szScriptFileName,g_lineNumber);
//                    g_scriptPtr--;
//                    return 1;
//                }

//repeatcase:
//                g_scriptPtr--; // don't save in code
//                g_numCases++;
//                //Bsprintf(g_szBuf,"case1: %.12s",textptr);
//                //AddLog(g_szBuf);
//                C_GetNextValue(LABEL_DEFINE);
//                if (textptr[textptrIdx] == ':')
//                    textptrIdx++;
//                //Bsprintf(g_szBuf,"case2: %.12s",textptr);
//                //AddLog(g_szBuf);

//                j= *(--g_scriptPtr);      // get value
//                //Bsprintf(g_szBuf,"case: Value of case %d is %d",(int32_t)g_numCases,(int32_t)j);
//                //AddLog(g_szBuf);
//                if (g_caseScriptPtr)
//                {
//                    for (i=(g_numCases/2)-1; i>=0; i--)
//                        if (g_caseScriptPtr[i*2+1]==j)
//                        {
//                            g_numCompilerWarnings++;
//                            C_ReportError(WARNING_DUPLICATECASE);
//                            break;
//                        }
//                        //AddLog("Adding value to script");
//                        g_caseScriptPtr[g_numCases++]=j;   // save value
//                        g_caseScriptPtr[g_numCases]=(intptr_t)((intptr_t *)g_scriptPtr-&script[0]);  // save offset
//                }
//                //      j = C_GetKeyword();
//                //Bsprintf(g_szBuf,"case3: %.12s",textptr);
//                //AddLog(g_szBuf);

//                if (C_GetKeyword() == CON_CASE)
//                {
//                    //AddLog("Found Repeat Case");
//                    C_GetNextKeyword();    // eat 'case'
//                    goto repeatcase;
//                }
//                //Bsprintf(g_szBuf,"case4: '%.12s'",textptr);
//                //AddLog(g_szBuf);
//                tempoffset = (unsigned)(tempscrptr-scriptIdx);

//                while (C_ParseCommand(0) == 0)
//                {
//                    //Bsprintf(g_szBuf,"case5 '%.25s'",textptr);
//                    //AddLog(g_szBuf);
//                    if (C_GetKeyword() == CON_CASE)
//                    {
//                        //AddLog("Found Repeat Case");
//                        C_GetNextKeyword();    // eat 'case'
//                        tempscrptr = (intptr_t *)(script+tempoffset);
//                        goto repeatcase;
//                    }
//                }
//                tempscrptr = (intptr_t *)(script+tempoffset);
//                //AddLog("End Case");
//                continue;
//                //      break;
//            }
//        case CON_DEFAULT:
//            g_scriptPtr--;    // don't save

//            C_SkipComments();

//            if (textptr[textptrIdx] == ':')
//                textptrIdx++;

//            if (g_checkingSwitch<1)
//            {
//                g_numCompilerErrors++;
//                C_ReportError(-1);
//                initprintf("%s:%d: error: found `default' statement when not in switch\n",g_szScriptFileName,g_lineNumber);
//                return 1;
//            }
//            if (g_caseScriptPtr && g_caseScriptPtr[0]!=0)
//            {
//                // duplicate default statement
//                g_numCompilerErrors++;
//                C_ReportError(-1);
//                initprintf("%s:%d: error: multiple `default' statements found in switch\n",g_szScriptFileName,g_lineNumber);
//            }
//            if (g_caseScriptPtr)
//            {
//                g_caseScriptPtr[0]=(intptr_t)(g_scriptPtr-&script[0]);   // save offset
//                //            bitptr[(g_caseScriptPtr-scriptIdx)>>3] |= (BITPTR_POINTER<<((g_caseScriptPtr-scriptIdx)&7));
//            }
//            //Bsprintf(g_szBuf,"default: '%.22s'",textptr);
//            //AddLog(g_szBuf);
//            C_ParseCommand(1);
//            continue;

//        case CON_ENDSWITCH:
//            //AddLog("End Switch");
//            if (--g_checkingSwitch < 0)
//            {
//                g_numCompilerErrors++;
//                C_ReportError(-1);
//                initprintf("%s:%d: error: found `endswitch' without matching `switch'\n",g_szScriptFileName,g_lineNumber);
//            }
//            return 1;      // end of block

//        case CON_QSTRNCAT:
//            C_GetManyVars(3);
//            continue;
//        case CON_CHANGESPRITESTAT:
//        case CON_CHANGESPRITESECT:
//        case CON_ZSHOOTVAR:
//        case CON_EZSHOOTVAR:
//        case CON_GETPNAME:
//        case CON_STARTLEVEL:
//        case CON_QSTRCAT:
//        case CON_QSTRCPY:
//        case CON_QGETSYSSTR:
//            C_GetManyVars(2);
//            continue;
//        case CON_QSTRLEN:
//            C_GetNextVarType(GAMEVAR_READONLY);
//            C_GetNextVar();
//            continue;
//        case CON_QSTRDIM:
//            C_GetNextVarType(GAMEVAR_READONLY);
//            C_GetNextVarType(GAMEVAR_READONLY);
//            C_GetManyVars(16);
//            continue;
//        case CON_HEADSPRITESTAT:
//        case CON_PREVSPRITESTAT:
//        case CON_NEXTSPRITESTAT:
//        case CON_HEADSPRITESECT:
//        case CON_PREVSPRITESECT:
//        case CON_NEXTSPRITESECT:
//            C_GetNextVarType(GAMEVAR_READONLY);
//            C_GetNextVar();
//            continue;
//        case CON_QSUBSTR:
//            C_GetManyVars(4);
//            continue;
//        case CON_SETACTORANGLE:
//        case CON_SETPLAYERANGLE:
//            C_GetNextVar();
//            continue;
//        case CON_GETANGLETOTARGET:
//        case CON_GETACTORANGLE:
//        case CON_GETPLAYERANGLE:
//            // Syntax:   <command> <var>

//            // get the ID of the DEF
//            C_GetNextVarType(GAMEVAR_READONLY);
//            continue;

//        case CON_ADDLOG:
//            // syntax: addlog

//            // prints the line number in the log file.
//            /*        script[g_scriptPtr]=g_lineNumber;
//            g_scriptPtr++; */
//            continue;

        case CON_IFRND:
        case CON_IFPDISTL:
        case CON_IFPDISTG:
        case CON_IFWASWEAPON:
        case CON_IFACTIONCOUNT:
        case CON_IFCOUNT:
        case CON_IFACTOR:
        case CON_IFSTRENGTH:
        case CON_IFSPAWNEDBY:
        case CON_IFGAPZL:
        case CON_IFFLOORDISTL:
        case CON_IFCEILINGDISTL:
            //        case 74:
        case CON_IFPHEALTHL:
        case CON_IFSPRITEPAL:
        case CON_IFGOTWEAPONCE:
        case CON_IFANGDIFFL:
        case CON_IFSOUND:
        case CON_IFAI:
        case CON_IFACTION:
        case CON_IFMOVE:
        case CON_IFP:
        case CON_IFPINVENTORY:
        case CON_IFPLAYERSL:
            {
                var offset: number;
                var lastScriptPtr = (g_scriptPtr-/*&script[0]*/ 0 -1);

                g_ifElseAborted = 0;

                switch (tw)
                {
                case CON_IFAI:
                    C_GetNextValue(LABEL_AI);
                    break;
                case CON_IFACTION:
                    C_GetNextValue(LABEL_ACTION);
                    break;
                case CON_IFMOVE:
                    if ((C_GetNextValue(LABEL_MOVE|LABEL_DEFINE) == 0) && (script[g_scriptPtr-1] != 0) && (script[g_scriptPtr-1] != 1))
                    {
                        C_ReportError(-1);
                        script[g_scriptPtr-1] = 0;
                        initprintf("%s:%d: warning: expected a move, found a constant.\n",g_szScriptFileName,g_lineNumber);
                        g_numCompilerWarnings++;
                    }
                    break;
                case CON_IFPINVENTORY:
                    C_GetNextValue(LABEL_DEFINE);
                    C_GetNextValue(LABEL_DEFINE);
                    break;
                case CON_IFP:
                    j = 0;
                    do
                    {
                        C_GetNextValue(LABEL_DEFINE);
                        g_scriptPtr--;
                        j |= script[g_scriptPtr];
                    }
                    while (C_GetKeyword() == -1);
                    bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
                    script[g_scriptPtr] = j;
                    g_scriptPtr++;
                    break;
                case CON_IFSOUND:
                case CON_IFACTORSOUND:
                default:
                    C_GetNextValue(LABEL_DEFINE);
                    break;
                }

                if (C_CheckMalformedBranch(lastScriptPtr))
                    continue;

                tempscrptr = g_scriptPtr;
                offset = (tempscrptr-scriptIdx) >>> 0;

                g_scriptPtr++; //Leave a spot for the fail location

                C_ParseCommand(0);

                if (C_CheckEmptyBranch(tw, lastScriptPtr))
                    continue;

                tempscrptr = /*(intptr_t *)*/scriptIdx+offset;
                script[tempscrptr] = /*(intptr_t) */g_scriptPtr;
                bitptr[(tempscrptr-scriptIdx)>>3] |= (BITPTR_POINTER<<((tempscrptr-scriptIdx)&7));

                j = C_GetKeyword();

                if (j == CON_ELSE || j == CON_LEFTBRACE)
                    g_checkingIfElse++;

                continue;
            }

        case CON_IFCLIENT:
        case CON_IFSERVER:
        case CON_IFONWATER:
        case CON_IFINWATER:
        case CON_IFACTORNOTSTAYPUT:
        case CON_IFCANSEE:
        case CON_IFHITWEAPON:
        case CON_IFSQUISHED:
        case CON_IFDEAD:
        case CON_IFCANSHOOTTARGET:
        case CON_IFHITSPACE:
        case CON_IFOUTSIDE:
        case CON_IFMULTIPLAYER:
        case CON_IFINSPACE:
        case CON_IFBULLETNEAR:
        case CON_IFRESPAWN:
        case CON_IFINOUTERSPACE:
        case CON_IFNOTMOVING:
        case CON_IFAWAYFROMWALL:
        case CON_IFCANSEETARGET:
        case CON_IFNOSOUNDS:
            {
                var offset: number;
                var lastScriptPtr = (g_scriptPtr-/*&script[0]-*/1);

                g_ifElseAborted = 0;

                if (C_CheckMalformedBranch(lastScriptPtr))
                    continue;

                tempscrptr = g_scriptPtr;
                offset = (unsigned)(tempscrptr-scriptIdx);

                g_scriptPtr++; //Leave a spot for the fail location

                C_ParseCommand(0);

                if (C_CheckEmptyBranch(tw, lastScriptPtr))
                    continue;

                tempscrptr = /*(intptr_t *)*/scriptIdx+offset;
                script[tempscrptr] = /*(intptr_t)*/ g_scriptPtr;
                bitptr[(tempscrptr-scriptIdx)>>3] |= (BITPTR_POINTER<<((tempscrptr-scriptIdx)&7));

                j = C_GetKeyword();

                if (j == CON_ELSE || j == CON_LEFTBRACE)
                    g_checkingIfElse++;

                continue;
            }

        case CON_LEFTBRACE:
            if (!(g_processingState || g_parsingActorPtr || g_parsingEventPtr))
            {
                g_numCompilerErrors++;
                C_ReportError(ERROR_SYNTAXERROR);
            }
            g_numBraces++;

            C_ParseCommand(1);
            continue;

        case CON_RIGHTBRACE:
            g_numBraces--;

            if ((script[g_scriptPtr-2]>>12) == (IFELSE_MAGIC) &&
                ((script[g_scriptPtr-2] & 0xFFF) == CON_LEFTBRACE)) // rewrite "{ }" into "nullop"
            {
                //            initprintf("%s:%d: rewriting empty braces '{ }' as 'nullop' from right\n",g_szScriptFileName,g_lineNumber);
                script[g_scriptPtr-2] = CON_NULLOP + (IFELSE_MAGIC<<12);
                g_scriptPtr -= 2;

                if (C_GetKeyword() != CON_ELSE && (script[g_scriptPtr-2]&0xFFF) != CON_ELSE)
                    g_ifElseAborted = 1;
                else g_ifElseAborted = 0;

                j = C_GetKeyword();

                if (g_checkingIfElse && j != CON_ELSE)
                    g_checkingIfElse--;

                return 1;
            }

            if (g_numBraces < 0)
            {
                if (g_checkingSwitch)
                {
                    C_ReportError(ERROR_NOENDSWITCH);
                }

                C_ReportError(-1);
                initprintf("%s:%d: error: found more `}' than `{'.\n",g_szScriptFileName,g_lineNumber);
                g_numCompilerErrors++;
            }

            if (g_checkingIfElse && j != CON_ELSE)
                g_checkingIfElse--;

            return 1;

        case CON_BETANAME:
            g_scriptPtr--;
            j = 0;
            C_NextLine();
            continue;

        case CON_DEFINEVOLUMENAME:
            g_scriptPtr--;
            
            C_GetNextValue(LABEL_DEFINE);
            g_scriptPtr--;
            j = script[g_scriptPtr];
            C_SkipComments();

            if (j < 0 || j > MAXVOLUMES-1)
            {
                initprintf("%s:%d: error: volume number exceeds maximum volume count.\n",
                    g_szScriptFileName,g_lineNumber);
                g_numCompilerErrors++;
                C_NextLine();
                continue;
            }

            i = 0;
            EpisodeNames[j] = "";
            while (textptr.charCodeAt(textptrIdx) != 0x0a && textptr.charCodeAt(textptrIdx) != 0x0d && textptr.charCodeAt(textptrIdx) != 0)
            {
                EpisodeNames[j] += textptr[textptrIdx];
                textptrIdx++,i++;
                if (i >= EpisodeNamesLength-1)
                {
                    initprintf("%s:%d: warning: truncating volume name to %d characters.\n",
                        g_szScriptFileName,g_lineNumber,EpisodeNamesLength-1);
                    g_numCompilerWarnings++;
                    C_NextLine();
                    break;
                }
            }
            g_numVolumes = j+1;
            //EpisodeNames[j][i] = '\0';
            continue;

//        case CON_DEFINEGAMEFUNCNAME:
//            g_scriptPtr--;
//            C_GetNextValue(LABEL_DEFINE);
//            g_scriptPtr--;
//            j = script[g_scriptPtr];
//            C_SkipComments();

//            if (j < 0 || j > NUMGAMEFUNCTIONS-1)
//            {
//                initprintf("%s:%d: error: function number exceeds number of game functions.\n",
//                    g_szScriptFileName,g_lineNumber);
//                g_numCompilerErrors++;
//                C_NextLine();
//                continue;
//            }

//            i = 0;

//            while (textptr.charCodeAt(textptrIdx) != 0x0a && textptr.charCodeAt(textptrIdx) != 0x0d && textptr.charCodeAt(textptrIdx) != 0)
//            {
//                gamefunctions[j][i] = textptr[textptrIdx];         /// TODO THIS IS STRING !!STRING!!!!
//                keydefaults[j*3][i] = textptr[textptrIdx];         /// TODO THIS IS STRING !!STRING!!!!
//                textptrIdx++,i++;
//                if (textptr.charCodeAt(textptrIdx) != 0x0a && textptr.charCodeAt(textptrIdx) != 0x0d && ispecial(textptr[textptrIdx]))
//                {
//                    initprintf("%s:%d: warning: invalid character in function name.\n",
//                        g_szScriptFileName,g_lineNumber);
//                    g_numCompilerWarnings++;
//                    C_NextLine();
//                    break;
//                }
//                if (i >= MAXGAMEFUNCLEN-1)
//                {
//                    initprintf("%s:%d: warning: truncating function name to %d characters.\n",
//                        g_szScriptFileName,g_lineNumber,MAXGAMEFUNCLEN);
//                    g_numCompilerWarnings++;
//                    C_NextLine();
//                    break;
//                }
//            }
//            gamefunctions[j][i] = '\0';
//            keydefaults[j*3][i] = '\0';
//            hash_add(h_gamefuncs,gamefunctions[j],j,0);
//            {
//                char *str = Bstrtolower(Bstrdup(gamefunctions[j]));
//                hash_add(h_gamefuncs,str,j,0);
//                Bfree(str);
//            }

//            continue;

        case CON_DEFINESKILLNAME:
            g_scriptPtr--;
            C_GetNextValue(LABEL_DEFINE);
            g_scriptPtr--;
            j = script[g_scriptPtr];
            C_SkipComments();

            if (j < 0 || j >= MAXSKILLS)
            {
                initprintf("%s:%d: error: skill number exceeds maximum skill count %d.\n",
                           g_szScriptFileName,g_lineNumber, MAXSKILLS);
                g_numCompilerErrors++;
                C_NextLine();
                continue;
            }

            i = 0;

            SkillNames[j] = "";
            while (textptr.charCodeAt(textptrIdx) != 0x0a && textptr.charCodeAt(textptrIdx) != 0x0d && textptr.charCodeAt(textptrIdx) != 0)
            {
                SkillNames[j] += textptr[textptrIdx];
                textptrIdx++,i++;
                if (i >= (SkillNamesLength)-1)
                {
                    initprintf("%s:%d: warning: truncating skill name to %d characters.\n",
                        g_szScriptFileName,g_lineNumber,(SkillNamesLength)-1);
                    g_numCompilerWarnings++;
                    C_NextLine();
                    break;
                }
            }

            //SkillNames[j][i] = '\0';

            for (i=0; i<MAXSKILLS; i++)
                if (!SkillNames[i])
                    break;
            g_numSkills = i;

            continue;

//        case CON_SETGAMENAME:
//            {
//                char gamename[32];
//                g_scriptPtr--;

//                C_SkipComments();

//                i = 0;

//                while (textptr.charCodeAt(textptrIdx) != 0x0a && textptr.charCodeAt(textptrIdx) != 0x0d && textptr.charCodeAt(textptrIdx) != 0)
//                {
//                    gamename[i] = textptr[textptrIdx];         /// TODO THIS IS STRING !!STRING!!!!
//                    textptrIdx++,i++;
//                    if (i >= (signed)sizeof(gamename)-1)
//                    {
//                        initprintf("%s:%d: warning: truncating game name to %d characters.\n",
//                            g_szScriptFileName,g_lineNumber,(int32_t)sizeof(gamename)-1);
//                        g_numCompilerWarnings++;
//                        C_NextLine();
//                        break;
//                    }
//                }
//                gamename[i] = '\0';
//                g_gameNamePtr = Bstrdup(gamename);
//                Bsprintf(tempbuf,"%s - " APPNAME,g_gameNamePtr);
//                wm_setapptitle(tempbuf);
//            }
//            continue;

//        case CON_SETDEFNAME:
//            {
//                g_scriptPtr--;
//                C_SkipComments();

//                j = 0;
//                while (isaltok(textptr[textptrIdx]))
//                {
//                    tempbuf[j] = textptr.charCodeAt(textptrIdx++);
//                    j++;
//                }
//                tempbuf[j] = 0;

//                C_SetDefName(tempbuf);
//            }
//            continue;

//        case CON_SETCFGNAME:
//            {
//                g_scriptPtr--;
//                C_SkipComments();

//                j = 0;
//                while (isaltok(textptr[textptrIdx]))
//                {
//                    tempbuf[j] = textptr.charCodeAt(textptrIdx++);
//                    j++;
//                }
//                tempbuf[j] = 0;
//                if (Bstrcmp(setupfilename,SETUPFILENAME) == 0) // not set to something else via -cfg
//                {
//                    char temp[BMAX_PATH];
//                    struct Bstat st;
//                    int32_t fullscreen = ud.config.ScreenMode;
//                    int32_t xdim = ud.config.ScreenWidth, ydim = ud.config.ScreenHeight, bpp = ud.config.ScreenBPP;
//                    int32_t usemouse = ud.config.UseMouse, usejoy = ud.config.UseJoystick;
//#ifdef USE_OPENGL
//                    int32_t glrm = glrendmode;
//#endif

//                    if (Bstat(g_modDir, &st) < 0)
//                    {
//                        if (errno == ENOENT)     // path doesn't exist
//                        {
//                            if (Bmkdir(g_modDir, S_IRWXU) < 0)
//                            {
//                                OSD_Printf("Failed to create configuration file directory %s\n", g_modDir);
//                                continue;
//                            }
//                            else OSD_Printf("Created configuration file directory %s\n", g_modDir);
//                        }
//                        else
//                        {
//                            // another type of failure
//                            continue;
//                        }
//                    }
//                    else if ((st.st_mode & S_IFDIR) != S_IFDIR)
//                    {
//                        // directory isn't a directory
//                        continue;
//                    }

//                    // XXX
//                    Bstrcpy(temp,tempbuf);
//                    CONFIG_WriteSetup(1);
//                    if (g_modDir[0] != '/')
//                        Bsprintf(setupfilename,"%s/",g_modDir);
//                    else setupfilename[0] = 0;
//                    Bstrcat(setupfilename,temp);

//                    initprintf("Using config file \"%s\".\n",setupfilename);

//                    CONFIG_ReadSetup();

//                    ud.config.ScreenMode = fullscreen;
//                    ud.config.ScreenWidth = xdim;
//                    ud.config.ScreenHeight = ydim;
//                    ud.config.ScreenBPP = bpp;
//                    ud.config.UseMouse = usemouse;
//                    ud.config.UseJoystick = usejoy;
//#ifdef USE_OPENGL
//                    glrendmode = glrm;
//#endif

//                }
//            }
//            continue;

//        case CON_DEFINEGAMETYPE:
//            g_scriptPtr--;
//            C_GetNextValue(LABEL_DEFINE);
//            g_scriptPtr--;
//            j = script[g_scriptPtr];

//            C_GetNextValue(LABEL_DEFINE);
//            g_scriptPtr--;
//            GametypeFlags[j] = script[g_scriptPtr];

//            C_SkipComments();

//            if (j < 0 || j > MAXGAMETYPES-1)
//            {
//                initprintf("%s:%d: error: gametype number exceeds maximum gametype count.\n",g_szScriptFileName,g_lineNumber);
//                g_numCompilerErrors++;
//                C_NextLine();
//                continue;
//            }
//            g_numGametypes = j+1;

//            i = 0;

//            while (textptr.charCodeAt(textptrIdx) != 0x0a && textptr.charCodeAt(textptrIdx) != 0x0d && textptr.charCodeAt(textptrIdx) != 0)
//            {
//                GametypeNames[j][i] = textptr[textptrIdx];         /// TODO THIS IS STRING !!STRING!!!!
//                textptrIdx++,i++;
//                if (i >= (signed)sizeof(GametypeNames[j])-1)
//                {
//                    initprintf("%s:%d: warning: truncating gametype name to %d characters.\n",
//                        g_szScriptFileName,g_lineNumber,(int32_t)sizeof(GametypeNames[j])-1);
//                    g_numCompilerWarnings++;
//                    C_NextLine();
//                    break;
//                }
//            }
//            GametypeNames[j][i] = '\0';
//            continue;

        case CON_DEFINELEVELNAME:
            g_scriptPtr--;
            C_GetNextValue(LABEL_DEFINE);
            g_scriptPtr--;
            j = script[g_scriptPtr];
            C_GetNextValue(LABEL_DEFINE);
            g_scriptPtr--;
            k = script[g_scriptPtr];
            C_SkipComments();
            
            if (j < 0 || j > MAXVOLUMES-1)
            {
                initprintf("%s:%d: error: volume number exceeds maximum volume count.\n",g_szScriptFileName,g_lineNumber);
                g_numCompilerErrors++;
                C_NextLine();
                continue;
            }
            if (k < 0 || k > MAXLEVELS-1)
            {
                initprintf("%s:%d: error: level number exceeds maximum number of levels per episode.\n",g_szScriptFileName,g_lineNumber);
                g_numCompilerErrors++;
                C_NextLine();
                continue;
            }

            i = 0;

            tempbuf[i] = '/'.charCodeAt(0);

            while (textptr[textptrIdx] != ' ' && textptr[textptrIdx] != '\t' && textptr.charCodeAt(textptrIdx) != 0x0a)
            {
                tempbuf[i+1] = textptr.charCodeAt(textptrIdx);
                textptrIdx++,i++;
                if (i >= BMAX_PATH)
                {
                    initprintf("%s:%d: error: level file name exceeds limit of %d characters.\n",g_szScriptFileName,g_lineNumber,BMAX_PATH);
                    g_numCompilerErrors++;
                    while (textptr[textptrIdx] != ' ' && textptr[textptrIdx] != '\t') textptrIdx++;
                    break;
                }
            }
            tempbuf[i+1] = 0;

            Bcorrectfilename(tempbuf,0);

            if (!MapInfo[j *MAXLEVELS+k].filename)
                MapInfo[j *MAXLEVELS+k].filename = "";//(char *)Bcalloc(Bstrlen(tempbuf)+1,sizeof(uint8_t));
            else if ((Bstrlen(tempbuf)+1) > sizeof(MapInfo[j*MAXLEVELS+k].filename))
                todoThrow("MapInfo[j *MAXLEVELS+k].filename = (char *)Brealloc(MapInfo[j*MAXLEVELS+k].filename,(Bstrlen(tempbuf)+1));");

            MapInfo[j*MAXLEVELS+k].filename = tempbuf.toString();

            C_SkipComments();

            MapInfo[j *MAXLEVELS+k].partime =
                (((textptr.charCodeAt(textptrIdx+0)-'0'.charCodeAt(0))*10+(textptr.charCodeAt(textptrIdx+1)-'0'.charCodeAt(0)))*REALGAMETICSPERSEC*60)+
                (((textptr.charCodeAt(textptrIdx+3)-'0'.charCodeAt(0))*10+(textptr.charCodeAt(textptrIdx+4)-'0'.charCodeAt(0)))*REALGAMETICSPERSEC);

            textptrIdx += 5;
            while (textptr[textptrIdx] == ' '  || textptr[textptrIdx] == '\t') textptrIdx++;

            // cheap hack, 0.99 doesn't have the 3D Realms time
            if (textptr[textptrIdx+2] == ':')
            {
                MapInfo[j *MAXLEVELS+k].designertime =
                    (((textptr.charCodeAt(textptrIdx+0)-'0'.charCodeAt(0))*10+(textptr.charCodeAt(textptrIdx+1)-'0'.charCodeAt(0)))*REALGAMETICSPERSEC*60)+
                    (((textptr.charCodeAt(textptrIdx+3)-'0'.charCodeAt(0))*10+(textptr.charCodeAt(textptrIdx+4)-'0'.charCodeAt(0)))*REALGAMETICSPERSEC);

                textptrIdx += 5;
                while (textptr[textptrIdx] == ' '  || textptr[textptrIdx] == '\t') textptrIdx++;
            }
            else if (g_scriptVersion == 10) g_scriptVersion = 9;

            i = 0;

            while (textptr.charCodeAt(textptrIdx) != 0x0a && textptr.charCodeAt(textptrIdx) != 0x0d && textptr.charCodeAt(textptrIdx) != 0)
            {
                tempbuf[i] = textptr.charCodeAt(textptrIdx);
                textptrIdx++,i++;
                if (i >= 32)
                {
                    initprintf("%s:%d: warning: truncating level name to %d characters.\n",
                        g_szScriptFileName,g_lineNumber,32);
                    g_numCompilerWarnings++;
                    C_NextLine();
                    break;
                }
            }

            tempbuf[i] = 0;

            if (!MapInfo[j*MAXLEVELS+k].name)
                MapInfo[j*MAXLEVELS+k].name = "";//(char *)Bcalloc(Bstrlen(tempbuf)+1,sizeof(uint8_t));
            else if ((Bstrlen(tempbuf)+1) > sizeof(MapInfo[j*MAXLEVELS+k].name))
                todoThrow("MapInfo[j *MAXLEVELS+k].name = (char *)Brealloc(MapInfo[j*MAXLEVELS+k].name,(Bstrlen(tempbuf)+1));");

            /*         initprintf("level name string len: %d\n",Bstrlen(tempbuf)); */

            MapInfo[j*MAXLEVELS+k].name = tempbuf.toString();

            continue;

        case CON_DEFINEQUOTE:
        case CON_REDEFINEQUOTE:
            if (tw == CON_DEFINEQUOTE)
            {
                g_scriptPtr--;
            }

            C_GetNextValue(LABEL_DEFINE);

            k = script[g_scriptPtr-1];

            if ((k >>> 0) >= MAXQUOTES)
            {
                initprintf("%s:%d: error: quote number exceeds limit of %d.\n",g_szScriptFileName,g_lineNumber,MAXQUOTES);
                g_numCompilerErrors++;
            }
            else
            {
                C_AllocQuote(k);
            }

            if (tw == CON_DEFINEQUOTE)
                g_scriptPtr--;

            i = 0;

            while (textptr[textptrIdx] == ' ' || textptr[textptrIdx] == '\t')
                textptrIdx++;

            if (tw == CON_REDEFINEQUOTE)
            {
                if (!ScriptQuoteRedefinitions[g_numQuoteRedefinitions])
                    ScriptQuoteRedefinitions[g_numQuoteRedefinitions] =  new Uint8Array(MAXQUOTELEN);//(char *)Bcalloc(MAXQUOTELEN,sizeof(uint8_t));
                ////if (!ScriptQuoteRedefinitions[g_numQuoteRedefinitions])
                ////{
                ////    Bsprintf(tempbuf,"Failed allocating %" PRIdPTR " byte quote text buffer.",sizeof(uint8_t) * MAXQUOTELEN);
                ////    G_GameExit(tempbuf.toString());
                ////}
            }

            while (textptr.charCodeAt(textptrIdx) != 0x0a && textptr.charCodeAt(textptrIdx) != 0x0d && textptr.charCodeAt(textptrIdx) != 0)
            {
                /*
                if (textptr[textptrIdx] == '%' && textptr[textptrIdx+1] == 's')
                {
                initprintf("%s:%d: error: quote text contains string identifier.\n",g_szScriptFileName,g_lineNumber);
                g_numCompilerErrors++;
                while (textptr.charCodeAt(textptrIdx) != 0x0a && textptr.charCodeAt(textptrIdx) != 0x0d && textptr.charCodeAt(textptrIdx) != 0) textptrIdx++;
                break;
                }
                */
                if (tw == CON_DEFINEQUOTE)
                    ScriptQuotes[k][i] = textptr.charCodeAt(textptrIdx);
                else
                    ScriptQuoteRedefinitions[g_numQuoteRedefinitions][i] = textptr.charCodeAt(textptrIdx);;
                textptrIdx++,i++;
                if (i >= MAXQUOTELEN-1)
                {
                    initprintf("%s:%d: warning: truncating quote text to %d characters.\n",g_szScriptFileName,g_lineNumber,MAXQUOTELEN-1);
                    g_numCompilerWarnings++;
                    C_NextLine();
                    break;
                }
            }

            if (tw == CON_DEFINEQUOTE)
            {
                if ((k >>> 0) < MAXQUOTES)
                    ScriptQuotes[k][i] = 0;
            }
            else
            {
                ScriptQuoteRedefinitions[g_numQuoteRedefinitions][i] = 0;
                bitptr[(g_scriptPtr-scriptIdx)>>3] &= ~(BITPTR_POINTER<<((g_scriptPtr-scriptIdx)&7));
                script[g_scriptPtr++]=g_numQuoteRedefinitions;
                g_numQuoteRedefinitions++;
            }
            continue;

//        case CON_CHEATKEYS:
//            g_scriptPtr--;
//            C_GetNextValue(LABEL_DEFINE);
//            CheatKeys[0] = script[g_scriptPtr-1];
//            C_GetNextValue(LABEL_DEFINE);
//            CheatKeys[1] = script[g_scriptPtr-1];
//            g_scriptPtr -= 2;
//            continue;

//        case CON_DEFINECHEAT:
//            g_scriptPtr--;
//            C_GetNextValue(LABEL_DEFINE);
//            k = script[g_scriptPtr-1];

//            if (k > 25)
//            {
//                initprintf("%s:%d: error: cheat redefinition attempts to redefine nonexistent cheat.\n",g_szScriptFileName,g_lineNumber);
//                g_numCompilerErrors++;
//                C_NextLine();
//                continue;
//            }
//            g_scriptPtr--;
//            i = 0;
//            while (textptr[textptrIdx] == ' ' || textptr[textptrIdx] == '\t')
//                textptrIdx++;
//            while (textptr.charCodeAt(textptrIdx) != 0x0a && textptr.charCodeAt(textptrIdx) != 0x0d && textptr.charCodeAt(textptrIdx) != 0 && textptr[textptrIdx] != ' ')
//            {
//                CheatStrings[k][i] = textptr[textptrIdx];         /// TODO THIS IS STRING !!STRING!!!!
//                textptrIdx++,i++;
//                if (i >= (signed)sizeof(CheatStrings[k])-1)
//                {
//                    initprintf("%s:%d: warning: truncating cheat string to %d characters.\n",
//                        g_szScriptFileName,g_lineNumber,MAXCHEATLEN); //,sizeof(CheatStrings[k])-1);
//                    g_numCompilerWarnings++;
//                    C_NextLine();
//                    break;
//                }
//            }
//            CheatStrings[k][i] = '\0';
//            continue;

        case CON_DEFINESOUND:
            g_scriptPtr--;
            C_GetNextValue(LABEL_DEFINE);

            // Ideally we could keep the value of i from C_GetNextValue() instead of having to hash_find() again.
            // This depends on tempbuf remaining in place after C_GetNextValue():
            j = hash_find(h_labels,tempbuf.toString());

            k = script[g_scriptPtr-1];
            if ((k >>> 0) >= MAXSOUNDS)
            {
                initprintf("%s:%d: error: exceeded sound limit of %d.\n",g_szScriptFileName,g_lineNumber,MAXSOUNDS);
                g_numCompilerErrors++;
            }
            g_scriptPtr--;
            i = 0;
            C_SkipComments();

            if (!g_sounds[k].filename)
                g_sounds[k].filename = "";//(char *)Bcalloc(BMAX_PATH,sizeof(uint8_t));
            ////if (!g_sounds[k].filename)
            ////{
            ////    Bsprintf(tempbuf,"Failed allocating %\" PRIdPTR \" byte buffer.",sizeof(uint8_t) * BMAX_PATH);
            ////    G_GameExit(tempbuf.toString());
            ////}

            if (textptr[textptrIdx] == '\"')
            {
                textptrIdx++;
                while (textptr[textptrIdx] && textptr[textptrIdx] != '\"')
                {
                    g_sounds[k].filename += textptr[textptrIdx++];
                    if (i >= BMAX_PATH-1)
                    {
                        initprintf("%s:%d: error: sound filename exceeds limit of %d characters.\n",g_szScriptFileName,g_lineNumber,BMAX_PATH-1);
                        g_numCompilerErrors++;
                        C_SkipComments();
                        break;
                    }
                }
                textptrIdx++;
            }
            else while (textptr[textptrIdx] != ' ' && textptr[textptrIdx] != '\t' && textptr[textptrIdx] != '\r' && textptr[textptrIdx] != '\n')
            {
                g_sounds[k].filename += textptr[textptrIdx++];
                if (i >= BMAX_PATH-1)
                {
                    initprintf("%s:%d: error: sound filename exceeds limit of %d characters.\n",g_szScriptFileName,g_lineNumber,BMAX_PATH-1);
                    g_numCompilerErrors++;
                    C_SkipComments();
                    break;
                }
            }
            //g_sounds[k].filename[i] = '\0';

            check_filename_case(g_sounds[k].filename);

            C_GetNextValue(LABEL_DEFINE);
            g_sounds[k].ps = script[g_scriptPtr-1];
            C_GetNextValue(LABEL_DEFINE);
            g_sounds[k].pe = script[g_scriptPtr-1];
            C_GetNextValue(LABEL_DEFINE);
            g_sounds[k].pr = script[g_scriptPtr-1];

            C_GetNextValue(LABEL_DEFINE);
            g_sounds[k].m = script[g_scriptPtr-1] & ~32;
            if (script[g_scriptPtr-1] & 1)
                g_sounds[k].m |= 32;

            C_GetNextValue(LABEL_DEFINE);
            g_sounds[k].vo = script[g_scriptPtr-1];
            g_scriptPtr -= 5;

            if (k > g_maxSoundPos)
                g_maxSoundPos = k;

            if (k >= 0 && k < MAXSOUNDS && g_dynamicSoundMapping && j >= 0 && (labeltype[j] & LABEL_DEFINE))
                G_ProcessDynamicSoundMapping(label.subarray(j<<6).toString(),k);
            continue;

//        case CON_ENDEVENT:

//            if (!g_parsingEventPtr)
//            {
//                C_ReportError(-1);
//                initprintf("%s:%d: error: found `endevent' without open `onevent'.\n",g_szScriptFileName,g_lineNumber);
//                g_numCompilerErrors++;
//            }
//            if (g_numBraces > 0)
//            {
//                C_ReportError(ERROR_OPENBRACKET);
//                g_numCompilerErrors++;
//            }
//            if (g_numBraces < 0)
//            {
//                C_ReportError(ERROR_CLOSEBRACKET);
//                g_numCompilerErrors++;
//            }
//            // if event has already been declared then put a jump in instead
//            if (previous_event)
//            {
//                g_scriptPtr--;
//                script[g_scriptPtr++] = CON_JUMP;
//                script[g_scriptPtr++] = MAXGAMEVARS;
//                script[g_scriptPtr++] = previous_event-scriptIdx;
//                script[g_scriptPtr++] = CON_ENDEVENT;
//                previous_event = NULL;
//            }
//            g_parsingEventPtr = g_parsingActorPtr = NULL;
//            g_currentEvent = -1;
//            Bsprintf(g_szCurrentBlockName,"(none)");
//            continue;

        case CON_ENDA:
            if (!g_parsingActorPtr)
            {
                C_ReportError(-1);
                initprintf("%s:%d: error: found `enda' without open `actor'.\n",g_szScriptFileName,g_lineNumber);
                g_numCompilerErrors++;
            }
            if (g_numBraces != 0)
            {
                C_ReportError(g_numBraces > 0 ? ERROR_OPENBRACKET : ERROR_CLOSEBRACKET);
                g_numCompilerErrors++;
            }
            g_parsingActorPtr = 0/*NULL*/;
            g_szCurrentBlockName = "(none)";
            continue;

        case CON_RETURN:
        case CON_BREAK:
            if (g_checkingSwitch)
            {
                if (otw == CON_BREAK)
                {
                    C_ReportError(-1);
                    initprintf("%s:%d: warning: duplicate `break'.\n",g_szScriptFileName, g_lineNumber);
                    g_numCompilerWarnings++;
                    g_scriptPtr--;
                    continue;
                }
                return 1;
            }
            continue;

        case CON_SCRIPTSIZE:
            g_scriptPtr--;
            C_GetNextValue(LABEL_DEFINE);
            j = script[g_scriptPtr-1];
            g_scriptPtr--;
            C_SkipComments();
            if (C_SetScriptSize(j)) return 1;
            continue;

        case CON_SHADETO:
            g_scriptPtr--;
            C_GetNextValue(LABEL_DEFINE);
            g_scriptPtr--;
            continue;

        case CON_FALL:
        case CON_TIP:
            //        case 21:
        case CON_KILLIT:
        case CON_RESETACTIONCOUNT:
        case CON_PSTOMP:
        case CON_RESETPLAYER:
        case CON_RESETCOUNT:
        case CON_WACKPLAYER:
        case CON_OPERATE:
        case CON_RESPAWNHITAG:
        case CON_GETLASTPAL:
        case CON_PKICK:
        case CON_MIKESND:
        case CON_TOSSWEAPON:
        case CON_NULLOP:
            if (tw == CON_NULLOP)
            {
                if (C_GetKeyword() != CON_ELSE)
                {
                    C_ReportError(-1);
                    g_numCompilerWarnings++;
                    initprintf("%s:%d: warning: `nullop' found without `else'\n",g_szScriptFileName,g_lineNumber);
                    g_scriptPtr--;
                    g_ifElseAborted = 1;
                }
            }
        case CON_STOPALLSOUNDS:
            continue;
        case CON_GAMESTARTUP:
            {
                var params = new Int32Array(30);

                g_scriptPtr--;
                for (j = 0; j < 30; j++)
                {
                    C_GetNextValue(LABEL_DEFINE);
                    g_scriptPtr--;
                    params[j] = script[g_scriptPtr];

                    if (j != 12 && j != 21 && j != 25) continue;

                    if (C_GetKeyword() != -1)
                    {
                        if (j == 12)
                            g_scriptVersion = 10;
                        else if (j == 21)
                            g_scriptVersion = 11;
                        else if (j == 25)
                            g_scriptVersion = 13;
                        break;
                    }
                    else
                        g_scriptVersion = 14;
                }

                /*
                v1.3d                   v1.5
                DEFAULTVISIBILITY       DEFAULTVISIBILITY
                GENERICIMPACTDAMAGE     GENERICIMPACTDAMAGE
                MAXPLAYERHEALTH         MAXPLAYERHEALTH
                STARTARMORHEALTH        STARTARMORHEALTH
                RESPAWNACTORTIME        RESPAWNACTORTIME
                RESPAWNITEMTIME         RESPAWNITEMTIME
                RUNNINGSPEED            RUNNINGSPEED
                RPGBLASTRADIUS          GRAVITATIONALCONSTANT
                PIPEBOMBRADIUS          RPGBLASTRADIUS
                SHRINKERBLASTRADIUS     PIPEBOMBRADIUS
                TRIPBOMBBLASTRADIUS     SHRINKERBLASTRADIUS
                MORTERBLASTRADIUS       TRIPBOMBBLASTRADIUS
                BOUNCEMINEBLASTRADIUS   MORTERBLASTRADIUS
                SEENINEBLASTRADIUS      BOUNCEMINEBLASTRADIUS
                MAXPISTOLAMMO           SEENINEBLASTRADIUS
                MAXSHOTGUNAMMO          MAXPISTOLAMMO
                MAXCHAINGUNAMMO         MAXSHOTGUNAMMO
                MAXRPGAMMO              MAXCHAINGUNAMMO
                MAXHANDBOMBAMMO         MAXRPGAMMO
                MAXSHRINKERAMMO         MAXHANDBOMBAMMO
                MAXDEVISTATORAMMO       MAXSHRINKERAMMO
                MAXTRIPBOMBAMMO         MAXDEVISTATORAMMO
                MAXFREEZEAMMO           MAXTRIPBOMBAMMO
                CAMERASDESTRUCTABLE     MAXFREEZEAMMO
                NUMFREEZEBOUNCES        MAXGROWAMMO
                FREEZERHURTOWNER        CAMERASDESTRUCTABLE
                NUMFREEZEBOUNCES
                FREEZERHURTOWNER
                QSIZE
                TRIPBOMBLASERMODE
                */

                G_DoGameStartup(params);
            }
            continue;
        }
    }
    while (loop);

    return 0;
}

/* Anything added with C_AddDefinition() cannot be overwritten in the CONs */
function C_AddDefinition(/*const char **/lLabel:string,/*int32_t */lValue:number,/*int32_t */lType:number)
{
    Bstrcpy(label.subarray(g_numLabels<<6),lLabel);
    labeltype[g_numLabels] = lType;
    hash_add(h_labels,label.subarray(g_numLabels<<6).toString(),g_numLabels,0);
    labelcode[g_numLabels++] = lValue;
    g_numDefaultLabels++;
}

// KEEPINSYNC lunatic/con_lang.lua
function C_AddDefaultDefinitions(): void 
{
    var i: number;

    for (i=0; i<MAXEVENTS; i++)
        C_AddDefinition(EventNames[i], i, LABEL_DEFINE);

    for (i=0; i<NUMGAMEFUNCTIONS; i++)
    {
        var j : number;

        if (!Bstrcmp(gamefunctions[i],"Show_Console")) continue;

        Bsprintf(tempbuf,"GAMEFUNC_%s", gamefunctions[i]);

        for (j=Bstrlen(tempbuf); j>=0; j--)
            tempbuf[j] = Btoupper(String.fromCharCode(tempbuf[j])).charCodeAt(0);

        C_AddDefinition(tempbuf.toString(), i, LABEL_DEFINE);
    }

    C_AddDefinition("STAT_DEFAULT", STAT_DEFAULT, LABEL_DEFINE);
    C_AddDefinition("STAT_ACTOR", STAT_ACTOR, LABEL_DEFINE);
    C_AddDefinition("STAT_ZOMBIEACTOR", STAT_ZOMBIEACTOR, LABEL_DEFINE);
    C_AddDefinition("STAT_EFFECTOR", STAT_EFFECTOR, LABEL_DEFINE);
    C_AddDefinition("STAT_PROJECTILE", STAT_PROJECTILE, LABEL_DEFINE);
    C_AddDefinition("STAT_MISC", STAT_MISC, LABEL_DEFINE);
    C_AddDefinition("STAT_STANDABLE", STAT_STANDABLE, LABEL_DEFINE);
    C_AddDefinition("STAT_LOCATOR", STAT_LOCATOR, LABEL_DEFINE);
    C_AddDefinition("STAT_ACTIVATOR", STAT_ACTIVATOR, LABEL_DEFINE);
    C_AddDefinition("STAT_TRANSPORT", STAT_TRANSPORT, LABEL_DEFINE);
    C_AddDefinition("STAT_PLAYER", STAT_PLAYER, LABEL_DEFINE);
    C_AddDefinition("STAT_FX", STAT_FX, LABEL_DEFINE);
    C_AddDefinition("STAT_FALLER", STAT_FALLER, LABEL_DEFINE);
    C_AddDefinition("STAT_DUMMYPLAYER", STAT_DUMMYPLAYER, LABEL_DEFINE);
    C_AddDefinition("STAT_LIGHT", STAT_LIGHT, LABEL_DEFINE);

    C_AddDefinition("SFLAG_SHADOW", SPRITE_SHADOW, LABEL_DEFINE);
    C_AddDefinition("SFLAG_NVG", SPRITE_NVG, LABEL_DEFINE);
    C_AddDefinition("SFLAG_NOSHADE", SPRITE_NOSHADE, LABEL_DEFINE);
    C_AddDefinition("SFLAG_BADGUY", SPRITE_BADGUY, LABEL_DEFINE);
    C_AddDefinition("SFLAG_NOPAL", SPRITE_NOPAL, LABEL_DEFINE);
    C_AddDefinition("SFLAG_NOEVENTS", SPRITE_NOEVENTCODE, LABEL_DEFINE);
    C_AddDefinition("SFLAG_NOLIGHT", SPRITE_NOLIGHT, LABEL_DEFINE);
    C_AddDefinition("SFLAG_USEACTIVATOR", SPRITE_USEACTIVATOR, LABEL_DEFINE);
    C_AddDefinition("SFLAG_NOCLIP", SPRITE_NOCLIP, LABEL_DEFINE);
    C_AddDefinition("SFLAG_SMOOTHMOVE", SPRITE_SMOOTHMOVE, LABEL_DEFINE);
    C_AddDefinition("SFLAG_NOTELEPORT", SPRITE_NOTELEPORT, LABEL_DEFINE);

    C_AddDefinition("STR_MAPNAME",STR_MAPNAME,LABEL_DEFINE);
    C_AddDefinition("STR_MAPFILENAME",STR_MAPFILENAME,LABEL_DEFINE);
    C_AddDefinition("STR_PLAYERNAME",STR_PLAYERNAME,LABEL_DEFINE);
    C_AddDefinition("STR_VERSION",STR_VERSION,LABEL_DEFINE);
    C_AddDefinition("STR_GAMETYPE",STR_GAMETYPE,LABEL_DEFINE);
    C_AddDefinition("STR_VOLUMENAME",STR_VOLUMENAME,LABEL_DEFINE);

    C_AddDefinition("NO",0,LABEL_DEFINE|LABEL_ACTION|LABEL_AI|LABEL_MOVE);

    C_AddDefinition("PROJ_BOUNCES",PROJ_BOUNCES,LABEL_DEFINE);
    C_AddDefinition("PROJ_BSOUND",PROJ_BSOUND,LABEL_DEFINE);
    C_AddDefinition("PROJ_CLIPDIST",PROJ_CLIPDIST,LABEL_DEFINE);
    C_AddDefinition("PROJ_CSTAT",PROJ_CSTAT,LABEL_DEFINE);
    C_AddDefinition("PROJ_DECAL",PROJ_DECAL,LABEL_DEFINE);
    C_AddDefinition("PROJ_DROP",PROJ_DROP,LABEL_DEFINE);
    C_AddDefinition("PROJ_EXTRA",PROJ_EXTRA,LABEL_DEFINE);
    C_AddDefinition("PROJ_EXTRA_RAND",PROJ_EXTRA_RAND,LABEL_DEFINE);
    C_AddDefinition("PROJ_FLASH_COLOR",PROJ_FLASH_COLOR,LABEL_DEFINE);
    C_AddDefinition("PROJ_HITRADIUS",PROJ_HITRADIUS,LABEL_DEFINE);
    C_AddDefinition("PROJ_ISOUND",PROJ_ISOUND,LABEL_DEFINE);
    C_AddDefinition("PROJ_OFFSET",PROJ_OFFSET,LABEL_DEFINE);
    C_AddDefinition("PROJ_PAL",PROJ_PAL,LABEL_DEFINE);
    C_AddDefinition("PROJ_RANGE",PROJ_RANGE,LABEL_DEFINE);
    C_AddDefinition("PROJ_SHADE",PROJ_SHADE,LABEL_DEFINE);
    C_AddDefinition("PROJ_SOUND",PROJ_SOUND,LABEL_DEFINE);
    C_AddDefinition("PROJ_SPAWNS",PROJ_SPAWNS,LABEL_DEFINE);
    C_AddDefinition("PROJ_SXREPEAT",PROJ_SXREPEAT,LABEL_DEFINE);
    C_AddDefinition("PROJ_SYREPEAT",PROJ_SYREPEAT,LABEL_DEFINE);
    C_AddDefinition("PROJ_TNUM",PROJ_TNUM,LABEL_DEFINE);
    C_AddDefinition("PROJ_TOFFSET",PROJ_TOFFSET,LABEL_DEFINE);
    C_AddDefinition("PROJ_TRAIL",PROJ_TRAIL,LABEL_DEFINE);
    C_AddDefinition("PROJ_TXREPEAT",PROJ_TXREPEAT,LABEL_DEFINE);
    C_AddDefinition("PROJ_TYREPEAT",PROJ_TYREPEAT,LABEL_DEFINE);
    C_AddDefinition("PROJ_USERDATA",PROJ_USERDATA,LABEL_DEFINE);
    C_AddDefinition("PROJ_VEL_MULT",PROJ_MOVECNT,LABEL_DEFINE);
    C_AddDefinition("PROJ_VEL",PROJ_VEL,LABEL_DEFINE);
    C_AddDefinition("PROJ_WORKSLIKE",PROJ_WORKSLIKE,LABEL_DEFINE);
    C_AddDefinition("PROJ_XREPEAT",PROJ_XREPEAT,LABEL_DEFINE);
    C_AddDefinition("PROJ_YREPEAT",PROJ_YREPEAT,LABEL_DEFINE);
}
//#endif

function C_InitProjectiles() : void
{
    todo("C_InitProjectiles"); 
    //var i;

    //typedef struct
    //{
    //    int32_t workslike, cstat; // 8b
    //    int32_t hitradius, range, flashcolor; // 12b
    //    int16_t spawns, sound, isound, vel; // 8b
    //    int16_t decal, trail, tnum, drop; // 8b
    //    int16_t offset, bounces, bsound; // 6b
    //    int16_t toffset; // 2b
    //    int16_t extra, extra_rand; // 4b
    //    int8_t sxrepeat, syrepeat, txrepeat, tyrepeat; // 4b
    //    int8_t shade, xrepeat, yrepeat, pal; // 4b
    //    int8_t movecnt; // 1b
    //    uint8_t clipdist; // 1b
    //    int8_t filler[6]; // 6b
    //} defaultprojectile_t;

    //defaultprojectile_t DefaultProjectile =
    //{
    //    1, -1, 2048, 0, 0, (int16_t)SMALLSMOKE, -1, -1, 600, (int16_t)BULLETHOLE, -1, 0, 0, 448,
    //    (int16_t)g_numFreezeBounces, (int16_t)PIPEBOMB_BOUNCE, 1, 100, -1, -1, -1, -1, -1, -96, 18, 18,
    //    0, 1, 32, {0,0,0,0,0,0},
    //};

    //EDUKE32_STATIC_ASSERT(sizeof(projectile_t) == sizeof(DefaultProjectile));

    //for (i=MAXTILES-1; i>=0; i--)
    //{
    //    Bmemcpy(&ProjectileData[i], &DefaultProjectile, sizeof(projectile_t));
    //    Bmemcpy(&g_tile[i].defproj, &DefaultProjectile, sizeof(projectile_t));
    //}
}

//#if !defined LUNATIC
//extern int32_t g_numObituaries;
//extern int32_t g_numSelfObituaries;

//static char * C_ScriptVersionString(int32_t version)
//{
//    switch (version)
//    {
//    case 9:
//        return "0.99";
//    case 10:
//        return "1.0";
//    case 11:
//        return "1.1";
//    case 13:
//        return "1.3D";
//    default:
//        return "1.4+";
//    }
//}

function C_Compile(filenam: string) : void 
{
    path("C_Compile");
    var mptr: Ptr; // //    char *
    var i : number;
    var fs:number,fp:number;
    var startcompiletime : number; //    uint32_t
    Bmemset(new P(apScriptGameEvent), 0, sizeof(apScriptGameEvent));

    for (i = MAXTILES - 1; i >= 0; i--)
        g_tile[i] = new tiledata_t();

    C_InitHashes();
    Gv_Init();

    C_InitProjectiles();

    fp = kopen4loadfrommod(filenam,g_loadFromGroupOnly);
    
    if (fp == -1) // JBF: was 0
    {
        todoThrow();
//        extern int32_t numgroupfiles;

//        if (g_loadFromGroupOnly == 1 || numgroupfiles == 0)
//        {
//# ifdef _WIN32
//            Bsprintf(tempbuf,"Duke Nukem 3D game data was not found.  A valid copy of \"%s\" or other compatible data is needed to run EDuke32.\n\n"
//                     "You can find \"%s\" in the \"DN3DINST\" or \"ATOMINST\" directory on your Duke Nukem 3D installation CD-ROM.\n\n"
//                     "If you don't already own a copy of Duke or haven't seen your disc in years, don't worry -- you can download the full, registered "
//                     "version of Duke Nukem 3D: Atomic Edition immediately for only $5.99 through our partnership with GOG.com.\n\n"
//                     "Not a typo; it's less than 6 bucks.  Get Duke now?\n\n"
//                     "(Clicking yes will bring you to our web store)",
//                     G_GrpFile(),G_GrpFile());

//            if (wm_ynbox("Important - Duke Nukem 3D not found - EDuke32","%s",tempbuf))
//            {
//                SHELLEXECUTEINFOA sinfo;
//                char *p = "http://www.gog.com/en/gamecard/duke_nukem_3d_atomic_edition/?pp=6c1e671f9af5b46d9c1a52067bdf0e53685674f7";

//                Bmemset(&sinfo, 0, sizeof(sinfo));
//                sinfo.cbSize = sizeof(sinfo);
//                sinfo.fMask = SEE_MASK_CLASSNAME;
//                sinfo.lpVerb = "open";
//                sinfo.lpFile = p;
//                sinfo.nShow = SW_SHOWNORMAL;
//                sinfo.lpClass = "http";

//                if (!ShellExecuteExA(&sinfo))
//                    G_GameExit("Error launching default system browser!");
//            }
//            G_GameExit("");
//# else
//            Bsprintf(tempbuf,"Duke Nukem 3D game data was not found.  A valid copy of \"%s\" or other compatible data is needed to run EDuke32.\n"
//                     "You can find \"%s\" in the \"DN3DINST\" or \"ATOMINST\" directory on your Duke Nukem 3D installation CD-ROM.\n\n"
//                     "EDuke32 will now close.",
//                     G_GrpFile(),G_GrpFile());
//            G_GameExit(tempbuf);
//# endif
//        }
//        else
//        {
//            Bsprintf(tempbuf,"CON file `%s' missing.", filenam);
//            G_GameExit(tempbuf);
//        }

//        //g_loadFromGroupOnly = 1;
//        return; //Not there
    }

    fs = kfilelength(fp);
    assert.areEqual(151190, fs);

    initprintf("Compiling: %s (%d bytes)\n",filenam,fs);

    flushlogwindow = 0;

    startcompiletime = getticks();
    
    mptr = new Ptr(new Uint8Array(fs+1));//(char *)Bmalloc(fs+1);
//    if (!mptr)
//    {
//        Bsprintf(tempbuf,"Failed allocating %d byte CON text buffer.", fs+1);
//        G_GameExit(tempbuf);
//    }

    mptr.array[fs] = 0;

    kread(fp,mptr,fs);
    textptr = mptr.array.toString();
    textptrIdx = 0;
    kclose(fp);
    
    //if (script != NULL) {
    //    Bfree(script);
    //}

    script = new Int32Array(g_scriptSize);  //(intptr_t *)Bcalloc(1,g_scriptSize * sizeof(intptr_t));
    assert.areEqual(4194304, script.buffer.byteLength);
    scriptIdx = 0;
    bitptr = new Uint8Array((((g_scriptSize+7)>>3)+1)); //(char *)Bcalloc(1,(((g_scriptSize+7)>>3)+1) * sizeof(uint8_t));
    assert.areEqual(131073, bitptr.buffer.byteLength);
//    initprintf("script: %d, bitptr: %d\n",script,bitptr);

    g_numLabels = g_numDefaultLabels = 0;
    g_scriptPtr = scriptIdx+3;  // move permits constants 0 and 1; moveptr[1] would be script[2] (reachable?)
    g_numCompilerWarnings = 0;
    g_numCompilerErrors = 0;
    g_lineNumber = 1;
    g_totalLines = 0;
    
    C_AddDefaultDefinitions();

    g_szScriptFileName = filenam;   // JBF 20031130: Store currently compiling file name
    
    C_ParseCommand(1);
    
    for (i=0; i < g_scriptModulesNum; ++i)
    {
        C_Include(g_scriptModules[i]);
        g_scriptModules[i] = "";        //Bfree(g_scriptModules[i]);
    }
//    Bfree(g_scriptModules);
    g_scriptModules = null;

    flushlogwindow = 1;

    if (g_numCompilerErrors > 63)
        initprintf("fatal error: too many errors: Aborted\n");

    //*script = (intptr_t) g_scriptPtr;

    //Bfree(mptr);
    mptr = NULL;

    if (g_numCompilerWarnings|g_numCompilerErrors)
        initprintf("Found %d warning(s), %d error(s).\n",g_numCompilerWarnings,g_numCompilerErrors);

    if (g_numCompilerErrors)
    {
        if (g_loadFromGroupOnly)
        {
            Bsprintf(buf,"Error compiling CON files.");
            G_GameExit(buf.toString());
        }
        else
        {
            if (g_groupFileHandle != -1 && g_loadFromGroupOnly == 0)
            {
//                initprintf("Error(s) found in file `%s'.  Do you want to use the INTERNAL DEFAULTS (y/N)?\n",filenam);

                i=wm_ynbox("CON File Compilation Error", "Error(s) found in file `%s'. Do you want to use the "+
                           "INTERNAL DEFAULTS?",filenam);
                if (i) i = 'y'.charCodeAt(0);
                if (i == 'y'.charCodeAt(0) || i == 'Y'.charCodeAt(0))
                {
                    initprintf(" Yes\n");
                    g_loadFromGroupOnly = 1;
                    return;
                }
                else
                {
//# if (defined _WIN32 || (defined RENDERTYPESDL && ((defined __APPLE__ && defined OSX_STARTUPWINDOW) || defined HAVE_GTK2)))
//                    while (!quitevent) // keep the window open so people can copy CON errors out of it
//                        handleevents();
//# endif
                    G_GameExit("");
                }
            }
        }
    }
    else
    {
        var j=0, k=0, l=0;

        hash_free(h_keywords);
        freehashnames();
        freesoundhashnames();

        hash_free(sectorH);
        hash_free(wallH);
        hash_free(userdefH);

        hash_free(projectileH);
        hash_free(playerH);
        hash_free(inputH);
        hash_free(actorH);
        hash_free(tspriteH);

        g_totalLines += g_lineNumber;

        C_SetScriptSize(g_scriptPtr-scriptIdx+8);

        initprintf("Script compiled in %dms, %ld*%db, language version %s\n", getticks() - startcompiletime,
                   /*(unsigned long)*/uint32(g_scriptPtr-scriptIdx), 4, "JavaScript");

        initprintf("%d/%d labels, %d/%d variables, %d/%d arrays\n", g_numLabels,
                   int32(min((MAXSECTORS * 40 / 4),
                                MAXSPRITES * sizeof(spritetype)/(1<<6))>>0),
                   g_gameVarCount, MAXGAMEVARS, g_gameArrayCount, MAXGAMEARRAYS);

        for (i=MAXQUOTES-1; i>=0; i--)
            if (ScriptQuotes[i])
                j++;
        for (i=MAXGAMEEVENTS-1; i>=0; i--)
            if (apScriptGameEvent[i])
                k++;
        for (i=MAXTILES-1; i>=0; i--)
            if (g_tile[i].execPtr)
                l++;

        if (j) initprintf("%d quotes, ", j);
        if (g_numQuoteRedefinitions) initprintf("%d strings, ", g_numQuoteRedefinitions);
        if (k) initprintf("%d events, ", k);
        if (l) initprintf("%d actors", l);

        initprintf("\n");

        C_InitQuotes();
    }
}

function C_ReportError(iError : number) : void
{
    if (Bstrcmp(g_szCurrentBlockName,g_szLastBlockName))
    {
        if (g_parsingEventPtr || g_processingState || g_parsingActorPtr)
            initprintf("%s: In %s `%s':\n",g_szScriptFileName,g_parsingEventPtr?"event":g_parsingActorPtr?"actor":"state",g_szCurrentBlockName);
        else initprintf("%s: At top level:\n",g_szScriptFileName);
        g_szLastBlockName = g_szCurrentBlockName;
    }
    switch (iError)
    {
    case ERROR_CLOSEBRACKET:
        initprintf("%s:%d: error: found more `}' than `{' before `%s'.\n",g_szScriptFileName,g_lineNumber,tempbuf.toString());
        console.error("C_ReportError stack");
        debugger;
        break;
    case ERROR_EVENTONLY:
        initprintf("%s:%d: error: `%s' only valid during events.\n",g_szScriptFileName,g_lineNumber,tempbuf.toString());
        break;
    case ERROR_EXCEEDSMAXTILES:
        initprintf("%s:%d: error: `%s' value exceeds MAXTILES.  Maximum is %d.\n",g_szScriptFileName,g_lineNumber,tempbuf.toString(),MAXTILES-1);
        break;
    case ERROR_EXPECTEDKEYWORD:
        initprintf("%s:%d: error: expected a keyword but found `%s'.\n",g_szScriptFileName,g_lineNumber,tempbuf.toString());
        break;
    case ERROR_FOUNDWITHIN:
        initprintf("%s:%d: error: found `%s' within %s.\n",g_szScriptFileName,g_lineNumber,tempbuf.toString(),g_parsingEventPtr?"an event":g_parsingActorPtr?"an actor":"a state");
        break;
    case ERROR_ISAKEYWORD:
        initprintf("%s:%d: error: symbol `%s' is a keyword.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
        break;
    case ERROR_NOENDSWITCH:
        initprintf("%s:%d: error: did not find `endswitch' before `%s'.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
        break;
    case ERROR_NOTAGAMEDEF:
        initprintf("%s:%d: error: symbol `%s' is not a game definition.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
        break;
    case ERROR_NOTAGAMEVAR:
        initprintf("%s:%d: error: symbol `%s' is not a game variable.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
        break;
    case ERROR_NOTAGAMEARRAY:
        initprintf("%s:%d: error: symbol `%s' is not a game array.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
        break;
    case ERROR_GAMEARRAYBNC:
        initprintf("%s:%d: error: square brackets for index of game array not closed, expected ] found %c\n",g_szScriptFileName,g_lineNumber,textptr[textptrIdx]);
        break;
    case ERROR_GAMEARRAYBNO:
        initprintf("%s:%d: error: square brackets for index of game array not opened, expected [ found %c\n",g_szScriptFileName,g_lineNumber,textptr[textptrIdx]);
        break;
    case ERROR_INVALIDARRAYWRITE:
        initprintf("%s:%d: error: arrays can only be written to using `setarray' %c\n",g_szScriptFileName,g_lineNumber,textptr[textptrIdx]);
        break;
    case ERROR_OPENBRACKET:
        initprintf("%s:%d: error: found more `{' than `}' before `%s'.\n",g_szScriptFileName,g_lineNumber,tempbuf.toString());
        break;
    case ERROR_PARAMUNDEFINED:
        initprintf("%s:%d: error: parameter `%s' is undefined.\n",g_szScriptFileName,g_lineNumber,tempbuf.toString());
        break;
    case ERROR_SYMBOLNOTRECOGNIZED:
        initprintf("%s:%d: error: symbol `%s' is not recognized.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
        break;
    case ERROR_SYNTAXERROR:
        initprintf("%s:%d: error: syntax error.\n",g_szScriptFileName,g_lineNumber);
        break;
    case ERROR_VARREADONLY:
        initprintf("%s:%d: error: variable `%s' is read-only.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
        break;
    case ERROR_ARRAYREADONLY:
        initprintf("%s:%d: error: array `%s' is read-only.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
        break;
    case ERROR_VARTYPEMISMATCH:
        initprintf("%s:%d: error: variable `%s' is of the wrong type.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
        break;
    case WARNING_BADGAMEVAR:
        initprintf("%s:%d: warning: variable `%s' should be either per-player OR per-actor, not both.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
        break;
    case WARNING_DUPLICATECASE:
        initprintf("%s:%d: warning: duplicate case ignored.\n",g_szScriptFileName,g_lineNumber);
        break;
    case WARNING_DUPLICATEDEFINITION:
        initprintf("%s:%d: warning: duplicate game definition `%s' ignored.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
        break;
    case WARNING_EVENTSYNC:
        initprintf("%s:%d: warning: found `%s' within a local event.\n",g_szScriptFileName,g_lineNumber,tempbuf.toString());
        break;
    case WARNING_LABELSONLY:
        initprintf("%s:%d: warning: expected a label, found a constant.\n",g_szScriptFileName,g_lineNumber);
        break;
    case WARNING_NAMEMATCHESVAR:
        initprintf("%s:%d: warning: symbol `%s' already used for game variable.\n",g_szScriptFileName,g_lineNumber,label.subarray(g_numLabels<<6).toString());
        break;
    }
}
//#endif

/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/todo.ts" />
/// <reference path="../../utils/types.ts" />

/// <reference path="../../eduke32/headers/duke3d.h.ts" />
/// <reference path="../../eduke32/headers/function.h.ts" />
/// <reference path="../../eduke32/headers/player.h.ts" />
/// <reference path="../../eduke32/headers/quotes.h.ts" />
/// <reference path="../../eduke32/headers/sector.h.ts" />

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

//#ifndef __global_h__
//#define __global_h__

//#ifdef __global_c__
//    #define G_EXTERN
//#else
//    #define G_EXTERN extern
//#endif

var MAXINTERPOLATIONS = MAXSPRITES;
//// KEEPINSYNC lunatic/con_lang.lua
var MAXSKILLS=7;

//// duke3d global soup :(

//#include "compat.h"
//#include "build.h"

var g_numInterpolations: number;   //G_EXTERN int32_t 
var g_interpolationLock: number;   //G_EXTERN int32_t 
var oldipos = new Int32Array(MAXINTERPOLATIONS);
var curipos = new Array<AnimatePtr>(MAXINTERPOLATIONS); //G_EXTERN int32_t *   ! pointers
var bakipos = new Int32Array(MAXINTERPOLATIONS);
var connectpoint2 = new Int32Array(MAXPLAYERS);

//#include "duke3d.h"
//#include "sector.h"
//#include "quotes.h"

var myconnectindex: number = 0, numplayers: number;

var sbar = new DukeStatus_t();
//G_EXTERN actor_t actor[MAXSPRITES];
//// g_tile: tile-specific data THAT DOES NOT CHANGE during the course of a game
//G_EXTERN tiledata_t g_tile[MAXTILES];
var animwall: animwalltype[] = newStructArray<animwalltype>(animwalltype, MAXANIMWALLS);//G_EXTERN [MAXANIMWALLS]
var ScriptQuotes: Uint8Array[] = new Array<Uint8Array>(MAXQUOTES),ScriptQuoteRedefinitions: Uint8Array[] = new Array<Uint8Array>(MAXQUOTES); ////G_EXTERN char *
var label : Uint8Array;//G_EXTERN char *label;
var EnvMusicFilename: string[] = new Array<string>(MAXVOLUMES+1);//[MAXVOLUMES+1][BMAX_PATH];
var /*char */g_RTSPlaying: number = 0;
var g_musicIndex: number; //G_EXTERN int32_t 
var g_loadFromGroupOnly = 0;//char
var g_numSkills : number; // char
var myjumpingtoggle: number,myonground: number,myhardlanding: number,myreturntocenter: number;//G_EXTERN char 
var pus: number,pub: number;//G_EXTERN char 
var ready2send: number;//G_EXTERN char 
var szPlayerName: string; //G_EXTERN char [32]
//// XXX: menutextbuf overflow possible?
var tempbuf = new Uint8Array(MAXSECTORS<<1),packbuf = new Uint8Array(PACKBUF_SIZE),menutextbuf = new Uint8Array(128),buf = new Uint8Array(1024);
//G_EXTERN char typebuflen,typebuf[141];
var avg = new input_t();
var loc = new input_t();
//G_EXTERN input_t recsync[RECSYNCBUFSIZ];
var SpriteDeletionQueue = new Int16Array(1024),g_spriteDeleteQueuePos: number; //G_EXTERN int16_t 
var animatesect = new Int16Array(MAXANIMATES);
var camsprite: number;//G_EXTERN int16_t
var cyclers = multiDimArray(Int16Array, MAXCYCLERS, 6),g_numCyclers: number; //G_EXTERN int16_t 
var g_globalRandom: number;//G_EXTERN int16_t 
var g_mirrorWall = new Int16Array(64),g_mirrorSector= new Int16Array(64),g_mirrorCount: number; //G_EXTERN int16_t 
var g_numAnimWalls: number; //G_EXTERN int16_t 
var g_numClouds: number,clouds = new Int16Array(128),cloudx = new Int16Array(128),cloudy = new Int16Array(128); //G_EXTERN int16_t 
var myang: number,omyang: number,mycursectnum: number,myjumpingcounter: number;  //G_EXTERN int16_t 
var myhoriz: number,omyhoriz: number,myhorizoff: number,omyhorizoff: number;     //G_EXTERN int16_t 
var neartagsector: number,neartagwall: number,neartagsprite: number;             //G_EXTERN int16_t 
var /*G_EXTERN int32_t **/animateptr = new Array(MAXANIMATES);
var animategoal = new Int32Array(MAXANIMATES),animatevel = new Int32Array(MAXANIMATES),g_animateCount: number; //G_EXTERN int32_t 
var cloudtotalclock:number;//G_EXTERN int32_t 
var fricxv:number,fricyv:number;                             //G_EXTERN int32_t 
var g_currentFrameRate:number;                               //G_EXTERN int32_t 
var g_currentMenu:number;                                    //G_EXTERN int32_t 
var g_damageCameras:number,g_freezerSelfDamage:number;       //G_EXTERN int32_t 
var g_doQuickSave:number;                                    //G_EXTERN int32_t 
var g_earthquakeTime:number;                                 //G_EXTERN uint16_t
var g_gameQuit:number;                                       //G_EXTERN int32_t 
var g_groupFileHandle:number;                                //G_EXTERN int32_t 
var g_impactDamage:number,g_maxPlayerHealth:number;          //G_EXTERN int32_t 
var g_musicSize:number;                                      //G_EXTERN int32_t 
var g_numLabels:number,g_numDefaultLabels:number;
var g_numRealPalettes:number; //G_EXTERN int32_t 
var g_scriptDebug:number; //G_EXTERN int32_t 
var g_showShareware:number;//G_EXTERN int32_t 
var g_numPlayerSprites:number;//G_EXTERN int8_t 
var g_tripbombLaserMode:number;////G_EXTERN int32_t 
var msx= new Int32Array(2048),msy= new Int32Array(2048);//G_EXTERN int32_t 
var neartaghitdist:number,lockclock:number,g_startArmorAmount:number;//G_EXTERN int32_t
var playerswhenstarted : number; ////G_EXTERN int32_t
var screenpeek: number=0;
var startofdynamicinterpolations: number;         //G_EXTERN int32_t 
var vel: number=0,svel: number=0,angvel: number=0,horiz: number=0,ototalclock: number=0;    //G_EXTERN int32_t 
//G_EXTERN intptr_t *g_parsingActorPtr;
var g_scriptPtr = 0, insptr = 0;// - pointers to script G_EXTERN intptr_t 
var labelcode: Int32Array, labeltype: Int32Array;//G_EXTERN int32_t *labelcode,*labeltype;
var labelcodeIdx : number, labeltypeIdx : number;
var script:  Uint32Array;//G_EXTERN intptr_t *script;
var scriptIdx: number = 0;
var MapInfo: map_t[] = newStructArray(map_t, (MAXVOLUMES+1)*MAXLEVELS);  // +1 volume for "intro", "briefing" music //G_EXTERN map_t 
//#pragma pack(push,1)
//G_EXTERN playerdata_t g_player[MAXPLAYERS];
//G_EXTERN playerspawn_t g_playerSpawnPoints[MAXPLAYERS];
//G_EXTERN input_t inputfifo[MOVEFIFOSIZ][MAXPLAYERS];
//#pragma pack(pop)
var ProjectileData:projectile_t[] = new Array(MAXTILES);//= newStructArray(projectile_t, MAXTILES);
var SpriteProjectile:projectile_t[] = new Array(MAXSPRITES);//= newStructArray(projectile_t, MAXSPRITES);
//G_EXTERN sound_t g_sounds[MAXSOUNDS];
var everyothertime: number;   ////G_EXTERN uint32_t
var g_moveThingsCount: number;////G_EXTERN uint32_t
var my=new vec3_t(),omy=new vec3_t(),myvel=new vec3_t();//G_EXTERN vec3_t 
//G_EXTERN volatile char g_soundlocks[MAXSOUNDS];
var  g_restorePalette=0;  //G_EXTERN int32_t
var  g_screenCapture=0;   //G_EXTERN int32_t
var  g_noEnemies=0;       //G_EXTERN int32_t

//#ifndef __global_c__
var s_buildRev = "rXXXX"; //from rev.h
//G_EXTERN const char *s_buildDate;
var g_spriteGravity: number; ////G_EXTERN int32_t 
var g_spriteDeleteQueueSize: number; ////G_EXTERN int16_t
var EpisodeNamesLength = 33;
var EpisodeNames: string[];// [MAXVOLUMES][33];//G_EXTERN char
var SkillNamesLength = 33;
var SkillNames: string[]; // [MAXSKILLS][33];
//G_EXTERN char GametypeNames[MAXGAMETYPES][33];
var GametypeFlags: Int32Array;//[MAXGAMETYPES];
//G_EXTERN char g_numGametypes;
//G_EXTERN char g_numVolumes;
var g_timerTicsPerSecond: number;      //G_EXTERN int32_t
var g_actorRespawnTime: number;        //G_EXTERN int32_t
var g_itemRespawnTime: number;         //G_EXTERN int32_t
var g_scriptSize: number;
var BlimpSpawnSprites = new Int16Array(15); //G_EXTERN int16_t 
var g_playerFriction:number;              //G_EXTERN int32_t 
var g_numFreezeBounces:number;            //G_EXTERN int32_t 
var g_lastSaveSlot:number;                //G_EXTERN int32_t 
var g_rpgBlastRadius:number;              //G_EXTERN int32_t 
var g_pipebombBlastRadius:number;         //G_EXTERN int32_t 
var g_tripbombBlastRadius:number;         //G_EXTERN int32_t 
var g_shrinkerBlastRadius:number;         //G_EXTERN int32_t 
var g_morterBlastRadius:number;           //G_EXTERN int32_t 
var g_bouncemineBlastRadius:number;       //G_EXTERN int32_t 
var g_seenineBlastRadius:number;          //G_EXTERN int32_t 
//G_EXTERN char CheatKeys[2];
//G_EXTERN char setupfilename[BMAX_PATH];
//#endif

//#endif

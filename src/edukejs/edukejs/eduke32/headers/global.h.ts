/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/todo.ts" />
/// <reference path="../../utils/types.ts" />

/// <reference path="../../eduke32/headers/function.h.ts" />
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

//#ifndef __global_h__
//#define __global_h__

//#ifdef __global_c__
//    #define G_EXTERN
//#else
//    #define G_EXTERN extern
//#endif

//#define MAXINTERPOLATIONS MAXSPRITES
//// KEEPINSYNC lunatic/con_lang.lua
//#define MAXSKILLS 7

//// duke3d global soup :(

//#include "compat.h"
//#include "build.h"

//G_EXTERN int32_t g_numInterpolations;
//G_EXTERN int32_t g_interpolationLock;
//G_EXTERN int32_t oldipos[MAXINTERPOLATIONS];
//G_EXTERN int32_t *curipos[MAXINTERPOLATIONS];
//G_EXTERN int32_t bakipos[MAXINTERPOLATIONS];
var connectpoint2 = new Int32Array(MAXPLAYERS);

//#include "duke3d.h"
//#include "sector.h"
//#include "quotes.h"

var myconnectindex: number, numplayers: number;

//G_EXTERN DukeStatus_t sbar;
//G_EXTERN actor_t actor[MAXSPRITES];
//// g_tile: tile-specific data THAT DOES NOT CHANGE during the course of a game
//G_EXTERN tiledata_t g_tile[MAXTILES];
//G_EXTERN animwalltype animwall[MAXANIMWALLS];
var ScriptQuotes: string[] /*[MAXQUOTES]*/,ScriptQuoteRedefinitions: string[]/*[MAXQUOTES]*/; ////G_EXTERN char *
var label : Uint8Array;//G_EXTERN char *label;
//G_EXTERN char EnvMusicFilename[MAXVOLUMES+1][BMAX_PATH];
//G_EXTERN char g_RTSPlaying;
//G_EXTERN int32_t g_musicIndex;
var g_loadFromGroupOnly : number;//char
var g_numSkills : number; // char
//G_EXTERN char myjumpingtoggle,myonground,myhardlanding,myreturntocenter;
//G_EXTERN char pus,pub;
//G_EXTERN char ready2send;
//G_EXTERN char szPlayerName[32];
//// XXX: menutextbuf overflow possible?
var tempbuf = new Uint8Array(MAXSECTORS<<1),packbuf = new Uint8Array(PACKBUF_SIZE),menutextbuf = new Uint8Array(128),buf = new Uint8Array(1024)
//G_EXTERN char typebuflen,typebuf[141];
//G_EXTERN input_t avg;
//G_EXTERN input_t loc;
//G_EXTERN input_t recsync[RECSYNCBUFSIZ];
//G_EXTERN int16_t SpriteDeletionQueue[1024],g_spriteDeleteQueuePos;
//G_EXTERN int16_t animatesect[MAXANIMATES];
//G_EXTERN int16_t camsprite;
//G_EXTERN int16_t cyclers[MAXCYCLERS][6],g_numCyclers;
//G_EXTERN int16_t g_globalRandom;
//G_EXTERN int16_t g_mirrorWall[64],g_mirrorSector[64],g_mirrorCount;
//G_EXTERN int16_t g_numAnimWalls;
//G_EXTERN int16_t g_numClouds,clouds[128],cloudx[128],cloudy[128];
//G_EXTERN int16_t myang,omyang,mycursectnum,myjumpingcounter;
//G_EXTERN int16_t myhoriz,omyhoriz,myhorizoff,omyhorizoff;
//G_EXTERN int16_t neartagsector,neartagwall,neartagsprite;
//G_EXTERN int32_t *animateptr[MAXANIMATES];
//G_EXTERN int32_t animategoal[MAXANIMATES],animatevel[MAXANIMATES],g_animateCount;
//G_EXTERN int32_t cloudtotalclock:number;
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
//G_EXTERN int32_t g_numRealPalettes:number;
var g_scriptDebug:number; //G_EXTERN int32_t 
//G_EXTERN int32_t g_showShareware:number;
//G_EXTERN int8_t g_numPlayerSprites:number;
var g_tripbombLaserMode:number;////G_EXTERN int32_t 
//G_EXTERN int32_t msx[2048]:number,msy[2048]:number;
var neartaghitdist:number,lockclock:number,g_startArmorAmount:number;//G_EXTERN int32_t
var playerswhenstarted : number; ////G_EXTERN int32_t
//G_EXTERN int32_t screenpeek;
//G_EXTERN int32_t startofdynamicinterpolations;
//G_EXTERN int32_t vel,svel,angvel,horiz,ototalclock;
//G_EXTERN intptr_t *g_parsingActorPtr;
//G_EXTERN intptr_t *g_scriptPtr,*insptr;
var labelcode: Int32Array, labeltype: Int32Array;//G_EXTERN int32_t *labelcode,*labeltype;
var labelcodeIdx : number, labeltypeIdx : number;
var script:  Uint32Array;//G_EXTERN intptr_t *script;
var scriptIdx: number = 0;
//G_EXTERN map_t MapInfo[(MAXVOLUMES+1)*MAXLEVELS];  // +1 volume for "intro", "briefing" music
//#pragma pack(push,1)
//G_EXTERN playerdata_t g_player[MAXPLAYERS];
//G_EXTERN playerspawn_t g_playerSpawnPoints[MAXPLAYERS];
//G_EXTERN input_t inputfifo[MOVEFIFOSIZ][MAXPLAYERS];
//#pragma pack(pop)
//G_EXTERN projectile_t ProjectileData[MAXTILES];
//G_EXTERN projectile_t SpriteProjectile[MAXSPRITES];
//G_EXTERN sound_t g_sounds[MAXSOUNDS];
//G_EXTERN uint32_t everyothertime;
//G_EXTERN uint32_t g_moveThingsCount;
//G_EXTERN vec3_t my,omy,myvel;
//G_EXTERN volatile char g_soundlocks[MAXSOUNDS];
//G_EXTERN int32_t g_restorePalette;
//G_EXTERN int32_t g_screenCapture;
//G_EXTERN int32_t g_noEnemies;

//#ifndef __global_c__
//G_EXTERN const char *s_buildRev;
//G_EXTERN const char *s_buildDate;
var g_spriteGravity: number; ////G_EXTERN int32_t 
var g_spriteDeleteQueueSize: number; ////G_EXTERN int16_t
//G_EXTERN char EpisodeNames[MAXVOLUMES][33];
//G_EXTERN char SkillNames[MAXSKILLS][33];
//G_EXTERN char GametypeNames[MAXGAMETYPES][33];
//G_EXTERN int32_t GametypeFlags[MAXGAMETYPES];
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

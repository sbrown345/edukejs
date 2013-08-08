/// <reference path="../../build/headers/compat.h.ts" />

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

//#ifndef __gameexec_h__
//#define __gameexec_h__

//#include "build.h"
//#include "sector.h"  // mapstate_t
//#include "gamedef.h"  // vmstate_t

//// the order of these can't be changed or else compatibility with EDuke 2.0 mods will break
//// KEEPINSYNC with EventNames[] and lunatic/con_lang.lua
//enum GameEvent_t {
var EVENT_INIT=0,
    EVENT_ENTERLEVEL=1,
    EVENT_RESETWEAPONS=2,
    EVENT_RESETINVENTORY=3,
    EVENT_HOLSTER=4,
    EVENT_LOOKLEFT  =5,
    EVENT_LOOKRIGHT=6,
    EVENT_SOARUP=7,
    EVENT_SOARDOWN=8,
    EVENT_CROUCH=9,
    EVENT_JUMP  =10,
    EVENT_RETURNTOCENTER=11,
    EVENT_LOOKUP=12,
    EVENT_LOOKDOWN=13,
    EVENT_AIMUP=14,
    EVENT_FIRE =15,
    EVENT_CHANGEWEAPON=16,
    EVENT_GETSHOTRANGE=17,
    EVENT_GETAUTOAIMANGLE=18,
    EVENT_GETLOADTILE=19,
    EVENT_CHEATGETSTEROIDS  =20,
    EVENT_CHEATGETHEAT=21,
    EVENT_CHEATGETBOOT=22,
    EVENT_CHEATGETSHIELD=23,
    EVENT_CHEATGETSCUBA=24,
    EVENT_CHEATGETHOLODUKE  =25,
    EVENT_CHEATGETJETPACK=26,
    EVENT_CHEATGETFIRSTAID=27,
    EVENT_QUICKKICK=28,
    EVENT_INVENTORY=29,
    EVENT_USENIGHTVISION  =30,
    EVENT_USESTEROIDS=31,
    EVENT_INVENTORYLEFT=32,
    EVENT_INVENTORYRIGHT=33,
    EVENT_HOLODUKEON=34,
    EVENT_HOLODUKEOFF =35,
    EVENT_USEMEDKIT=36,
    EVENT_USEJETPACK=37,
    EVENT_TURNAROUND=38,
    EVENT_DISPLAYWEAPON=39,
    EVENT_FIREWEAPON =40,
    EVENT_SELECTWEAPON=41,
    EVENT_MOVEFORWARD=42,
    EVENT_MOVEBACKWARD=43,
    EVENT_TURNLEFT=44,
    EVENT_TURNRIGHT =45,
    EVENT_STRAFELEFT=46,
    EVENT_STRAFERIGHT=47,
    EVENT_WEAPKEY1=48,
    EVENT_WEAPKEY2=49,
    EVENT_WEAPKEY3 =50,
    EVENT_WEAPKEY4=51,
    EVENT_WEAPKEY5=52,
    EVENT_WEAPKEY6=53,
    EVENT_WEAPKEY7=54,
    EVENT_WEAPKEY8 =55,
    EVENT_WEAPKEY9=56,
    EVENT_WEAPKEY10=57,
    EVENT_DRAWWEAPON=58,
    EVENT_DISPLAYCROSSHAIR=59,
    EVENT_DISPLAYREST  =60,
    EVENT_DISPLAYSBAR=61,
    EVENT_RESETPLAYER=62,
    EVENT_INCURDAMAGE=63,
    EVENT_AIMDOWN=64,
    EVENT_GAME  =65,
    EVENT_PREVIOUSWEAPON=66,
    EVENT_NEXTWEAPON=67,
    EVENT_SWIMUP=68,
    EVENT_SWIMDOWN=69,
    EVENT_GETMENUTILE  =70,
    EVENT_SPAWN=71,
    EVENT_LOGO=72,
    EVENT_EGS=73,
    EVENT_DOFIRE=74,
    EVENT_PRESSEDFIRE=75,
    EVENT_USE=76,
    EVENT_PROCESSINPUT=77,
    EVENT_FAKEDOMOVETHINGS=78,
    EVENT_DISPLAYROOMS=79,
    EVENT_KILLIT =80,
    EVENT_LOADACTOR=81,
    EVENT_DISPLAYBONUSSCREEN=82,
    EVENT_DISPLAYMENU=83,
    EVENT_DISPLAYMENUREST=84,
    EVENT_DISPLAYLOADINGSCREEN =85,
    EVENT_ANIMATESPRITES=86,
    EVENT_NEWGAME=87,
    EVENT_SOUND=88,
    EVENT_CHECKTOUCHDAMAGE=89,
    EVENT_CHECKFLOORDAMAGE =90,
    EVENT_LOADGAME=91,
    EVENT_SAVEGAME=92,
    EVENT_PREGAME=93,
    EVENT_CHANGEMENU=94,
    MAXEVENTS=95;

//};

//extern int32_t ticrandomseed;

//extern vmstate_t vm;
//#if !defined LUNATIC
//extern int32_t g_tw;
//extern int32_t g_errorLineNum;
//extern int32_t g_currentEventExec;

//void A_LoadActor(int32_t iActor);
//#endif

//void A_Execute(int32_t iActor,int32_t iPlayer,int32_t lDist);
//void A_Fall(int32_t iActor);
//int32_t A_FurthestVisiblePoint(int32_t iActor,spritetype *ts,int32_t *dax,int32_t *day);
//int32_t A_GetFurthestAngle(int32_t iActor,int32_t angs);
//void A_GetZLimits(int32_t iActor);
//int32_t G_GetAngleDelta(int32_t a,int32_t na);
//void G_RestoreMapState();
//void G_SaveMapState();
//int32_t VM_OnEvent(int32_t iEventID,int32_t iActor,int32_t iPlayer,int32_t lDist, int32_t iReturn);
//void VM_ScriptInfo(void);

function CON_ERRPRINTF(Text: string, ...args: any[]) {
    OSD_Printf_nowarn("Line %d, %s: " + Text, g_errorLineNum, keyw[g_tw],  args__); 
}

//#endif

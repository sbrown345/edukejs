/// <reference path="game.h.ts" />


/* Defines */
var DEBUGGINGAIDS = true;


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

//#ifndef __duke3d_h__
//#define __duke3d_h__

//#ifdef EXTERNC
//{
//#endif

//// JBF
//#include "compat.h"
//#include "a.h"
//#include "build.h"

//#ifdef POLYMER
//    #include "polymer.h"
//#else
//#ifdef USE_OPENGL
//    #include "polymost.h"
//#endif
//#endif

//#include "cache1d.h"
//#include "pragmas.h"
//#include "baselayer.h"
//#include "file_lib.h"
//#include "keyboard.h"
//#include "mathutil.h"
//#include "fx_man.h"

var APPNAME = "EDuke32";
var VERSION = "2.0.0devel";
var HEAD2 = APPNAME + " " + VERSION;

Object.defineProperty(window, 'VOLUMEALL', { get: function () { return g_Shareware == 0; } });
Object.defineProperty(window, 'PLUTOPAK', { get: function () { return g_scriptVersion == 14; } });
Object.defineProperty(window, 'VOLUMEONE', { get: function () { return g_Shareware == 1; } });
interface Window {
    VOLUMEALL: number;
    PLUTOPAK: number;
    VOLUMEONE: number;
}

//// increase by 3, because atomic GRP adds 1, and Shareware adds 2
//#define BYTEVERSION_JF      279

//#define BYTEVERSION_13      27
//#define BYTEVERSION_14      116
//#define BYTEVERSION_15      117
//#define BYTEVERSION         (BYTEVERSION_JF+(PLUTOPAK?1:(VOLUMEONE<<1)))

var NUMPAGES            =1;

//#define RECSYNCBUFSIZ       2520   //2520 is the (LCM of 1-8)*3
//#define MOVEFIFOSIZ         2

// KEEPINSYNC lunatic/con_lang.lua
var MAXVOLUMES         = 7;
var MAXLEVELS          = 64;
var MAXGAMETYPES       = 16;

//////////// TIMING CONSTANTS //////////
//// The number of 'totalclock' increments per second:
var TICRATE = 120;
//// The number of game state updates per second:
var REALGAMETICSPERSEC = 30;
//// The number of 'totalclock' increments per game state update:
//// NOTE: calling a game state update a 'frame' is really weird.
//// (This used to be TICRATE/GAMETICSPERSEC, which was 120/26 = 4.615~ truncated
//// to 4 by integer division.)
//#define TICSPERFRAME        (TICRATE/REALGAMETICSPERSEC)
//// Used as a constant to satisfy all of the calculations written with ticrate =
//// 26 in mind:
var GAMETICSPERSEC     =26;


var PACKBUF_SIZE        = 32768;

//#define TILE_SAVESHOT       (MAXTILES-1)
//#define TILE_LOADSHOT       (MAXTILES-3)
//#define TILE_TILT           (MAXTILES-2)
//#define TILE_ANIM           (MAXTILES-4)
//#define TILE_VIEWSCR        (MAXTILES-5)

//// sprites with these statnums should be considered for fixing (bitmap)
function ROTFIXSPR_STATNUMP(k: number ): boolean {return (k)==STAT_DEFAULT || (k)==STAT_STANDABLE || (k)==STAT_FX || 
                              (k)==STAT_FALLER || (k)==STAT_LIGHT;}
var ROTFIXSPR_MAGIC = 0x18190000;

//// JBF 20040604: sync is a function on some platforms
//#define sync                dsync

//// Uncomment the following to remove calls to a.nasm functions with the GL renderers
//// so that debugging with valgrind --smc-check=none is possible:
////#define DEBUG_VALGRIND_NO_SMC

//#include "common_game.h"
//#include "namesdyn.h"
//#include "function.h"
//#include "macros.h"
//#include "gamedefs.h"
//#include "config.h"
//#include "sounds.h"
//#include "control.h"
//#include "_rts.h"
//#include "rts.h"
//#include "soundsdyn.h"
//#include "music.h"
//#include "player.h"
//#include "actors.h"
//#include "quotes.h"
//#include "global.h"
//#include "sector.h"
//#include "net.h"
//#include "game.h"
//#include "gamedef.h"
//#include "gameexec.h"
//#include "gamevars.h"

//#ifdef LUNATIC
//# include "lunatic_game.h"
//#endif

function G_HaveEvent(/*int32_t*/ iEventID: number): number
{
//#ifdef LUNATIC
//    return El_HaveEvent(iEventID);
//#else
    return apScriptGameEvent[iEventID]!=NULL?1:0;
//#endif
}

function G_HaveActor(/*int32_t */actortile: number): number
{
//#ifdef LUNATIC
//    return El_HaveActor(actortile);
//#else
    return g_tile[actortile].execPtr!=NULL?1:0;
//#endif
}

//static inline int32_t G_InitialActorStrength(int32_t actortile)
//{
//#ifdef LUNATIC
//    return g_elActors[actortile].strength;
//#else
//    return g_tile[actortile].execPtr[0];
//#endif
//}

//#ifdef EXTERNC
//}
//#endif
//#endif

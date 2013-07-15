/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/todo.ts" />
/// <reference path="../../utils/types.ts" />

/// <reference path="../../build/headers/build.h.ts" />
/// <reference path="../../build/headers/cache1d.h.ts" />
/// <reference path="../../build/headers/compat.h.ts" />
/// <reference path="../../build/headers/duke3d.h.ts" />

/// <reference path="../../build/source/baselayer.c.ts" />
/// <reference path="../../build/source/build.c.ts" />
/// <reference path="../../build/source/compat.c.ts" />
/// <reference path="../../build/source/crc32.c.ts" />
/// <reference path="../../build/source/engine.c.ts" />
/// <reference path="../../build/source/polymost.c.ts" />

/// <reference path="../../eduke32/headers/_functio.h.ts" />
/// <reference path="../../eduke32/headers/actors.h.ts" />
/// <reference path="../../eduke32/headers/common_game.h.ts" />
/// <reference path="../../eduke32/headers/function.h.ts" />
/// <reference path="../../eduke32/headers/game.h.ts" />
/// <reference path="../../eduke32/headers/gamedef.h.ts" />
/// <reference path="../../eduke32/headers/gameexec.h.ts" />
/// <reference path="../../eduke32/headers/global.h.ts" />
/// <reference path="../../eduke32/headers/grpscan.h.ts" />
/// <reference path="../../eduke32/headers/namesdyn.h.ts" />
/// <reference path="../../eduke32/headers/player.h.ts" />
/// <reference path="../../eduke32/headers/quotes.h.ts" />
/// <reference path="../../eduke32/headers/soundsdyn.h.ts" />

/// <reference path="../../eduke32/source/baselayer.c.ts" />
/// <reference path="../../eduke32/source/cache1d.c.ts" />
/// <reference path="../../eduke32/source/common.c.ts" />
/// <reference path="../../eduke32/source/config.c.ts" />
/// <reference path="../../eduke32/source/game.c.ts" />
/// <reference path="../../eduke32/source/gamedef.c.ts" />
/// <reference path="../../eduke32/source/gamevars.c.ts" />
/// <reference path="../../eduke32/source/grpscan.c.ts" />
/// <reference path="../../eduke32/source/namesdyn.c.ts" />
/// <reference path="../../eduke32/source/net.c.ts" />
/// <reference path="../../eduke32/source/osd.c.ts" />
/// <reference path="../../eduke32/source/osdfuncs.c.ts" />
/// <reference path="../../eduke32/source/player.c.ts" />
/// <reference path="../../eduke32/source/soundsdyn.c.ts" />
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
    
//#define __global_c__
//#include "global.h"
//#include "duke3d.h"

var ud = new user_defs();

//const char *
//    #include "rev.h"

//const char *s_buildDate = "20120522";

//// JBF: g_spriteGravity modified to default to Atomic ed. default when using 1.3d CONs
//int32_t g_spriteGravity=176;

//int16_t g_spriteDeleteQueueSize = 64;

//char EpisodeNames[MAXVOLUMES][33] = { "L.A. Meltdown", "Lunar Apocalypse", "Shrapnel City" };
//char SkillNames[MAXSKILLS][33] = { "Piece Of Cake", "Let's Rock", "Come Get Some", "Damn I'm Good" };

//char GametypeNames[MAXGAMETYPES][33] = { "DukeMatch (Spawn)", "Cooperative Play", "DukeMatch (No Spawn)", "Team DM (Spawn)", "Team DM (No Spawn)" };

//int32_t GametypeFlags[MAXGAMETYPES] =
//{
//    /*4+*/8+16+1024+2048+16384,
//    1+2+32+64+128+256+512+4096+8192+32768,
//    2+/*4+*/8+16+16384,
//    /*4+*/8+16+1024+2048+16384+65536+131072,
//    2+/*4+*/8+16+16384+65536+131072
//};
//char g_numGametypes = 5;

//char g_numVolumes = 3;

//int32_t g_timerTicsPerSecond = TICRATE;

//int32_t g_actorRespawnTime = 768;
//int32_t g_itemRespawnTime = 768;
//int32_t g_rpgBlastRadius = 1780;
//int32_t g_pipebombBlastRadius = 2500;
//int32_t g_shrinkerBlastRadius = 650;
//int32_t g_tripbombBlastRadius = 3880;
//int32_t g_morterBlastRadius = 2500;
//int32_t g_bouncemineBlastRadius = 2500;
//int32_t g_seenineBlastRadius = 2048;

g_scriptSize = 1048576;

//int16_t BlimpSpawnSprites[15] =
//{
//    RPGSPRITE__STATIC,
//    CHAINGUNSPRITE__STATIC,
//    DEVISTATORAMMO__STATIC,
//    RPGAMMO__STATIC,
//    RPGAMMO__STATIC,
//    JETPACK__STATIC,
//    SHIELD__STATIC,
//    FIRSTAID__STATIC,
//    STEROIDS__STATIC,
//    RPGAMMO__STATIC,
//    RPGAMMO__STATIC,
//    RPGSPRITE__STATIC,
//    RPGAMMO__STATIC,
//    FREEZESPRITE__STATIC,
//    FREEZEAMMO__STATIC
//};

//int32_t g_playerFriction = 0xCFD0;

//int32_t g_numFreezeBounces = 3;

//int32_t g_lastSaveSlot = -1;

//char CheatKeys[2] = { sc_D, sc_N };

//char setupfilename[BMAX_PATH] = SETUPFILENAME;

/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
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

/// <reference path="../../build/source/baselayer.c.ts" />
/// <reference path="../../build/source/build.c.ts" />
/// <reference path="../../build/source/compat.c.ts" />
/// <reference path="../../build/source/crc32.c.ts" />
/// <reference path="../../build/source/engine.c.ts" />
/// <reference path="../../build/source/hightile.c.ts" />
/// <reference path="../../build/source/polymost.c.ts" />
/// <reference path="../../build/source/hightile.c.ts" />

/// <reference path="../../eduke32/headers/_functio.h.ts" />
/// <reference path="../../eduke32/headers/_rts.h.ts" />
/// <reference path="../../eduke32/headers/actors.h.ts" />
/// <reference path="../../eduke32/headers/common_game.h.ts" />
/// <reference path="../../eduke32/headers/function.h.ts" />
/// <reference path="../../eduke32/headers/game.h.ts" />
/// <reference path="../../eduke32/headers/gamedef.h.ts" />
/// <reference path="../../eduke32/headers/gameexec.h.ts" />
/// <reference path="../../eduke32/headers/global.h.ts" />
/// <reference path="../../eduke32/headers/grpscan.h.ts" />
/// <reference path="../../eduke32/headers/player.h.ts" />
/// <reference path="../../eduke32/headers/quotes.h.ts" />

/// <reference path="../../eduke32/source/actors.c.ts" />
/// <reference path="../../eduke32/source/astub.c.ts" />
/// <reference path="../../eduke32/source/common.c.ts" />
/// <reference path="../../eduke32/source/config.c.ts" />
/// <reference path="../../eduke32/source/game.c.ts" />
/// <reference path="../../eduke32/source/gamedef.c.ts" />
/// <reference path="../../eduke32/source/gameexec.c.ts" />
/// <reference path="../../eduke32/source/gamevars.c.ts" />
/// <reference path="../../eduke32/source/glbuild.c.ts" />
/// <reference path="../../eduke32/source/global.c.ts" />
/// <reference path="../../eduke32/source/grpscan.c.ts" />
/// <reference path="../../eduke32/source/menus.c.ts" />
/// <reference path="../../eduke32/source/namesdyn.c.ts" />
/// <reference path="../../eduke32/source/net.c.ts" />
/// <reference path="../../eduke32/source/osd.c.ts" />
/// <reference path="../../eduke32/source/osdcmds.c.ts" />
/// <reference path="../../eduke32/source/player.c.ts" />
/// <reference path="../../eduke32/source/premap.c.ts" />
/// <reference path="../../eduke32/source/rts.c.ts" />
/// <reference path="../../eduke32/source/sector.c.ts" />
/// <reference path="../../eduke32/source/osdfuncs.c.ts" />
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

//#ifndef __actors_inline_c__
//#define __actors_inline_c__

//#include "compat.h"
//#include "build.h"
//#include "global.h"
//#include "duke3d.h"
//#include "actors_inline.h"

function A_SetSprite(/*int32_t*/ i: number,/*uint32_t*/ cliptype: number): number
{
    var davect = new vec3_t((sprite[i].xvel*(sintable[(sprite[i].ang+512)&2047]))>>14,
                     (sprite[i].xvel*(sintable[sprite[i].ang&2047]))>>14,
                     sprite[i].zvel
                    );
    return (A_MoveSprite(i,davect,cliptype)==0)?1:0;
}


//EXTERN_INLINE void G_UpdateInterpolations(void)  //Stick at beginning of G_DoMoveThings
//{
//    int32_t i=g_numInterpolations-1;
//    for (; i>=0; i--) oldipos[i] = *curipos[i];
//}


function G_RestoreInterpolations(): void//Stick at end of drawscreen
{
    var /*int32_t */i=g_numInterpolations-1;

    if (--g_interpolationLock)
        return;

    for (; i>=0; i--) curipos[i] = bakipos[i];//*curipos[i] = bakipos[i];
}

function G_CheckForSpaceCeiling(/*int32_t*/ sectnum: number): number
{
    return ((sector[sectnum].ceilingstat&1) && sector[sectnum].ceilingpal == 0 &&
            (sector[sectnum].ceilingpicnum==MOONSKY1 || sector[sectnum].ceilingpicnum==BIGORBIT1)) ? 1 : 0;
}

function G_CheckForSpaceFloor(/*int32_t*/ sectnum: number): number
{
    return ((sector[sectnum].floorstat&1) && sector[sectnum].ceilingpal == 0 &&
            (sector[sectnum].floorpicnum==MOONSKY1 || sector[sectnum].floorpicnum==BIGORBIT1)) ? 1 : 0;
}

function A_CheckEnemySprite(s: spritetype): number
{
    return A_CheckEnemyTile(s.picnum);
}

//#endif

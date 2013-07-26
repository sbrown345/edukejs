/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/todo.ts" />
/// <reference path="../../utils/types.ts" />

/// <reference path="../../build/headers/build.h.ts" />
/// <reference path="../../build/headers/cache1d.h.ts" />
/// <reference path="../../build/headers/compat.h.ts" />
/// <reference path="../../build/headers/duke3d.h.ts" />
/// <reference path="../../build/headers/engine_priv.h.ts" />
/// <reference path="../../build/headers/hightile.h.ts" />
/// <reference path="../../build/headers/mdsprite.h.ts" />
/// <reference path="../../build/headers/pragmas.h.ts" />

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
/// <reference path="../../eduke32/headers/function.h.ts" />
/// <reference path="../../eduke32/headers/game.h.ts" />
/// <reference path="../../eduke32/headers/gamedef.h.ts" />
/// <reference path="../../eduke32/headers/gameexec.h.ts" />
/// <reference path="../../eduke32/headers/global.h.ts" />
/// <reference path="../../eduke32/headers/grpscan.h.ts" />
/// <reference path="../../eduke32/headers/player.h.ts" />
/// <reference path="../../eduke32/headers/quotes.h.ts" />

/// <reference path="../../eduke32/source/astub.c.ts" />
/// <reference path="../../eduke32/source/baselayer.c.ts" />
/// <reference path="../../eduke32/source/common.c.ts" />
/// <reference path="../../eduke32/source/config.c.ts" />
/// <reference path="../../eduke32/source/game.c.ts" />
/// <reference path="../../eduke32/source/gamedef.c.ts" />
/// <reference path="../../eduke32/source/gamevars.c.ts" />
/// <reference path="../../eduke32/source/global.c.ts" />
/// <reference path="../../eduke32/source/grpscan.c.ts" />
/// <reference path="../../eduke32/source/namesdyn.c.ts" />
/// <reference path="../../eduke32/source/net.c.ts" />
/// <reference path="../../eduke32/source/osd.c.ts" />
/// <reference path="../../eduke32/source/player.c.ts" />
/// <reference path="../../eduke32/source/rts.c.ts" />
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

//#include "duke3d.h"
//#include "build.h"
//#include "namesdyn.h"
//#include "osdfuncs.h"
//#include "premap.h"

//int32_t osdhightile = 0;

//static int32_t GAME_isspace(int32_t ch)
//{
//    return (ch==32 || ch==9);
//}

//static int32_t GAME_getchartile(int32_t ch)
//{
//    int32_t ac = ch-'!'+STARTALPHANUM;
//    if (ac < STARTALPHANUM || ac > ENDALPHANUM)
//        ac = -1;
//    return ac;
//}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} ch // was char
 * @param {number} shade
 * @param {number} pal
 * @return {undefined}
 */
function GAME_drawosdchar(/*int32_t*/ x: number, /*int32_t*/ y: number, /*char*/ ch: number, /*int32_t*/ shade: number,/*int32_t*/ pal : number)
{
    assert.originalArgs("GAME_drawosdchar", arguments, "int32_t x, int32_t y, char ch, int32_t shade, int32_t pal");
    assert.originalArgsFromFunction(arguments, GAME_drawosdchar);
    todoThrow();
//    int16_t ac;
//#ifndef USE_OPENGL
//    int32_t usehightile = 0;
//#endif
//    int32_t ht = usehightile;

//    if (GAME_isspace(ch)) return;
//    if ((ac = GAME_getchartile(ch)) == -1)
//        return;

//    usehightile = (osdhightile && ht);
//    rotatesprite_fs((9*x)<<16, (y<<3)<<16, 65536, 0, ac, shade, pal, 8|16);
//    usehightile = ht;
}

/**
 * @param {number} x
 * @param {number} y
 * @param {string} ch
 * @param {number} shade
 * @param {number} pal
 * @return {undefined}
 */
function GAME_drawosdstr(/*int32_t*/x: number, /*int32_t*/y: number, /*char*/ch: number, /*int32_t*/len: number, /*int32_t*/shade: number, /*int32_t*/pal : number)
{
    assert.argumentsAre.int32([x,y,len, shade, pal]);
    assert.char(ch);
    todoThrow();
//    int16_t ac;
//    const char *const ptr = OSD_GetTextPtr();
//    const char *const fmt = OSD_GetFmtPtr();
//    const int32_t use_format = (ch > ptr && ch < (ptr + TEXTSIZE));
//#ifdef USE_OPENGL
//    const int32_t ht = usehightile;
//    usehightile = (osdhightile && ht);
//#endif

//    x *= 9;

//    do
//    {
//        if (!GAME_isspace(*ch))
//            if ((ac = GAME_getchartile(*ch)) >= 0)
//            {
//                // use the format byte if the text falls within the bounds of the console buffer
//                const int32_t tshade = use_format ? (fmt[ch-ptr]&~0x1F)>>4 : shade;
//                const int32_t tpal = use_format ? fmt[ch-ptr]&~0xE0 : pal;

//                rotatesprite_fs(x<<16, (y<<3)<<16, 65536, 0, ac, tshade, tpal, 8|16);
//            }

//        x += OSDCHAR_WIDTH+1;
//        ch++;
//    }
//    while (--len);

//#ifdef USE_OPENGL
//    usehightile = ht;
//#endif
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} type
 * @param {number} lastkeypress
 * @return {undefined}
 */
function GAME_drawosdcursor(/*int32_t*/x: number, /*int32_t*/y: number, /*int32_t*/type: number, /*int32_t*/lastkeypress : number) 
{
    assert.argumentsAre.int32(arguments);
    todoThrow();
    //int16_t ac;

    //if (type) ac = SMALLFNTCURSOR;
    //else ac = '_'-'!'+STARTALPHANUM;

    //if (((GetTime()-lastkeypress) & 0x40)==0)
    //    rotatesprite_fs((9*x)<<16, ((y<<3)+(type?-1:2))<<16, 65536, 0, ac, 0, 8, 8|16);
}

/**
 * @param {number} w
 * @return {number}
 */
function GAME_getcolumnwidth(/*int32_t*/w : number)
{
    assert.argumentsAre.int32(arguments);
    return int32(w/9);
}

/**
 * @param {number} w
 * @return {number}
 */
function GAME_getrowheight(/*int32_t*/w : number)
{
    assert.argumentsAre.int32(arguments);
    return int32(w>>3);
}

/**
 * @param {number} shown
 * @return {undefined}
 */
function GAME_onshowosd(/*int32_t*/shown : number)
{
    assert.argumentsAre.int32(arguments);
    todoThrow();
//    G_UpdateScreenArea();

//    UNREFERENCED_PARAMETER(shown);
//    // XXX: it's weird to fake a keypress like this.
////    if (numplayers == 1 && ((shown && !ud.pause_on) || (!shown && ud.pause_on)))
////        KB_KeyDown[sc_Pause] = 1;
}

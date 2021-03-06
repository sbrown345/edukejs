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
/// <reference path="../../build/source/polymost.c.ts" />
/// <reference path="../../build/source/hightile.c.ts" />

/// <reference path="../../eduke32/headers/_functio.h.ts" />
/// <reference path="../../eduke32/headers/_rts.h.ts" />
/// <reference path="../../eduke32/headers/actors.h.ts" />
/// <reference path="../../eduke32/headers/common_game.h.ts" />
/// <reference path="../../eduke32/headers/duke3d.h.ts" />
/// <reference path="../../eduke32/headers/function.h.ts" />
/// <reference path="../../eduke32/headers/gameexec.h.ts" />
/// <reference path="../../eduke32/headers/global.h.ts" />
/// <reference path="../../eduke32/headers/grpscan.h.ts" />
/// <reference path="../../eduke32/headers/game.h.ts" />
/// <reference path="../../eduke32/headers/gamedef.h.ts" />
/// <reference path="../../eduke32/headers/player.h.ts" />
/// <reference path="../../eduke32/headers/quotes.h.ts" />

/// <reference path="../../eduke32/source/actors.c.ts" />
/// <reference path="../../eduke32/source/astub.c.ts" />
/// <reference path="../../eduke32/source/common.c.ts" />
/// <reference path="../../eduke32/source/game.c.ts" />
/// <reference path="../../eduke32/source/gamedef.c.ts" />
/// <reference path="../../eduke32/source/gameexec.c.ts" />
/// <reference path="../../eduke32/source/gamevars.c.ts" />
/// <reference path="../../eduke32/source/glbuild.c.ts" />
/// <reference path="../../eduke32/source/global.c.ts" />
/// <reference path="../../eduke32/source/grpscan.c.ts" />
/// <reference path="../../eduke32/source/input.c.ts" />
/// <reference path="../../eduke32/source/input.c.ts" />
/// <reference path="../../eduke32/source/menus.c.ts" />
/// <reference path="../../eduke32/source/namesdyn.c.ts" />
/// <reference path="../../eduke32/source/net.c.ts" />
/// <reference path="../../eduke32/source/osd.c.ts" />
/// <reference path="../../eduke32/source/osdcmds.c.ts" />
/// <reference path="../../eduke32/source/player.c.ts" />
/// <reference path="../../eduke32/source/premap.c.ts" />
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

//#include "duke3d.h"
//#include "sector.h"
//#include "gamedef.h"
//#include "gameexec.h"
//#include "premap.h"
//#include "osd.h"
//#include "common_game.h"
//#include "input.h"

//sector_inline
function /*int32_t */G_CheckPlayerInSector(/*int32_t */sect:number):number
{
    var/*int32_t */i:number;
    for (i = 0; i != -1; i = connectpoint2[i])
        if (unsigned(g_player[i].ps.i) < MAXSPRITES && sprite[g_player[i].ps.i].sectnum == sect)
            return i;
    return -1;
}

// PRIMITIVE

var /*int32_t */g_haltSoundHack = 0;

// this function activates a sector's MUSICANDSFX sprite
function /*int32_t */A_CallSound(/*int32_t */sn: number,/*int32_t */whatsprite: number):number
{
    var /*int32_t */i: number;

    if (g_haltSoundHack)
    {
        g_haltSoundHack = 0;
        return -1;
    }
    todo("A_CallSound");
    //for (SPRITES_OF_SECT(sn, i))
    //{
    //    if (sprite[i].picnum == MUSICANDSFX && (unsigned)sprite[i].lotag < 1000)  // XXX: in other places, 999
    //    {
    //        if (whatsprite == -1) whatsprite = i;

    //        if (actor[i].t_data[0] == 0)
    //        {
    //            if ((g_sounds[sprite[i].lotag].m&16) == 0)
    //            {
    //                if (sprite[i].lotag)
    //                {
    //                    A_PlaySound(sprite[i].lotag,whatsprite);
    //                    if (sprite[i].hitag && sprite[i].lotag != sprite[i].hitag && sprite[i].hitag < MAXSOUNDS)
    //                        S_StopEnvSound(sprite[i].hitag,actor[i].t_data[5]);
    //                    actor[i].t_data[5] = whatsprite;
    //                }

    //                if ((sector[sprite[i].sectnum].lotag&0xff) != ST_22_SPLITTING_DOOR)
    //                    actor[i].t_data[0] = 1;
    //            }
    //        }
    //        else if (sprite[i].hitag < MAXSOUNDS)
    //        {
    //            if (sprite[i].hitag) A_PlaySound(sprite[i].hitag,whatsprite);
    //            if ((g_sounds[sprite[i].lotag].m&1) || (sprite[i].hitag && sprite[i].hitag != sprite[i].lotag))
    //                S_StopEnvSound(sprite[i].lotag,actor[i].t_data[5]);
    //            actor[i].t_data[5] = whatsprite;
    //            actor[i].t_data[0] = 0;
    //        }
    //        return sprite[i].lotag;
    //    }
    //}
    return -1;
}

function/*int32_t */G_CheckActivatorMotion(/*int32_t */lotag:number):number
{
    var/*int32_t */i = headspritestat[STAT_ACTIVATOR], j:number;
    var s:spritetype;

    while (i >= 0)
    {
        if (sprite[i].lotag == lotag)
        {
            s = sprite[i];

            for (j = g_animateCount-1; j >= 0; j--)
                if (s.sectnum == animatesect[j])
                    return(1);

            j = headspritestat[STAT_EFFECTOR];
            while (j >= 0)
            {
                if (s.sectnum == sprite[j].sectnum)
                    switch (sprite[j].lotag)
                    {
                    case SE_11_SWINGING_DOOR:
                    case SE_30_TWO_WAY_TRAIN:
                        if (actor[j].t_data[4])
                            return(1);
                        break;
                    case SE_20_STRETCH_BRIDGE:
                    case SE_31_FLOOR_RISE_FALL:
                    case SE_32_CEILING_RISE_FALL:
                    case SE_18_INCREMENTAL_SECTOR_RISE_FALL:
                        if (actor[j].t_data[0])
                            return(1);
                        break;
                    }

                j = nextspritestat[j];
            }
        }
        i = nextspritestat[i];
    }
    return(0);
}

function /*int32_t */CheckDoorTile(/*int32_t */dapic:number):number
{
    switch (DYNAMICTILEMAP(dapic))
    {
    case DOORTILE1__STATIC:
    case DOORTILE2__STATIC:
    case DOORTILE3__STATIC:
    case DOORTILE4__STATIC:
    case DOORTILE5__STATIC:
    case DOORTILE6__STATIC:
    case DOORTILE7__STATIC:
    case DOORTILE8__STATIC:
    case DOORTILE9__STATIC:
    case DOORTILE10__STATIC:
    case DOORTILE11__STATIC:
    case DOORTILE12__STATIC:
    case DOORTILE14__STATIC:
    case DOORTILE15__STATIC:
    case DOORTILE16__STATIC:
    case DOORTILE17__STATIC:
    case DOORTILE18__STATIC:
    case DOORTILE19__STATIC:
    case DOORTILE20__STATIC:
    case DOORTILE21__STATIC:
    case DOORTILE22__STATIC:
    case DOORTILE23__STATIC:
        return 1;
    }
    return 0;
}

function/*int32_t */isanunderoperator(/*int32_t */lotag:number):number
{
    switch (lotag&0xff)
    {
    case ST_15_WARP_ELEVATOR:
    case ST_16_PLATFORM_DOWN:
    case ST_17_PLATFORM_UP:
    case ST_18_ELEVATOR_DOWN:
    case ST_19_ELEVATOR_UP:
    case ST_22_SPLITTING_DOOR:
    case ST_26_SPLITTING_ST_DOOR:
        return 1;
    }
    return 0;
}

function /*int32_t */isanearoperator(/*int32_t */lotag:number):number
{
    switch (lotag&0xff)
    {
    case ST_9_SLIDING_ST_DOOR:
    case ST_15_WARP_ELEVATOR:
    case ST_16_PLATFORM_DOWN:
    case ST_17_PLATFORM_UP:
    case ST_18_ELEVATOR_DOWN:
    case ST_19_ELEVATOR_UP:
    case ST_20_CEILING_DOOR:
    case ST_21_FLOOR_DOOR:
    case ST_22_SPLITTING_DOOR:
    case ST_23_SWINGING_DOOR:
    case ST_25_SLIDING_DOOR:
    case ST_26_SPLITTING_ST_DOOR:
    case ST_29_TEETH_DOOR://Toothed door
        return 1;
    }
    return 0;
}

function A_FP_ManhattanDist(ps: DukePlayer_t, s: spritetype ): number
{
    return klabs(ps.opos.x-s.x)
        + klabs(ps.opos.y-s.y)
        + ((klabs(ps.opos.z-s.z+(28<<8)))>>4);
}

function A_FindPlayer(/*const spritetype **/s: spritetype, d: R<number>): number
{
    if (!g_netServer && ud.multimode < 2)
    {
        var myps = g_player[myconnectindex].ps;

        if (d)
            d.$ = A_FP_ManhattanDist(myps, s);
        return myconnectindex;
    }

    {
        var j: number;
        var closest_player=0, closest=INT32_MAX;
        
        for (j = 0; j != -1; j = connectpoint2[j])
        {
            var ps = g_player[j].ps;
            var x = A_FP_ManhattanDist(ps, s);

            if (x < closest && sprite[ps.i].extra > 0)
            {
                closest_player = j;
                closest = x;
            }
        }

        if (d)
            d.$ = closest;
        return closest_player;
    }
}
var G_DoSectorAnimations_count = 0;
function G_DoSectorAnimations():void
{
    var /*int32_t */i:number, j:number, a:number, p:number, v:number, dasect:number;
    
    dlog(DEBUG_ANIMATIONS,  "G_DoSectorAnimations %i\n", G_DoSectorAnimations_count++);
    for (i=g_animateCount-1; i>=0; i--)
    {
        a = animateptr[i].getValue();
        v = animatevel[i]*TICSPERFRAME;
        dasect = animatesect[i];

        dlog(DEBUG_ANIMATIONS,  "a: %i, v: %i\n", a, v);
        if (a == animategoal[i])
        {
            G_StopInterpolation(animateptr[i]);

            // This fixes a bug where wall or floor sprites contained in
            // elevator sectors (ST 16-19) would jitter vertically after the
            // elevator had stopped.
            if (animateptr[i].equals(new AnimatePtr(sector, animatesect[i], "floorz")))
                for (j=headspritesect[dasect]; j>=0; j=nextspritesect[j])
                    if (sprite[j].statnum != STAT_EFFECTOR) 
                    {
                        actor[j].bpos.z = sprite[j].z;
                        dlog(DEBUG_ANIMATIONS,  "actor[j].bpos.z: %i\n", actor[j].bpos.z);
                    }

            g_animateCount--;
            dlog(DEBUG_ANIMATIONS,  "g_animateCount %i\n", g_animateCount);
            animateptr[i] = animateptr[g_animateCount];
            animategoal[i] = animategoal[g_animateCount];
            animatevel[i] = animatevel[g_animateCount];
            animatesect[i] = animatesect[g_animateCount];
            if (sector[animatesect[i]].lotag == ST_18_ELEVATOR_DOWN || sector[animatesect[i]].lotag == ST_19_ELEVATOR_UP)
                if (animateptr[i].getValue() == sector[animatesect[i]].ceilingz) 
                {
                    dlog(DEBUG_ANIMATIONS,  "continue\n", i);
                    continue;
                }

            if ((sector[dasect].lotag&0xff) != ST_22_SPLITTING_DOOR)
                A_CallSound(dasect,-1);

            continue;
        }

        if (v > 0)
        {
            a = min(a+v,animategoal[i]);
        }
        else
        {
            a = max(a+v,animategoal[i]);
        }
        dlog(DEBUG_ANIMATIONS,  "a: %i\n", a);

        if (animateptr[i].equals(new AnimatePtr(sector, animatesect[i], "floorz"/* sector[animatesect[i]].floorz)*/)))
        {
            dlog(DEBUG_ANIMATIONS,  "animateptr[i] == sector[animatesect[i]].floorz, i: %i\n", i);
            for (p = 0; p != -1; p = connectpoint2[p])
                if (g_player[p].ps.cursectnum == dasect)
                    if ((sector[dasect].floorz-g_player[p].ps.pos.z) < (64<<8))
                        if (sprite[g_player[p].ps.i].owner >= 0)
                        {
                            g_player[p].ps.pos.z += v;
                            g_player[p].ps.vel.z = 0;
                            if (p == myconnectindex)
                            {
                                dlog(DEBUG_ANIMATIONS,  "my.z: %i\n", i);
                                my.z += v;
                                myvel.z = 0;
                            }
                        }

            for (j=headspritesect[dasect]; j>=0; j=nextspritesect[j])
                if (sprite[j].statnum != STAT_EFFECTOR)
                {
                    dlog(DEBUG_ANIMATIONS,  "b4 j: %i, actor[j].bpos.z: %i, sprite[j].z: %i, actor[j].floorz: %i\n", j, actor[j].bpos.z, sprite[j].z, actor[j].floorz);
                    actor[j].bpos.z = sprite[j].z;
                    sprite[j].z += v;
                    actor[j].floorz = sector[dasect].floorz+v;
                    dlog(DEBUG_ANIMATIONS,  "j: %i, actor[j].bpos.z: %i, sprite[j].z: %i, actor[j].floorz: %i\n", j, actor[j].bpos.z, sprite[j].z, actor[j].floorz);
                }
        }

        animateptr[i].setValue(a);
    }
}

class AnimatePtr {
    obj: any;
    array: any[];
    idx: number;
    key: string;

    constructor(array: any[], idx: number, key: string) {
        this.obj = array[idx]; // another ref to test  - maybe do this instead of the array/idx
        this.array = array;
        this.idx = idx;
        this.key = key;
    }

    getValue():number {
        if (this.obj != this.array[this.idx]) debugger
        return this.array[this.idx][this.key];
    }

    setValue(v:number):void {
        if (this.obj != this.array[this.idx]) debugger
        this.array[this.idx][this.key] = v;
    }

    equals(ptr: AnimatePtr):number {
        return (ptr.obj == this.obj && ptr.key == this.key)?1:0;
    }
}

function /*int32_t */GetAnimationGoal(/*const int32_t **/animptr: AnimatePtr):number
{
    var /*int32_t */i = g_animateCount-1;

    for (; i>=0; i--)
        if (animptr.equals(animateptr[i]))
            return i;
    return -1;
}

function /*int32_t */SetAnimation(/*int32_t */animsect:number,/*int32_t **/animptr: AnimatePtr, /*int32_t */thegoal:number, /*int32_t */thevel:number):number
{
    var /*int32_t */i = 0, j = g_animateCount;

    if (g_animateCount >= MAXANIMATES)
        return(-1);

    for (; i<g_animateCount; i++)
        if (animptr.equals(animateptr[i]))
        {
            j = i;
            break;
        }

    animatesect[j] = animsect;
    animateptr[j] = animptr;
    animategoal[j] = thegoal;
    animatevel[j] = (thegoal >= animptr.getValue()) ? thevel : -thevel;

    if (j == g_animateCount) g_animateCount++;

    G_SetInterpolation(animptr);

    return(j);
}

function G_AnimateCamSprite(): void
{
    var /*int32_t */i = camsprite;

//#ifdef DEBUG_VALGRIND_NO_SMC
//    return;
//#endif
    if (camsprite < 0)
        return;

    todo("G_AnimateCamSprite");
//    if (actor[i].t_data[0] >= 4)
//    {
//        actor[i].t_data[0] = 0;

//        if (g_player[screenpeek].ps.newowner >= 0)
//            sprite[i].owner = g_player[screenpeek].ps.newowner;
//        else if (sprite[i].owner >= 0 && dist(&sprite[g_player[screenpeek].ps.i],&sprite[i]) < 8192)
//        {
//            if (waloff[TILE_VIEWSCR] == 0)
//                allocatepermanenttile(TILE_VIEWSCR,tilesizx[sprite[i].picnum],tilesizy[sprite[i].picnum]);
//            else walock[TILE_VIEWSCR] = 255;
//            G_SetupCamTile(sprite[i].owner, TILE_VIEWSCR);
////#ifdef POLYMER
//            // HACK: force texture update on viewscreen sprite in Polymer!
//            if (getrendermode() == REND_POLYMER)  
//                sprite[i].filler ^= (1<<1);
////#endif
//        }
//    }
//    else actor[i].t_data[0]++;
}

function G_AnimateWalls():void
{
    var /*int32_t */i:number, j:number, p = g_numAnimWalls-1, t:number;

    for (; p>=0; p--)
        //    for(p=g_numAnimWalls-1;p>=0;p--)
    {
        i = animwall[p].wallnum;
        j = wall[i].picnum;

        switch (DYNAMICTILEMAP(j))
        {
        case SCREENBREAK1__STATIC:
        case SCREENBREAK2__STATIC:
        case SCREENBREAK3__STATIC:
        case SCREENBREAK4__STATIC:
        case SCREENBREAK5__STATIC:

        case SCREENBREAK9__STATIC:
        case SCREENBREAK10__STATIC:
        case SCREENBREAK11__STATIC:
        case SCREENBREAK12__STATIC:
        case SCREENBREAK13__STATIC:
        case SCREENBREAK14__STATIC:
        case SCREENBREAK15__STATIC:
        case SCREENBREAK16__STATIC:
        case SCREENBREAK17__STATIC:
        case SCREENBREAK18__STATIC:
        case SCREENBREAK19__STATIC:

            if ((krand()&255) < 16)
            {
                animwall[p].tag = wall[i].picnum;
                wall[i].picnum = SCREENBREAK6;
            }

            continue;

        case SCREENBREAK6__STATIC:
        case SCREENBREAK7__STATIC:
        case SCREENBREAK8__STATIC:

            if (animwall[p].tag >= 0 && wall[i].extra != FEMPIC2 && wall[i].extra != FEMPIC3)
                wall[i].picnum = animwall[p].tag;
            else
            {
                wall[i].picnum++;
                if (wall[i].picnum == (SCREENBREAK6+3))
                    wall[i].picnum = SCREENBREAK6;
            }
            continue;

        }

        if (wall[i].cstat&16)
            if (wall[i].overpicnum >= W_FORCEFIELD && wall[i].overpicnum <= W_FORCEFIELD+2)
            {
                t = animwall[p].tag;

                if (wall[i].cstat&254)
                {
                    wall[i].xpanning -= t>>10; // sintable[(t+512)&2047]>>12;
                    wall[i].ypanning -= t>>10; // sintable[t&2047]>>12;

                    if (wall[i].extra == 1)
                    {
                        wall[i].extra = 0;
                        animwall[p].tag = 0;
                    }
                    else
                        animwall[p].tag+=128;

                    if (animwall[p].tag < (128<<4))
                    {
                        if (animwall[p].tag&128)
                            wall[i].overpicnum = W_FORCEFIELD;
                        else wall[i].overpicnum = W_FORCEFIELD+1;
                    }
                    else
                    {
                        if ((krand()&255) < 32)
                            animwall[p].tag = 128<<(krand()&3);
                        else wall[i].overpicnum = W_FORCEFIELD+1;
                    }
                }

            }
    }
}

function /*int32_t */G_ActivateWarpElevators(/*int32_t */s:number,/*int32_t */d:number):number //Parm = sectoreffectornum
{
    var /*int32_t */i = headspritestat[STAT_EFFECTOR], sn = sprite[s].sectnum;

    while (i >= 0)
    {
        if (sprite[i].lotag == SE_17_WARP_ELEVATOR && sprite[i].hitag == sprite[s].hitag)
            if ((klabs(sector[sn].floorz-actor[s].t_data[2]) > sprite[i].yvel) ||
                (sector[sprite[i].sectnum].hitag == (sector[sn].hitag-d)))
                break;
        i = nextspritestat[i];
    }

    if (i == -1)
        return 1; // No find
    else
        A_PlaySound(d ? ELEVATOR_ON : ELEVATOR_OFF, s);

    i = headspritestat[STAT_EFFECTOR];
    do
    {
        if (sprite[i].lotag == SE_17_WARP_ELEVATOR && sprite[i].hitag == sprite[s].hitag)
            actor[i].t_data[0] = actor[i].t_data[1] = d; //Make all check warp
        i = nextspritestat[i];
    }
    while (i >= 0);

    return 0;
}

function G_OperateSectors(/*int32_t */sn:number, /*int32_t */ii:number):void 
{
    var /*int32_t */j=0, l:number, q:number, startwall:number, endwall:number;
    var /*int32_t */i:number;
    var sptr = sector[sn];

    switch (sptr.lotag&(0xffff-49152))
    {

    case ST_30_ROTATE_RISE_BRIDGE:
        j = sector[sn].hitag;
        if (actor[j].tempang == 0 || actor[j].tempang == 256)
            A_CallSound(sn,ii);
        if (sprite[j].extra == 1)
            sprite[j].extra = 3;
        else sprite[j].extra = 1;
        break;

    case ST_31_TWO_WAY_TRAIN:

        j = sector[sn].hitag;
        if (actor[j].t_data[4] == 0)
            actor[j].t_data[4] = 1;

        A_CallSound(sn,ii);
        break;

    case ST_26_SPLITTING_ST_DOOR: //The split doors
        if (GetAnimationGoal(/*&sptr->ceilingz*/ new AnimatePtr(sector, sn, "ceilingz")) == -1) //if the door has stopped
        {
            g_haltSoundHack = 1;
            sptr.lotag &= 0xff00;
            sptr.lotag |= ST_22_SPLITTING_DOOR;
            G_OperateSectors(sn,ii);
            sptr.lotag &= 0xff00;
            sptr.lotag |= ST_9_SLIDING_ST_DOOR;
            G_OperateSectors(sn,ii);
            sptr.lotag &= 0xff00;
            sptr.lotag |= ST_26_SPLITTING_ST_DOOR;
        }
        return;

    case ST_9_SLIDING_ST_DOOR:
    {
        var /*int32_t */dax:number,day:number,dax2:number,day2:number,sp:number;
        var /*int32_t */wallfind = new Int32Array(2);

        startwall = sptr.wallptr;
        endwall = startwall+sptr.wallnum-1;

        sp = sptr.extra>>4;

        //first find center point by averaging all points
        dax = 0, day = 0;
        for (i=startwall; i<=endwall; i++)
        {
            dax += wall[i].x;
            day += wall[i].y;
        }
        dax = int32(dax / (endwall-startwall+1));
        day = int32(day / (endwall-startwall+1));

        //find any points with either same x or same y coordinate
        //  as center (dax, day) - should be 2 points found.
        wallfind[0] = -1;
        wallfind[1] = -1;
        for (i=startwall; i<=endwall; i++)
            if ((wall[i].x == dax) || (wall[i].y == day))
            {
                if (wallfind[0] == -1)
                    wallfind[0] = i;
                else wallfind[1] = i;
            }

        for (j=0; j<2; j++)
        {todoThrow();
            //if ((wall[wallfind[j]].x == dax) && (wall[wallfind[j]].y == day))
            //{
            //    //find what direction door should open by averaging the
            //    //  2 neighboring points of wallfind[0] & wallfind[1].
            //    i = wallfind[j]-1;
            //    if (i < startwall) i = endwall;
            //    dax2 = ((wall[i].x+wall[wall[wallfind[j]].point2].x)>>1)-wall[wallfind[j]].x;
            //    day2 = ((wall[i].y+wall[wall[wallfind[j]].point2].y)>>1)-wall[wallfind[j]].y;
            //    if (dax2 != 0)
            //    {
            //        dax2 = wall[wall[wall[wallfind[j]].point2].point2].x;
            //        dax2 -= wall[wall[wallfind[j]].point2].x;
            //        SetAnimation(sn,&wall[wallfind[j]].x,wall[wallfind[j]].x+dax2,sp);
            //        SetAnimation(sn,&wall[i].x,wall[i].x+dax2,sp);
            //        SetAnimation(sn,&wall[wall[wallfind[j]].point2].x,wall[wall[wallfind[j]].point2].x+dax2,sp);
            //        A_CallSound(sn,ii);
            //    }
            //    else if (day2 != 0)
            //    {
            //        day2 = wall[wall[wall[wallfind[j]].point2].point2].y;
            //        day2 -= wall[wall[wallfind[j]].point2].y;
            //        SetAnimation(sn,&wall[wallfind[j]].y,wall[wallfind[j]].y+day2,sp);
            //        SetAnimation(sn,&wall[i].y,wall[i].y+day2,sp);
            //        SetAnimation(sn,&wall[wall[wallfind[j]].point2].y,wall[wall[wallfind[j]].point2].y+day2,sp);
            //        A_CallSound(sn,ii);
            //    }
            //}
            //else
            //{
            //    i = wallfind[j]-1;
            //    if (i < startwall) i = endwall;
            //    dax2 = ((wall[i].x+wall[wall[wallfind[j]].point2].x)>>1)-wall[wallfind[j]].x;
            //    day2 = ((wall[i].y+wall[wall[wallfind[j]].point2].y)>>1)-wall[wallfind[j]].y;
            //    if (dax2 != 0)
            //    {
            //        SetAnimation(sn,&wall[wallfind[j]].x,dax,sp);
            //        SetAnimation(sn,&wall[i].x,dax+dax2,sp);
            //        SetAnimation(sn,&wall[wall[wallfind[j]].point2].x,dax+dax2,sp);
            //        A_CallSound(sn,ii);
            //    }
            //    else if (day2 != 0)
            //    {
            //        SetAnimation(sn,&wall[wallfind[j]].y,day,sp);
            //        SetAnimation(sn,&wall[i].y,day+day2,sp);
            //        SetAnimation(sn,&wall[wall[wallfind[j]].point2].y,day+day2,sp);
            //        A_CallSound(sn,ii);
            //    }
            //}
        }

    }
    return;

    case ST_15_WARP_ELEVATOR://Warping elevators

        if (sprite[ii].picnum != APLAYER) return;
        //            if(ps[sprite[ii].yvel].select_dir == 1) return;

        i = headspritesect[sn];
        while (i >= 0)
        {
            if (sprite[i].picnum==SECTOREFFECTOR && sprite[i].lotag == SE_17_WARP_ELEVATOR) break;
            i = nextspritesect[i];
        }

        if (sprite[ii].sectnum == sn)
        {
            if (G_ActivateWarpElevators(i,-1))
                G_ActivateWarpElevators(i,1);
            else if (G_ActivateWarpElevators(i,1))
                G_ActivateWarpElevators(i,-1);
            return;
        }
        else
        {
            if (sptr.floorz > sprite[i].z)
                G_ActivateWarpElevators(i,-1);
            else
                G_ActivateWarpElevators(i,1);
        }

        return;

    case ST_16_PLATFORM_DOWN:
    case ST_17_PLATFORM_UP:

        i = GetAnimationGoal(new AnimatePtr(sector, sn, "floorz"));

        if (i == -1)
        {
            i = nextsectorneighborz(sn,sptr.floorz,1,1);
            if (i == -1)
            {
                i = nextsectorneighborz(sn,sptr.floorz,1,-1);
                if (i == -1) return;
                j = sector[i].floorz;
                SetAnimation(sn,new AnimatePtr(sector, sn, "floorz"),j,sptr.extra);
            }
            else
            {
                j = sector[i].floorz;
                SetAnimation(sn,new AnimatePtr(sector, sn, "floorz"),j,sptr.extra);
            }
            A_CallSound(sn,ii);
        }

        return;

    case ST_18_ELEVATOR_DOWN:
    case ST_19_ELEVATOR_UP:

        i = GetAnimationGoal(new AnimatePtr(sector, sn, "floorz"));

        if (i==-1)
        {
            i = nextsectorneighborz(sn,sptr.floorz,1,-1);
            if (i==-1) i = nextsectorneighborz(sn,sptr.floorz,1,1);
            if (i==-1) return;
            j = sector[i].floorz;
            q = sptr.extra;
            l = sptr.ceilingz-sptr.floorz;
            SetAnimation(sn,new AnimatePtr(sector, sn, "floorz"),j,q);
            SetAnimation(sn,new AnimatePtr(sector, sn, "ceilingz"),j+l,q);
            A_CallSound(sn,ii);
        }
        return;

    case ST_29_TEETH_DOOR:

        i = headspritestat[STAT_EFFECTOR]; //Effectors
        while (i >= 0)
        {
            if ((sprite[i].lotag == SE_22_TEETH_DOOR) &&
                    (sprite[i].hitag == sptr.hitag))
            {
                sector[sprite[i].sectnum].extra = -sector[sprite[i].sectnum].extra;

                actor[i].t_data[0] = sn;
                actor[i].t_data[1] = 1;
            }
            i = nextspritestat[i];
        }

        A_CallSound(sn, ii);

        sptr.lotag ^= 0x8000;

        if (sptr.lotag&0x8000)
        {
            j = nextsectorneighborz(sn,sptr.ceilingz,-1,-1);
            if (j == -1) j = nextsectorneighborz(sn,sptr.ceilingz,1,1);
            if (j == -1)
            {
                OSD_Printf("WARNING: ST29: null sector!\n");
                return;
            }
            j = sector[j].ceilingz;
        }
        else
        {
            j = nextsectorneighborz(sn,sptr.ceilingz,1,1);
            if (j == -1) j = nextsectorneighborz(sn,sptr.ceilingz,-1,-1);
            if (j == -1)
            {
                OSD_Printf("WARNING: ST29: null sector!\n");
                return;
            }
            j = sector[j].floorz;
        }

        SetAnimation(sn,new AnimatePtr(sector, sn, "ceilingz"),j,sptr.extra);

        return;

    case ST_20_CEILING_DOOR:

REDODOOR:
while(true) {
        if (sptr.lotag&0x8000)
        {
            i = headspritesect[sn];
            while (i >= 0)
            {
                if (sprite[i].statnum == STAT_EFFECTOR && sprite[i].lotag==SE_9_DOWN_OPEN_DOOR_LIGHTS)
                {
                    j = sprite[i].z;
                    break;
                }
                i = nextspritesect[i];
            }
            if (i==-1)
                j = sptr.floorz;
        }
        else
        {
            j = nextsectorneighborz(sn,sptr.ceilingz,-1,-1);

            if (j >= 0) j = sector[j].ceilingz;
            else
            {
                sptr.lotag |= 32768;
                continue REDODOOR;
            }
        }
break;/*REDODOOR*/}
        sptr.lotag ^= 0x8000;

        SetAnimation(sn,new AnimatePtr(sector, sn, "ceilingz"),j,sptr.extra);
        A_CallSound(sn,ii);

        return;

    case ST_21_FLOOR_DOOR:
        i = GetAnimationGoal(new AnimatePtr(sector, sn, "floorz"));
        if (i >= 0)
        {
            if (animategoal[sn] == sptr.ceilingz)
                animategoal[i] = sector[nextsectorneighborz(sn,sptr.ceilingz,1,1)].floorz;
            else animategoal[i] = sptr.ceilingz;
            j = animategoal[i];
        }
        else
        {
            if (sptr.ceilingz == sptr.floorz)
                j = sector[nextsectorneighborz(sn,sptr.ceilingz,1,1)].floorz;
            else j = sptr.ceilingz;

            sptr.lotag ^= 0x8000;

            if (SetAnimation(sn,new AnimatePtr(sector, sn, "floorz"),j,sptr.extra) >= 0)
                A_CallSound(sn,ii);
        }
        return;

    case ST_22_SPLITTING_DOOR:

        // REDODOOR22:

        if ((sptr.lotag&0x8000))
        {
            q = (sptr.ceilingz+sptr.floorz)>>1;
            j = SetAnimation(sn,new AnimatePtr(sector, sn, "floorz"),q,sptr.extra);
            j = SetAnimation(sn,new AnimatePtr(sector, sn, "ceilingz"),q,sptr.extra);
        }
        else
        {
            var /*int32_t*/ fneigh=nextsectorneighborz(sn,sptr.floorz,1,1);
            var /*int32_t*/ cneigh=nextsectorneighborz(sn,sptr.ceilingz,-1,-1);

            if (fneigh>=0 && cneigh>=0)
            {
                j = SetAnimation(sn, new AnimatePtr(sector, sn, "floorz"), sector[fneigh].floorz, sptr.extra);
                j = SetAnimation(sn, new AnimatePtr(sector, sn, "ceilingz"), sector[cneigh].ceilingz, sptr.extra);
            }
            else
            {
                OSD_Printf("WARNING: ST22: null sector: floor neighbor=%d, ceiling neighbor=%d!\n",
                           fneigh, cneigh);
                sptr.lotag ^= 0x8000;
            }
        }

        sptr.lotag ^= 0x8000;

        A_CallSound(sn,ii);

        return;

    case ST_23_SWINGING_DOOR: //Swingdoor

        j = -1;
        q = 0;

        i = headspritestat[STAT_EFFECTOR];
        while (i >= 0)
        {
            if (sprite[i].lotag == SE_11_SWINGING_DOOR && sprite[i].sectnum == sn && !actor[i].t_data[4])
            {
                j = i;
                break;
            }
            i = nextspritestat[i];
        }
        if (i<0)
        {
            OSD_Printf("WARNING: SE23 i<0!\n");
            return;
        }    // JBF
        l = sector[sprite[i].sectnum].lotag&0x8000;

        if (j >= 0)
        {
            i = headspritestat[STAT_EFFECTOR];
            while (i >= 0)
            {
                if (l == (sector[sprite[i].sectnum].lotag&0x8000) && sprite[i].lotag == SE_11_SWINGING_DOOR && sprite[j].hitag == sprite[i].hitag && !actor[i].t_data[4])
                {
                    if (sector[sprite[i].sectnum].lotag&0x8000) sector[sprite[i].sectnum].lotag &= 0x7fff;
                    else sector[sprite[i].sectnum].lotag |= 0x8000;
                    actor[i].t_data[4] = 1;
                    actor[i].t_data[3] = -actor[i].t_data[3];
                    if (q == 0)
                    {
                        A_CallSound(sn,i);
                        q = 1;
                    }
                }
                i = nextspritestat[i];
            }
        }
        return;

    case ST_25_SLIDING_DOOR: //Subway type sliding doors

        j = headspritestat[STAT_EFFECTOR];
        while (j >= 0)//Find the sprite
        {
            if ((sprite[j].lotag) == SE_15_SLIDING_DOOR && sprite[j].sectnum == sn)
                break; //Found the sectoreffector.
            j = nextspritestat[j];
        }

        if (j < 0)
            return;

        i = headspritestat[STAT_EFFECTOR];
        while (i >= 0)
        {
            if (sprite[i].hitag==sprite[j].hitag)
            {
                if (sprite[i].lotag == SE_15_SLIDING_DOOR)
                {
                    sector[sprite[i].sectnum].lotag ^= 0x8000; // Toggle the open or close
                    sprite[i].ang += 1024;
                    if (actor[i].t_data[4]) A_CallSound(sprite[i].sectnum,i);
                    A_CallSound(sprite[i].sectnum,i);
                    if (sector[sprite[i].sectnum].lotag&0x8000) actor[i].t_data[4] = 1;
                    else actor[i].t_data[4] = 2;
                }
            }
            i = nextspritestat[i];
        }
        return;

    case ST_27_STRETCH_BRIDGE:  //Extended bridge

        j = headspritestat[STAT_EFFECTOR];
        while (j >= 0)
        {
            if ((sprite[j].lotag&0xff)==SE_20_STRETCH_BRIDGE && sprite[j].sectnum == sn)  //Bridge
            {

                sector[sn].lotag ^= 0x8000;
                if (sector[sn].lotag&0x8000) //OPENING
                    actor[j].t_data[0] = 1;
                else actor[j].t_data[0] = 2;
                A_CallSound(sn,ii);
                break;
            }
            j = nextspritestat[j];
        }
        return;


    case ST_28_DROP_FLOOR:
        //activate the rest of them

        j = headspritesect[sn];
        while (j >= 0)
        {
            if (sprite[j].statnum==STAT_EFFECTOR && (sprite[j].lotag&0xff)==SE_21_DROP_FLOOR)
                break; //Found it
            j = nextspritesect[j];
        }

        if (j >= 0)  // PK: The matching SE21 might have gone, see SE_21_KILLIT in actors.c
        {
            j = sprite[j].hitag;

            l = headspritestat[STAT_EFFECTOR];
            while (l >= 0)
            {
                if ((sprite[l].lotag&0xff)==SE_21_DROP_FLOOR && !actor[l].t_data[0] &&
                    (sprite[l].hitag) == j)
                    actor[l].t_data[0] = 1;
                l = nextspritestat[l];
            }

            A_CallSound(sn,ii);
        }

        return;
    }
}

function G_OperateRespawns(/*int32_t */low:number):void 
{
    var /*int32_t */j:number, nexti:number, i = headspritestat[STAT_FX];

    while (i >= 0)
    {
        nexti = nextspritestat[i];
        if ((sprite[i].lotag == low) && (sprite[i].picnum == RESPAWN))
        {
            if (A_CheckEnemyTile(sprite[i].hitag) && ud.monsters_off) break;

            j = A_Spawn(i,TRANSPORTERSTAR);
            sprite[j].z -= (32<<8);

            sprite[i].extra = 66-12;   // Just a way to killit
        }
        i = nexti;
    }
}

function G_OperateActivators(/*int32_t */low:number,/*int32_t */snum:number): void 
{
    var /*int32_t */i:number, j:number, k:number;
    var /*int16_t **/p:Int16Array;
    var wal:walltype, walIdx:number;

    for (i=g_numCyclers-1; i>=0; i--)
    {
        p = cyclers[i];

        if (p[4] == low)
        {
            p[5] = !p[5]?1:0;

            sector[p[0]].floorshade = sector[p[0]].ceilingshade = p[3];
            walIdx = sector[p[0]].wallptr;wal = wall[walIdx];
            for (j=sector[p[0]].wallnum; j > 0; j--,wal = wall[++walIdx])
                wal.shade = p[3];
        }
    }

    i = headspritestat[STAT_ACTIVATOR];
    k = -1;

    while (i >= 0)
    {
        if (sprite[i].lotag == low)
        {
            if (sprite[i].picnum == ACTIVATORLOCKED)
            {
                if (sector[sprite[i].sectnum].lotag&16384)
                    sector[sprite[i].sectnum].lotag &= ~16384;
                else
                    sector[sprite[i].sectnum].lotag |= 16384;

                if (snum >= 0 && snum < ud.multimode)
                {
                    if (sector[sprite[i].sectnum].lotag&16384)
                        P_DoQuote(QUOTE_LOCKED,g_player[snum].ps);
                    else P_DoQuote(QUOTE_UNLOCKED,g_player[snum].ps);
                }
            }
            else
            {
                switch (sprite[i].hitag)
                {
                case 0:
                    break;
                case 1:
                    if (sector[sprite[i].sectnum].floorz != sector[sprite[i].sectnum].ceilingz)
                    {
                        i = nextspritestat[i];
                        continue;
                    }
                    break;
                case 2:
                    if (sector[sprite[i].sectnum].floorz == sector[sprite[i].sectnum].ceilingz)
                    {
                        i = nextspritestat[i];
                        continue;
                    }
                    break;
                }

                // ST_2_UNDERWATER
                if (sector[sprite[i].sectnum].lotag < 3)
                {
                    j = headspritesect[sprite[i].sectnum];
                    while (j >= 0)
                    {
                        if (sprite[j].statnum == STAT_EFFECTOR) switch (sprite[j].lotag)
                            {
                            case SE_36_PROJ_SHOOTER:
                            case SE_31_FLOOR_RISE_FALL:
                            case SE_32_CEILING_RISE_FALL:
                            case SE_18_INCREMENTAL_SECTOR_RISE_FALL:
                                actor[j].t_data[0] = 1-actor[j].t_data[0];
                                A_CallSound(sprite[i].sectnum,j);
                                break;
                            }
                        j = nextspritesect[j];
                    }
                }

                if (k == -1 && (sector[sprite[i].sectnum].lotag&0xff) == ST_22_SPLITTING_DOOR)
                    k = A_CallSound(sprite[i].sectnum,i);

                G_OperateSectors(sprite[i].sectnum,i);
            }
        }
        i = nextspritestat[i];
    }

    G_OperateRespawns(low);
}

function G_OperateMasterSwitches(/*int32_t */low:number):void
{
    var/*int32_t */i = headspritestat[STAT_STANDABLE];
    while (i >= 0)
    {
        if (sprite[i].picnum == MASTERSWITCH && sprite[i].lotag == low && sprite[i].yvel == 0)
            sprite[i].yvel = 1;
        i = nextspritestat[i];
    }
}

function G_OperateForceFields(/*int32_t*/ s:number, /*int32_t */low:number):void
{
    var/*int32_t */i:number, p=g_numAnimWalls;

    for (; p>=0; p--)
    {
        i = animwall[p].wallnum;

        if (low == wall[i].lotag || low == -1)
            if (((wall[i].overpicnum >= W_FORCEFIELD) && (wall[i].overpicnum <= W_FORCEFIELD+2))
                    || (wall[i].overpicnum == BIGFORCE))
            {
                animwall[p].tag = 0;

                if (wall[i].cstat)
                {
                    wall[i].cstat   = 0;

                    if (s >= 0 && sprite[s].picnum == SECTOREFFECTOR && sprite[s].lotag == SE_30_TWO_WAY_TRAIN)
                        wall[i].lotag = 0;
                }
                else
                    wall[i].cstat = 85;
            }
    }
}

function /*int32_t */P_ActivateSwitch(/*int32_t */snum:number,/*int32_t */w:number,/*int32_t */switchissprite:number):number
{
    var/*int32_t */switchpal:number, switchpicnum:number;
    var/*int32_t */i:number, x:number, lotag:number,hitag:number,picnum:number,correctdips = 1, numdips = 0;
    var davector = new vec3_t();

    if (w < 0) return 0;

    if (switchissprite == 1) // A wall sprite
    {
        if (actor[w].lasttransport == totalclock) return 0;
        actor[w].lasttransport = totalclock;
        lotag = sprite[w].lotag;
        if (lotag == 0) return 0;
        hitag = sprite[w].hitag;

//        sx = sprite[w].x;
//        sy = sprite[w].y;
        davector.copyFrom(sprite[w]);//Bmemcpy(&davector, &sprite[w], sizeof(vec3_t));
        picnum = sprite[w].picnum;
        switchpal = sprite[w].pal;
    }
    else
    {
        lotag = wall[w].lotag;
        if (lotag == 0) return 0;
        hitag = wall[w].hitag;
        // sx = wall[w].x;
        // sy = wall[w].y;
        davector.x = wall[w].x; //Bmemcpy(&davector, &wall[w], sizeof(int32_t) * 2);
        davector.y = wall[w].y;
        davector.z = g_player[snum].ps.pos.z;
        picnum = wall[w].picnum;
        switchpal = wall[w].pal;
    }
    //     initprintf("P_ActivateSwitch called picnum=%i switchissprite=%i\n",picnum,switchissprite);
    switchpicnum = picnum;
    if ((picnum==DIPSWITCH+1)
            || (picnum==TECHSWITCH+1)
            || (picnum==ALIENSWITCH+1)
            || (picnum==DIPSWITCH2+1)
            || (picnum==DIPSWITCH3+1)
            || (picnum==PULLSWITCH+1)
            || (picnum==HANDSWITCH+1)
            || (picnum==SLOTDOOR+1)
            || (picnum==LIGHTSWITCH+1)
            || (picnum==SPACELIGHTSWITCH+1)
            || (picnum==SPACEDOORSWITCH+1)
            || (picnum==FRANKENSTINESWITCH+1)
            || (picnum==LIGHTSWITCH2+1)
            || (picnum==POWERSWITCH1+1)
            || (picnum==LOCKSWITCH1+1)
            || (picnum==POWERSWITCH2+1)
            || (picnum==LIGHTSWITCH+1)
       )
    {
        switchpicnum--;
    }
    if (picnum > MULTISWITCH && picnum <= MULTISWITCH+3)
    {
        switchpicnum = MULTISWITCH;
    }

    switch (DYNAMICTILEMAP(switchpicnum))
    {
    case DIPSWITCH__STATIC:
        //    case DIPSWITCH+1:
    case TECHSWITCH__STATIC:
        //    case TECHSWITCH+1:
    case ALIENSWITCH__STATIC:
        //    case ALIENSWITCH+1:
        break;
    case ACCESSSWITCH__STATIC:
    case ACCESSSWITCH2__STATIC:
        if (g_player[snum].ps.access_incs == 0)
        {
            if (switchpal == 0)
            {
                if ((g_player[snum].ps.got_access&1))
                    g_player[snum].ps.access_incs = 1;
                else P_DoQuote(QUOTE_NEED_BLUE_KEY,g_player[snum].ps);
            }

            else if (switchpal == 21)
            {
                if (g_player[snum].ps.got_access&2)
                    g_player[snum].ps.access_incs = 1;
                else P_DoQuote(QUOTE_NEED_RED_KEY,g_player[snum].ps);
            }

            else if (switchpal == 23)
            {
                if (g_player[snum].ps.got_access&4)
                    g_player[snum].ps.access_incs = 1;
                else P_DoQuote(QUOTE_NEED_YELLOW_KEY,g_player[snum].ps);
            }

            if (g_player[snum].ps.access_incs == 1)
            {
                if (switchissprite == 0)
                    g_player[snum].ps.access_wallnum = w;
                else
                    g_player[snum].ps.access_spritenum = w;
            }

            return 0;
        }
    case DIPSWITCH2__STATIC:
        //case DIPSWITCH2+1:
    case DIPSWITCH3__STATIC:
        //case DIPSWITCH3+1:
    case MULTISWITCH__STATIC:
        //case MULTISWITCH+1:
        //case MULTISWITCH+2:
        //case MULTISWITCH+3:
    case PULLSWITCH__STATIC:
        //case PULLSWITCH+1:
    case HANDSWITCH__STATIC:
        //case HANDSWITCH+1:
    case SLOTDOOR__STATIC:
        //case SLOTDOOR+1:
    case LIGHTSWITCH__STATIC:
        //case LIGHTSWITCH+1:
    case SPACELIGHTSWITCH__STATIC:
        //case SPACELIGHTSWITCH+1:
    case SPACEDOORSWITCH__STATIC:
        //case SPACEDOORSWITCH+1:
    case FRANKENSTINESWITCH__STATIC:
        //case FRANKENSTINESWITCH+1:
    case LIGHTSWITCH2__STATIC:
        //case LIGHTSWITCH2+1:
    case POWERSWITCH1__STATIC:
        //case POWERSWITCH1+1:
    case LOCKSWITCH1__STATIC:
        //case LOCKSWITCH1+1:
    case POWERSWITCH2__STATIC:
        //case POWERSWITCH2+1:
        if (G_CheckActivatorMotion(lotag)) return 0;
        break;
    default:
        if (CheckDoorTile(picnum) == 0) return 0;
        break;
    }

    i = headspritestat[STAT_DEFAULT];
    while (i >= 0)
    {

        if (lotag == sprite[i].lotag)
        {
            var/*int32_t */switchpicnum=sprite[i].picnum; // put it in a variable so later switches don't trigger on the result of changes
            if ((switchpicnum >= MULTISWITCH) && (switchpicnum <=MULTISWITCH+3))
            {
                sprite[i].picnum++;
                if (sprite[i].picnum > (MULTISWITCH+3))
                    sprite[i].picnum = MULTISWITCH;

            }
            switch (DYNAMICTILEMAP(switchpicnum))
            {
            case DIPSWITCH__STATIC:
            case TECHSWITCH__STATIC:
            case ALIENSWITCH__STATIC:
                if (switchissprite == 1 && w == i) sprite[i].picnum++;
                else if (sprite[i].hitag == 0) correctdips++;
                numdips++;
                break;
            case ACCESSSWITCH__STATIC:
            case ACCESSSWITCH2__STATIC:
            case SLOTDOOR__STATIC:
            case LIGHTSWITCH__STATIC:
            case SPACELIGHTSWITCH__STATIC:
            case SPACEDOORSWITCH__STATIC:
            case FRANKENSTINESWITCH__STATIC:
            case LIGHTSWITCH2__STATIC:
            case POWERSWITCH1__STATIC:
            case LOCKSWITCH1__STATIC:
            case POWERSWITCH2__STATIC:
            case HANDSWITCH__STATIC:
            case PULLSWITCH__STATIC:
            case DIPSWITCH2__STATIC:
            case DIPSWITCH3__STATIC:
                sprite[i].picnum++;
                break;
            default:
                if (switchpicnum <= 0)  // oob safety
                    break;

                switch (DYNAMICTILEMAP(switchpicnum-1))
                {
                case TECHSWITCH__STATIC:
                case DIPSWITCH__STATIC:
                case ALIENSWITCH__STATIC:
                    if (switchissprite == 1 && w == i) sprite[i].picnum--;
                    else if (sprite[i].hitag == 1) correctdips++;
                    numdips++;
                    break;
                case PULLSWITCH__STATIC:
                case HANDSWITCH__STATIC:
                case LIGHTSWITCH2__STATIC:
                case POWERSWITCH1__STATIC:
                case LOCKSWITCH1__STATIC:
                case POWERSWITCH2__STATIC:
                case SLOTDOOR__STATIC:
                case LIGHTSWITCH__STATIC:
                case SPACELIGHTSWITCH__STATIC:
                case SPACEDOORSWITCH__STATIC:
                case FRANKENSTINESWITCH__STATIC:
                case DIPSWITCH2__STATIC:
                case DIPSWITCH3__STATIC:
                    sprite[i].picnum--;
                    break;
                }
                break;
            }
        }
        i = nextspritestat[i];
    }

    for (i=numwalls-1; i>=0; i--)
    {
        x = i;
        if (lotag == wall[x].lotag)
        {
            if ((wall[x].picnum >= MULTISWITCH) && (wall[x].picnum <=MULTISWITCH+3))
            {
                wall[x].picnum++;
                if (wall[x].picnum > (MULTISWITCH+3))
                    wall[x].picnum = MULTISWITCH;

            }

            switch (DYNAMICTILEMAP(wall[x].picnum))
            {
            case DIPSWITCH__STATIC:
            case TECHSWITCH__STATIC:
            case ALIENSWITCH__STATIC:
                if (switchissprite == 0 && i == w) wall[x].picnum++;
                else if (wall[x].hitag == 0) correctdips++;
                numdips++;
                break;
            case ACCESSSWITCH__STATIC:
            case ACCESSSWITCH2__STATIC:
            case SLOTDOOR__STATIC:
            case LIGHTSWITCH__STATIC:
            case SPACELIGHTSWITCH__STATIC:
            case SPACEDOORSWITCH__STATIC:
            case FRANKENSTINESWITCH__STATIC:
            case LIGHTSWITCH2__STATIC:
            case POWERSWITCH1__STATIC:
            case LOCKSWITCH1__STATIC:
            case POWERSWITCH2__STATIC:
            case HANDSWITCH__STATIC:
            case PULLSWITCH__STATIC:
            case DIPSWITCH2__STATIC:
            case DIPSWITCH3__STATIC:
                wall[x].picnum++;
                break;
            default:
                if (wall[x].picnum <= 0)  // oob safety
                    break;

                switch (DYNAMICTILEMAP(wall[x].picnum-1))
                {
                case TECHSWITCH__STATIC:
                case DIPSWITCH__STATIC:
                case ALIENSWITCH__STATIC:
                    if (switchissprite == 0 && i == w) wall[x].picnum--;
                    else if (wall[x].hitag == 1) correctdips++;
                    numdips++;
                    break;
                case PULLSWITCH__STATIC:
                case HANDSWITCH__STATIC:
                case LIGHTSWITCH2__STATIC:
                case POWERSWITCH1__STATIC:
                case LOCKSWITCH1__STATIC:
                case POWERSWITCH2__STATIC:
                case SLOTDOOR__STATIC:
                case LIGHTSWITCH__STATIC:
                case SPACELIGHTSWITCH__STATIC:
                case SPACEDOORSWITCH__STATIC:
                case FRANKENSTINESWITCH__STATIC:
                case DIPSWITCH2__STATIC:
                case DIPSWITCH3__STATIC:
                    wall[x].picnum--;
                    break;
                }
                break;
            }
        }
    }

    if (lotag == 65535)
    {

        g_player[myconnectindex].ps.gm = MODE_EOL;
        if (ud.from_bonus)
        {
            ud.level_number = ud.from_bonus;
            ud.m_level_number = ud.level_number;
            ud.from_bonus = 0;
        }
        else
        {
            ud.level_number++;
            if (ud.level_number > MAXLEVELS-1)
                ud.level_number = 0;
            ud.m_level_number = ud.level_number;
        }
        return 1;

    }

    switchpicnum = picnum;

    if ((picnum==DIPSWITCH+1)
            || (picnum==TECHSWITCH+1)
            || (picnum==ALIENSWITCH+1)
            || (picnum==DIPSWITCH2+1)
            || (picnum==DIPSWITCH3+1)
            || (picnum==PULLSWITCH+1)
            || (picnum==HANDSWITCH+1)
            || (picnum==SLOTDOOR+1)
            || (picnum==LIGHTSWITCH+1)
            || (picnum==SPACELIGHTSWITCH+1)
            || (picnum==SPACEDOORSWITCH+1)
            || (picnum==FRANKENSTINESWITCH+1)
            || (picnum==LIGHTSWITCH2+1)
            || (picnum==POWERSWITCH1+1)
            || (picnum==LOCKSWITCH1+1)
            || (picnum==POWERSWITCH2+1)
            || (picnum==LIGHTSWITCH+1)
       )
    {
        switchpicnum--;
    }
    if (picnum > MULTISWITCH && picnum <= MULTISWITCH+3)
    {
        switchpicnum = MULTISWITCH;
    }

    switch (DYNAMICTILEMAP(switchpicnum))
    {
    default:
        if (CheckDoorTile(picnum) == 0) break;
    case DIPSWITCH__STATIC:
        //case DIPSWITCH+1:
    case TECHSWITCH__STATIC:
        //case TECHSWITCH+1:
    case ALIENSWITCH__STATIC:
        //case ALIENSWITCH+1:
        if (picnum == DIPSWITCH  || picnum == DIPSWITCH+1 ||
                picnum == ALIENSWITCH || picnum == ALIENSWITCH+1 ||
                picnum == TECHSWITCH || picnum == TECHSWITCH+1)
        {
            if (picnum == ALIENSWITCH || picnum == ALIENSWITCH+1)
            {
                if (switchissprite == 1)
                    S_PlaySound3D(ALIEN_SWITCH1, w, davector);
                else S_PlaySound3D(ALIEN_SWITCH1,g_player[snum].ps.i,davector);
            }
            else
            {
                if (switchissprite == 1)
                    S_PlaySound3D(SWITCH_ON, w, davector);
                else S_PlaySound3D(SWITCH_ON,g_player[snum].ps.i,davector);
            }
            if (numdips != correctdips) break;
            S_PlaySound3D(END_OF_LEVEL_WARN,g_player[snum].ps.i,davector);
        }
    case DIPSWITCH2__STATIC:
        //case DIPSWITCH2+1:
    case DIPSWITCH3__STATIC:
        //case DIPSWITCH3+1:
    case MULTISWITCH__STATIC:
        //case MULTISWITCH+1:
        //case MULTISWITCH+2:
        //case MULTISWITCH+3:
    case ACCESSSWITCH__STATIC:
    case ACCESSSWITCH2__STATIC:
    case SLOTDOOR__STATIC:
        //case SLOTDOOR+1:
    case LIGHTSWITCH__STATIC:
        //case LIGHTSWITCH+1:
    case SPACELIGHTSWITCH__STATIC:
        //case SPACELIGHTSWITCH+1:
    case SPACEDOORSWITCH__STATIC:
        //case SPACEDOORSWITCH+1:
    case FRANKENSTINESWITCH__STATIC:
        //case FRANKENSTINESWITCH+1:
    case LIGHTSWITCH2__STATIC:
        //case LIGHTSWITCH2+1:
    case POWERSWITCH1__STATIC:
        //case POWERSWITCH1+1:
    case LOCKSWITCH1__STATIC:
        //case LOCKSWITCH1+1:
    case POWERSWITCH2__STATIC:
        //case POWERSWITCH2+1:
    case HANDSWITCH__STATIC:
        //case HANDSWITCH+1:
    case PULLSWITCH__STATIC:
        //case PULLSWITCH+1:

        if (picnum == MULTISWITCH || picnum == (MULTISWITCH+1) ||
                picnum == (MULTISWITCH+2) || picnum == (MULTISWITCH+3))
            lotag += picnum-MULTISWITCH;

        x = headspritestat[STAT_EFFECTOR];
        while (x >= 0)
        {
            if (((sprite[x].hitag) == lotag))
            {
                switch (sprite[x].lotag)
                {
                case SE_12_LIGHT_SWITCH:
                    sector[sprite[x].sectnum].floorpal = 0;
                    actor[x].t_data[0]++;
                    if (actor[x].t_data[0] == 2)
                        actor[x].t_data[0]++;

                    break;
                case SE_24_CONVEYOR:
                case SE_34:
                case SE_25_PISTON:
                    actor[x].t_data[4] = !actor[x].t_data[4]?1:0;
                    if (actor[x].t_data[4])
                        P_DoQuote(QUOTE_DEACTIVATED,g_player[snum].ps);
                    else P_DoQuote(QUOTE_ACTIVATED,g_player[snum].ps);
                    break;
                case SE_21_DROP_FLOOR:
                    P_DoQuote(QUOTE_ACTIVATED,g_player[screenpeek].ps);
                    break;
                }
            }
            x = nextspritestat[x];
        }

        G_OperateActivators(lotag,snum);
        G_OperateForceFields(g_player[snum].ps.i,lotag);
        G_OperateMasterSwitches(lotag);

        if (picnum == DIPSWITCH || picnum == DIPSWITCH+1 ||
                picnum == ALIENSWITCH || picnum == ALIENSWITCH+1 ||
                picnum == TECHSWITCH || picnum == TECHSWITCH+1) return 1;

        if (hitag == 0 && CheckDoorTile(picnum) == 0)
        {
            if (switchissprite == 1)
                S_PlaySound3D(SWITCH_ON,w,davector);
            else S_PlaySound3D(SWITCH_ON,g_player[snum].ps.i,davector);
        }
        else if (hitag != 0)
        {
            if (switchissprite == 1 && (g_sounds[hitag].m&4) == 0)
                S_PlaySound3D(hitag,w,davector);
            else A_PlaySound(hitag,g_player[snum].ps.i);
        }

        return 1;
    }
    return 0;
}

function G_ActivateBySector(/*int32_t*/ sect:number,/*int32_t */j:number): void 
{
    var/*int32_t */i = headspritesect[sect];
    var /*int32_t */didit = 0;

    while (i >= 0)
    {
        if (sprite[i].picnum == ACTIVATOR)
        {
            G_OperateActivators(sprite[i].lotag,-1);
            didit = 1;
            //            return;
        }
        i = nextspritesect[i];
    }

    if (didit == 0)
        G_OperateSectors(sect,j);
}

function BreakWall(/*int32_t*/ newpn:number,/*int32_t */spr:number,/*int32_t */dawallnum:number): void
{
    wall[dawallnum].picnum = newpn;
    A_PlaySound(VENT_BUST,spr);
    A_PlaySound(GLASS_HEAVYBREAK,spr);
    A_SpawnWallGlass(spr,dawallnum,10);
}

function A_DamageWall(/*int32_t */spr:number,/*int32_t */dawallnum:number,/*const vec3_t **/pos:vec3_t,/*int32_t */atwith:number): void
{
    var /*int16_t */sn = -1;
    var /*int32_t */j:number, i:number, darkestwall:number;
    var walIdx = dawallnum, wal = wall[walIdx];

    if (wal.overpicnum == MIRROR && wal.pal != 4 && A_CheckSpriteTileFlags(atwith,SPRITE_PROJECTILE) && (SpriteProjectile[spr].workslike & PROJECTILE_RPG))
    {
        if (wal.nextwall == -1 || wall[wal.nextwall].pal != 4)
        {
            A_SpawnWallGlass(spr,dawallnum,70);
            wal.cstat &= ~16;
            wal.overpicnum = MIRRORBROKE;
            A_PlaySound(GLASS_HEAVYBREAK,spr);
            return;
        }
    }

    if (wal.overpicnum == MIRROR && wal.pal != 4)
    {
        switch (DYNAMICTILEMAP(atwith))
        {
        case HEAVYHBOMB__STATIC:
        case RADIUSEXPLOSION__STATIC:
        case RPG__STATIC:
        case HYDRENT__STATIC:
        case SEENINE__STATIC:
        case OOZFILTER__STATIC:
        case EXPLODINGBARREL__STATIC:
            if (wal.nextwall == -1 || wall[wal.nextwall].pal != 4)
            {
                A_SpawnWallGlass(spr,dawallnum,70);
                wal.cstat &= ~16;
                wal.overpicnum = MIRRORBROKE;
                A_PlaySound(GLASS_HEAVYBREAK,spr);
                return;
            }
        }
    }

    if (((wal.cstat&16) || wal.overpicnum == BIGFORCE) && wal.nextsector >= 0)
        if (sector[wal.nextsector].floorz > pos.z)
            if (sector[wal.nextsector].floorz-sector[wal.nextsector].ceilingz)
            {
                var /*int32_t */switchpicnum = wal.overpicnum;
                if (switchpicnum > W_FORCEFIELD && switchpicnum <= W_FORCEFIELD+2)
                    switchpicnum = W_FORCEFIELD;
                switch (DYNAMICTILEMAP(switchpicnum))
                {
                case W_FORCEFIELD__STATIC:
                    //case W_FORCEFIELD+1:
                    //case W_FORCEFIELD+2:
                    wal.extra = 1; // tell the forces to animate
                case BIGFORCE__STATIC:
                    var $sn = new R(sn);
                    updatesector(pos.x,pos.y,$sn);
                    sn = $sn.$;
                    if (sn < 0) return;

                    if (atwith == -1)
                        i = A_InsertSprite(sn,pos.x,pos.y,pos.z,FORCERIPPLE,-127,8,8,0,0,0,spr,5);
                    else
                    {
                        if (atwith == CHAINGUN)
                            i = A_InsertSprite(sn,pos.x,pos.y,pos.z,FORCERIPPLE,-127,16+sprite[spr].xrepeat,16+sprite[spr].yrepeat,0,0,0,spr,5);
                        else i = A_InsertSprite(sn,pos.x,pos.y,pos.z,FORCERIPPLE,-127,32,32,0,0,0,spr,5);
                    }

                    sprite[i].cstat |= 18+128;
                    sprite[i].ang = getangle(wal.x-wall[wal.point2].x,
                                  wal.y-wall[wal.point2].y)-512;

                    A_PlaySound(SOMETHINGHITFORCE,i);

                    return;

                case FANSPRITE__STATIC:
                    wal.overpicnum = FANSPRITEBROKE;
                    wal.cstat &= 65535-65;
                    if (wal.nextwall >= 0)
                    {
                        wall[wal.nextwall].overpicnum = FANSPRITEBROKE;
                        wall[wal.nextwall].cstat &= 65535-65;
                    }
                    A_PlaySound(VENT_BUST,spr);
                    A_PlaySound(GLASS_BREAKING,spr);
                    return;

                case GLASS__STATIC:
                    var $sn = new R(sn);
                    updatesector(pos.x,pos.y,$sn);
                    sn = $sn.$;
                    if (sn < 0) return;
                    wal.overpicnum=GLASS2;
                    A_SpawnWallGlass(spr,dawallnum,10);
                    wal.cstat = 0;

                    if (wal.nextwall >= 0)
                        wall[wal.nextwall].cstat = 0;

                    i = A_InsertSprite(sn,pos.x,pos.y,pos.z,SECTOREFFECTOR,0,0,0,g_player[0].ps.ang,0,0,spr,3);
                    sprite[i].lotag = 128;
                    actor[i].t_data[1] = 5;
                    actor[i].t_data[2] = dawallnum;
                    A_PlaySound(GLASS_BREAKING,i);
                    return;
                case STAINGLASS1__STATIC:
                    var $sn = new R(sn);
                    updatesector(pos.x,pos.y,$sn);
                    sn = $sn.$;
                    if (sn < 0) return;
                    A_SpawnRandomGlass(spr,dawallnum,80);
                    wal.cstat = 0;
                    if (wal.nextwall >= 0)
                        wall[wal.nextwall].cstat = 0;
                    A_PlaySound(VENT_BUST,spr);
                    A_PlaySound(GLASS_BREAKING,spr);
                    return;
                }
            }

    switch (DYNAMICTILEMAP(wal.picnum))
    {
    case COLAMACHINE__STATIC:
    case VENDMACHINE__STATIC:
        BreakWall(wal.picnum+2,spr,dawallnum);
        A_PlaySound(VENT_BUST,spr);
        return;

    case OJ__STATIC:
    case FEMPIC2__STATIC:
    case FEMPIC3__STATIC:

    case SCREENBREAK6__STATIC:
    case SCREENBREAK7__STATIC:
    case SCREENBREAK8__STATIC:

    case SCREENBREAK1__STATIC:
    case SCREENBREAK2__STATIC:
    case SCREENBREAK3__STATIC:
    case SCREENBREAK4__STATIC:
    case SCREENBREAK5__STATIC:

    case SCREENBREAK9__STATIC:
    case SCREENBREAK10__STATIC:
    case SCREENBREAK11__STATIC:
    case SCREENBREAK12__STATIC:
    case SCREENBREAK13__STATIC:
    case SCREENBREAK14__STATIC:
    case SCREENBREAK15__STATIC:
    case SCREENBREAK16__STATIC:
    case SCREENBREAK17__STATIC:
    case SCREENBREAK18__STATIC:
    case SCREENBREAK19__STATIC:
    case BORNTOBEWILDSCREEN__STATIC:

        A_SpawnWallGlass(spr,dawallnum,30);
        wal.picnum=W_SCREENBREAK+(krand()%3);
        A_PlaySound(GLASS_HEAVYBREAK,spr);
        return;

    case W_TECHWALL5__STATIC:
    case W_TECHWALL6__STATIC:
    case W_TECHWALL7__STATIC:
    case W_TECHWALL8__STATIC:
    case W_TECHWALL9__STATIC:
        BreakWall(wal.picnum+1,spr,dawallnum);
        return;
    case W_MILKSHELF__STATIC:
        BreakWall(W_MILKSHELFBROKE,spr,dawallnum);
        return;

    case W_TECHWALL10__STATIC:
        BreakWall(W_HITTECHWALL10,spr,dawallnum);
        return;

    case W_TECHWALL1__STATIC:
    case W_TECHWALL11__STATIC:
    case W_TECHWALL12__STATIC:
    case W_TECHWALL13__STATIC:
    case W_TECHWALL14__STATIC:
        BreakWall(W_HITTECHWALL1,spr,dawallnum);
        return;

    case W_TECHWALL15__STATIC:
        BreakWall(W_HITTECHWALL15,spr,dawallnum);
        return;

    case W_TECHWALL16__STATIC:
        BreakWall(W_HITTECHWALL16,spr,dawallnum);
        return;

    case W_TECHWALL2__STATIC:
        BreakWall(W_HITTECHWALL2,spr,dawallnum);
        return;

    case W_TECHWALL3__STATIC:
        BreakWall(W_HITTECHWALL3,spr,dawallnum);
        return;

    case W_TECHWALL4__STATIC:
        BreakWall(W_HITTECHWALL4,spr,dawallnum);
        return;

    case ATM__STATIC:
        wal.picnum = ATMBROKE;
        A_SpawnMultiple(spr, MONEY, 1+(krand()&7));
        A_PlaySound(GLASS_HEAVYBREAK,spr);
        break;

    case WALLLIGHT1__STATIC:
    case WALLLIGHT2__STATIC:
    case WALLLIGHT3__STATIC:
    case WALLLIGHT4__STATIC:
    case TECHLIGHT2__STATIC:
    case TECHLIGHT4__STATIC:

        if (rnd(128))
            A_PlaySound(GLASS_HEAVYBREAK,spr);
        else A_PlaySound(GLASS_BREAKING,spr);
        A_SpawnWallGlass(spr,dawallnum,30);

        if (wal.picnum == WALLLIGHT1)
            wal.picnum = WALLLIGHTBUST1;

        if (wal.picnum == WALLLIGHT2)
            wal.picnum = WALLLIGHTBUST2;

        if (wal.picnum == WALLLIGHT3)
            wal.picnum = WALLLIGHTBUST3;

        if (wal.picnum == WALLLIGHT4)
            wal.picnum = WALLLIGHTBUST4;

        if (wal.picnum == TECHLIGHT2)
            wal.picnum = TECHLIGHTBUST2;

        if (wal.picnum == TECHLIGHT4)
            wal.picnum = TECHLIGHTBUST4;

        if (!wal.lotag) return;

        sn = wal.nextsector;
        if (sn < 0) return;
        darkestwall = 0;

        walIdx = sector[sn].wallptr; wal = wall[walIdx];
        for (i=sector[sn].wallnum; i > 0; i--,wal=wall[++walIdx])
            if (wal.shade > darkestwall)
                darkestwall=wal.shade;

        j = krand()&1;
        i= headspritestat[STAT_EFFECTOR];
        while (i >= 0)
        {
            if (sprite[i].hitag == wall[dawallnum].lotag && sprite[i].lotag == SE_3_RANDOM_LIGHTS_AFTER_SHOT_OUT)
            {
                actor[i].t_data[2] = j;
                actor[i].t_data[3] = darkestwall;
                actor[i].t_data[4] = 1;
            }
            i = nextspritestat[i];
        }
        break;
    }
}

function /*int32_t */Sect_DamageCeiling(/*int32_t */sn:number):number
{
    var/*int32_t */i:number, j:number;

    switch (DYNAMICTILEMAP(sector[sn].ceilingpicnum))
    {
    case WALLLIGHT1__STATIC:
    case WALLLIGHT2__STATIC:
    case WALLLIGHT3__STATIC:
    case WALLLIGHT4__STATIC:
    case TECHLIGHT2__STATIC:
    case TECHLIGHT4__STATIC:

        A_SpawnCeilingGlass(g_player[myconnectindex].ps.i,sn,10);
        A_PlaySound(GLASS_BREAKING,g_player[screenpeek].ps.i);

        if (sector[sn].ceilingpicnum == WALLLIGHT1)
            sector[sn].ceilingpicnum = WALLLIGHTBUST1;

        if (sector[sn].ceilingpicnum == WALLLIGHT2)
            sector[sn].ceilingpicnum = WALLLIGHTBUST2;

        if (sector[sn].ceilingpicnum == WALLLIGHT3)
            sector[sn].ceilingpicnum = WALLLIGHTBUST3;

        if (sector[sn].ceilingpicnum == WALLLIGHT4)
            sector[sn].ceilingpicnum = WALLLIGHTBUST4;

        if (sector[sn].ceilingpicnum == TECHLIGHT2)
            sector[sn].ceilingpicnum = TECHLIGHTBUST2;

        if (sector[sn].ceilingpicnum == TECHLIGHT4)
            sector[sn].ceilingpicnum = TECHLIGHTBUST4;


        if (!sector[sn].hitag)
        {
            i = headspritesect[sn];
            while (i >= 0)
            {
                if (sprite[i].picnum == SECTOREFFECTOR && sprite[i].lotag == SE_12_LIGHT_SWITCH)
                {
                    j = headspritestat[STAT_EFFECTOR];
                    while (j >= 0)
                    {
                        if (sprite[j].hitag == sprite[i].hitag)
                            actor[j].t_data[3] = 1;
                        j = nextspritestat[j];
                    }
                    break;
                }
                i = nextspritesect[i];
            }
        }

        i = headspritestat[STAT_EFFECTOR];
        j = krand()&1;
        while (i >= 0)
        {
            if (sprite[i].hitag == (sector[sn].hitag) && sprite[i].lotag == SE_3_RANDOM_LIGHTS_AFTER_SHOT_OUT)
            {
                actor[i].t_data[2] = j;
                actor[i].t_data[4] = 1;
            }
            i = nextspritestat[i];
        }

        return 1;
    }

    return 0;
}

// hard coded props... :(
function A_DamageObject(/*int32_t */i:number,/*int32_t */sn:number):void
{
    var /*int16_t */j:number;
    var /*int32_t */k:number, rpg=0;
    var s:spritetype;

    if (g_netClient)
    {
        return;
    }
	dlog(DEBUG_DAMAGE, "A_DamageObject i: %i, sn: %i\n", i, sn);
//    int32_t switchpicnum = sprite[i].picnum;

    i &= (MAXSPRITES-1);

    if (A_CheckSpriteFlags(sn,SPRITE_PROJECTILE))
        if (SpriteProjectile[sn].workslike & PROJECTILE_RPG)
            rpg = 1;
/*
    switchpicnum = sprite[i].picnum;
    if (sprite[i].picnum > WATERFOUNTAIN && sprite[i].picnum < WATERFOUNTAIN+3)
    {
        switchpicnum = WATERFOUNTAIN;
    }
*/
    switch (DYNAMICTILEMAP(sprite[i].picnum))
    {
    case OCEANSPRITE1__STATIC:
    case OCEANSPRITE2__STATIC:
    case OCEANSPRITE3__STATIC:
    case OCEANSPRITE4__STATIC:
    case OCEANSPRITE5__STATIC:
        A_Spawn(i,SMALLSMOKE);
        A_DeleteSprite(i);
        break;
    case QUEBALL__STATIC:
    case STRIPEBALL__STATIC:
        if (sprite[sn].picnum == QUEBALL || sprite[sn].picnum == STRIPEBALL)
        {
            sprite[sn].xvel = (sprite[i].xvel>>1)+(sprite[i].xvel>>2);
            sprite[sn].ang -= (sprite[i].ang<<1)+1024;
            sprite[i].ang = getangle(sprite[i].x-sprite[sn].x,sprite[i].y-sprite[sn].y)-512;
            if (S_CheckSoundPlaying(i,POOLBALLHIT) < 2)
                A_PlaySound(POOLBALLHIT,i);
        }
        else
        {
            if (krand()&3)
            {
                sprite[i].xvel = 164;
                sprite[i].ang = sprite[sn].ang;
            }
            else
            {
                A_SpawnWallGlass(i,-1,3);
                A_DeleteSprite(i);
            }
        }
        break;
    case TREE1__STATIC:
    case TREE2__STATIC:
    case TIRE__STATIC:
    case CONE__STATIC:
    case BOX__STATIC:
    {
        if (rpg == 1)
            if (actor[i].t_data[0] == 0)
            {
                sprite[i].cstat &= ~257;
                actor[i].t_data[0] = 1;
                A_Spawn(i,BURNING);
            }
        switch (DYNAMICTILEMAP(sprite[sn].picnum))
        {
        case RADIUSEXPLOSION__STATIC:
        case RPG__STATIC:
        case FIRELASER__STATIC:
        case HYDRENT__STATIC:
        case HEAVYHBOMB__STATIC:
            if (actor[i].t_data[0] == 0)
            {
                sprite[i].cstat &= ~257;
                actor[i].t_data[0] = 1;
                A_Spawn(i,BURNING);
            }
            break;
        }
        break;
    }
    case CACTUS__STATIC:
    {
        if (rpg == 1)
            for (k=64; k>0; k--)
            {
                var krands = getKrands(5);
                j = A_InsertSprite(sprite[i].sectnum,sprite[i].x,sprite[i].y,sprite[i].z-(krands.pop()%(48<<8)),SCRAP3+(krands.pop()&3),-8,48,48,krands.pop()&2047,(krands.pop()&63)+64,-(krands.pop()&4095)-(sprite[i].zvel>>2),i,5);
                sprite[j].pal = 8;
            }
        //        case CACTUSBROKE:
        switch (DYNAMICTILEMAP(sprite[sn].picnum))
        {
        case RADIUSEXPLOSION__STATIC:
        case RPG__STATIC:
        case FIRELASER__STATIC:
        case HYDRENT__STATIC:
        case HEAVYHBOMB__STATIC:
            for (k=64; k>0; k--)
            {
                var krands = getKrands(5);
                j = A_InsertSprite(sprite[i].sectnum,sprite[i].x,sprite[i].y,sprite[i].z-(krands.pop()%(48<<8)),SCRAP3+(krands.pop()&3),-8,48,48,krands.pop()&2047,(krands.pop()&63)+64,-(krands.pop()&4095)-(sprite[i].zvel>>2),i,5);
                sprite[j].pal = 8;
            }

            if (sprite[i].picnum == CACTUS)
                sprite[i].picnum = CACTUSBROKE;
            sprite[i].cstat &= ~257;
            //       else A_DeleteSprite(i);
            break;
        }
        break;
    }
    case HANGLIGHT__STATIC:
    case GENERICPOLE2__STATIC:
        for (k=6; k>0; k--) {
           var krands = getKrands(4);
            A_InsertSprite(sprite[i].sectnum,sprite[i].x,sprite[i].y,sprite[i].z-(8<<8),SCRAP1+(krands.pop()&15),-8,48,48,krands.pop()&2047,(krands.pop()&63)+64,-(krands.pop()&4095)-(sprite[i].zvel>>2),i,5);
        }
        A_PlaySound(GLASS_HEAVYBREAK,i);
        A_DeleteSprite(i);
        break;


    case FANSPRITE__STATIC:
        sprite[i].picnum = FANSPRITEBROKE;
        sprite[i].cstat &= (65535-257);
        if (sector[sprite[i].sectnum].floorpicnum == FANSHADOW)
            sector[sprite[i].sectnum].floorpicnum = FANSHADOWBROKE;

        A_PlaySound(GLASS_HEAVYBREAK,i);
        s = sprite[i];
        for (j=16; j>0; j--) RANDOMSCRAP(s, i);

        break;
    case WATERFOUNTAIN__STATIC:
        //    case WATERFOUNTAIN+1:
        //    case WATERFOUNTAIN+2:
        //    case __STATIC:
        sprite[i].picnum = WATERFOUNTAINBROKE;
        A_Spawn(i,TOILETWATER);
        break;
    case SATELITE__STATIC:
    case FUELPOD__STATIC:
    case SOLARPANNEL__STATIC:
    case ANTENNA__STATIC:
        if (sprite[sn].extra != G_InitialActorStrength(SHOTSPARK1))
        {
            for (j=15; j>0; j--) {
                var krands = getKrands(4);
                A_InsertSprite(sprite[i].sectnum,sprite[i].x,sprite[i].y,sector[sprite[i].sectnum].floorz-(12<<8)-(j<<9),SCRAP1+(krands.pop()&15),-8,64,64,
                               krands.pop()&2047,(krands.pop()&127)+64,-(krands.pop()&511)-256,i,5);
            }
            A_Spawn(i,EXPLOSION2);
            A_DeleteSprite(i);
        }
        break;
    case BOTTLE1__STATIC:
    case BOTTLE2__STATIC:
    case BOTTLE3__STATIC:
    case BOTTLE4__STATIC:
    case BOTTLE5__STATIC:
    case BOTTLE6__STATIC:
    case BOTTLE8__STATIC:
    case BOTTLE10__STATIC:
    case BOTTLE11__STATIC:
    case BOTTLE12__STATIC:
    case BOTTLE13__STATIC:
    case BOTTLE14__STATIC:
    case BOTTLE15__STATIC:
    case BOTTLE16__STATIC:
    case BOTTLE17__STATIC:
    case BOTTLE18__STATIC:
    case BOTTLE19__STATIC:
    case WATERFOUNTAINBROKE__STATIC:
    case DOMELITE__STATIC:
    case SUSHIPLATE1__STATIC:
    case SUSHIPLATE2__STATIC:
    case SUSHIPLATE3__STATIC:
    case SUSHIPLATE4__STATIC:
    case SUSHIPLATE5__STATIC:
    case WAITTOBESEATED__STATIC:
    case VASE__STATIC:
    case STATUEFLASH__STATIC:
    case STATUE__STATIC:
        if (sprite[i].picnum == BOTTLE10)
            A_SpawnMultiple(i, MONEY, 4+(krand()&3));
        else if (sprite[i].picnum == STATUE || sprite[i].picnum == STATUEFLASH)
        {
            A_SpawnRandomGlass(i,-1,40);
            A_PlaySound(GLASS_HEAVYBREAK,i);
        }
        else if (sprite[i].picnum == VASE)
            A_SpawnWallGlass(i,-1,40);

        A_PlaySound(GLASS_BREAKING,i);
        sprite[i].ang = krand()&2047;
        A_SpawnWallGlass(i,-1,8);
        A_DeleteSprite(i);
        break;
    case FETUS__STATIC:
        sprite[i].picnum = FETUSBROKE;
        A_PlaySound(GLASS_BREAKING,i);
        A_SpawnWallGlass(i,-1,10);
        break;
    case FETUSBROKE__STATIC:
        for (j=48; j>0; j--)
        {
            A_Shoot(i,BLOODSPLAT1);
            sprite[i].ang += 333;
        }
        A_PlaySound(GLASS_HEAVYBREAK,i);
        A_PlaySound(SQUISHED,i);
    case BOTTLE7__STATIC:
        A_PlaySound(GLASS_BREAKING,i);
        A_SpawnWallGlass(i,-1,10);
        A_DeleteSprite(i);
        break;
    case HYDROPLANT__STATIC:
        sprite[i].picnum = BROKEHYDROPLANT;
        A_PlaySound(GLASS_BREAKING,i);
        A_SpawnWallGlass(i,-1,10);
        break;

    case FORCESPHERE__STATIC:
        sprite[i].xrepeat = 0;
        actor[sprite[i].owner].t_data[0] = 32;
        actor[sprite[i].owner].t_data[1] = !actor[sprite[i].owner].t_data[1]?1:0;
        actor[sprite[i].owner].t_data[2] ++;
        A_Spawn(i,EXPLOSION2);
        break;

    case BROKEHYDROPLANT__STATIC:
        A_PlaySound(GLASS_BREAKING,i);
        A_SpawnWallGlass(i,-1,5);
        A_DeleteSprite(i);
        break;

    case TOILET__STATIC:
        sprite[i].picnum = TOILETBROKE;
        sprite[i].cstat |= (krand()&1)<<2;
        sprite[i].cstat &= ~257;
        A_Spawn(i,TOILETWATER);
        A_PlaySound(GLASS_BREAKING,i);
        break;

    case STALL__STATIC:
        sprite[i].picnum = STALLBROKE;
        sprite[i].cstat |= (krand()&1)<<2;
        sprite[i].cstat &= ~257;
        A_Spawn(i,TOILETWATER);
        A_PlaySound(GLASS_HEAVYBREAK,i);
        break;

    case HYDRENT__STATIC:
        sprite[i].picnum = BROKEFIREHYDRENT;
        A_Spawn(i,TOILETWATER);

        //            for(k=0;k<5;k++)
        //          {
        //            j = A_InsertSprite(sprite[i].sectnum,sprite[i].x,sprite[i].y,sprite[i].z-(krand()%(48<<8)),SCRAP3+(krand()&3),-8,48,48,krand()&2047,(krand()&63)+64,-(krand()&4095)-(sprite[i].zvel>>2),i,5);
        //          sprite[j].pal = 2;
        //    }
        A_PlaySound(GLASS_HEAVYBREAK,i);
        break;

    case GRATE1__STATIC:
        sprite[i].picnum = BGRATE1;
        sprite[i].cstat &= (65535-256-1);
        A_PlaySound(VENT_BUST,i);
        break;

    case CIRCLEPANNEL__STATIC:
        sprite[i].picnum = CIRCLEPANNELBROKE;
        sprite[i].cstat &= (65535-256-1);
        A_PlaySound(VENT_BUST,i);
        break;
    case PANNEL1__STATIC:
    case PANNEL2__STATIC:
        sprite[i].picnum = BPANNEL1;
        sprite[i].cstat &= (65535-256-1);
        A_PlaySound(VENT_BUST,i);
        break;
    case PANNEL3__STATIC:
        sprite[i].picnum = BPANNEL3;
        sprite[i].cstat &= (65535-256-1);
        A_PlaySound(VENT_BUST,i);
        break;
    case PIPE1__STATIC:
    case PIPE2__STATIC:
    case PIPE3__STATIC:
    case PIPE4__STATIC:
    case PIPE5__STATIC:
    case PIPE6__STATIC:
        switch (DYNAMICTILEMAP(sprite[i].picnum))
        {
        case PIPE1__STATIC:
            sprite[i].picnum=PIPE1B;
            break;
        case PIPE2__STATIC:
            sprite[i].picnum=PIPE2B;
            break;
        case PIPE3__STATIC:
            sprite[i].picnum=PIPE3B;
            break;
        case PIPE4__STATIC:
            sprite[i].picnum=PIPE4B;
            break;
        case PIPE5__STATIC:
            sprite[i].picnum=PIPE5B;
            break;
        case PIPE6__STATIC:
            sprite[i].picnum=PIPE6B;
            break;
        }

        j = A_Spawn(i,STEAM);
        sprite[j].z = sector[sprite[i].sectnum].floorz-(32<<8);
        break;

    case MONK__STATIC:
    case LUKE__STATIC:
    case INDY__STATIC:
    case JURYGUY__STATIC:
        A_PlaySound(sprite[i].lotag,i);
        A_Spawn(i,sprite[i].hitag);
    case SPACEMARINE__STATIC:
        sprite[i].extra -= sprite[sn].extra;
        if (sprite[i].extra > 0) break;
        sprite[i].ang = krand()&2047;
        A_Shoot(i,BLOODSPLAT1);
        sprite[i].ang = krand()&2047;
        A_Shoot(i,BLOODSPLAT2);
        sprite[i].ang = krand()&2047;
        A_Shoot(i,BLOODSPLAT3);
        sprite[i].ang = krand()&2047;
        A_Shoot(i,BLOODSPLAT4);
        sprite[i].ang = krand()&2047;
        A_Shoot(i,BLOODSPLAT1);
        sprite[i].ang = krand()&2047;
        A_Shoot(i,BLOODSPLAT2);
        sprite[i].ang = krand()&2047;
        A_Shoot(i,BLOODSPLAT3);
        sprite[i].ang = krand()&2047;
        A_Shoot(i,BLOODSPLAT4);
        A_DoGuts(i,JIBS1,1);
        A_DoGuts(i,JIBS2,2);
        A_DoGuts(i,JIBS3,3);
        A_DoGuts(i,JIBS4,4);
        A_DoGuts(i,JIBS5,1);
        A_DoGuts(i,JIBS3,6);
        S_PlaySound(SQUISHED);
        A_DeleteSprite(i);
        break;
    case CHAIR1__STATIC:
    case CHAIR2__STATIC:
        sprite[i].picnum = BROKENCHAIR;
        sprite[i].cstat = 0;
        break;
    case CHAIR3__STATIC:
    case MOVIECAMERA__STATIC:
    case SCALE__STATIC:
    case VACUUM__STATIC:
    case CAMERALIGHT__STATIC:
    case IVUNIT__STATIC:
    case POT1__STATIC:
    case POT2__STATIC:
    case POT3__STATIC:
    case TRIPODCAMERA__STATIC:
        A_PlaySound(GLASS_HEAVYBREAK,i);
        s = sprite[i];
        for (j=16; j>0; j--) RANDOMSCRAP(s, i);
        A_DeleteSprite(i);
        break;
    case PLAYERONWATER__STATIC:
        i = sprite[i].owner;
    default:
        if ((sprite[i].cstat&16) && sprite[i].hitag == 0 && sprite[i].lotag == 0 && sprite[i].statnum == STAT_DEFAULT)
            break;

        if ((sprite[sn].picnum == FREEZEBLAST || sprite[sn].owner != i) && sprite[i].statnum != STAT_PROJECTILE)
        {
            if (A_CheckEnemySprite(sprite[i]) == 1)
            {
                if (sprite[sn].picnum == RPG) sprite[sn].extra <<= 1;

                if ((sprite[i].picnum != DRONE) && (sprite[i].picnum != ROTATEGUN) && (sprite[i].picnum != COMMANDER) && (sprite[i].picnum < GREENSLIME || sprite[i].picnum > GREENSLIME+7))
                    if (sprite[sn].picnum != FREEZEBLAST)
                        if (!A_CheckSpriteTileFlags(sprite[i].picnum, SPRITE_BADGUY))
                        {
                            j = A_Spawn(sn,JIBS6);
                            if (sprite[sn].pal == 6)
                                sprite[j].pal = 6;
                            sprite[j].z += (4<<8);
                            sprite[j].xvel = 16;
                            sprite[j].xrepeat = sprite[j].yrepeat = 24;
                            sprite[j].ang += 32-(krand()&63);
                        }

                j = sprite[sn].owner;

                if (j >= 0 && sprite[j].picnum == APLAYER && sprite[i].picnum != ROTATEGUN && sprite[i].picnum != DRONE)
                    if (g_player[sprite[j].yvel].ps.curr_weapon == SHOTGUN_WEAPON)
                    {
                        A_Shoot(i,BLOODSPLAT3);
                        A_Shoot(i,BLOODSPLAT1);
                        A_Shoot(i,BLOODSPLAT2);
                        A_Shoot(i,BLOODSPLAT4);
                    }

                if (sprite[i].picnum != TANK && sprite[i].picnum != BOSS1 && sprite[i].picnum != BOSS4 && sprite[i].picnum != BOSS2 && sprite[i].picnum != BOSS3 && sprite[i].picnum != RECON && sprite[i].picnum != ROTATEGUN)
                {
                    if (sprite[i].extra > 0)
                    {
                        if ((sprite[i].cstat&48) == 0)
                            sprite[i].ang = (sprite[sn].ang+1024)&2047;
                        sprite[i].xvel = -(sprite[sn].extra<<2);
                        j = sprite[i].sectnum;
                        var $j = new R(j);
                        pushmove(/*(vec3_t *)&*/sprite[i],$j,128,(4<<8),(4<<8),CLIPMASK0);
                        j = $j.$;
                        if (j != sprite[i].sectnum && unsigned(j) < MAXSECTORS)
                            changespritesect(i,j);
                    }
                }

                if (sprite[i].statnum == STAT_ZOMBIEACTOR)
                {
                    changespritestat(i, STAT_ACTOR);
                    actor[i].timetosleep = SLEEPTIME;
                }
                if ((sprite[i].xrepeat < 24 || sprite[i].picnum == SHARK) && sprite[sn].picnum == SHRINKSPARK)
                    return;
            }

            if (sprite[i].statnum != STAT_ZOMBIEACTOR)
            {
                if (sprite[sn].picnum == FREEZEBLAST && ((sprite[i].picnum == APLAYER && sprite[i].pal == 1) || (g_freezerSelfDamage == 0 && sprite[sn].owner == i)))
                    return;

                actor[i].picnum = sprite[sn].picnum;
                actor[i].extra += sprite[sn].extra;
                actor[i].ang = sprite[sn].ang;
                actor[i].owner = sprite[sn].owner;
            }

            if (sprite[i].statnum == STAT_PLAYER)
            {
                var ps = g_player[sprite[i].yvel].ps;

                if (ps.newowner >= 0)
                    G_ClearCameraView(ps);

                if (sprite[i].xrepeat < 24 && sprite[sn].picnum == SHRINKSPARK)
                    return;

                if (sprite[actor[i].owner].picnum != APLAYER)
                    if (ud.player_skill >= 3)
                        sprite[sn].extra += (sprite[sn].extra>>1);
            }

        }
        break;
    }
}

function G_AlignWarpElevators(): void
{
    var /*int32_t */j: number, i = headspritestat[STAT_EFFECTOR];

    while (i >= 0)
    {
        if (sprite[i].lotag == SE_17_WARP_ELEVATOR && sprite[i].shade > 16)
        {
            j = headspritestat[STAT_EFFECTOR];
            while (j >= 0)
            {
                if ((sprite[j].lotag) == SE_17_WARP_ELEVATOR && i != j &&
                        (sprite[i].hitag) == (sprite[j].hitag))
                {
                    sector[sprite[j].sectnum].floorz =
                        sector[sprite[i].sectnum].floorz;
                    sector[sprite[j].sectnum].ceilingz =
                        sector[sprite[i].sectnum].ceilingz;
                }

                j = nextspritestat[j];
            }
        }
        i = nextspritestat[i];
    }
}

function P_HandleSharedKeys(/*int32_t */snum:number): void
{
    var/*int32_t */i:number, k = 0, dainv:number;
    var /*uint32_t */sb_snum = g_player[snum].sync.bits, j:number;
    var p = g_player[snum].ps;

    if (p.cheat_phase == 1) return;

    // 1<<0  =  jump
    // 1<<1  =  crouch
    // 1<<2  =  fire
    // 1<<3  =  aim up
    // 1<<4  =  aim down
    // 1<<5  =  run
    // 1<<6  =  look left
    // 1<<7  =  look right
    // 15<<8 = !weapon selection (bits 8-11)
    // 1<<12 = !steroids
    // 1<<13 =  look up
    // 1<<14 =  look down
    // 1<<15 = !nightvis
    // 1<<16 = !medkit
    // 1<<17 =  (multiflag==1) ? changes meaning of bits 18 and 19
    // 1<<18 =  centre view
    // 1<<19 = !holster weapon
    // 1<<20 = !inventory left
    // 1<<21 = !pause
    // 1<<22 = !quick kick
    // 1<<23 =  aim mode
    // 1<<24 = !holoduke
    // 1<<25 = !jetpack
    // 1<<26 =  g_gameQuit
    // 1<<27 = !inventory right
    // 1<<28 = !turn around
    // 1<<29 = !open
    // 1<<30 = !inventory
    // 1<<31 = !escape

    i = p.aim_mode;
    p.aim_mode = (sb_snum>>SK_AIMMODE)&1;
    if (p.aim_mode < i)
        p.return_to_center = 9;

    if (TEST_SYNC_KEY(sb_snum, SK_QUICK_KICK) && p.quick_kick == 0)
        if (p.curr_weapon != KNEE_WEAPON || p.kickback_pic == 0)
        {
            if (VM_OnEvent(EVENT_QUICKKICK,g_player[snum].ps.i,snum, -1, 0) == 0)
            {
                p.quick_kick = 14;
                if (p.fta == 0 || p.ftq == 80)
                    P_DoQuote(QUOTE_MIGHTY_FOOT,p);
            }
        }

    j = sb_snum & ((15<<SK_WEAPON_BITS)|BIT(SK_STEROIDS)|BIT(SK_NIGHTVISION)|BIT(SK_MEDKIT)|BIT(SK_QUICK_KICK)| 
                   BIT(SK_HOLSTER)|BIT(SK_INV_LEFT)|BIT(SK_PAUSE)|BIT(SK_HOLODUKE)|BIT(SK_JETPACK)|BIT(SK_INV_RIGHT)| 
                   BIT(SK_TURNAROUND)|BIT(SK_OPEN)|BIT(SK_INVENTORY)|BIT(SK_ESCAPE));
    sb_snum = j & ~p.interface_toggle_flag;
    p.interface_toggle_flag |= sb_snum | ((sb_snum&0xf00)?0xf00:0);
    p.interface_toggle_flag &= j | ((j&0xf00)?0xf00:0);

    if (sb_snum && TEST_SYNC_KEY(sb_snum, SK_MULTIFLAG) == 0)
    {
        if (TEST_SYNC_KEY(sb_snum, SK_PAUSE))
        {
            KB_ClearKeyDown(sc_Pause);
            if (ud.pause_on)
                ud.pause_on = 0;
            else ud.pause_on = 1+SHIFTS_IS_PRESSED();
            if (ud.pause_on)
            {
                S_PauseMusic(1);
                FX_StopAllSounds();
                S_ClearSoundLocks();
            }
            else
            {
                if (ud.config.MusicToggle) S_PauseMusic(0);
                pub = NUMPAGES;
                pus = NUMPAGES;
            }
        }

        if (ud.pause_on) return;

        if (sprite[p.i].extra <= 0) return;		// if dead...

        if (TEST_SYNC_KEY(sb_snum, SK_INVENTORY) && p.newowner == -1)	// inventory button generates event for selected item
        {
            if (VM_OnEvent(EVENT_INVENTORY,g_player[snum].ps.i,snum, -1, 0) == 0)
            {
                switch (p.inven_icon)
                {
                case ICON_JETPACK:
                    sb_snum |= BIT(SK_JETPACK);
                    break;
                case ICON_HOLODUKE:
                    sb_snum |= BIT(SK_HOLODUKE);
                    break;
                case ICON_HEATS:
                    sb_snum |= BIT(SK_NIGHTVISION);
                    break;
                case ICON_FIRSTAID:
                    sb_snum |= BIT(SK_MEDKIT);
                    break;
                case ICON_STEROIDS:
                    sb_snum |= BIT(SK_STEROIDS);
                    break;
                }
            }
        }

        if (TEST_SYNC_KEY(sb_snum, SK_NIGHTVISION))
        {
            if (VM_OnEvent(EVENT_USENIGHTVISION,g_player[snum].ps.i,snum, -1, 0) == 0
                    &&  p.inv_amount[GET_HEATS] > 0)
            {
                p.heat_on = !p.heat_on?1:0;
                P_UpdateScreenPal(p);
                p.inven_icon = ICON_HEATS;
                A_PlaySound(NITEVISION_ONOFF,p.i);
                P_DoQuote(QUOTE_NVG_OFF-(!!p.heat_on?1:0),p);
            }
        }

        if (TEST_SYNC_KEY(sb_snum, SK_STEROIDS))
        {
            if (VM_OnEvent(EVENT_USESTEROIDS,g_player[snum].ps.i,snum, -1, 0) == 0)
            {
                if (p.inv_amount[GET_STEROIDS] == 400)
                {
                    p.inv_amount[GET_STEROIDS]--;
                    A_PlaySound(DUKE_TAKEPILLS,p.i);
                    P_DoQuote(QUOTE_USED_STEROIDS,p);
                }
                if (p.inv_amount[GET_STEROIDS] > 0)
                    p.inven_icon = ICON_STEROIDS;
            }
            return;		// is there significance to returning?
        }
        if (p.refresh_inventory)
            sb_snum |= BIT(SK_INV_LEFT);   // emulate move left...

        if (p.newowner == -1 && (TEST_SYNC_KEY(sb_snum, SK_INV_LEFT) || TEST_SYNC_KEY(sb_snum, SK_INV_RIGHT)))
        {
            p.invdisptime = GAMETICSPERSEC*2;

            if (TEST_SYNC_KEY(sb_snum, SK_INV_RIGHT)) k = 1;
            else k = 0;

            if (p.refresh_inventory) p.refresh_inventory = 0;
            dainv = p.inven_icon;

            i = 0;

CHECKINV1:
for(;;) {
            if (i < 9)
            {
                i++;

                switch (dainv)
                {
                case ICON_JETPACK:
                    if (p.inv_amount[GET_JETPACK] > 0 && i > 1)
                        break;
                    if (k) dainv++;
                    else dainv--;
                    continue CHECKINV1;
                case ICON_SCUBA:
                    if (p.inv_amount[GET_SCUBA] > 0 && i > 1)
                        break;
                    if (k) dainv++;
                    else dainv--;
                    continue CHECKINV1;
                case ICON_STEROIDS:
                    if (p.inv_amount[GET_STEROIDS] > 0 && i > 1)
                        break;
                    if (k) dainv++;
                    else dainv--;
                    continue CHECKINV1;
                case ICON_HOLODUKE:
                    if (p.inv_amount[GET_HOLODUKE] > 0 && i > 1)
                        break;
                    if (k) dainv++;
                    else dainv--;
                    continue CHECKINV1;
                case ICON_NONE:
                case ICON_FIRSTAID:
                    if (p.inv_amount[GET_FIRSTAID] > 0 && i > 1)
                        break;
                    if (k) dainv = 2;
                    else dainv = 7;
                    continue CHECKINV1;
                case ICON_HEATS:
                    if (p.inv_amount[GET_HEATS] > 0 && i > 1)
                        break;
                    if (k) dainv++;
                    else dainv--;
                    continue CHECKINV1;
                case ICON_BOOTS:
                    if (p.inv_amount[GET_BOOTS] > 0 && i > 1)
                        break;
                    if (k) dainv = 1;
                    else dainv = 6;
                    continue CHECKINV1;
                }
            }
            else dainv = 0;

    break;
}

            if (TEST_SYNC_KEY(sb_snum, SK_INV_LEFT))   // Inventory_Left
            {
                /*Gv_SetVar(g_iReturnVarID,dainv,g_player[snum].ps.i,snum);*/
                dainv = VM_OnEvent(EVENT_INVENTORYLEFT,g_player[snum].ps.i,snum, -1, dainv);
            }
            else if (TEST_SYNC_KEY(sb_snum, SK_INV_RIGHT))   // Inventory_Right
            {
                /*Gv_SetVar(g_iReturnVarID,dainv,g_player[snum].ps.i,snum);*/
                dainv = VM_OnEvent(EVENT_INVENTORYRIGHT,g_player[snum].ps.i,snum, -1, dainv);
            }

            if (dainv >= 1)
            {
                p.inven_icon = dainv;

                if (dainv || p.inv_amount[GET_FIRSTAID])
                {
                    var _i = [ QUOTE_MEDKIT, QUOTE_STEROIDS, QUOTE_HOLODUKE,
                        QUOTE_JETPACK, QUOTE_NVG, QUOTE_SCUBA, QUOTE_BOOTS, 0 ];
                    if (dainv>=1 && dainv<=9)
                        P_DoQuote(_i[dainv-1], p);
                }
            }
        }

        j = ((sb_snum&(15<<SK_WEAPON_BITS))>>SK_WEAPON_BITS) - 1;

        switch (int32(j))
        {
        case -1:
            break;
        default:
            j = VM_OnEvent(EVENT_WEAPKEY1+j,p.i,snum, -1, j);
            break;
        case 10:
            j = VM_OnEvent(EVENT_PREVIOUSWEAPON,p.i,snum, -1, j);
            break;
        case 11:
            j = VM_OnEvent(EVENT_NEXTWEAPON,p.i,snum, -1, j);
            break;
        }

        if (p.reloading == 1)
            j = -1;
        else if (int32(j) != -1 && p.kickback_pic == 1 && p.weapon_pos == 1)
        {
            p.wantweaponfire = j;
            p.kickback_pic = 0;
        }
        if (int32(j) != -1 && p.last_pissed_time <= (GAMETICSPERSEC*218) && p.show_empty_weapon == 0 /*&& p.kickback_pic == 0*/ &&
                p.quick_kick == 0 && sprite[p.i].xrepeat > 32 && p.access_incs == 0 && p.knee_incs == 0)
        {
            //            if(  ( p.weapon_pos == 0 || ( p.holster_weapon && p.weapon_pos == WEAPON_POS_LOWER ) ))
            {
                if (j == 10 || j == 11)
                {
                    k = p.curr_weapon;
                    j = (j == 10 ? -1 : 1);     // JBF: prev (-1) or next (1) weapon choice
                    i = 0;

                    while ((k >= 0 && k < 10) || (window.PLUTOPAK && k == GROW_WEAPON && (p.subweapon&(1<<GROW_WEAPON))))         // JBF 20040116: so we don't select grower with v1.3d
                    {
                        if (k == GROW_WEAPON)   // JBF: this is handling next/previous with the grower selected
                        {
                            if (int32(j) == -1)
                                k = 5;
                            else k = 7;
                        }
                        else
                        {
                            k += j;
                            if (window.PLUTOPAK)   // JBF 20040116: so we don't select grower with v1.3d
                                if (k == SHRINKER_WEAPON && (p.subweapon&(1<<GROW_WEAPON)))    // JBF: activates grower
                                    k = GROW_WEAPON;                            // if enabled
                        }

                        if (k == -1) k = 9;
                        else if (k == 10) k = 0;

                        if ((p.gotweapon & (1<<k)) && p.ammo_amount[k] > 0)
                        {
                            if (window.PLUTOPAK)   // JBF 20040116: so we don't select grower with v1.3d
                                if (k == SHRINKER_WEAPON && (p.subweapon&(1<<GROW_WEAPON)))
                                    k = GROW_WEAPON;
                            j = k;
                            break;
                        }
                        else    // JBF: grower with no ammo, but shrinker with ammo, switch to shrink
                            if (window.PLUTOPAK && k == GROW_WEAPON && p.ammo_amount[GROW_WEAPON] == 0 &&
                                    (p.gotweapon & (1<<SHRINKER_WEAPON)) && p.ammo_amount[SHRINKER_WEAPON] > 0)   // JBF 20040116: added PLUTOPAK so we don't select grower with v1.3d
                            {
                                j = SHRINKER_WEAPON;
                                p.subweapon &= ~(1<<GROW_WEAPON);
                                break;
                            }
                            else    // JBF: shrinker with no ammo, but grower with ammo, switch to grow
                                if (window.PLUTOPAK && k == SHRINKER_WEAPON && p.ammo_amount[SHRINKER_WEAPON] == 0 &&
                                        (p.gotweapon & (1<<SHRINKER_WEAPON)) && p.ammo_amount[GROW_WEAPON] > 0)   // JBF 20040116: added PLUTOPAK so we don't select grower with v1.3d
                                {
                                    j = GROW_WEAPON;
                                    p.subweapon |= (1<<GROW_WEAPON);
                                    break;
                                }

                        if (++i == 10) // absolutely no weapons, so use foot
                        {
                            j = KNEE_WEAPON;
                            break;
                        }
                    }
                }

                P_SetWeaponGamevars(snum, p);

                j = VM_OnEvent(EVENT_SELECTWEAPON,p.i,snum, -1, j);

                if (int32(j) != -1 && j <= MAX_WEAPONS)
                {
                    if (j == HANDBOMB_WEAPON && p.ammo_amount[HANDBOMB_WEAPON] == 0)
                    {
                        k = headspritestat[STAT_ACTOR];
                        while (k >= 0)
                        {
                            if (sprite[k].picnum == HEAVYHBOMB && sprite[k].owner == p.i)
                            {
                                p.gotweapon |= (1<<HANDBOMB_WEAPON);
                                j = HANDREMOTE_WEAPON;
                                break;
                            }
                            k = nextspritestat[k];
                        }
                    }

                    if (j == SHRINKER_WEAPON && window.PLUTOPAK)   // JBF 20040116: so we don't select the grower with v1.3d
                    {
                        if (screenpeek == snum) pus = NUMPAGES;

                        if (p.curr_weapon != GROW_WEAPON && p.curr_weapon != SHRINKER_WEAPON)
                        {
                            if (p.ammo_amount[GROW_WEAPON] > 0)
                            {
                                if ((p.subweapon&(1<<GROW_WEAPON)) == (1<<GROW_WEAPON))
                                    j = GROW_WEAPON;
                                else if (p.ammo_amount[SHRINKER_WEAPON] == 0)
                                {
                                    j = GROW_WEAPON;
                                    p.subweapon |= (1<<GROW_WEAPON);
                                }
                            }
                            else if (p.ammo_amount[SHRINKER_WEAPON] > 0)
                                p.subweapon &= ~(1<<GROW_WEAPON);
                        }
                        else if (p.curr_weapon == SHRINKER_WEAPON)
                        {
                            p.subweapon |= (1<<GROW_WEAPON);
                            j = GROW_WEAPON;
                        }
                        else
                            p.subweapon &= ~(1<<GROW_WEAPON);
                    }

                    if (p.holster_weapon)
                    {
                        sb_snum |= BIT(SK_HOLSTER);
                        p.weapon_pos = WEAPON_POS_LOWER;
                    }
                    else if (int32(j) >= 0 && (p.gotweapon & (1<<j)) && uint32(p.curr_weapon) != j)
                        switch (j)
                        {
                        case PISTOL_WEAPON:
                        case SHOTGUN_WEAPON:
                        case CHAINGUN_WEAPON:
                        case RPG_WEAPON:
                        case DEVISTATOR_WEAPON:
                        case FREEZE_WEAPON:
                        case GROW_WEAPON:
                        case SHRINKER_WEAPON:
                            if (p.ammo_amount[j] == 0 && p.show_empty_weapon == 0)
                            {
                                p.last_full_weapon = p.curr_weapon;
                                p.show_empty_weapon = 32;
                            }
                        case KNEE_WEAPON:
                            P_AddWeapon(p, j);
                            break;
                        case HANDREMOTE_WEAPON:
                            if (k >= 0) // Found in list of [1]'s
                            {
                                p.curr_weapon = j;
                                p.last_weapon = -1;
                                p.weapon_pos = WEAPON_POS_RAISE;
                            }
                            break;
                        case HANDBOMB_WEAPON:
                        case TRIPBOMB_WEAPON:
                            if (p.ammo_amount[j] > 0 && (p.gotweapon & (1<<j)))
                                P_AddWeapon(p, j);
                            break;
                        }
                }
            }
        }

        if (TEST_SYNC_KEY(sb_snum, SK_HOLODUKE) && p.newowner == -1)
        {
            if (p.holoduke_on == -1)
            {
                if (VM_OnEvent(EVENT_HOLODUKEON,g_player[snum].ps.i,snum, -1, 0) == 0)
                {
                    if (p.inv_amount[GET_HOLODUKE] > 0)
                    {
                        p.inven_icon = ICON_HOLODUKE;

                        if (p.cursectnum > -1)
                        {
                            p.holoduke_on = i = A_InsertSprite(p.cursectnum,p.pos.x,p.pos.y,
                                                                p.pos.z+(30<<8),APLAYER,-64,0,0,p.ang,0,0,-1,10);
                            actor[i].t_data[3] = actor[i].t_data[4] = 0;
                            sprite[i].yvel = snum;
                            sprite[i].extra = 0;
                            P_DoQuote(QUOTE_HOLODUKE_ON,p);
                            A_PlaySound(TELEPORTER,p.holoduke_on);
                        }
                    }
                    else P_DoQuote(QUOTE_HOLODUKE_NOT_FOUND,p);
                }
            }
            else
            {
                if (VM_OnEvent(EVENT_HOLODUKEOFF,g_player[snum].ps.i,snum, -1, 0) == 0)
                {
                    A_PlaySound(TELEPORTER,p.holoduke_on);
                    p.holoduke_on = -1;
                    P_DoQuote(QUOTE_HOLODUKE_OFF,p);
                }
            }
        }

        if (TEST_SYNC_KEY(sb_snum, SK_MEDKIT))
        {
            if (VM_OnEvent(EVENT_USEMEDKIT,g_player[snum].ps.i,snum, -1, 0) == 0)
            {
                if (p.inv_amount[GET_FIRSTAID] > 0 && sprite[p.i].extra < p.max_player_health)
                {
                    j = p.max_player_health-sprite[p.i].extra;

                    if (uint32(p.inv_amount[GET_FIRSTAID]) > j)
                    {
                        p.inv_amount[GET_FIRSTAID] -= j;
                        sprite[p.i].extra = p.max_player_health;
                        p.inven_icon = ICON_FIRSTAID;
                    }
                    else
                    {
                        sprite[p.i].extra += p.inv_amount[GET_FIRSTAID];
                        p.inv_amount[GET_FIRSTAID] = 0;
                        P_SelectNextInvItem(p);
                    }
                    A_PlaySound(DUKE_USEMEDKIT,p.i);
                }
            }
        }

        if (p.newowner == -1 && TEST_SYNC_KEY(sb_snum, SK_JETPACK))
        {
            if (VM_OnEvent(EVENT_USEJETPACK,g_player[snum].ps.i,snum, -1, 0) == 0)
            {
                if (p.inv_amount[GET_JETPACK] > 0)
                {
                    p.jetpack_on = !p.jetpack_on?1:0;
                    if (p.jetpack_on)
                    {
                        p.inven_icon = ICON_JETPACK;
                        if (p.scream_voice > FX_Ok)
                        {
                            FX_StopSound(p.scream_voice);
                            p.scream_voice = -1;
                        }

                        A_PlaySound(DUKE_JETPACK_ON,p.i);

                        P_DoQuote(QUOTE_JETPACK_ON,p);
                    }
                    else
                    {
                        p.hard_landing = 0;
                        p.vel.z = 0;
                        A_PlaySound(DUKE_JETPACK_OFF,p.i);
                        S_StopEnvSound(DUKE_JETPACK_IDLE,p.i);
                        S_StopEnvSound(DUKE_JETPACK_ON,p.i);
                        P_DoQuote(QUOTE_JETPACK_OFF,p);
                    }
                }
                else P_DoQuote(QUOTE_JETPACK_NOT_FOUND,p);
            }
        }

        if (TEST_SYNC_KEY(sb_snum, SK_TURNAROUND) && p.one_eighty_count == 0)
            if (VM_OnEvent(EVENT_TURNAROUND,p.i,snum, -1, 0) == 0)
                p.one_eighty_count = -1024;
    }
}

function /*int32_t */A_CheckHitSprite(/*int32_t */i:number, /*int16_t **/hitsp:R<number>):number
{
    var hit = new hitdata_t();
    var/*int32_t */zoff = 0;

    if (A_CheckEnemySprite(sprite[i]))
        zoff = (42<<8);
    else if (sprite[i].picnum == APLAYER)
        zoff = (39<<8);

    sprite[i].z -= zoff;
    hitscan(/*(const vec3_t *)&*/new vec3_t(sprite[i].x, sprite[i].y, sprite[i].z) ,sprite[i].sectnum,
            sintable[(sprite[i].ang+512)&2047],
            sintable[sprite[i].ang&2047],
            0,hit,CLIPMASK1);
    sprite[i].z += zoff;

    if (hitsp)
        hitsp.$ = hit.sprite;

    if (hit.wall >= 0 && (wall[hit.wall].cstat&16) && A_CheckEnemySprite(sprite[i]))
        return 1<<30;

    return FindDistance2D(hit.pos.x-sprite[i].x,hit.pos.y-sprite[i].y);
}

function /*int32_t */P_FindWall(p:DukePlayer_t ,/*int16_t **/hitw:R<number>):number
{
    var hit = new hitdata_t();

    hitscan(/*(const vec3_t *)*/p.pos,p.cursectnum,
            sintable[(p.ang+512)&2047],
            sintable[p.ang&2047],
            0,hit,CLIPMASK0);

    hitw.$ = hit.wall;
    if (hit.wall < 0)
        return INT32_MAX;

    return FindDistance2D(hit.pos.x-p.pos.x,hit.pos.y-p.pos.y);
}

// returns 1 if sprite i should not be considered by neartag
function /*int32_t */our_neartag_blacklist(/*int32_t */i:number):number
{
    return sprite[i].picnum >= SECTOREFFECTOR__STATIC && sprite[i].picnum <= GPSPEED__STATIC?1:0;
}

function P_CheckSectors(/*int32_t */snum:number):void
{
    var/*int32_t */i = -1,oldz:number;
    var p = g_player[snum].ps;
    var/*int16_t */j:number,hitscanwall:number;

    if (p.cursectnum > -1)
        switch (sector[p.cursectnum].lotag)
        {

        case 32767:
            sector[p.cursectnum].lotag = 0;
            P_DoQuote(QUOTE_FOUND_SECRET,p);
            p.secret_rooms++;
            return;
        case UINT16_MAX:
            for (i = 0; i != -1; i = connectpoint2[i])
                g_player[i].ps.gm = MODE_EOL;
            sector[p.cursectnum].lotag = 0;
            if (ud.from_bonus)
            {
                ud.level_number = ud.from_bonus;
                ud.m_level_number = ud.level_number;
                ud.from_bonus = 0;
            }
            else
            {
                ud.level_number++;
                if (ud.level_number > MAXLEVELS-1)
                    ud.level_number = 0;
                ud.m_level_number = ud.level_number;
            }
            return;
        case UINT16_MAX-1:
            sector[p.cursectnum].lotag = 0;
            p.timebeforeexit = GAMETICSPERSEC*8;
            p.customexitsound = sector[p.cursectnum].hitag;
            return;
        default:
            if (sector[p.cursectnum].lotag >= 10000 && sector[p.cursectnum].lotag < 16383)
            {
                if (snum == screenpeek || (GametypeFlags[ud.coop]&GAMETYPE_COOPSOUND))
                    A_PlaySound(sector[p.cursectnum].lotag-10000,p.i);
                sector[p.cursectnum].lotag = 0;
            }
            break;

        }

    //After this point the the player effects the map with space

    if (p.gm &MODE_TYPE || sprite[p.i].extra <= 0) return;

    if (TEST_SYNC_KEY(g_player[snum].sync.bits, SK_OPEN))
    {
        if (VM_OnEvent(EVENT_USE, p.i, snum, -1, 0) != 0)
            g_player[snum].sync.bits &= ~BIT(SK_OPEN);
    }

    if (ud.cashman && TEST_SYNC_KEY(g_player[snum].sync.bits, SK_OPEN))
        A_SpawnMultiple(p.i, MONEY, 2);

    if (p.newowner >= 0)
    {
        if (klabs(g_player[snum].sync.svel) > 768 || klabs(g_player[snum].sync.fvel) > 768)
        {
            i = -1;
            CLEARCAMERAS(); return;
        }
    }

    if (!TEST_SYNC_KEY(g_player[snum].sync.bits, SK_OPEN) && !TEST_SYNC_KEY(g_player[snum].sync.bits, SK_ESCAPE))
        p.toggle_key_flag = 0;
    else if (!p.toggle_key_flag)
    {

        if (TEST_SYNC_KEY(g_player[snum].sync.bits, SK_ESCAPE))
        {
            if (p.newowner >= 0)
            {
                i = -1;
                CLEARCAMERAS(); return;
            }
            return;
        }

        neartagsprite = -1;
        p.toggle_key_flag = 1;
        hitscanwall = -1;

        var $hitscanwall = new R(hitscanwall);
        i = P_FindWall(p,$hitscanwall);
        hitscanwall = $hitscanwall.$;

        if (hitscanwall >= 0 && i < 1280 && wall[hitscanwall].overpicnum == MIRROR)
            if (wall[hitscanwall].lotag > 0 && !A_CheckSoundPlaying(p.i,wall[hitscanwall].lotag) && snum == screenpeek)
            {
                A_PlaySound(wall[hitscanwall].lotag,p.i);
                return;
            }

        if (hitscanwall >= 0 && (wall[hitscanwall].cstat&16))
            switch (wall[hitscanwall].overpicnum)
            {
            default:
                if (wall[hitscanwall].lotag)
                    return;
            }
        var $neartagsector = new R(neartagsector);
        var $neartagwall = new R(neartagwall);
        var $neartagsprite = new R(neartagsprite);
        var $neartaghitdist = new R(neartaghitdist);
        function nearTagUpdateOriginal() {
            neartagsector = $neartagsector.$;
            neartagwall = $neartagwall.$;
            neartagsprite = $neartagsprite.$;
            neartaghitdist = $neartaghitdist.$;
        }
        if (p.newowner >= 0)
            neartag(p.opos.x,p.opos.y,p.opos.z,sprite[p.i].sectnum,p.oang,$neartagsector,
                    $neartagwall,$neartagsprite,$neartaghitdist, 1280, 1, our_neartag_blacklist), nearTagUpdateOriginal();
        else
        {
            neartag(p.pos.x,p.pos.y,p.pos.z,sprite[p.i].sectnum,p.oang,$neartagsector,
                    $neartagwall,$neartagsprite,$neartaghitdist, 1280, 1, our_neartag_blacklist);
            nearTagUpdateOriginal();
            if (neartagsprite == -1 && neartagwall == -1 && neartagsector == -1)
                neartag(p.pos.x,p.pos.y,p.pos.z+(8<<8),sprite[p.i].sectnum,p.oang,$neartagsector,
                        $neartagwall,$neartagsprite,$neartaghitdist, 1280, 1, our_neartag_blacklist), nearTagUpdateOriginal();
            if (neartagsprite == -1 && neartagwall == -1 && neartagsector == -1)
                neartag(p.pos.x,p.pos.y,p.pos.z+(16<<8),sprite[p.i].sectnum,p.oang,$neartagsector,
                        $neartagwall,$neartagsprite,$neartaghitdist, 1280, 1, our_neartag_blacklist), nearTagUpdateOriginal();
            if (neartagsprite == -1 && neartagwall == -1 && neartagsector == -1)
            {
                neartag(p.pos.x,p.pos.y,p.pos.z+(16<<8),sprite[p.i].sectnum,p.oang,$neartagsector,
                        $neartagwall,$neartagsprite,$neartaghitdist, 1280, 3, our_neartag_blacklist), nearTagUpdateOriginal();
                if (neartagsprite >= 0)
                {
                    switch (DYNAMICTILEMAP(sprite[neartagsprite].picnum))
                    {
                    case FEM1__STATIC:
                    case FEM2__STATIC:
                    case FEM3__STATIC:
                    case FEM4__STATIC:
                    case FEM5__STATIC:
                    case FEM6__STATIC:
                    case FEM7__STATIC:
                    case FEM8__STATIC:
                    case FEM9__STATIC:
                    case FEM10__STATIC:
                    case PODFEM1__STATIC:
                    case NAKED1__STATIC:
                    case STATUE__STATIC:
                    case TOUGHGAL__STATIC:
                        return;
                    }
                }

                neartagsprite = -1;
                neartagwall = -1;
                neartagsector = -1;
            }
        }

        if (p.newowner == -1 && neartagsprite == -1 && neartagsector == -1 && neartagwall == -1)
            if (isanunderoperator(sector[sprite[p.i].sectnum].lotag))
                neartagsector = sprite[p.i].sectnum;

        if (neartagsector >= 0 && (sector[neartagsector].lotag&16384))
            return;

        if (neartagsprite == -1 && neartagwall == -1)
            if (p.cursectnum >= 0 && sector[p.cursectnum].lotag == 2)
            {
                var $neartagsprite = new R(neartagsprite);
                oldz = A_CheckHitSprite(p.i,$neartagsprite);
                neartagsprite = $neartagsprite.$;
                if (oldz > 1280) neartagsprite = -1;
            }

        if (neartagsprite >= 0)
        {
            if (P_ActivateSwitch(snum,neartagsprite,1)) return;

            switch (DYNAMICTILEMAP(sprite[neartagsprite].picnum))
            {
            case TOILET__STATIC:
            case STALL__STATIC:
                if (p.last_pissed_time == 0)
                {
                    if (ud.lockout == 0) A_PlaySound(DUKE_URINATE,p.i);

                    p.last_pissed_time = GAMETICSPERSEC*220;
                    p.transporter_hold = 29*2;
                    if (p.holster_weapon == 0)
                    {
                        p.holster_weapon = 1;
                        p.weapon_pos = -1;
                    }
                    if (sprite[p.i].extra <= (p.max_player_health-int32(p.max_player_health/10)))
                    {
                        sprite[p.i].extra += int32(p.max_player_health/10);
                        p.last_extra = sprite[p.i].extra;
                    }
                    else if (sprite[p.i].extra < p.max_player_health)
                        sprite[p.i].extra = p.max_player_health;
                }
                else if (!A_CheckSoundPlaying(neartagsprite,FLUSH_TOILET))
                    A_PlaySound(FLUSH_TOILET,neartagsprite);
                return;

            case NUKEBUTTON__STATIC:
                var $j = new R(j);
                P_FindWall(p,$j);
                j = $j.$;
                if (j >= 0 && wall[j].overpicnum == 0)
                    if (actor[neartagsprite].t_data[0] == 0)
                    {
                        if (ud.noexits && (g_netServer || ud.multimode > 1))
                        {
                            // NUKEBUTTON frags the player
                            actor[p.i].picnum = NUKEBUTTON;
                            actor[p.i].extra = 250;
                        }
                        else
                        {
                            actor[neartagsprite].t_data[0] = 1;
                            sprite[neartagsprite].owner = p.i;
                            ud.secretlevel =
                                (p.buttonpalette = sprite[neartagsprite].pal) ? sprite[neartagsprite].lotag : 0;
                        }
                    }
                return;

            case WATERFOUNTAIN__STATIC:
                if (actor[neartagsprite].t_data[0] != 1)
                {
                    actor[neartagsprite].t_data[0] = 1;
                    sprite[neartagsprite].owner = p.i;

                    if (sprite[p.i].extra < p.max_player_health)
                    {
                        sprite[p.i].extra++;
                        A_PlaySound(DUKE_DRINKING,p.i);
                    }
                }
                return;

            case PLUG__STATIC:
                A_PlaySound(SHORT_CIRCUIT,p.i);
                sprite[p.i].extra -= 2+(krand()&3);

                P_PalFrom(p, 32, 48,48,64);
                break;

            case VIEWSCREEN__STATIC:
            case VIEWSCREEN2__STATIC:
            {
                // Try to find a camera sprite for the viewscreen.
                for (i = headspritestat[STAT_ACTOR]; i >= 0; i = nextspritestat[i])
                {
                    if (sprite[i].picnum == CAMERA1 && sprite[i].yvel == 0 && sprite[neartagsprite].hitag == sprite[i].lotag)
                    {
                        sprite[i].yvel = 1; //Using this camera
                        A_PlaySound(MONITOR_ACTIVE,p.i);

                        sprite[neartagsprite].owner = i;
                        sprite[neartagsprite].yvel = 1;


                        j = p.cursectnum;
                        p.cursectnum = sprite[i].sectnum;
                        P_UpdateScreenPal(p);
                        p.cursectnum = j;

                        // parallaxtype = 2;
                        p.newowner = i;

                        P_UpdatePosWhenViewingCam(p);

                        return;
                    }
                }
            }

            function CLEARCAMERAS() {

                if (i < 0)
                    G_ClearCameraView(p);
                else if (p.newowner >= 0)
                    p.newowner = -1;

                if (I_EscapeTrigger())
                    I_EscapeTriggerClear();

                //return;
            }
            CLEARCAMERAS(); return;
        }
        }

        if (TEST_SYNC_KEY(g_player[snum].sync.bits, SK_OPEN) == 0) return;
        else if (p.newowner >= 0)
        {
            i = -1;
            CLEARCAMERAS(); return;//goto CLEARCAMERAS;
        }

        if (neartagwall == -1 && neartagsector == -1 && neartagsprite == -1)
            if (klabs(A_GetHitscanRange(p.i)) < 512)
            {
                if ((krand()&255) < 16)
                    A_PlaySound(DUKE_SEARCH2,p.i);
                else A_PlaySound(DUKE_SEARCH,p.i);
                return;
            }

        if (neartagwall >= 0)
        {
            if (wall[neartagwall].lotag > 0 && CheckDoorTile(wall[neartagwall].picnum))
            {
                if (hitscanwall == neartagwall || hitscanwall == -1)
                    P_ActivateSwitch(snum,neartagwall,0);
                return;
            }
            else if (p.newowner >= 0)
            {
                i = -1;
                CLEARCAMERAS(); return;//goto CLEARCAMERAS;
            }
        }

        if (neartagsector >= 0 && (sector[neartagsector].lotag&16384) == 0 && isanearoperator(sector[neartagsector].lotag))
        {
            i = headspritesect[neartagsector];
            while (i >= 0)
            {
                if (sprite[i].picnum == ACTIVATOR || sprite[i].picnum == MASTERSWITCH)
                    return;
                i = nextspritesect[i];
            }
            G_OperateSectors(neartagsector,p.i);
        }
        else if ((sector[sprite[p.i].sectnum].lotag&16384) == 0)
        {
            if (isanunderoperator(sector[sprite[p.i].sectnum].lotag))
            {
                i = headspritesect[sprite[p.i].sectnum];
                while (i >= 0)
                {
                    if (sprite[i].picnum == ACTIVATOR || sprite[i].picnum == MASTERSWITCH) return;
                    i = nextspritesect[i];
                }
                G_OperateSectors(sprite[p.i].sectnum,p.i);
            }
            else P_ActivateSwitch(snum,neartagwall,0);
        }
    }
}


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
/// <reference path="../../eduke32/headers/macros.h.ts" />
/// <reference path="../../eduke32/headers/player.h.ts" />
/// <reference path="../../eduke32/headers/quotes.h.ts" />

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
//#include "common_game.h"
//#include "osd.h"
//#include "player.h"
//#include "demo.h"
//#include "enet/enet.h"

//var /*int32_t */lastvisinc=0; //dupe
var hudweap = new hudweapon_t();

var /*int32_t */g_snum=0;

//extern int32_t g_levelTextTime, ticrandomseed;

var g_numObituaries = 0;
var g_numSelfObituaries = 0;

function P_UpdateScreenPal(p: DukePlayer_t ): void
{
    var /*int32_t */intowater = 0;
    var /*const int32_t */sect = p.cursectnum;

    if (p.heat_on) p.palette = SLIMEPAL;
    else if (sect < 0) p.palette = BASEPAL;
    else if (sector[sect].ceilingpicnum >= FLOORSLIME && sector[sect].ceilingpicnum <= FLOORSLIME+2)
    {
        p.palette = SLIMEPAL;
        intowater = 1;
    }
    else
    {
        if (sector[p.cursectnum].lotag == ST_2_UNDERWATER) p.palette = WATERPAL;
        else p.palette = BASEPAL;
        intowater = 1;
    }

    g_restorePalette = 1+intowater;
}

function P_IncurDamage(p:DukePlayer_t ):void 
{
    var /*int32_t */damage:number;

    if (VM_OnEvent(EVENT_INCURDAMAGE, p.i, sprite[p.i].yvel, -1, 0) != 0)
        return;

    sprite[p.i].extra -= p.extra_extra8>>8;

    damage = sprite[p.i].extra - p.last_extra;

    if (damage >= 0)
        return;

    p.extra_extra8 = 0;

    if (p.inv_amount[GET_SHIELD] > 0)
    {
        var/*int32_t */shield_damage =  int32(damage * (20 + (krand()%30)) / 100);
        damage -= shield_damage;

        p.inv_amount[GET_SHIELD] += shield_damage;

        if (p.inv_amount[GET_SHIELD] < 0)
        {
            damage += p.inv_amount[GET_SHIELD];
            p.inv_amount[GET_SHIELD] = 0;
        }
    }

    sprite[p.i].extra = p.last_extra + damage;
}

function P_QuickKill(p: DukePlayer_t): void
{
    P_PalFrom(p, 48, 48,48,48);

    sprite[p.i].extra = 0;
    sprite[p.i].cstat |= 32768;

    if (ud.god == 0)
        A_DoGuts(p.i,JIBS6,8);
}

//static void A_DoWaterTracers(int32_t x1,int32_t y1,int32_t z1,int32_t x2,int32_t y2,int32_t z2,int32_t n)
//{
//    int32_t i, xv, yv, zv;
//    int16_t sect = -1;

//    i = n+1;
//    xv = (x2-x1)/i;
//    yv = (y2-y1)/i;
//    zv = (z2-z1)/i;

//    if ((klabs(x1-x2)+klabs(y1-y2)) < 3084)
//        return;

//    for (i=n; i>0; i--)
//    {
//        x1 += xv;
//        y1 += yv;
//        z1 += zv;
//        updatesector(x1,y1,&sect);
//        if (sect < 0)
//            break;

//        if (sector[sect].lotag == ST_2_UNDERWATER)
//            A_InsertSprite(sect,x1,y1,z1,WATERBUBBLE,-32,4+(krand()&3),4+(krand()&3),krand()&2047,0,0,g_player[0].ps.i,5);
//        else
//            A_InsertSprite(sect,x1,y1,z1,SMALLSMOKE,-32,14,14,0,0,0,g_player[0].ps.i,5);
//    }
//}

//static void A_HitscanProjTrail(const vec3_t *sv, const vec3_t *dv, int32_t ang, int32_t atwith)
//{
//    int32_t n, j, i;
//    int16_t sect = -1;
//    vec3_t srcvect;
//    vec3_t destvect;

//    const projectile_t *const proj = &ProjectileData[atwith];

//    Bmemcpy(&destvect, dv, sizeof(vec3_t));

//    srcvect.x = sv.x + (sintable[(348+ang+512)&2047]/proj.offset);
//    srcvect.y = sv.y + (sintable[(ang+348)&2047]/proj.offset);
//    srcvect.z = sv.z + 1024+(proj.toffset<<8);

//    n = ((FindDistance2D(srcvect.x-destvect.x,srcvect.y-destvect.y))>>8)+1;

//    destvect.x = ((destvect.x-srcvect.x)/n);
//    destvect.y = ((destvect.y-srcvect.y)/n);
//    destvect.z = ((destvect.z-srcvect.z)/n);

//    srcvect.x += destvect.x>>2;
//    srcvect.y += destvect.y>>2;
//    srcvect.z += (destvect.z>>2);

//    for (i=proj.tnum; i>0; i--)
//    {
//        srcvect.x += destvect.x;
//        srcvect.y += destvect.y;
//        srcvect.z += destvect.z;
//        updatesector(srcvect.x,srcvect.y,&sect);
//        if (sect < 0)
//            break;
//        getzsofslope(sect,srcvect.x,srcvect.y,&n,&j);
//        if (srcvect.z > j || srcvect.z < n)
//            break;
//        j = A_InsertSprite(sect,srcvect.x,srcvect.y,srcvect.z,proj.trail,-32,
//                           proj.txrepeat,proj.tyrepeat,ang,0,0,g_player[0].ps.i,0);
//        changespritestat(j, STAT_ACTOR);
//    }
//}

function /*int32_t */A_GetHitscanRange(/*int32_t */i:number):number
{
    var /*int32_t */zoff = (sprite[i].picnum == APLAYER) ? PHEIGHT : 0;
    var hit = new hitdata_t();

    sprite[i].z -= zoff;
    hitscan(new vec3_t(sprite[i].x, sprite[i].y, sprite[i].z) ,sprite[i].sectnum,
            sintable[(sprite[i].ang+512)&2047],
            sintable[sprite[i].ang&2047],
            0,hit,CLIPMASK1);
    sprite[i].z += zoff;

    return (FindDistance2D(hit.pos.x-sprite[i].x,hit.pos.y-sprite[i].y));
}

function /*int32_t */A_FindTargetSprite(s:spritetype,/*int32_t */aang:number,/*int32_t */atwith:number):number
{
    var /*int32_t */gotshrinker:number,gotfreezer:number;
    var/*int32_t */i:number, j:number, a:number, k:number, cans:number;
    var aimstats = new Int32Array([ 10, 13, 1, 2 ]);
    var /*int32_t */dx1:number, dy1:number, dx2:number, dy2:number, dx3:number, dy3:number, smax:number, sdist:number;
    var /*int32_t */xv:number, yv:number;

    if (s.picnum == APLAYER)
    {
        if (!g_player[s.yvel].ps.auto_aim)
            return -1;

        if (g_player[s.yvel].ps.auto_aim == 2)
        {
            if (A_CheckSpriteTileFlags(atwith,SPRITE_PROJECTILE) && (ProjectileData[atwith].workslike & PROJECTILE_RPG))
                return -1;
            else switch (DYNAMICTILEMAP(atwith))
                {
                case TONGUE__STATIC:
                case FREEZEBLAST__STATIC:
                case SHRINKSPARK__STATIC:
                case SHRINKER__STATIC:
                case RPG__STATIC:
                case FIRELASER__STATIC:
                case SPIT__STATIC:
                case COOLEXPLOSION1__STATIC:
                    return -1;
                default:
                    break;
                }
        }
    }

    a = s.ang;

    j = -1;

    gotshrinker = (s.picnum == APLAYER && PWEAPON(0, g_player[s.yvel].ps.curr_weapon, WorksLike) == SHRINKER_WEAPON)?1:0;
    gotfreezer = (s.picnum == APLAYER && PWEAPON(0, g_player[s.yvel].ps.curr_weapon, WorksLike) == FREEZE_WEAPON)?1:0;

    smax = INT32_MAX;

    dx1 = sintable[(a+512-aang)&2047];
    dy1 = sintable[(a-aang)&2047];
    dx2 = sintable[(a+512+aang)&2047];
    dy2 = sintable[(a+aang)&2047];

    dx3 = sintable[(a+512)&2047];
    dy3 = sintable[a&2047];

    for (k=0; k<4; k++)
    {
        if (j >= 0)
            break;
        for (i=headspritestat[aimstats[k]]; i >= 0; i=nextspritestat[i])
            if (sprite[i].xrepeat > 0 && sprite[i].extra >= 0 && (sprite[i].cstat&(257+32768)) == 257)
                if (A_CheckEnemySprite(sprite[i]) || k < 2)
                {
                    if (A_CheckEnemySprite(sprite[i]) || sprite[i].picnum == APLAYER || sprite[i].picnum == SHARK)
                    {
                        if (sprite[i].picnum == APLAYER &&
                                //                        ud.ffire == 0 &&
                                (GTFLAGS(GAMETYPE_PLAYERSFRIENDLY) || (GTFLAGS(GAMETYPE_TDM) &&
                                        g_player[sprite[i].yvel].ps.team == g_player[s.yvel].ps.team)) &&
                                s.picnum == APLAYER &&
                                s != sprite[i])
                            continue;

                        if (gotshrinker && sprite[i].xrepeat < 30)
                        {
                            if (sprite[i].picnum == SHARK)
                            {
                                if (sprite[i].xrepeat < 20) continue;
                                continue;
                            }
                            else if (!(sprite[i].picnum >= GREENSLIME && sprite[i].picnum <= GREENSLIME+7))
                                continue;
                        }
                        if (gotfreezer && sprite[i].pal == 1) continue;
                    }

                    xv = (sprite[i].x-s.x);
                    yv = (sprite[i].y-s.y);

                    if ((dy1*xv <= dx1*yv) && (dy2*xv >= dx2*yv))
                    {
                        sdist = mulscale(dx3,xv,14) + mulscale(dy3,yv,14);

                        if (sdist > 512 && sdist < smax)
                        {
                            if (s.picnum == APLAYER)
                                a = (klabs(scale(sprite[i].z-s.z,10,sdist)-(g_player[s.yvel].ps.horiz+g_player[s.yvel].ps.horizoff-100)) < 100)?1:0;
                            else a = 1;

                            if (sprite[i].picnum == ORGANTIC || sprite[i].picnum == ROTATEGUN)
                                cans = cansee(sprite[i].x,sprite[i].y,sprite[i].z,sprite[i].sectnum,s.x,s.y,s.z-(32<<8),s.sectnum);
                            else cans = cansee(sprite[i].x,sprite[i].y,sprite[i].z-(32<<8),sprite[i].sectnum,s.x,s.y,s.z-(32<<8),s.sectnum);

                            if (a && cans)
                            {
                                smax = sdist;
                                j = i;
                            }
                        }
                    }
                }
    }

    return j;
}

function A_SetHitData(/*int32_t */i:number, hit:hitdata_t ):void
{
    actor[i].t_data[6] = hit.wall;
    actor[i].t_data[7] = hit.sect;
    actor[i].t_data[8] = hit.sprite;
}

function/* int32_t */CheckShootSwitchTile(/*int32_t */pn:number):number
{
    return (pn == DIPSWITCH || pn == DIPSWITCH+1 ||
        pn == DIPSWITCH2 || pn == DIPSWITCH2+1 ||
        pn == DIPSWITCH3 || pn == DIPSWITCH3+1 ||
        pn == HANDSWITCH || pn == HANDSWITCH+1)?1:0;
}

function /*int32_t */safeldist(/*int32_t */spritenum1:number, s2:spritetype):number
{
    var/*int32_t */dst = ldist(sprite[spritenum1], s2);
    return dst ? dst : 1;
}

// flags:
//  1: do sprite center adjustment (cen-=(8<<8)) for GREENSLIME or ROTATEGUN
//  2: do auto getangle only if not RECON (if clear, do unconditionally)
function /*int32_t */GetAutoAimAngle(/*int32_t */i:number, /*int32_t */p:number, /*int32_t */atwith:number,
                               /*int32_t */cen_add:number, /*int32_t */flags:number,
                               /*const vec3_t **/srcvect:IVec3, /*int32_t */vel:number,
                               /*int32_t **/zvel:R<number>, /*int16_t **/sa:R<number>):number
{
    var /*int32_t */j = -1;

    Bassert(/*(unsigned)*/p < MAXPLAYERS);

//#ifdef LUNATIC
//    g_player[p].ps.autoaimang = AUTO_AIM_ANGLE;
//#else
    Gv_SetVar(g_iAimAngleVarID, AUTO_AIM_ANGLE, i, p);
//#endif

    if (G_HaveEvent(EVENT_GETAUTOAIMANGLE))
        VM_OnEvent(EVENT_GETAUTOAIMANGLE, i, p, -1, 0);

    {
//#ifdef LUNATIC
//        int32_t aimang = g_player[p].ps.autoaimang;
//#else
        var/*int32_t */aimang = Gv_GetVar(g_iAimAngleVarID, i, p);
//#endif
        if (aimang > 0)
            j = A_FindTargetSprite(sprite[i], aimang, atwith);
    }

    if (j >= 0)
    {
        var spr = sprite[j];
        var /*int32_t */cen = 2*(spr.yrepeat*tilesizy[spr.picnum]) + cen_add;
        var /*int32_t */dst:number;

        if (flags)
        {
            var/*int32_t */pn = spr.picnum;
            if ((pn >= GREENSLIME && pn <= GREENSLIME+7) || spr.picnum==ROTATEGUN)
            {
                cen -= (8<<8);
            }
        }

        dst = safeldist(g_player[p].ps.i, sprite[j]);
        zvel.$ = int32(((spr.z - srcvect.z - cen)*vel) / dst);

        if (!(flags&2) || sprite[j].picnum != RECON)
            sa.$ = getangle(spr.x-srcvect.x, spr.y-srcvect.y);
    }

    return j;
}

function /*void */Proj_MaybeSpawn(/*int32_t */k:number, /*int32_t */atwith:number, hit:hitdata_t):void
{
    // atwith < 0 is for hard-coded projectiles
    var /*int32_t */spawntile = atwith < 0 ? -atwith : ProjectileData[atwith].spawns;

    if (spawntile >= 0)
    {
        var/*int32_t */wh = A_Spawn(k, spawntile);

        if (atwith >= 0)
        {
            if (ProjectileData[atwith].sxrepeat > 4)
                sprite[wh].xrepeat = ProjectileData[atwith].sxrepeat;
            if (ProjectileData[atwith].syrepeat > 4)
                sprite[wh].yrepeat = ProjectileData[atwith].syrepeat;
        }

        A_SetHitData(wh, hit);
    }
}

// <extra>: damage that this shotspark does
function Proj_InsertShotspark(hit:hitdata_t, /*int32_t */i:number, /*int32_t */atwith:number,
                                    /*int32_t */xyrepeat:number, /*int32_t */ang:number, /*int32_t */extra:number):number
{
    var /*int32_t */k = A_InsertSprite(hit.sect, hit.pos.x, hit.pos.y, hit.pos.z,
                               SHOTSPARK1,-15, xyrepeat,xyrepeat, ang,0,0,i,4);
    sprite[k].extra = extra;
    // This is a hack to allow you to detect which weapon spawned a SHOTSPARK1:
    sprite[k].yvel = atwith;
    A_SetHitData(k, hit);

    return k;
}

function /*int32_t */Proj_GetExtra(/*int32_t */atwith:number):number
{
    var /*int32_t */extra = ProjectileData[atwith].extra;
    if (ProjectileData[atwith].extra_rand > 0)
        extra += (krand()%ProjectileData[atwith].extra_rand);
    return extra;
}

function Proj_MaybeAddSpread(/*int32_t */not_accurate_p:number, /*int32_t **/zvel:R<number>, /*int16_t **/sa:R<number>,
                                /*int32_t */zRange:number, /*int32_t */angRange:number):void
{
    if (not_accurate_p)
    {
        // Ranges <= 1 mean no spread at all. A range of 1 calls krand() though.
        if (zRange > 0)
            zvel.$ += int32(zRange/2) - krand()%zRange;
        if (angRange > 0)
            sa.$ += int32(angRange/2) - krand()%angRange;
    }
}


var /*int32_t */g_overrideShootZvel = 0;  // a boolean
var /*int32_t */g_shootZvel:number;  // the actual zvel if the above is !=0

function /*int32_t */A_GetShootZvel(/*int32_t */defaultzvel:number):number
{
    return g_overrideShootZvel ? g_shootZvel : defaultzvel;
}

// Prepare hitscan weapon fired from player p.
function P_PreFireHitscan(/*int32_t*/ i:number, /*int32_t */p:number, /*int32_t */atwith:number,
                             srcvect:vec3_t, /*int32_t **/zvel:R<number>, /*int16_t */sa:R<number>,
                             /*int32_t */accurate_autoaim_p:number,
                             /*int32_t */not_accurate_p:number):void
{
    var/*int32_t */angRange=32;
    var/*int32_t */zRange=256;

    var/*int32_t */j = GetAutoAimAngle(i, p, atwith, 5<<8, 0+1, srcvect, 256, zvel, sa);
    var ps = g_player[p].ps;

//#ifdef LUNATIC
//    ps.angrange = angRange;
//    ps.zrange = zRange;
//#else
    Gv_SetVar(g_iAngRangeVarID,angRange, i,p);
    Gv_SetVar(g_iZRangeVarID,zRange,i,p);
//#endif

    if (G_HaveEvent(EVENT_GETSHOTRANGE))
        VM_OnEvent(EVENT_GETSHOTRANGE, i,p, -1, 0);

//#ifdef LUNATIC
//    angRange = ps.angrange;
//    zRange = ps.zrange;
//#else
    angRange=Gv_GetVar(g_iAngRangeVarID,i,p);
    zRange=Gv_GetVar(g_iZRangeVarID,i,p);
//#endif

    if (accurate_autoaim_p)
    {
        if (!ps.auto_aim)
        {
            var hit = new hitdata_t ();

            zvel.$ = A_GetShootZvel((100-ps.horiz-ps.horizoff)<<5);

            hitscan(srcvect, sprite[i].sectnum, sintable[(sa.$+512)&2047], sintable[sa.$&2047],
                    zvel.$<<6,hit,CLIPMASK1);

            if (hit.sprite != -1)
            {
                var /*const int32_t */hitstatnumsbitmap =
                    ((1<<STAT_ACTOR) | (1<<STAT_ZOMBIEACTOR) | (1<<STAT_PLAYER) | (1<<STAT_DUMMYPLAYER));
                var /*const int32_t */st = sprite[hit.sprite].statnum;

                if (st>=0 && st<=30 && (hitstatnumsbitmap&(1<<st)))
                    j = hit.sprite;
            }
        }

        if (j == -1)
        {
            zvel.$ = (100-ps.horiz-ps.horizoff)<<5;
            Proj_MaybeAddSpread(not_accurate_p, zvel, sa, zRange, angRange);
        }
    }
    else
    {
        if (j == -1)  // no target
            zvel.$ = (100-ps.horiz-ps.horizoff)<<5;
        Proj_MaybeAddSpread(not_accurate_p, zvel, sa, zRange, angRange);
    }

    srcvect.z -= (2<<8);
}

// Hitscan weapon fired from actor (sprite s);
function A_PreFireHitscan(s:spritetype, srcvect: IVec3, /*int32_t */zvel:R<number>, /*int16_t **/sa:R<number>,
                             /*int32_t */not_accurate_p:number):void 
{
    var j = A_FindPlayer(s, NULL);
    var targetps = g_player[j].ps;

    var d = safeldist(targetps.i, s);
    zvel.$ = int32(((targetps.pos.z-srcvect.z)<<8) / d);

    srcvect.z -= (4<<8);

    if (s.picnum != BOSS1)
    {
        Proj_MaybeAddSpread(not_accurate_p, zvel, sa, 256, 64);
    }
    else
    {
        sa.$ = getangle(targetps.pos.x-srcvect.x, targetps.pos.y-srcvect.y);

        Proj_MaybeAddSpread(not_accurate_p, zvel, sa, 256, 128);
    }
}

function /*int32_t */Proj_DoHitscan(/*int32_t */i:number, /*int32_t */cstatmask:number,
                              /*const vec3_t **/srcvect:vec3_t, /*int32_t */zvel:number, /*int16_t */sa:number,
                              hit:hitdata_t):number
{
    var s = sprite[i];

    s.cstat &= ~cstatmask;

    zvel = A_GetShootZvel(zvel);

    hitscan(srcvect, s.sectnum,
            sintable[(sa+512)&2047],
            sintable[sa&2047],
            zvel<<6, hit, CLIPMASK1);

    s.cstat |= cstatmask;

    return (hit.sect < 0)?1:0;
}

function Proj_DoRandDecalSize(/*int32_t */spritenum:number, /*int32_t */atwith:number):void
{
    var proj = ProjectileData[atwith];

    if (proj.workslike & PROJECTILE_RANDDECALSIZE)
    {
        var/*int32_t */wh = (krand()&proj.xrepeat);
        if (wh < proj.yrepeat)
            wh = proj.yrepeat;
        sprite[spritenum].xrepeat = wh;
        sprite[spritenum].yrepeat = wh;
    }
    else
    {
        sprite[spritenum].xrepeat = proj.xrepeat;
        sprite[spritenum].yrepeat = proj.yrepeat;
    }
}

function /*int32_t*/ SectorContainsSE13(/*int32_t */sectnum:number):number
{
    var /*int32_t */i:number;
    if (sectnum >= 0)
        for (i = headspritesect[sectnum]; i >= 0; i = nextspritesect[i])
            if (sprite[i].statnum == STAT_EFFECTOR && sprite[i].lotag == SE_13_EXPLOSIVE)
                return 1;
    return 0;
}

// Maybe handle bit 2 (swap wall bottoms).
// (in that case walltype *hitwal may be stale)
function HandleHitWall(hit:hitdata_t ):void
{
    var hitwal = wall[hit.wall];

    if ((hitwal.cstat&2) && redwallp(hitwal))
        if (hit.pos.z >= sector[hitwal.nextsector].floorz)
            hit.wall = hitwal.nextwall;
}

// Finish shooting hitscan weapon from player <p>. <k> is the inserted SHOTSPARK1.
// * <spawnatimpacttile> is passed to Proj_MaybeSpawn()
// * <decaltile> and <damagewalltile> are for wall impact
// * <damagewalltile> is passed to A_DamageWall()
// * <flags> is for decals upon wall impact:
//    1: handle random decal size (tile <atwith>)
//    2: set cstat to wall-aligned + random x/y flip
//
// TODO: maybe split into 3 cases (hit neither wall nor sprite, hit sprite, hit wall)?
function /*int32_t */P_PostFireHitscan(/*int32_t */p:number, /*int32_t */k:number, /*hitdata_t */hit:hitdata_t, /*int32_t */i:number, /*int32_t */atwith:number, /*int32_t */zvel:number,
                                 /*int32_t */spawnatimpacttile:number, /*int32_t */decaltile:number, /*int32_t */damagewalltile:number,
                                 /*int32_t */flags:number)
{
    if (hit.wall == -1 && hit.sprite == -1)
    {
        if (zvel < 0)
        {
            if (sector[hit.sect].ceilingstat&1)
            {
                sprite[k].xrepeat = 0;
                sprite[k].yrepeat = 0;
                return -1;
            }
            else
                Sect_DamageCeiling(hit.sect);
        }

        Proj_MaybeSpawn(k, spawnatimpacttile, hit);
    }
    else if (hit.sprite >= 0)
    {
        A_DamageObject(hit.sprite, k);

        if (sprite[hit.sprite].picnum == APLAYER &&
            (ud.ffire == 1 || (!GTFLAGS(GAMETYPE_PLAYERSFRIENDLY) && GTFLAGS(GAMETYPE_TDM) &&
                               g_player[sprite[hit.sprite].yvel].ps.team != g_player[sprite[i].yvel].ps.team)))
        {
            var/*int32_t */l = A_Spawn(k, JIBS6);
            sprite[k].xrepeat = sprite[k].yrepeat = 0;
            sprite[l].z += (4<<8);
            sprite[l].xvel = 16;
            sprite[l].xrepeat = sprite[l].yrepeat = 24;
            sprite[l].ang += 64-(krand()&127);
        }
        else
        {
            Proj_MaybeSpawn(k, spawnatimpacttile, hit);
        }

        if (p >= 0 && CheckShootSwitchTile(sprite[hit.sprite].picnum))
        {
            P_ActivateSwitch(p, hit.sprite, 1);
            return -1;
        }
    }
    else if (hit.wall >= 0)
    {
        SKIPBULLETHOLE:
        for(;;) {
            var hitwal = wall[hit.wall];

            Proj_MaybeSpawn(k, spawnatimpacttile, hit);

            if (CheckDoorTile(hitwal.picnum) == 1)
                break SKIPBULLETHOLE;

            if (p >= 0 && CheckShootSwitchTile(hitwal.picnum))
            {
                P_ActivateSwitch(p, hit.wall, 0);
                return -1;
            }

            if (hitwal.hitag != 0 || (hitwal.nextwall >= 0 && wall[hitwal.nextwall].hitag != 0))
                break SKIPBULLETHOLE;

            if (hit.sect >= 0 && sector[hit.sect].lotag == 0)
                if (hitwal.overpicnum != BIGFORCE && (hitwal.cstat&16) == 0)
                    if ((hitwal.nextsector >= 0 && sector[hitwal.nextsector].lotag == 0) ||
                        (hitwal.nextsector == -1 && sector[hit.sect].lotag == 0))
                    {
                        var/*int32_t */l:number;

                        if (SectorContainsSE13(hitwal.nextsector))
                            break SKIPBULLETHOLE;

                        for (l = headspritestat[STAT_MISC]; l >= 0; l = nextspritestat[l])
                            if (sprite[l].picnum == decaltile)
                                if (dist(sprite[l],sprite[k]) < (12+(krand()&7)))
                                    break SKIPBULLETHOLE;

                        if (decaltile >= 0)
                        {
                            l = A_Spawn(k, decaltile);

                            if (!A_CheckSpriteFlags(l, SPRITE_DECAL))
                                actor[l].flags |= SPRITE_DECAL;

                            sprite[l].xvel = -1;
                            sprite[l].ang = getangle(hitwal.x-wall[hitwal.point2].x,
                                                     hitwal.y-wall[hitwal.point2].y)+512;
                            if (flags&1)
                                Proj_DoRandDecalSize(l, atwith);

                            if (flags&2)
                                sprite[l].cstat = 16+(krand()&(8+4));

                            sprite[l].x -= sintable[(sprite[l].ang+2560)&2047]>>13;
                            sprite[l].y -= sintable[(sprite[l].ang+2048)&2047]>>13;

                            A_SetSprite(l, CLIPMASK0);

                            // BULLETHOLE already adds itself to the deletion queue in
                            // A_Spawn(). However, some other tiles do as well.
                            if (decaltile != BULLETHOLE)
                                A_AddToDeleteQueue(l);
                        }
                    }
            break;
        }
//SKIPBULLETHOLE:
        HandleHitWall(hit);

        A_DamageWall(k, hit.wall, hit.pos, damagewalltile);
    }

    return 0;
}

// Finish shooting hitscan weapon from actor (sprite <i>).
function /*int32_t */A_PostFireHitscan(hit:hitdata_t,/* int32_t */i:number, /*int32_t */atwith:number, /*int32_t */sa:number, /*int32_t */extra:number,
                                 /*int32_t */spawnatimpacttile:number, /*int32_t */damagewalltile:number):number
{
    var /*int32_t */k = Proj_InsertShotspark(hit, i, atwith, 24, sa, extra);

    if (hit.sprite >= 0)
    {
        A_DamageObject(hit.sprite, k);

        if (sprite[hit.sprite].picnum != APLAYER)
            Proj_MaybeSpawn(k, spawnatimpacttile, hit);
        else
            sprite[k].xrepeat = sprite[k].yrepeat = 0;
    }
    else if (hit.wall >= 0)
        A_DamageWall(k, hit.wall, hit.pos, damagewalltile);

    return k;
}

// Common "spawn blood?" predicate.
// minzdiff: minimal "step" height for blood to be spawned
function /*int32_t */Proj_CheckBlood(srcvect:vec3_t, hit:hitdata_t,
                               /*int32_t */projrange:number, /*int32_t */minzdiff:number):number
{
    if (hit.wall >= 0 && hit.sect >= 0)
    {
        var hitwal = wall[hit.wall];

        if (FindDistance2D(srcvect.x-hit.pos.x, srcvect.y-hit.pos.y) < projrange)
            if (hitwal.overpicnum != BIGFORCE && (hitwal.cstat&16) == 0)
                if (sector[hit.sect].lotag == 0)
                    if (hitwal.nextsector < 0 ||
                        (sector[hitwal.nextsector].lotag == 0 && sector[hit.sect].lotag == 0 &&
                         sector[hit.sect].floorz-sector[hitwal.nextsector].floorz > minzdiff))
                    return 1;
    }

    return 0;
}

function Proj_HandleKnee(hit:hitdata_t, /*int32_t */i:number, /*int32_t */p:number, /*int32_t */atwith:number, /*int32_t */sa:number,
                            proj:projectile_t, /*int32_t */inserttile:number,
                            /*int32_t */addrandextra:number, /*int32_t*/ spawnatimpacttile:number, /*int32_t */soundnum:number):void
{
    var ps = p >= 0 ? g_player[p].ps : NULL;

    var/*int32_t */j = A_InsertSprite(hit.sect,hit.pos.x,hit.pos.y,hit.pos.z,
                               inserttile,-15,0,0,sa,32,0,i,4);

    if (proj != NULL)
    {
        // Custom projectiles.
        SpriteProjectile[j].workslike = ProjectileData[sprite[j].picnum].workslike;
        sprite[j].extra = proj.extra;
    }

    if (addrandextra > 0)
        sprite[j].extra += (krand()&addrandextra);

    if (p >= 0)
    {
        if (spawnatimpacttile >= 0)
        {
            var /*int32_t */k = A_Spawn(j, spawnatimpacttile);
            sprite[k].z -= (8<<8);
            A_SetHitData(k, hit);
        }

        if (soundnum >= 0)
            A_PlaySound(soundnum, j);
    }

    if (p >= 0 && ps.inv_amount[GET_STEROIDS] > 0 && ps.inv_amount[GET_STEROIDS] < 400)
        sprite[j].extra += (ps.max_player_health>>2);

    if (hit.sprite >= 0 && sprite[hit.sprite].picnum != ACCESSSWITCH && sprite[hit.sprite].picnum != ACCESSSWITCH2)
    {
        A_DamageObject(hit.sprite, j);
        if (p >= 0)
            P_ActivateSwitch(p, hit.sprite,1);
    }
    else if (hit.wall >= 0)
    {
        HandleHitWall(hit);

        if (wall[hit.wall].picnum != ACCESSSWITCH && wall[hit.wall].picnum != ACCESSSWITCH2)
        {
            A_DamageWall(j, hit.wall, hit.pos, atwith);
            if (p >= 0)
                P_ActivateSwitch(p, hit.wall,0);
        }
    }
}

//#define MinibossScale(s) (((s)*sprite[i].yrepeat)/80)
function /*int32_t */A_ShootWithZvel(/*int32_t*/ i:number, /*int32_t */atwith:number, /*int32_t */override_zvel:number):number
{
    var /*int16_t */sa:number;
    var/*int32_t */j:number, k=-1, l:number;
    var/*int32_t */vel:number, zvel:number = 0;
    var hit = new hitdata_t() ;
    var srcvect = new vec3_t ();
    var s = sprite[i];
    var /*const int16_t */sect = s.sectnum;

    var/*int32_t */p = (s.picnum == APLAYER) ? s.yvel : -1;
    var ps = p >= 0 ? g_player[p].ps : NULL;

    if (override_zvel != SHOOT_HARDCODED_ZVEL)
    {
        g_overrideShootZvel = 1;
        g_shootZvel = override_zvel;
    }
    else
    {
        g_overrideShootZvel = 0;
    }

    if (s.picnum == APLAYER)
    {        
        srcvect.copyFrom(ps.pos); //Bmemcpy(&srcvect,ps,sizeof(vec3_t));
        srcvect.z += ps.pyoff+(4<<8);
        sa = ps.ang;

        ps.crack_time = 777;
    }
    else
    {
        sa = s.ang;
        //Bmemcpy(&srcvect,s,sizeof(vec3_t));
        srcvect.x = s.x;
        srcvect.y = s.y;
        srcvect.z -= (((s.yrepeat*tilesizy[s.picnum])<<1)-(4<<8));

        if (s.picnum != ROTATEGUN)
        {
            srcvect.z -= (7<<8);

            if (A_CheckEnemySprite(s) && sprite[i].picnum != COMMANDER)
            {
                srcvect.x += (sintable[(sa+1024+96)&2047]>>7);
                srcvect.y += (sintable[(sa+512+96)&2047]>>7);
            }
        }

//#ifdef POLYMER
        if (atwith >= 0)
            switch (DYNAMICTILEMAP(atwith))
            {
            case FIRELASER__STATIC:
            case SHOTGUN__STATIC:
            case SHOTSPARK1__STATIC:
            case CHAINGUN__STATIC:
            case RPG__STATIC:
            case MORTER__STATIC:
            {
                var/*int32_t */x = (sintable[(s.ang+512)&2047])>>7, y = (sintable[(s.ang)&2047])>>7;
                s. x += x;
                s. y += y;
                G_AddGameLight(0, i, PHEIGHT, 8192, 255+(95<<8),PR_LIGHT_PRIO_MAX_GAME);
                actor[i].lightcount = 2;
                s. x -= x;
                s. y -= y;
            }

            break;
            }
//#endif // POLYMER
    }

    if (A_CheckSpriteTileFlags(atwith, SPRITE_PROJECTILE))
    {
        /* Custom projectiles */
        var proj = ProjectileData[atwith];//projectile_t *const proj = (Bassert(atwith >= 0), &ProjectileData[atwith]);

//#ifdef POLYMER
        if (proj.flashcolor)
        {
            var/*int32_t */x = (sintable[(s.ang+512)&2047])>>7, y = (sintable[(s.ang)&2047])>>7;

            s. x += x;
            s. y += y;
            G_AddGameLight(0, i, PHEIGHT, 8192, proj.flashcolor,PR_LIGHT_PRIO_MAX_GAME);
            actor[i].lightcount = 2;
            s. x -= x;
            s. y -= y;
        }
//#endif // POLYMER

        if (proj.offset == 0)
            proj.offset = 1;

        if (proj.workslike & PROJECTILE_BLOOD || proj.workslike & PROJECTILE_KNEE)
        {
            if (proj.workslike & PROJECTILE_BLOOD)
            {
                sa += 64 - (krand()&127);
                if (p < 0) sa += 1024;
                zvel = 1024-(krand()&2047);
            }

            if (proj.workslike & PROJECTILE_KNEE)
            {
                if (p >= 0)
                {
                    zvel = (100-ps.horiz-ps.horizoff)<<5;
                    srcvect.z += (6<<8);
                    sa += 15;
                }
                else if (!(proj.workslike & PROJECTILE_NOAIM))
                {
                    var/*int32_t */x:number;
                    var $x = new R(x);
                    j = g_player[A_FindPlayer(s,$x)].ps.i;
                    x = $x.$;
                    zvel = int32(((sprite[j].z-srcvect.z)<<8) / (x+1));
                    sa = getangle(sprite[j].x-srcvect.x,sprite[j].y-srcvect.y);
                }
            }

            Proj_DoHitscan(i, 0, srcvect, zvel, sa, hit);

            if (proj.workslike & PROJECTILE_BLOOD)
            {
                if (proj.range == 0)
                    proj.range = 1024;

                if (Proj_CheckBlood(srcvect, hit, proj.range,
                                    mulscale3(proj.yrepeat, tilesizy[proj.decal])<<8))
                {
                    var hitwal = wall[hit.wall];

                    if (FindDistance2D(hitwal.x-wall[hitwal.point2].x, hitwal.y-wall[hitwal.point2].y) >
                        (mulscale3(proj.xrepeat+8, tilesizx[proj.decal])))
                    {
                        if (SectorContainsSE13(hitwal.nextsector))
                            return -1;

                        if (hitwal.nextwall >= 0 && wall[hitwal.nextwall].hitag != 0)
                            return -1;

                        if (hitwal.hitag == 0)
                        {
                            if (proj.decal >= 0)
                            {
                                k = A_Spawn(i,proj.decal);

                                if (!A_CheckSpriteFlags(k, SPRITE_DECAL))
                                    actor[k].flags |= SPRITE_DECAL;

                                sprite[k].xvel = -1;
                                sprite[k].ang = getangle(hitwal.x-wall[hitwal.point2].x,
                                                         hitwal.y-wall[hitwal.point2].y)+512;
                                //Bmemcpy(&sprite[k], &hit.pos, sizeof(vec3_t));
                                sprite[k].x = hit.pos.x;
                                sprite[k].y = hit.pos.y;
                                sprite[k].z = hit.pos.z;

                                Proj_DoRandDecalSize(k, atwith);

                                sprite[k].z += sprite[k].yrepeat<<8;

//                                sprite[k].cstat = 16+(krand()&12);
                                sprite[k].cstat = 16;
                                if (krand()&1)
                                    sprite[k].cstat |= 4;
                                if (krand()&1)
                                    sprite[k].cstat |= 8;

                                sprite[k].shade = sector[sprite[k].sectnum].floorshade;

                                sprite[k].x -= sintable[(sprite[k].ang+2560)&2047]>>13;
                                sprite[k].y -= sintable[(sprite[k].ang+2048)&2047]>>13;

                                A_SetSprite(k,CLIPMASK0);
                                A_AddToDeleteQueue(k);
                                changespritestat(k,5);
                            }
                        }
                    }
                }

                return -1;
            }

            if (hit.sect < 0) return -1;

            if (proj.range == 0 && (proj.workslike & PROJECTILE_KNEE))
                proj.range = 1024;

            if (proj.range > 0 && klabs(srcvect.x-hit.pos.x)+klabs(srcvect.y-hit.pos.y) > proj.range)
                return -1;

            Proj_HandleKnee(hit, i, p, atwith, sa,
                            proj, atwith,
                            proj.extra_rand,
                            proj.spawns, proj.sound);
            return -1;
        }

        if (proj.workslike & PROJECTILE_HITSCAN)
        {
            if (s.extra >= 0) s.shade = proj.shade;

            var $zvel = new R(zvel);
            var $sa = new R(sa);
            if (p >= 0)
                P_PreFireHitscan(i, p, atwith, srcvect, $zvel, $sa,
                              proj.workslike & PROJECTILE_ACCURATE_AUTOAIM,
                              !(proj.workslike & PROJECTILE_ACCURATE)?1:0);
            else
                A_PreFireHitscan(s, srcvect, $zvel, $sa,
                                 !(proj.workslike & PROJECTILE_ACCURATE)?1:0);

            zvel = $zvel.$;
            sa = $sa.$;

            if (Proj_DoHitscan(i, (proj.cstat >= 0) ? proj.cstat : 256+1,
                               srcvect, zvel, sa, hit))
                return -1;

            if (proj.range > 0 && klabs(srcvect.x-hit.pos.x)+klabs(srcvect.y-hit.pos.y) > proj.range)
                return -1;

            if (proj.trail >= 0)
                A_HitscanProjTrail(srcvect,hit.pos,sa,atwith);

            if (proj.workslike & PROJECTILE_WATERBUBBLES)
            {
                if ((krand()&15) == 0 && sector[hit.sect].lotag == ST_2_UNDERWATER)
                    A_DoWaterTracers(hit.pos.x,hit.pos.y,hit.pos.z,
                                     srcvect.x,srcvect.y,srcvect.z,8-(ud.multimode>>1));
            }

            if (p >= 0)
            {
                k = Proj_InsertShotspark(hit, i, atwith, 10, sa, Proj_GetExtra(atwith));

                if (P_PostFireHitscan(p, k, hit, i, atwith, zvel,
                                      atwith, proj.decal, atwith, 1+2) < 0)
                    return -1;
            }
            else
            {
                k = A_PostFireHitscan(hit, i, atwith, sa, Proj_GetExtra(atwith),
                                      atwith, atwith);
            }

            if ((krand()&255) < 4 && proj.isound >= 0)
                S_PlaySound3D(proj.isound, k, hit.pos);

            return -1;
        }

        if (proj.workslike & PROJECTILE_RPG)
        {
            if (s.extra >= 0) s.shade = proj.shade;

            vel = proj.vel;

            j = -1;

            if (p >= 0)
            {
                var $zvel = new R(zvel);
                var $sa = new R(sa);
                j = GetAutoAimAngle(i, p, atwith, 8<<8, 0+2, srcvect, vel, $zvel, $sa);
                zvel = $zvel.$;
                sa = $sa.$;

                if (j < 0)
                    zvel = (100-ps.horiz-ps.horizoff)*(proj.vel/8);

                if (proj.sound >= 0)
                    A_PlaySound(proj.sound,i);
            }
            else
            {
                if (!(proj.workslike & PROJECTILE_NOAIM))
                {
                    j = A_FindPlayer(s, NULL);
                    sa = getangle(g_player[j].ps.opos.x-srcvect.x,g_player[j].ps.opos.y-srcvect.y);

                    l = safeldist(g_player[j].ps.i, s);
                    zvel = ((g_player[j].ps.opos.z-srcvect.z)*vel) / l;

                    if (A_CheckEnemySprite(s) && (s.hitag&face_player_smart))
                        sa = s.ang+(krand()&31)-16;
                }
            }

            if (p >= 0 && j >= 0)
                l = j;
            else l = -1;

            if (numplayers > 1 && g_netClient) return -1;

            zvel = A_GetShootZvel(zvel);
            j = A_InsertSprite(sect,
                               srcvect.x+int32(sintable[(348+sa+512)&2047]/proj.offset),
                               srcvect.y+int32(sintable[(sa+348)&2047]/proj.offset),
                               srcvect.z-(1<<8),atwith,0,14,14,sa,vel,zvel,i,4);

            sprite[j].xrepeat=proj.xrepeat;
            sprite[j].yrepeat=proj.yrepeat;

            if (proj.extra_rand > 0)
                sprite[j].extra += (krand()&proj.extra_rand);
            if (!(proj.workslike & PROJECTILE_BOUNCESOFFWALLS))
                sprite[j].yvel = l;
            else
            {
                if (proj.bounces >= 1) sprite[j].yvel = proj.bounces;
                else sprite[j].yvel = g_numFreezeBounces;
                sprite[j].zvel -= (2<<4);
            }

            if (proj.cstat >= 0) sprite[j].cstat = proj.cstat;
            else sprite[j].cstat = 128;
            if (proj.clipdist != 255) sprite[j].clipdist = proj.clipdist;
            else sprite[j].clipdist = 40;

            {
                var/*int32_t */picnum = sprite[j].picnum;
                ProjectileData[picnum].copyToSpriteProjectile[j]();//Bmemcpy(&SpriteProjectile[j], &ProjectileData[picnum], sizeof(projectile_t));
            }

            return j;
        }

    }
    else if (atwith >= 0)
    {
        switch (DYNAMICTILEMAP(atwith))
        {
        case BLOODSPLAT1__STATIC:
        case BLOODSPLAT2__STATIC:
        case BLOODSPLAT3__STATIC:
        case BLOODSPLAT4__STATIC:
            sa += 64 - (krand()&127);
            if (p < 0) sa += 1024;
            zvel = 1024-(krand()&2047);
            // fall-through
        case KNEE__STATIC:
            if (atwith == KNEE)
            {
                if (p >= 0)
                {
                    zvel = (100-ps.horiz-ps.horizoff)<<5;
                    srcvect.z += (6<<8);
                    sa += 15;
                }
                else
                {
                    var/*int32_t */x:number;
                    var $x = new R(x);
                    j = g_player[A_FindPlayer(s,$x)].ps.i;
                    x = $x.$;
                    zvel = int32(((sprite[j].z-srcvect.z)<<8) / (x+1));
                    sa = getangle(sprite[j].x-srcvect.x,sprite[j].y-srcvect.y);
                }
            }

            Proj_DoHitscan(i, 0, srcvect, zvel, sa, hit);

            if (atwith >= BLOODSPLAT1 && atwith <= BLOODSPLAT4)
            {
                if (Proj_CheckBlood(srcvect, hit, 1024, 16<<8))
                {
                    var hitwal = wall[hit.wall];

                    if (SectorContainsSE13(hitwal.nextsector))
                        return -1;

                    if (hitwal.nextwall >= 0 && wall[hitwal.nextwall].hitag != 0)
                        return -1;

                    if (hitwal.hitag == 0)
                    {
                        k = A_Spawn(i,atwith);
                        sprite[k].xvel = -12;
                        sprite[k].ang = getangle(hitwal.x-wall[hitwal.point2].x,
                                                 hitwal.y-wall[hitwal.point2].y)+512;
                        //Bmemcpy(&sprite[k], &hit.pos, sizeof(vec3_t));
                        sprite[k].x = hit.pos.x;
                        sprite[k].y = hit.pos.y;
                        sprite[k].z = hit.pos.z;

                        sprite[k].cstat |= (krand()&4);
                        A_SetSprite(k,CLIPMASK0);
                        setsprite(k, /*(vec3_t *)&*/sprite[k]);
                        if (sprite[i].picnum == OOZFILTER || sprite[i].picnum == NEWBEAST)
                            sprite[k].pal = 6;
                    }
                }

                return -1;
            }

            if (hit.sect < 0) break;

            if (klabs(srcvect.x-hit.pos.x)+klabs(srcvect.y-hit.pos.y) < 1024)
                Proj_HandleKnee(hit, i, p, atwith, sa,
                                NULL, KNEE, 7, SMALLSMOKE, KICK_HIT);
            break;

        case SHOTSPARK1__STATIC:
        case SHOTGUN__STATIC:
        case CHAINGUN__STATIC:
            if (s.extra >= 0) s.shade = -96;

            var $zvel = new R(zvel);
            var $sa = new R(sa);
            if (p >= 0) 
                P_PreFireHitscan(i, p, atwith, srcvect, $zvel, $sa,
                                 atwith == SHOTSPARK1__STATIC && !window.WW2GI && !window.NAM?1:0,
                                 1);
            else
                A_PreFireHitscan(s, srcvect, $zvel, $sa, 1);

            zvel = $zvel.$;
            sa = $sa.$;

            if (Proj_DoHitscan(i, 256+1, srcvect, zvel, sa, hit))
                return -1;

            if ((krand()&15) == 0 && sector[hit.sect].lotag == ST_2_UNDERWATER)
                A_DoWaterTracers(hit.pos.x,hit.pos.y,hit.pos.z,
                                 srcvect.x,srcvect.y,srcvect.z,8-(ud.multimode>>1));

            if (p >= 0)
            {
                k = Proj_InsertShotspark(hit, i, atwith, 10, sa,
                                         G_InitialActorStrength(atwith) + (krand()%6));

                if (P_PostFireHitscan(p, k, hit, i, atwith, zvel,
                                      -SMALLSMOKE, BULLETHOLE, SHOTSPARK1, 0) < 0)
                    return -1;
            }
            else
            {
                k = A_PostFireHitscan(hit, i, atwith, sa, G_InitialActorStrength(atwith),
                                      -SMALLSMOKE, SHOTSPARK1);
            }

            if ((krand()&255) < 4)
                S_PlaySound3D(PISTOL_RICOCHET, k, hit.pos);

            return -1;

        case FIRELASER__STATIC:
        case SPIT__STATIC:
        case COOLEXPLOSION1__STATIC:
        {
            var/*int32_t */tsiz:number;

            if (s.extra >= 0) s.shade = -96;

            if (atwith == SPIT) vel = 292;
            else
            {
                if (atwith == COOLEXPLOSION1)
                {
                    if (s.picnum == BOSS2) vel = 644;
                    else vel = 348;
                    srcvect.z -= (4<<7);
                }
                else
                {
                    vel = 840;
                    srcvect.z -= (4<<7);
                }
            }

            if (p >= 0)
            {
                var $zvel = new R(zvel);
                var $sa = new R(sa);
                j = GetAutoAimAngle(i, p, atwith, -(12<<8), 0, srcvect, vel, $zvel, $sa);
                zvel = $zvel.$;
                sa = $sa.$;

                if (j < 0)
                    zvel = (100-ps.horiz-ps.horizoff)*98;
            }
            else
            {
                j = A_FindPlayer(s, NULL);
                //                sa = getangle(g_player[j].ps.opos.x-sx,g_player[j].ps.opos.y-sy);
                sa += 16-(krand()&31);
                hit.pos.x = safeldist(g_player[j].ps.i, s);
                zvel = int32(((g_player[j].ps.opos.z - srcvect.z + (3<<8))*vel) / hit.pos.x);
            }

            zvel = A_GetShootZvel(zvel);

            if (atwith == SPIT)
            {
                tsiz = 18;
                srcvect.z -= (10<<8);
            }
            else if (p >= 0)
                tsiz = 7;
            else
            {
                if (atwith == FIRELASER)
                {
                    if (p >= 0)
                        tsiz = 34;
                    else
                        tsiz = 18;
                }
                else
                    tsiz = 18;
            }

            j = A_InsertSprite(sect,srcvect.x,srcvect.y,srcvect.z,
                               atwith,-127,tsiz,tsiz,sa,vel,zvel,i,4);
            sprite[j].extra += (krand()&7);

            if (atwith == COOLEXPLOSION1)
            {
                sprite[j].shade = 0;
                if (sprite[i].picnum == BOSS2)
                {
                    l = sprite[j].xvel;
                    sprite[j].xvel = MinibossScale(1024);
                    A_SetSprite(j,CLIPMASK0);
                    sprite[j].xvel = l;
                    sprite[j].ang += 128-(krand()&255);
                }
            }

            sprite[j].cstat = 128;
            sprite[j].clipdist = 4;

            sa = s.ang+32-(krand()&63);
            zvel += 512-(krand()&1023);

            return j;
        }

        case FREEZEBLAST__STATIC:
            srcvect.z += (3<<8);
        case RPG__STATIC:
            // XXX: "CODEDUP"
            if (s.extra >= 0) s.shade = -96;

            vel = 644;

            j = -1;

            if (p >= 0)
            {
                var $zvel = new R(zvel);
                var $sa = new R(sa);
                j = GetAutoAimAngle(i, p, atwith, 8<<8, 0+2, srcvect, vel, $zvel, $sa);
                zvel = $zvel.$;
                sa = $sa.$;

                if (j < 0)
                    zvel = (100-ps.horiz-ps.horizoff)*81;

                if (atwith == RPG)
                    A_PlaySound(RPG_SHOOT,i);
            }
            else
            {
                j = A_FindPlayer(s, NULL);
                sa = getangle(g_player[j].ps.opos.x-srcvect.x,g_player[j].ps.opos.y-srcvect.y);
                if (sprite[i].picnum == BOSS3)
                    srcvect.z -= MinibossScale(32<<8);
                else if (sprite[i].picnum == BOSS2)
                {
                    vel += 128;
                    srcvect.z += MinibossScale(24<<8);
                }

                l = safeldist(g_player[j].ps.i, s);
                zvel = ((g_player[j].ps.opos.z-srcvect.z)*vel) / l;

                if (A_CheckEnemySprite(s) && (s.hitag&face_player_smart))
                    sa = s.ang+(krand()&31)-16;
            }

            if (p >= 0 && j >= 0)
                l = j;
            else l = -1;

            if (numplayers > 1 && g_netClient) return -1;

            zvel = A_GetShootZvel(zvel);
            j = A_InsertSprite(sect,
                               srcvect.x+(sintable[(348+sa+512)&2047]/448),
                               srcvect.y+(sintable[(sa+348)&2047]/448),
                               srcvect.z-(1<<8),atwith,0,14,14,sa,vel,zvel,i,4);

            sprite[j].extra += (krand()&7);
            if (atwith != FREEZEBLAST)
                sprite[j].yvel = l;
            else
            {
                sprite[j].yvel = g_numFreezeBounces;
                sprite[j].xrepeat >>= 1;
                sprite[j].yrepeat >>= 1;
                sprite[j].zvel -= (2<<4);
            }

            if (p == -1)
            {
                if (sprite[i].picnum == BOSS3)
                {
                    if (krand()&1)
                    {
                        sprite[j].x -= MinibossScale(sintable[sa&2047]>>6);
                        sprite[j].y -= MinibossScale(sintable[(sa+1024+512)&2047]>>6);
                        sprite[j].ang -= MinibossScale(8);
                    }
                    else
                    {
                        sprite[j].x += MinibossScale(sintable[sa&2047]>>6);
                        sprite[j].y += MinibossScale(sintable[(sa+1024+512)&2047]>>6);
                        sprite[j].ang += MinibossScale(4);
                    }
                    sprite[j].xrepeat = MinibossScale(42);
                    sprite[j].yrepeat = MinibossScale(42);
                }
                else if (sprite[i].picnum == BOSS2)
                {
                    sprite[j].x -= MinibossScale(sintable[sa&2047]/56);
                    sprite[j].y -= MinibossScale(sintable[(sa+1024+512)&2047]/56);
                    sprite[j].ang -= MinibossScale(8)+(krand()&255)-128;
                    sprite[j].xrepeat = 24;
                    sprite[j].yrepeat = 24;
                }
                else if (atwith != FREEZEBLAST)
                {
                    sprite[j].xrepeat = 30;
                    sprite[j].yrepeat = 30;
                    sprite[j].extra >>= 2;
                }
            }

            else if (PWEAPON(0, g_player[p].ps.curr_weapon, WorksLike) == DEVISTATOR_WEAPON)
            {
                sprite[j].extra >>= 2;
                sprite[j].ang += 16-(krand()&31);
                sprite[j].zvel += 256-(krand()&511);

                if (g_player[p].ps.hbomb_hold_delay)
                {
                    sprite[j].x -= sintable[sa&2047]/644;
                    sprite[j].y -= sintable[(sa+1024+512)&2047]/644;
                }
                else
                {
                    sprite[j].x += sintable[sa&2047]>>8;
                    sprite[j].y += sintable[(sa+1024+512)&2047]>>8;
                }
                sprite[j].xrepeat >>= 1;
                sprite[j].yrepeat >>= 1;
            }

            sprite[j].cstat = 128;
            if (atwith == RPG)
                sprite[j].clipdist = 4;
            else
                sprite[j].clipdist = 40;

            return j;

        case HANDHOLDINGLASER__STATIC:
        {
            var/*int32_t */zoff = (p>=0) ? g_player[p].ps.pyoff : 0;
            if (p >= 0)
                zvel = (100-ps.horiz-ps.horizoff)*32;
            else zvel = 0;

            srcvect.z -= zoff;
            Proj_DoHitscan(i, 0, srcvect, zvel, sa, hit);
            srcvect.z += zoff;

            j = 0;
            if (hit.sprite >= 0) break;

            if (hit.wall >= 0 && hit.sect >= 0)
                if (((hit.pos.x-srcvect.x)*(hit.pos.x-srcvect.x)+(hit.pos.y-srcvect.y)*(hit.pos.y-srcvect.y)) < (290*290))
                {
                    // ST_2_UNDERWATER
                    if (wall[hit.wall].nextsector >= 0)
                    {
                        if (sector[wall[hit.wall].nextsector].lotag <= 2 && sector[hit.sect].lotag <= 2)
                            j = 1;
                    }
                    else if (sector[hit.sect].lotag <= 2)
                        j = 1;
                }

            if (j == 1)
            {
                var/*int32_t */lTripBombControl = (p < 0) ? 0 :
//#ifdef LUNATIC
//                    g_player[p].ps.tripbombControl;
//#else
                    Gv_GetVarByLabel("TRIPBOMB_CONTROL", TRIPBOMB_TRIPWIRE, g_player[p].ps.i, p);
//#endif
                k = A_InsertSprite(hit.sect,hit.pos.x,hit.pos.y,hit.pos.z,TRIPBOMB,-16,4,5,sa,0,0,i,6);
                if (lTripBombControl & TRIPBOMB_TIMER)
                {
//#ifdef LUNATIC
//                    var/*int32_t */lLifetime = g_player[p].ps.tripbombLifetime;
//                    var/*int32_t */lLifetimeVar = g_player[p].ps.tripbombLifetimeVar;
//#else
                    var/*int32_t */lLifetime=Gv_GetVarByLabel("STICKYBOMB_LIFETIME", NAM_GRENADE_LIFETIME, g_player[p].ps.i, p);
                    var/*int32_t */lLifetimeVar=Gv_GetVarByLabel("STICKYBOMB_LIFETIME_VAR", NAM_GRENADE_LIFETIME_VAR, g_player[p].ps.i, p);
//#endif
                    // set timer.  blows up when at zero....
                    actor[k].t_data[7]=lLifetime
                                       + mulscale(krand(),lLifetimeVar, 14)
                                       - lLifetimeVar;
                    actor[k].t_data[6]=1;
                }
                else
                    sprite[k].hitag = k;

                A_PlaySound(LASERTRIP_ONWALL,k);
                sprite[k].xvel = -20;
                A_SetSprite(k,CLIPMASK0);
                sprite[k].cstat = 16;

                {
                    var/*int32_t */p2 = wall[hit.wall].point2;
                    var/*int32_t */a = getangle(wall[hit.wall].x-wall[p2].x, wall[hit.wall].y-wall[p2].y)-512;
                    actor[k].t_data[5] = sprite[k].ang = a;
                }
            }
            return j?k:-1;
        }

        case BOUNCEMINE__STATIC:
        case MORTER__STATIC:
        {
            var/*int32_t */x;

            if (s.extra >= 0) s.shade = -96;

            j = g_player[A_FindPlayer(s, NULL)].ps.i;
            x = ldist(sprite[j],s);

            zvel = -x>>1;

            if (zvel < -4096)
                zvel = -2048;
            vel = x>>4;

            zvel = A_GetShootZvel(zvel);
            A_InsertSprite(sect,
                           srcvect.x+(sintable[(512+sa+512)&2047]>>8),
                           srcvect.y+(sintable[(sa+512)&2047]>>8),
                           srcvect.z+(6<<8),atwith,-64,32,32,sa,vel,zvel,i,1);
            break;
        }

        case GROWSPARK__STATIC:
            todoThrow();
            //if (p >= 0)
            //{
                var $zvel = new R(zvel);
                var $sa = new R(sa);
            //    j = GetAutoAimAngle(i, p, atwith, 5<<8, 0+1, &srcvect, 256, &zvel, &sa);
                zvel = $zvel.$;
                sa = $sa.$;

            //    if (j < 0)
            //    {
            //        sa += 16-(krand()&31);
            //        zvel = (100-ps.horiz-ps.horizoff)<<5;
            //        zvel += 128-(krand()&255);
            //    }

            //    srcvect.z -= (2<<8);
            //}
            //else
            //{
            //    j = A_FindPlayer(s, NULL);
            //    srcvect.z -= (4<<8);
            //    hit.pos.x = safeldist(g_player[j].ps.i, s);
            //    zvel = ((g_player[j].ps.pos.z-srcvect.z) <<8) / hit.pos.x;
            //    zvel += 128-(krand()&255);
            //    sa += 32-(krand()&63);
            //}

            //k = 0;

            ////            RESHOOTGROW:
            //if (sect < 0) break;

            //Proj_DoHitscan(i, 256+1, &srcvect, zvel, sa, &hit);

            //j = A_InsertSprite(sect,hit.pos.x,hit.pos.y,hit.pos.z,GROWSPARK,-16,28,28,sa,0,0,i,1);

            //sprite[j].pal = 2;
            //sprite[j].cstat |= 130;
            //sprite[j].xrepeat = sprite[j].yrepeat = 1;

            //if (hit.wall == -1 && hit.sprite == -1 && hit.sect >= 0)
            //{
            //    if (zvel < 0 && (sector[hit.sect].ceilingstat&1) == 0)
            //        Sect_DamageCeiling(hit.sect);
            //}
            //else if (hit.sprite >= 0) A_DamageObject(hit.sprite,j);
            //else if (hit.wall >= 0 && wall[hit.wall].picnum != ACCESSSWITCH && wall[hit.wall].picnum != ACCESSSWITCH2)
            //{
            //    /*    if(wall[hit.wall].overpicnum == MIRROR && k == 0)
            //    {
            //    l = getangle(
            //    wall[wall[hit.wall].point2].x-wall[hit.wall].x,
            //    wall[wall[hit.wall].point2].y-wall[hit.wall].y);

            //    sx = hit.pos.x;
            //    sy = hit.pos.y;
            //    srcvect.z = hit.pos.z;
            //    sect = hit.sect;
            //    sa = ((l<<1) - sa)&2047;
            //    sx += sintable[(sa+512)&2047]>>12;
            //    sy += sintable[sa&2047]>>12;

            //    k++;
            //    goto RESHOOTGROW;
            //    }
            //    else */
            //    A_DamageWall(j,hit.wall,&hit.pos,atwith);
            //}

            break;

        case SHRINKER__STATIC:
            if (s.extra >= 0) s.shade = -96;
            if (p >= 0)
            {
                var $zvel = new R(zvel);
                var $sa = new R(sa);
                j = GetAutoAimAngle(i, p, atwith, 4<<8, 0, srcvect, 768, $zvel, $sa);
                zvel = $zvel.$;
                sa = $sa.$;

                if (j < 0)
                    zvel = (100-ps.horiz-ps.horizoff)*98;
            }
            else if (s.statnum != STAT_EFFECTOR)
            {
                j = A_FindPlayer(s, NULL);
                l = safeldist(g_player[j].ps.i, s);
                zvel = ((g_player[j].ps.opos.z-srcvect.z)*512) / l ;
            }
            else zvel = 0;

            zvel = A_GetShootZvel(zvel);
            j = A_InsertSprite(sect,
                               srcvect.x+(sintable[(512+sa+512)&2047]>>12),
                               srcvect.y+(sintable[(sa+512)&2047]>>12),
                               srcvect.z+(2<<8),SHRINKSPARK,-16,28,28,sa,768,zvel,i,4);

            sprite[j].cstat = 128;
            sprite[j].clipdist = 32;

            return j;
        }
    }

    return -1;
}


//////////////////// HUD WEAPON / MISC. DISPLAY CODE ////////////////////

function P_DisplaySpit(/*int32_t */snum:number): void
{
    var /*int32_t */i:number, a:number, x:number, y:number, z:number;
    var ps = g_player[snum].ps;

    if (ps.loogcnt == 0)
        return;

    y = (ps.loogcnt<<2);

    for (i=0; i<ps.numloogs; i++)
    {
        a = klabs(sintable[((ps.loogcnt+i)<<5)&2047])>>5;
        z = 4096+((ps.loogcnt+i)<<9);
        x = (-g_player[snum].sync.avel)+(sintable[((ps.loogcnt+i)<<6)&2047]>>10);

        rotatesprite_fs(
            (ps.loogiex[i]+x)<<16,(200+ps.loogiey[i]-y)<<16,z-(i<<8),256-a,
            LOOGIE,0,0,2);
    }
}

function /*int32_t */P_GetHudPal(p:DukePlayer_t)
{
    if (sprite[p.i].pal == 1)
        return 1;

    if (p.cursectnum >= 0)
    {
        var/*int32_t */dapal = sector[p.cursectnum].floorpal;
        if (!g_noFloorPal[dapal])
            return dapal;
    }

    return 0;
}

function /*int32_t */P_DisplayFist(/*int32_t */gs:number,/*int32_t */snum:number)
{
    var /*int32_t */looking_arc:number,fisti:number,fistpal:number;
    var /*int32_t */fistzoom:number, fistz:number;

    var/*int32_t */wx = new Int32Array([windowx1, windowx2]);

    var ps = g_player[snum].ps;

    fisti = ps.fist_incs;
    if (fisti > 32) fisti = 32;
    if (fisti <= 0) return 0;

    looking_arc = klabs(ps.look_ang)/9;

    fistzoom = 65536 - (sintable[(512+(fisti<<6))&2047]<<2);
    fistzoom = clamp(fistzoom, 40920, 90612);

    fistz = 194 + (sintable[((6+fisti)<<7)&2047]>>9);

    fistpal = P_GetHudPal(ps);

    // XXX: this is outdated, doesn't handle above/below split.
    if (g_fakeMultiMode==2)
        wx[(g_snum==0)?1:0] = (wx[0]+wx[1])/2+1;

    rotatesprite(
        (-fisti+222+(g_player[snum].sync.avel>>4))<<16,
        (looking_arc+fistz)<<16,
        fistzoom,0,FIST,gs,fistpal,2,
        wx[0],windowy1,wx[1],windowy2);

    return 1;
}


var DRAWEAP_CENTER=262144;

function /*int32_t */weapsc(/*int32_t */sc:number):number
{
    return scale(sc, ud.weaponscale, 100);
}

var /*int32_t */g_dts_yadd:number = 0;

function G_DrawTileScaled(/*int32_t*/ x:number, /*int32_t */y:number, /*int32_t */tilenum:number, /*int32_t */shade:number, /*int32_t */orientation:number, /*int32_t */p:number):void
{
    var /*int32_t*/ ang = 0;
    var /*int32_t*/ xoff = 192;

    var /*int32_t*/ wx = new Int32Array([windowx1, windowx2]);
    var /*int32_t*/ wy = new Int32Array([windowy1, windowy2]);
    var /*int32_t*/ yofs = 0;

    switch (hudweap.cur)
    {
    case DEVISTATOR_WEAPON:
    case TRIPBOMB_WEAPON:
        xoff = 160;
        break;
    default:
        if (orientation & DRAWEAP_CENTER)
        {
            xoff = 160;
            orientation &= ~DRAWEAP_CENTER;
        }
        break;
    }

    // bit 4 means "flip x" for G_DrawTileScaled
    if (orientation&4)
        ang = 1024;

    if (g_fakeMultiMode==2)
    {
        var /*const int32_t */sidebyside = (ud.screen_size!=0)?1:0;

        // splitscreen HACK
        orientation &= ~(1024|512|256);
        if (sidebyside)
        {
            orientation &= ~8;
            wx[(g_snum==0)?1:0] = (wx[0]+wx[1])/2 + 2;
        }
        else
        {
            orientation |= 8;
            if (g_snum==0)
                yofs = -(100<<16);
            wy[(g_snum==0)?1:0] = (wy[0]+wy[1])/2 + 2;
        }
    }

//#ifdef USE_OPENGL
    if (getrendermode() >= REND_POLYMOST && usemodels && md_tilehasmodel(tilenum,p) >= 0)
        y += (224-weapsc(224));
//#endif
    rotatesprite(weapsc(x<<16) + ((xoff-weapsc(xoff))<<16),
                 weapsc((y<<16) + g_dts_yadd) + ((200-weapsc(200))<<16) + yofs,
                 weapsc(65536),ang,tilenum,shade,p,(2|orientation),
                 wx[0],wy[0], wx[1],wy[1]);
}

function  G_DrawWeaponTile(/*int32_t*/ x:number, /*int32_t */y:number, /*int32_t */tilenum:number, /*int32_t */shade:number,
                             /*int32_t */orientation:number, /*int32_t */p:number, /*uint8_t */slot:number):void
{
    var /* int32_t */shadef = new Int32Array(2), palf = new Int32Array(2);

    // sanity checking the slot value
    if (slot > 1)
        slot = 1;

    // basic fading between player weapon shades
    if (shadef[slot] != shade && (!p || palf[slot] == p))
    {
        shadef[slot] += (shade-shadef[slot])>>2;

        if (!((shade-shadef[slot])>>2))
        {
            shadef[slot] += (shade-shadef[slot])>>1;
            if (!((shade-shadef[slot])>>1))
                shadef[slot] = shade;
        }
    }
    else
        shadef[slot] = shade;

    palf[slot] = p;

    switch (ud.drawweapon)
    {
    case 1:
//#ifdef USE_OPENGL
        if (getrendermode()>=REND_POLYMOST)
            if (tilenum >= CHAINGUN+1 && tilenum <= CHAINGUN+4)
                if (!usemodels || md_tilehasmodel(tilenum,p) < 0)
                {
                    // HACK: Draw the upper part of the chaingun two screen
                    // pixels (not texels; multiplied by weapon scale) lower
                    // first, preventing ugly horizontal seam.
                    g_dts_yadd = int32((65536*2*200)/ydim);
                    G_DrawTileScaled(x,y,tilenum,shadef[slot],orientation,p);
                    g_dts_yadd = 0;
                }
//#endif
        G_DrawTileScaled(x,y,tilenum,shadef[slot],orientation,p);
        return;

    case 2:
    {
        var ps = g_player[screenpeek].ps;
        var /*int32_t */sc = scale(65536,ud.statusbarscale,100);

        if (hudweap.cur < MAX_WEAPONS && hudweap.cur != KNEE_WEAPON)
            rotatesprite_win(160<<16,(180+(ps.weapon_pos*ps.weapon_pos))<<16,
                             sc,0,hudweap.cur==GROW_WEAPON?GROWSPRITEICON:WeaponPickupSprites[hudweap.cur],
                             0,0,2);
        return;
    }
    }
}

function ARRAY_SIZE(Ar:Int8Array):number {return Ar.length;}

function/* int32_t */P_DisplayKnee(/*int32_t*/ gs:number,/*int32_t */snum:number)
{
    var knee_y = new Int8Array([0,-8,-16,-32,-64,-84,-108,-108,-108,-72,-32,-8]);
    var /*int32_t */looking_arc:number, pal:number;

    var ps = g_player[snum].ps;

    if (ps.knee_incs == 0 || ps.knee_incs >= ARRAY_SIZE(knee_y) || sprite[ps.i].extra <= 0)
        return 0;

    looking_arc = knee_y[ps.knee_incs] + klabs(ps.look_ang)/9|0;

    looking_arc -= (ps.hard_landing<<3);

    pal = P_GetHudPal(ps);
    if (pal == 0)
        pal = ps.palookup;

    G_DrawTileScaled(105+(g_player[snum].sync.avel>>4)-(ps.look_ang>>1)+(knee_y[ps.knee_incs]>>2),
                     looking_arc+280-((ps.horiz-ps.horizoff)>>4),KNEE,gs,4+DRAWEAP_CENTER,pal);

    return 1;
}

function/* int32_t */P_DisplayKnuckles(/*int32_t*/ gs:number,/*int32_t */snum:number)
{
    var knuckle_frames = new Int8Array([0,1,2,2,3,3,3,2,2,1,0]);
    var/*int32_t */looking_arc:number, pal:number;

    var ps = g_player[snum].ps;

    if (ps.knuckle_incs == 0 || /*(unsigned)*/ (ps.knuckle_incs>>1) >= ARRAY_SIZE(knuckle_frames) || sprite[ps.i].extra <= 0)
        return 0;

    looking_arc = int32(klabs(ps.look_ang)/9);

    looking_arc -= (ps.hard_landing<<3);

    pal = P_GetHudPal(ps);

    G_DrawTileScaled(160+(g_player[snum].sync.avel>>4)-(ps.look_ang>>1),
                     looking_arc+180-((ps.horiz-ps.horizoff)>>4),
                     CRACKKNUCKLES+knuckle_frames[ps.knuckle_incs>>1],gs,4+DRAWEAP_CENTER,pal);

    return 1;
}

function P_SetWeaponGamevars(/*int32_t */snum:number, p:DukePlayer_t ):void
{
//#ifdef LUNATIC
    //UNREFERENCED_PARAMETER(snum);
    //UNREFERENCED_PARAMETER(p);
//#else
    Gv_SetVar(g_iWeaponVarID, p.curr_weapon, p.i, snum);
    Gv_SetVar(g_iWorksLikeVarID,
              (/*(unsigned)*/p.curr_weapon < MAX_WEAPONS) ? PWEAPON(snum, p.curr_weapon, WorksLike) : -1,
              p.i, snum);
//#endif
}


function P_FireWeapon(p:DukePlayer_t):void
{
    var /*int32_t */i:number, snum = sprite[p.i].yvel;

    if (VM_OnEvent(EVENT_DOFIRE, p.i, snum, -1, 0) == 0)
    {
        if (p.weapon_pos != 0) return;

        if (PWEAPON(snum, p.curr_weapon, WorksLike) != KNEE_WEAPON)
            p.ammo_amount[p.curr_weapon]--;

        if (PWEAPON(snum, p.curr_weapon, FireSound) > 0)
            A_PlaySound(PWEAPON(snum, p.curr_weapon, FireSound),p.i);

        P_SetWeaponGamevars(snum, p);
//        OSD_Printf("doing %d %d %d\n",PWEAPON(snum, p.curr_weapon, Shoots),p.curr_weapon,snum);
        A_Shoot(p.i,PWEAPON(snum, p.curr_weapon, Shoots));

        for (i=PWEAPON(snum, p.curr_weapon, ShotsPerBurst)-1; i > 0; i--)
        {
            if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_FIREEVERYOTHER)
            {
                // this makes the projectiles fire on a delay from player code
                actor[p.i].t_data[7] = (PWEAPON(snum, p.curr_weapon, ShotsPerBurst))<<1;
            }
            else
            {
                if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_AMMOPERSHOT &&
                        PWEAPON(snum, p.curr_weapon, WorksLike) != KNEE_WEAPON)
                {
                    if (p.ammo_amount[p.curr_weapon] > 0)
                        p.ammo_amount[p.curr_weapon]--;
                    else break;
                }
                A_Shoot(p.i,PWEAPON(snum, p.curr_weapon, Shoots));
            }
        }

        if (!(PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_NOVISIBLE))
        {
//#ifdef POLYMER
            var s = sprite[p.i];
            var /*int32_t */x = ((sintable[(s.ang+512)&2047])>>7), y = ((sintable[(s.ang)&2047])>>7);

            s.x += x;
            s.y += y;
            G_AddGameLight(0, p.i, PHEIGHT, 8192, PWEAPON(snum, p.curr_weapon, FlashColor),PR_LIGHT_PRIO_MAX_GAME);
            actor[p.i].lightcount = 2;
            s.x -= x;
            s.y -= y;
//#endif // POLYMER
            lastvisinc = totalclock+32;
            p.visibility = 0;
        }
    }
}

function P_DoWeaponSpawn(p: DukePlayer_t):void
{
    var /*int32_t */j:number, snum = sprite[p.i].yvel;

    if (PWEAPON(snum, p.curr_weapon, Spawn) <= 0)  // <=0 : AMC TC beta/RC2 has WEAPONx_SPAWN -1
        return;

    j = A_Spawn(p.i, PWEAPON(snum, p.curr_weapon, Spawn));

    if ((PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_SPAWNTYPE3))
    {
        // like chaingun shells
        sprite[j].ang += 1024;
        sprite[j].ang &= 2047;
        sprite[j].xvel += 32;
        sprite[j].z += (3<<8);
    }

    A_SetSprite(j,CLIPMASK0);

}

function P_DisplayScuba(/*int32_t */snum:number): void
{
    if (g_player[snum].ps.scuba_on)
    {
        var /*int32_t */p = P_GetHudPal(g_player[snum].ps);

        g_snum = snum;
//#ifdef USE_OPENGL
        if (getrendermode() >= REND_POLYMOST)
            G_DrawTileScaled(44, (200-tilesizy[SCUBAMASK]), SCUBAMASK, 0, 2+16+DRAWEAP_CENTER, p);
//#endif
        G_DrawTileScaled(43, (200-tilesizy[SCUBAMASK]), SCUBAMASK, 0, 2+16+DRAWEAP_CENTER, p);
        G_DrawTileScaled(320-43, (200-tilesizy[SCUBAMASK]), SCUBAMASK, 0, 2+4+16+DRAWEAP_CENTER, p);
    }
}

function /*int32_t */P_DisplayTip(/*int32_t */gs:number,/*int32_t */snum:number):number
{
    var /*int32_t */p:number,looking_arc:number, tipy:number;

    var tip_y = new Int16Array([
        0,-8,-16,-32,-64,
        -84,-108,-108,-108,-108,
        -108,-108,-108,-108,-108,
        -108,-96,-72,-64,-32,
        -16, /* EDuke32: */ 0, 16, 32, 48,
        // At y coord 64, the hand is already not shown.
    ]);

    var ps = g_player[snum].ps;

    if (ps.tipincs == 0)
        return 0;

    // Report that the tipping hand has been drawn so that the otherwise
    // selected weapon is not drawn.
    if (ps.tipincs >= ARRAY_SIZE(tip_y))
        return 1;

    looking_arc = klabs(ps.look_ang)/9;
    looking_arc -= (ps.hard_landing<<3);

    p = P_GetHudPal(ps);

    tipy = tip_y[ps.tipincs]>>1;

    G_DrawTileScaled(170+(g_player[snum].sync.avel>>4)-(ps.look_ang>>1),
                     tipy+looking_arc+240-((ps.horiz-ps.horizoff)>>4),
                     TIP+((26-ps.tipincs)>>4),gs,DRAWEAP_CENTER,p);

    return 1;
}

function/*int32_t*/ P_DisplayAccess(/*int32_t*/ gs:number,/*int32_t */snum:number):number
{
    var access_y = new Int16Array([
        0,-8,-16,-32,-64,
        -84,-108,-108,-108,-108,
        -108,-108,-108,-108,-108,
        -108,-96,-72,-64,-32,
        -16
    ]);

    var looking_arc:number, p = 0;
    var ps = g_player[snum].ps;

    if (ps.access_incs == 0 || ps.access_incs >= ARRAY_SIZE(access_y) || sprite[ps.i].extra <= 0)
        return 0;

    looking_arc = access_y[ps.access_incs] + klabs(ps.look_ang)/9 -
                  (ps.hard_landing<<3);

    if (ps.access_spritenum >= 0)
        p = sprite[ps.access_spritenum].pal;

    if ((ps.access_incs-3) > 0 && (ps.access_incs-3)>>3)
    {
        guniqhudid = 200;
        G_DrawTileScaled(170+(g_player[snum].sync.avel>>4)-(ps.look_ang>>1)+(access_y[ps.access_incs]>>2),
                         looking_arc+266-((ps.horiz-ps.horizoff)>>4),HANDHOLDINGLASER+(ps.access_incs>>3),
                         gs,DRAWEAP_CENTER,p);
        guniqhudid = 0;
    }
    else
    {
        guniqhudid = 201;
        G_DrawTileScaled(170+(g_player[snum].sync.avel>>4)-(ps.look_ang>>1)+(access_y[ps.access_incs]>>2),
                         looking_arc+266-((ps.horiz-ps.horizoff)>>4),HANDHOLDINGACCESS,gs,4+DRAWEAP_CENTER,p);
        guniqhudid = 0;
    }

    return 1;
}


var /*int32_t */fistsign=0;

function P_DisplayWeapon(/*int32_t */snum:number):void
{
    var /*int32_t */gun_pos=0, looking_arc=0, cw=0;
    var /*int32_t */weapon_xoffset=0, i=0, j=0;
    var /*int32_t */o = 0,pal = 0;
    var p = g_player[snum].ps;
    //var kb = p.kickback_pic;// js: replaced
    var /*int32_t */gs:number;

    g_snum = snum;

    looking_arc = int32(klabs(p.look_ang)/9);

    gs = sprite[p.i].shade;
    if (gs > 24) gs = 24;

    if (p.newowner >= 0 || ud.camerasprite >= 0 || p.over_shoulder_on > 0 || (sprite[p.i].pal != 1 && sprite[p.i].extra <= 0) ||
            P_DisplayFist(gs,snum) || P_DisplayKnuckles(gs,snum) || P_DisplayTip(gs,snum) || P_DisplayAccess(gs,snum))
        return;

    P_DisplayKnee(gs,snum);

    gun_pos = 80-(p.weapon_pos*p.weapon_pos);

    weapon_xoffset = (160)-90;

    if (ud.weaponsway)
    {
        weapon_xoffset -= (sintable[((p.weapon_sway>>1)+512)&2047]/(1024+512)|0);

        if (sprite[p.i].xrepeat < 32)
            gun_pos -= klabs(sintable[(p.weapon_sway<<2)&2047]>>9);
        else gun_pos -= klabs(sintable[(p.weapon_sway>>1)&2047]>>10);
    }
    else gun_pos -= 16;

    weapon_xoffset -= 58 + p.weapon_ang;
    gun_pos -= (p.hard_landing<<3);

    if (p.last_weapon >= 0)
        cw = PWEAPON(snum, p.last_weapon, WorksLike);
    else
        cw = PWEAPON(snum, p.curr_weapon, WorksLike);

    hudweap.gunposy=gun_pos;
    hudweap.lookhoriz=looking_arc;
    hudweap.cur=cw;
    hudweap.gunposx=weapon_xoffset;
    hudweap.shade=gs;
    hudweap.count=p.kickback_pic;
    hudweap.lookhalfang=p.look_ang>>1;

    if (VM_OnEvent(EVENT_DISPLAYWEAPON, p.i, screenpeek, -1, 0) == 0)
    {
        j = 14-p.quick_kick;
        if (j != 14 || p.last_quick_kick)
        {
            pal = P_GetHudPal(p);
            if (pal == 0)
                pal = p.palookup;

            guniqhudid = 100;
            if (j < 6 || j > 12)
                G_DrawTileScaled(weapon_xoffset+80-(p.look_ang>>1),
                                 looking_arc+250-gun_pos,KNEE,gs,o|4|DRAWEAP_CENTER,pal);
            else G_DrawTileScaled(weapon_xoffset+160-16-(p.look_ang>>1),
                                  looking_arc+214-gun_pos,KNEE+1,gs,o|4|DRAWEAP_CENTER,pal);
            guniqhudid = 0;
        }

        if (sprite[p.i].xrepeat < 40)
        {
            pal = P_GetHudPal(p);

            if (p.jetpack_on == 0)
            {
                i = sprite[p.i].xvel;
                looking_arc += 32-(i>>3);
                fistsign += i>>3;
            }

            cw = weapon_xoffset;
            weapon_xoffset += sintable[(fistsign)&2047]>>10;
            G_DrawTileScaled(weapon_xoffset+250-(p.look_ang>>1),
                             looking_arc+258-(klabs(sintable[(fistsign)&2047]>>8)),
                             FIST,gs,o, pal);
            weapon_xoffset = cw - (sintable[(fistsign)&2047]>>10);
            G_DrawTileScaled(weapon_xoffset+40-(p.look_ang>>1),
                             looking_arc+200+(klabs(sintable[(fistsign)&2047]>>8)),
                             FIST,gs,o|4, pal);
        }
        else
        {
            var/*int32_t */doanim = !(sprite[p.i].pal == 1 || ud.pause_on || g_player[myconnectindex].ps.gm&MODE_MENU);
            pal = P_GetHudPal(p);

            switch (cw)
            {
            case KNEE_WEAPON:
                if (VM_OnEvent(EVENT_DRAWWEAPON,g_player[screenpeek].ps.i,screenpeek, -1, 0) == 0)
                {
                    if ((p.kickback_pic) > 0)
                    {
                        if (pal == 0)
                            pal = p.palookup;

                        guniqhudid = cw;
                        if ((p.kickback_pic) < 5 || (p.kickback_pic) > 9)
                            G_DrawTileScaled(weapon_xoffset+220-(p.look_ang>>1),
                            looking_arc+250-gun_pos,KNEE,gs,o,pal);
                        else
                            G_DrawTileScaled(weapon_xoffset+160-(p.look_ang>>1),
                            looking_arc+214-gun_pos,KNEE+1,gs,o,pal);
                        guniqhudid = 0;
                    }
                }
                break;

            case TRIPBOMB_WEAPON:
                if (VM_OnEvent(EVENT_DRAWWEAPON,g_player[screenpeek].ps.i,screenpeek, -1, 0) == 0)
                {
                    weapon_xoffset += 8;
                    gun_pos -= 10;

                    if ((p.kickback_pic) > 6)
                        looking_arc += ((p.kickback_pic)<<3);
                    else if ((p.kickback_pic) < 4)
                    {
                        guniqhudid = cw<<2;
                        G_DrawWeaponTile(weapon_xoffset+142-(p.look_ang>>1),
                            looking_arc+234-gun_pos,HANDHOLDINGLASER+3,gs,o,pal,0);
                    }

                    guniqhudid = cw;
                    G_DrawWeaponTile(weapon_xoffset+130-(p.look_ang>>1),
                        looking_arc+249-gun_pos,
                        HANDHOLDINGLASER+((p.kickback_pic)>>2),gs,o,pal,0);

                    guniqhudid = cw<<1;
                    G_DrawWeaponTile(weapon_xoffset+152-(p.look_ang>>1),
                        looking_arc+249-gun_pos,
                        HANDHOLDINGLASER+((p.kickback_pic)>>2),gs,o|4,pal,0);
                    guniqhudid = 0;
                }
                break;

            case RPG_WEAPON:
                if (VM_OnEvent(EVENT_DRAWWEAPON,g_player[screenpeek].ps.i,screenpeek, -1, 0) == 0)
                {
                    weapon_xoffset -= sintable[(768+((p.kickback_pic)<<7))&2047]>>11;
                    gun_pos += sintable[(768+((p.kickback_pic)<<7))&2047]>>11;

                    if (p.kickback_pic > 0 && p.kickback_pic < 8)
                    {
                        G_DrawWeaponTile(weapon_xoffset+164,(looking_arc<<1)+176-gun_pos,
                            RPGGUN+((p.kickback_pic)>>1),gs,o|512,pal,0);
                    }

                    G_DrawWeaponTile(weapon_xoffset+164,(looking_arc<<1)+176-gun_pos,
                        RPGGUN,gs,o|512,pal,0);
                }
                break;

            case SHOTGUN_WEAPON:
                if (VM_OnEvent(EVENT_DRAWWEAPON,g_player[screenpeek].ps.i,screenpeek, -1, 0) == 0)
                {
                    weapon_xoffset -= 8;

                    switch (p.kickback_pic)
                    {
                    case 1:
                    case 2:
                        guniqhudid = cw<<1;
                        G_DrawWeaponTile(weapon_xoffset+168-(p.look_ang>>1),looking_arc+201-gun_pos,
                            SHOTGUN+2,-128,o,pal,0);
                    case 0:
                    case 6:
                    case 7:
                    case 8:
                        guniqhudid = cw;
                        G_DrawWeaponTile(weapon_xoffset+146-(p.look_ang>>1),looking_arc+202-gun_pos,
                            SHOTGUN,gs,o,pal,0);
                        guniqhudid = 0;
                        break;
                    case 3:
                    case 4:
                    case 5:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        if (p.kickback_pic > 1 && p.kickback_pic < 5)
                        {
                            gun_pos -= 40;
                            weapon_xoffset += 20;

                            guniqhudid = cw<<1;
                            G_DrawWeaponTile(weapon_xoffset+178-(p.look_ang>>1),looking_arc+194-gun_pos,
                                SHOTGUN+1+((p.kickback_pic-1)>>1),-128,o,pal,0);
                        }
                        guniqhudid = cw;
                        G_DrawWeaponTile(weapon_xoffset+158-(p.look_ang>>1),looking_arc+220-gun_pos,
                            SHOTGUN+3,gs,o,pal,0);
                        guniqhudid = 0;
                        break;
                    case 13:
                    case 14:
                    case 15:
                        guniqhudid = cw;
                        G_DrawWeaponTile(32+weapon_xoffset+166-(p.look_ang>>1),looking_arc+210-gun_pos,
                            SHOTGUN+4,gs,o,pal,0);
                        guniqhudid = 0;
                        break;
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                        guniqhudid = cw;
                        G_DrawWeaponTile(64+weapon_xoffset+170-(p.look_ang>>1),looking_arc+196-gun_pos,
                            SHOTGUN+5,gs,o,pal,0);
                        guniqhudid = 0;
                        break;
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                        guniqhudid = cw;
                        G_DrawWeaponTile(64+weapon_xoffset+176-(p.look_ang>>1),looking_arc+196-gun_pos,
                            SHOTGUN+6,gs,o,pal,0);
                        guniqhudid = 0;
                        break;
                    case 24:
                    case 25:
                    case 26:
                    case 27:
                        guniqhudid = cw;
                        G_DrawWeaponTile(64+weapon_xoffset+170-(p.look_ang>>1),looking_arc+196-gun_pos,
                            SHOTGUN+5,gs,o,pal,0);
                        guniqhudid = 0;
                        break;
                    case 28:
                    case 29:
                    case 30:
                        guniqhudid = cw;
                        G_DrawWeaponTile(32+weapon_xoffset+156-(p.look_ang>>1),looking_arc+206-gun_pos,
                            SHOTGUN+4,gs,o,pal,0);
                        guniqhudid = 0;
                        break;
                    }
                }
                break;

            case CHAINGUN_WEAPON:
                if (VM_OnEvent(EVENT_DRAWWEAPON,g_player[screenpeek].ps.i,screenpeek, -1, 0) == 0)
                {
                    if (p.kickback_pic > 0)
                    {
                        gun_pos -= sintable[(p.kickback_pic)<<7]>>12;

                        if (doanim)
                            weapon_xoffset += 1-(rand()&3);
                    }

                    switch (p.kickback_pic)
                    {
                    case 0:
                        G_DrawWeaponTile(weapon_xoffset+178-(p.look_ang>>1),looking_arc+233-gun_pos,
                            CHAINGUN+1,gs,o,pal,0);
                        break;

                    default:
                        if (p.kickback_pic > PWEAPON(0, CHAINGUN_WEAPON, FireDelay) && p.kickback_pic < PWEAPON(0, CHAINGUN_WEAPON, TotalTime))
                        {
                            i = 0;
                            if (doanim) i = rand()&7;
                            G_DrawWeaponTile(i+weapon_xoffset-4+140-(p.look_ang>>1),i+looking_arc-((p.kickback_pic)>>1)+208-gun_pos,
                                CHAINGUN+5+((p.kickback_pic-4)/5),gs,o,pal,0);
                            if (doanim) i = rand()&7;
                            G_DrawWeaponTile(i+weapon_xoffset-4+184-(p.look_ang>>1),i+looking_arc-((p.kickback_pic)>>1)+208-gun_pos,
                                CHAINGUN+5+((p.kickback_pic-4)/5),gs,o,pal,0);
                        }

                        if (p.kickback_pic < PWEAPON(0, CHAINGUN_WEAPON, TotalTime)-4)
                        {
                            i = 0;
                            if (doanim) i = rand()&7;
                            G_DrawWeaponTile(i+weapon_xoffset-4+162-(p.look_ang>>1),i+looking_arc-((p.kickback_pic)>>1)+208-gun_pos,
                                CHAINGUN+5+((p.kickback_pic-2)/5),gs,o,pal,0);
                            G_DrawWeaponTile(weapon_xoffset+178-(p.look_ang>>1),looking_arc+233-gun_pos,
                                CHAINGUN+1+((p.kickback_pic)>>1),gs,o,pal,0);
                        }
                        else G_DrawWeaponTile(weapon_xoffset+178-(p.look_ang>>1),looking_arc+233-gun_pos,
                            CHAINGUN+1,gs,o,pal,0);

                        break;
                    }

                    G_DrawWeaponTile(weapon_xoffset+168-(p.look_ang>>1),looking_arc+260-gun_pos,
                        CHAINGUN,gs,o,pal,0);
                }
                break;

            case PISTOL_WEAPON:
                if (VM_OnEvent(EVENT_DRAWWEAPON,g_player[screenpeek].ps.i,screenpeek, -1, 0) == 0)
                {
                    if ((p.kickback_pic) < PWEAPON(0, PISTOL_WEAPON, TotalTime)+1)
                    {
                        var /*static uint8_t */kb_frames = [ 0, 1, 2 ];
                        var/*int32_t */l = 195-12+weapon_xoffset;

                        if ((p.kickback_pic) == PWEAPON(0, PISTOL_WEAPON, FireDelay))
                            l -= 3;

                        guniqhudid = cw;
                        G_DrawWeaponTile((l-(p.look_ang>>1)),(looking_arc+244-gun_pos),FIRSTGUN+kb_frames[p.kickback_pic>2?0:p.kickback_pic],gs,2,pal,0);
                        guniqhudid = 0;
                    }
                    else
                    {

                        if ((p.kickback_pic) < PWEAPON(0, PISTOL_WEAPON, Reload)-17)
                        {
                            guniqhudid = cw;
                            G_DrawWeaponTile(194-(p.look_ang>>1),looking_arc+230-gun_pos,FIRSTGUN+4,gs,o|512,pal,0);
                            guniqhudid = 0;
                        }
                        else if ((p.kickback_pic) < PWEAPON(0, PISTOL_WEAPON, Reload)-12)
                        {
                            G_DrawWeaponTile(244-((p.kickback_pic)<<3)-(p.look_ang>>1),looking_arc+130-gun_pos+((p.kickback_pic)<<4),FIRSTGUN+6,gs,o|512,pal,0);
                            guniqhudid = cw;
                            G_DrawWeaponTile(224-(p.look_ang>>1),looking_arc+220-gun_pos,FIRSTGUN+5,gs,o|512,pal,0);
                            guniqhudid = 0;
                        }
                        else if ((p.kickback_pic) < PWEAPON(0, PISTOL_WEAPON, Reload)-7)
                        {
                            G_DrawWeaponTile(124+((p.kickback_pic)<<1)-(p.look_ang>>1),looking_arc+430-gun_pos-((p.kickback_pic)<<3),FIRSTGUN+6,gs,o|512,pal,0);
                            guniqhudid = cw;
                            G_DrawWeaponTile(224-(p.look_ang>>1),looking_arc+220-gun_pos,FIRSTGUN+5,gs,o|512,pal,0);
                            guniqhudid = 0;
                        }

                        else if ((p.kickback_pic) < PWEAPON(0, PISTOL_WEAPON, Reload)-4)
                        {
                            G_DrawWeaponTile(184-(p.look_ang>>1),looking_arc+235-gun_pos,FIRSTGUN+8,gs,o|512,pal,0);
                            guniqhudid = cw;
                            G_DrawWeaponTile(224-(p.look_ang>>1),looking_arc+210-gun_pos,FIRSTGUN+5,gs,o|512,pal,0);
                            guniqhudid = 0;
                        }
                        else if ((p.kickback_pic) < PWEAPON(0, PISTOL_WEAPON, Reload)-2)
                        {
                            G_DrawWeaponTile(164-(p.look_ang>>1),looking_arc+245-gun_pos,FIRSTGUN+8,gs,o|512,pal,0);
                            guniqhudid = cw;
                            G_DrawWeaponTile(224-(p.look_ang>>1),looking_arc+220-gun_pos,FIRSTGUN+5,gs,o|512,pal,0);
                            guniqhudid = 0;
                        }
                        else if ((p.kickback_pic) < PWEAPON(0, PISTOL_WEAPON, Reload))
                        {
                            guniqhudid = cw;
                            G_DrawWeaponTile(194-(p.look_ang>>1),looking_arc+235-gun_pos,FIRSTGUN+5,gs,o|512,pal,0);
                            guniqhudid = 0;
                        }

                    }
                }
                break;

            case HANDBOMB_WEAPON:
                if (VM_OnEvent(EVENT_DRAWWEAPON,g_player[screenpeek].ps.i,screenpeek, -1, 0) == 0)
                {
                    guniqhudid = cw;
                    if ((p.kickback_pic))
                    {
                        if ((p.kickback_pic) < (PWEAPON(0, p.curr_weapon, TotalTime)))
                        {

                            var /*static uint8_t */throw_frames = new Uint8Array([0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2]);

                            if ((p.kickback_pic) < 7)
                                gun_pos -= 10*(p.kickback_pic);        //D
                            else if ((p.kickback_pic) < 12)
                                gun_pos += 20*((p.kickback_pic)-10); //U
                            else if ((p.kickback_pic) < 20)
                                gun_pos -= 9*((p.kickback_pic)-14);  //D

                            if (p.kickback_pic >= ARRAY_SIZE(throw_frames))
                                break;

                            G_DrawWeaponTile(weapon_xoffset+190-(p.look_ang>>1),looking_arc+250-gun_pos,HANDTHROW+throw_frames[(p.kickback_pic)],gs,o,pal,0);
                        }
                    }
                    else
                        G_DrawWeaponTile(weapon_xoffset+190-(p.look_ang>>1),looking_arc+260-gun_pos,HANDTHROW,gs,o,pal,0);
                    guniqhudid = 0;
                }
                break;

            case HANDREMOTE_WEAPON:
                if (VM_OnEvent(EVENT_DRAWWEAPON,g_player[screenpeek].ps.i,screenpeek, -1, 0) == 0)
                {
                    var /*static uint8_t */remote_frames = new Uint8Array([0,1,1,2,1,1,0,0,0,0,0]);

                    if (p.kickback_pic >= ARRAY_SIZE(remote_frames))
                        break;

                    weapon_xoffset = -48;
                    guniqhudid = cw;
                    G_DrawWeaponTile(weapon_xoffset+150-(p.look_ang>>1),looking_arc+258-gun_pos,HANDREMOTE+remote_frames[(p.kickback_pic)],gs,o,pal,0);
                    guniqhudid = 0;
                }
                break;

            case DEVISTATOR_WEAPON:
                if (VM_OnEvent(EVENT_DRAWWEAPON,g_player[screenpeek].ps.i,screenpeek, -1, 0) == 0)
                {
                    if ((p.kickback_pic) < (PWEAPON(0, DEVISTATOR_WEAPON, TotalTime)+1) && (p.kickback_pic) > 0)
                    {
                        var /*static uint8_t */cycloidy = new Uint8Array([0,4,12,24,12,4,0]);

                        if (p.kickback_pic >= ARRAY_SIZE(cycloidy))
                            break;

                        i = ksgn((p.kickback_pic)>>2);

                        if (p.hbomb_hold_delay)
                        {
                            guniqhudid = cw;
                            G_DrawWeaponTile((cycloidy[p.kickback_pic]>>1)+weapon_xoffset+268-(p.look_ang>>1),cycloidy[p.kickback_pic]+looking_arc+238-gun_pos,DEVISTATOR+i,-32,o,pal,0);
                            guniqhudid = cw<<1;
                            G_DrawWeaponTile(weapon_xoffset+30-(p.look_ang>>1),looking_arc+240-gun_pos,DEVISTATOR,gs,o|4,pal,0);
                            guniqhudid = 0;
                        }
                        else
                        {
                            guniqhudid = cw<<1;
                            G_DrawWeaponTile(-(cycloidy[p.kickback_pic]>>1)+weapon_xoffset+30-(p.look_ang>>1),cycloidy[p.kickback_pic]+looking_arc+240-gun_pos,DEVISTATOR+i,-32,o|4,pal,0);
                            guniqhudid = cw;
                            G_DrawWeaponTile(weapon_xoffset+268-(p.look_ang>>1),looking_arc+238-gun_pos,DEVISTATOR,gs,o,pal,0);
                            guniqhudid = 0;
                        }
                    }
                    else
                    {
                        guniqhudid = cw;
                        G_DrawWeaponTile(weapon_xoffset+268-(p.look_ang>>1),looking_arc+238-gun_pos,DEVISTATOR,gs,o,pal,0);
                        guniqhudid = cw<<1;
                        G_DrawWeaponTile(weapon_xoffset+30-(p.look_ang>>1),looking_arc+240-gun_pos,DEVISTATOR,gs,o|4,pal,0);
                        guniqhudid = 0;
                    }
                }
                break;

            case FREEZE_WEAPON:
                if (VM_OnEvent(EVENT_DRAWWEAPON,g_player[screenpeek].ps.i,screenpeek, -1, 0) == 0)
                {
                    if ((p.kickback_pic) < (PWEAPON(snum, p.curr_weapon, TotalTime)+1) && (p.kickback_pic) > 0)
                    {
                        var /*static uint8_t */cat_frames = new Uint8Array([ 0,0,1,1,2,2 ]);

                        if (p.kickback_pic%6 >= ARRAY_SIZE(cat_frames))
                            break;

                        if (doanim)
                        {
                            weapon_xoffset += rand()&3;
                            looking_arc += rand()&3;
                        }
                        gun_pos -= 16;
                        guniqhudid = 0;
                        G_DrawWeaponTile(weapon_xoffset+210-(p.look_ang>>1),looking_arc+261-gun_pos,FREEZE+2,-32,o|512,pal,0);
                        guniqhudid = cw;
                        G_DrawWeaponTile(weapon_xoffset+210-(p.look_ang>>1),looking_arc+235-gun_pos,FREEZE+3+cat_frames[p.kickback_pic%6],-32,o|512,pal,0);
                        guniqhudid = 0;
                    }
                    else
                    {
                        guniqhudid = cw;
                        G_DrawWeaponTile(weapon_xoffset+210-(p.look_ang>>1),looking_arc+261-gun_pos,FREEZE,gs,o|512,pal,0);
                        guniqhudid = 0;
                    }
                }
                break;

            case GROW_WEAPON:
                if (VM_OnEvent(EVENT_DRAWWEAPON,g_player[screenpeek].ps.i,screenpeek, -1, 0) == 0)
                {
                    weapon_xoffset += 28;
                    looking_arc += 18;

                    if ((p.kickback_pic) < PWEAPON(snum, p.curr_weapon, TotalTime) && (p.kickback_pic) > 0)
                    {
                        if (doanim)
                        {
                            weapon_xoffset += rand()&3;
                            gun_pos += (rand()&3);
                        }

                        guniqhudid = cw<<1;
                        G_DrawWeaponTile(weapon_xoffset+184-(p.look_ang>>1),
                                         looking_arc+240-gun_pos,SHRINKER+3+((p.kickback_pic)&3),-32,
                                         o,2,1);

                        guniqhudid = cw;
                        G_DrawWeaponTile(weapon_xoffset+188-(p.look_ang>>1),
                                         looking_arc+240-gun_pos,SHRINKER-1,gs,o,pal,0);
                        guniqhudid = 0;
                    }
                    else
                    {
                        guniqhudid = cw<<1;
                        G_DrawWeaponTile(weapon_xoffset+184-(p.look_ang>>1),
                                         looking_arc+240-gun_pos,SHRINKER+2,
                                         16-(sintable[p.random_club_frame&2047]>>10),
                                         o,2,1);

                        guniqhudid = cw;
                        G_DrawWeaponTile(weapon_xoffset+188-(p.look_ang>>1),
                                         looking_arc+240-gun_pos,SHRINKER-2,gs,o,pal,0);
                        guniqhudid = 0;
                    }
                }
                break;

            case SHRINKER_WEAPON:
                if (VM_OnEvent(EVENT_DRAWWEAPON,g_player[screenpeek].ps.i,screenpeek, -1, 0) == 0)
                {
                    weapon_xoffset += 28;
                    looking_arc += 18;

                    if (((p.kickback_pic) > 0) && ((p.kickback_pic) < PWEAPON(snum, p.curr_weapon, TotalTime)))
                    {
                        if (doanim)
                        {
                            weapon_xoffset += rand()&3;
                            gun_pos += (rand()&3);
                        }
                        guniqhudid = cw<<1;
                        G_DrawWeaponTile(weapon_xoffset+184-(p.look_ang>>1),
                            looking_arc+240-gun_pos,SHRINKER+3+((p.kickback_pic)&3),-32,
                            o,0,1);
                        guniqhudid = cw;
                        G_DrawWeaponTile(weapon_xoffset+188-(p.look_ang>>1),
                            looking_arc+240-gun_pos,SHRINKER+1,gs,o,pal,0);
                        guniqhudid = 0;

                    }
                    else
                    {
                        guniqhudid = cw<<1;
                        G_DrawWeaponTile(weapon_xoffset+184-(p.look_ang>>1),
                            looking_arc+240-gun_pos,SHRINKER+2,
                            16-(sintable[p.random_club_frame&2047]>>10),
                            o,0,1);
                        guniqhudid = cw;
                        G_DrawWeaponTile(weapon_xoffset+188-(p.look_ang>>1),
                            looking_arc+240-gun_pos,SHRINKER,gs,o,pal,0);
                        guniqhudid = 0;
                    }
                }
                break;

            }
        }
    }

    P_DisplaySpit(snum);
}

var TURBOTURNTIME =(TICRATE/8)|0; // 7
var NORMALTURN   =15;
var PREAMBLETURN =5;
var NORMALKEYMOVE =40;
var MAXVEL       =((NORMALKEYMOVE*2)+10);
var MAXSVEL      =((NORMALKEYMOVE*2)+10);
var MAXANGVEL    =127;
var MAXHORIZ     =127;

var g_myAimMode = 0, g_myAimStat = 0, g_oldAimStat = 0; //int32_t 
var /*int32_t */mouseyaxismode = -1;
var /*int32_t */g_emuJumpTics = 0;

var /*int32_t*/ turnheldtime = 0;
var /*int32_t*/ lastcontroltime = 0;
function P_GetInput(/*int32_t */snum: number): void
{todo("P_GetInput");
    var /*int32_t */j:number, daang:number;
    //static ControlInfo info[2];
    //static int32_t turnheldtime; //MED
    //static int32_t lastcontroltime; //MED

    var /*int32_t*/ tics:number, running:number;
    var /*int32_t*/ turnamount:number;
    var /*int32_t*/ keymove:number;
    var /*int32_t*/ momx = 0,momy = 0;
    var p = g_player[snum].ps;

//    if ((p.gm & (MODE_MENU|MODE_TYPE)) || (ud.pause_on && !KB_KeyPressed(sc_Pause)))
//    {
//        if (!(p.gm&MODE_MENU))
//            CONTROL_GetInput(&info[0]);

//        Bmemset(&info[1], 0, sizeof(input_t));
//        Bmemset(&loc, 0, sizeof(input_t));
//        loc.bits = (((int32_t)g_gameQuit)<<SK_GAMEQUIT);
//        loc.extbits = (g_player[snum].pteam != g_player[snum].ps.team)<<6;
//        loc.extbits |= (1<<7);

//        return;
//    }

//    if (ud.mouseaiming)
//        g_myAimMode = BUTTON(gamefunc_Mouse_Aiming);
//    else
//    {
//        g_oldAimStat = g_myAimStat;
//        g_myAimStat = BUTTON(gamefunc_Mouse_Aiming);
//        if (g_myAimStat > g_oldAimStat)
//        {
//            g_myAimMode ^= 1;
//            P_DoQuote(QUOTE_MOUSE_AIMING_OFF+g_myAimMode,p);
//        }
//    }

//    if (g_myAimMode) j = analog_lookingupanddown;
//    else j = ud.config.MouseAnalogueAxes[1];

//    if (j != mouseyaxismode)
//    {
//        CONTROL_MapAnalogAxis(1, j, controldevice_mouse);
//        mouseyaxismode = j;
//    }

//    CONTROL_GetInput(&info[0]);

//    if (ud.config.MouseDeadZone)
//    {
//        if (info[0].dpitch > 0)
//        {
//            if (info[0].dpitch > ud.config.MouseDeadZone)
//                info[0].dpitch -= ud.config.MouseDeadZone;
//            else info[0].dpitch = 0;
//        }
//        else if (info[0].dpitch < 0)
//        {
//            if (info[0].dpitch < -ud.config.MouseDeadZone)
//                info[0].dpitch += ud.config.MouseDeadZone;
//            else info[0].dpitch = 0;
//        }
//        if (info[0].dyaw > 0)
//        {
//            if (info[0].dyaw > ud.config.MouseDeadZone)
//                info[0].dyaw -= ud.config.MouseDeadZone;
//            else info[0].dyaw = 0;
//        }
//        else if (info[0].dyaw < 0)
//        {
//            if (info[0].dyaw < -ud.config.MouseDeadZone)
//                info[0].dyaw += ud.config.MouseDeadZone;
//            else info[0].dyaw = 0;
//        }
//    }

//    if (ud.config.MouseBias)
//    {
//        if (klabs(info[0].dyaw) > klabs(info[0].dpitch))
//            info[0].dpitch /= ud.config.MouseBias;
//        else info[0].dyaw /= ud.config.MouseBias;
//    }

//    tics = totalclock-lastcontroltime;
//    lastcontroltime = totalclock;

//    //    running = BUTTON(gamefunc_Run)|ud.auto_run;
//    // JBF: Run key behaviour is selectable
//    if (ud.runkey_mode)
//        running = BUTTON(gamefunc_Run)|ud.auto_run; // classic
//    else
//        running = ud.auto_run^BUTTON(gamefunc_Run); // modern

    svel = vel = angvel = horiz = 0;

//    if (BUTTON(gamefunc_Strafe))
//    {
//        svel = -(info[0].dyaw+info[1].dyaw)/8;
//        info[1].dyaw = (info[1].dyaw+info[0].dyaw) % 8;
//    }
//    else
//    {
//        angvel = (info[0].dyaw+info[1].dyaw)/64;
//        info[1].dyaw = (info[1].dyaw+info[0].dyaw) % 64;
//    }

//    if (ud.mouseflip)
//        horiz = -(info[0].dpitch+info[1].dpitch)/(314-128);
//    else horiz = (info[0].dpitch+info[1].dpitch)/(314-128);

//    info[1].dpitch = (info[1].dpitch+info[0].dpitch) % (314-128);

//    svel -= info[0].dx;
//    info[1].dz = info[0].dz % (1<<6);
//    vel = -info[0].dz>>6;

//     OSD_Printf("running: %d\n", running);
    if (running)
    {
        turnamount = NORMALTURN<<1;
        keymove = NORMALKEYMOVE<<1;
    }
    else
    {
        turnamount = NORMALTURN;
        keymove = NORMALKEYMOVE;
    }

//    if (BUTTON(gamefunc_Strafe))
//    {
//        if (BUTTON(gamefunc_Turn_Left) && !(g_player[snum].ps.movement_lock&4))
//            svel -= -keymove;
//        if (BUTTON(gamefunc_Turn_Right) && !(g_player[snum].ps.movement_lock&8))
//            svel -= keymove;
//    }
//    else
//    {
//        if (BUTTON(gamefunc_Turn_Left))
//        {
//            turnheldtime += tics;
//            if (turnheldtime>=TURBOTURNTIME)
//                angvel -= turnamount;
//            else
//                angvel -= PREAMBLETURN;
//        }
//        else if (BUTTON(gamefunc_Turn_Right))
//        {
//            turnheldtime += tics;
//            if (turnheldtime>=TURBOTURNTIME)
//                angvel += turnamount;
//            else
//                angvel += PREAMBLETURN;
//        }
//        else
//            turnheldtime=0;
//    }

//    if (BUTTON(gamefunc_Strafe_Left) && !(g_player[snum].ps.movement_lock&4))
//        svel += keymove;
//    if (BUTTON(gamefunc_Strafe_Right) && !(g_player[snum].ps.movement_lock&8))
//        svel += -keymove;
//    if (BUTTON(gamefunc_Move_Forward) && !(g_player[snum].ps.movement_lock&1))
//        vel += keymove;
//    if (BUTTON(gamefunc_Move_Backward) && !(g_player[snum].ps.movement_lock&2))
//        vel += -keymove;

    if (vel < -MAXVEL) vel = -MAXVEL;
    if (vel > MAXVEL) vel = MAXVEL;
    if (svel < -MAXSVEL) svel = -MAXSVEL;
    if (svel > MAXSVEL) svel = MAXSVEL;
    if (angvel < -MAXANGVEL) angvel = -MAXANGVEL;
    if (angvel > MAXANGVEL) angvel = MAXANGVEL;
    if (horiz < -MAXHORIZ) horiz = -MAXHORIZ;
    if (horiz > MAXHORIZ) horiz = MAXHORIZ;

//    j=0;

//    if (BUTTON(gamefunc_Weapon_1))
//        j = 1;
//    if (BUTTON(gamefunc_Weapon_2))
//        j = 2;
//    if (BUTTON(gamefunc_Weapon_3))
//        j = 3;
//    if (BUTTON(gamefunc_Weapon_4))
//        j = 4;
//    if (BUTTON(gamefunc_Weapon_5))
//        j = 5;
//    if (BUTTON(gamefunc_Weapon_6))
//        j = 6;
//    if (BUTTON(gamefunc_Weapon_7))
//        j = 7;
//    if (BUTTON(gamefunc_Weapon_8))
//        j = 8;
//    if (BUTTON(gamefunc_Weapon_9))
//        j = 9;
//    if (BUTTON(gamefunc_Weapon_10))
//        j = 10;
//    if (BUTTON(gamefunc_Previous_Weapon) || (BUTTON(gamefunc_Dpad_Select) && vel < 0))
//        j = 11;
//    if (BUTTON(gamefunc_Next_Weapon) || (BUTTON(gamefunc_Dpad_Select) && vel > 0))
//        j = 12;

//    if (BUTTON(gamefunc_Jump) && p.on_ground)
//        g_emuJumpTics = 4;

//    loc.bits = (g_emuJumpTics > 0 || BUTTON(gamefunc_Jump))<<SK_JUMP;

//    if (g_emuJumpTics > 0)
//        g_emuJumpTics--;

//    loc.bits |=   BUTTON(gamefunc_Crouch)<<SK_CROUCH;
//    loc.bits |=   BUTTON(gamefunc_Fire)<<SK_FIRE;
//    loc.bits |= (BUTTON(gamefunc_Aim_Up) || (BUTTON(gamefunc_Dpad_Aiming) && vel > 0))<<SK_AIM_UP;
//    loc.bits |= (BUTTON(gamefunc_Aim_Down) || (BUTTON(gamefunc_Dpad_Aiming) && vel < 0))<<SK_AIM_DOWN;
//    if (ud.runkey_mode) loc.bits |= (ud.auto_run | BUTTON(gamefunc_Run))<<SK_RUN;
//    else loc.bits |= (BUTTON(gamefunc_Run) ^ ud.auto_run)<<SK_RUN;
//    loc.bits |=   BUTTON(gamefunc_Look_Left)<<SK_LOOK_LEFT;
//    loc.bits |=   BUTTON(gamefunc_Look_Right)<<SK_LOOK_RIGHT;
//    loc.bits |=   j<<SK_WEAPON_BITS;
//    loc.bits |=   BUTTON(gamefunc_Steroids)<<SK_STEROIDS;
//    loc.bits |=   BUTTON(gamefunc_Look_Up)<<SK_LOOK_UP;
//    loc.bits |=   BUTTON(gamefunc_Look_Down)<<SK_LOOK_DOWN;
//    loc.bits |=   BUTTON(gamefunc_NightVision)<<SK_NIGHTVISION;
//    loc.bits |=   BUTTON(gamefunc_MedKit)<<SK_MEDKIT;
//    loc.bits |=   BUTTON(gamefunc_Center_View)<<SK_CENTER_VIEW;
//    loc.bits |=   BUTTON(gamefunc_Holster_Weapon)<<SK_HOLSTER;
//    loc.bits |= (BUTTON(gamefunc_Inventory_Left) || (BUTTON(gamefunc_Dpad_Select) && (svel > 0 || angvel < 0))) <<SK_INV_LEFT;
//    loc.bits |=   KB_KeyPressed(sc_Pause)<<SK_PAUSE;
//    loc.bits |=   BUTTON(gamefunc_Quick_Kick)<<SK_QUICK_KICK;
//    loc.bits |=   g_myAimMode<<SK_AIMMODE;
//    loc.bits |=   BUTTON(gamefunc_Holo_Duke)<<SK_HOLODUKE;
//    loc.bits |=   BUTTON(gamefunc_Jetpack)<<SK_JETPACK;
//    loc.bits |= (g_gameQuit<<SK_GAMEQUIT);
//    loc.bits |= (BUTTON(gamefunc_Inventory_Right) || (BUTTON(gamefunc_Dpad_Select) && (svel < 0 || angvel > 0))) <<SK_INV_RIGHT;
//    loc.bits |=   BUTTON(gamefunc_TurnAround)<<SK_TURNAROUND;
//    loc.bits |=   BUTTON(gamefunc_Open)<<SK_OPEN;
//    loc.bits |=   BUTTON(gamefunc_Inventory)<<SK_INVENTORY;
//    loc.bits |=   ((uint32_t)KB_KeyPressed(sc_Escape))<<SK_ESCAPE;

//    if (BUTTON(gamefunc_Dpad_Select))
//        vel = svel = angvel = 0;

//    if (BUTTON(gamefunc_Dpad_Aiming))
//        vel = 0;

//    if (PWEAPON(snum, g_player[snum].ps.curr_weapon, Flags) & WEAPON_SEMIAUTO && BUTTON(gamefunc_Fire))
//        CONTROL_ClearButton(gamefunc_Fire);

    loc.extbits = 0;
    //loc.extbits |= (BUTTON(gamefunc_Move_Forward) || (vel > 0));
    //loc.extbits |= (BUTTON(gamefunc_Move_Backward) || (vel < 0))<<1;
    //loc.extbits |= (BUTTON(gamefunc_Strafe_Left) || (svel > 0))<<2;
    //loc.extbits |= (BUTTON(gamefunc_Strafe_Right) || (svel < 0))<<3;

    tempHC(function() {
        loc.bits = 0;
        //if(tempKeyDown[38] || tempKeyDown[40] || tempKeyDown[37] || tempKeyDown[39] )debugger;
        if(tempKeyDown[38])//up
            vel += 100;
        if(tempKeyDown[40])//down
            vel -= 100;
        if(tempKeyDown[37])//left
            angvel -= 20;
        if(tempKeyDown[39])//right
            angvel += 20;
        if(tempKeyDown[33])//look up pg up
            horiz += 20;
        if(tempKeyDown[34])//look down pg down
            horiz -= 20;
        if(tempKeyDown[65]) // a
            loc.bits |=   1<<SK_JUMP;
        if(tempKeyDown[90]) //m z
            loc.bits |=   1<<SK_CROUCH;
        if(tempKeyDown[17]) //ctrl
            loc.bits |=   1<<SK_FIRE;
        if(tempKeyDown[32]) //space
            loc.bits |=   1<<SK_OPEN;
        if(tempKeyDown[88])//strafe left x
            svel += 50;
        if(tempKeyDown[67])//strafe right c
            svel -= 50;
    });


    //if (G_HaveEvent(EVENT_PROCESSINPUT) || G_HaveEvent(EVENT_TURNLEFT))
    //    loc.extbits |= BUTTON(gamefunc_Turn_Left)<<4;

    //if (G_HaveEvent(EVENT_PROCESSINPUT) || G_HaveEvent(EVENT_TURNRIGHT))
    //    loc.extbits |= BUTTON(gamefunc_Turn_Right)<<5;

//    // used for changing team
//    loc.extbits |= (g_player[snum].pteam != g_player[snum].ps.team)<<6;

//    if (ud.scrollmode && ud.overhead_on)
//    {
//        ud.folfvel = vel;
//        ud.folavel = angvel;
//        loc.fvel = loc.svel = loc.avel = loc.horz = 0;
//        return;
//    }

    daang = p.ang;

    momx = mulscale9(vel,sintable[(daang+2560)&2047]);
    momy = mulscale9(vel,sintable[(daang+2048)&2047]);

    momx += mulscale9(svel,sintable[(daang+2048)&2047]);
    momy += mulscale9(svel,sintable[(daang+1536)&2047]);

    momx += fricxv;
    momy += fricyv;

    loc.fvel = momx;
    loc.svel = momy;

    loc.avel = angvel;
    loc.horz = horiz;
}

function /*int32_t */P_DoCounters(p:DukePlayer_t):number
{
    var /*int32_t */snum = sprite[p.i].yvel;

//        j = g_player[snum].sync.avel;
//        p.weapon_ang = -(j/5);

    if (snum < 0) return 1;

    if (p.invdisptime > 0)
        p.invdisptime--;

    if (p.tipincs > 0)
        p.tipincs--;

    if (p.last_pissed_time > 0)
    {
        switch (--p.last_pissed_time)
        {
        case GAMETICSPERSEC*219:
            {
                A_PlaySound(FLUSH_TOILET,p.i);
                if (snum == screenpeek || GTFLAGS(GAMETYPE_COOPSOUND))
                    A_PlaySound(DUKE_PISSRELIEF,p.i);
            }
            break;
        case GAMETICSPERSEC*218:
            {
                p.holster_weapon = 0;
                p.weapon_pos = WEAPON_POS_RAISE;
            }
            break;
        }
    }

    if (p.crack_time > 0)
    {
        if (--p.crack_time == 0)
        {
            p.knuckle_incs = 1;
            p.crack_time = 777;
        }
    }

    if (p.inv_amount[GET_STEROIDS] > 0 && p.inv_amount[GET_STEROIDS] < 400)
    {
        if (--p.inv_amount[GET_STEROIDS] == 0)
            P_SelectNextInvItem(p);

        if (!(p.inv_amount[GET_STEROIDS]&7))
            if (snum == screenpeek || GTFLAGS(GAMETYPE_COOPSOUND))
                A_PlaySound(DUKE_HARTBEAT,p.i);
    }

    if (p.heat_on && p.inv_amount[GET_HEATS] > 0)
    {
        if (--p.inv_amount[GET_HEATS] == 0)
        {
            p.heat_on = 0;
            P_SelectNextInvItem(p);
            A_PlaySound(NITEVISION_ONOFF,p.i);
            P_UpdateScreenPal(p);
        }
    }

    if (p.holoduke_on >= 0)
    {
        if (--p.inv_amount[GET_HOLODUKE] <= 0)
        {
            A_PlaySound(TELEPORTER,p.i);
            p.holoduke_on = -1;
            P_SelectNextInvItem(p);
        }
    }

    if (p.jetpack_on && p.inv_amount[GET_JETPACK] > 0)
    {
        if (--p.inv_amount[GET_JETPACK] <= 0)
        {
            p.jetpack_on = 0;
            P_SelectNextInvItem(p);
            A_PlaySound(DUKE_JETPACK_OFF,p.i);
            S_StopEnvSound(DUKE_JETPACK_IDLE,p.i);
            S_StopEnvSound(DUKE_JETPACK_ON,p.i);
        }
    }

    if (p.quick_kick > 0 && sprite[p.i].pal != 1)
    {
        p.last_quick_kick = p.quick_kick+1;

        if (--p.quick_kick == 8)
            A_Shoot(p.i,KNEE);
    }
    else if (p.last_quick_kick > 0) p.last_quick_kick--;

    if (p.access_incs && sprite[p.i].pal != 1)
    {
        p.access_incs++;
        if (sprite[p.i].extra <= 0)
            p.access_incs = 12;

        if (p.access_incs == 12)
        {
            if (p.access_spritenum >= 0)
            {
                P_ActivateSwitch(snum,p.access_spritenum,1);
                switch (sprite[p.access_spritenum].pal)
                {
                case 0:
                    p.got_access &= (0xffff-0x1);
                    break;
                case 21:
                    p.got_access &= (0xffff-0x2);
                    break;
                case 23:
                    p.got_access &= (0xffff-0x4);
                    break;
                }
                p.access_spritenum = -1;
            }
            else
            {
                P_ActivateSwitch(snum,p.access_wallnum,0);
                switch (wall[p.access_wallnum].pal)
                {
                case 0:
                    p.got_access &= (0xffff-0x1);
                    break;
                case 21:
                    p.got_access &= (0xffff-0x2);
                    break;
                case 23:
                    p.got_access &= (0xffff-0x4);
                    break;
                }
            }
        }

        if (p.access_incs > 20)
        {
            p.access_incs = 0;
            p.weapon_pos = WEAPON_POS_RAISE;
            p.kickback_pic = 0;
        }
    }

    if (p.cursectnum >= 0 && p.scuba_on == 0 && sector[p.cursectnum].lotag == ST_2_UNDERWATER)
    {
        if (p.inv_amount[GET_SCUBA] > 0)
        {
            p.scuba_on = 1;
            p.inven_icon = ICON_SCUBA;
            P_DoQuote(QUOTE_SCUBA_ON,p);
        }
        else
        {
            if (p.airleft > 0)
                p.airleft--;
            else
            {
                p.extra_extra8 += 32;
                if (p.last_extra < (p.max_player_health>>1) && (p.last_extra&3) == 0)
                    A_PlaySound(DUKE_LONGTERM_PAIN,p.i);
            }
        }
    }
    else if (p.inv_amount[GET_SCUBA] > 0 && p.scuba_on)
    {
        p.inv_amount[GET_SCUBA]--;
        if (p.inv_amount[GET_SCUBA] == 0)
        {
            p.scuba_on = 0;
            P_SelectNextInvItem(p);
        }
    }

    if (p.knuckle_incs)
    {
        if (++p.knuckle_incs == 10)
        {
            if (totalclock > 1024)
                if (snum == screenpeek || GTFLAGS(GAMETYPE_COOPSOUND))
                {

                    if (rand()&1)
                        A_PlaySound(DUKE_CRACK,p.i);
                    else A_PlaySound(DUKE_CRACK2,p.i);

                }

            A_PlaySound(DUKE_CRACK_FIRST,p.i);

        }
        else if (p.knuckle_incs == 22 || TEST_SYNC_KEY(g_player[snum].sync.bits, SK_FIRE))
            p.knuckle_incs=0;

        return 1;
    }
    return 0;
}

var WeaponPickupSprites = new Int16Array([ KNEE__STATIC, FIRSTGUNSPRITE__STATIC, SHOTGUNSPRITE__STATIC,
        CHAINGUNSPRITE__STATIC, RPGSPRITE__STATIC, HEAVYHBOMB__STATIC, SHRINKERSPRITE__STATIC, DEVISTATORSPRITE__STATIC,
        TRIPBOMBSPRITE__STATIC, FREEZESPRITE__STATIC, HEAVYHBOMB__STATIC, SHRINKERSPRITE__STATIC
                                           ]);
// this is used for player deaths
function P_DropWeapon(p:DukePlayer_t):void
{
    var/*int32_t */snum = sprite[p.i].yvel,
            cw = PWEAPON(snum, p.curr_weapon, WorksLike);

    if (/*(unsigned)*/cw >= MAX_WEAPONS) return;
      
    if (krand()&1)
        A_Spawn(p.i, WeaponPickupSprites[cw]);
    else switch (cw)
        {
        case RPG_WEAPON:
        case HANDBOMB_WEAPON:
            A_Spawn(p.i, EXPLOSION2);
            break;
        }
}

function P_AddAmmo(/*int32_t */weapon:number,p:DukePlayer_t ,/*int32_t */amount:number):void 
{
    p.ammo_amount[weapon] += amount;

    if (p.ammo_amount[weapon] > p.max_ammo_amount[weapon])
        p.ammo_amount[weapon] = p.max_ammo_amount[weapon];
}

function P_AddWeaponNoSwitch(p:DukePlayer_t, /*int32_t */weapon:number):void
{
    var/*int32_t */snum = sprite[p.i].yvel;

    if ((p.gotweapon & (1<<weapon)) == 0)
    {
        p.gotweapon |= (1<<weapon);

        if (weapon == SHRINKER_WEAPON)
            p.gotweapon |= (1<<GROW_WEAPON);
    }

    if (PWEAPON(snum, p.curr_weapon, SelectSound) > 0)
        S_StopEnvSound(PWEAPON(snum, p.curr_weapon, SelectSound),p.i);

    if (PWEAPON(snum, weapon, SelectSound) > 0)
        A_PlaySound(PWEAPON(snum, weapon, SelectSound),p.i);
}

function P_ChangeWeapon(p:DukePlayer_t ,/*int32_t */weapon:number):void
{
    var/*int32_t */i = 0, snum = sprite[p.i].yvel;
    var/*nt8_t */curr_weapon = p.curr_weapon;

    if (p.reloading) return;

    if (p.curr_weapon != weapon && G_HaveEvent(EVENT_CHANGEWEAPON))
        i = VM_OnEvent(EVENT_CHANGEWEAPON,p.i, snum, -1, weapon);

    if (i == -1)
        return;
    else if (i != -2)
        p.curr_weapon = weapon;

    p.last_weapon = curr_weapon;

    p.random_club_frame = 0;

    if (p.weapon_pos == 0)
        p.weapon_pos = -1;
    else p.weapon_pos = WEAPON_POS_LOWER;

    if (p.holster_weapon)
    {
        p.weapon_pos = WEAPON_POS_RAISE;
        p.holster_weapon = 0;
        p.last_weapon = -1;
    }

    p.kickback_pic = 0;

    P_SetWeaponGamevars(snum, p);
}

function P_AddWeapon(p:DukePlayer_t ,/*int32_t */weapon:number):void
{
    P_AddWeaponNoSwitch(p, weapon);
    P_ChangeWeapon(p, weapon);
}

function P_SelectNextInvItem(p:DukePlayer_t):void
{
    if (p.inv_amount[GET_FIRSTAID] > 0)
        p.inven_icon = ICON_FIRSTAID;
    else if (p.inv_amount[GET_STEROIDS] > 0)
        p.inven_icon = ICON_STEROIDS;
    else if (p.inv_amount[GET_JETPACK] > 0)
        p.inven_icon = ICON_JETPACK;
    else if (p.inv_amount[GET_HOLODUKE] > 0)
        p.inven_icon = ICON_HOLODUKE;
    else if (p.inv_amount[GET_HEATS] > 0)
        p.inven_icon = ICON_HEATS;
    else if (p.inv_amount[GET_SCUBA] > 0)
        p.inven_icon = ICON_SCUBA;
    else if (p.inv_amount[GET_BOOTS] > 0)
        p.inven_icon = ICON_BOOTS;
    else p.inven_icon = ICON_NONE;
}

function P_CheckWeapon(p:DukePlayer_t ):void
{
    var /*int32_t */i:number, snum:number, weapon:number;

    if (p.reloading) return;

    if (p.wantweaponfire >= 0)
    {
        weapon = p.wantweaponfire;
        p.wantweaponfire = -1;

        if (weapon == p.curr_weapon) return;
        if ((p.gotweapon & (1<<weapon)) && p.ammo_amount[weapon] > 0)
        {
            P_AddWeapon(p,weapon);
            return;
        }
    }

    weapon = p.curr_weapon;

    if ((p.gotweapon & (1<<weapon)) && (p.ammo_amount[weapon] > 0 || !(p.weaponswitch & 2)))
        return;

    snum = sprite[p.i].yvel;

    for (i=0; i<10; i++)
    {
        weapon = g_player[snum].wchoice[i];
        if (window.VOLUMEONE && weapon > 6) continue;

        if (weapon == 0) weapon = 9;
        else weapon--;

        if (weapon == 0 || ((p.gotweapon & (1<<weapon)) && p.ammo_amount[weapon] > 0))
            break;
    }

    if (i == 10) weapon = 0;

    // Found the weapon

    P_ChangeWeapon(p, weapon);
}

//#ifdef LUNATIC
//void P_CheckWeaponI(int32_t snum)
//{
//    P_CheckWeapon(g_player[snum].ps);
//}
//#endif

function P_CheckTouchDamage(p:DukePlayer_t , /*int32_t */obj:number):void
{
    if ((obj = VM_OnEvent(EVENT_CHECKTOUCHDAMAGE, p.i, sprite[p.i].yvel, -1, obj)) == -1)
        return;

    if ((obj&49152) == 49152)
    {
        obj &= (MAXSPRITES-1);

        if (sprite[obj].picnum == CACTUS)
        {
            if (p.hurt_delay < 8)
            {
                sprite[p.i].extra -= 5;

                p.hurt_delay = 16;
                P_PalFrom(p, 32, 32,0,0);
                A_PlaySound(DUKE_LONGTERM_PAIN,p.i);
            }
        }
        return;
    }

    if ((obj&49152) != 32768) return;
    obj &= (MAXWALLS-1);

    if (p.hurt_delay > 0) p.hurt_delay--;
    else if (wall[obj].cstat&85)
    {
        var /*int32_t */switchpicnum = wall[obj].overpicnum;
        if (switchpicnum>W_FORCEFIELD && switchpicnum<=W_FORCEFIELD+2)
            switchpicnum=W_FORCEFIELD;

        switch (DYNAMICTILEMAP(switchpicnum))
        {
        case W_FORCEFIELD__STATIC:
            //        case W_FORCEFIELD+1:
            //        case W_FORCEFIELD+2:
            sprite[p.i].extra -= 5;

            p.hurt_delay = 16;
            P_PalFrom(p, 32, 32,0,0);

            p.vel.x = -(sintable[(p.ang+512)&2047]<<8);
            p.vel.y = -(sintable[(p.ang)&2047]<<8);
            A_PlaySound(DUKE_LONGTERM_PAIN,p.i);

            {
                var davect = new vec3_t();

                davect.x = p.pos.x+(sintable[(p.ang+512)&2047]>>9);
                davect.y = p.pos.y+(sintable[p.ang&2047]>>9);
                davect.z = p.pos.z;
                A_DamageWall(p.i,obj,davect,-1);
            }

            break;

        case BIGFORCE__STATIC:
            p.hurt_delay = GAMETICSPERSEC;
            {
                var davect = new vec3_t();

                davect.x = p.pos.x+(sintable[(p.ang+512)&2047]>>9);
                davect.y = p.pos.y+(sintable[p.ang&2047]>>9);
                davect.z = p.pos.z;
                A_DamageWall(p.i,obj,davect,-1);
            }
            break;

        }
    }
}

function /*int32_t */P_CheckFloorDamage(p:DukePlayer_t, /*int32_t */tex: number):number
{
    var s = sprite[p.i];

    if ((tex = VM_OnEvent(EVENT_CHECKFLOORDAMAGE, p.i, sprite[p.i].yvel, -1, tex)) >= MAXTILES)
        return 0;

    switch (DYNAMICTILEMAP(tex))
    {
    case HURTRAIL__STATIC:
        if (rnd(32))
        {
            if (p.inv_amount[GET_BOOTS] > 0)
                return 1;
            else
            {
                if (!A_CheckSoundPlaying(p.i,DUKE_LONGTERM_PAIN))
                    A_PlaySound(DUKE_LONGTERM_PAIN,p.i);

                P_PalFrom(p, 32, 64,64,64);

                s.extra -= 1+(krand()&3);
                if (!A_CheckSoundPlaying(p.i,SHORT_CIRCUIT))
                    A_PlaySound(SHORT_CIRCUIT,p.i);

                return 0;
            }
        }
        break;
    case FLOORSLIME__STATIC:
        if (rnd(16))
        {
            if (p.inv_amount[GET_BOOTS] > 0)
                return 1;
            else
            {
                if (!A_CheckSoundPlaying(p.i,DUKE_LONGTERM_PAIN))
                    A_PlaySound(DUKE_LONGTERM_PAIN,p.i);

                P_PalFrom(p, 32, 0,8,0);
                s.extra -= 1+(krand()&3);

                return 0;
            }
        }
        break;
    case FLOORPLASMA__STATIC:
        if (rnd(32))
        {
            if (p.inv_amount[GET_BOOTS] > 0)
                return 1;
            else
            {
                if (!A_CheckSoundPlaying(p.i,DUKE_LONGTERM_PAIN))
                    A_PlaySound(DUKE_LONGTERM_PAIN,p.i);

                P_PalFrom(p, 32, 8,0,0);
                s.extra -= 1+(krand()&3);

                return 0;
            }
        }
        break;
    }

    return 0;
}


//int32_t P_FindOtherPlayer(int32_t p,int32_t *d)
//{
//    int32_t j, closest_player = p;
//    int32_t x, closest = INT32_MAX;

//    for (TRAVERSE_CONNECT(j))
//        if (p != j && sprite[g_player[j].ps.i].extra > 0)
//        {
//            x = klabs(g_player[j].ps.opos.x-g_player[p].ps.pos.x) +
//                klabs(g_player[j].ps.opos.y-g_player[p].ps.pos.y) +
//                (klabs(g_player[j].ps.opos.z-g_player[p].ps.pos.z)>>4);

//            if (x < closest)
//            {
//                closest_player = j;
//                closest = x;
//            }
//        }

//    *d = closest;
//    return closest_player;
//}

function P_FragPlayer(/*int32_t */snum:number):void
{
    var p = g_player[snum].ps;
    var s = sprite[p.i];

    if (g_netServer || g_netClient)
        randomseed = ticrandomseed;

    if (s.pal != 1)
    {
        P_PalFrom(p, 63, 63,0,0);

        p.pos.z -= (16<<8);
        s.z -= (16<<8);

        p.dead_flag = (512-((krand()&1)<<10)+(krand()&255)-512)&2047;
        if (p.dead_flag == 0)
            p.dead_flag++;
//#ifndef NETCODE_DISABLE
        if (g_netServer)
        {todoThrow();
            //packbuf[0] = PACKET_FRAG;
            //packbuf[1] = snum;
            //packbuf[2] = p.frag_ps;
            //packbuf[3] = actor[p.i].picnum;
            //*(int32_t *)&packbuf[4] = ticrandomseed;
            //packbuf[8] = myconnectindex;

            //enet_host_broadcast(g_netServer, CHAN_GAMESTATE, enet_packet_create(packbuf, 9, ENET_PACKET_FLAG_RELIABLE));
        }
//#endif
    }

    p.jetpack_on = 0;
    p.holoduke_on = -1;

    S_StopEnvSound(DUKE_JETPACK_IDLE,p.i);
    if (p.scream_voice > FX_Ok)
    {
        FX_StopSound(p.scream_voice);
        S_Cleanup();
        //                S_TestSoundCallback(DUKE_SCREAM);
        p.scream_voice = -1;
    }

    if (s.pal != 1 && (s.cstat&32768) == 0) s.cstat = 0;

    if ((g_netServer || ud.multimode > 1) && (s.pal != 1 || (s.cstat&32768)))
    {
        if (p.frag_ps != snum)
        {todoThrow();
            //if (GTFLAGS(GAMETYPE_TDM) && g_player[p.frag_ps].ps.team == g_player[snum].ps.team)
            //    g_player[p.frag_ps].ps.fraggedself++;
            //else
            //{
            //    g_player[p.frag_ps].ps.frag++;
            //    g_player[p.frag_ps].frags[snum]++;
            //    g_player[snum].frags[snum]++; // deaths
            //}

            //if (snum == screenpeek)
            //{
            //    Bsprintf(ScriptQuotes[QUOTE_RESERVED],"Killed by %s",&g_player[p.frag_ps].user_name[0]);
            //    P_DoQuote(QUOTE_RESERVED,p);
            //}
            //else
            //{
            //    Bsprintf(ScriptQuotes[QUOTE_RESERVED2],"Killed %s",&g_player[snum].user_name[0]);
            //    P_DoQuote(QUOTE_RESERVED2,g_player[p.frag_ps].ps);
            //}

            //if (ud.obituaries)
            //{
            //    Bsprintf(tempbuf,ScriptQuotes[OBITQUOTEINDEX+(krand()%g_numObituaries)],
            //             &g_player[p.frag_ps].user_name[0],
            //             &g_player[snum].user_name[0]);
            //    G_AddUserQuote(tempbuf);
            //}
            //else krand();
        }
        else
        {
            if (actor[p.i].picnum != APLAYERTOP)
            {todoThrow();
                //p.fraggedself++;
                //if ((unsigned)p.wackedbyactor < MAXTILES && A_CheckEnemyTile(sprite[p.wackedbyactor].picnum))
                //    Bsprintf(tempbuf,ScriptQuotes[OBITQUOTEINDEX+(krand()%g_numObituaries)],"A monster",&g_player[snum].user_name[0]);
                //else if (actor[p.i].picnum == NUKEBUTTON)
                //    Bsprintf(tempbuf,"^02%s^02 tried to leave",&g_player[snum].user_name[0]);
                //else
                //{
                //    // random suicide death string
                //    Bsprintf(tempbuf,ScriptQuotes[SUICIDEQUOTEINDEX+(krand()%g_numSelfObituaries)],&g_player[snum].user_name[0]);
                //}
            }
            else Bsprintf(tempbuf,"^02%s^02 switched to team %d",g_player[snum].user_name[0],p.team+1);

            if (ud.obituaries)
                G_AddUserQuote(tempbuf);
        }
        p.frag_ps = snum;
        pus = NUMPAGES;
    }
}

//#ifdef LUNATIC
//# define PIPEBOMB_CONTROL(snum) (g_player[snum].ps.pipebombControl)
//#else
function PIPEBOMB_CONTROL(snum:number):number {return Gv_GetVarByLabel("PIPEBOMB_CONTROL", PIPEBOMB_REMOTE, -1, snum);}
//#endif

function P_ProcessWeapon(/*int32_t */snum:number):void 
{
    var p = g_player[snum].ps;
    //var kb = new R(p.kickback_pic);
    var /*const int32_t */shrunk = (sprite[p.i].yrepeat < 32)?1:0;
    var /*uint32_t */sb_snum = g_player[snum].sync.bits;
    var /*int32_t */i:number, j:number, k:number;

    switch (p.weapon_pos)
    {
    case -9:
        if (p.last_weapon >= 0)
        {
            p.weapon_pos = WEAPON_POS_RAISE;
            p.last_weapon = -1;
        }
        else if (p.holster_weapon == 0)
            p.weapon_pos = WEAPON_POS_RAISE;
        break;
    case 0:
        break;
    default:
        p.weapon_pos--;
        break;
    }

    if (TEST_SYNC_KEY(sb_snum, SK_FIRE))
    {
        P_SetWeaponGamevars(snum, p);
        
        if (VM_OnEvent(EVENT_PRESSEDFIRE, p.i, snum, -1, 0) != 0)
            sb_snum &= ~BIT(SK_FIRE);
    }

    if (TEST_SYNC_KEY(sb_snum, SK_HOLSTER))   // 'Holster Weapon
    {
        P_SetWeaponGamevars(snum, p);
        
        if (VM_OnEvent(EVENT_HOLSTER, p.i, snum, -1, 0) == 0)
        {
            if (PWEAPON(0, p.curr_weapon, WorksLike) != KNEE_WEAPON)
            {
                if (p.holster_weapon == 0 && p.weapon_pos == 0)
                {
                    p.holster_weapon = 1;
                    p.weapon_pos = -1;
                    P_DoQuote(QUOTE_WEAPON_LOWERED,p);
                }
                else if (p.holster_weapon == 1 && p.weapon_pos == WEAPON_POS_LOWER)
                {
                    p.holster_weapon = 0;
                    p.weapon_pos = WEAPON_POS_RAISE;
                    P_DoQuote(QUOTE_WEAPON_RAISED,p);
                }
            }

            if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_HOLSTER_CLEARS_CLIP)
            {
                if (p.ammo_amount[p.curr_weapon] > PWEAPON(snum, p.curr_weapon, Clip)
                        && (p.ammo_amount[p.curr_weapon] % PWEAPON(snum, p.curr_weapon, Clip)) != 0)
                {
                    p.ammo_amount[p.curr_weapon]-=
                        p.ammo_amount[p.curr_weapon] % PWEAPON(snum, p.curr_weapon, Clip) ;
                    (p.kickback_pic) = PWEAPON(snum, p.curr_weapon, TotalTime);
                    sb_snum &= ~BIT(SK_FIRE); // not firing...
                }
                return;
            }
        }
    }

    if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_GLOWS)
    {
        p.random_club_frame += 64; // Glowing

        if (p.kickback_pic == 0)
        {
            var s = sprite[p.i];
            var /*int32_t*/ x = ((sintable[(s.ang+512)&2047])>>7), y = ((sintable[(s.ang)&2047])>>7);
            var /*int32_t*/ r = 1024+(sintable[p.random_club_frame&2047]>>3);

            s.x += x;
            s.y += y;
            G_AddGameLight(0, p.i, PHEIGHT, max(r, 0), PWEAPON(snum, p.curr_weapon, FlashColor),PR_LIGHT_PRIO_HIGH_GAME);
            actor[p.i].lightcount = 2;
            s.x -= x;
            s.y -= y;
        }

    }

    // this is a hack for WEAPON_FIREEVERYOTHER
    if (actor[p.i].t_data[7])
    {
        actor[p.i].t_data[7]--;
        if (p.last_weapon == -1 && actor[p.i].t_data[7] != 0 && ((actor[p.i].t_data[7] & 1) == 0))
        {
            if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_AMMOPERSHOT)
            {
                if (p.ammo_amount[p.curr_weapon] > 0)
                    p.ammo_amount[p.curr_weapon]--;
                else
                {
                    actor[p.i].t_data[7] = 0;
                    P_CheckWeapon(p);
                }
            }

            if (actor[p.i].t_data[7] != 0)
                A_Shoot(p.i,PWEAPON(snum, p.curr_weapon, Shoots));
        }
    }

    if (p.rapid_fire_hold == 1)
    {
        if (TEST_SYNC_KEY(sb_snum, SK_FIRE)) return;
        p.rapid_fire_hold = 0;
    }

    if (shrunk || p.tipincs || p.access_incs)
        sb_snum &= ~BIT(SK_FIRE);
    else if (shrunk == 0 && (sb_snum&(1<<2)) && (p.kickback_pic) == 0 && p.fist_incs == 0 &&
             p.last_weapon == -1 && (p.weapon_pos == 0 || p.holster_weapon == 1))
    {
        p.crack_time = 777;

        if (p.holster_weapon == 1)
        {
            if (p.last_pissed_time <= (GAMETICSPERSEC*218) && p.weapon_pos == WEAPON_POS_LOWER)
            {
                p.holster_weapon = 0;
                p.weapon_pos = WEAPON_POS_RAISE;
                P_DoQuote(QUOTE_WEAPON_RAISED,p);
            }
        }
        else
        {
            P_SetWeaponGamevars(snum, p);

            if (VM_OnEvent(EVENT_FIRE, p.i, snum, -1, 0) == 0)
            {
                if (G_HaveEvent(EVENT_FIREWEAPON)) // this event is deprecated
                    VM_OnEvent(EVENT_FIREWEAPON, p.i, snum, -1, 0);

                switch (PWEAPON(snum, p.curr_weapon, WorksLike))
                {
                case HANDBOMB_WEAPON:
                    p.hbomb_hold_delay = 0;
                    if (p.ammo_amount[p.curr_weapon] > 0)
                    {
                        (p.kickback_pic)=1;
                        if (PWEAPON(snum, p.curr_weapon, InitialSound) > 0)
                            A_PlaySound(PWEAPON(snum, p.curr_weapon, InitialSound), p.i);
                    }
                    break;

                case HANDREMOTE_WEAPON:
                    p.hbomb_hold_delay = 0;
                    (p.kickback_pic) = 1;
                    if (PWEAPON(snum, p.curr_weapon, InitialSound) > 0)
                        A_PlaySound(PWEAPON(snum, p.curr_weapon, InitialSound), p.i);
                    break;

                case SHOTGUN_WEAPON:
                    if (p.ammo_amount[p.curr_weapon] > 0 && p.random_club_frame == 0)
                    {
                        (p.kickback_pic)=1;
                        if (PWEAPON(snum, p.curr_weapon, InitialSound) > 0)
                            A_PlaySound(PWEAPON(snum, p.curr_weapon, InitialSound), p.i);
                    }
                    break;

                case TRIPBOMB_WEAPON:
                    if (p.ammo_amount[p.curr_weapon] > 0)
                    {
                        var hit:hitdata_t ;
                        hitscan(/*(const vec3_t *)*/p.pos,
                                p.cursectnum, sintable[(p.ang+512)&2047],
                                sintable[p.ang&2047], (100-p.horiz-p.horizoff)*32,
                                hit,CLIPMASK1);

                        if (hit.sect < 0 || hit.sprite >= 0)
                            break;

                        // ST_2_UNDERWATER
                        if (hit.wall >= 0 && sector[hit.sect].lotag > 2)
                            break;

                        if (hit.wall >= 0 && wall[hit.wall].overpicnum >= 0)
                            if (wall[hit.wall].overpicnum == BIGFORCE)
                                break;

                        j = headspritesect[hit.sect];
                        while (j >= 0)
                        {
                            if (sprite[j].picnum == TRIPBOMB &&
                                    klabs(sprite[j].z-hit.pos.z) < (12<<8) &&
                                    ((sprite[j].x-hit.pos.x)*(sprite[j].x-hit.pos.x)+
                                     (sprite[j].y-hit.pos.y)*(sprite[j].y-hit.pos.y)) < (290*290))
                                break;
                            j = nextspritesect[j];
                        }

                        // ST_2_UNDERWATER
                        if (j == -1 && hit.wall >= 0 && (wall[hit.wall].cstat&16) == 0)
                            if ((wall[hit.wall].nextsector >= 0 &&
                                    sector[wall[hit.wall].nextsector].lotag <= 2) ||
                                    (wall[hit.wall].nextsector == -1 && sector[hit.sect].lotag <= 2))
                                if (((hit.pos.x-p.pos.x)*(hit.pos.x-p.pos.x) +
                                        (hit.pos.y-p.pos.y)*(hit.pos.y-p.pos.y)) < (290*290))
                                {
                                    p.pos.z = p.opos.z;
                                    p.vel.z = 0;
                                    (p.kickback_pic) = 1;
                                    if (PWEAPON(snum, p.curr_weapon, InitialSound) > 0)
                                    {
                                        A_PlaySound(PWEAPON(snum, p.curr_weapon, InitialSound), p.i);
                                    }
                                }
                    }
                    break;

                case PISTOL_WEAPON:
                case CHAINGUN_WEAPON:
                case SHRINKER_WEAPON:
                case GROW_WEAPON:
                case FREEZE_WEAPON:
                case RPG_WEAPON:
                    if (p.ammo_amount[p.curr_weapon] > 0)
                    {
                        (p.kickback_pic) = 1;
                        if (PWEAPON(snum, p.curr_weapon, InitialSound) > 0)
                            A_PlaySound(PWEAPON(snum, p.curr_weapon, InitialSound), p.i);
                    }
                    break;

                case DEVISTATOR_WEAPON:
                    if (p.ammo_amount[p.curr_weapon] > 0)
                    {
                        (p.kickback_pic) = 1;
                        p.hbomb_hold_delay = !p.hbomb_hold_delay?1:0;
                        if (PWEAPON(snum, p.curr_weapon, InitialSound) > 0)
                            A_PlaySound(PWEAPON(snum, p.curr_weapon, InitialSound), p.i);
                    }
                    break;

                case KNEE_WEAPON:
                    if (p.quick_kick == 0)
                    {
                        (p.kickback_pic) = 1;
                        if (PWEAPON(snum, p.curr_weapon, InitialSound) > 0)
                            A_PlaySound(PWEAPON(snum, p.curr_weapon, InitialSound), p.i);
                    }
                    break;
                }
            }
        }
    }
    else if (p.kickback_pic)
    {
        if (PWEAPON(snum, p.curr_weapon, WorksLike) == HANDBOMB_WEAPON)
        {
            if (PWEAPON(snum, p.curr_weapon, HoldDelay) && ((p.kickback_pic) == PWEAPON(snum, p.curr_weapon, FireDelay)) && TEST_SYNC_KEY(sb_snum, SK_FIRE))
            {
                p.rapid_fire_hold = 1;
                return;
            }

            if (++(p.kickback_pic) == PWEAPON(snum, p.curr_weapon, HoldDelay))
            {
                p.ammo_amount[p.curr_weapon]--;

                if (numplayers < 2 || g_netServer)
                {
                    var /*int32_t */lPipeBombControl:number;

                    if (p.on_ground && TEST_SYNC_KEY(sb_snum, SK_CROUCH))
                    {
                        k = 15;
                        i = ((p.horiz+p.horizoff-100)*20);
                    }
                    else
                    {
                        k = 140;
                        i = -512-((p.horiz+p.horizoff-100)*20);
                    }

                    j = A_InsertSprite(p.cursectnum,
                                       p.pos.x+(sintable[(p.ang+512)&2047]>>6),
                                       p.pos.y+(sintable[p.ang&2047]>>6),
                                       p.pos.z,PWEAPON(snum, p.curr_weapon, Shoots),-16,9,9,
                                       p.ang,(k+(p.hbomb_hold_delay<<5)),i,p.i,1);

                    lPipeBombControl = PIPEBOMB_CONTROL(snum);

                    if (lPipeBombControl & PIPEBOMB_TIMER)
                    {
//#ifdef LUNATIC
//                        int32_t ltime = g_player[snum].ps.pipebombLifetime;
//                        int32_t lv = g_player[snum].ps.pipebombLifetimeVar;
//#else
                        var /*int32_t */ltime = Gv_GetVarByLabel("GRENADE_LIFETIME", NAM_GRENADE_LIFETIME, -1, snum);
                        var /*int32_t */lv=Gv_GetVarByLabel("GRENADE_LIFETIME_VAR", NAM_GRENADE_LIFETIME_VAR, -1, snum);
//#endif
                        actor[j].t_data[7]= ltime
                                            + mulscale(krand(),lv, 14)
                                            - lv;
                        actor[j].t_data[6]=1;
                    }
                    else actor[j].t_data[6]=2;

                    if (k == 15)
                    {
                        sprite[j].yvel = 3;
                        sprite[j].z += (8<<8);
                    }

                    if (A_GetHitscanRange(p.i) < 512)
                    {
                        sprite[j].ang += 1024;
                        sprite[j].zvel /= 3;
                        sprite[j].xvel /= 3;
                    }
                }

                p.hbomb_on = 1;
            }
            else if ((p.kickback_pic) < PWEAPON(snum, p.curr_weapon, HoldDelay) && TEST_SYNC_KEY(sb_snum, SK_FIRE))
                p.hbomb_hold_delay++;
            else if ((p.kickback_pic) > PWEAPON(snum, p.curr_weapon, TotalTime))
            {
                (p.kickback_pic) = 0;
                p.weapon_pos = WEAPON_POS_RAISE;
                if (PIPEBOMB_CONTROL(snum) == PIPEBOMB_REMOTE)
                {
                    p.curr_weapon = HANDREMOTE_WEAPON;
                    p.last_weapon = -1;
                }
                else P_CheckWeapon(p);
            }
        }
        else if (PWEAPON(snum, p.curr_weapon, WorksLike) == HANDREMOTE_WEAPON)
        {
            if (++(p.kickback_pic) == PWEAPON(snum, p.curr_weapon, FireDelay))
            {
                if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_BOMB_TRIGGER)
                    p.hbomb_on = 0;

                if (PWEAPON(snum, p.curr_weapon, Shoots) != 0)
                {
                    if (!(PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_NOVISIBLE))
                    {
                        lastvisinc = totalclock+32;
                        p.visibility = 0;
                    }

                    P_SetWeaponGamevars(snum, p);
                    A_Shoot(p.i, PWEAPON(snum, p.curr_weapon, Shoots));
                }
            }

            if ((p.kickback_pic) >= PWEAPON(snum, p.curr_weapon, TotalTime))
            {
                (p.kickback_pic) = 0;
                if ((p.ammo_amount[HANDBOMB_WEAPON] > 0) &&
                        PIPEBOMB_CONTROL(snum) == PIPEBOMB_REMOTE)
                    P_AddWeapon(p,HANDBOMB_WEAPON);
                else P_CheckWeapon(p);
            }
        }
        else
        {
            // the basic weapon...
            (p.kickback_pic)++;

            if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_CHECKATRELOAD)
            {
                if (PWEAPON(snum, p.curr_weapon, WorksLike) == TRIPBOMB_WEAPON)
                {
                    if ((p.kickback_pic) >= PWEAPON(snum, p.curr_weapon, TotalTime))
                    {
                        (p.kickback_pic) = 0;
                        P_CheckWeapon(p);
                        p.weapon_pos = WEAPON_POS_LOWER;
                    }
                }
                else if (p.kickback_pic >= PWEAPON(snum, p.curr_weapon, Reload))
                    P_CheckWeapon(p);
            }
            else if (PWEAPON(snum, p.curr_weapon, WorksLike)!=KNEE_WEAPON && p.kickback_pic >= PWEAPON(snum, p.curr_weapon, FireDelay))
                P_CheckWeapon(p);

            if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_STANDSTILL
                    && p.kickback_pic < (PWEAPON(snum, p.curr_weapon, FireDelay)+1))
            {
                p.pos.z = p.opos.z;
                p.vel.z = 0;
            }

            if (p.kickback_pic == PWEAPON(snum, p.curr_weapon, Sound2Time))
                if (PWEAPON(snum, p.curr_weapon, Sound2Sound) > 0)
                    A_PlaySound(PWEAPON(snum, p.curr_weapon, Sound2Sound),p.i);

            if (p.kickback_pic == PWEAPON(snum, p.curr_weapon, SpawnTime))
                P_DoWeaponSpawn(p);

            if ((p.kickback_pic) >= PWEAPON(snum, p.curr_weapon, TotalTime))
            {
                if (/*!(PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_CHECKATRELOAD) && */ p.reloading == 1 ||
                        (PWEAPON(snum, p.curr_weapon, Reload) > PWEAPON(snum, p.curr_weapon, TotalTime) && p.ammo_amount[p.curr_weapon] > 0
                         && (PWEAPON(snum, p.curr_weapon, Clip)) && (((p.ammo_amount[p.curr_weapon]%(PWEAPON(snum, p.curr_weapon, Clip)))==0))))
                {
                    var/*int32_t */i = PWEAPON(snum, p.curr_weapon, Reload) - PWEAPON(snum, p.curr_weapon, TotalTime);

                    p.reloading = 1;

                    if ((p.kickback_pic) != (PWEAPON(snum, p.curr_weapon, TotalTime)))
                    {
                        if ((p.kickback_pic) == (PWEAPON(snum, p.curr_weapon, TotalTime)+1))
                        {
                            if (PWEAPON(snum, p.curr_weapon, ReloadSound1) > 0)
                                A_PlaySound(PWEAPON(snum, p.curr_weapon, ReloadSound1),p.i);
                        }
                        else if (((p.kickback_pic) == (PWEAPON(snum, p.curr_weapon, Reload) - (i/3)) &&
                                  !(PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_RELOAD_TIMING)) ||
                                 ((p.kickback_pic) == (PWEAPON(snum, p.curr_weapon, Reload) - i+4) &&
                                  (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_RELOAD_TIMING)))
                        {
                            if (PWEAPON(snum, p.curr_weapon, ReloadSound2) > 0)
                                A_PlaySound(PWEAPON(snum, p.curr_weapon, ReloadSound2),p.i);
                        }
                        else if ((p.kickback_pic) >= (PWEAPON(snum, p.curr_weapon, Reload)))
                        {
                            p.kickback_pic=0;
                            p.reloading = 0;
                        }
                    }
                }
                else
                {
                    if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_AUTOMATIC &&
                            (PWEAPON(snum, p.curr_weapon, WorksLike)==KNEE_WEAPON?1:p.ammo_amount[p.curr_weapon] > 0?1:0))
                    {
                        if (TEST_SYNC_KEY(sb_snum, SK_FIRE))
                        {
                            if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_RANDOMRESTART)
                                p.kickback_pic = 1+(krand()&3);
                            else p.kickback_pic=1;
                        }
                        else p.kickback_pic = 0;
                    }
                    else p.kickback_pic = 0;

                    if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_RESET &&
                            ((PWEAPON(snum, p.curr_weapon, WorksLike) == KNEE_WEAPON)?1:p.ammo_amount[p.curr_weapon] > 0?1:0))
                    {
                        if (TEST_SYNC_KEY(sb_snum, SK_FIRE)) p.kickback_pic = 1;
                        else p.kickback_pic = 0;
                    }
                }
            }
            else if (p.kickback_pic >= PWEAPON(snum, p.curr_weapon, FireDelay) && (p.kickback_pic) < PWEAPON(snum, p.curr_weapon, TotalTime)
                     && ((PWEAPON(snum, p.curr_weapon, WorksLike) == KNEE_WEAPON)?1:p.ammo_amount[p.curr_weapon] > 0?1:0))
            {
                if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_AUTOMATIC)
                {
                    if (!(PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_SEMIAUTO))
                    {
                        if (TEST_SYNC_KEY(sb_snum, SK_FIRE) == 0 && PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_RESET)
                            p.kickback_pic = 0;
                        if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_FIREEVERYTHIRD)
                        {
                            if (((p.kickback_pic)%3) == 0)
                            {
                                P_FireWeapon(p);
                                P_DoWeaponSpawn(p);
                            }
                        }
                        else if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_FIREEVERYOTHER)
                        {
                            P_FireWeapon(p);
                            P_DoWeaponSpawn(p);
                        }
                        else
                        {
                            if (p.kickback_pic == PWEAPON(snum, p.curr_weapon, FireDelay))
                            {
                                P_FireWeapon(p);
                                //                                P_DoWeaponSpawn(p);
                            }
                        }
                        if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_RESET &&
                                (p.kickback_pic) > PWEAPON(snum, p.curr_weapon, TotalTime)-PWEAPON(snum, p.curr_weapon, HoldDelay) &&
                                ((PWEAPON(snum, p.curr_weapon, WorksLike) == KNEE_WEAPON) || p.ammo_amount[p.curr_weapon] > 0))
                        {
                            if (TEST_SYNC_KEY(sb_snum, SK_FIRE)) p.kickback_pic = 1;
                            else p.kickback_pic = 0;
                        }
                    }
                    else
                    {
                        if (PWEAPON(snum, p.curr_weapon, Flags) & WEAPON_FIREEVERYOTHER)
                        {
                            P_FireWeapon(p);
                            P_DoWeaponSpawn(p);
                        }
                        else
                        {
                            if (p.kickback_pic == PWEAPON(snum, p.curr_weapon, FireDelay))
                            {
                                P_FireWeapon(p);
                                //                                P_DoWeaponSpawn(p);
                            }
                        }
                    }
                }
                else if (p.kickback_pic == PWEAPON(snum, p.curr_weapon, FireDelay))
                    P_FireWeapon(p);
            }
        }
    }
}

function/*int32_t */P_DoFist(p: DukePlayer_t):number
{todoThrow();
//    // the fist punching NUKEBUTTON

//    if (++p.fist_incs == 28)
//    {
//        if (ud.recstat == 1) G_CloseDemoWrite();
//        S_PlaySound(PIPEBOMB_EXPLODE);

//        P_PalFrom(p, 48, 64,64,64);
//    }

//    if (p.fist_incs > 42)
//    {
//        int32_t i;

//        for (TRAVERSE_CONNECT(i))
//            g_player[i].ps.gm = MODE_EOL;

//        if (p.buttonpalette && ud.from_bonus == 0)
//        {
//            ud.from_bonus = ud.level_number+1;
//            if (ud.secretlevel > 0 && ud.secretlevel <= MAXLEVELS)
//                ud.level_number = ud.secretlevel-1;
//            ud.m_level_number = ud.level_number;
//        }
//        else
//        {
//            if (ud.from_bonus)
//            {
//                ud.m_level_number = ud.level_number = ud.from_bonus;
//                ud.from_bonus = 0;
//            }
//            else
//            {
//                if (ud.level_number == ud.secretlevel && ud.from_bonus > 0)
//                    ud.level_number = ud.from_bonus;
//                else ud.level_number++;

//                if (ud.level_number > MAXLEVELS-1)
//                    ud.level_number = 0;
//                ud.m_level_number = ud.level_number;
//            }
//        }

//        p.fist_incs = 0;

//        return 1;
//    }

    return 0;
}

//#ifdef YAX_ENABLE
function getzsofslope_player(/*int16_t */sectnum:number, /*int32_t */dax:number, /*int32_t */day:number, /*int32_t **/ceilz:R<number>, /*int32_t **/florz:R<number>): void 
{
    var /*int32_t */i:number, didceil=0, didflor=0;

    if ((sector[sectnum].ceilingstat&512)==0)
    {
        i = yax_getneighborsect(dax, day, sectnum, YAX_CEILING);
        if (i >= 0)
        {
            ceilz.$ = getceilzofslope(i, dax,day);
            didceil = 1;
        }
    }

    if ((sector[sectnum].floorstat&512)==0)
    {
        i = yax_getneighborsect(dax, day, sectnum, YAX_FLOOR);
        if (i >= 0)
        {
            florz.$ = getflorzofslope(i, dax,day);
            didflor = 1;
        }
    }

    if (!didceil || !didflor)
    {
        var /*int32_t */cz=new R<number>(), fz=new R<number>();
        getzsofslope(sectnum, dax, day, cz, fz);

        if (!didceil)
            ceilz.$ = cz.$;
        if (!didflor)
            florz.$ = fz.$;
    }
}
//#endif

//void P_UpdatePosWhenViewingCam(DukePlayer_t *p)
//{
//    int32_t i = p.newowner;

//    p.pos.x = sprite[i].x;
//    p.pos.y = sprite[i].y;
//    p.pos.z = sprite[i].z;
//    p.ang =  sprite[i].ang;
//    p.vel.x = p.vel.y = sprite[p.i].xvel = 0;
//    p.look_ang = 0;
//    p.rotscrnang = 0;
//}

function P_ProcessInput(/*int32_t */snum:number): void
{
    var p = g_player[snum].ps;
    var s = sprite[p.i];

    var /*uint32_t */sb_snum = g_player[snum].sync.bits;

    var /*int32_t*/ j=0, i=0, k=0, doubvel = TICSPERFRAME, shrunk=0;
    var /*int32_t*/ fz=0, cz=0, hz=0, lz=0, truefdist=0, x=0, y=0, psectlotag=0;
    var /*const uint8_t *const */kb = new R(p.kickback_pic);
    var/*int16_t */tempsect:number;

    if (g_player[snum].playerquitflag == 0)
        return;

    p.player_par++;

    VM_OnEvent(EVENT_PROCESSINPUT, p.i, snum, -1, 0);

    if (p.cheat_phase > 0) sb_snum = 0;

    if (p.cursectnum == -1)
    {
        if (s.extra > 0 && ud.noclip == 0)
        {
            P_QuickKill(p);
            A_PlaySound(SQUISHED,p.i);
        }
        p.cursectnum = 0;
    }

    psectlotag = sector[p.cursectnum].lotag;
    p.spritebridge = p.sbs = 0;

    shrunk = (s.yrepeat < 32)?1:0;
    var $cz = new R(cz);
    var $hz = new R(hz);
    var $fz = new R(fz);
    var $lz = new R(lz);
    getzrange(/*(vec3_t *)*/p.pos,p.cursectnum,$cz,$hz,$fz,$lz,163,CLIPMASK0);
    cz = $cz.$;
    hz = $hz.$;
    fz = $fz.$;
    lz = $lz.$;
    dlog(DEBUG_GETZRANGE,  "getzrange after cz %i, hz %i, fz %i, lz %i\n", cz,hz,fz,lz);


//#ifdef YAX_ENABLE
    var $truecz = new R(p.truecz);
    var $truefz = new R(p.truefz);
    getzsofslope_player(p.cursectnum,p.pos.x,p.pos.y,$truecz,$truefz);
//#else
    getzsofslope(p.cursectnum,p.pos.x,p.pos.y,$truecz,$truefz);
    p.truecz = $truecz.$;
    p.truefz = $truefz.$;
//#endif
    j = p.truefz;

    truefdist = klabs(p.pos.z-j);

    if ((lz&49152) == 16384 && psectlotag == 1 && truefdist > PHEIGHT+(16<<8))
        psectlotag = 0;

    actor[p.i].floorz = fz;
    actor[p.i].ceilingz = cz;

    p.ohoriz = p.horiz;
    p.ohorizoff = p.horizoff;

    // calculates automatic view angle for playing without a mouse
    if (p.aim_mode == 0 && p.on_ground && psectlotag != ST_2_UNDERWATER && (sector[p.cursectnum].floorstat&2))
    {
        x = p.pos.x+(sintable[(p.ang+512)&2047]>>5);
        y = p.pos.y+(sintable[p.ang&2047]>>5);
        tempsect = p.cursectnum;
        var $tempsect = new R(tempsect);
        updatesector(x,y,$tempsect);
        tempsect = $tempsect.$;
        if (tempsect >= 0)
        {
            k = getflorzofslope(p.cursectnum,x,y);
            if (p.cursectnum == tempsect)
                p.horizoff += mulscale16(j-k,160);
            else if (klabs(getflorzofslope(tempsect,x,y)-k) <= (4<<8))
                p.horizoff += mulscale16(j-k,160);
        }
    }

    if (p.horizoff > 0) p.horizoff -= ((p.horizoff>>3)+1);
    else if (p.horizoff < 0) p.horizoff += (((-p.horizoff)>>3)+1);

    if (hz >= 0 && (hz&49152) == 49152)
    {
        hz &= (MAXSPRITES-1);

        if (sprite[hz].statnum == STAT_ACTOR && sprite[hz].extra >= 0)
        {
            hz = 0;
            cz = p.truecz;
        }
    }

    if (lz >= 0 && (lz&49152) == 49152)
    {
        j = lz&(MAXSPRITES-1);

        if ((sprite[j].cstat&33) == 33 || (sprite[j].cstat&17) == 17)
        {
            psectlotag = 0;
            p.footprintcount = 0;
            p.spritebridge = 1;
            p.sbs = j;
        }
        else if (A_CheckEnemySprite(sprite[j]) && sprite[j].xrepeat > 24 && klabs(s.z-sprite[j].z) < (84<<8))
        {
            // I think this is what makes the player slide off enemies... might be a good sprite flag to add later
            j = getangle(sprite[j].x-p.pos.x,sprite[j].y-p.pos.y);
            p.vel.x -= sintable[(j+512)&2047]<<4;
            p.vel.y -= sintable[j&2047]<<4;
        }
    }

    if (s.extra > 0)
        P_IncurDamage(p);
    else
    {
        s.extra = 0;
        p.inv_amount[GET_SHIELD] = 0;
    }

    p.last_extra = s.extra;

    if (p.loogcnt > 0) p.loogcnt--;
    else p.loogcnt = 0;

    if (p.fist_incs && P_DoFist(p)) return;

    if (p.timebeforeexit > 1 && p.last_extra > 0)
    {
        if (--p.timebeforeexit == GAMETICSPERSEC*5)
        {
            FX_StopAllSounds();
            S_ClearSoundLocks();

            if (p.customexitsound >= 0)
            {
                S_PlaySound(p.customexitsound);
                P_DoQuote(QUOTE_WEREGONNAFRYYOURASS,p);
            }
        }
        else if (p.timebeforeexit == 1)
        {
            for (i = 0; i != -1; i = connectpoint2[i])
                g_player[i].ps.gm = MODE_EOL;

            ud.m_level_number = ud.level_number++;

            if (ud.from_bonus)
            {
                ud.m_level_number = ud.level_number = ud.from_bonus;
                ud.from_bonus = 0;
            }
            return;
        }
    }

    if (p.pals.f > 0)
    {
//#if !defined LUNATIC
        p.pals.f--;
//#else
//        if (p.palsfadespeed > 0)
//        {
//            // <palsfadespeed> is the tint fade speed is in
//            // decrements/P_ProcessInput() calls.
//            p.pals.f = max(p.pals.f - p.palsfadespeed, 0);
//        }
//        else
//        {
//            // <palsfadespeed> is a negated count of how many times we
//            // (P_ProcessInput()) should be called before decrementing the tint
//            // fading by one. <palsfadenext> is the live counter.
//            if (p.palsfadenext < 0)
//                p.palsfadenext++;

//            if (p.palsfadenext == 0)
//            {
//                p.palsfadenext = p.palsfadespeed;
//                p.pals.f--;
//            }
//        }
//#endif
    }

    if (p.fta > 0 && --p.fta == 0)
    {
        pub = pus = NUMPAGES;
        p.ftq = 0;
    }

    if (g_levelTextTime > 0)
        g_levelTextTime--;

    if (s.extra <= 0)
    {
        if (ud.recstat == 1 && (!g_netServer && ud.multimode < 2))
            todoThrow("G_CloseDemoWrite();");

        if ((numplayers < 2 || g_netServer) && p.dead_flag == 0)
            P_FragPlayer(snum);

        if (psectlotag == ST_2_UNDERWATER)
        {
            if (p.on_warping_sector == 0)
            {
                if (klabs(p.pos.z-fz) > (PHEIGHT>>1))
                    p.pos.z += 348;
            }
            else
            {
                s.z -= 512;
                s.zvel = -348;
            }
            var $cursectnum = new R(p.cursectnum);
            clipmove(/*(vec3_t *)*/p.pos,$cursectnum,
                     0,0,164,(4<<8),(4<<8),CLIPMASK0);
            //                        p.bobcounter += 32;
            p.cursectnum = $cursectnum.$;
        }

        p.opos.copyFrom(p.pos); //Bmemcpy(&p.opos.x, &p.pos.x, sizeof(vec3_t));
        p.oang = p.ang;
        p.opyoff = p.pyoff;

        p.horiz = 100;
        p.horizoff = 0;

        var $cursectnum = new R(p.cursectnum);
        updatesector(p.pos.x,p.pos.y,$cursectnum);
        p.cursectnum = $cursectnum.$;

         var $cursectnum = new R(p.cursectnum);
        pushmove(/*(vec3_t *)*/p.pos,$cursectnum,128,(4<<8),(20<<8),CLIPMASK0);
        p.cursectnum = $cursectnum.$;

        if (fz > cz+(16<<8) && s.pal != 1)
            p.rotscrnang = (p.dead_flag + ((fz+p.pos.z)>>7))&2047;

        p.on_warping_sector = 0;

        return;
    }

    if (p.transporter_hold > 0)
    {
        p.transporter_hold--;
        if (p.transporter_hold == 0 && p.on_warping_sector)
            p.transporter_hold = 2;
    }
    else if (p.transporter_hold < 0)
        p.transporter_hold++;

    if (p.newowner >= 0)
    {todoThrow();
        //P_UpdatePosWhenViewingCam(p);
        //P_DoCounters(p);

        //if (PWEAPON(0, p.curr_weapon, WorksLike) == HANDREMOTE_WEAPON)
        //    P_ProcessWeapon(snum);

        //return;
    }

    p.rotscrnang -= (p.rotscrnang>>1);

    if (p.rotscrnang && !(p.rotscrnang>>1))
        p.rotscrnang -= ksgn(p.rotscrnang);

    p.look_ang -= (p.look_ang>>2);

    if (p.look_ang && !(p.look_ang>>2))
        p.look_ang -= ksgn(p.look_ang);

    if (TEST_SYNC_KEY(sb_snum, SK_LOOK_LEFT))
    {
        // look_left
        if (VM_OnEvent(EVENT_LOOKLEFT,p.i,snum, -1, 0) == 0)
        {
            p.look_ang -= 152;
            p.rotscrnang += 24;
        }
    }

    if (TEST_SYNC_KEY(sb_snum, SK_LOOK_RIGHT))
    {
        // look_right
        if (VM_OnEvent(EVENT_LOOKRIGHT,p.i,snum, -1, 0) == 0)
        {
            p.look_ang += 152;
            p.rotscrnang -= 24;
        }
    }

    if (p.on_crane >= 0)
        todoThrow("goto HORIZONLY");;

    j = ksgn(g_player[snum].sync.avel);

    if (s.xvel < 32 || p.on_ground == 0 || p.bobcounter == 1024)
    {
        if ((p.weapon_sway&2047) > (1024+96))
            p.weapon_sway -= 96;
        else if ((p.weapon_sway&2047) < (1024-96))
            p.weapon_sway += 96;
        else p.weapon_sway = 1024;
    }
    else p.weapon_sway = p.bobcounter;

    // NOTE: This silently wraps if the difference is too great, e.g. used to do
    // that when teleported by silent SE7s.
    s.xvel = ksqrt(uhypsq(p.pos.x-p.bobposx, p.pos.y-p.bobposy));

    if (p.on_ground)
        p.bobcounter += sprite[p.i].xvel>>1;

    if (ud.noclip == 0 && (/*(uint16_t)*/p.cursectnum >= MAXSECTORS || sector[p.cursectnum].floorpicnum == MIRROR))
    {
        p.pos.x = p.opos.x;
        p.pos.y = p.opos.y;
    }
    else
    {
        p.opos.x = p.pos.x;
        p.opos.y = p.pos.y;
    }

    p.bobposx = p.pos.x;
    p.bobposy = p.pos.y;

    p.opos.z = p.pos.z;
    p.opyoff = p.pyoff;
    p.oang = p.ang;

    if (p.one_eighty_count < 0)
    {
        p.one_eighty_count += 128;
        p.ang += 128;
    }

    // Shrinking code

    i = 40;

    if (psectlotag == ST_2_UNDERWATER)
    {
        // under water
        p.jumping_counter = 0;

        p.pycount += 32;
        p.pycount &= 2047;
        p.pyoff = sintable[p.pycount]>>7;

        if (!A_CheckSoundPlaying(p.i,DUKE_UNDERWATER))
            A_PlaySound(DUKE_UNDERWATER,p.i);

        if (TEST_SYNC_KEY(sb_snum, SK_JUMP))
        {
            if (VM_OnEvent(EVENT_SWIMUP,p.i,snum, -1, 0) == 0)
            {
                // jump
                if (p.vel.z > 0) p.vel.z = 0;
                p.vel.z -= 348;
                if (p.vel.z < -(256*6)) p.vel.z = -(256*6);
            }
        }
        else if (TEST_SYNC_KEY(sb_snum, SK_CROUCH))
        {
            if (VM_OnEvent(EVENT_SWIMDOWN,p.i,snum, -1, 0) == 0)
            {
                // crouch
                if (p.vel.z < 0) p.vel.z = 0;
                p.vel.z += 348;
                if (p.vel.z > (256*6)) p.vel.z = (256*6);
            }
        }
        else
        {
            // normal view
            if (p.vel.z < 0)
            {
                p.vel.z += 256;
                if (p.vel.z > 0)
                    p.vel.z = 0;
            }
            if (p.vel.z > 0)
            {
                p.vel.z -= 256;
                if (p.vel.z < 0)
                    p.vel.z = 0;
            }
        }

        if (p.vel.z > 2048)
            p.vel.z >>= 1;

        p.pos.z += p.vel.z;

        if (p.pos.z > (fz-(15<<8)))
            p.pos.z += ((fz-(15<<8))-p.pos.z)>>1;

        if (p.pos.z < cz)
        {
            p.pos.z = cz;
            p.vel.z = 0;
        }

        if (p.scuba_on && (krand()&255) < 8)
        {
            j = A_Spawn(p.i,WATERBUBBLE);
            sprite[j].x +=
                sintable[(p.ang+512+64-(g_globalRandom&128))&2047]>>6;
            sprite[j].y +=
                sintable[(p.ang+64-(g_globalRandom&128))&2047]>>6;
            sprite[j].xrepeat = 3;
            sprite[j].yrepeat = 2;
            sprite[j].z = p.pos.z+(8<<8);
        }
    }
    else if (p.jetpack_on)
    {
        p.on_ground = 0;
        p.jumping_counter = 0;
        p.hard_landing = 0;
        p.falling_counter = 0;

        p.pycount += 32;
        p.pycount &= 2047;
        p.pyoff = sintable[p.pycount]>>7;

        if (p.jetpack_on < 11)
        {
            p.jetpack_on++;
            p.pos.z -= (p.jetpack_on<<7); //Goin up
        }
        else if (p.jetpack_on == 11 && !A_CheckSoundPlaying(p.i,DUKE_JETPACK_IDLE))
            A_PlaySound(DUKE_JETPACK_IDLE,p.i);

        if (shrunk) j = 512;
        else j = 2048;

        if (TEST_SYNC_KEY(sb_snum, SK_JUMP))         //A (soar high)
        {
            // jump
            if (VM_OnEvent(EVENT_SOARUP,p.i,snum, -1, 0) == 0)
            {
                p.pos.z -= j;
                p.crack_time = 777;
            }
        }

        if (TEST_SYNC_KEY(sb_snum, SK_CROUCH))   //Z (soar low)
        {
            // crouch
            if (VM_OnEvent(EVENT_SOARDOWN,p.i,snum, -1, 0) == 0)
            {
                p.pos.z += j;
                p.crack_time = 777;
            }
        }

        if (shrunk == 0 && (psectlotag == 0 || psectlotag == ST_2_UNDERWATER)) k = 32;
        else k = 16;

        if (psectlotag != ST_2_UNDERWATER && p.scuba_on == 1)
            p.scuba_on = 0;

        if (p.pos.z > (fz-(k<<8)))
            p.pos.z += ((fz-(k<<8))-p.pos.z)>>1;
        if (p.pos.z < (actor[p.i].ceilingz+(18<<8)))
            p.pos.z = actor[p.i].ceilingz+(18<<8);
    }
    else if (psectlotag != ST_2_UNDERWATER)
    {
        p.airleft = 15 * GAMETICSPERSEC; // 13 seconds

        if (p.scuba_on == 1)
            p.scuba_on = 0;

        if (psectlotag == ST_1_ABOVE_WATER && p.spritebridge == 0)
        {
            if (shrunk == 0)
            {
                i = 34;
                p.pycount += 32;
                p.pycount &= 2047;
                p.pyoff = sintable[p.pycount]>>6;
            }
            else i = 12;

            if (shrunk == 0 && truefdist <= PHEIGHT)
            {
                if (p.on_ground == 1)
                {
                    if (p.dummyplayersprite < 0)
                        p.dummyplayersprite = A_Spawn(p.i,PLAYERONWATER);
                    sprite[p.dummyplayersprite].pal = sprite[p.i].pal;
                    sprite[p.dummyplayersprite].cstat |= 32768;

                    p.footprintcount = 6;
                    if (sector[p.cursectnum].floorpicnum == FLOORSLIME)
                        p.footprintpal = 8;
                    else p.footprintpal = 0;
                    p.footprintshade = 0;
                }
            }
        }
        else
        {
            if (p.footprintcount > 0 && p.on_ground)
                if (p.cursectnum >= 0 && (sector[p.cursectnum].floorstat&2) != 2)
                {
                    for (j=headspritesect[p.cursectnum]; j>=0; j=nextspritesect[j])
                        if (sprite[j].picnum == FOOTPRINTS || sprite[j].picnum == FOOTPRINTS2 ||
                                sprite[j].picnum == FOOTPRINTS3 || sprite[j].picnum == FOOTPRINTS4)
                            if (klabs(sprite[j].x-p.pos.x) < 384 && klabs(sprite[j].y-p.pos.y) < 384)
                                break;

                    if (j < 0)
                    {
                        if (p.cursectnum >= 0 && sector[p.cursectnum].lotag == 0 && sector[p.cursectnum].hitag == 0)
//#ifdef YAX_ENABLE
                            if (yax_getbunch(p.cursectnum, YAX_FLOOR) < 0 || (sector[p.cursectnum].floorstat&512))
//#endif
                        {
                            switch (krand()&3)
                            {
                            case 0:
                                j = A_Spawn(p.i,FOOTPRINTS);
                                break;
                            case 1:
                                j = A_Spawn(p.i,FOOTPRINTS2);
                                break;
                            case 2:
                                j = A_Spawn(p.i,FOOTPRINTS3);
                                break;
                            default:
                                j = A_Spawn(p.i,FOOTPRINTS4);
                                break;
                            }
                            sprite[j].pal = p.footprintpal;
                            sprite[j].shade = p.footprintshade;
                            p.footprintcount--;
                        }
                    }
                }
        }

        if (p.pos.z < (fz-(i<<8)))  //falling
        {
            // not jumping or crouching

            if (!TEST_SYNC_KEY(sb_snum, SK_JUMP) && !TEST_SYNC_KEY(sb_snum, SK_CROUCH) &&
                    p.on_ground && (sector[p.cursectnum].floorstat&2) && p.pos.z >= (fz-(i<<8)-(16<<8)))
                p.pos.z = fz-(i<<8);
            else
            {
                p.on_ground = 0;
                p.vel.z += (g_spriteGravity+80); // (TICSPERFRAME<<6);
                if (p.vel.z >= (4096+2048)) p.vel.z = (4096+2048);
                if (p.vel.z > 2400 && p.falling_counter < 255)
                {
                    p.falling_counter++;
                    if (p.falling_counter >= 38 && p.scream_voice <= FX_Ok)
                        p.scream_voice = A_PlaySound(DUKE_SCREAM,p.i);
                }

                if ((p.pos.z+p.vel.z) >= (fz-(i<<8)) && p.cursectnum >= 0)   // hit the ground
                    if (sector[p.cursectnum].lotag != ST_1_ABOVE_WATER)
                    {
                        if (p.falling_counter > 62)
                            P_QuickKill(p);
                        else if (p.falling_counter > 9)
                        {
                            // Falling damage.
                            s.extra -= p.falling_counter-(krand()&3);

                            if (s.extra <= 0)
                            {
                                A_PlaySound(SQUISHED,p.i);

//                                P_PalFrom(p, 63, 63,0,0);
                            }
                            else
                            {
                                A_PlaySound(DUKE_LAND,p.i);
                                A_PlaySound(DUKE_LAND_HURT,p.i);
                            }

                            P_PalFrom(p, 32, 16,0,0);
                        }
                        else if (p.vel.z > 2048)
                            A_PlaySound(DUKE_LAND,p.i);
                    }
            }
        }
        else
        {
            p.falling_counter = 0;

            if (p.scream_voice > FX_Ok)
            {
                FX_StopSound(p.scream_voice);
                S_Cleanup();
                p.scream_voice = -1;
            }

            if (psectlotag != ST_1_ABOVE_WATER && psectlotag != ST_2_UNDERWATER && p.on_ground == 0 && p.vel.z > (6144>>1))
                p.hard_landing = p.vel.z>>10;

            p.on_ground = 1;

            if (i==40)
            {
                //Smooth on the ground

                k = ((fz-(i<<8))-p.pos.z)>>1;
                if (klabs(k) < 256) k = 0;
                p.pos.z += k;
                p.vel.z -= 768;
                if (p.vel.z < 0) p.vel.z = 0;
            }
            else if (p.jumping_counter == 0)
            {
                p.pos.z += ((fz-(i<<7))-p.pos.z)>>1; //Smooth on the water
                if (p.on_warping_sector == 0 && p.pos.z > fz-(16<<8))
                {
                    p.pos.z = fz-(16<<8);
                    p.vel.z >>= 1;
                }
            }

            p.on_warping_sector = 0;

            if (TEST_SYNC_KEY(sb_snum, SK_CROUCH))
            {
                // crouching
                if (VM_OnEvent(EVENT_CROUCH,p.i,snum, -1, 0) == 0)
                {
                    p.pos.z += (2048+768);
                    p.crack_time = 777;
                }
            }

            // jumping
            if (!TEST_SYNC_KEY(sb_snum, SK_JUMP) && p.jumping_toggle == 1)
                p.jumping_toggle = 0;
            else if (TEST_SYNC_KEY(sb_snum, SK_JUMP) && p.jumping_toggle == 0)
            {
                if (p.jumping_counter == 0)
                    if ((fz-cz) > (56<<8))
                    {
                        if (VM_OnEvent(EVENT_JUMP,p.i,snum, -1, 0) == 0)
                        {
                            p.jumping_counter = 1;
                            p.jumping_toggle = 1;
                        }
                    }
            }

            if (p.jumping_counter && !TEST_SYNC_KEY(sb_snum, SK_JUMP))
                p.jumping_toggle = 0;
        }

        if (p.jumping_counter)
        {
            if (!TEST_SYNC_KEY(sb_snum, SK_JUMP) && p.jumping_toggle == 1)
                p.jumping_toggle = 0;

            if (p.jumping_counter < (1024+256))
            {
                if (psectlotag == ST_1_ABOVE_WATER && p.jumping_counter > 768)
                {
                    p.jumping_counter = 0;
                    p.vel.z = -512;
                }
                else
                {
                    p.vel.z -= int32((sintable[(2048-128+p.jumping_counter)&2047])/12);
                    p.jumping_counter += 180;
                    p.on_ground = 0;
                }
            }
            else
            {
                p.jumping_counter = 0;
                p.vel.z = 0;
            }
        }

        p.pos.z += p.vel.z;

        if ((psectlotag != ST_2_UNDERWATER || cz != sector[p.cursectnum].ceilingz) && p.pos.z < (cz+(4<<8)))
        {
            p.jumping_counter = 0;
            if (p.vel.z < 0)
                p.vel.x = p.vel.y = 0;
            p.vel.z = 128;
            p.pos.z = cz+(4<<8);
        }
    }

    if (p.fist_incs || p.transporter_hold > 2 || p.hard_landing || p.access_incs > 0 || p.knee_incs > 0 ||
            (PWEAPON(0, p.curr_weapon, WorksLike) == TRIPBOMB_WEAPON &&
             kb.$ > 1 && kb.$ < PWEAPON(0, p.curr_weapon, FireDelay)))
    {
        doubvel = 0;
        p.vel.x = 0;
        p.vel.y = 0;
    }
    else if (g_player[snum].sync.avel)            //p.ang += syncangvel * constant
    {
        var /*int32_t */tempang = g_player[snum].sync.avel<<1;

        if (psectlotag == ST_2_UNDERWATER) p.angvel =(tempang-(tempang>>3))*ksgn(doubvel);
        else p.angvel = tempang*ksgn(doubvel);

        p.ang += p.angvel;
        p.ang &= 2047;
        p.crack_time = 777;
    }

    if (p.spritebridge == 0)
    {
        j = sector[s.sectnum].floorpicnum;

        if (j == PURPLELAVA || sector[s.sectnum].ceilingpicnum == PURPLELAVA)
        {
            if (p.inv_amount[GET_BOOTS] > 0)
            {
                p.inv_amount[GET_BOOTS]--;
                p.inven_icon = ICON_BOOTS;
                if (p.inv_amount[GET_BOOTS] <= 0)
                    P_SelectNextInvItem(p);
            }
            else
            {
                if (!A_CheckSoundPlaying(p.i,DUKE_LONGTERM_PAIN))
                    A_PlaySound(DUKE_LONGTERM_PAIN,p.i);

                P_PalFrom(p, 32, 0,8,0);
                s.extra--;
            }
        }

        if (p.on_ground && truefdist <= PHEIGHT+(16<<8) && P_CheckFloorDamage(p, j))
        {
            P_DoQuote(QUOTE_BOOTS_ON, p);
            p.inv_amount[GET_BOOTS] -= 2;
            if (p.inv_amount[GET_BOOTS] <= 0)
            {
                p.inv_amount[GET_BOOTS] = 0;
                P_SelectNextInvItem(p);
            }
        }
    }

    if (g_player[snum].sync.extbits&(1))
        VM_OnEvent(EVENT_MOVEFORWARD,p.i,snum, -1, 0);

    if (g_player[snum].sync.extbits&(1<<1))
        VM_OnEvent(EVENT_MOVEBACKWARD,p.i,snum, -1, 0);

    if (g_player[snum].sync.extbits&(1<<2))
        VM_OnEvent(EVENT_STRAFELEFT,p.i,snum, -1, 0);

    if (g_player[snum].sync.extbits&(1<<3))
        VM_OnEvent(EVENT_STRAFERIGHT,p.i,snum, -1, 0);

    if (g_player[snum].sync.extbits&(1<<4) || g_player[snum].sync.avel < 0)
        VM_OnEvent(EVENT_TURNLEFT,p.i,snum, -1, 0);

    if (g_player[snum].sync.extbits&(1<<5) || g_player[snum].sync.avel > 0)
        VM_OnEvent(EVENT_TURNRIGHT,p.i,snum, -1, 0);

    if (p.vel.x || p.vel.y || g_player[snum].sync.fvel || g_player[snum].sync.svel)
    {
        p.crack_time = 777;

        k = sintable[p.bobcounter&2047]>>12;

        if ((truefdist < PHEIGHT+(8<<8)) && (k == 1 || k == 3))
        {
            if (p.walking_snd_toggle == 0 && p.on_ground)
            {
                switch (psectlotag)
                {
                case 0:
                    if (lz >= 0 && (lz&49152) == 49152)
                        j = sprite[lz&(MAXSPRITES-1)].picnum;
                    else j = sector[p.cursectnum].floorpicnum;

                    switch (DYNAMICTILEMAP(j))
                    {
                    case PANNEL1__STATIC:
                    case PANNEL2__STATIC:
                        A_PlaySound(DUKE_WALKINDUCTS,p.i);
                        p.walking_snd_toggle = 1;
                        break;
                    }
                    break;

                case ST_1_ABOVE_WATER:
                    if (!p.spritebridge)
                    {
                        if ((krand()&1) == 0)
                            A_PlaySound(DUKE_ONWATER,p.i);
                        p.walking_snd_toggle = 1;
                    }
                    break;
                }
            }
        }
        else if (p.walking_snd_toggle > 0)
            p.walking_snd_toggle--;

        if (p.jetpack_on == 0 && p.inv_amount[GET_STEROIDS] > 0 && p.inv_amount[GET_STEROIDS] < 400)
            doubvel <<= 1;

        p.vel.x += ((g_player[snum].sync.fvel*doubvel)<<6);
        p.vel.y += ((g_player[snum].sync.svel*doubvel)<<6);

        j = 0;

        if (psectlotag == ST_2_UNDERWATER)
            j = 0x1400;
        else if (p.on_ground && (TEST_SYNC_KEY(sb_snum, SK_CROUCH) || (kb.$ > 10 && PWEAPON(snum, p.curr_weapon, WorksLike) == KNEE_WEAPON)))
            j = 0x2000;

        p.vel.x = mulscale16(p.vel.x,p.runspeed-j);
        p.vel.y = mulscale16(p.vel.y,p.runspeed-j);

        if (klabs(p.vel.x) < 2048 && klabs(p.vel.y) < 2048)
            p.vel.x = p.vel.y = 0;

        if (shrunk)
        {
            p.vel.x = mulscale16(p.vel.x,p.runspeed-(p.runspeed>>1)+(p.runspeed>>2));
            p.vel.y = mulscale16(p.vel.y,p.runspeed-(p.runspeed>>1)+(p.runspeed>>2));
        }
    }

//HORIZONLY:
    if (psectlotag == ST_1_ABOVE_WATER || p.spritebridge == 1) i = p.autostep_sbw;
    else i = p.autostep;

    if (p.cursectnum >= 0 && sector[p.cursectnum].lotag == ST_2_UNDERWATER) k = 0;
    else k = 1;

    if (ud.noclip)
    {
        p.pos.x += p.vel.x>>14;
        p.pos.y += p.vel.y>>14;
        var $cursectnum = new R(p.cursectnum);
        updatesector(p.pos.x,p.pos.y,$cursectnum);
        p.cursectnum = $cursectnum.$;
        changespritesect(p.i,p.cursectnum);
    }
    else
    {
//#ifdef YAX_ENABLE
        var /*int32_t*/ sect = p.cursectnum;
        var /*int16_t*/ cb:number, fb:number;


        if (sect >= 0) {
            var $cb = new R(cb);
            var $fb = new R(fb);
            yax_getbunches(sect, $cb, $fb);
            cb = $cb.$;
            fb = $fb.$;
        }

        // this updatesectorz conflicts with Duke3d's way of teleporting through water,
        // so make it a bit conditional... OTOH, this way we have an ugly z jump when
        // changing from above water to underwater
        if (sect >= 0 && !(sector[sect].lotag==ST_1_ABOVE_WATER && p.on_ground && fb>=0))
        {
            if ((fb>=0 && !(sector[sect].floorstat&512)) || (cb>=0 && !(sector[sect].ceilingstat&512)))
            {
                p.cursectnum += MAXSECTORS;  // skip initial z check, restored by updatesectorz
                var $cursectnum = new R(p.cursectnum);
                updatesectorz(p.pos.x,p.pos.y,p.pos.z,$cursectnum);
                p.cursectnum = $cursectnum.$;
            }
        }
//#endif
        var $cursectnum = new R(p.cursectnum);
        if ((j = clipmove(/*(vec3_t *)*/p.pos,$cursectnum, p.vel.x,p.vel.y,164,(4<<8),i,CLIPMASK0)))
        {
            p.cursectnum = $cursectnum.$;
            P_CheckTouchDamage(p, j);
        } 
        else 
        {
            p.cursectnum = $cursectnum.$;
        }
    }

    // This makes the player view lower when shrunk.  NOTE that it can get the
    // view below the sector floor (and does, when on the ground).
    if (p.jetpack_on == 0 && psectlotag != ST_2_UNDERWATER && psectlotag != ST_1_ABOVE_WATER && shrunk)
        p.pos.z += 32<<8;

    if (p.jetpack_on == 0)
    {
        if (s.xvel > 16)
        {
            if (psectlotag != ST_1_ABOVE_WATER && psectlotag != ST_2_UNDERWATER && p.on_ground)
            {
                p.pycount += 52;
                p.pycount &= 2047;
                p.pyoff =
                    int16(klabs(s.xvel*sintable[p.pycount])/1596);
            }
        }
        else if (psectlotag != ST_2_UNDERWATER && psectlotag != ST_1_ABOVE_WATER)
            p.pyoff = 0;
    }

    // RBG***

    p.pos.z += PHEIGHT;
    setsprite(p.i,/*(vec3_t *)&*/p.pos);
    p.pos.z -= PHEIGHT;

    // ST_2_UNDERWATER
    if (p.cursectnum >= 0 && psectlotag < 3)
    {
//        p.cursectnum = s.sectnum;

        if (!ud.noclip && sector[p.cursectnum].lotag == ST_31_TWO_WAY_TRAIN)
        {
            // XXX: POTENTIAL_OOB
            if (sprite[sector[p.cursectnum].hitag].xvel && actor[sector[p.cursectnum].hitag].t_data[0] == 0)
            {
                P_QuickKill(p);
                return;
            }
        }
    }

    if (p.cursectnum >= 0 && truefdist < PHEIGHT && p.on_ground &&
            psectlotag != ST_1_ABOVE_WATER && shrunk == 0 && sector[p.cursectnum].lotag == ST_1_ABOVE_WATER)
        if (!A_CheckSoundPlaying(p.i,DUKE_ONWATER))
            A_PlaySound(DUKE_ONWATER,p.i);

    if (p.cursectnum >=0 && p.cursectnum != s.sectnum)
        changespritesect(p.i, p.cursectnum);

    if (p.cursectnum >= 0 && ud.noclip == 0)
    {
        var $cursectnum = new R(p.cursectnum);
        j = (pushmove(/*(vec3_t *)*/p.pos,$cursectnum,164,(4<<8),(4<<8),CLIPMASK0) < 0 && A_GetFurthestAngle(p.i,8) < 512)?1:0;
        p.cursectnum = $cursectnum.$;

        if (klabs(actor[p.i].floorz-actor[p.i].ceilingz) < (48<<8) || j)
        {
            if (!(sector[s.sectnum].lotag&0x8000) && (isanunderoperator(sector[s.sectnum].lotag) ||
                    isanearoperator(sector[s.sectnum].lotag)))
                G_ActivateBySector(s.sectnum,p.i);
            if (j)
            {
                P_QuickKill(p);
                return;
            }
        }
        else if (klabs(fz-cz) < (32<<8) && isanunderoperator(sector[p.cursectnum].lotag))
            G_ActivateBySector(p.cursectnum,p.i);
    }

    i = 0;
    if (TEST_SYNC_KEY(sb_snum, SK_CENTER_VIEW) || p.hard_landing)
        if (VM_OnEvent(EVENT_RETURNTOCENTER,p.i,snum, -1, 0) == 0)
            p.return_to_center = 9;

    if (TEST_SYNC_KEY(sb_snum, SK_LOOK_UP))
    {
        if (VM_OnEvent(EVENT_LOOKUP,p.i,snum, -1, 0) == 0)
        {
            p.return_to_center = 9;
            if (TEST_SYNC_KEY(sb_snum, SK_RUN)) p.horiz += 12;
            p.horiz += 12;
            i++;
        }
    }

    if (TEST_SYNC_KEY(sb_snum, SK_LOOK_DOWN))
    {
        if (VM_OnEvent(EVENT_LOOKDOWN,p.i,snum, -1, 0) == 0)
        {
            p.return_to_center = 9;
            if (TEST_SYNC_KEY(sb_snum, SK_RUN)) p.horiz -= 12;
            p.horiz -= 12;
            i++;
        }
    }

    if (TEST_SYNC_KEY(sb_snum, SK_AIM_UP))
    {
        if (VM_OnEvent(EVENT_AIMUP,p.i,snum, -1, 0) == 0)
        {
            if (TEST_SYNC_KEY(sb_snum, SK_RUN)) p.horiz += 6;
            p.horiz += 6;
            i++;
        }
    }

    if (TEST_SYNC_KEY(sb_snum, SK_AIM_DOWN))
    {
        if (VM_OnEvent(EVENT_AIMDOWN,p.i,snum, -1, 0) == 0)
        {
            if (TEST_SYNC_KEY(sb_snum, SK_RUN)) p.horiz -= 6;
            p.horiz -= 6;
            i++;
        }
    }

    if (p.return_to_center > 0 && !TEST_SYNC_KEY(sb_snum, SK_LOOK_UP) && !TEST_SYNC_KEY(sb_snum, SK_LOOK_DOWN))
    {
        p.return_to_center--;
        p.horiz += 33-int16(p.horiz/3);
        i++;
    }

    if (p.hard_landing > 0)
    {
        p.hard_landing--;
        p.horiz -= (p.hard_landing<<4);
    }

    if (i)
    {
        if (p.horiz > 95 && p.horiz < 105) p.horiz = 100;
        if (p.horizoff > -5 && p.horizoff < 5) p.horizoff = 0;
    }

    p.horiz += g_player[snum].sync.horz;

    if (p.horiz > HORIZ_MAX) p.horiz = HORIZ_MAX;
    else if (p.horiz < HORIZ_MIN) p.horiz = HORIZ_MIN;

    //Shooting code/changes

    if (p.show_empty_weapon > 0)
    {
        p.show_empty_weapon--;
        if (p.show_empty_weapon == 0 && (p.weaponswitch & 2) && p.ammo_amount[p.curr_weapon] <= 0)
        {
            if (p.last_full_weapon == GROW_WEAPON)
                p.subweapon |= (1<<GROW_WEAPON);
            else if (p.last_full_weapon == SHRINKER_WEAPON)
                p.subweapon &= ~(1<<GROW_WEAPON);
            P_AddWeapon(p, p.last_full_weapon);
            return;
        }
    }

    if (p.knee_incs > 0)
    {
        p.horiz -= 48;
        p.return_to_center = 9;

        if (++p.knee_incs > 15)
        {
            p.knee_incs = 0;
            p.holster_weapon = 0;
            p.weapon_pos = klabs(p.weapon_pos);

            if (p.actorsqu >= 0 && sprite[p.actorsqu].statnum != MAXSTATUS && dist(sprite[p.i],sprite[p.actorsqu]) < 1400)
            {
                A_DoGuts(p.actorsqu,JIBS6,7);
                A_Spawn(p.actorsqu,BLOODPOOL);
                A_PlaySound(SQUISHED,p.actorsqu);

                switch (DYNAMICTILEMAP(sprite[p.actorsqu].picnum))
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
                    if (sprite[p.actorsqu].yvel)
                        G_OperateRespawns(sprite[p.actorsqu].yvel);
                    A_DeleteSprite(p.actorsqu);
                    break;
                case APLAYER__STATIC:
                    P_QuickKill(g_player[sprite[p.actorsqu].yvel].ps);
                    g_player[sprite[p.actorsqu].yvel].ps.frag_ps = snum;
                    break;
                default:
                    if (A_CheckEnemySprite(sprite[p.actorsqu]))
                        p.actors_killed++;
                    A_DeleteSprite(p.actorsqu);
                    break;
                }
            }
            p.actorsqu = -1;
        }
        else if (p.actorsqu >= 0)
            p.ang += G_GetAngleDelta(p.ang,getangle(sprite[p.actorsqu].x-p.pos.x,sprite[p.actorsqu].y-p.pos.y))>>2;
    }

    if (P_DoCounters(p)) return;

    P_ProcessWeapon(snum);
}

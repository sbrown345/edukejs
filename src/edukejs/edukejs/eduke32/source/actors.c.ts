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
/// <reference path="../../eduke32/source/input.c.ts" />
/// <reference path="../../eduke32/source/input.c.ts" />
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
//#include "actors.h"
//#include "gamedef.h"
//#include "gameexec.h"

//#if KRANDDEBUG
//# define ACTOR_STATIC
//#else
//# define ACTOR_STATIC static
//#endif

//#define KILLIT(KX) do { A_DeleteSprite(KX); goto BOLT; } while (0)

//extern int32_t g_numEnvSoundsPlaying;
//extern int32_t g_noEnemies;

var /*int32_t */otherp:number;

var G_SetInterpolation_count = 0;
function G_SetInterpolation(/*int32_t * */posptr: AnimatePtr): number
{
    var /*int32_t */i=g_numInterpolations-1;
    
    dlog(DEBUG_ANIMATIONS,  "G_SetInterpolation %i\n", G_SetInterpolation_count++);
    if (g_numInterpolations >= MAXINTERPOLATIONS)
        return 1;

    for (; i>=0; i--)
        if (curipos[i].equals(posptr)) 
        {
            dlog(DEBUG_ANIMATIONS,  "G_SetInterpolation return\n");
            return 0;
        }

    curipos[g_numInterpolations] = posptr;
    oldipos[g_numInterpolations] = posptr.getValue();
    g_numInterpolations++;
    dlog(DEBUG_ANIMATIONS,  "G_SetInterpolation g_numInterpolations: %i, *posptr: %i \n", g_numInterpolations, posptr.getValue());
    return 0;
}

function G_StopInterpolation(/*int32_t **/posptr: AnimatePtr):void
{
    var/*int32_t */i=g_numInterpolations-1;

    for (; i>=startofdynamicinterpolations; i--)
        if (curipos[i].equals(posptr))
        {
            g_numInterpolations--;
            dlog(DEBUG_ANIMATIONS,  "G_StopInterpolation g_numInterpolations: %i\n", g_numInterpolations);
            oldipos[i] = oldipos[g_numInterpolations];
            bakipos[i] = bakipos[g_numInterpolations];
            curipos[i] = curipos[g_numInterpolations];
        }
}

function G_DoInterpolations(/*int32_t*/ smoothratio: number): void       //Stick at beginning of drawscreen
{
    var /*int32_t */i=g_numInterpolations-1, j = 0, odelta: number, ndelta = 0;

    if (g_interpolationLock++)
    {
        return;
    }
    
    for (; i>=0; i--)
    {
        bakipos[i] = curipos[i].getValue();
        dlog(DEBUG_ANIMATIONS,  "G_DoInterpolations i: %i. *curipos[i]: %i\n", i, curipos[i].getValue());
        odelta = ndelta;
        ndelta = curipos[i].getValue()-oldipos[i];
        dlog(DEBUG_ANIMATIONS,  "odelta: %i ndelta: %i, smoothratio: %i\n", odelta, ndelta, smoothratio);
        if (odelta != ndelta) j = mulscale16(ndelta,smoothratio);
        curipos[i].setValue(oldipos[i]+j);
        dlog(DEBUG_ANIMATIONS,  "G_DoInterpolations oldipos[i]+j: %i, j: %i\n", oldipos[i]+j, j);
    }
}

function G_ClearCameraView(ps:DukePlayer_t):void
{
    var /*int32_t */k:number;

    ps.newowner = -1;

    ps.pos.x = ps.opos.x;
    ps.pos.y = ps.opos.y;
    ps.pos.z = ps.opos.z;
    ps.ang = ps.oang;

    var $sectnum = new R(ps.cursectnum);
    updatesector(ps.pos.x, ps.pos.y, $sectnum);
    ps.cursectnum = $sectnum.$;

    P_UpdateScreenPal(ps);

    for (k = headspritestat[STAT_ACTOR]; k >= 0; k = nextspritestat[k])
        if (sprite[k].picnum==CAMERA1)
            sprite[k].yvel = 0;
}

function A_RadiusDamage(/*int32_t*/ i:number, /*int32_t */r:number, /*int32_t */hp1:number, /*int32_t */hp2:number, /*int32_t */hp3:number, /*int32_t */hp4:number):void
{
    var /*int32_t */d:number, q:number, stati:number;
    var  s = sprite[i];

    var statlist = [
        STAT_DEFAULT, STAT_ACTOR, STAT_STANDABLE,
        STAT_PLAYER, STAT_FALLER, STAT_ZOMBIEACTOR, STAT_MISC
    ];

    var tempshort = new Int16Array(tempbuf.buffer);

    SKIPWALLCHECK:
    for(;;) {
    if (s.picnum == RPG && s.xrepeat < 11)
        break SKIPWALLCHECK;

    if (s.picnum != SHRINKSPARK)
    {
        var /*int32_t*/ sectcnt = 0;
        var /*int32_t*/ sectend = 1;

        tempshort[0] = s.sectnum;

        do
        {
            var wal:walltype, walIdx:number;
            var /* int32_t*/ dasect = tempshort[sectcnt++];
            var /* int32_t*/ startwall = sector[dasect].wallptr;
            var /* int32_t*/ endwall = startwall+sector[dasect].wallnum;
            var /*int32_t */w:number;

            if (((sector[dasect].ceilingz-s.z)>>8) < r)
            {
                var/*const int32_t */w2 = wall[startwall].point2;

                d = klabs(wall[startwall].x-s.x)+klabs(wall[startwall].y-s.y);
                if (d < r)
                    Sect_DamageCeiling(dasect);
                else
                {
                    d = klabs(wall[wall[w2].point2].x-s.x)+klabs(wall[wall[w2].point2].y-s.y);
                    if (d < r)
                        Sect_DamageCeiling(dasect);
                }
            }

            for (w=startwall,wal=wall[walIdx=startwall]; w<endwall; w++,wal = wall[++walIdx])
                if ((klabs(wal.x-s.x)+klabs(wal.y-s.y)) < r)
                {
                    var/*int16_t */sect = -1;
                    var /*const int32_t */nextsect = wal.nextsector;
                    var/*int32_t */x1:number, y1:number;

                    if (nextsect >= 0)
                    {
                        var/*int32_t */dasect2:number;
                        for (dasect2=sectend-1; dasect2>=0; dasect2--)
                            if (tempshort[dasect2] == nextsect)
                                break;

                        if (dasect2 < 0)
                            tempshort[sectend++] = nextsect;
                    }

                    x1 = (((wal.x+wall[wal.point2].x)>>1)+s.x)>>1;
                    y1 = (((wal.y+wall[wal.point2].y)>>1)+s.y)>>1;

                    var $sect = new R(sect);
                    updatesector(x1,y1,$sect);
                    sect = $sect.$;

                    if (sect >= 0 && cansee(x1,y1,s.z,sect,s.x,s.y,s.z,s.sectnum))
                    {
                        var tmpvect = new vec3_t( wal.x, wal.y, s.z );
                        A_DamageWall(i, w, tmpvect, s.picnum);
                    }
                }
        }
        while (sectcnt < sectend);
    }

        break; //SKIPWALLCHECK:;
    }


    q = -(16<<8) + (krand()&((32<<8)-1));

    for (stati=0; stati<7; stati++)  // TODO: ARRAY_SIZE
    {
        var/*int32_t */j = headspritestat[statlist[stati]];

        BOLT:
        while (j >= 0)
        {
            var/*const int32_t */nextj = nextspritestat[j];
            var sj = sprite[j];

            // DEFAULT, ZOMBIEACTOR, MISC
            if (stati == 0 || stati >= 5 || AFLAMABLE(sj.picnum))
            {
                if (s.picnum != SHRINKSPARK || (sj.cstat&257))
                    if (dist(s, sj) < r)
                    {
                        if (A_CheckEnemySprite(sj) && !cansee(sj.x, sj.y,sj.z+q, sj.sectnum, s.x, s.y, s.z+q, s.sectnum))
                            {j = nextj;continue BOLT;}
                        A_DamageObject(j, i);
                    }
            }
            else if (sj.extra >= 0 && sj != s && (sj.picnum == TRIPBOMB || A_CheckEnemySprite(sj) || sj.picnum == QUEBALL || sj.picnum == STRIPEBALL || (sj.cstat&257) || sj.picnum == DUKELYINGDEAD))
            {
                if (s.picnum == SHRINKSPARK && sj.picnum != SHARK && (j == s.owner || sj.xrepeat < 24))
                {
                    j = nextj;
                    continue;
                }
                if (s.picnum == MORTER && j == s.owner)
                {
                    j = nextj;
                    continue;
                }

                if (sj.picnum == APLAYER) sj.z -= PHEIGHT;
                d = dist(s, sj);
                if (sj.picnum == APLAYER) sj.z += PHEIGHT;

                if (d < r && cansee(sj.x, sj.y, sj.z-(8<<8), sj.sectnum, s.x, s.y, s.z-(12<<8), s.sectnum))
                {
                    actor[j].ang = getangle(sj.x-s.x,sj.y-s.y);

                    if (s.picnum == RPG && sj.extra > 0)
                        actor[j].picnum = RPG;
                    else if (A_CheckSpriteFlags(i,SPRITE_PROJECTILE) && SpriteProjectile[i].workslike & PROJECTILE_RADIUS_PICNUM && sj.extra > 0)
                        actor[j].picnum = s.picnum;
                    else
                    {
                        if (s.picnum == SHRINKSPARK)
                            actor[j].picnum = SHRINKSPARK;
                        else actor[j].picnum = RADIUSEXPLOSION;
                    }

                    if (s.picnum != SHRINKSPARK)
                    {
                        var /*const int32_t */k = int32(r/3);

                        if (d < k)
                        {
                            if (hp4 == hp3) hp4++;
                            actor[j].extra = hp3 + (krand()%(hp4-hp3));
                        }
                        else if (d < k*2)
                        {
                            if (hp3 == hp2) hp3++;
                            actor[j].extra = hp2 + (krand()%(hp3-hp2));
                        }
                        else if (d < r)
                        {
                            if (hp2 == hp1) hp2++;
                            actor[j].extra = hp1 + (krand()%(hp2-hp1));
                        }

                        if (sprite[j].picnum != TANK && sprite[j].picnum != ROTATEGUN && sprite[j].picnum != RECON && sprite[j].picnum != BOSS1 &&
                            sprite[j].picnum != BOSS2 && sprite[j].picnum != BOSS3 && sprite[j].picnum != BOSS4)
                        {
                            if (sj.xvel < 0) sj.xvel = 0;
                            sj.xvel += (s.extra<<2);
                        }

                        if (sj.picnum == PODFEM1 || sj.picnum == FEM1 ||
                                sj.picnum == FEM2 || sj.picnum == FEM3 ||
                                sj.picnum == FEM4 || sj.picnum == FEM5 ||
                                sj.picnum == FEM6 || sj.picnum == FEM7 ||
                                sj.picnum == FEM8 || sj.picnum == FEM9 ||
                                sj.picnum == FEM10 || sj.picnum == STATUE ||
                                sj.picnum == STATUEFLASH || sj.picnum == SPACEMARINE || sj.picnum == QUEBALL || sj.picnum == STRIPEBALL)
                            A_DamageObject(j, i);
                    }
                    else if (s.extra == 0) actor[j].extra = 0;

                    if (sj.picnum != RADIUSEXPLOSION &&
                            s.owner >= 0 && sprite[s.owner].statnum < MAXSTATUS)
                    {
                        if (sj.picnum == APLAYER)
                        {
                            var ps = g_player[sj.yvel].ps;

                            if (ps.newowner >= 0)
                                G_ClearCameraView(ps);
                        }

                        actor[j].owner = s.owner;
                    }
                }
            }
//BOLT:
            j = nextj;
        }
    }
}

// Maybe do a projectile transport via an SE7.
// <spritenum>: the projectile
// <i>: the SE7
// <fromunderp>: below.above change?
function /*int32_t */Proj_MaybeDoTransport(/*int32_t */spritenum:number, /*int32_t */i:number, /*int32_t */fromunderp:number, /*int32_t */daz:number):number
{
    if (totalclock > actor[spritenum].lasttransport)
    {
        var spr = sprite[spritenum];
        var otherse = sprite[sprite[i].owner];

        actor[spritenum].lasttransport = totalclock + (TICSPERFRAME<<2);

        spr.x += (otherse.x-sprite[i].x);
        spr.y += (otherse.y-sprite[i].y);
		dlog(DEBUG_SPRITE, "Proj_MaybeDoTransport x: %i, y: %i\n", spr.x, spr.y);
        if (!fromunderp)  // above.below
            spr.z = sector[otherse.sectnum].ceilingz - daz + sector[sprite[i].sectnum].floorz;
        else  // below.above
            spr.z = sector[otherse.sectnum].floorz - daz + sector[sprite[i].sectnum].ceilingz;

        //Bmemcpy(&actor[spritenum].bpos.x, &sprite[spritenum], sizeof(vec3_t));
        actor[spritenum].bpos.x = sprite[spritenum].x;
        actor[spritenum].bpos.y = sprite[spritenum].y;
        actor[spritenum].bpos.z = sprite[spritenum].z;

        changespritesect(spritenum, otherse.sectnum);

        return 1;
    }

    return 0;
}

// Check whether sprite <s> is on/in a non-SE7 water sector.
// <othersectptr>: if not NULL, the sector on the other side.
function/*int32_t */A_CheckNoSE7Water(s:spritetype , /*int32_t */sectnum:number, /*int32_t */slotag:number, /*int32_t **/othersectptr:R<number>):number
{
    if (slotag==ST_1_ABOVE_WATER || slotag==ST_2_UNDERWATER)
    {
        var/*int32_t */othersect = yax_getneighborsect(
            s.x, s.y, sectnum, slotag==ST_1_ABOVE_WATER ? YAX_FLOOR : YAX_CEILING);

        var/*int32_t */othertag = (slotag==ST_1_ABOVE_WATER) ?
            ST_2_UNDERWATER : ST_1_ABOVE_WATER;

        // If submerging, the lower sector MUST have lotag 2.
        // If emerging, the upper sector MUST have lotag 1.
        // This way, the x/y coordinates where above/below water
        // changes can happen are the same.
        if (othersect >= 0 && sector[othersect].lotag==othertag)
        {
            if (othersectptr)
                othersectptr.$ = othersect;
            return 1;
        }
    }

    return 0;
}

// Check whether to do a z position update of sprite <spritenum>.
// Returns:
//  0 if no.
//  1 if yes, but stayed inside [actor[].ceilingz+1, actor[].floorz].
// <0 if yes, but passed a TROR no-SE7 water boundary. -returnvalue-1 is the
//       other-side sector number.
function A_CheckNeedZUpdate(/*int32_t*/ spritenum: number, /*int32_t */changez: number, /*int32_t **/dazptr: R<number>): number
{
    var spr = sprite[spritenum];
    var /*int32_t */daz = spr.z + (changez>>1);

    dazptr.$ = daz;

    if (changez == 0)
        return 0;

    if (daz > actor[spritenum].ceilingz && daz <= actor[spritenum].floorz)
        return 1;

//#ifdef YAX_ENABLE
    {
        var psect=spr.sectnum, slotag=sector[psect].lotag;
        var /*int32_t */othersect: number;
        // Non-SE7 water.
        // PROJECTILE_CHSECT
        if ((changez < 0 && slotag==ST_2_UNDERWATER) || (changez > 0 && slotag==ST_1_ABOVE_WATER)) {
            var $othersect = new R(othersect);
            var result = A_CheckNoSE7Water(spr, sprite[spritenum].sectnum, slotag, $othersect);
            othersect = $othersect.$;
            if (result)
            {
                A_Spawn(spritenum, WATERSPLASH2);
                // NOTE: Don't tweak its z position afterwards like with
                // SE7-induced projectile teleportation. It doesn't look good
                // with TROR water.

                actor[spritenum].flags |= SPRITE_DIDNOSE7WATER;
                return -othersect-1;
            }
        }
    }
//#endif

    return 0;
}

function /*int32_t */A_MoveSprite(/*int32_t*/ spritenum: number, /*const vec3_t **/change: IVec3, /*uint32_t*/ cliptype: number): number
{
    var spr = sprite[spritenum];
    var retval: number, daz: number, dozupdate: number;      //int32_t 
    var dasectnum: number;                   //int16_t 
    var bg = A_CheckEnemySprite(spr);
    var oldx = spr.x, oldy = spr.y;
//    const int32_t osectnum = spr.sectnum;
    
    dlog(DEBUG_SPRITE, "A_MoveSprite spritenum:%i, change: %i, %i, %i, cliptype: %u\n", spritenum, change.x, change.y, change.z, cliptype);
    if (spr.statnum == STAT_MISC || (bg && spr.xrepeat < 4))
    {
        spr.x += change.x;
        spr.y += change.y;
        spr.z += change.z;

        if (bg)
            setsprite(spritenum, spr);

        return 0;
    }

    dasectnum = spr.sectnum;
    daz = spr.z - 2*tilesizy[spr.picnum]*spr.yrepeat;

    {
        var oldz=spr.z;
        var clipdist: number;

        if (bg)
        {
            if (spr.xrepeat > 60)
                clipdist = 1024;
            else if (spr.picnum == LIZMAN)
                clipdist = 292;
            else if (A_CheckSpriteTileFlags(spr.picnum, SPRITE_BADGUY))
                clipdist = spr.clipdist<<2;
            else
                clipdist = 192;
        }
        else
        {
            if (spr.statnum == STAT_PROJECTILE && (SpriteProjectile[spritenum].workslike & PROJECTILE_REALCLIPDIST) == 0)
                clipdist = 8;
            else
                clipdist = spr.clipdist<<2;
        }

        spr.z = daz;
        var $dasectnum = new R(dasectnum);
        retval = clipmove(spr, $dasectnum,
                          change.x<<13, change.y<<13,
                          clipdist, 4<<8, 4<<8, cliptype);
        dasectnum = $dasectnum.$;
        spr.z = oldz;
    }

    if (bg)
    {
        if (dasectnum < 0 ||
                ((actor[spritenum].actorstayput >= 0 && actor[spritenum].actorstayput != dasectnum) ||
                 (spr.picnum == BOSS2 && spr.pal == 0 && sector[dasectnum].lotag != ST_3) ||
                 ((spr.picnum == BOSS1 || spr.picnum == BOSS2) && sector[dasectnum].lotag == ST_1_ABOVE_WATER)
//                 || (sector[dasectnum].lotag == ST_1_ABOVE_WATER && (spr.picnum == LIZMAN || (spr.picnum == LIZTROOP && spr.zvel == 0)))
                )
            )
        {
            spr.x = oldx;
            spr.y = oldy;
/*
            if (dasectnum >= 0 && sector[dasectnum].lotag == ST_1_ABOVE_WATER && spr.picnum == LIZMAN)
                spr.ang = (krand()&2047);
            else if ((Actor[spritenum].t_data[0]&3) == 1 && spr.picnum != COMMANDER)
                spr.ang = (krand()&2047);
*/
            setsprite(spritenum, spr);

            if (dasectnum < 0)
                dasectnum = 0;

            return 16384+dasectnum;
        }

        if ((retval&49152) >= 32768 && actor[spritenum].cgg==0)
            spr.ang += 768;
    }

    if (dasectnum == -1)
    {
        dasectnum = spr.sectnum;
//        OSD_Printf("%s:%d wtf\n",__FILE__,__LINE__);
    }
    else if (dasectnum != spr.sectnum)
    {
        changespritesect(spritenum, dasectnum);
        // A_GetZLimits(spritenum);
    }

    Bassert(dasectnum == spr.sectnum);

    var $daz = new R(daz);
    dozupdate = A_CheckNeedZUpdate(spritenum, change.z, $daz);
    daz = $daz.$;

    // Update sprite's z positions and (for TROR) maybe the sector number.
    if (dozupdate)
    {
        spr.z = daz;
//#ifdef YAX_ENABLE
        if (dozupdate < 0)
        {
            // If we passed a TROR no-SE7 water boundary, signal to the outside
            // that the ceiling/floor was not hit. However, this is not enough:
            // later, code checks for (retval&49152)!=49152
            // [i.e. not "was ceiling or floor hit", but "was no sprite hit"]
            // and calls G_WeaponHitCeilingOrFloor() then, so we need to set
            // actor[].flags |= SPRITE_DIDNOSE7WATER in A_CheckNeedZUpdate()
            // previously.
            // XXX: Why is this contrived data flow necessary? (If at all.)
            changespritesect(spritenum, -dozupdate-1);
            return 0;
        }
        
        if (yax_getbunch(dasectnum, (change.z>0)?1:0)>=0
                && (SECTORFLD(dasectnum,"stat", (change.z>0)?1:0)&yax_waltosecmask(cliptype))==0)
        {
            setspritez(spritenum, spr);
        }
//#endif
    }
    else if (change.z != 0 && retval == 0)
        retval = 16384+dasectnum;

    if (retval == 16384+dasectnum)
        if (spr.statnum == STAT_PROJECTILE)
        {
            var i: number;
            // Projectile sector changes due to transport SEs (SE7_PROJECTILE).
            // PROJECTILE_CHSECT
            for (i = headspritestat[STAT_TRANSPORT]; i >= 0; i = nextspritestat[i])
                if (sprite[i].sectnum == dasectnum)
                {
                    var /*int32_t */lotag = sector[dasectnum].lotag;

                    if (lotag == ST_1_ABOVE_WATER)
                        if (daz >= actor[spritenum].floorz)
                            if (Proj_MaybeDoTransport(spritenum, i, 0, daz))
                                return 0;

                    if (lotag == ST_2_UNDERWATER)
                        if (daz <= actor[spritenum].ceilingz)
                            if (Proj_MaybeDoTransport(spritenum, i, 1, daz))
                                return 0;
                }
        }

    return retval;
}

var block_deletesprite = 0;//int32_t 

//#ifdef POLYMER
//static void A_DeleteLight(int32_t s)
//{
//    if (actor[s].lightId >= 0)
//        polymer_deletelight(actor[s].lightId);
//    actor[s].lightId = -1;
//    actor[s].lightptr = NULL;
//}

//void G_Polymer_UnInit(void)
//{
//    int32_t i;

//    for (i=0; i<MAXSPRITES; i++)
//        A_DeleteLight(i);
//}
//#endif

// deletesprite() game wrapper
function A_DeleteSprite(s: number): void
{
    if (block_deletesprite)
    {
        OSD_Printf(OSD_ERROR + "A_DeleteSprite(): tried to remove sprite %d in EVENT_EGS\n",s);
        return;
    }
    
    if (G_HaveEvent(EVENT_KILLIT))
    {
        var p = new R<number>(0), pl=A_FindPlayer(sprite[s],p);

        if (VM_OnEvent(EVENT_KILLIT, s, pl, p.$, 0))
            return;
    }

//#ifdef POLYMER
    if (getrendermode() == REND_POLYMER && actor[s].lightptr != NULL)
        todoThrow("A_DeleteLight(s);");
//#endif

    if (sprite[s].picnum == MUSICANDSFX && actor[s].t_data[8]==1)
    {
        // AMBIENT_SFX_PLAYING
        S_StopEnvSound(sprite[s].lotag, s);
    }

    // NetAlloc
    if (Net_IsRelevantSprite(s))
    {
        Net_DeleteSprite(s);
    }
    else
    {
        deletesprite(s);
    }
}

function A_AddToDeleteQueue(/*int32_t */i: number): void
{
    if (g_spriteDeleteQueueSize == 0)
    {
        A_DeleteSprite(i);
        return;
    }

    if (SpriteDeletionQueue[g_spriteDeleteQueuePos] >= 0)
        sprite[SpriteDeletionQueue[g_spriteDeleteQueuePos]].xrepeat = 0;
    SpriteDeletionQueue[g_spriteDeleteQueuePos] = i;
    g_spriteDeleteQueuePos = (g_spriteDeleteQueuePos+1)%g_spriteDeleteQueueSize;
}

function A_SpawnMultiple(/*int32_t */sp:number, /*int32_t */pic:number, /*int32_t */n:number): void
{
    var /*int32_t */j:number;
    var s = sprite[sp];

    for (; n>0; n--)
    {
        var krands = getKrands(2);
        j = A_InsertSprite(s.sectnum,s.x,s.y,s.z-(krands.pop()%(47<<8)),pic,-32,8,8,krands.pop()&2047,0,0,sp,5);
        A_Spawn(-1, j);
        sprite[j].cstat = krand()&12;
    }
}

function A_DoGuts(/*int32_t*/ sp:number, /*int32_t */gtype:number, /*int32_t */n:number):void
{
    var/*int32_t */gutz:number,floorz:number;
    var /*int32_t */i:number,a:number,j:number,sx = 32,sy = 32;

    var s = sprite[sp];

    if (A_CheckEnemySprite(s) && s.xrepeat < 16)
        sx = sy = 8;

    gutz = s.z-(8<<8);
    floorz = getflorzofslope(s.sectnum,s.x,s.y);

    if (gutz > (floorz-(8<<8)))
        gutz = floorz-(8<<8);

    if (s.picnum == COMMANDER)
        gutz -= (24<<8);

    for (j=n; j>0; j--)
    {
        a = krand()&2047;
        var krands = getKrands(5);
        i = A_InsertSprite(s.sectnum,s.x+(krands.pop()&255)-128,s.y+(krands.pop()&255)-128,gutz-(krands.pop()&8191),gtype,-32,sx,sy,a,48+(krands.pop()&31),-512-(krands.pop()&2047),sp,5);
        if (sprite[i].picnum == JIBS2)
        {
            sprite[i].xrepeat >>= 2;
            sprite[i].yrepeat >>= 2;
        }

        sprite[i].pal = s.pal;
    }
}

//void A_DoGutsDir(int32_t sp, int32_t gtype, int32_t n)
//{
//    int32_t gutz,floorz;
//    int32_t i,a,j,sx = 32,sy = 32;
//    const spritetype *const s = &sprite[sp];

//    if (A_CheckEnemySprite(s) && s.xrepeat < 16)
//        sx = sy = 8;

//    gutz = s.z-(8<<8);
//    floorz = getflorzofslope(s.sectnum,s.x,s.y);

//    if (gutz > (floorz-(8<<8)))
//        gutz = floorz-(8<<8);

//    if (s.picnum == COMMANDER)
//        gutz -= (24<<8);

//    for (j=n; j>0; j--)
//    {
//        a = krand()&2047;
//        i = A_InsertSprite(s.sectnum,s.x,s.y,gutz,gtype,-32,sx,sy,a,256+(krand()&127),-512-(krand()&2047),sp,5);
//        sprite[i].pal = s.pal;
//    }
//}

function/* int32_t */G_ToggleWallInterpolation(/*int32_t */w: number, /*int32_t */doset: number):number
{
    
    if (doset)
    {
        return G_SetInterpolation((new AnimatePtr(wall, w, "x")/* wall[w].x*/))
            || G_SetInterpolation(new AnimatePtr(wall, w, "y")/* wall[w].y*/);
    }
    else
    {
        G_StopInterpolation(new AnimatePtr(wall, w, "x")/* wall[w].x*/);
        G_StopInterpolation(new AnimatePtr(wall, w, "y")/* wall[w].y*/);
        return 0;
    }
}

function Sect_ToggleInterpolation(/*int32_t*/ sectnum: number, /*int32_t */doset: number): void
{
    var /*int32_t */k: number, j = sector[sectnum].wallptr, endwall = j+sector[sectnum].wallnum;

    for (; j<endwall; j++)
    {
        G_ToggleWallInterpolation(j, doset);

        k = wall[j].nextwall;
        if (k >= 0)
        {
            G_ToggleWallInterpolation(k, doset);
            G_ToggleWallInterpolation(wall[k].point2, doset);
        }
    }
}

function Sect_SetInterpolation(/*int32_t*/ sectnum: number): void
{
    Sect_ToggleInterpolation(sectnum, 1);
}

function Sect_ClearInterpolation(/*int32_t*/ sectnum: number): void
{
    Sect_ToggleInterpolation(sectnum, 0);
}

function/*int32_t */move_rotfixed_sprite(/*int32_t */j:number, /*int32_t */pivotspr:number, /*int32_t */daang:number):number
{
    if ((ROTFIXSPR_STATNUMP(sprite[j].statnum) ||
         ((sprite[j].statnum==STAT_ACTOR || sprite[j].statnum==STAT_ZOMBIEACTOR) &&
          A_CheckSpriteTileFlags(sprite[j].picnum, SPRITE_ROTFIXED)))
        && actor[j].t_data[7]==(ROTFIXSPR_MAGIC|pivotspr))
    {
        var $x = new R(sprite[j].x);
        var $y = new R(sprite[j].y);
        rotatepoint(0,0, actor[j].t_data[8],actor[j].t_data[9], daang&2047, $x,$y);
        sprite[j].x = $x.$;
        sprite[j].y = $y.$;
        sprite[j].x += sprite[pivotspr].x;
        sprite[j].y += sprite[pivotspr].y;
        return 0;
    }

    return 1;
}

function A_MoveSector(/*int32_t */i:number):void
{
    //actor[i].t_data[0],actor[i].t_data[1] and actor[i].t_data[2] are used for all the sector moving stuff!!!

    var/*int32_t */tx=new R(0),ty=new R(0);
    var s = sprite[i];
    var/*int32_t */j = actor[i].t_data[1], k = actor[i].t_data[2];

    s.x += (s.xvel*(sintable[(s.ang+512)&2047]))>>14;
    s.y += (s.xvel*(sintable[s.ang&2047]))>>14;

    {
        var/*int32_t */x = sector[s.sectnum].wallptr, endwall = x+sector[s.sectnum].wallnum;

        for (; x<endwall; x++)
        {
            rotatepoint(0,0,msx[j],msy[j],k&2047,tx,ty);
            dragpoint(x,s.x+tx.$,s.y+ty.$,0);

            j++;
        }
    }
}

//#if !defined LUNATIC
//// NOTE: actor[i].t_data[4] is AC_ACTION_ID
//# define LIGHTRAD_PICOFS (actor[i].t_data[4] ? *(script+actor[i].t_data[4]) + (*(script+actor[i].t_data[4]+2))*AC_CURFRAME(actor[i].t_data) : 0)
//#else
//// startframe + viewtype*[cyclic counter]
//# define LIGHTRAD_PICOFS (actor[i].ac.startframe + actor[i].ac.viewtype*AC_CURFRAME(actor[i].t_data))
//#endif

//// this is the same crap as in game.c's tspr manipulation.  puke.
//// XXX: may access tilesizy out-of-bounds by bad user code.
//#define LIGHTRAD (s.yrepeat * tilesizy[s.picnum + LIGHTRAD_PICOFS])
//#define LIGHTRAD2 (((s.yrepeat) + (rand()%(s.yrepeat>>2))) * tilesizy[s.picnum + LIGHTRAD_PICOFS])

function G_AddGameLight(/*int32_t*/ radius:number, /*int32_t */srcsprite:number, /*int32_t */zoffset:number, /*int32_t */range:number, /*int32_t */color:number, /*int32_t */priority:number):void
{
//#ifdef POLYMER
    var s = sprite[srcsprite];

    if (getrendermode() != REND_POLYMER)
        return;
    todoThrow();
    if (actor[srcsprite].lightptr == NULL)
    {
//#pragma pack(push,1)
        var mylight:_prlight ;
//#pragma pack(pop)
        mylight = new _prlight();//Bmemset(&mylight, 0, sizeof(mylight));
          todoThrow();
        //mylight.sector = s.sectnum;
        //mylight.x = s.x;
        //mylight.y = s.y;
        //mylight.z = s.z-zoffset;
        //mylight.color[0] = color&255;
        //mylight.color[1] = (color>>8)&255;
        //mylight.color[2] = (color>>16)&255;
        //mylight.radius = radius;
        //actor[srcsprite].lightmaxrange = mylight.range = range;

        //mylight.priority = priority;
        //mylight.tilenum = 0;

        //mylight.publicflags.emitshadow = 1;
        //mylight.publicflags.negative = 0;
  
        //actor[srcsprite].lightId = polymer_addlight(&mylight);
        //if (actor[srcsprite].lightId >= 0)
        //    actor[srcsprite].lightptr = &prlights[actor[srcsprite].lightId];
        return;
    }

    //s.z -= zoffset;

    //if (range < actor[srcsprite].lightmaxrange>>1)
    //    actor[srcsprite].lightmaxrange = 0;

    //if (range > actor[srcsprite].lightmaxrange ||
    //        priority != actor[srcsprite].lightptr.priority ||
    //        Bmemcmp(&sprite[srcsprite], actor[srcsprite].lightptr, sizeof(int32_t) * 3))
    //{
    //    if (range > actor[srcsprite].lightmaxrange)
    //        actor[srcsprite].lightmaxrange = range;

    //    Bmemcpy(actor[srcsprite].lightptr, &sprite[srcsprite], sizeof(int32_t) * 3);
    //    actor[srcsprite].lightptr.sector = s.sectnum;
    //    actor[srcsprite].lightptr.flags.invalidate = 1;
    //}

    //actor[srcsprite].lightptr.priority = priority;
    //actor[srcsprite].lightptr.range = range;
    //actor[srcsprite].lightptr.color[0] = color&255;
    //actor[srcsprite].lightptr.color[1] = (color>>8)&255;
    //actor[srcsprite].lightptr.color[2] = (color>>16)&255;

    //s.z += zoffset;

//#else
//    UNREFERENCED_PARAMETER(radius);
//    UNREFERENCED_PARAMETER(srcsprite);
//    UNREFERENCED_PARAMETER(zoffset);
//    UNREFERENCED_PARAMETER(range);
//    UNREFERENCED_PARAMETER(color);
//    UNREFERENCED_PARAMETER(priority);
//#endif
}

// sleeping monsters, etc
var G_MoveZombieActors_count = 0;
function G_MoveZombieActors(): void
{
    var/*int32_t */i = headspritestat[STAT_ZOMBIEACTOR], j:number;
    dlog(DEBUG_MOVE_ZOMBIE_ACTORS, "G_MoveZombieActors %i\n,", G_MoveZombieActors_count++);
    while (i >= 0)
    {
        var /*const int32_t */nexti = nextspritestat[i];

        var /*int32_t */x:number;
        var s = sprite[i];
        var $x = new R(x);
        var /*const int32_t */p = A_FindPlayer(s,$x);
        x = $x.$;

        var /*int16_t*/ ssect = s.sectnum;
        var /*int16_t*/ psect = s.sectnum;
        
        dlog(DEBUG_MOVE_ZOMBIE_ACTORS, "i: %i, x: %i, actor[i].timetosleep: %i, extra: %i\n",i,x,actor[i].timetosleep,sprite[g_player[p].ps.i].extra);
        if (sprite[g_player[p].ps.i].extra > 0)
        {
            if (x < 30000)
            {
                actor[i].timetosleep++;
                if (actor[i].timetosleep >= (x>>8))
                {
                    if (A_CheckEnemySprite(s))
                    {
                        dlog(DEBUG_MOVE_ZOMBIE_ACTORS, "A_CheckEnemySprite TRUE\n");
                        var /*const int32_t*/ px = g_player[p].ps.opos.x+64-(krand()&127);
                        var /*const int32_t*/ py = g_player[p].ps.opos.y+64-(krand()&127);
                        var /*int32_t*/ sx:number, sy:number;

                        var $psect = new R(psect);
                        updatesector(px,py,$psect);
                        psect = $psect.$;
                        if (psect == -1)
                        {
                            i = nexti;
                            continue;
                        }

                        sx = s.x+64-(krand()&127);
                        sy = s.y+64-(krand()&127);
                        var $ssect = new R(ssect);
                        updatesector(px,py,$ssect);
                        ssect = $ssect.$;
                        if (ssect == -1)
                        {
                            i = nexti;
                            continue;
                        }
                        
                        var krands = getKrands(2);
                        j = cansee(sx,sy,s.z-(krands.pop()%(52<<8)),s.sectnum, px,py,
                                   g_player[p].ps.opos.z-(krands.pop()%(32<<8)),g_player[p].ps.cursectnum);
                    }
                    else {
                        var krands = getKrands(2);
                        j = cansee(s.x,s.y,s.z-((krands.pop()&31)<<8),s.sectnum, g_player[p].ps.opos.x,g_player[p].ps.opos.y,
                                   g_player[p].ps.opos.z-((krands.pop()&31)<<8), g_player[p].ps.cursectnum);
                    }
                    dlog(DEBUG_MOVE_ZOMBIE_ACTORS, "G_MoveZombieActors j: %i\n,", j);
                    if (j)
                    {
                        switch (DYNAMICTILEMAP(s.picnum))
                        {
                        case RUBBERCAN__STATIC:
                        case EXPLODINGBARREL__STATIC:
                        case WOODENHORSE__STATIC:
                        case HORSEONSIDE__STATIC:
                        case CANWITHSOMETHING__STATIC:
                        case CANWITHSOMETHING2__STATIC:
                        case CANWITHSOMETHING3__STATIC:
                        case CANWITHSOMETHING4__STATIC:
                        case FIREBARREL__STATIC:
                        case FIREVASE__STATIC:
                        case NUKEBARREL__STATIC:
                        case NUKEBARRELDENTED__STATIC:
                        case NUKEBARRELLEAKED__STATIC:
                        case TRIPBOMB__STATIC:
                            // XXX: j is result of cansee() call.
                            if (sector[s.sectnum].ceilingstat&1 && A_CheckSpriteFlags(j,SPRITE_NOSHADE) == 0)
                                s.shade = sector[s.sectnum].ceilingshade;
                            else s.shade = sector[s.sectnum].floorshade;

                            actor[i].timetosleep = 0;
                            changespritestat(i, STAT_STANDABLE);
                            break;

                        case RECON__STATIC:
                            sprite[i].cstat |= 257;
                            // fall-through
                        default:
                            if (A_CheckSpriteFlags(i, SPRITE_USEACTIVATOR) && sector[sprite[i].sectnum].lotag & 16384)
                                break;
                            actor[i].timetosleep = 0;
                            A_PlayAlertSound(i);
                            changespritestat(i, STAT_ACTOR);
                            break;
                        }
                    }
                    else actor[i].timetosleep = 0;
                }
            }

            if (A_CheckEnemySprite(s) && A_CheckSpriteFlags(i,SPRITE_NOSHADE) == 0)
            {
                if (sector[s.sectnum].ceilingstat&1)
                    s.shade = sector[s.sectnum].ceilingshade;
                else s.shade = sector[s.sectnum].floorshade;
            }
        }

        i = nexti;
    }
}

//// stupid name, but it's what the function does.
//static inline int32_t G_FindExplosionInSector(int32_t sectnum)
//{
//    int32_t i;

//    for (SPRITES_OF(STAT_MISC, i))
//        if (sprite[i].picnum == EXPLOSION2 && sectnum == sprite[i].sectnum)
//            return i;

//    return -1;
//}

function P_Nudge(/*int32_t*/ p:number, /*int32_t */sn:number, /*int32_t */shl:number):void
{
    g_player[p].ps.vel.x += actor[sn].extra*(sintable[(actor[sn].ang+512)&2047])<<shl;
    g_player[p].ps.vel.y += actor[sn].extra*(sintable[actor[sn].ang&2047])<<shl;
}

function/*int32_t */A_IncurDamage(/*int32_t */sn:number):number
{
    var targ = sprite[sn];
    var dmg = actor[sn];

    // dmg.picnum check: safety, since it might have been set to <0 from CON.
    if (dmg.extra < 0 || targ.extra < 0 || dmg.picnum < 0)
    {
        dmg.extra = -1;
        return -1;
    }

    if (targ.picnum == APLAYER)
    {
        var/*int32_t */p = targ.yvel;

        if (ud.god && dmg.picnum != SHRINKSPARK) return -1;

        if (dmg.owner >= 0 && ud.ffire == 0 && sprite[dmg.owner].picnum == APLAYER &&
            (GametypeFlags[ud.coop] & GAMETYPE_PLAYERSFRIENDLY ||
            (GametypeFlags[ud.coop] & GAMETYPE_TDM && g_player[p].ps.team == g_player[sprite[dmg.owner].yvel].ps.team)))
            return -1;

        targ.extra -= dmg.extra;

        if (dmg.owner >= 0 && targ.extra <= 0 && dmg.picnum != FREEZEBLAST)
        {
            targ.extra = 0;

            g_player[p].ps.wackedbyactor = dmg.owner;

            if (sprite[dmg.owner].picnum == APLAYER && p != sprite[dmg.owner].yvel)
                g_player[p].ps.frag_ps = sprite[dmg.owner].yvel;

            dmg.owner = g_player[p].ps.i;
        }

        switch (DYNAMICTILEMAP(dmg.picnum))
        {
        case RADIUSEXPLOSION__STATIC:
        case RPG__STATIC:
        case HYDRENT__STATIC:
        case HEAVYHBOMB__STATIC:
        case SEENINE__STATIC:
        case OOZFILTER__STATIC:
        case EXPLODINGBARREL__STATIC:
            P_Nudge(p, sn, 2);
            break;

        default:
            if (A_CheckSpriteTileFlags(dmg.picnum, SPRITE_PROJECTILE) && (SpriteProjectile[sn].workslike & PROJECTILE_RPG))
                P_Nudge(p, sn, 2);
            else P_Nudge(p, sn, 1);
            break;
        }

        dmg.extra = -1;
        return dmg.picnum;
    }

    if (dmg.extra == 0)
        if (dmg.picnum == SHRINKSPARK && targ.xrepeat < 24)
            return -1;

    targ.extra -= dmg.extra;

    if (targ.picnum != RECON && targ.owner >= 0 && sprite[targ.owner].statnum < MAXSTATUS)
        targ.owner = dmg.owner;

    dmg.extra = -1;
    return dmg.picnum;
}

function A_MoveCyclers():void
{
    var /*int32_t */i:number;

    for (i=g_numCyclers-1; i>=0; i--)
    {
        var c = cyclers[i];
        var/* int32_t */sect = c[0];
        var /*int32_t */t = c[3];
        var /*int32_t */j = t + (sintable[c[1]&2047]>>10);
        var /*int32_t */cshade = c[2];

        if (j < cshade)
            j = cshade;
        else if (j > t)
            j = t;

        c[1] += sector[sect].extra;

        if (c[5])
        {
            var walIdx = sector[sect].wallptr, wal = wall[walIdx];
            var/*int32_t */x:number;

            for (x = sector[sect].wallnum; x>0; x--,wal = wall[++walIdx])
            {
                if (wal.hitag != 1)
                {
                    wal.shade = j;

                    if ((wal.cstat&2) && wal.nextwall >= 0)
                        wall[wal.nextwall].shade = j;
                }
            }

            sector[sect].floorshade = sector[sect].ceilingshade = j;
        }
    }
}

function A_MoveDummyPlayers(): void
{
    var /*int32_t */i = headspritestat[STAT_DUMMYPLAYER];

    while (i >= 0)
    {
        var /*const int32_t */p = sprite[sprite[i].owner].yvel;
        var ps = g_player[p].ps;

        var /*int32_t*/ nexti = nextspritestat[i];
        var /*int32_t*/ psectnum = ps.cursectnum;

        if (ps.on_crane >= 0 || (psectnum >= 0 && sector[psectnum].lotag != ST_1_ABOVE_WATER) || sprite[ps.i].extra <= 0)
        {
            ps.dummyplayersprite = -1;
            A_DeleteSprite(i); i = nexti; continue;//KILLIT(i);
        }
        else
        {
            if (ps.on_ground && ps.on_warping_sector == 1 && psectnum >= 0 && sector[psectnum].lotag == ST_1_ABOVE_WATER)
            {
                sprite[i].cstat = 257;
                sprite[i].z = sector[sprite[i].sectnum].ceilingz+(27<<8);
                sprite[i].ang = ps.ang;
                if (actor[i].t_data[0] == 8)
                    actor[i].t_data[0] = 0;
                else actor[i].t_data[0]++;
            }
            else
            {
                if (sector[sprite[i].sectnum].lotag != ST_2_UNDERWATER) sprite[i].z = sector[sprite[i].sectnum].floorz;
                sprite[i].cstat = 32768;
            }
        }

        sprite[i].x += (ps.pos.x-ps.opos.x);
        sprite[i].y += (ps.pos.y-ps.opos.y);
        setsprite(i, sprite[i]);

//BOLT:
        i = nexti;
    }
}


//static int32_t P_Submerge(int32_t j, int32_t p, DukePlayer_t *ps, int32_t sect, int32_t othersect);
//static int32_t P_Emerge(int32_t j, int32_t p, DukePlayer_t *ps, int32_t sect, int32_t othersect);
//static void P_FinishWaterChange(int32_t j, DukePlayer_t *ps, int32_t sectlotag, int32_t ow, int32_t newsectnum);

function G_MovePlayers():void
{
    var/*int32_t */i = headspritestat[STAT_PLAYER];
    BOLT:
    while (i >= 0)
    {
        var/*const int32_t */nexti = nextspritestat[i];

        var s = sprite[i];
        var p = g_player[s.yvel].ps;

        if (s.owner >= 0)
        {
            if (p.newowner >= 0)  //Looking thru the camera
            {
                s.x = p.opos.x;
                s.y = p.opos.y;
                actor[i].bpos.z = s.z = p.opos.z+PHEIGHT;
                s.ang = p.oang;
                setsprite(i,/*(vec3_t *)*/s);
            }
            else
            {
                var/*int32_t */otherx:number;
//#ifdef YAX_ENABLE
                // TROR water submerge/emerge
                var/*const int32_t */psect=s.sectnum, slotag=sector[psect].lotag;
                var/*int32_t */othersect:number;

                var $othersect = new R(othersect);
                var checkNoSe7result = A_CheckNoSE7Water(s, psect, slotag, $othersect);
                othersect = $othersect.$;

                if (checkNoSe7result)
                {
                    var/*int32_t */k = 0;

                    // NOTE: Compare with G_MoveTransports().
                    p.on_warping_sector = 1;

                    if (slotag==ST_1_ABOVE_WATER)
                        k = P_Submerge(i, s.yvel, p, psect, othersect);
                    else
                        k = P_Emerge(i, s.yvel, p, psect, othersect);

                    if (k == 1)
                        P_FinishWaterChange(i, p, slotag, -1, othersect);
                }
//#endif
                if (g_netServer || ud.multimode > 1) {
                    var $otherx = new R(otherx);
                    otherp = P_FindOtherPlayer(s.yvel,$otherx);
                    otherx = $otherx.$;
                }
                else
                {
                    otherp = s.yvel;
                    otherx = 0;
                }

                if (G_HaveActor(sprite[i].picnum))
                    A_Execute(i,s.yvel,otherx);

                if (g_netServer || ud.multimode > 1)
                    if (sprite[g_player[otherp].ps.i].extra > 0)
                    {
                        if (s.yrepeat > 32 && sprite[g_player[otherp].ps.i].yrepeat < 32)
                        {
                            if (otherx < 1400 && p.knee_incs == 0)
                            {
                                p.knee_incs = 1;
                                p.weapon_pos = -1;
                                p.actorsqu = g_player[otherp].ps.i;
                            }
                        }
                    }

                if (ud.god)
                {
                    s.extra = p.max_player_health;
                    s.cstat = 257;
                    p.inv_amount[GET_JETPACK] =     1599;
                }

                if (s.extra > 0)
                {
                    actor[i].owner = i;

                    if (ud.god == 0)
                        if (G_CheckForSpaceCeiling(s.sectnum) || G_CheckForSpaceFloor(s.sectnum))
                            P_QuickKill(p);
                }
                else
                {
                    p.pos.x = s.x;
                    p.pos.y = s.y;
                    p.pos.z = s.z-(20<<8);

                    p.newowner = -1;

                    if (p.wackedbyactor >= 0 && sprite[p.wackedbyactor].statnum < MAXSTATUS)
                    {
                        p.ang += G_GetAngleDelta(p.ang,getangle(sprite[p.wackedbyactor].x-p.pos.x,sprite[p.wackedbyactor].y-p.pos.y))>>1;
                        p.ang &= 2047;
                    }
                }

                s.ang = p.ang;
            }
        }
        else
        {
            if (p.holoduke_on == -1)
                {A_DeleteSprite(i); i = nexti; continue BOLT;}//KILLIT(i);

            actor[i].bpos.copyFrom(s);//Bmemcpy(&actor[i].bpos.x, s, sizeof(vec3_t));
            s.cstat = 0;

            if (s.xrepeat < 42)
            {
                s.xrepeat += 4;
                s.cstat |= 2;
            }
            else s.xrepeat = 42;

            if (s.yrepeat < 36)
                s.yrepeat += 4;
            else
            {
                s.yrepeat = 36;
                if (sector[s.sectnum].lotag != ST_2_UNDERWATER)
                    A_Fall(i);
                if (s.zvel == 0 && sector[s.sectnum].lotag == ST_1_ABOVE_WATER)
                    s.z += (32<<8);
            }

            if (s.extra < 8)
            {
                s.xvel = 128;
                s.ang = p.ang;
                s.extra++;
                A_SetSprite(i,CLIPMASK0);
            }
            else
            {
                s.ang = 2047-p.ang;
                setsprite(i,/*(vec3_t *)*/s);
            }
        }

        if (sector[s.sectnum].ceilingstat&1)
            s.shade += (sector[s.sectnum].ceilingshade-s.shade)>>1;
        else
            s.shade += (sector[s.sectnum].floorshade-s.shade)>>1;

//BOLT:
        i = nexti;
    }
}

function G_MoveFX(): void
{
    var /*int32_t */i = headspritestat[STAT_FX];
    BOLT:
    while (i >= 0)
    {
        var s = sprite[i];
        var /*const int32_t */nexti = nextspritestat[i];

        switch (DYNAMICTILEMAP(s.picnum))
        {
        case RESPAWN__STATIC:
            if (sprite[i].extra == 66)
            {
                /*int32_t j =*/ A_Spawn(i,sprite[i].hitag);
                //                    sprite[j].pal = sprite[i].pal;
                {A_DeleteSprite(i); {i = nexti; continue BOLT;}}//KILLIT(i);
            }
            else if (sprite[i].extra > (66-13))
                sprite[i].extra++;
            break;

        case MUSICANDSFX__STATIC:
        {
            var /*const int32_t */ht = s.hitag;
            var peekps = g_player[screenpeek].ps;

            if (actor[i].t_data[1] != ud.config.SoundToggle)
            {
                // If sound playback was toggled, restart.
                actor[i].t_data[1] = ud.config.SoundToggle;
                actor[i].t_data[0] = 0;
            }

            if (s.lotag >= 1000 && s.lotag < 2000)
            {
                var /*int32_t */x = ldist(sprite[peekps.i],s);

                if (g_fakeMultiMode==2)
                {
                    // HACK for splitscreen mod
                    var /*int32_t */otherdist = ldist(sprite[g_player[1].ps.i],s);
                    x = min(x, otherdist);
                }

                if (x < ht && actor[i].t_data[0] == 0)
                {
                    FX_SetReverb(s.lotag - 1000);
                    actor[i].t_data[0] = 1;
                }
                if (x >= ht && actor[i].t_data[0] == 1)
                {
                    FX_SetReverb(0);
                    FX_SetReverbDelay(0);
                    actor[i].t_data[0] = 0;
                }
            }
            else if (s.lotag < 999 && unsigned(sector[s.sectnum].lotag) < 9 &&  // ST_9_SLIDING_ST_DOOR
                         ud.config.AmbienceToggle && sector[sprite[i].sectnum].floorz != sector[sprite[i].sectnum].ceilingz)
            {
                if (g_sounds[s.lotag].m&2)
                {
                    var /*int32_t */ x = dist(sprite[peekps.i],s);

                    if (g_fakeMultiMode==2)
                    {
                        // HACK for splitscreen mod
                        var /*int32_t */otherdist = dist(sprite[g_player[1].ps.i],s);
                        x = min(x, otherdist);
                    }

                    if (x < ht && actor[i].t_data[0] == 0 && FX_VoiceAvailable(g_sounds[s.lotag].pr-1))
                    {
                        // Start playing an ambience sound.

                        var /*char */om = g_sounds[s.lotag].m;
                        if (g_numEnvSoundsPlaying == ud.config.NumVoices)
                        {
                            var /*nt32_t */j:number;

                            for (j = headspritestat[STAT_FX]; j >= 0; j = nextspritestat[j] /*SPRITES_OF(STAT_FX, j)*/)
                                if (j != i && S_IsAmbientSFX(j) && actor[j].t_data[0] == 1 &&
                                        dist(sprite[j], sprite[peekps.i]) > x)
                                {
                                    S_StopEnvSound(sprite[j].lotag,j);
                                    break;
                                }

                            if (j == -1)
                                { i = nexti; continue BOLT; }
                        }

                        g_sounds[s.lotag].m |= 1;
                        A_PlaySound(s.lotag,i);
                        g_sounds[s.lotag].m = om;
                        actor[i].t_data[0] = 1;
                        actor[i].t_data[8] = 1;  // AMBIENT_SFX_PLAYING
                    }
                    else if (x >= ht && actor[i].t_data[0] == 1)
                    {
                        // Stop playing ambience sound because we're out of its range.

                        // actor[i].t_data[0] = 0;
                        actor[i].t_data[8] = 0;
                        S_StopEnvSound(s.lotag,i);
                    }
                }

                if (g_sounds[s.lotag].m&16)
                {
                    // Randomly playing global sounds (flyby of planes, screams, ...)

                    if (actor[i].t_data[4] > 0)
                        actor[i].t_data[4]--;
                    else
                    {
                        var/*int32_t */p: number;
                        for (p = 0; p != -1; p = connectpoint2[p])
                            if (p == myconnectindex && g_player[p].ps.cursectnum == s.sectnum)
                            {
                                S_PlaySound(s.lotag + unsigned(g_globalRandom) % (s.hitag+1));
                                actor[i].t_data[4] = GAMETICSPERSEC*40 + g_globalRandom%(GAMETICSPERSEC*40);
                            }
                    }
                }
            }
            break;
        }
        }
//BOLT:
        i = nexti;
    }
}

function G_MoveFallers():void
{
    var/*int32_t */i = headspritestat[STAT_FALLER];
    BOLT:
    while (i >= 0)
    {
        var/*const int32_t */nexti = nextspritestat[i];
        var s = sprite[i];

        var/*const int32_t */sect = s.sectnum;

        if (actor[i].t_data[0] == 0)
        {
            var/*int32_t */j:number;
            var/*const int32_t */oextra = s.extra;

            s.z -= (16<<8);
            actor[i].t_data[1] = s.ang;
            if ((j = A_IncurDamage(i)) >= 0)
            {
                if (j == FIREEXT || j == RPG || j == RADIUSEXPLOSION || j == SEENINE || j == OOZFILTER)
                {
                    if (s.extra <= 0)
                    {
                        actor[i].t_data[0] = 1;

                        for (j = headspritestat[STAT_FALLER]; j >= 0; j = nextspritestat[j] /*SPRITES_OF(STAT_FALLER, j)*/)
                        {
                            if (sprite[j].hitag == sprite[i].hitag)
                            {
                                actor[j].t_data[0] = 1;
                                sprite[j].cstat &= (65535-64);
                                if (sprite[j].picnum == CEILINGSTEAM || sprite[j].picnum == STEAM)
                                    sprite[j].cstat |= 32768;
                            }
                        }
                    }
                }
                else
                {
                    actor[i].extra = 0;
                    s.extra = oextra;
                }
            }
            s.ang = actor[i].t_data[1];
            s.z += (16<<8);
        }
        else if (actor[i].t_data[0] == 1)
        {
            if (int16(s.lotag) > 0)
            {
                s.lotag-=3;
                if (int16(s.lotag) <= 0)
                {
                    s.xvel = (32+(krand()&63));
                    s.zvel = -(1024+(krand()&1023));
                }
            }
            else
            {
                var/*int32_t */x:number;

                if (s.xvel > 0)
                {
                    s.xvel -= 8;
                    A_SetSprite(i,CLIPMASK0);
                }

                if (G_CheckForSpaceFloor(s.sectnum))
                    x = 0;
                else
                {
                    if (G_CheckForSpaceCeiling(s.sectnum))
                        x = int32(g_spriteGravity/6);
                    else
                        x = g_spriteGravity;
                }

                if (s.z < (sector[sect].floorz-ZOFFSET))
                {
                    s.zvel += x;
                    if (s.zvel > 6144)
                        s.zvel = 6144;
                    s.z += s.zvel;
                }
                if ((sector[sect].floorz-s.z) < (16<<8))
                {
                    var /*int32_t */j = 1+(krand()&7);
                    for (x=0; x<j; x++) RANDOMSCRAP(s, i);
                    A_DeleteSprite(i); i = nexti; continue BOLT; //KILLIT(i);
                }
            }
        }

//BOLT:
        i = nexti;
    }
}

function G_MoveStandables():void
{
    var/*int32_t */i = headspritestat[STAT_STANDABLE], j:number, switchpicnum:number;
    var/*int32_t */l=0, x:number;

    BOLT:
    while (i >= 0)
    {
        var/*const int32_t */nexti = nextspritestat[i];

        var/*int32_t *const */t = actor[i].t_data;
        var s = sprite[i];
        var /*const int32_t */sect = s.sectnum;

        dlog(DEBUG_MOVE_STANDABLES, "i: %i, sect: %i, picnum: %i\n", i,sect,sprite[i].picnum);
        if (sect < 0)
            {A_DeleteSprite(i); {i = nexti;continue BOLT;}}

        // Rotation-fixed sprites in rotating sectors already have bpos* updated.
        if ((t[7]&(0xffff0000))!=ROTFIXSPR_MAGIC) {
            //Bmemcpy(&actor[i].bpos.x, s, sizeof(vec3_t));
            actor[i].bpos.x = s.x;
            actor[i].bpos.y = s.y;
            actor[i].bpos.z = s.z;
        }

        if (sprite[i].picnum >= CRANE && sprite[i].picnum <= CRANE+3)
        {
            var/*int32_t */nextj:number;
            
            //t[0] = state
            //t[1] = checking sector number

            if (s.xvel) A_GetZLimits(i);

            if (t[0] == 0)   //Waiting to check the sector
            {
                for (j = headspritesect[t[1]];
                    j >= 0 && (nextj = nextspritesect[j], 1); j = nextj)
                {
                    switch (sprite[j].statnum)
                    {
                    case STAT_ACTOR:
                    case STAT_ZOMBIEACTOR:
                    case STAT_STANDABLE:
                    case STAT_PLAYER:
                    {
                        var vect = new vec3_t ( msx[t[4]+1], msy[t[4]+1], sprite[j].z );

                        s.ang = getangle(vect.x-s.x, vect.y-s.y);
                        setsprite(j, vect);
                        t[0]++;
                        {i = nexti;continue BOLT;}
                    }
                    }
                }
            }

            else if (t[0]==1)
            {
                if (s.xvel < 184)
                {
                    s.picnum = CRANE+1;
                    s.xvel += 8;
                }
                A_SetSprite(i,CLIPMASK0);
                if (sect == t[1])
                    t[0]++;
            }
            else if (t[0]==2 || t[0]==7)
            {
                s.z += (1024+512);

                if (t[0]==2)
                {
                    if (sector[sect].floorz - s.z < (64<<8))
                        if (s.picnum > CRANE) s.picnum--;

                    if (sector[sect].floorz - s.z < 4096+1024)
                        t[0]++;
                }

                if (t[0]==7)
                {
                    if (sector[sect].floorz - s.z < (64<<8))
                    {
                        if (s.picnum > CRANE) s.picnum--;
                        else
                        {
                            if (s.owner==-2)
                            {
                                var/*int32_t */p = A_FindPlayer(s, NULL);
                                A_PlaySound(DUKE_GRUNT,g_player[p].ps.i);
                                if (g_player[p].ps.on_crane == i)
                                    g_player[p].ps.on_crane = -1;
                            }

                            t[0]++;
                            s.owner = -1;
                        }
                    }
                }
            }
            else if (t[0]==3)
            {
                s.picnum++;
                if (s.picnum == CRANE+2)
                {
                    var/*int32_t */p = G_CheckPlayerInSector(t[1]);

                    if (p >= 0 && g_player[p].ps.on_ground)
                    {
                        s.owner = -2;
                        g_player[p].ps.on_crane = i;
                        A_PlaySound(DUKE_GRUNT,g_player[p].ps.i);
                        g_player[p].ps.ang = s.ang+1024;
                    }
                    else
                    {
                        for (j = headspritesect[t[1]]; j >= 0; j = nextspritesect[j] /*SPRITES_OF_SECT(t[1], j)*/)
                        {
                            switch (sprite[j].statnum)
                            {
                            case STAT_ACTOR:
                            case STAT_STANDABLE:
                                s.owner = j;
                                break;
                            }
                        }
                    }

                    t[0]++;//Grabbed the sprite
                    t[2]=0;
                    {i = nexti;continue BOLT;}
                }
            }
            else if (t[0]==4) //Delay before going up
            {
                t[2]++;
                if (t[2] > 10)
                    t[0]++;
            }
            else if (t[0]==5 || t[0] == 8)
            {
                if (t[0]==8 && s.picnum < (CRANE+2))
                    if ((sector[sect].floorz-s.z) > 8192)
                        s.picnum++;

                dlog(DEBUG_MOVE_STANDABLES, "s.z a: %i\n", s.z);
                if (s.z < msx[t[4]+2])
                {
                    t[0]++;
                    s.xvel = 0;
                }
                else
                    s.z -= (1024+512);
                dlog(DEBUG_MOVE_STANDABLES, "s.z b: %i\n", s.z);
            }
            else if (t[0]==6)
            {
                if (s.xvel < 192)
                    s.xvel += 8;
                s.ang = getangle(msx[t[4]]-s.x,msy[t[4]]-s.y);
                A_SetSprite(i,CLIPMASK0);
                if (((s.x-msx[t[4]])*(s.x-msx[t[4]])+(s.y-msy[t[4]])*(s.y-msy[t[4]])) < (128*128))
                    t[0]++;
            }

            else if (t[0]==9)
                t[0] = 0;

            {
                var vect = new vec3_t(s.x, s.y, s.z);//Bmemcpy(&vect,s,sizeof(vec3_t));
                vect.z -= (34<<8);
                setsprite(msy[t[4]+2],vect);
            }


            if (s.owner != -1)
            {
                var/*int32_t */p = A_FindPlayer(s, NULL);

                if (A_IncurDamage(i) >= 0)
                {
                    if (s.owner == -2)
                        if (g_player[p].ps.on_crane == i)
                            g_player[p].ps.on_crane = -1;
                    s.owner = -1;
                    s.picnum = CRANE;
                    {i = nexti;continue BOLT;}
                }

                if (s.owner >= 0)
                {
                    setsprite(s.owner,/*(vec3_t *)*/s);

                    //Bmemcpy(&actor[s.owner].bpos.x, s, sizeof(vec3_t));
                    actor[s.owner].bpos.x = s.x;
                    actor[s.owner].bpos.y = s.y;
                    actor[s.owner].bpos.z = s.z;

                    s.zvel = 0;
                }
                else if (s.owner == -2)
                {
                    var ps = g_player[p].ps;

                    ps.opos.x = ps.pos.x = s.x-(sintable[(ps.ang+512)&2047]>>6);
                    ps.opos.y = ps.pos.y = s.y-(sintable[ps.ang&2047]>>6);
                    ps.opos.z = ps.pos.z = s.z+(2<<8);

                    setsprite(ps.i, /*(vec3_t *)*/ps.pos);
                    ps.cursectnum = sprite[ps.i].sectnum;
                }
            }

            {i = nexti;continue BOLT;}
        }

        if (sprite[i].picnum >= WATERFOUNTAIN && sprite[i].picnum <= WATERFOUNTAIN+3)
        {
            if (t[0] > 0)
            {
                if (t[0] < 20)
                {
                    t[0]++;

                    s.picnum++;

                    if (s.picnum == (WATERFOUNTAIN+3))
                        s.picnum = WATERFOUNTAIN+1;
                }
                else
                {
                    var $x = new R(x);
                    A_FindPlayer(s,$x);
                    x = $x.$;

                    if (x > 512)
                    {
                        t[0] = 0;
                        s.picnum = WATERFOUNTAIN;
                    }
                    else t[0] = 1;
                }
            }
            {i = nexti;continue BOLT;}
        }

        if (AFLAMABLE(s.picnum))
        {
            if (actor[i].t_data[0] == 1)
            {
                actor[i].t_data[1]++;
                if ((actor[i].t_data[1]&3) > 0) {i = nexti;continue BOLT;}

                if (s.picnum == TIRE && actor[i].t_data[1] == 32)
                {
                    s.cstat = 0;
                    j = A_Spawn(i,BLOODPOOL);
                    sprite[j].shade = 127;
                }
                else
                {
                    if (s.shade < 64) s.shade++;
                    else {A_DeleteSprite(i); {i = nexti;continue BOLT;}}
                }

                j = s.xrepeat-(krand()&7);
                if (j < 10)
                    {A_DeleteSprite(i); {i = nexti;continue BOLT;}}

                s.xrepeat = j;

                j = s.yrepeat-(krand()&7);
                if (j < 4)
                    {A_DeleteSprite(i); {i = nexti;continue BOLT;}}

                s.yrepeat = j;
            }
            if (s.picnum == BOX)
            {
                A_Fall(i);
                actor[i].ceilingz = sector[s.sectnum].ceilingz;
            }
            {i = nexti;continue BOLT;}
        }

        if (s.picnum == TRIPBOMB)
        {
            if (actor[i].t_data[6] == 1)
            {

                if (actor[i].t_data[7] >= 1)
                {
                    actor[i].t_data[7]--;
                }

                if (actor[i].t_data[7] <= 0)
                {
                    actor[i].t_data[2]=16;
                    actor[i].t_data[6]=3;
                    A_PlaySound(LASERTRIP_ARMING,i);
                }
                // we're on a timer....
            }
            if (actor[i].t_data[2] > 0 && actor[i].t_data[6] == 3)
            {
                actor[i].t_data[2]--;

                if (actor[i].t_data[2] == 8)
                {
                    for (j=0; j<5; j++) RANDOMSCRAP(s, i);
                    x = s.extra;
                    A_RadiusDamage(i, g_tripbombBlastRadius, x>>2,x>>1,x-(x>>2),x);

                    j = A_Spawn(i,EXPLOSION2);
                    A_PlaySound(LASERTRIP_EXPLODE,j);
                    sprite[j].ang = s.ang;
                    sprite[j].xvel = 348;
                    A_SetSprite(j,CLIPMASK0);

                    for (j = headspritestat[STAT_MISC]; j >= 0; j = nextspritestat[j])
                    {
                        if (sprite[j].picnum == LASERLINE && s.hitag == sprite[j].hitag)
                            sprite[j].xrepeat = sprite[j].yrepeat = 0;
                    }

                    {A_DeleteSprite(i); {i = nexti;continue BOLT;}}
                }
                {i = nexti;continue BOLT;}
            }
            else
            {
                var/*int32_t */oextra = s.extra;
                s.extra = 1;
                l = s.ang;
                if (A_IncurDamage(i) >= 0)
                {
                    actor[i].t_data[6] = 3;
                    actor[i].t_data[2] = 16;
                }
                s.extra = oextra;
                s.ang = l;
            }

            switch (actor[i].t_data[0])
            {
            default:
                var $x = new R(x);
                A_FindPlayer(s,$x);
                x = $x.$;
                if (x > 768 || actor[i].t_data[0] > 16) actor[i].t_data[0]++;
                break;

            case 32:
            {
                var/*int16_t */m:number;

                l = s.ang;
                s.ang = actor[i].t_data[5];

                actor[i].t_data[3] = s.x;
                actor[i].t_data[4] = s.y;

                s.x += sintable[(actor[i].t_data[5]+512)&2047]>>9;
                s.y += sintable[(actor[i].t_data[5])&2047]>>9;
                s.z -= (3<<8);

                setsprite(i,s);

                var $m = new R(m);
                x = A_CheckHitSprite(i, $m);
                m = $m.$;

                actor[i].lastvx = x;

                s.ang = l;

                //                if(lTripBombControl & TRIPBOMB_TRIPWIRE)
                if (actor[i].t_data[6] != 1)
                {
                    // we're on a trip wire
                    var/*int16_t */cursectnum:number;

                    while (x > 0)
                    {
                        j = A_Spawn(i,LASERLINE);
                        setsprite(j,sprite[j]);
                        sprite[j].hitag = s.hitag;
                        actor[j].t_data[1] = sprite[j].z;

                        s.x += sintable[(actor[i].t_data[5]+512)&2047]>>4;
                        s.y += sintable[(actor[i].t_data[5])&2047]>>4;

                        dlog(DEBUG_MOVE_STANDABLES, "x: %i, s.x: %i, s.y: %i, j: %i\n", x, s.x, s.y, j);
                        if (x < 1024)
                        {
                            sprite[j].xrepeat = x>>5;
                            break;
                        }
                        x -= 1024;

                        cursectnum = s.sectnum;
                        var $cursectnum = new R(cursectnum);
                        updatesector(s.x, s.y, $cursectnum);
                        cursectnum = $cursectnum.$;
                        if (cursectnum < 0)
                            break;
                    }
                }

                actor[i].t_data[0]++;

                s.x = actor[i].t_data[3];
                s.y = actor[i].t_data[4];
                s.z += (3<<8);

                setsprite(i,s);
                actor[i].t_data[3] = actor[i].t_data[2] = 0;

                if (m >= 0 && actor[i].t_data[6] != 1)
                {
                    actor[i].t_data[6] = 3;
                    actor[i].t_data[2] = 13;
                    A_PlaySound(LASERTRIP_ARMING,i);
                }
                break;
            }

            case 33:
                actor[i].t_data[1]++;

                actor[i].t_data[3] = s.x;
                actor[i].t_data[4] = s.y;

                s.x += sintable[(actor[i].t_data[5]+512)&2047]>>9;
                s.y += sintable[(actor[i].t_data[5])&2047]>>9;
                s.z -= (3<<8);

                setsprite(i,s);

                x = A_CheckHitSprite(i, NULL);

                s.x = actor[i].t_data[3];
                s.y = actor[i].t_data[4];
                s.z += (3<<8);
                setsprite(i,s);

//                if( Actor[i].lastvx != x && lTripBombControl & TRIPBOMB_TRIPWIRE)
                if (actor[i].lastvx != x && actor[i].t_data[6] != 1)
                {
                    actor[i].t_data[6] = 3;
                    actor[i].t_data[2] = 13;
                    A_PlaySound(LASERTRIP_ARMING,i);
                }
                break;
            }

            {i = nexti;continue BOLT;}
        }

        if (s.picnum >= CRACK1 && s.picnum <= CRACK4)
        {
            if (s.hitag > 0)
            {
                var/*int32_t */k:number;

                t[0] = s.cstat;
                t[1] = s.ang;

                k = A_IncurDamage(i);
                if (k < 0) {
                    //goto crack_default
                    s.cstat = t[0];
                    s.ang = t[1];
                    s.extra = 0;
                    {i = nexti;continue BOLT;}
                }
                switch (DYNAMICTILEMAP(k))
                {
                case FIREEXT__STATIC:
                case RPG__STATIC:
                case RADIUSEXPLOSION__STATIC:
                case SEENINE__STATIC:
                case OOZFILTER__STATIC:
                    for (j = headspritestat[STAT_STANDABLE]; j >= 0; j = nextspritestat[j])
                    {
                        if (s.hitag == sprite[j].hitag && (sprite[j].picnum == OOZFILTER || sprite[j].picnum == SEENINE))
                            if (sprite[j].shade != -32)
                                sprite[j].shade = -32;
                    }
                    DETONATE();
                    {A_DeleteSprite(i); {i = nexti;continue BOLT;}}

                //crack_default:
                default:
                    s.cstat = t[0];
                    s.ang = t[1];
                    s.extra = 0;

                    {i = nexti;continue BOLT;}
                }
            }
            {i = nexti;continue BOLT;}
        }

        if (s.picnum == FIREEXT)
        {
            var/*int32_t */k:number;

            if (A_IncurDamage(i) < 0)
                {i = nexti;continue BOLT;}

            for (k=0; k<16; k++)
            {
                var krands = getKrands(5);
                j = A_InsertSprite(sprite[i].sectnum,sprite[i].x,sprite[i].y,sprite[i].z-(krands.pop()%(48<<8)),SCRAP3+(krands.pop()&3),-8,48,48,krands.pop()&2047,(krands.pop()&63)+64,-(krands.pop()&4095)-(sprite[i].zvel>>2),i,5);
                sprite[j].pal = 2;
            }

            j = A_Spawn(i,EXPLOSION2);
            A_PlaySound(PIPEBOMB_EXPLODE,j);
            A_PlaySound(GLASS_HEAVYBREAK,j);

            if (int16(s.hitag) > 0)
            {
                for (j = headspritestat[STAT_STANDABLE]; j >= 0; j = nextspritestat[j])
                {
                    // XXX: This block seems to be CODEDUP'd a lot of times.
                    if (s.hitag == sprite[j].hitag && (sprite[j].picnum == OOZFILTER || sprite[j].picnum == SEENINE))
                        if (sprite[j].shade != -32)
                            sprite[j].shade = -32;
                }

                x = s.extra;
                A_RadiusDamage(i, g_pipebombBlastRadius,x>>2, x-(x>>1),x-(x>>2), x);
                j = A_Spawn(i,EXPLOSION2);
                A_PlaySound(PIPEBOMB_EXPLODE,j);

                DETONATE();
                {A_DeleteSprite(i); {i = nexti;continue BOLT;}}
            }
            else
            {
                A_RadiusDamage(i,g_seenineBlastRadius,10,15,20,25);
                {A_DeleteSprite(i); {i = nexti;continue BOLT;}}
            }
            {i = nexti;continue BOLT;}
        }

        if (s.picnum == OOZFILTER || s.picnum == SEENINE || s.picnum == SEENINEDEAD || s.picnum == SEENINEDEAD+1)
        {
            if (s.shade != -32 && s.shade != -33)
            {
                if (s.xrepeat)
                    j = (A_IncurDamage(i) >= 0)?1:0;
                else
                    j = 0;

                if (j || s.shade == -31)
                {
                    if (j) s.lotag = 0;

                    t[3] = 1;

                    for (j = headspritestat[STAT_STANDABLE]; j >= 0; j = nextspritestat[j])
                    {
                        if (s.hitag == sprite[j].hitag && (sprite[j].picnum == SEENINE || sprite[j].picnum == OOZFILTER))
                            sprite[j].shade = -32;
                    }
                }
            }
            else
            {
                if (s.shade == -32)
                {
                    if (int16(s.lotag) > 0)
                    {
                        s.lotag -= 3;
                        if (int16(s.lotag) <= 0)
                            s.lotag = uint16(-99);
                    }
                    else
                        s.shade = -33;
                }
                else
                {
                    if (s.xrepeat > 0)
                    {
                        actor[i].t_data[2]++;
                        if (actor[i].t_data[2] == 3)
                        {
                            if (s.picnum == OOZFILTER)
                            {
                                actor[i].t_data[2] = 0;
                                DETONATE();
                                {A_DeleteSprite(i); {i = nexti;continue BOLT;}}
                            }

                            if (s.picnum != (SEENINEDEAD+1))
                            {
                                actor[i].t_data[2] = 0;

                                if (s.picnum == SEENINEDEAD)
                                    s.picnum++;
                                else if (s.picnum == SEENINE)
                                    s.picnum = SEENINEDEAD;
                            }
                            else{
                                DETONATE();
                                {A_DeleteSprite(i); {i = nexti;continue BOLT;}}
                            }
                        }
                        {i = nexti;continue BOLT;}
                    }

function DETONATE() {
                    g_earthquakeTime = 16;

                    for (j = headspritestat[STAT_EFFECTOR]; j >= 0; j = nextspritestat[j])
                    {
                        if (s.hitag == sprite[j].hitag)
                        {
                            if (sprite[j].lotag == SE_13_EXPLOSIVE)
                            {
                                if (actor[j].t_data[2] == 0)
                                    actor[j].t_data[2] = 1;
                            }
                            else if (sprite[j].lotag == SE_8_UP_OPEN_DOOR_LIGHTS)
                                actor[j].t_data[4] = 1;
                            else if (sprite[j].lotag == SE_18_INCREMENTAL_SECTOR_RISE_FALL)
                            {
                                if (actor[j].t_data[0] == 0)
                                    actor[j].t_data[0] = 1;
                            }
                            else if (sprite[j].lotag == SE_21_DROP_FLOOR)
                                actor[j].t_data[0] = 1;
                        }
                    }

                    s.z -= (32<<8);

                    if (s.xrepeat)
                        for (x=0; x<8; x++) RANDOMSCRAP(s, i);

                    if ((t[3] == 1 && s.xrepeat) || int16(s.lotag) == -99)
                    {
                        var/*int32_t */j = A_Spawn(i,EXPLOSION2);
                        x = s.extra;
                        A_RadiusDamage(i,g_seenineBlastRadius,x>>2, x-(x>>1),x-(x>>2), x);
                        A_PlaySound(PIPEBOMB_EXPLODE,j);
                    }
}
                    DETONATE();
                    {A_DeleteSprite(i); {i = nexti;continue BOLT;}}
                }
            }
            {i = nexti;continue BOLT;}
        }

        if (s.picnum == MASTERSWITCH)
        {
            if (s.yvel == 1)
            {
                s.hitag--;
                if (int16(s.hitag) <= 0)
                {
                    G_OperateSectors(sect,i);

                    for (j = headspritesect[sect]; j >= 0; j = nextspritesect[j])
                    {
                        if (sprite[j].statnum == STAT_EFFECTOR)
                        {
                            switch (sprite[j].lotag)
                            {
                            case SE_2_EARTHQUAKE:
                            case SE_21_DROP_FLOOR:
                            case SE_31_FLOOR_RISE_FALL:
                            case SE_32_CEILING_RISE_FALL:
                            case SE_36_PROJ_SHOOTER:
                                actor[j].t_data[0] = 1;
                                break;
                            case SE_3_RANDOM_LIGHTS_AFTER_SHOT_OUT:
                                actor[j].t_data[4] = 1;
                                break;
                            }
                        }
                        else if (sprite[j].statnum == STAT_STANDABLE)
                        {
                            switch (DYNAMICTILEMAP(sprite[j].picnum))
                            {
                            case SEENINE__STATIC:
                            case OOZFILTER__STATIC:
                                sprite[j].shade = -31;
                                break;
                            }
                        }
                    }

                    {A_DeleteSprite(i); {i = nexti;continue BOLT;}}
                }
            }
            {i = nexti;continue BOLT;}
        }

        switchpicnum = s.picnum;

        if (switchpicnum > SIDEBOLT1 && switchpicnum <= SIDEBOLT1+3)
            switchpicnum = SIDEBOLT1;
        else if (switchpicnum > BOLT1 && switchpicnum <= BOLT1+3)
            switchpicnum = BOLT1;
        
        dlog(DEBUG_MOVE_STANDABLES, "switchpicnum: %i\n", switchpicnum);
        switch (DYNAMICTILEMAP(switchpicnum))
        {
        case VIEWSCREEN__STATIC:
        case VIEWSCREEN2__STATIC:

            if (s.xrepeat == 0)
                {A_DeleteSprite(i); {i = nexti;continue BOLT;}}

            var $x = new R(x);
            A_FindPlayer(s, $x);
            x = $x.$;

            if (x < 2048)
            {
                if (sprite[i].yvel == 1)
                    camsprite = i;
            }
            else if (camsprite != -1 && actor[i].t_data[0] == 1)
            {
                camsprite = -1;
                actor[i].t_data[0] = 0;
                //loadtile(s.picnum);
                //invalidatetile(s.picnum,-1,255);
                walock[TILE_VIEWSCR] = 199;
            }

            {i = nexti;continue BOLT;}

        case TRASH__STATIC:

            if (s.xvel == 0) s.xvel = 1;
            if (A_SetSprite(i, CLIPMASK0))
            {
                A_Fall(i);
                if (krand()&1) s.zvel -= 256;
                if (klabs(s.xvel) < 48)
                    s.xvel += (krand()&3);
            }
            else {A_DeleteSprite(i); {i = nexti;continue BOLT;}}
            break;

        case SIDEBOLT1__STATIC:
            //        case SIDEBOLT1+1:
            //        case SIDEBOLT1+2:
            //        case SIDEBOLT1+3:
            var $x = new R(x);
            A_FindPlayer(s, $x);
            x = $x.$;
            if (x > 20480) {i = nexti;continue BOLT;}

CLEAR_THE_BOLT2:
for(;;) {
            if (t[2])
            {
                t[2]--;
                {i = nexti;continue BOLT;}
            }
            if ((s.xrepeat|s.yrepeat) == 0)
            {
                s.xrepeat=t[0];
                s.yrepeat=t[1];
            }
            if ((krand()&8) == 0)
            {
                t[0]=s.xrepeat;
                t[1]=s.yrepeat;
                t[2] = g_globalRandom&4;
                s.xrepeat=s.yrepeat=0;
                continue CLEAR_THE_BOLT2;
            }
            s.picnum++;
    break;
}
            // NOTE: Um, this 'l' was assigned to last at the beginning of this function.
            // SIDEBOLT1 never gets translucent as a consequence, unlike BOLT1.
            if (l&1) s.cstat ^= 2;

            if ((krand()&1) && sector[sect].floorpicnum == HURTRAIL)
                A_PlaySound(SHORT_CIRCUIT,i);

            if (s.picnum == SIDEBOLT1+4) s.picnum = SIDEBOLT1;

            {i = nexti;continue BOLT;}

        case BOLT1__STATIC:
            //        case BOLT1+1:
            //        case BOLT1+2:
            //        case BOLT1+3:
            var $x = new R(x);
            A_FindPlayer(s, $x);
            x = $x.$;
            if (x > 20480) {i = nexti;continue BOLT;}

            if (t[3] == 0)
                t[3]=sector[sect].floorshade;

CLEAR_THE_BOLT:
for(;;) {
            if (t[2])
            {
                t[2]--;
                sector[sect].floorshade = 20;
                sector[sect].ceilingshade = 20;
                {i = nexti;continue BOLT;}
            }
            if ((s.xrepeat|s.yrepeat) == 0)
            {
                s.xrepeat=t[0];
                s.yrepeat=t[1];
            }
            else if ((krand()&8) == 0)
            {
                t[0]=s.xrepeat;
                t[1]=s.yrepeat;
                t[2] = g_globalRandom&4;
                s.xrepeat=s.yrepeat=0;
                continue CLEAR_THE_BOLT;
            }
            s.picnum++;
    break;
}
            l = g_globalRandom&7;
            s.xrepeat=l+8;

            if (l&1) s.cstat ^= 2;

            if (s.picnum == (BOLT1+1) && (krand()&7) == 0 && sector[sect].floorpicnum == HURTRAIL)
                A_PlaySound(SHORT_CIRCUIT,i);

            if (s.picnum==BOLT1+4) s.picnum=BOLT1;

            if (s.picnum&1)
            {
                sector[sect].floorshade = 0;
                sector[sect].ceilingshade = 0;
            }
            else
            {
                sector[sect].floorshade = 20;
                sector[sect].ceilingshade = 20;
            }
            {i = nexti;continue BOLT;}

        case WATERDRIP__STATIC:

            if (t[1])
            {
                if (--t[1] == 0)
                    s.cstat &= 32767;
            }
            else
            {
                A_Fall(i);
                A_SetSprite(i,CLIPMASK0);
                if (s.xvel > 0) s.xvel -= 2;

                if (s.zvel == 0)
                {
                    s.cstat |= 32768;

                    if (s.pal != 2 && s.hitag == 0)
                        A_PlaySound(SOMETHING_DRIPPING,i);

                    if (sprite[s.owner].picnum != WATERDRIP)
                    {
                        {A_DeleteSprite(i); {i = nexti;continue BOLT;}}
                    }
                    else
                    {
                        actor[i].bpos.z = s.z = t[0];
                        t[1] = 48+(krand()&31);
                    }
                }
            }


            {i = nexti;continue BOLT;}

        case DOORSHOCK__STATIC:
            j = klabs(sector[sect].ceilingz-sector[sect].floorz)>>9;
            s.yrepeat = j+4;
            s.xrepeat = 16;
            s.z = sector[sect].floorz;
            {i = nexti;continue BOLT;}

        case TOUCHPLATE__STATIC:
            if (t[1] == 1 && int16(s.hitag) >= 0)  //Move the sector floor
            {
                x = sector[sect].floorz;

                if (t[3] == 1)
                {
                    if (x >= t[2])
                    {
                        sector[sect].floorz = x;
                        t[1] = 0;
                    }
                    else
                    {
                        var/*int32_t*/ p:number;
                        sector[sect].floorz += sector[sect].extra;
                        p = G_CheckPlayerInSector(sect);
                        if (p >= 0) g_player[p].ps.pos.z += sector[sect].extra;
                    }
                }
                else
                {
                    if (x <= s.z)
                    {
                        sector[sect].floorz = s.z;
                        t[1] = 0;
                    }
                    else
                    {
                        var/*int32_t*/ p:number;
                        sector[sect].floorz -= sector[sect].extra;
                        p = G_CheckPlayerInSector(sect);
                        if (p >= 0)
                            g_player[p].ps.pos.z -= sector[sect].extra;
                    }
                }
                {i = nexti;continue BOLT;}
            }

            if (t[5] == 1) {i = nexti;continue BOLT;}

            {
                var/*int32_t */p = G_CheckPlayerInSector(sect);

                if (p >= 0 &&
                    (g_player[p].ps.on_ground || s.ang == 512))
                {
                    if (t[0] == 0 && !G_CheckActivatorMotion(s.lotag))
                    {
                        t[0] = 1;
                        t[1] = 1;
                        t[3] = !t[3]?1:0;
                        G_OperateMasterSwitches(s.lotag);
                        G_OperateActivators(s.lotag,p);
                        if (int16(s.hitag) > 0)
                        {
                            s.hitag--;
                            if (s.hitag == 0) t[5] = 1;
                        }
                    }
                }
                else t[0] = 0;
            }

            if (t[1] == 1)
            {
                for (j = headspritestat[STAT_STANDABLE]; j >= 0; j = nextspritestat[j])
                {
                    if (j != i && sprite[j].picnum == TOUCHPLATE && sprite[j].lotag == s.lotag)
                    {
                        actor[j].t_data[1] = 1;
                        actor[j].t_data[3] = t[3];
                    }
                }
            }
            {i = nexti;continue BOLT;}

        case CANWITHSOMETHING__STATIC:
        case CANWITHSOMETHING2__STATIC:
        case CANWITHSOMETHING3__STATIC:
        case CANWITHSOMETHING4__STATIC:
            A_Fall(i);
            if (A_IncurDamage(i) >= 0)
            {
                A_PlaySound(VENT_BUST,i);

                for (j=9; j>=0; j--)
                    RANDOMSCRAP(s, i);

                if (s.lotag) A_Spawn(i,s.lotag);

                {A_DeleteSprite(i); {i = nexti;continue BOLT;}}
            }
            {i = nexti;continue BOLT;}

        case FLOORFLAME__STATIC:
        case FIREBARREL__STATIC:
        case FIREVASE__STATIC:
        case EXPLODINGBARREL__STATIC:
        case WOODENHORSE__STATIC:
        case HORSEONSIDE__STATIC:
        case NUKEBARREL__STATIC:
        case NUKEBARRELDENTED__STATIC:
        case NUKEBARRELLEAKED__STATIC:
        case TOILETWATER__STATIC:
        case RUBBERCAN__STATIC:
        case STEAM__STATIC:
        case CEILINGSTEAM__STATIC:
        case WATERBUBBLEMAKER__STATIC:
            if (!G_HaveActor(sprite[i].picnum))
                {i = nexti;continue BOLT;}
            {                
                var $x = new R(x);
                var p = A_FindPlayer(s, $x);
                x = $x.$;
                A_Execute(i,p,x);
            }
            {i = nexti;continue BOLT;}
        }

//BOLT:
        i = nexti;
    }
}

//ACTOR_STATIC void A_DoProjectileBounce(int32_t i)
//{
//    int32_t dax, day, daz = 4096;
//    spritetype *s = &sprite[i];
//    int32_t hitsect = s.sectnum;
//    int32_t k = sector[hitsect].wallptr;
//    int32_t l = wall[k].point2;

//    int32_t xvect = mulscale10(s.xvel,sintable[(s.ang+512)&2047]);
//    int32_t yvect = mulscale10(s.xvel,sintable[s.ang&2047]);
//    int32_t zvect = s.zvel;

//    int32_t daang = getangle(wall[l].x-wall[k].x,wall[l].y-wall[k].y);

//    if (s.z < (actor[i].floorz+actor[i].ceilingz)>>1)
//        k = sector[hitsect].ceilingheinum;
//    else
//        k = sector[hitsect].floorheinum;

//    dax = mulscale14(k,sintable[(daang)&2047]);
//    day = mulscale14(k,sintable[(daang+1536)&2047]);

//    k = xvect*dax+yvect*day+zvect*daz;
//    l = dax*dax+day*day+daz*daz;
//    if ((klabs(k)>>14) < l)
//    {
//        k = divscale17(k,l);
//        xvect -= mulscale16(dax,k);
//        yvect -= mulscale16(day,k);
//        zvect -= mulscale16(daz,k);
//    }

//    s.zvel = zvect;
//    s.xvel = ksqrt(dmulscale8(xvect,xvect,yvect,yvect));
//    s.ang = getangle(xvect,yvect);
//}

//ACTOR_STATIC void P_HandleBeingSpitOn(DukePlayer_t *ps)
//{
//    ps.horiz += 32;
//    ps.return_to_center = 8;

//    if (ps.loogcnt == 0)
//    {
//        int32_t j, x;

//        if (!A_CheckSoundPlaying(ps.i, DUKE_LONGTERM_PAIN))
//            A_PlaySound(DUKE_LONGTERM_PAIN,ps.i);

//        j = 3+(krand()&3);
//        ps.numloogs = j;
//        ps.loogcnt = 24*4;
//        for (x=0; x < j; x++)
//        {
//            ps.loogiex[x] = krand()%xdim;
//            ps.loogiey[x] = krand()%ydim;
//        }
//    }
//}

//static void A_DoProjectileEffects(int32_t i, const vec3_t *davect, int32_t do_radius_damage)
//{
//    const projectile_t *proj = &SpriteProjectile[i];

//    if (proj.spawns >= 0)
//    {
//        int32_t k = A_Spawn(i,proj.spawns);

//        if (davect)
//            Bmemcpy(&sprite[k],davect,sizeof(vec3_t));

//        if (proj.sxrepeat > 4)
//            sprite[k].xrepeat=proj.sxrepeat;
//        if (proj.syrepeat > 4)
//            sprite[k].yrepeat=proj.syrepeat;
//    }

//    if (proj.isound >= 0)
//        A_PlaySound(proj.isound,i);

//    if (do_radius_damage)
//    {
//        spritetype *const s = &sprite[i];
//        int32_t x;

//        s.extra=proj.extra;

//        if (proj.extra_rand > 0)
//            s.extra += (krand()&proj.extra_rand);

//        x = s.extra;
//        A_RadiusDamage(i,proj.hitradius, x>>2,x>>1,x-(x>>2),x);
//    }
//}

function G_WeaponHitCeilingOrFloor(/*int32_t */i:number, s:spritetype, /*int32_t **/j:R<number>):void
{
    if (actor[i].flags & SPRITE_DIDNOSE7WATER)
    {
        actor[i].flags &= ~SPRITE_DIDNOSE7WATER;
        return;
    }

    if (s.z < actor[i].ceilingz)
    {
        j.$ = 16384|s.sectnum;
        s.zvel = -1;
    }
    else if (s.z > actor[i].floorz + (16<<8)*((sector[s.sectnum].lotag == ST_1_ABOVE_WATER)?1:0))
    {
        j.$ = 16384|s.sectnum;

        if (sector[s.sectnum].lotag != ST_1_ABOVE_WATER)
            s.zvel = 1;
    }
}

function Proj_BounceOffWall(s:spritetype, /*int32_t */j:number):void
{
    var/*int32_t */k = getangle(
        wall[wall[j].point2].x-wall[j].x,
        wall[wall[j].point2].y-wall[j].y);
    s.ang = ((k<<1) - s.ang)&2047;
}

function G_MoveWeapons():void 
{
    var/*int32_t */i = headspritestat[STAT_PROJECTILE], j=0, k:number, q:number;
    var/*int32_t */x:number, ll:number;
    BOLT:
    while (i >= 0)
    {
        var/*const int32_t */nexti = nextspritestat[i];
        var s = sprite[i];
        var davect = new vec3_t();

        if (s.sectnum < 0)
            {A_DeleteSprite(i); i = nexti; continue BOLT;}

        actor[i].bpos.copyFrom(s);//Bmemcpy(&actor[i].bpos.x, s, sizeof(vec3_t));

        /* Custom projectiles */
        if (A_CheckSpriteFlags(i,SPRITE_PROJECTILE))
        {todoThrow();
            //var /*const projectile_t *const */proj = SpriteProjectile[i];

            //if (proj.pal >= 0)
            //    s.pal = proj.pal;

            //if (proj.workslike & PROJECTILE_KNEE)
            //    {A_DeleteSprite(i); i = nexti; continue BOLT;}

            //if (proj.workslike & PROJECTILE_RPG)
            //{
            //    //  if (proj.workslike & COOLEXPLOSION1)
            //    //                if( g_sounds[WIERDSHOT_FLY].num == 0 )
            //    //                    A_PlaySound(WIERDSHOT_FLY,i);

            //    Bmemcpy(&davect,s,sizeof(vec3_t));

            //    if (proj.flashcolor)
            //        G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), 2048, proj.flashcolor, PR_LIGHT_PRIO_LOW_GAME);

            //    if (proj.workslike & PROJECTILE_BOUNCESOFFWALLS && s.yvel < 1)
            //    {
            //        A_DoProjectileEffects(i, NULL, 1);
            //        {A_DeleteSprite(i); i = nexti; continue BOLT;}
            //    }

            //    if (proj.workslike & PROJECTILE_COOLEXPLOSION1 && ++s.shade >= 40)
            //        {A_DeleteSprite(i); i = nexti; continue BOLT;}

            //    s.zvel -= proj.drop;

            //    if (proj.workslike & PROJECTILE_SPIT && s.zvel < 6144)
            //        s.zvel += g_spriteGravity-112;

            //    A_GetZLimits(i);

            //    if (proj.trail >= 0)
            //    {
            //        int32_t cnt;

            //        for (cnt=0; cnt<=proj.tnum; cnt++)
            //        {
            //            j = A_Spawn(i,proj.trail);

            //            sprite[j].z += (proj.toffset<<8);

            //            if (proj.txrepeat >= 0)
            //                sprite[j].xrepeat=proj.txrepeat;

            //            if (proj.tyrepeat >= 0)
            //                sprite[j].yrepeat=proj.tyrepeat;
            //        }
            //    }

            //    {
            //        int32_t cnt = proj.movecnt;

            //        k = s.xvel;
            //        ll = s.zvel;

            //        if (sector[s.sectnum].lotag == ST_2_UNDERWATER)
            //        {
            //            k >>= 1;
            //            ll >>= 1;
            //        }

            //        do
            //        {
            //            vec3_t tmpvect;
            //            Bmemcpy(&davect, s, sizeof(vec3_t));

            //            tmpvect.x = (k*(sintable[(s.ang+512)&2047]))>>14;
            //            tmpvect.y = (k*(sintable[s.ang&2047]))>>14;
            //            tmpvect.z = ll;

            //            j = A_MoveSprite(i, &tmpvect, CLIPMASK1);
            //        }
            //        while (!j && --cnt > 0);
            //    }

            //    if (!(proj.workslike & PROJECTILE_BOUNCESOFFWALLS) &&
            //        s.yvel >= 0 && sprite[s.yvel].sectnum != MAXSECTORS)
            //        if (FindDistance2D(s.x-sprite[s.yvel].x,s.y-sprite[s.yvel].y) < 256)
            //            j = 49152|s.yvel;

            //    actor[i].movflag = j;

            //    if (s.sectnum < 0)
            //        {A_DeleteSprite(i); i = nexti; continue BOLT;}

            //    if (proj.workslike & PROJECTILE_TIMED && proj.range > 0)
            //    {
            //        if (++actor[i].t_data[8] > proj.range)
            //        {
            //            if (proj.workslike & PROJECTILE_EXPLODEONTIMER)
            //                A_DoProjectileEffects(i, &davect, 1);

            //            {A_DeleteSprite(i); i = nexti; continue BOLT;}
            //        }
            //    }

            //    if ((j&49152) != 49152 && !(proj.workslike & PROJECTILE_BOUNCESOFFWALLS))
            //        G_WeaponHitCeilingOrFloor(i, s, &j);

            //    if (proj.workslike & PROJECTILE_WATERBUBBLES && sector[s.sectnum].lotag == ST_2_UNDERWATER && rnd(140))
            //        A_Spawn(i,WATERBUBBLE);

            //    if (j != 0)
            //    {
            //        if (proj.workslike & PROJECTILE_COOLEXPLOSION1)
            //        {
            //            s.xvel = 0;
            //            s.zvel = 0;
            //        }

            //        if ((j&49152) == 49152)
            //        {
            //            j &= (MAXSPRITES-1);

            //            if (proj.workslike & PROJECTILE_BOUNCESOFFSPRITES)
            //            {
            //                s.yvel--;

            //                k = getangle(sprite[j].x-s.x,sprite[j].y-s.y)+(sprite[j].cstat&16?0:512);
            //                s.ang = ((k<<1) - s.ang)&2047;

            //                if (proj.bsound >= 0)
            //                    A_PlaySound(proj.bsound,i);

            //                if (proj.workslike & PROJECTILE_LOSESVELOCITY)
            //                {
            //                    s.xvel >>= 1;
            //                    s.zvel >>= 1;
            //                }

            //                if (!(proj.workslike & PROJECTILE_FORCEIMPACT))
            //                    {i = nexti; continue BOLT;}
            //            }

            //            A_DamageObject(j,i);

            //            if (sprite[j].picnum == APLAYER)
            //            {
            //                int32_t p = sprite[j].yvel;

            //                A_PlaySound(PISTOL_BODYHIT,j);

            //                if (proj.workslike & PROJECTILE_SPIT)
            //                    P_HandleBeingSpitOn(g_player[p].ps);
            //            }

            //            if (proj.workslike & PROJECTILE_RPG_IMPACT)
            //            {

            //                actor[j].owner = s.owner;
            //                actor[j].picnum = s.picnum;
            //                actor[j].extra += proj.extra;

            //                A_DoProjectileEffects(i, &davect, 0);

            //                if (!(proj.workslike & PROJECTILE_FORCEIMPACT))
            //                    {A_DeleteSprite(i); i = nexti; continue BOLT;}
            //            }

            //            if (proj.workslike & PROJECTILE_FORCEIMPACT)
            //                {i = nexti; continue BOLT;}
            //        }
            //        else if ((j&49152) == 32768)
            //        {
            //            j &= (MAXWALLS-1);

            //            if (proj.workslike & PROJECTILE_BOUNCESOFFMIRRORS &&
            //                (wall[j].overpicnum == MIRROR || wall[j].picnum == MIRROR))
            //            {
            //                Proj_BounceOffWall(s, j);
            //                s.owner = i;
            //                A_Spawn(i,TRANSPORTERSTAR);
            //                {i = nexti; continue BOLT;}
            //            }
            //            else
            //            {
            //                setsprite(i,&davect);
            //                A_DamageWall(i,j,(vec3_t *)s,s.picnum);

            //                if (proj.workslike & PROJECTILE_BOUNCESOFFWALLS)
            //                {
            //                    if (wall[j].overpicnum != MIRROR && wall[j].picnum != MIRROR)
            //                        s.yvel--;

            //                    Proj_BounceOffWall(s, j);

            //                    if (proj.bsound >= 0)
            //                        A_PlaySound(proj.bsound,i);

            //                    if (proj.workslike & PROJECTILE_LOSESVELOCITY)
            //                    {
            //                        s.xvel >>= 1;
            //                        s.zvel >>= 1;
            //                    }
            //                    {i = nexti; continue BOLT;}
            //                }
            //            }
            //        }
            //        else if ((j&49152) == 16384)
            //        {
            //            setsprite(i, &davect);

            //            if (s.zvel < 0)
            //            {
            //                if (sector[s.sectnum].ceilingstat&1 && sector[s.sectnum].ceilingpal == 0)
            //                    {A_DeleteSprite(i); i = nexti; continue BOLT;}

            //                Sect_DamageCeiling(s.sectnum);
            //            }

            //            if (proj.workslike & PROJECTILE_BOUNCESOFFWALLS)
            //            {
            //                A_DoProjectileBounce(i);
            //                A_SetSprite(i, CLIPMASK1);

            //                s.yvel--;

            //                if (proj.bsound >= 0)
            //                    A_PlaySound(proj.bsound,i);

            //                if (proj.workslike & PROJECTILE_LOSESVELOCITY)
            //                {
            //                    s.xvel >>= 1;
            //                    s.zvel >>= 1;
            //                }

            //                {i = nexti; continue BOLT;}
            //            }
            //        }

            //        if (proj.workslike & PROJECTILE_HITSCAN)
            //        {
            //            if (!G_HaveActor(sprite[i].picnum))
            //                {i = nexti; continue BOLT;}
            //            {
            //                int32_t p = A_FindPlayer(s,&x);
            //                A_Execute(i,p,x);
            //            }
            //            {i = nexti; continue BOLT;}
            //        }

            //        if (proj.workslike & PROJECTILE_RPG)
            //        {
            //            A_DoProjectileEffects(i, &davect, 1);
            //            {A_DeleteSprite(i); i = nexti; continue BOLT;}
            //        }
            //    }
            //}

            //{i = nexti; continue BOLT;}
        }

        // hard coded projectiles
        switch (DYNAMICTILEMAP(s.picnum))
        {
        case RADIUSEXPLOSION__STATIC:
        case KNEE__STATIC:
            {A_DeleteSprite(i); i = nexti; continue BOLT;}
        case TONGUE__STATIC:
            actor[i].t_data[0] = sintable[(actor[i].t_data[1])&2047]>>9;
            actor[i].t_data[1] += 32;
            if (actor[i].t_data[1] > 2047)
                {A_DeleteSprite(i); i = nexti; continue BOLT;}

            if (sprite[s.owner].statnum == MAXSTATUS)
                if (A_CheckEnemySprite(sprite[s.owner]) == 0)
                    {A_DeleteSprite(i); i = nexti; continue BOLT;}

            s.ang = sprite[s.owner].ang;
            s.x = sprite[s.owner].x;
            s.y = sprite[s.owner].y;
            if (sprite[s.owner].picnum == APLAYER)
                s.z = sprite[s.owner].z-(34<<8);
            for (k=0; k<actor[i].t_data[0]; k++)
            {
                q = A_InsertSprite(s.sectnum,
                    s.x+((k*sintable[(s.ang+512)&2047])>>9),
                    s.y+((k*sintable[s.ang&2047])>>9),
                    s.z+((k*ksgn(s.zvel))*klabs(int32(s.zvel/12))),TONGUE,-40+(k<<1),
                    8,8,0,0,0,i,5);
                sprite[q].cstat = 128;
                sprite[q].pal = 8;
            }
            q = A_InsertSprite(s.sectnum,
                s.x+((k*sintable[(s.ang+512)&2047])>>9),
                s.y+((k*sintable[s.ang&2047])>>9),
                s.z+((k*ksgn(s.zvel))*klabs(int32(s.zvel/12))),INNERJAW,-40,
                32,32,0,0,0,i,5);
            sprite[q].cstat = 128;
            if (actor[i].t_data[1] > 512 && actor[i].t_data[1] < (1024))
                sprite[q].picnum = INNERJAW+1;

            {i = nexti; continue BOLT;}

        case FREEZEBLAST__STATIC:
            if (s.yvel < 1 || s.extra < 2 || (s.xvel|s.zvel) == 0)
            {
                j = A_Spawn(i,TRANSPORTERSTAR);
                sprite[j].pal = 1;
                sprite[j].xrepeat = 32;
                sprite[j].yrepeat = 32;
                {A_DeleteSprite(i); i = nexti; continue BOLT;}
            }
        case SHRINKSPARK__STATIC:
        case RPG__STATIC:
        case FIRELASER__STATIC:
        case SPIT__STATIC:
        case COOLEXPLOSION1__STATIC:

            if (s.picnum == COOLEXPLOSION1)
                if (!S_CheckSoundPlaying(i,WIERDSHOT_FLY))
                    A_PlaySound(WIERDSHOT_FLY,i);

            k = s.xvel;
            ll = s.zvel;

            if (s.picnum == RPG && sector[s.sectnum].lotag == ST_2_UNDERWATER)
            {
                k >>= 1;
                ll >>= 1;
            }

            davect.copyFrom(s);//Bmemcpy(&davect,s,sizeof(vec3_t));

            A_GetZLimits(i);

            if (s.picnum == RPG && actor[i].picnum != BOSS2 && s.xrepeat >= 10 &&
                    sector[s.sectnum].lotag != ST_2_UNDERWATER && g_scriptVersion >= 13)
            {
                j = A_Spawn(i,SMALLSMOKE);
                sprite[j].z += (1<<8);
            }

            {
                var tmpvect = new vec3_t();

                tmpvect.x = (k*(sintable[(s.ang+512)&2047]))>>14;
                tmpvect.y = (k*(sintable[s.ang&2047]))>>14;
                tmpvect.z = ll;
                j = A_MoveSprite(i,tmpvect, CLIPMASK1);
            }


            if (s.picnum == RPG && s.yvel >= 0)
                if (FindDistance2D(s.x-sprite[s.yvel].x,s.y-sprite[s.yvel].y) < 256)
                    j = 49152|s.yvel;

            actor[i].movflag = j;

            if (s.sectnum < 0)
                {A_DeleteSprite(i); i = nexti; continue BOLT;}

            if ((j&49152) != 49152 && s.picnum != FREEZEBLAST) {
                var $j = new R(j);
                G_WeaponHitCeilingOrFloor(i, s, $j);
                j = $j.$;
            }

            if (s.picnum == FIRELASER)
            {
                for (k=-3; k<2; k++)
                {
                    x = A_InsertSprite(s.sectnum,
                                       s.x+((k*sintable[(s.ang+512)&2047])>>9),
                                       s.y+((k*sintable[s.ang&2047])>>9),
                                       s.z+((k*ksgn(s.zvel))*klabs(int32(s.zvel/24))),FIRELASER,-40+(k<<2),
                                       s.xrepeat,s.yrepeat,0,0,0,s.owner,5);

                    sprite[x].cstat = 128;
                    sprite[x].pal = s.pal;
                }
            }
            else if (s.picnum == SPIT)
                if (s.zvel < 6144)
                    s.zvel += g_spriteGravity-112;

            if (j != 0)
            {
                if (s.picnum == COOLEXPLOSION1)
                {
                    if ((j&49152) == 49152 && sprite[j&(MAXSPRITES-1)].picnum != APLAYER)
                        todoThrow("goto COOLEXPLOSION;");
                    s.xvel = 0;
                    s.zvel = 0;
                }

                if ((j&49152) == 49152)
                {
                    j &= (MAXSPRITES-1);

                    if (s.picnum == FREEZEBLAST && sprite[j].pal == 1)
                        if (A_CheckEnemySprite(sprite[j]) || sprite[j].picnum == APLAYER)
                        {
                            j = A_Spawn(i,TRANSPORTERSTAR);
                            sprite[j].pal = 1;
                            sprite[j].xrepeat = 32;
                            sprite[j].yrepeat = 32;

                            {A_DeleteSprite(i); i = nexti; continue BOLT;}
                        }

                    A_DamageObject(j,i);

                    if (sprite[j].picnum == APLAYER)
                    {
                        var/*int32_t */p = sprite[j].yvel;
                        A_PlaySound(PISTOL_BODYHIT,j);

                        if (s.picnum == SPIT)
                            P_HandleBeingSpitOn(g_player[p].ps);
                    }
                }
                else if ((j&49152) == 32768)
                {
                    j &= (MAXWALLS-1);

                    if (s.picnum != RPG && s.picnum != FREEZEBLAST && s.picnum != SPIT &&
                            (wall[j].overpicnum == MIRROR || wall[j].picnum == MIRROR))
                    {
                        Proj_BounceOffWall(s, j);
                        s.owner = i;
                        A_Spawn(i,TRANSPORTERSTAR);
                        {i = nexti; continue BOLT;}
                    }
                    else
                    {
                        setsprite(i,davect);
                        A_DamageWall(i,j,new vec3_t(s.x, s.y, s.z),s.picnum);

                        if (s.picnum == FREEZEBLAST)
                        {
                            if (wall[j].overpicnum != MIRROR && wall[j].picnum != MIRROR)
                            {
                                s.extra >>= 1;
                                s.yvel--;
                            }

                            Proj_BounceOffWall(s, j);
                            {i = nexti; continue BOLT;}
                        }
                    }
                }
                else if ((j&49152) == 16384)
                {
                    setsprite(i,davect);

                    if (s.zvel < 0)
                    {
                        if (sector[s.sectnum].ceilingstat&1)
                            if (sector[s.sectnum].ceilingpal == 0)
                                {A_DeleteSprite(i); i = nexti; continue BOLT;}

                        Sect_DamageCeiling(s.sectnum);
                    }

                    if (s.picnum == FREEZEBLAST)
                    {
                        A_DoProjectileBounce(i);
                        A_SetSprite(i, CLIPMASK1);
                        s.extra >>= 1;
                        if (s.xrepeat > 8)
                            s.xrepeat -= 2;
                        if (s.yrepeat > 8)
                            s.yrepeat -= 2;
                        s.yvel--;
                        {i = nexti; continue BOLT;}
                    }
                }

                if (s.picnum != SPIT)
                {
                    if (s.picnum == RPG)
                    {
                        k = A_Spawn(i,EXPLOSION2);
                        A_PlaySound(RPG_EXPLODE,k);
                        sprite[k].x = davect.x;// Bmemcpy(&sprite[k],&davect,sizeof(vec3_t));
                        sprite[k].y = davect.y;
                        sprite[k].z = davect.z;

                        if (s.xrepeat < 10)
                        {
                            sprite[k].xrepeat = 6;
                            sprite[k].yrepeat = 6;
                        }
                        else if ((j&49152) == 16384)
                        {
                            if (s.zvel > 0)
                                A_Spawn(i,EXPLOSION2BOT);
                            else
                            {
                                sprite[k].cstat |= 8;
                                sprite[k].z += (48<<8);
                            }
                        }

                        if (s.xrepeat >= 10)
                        {
                            x = s.extra;
                            A_RadiusDamage(i,g_rpgBlastRadius, x>>2,x>>1,x-(x>>2),x);
                        }
                        else
                        {
                            x = s.extra+(g_globalRandom&3);
                            A_RadiusDamage(i,(g_rpgBlastRadius>>1),x>>2,x>>1,x-(x>>2),x);
                        }
                    }
                    else if (s.picnum == SHRINKSPARK)
                    {
                        A_Spawn(i,SHRINKEREXPLOSION);
                        A_PlaySound(SHRINKER_HIT,i);
                        A_RadiusDamage(i,g_shrinkerBlastRadius,0,0,0,0);
                    }
                    else if (s.picnum != COOLEXPLOSION1 && s.picnum != FREEZEBLAST && s.picnum != FIRELASER)
                    {
                        k = A_Spawn(i,EXPLOSION2);
                        sprite[k].xrepeat = sprite[k].yrepeat = s.xrepeat>>1;
                        if ((j&49152) == 16384)
                        {
                            if (s.zvel < 0)
                            {
                                sprite[k].cstat |= 8;
                                sprite[k].z += (72<<8);
                            }
                        }
                    }
                }

                if (s.picnum != COOLEXPLOSION1)
                    {A_DeleteSprite(i); i = nexti; continue BOLT;}
            }

            if (s.picnum == COOLEXPLOSION1)
            {
//COOLEXPLOSION:
                s.shade++;
                if (s.shade >= 40)
                    {A_DeleteSprite(i); i = nexti; continue BOLT;}
            }
            else if (s.picnum == RPG && sector[s.sectnum].lotag == ST_2_UNDERWATER && s.xrepeat >= 10 && rnd(140))
                A_Spawn(i,WATERBUBBLE);

            {i = nexti; continue BOLT;}

        case SHOTSPARK1__STATIC:
            if (!G_HaveActor(sprite[i].picnum))
                {i = nexti; continue BOLT;}
            {
                var $x = new R(x);
                var /*int32_t */p = A_FindPlayer(s,$x);
                x = $x.$;
                A_Execute(i,p,x);
            }
            {i = nexti; continue BOLT;}
        }
//BOLT:
        i = nexti;
    }
}


function /*int32_t */P_Submerge(/*int32_t */j:number, /*int32_t */p:number, ps:DukePlayer_t, /*int32_t */sect:number, /*int32_t */othersect:number):number
{
    if (ps.on_ground &&
        ps.pos.z >= sector[sect].floorz &&
        (TEST_SYNC_KEY(g_player[p].sync.bits, SK_CROUCH) || ps.vel.z > 2048))
//        if( onfloorz && sectlotag == 1 && ps.pos.z > (sector[sect].floorz-(6<<8)) )
    {
        if (screenpeek == p)
        {
            FX_StopAllSounds();
            S_ClearSoundLocks();
        }

        if (sprite[ps.i].extra > 0)
            A_PlaySound(DUKE_UNDERWATER, j);

        ps.opos.z = ps.pos.z = sector[othersect].ceilingz;
//        ps.vel.x = 4096-(krand()&8192);
//        ps.vel.y = 4096-(krand()&8192);

        if (TEST_SYNC_KEY(g_player[p].sync.bits, SK_CROUCH))
            ps.vel.z += 512;

        return 1;
    }

    return 0;
}

function /*int32_t */P_Emerge(/*int32_t*/ j:number, /*int32_t */p:number, ps:DukePlayer_t, /*int32_t */sect:number, /*int32_t */othersect:number):number
{
    // r1449-:
    if (ps.pos.z < (sector[sect].ceilingz+1080) && ps.vel.z == 0)
        // r1450+, breaks submergible slime in bobsp2:
//        if (onfloorz && sectlotag == 2 && ps.pos.z <= sector[sect].ceilingz /*&& ps.vel.z == 0*/)
    {
//        if( sprite[j].extra <= 0) break;
        if (screenpeek == p)
        {
            FX_StopAllSounds();
            S_ClearSoundLocks();
        }

        A_PlaySound(DUKE_GASP, j);

        ps.opos.z = ps.pos.z = sector[othersect].floorz;
        ps.vel.z = 0;
//        ps.vel.z += 1024;

        ps.jumping_toggle = 1;
        ps.jumping_counter = 0;

        return 1;
    }

    return 0;
}

function P_FinishWaterChange(/*int32_t */j:number, ps:DukePlayer_t, /*int32_t */sectlotag:number, /*int32_t */ow:number, /*int32_t */newsectnum:number):void
{
    var /*int32_t */l:number;
    var vect = new vec3_t();

    ps.bobposx = ps.opos.x = ps.pos.x;
    ps.bobposy = ps.opos.y = ps.pos.y;

    if (ow < 0 || sprite[ow].owner != ow)
        ps.transporter_hold = -2;

    ps.cursectnum = newsectnum;
    changespritesect(j, newsectnum);

    vect.x = ps.pos.x;
    vect.y = ps.pos.y;
    vect.z = ps.pos.z+PHEIGHT;
    setsprite(ps.i, vect);

    P_UpdateScreenPal(ps);

    if ((krand()&255) < 32)
        A_Spawn(j, WATERSPLASH2);

    if (sectlotag == ST_1_ABOVE_WATER)
        for (l = 0; l < 9; l++)
        {
            var/*int32_t */q = A_Spawn(ps.i,WATERBUBBLE);
            sprite[q].z += krand()&16383;
        }
}

// Check prevention of teleportation *when alive*. For example, commanders and
// octabrains would be transported by SE7 (both water and normal) only if dead.
function /*int32_t */A_CheckNonTeleporting(/*int32_t*/ s:number):number
{
    var/*int32_t */pic = sprite[s].picnum;

    if (A_CheckSpriteFlags(s, SPRITE_NOTELEPORT)) return 1;

    return (pic == SHARK || pic == COMMANDER || pic == OCTABRAIN
                || (pic >= GREENSLIME && pic <= GREENSLIME+7))?1:0;
}

function G_MoveTransports():void
{
    var/*int32_t */i = headspritestat[STAT_TRANSPORT];

    BOLT:
    while (i >= 0)
    {
        var /*const int32_t */sect = sprite[i].sectnum;
        var /*const int32_t */sectlotag = sector[sect].lotag;

        var/*const int32_t */nexti = nextspritestat[i];
        var /*int32_t */j:number, k:number;

        var/*const int32_t */onfloorz = actor[i].t_data[4];  // ONFLOORZ

        if (sprite[i].owner == i)
        {
            i = nexti;
            continue;
        }

        if (actor[i].t_data[0] > 0) actor[i].t_data[0]--;

        j = headspritesect[sect];
        JBOLT:
        while (j >= 0)
        {
            var/*const int32_t */nextj = nextspritesect[j];

            switch (sprite[j].statnum)
            {
            case STAT_PLAYER:
                if (sprite[j].owner != -1)
                {
                    var /*const int32_t */p = sprite[j].yvel;
                    var ps = g_player[p].ps;

                    ps.on_warping_sector = 1;

                    if (ps.transporter_hold == 0 && ps.jumping_counter == 0)
                    {
                        if (ps.on_ground && sectlotag == 0 && onfloorz && ps.jetpack_on == 0)
                        {
                            if (sprite[i].pal == 0)
                            {
                                A_Spawn(i,TRANSPORTERBEAM);
                                A_PlaySound(TELEPORTER,i);
                            }

                            for (k = 0; k != -1; k = connectpoint2[k])
                                if (g_player[k].ps.cursectnum == sprite[sprite[i].owner].sectnum)
                                {
                                    g_player[k].ps.frag_ps = p;
                                    sprite[g_player[k].ps.i].extra = 0;
                                }

                            ps.ang = sprite[sprite[i].owner].ang;

                            if (sprite[sprite[i].owner].owner != sprite[i].owner)
                            {
                                actor[i].t_data[0] = 13;
                                actor[sprite[i].owner].t_data[0] = 13;
                                ps.transporter_hold = 13;
                            }

                            ps.bobposx = ps.opos.x = ps.pos.x = sprite[sprite[i].owner].x;
                            ps.bobposy = ps.opos.y = ps.pos.y = sprite[sprite[i].owner].y;
                            ps.opos.z = ps.pos.z = sprite[sprite[i].owner].z-PHEIGHT;

                            changespritesect(j,sprite[sprite[i].owner].sectnum);
                            ps.cursectnum = sprite[j].sectnum;

                            if (sprite[i].pal == 0)
                            {
                                k = A_Spawn(sprite[i].owner,TRANSPORTERBEAM);
                                A_PlaySound(TELEPORTER,k);
                            }

                            break;
                        }
                    }
                    else if (!(sectlotag == ST_1_ABOVE_WATER && ps.on_ground == 1)) break;

                    if (onfloorz == 0 && klabs(sprite[i].z-ps.pos.z) < 6144)
                        if (!ps.jetpack_on || TEST_SYNC_KEY(g_player[p].sync.bits, SK_JUMP) ||
                                TEST_SYNC_KEY(g_player[p].sync.bits, SK_CROUCH))
                        {
                            ps.bobposx = ps.opos.x = ps.pos.x += sprite[sprite[i].owner].x-sprite[i].x;
                            ps.bobposy = ps.opos.y = ps.pos.y += sprite[sprite[i].owner].y-sprite[i].y;

                            if (ps.jetpack_on && (TEST_SYNC_KEY(g_player[p].sync.bits, SK_JUMP) || ps.jetpack_on < 11))
                                ps.pos.z = sprite[sprite[i].owner].z-6144;
                            else ps.pos.z = sprite[sprite[i].owner].z+6144;
                            ps.opos.z = ps.pos.z;

                            actor[ps.i].bpos.x = ps.pos.x;
                            actor[ps.i].bpos.y = ps.pos.y;
                            actor[ps.i].bpos.z = ps.pos.z;

                            changespritesect(j,sprite[sprite[i].owner].sectnum);
                            ps.cursectnum = sprite[sprite[i].owner].sectnum;

                            break;
                        }

                    k = 0;
                    if (onfloorz)
                    {
                        if (sectlotag==ST_1_ABOVE_WATER)
                            k = P_Submerge(j, p, ps, sect, sprite[sprite[i].owner].sectnum);
                        else if (sectlotag==ST_2_UNDERWATER)
                            k = P_Emerge(j, p, ps, sect, sprite[sprite[i].owner].sectnum);
                    }

                    if (k == 1)
                    {
                        ps.pos.x += sprite[sprite[i].owner].x-sprite[i].x;
                        ps.pos.y += sprite[sprite[i].owner].y-sprite[i].y;

                        P_FinishWaterChange(j, ps, sectlotag, sprite[i].owner, sprite[sprite[i].owner].sectnum);
                    }
                }
                break;


            ////////// Non-player teleportation //////////

            case STAT_PROJECTILE:
                // SE7_PROJECTILE, PROJECTILE_CHSECT.
                // comment out to make RPGs pass through water: (r1450 breaks this)
//                if (sectlotag != 0) {j = nextj; continue JBOLT;}
            case STAT_ACTOR:
                if (sprite[j].extra > 0 && A_CheckNonTeleporting(j))
                    {j = nextj; continue JBOLT;}
            case STAT_MISC:
            case STAT_FALLER:
            case STAT_DUMMYPLAYER:
            {
                if (totalclock > actor[j].lasttransport)
                {
                    var/*const int32_t */ll = klabs(sprite[j].zvel);
                    var /*int32_t */warpspriteto = 0;

                    if (ll != 0)
                    {
                        if (sectlotag == ST_2_UNDERWATER && sprite[j].z < (sector[sect].ceilingz+ll))
                            warpspriteto = 1;
                        if (sectlotag == ST_1_ABOVE_WATER && sprite[j].z > (sector[sect].floorz-ll))
                            warpspriteto = 1;
                    }

                    if (sectlotag == 0 && (onfloorz || klabs(sprite[j].z-sprite[i].z) < 4096))
                    {
                        if (sprite[sprite[i].owner].owner != sprite[i].owner && onfloorz && actor[i].t_data[0] > 0 && sprite[j].statnum != STAT_MISC)
                        {
                            actor[i].t_data[0]++;
                            { i = nexti; continue BOLT; }
                        }
                        warpspriteto = 1;
                    }

                    if (warpspriteto)
                    {
                        if (A_CheckSpriteFlags(j,SPRITE_DECAL))
                            {j = nextj; continue JBOLT;}

                        switch (DYNAMICTILEMAP(sprite[j].picnum))
                        {
                        case TRANSPORTERSTAR__STATIC:
                        case TRANSPORTERBEAM__STATIC:
                        case TRIPBOMB__STATIC:
                        case BULLETHOLE__STATIC:
                        case WATERSPLASH2__STATIC:
                        case BURNING__STATIC:
                        case BURNING2__STATIC:
                        case FIRE__STATIC:
                        case FIRE2__STATIC:
                        case TOILETWATER__STATIC:
                        case LASERLINE__STATIC:
                            {j = nextj; continue JBOLT;}

                        case PLAYERONWATER__STATIC:
                            if (sectlotag == ST_2_UNDERWATER)
                            {
                                sprite[j].cstat &= 32768;
                                break;
                            }
                            // fall-through
                        default:
                            if (sprite[j].statnum == STAT_MISC && !(sectlotag == ST_1_ABOVE_WATER || sectlotag == ST_2_UNDERWATER))
                                break;
                            // fall-through
                        case WATERBUBBLE__STATIC:
//                            if( rnd(192) && sprite[j].picnum == WATERBUBBLE)
//                                break;

                            if (sectlotag > 0)
                            {
                                // Water SE7 teleportation.
                                var/*const int32_t */osect = sprite[sprite[i].owner].sectnum;

                                Bassert(sectlotag==ST_1_ABOVE_WATER || sectlotag==ST_2_UNDERWATER);

                                k = A_Spawn(j,WATERSPLASH2);
                                if (sectlotag == ST_1_ABOVE_WATER && sprite[j].statnum == STAT_PROJECTILE)
                                {
                                    sprite[k].xvel = sprite[j].xvel>>1;
                                    sprite[k].ang = sprite[j].ang;
                                    A_SetSprite(k,CLIPMASK0);
                                }

                                //
                                actor[j].lasttransport = totalclock + (TICSPERFRAME<<2);

                                sprite[j].x += (sprite[sprite[i].owner].x-sprite[i].x);
                                sprite[j].y += (sprite[sprite[i].owner].y-sprite[i].y);
                                sprite[j].z = sectlotag==ST_1_ABOVE_WATER ?
                                    sector[osect].ceilingz : sector[osect].floorz;

                                actor[j].bpos.copyFrom(sprite[j]);//Bmemcpy(&actor[j].bpos.x, &sprite[j], sizeof(vec3_t));

                                changespritesect(j, sprite[sprite[i].owner].sectnum);
                            }
                            else if (Bassert(sectlotag==0), 1)
                            {
                                // Non-water SE7 teleportation.

                                if (onfloorz)
                                {
                                    if (sprite[j].statnum == STAT_PROJECTILE ||
                                            (G_CheckPlayerInSector(sect) == -1 && G_CheckPlayerInSector(sprite[sprite[i].owner].sectnum) == -1))
                                    {
                                        sprite[j].x += (sprite[sprite[i].owner].x-sprite[i].x);
                                        sprite[j].y += (sprite[sprite[i].owner].y-sprite[i].y);
                                        sprite[j].z -= sprite[i].z - sector[sprite[sprite[i].owner].sectnum].floorz;
                                        sprite[j].ang = sprite[sprite[i].owner].ang;

                                         actor[j].bpos.copyFrom(sprite[j]);//Bmemcpy(&actor[j].bpos.x, &sprite[j], sizeof(vec3_t));

                                        if (sprite[i].pal == 0)
                                        {
                                            k = A_Spawn(i,TRANSPORTERBEAM);
                                            A_PlaySound(TELEPORTER,k);

                                            k = A_Spawn(sprite[i].owner,TRANSPORTERBEAM);
                                            A_PlaySound(TELEPORTER,k);
                                        }

                                        if (sprite[sprite[i].owner].owner != sprite[i].owner)
                                        {
                                            actor[i].t_data[0] = 13;
                                            actor[sprite[i].owner].t_data[0] = 13;
                                        }

                                        changespritesect(j,sprite[sprite[i].owner].sectnum);
                                    }
                                }
                                else
                                {
                                    sprite[j].x += (sprite[sprite[i].owner].x-sprite[i].x);
                                    sprite[j].y += (sprite[sprite[i].owner].y-sprite[i].y);
                                    sprite[j].z = sprite[sprite[i].owner].z+4096;

                                     actor[j].bpos.copyFrom(sprite[j]);//Bmemcpy(&actor[j].bpos.x, &sprite[j], sizeof(vec3_t));

                                    changespritesect(j,sprite[sprite[i].owner].sectnum);
                                }
                            }

                            break;
                        }  // switch (DYNAMICTILEMAP(sprite[j].picnum))
                    }  // if (warpspriteto)
                }  // if (totalclock > actor[j].lasttransport)

                break;
            }  // five cases

            }  // switch (sprite[j].statnum)
//JBOLT:
            j = nextj;
        }
//BOLT:
        i = nexti;
    }
}

function/*int16_t */A_FindLocator(/*int32_t */n:number, /*int32_t */sn:number):number
{
    var/*int32_t */i:number;

    for (i = headspritestat[STAT_LOCATOR]; i >= 0; i = nextspritestat[i])
    {
        if ((sn == -1 || sn == sprite[i].sectnum) && n == sprite[i].lotag)
            return i;
    }

    return -1;
}

function G_MoveActors():void
{
    var /*int32_t */x:number, m:number, l:number;

    var/*int32_t */j:number;
    var/*int32_t */i = headspritestat[STAT_ACTOR];

    BOLT:
    while (i >= 0)
    {
        var/*const int32_t */nexti = nextspritestat[i];

        var s = sprite[i];
        var /*const int32_t */sect = s.sectnum;

        var /*int32_t */switchpicnum:number;
        var t = actor[i].t_data;

        if (s.xrepeat == 0 || sect < 0 || sect >= MAXSECTORS)
            { A_DeleteSprite(i); {i = nexti; continue BOLT;} }

        actor[i].bpos.copyFrom(s);//Bmemcpy(&actor[i].bpos.x, s, sizeof(vec3_t));

        switchpicnum = s.picnum;

        if (s.picnum > GREENSLIME && s.picnum <= GREENSLIME+7)
            switchpicnum = GREENSLIME;

        switch (DYNAMICTILEMAP(switchpicnum))
        {
        case DUCK__STATIC:
        case TARGET__STATIC:
            if (s.cstat&32)
            {
                t[0]++;
                if (t[0] > 60)
                {
                    t[0] = 0;
                    s.cstat = 128+257+16;
                    s.extra = 1;
                }
            }
            else
            {
                if (A_IncurDamage(i) >= 0)
                {
                    var /*int32_t */k = 1;

                    s.cstat = 32+128;

                    for (j = headspritestat[STAT_ACTOR]; j >= 0; j = nextspritestat[j]/*SPRITES_OF(STAT_ACTOR, j)*/)
                    {
                        if (sprite[j].lotag == s.lotag && sprite[j].picnum == s.picnum)
                        {
                            if ((sprite[j].hitag!=0?1:0) ^ ((sprite[j].cstat&32)!=0?1:0))
                            {
                                k = 0;
                                break;
                            }
                        }
                    }

                    if (k == 1)
                    {
                        G_OperateActivators(s.lotag,-1);
                        G_OperateForceFields(i,s.lotag);
                        G_OperateMasterSwitches(s.lotag);
                    }
                }
            }
            {i = nexti; continue BOLT;}

        case RESPAWNMARKERRED__STATIC:
        case RESPAWNMARKERYELLOW__STATIC:
        case RESPAWNMARKERGREEN__STATIC:
            if (++actor[i].t_data[0] > g_itemRespawnTime)
                { A_DeleteSprite(i); {i = nexti; continue BOLT;} }

            if (actor[i].t_data[0] >= (g_itemRespawnTime>>1) && actor[i].t_data[0] < ((g_itemRespawnTime>>1)+(g_itemRespawnTime>>2)))
                sprite[i].picnum = RESPAWNMARKERYELLOW;
            else if (actor[i].t_data[0] > ((g_itemRespawnTime>>1)+(g_itemRespawnTime>>2)))
                sprite[i].picnum = RESPAWNMARKERGREEN;

            A_Fall(i);
            break;

        case HELECOPT__STATIC:
        case DUKECAR__STATIC:
            s.z += s.zvel;
            t[0]++;

            if (t[0] == 4) A_PlaySound(WAR_AMBIENCE2,i);

            if (t[0] > (GAMETICSPERSEC*8))
            {
                S_PlaySound(RPG_EXPLODE);
                for (j=0; j<32; j++) RANDOMSCRAP(s, i);
                g_earthquakeTime = 16;
                { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
            }
            else if ((t[0]&3) == 0)
                A_Spawn(i,EXPLOSION2);
            A_SetSprite(i,CLIPMASK0);
            break;

        case RAT__STATIC:
            A_Fall(i);
            if (A_SetSprite(i, CLIPMASK0))
            {
                if ((krand()&255) < 3) A_PlaySound(RATTY,i);
                s.ang += (krand()&31)-15+(sintable[(t[0]<<8)&2047]>>11);
            }
            else
            {
                actor[i].t_data[0]++;
                if (actor[i].t_data[0] > 1)
                {
                    { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                }
                else s.ang = (krand()&2047);
            }
            if (s.xvel < 128)
                s.xvel+=2;
            s.ang += (krand()&3)-6;
            break;

        case QUEBALL__STATIC:
        case STRIPEBALL__STATIC:
            if (s.xvel)
            {
                for (j = headspritestat[STAT_DEFAULT]; j >= 0; j = nextspritestat[j])
                    if (sprite[j].picnum == POCKET && ldist(sprite[j],s) < 52)
                        { A_DeleteSprite(i); {i = nexti; continue BOLT;} }

                var $sectnum = new R(s.sectnum);
                j = clipmove(/*(vec3_t *)*/s,$sectnum,
                             (((s.xvel*(sintable[(s.ang+512)&2047]))>>14)*TICSPERFRAME)<<11,
                             (((s.xvel*(sintable[s.ang&2047]))>>14)*TICSPERFRAME)<<11,
                             24,(4<<8),(4<<8),CLIPMASK1);
                s.sectnum = $sectnum.$;

                if (j&49152)
                {
                    if ((j&49152) == 32768)
                    {
                        j &= (MAXWALLS-1);
                        Proj_BounceOffWall(s, j);
                    }
                    else if ((j&49152) == 49152)
                    {
                        j &= (MAXSPRITES-1);
                        A_DamageObject(i,j);
                    }
                }

                s.xvel--;
                if (s.xvel < 0) s.xvel = 0;

                if (s.picnum == STRIPEBALL)
                {
                    s.cstat = 257;
                    s.cstat |= (4 & s.xvel) | (8 & s.xvel);
                }
            }
            else
            {
                var $x = new R(x);
                var/*const int32_t */p = A_FindPlayer(s,$x);
                x = $x.$;
                var ps = g_player[p].ps;

                if (x < 1596)
//                    if (s.pal == 12)
                {
                    j = G_GetAngleDelta(ps.ang,getangle(s.x-ps.pos.x,s.y-ps.pos.y));

                    if (j > -64 && j < 64 && TEST_SYNC_KEY(g_player[p].sync.bits, SK_OPEN))
                        if (ps.toggle_key_flag == 1)
                        {
                            var/*int32_t */a:number;

                            for (a = headspritestat[STAT_ACTOR]; a >= 0; a = nextspritestat[a]/*SPRITES_OF(STAT_ACTOR, a)*/)
                            {
                                if (sprite[a].picnum == QUEBALL || sprite[a].picnum == STRIPEBALL)
                                {
                                    j = G_GetAngleDelta(ps.ang,getangle(sprite[a].x-ps.pos.x,sprite[a].y-ps.pos.y));
                                    if (j > -64 && j < 64)
                                    {
                                        var $l = new R(l);
                                        A_FindPlayer(sprite[a],$l);
                                        l = $l.$;
                                        if (x > l) break;
                                    }
                                }
                            }

                            if (a == -1)
                            {
                                if (s.pal == 12)
                                    s.xvel = 164;
                                else s.xvel = 140;
                                s.ang = ps.ang;
                                ps.toggle_key_flag = 2;
                            }
                        }
                }

                if (x < 512 && s.sectnum == ps.cursectnum)
                {
                    s.ang = getangle(s.x-ps.pos.x,s.y-ps.pos.y);
                    s.xvel = 48;
                }
            }

            break;

        case FORCESPHERE__STATIC:
            if (s.yvel == 0)
            {
                s.yvel = 1;

                for (l=512; l<(2048-512); l+= 128)
                    for (j=0; j<2048; j += 128)
                    {
                        var/*int32_t */k = A_Spawn(i,FORCESPHERE);
                        sprite[k].cstat = 257+128;
                        sprite[k].clipdist = 64;
                        sprite[k].ang = j;
                        sprite[k].zvel = sintable[l&2047]>>5;
                        sprite[k].xvel = sintable[(l+512)&2047]>>9;
                        sprite[k].owner = i;
                    }
            }

            if (t[3] > 0)
            {
                if (s.zvel < 6144)
                    s.zvel += 192;
                s.z += s.zvel;
                if (s.z > sector[sect].floorz)
                    s.z = sector[sect].floorz;
                t[3]--;
                if (t[3] == 0)
                    { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
            }
            else if (t[2] > 10)
            {
                for (j = headspritestat[STAT_MISC]; j >= 0; j = nextspritestat[j])
                    if (sprite[j].owner == i && sprite[j].picnum == FORCESPHERE)
                        actor[j].t_data[1] = 1+(krand()&63);

                t[3] = 64;
            }

            {i = nexti; continue BOLT;}

        case RECON__STATIC:
        {
            var /*int32_t */p:number;
            var ps:DukePlayer_t;

            A_GetZLimits(i);

            if (sector[s.sectnum].ceilingstat&1)
                s.shade += (sector[s.sectnum].ceilingshade-s.shade)>>1;
            else s.shade += (sector[s.sectnum].floorshade-s.shade)>>1;

            if (s.z < sector[sect].ceilingz+(32<<8))
                s.z = sector[sect].ceilingz+(32<<8);

//#if 0 //def POLYMER
//            gamelights[gamelightcount&(PR_MAXLIGHTS-1)].sector = s.sectnum;
//            gamelights[gamelightcount&(PR_MAXLIGHTS-1)].x = s.x;
//            gamelights[gamelightcount&(PR_MAXLIGHTS-1)].y = s.y;
//            gamelights[gamelightcount&(PR_MAXLIGHTS-1)].z = s.z + 10248;
//            gamelights[gamelightcount&(PR_MAXLIGHTS-1)].range = 8192;

//            gamelights[gamelightcount&(PR_MAXLIGHTS-1)].angle = s.ang;
//            gamelights[gamelightcount&(PR_MAXLIGHTS-1)].horiz = 100;
//            gamelights[gamelightcount&(PR_MAXLIGHTS-1)].radius = 256;
//            gamelights[gamelightcount&(PR_MAXLIGHTS-1)].faderadius = 200;

//            gamelights[gamelightcount&(PR_MAXLIGHTS-1)].color[0] = 255;
//            gamelights[gamelightcount&(PR_MAXLIGHTS-1)].color[1] = 255;
//            gamelights[gamelightcount&(PR_MAXLIGHTS-1)].color[2] = 255;

//            gamelights[gamelightcount&(PR_MAXLIGHTS-1)].priority = PR_LIGHT_PRIO_MAX_GAME;

//            if (gamelightcount < PR_MAXLIGHTS)
//                gamelightcount++;
//#endif

            if (!g_netServer && ud.multimode < 2)
            {
                if (g_noEnemies == 1)
                {
                    s.cstat = 32768;
                    {i = nexti; continue BOLT;}
                }
                else if (g_noEnemies == 2) s.cstat = 257;
            }
            if (A_IncurDamage(i) >= 0)
            {
                if (s.extra < 0 && t[0] != -1)
                {
                    t[0] = -1;
                    s.extra = 0;
                }

                A_PlaySound(RECO_PAIN,i);
                RANDOMSCRAP(s, i);
            }

            if (t[0] == -1)
            {
                s.z += 1024;
                t[2]++;

                if ((t[2]&3) == 0)
                    A_Spawn(i,EXPLOSION2);

                A_GetZLimits(i);
                s.ang += 96;
                s.xvel = 128;
                j = A_SetSprite(i,CLIPMASK0);

                if (!j || s.z > actor[i].floorz)
                {
                    for (l=0; l<16; l++)
                        RANDOMSCRAP(s, i);
                    j = A_Spawn(i,EXPLOSION2);
                    A_PlaySound(LASERTRIP_EXPLODE,j);
                    A_Spawn(i,PIGCOP);
                    g_player[myconnectindex].ps.actors_killed++;
                    { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                }
                {i = nexti; continue BOLT;}
            }
            else
            {
                if (s.z > actor[i].floorz-(48<<8))
                    s.z = actor[i].floorz-(48<<8);
            }

            var $x = new R(x);
            p = A_FindPlayer(s,$x);
            x = $x.$;
            
            ps = g_player[p].ps;

            j = s.owner;

            // 3 = findplayerz, 4 = shoot

            if (t[0] >= 4)
            {
                t[2]++;
                if ((t[2]&15) == 0)
                {
                    var/*int32_t */a = s.ang;
                    s.ang = actor[i].tempang;
                    A_PlaySound(RECO_ATTACK,i);
                    A_Shoot(i,FIRELASER);
                    s.ang = a;
                }
                if (t[2] > (GAMETICSPERSEC*3) || !cansee(s.x,s.y,s.z-(16<<8),s.sectnum, ps.pos.x,ps.pos.y,ps.pos.z,ps.cursectnum))
                {
                    t[0] = 0;
                    t[2] = 0;
                }
                else actor[i].tempang +=
                        int32(G_GetAngleDelta(actor[i].tempang,getangle(ps.pos.x-s.x,ps.pos.y-s.y))/3);
            }
            else if (t[0] == 2 || t[0] == 3)
            {
                t[3] = 0;
                if (s.xvel > 0) s.xvel -= 16;
                else s.xvel = 0;

                if (t[0] == 2)
                {
                    l = ps.pos.z-s.z;
                    if (klabs(l) < (48<<8)) t[0] = 3;
                    else s.z += ksgn(ps.pos.z-s.z)<<10;
                }
                else
                {
                    t[2]++;
                    if (t[2] > (GAMETICSPERSEC*3) || !cansee(s.x,s.y,s.z-(16<<8),s.sectnum, ps.pos.x,ps.pos.y,ps.pos.z,ps.cursectnum))
                    {
                        t[0] = 1;
                        t[2] = 0;
                    }
                    else if ((t[2]&15) == 0)
                    {
                        A_PlaySound(RECO_ATTACK,i);
                        A_Shoot(i,FIRELASER);
                    }
                }
                s.ang += G_GetAngleDelta(s.ang,getangle(ps.pos.x-s.x,ps.pos.y-s.y))>>2;
            }

            if (t[0] != 2 && t[0] != 3)
            {
                var/*int32_t */a:number;
                l = ldist(sprite[j],s);
                if (l <= 1524)
                {
                    a = s.ang;
                    s.xvel >>= 1;
                }
                else a = getangle(sprite[j].x-s.x,sprite[j].y-s.y);

                if (t[0] == 1 || t[0] == 4) // Found a locator and going with it
                {
                    l = dist(sprite[j],s);

                    if (l <= 1524)
                    {
                        if (t[0] == 1) t[0] = 0;
                        else t[0] = 5;
                    }
                    else
                    {
                        // Control speed here
                        if (l > 1524)
                        {
                            if (s.xvel < 256) s.xvel += 32;
                        }
                        else
                        {
                            if (s.xvel > 0) s.xvel -= 16;
                            else s.xvel = 0;
                        }
                    }

                    if (t[0] < 2) t[2]++;

                    if (x < 6144 && t[0] < 2 && t[2] > (GAMETICSPERSEC*4))
                    {
                        t[0] = 2+(krand()&2);
                        t[2] = 0;
                        actor[i].tempang = s.ang;
                    }
                }

                if (t[0] == 0 || t[0] == 5)
                {
                    if (t[0] == 0)
                        t[0] = 1;
                    else t[0] = 4;

                    j = s.owner = A_FindLocator(s.hitag,-1);
                    if (j == -1)
                    {
                        s.hitag = j = actor[i].t_data[5];
                        s.owner = A_FindLocator(j,-1);
                        j = s.owner;
                        if (j == -1)
                            { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                    }
                    else s.hitag++;
                }

                // RECON_T4
                t[3] = G_GetAngleDelta(s.ang,a);
                s.ang += t[3]>>3;

                if (s.z < sprite[j].z-512)
                    s.z += 512;
                else if (s.z > sprite[j].z+512)
                    s.z -= 512;
                else s.z = sprite[j].z;
            }

            if (!A_CheckSoundPlaying(i,RECO_ROAM))
                A_PlaySound(RECO_ROAM,i);

            A_SetSprite(i,CLIPMASK0);

            {i = nexti; continue BOLT;}
        }

        case OOZ__STATIC:
        case OOZ2__STATIC:
            A_GetZLimits(i);

            j = (actor[i].floorz-actor[i].ceilingz)>>9;
            if (j > 255) j = 255;

            x = 25-(j>>1);
            if (x < 8) x = 8;
            else if (x > 48) x = 48;

            s.yrepeat = j;
            s.xrepeat = x;
            s.z = actor[i].floorz;

            {i = nexti; continue BOLT;}

        case GREENSLIME__STATIC:
        {
            var /*int32_t */p:number;
            var ps:DukePlayer_t ;

            //        case GREENSLIME+1:
            //        case GREENSLIME+2:
            //        case GREENSLIME+3:
            //        case GREENSLIME+4:
            //        case GREENSLIME+5:
            //        case GREENSLIME+6:
            //        case GREENSLIME+7:

            // #ifndef VOLUMEONE
            if (!g_netServer && ud.multimode < 2)
            {
                if (g_noEnemies == 1)
                {
                    s.cstat = 32768;
                    {i = nexti; continue BOLT;}
                }
                else if (g_noEnemies == 2) s.cstat = 257;
            }
            // #endif

            t[1]+=128;

            if (sector[sect].floorstat&1)
                { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
            var $x = new R(x);
            p = A_FindPlayer(s,$x);
            x = $x.$;
            ps = g_player[p].ps;

            if (x > 20480)
            {
                actor[i].timetosleep++;
                if (actor[i].timetosleep > SLEEPTIME)
                {
                    actor[i].timetosleep = 0;
                    changespritestat(i, STAT_ZOMBIEACTOR);
                    {i = nexti; continue BOLT;}
                }
            }

            if (t[0] == -5) // FROZEN
            {
                t[3]++;
                if (t[3] > 280)
                {
                    s.pal = 0;
                    t[0] = 0;
                    {i = nexti; continue BOLT;}
                }
                A_Fall(i);
                s.cstat = 257;
                s.picnum = GREENSLIME+2;
                s.extra = 1;
                s.pal = 1;
                if ((j = A_IncurDamage(i)) >= 0)
                {
                    if (j == FREEZEBLAST) {i = nexti; continue BOLT;}
                    for (j=16; j >= 0 ; j--)
                    {
                        var krands = getKrands(3);
                        var/*int32_t */k = A_InsertSprite(sprite[i].sectnum,sprite[i].x,sprite[i].y,sprite[i].z,GLASSPIECES+(j%3),-32,36,36,krands.pop()&2047,32+(krands.pop()&63),1024-(krands.pop()&1023),i,5);
                        sprite[k].pal = 1;
                    }
                    A_PlaySound(GLASS_BREAKING,i);
                    { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                }
                else if (x < 1024 && ps.quick_kick == 0)
                {
                    j = G_GetAngleDelta(ps.ang,getangle(sprite[i].x-ps.pos.x,sprite[i].y-ps.pos.y));
                    if (j > -128 && j < 128)
                        ps.quick_kick = 14;
                }

                {i = nexti; continue BOLT;}
            }

            if (x < 1596)
                s.cstat = 0;
            else s.cstat = 257;

            if (t[0] == -4) //On the player
            {
                if (sprite[ps.i].extra < 1)
                {
                    t[0] = 0;
                    {i = nexti; continue BOLT;}
                }

                setsprite(i,/*(vec3_t *)*/s);

                s.ang = ps.ang;

                if ((TEST_SYNC_KEY(g_player[p].sync.bits, SK_FIRE) || (ps.quick_kick > 0)) && sprite[ps.i].extra > 0)
                    if (ps.quick_kick > 0 || (ps.curr_weapon != HANDREMOTE_WEAPON && ps.curr_weapon != HANDBOMB_WEAPON && ps.curr_weapon != TRIPBOMB_WEAPON && ps.ammo_amount[ps.curr_weapon] >= 0))
                    {
                        for (x=0; x<8; x++)
                        {
                            var krands = getKrands(4);
                            j = A_InsertSprite(sect,s.x,s.y,s.z-(8<<8),SCRAP3+(krands.pop()&3),-8,48,48,krands.pop()&2047,(krands.pop()&63)+64,-(krands.pop()&4095)-(s.zvel>>2),i,5);
                            sprite[j].pal = 6;
                        }

                        A_PlaySound(SLIM_DYING,i);
                        A_PlaySound(SQUISHED,i);
                        if ((krand()&255) < 32)
                        {
                            j = A_Spawn(i,BLOODPOOL);
                            sprite[j].pal = 0;
                        }
                        ps.actors_killed ++;
                        t[0] = -3;
                        if (ps.somethingonplayer == i)
                            ps.somethingonplayer = -1;
                        { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                    }

                s.z = ps.pos.z+ps.pyoff-t[2]+(8<<8);

                s.z += (100-ps.horiz)<<4;

                if (t[2] > 512)
                    t[2] -= 128;

                if (t[2] < 348)
                    t[2] += 128;

                if (ps.newowner >= 0)
                    G_ClearCameraView(ps);

                if (t[3]>0)
                {
                    var /*static const char */frames = [5,5,6,6,7,7,6,5];

                    s.picnum = GREENSLIME+frames[t[3]];

                    if (t[3] == 5)
                    {
                        sprite[ps.i].extra += -(5+(krand()&3));
                        A_PlaySound(SLIM_ATTACK,i);
                    }

                    if (t[3] < 7) t[3]++;
                    else t[3] = 0;

                }
                else
                {
                    s.picnum = GREENSLIME+5;
                    if (rnd(32))
                        t[3] = 1;
                }

                s.xrepeat = 20+(sintable[t[1]&2047]>>13);
                s.yrepeat = 15+(sintable[t[1]&2047]>>13);

                s.x = ps.pos.x + (sintable[(ps.ang+512)&2047]>>7);
                s.y = ps.pos.y + (sintable[ps.ang&2047]>>7);

                {i = nexti; continue BOLT;}
            }

            else if (s.xvel < 64 && x < 768)
            {
                if (ps.somethingonplayer == -1)
                {
                    ps.somethingonplayer = i;
                    if (t[0] == 3 || t[0] == 2) //Falling downward
                        t[2] = (12<<8);
                    else t[2] = -(13<<8); //Climbing up duke
                    t[0] = -4;
                }
            }

            if ((j = A_IncurDamage(i)) >= 0)
            {
                A_PlaySound(SLIM_DYING,i);

                ps.actors_killed ++;
                if (ps.somethingonplayer == i)
                    ps.somethingonplayer = -1;

                if (j == FREEZEBLAST)
                {
                    A_PlaySound(SOMETHINGFROZE,i);
                    t[0] = -5 ;
                    t[3] = 0 ;
                    {i = nexti; continue BOLT;}
                }

                if ((krand()&255) < 32)
                {
                    j = A_Spawn(i,BLOODPOOL);
                    sprite[j].pal = 0;
                }

                for (x=0; x<8; x++)
                {
                    var krands = getKrands(4);
                    j = A_InsertSprite(sect,s.x,s.y,s.z-(8<<8),SCRAP3+(krands.pop()&3),-8,48,48,krands.pop()&2047,(krands.pop()&63)+64,-(krands.pop()&4095)-(s.zvel>>2),i,5);
                    sprite[j].pal = 6;
                }
                t[0] = -3;
                { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
            }
            // All weap
            if (t[0] == -1) //Shrinking down
            {
                A_Fall(i);

                s.cstat &= 65535-8;
                s.picnum = GREENSLIME+4;

                //                    if(s.yrepeat > 62)
                //                      A_DoGuts(s,JIBS6,5,myconnectindex);

                if (s.xrepeat > 32) s.xrepeat -= krand()&7;
                if (s.yrepeat > 16) s.yrepeat -= krand()&7;
                else
                {
                    s.xrepeat = 40;
                    s.yrepeat = 16;
                    t[5] = -1;
                    t[0] = 0;
                }

                {i = nexti; continue BOLT;}
            }
            else if (t[0] != -2) A_GetZLimits(i);

            if (t[0] == -2) //On top of somebody
            {
                A_Fall(i);
                sprite[t[5]].xvel = 0;

                l = sprite[t[5]].ang;

                s.z = sprite[t[5]].z;
                s.x = sprite[t[5]].x+(sintable[(l+512)&2047]>>11);
                s.y = sprite[t[5]].y+(sintable[l&2047]>>11);

                s.picnum =  GREENSLIME+2+(g_globalRandom&1);

                if (s.yrepeat < 64) s.yrepeat+=2;
                else
                {
                    if (s.xrepeat < 32) s.xrepeat += 4;
                    else
                    {
                        t[0] = -1;
                        x = ldist(s,sprite[t[5]]);
                        if (x < 768)
                        {
                            sprite[t[5]].xrepeat = 0;

                            // JBF 20041129: a slimer eating another enemy really ought
                            // to decrease the maximum kill count by one.
                            if (sprite[t[5]].extra > 0)
                                g_player[myconnectindex].ps.max_actors_killed--;
                        }
                    }
                }

                {i = nexti; continue BOLT;}
            }

            //Check randomly to see of there is an actor near
            if (rnd(32))
            {
                for (j = headspritesect[sect]; j >= 0; j = nextspritesect[j])
                {
                    switch (DYNAMICTILEMAP(sprite[j].picnum))
                    {
                    case LIZTROOP__STATIC:
                    case LIZMAN__STATIC:
                    case PIGCOP__STATIC:
                    case NEWBEAST__STATIC:
                        if (ldist(s,sprite[j]) < 768 && (klabs(s.z-sprite[j].z)<8192))   //Gulp them
                        {
                            t[5] = j;
                            t[0] = -2;
                            t[1] = 0;
                            {i = nexti; continue BOLT;}
                        }
                    }
                }
            }

            //Moving on the ground or ceiling

            if (t[0] == 0 || t[0] == 2)
            {
                s.picnum = GREENSLIME;

                if ((krand()&511) == 0)
                    A_PlaySound(SLIM_ROAM,i);

                if (t[0]==2)
                {
                    s.zvel = 0;
                    s.cstat &= (65535-8);

                    if ((sector[sect].ceilingstat&1) || (actor[i].ceilingz+6144) < s.z)
                    {
                        s.z += 2048;
                        t[0] = 3;
                        {i = nexti; continue BOLT;}
                    }
                }
                else
                {
                    s.cstat |= 8;
                    A_Fall(i);
                }

                if (everyothertime&1) A_SetSprite(i,CLIPMASK0);

                if (s.xvel > 96)
                {
                    s.xvel -= 2;
                    {i = nexti; continue BOLT;}
                }
                else
                {
                    if (s.xvel < 32) s.xvel += 4;
                    s.xvel = 64 - (sintable[(t[1]+512)&2047]>>9);

                    s.ang += G_GetAngleDelta(s.ang,
                                              getangle(ps.pos.x-s.x,ps.pos.y-s.y))>>3;
                    // TJR
                }

                s.xrepeat = 36 + (sintable[(t[1]+512)&2047]>>11);
                s.yrepeat = 16 + (sintable[t[1]&2047]>>13);

                if (rnd(4) && (sector[sect].ceilingstat&1) == 0 &&
                        klabs(actor[i].floorz-actor[i].ceilingz)
                        < (192<<8))
                {
                    s.zvel = 0;
                    t[0]++;
                }

            }

            if (t[0]==1)
            {
                s.picnum = GREENSLIME;
                if (s.yrepeat < 40) s.yrepeat+=8;
                if (s.xrepeat > 8) s.xrepeat-=4;
                if (s.zvel > -(2048+1024))
                    s.zvel -= 348;
                s.z += s.zvel;
                if (s.z < actor[i].ceilingz+4096)
                {
                    s.z = actor[i].ceilingz+4096;
                    s.xvel = 0;
                    t[0] = 2;
                }
            }

            if (t[0]==3)
            {
                s.picnum = GREENSLIME+1;

                A_Fall(i);

                if (s.z > actor[i].floorz-(8<<8))
                {
                    s.yrepeat-=4;
                    s.xrepeat+=2;
                }
                else
                {
                    if (s.yrepeat < (40-4)) s.yrepeat+=8;
                    if (s.xrepeat > 8) s.xrepeat-=4;
                }

                if (s.z > actor[i].floorz-2048)
                {
                    s.z = actor[i].floorz-2048;
                    t[0] = 0;
                    s.xvel = 0;
                }
            }
            {i = nexti; continue BOLT;}
        }

        case BOUNCEMINE__STATIC:
        case MORTER__STATIC:
            j = A_Spawn(i,(window.PLUTOPAK?FRAMEEFFECT1:FRAMEEFFECT1_13));
            actor[j].t_data[0] = 3;

        case HEAVYHBOMB__STATIC:
        {
            var/*int32_t */p:number;
            var ps:DukePlayer_t;
            var gotoDETONATEB = false;
            if ((s.cstat&32768))
            {
                t[2]--;
                if (t[2] <= 0)
                {
                    A_PlaySound(TELEPORTER,i);
                    A_Spawn(i,TRANSPORTERSTAR);
                    s.cstat = 257;
                }
                {i = nexti; continue BOLT;}
            }

            var $x = new R(x);
            p = A_FindPlayer(s,$x);
            x = $x.$;
            ps = g_player[p].ps;

            if (x < 1220) s.cstat &= ~257;
            else s.cstat |= 257;

            if (t[3] == 0)
            {
                if (A_IncurDamage(i) >= 0)
                {
                    t[3] = 1;
                    t[2] = 0;
                    l = 0;
                    s.xvel = 0;
                    gotoDETONATEB = true;
                }
            }

            if(!gotoDETONATEB) 
            {
                if (s.picnum != BOUNCEMINE)
                {
                    A_Fall(i);

                    if ((sector[sect].lotag != ST_1_ABOVE_WATER || actor[i].floorz != sector[sect].floorz) && s.z >= actor[i].floorz-(ZOFFSET) && s.yvel < 3)
                    {
                        if (s.yvel > 0 || (s.yvel == 0 && actor[i].floorz == sector[sect].floorz))
                            A_PlaySound(PIPEBOMB_BOUNCE,i);
                        s.zvel = -((4-s.yvel)<<8);
                        if (sector[s.sectnum].lotag == ST_2_UNDERWATER)
                            s.zvel >>= 2;
                        s.yvel++;
                    }
                    if (s.z < actor[i].ceilingz)   // && sector[sect].lotag != ST_2_UNDERWATER )
                    {
                        s.z = actor[i].ceilingz+(3<<8);
                        s.zvel = 0;
                    }
                }

                {
                    var tmpvect = new vec3_t();

                    tmpvect.x = (s.xvel*(sintable[(s.ang+512)&2047]))>>14;
                    tmpvect.y = (s.xvel*(sintable[s.ang&2047]))>>14;
                    tmpvect.z = s.zvel;
                    j = A_MoveSprite(i,tmpvect,CLIPMASK0);
                }

                actor[i].movflag = j;

                if (sector[sprite[i].sectnum].lotag == ST_1_ABOVE_WATER && s.zvel == 0 && actor[i].floorz == sector[sect].floorz)
                {
                    s.z += (32<<8);
                    if (t[5] == 0)
                    {
                        t[5] = 1;
                        A_Spawn(i,WATERSPLASH2);
                    }
                }
                else t[5] = 0;

                if (t[3] == 0 && (s.picnum == BOUNCEMINE || s.picnum == MORTER) && (j || x < 844))
                {
                    t[3] = 1;
                    t[2] = 0;
                    l = 0;
                    s.xvel = 0;
                    gotoDETONATEB = true;
                }

            }

            if(!gotoDETONATEB) 
            {
                if (sprite[s.owner].picnum == APLAYER)
                    l = sprite[s.owner].yvel;
                else l = -1;

                if (s.xvel > 0)
                {
                    s.xvel -= 5;
                    if (sector[sect].lotag == ST_2_UNDERWATER)
                        s.xvel -= 10;

                    if (s.xvel < 0)
                        s.xvel = 0;
                    if (s.xvel&8) s.cstat ^= 4;
                }

                if ((j&49152) == 32768)
                {
                    var davect = new vec3_t();

                    j &= (MAXWALLS-1);

                    davect.copyFrom(s);//Bmemcpy(davect, s, sizeof(vec3_t));
                    A_DamageWall(i,j,davect,s.picnum);

                    Proj_BounceOffWall(s, j);
                    s.xvel >>= 1;
                }
            }
//DETONATEB:
            // Pipebomb control set to timer? (see player.c)
            if (s.picnum == HEAVYHBOMB && t[6] == 1)
            {
                /*                if(s.extra >= 1)
                                {
                                    s.extra--;
                                }

                                if(s.extra <= 0)
                                    s.lotag=911;
                */

                if (t[7] > 0)
                    t[7]--;

                if (t[7] == 0)
                    t[6] = 3;
            }

            if ((l >= 0 && g_player[l].ps.hbomb_on == 0 && t[6] == 2) || t[3] == 1)
                t[6] = 3;

            if (t[6] == 3)
            {
                t[2]++;

                if (t[2] == 2)
                {
                    var/*int32_t */_j:number;

                    x = s.extra;
                    m = 0;
                    switch (DYNAMICTILEMAP(s.picnum))
                    {
                    case HEAVYHBOMB__STATIC:
                        m = g_pipebombBlastRadius;
                        break;
                    case MORTER__STATIC:
                        m = g_morterBlastRadius;
                        break;
                    case BOUNCEMINE__STATIC:
                        m = g_bouncemineBlastRadius;
                        break;
                    }

                    A_RadiusDamage(i, m,x>>2,x>>1,x-(x>>2),x);
                    _j = A_Spawn(i,EXPLOSION2);
                    A_PlaySound(PIPEBOMB_EXPLODE,_j);
                    if (s.zvel == 0)
                        A_Spawn(i,EXPLOSION2BOT);
                    for (x=0; x<8; x++)
                        RANDOMSCRAP(s, i);
                }

                if (s.yrepeat)
                {
                    s.yrepeat = 0;
                    {i = nexti; continue BOLT;}
                }

                if (t[2] > 20)
                {
                    if (s.owner != i || ud.respawn_items == 0)
                    {
                        { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                    }
                    else
                    {
                        t[2] = g_itemRespawnTime;
                        A_Spawn(i,RESPAWNMARKERRED);
                        s.cstat = 32768;
                        s.yrepeat = 9;
                        {i = nexti; continue BOLT;}
                    }
                }
            }
            else if (s.picnum == HEAVYHBOMB && x < 788 && t[0] > 7 && s.xvel == 0)
                if (cansee(s.x,s.y,s.z-(8<<8),s.sectnum,ps.pos.x,ps.pos.y,ps.pos.z,ps.cursectnum))
                    if (ps.ammo_amount[HANDBOMB_WEAPON] < ps.max_ammo_amount[HANDBOMB_WEAPON])
                    {
                        if ((GametypeFlags[ud.coop] & GAMETYPE_WEAPSTAY) && s.owner == i)
                        {
                            for (j=0; j<ps.weapreccnt; j++)
                                if (ps.weaprecs[j] == s.picnum)
                                    {i = nexti; continue BOLT;}

                            if (ps.weapreccnt < MAX_WEAPONS)
                                ps.weaprecs[ps.weapreccnt++] = s.picnum;
                        }

                        P_AddAmmo(HANDBOMB_WEAPON,ps,1);
                        A_PlaySound(DUKE_GET,ps.i);

                        if ((ps.gotweapon & (1<<HANDBOMB_WEAPON)) == 0 || s.owner == ps.i)
                        {
                            /* P_AddWeapon(ps,HANDBOMB_WEAPON); */
                            if (!(ps.weaponswitch & 1) && PWEAPON(0, ps.curr_weapon, WorksLike) != HANDREMOTE_WEAPON)
                                P_AddWeaponNoSwitch(ps,HANDBOMB_WEAPON);
                            else P_AddWeapon(ps,HANDBOMB_WEAPON);
                        }

                        if (sprite[s.owner].picnum != APLAYER)
                            P_PalFrom(ps, 32, 0,32,0);

                        if (s.owner != i || ud.respawn_items == 0)
                        {
                            if (s.owner == i && (GametypeFlags[ud.coop] & GAMETYPE_WEAPSTAY))
                                {i = nexti; continue BOLT;}
                            { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                        }
                        else
                        {
                            t[2] = g_itemRespawnTime;
                            A_Spawn(i,RESPAWNMARKERRED);
                            s.cstat = 32768;
                        }
                    }

            if (t[0] < 8) t[0]++;
            {i = nexti; continue BOLT;}
        }

        case REACTORBURNT__STATIC:
        case REACTOR2BURNT__STATIC:
            {i = nexti; continue BOLT;}

        case REACTOR__STATIC:
        case REACTOR2__STATIC:
        {
            var /*int32_t */p:number;
            var ps:DukePlayer_t ;

            if (t[4] == 1)
            {
                for (j = headspritesect[sect]; j >= 0; j = nextspritesect[j])
                {
                    switch (DYNAMICTILEMAP(sprite[j].picnum))
                    {
                    case SECTOREFFECTOR__STATIC:
                        if (sprite[j].lotag == 1)
                        {
                            sprite[j].lotag = 65535;
                            sprite[j].hitag = 65535;
                        }
                        break;
                    case REACTOR__STATIC:
                        sprite[j].picnum = REACTORBURNT;
                        break;
                    case REACTOR2__STATIC:
                        sprite[j].picnum = REACTOR2BURNT;
                        break;
                    case REACTORSPARK__STATIC:
                    case REACTOR2SPARK__STATIC:
                        sprite[j].cstat = 32768;
                        break;
                    }
                }

                {i = nexti; continue BOLT;}
            }

            if (t[1] >= 20)
            {
                t[4] = 1;
                {i = nexti; continue BOLT;}
            }

            var $x = new R(x);
            p = A_FindPlayer(s,$x);
            x = $x.$;
            ps = g_player[p].ps;

            t[2]++;
            if (t[2] == 4) t[2]=0;

            if (x < 4096)
            {
                if ((krand()&255) < 16)
                {
                    if (!A_CheckSoundPlaying(ps.i, DUKE_LONGTERM_PAIN))
                        A_PlaySound(DUKE_LONGTERM_PAIN,ps.i);

                    A_PlaySound(SHORT_CIRCUIT,i);

                    sprite[ps.i].extra --;

                    P_PalFrom(ps, 32, 32,0,0);
                }
                t[0] += 128;
                if (t[3] == 0)
                    t[3] = 1;
            }
            else t[3] = 0;

            if (t[1])
            {
                t[1]++;

                t[4] = s.z;
                s.z = sector[sect].floorz-(krand()%(sector[sect].floorz-sector[sect].ceilingz));

                switch (t[1])
                {
                case 3:
                    //Turn on all of those flashing sectoreffector.
                    A_RadiusDamage(i, 4096,
                                   g_impactDamage<<2,
                                   g_impactDamage<<2,
                                   g_impactDamage<<2,
                                   g_impactDamage<<2);
                    /*
                                                j = headspritestat[STAT_EFFECTOR];
                                                while(j>=0)
                                                {
                                                    if( sprite[j].lotag  == 3 )
                                                        Actor[j].t_data[4]=1;
                                                    else if(sprite[j].lotag == SE_12_LIGHT_SWITCH)
                                                    {
                                                        Actor[j].t_data[4] = 1;
                                                        sprite[j].lotag = 3;
                                                        sprite[j].owner = 0;
                                                        Actor[j].t_data[0] = s.shade;
                                                    }
                                                    j = nextspritestat[j];
                                                }
                    */

                    for (j = headspritestat[STAT_STANDABLE]; j >= 0; j = nextspritestat[j])
                    {
                        if (sprite[j].picnum == MASTERSWITCH)
                            if (sprite[j].hitag == s.hitag)
                                if (sprite[j].yvel == 0)
                                    sprite[j].yvel = 1;
                    }
                    break;

                case 4:
                case 7:
                case 10:
                case 15:
                    for (j = headspritesect[sect]; j >= 0; j = nextspritesect[j])
                        if (j != i)
                        {
                            A_DeleteSprite(j);
                            break;
                        }

                    break;
                }

                for (x=0; x<16; x++)
                    RANDOMSCRAP(s, i);

                s.z = t[4];
                t[4] = 0;
            }
            else
            {
                if (A_IncurDamage(i) >= 0)
                {
                    for (x=0; x<32; x++)
                        RANDOMSCRAP(s, i);
                    if (s.extra < 0)
                        t[1] = 1;
                }
            }
            {i = nexti; continue BOLT;}
        }

        case CAMERA1__STATIC:

            if (t[0] == 0)
            {
                t[1]+=8;
                if (g_damageCameras)
                {
                    if (A_IncurDamage(i) >= 0)
                    {
                        t[0] = 1; // static
                        s.cstat = 32768;
                        for (x=0; x<5; x++) RANDOMSCRAP(s, i);
                        {i = nexti; continue BOLT;}
                    }
                }

                if (s.hitag > 0)
                {
                    if (t[1] < s.hitag)
                        s.ang+=8;
                    else if (t[1] < s.hitag*3)
                        s.ang-=8;
                    else if (t[1] < (s.hitag<<2))
                        s.ang+=8;
                    else
                    {
                        t[1]=8;
                        s.ang+=16;
                    }
                }
            }
            {i = nexti; continue BOLT;}
        }

        if (!g_netServer && ud.multimode < 2 && A_CheckEnemySprite(s))
        {
            if (g_noEnemies == 1)
            {
                s.cstat = 32768;
                {i = nexti; continue BOLT;}
            }
            else if (g_noEnemies == 2)
            {
                s.cstat = 0;
                if (s.extra)
                    s.cstat = 257;
            }
        }

        if (G_HaveActor(sprite[i].picnum))
        {
            var $x = new R(x);
            var /*int32_t */p = A_FindPlayer(s,$x);
            x = $x.$;
            A_Execute(i,p,x);
        }
//BOLT:
        i = nexti;
    }
}

function G_MoveMisc():void  // STATNUM 5
{
    var/*int32_t */i = headspritestat[STAT_MISC];
    BOLT:
    while (i >= 0)
    {
        var/*const int32_t */nexti = nextspritestat[i];

        var/*int32_t */l:number, x:number;
        var t = actor[i].t_data;

        var s = sprite[i];
        var/*int32_t */sect = s.sectnum;  // XXX: not const
        var/*int32_t */switchpicnum:number;

        if (sect < 0 || s.xrepeat == 0)
            { A_DeleteSprite(i); {i = nexti; continue BOLT;} }

        actor[i].bpos.copyFrom(s);//Bmemcpy(&actor[i].bpos.x, s, sizeof(vec3_t));

        switchpicnum = s.picnum;
        if (s.picnum > NUKEBUTTON && s.picnum <= NUKEBUTTON+3)
            switchpicnum = NUKEBUTTON;

        if (s.picnum > GLASSPIECES && s.picnum <= GLASSPIECES+2)
            switchpicnum = GLASSPIECES;

        if (s.picnum == INNERJAW+1)
            switchpicnum--;

        if ((s.picnum == MONEY+1) || (s.picnum == MAIL+1) || (s.picnum == PAPER+1))
            actor[i].floorz = s.z = getflorzofslope(s.sectnum,s.x,s.y);
        else switch (DYNAMICTILEMAP(switchpicnum))
            {
            case APLAYER__STATIC:
                s.cstat = 32768;
                {i = nexti; continue BOLT;}
            case NEON1__STATIC:
            case NEON2__STATIC:
            case NEON3__STATIC:
            case NEON4__STATIC:
            case NEON5__STATIC:
            case NEON6__STATIC:

                if ((g_globalRandom/(s.lotag+1)&31) > 4) s.shade = -127;
                else s.shade = 127;
                {i = nexti; continue BOLT;}

            case BLOODSPLAT1__STATIC:
            case BLOODSPLAT2__STATIC:
            case BLOODSPLAT3__STATIC:
            case BLOODSPLAT4__STATIC:

                if (t[0] == 7*GAMETICSPERSEC) {i = nexti; continue BOLT;}
                s.z += 16+(krand()&15);
                t[0]++;
                if ((t[0]%9) == 0) s.yrepeat++;
                {i = nexti; continue BOLT;}

            case NUKEBUTTON__STATIC:
                //        case NUKEBUTTON+1:
                //        case NUKEBUTTON+2:
                //        case NUKEBUTTON+3:

                if (t[0])
                {
                    t[0]++;
                    if (t[0] == 8) s.picnum = NUKEBUTTON+1;
                    else if (t[0] == 16)
                    {
                        s.picnum = NUKEBUTTON+2;
                        g_player[sprite[s.owner].yvel].ps.fist_incs = 1;
                    }
                    if (g_player[sprite[s.owner].yvel].ps.fist_incs == GAMETICSPERSEC)
                        s.picnum = NUKEBUTTON+3;
                }
                {i = nexti; continue BOLT;}

            case FORCESPHERE__STATIC:
            {
                var/*int32_t */j:number;

                l = s.xrepeat;
                if (t[1] > 0)
                {
                    t[1]--;
                    if (t[1] == 0)
                        { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                }
                if (actor[s.owner].t_data[1] == 0)
                {
                    if (t[0] < 64)
                    {
                        t[0]++;
                        l += 3;
                    }
                }
                else if (t[0] > 64)
                {
                    t[0]--;
                    l -= 3;
                }

                s.x = sprite[s.owner].x;
                s.y = sprite[s.owner].y;
                s.z = sprite[s.owner].z;
                s.ang += actor[s.owner].t_data[0];

                if (l > 64) l = 64;
                else if (l < 1) l = 1;

                s.xrepeat = l;
                s.yrepeat = l;
                s.shade = (l>>1)-48;

                for (j=t[0]; j > 0; j--)
                    A_SetSprite(i,CLIPMASK0);
                {i = nexti; continue BOLT;}
            }

            case WATERSPLASH2__STATIC:
                t[0]++;
                if (t[0] == 1)
                {
                    if (sector[sect].lotag != ST_1_ABOVE_WATER && sector[sect].lotag != ST_2_UNDERWATER)
                        { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                    /*
                    else
                    {
                        l = getflorzofslope(sect,s.x,s.y)-s.z;
                        if( l > (16<<8) ) { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                    }
                    else
                    */
                    if (!S_CheckSoundPlaying(i,ITEM_SPLASH))
                        A_PlaySound(ITEM_SPLASH,i);
                }
                if (t[0] == 3)
                {
                    t[0] = 0;
                    t[1]++;  // WATERSPLASH_T2
                }
                if (t[1] == 5)
                    A_DeleteSprite(i);
                {i = nexti; continue BOLT;}

            case FRAMEEFFECT1_13__STATIC:
                if (window.PLUTOPAK) {i = nexti; continue BOLT;}	// JBF: ideally this should never happen...
            case FRAMEEFFECT1__STATIC:

                if (s.owner >= 0)
                {
                    t[0]++;

                    if (t[0] > 7)
                    {
                        { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                    }
                    else if (t[0] > 4)
                        s.cstat |= 512+2;
                    else if (t[0] > 2)
                        s.cstat |= 2;
                    s.xoffset = sprite[s.owner].xoffset;
                    s.yoffset = sprite[s.owner].yoffset;
                }
                {i = nexti; continue BOLT;}
            case INNERJAW__STATIC:
            {
                //        case INNERJAW+1:

                var $x = new R(x);
                var/*int32_t */p = A_FindPlayer(s,$x);
                x = $x.$;
                if (x < 512)
                {
                    P_PalFrom(g_player[p].ps, 32, 32,0,0);
                    sprite[g_player[p].ps.i].extra -= 4;
                }
            }

            case FIRELASER__STATIC:
                if (s.extra != 5)
                    s.extra = 5;
                else { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                break;
            case TONGUE__STATIC:
                { A_DeleteSprite(i); {i = nexti; continue BOLT;} }

            case MONEY__STATIC:
            case MAIL__STATIC:
            case PAPER__STATIC:

                s.xvel = (krand()&7)+(sintable[actor[i].t_data[0]&2047]>>9);
                actor[i].t_data[0] += (krand()&63);
                if ((actor[i].t_data[0]&2047) > 512 && (actor[i].t_data[0]&2047) < 1596)
                {
                    if (sector[sect].lotag == ST_2_UNDERWATER)
                    {
                        if (s.zvel < 64)
                            s.zvel += (g_spriteGravity>>5)+(krand()&7);
                    }
                    else if (s.zvel < 144)
                        s.zvel += (g_spriteGravity>>5)+(krand()&7);
                }

                A_SetSprite(i,CLIPMASK0);

                if ((krand()&3) == 0)
                    setsprite(i,/*(vec3_t *)*/s);

                if (s.sectnum == -1)
                    { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                l = getflorzofslope(s.sectnum,s.x,s.y);

                if (s.z > l)
                {
                    var/*int32_t */j:number;

                    s.z = l;

                    A_AddToDeleteQueue(i);
                    sprite[i].picnum ++;

                    for (j = headspritestat[STAT_MISC]; j >= 0; j = nextspritestat[j] /*(STAT_MISC, j)*/)
                        if (sprite[j].picnum == BLOODPOOL)
                            if (ldist(s,sprite[j]) < 348)
                            {
                                s.pal = 2;
                                break;
                            }
                }

                break;

            case JIBS1__STATIC:
            case JIBS2__STATIC:
            case JIBS3__STATIC:
            case JIBS4__STATIC:
            case JIBS5__STATIC:
            case JIBS6__STATIC:
            case HEADJIB1__STATIC:
            case ARMJIB1__STATIC:
            case LEGJIB1__STATIC:
            case LIZMANHEAD1__STATIC:
            case LIZMANARM1__STATIC:
            case LIZMANLEG1__STATIC:
            case DUKETORSO__STATIC:
            case DUKEGUN__STATIC:
            case DUKELEG__STATIC:

                if (s.xvel > 0) s.xvel--;
                else s.xvel = 0;

                if (++t[5] == (30*10))
                    { A_DeleteSprite(i); {i = nexti; continue BOLT;} }

                if (s.zvel > 1024 && s.zvel < 1280)
                {
                    setsprite(i,/*(vec3_t *)*/s);
                    sect = s.sectnum;
                }
                var $x = new R(x);
                var $l = new R(l);
                getzsofslope(sect,s.x,s.y,$x,$l);
                x = $x.$;
                l = $l.$;
                if (x == l || sect < 0 || sect >= MAXSECTORS) { A_DeleteSprite(i); {i = nexti; continue BOLT;} }

                if (s.z < l-(2<<8))
                {
                    if (t[1] < 2) t[1]++;
                    else if (sector[sect].lotag != ST_2_UNDERWATER)
                    {
                        t[1] = 0;
                        if (s.picnum == DUKELEG || s.picnum == DUKETORSO || s.picnum == DUKEGUN)
                        {
                            if (t[0] > 6) t[0] = 0;
                            else t[0]++;
                        }
                        else
                        {
                            if (t[0] > 2)
                                t[0] = 0;
                            else t[0]++;
                        }
                    }

                    if (s.zvel < 6144)
                    {
                        if (sector[sect].lotag == ST_2_UNDERWATER)
                        {
                            if (s.zvel < 1024)
                                s.zvel += 48;
                            else s.zvel = 1024;
                        }
                        else s.zvel += g_spriteGravity-50;
                    }

                    s.x += (s.xvel*sintable[(s.ang+512)&2047])>>14;
                    s.y += (s.xvel*sintable[s.ang&2047])>>14;
                    s.z += s.zvel;

                }
                else
                {
                    if (t[2] == 0)
                    {
                        if (s.sectnum == -1)
                            { A_DeleteSprite(i); {i = nexti; continue BOLT;} }

                        if ((sector[s.sectnum].floorstat&2))
                            { A_DeleteSprite(i); {i = nexti; continue BOLT;} }

                        t[2]++;
                    }
                    l = getflorzofslope(s.sectnum,s.x,s.y);

                    s.z = l-(2<<8);
                    s.xvel = 0;

                    if (s.picnum == JIBS6)
                    {
                        t[1]++;
                        if ((t[1]&3) == 0 && t[0] < 7)
                            t[0]++;
                        if (t[1] > 20)
                            { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                    }
                    else
                    {
                        s.picnum = JIBS6;
                        t[0] = 0;
                        t[1] = 0;
                    }

                }
                {i = nexti; continue BOLT;}

            case BLOODPOOL__STATIC:
            case PUKE__STATIC:
            {
                var/*int32_t */p:number;
                var ps:DukePlayer_t;

                if (t[0] == 0)
                {
                    t[0] = 1;
                    if (sector[sect].floorstat&2)
                    {
                        { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                    }
                    else A_AddToDeleteQueue(i);
                }

                A_Fall(i);

                var $x = new R(x);
                p = A_FindPlayer(s,$x);
                x = $x.$;

                ps = g_player[p].ps;

                s.z = actor[i].floorz-(ZOFFSET);

                if (t[2] < 32)
                {
                    t[2]++;
                    if (actor[i].picnum == TIRE)
                    {
                        if (s.xrepeat < 64 && s.yrepeat < 64)
                        {
                            s.xrepeat += krand()&3;
                            s.yrepeat += krand()&3;
                        }
                    }
                    else
                    {
                        if (s.xrepeat < 32 && s.yrepeat < 32)
                        {
                            s.xrepeat += krand()&3;
                            s.yrepeat += krand()&3;
                        }
                    }
                }

                if (x < 844 && s.xrepeat > 6 && s.yrepeat > 6)
                {
                    if (s.pal == 0 && s.picnum != PUKE && (krand()&255) < 16)
                    {
                        if (ps.inv_amount[GET_BOOTS] > 0)
                            ps.inv_amount[GET_BOOTS]--;
                        else
                        {
                            if (!A_CheckSoundPlaying(ps.i,DUKE_LONGTERM_PAIN))
                                A_PlaySound(DUKE_LONGTERM_PAIN,ps.i);
                            sprite[ps.i].extra --;

                            P_PalFrom(ps, 32, 16,0,0);
                        }
                    }

                    if (t[1] == 1) {i = nexti; continue BOLT;}
                    t[1] = 1;

                    if (actor[i].picnum == TIRE)
                        ps.footprintcount = 10;
                    else ps.footprintcount = 3;

                    ps.footprintpal = s.pal;
                    ps.footprintshade = s.shade;

                    if (t[2] == 32)
                    {
                        s.xrepeat -= 6;
                        s.yrepeat -= 6;
                    }
                }
                else t[1] = 0;
                {i = nexti; continue BOLT;}
            }

            case BURNING__STATIC:
            case BURNING2__STATIC:
            case FECES__STATIC:
            case WATERBUBBLE__STATIC:
            case SMALLSMOKE__STATIC:
            case EXPLOSION2__STATIC:
            case SHRINKEREXPLOSION__STATIC:
            case EXPLOSION2BOT__STATIC:
            case BLOOD__STATIC:
            case LASERSITE__STATIC:
            case FORCERIPPLE__STATIC:
            case TRANSPORTERSTAR__STATIC:
            case TRANSPORTERBEAM__STATIC:
            {
                if (!G_HaveActor(sprite[i].picnum))
                    {i = nexti; continue BOLT;}
                {
                    var $x = new R(x);
                    var/*int32_t */p = A_FindPlayer(s,$x);
                    x = $x.$;
                    A_Execute(i,p,x);
                }
                {i = nexti; continue BOLT;}
            }

            case SHELL__STATIC:
            case SHOTGUNSHELL__STATIC:

                A_SetSprite(i,CLIPMASK0);

                if (sect < 0 || (sector[sect].floorz + 256) < s.z)
                    { A_DeleteSprite(i); {i = nexti; continue BOLT;} }

                if (sector[sect].lotag == ST_2_UNDERWATER)
                {
                    t[1]++;
                    if (t[1] > 8)
                    {
                        t[1] = 0;
                        t[0]++;
                        t[0] &= 3;
                    }
                    if (s.zvel < 128) s.zvel += int32(g_spriteGravity/13); // 8
                    else s.zvel -= 64;
                    if (s.xvel > 0)
                        s.xvel -= 4;
                    else s.xvel = 0;
                }
                else
                {
                    t[1]++;
                    if (t[1] > 3)
                    {
                        t[1] = 0;
                        t[0]++;
                        t[0] &= 3;
                    }
                    if (s.zvel < 512) s.zvel += int32(g_spriteGravity/3); // 52;
                    if (s.xvel > 0)
                        s.xvel --;
                    //                else { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
                }

                {i = nexti; continue BOLT;}

            case GLASSPIECES__STATIC:
                //        case GLASSPIECES+1:
                //        case GLASSPIECES+2:

                A_Fall(i);

                if (s.zvel > 4096) s.zvel = 4096;
                if (sect < 0)
                    { A_DeleteSprite(i); {i = nexti; continue BOLT;} }

                if (s.z == actor[i].floorz-(ZOFFSET) && t[0] < 3)
                {
                    s.zvel = -((3-t[0])<<8)-(krand()&511);
                    if (sector[sect].lotag == ST_2_UNDERWATER)
                        s.zvel >>= 1;
                    s.xrepeat >>= 1;
                    s.yrepeat >>= 1;
                    if (rnd(96))
                        setsprite(i,/*(vec3_t *)*/s);
                    t[0]++;//Number of bounces
                }
                else if (t[0] == 3)
                    { A_DeleteSprite(i); {i = nexti; continue BOLT;} }

                if (s.xvel > 0)
                {
                    s.xvel -= 2;
                    s.cstat = ((s.xvel&3)<<2);
                }
                else s.xvel = 0;

                A_SetSprite(i,CLIPMASK0);

                {i = nexti; continue BOLT;}
            }

        if (sprite[i].picnum >= SCRAP6 && sprite[i].picnum <= SCRAP5+3)
        {
            if (s.xvel > 0)
                s.xvel--;
            else s.xvel = 0;

            if (s.zvel > 1024 && s.zvel < 1280)
            {
                setsprite(i,/*(vec3_t *)*/s);
                sect = s.sectnum;
            }

            if (s.z < sector[sect].floorz-(2<<8))
            {
                if (t[1] < 1) t[1]++;
                else
                {
                    t[1] = 0;

                    if (s.picnum < SCRAP6+8)
                    {
                        if (t[0] > 6)
                            t[0] = 0;
                        else t[0]++;
                    }
                    else
                    {
                        if (t[0] > 2)
                            t[0] = 0;
                        else t[0]++;
                    }
                }
                if (s.zvel < 4096) s.zvel += g_spriteGravity-50;
                s.x += (s.xvel*sintable[(s.ang+512)&2047])>>14;
                s.y += (s.xvel*sintable[s.ang&2047])>>14;
                s.z += s.zvel;
            }
            else
            {
                if (s.picnum == SCRAP1 && s.yvel > 0)
                {
                    var/*int32_t */j = A_Spawn(i,s.yvel);

                    setsprite(j,/*(vec3_t *)*/s);
                    A_GetZLimits(j);
                    sprite[j].hitag = sprite[j].lotag = 0;
                }

                { A_DeleteSprite(i); {i = nexti; continue BOLT;} }
            }
            {i = nexti; continue BOLT;}
        }

//BOLT:
        i = nexti;
    }
}


// i: SE spritenum
function HandleSE31(/*int32_t */i:number, /*int32_t */setfloorzp:number, /*int32_t */zref:number, /*int32_t */t2val:number, /*int32_t */movesignexp:number):void
{
    var s = sprite[i];
    var sc = sector[sprite[i].sectnum];
    var t = actor[i].t_data;

    if (klabs(sc.floorz - zref) < sprite[i].yvel)
    {
        if (setfloorzp)
            sc.floorz = zref;

        t[2] = t2val;
        t[0] = 0;
        t[3] = s.hitag;
        A_CallSound(s.sectnum,i);
    }
    else
    {
        var/*int32_t */j:number;
        var/*int32_t */l = ksgn(movesignexp)*sprite[i].yvel;

        sc.floorz += l;

        for (j = headspritesect[s.sectnum]; j >= 0; j = nextspritesect[j])
        {
            if (sprite[j].picnum == APLAYER && sprite[j].owner >= 0)
                if (g_player[sprite[j].yvel].ps.on_ground == 1)
                    g_player[sprite[j].yvel].ps.pos.z += l;

            if (sprite[j].zvel == 0 && sprite[j].statnum != STAT_EFFECTOR && sprite[j].statnum != STAT_PROJECTILE)
            {
                actor[j].bpos.z = sprite[j].z += l;
                actor[j].floorz = sc.floorz;
            }
        }
    }
}

// s: SE sprite
function MaybeTrainKillPlayer(s:spritetype , /*int32_t */dosetopos:number):void
{
    var/*int32_t*/ p:number;

    for (p = 0; p != -1; p = connectpoint2[p])
    {
        var ps = g_player[p].ps;

        if (sprite[ps.i].extra > 0)
        {
            var/*int16_t */k = ps.cursectnum;

            var $k = new R(k);
            updatesector(ps.pos.x,ps.pos.y,$k);
            k = $k.$;
            if ((k == -1 && ud.noclip == 0) || (k == s.sectnum && ps.cursectnum != s.sectnum))
            {
                ps.pos.x = s.x;
                ps.pos.y = s.y;

                if (dosetopos)
                {
                    ps.opos.x = ps.pos.x;
                    ps.opos.y = ps.pos.y;
                }

                ps.cursectnum = s.sectnum;

                setsprite(ps.i,/*(vec3_t *)*/s);
                P_QuickKill(ps);
            }
        }
    }
}

// i: SE spritenum
function MaybeTrainKillEnemies(/*int32_t */i:number, /*int32_t */numguts:number):void
{
    var/*int32_t */j = headspritesect[sprite[sprite[i].owner].sectnum];

    while (j >= 0)
    {
        var/*const int32_t */nextj = nextspritesect[j];

        if (sprite[j].extra >= 0 && sprite[j].statnum == STAT_ACTOR && A_CheckEnemySprite(sprite[j]))
        {
            var/*int16_t */k = sprite[j].sectnum;

            var $k = new R(k);
            updatesector(sprite[j].x,sprite[j].y,$k);
            k = $k.$;
            if (k == sprite[i].sectnum)
            {
                A_DoGutsDir(j,JIBS6,numguts);
                A_PlaySound(SQUISHED,j);
                A_DeleteSprite(j);
            }
        }

        j = nextj;
    }
}

var G_MoveEffectors_count = 0;
function G_MoveEffectors():void   //STATNUM 3
{
    var wal: walltype, walIdx:number;
    var /*int32_t */q=0, j:number, k:number, l:number, m:number, x:number;
    var /*int32_t */i = headspritestat[STAT_EFFECTOR];

    fricxv = fricyv = 0;
    
    dlog(DEBUG_MOVE_EFFECTORS, "G_MoveEffectors %i\n", G_MoveEffectors_count++);
    BOLT:
    while (i >= 0)
    {
        var /*const int32_t */nexti = nextspritestat[i];
        var s = sprite[i];

        var sc = sector[s.sectnum];
        var/*const int32_t */st = s.lotag;
        var/*const int32_t */sh = s.hitag;

        var/*int32_t *const */t = actor[i].t_data;

        switch (st)
        {
        case SE_0_ROTATING_SECTOR:
        {
            var/*int32_t */zchange = 0;

            j = s.owner;

            if (sprite[j].lotag == UINT16_MAX)
                {A_DeleteSprite(i); {i = nexti; continue BOLT;}}

            q = sc.extra>>3;
            l = 0;

            if (sc.lotag == ST_30_ROTATE_RISE_BRIDGE)
            {
                q >>= 2;

                if (sprite[i].extra == 1)
                {
                    if (actor[i].tempang < 256)
                    {
                        actor[i].tempang += 4;
                        if (actor[i].tempang >= 256)
                            A_CallSound(s.sectnum,i);
                        if (s.clipdist) l = 1;
                        else l = -1;
                    }
                    else actor[i].tempang = 256;

                    if (sc.floorz > s.z)   //z's are touching
                    {
                        sc.floorz -= 512;
                        zchange = -512;
                        if (sc.floorz < s.z)
                            sc.floorz = s.z;
                    }
                    else if (sc.floorz < s.z)   //z's are touching
                    {
                        sc.floorz += 512;
                        zchange = 512;
                        if (sc.floorz > s.z)
                            sc.floorz = s.z;
                    }
                }
                else if (sprite[i].extra == 3)
                {
                    if (actor[i].tempang > 0)
                    {
                        actor[i].tempang -= 4;
                        if (actor[i].tempang <= 0)
                            A_CallSound(s.sectnum,i);
                        if (s.clipdist) l = -1;
                        else l = 1;
                    }
                    else actor[i].tempang = 0;

                    if (sc.floorz > actor[i].t_data[3])   //z's are touching
                    {
                        sc.floorz -= 512;
                        zchange = -512;
                        if (sc.floorz < actor[i].t_data[3])
                            sc.floorz = actor[i].t_data[3];
                    }
                    else if (sc.floorz < actor[i].t_data[3])   //z's are touching
                    {
                        sc.floorz += 512;
                        zchange = 512;
                        if (sc.floorz > actor[i].t_data[3])
                            sc.floorz = actor[i].t_data[3];
                    }
                }
            }
            else
            {
                if (actor[j].t_data[0] == 0) break;
                if (actor[j].t_data[0] == 2) {A_DeleteSprite(i); {i = nexti; continue BOLT;}}

                if (sprite[j].ang > 1024)
                    l = -1;
                else l = 1;
                if (t[3] == 0)
                    t[3] = ldist(s,sprite[j]);
                s.xvel = t[3];
                s.x = sprite[j].x;
                s.y = sprite[j].y;
            }

            s.ang += (l*q);
            t[2] += (l*q);

            if (l && (sc.floorstat&64))
            {
                var/*int32_t */p:number;

                for (p = 0; p != -1; p = connectpoint2[p])
                {
                    var ps = g_player[p].ps;

                    if (ps.cursectnum == s.sectnum && ps.on_ground == 1)
                    {

                        ps.ang += (l*q);
                        ps.ang &= 2047;

                        ps.pos.z += zchange;

                        var $m = new R(m);
                        var $x = new R(x);
                        rotatepoint(sprite[j].x,sprite[j].y,ps.pos.x,ps.pos.y,(q*l),$m,$x);
                        m = $m.$;
                        x = $x.$;

                        ps.bobposx += m-ps.pos.x;
                        ps.bobposy += x-ps.pos.y;

                        ps.pos.x = m;
                        ps.pos.y = x;

                        if (sprite[ps.i].extra <= 0)
                        {
                            sprite[ps.i].x = m;
                            sprite[ps.i].y = x;
                        }
                    }
                }

                for (p = headspritesect[s.sectnum]; p >= 0; p = nextspritesect[p] /*p = headspritesect[s.sectnum]; p >= 0; p = nextspritesect[p]*/)
                {
                    // KEEPINSYNC1
                    if (sprite[p].statnum != STAT_EFFECTOR && sprite[p].statnum != STAT_PROJECTILE)
                        if (sprite[p].picnum != LASERLINE)
                        {
                            if (sprite[p].picnum == APLAYER && sprite[p].owner >= 0)
                                continue;

                            sprite[p].ang += (l*q);
                            sprite[p].ang &= 2047;

                            sprite[p].z += zchange;

                            // interpolation fix
                            actor[p].bpos.x = sprite[p].x;
                            actor[p].bpos.y = sprite[p].y;

                            if (move_rotfixed_sprite(p, j, t[2])) {
                                var $x = new R(sprite[p].x);
                                var $y = new R(sprite[p].y);
                                rotatepoint(sprite[j].x,sprite[j].y,sprite[p].x,sprite[p].y,(q*l),$x,$y);
                                sprite[p].x = $x.$;
                                sprite[p].y = $y.$;
                            }
                        }
                }

            }
            else if (l==0 && (sc.floorstat&64))
            {
                var/*int32_t */p:number;

                // fix for jittering of sprites in halted rotating sectors
                for (p = headspritesect[s.sectnum]; p >= 0; p = nextspritesect[p])
                {
                    // KEEPINSYNC1
                    if (sprite[p].statnum != STAT_EFFECTOR && sprite[p].statnum != STAT_PROJECTILE)
                        if (sprite[p].picnum != LASERLINE)
                        {
                            if (sprite[p].picnum == APLAYER && sprite[p].owner >= 0)
                                continue;

                            actor[p].bpos.x = sprite[p].x;
                            actor[p].bpos.y = sprite[p].y;
                        }
                }
            }

            A_MoveSector(i);
        }
        break;

        case SE_1_PIVOT: //Nothing for now used as the pivot
            if (s.owner == -1) //Init
            {
                s.owner = i;

                for (j = headspritestat[STAT_EFFECTOR]; j >= 0; j = nextspritestat[j])
                {
                    if (sprite[j].lotag == SE_19_EXPLOSION_LOWERS_CEILING && sprite[j].hitag == sh)
                    {
                        t[0] = 0;
                        break;
                    }
                }
            }
            break;

        case 6:
            k = sc.extra;

            if (t[4] > 0)
            {
                t[4]--;
                if (t[4] >= (k-(k>>3)))
                    s.xvel -= (k>>5);
                if (t[4] > ((k>>1)-1) && t[4] < (k-(k>>3)))
                    s.xvel = 0;
                if (t[4] < (k>>1))
                    s.xvel += (k>>5);
                if (t[4] < ((k>>1)-(k>>3)))
                {
                    t[4] = 0;
                    s.xvel = k;
                }
            }
            else s.xvel = k;

            for (j = headspritestat[STAT_EFFECTOR]; j >= 0; j = nextspritestat[j])
            {
                if (sprite[j].lotag == SE_14_SUBWAY_CAR && sh == sprite[j].hitag && actor[j].t_data[0] == t[0])
                {
                    sprite[j].xvel = s.xvel;
                    //                        if( t[4] == 1 )
                    {
                        if (actor[j].t_data[5] == 0)
                            actor[j].t_data[5] = dist(sprite[j],s);
                        x = ksgn(dist(sprite[j],s)-actor[j].t_data[5]);
                        if (sprite[j].extra)
                            x = -x;
                        s.xvel += x;
                    }
                    actor[j].t_data[4] = t[4];
                }
            }
            x = 0;  // XXX: This assignment is dead?


        case SE_14_SUBWAY_CAR:
            if (s.owner==-1)
                s.owner = A_FindLocator(int16(t[3]),int16(t[0]));

            if (s.owner == -1)
            {
                // debugging subway cars (mapping-wise) is freakin annoying
                // let's at least have a helpful message...
                Bsprintf(tempbuf,"Could not find any locators in sector %d"+
                         " for SE# 6 or 14 with hitag %d.\n", /*(int)*/t[0], /*(int)*/t[3]);
                G_GameExit(tempbuf.toString());
            }

            j = ldist(sprite[s.owner],s);

            if (j < 1024)
            {
                if (st==6)
                    if (sprite[s.owner].hitag&1)
                        t[4]=sc.extra; //Slow it down
                t[3]++;
                s.owner = A_FindLocator(t[3],t[0]);
                if (s.owner==-1)
                {
                    t[3]=0;
                    s.owner = A_FindLocator(0,t[0]);
                }
            }

            if (s.xvel)
            {
                var/*int32_t */p:number;
//#ifdef YAX_ENABLE
                var/*int32_t */firstrun = 1;
//#endif
                x = getangle(sprite[s.owner].x-s.x,sprite[s.owner].y-s.y);
                q = G_GetAngleDelta(s.ang,x)>>3;

                t[2] += q;
                s.ang += q;

                if (s.xvel == sc.extra)
                {
                    if ((sc.floorstat&1) == 0 && (sc.ceilingstat&1) == 0)
                    {
                        if (!S_CheckSoundPlaying(i,actor[i].lastvx))
                            A_PlaySound(actor[i].lastvx,i);
                    }
                    else if (ud.monsters_off == 0 && sc.floorpal == 0 && (sc.floorstat&1) && rnd(8))
                    {
                        var $x = new R(x);
                        p = A_FindPlayer(s,$x);
                        x = $x.$;
                        if (x < 20480)
                        {
                            j = s.ang;
                            s.ang = getangle(s.x-g_player[p].ps.pos.x,s.y-g_player[p].ps.pos.y);
                            A_Shoot(i,RPG);
                            s.ang = j;
                        }
                    }
                }

                if (s.xvel <= 64 && (sc.floorstat&1) == 0 && (sc.ceilingstat&1) == 0)
                    S_StopEnvSound(actor[i].lastvx,i);

                if ((sc.floorz-sc.ceilingz) < (108<<8))
                {
                    if (ud.noclip == 0 && s.xvel >= 192)
                        MaybeTrainKillPlayer(s, 0);
                }

                m = (s.xvel*sintable[(s.ang+512)&2047])>>14;
                x = (s.xvel*sintable[s.ang&2047])>>14;

                for (p = 0; p != -1; p = connectpoint2[p])
                {
                    var ps = g_player[p].ps;

                    if (ps.cursectnum < 0)
                    {
                        // might happen when squished into void space
//                        initprintf("cursectnum < 0!\n");
                        break;
                    }

                    if (sector[ps.cursectnum].lotag != ST_2_UNDERWATER)
                    {
                        if (g_playerSpawnPoints[p].os == s.sectnum)
                        {
                            g_playerSpawnPoints[p].ox += m;
                            g_playerSpawnPoints[p].oy += x;
                        }

                        if (s.sectnum == sprite[ps.i].sectnum
//#ifdef YAX_ENABLE
                                || (t[9]>=0 && t[9] == sprite[ps.i].sectnum)
//#endif
                            )
                        {
                            var $x = new R(ps.pos.x);
                            var $y = new R(ps.pos.y);
                            rotatepoint(s.x,s.y,ps.pos.x,ps.pos.y,q,$x,$y);
                            ps.pos.x = $x.$;
                            ps.pos.y = $y.$;

                            ps.pos.x += m;
                            ps.pos.y += x;

                            ps.bobposx += m;
                            ps.bobposy += x;

                            ps.ang += q;
                            ps.ang &= 2047;

                            if (g_netServer || numplayers > 1)
                            {
                                ps.opos.x = ps.pos.x;
                                ps.opos.y = ps.pos.y;
                            }
                            if (sprite[ps.i].extra <= 0)
                            {
                                sprite[ps.i].x = ps.pos.x;
                                sprite[ps.i].y = ps.pos.y;
                            }
                        }
                    }
                }

                // NOTE: special loop handling
                j = headspritesect[s.sectnum];
                while (j >= 0)
                {
                    // KEEPINSYNC2
                    // XXX: underwater check?
                    if (sprite[j].statnum != STAT_PLAYER && sector[sprite[j].sectnum].lotag != ST_2_UNDERWATER &&
                            (sprite[j].picnum != SECTOREFFECTOR || (sprite[j].lotag == SE_49_POINT_LIGHT||sprite[j].lotag == SE_50_SPOT_LIGHT))
                            && sprite[j].picnum != LOCATORS)
                    {
                        // fix interpolation
                        if (numplayers < 2 && !g_netServer)
                        {
                            actor[j].bpos.x = sprite[j].x;
                            actor[j].bpos.y = sprite[j].y;
                        }
                        if (move_rotfixed_sprite(j, indexOf(s,sprite), t[2])) {
                            var $x = new R(sprite[j].x);
                            var $y = new R(sprite[j].y);
                            rotatepoint(s.x,s.y,sprite[j].x,sprite[j].y,q,$x,$y);
                            sprite[j].x = $x.$;
                            sprite[j].y = $y.$;
                        }

                        sprite[j].x+= m;
                        sprite[j].y+= x;

                        sprite[j].ang+=q;

                        if (g_netServer || numplayers > 1)
                        {
                            actor[j].bpos.x = sprite[j].x;
                            actor[j].bpos.y = sprite[j].y;
                        }
                    }
                    j = nextspritesect[j];
//#ifdef YAX_ENABLE
                    if (j < 0)
                    {
                        if (t[9]>=0 && firstrun)
                        {
                            firstrun = 0;
                            j = headspritesect[t[9]];
                        }
                    }
//#endif
                }

                A_MoveSector(i);
                setsprite(i,/*(vec3_t *)*/s);

                if ((sc.floorz-sc.ceilingz) < (108<<8))
                {
                    if (ud.noclip == 0 && s.xvel >= 192)
                        MaybeTrainKillPlayer(s, 1);

                    MaybeTrainKillEnemies(i, 72);
                }
            }
            else
            {
                // fix for jittering of sprites in halted subways
                for (j = headspritesect[s.sectnum]; j >= 0; j = nextspritesect[j])
                {
                    // KEEPINSYNC2
                    if (sprite[j].statnum != STAT_PLAYER && sector[sprite[j].sectnum].lotag != ST_2_UNDERWATER &&
                            (sprite[j].picnum != SECTOREFFECTOR || (sprite[j].lotag == SE_49_POINT_LIGHT||sprite[j].lotag == SE_50_SPOT_LIGHT))
                            && sprite[j].picnum != LOCATORS)
                    {
                        actor[j].bpos.x = sprite[j].x;
                        actor[j].bpos.y = sprite[j].y;
                    }
                }
            }

            break;

        case SE_30_TWO_WAY_TRAIN:
            if (s.owner == -1)
            {
                t[3] = !t[3]?1:0;
                s.owner = A_FindLocator(t[3],t[0]);
            }
            else
            {

                if (t[4] == 1) // Starting to go
                {
                    if (ldist(sprite[s.owner],s) < (2048-128))
                        t[4] = 2;
                    else
                    {
                        if (s.xvel == 0)
                            G_OperateActivators(s.hitag+(!t[3]?1:0),-1);
                        if (s.xvel < 256)
                            s.xvel += 16;
                    }
                }
                if (t[4] == 2)
                {
                    l = FindDistance2D(sprite[s.owner].x-s.x,sprite[s.owner].y-s.y);

                    if (l <= 128)
                        s.xvel = 0;

                    if (s.xvel > 0)
                        s.xvel -= 16;
                    else
                    {
                        s.xvel = 0;
                        G_OperateActivators(s.hitag+int16(t[3]),-1);
                        s.owner = -1;
                        s.ang += 1024;
                        t[4] = 0;
                        G_OperateForceFields(i,s.hitag);

                        for (j = headspritesect[s.sectnum]; j >= 0; j = nextspritesect[j])
                        {
                            if (sprite[j].picnum != SECTOREFFECTOR && sprite[j].picnum != LOCATORS)
                            {
                                actor[j].bpos.x = sprite[j].x;
                                actor[j].bpos.y = sprite[j].y;
                            }
                        }

                    }
                }
            }

            if (s.xvel)
            {
                var/*int32_t*/ p:number;

                l = (s.xvel*sintable[(s.ang+512)&2047])>>14;
                x = (s.xvel*sintable[s.ang&2047])>>14;

                if ((sc.floorz-sc.ceilingz) < (108<<8))
                    if (ud.noclip == 0)
                        MaybeTrainKillPlayer(s, 0);

                for (p = 0; p != -1; p = connectpoint2[p])
                {
                    var ps = g_player[p].ps;

                    if (sprite[ps.i].sectnum == s.sectnum)
                    {
                        ps.pos.x += l;
                        ps.pos.y += x;

                        if (g_netServer || numplayers > 1)
                        {
                            ps.opos.x = ps.pos.x;
                            ps.opos.y = ps.pos.y;
                        }

                        ps.bobposx += l;
                        ps.bobposy += x;
                    }

                    if (g_playerSpawnPoints[p].os == s.sectnum)
                    {
                        g_playerSpawnPoints[p].ox += l;
                        g_playerSpawnPoints[p].oy += x;
                    }
                }

                for (j = headspritesect[s.sectnum]; j >= 0; j = nextspritesect[j])
                {
                    // TODO: replace some checks for SE 49/50 with statnum LIGHT instead?
                    if ((sprite[j].picnum != SECTOREFFECTOR || sprite[j].lotag==SE_49_POINT_LIGHT || sprite[j].lotag==SE_50_SPOT_LIGHT)
                            && sprite[j].picnum != LOCATORS)
                    {
                        if (numplayers < 2 && !g_netServer)
                        {
                            actor[j].bpos.x = sprite[j].x;
                            actor[j].bpos.y = sprite[j].y;
                        }

                        sprite[j].x += l;
                        sprite[j].y += x;

                        if (g_netServer || numplayers > 1)
                        {
                            actor[j].bpos.x = sprite[j].x;
                            actor[j].bpos.y = sprite[j].y;
                        }
                    }
                }

                A_MoveSector(i);
                setsprite(i,s);

                if (sc.floorz-sc.ceilingz < (108<<8))
                {
                    if (ud.noclip == 0)
                        MaybeTrainKillPlayer(s, 1);

                    MaybeTrainKillEnemies(i, 24);
                }
            }

            break;


        case SE_2_EARTHQUAKE://Quakes
            if (t[4] > 0 && t[0] == 0)
            {
                if (t[4] < sh)
                    t[4]++;
                else t[0] = 1;
            }

            if (t[0] > 0)
            {
                var/*int32_t */p:number, nextj:number;

                t[0]++;

                s.xvel = 3;

                if (t[0] > 96)
                {
                    t[0] = -1; //Stop the quake
                    t[4] = -1;
                    {A_DeleteSprite(i); {i = nexti; continue BOLT;}}
                }
                else
                {
                    if ((t[0]&31) ==  8)
                    {
                        g_earthquakeTime = 48;
                        A_PlaySound(EARTHQUAKE,g_player[screenpeek].ps.i);
                    }

                    if (klabs(sc.floorheinum-t[5]) < 8)
                        sc.floorheinum = t[5];
                    else sc.floorheinum += (ksgn(t[5]-sc.floorheinum)<<4);
                }

                m = (s.xvel*sintable[(s.ang+512)&2047])>>14;
                x = (s.xvel*sintable[s.ang&2047])>>14;


                for (p = 0; p != -1; p = connectpoint2[p])
                {
                    var ps = g_player[p].ps;

                    if (ps.cursectnum == s.sectnum && ps.on_ground)
                    {
                        ps.pos.x += m;
                        ps.pos.y += x;

                        ps.bobposx += m;
                        ps.bobposy += x;
                    }
                }

                for (j = headspritesect[s.sectnum];j >= 0 && (nextj = nextspritesect[j], 1); j = nextj)
                {
                    if (sprite[j].picnum != SECTOREFFECTOR)
                    {
                        sprite[j].x+=m;
                        sprite[j].y+=x;
                        setsprite(j,sprite[j]);
                    }
                }

                A_MoveSector(i);
                setsprite(i,s);
            }
            break;

            //Flashing sector lights after reactor EXPLOSION2

        case SE_3_RANDOM_LIGHTS_AFTER_SHOT_OUT:
        {
            if (t[4] == 0) break;

            //    if(t[5] > 0) { t[5]--; break; }

            if ((g_globalRandom/(sh+1)&31) < 4 && !t[2])
            {
                //       t[5] = 4+(g_globalRandom&7);
                sc.ceilingpal = s.owner>>8;
                sc.floorpal = s.owner&0xff;
                t[0] = s.shade + (g_globalRandom&15);
            }
            else
            {
                //       t[5] = 4+(g_globalRandom&3);
                sc.ceilingpal = s.pal;
                sc.floorpal = s.pal;
                t[0] = t[3];
            }

            sc.ceilingshade = t[0];
            sc.floorshade = t[0];

            walIdx = sc.wallptr, wal = wall[walIdx];

            for (x=sc.wallnum; x > 0; x--,wal = wall[++walIdx])
            {
                if (wal.hitag != 1)
                {
                    wal.shade = t[0];
                    if ((wal.cstat&2) && wal.nextwall >= 0)
                    {
                        wall[wal.nextwall].shade = wal.shade;
                    }
                }
            }

            break;
        }

        case SE_4_RANDOM_LIGHTS:

            if ((g_globalRandom/(sh+1)&31) < 4)
            {
                t[1] = s.shade + (g_globalRandom&15);//Got really bright
                t[0] = s.shade + (g_globalRandom&15);
                sc.ceilingpal = s.owner>>8;
                sc.floorpal = s.owner&0xff;
                j = 1;
            }
            else
            {
                t[1] = t[2];
                t[0] = t[3];

                sc.ceilingpal = s.pal;
                sc.floorpal = s.pal;

                j = 0;
            }

            sc.floorshade = t[1];
            sc.ceilingshade = t[1];

            walIdx = sc.wallptr, wal = wall[walIdx];

            for (x=sc.wallnum; x > 0; x--,wal = wall[++walIdx])
            {
                if (j) wal.pal = (s.owner&0xff);
                else wal.pal = s.pal;

                if (wal.hitag != 1)
                {
                    wal.shade = t[0];
                    if ((wal.cstat&2) && wal.nextwall >= 0)
                        wall[wal.nextwall].shade = wal.shade;
                }
            }

            for (j = headspritesect[sprite[i].sectnum]; j >= 0; j = nextspritesect[j])
            {
                if (sprite[j].cstat&16 && A_CheckSpriteFlags(j,SPRITE_NOSHADE) == 0)
                {
                    if (sc.ceilingstat&1)
                        sprite[j].shade = sc.ceilingshade;
                    else sprite[j].shade = sc.floorshade;
                }
            }

            if (t[4])
                {A_DeleteSprite(i); {i = nexti; continue BOLT;}}

            break;

            //BOSS
        case SE_5:
        {
            var $x = new R(x);
            var p = A_FindPlayer(s,$x);
            x = $x.$;
            var ps = g_player[p].ps;

            if (x < 8192)
            {
                j = s.ang;
                s.ang = getangle(s.x-ps.pos.x,s.y-ps.pos.y);
                A_Shoot(i,FIRELASER);
                s.ang = j;
            }

            if (s.owner==-1) //Start search
            {
                t[4]=0;
                l = INT32_MAX;
                while (1) //Find the shortest dist
                {
                    s.owner = A_FindLocator(int16(t[4]),-1); //t[0] hold sectnum

                    if (s.owner==-1) break;

                    m = ldist(sprite[ps.i],sprite[s.owner]);

                    if (l > m)
                    {
                        q = s.owner;
                        l = m;
                    }

                    t[4]++;
                }

                s.owner = q;
                s.zvel = ksgn(sprite[q].z-s.z)<<4;
            }

            if (ldist(sprite[s.owner],s) < 1024)
            {
                var/*int16_t */ta:number;
                ta = s.ang;
                s.ang = getangle(ps.pos.x-s.x,ps.pos.y-s.y);
                s.ang = ta;
                s.owner = -1;
                {i = nexti; continue BOLT;}

            }
            else s.xvel=256;

            x = getangle(sprite[s.owner].x-s.x,sprite[s.owner].y-s.y);
            q = G_GetAngleDelta(s.ang,x)>>3;
            s.ang += q;

            if (rnd(32))
            {
                t[2]+=q;
                sc.ceilingshade = 127;
            }
            else
            {
                t[2] += G_GetAngleDelta(t[2]+512,getangle(ps.pos.x-s.x,ps.pos.y-s.y))>>2;
                sc.ceilingshade = 0;
            }

            if (A_IncurDamage(i) >= 0)
            {
                if (++t[3] == 5)
                {
                    s.zvel += 1024;
                    P_DoQuote(QUOTE_WASTED, g_player[myconnectindex].ps);
                }
            }

            s.z += s.zvel;
            sc.ceilingz += s.zvel;
            sector[t[0]].ceilingz += s.zvel;
            A_MoveSector(i);
            setsprite(i,s);
            break;
        }

        case SE_8_UP_OPEN_DOOR_LIGHTS:
        case SE_9_DOWN_OPEN_DOOR_LIGHTS:

            // work only if its moving

            j = -1;

            if (actor[i].t_data[4])
            {
                actor[i].t_data[4]++;
                if (actor[i].t_data[4] > 8)
                    {A_DeleteSprite(i); {i = nexti; continue BOLT;}}
                j = 1;
            }
            else j = GetAnimationGoal(new AnimatePtr(sector, s.sectnum, "ceilingz"));

            if (j >= 0)
            {
                var/*int16_t */sn:number;

                if ((sc.lotag&0x8000) || actor[i].t_data[4])
                    x = -t[3];
                else
                    x = t[3];

                if (st == 9) x = -x;

                for (j = headspritestat[STAT_EFFECTOR]; j >= 0; j = nextspritestat[j])
                {
                    if (sprite[j].lotag == st && sprite[j].hitag == sh)
                    {
                        sn = sprite[j].sectnum;
                        m = sprite[j].shade;

                        walIdx = sector[sn].wallptr; wal = wall[walIdx];

                        for (l=sector[sn].wallnum; l>0; l--,wal = wall[++walIdx])
                        {
                            if (wal.hitag != 1)
                            {
                                wal.shade+=x;

                                if (wal.shade < m)
                                    wal.shade = m;
                                else if (wal.shade > actor[j].t_data[2])
                                    wal.shade = actor[j].t_data[2];

                                if (wal.nextwall >= 0)
                                    if (wall[wal.nextwall].hitag != 1)
                                        wall[wal.nextwall].shade = wal.shade;
                            }
                        }

                        sector[sn].floorshade   += x;
                        sector[sn].ceilingshade += x;

                        if (sector[sn].floorshade < m)
                            sector[sn].floorshade = m;
                        else if (sector[sn].floorshade > actor[j].t_data[0])
                            sector[sn].floorshade = actor[j].t_data[0];

                        if (sector[sn].ceilingshade < m)
                            sector[sn].ceilingshade = m;
                        else if (sector[sn].ceilingshade > actor[j].t_data[1])
                            sector[sn].ceilingshade = actor[j].t_data[1];

                    }
                }
            }
            break;

        case SE_10_DOOR_AUTO_CLOSE:
            // XXX: 32791, what the hell?
            if ((sc.lotag&0xff) == ST_27_STRETCH_BRIDGE || (sc.floorz > sc.ceilingz && (sc.lotag&0xff) != ST_23_SWINGING_DOOR) || sc.lotag == 32791)
            {
                var/*int32_t */p:number;

                j = 1;

                if ((sc.lotag&0xff) != ST_27_STRETCH_BRIDGE)
                    for (p = 0; p != -1; p = connectpoint2[p])
                        if (sc.lotag != ST_30_ROTATE_RISE_BRIDGE && sc.lotag != ST_31_TWO_WAY_TRAIN && sc.lotag != 0)
                            if (s.sectnum == sprite[g_player[p].ps.i].sectnum)
                                j = 0;

                if (j == 1)
                {
                    if (t[0] > sh)
                        switch (sector[s.sectnum].lotag)
                        {
                        case ST_20_CEILING_DOOR:
                        case ST_21_FLOOR_DOOR:
                        case ST_22_SPLITTING_DOOR:
                        case ST_26_SPLITTING_ST_DOOR:
                            if (GetAnimationGoal(new AnimatePtr(sector, s.sectnum, "ceilingz") /*&sector[s.sectnum].ceilingz*/) >= 0)
                                break;
                        default:
                            G_ActivateBySector(s.sectnum,i);
                            t[0] = 0;
                            break;
                        }
                    else t[0]++;
                }
            }
            else t[0]=0;
            break;

        case SE_11_SWINGING_DOOR: //Swingdoor

            if (t[5] > 0)
            {
                t[5]--;
                break;
            }

            if (t[4])
            {
                var/*int32_t */endwall = sc.wallptr+sc.wallnum;

                for (j=sc.wallptr; j<endwall; j++)
                {
                    for (k = headspritestat[STAT_ACTOR]; k >= 0; k = nextspritestat[k])
                    {
                        if (sprite[k].extra > 0 && A_CheckEnemySprite(sprite[k])
                                && clipinsidebox(sprite[k].x, sprite[k].y, j, 256) == 1)
                            {i = nexti; continue BOLT;}
                    }

                    for (k = headspritestat[STAT_PLAYER]; k >= 0; k = nextspritestat[k])
                    {
                        if (sprite[k].owner >= 0 && clipinsidebox(sprite[k].x, sprite[k].y, j, 144) == 1)
                        {
                            t[5] = 8; // Delay
                            k = (sprite[i].yvel>>3)*t[3];
                            t[2] -= k;
                            t[4] -= k;
                            A_MoveSector(i);
                            setsprite(i,/*(vec3_t *)*/s);
                            {i = nexti; continue BOLT;}
                        }
                    }
                }

                k = (sprite[i].yvel>>3)*t[3];
                t[2]+=k;
                t[4]+=k;
                A_MoveSector(i);
                setsprite(i,/*(vec3_t *)*/s);

                if (t[4] <= -511 || t[4] >= 512)
                {
                    t[4] = 0;
                    t[2] &= 0xffffff00;
                    A_MoveSector(i);
                    setsprite(i,/*(vec3_t *)*/s);
                    break;
                }
            }
            break;

        case SE_12_LIGHT_SWITCH:
            if (t[0] == 3 || t[3] == 1)   //Lights going off
            {
                sc.floorpal = 0;
                sc.ceilingpal = 0;

                walIdx = sc.wallptr, wal = wall[walIdx];
                for (j = sc.wallnum; j > 0; j--, wal = wall[++walIdx])
                    if (wal.hitag != 1)
                    {
                        wal.shade = t[1];
                        wal.pal = 0;
                    }

                sc.floorshade = t[1];
                sc.ceilingshade = t[2];
                t[0]=0;

                for (j = headspritesect[sprite[i].sectnum]; j >= 0; j = nextspritesect[j])
                {
                    if (sprite[j].cstat&16 && A_CheckSpriteFlags(j,SPRITE_NOSHADE) == 0)
                    {
                        if (sc.ceilingstat&1)
                            sprite[j].shade = sc.ceilingshade;
                        else sprite[j].shade = sc.floorshade;
                    }
                }

                if (t[3] == 1)
                    {A_DeleteSprite(i); {i = nexti; continue BOLT;}}
            }
            if (t[0] == 1)   //Lights flickering on
            {
                if (sc.floorshade > s.shade)
                {
                    sc.floorpal = s.pal;
                    sc.ceilingpal = s.pal;

                    sc.floorshade -= 2;
                    sc.ceilingshade -= 2;

                    walIdx = sc.wallptr, wal = wall[walIdx];
                    for (j=sc.wallnum; j>0; j--,wal = wall[++walIdx])
                        if (wal.hitag != 1)
                        {
                            wal.pal = s.pal;
                            wal.shade -= 2;
                        }
                }
                else t[0] = 2;

                for (j = headspritesect[sprite[i].sectnum]; j >= 0; j = nextspritesect[j])
                {
                    if (sprite[j].cstat&16)
                    {
                        if (sc.ceilingstat&1 && A_CheckSpriteFlags(j,SPRITE_NOSHADE) == 0)
                            sprite[j].shade = sc.ceilingshade;
                        else sprite[j].shade = sc.floorshade;
                    }
                }
            }
            break;


        case SE_13_EXPLOSIVE:
            if (t[2])
            {
                // t[0]: ceiling z
                // t[1]: floor z
                // s.owner: 1 if affect ceiling, 0 if affect floor
                // t[3]: 1 if ceiling was parallaxed at premap, 0 else

                j = (sprite[i].yvel<<5)|1;

                if (s.ang == 512)
                {
                    if (s.owner)
                    {
                        if (klabs(t[0]-sc.ceilingz) >= j)
                            sc.ceilingz += ksgn(t[0]-sc.ceilingz)*j;
                        else sc.ceilingz = t[0];
                    }
                    else
                    {
                        if (klabs(t[1]-sc.floorz) >= j)
                            sc.floorz += ksgn(t[1]-sc.floorz)*j;
                        else sc.floorz = t[1];
                    }
                }
                else
                {
                    if (klabs(t[1]-sc.floorz) >= j)
                        sc.floorz += ksgn(t[1]-sc.floorz)*j;
                    else sc.floorz = t[1];
                    if (klabs(t[0]-sc.ceilingz) >= j)
                        sc.ceilingz += ksgn(t[0]-sc.ceilingz)*j;
                    sc.ceilingz = t[0];
                }
//#ifdef YAX_ENABLE
                if (s.ang == 512)
                {
                    var/*int16_t */cf=!s.owner?1:0, bn=yax_getbunch(s.sectnum/*sc-sector*/, cf);
                    var/*int32_t */jj:number, daz=SECTORFLD(s.sectnum/*sc-sector*/,"z", cf);

                    if (bn >= 0)
                    {todoThrow();
                        //for (jj = headsectbunch[cf][bn]; jj != -1; jj = nextsectbunch[cf][jj]/*(bn, cf, jj)*/)
                        //{
                        //    SECTORFLD(jj,z, cf) = daz;
                        //    SECTORFLD(jj,stat, cf) &= ~(128+256 + 512+2048);
                        //}
                        //for (jj = headsectbunch[(!cf)?1:0][bn]; jj != -1; jj = nextsectbunch[!cf][jj](bn, !cf?1:0, jj))
                        //{
                        //    SECTORFLD(jj,z, !cf?1:0) = daz;
                        //    SECTORFLD(jj,stat, !cf?1:0) &= ~(128+256 + 512+2048);
                        //}
                    }
                }
//#endif
                if (t[3] == 1)
                {
                    //Change the shades

                    t[3]++;
                    sc.ceilingstat ^= 1;

                    if (s.ang == 512)
                    {
                        walIdx = sc.wallptr, wal = wall[walIdx];
                        for (j=sc.wallnum; j>0; j--,wal = wall[++walIdx])
                            wal.shade = s.shade;

                        sc.floorshade = s.shade;

                        if (g_player[0].ps.one_parallax_sectnum >= 0)
                        {
                            sc.ceilingpicnum =
                                sector[g_player[0].ps.one_parallax_sectnum].ceilingpicnum;
                            sc.ceilingshade  =
                                sector[g_player[0].ps.one_parallax_sectnum].ceilingshade;
                        }
                    }
                }
                t[2]++;
                if (t[2] > 256)
                    {A_DeleteSprite(i); {i = nexti; continue BOLT;}}
            }
            

            if (t[2] == 4 && s.ang != 512)
                for (x=0; x<7; x++) RANDOMSCRAP(s, i);
            break;


        case SE_15_SLIDING_DOOR:

            if (t[4])
            {
                s.xvel = 16;

                if (t[4] == 1) //Opening
                {
                    if (t[3] >= (sprite[i].yvel>>3))
                    {
                        t[4] = 0; //Turn off the sliders
                        A_CallSound(s.sectnum,i);
                        break;
                    }
                    t[3]++;
                }
                else if (t[4] == 2)
                {
                    if (t[3]<1)
                    {
                        t[4] = 0;
                        A_CallSound(s.sectnum,i);
                        break;
                    }
                    t[3]--;
                }

                A_MoveSector(i);
                setsprite(i,/*(vec3_t *)*/s);
            }
            break;

        case SE_16_REACTOR: //Reactor

            t[2]+=32;
            if (sc.floorz<sc.ceilingz) s.shade=0;

            else if (sc.ceilingz < t[3])
            {

                //The following code check to see if
                //there is any other sprites in the sector.
                //If there isn't, then kill this sectoreffector
                //itself.....

                for (j = headspritesect[s.sectnum]; j >= 0; j = nextspritesect[j])
                {
                    if (sprite[j].picnum == REACTOR || sprite[j].picnum == REACTOR2)
                        break;
                }

                if (j == -1)
                    {A_DeleteSprite(i); {i = nexti; continue BOLT;}}

                s.shade = 1;
            }

            if (s.shade) sc.ceilingz+=1024;
            else sc.ceilingz-=512;

            A_MoveSector(i);
            setsprite(i,/*(vec3_t *)*/s);

            break;

        case SE_17_WARP_ELEVATOR:
        {
            var /*int32_t */nextk:number;

            q = t[0]*(sprite[i].yvel<<2);

            sc.ceilingz += q;
            sc.floorz += q;

            for (j = headspritesect[s.sectnum]; j >= 0; j = nextspritesect[j])
            {
                if (sprite[j].statnum == STAT_PLAYER && sprite[j].owner >= 0)
                {
                    var/*const int32_t */p = sprite[j].yvel;
                    var ps = g_player[p].ps;

                    if (numplayers < 2 && !g_netServer)
                        ps.opos.z = ps.pos.z;
                    ps.pos.z += q;
                    ps.truefz += q;
                    ps.truecz += q;
                    if (g_netServer || numplayers > 1)
                        ps.opos.z = ps.pos.z;
                }
                if (sprite[j].statnum != STAT_EFFECTOR)
                {
                    actor[j].bpos.z = sprite[j].z;
                    sprite[j].z += q;
                }

                actor[j].floorz = sc.floorz;
                actor[j].ceilingz = sc.ceilingz;
            }

            if (t[0]) //If in motion
            {
                if (klabs(sc.floorz-t[2]) <= sprite[i].yvel)
                {
                    G_ActivateWarpElevators(i,0);
                    break;
                }

                // If we still see the opening, we can't yet teleport.
                if (t[0]==-1)
                {
                    if (sc.floorz > t[3])
                        break;
                }
                else if (sc.ceilingz < t[4]) break;

                if (t[1] == 0) break;
                t[1] = 0;

                for (j = headspritestat[STAT_EFFECTOR]; j >= 0; j = nextspritestat[j])
                {
                    if (i != j && sprite[j].lotag == SE_17_WARP_ELEVATOR)
                        if (sc.hitag-t[0] == sector[sprite[j].sectnum].hitag
                                && sh == sprite[j].hitag)
                            break;
                }

                if (j == -1) break;

                for (k = headspritesect[s.sectnum];
                    k >= 0 && (nextk = nextspritesect[k], 1); k = nextk)
                {
                    if (sprite[k].statnum == STAT_PLAYER && sprite[k].owner >= 0)
                    {
                        var/*const int32_t */p = sprite[k].yvel;
                        var ps = g_player[p].ps;

                        ps.pos.x += sprite[j].x-s.x;
                        ps.pos.y += sprite[j].y-s.y;
                        ps.pos.z = sector[sprite[j].sectnum].floorz-(sc.floorz-ps.pos.z);

                        actor[k].floorz = sector[sprite[j].sectnum].floorz;
                        actor[k].ceilingz = sector[sprite[j].sectnum].ceilingz;

                        ps.bobposx = ps.opos.x = ps.pos.x;
                        ps.bobposy = ps.opos.y = ps.pos.y;
                        ps.opos.z = ps.pos.z;

                        ps.truefz = actor[k].floorz;
                        ps.truecz = actor[k].ceilingz;
                        ps.bobcounter = 0;

                        changespritesect(k,sprite[j].sectnum);
                        ps.cursectnum = sprite[j].sectnum;
                    }
                    else if (sprite[k].statnum != STAT_EFFECTOR)
                    {
                        sprite[k].x += sprite[j].x-s.x;
                        sprite[k].y += sprite[j].y-s.y;
                        sprite[k].z = sector[sprite[j].sectnum].floorz-
                                      (sc.floorz-sprite[k].z);

                        actor[k].bpos.copyFrom(sprite[k]);//Bmemcpy(&actor[k].bpos.x, &sprite[k], sizeof(vec3_t));

                        changespritesect(k,sprite[j].sectnum);
                        setsprite(k,/*(vec3_t *)&*/sprite[k]);

                        actor[k].floorz = sector[sprite[j].sectnum].floorz;
                        actor[k].ceilingz = sector[sprite[j].sectnum].ceilingz;
                    }
                }
            }
            break;
        }

        case SE_18_INCREMENTAL_SECTOR_RISE_FALL:
            if (t[0])
            {
                if (s.pal)
                {
                    if (s.ang == 512)
                    {
                        sc.ceilingz -= sc.extra;
                        if (sc.ceilingz <= t[1])
                        {
                            sc.ceilingz = t[1];
                            {A_DeleteSprite(i); {i = nexti; continue BOLT;}}
                        }
                    }
                    else
                    {
                        sc.floorz += sc.extra;

                        for (j = headspritesect[s.sectnum]; j >= 0; j = nextspritesect[j])
                        {
                            if (sprite[j].picnum == APLAYER && sprite[j].owner >= 0)
                                if (g_player[sprite[j].yvel].ps.on_ground == 1)
                                    g_player[sprite[j].yvel].ps.pos.z += sc.extra;

                            if (sprite[j].zvel == 0 && sprite[j].statnum != STAT_EFFECTOR && sprite[j].statnum != STAT_PROJECTILE)
                            {
                                actor[j].bpos.z = sprite[j].z += sc.extra;
                                actor[j].floorz = sc.floorz;
                            }
                        }

                        if (sc.floorz >= t[1])
                        {
                            sc.floorz = t[1];
                            {A_DeleteSprite(i); {i = nexti; continue BOLT;}}
                        }
                    }
                }
                else
                {
                    if (s.ang == 512)
                    {
                        sc.ceilingz += sc.extra;
                        if (sc.ceilingz >= s.z)
                        {
                            sc.ceilingz = s.z;
                            {A_DeleteSprite(i); {i = nexti; continue BOLT;}}
                        }
                    }
                    else
                    {
                        sc.floorz -= sc.extra;

                        for (j = headspritesect[s.sectnum]; j >= 0; j = nextspritesect[j])
                        {
                            if (sprite[j].picnum == APLAYER && sprite[j].owner >= 0)
                                if (g_player[sprite[j].yvel].ps.on_ground == 1)
                                    g_player[sprite[j].yvel].ps.pos.z -= sc.extra;

                            if (sprite[j].zvel == 0 && sprite[j].statnum != STAT_EFFECTOR && sprite[j].statnum != STAT_PROJECTILE)
                            {
                                actor[j].bpos.z = sprite[j].z -= sc.extra;
                                actor[j].floorz = sc.floorz;
                            }
                        }

                        if (sc.floorz <= s.z)
                        {
                            sc.floorz = s.z;
                            {A_DeleteSprite(i); {i = nexti; continue BOLT;}}
                        }
                    }
                }

                t[2]++;
                if (t[2] >= s.hitag)
                {
                    t[2] = 0;
                    t[0] = 0;
                }
            }
            break;

        case SE_19_EXPLOSION_LOWERS_CEILING: //Battlestar galactia shields

            if (t[0])
            {
                if (t[0] == 1)
                {
                    t[0]++;
                    x = sc.wallptr;
                    q = x+sc.wallnum;
                    for (j=x; j<q; j++)
                        if (wall[j].overpicnum == BIGFORCE)
                        {
                            wall[j].cstat &= (128+32+8+4+2);
                            wall[j].overpicnum = 0;
                            if (wall[j].nextwall >= 0)
                            {
                                wall[wall[j].nextwall].overpicnum = 0;
                                wall[wall[j].nextwall].cstat &= (128+32+8+4+2);
                            }
                        }
                }

                if (sc.ceilingz < sc.floorz)
                    sc.ceilingz += sprite[i].yvel;
                else
                {
                    sc.ceilingz = sc.floorz;

                    for (j = headspritestat[STAT_EFFECTOR]; j >= 0; j = nextspritestat[j])
                    {
                        if (sprite[j].lotag == SE_0_ROTATING_SECTOR && sprite[j].hitag==sh)
                        {
                            var sec = sector[sprite[j].sectnum];

                            q = sprite[sprite[j].owner].sectnum;
                            sec.floorpal = sec.ceilingpal = sector[q].floorpal;
                            sec.floorshade = sec.ceilingshade = sector[q].floorshade;

                            actor[sprite[j].owner].t_data[0] = 2;
                        }
                    }

                    {A_DeleteSprite(i); {i = nexti; continue BOLT;}}
                }
            }
            else //Not hit yet
            {
                if (G_FindExplosionInSector(s.sectnum) >= 0)
                {
                    P_DoQuote(QUOTE_UNLOCKED, g_player[myconnectindex].ps);

                    for (l = headspritestat[STAT_EFFECTOR]; l >= 0; l = nextspritestat[l])
                    {
                        x = sprite[l].lotag&0x7fff;
                        switch (x)
                        {
                        case SE_0_ROTATING_SECTOR:
                            if (sprite[l].hitag == sh)
                            {
                                var/*int32_t */ow = sprite[l].owner;
                                q = sprite[l].sectnum;
                                sector[q].floorshade = sector[q].ceilingshade = sprite[ow].shade;
                                sector[q].floorpal = sector[q].ceilingpal = sprite[ow].pal;
                            }
                            break;

                        case SE_1_PIVOT:
                        case SE_12_LIGHT_SWITCH:
//                        case SE_18_INCREMENTAL_SECTOR_RISE_FALL:
                        case SE_19_EXPLOSION_LOWERS_CEILING:
                            if (sh == sprite[l].hitag)
                                if (actor[l].t_data[0] == 0)
                                {
                                    actor[l].t_data[0] = 1; //Shut them all on
                                    sprite[l].owner = i;
                                }

                            break;
                        }
                    }
                }
            }

            break;

        case SE_20_STRETCH_BRIDGE: //Extend-o-bridge
            if (t[0] == 0) break;
            if (t[0] == 1) s.xvel = 8;
            else s.xvel = -8;

            if (s.xvel)   //Moving
            {
                var/*int32_t */p:number, nextj:number;

                x = (s.xvel*sintable[(s.ang+512)&2047])>>14;
                l = (s.xvel*sintable[s.ang&2047])>>14;

                t[3] += s.xvel;

                s.x += x;
                s.y += l;

                if (t[3] <= 0 || (t[3]>>6) >= (sprite[i].yvel>>6))
                {
                    s.x -= x;
                    s.y -= l;
                    t[0] = 0;
                    A_CallSound(s.sectnum,i);
                    break;
                }

                for (j = headspritesect[s.sectnum]; 
                    j >= 0 && (nextj = nextspritesect[j], 1) ;
                j = nextj)
                {
                    if (sprite[j].statnum != STAT_EFFECTOR && sprite[j].zvel == 0)
                    {
                        sprite[j].x += x;
                        sprite[j].y += l;
                        setsprite(j,/*(vec3_t *)*/sprite[j]);
                        if (sector[sprite[j].sectnum].floorstat&2)
                            if (sprite[j].statnum == STAT_ZOMBIEACTOR)
                                A_Fall(j);
                    }
                }

                dragpoint(int16(t[1]),wall[t[1]].x+x,wall[t[1]].y+l,0);
                dragpoint(int16(t[2]),wall[t[2]].x+x,wall[t[2]].y+l,0);

                for (p = 0; p != -1; p = connectpoint2[p])
                {
                    var ps = g_player[p].ps;

                    if (ps.cursectnum == s.sectnum && ps.on_ground)
                    {
                        ps.pos.x += x;
                        ps.pos.y += l;

                        ps.opos.x = ps.pos.x;
                        ps.opos.y = ps.pos.y;

                        ps.pos.z += PHEIGHT;
                        setsprite(ps.i,/*(vec3_t *)*/ps.pos);
                        ps.pos.z -= PHEIGHT;
                    }
                }

                sc.floorxpanning-=x>>3;
                sc.floorypanning-=l>>3;

                sc.ceilingxpanning-=x>>3;
                sc.ceilingypanning-=l>>3;
            }

            break;

        case SE_21_DROP_FLOOR: // Cascading effect
        {todoThrow();
            //int32_t *zptr;

            //if (t[0] == 0) break;

            //if (s.ang == 1536)
            //    zptr = &sc.ceilingz;
            //else
            //    zptr = &sc.floorz;

            //if (t[0] == 1)   //Decide if the s.sectnum should go up or down
            //{
            //    s.zvel = ksgn(s.z-*zptr) * (sprite[i].yvel<<4);
            //    t[0]++;
            //}

            //if (sc.extra == 0)
            //{
            //    *zptr += s.zvel;

            //    if (klabs(*zptr-s.z) < 1024)
            //    {
            //        *zptr = s.z;
            //        {A_DeleteSprite(i); {i = nexti; continue BOLT;}} //All done   // SE_21_KILLIT, see sector.c
            //    }
            //}
            //else sc.extra--;
            //break;
        }

        case SE_22_TEETH_DOOR:
            if (t[1])
            {
                if (GetAnimationGoal(new AnimatePtr(sector,t[0],"ceilingz")/*&sector[t[0]].ceilingz*/) >= 0)
                    sc.ceilingz += sc.extra*9;
                else t[1] = 0;
            }
            break;

        case SE_24_CONVEYOR:
        case SE_34:
        {
            var/*int32_t */p:number, nextj:number;

            if (t[4])
                break;

            x = (sprite[i].yvel*sintable[(s.ang+512)&2047])>>18;
            l = (sprite[i].yvel*sintable[s.ang&2047])>>18;

            k = 0;

            for (j = headspritesect[s.sectnum];
                j >= 0 && (nextj = nextspritesect[j], 1); j = nextj/*(s.sectnum, j, nextj)*/)
            {
                if (sprite[j].zvel >= 0)
                    switch (sprite[j].statnum)
                    {
                    case STAT_MISC:
                        switch (DYNAMICTILEMAP(sprite[j].picnum))
                        {
                        case BLOODPOOL__STATIC:
                        case PUKE__STATIC:
                        case FOOTPRINTS__STATIC:
                        case FOOTPRINTS2__STATIC:
                        case FOOTPRINTS3__STATIC:
                        case FOOTPRINTS4__STATIC:
                        case BULLETHOLE__STATIC:
                        case BLOODSPLAT1__STATIC:
                        case BLOODSPLAT2__STATIC:
                        case BLOODSPLAT3__STATIC:
                        case BLOODSPLAT4__STATIC:
                            sprite[j].xrepeat = sprite[j].yrepeat = 0;
                            continue;

                        case LASERLINE__STATIC:
                            continue;
                        }
                        // fall-through
                    case STAT_STANDABLE:
                        if (sprite[j].picnum == TRIPBOMB)
                            break;
                        // else, fall-through
                    case STAT_ACTOR:
                    case STAT_DEFAULT:
                        if (
                            sprite[j].picnum == BOLT1 ||
                            sprite[j].picnum == BOLT1+1 ||
                            sprite[j].picnum == BOLT1+2 ||
                            sprite[j].picnum == BOLT1+3 ||
                            sprite[j].picnum == SIDEBOLT1 ||
                            sprite[j].picnum == SIDEBOLT1+1 ||
                            sprite[j].picnum == SIDEBOLT1+2 ||
                            sprite[j].picnum == SIDEBOLT1+3 ||
                            A_CheckSwitchTile(j)
                        )
                            break;

                        if (!(sprite[j].picnum >= CRANE && sprite[j].picnum <= CRANE+3))
                        {
                            if (sprite[j].z > actor[j].floorz-(16<<8))
                            {
                                actor[j].bpos.x = sprite[j].x;
                                actor[j].bpos.y = sprite[j].y;

                                sprite[j].x += x>>2;
                                sprite[j].y += l>>2;

                                setsprite(j,sprite[j]);

                                if (sector[sprite[j].sectnum].floorstat&2)
                                    if (sprite[j].statnum == STAT_ZOMBIEACTOR)
                                        A_Fall(j);
                            }
                        }
                        break;
                    }
            }

            p = myconnectindex;
            if (g_player[p].ps.cursectnum == s.sectnum && g_player[p].ps.on_ground)
                if (klabs(g_player[p].ps.pos.z-g_player[p].ps.truefz) < PHEIGHT+(9<<8))
                {
                    fricxv += x<<3;
                    fricyv += l<<3;
                }

            sc.floorxpanning += sprite[i].yvel>>7;

            break;
        }

        case SE_35:
            if (sc.ceilingz > s.z)
                for (j = 0; j < 8; j++)
                {
                    s.ang += krand()&511;
                    k = A_Spawn(i,SMALLSMOKE);
                    sprite[k].xvel = 96+(krand()&127);
                    A_SetSprite(k,CLIPMASK0);
                    setsprite(k,/*(vec3_t *)&*/sprite[k]);
                    if (rnd(16))
                        A_Spawn(i,EXPLOSION2);
                }

            switch (t[0])
            {
            case 0:
                sc.ceilingz += s.yvel;
                if (sc.ceilingz > sc.floorz)
                    sc.floorz = sc.ceilingz;
                if (sc.ceilingz > s.z+(32<<8))
                    t[0]++;
                break;
            case 1:
                sc.ceilingz-=(s.yvel<<2);
                if (sc.ceilingz < t[4])
                {
                    sc.ceilingz = t[4];
                    t[0] = 0;
                }
                break;
            }
            break;

        case SE_25_PISTON: //PISTONS
            if (t[4] == 0) break;

            if (sc.floorz <= sc.ceilingz)
                s.shade = 0;
            else if (sc.ceilingz <= t[3])
                s.shade = 1;

            if (s.shade)
            {
                sc.ceilingz += sprite[i].yvel<<4;
                if (sc.ceilingz > sc.floorz)
                    sc.ceilingz = sc.floorz;
            }
            else
            {
                sc.ceilingz   -= sprite[i].yvel<<4;
                if (sc.ceilingz < t[3])
                    sc.ceilingz = t[3];
            }

            break;

        case SE_26:
        {
            var /*int32_t */p:number, nextj:number;

            s.xvel = 32;
            l = (s.xvel*sintable[(s.ang+512)&2047])>>14;
            x = (s.xvel*sintable[s.ang&2047])>>14;

            s.shade++;
            if (s.shade > 7)
            {
                s.x = t[3];
                s.y = t[4];
                sc.floorz -= ((s.zvel*s.shade)-s.zvel);
                s.shade = 0;
            }
            else
                sc.floorz += s.zvel;

            for (j = headspritesect[s.sectnum];j >= 0 && (nextj = nextspritesect[j], 1); j = nextj)
            {
                if (sprite[j].statnum != STAT_EFFECTOR && sprite[j].statnum != STAT_PLAYER)
                {
                    actor[j].bpos.x = sprite[j].x;
                    actor[j].bpos.y = sprite[j].y;

                    sprite[j].x += l;
                    sprite[j].y += x;

                    sprite[j].z += s.zvel;
                    setsprite(j,sprite[j]);
                }
            }

            p = myconnectindex;
            if (sprite[g_player[p].ps.i].sectnum == s.sectnum && g_player[p].ps.on_ground)
            {
                fricxv += l<<5;
                fricyv += x<<5;
            }

            for (p = 0; p != -1; p = connectpoint2[p])
                if (sprite[g_player[p].ps.i].sectnum == s.sectnum && g_player[p].ps.on_ground)
                    g_player[p].ps.pos.z += s.zvel;

            A_MoveSector(i);
            setsprite(i,s);

            break;
        }

        case SE_27_DEMO_CAM:
        {
            var/*int32_t */p:number;
            var ps:DukePlayer_t;

            if (ud.recstat == 0 || !ud.democams) break;

            actor[i].tempang = s.ang;

            var $x = new R(x);
            p = A_FindPlayer(s,$x);
            x = $x.$;
            ps = g_player[p].ps;

            if (sprite[ps.i].extra > 0 && myconnectindex == screenpeek)
            {
                if (t[0] < 0)
                {
                    ud.camerasprite = i;
                    t[0]++;
                }
                else if (ud.recstat == 2 && ps.newowner == -1)
                {
                    if (cansee(s.x,s.y,s.z,sprite[i].sectnum,ps.pos.x,ps.pos.y,ps.pos.z,ps.cursectnum))
                    {
                        if (x < int32(sh>>>0))
                        {
                            ud.camerasprite = i;
                            t[0] = 999;
                            s.ang += G_GetAngleDelta(s.ang,getangle(ps.pos.x-s.x,ps.pos.y-s.y))>>3;
                            sprite[i].yvel = 100+int32((s.z-ps.pos.z)/257);

                        }
                        else if (t[0] == 999)
                        {
                            if (ud.camerasprite == i)
                                t[0] = 0;
                            else t[0] = -10;
                            ud.camerasprite = i;

                        }
                    }
                    else
                    {
                        s.ang = getangle(ps.pos.x-s.x,ps.pos.y-s.y);

                        if (t[0] == 999)
                        {
                            if (ud.camerasprite == i)
                                t[0] = 0;
                            else t[0] = -20;
                            ud.camerasprite = i;
                        }
                    }
                }
            }
            break;
        }

        case SE_28_LIGHTNING:
        {
            if (t[5] > 0)
            {
                t[5]--;
                break;
            }

            if (actor[i].t_data[0] == 0)
            {
                var $x = new R(x);
                A_FindPlayer(s,$x);
                x = $x.$;
                if (x > 15500)
                    break;
                actor[i].t_data[0] = 1;
                actor[i].t_data[1] = 64 + (krand()&511);
                actor[i].t_data[2] = 0;
            }
            else
            {
                actor[i].t_data[2]++;
                if (actor[i].t_data[2] > actor[i].t_data[1])
                {
                    actor[i].t_data[0] = 0;
                    g_player[screenpeek].ps.visibility = ud.const_visibility;
                    break;
                }
                else if (actor[i].t_data[2] == (actor[i].t_data[1]>>1))
                    A_PlaySound(THUNDER,i);
                else if (actor[i].t_data[2] == (actor[i].t_data[1]>>3))
                    A_PlaySound(LIGHTNING_SLAP,i);
                else if (actor[i].t_data[2] == (actor[i].t_data[1]>>2))
                {
                    for (j = headspritestat[STAT_DEFAULT]; j >= 0; j = nextspritestat[j])
                        if (sprite[j].picnum == NATURALLIGHTNING && sprite[j].hitag == s.hitag)
                            sprite[j].cstat |= 32768;
                }
                else if (actor[i].t_data[2] > (actor[i].t_data[1]>>3) && actor[i].t_data[2] < (actor[i].t_data[1]>>2))
                {
                    if (cansee(s.x,s.y,s.z,s.sectnum,g_player[screenpeek].ps.pos.x,g_player[screenpeek].ps.pos.y,g_player[screenpeek].ps.pos.z,g_player[screenpeek].ps.cursectnum))
                        j = 1;
                    else j = 0;

                    if (rnd(192) && (actor[i].t_data[2]&1))
                    {
                        if (j)
                            g_player[screenpeek].ps.visibility = 0;
                    }
                    else if (j)
                        g_player[screenpeek].ps.visibility = ud.const_visibility;

                    for (j = headspritestat[STAT_DEFAULT]; j >= 0; j = nextspritestat[j])
                    {
                        if (sprite[j].picnum == NATURALLIGHTNING && sprite[j].hitag == s.hitag)
                        {
                            if (rnd(32) && (actor[i].t_data[2]&1))
                            {
                                var/*int32_t*/ p:number;
                                var ps:DukePlayer_t;

                                sprite[j].cstat &= 32767;
                                A_Spawn(j,SMALLSMOKE);

                                p = A_FindPlayer(s, NULL);
                                ps = g_player[p].ps;

                                x = ldist(sprite[ps.i], sprite[j]);
                                if (x < 768)
                                {
                                    if (!A_CheckSoundPlaying(ps.i,DUKE_LONGTERM_PAIN))
                                        A_PlaySound(DUKE_LONGTERM_PAIN,ps.i);
                                    A_PlaySound(SHORT_CIRCUIT,ps.i);
                                    sprite[ps.i].extra -= 8+(krand()&7);

                                    P_PalFrom(ps, 32, 16,0,0);
                                }
                                break;
                            }
                            else sprite[j].cstat |= 32768;
                        }
                    }
                }
            }
            break;
        }

        case SE_29_WAVES:
            s.hitag += 64;
            l = mulscale12(/*(int32_t)*/s.yvel,sintable[s.hitag&2047]);
            sc.floorz = s.z + l;
            break;

        case SE_31_FLOOR_RISE_FALL: // True Drop Floor
            if (t[0] == 1)
            {
                // Choose dir

                if (t[3] > 0)
                {
                    t[3]--;
                    break;
                }

                if (t[2] == 1) // Retract
                {
                    if (sprite[i].ang != 1536)
                        HandleSE31(i, 1, s.z, 0, s.z-sc.floorz);
                    else
                        HandleSE31(i, 1, t[1], 0, t[1]-sc.floorz);
                    
                    Yax_SetBunchZs(s.sectnum/*sc-sector*/, YAX_FLOOR, sc.floorz);

                    break;
                }

                if ((s.ang&2047) == 1536)
                    HandleSE31(i, 0, s.z, 1, s.z-sc.floorz);
                else
                    HandleSE31(i, 0, t[1], 1, t[1]-s.z);
                
                Yax_SetBunchZs(s.sectnum/*sc-sector*/, YAX_FLOOR, sc.floorz);
            }
            break;

        case SE_32_CEILING_RISE_FALL: // True Drop Ceiling
            if (t[0] == 1)
            {
                // Choose dir

                if (t[2] == 1) // Retract
                {
                    if (sprite[i].ang != 1536)
                    {
                        if (klabs(sc.ceilingz - s.z) < (sprite[i].yvel<<1))
                        {
                            sc.ceilingz = s.z;
                            A_CallSound(s.sectnum,i);
                            t[2] = 0;
                            t[0] = 0;
                        }
                        else sc.ceilingz += ksgn(s.z-sc.ceilingz)*sprite[i].yvel;
                    }
                    else
                    {
                        if (klabs(sc.ceilingz - t[1]) < (sprite[i].yvel<<1))
                        {
                            sc.ceilingz = t[1];
                            A_CallSound(s.sectnum,i);
                            t[2] = 0;
                            t[0] = 0;
                        }
                        else sc.ceilingz += ksgn(t[1]-sc.ceilingz)*sprite[i].yvel;
                    }

                    Yax_SetBunchZs(s.sectnum/*sc-sector*/, YAX_CEILING, sc.ceilingz);

                    break;
                }

                if ((s.ang&2047) == 1536)
                {
                    if (klabs(sc.ceilingz-s.z) < (sprite[i].yvel<<1))
                    {
                        t[0] = 0;
                        t[2] = !t[2]?1:0;
                        A_CallSound(s.sectnum,i);
                        sc.ceilingz = s.z;
                    }
                    else sc.ceilingz += ksgn(s.z-sc.ceilingz)*sprite[i].yvel;
                }
                else
                {
                    if (klabs(sc.ceilingz-t[1]) < (sprite[i].yvel<<1))
                    {
                        t[0] = 0;
                        t[2] = !t[2]?1:0;
                        A_CallSound(s.sectnum,i);
                    }
                    else sc.ceilingz -= ksgn(s.z-t[1])*sprite[i].yvel;
                }

                Yax_SetBunchZs(s.sectnum/*sc-sector*/, YAX_CEILING, sc.ceilingz);
            }
            break;

        case SE_33_QUAKE_DEBRIS:
            if (g_earthquakeTime > 0 && (krand()&7) == 0)
                RANDOMSCRAP(s, i);
            break;

        case SE_36_PROJ_SHOOTER:
            if (t[0])
            {
                if (t[0] == 1)
                    A_Shoot(i,sc.extra);
                else if (t[0] == GAMETICSPERSEC*5)
                    t[0] = 0;
                t[0]++;
            }
            break;

        case 128: //SE to control glass breakage
            wal = wall[t[2]];

            if (wal.cstat|32)
            {
                wal.cstat &= (255-32);
                wal.cstat |= 16;
                if (wal.nextwall >= 0)
                {
                    wall[wal.nextwall].cstat &= (255-32);
                    wall[wal.nextwall].cstat |= 16;
                }
            }
            else break;

            wal.overpicnum++;
            if (wal.nextwall >= 0)
                wall[wal.nextwall].overpicnum++;

            if (t[0] < t[1]) t[0]++;
            else
            {
                wal.cstat &= (128+32+8+4+2);
                if (wal.nextwall >= 0)
                    wall[wal.nextwall].cstat &= (128+32+8+4+2);
                {A_DeleteSprite(i); {i = nexti; continue BOLT;}}
            }
            break;

        case SE_130:
            if (t[0] > 80)
            {
                {A_DeleteSprite(i); {i = nexti; continue BOLT;}}
            }
            else t[0]++;

            x = sc.floorz-sc.ceilingz;

            if (rnd(64))
            {
                k = A_Spawn(i,EXPLOSION2);
                sprite[k].xrepeat = sprite[k].yrepeat = 2+(krand()&7);
                sprite[k].z = sc.floorz-(krand()%x);
                sprite[k].ang += 256-(krand()%511);
                sprite[k].xvel = krand()&127;
                A_SetSprite(k,CLIPMASK0);
            }
            break;

        case SE_131:
            if (t[0] > 40)
            {
                {A_DeleteSprite(i); {i = nexti; continue BOLT;}}
            }
            else t[0]++;

            x = sc.floorz-sc.ceilingz;

            if (rnd(32))
            {
                k = A_Spawn(i,EXPLOSION2);
                sprite[k].xrepeat = sprite[k].yrepeat = 2+(krand()&3);
                sprite[k].z = sc.floorz-(krand()%x);
                sprite[k].ang += 256-(krand()%511);
                sprite[k].xvel = krand()&127;
                A_SetSprite(k,CLIPMASK0);
            }
            break;

        case SE_49_POINT_LIGHT:
        case SE_50_SPOT_LIGHT:
            changespritestat(i, STAT_LIGHT);
            break;
        }
//BOLT:
        i = nexti;
    }

    //Sloped sin-wave floors!
    for (i = headspritestat[STAT_EFFECTOR]; i >= 0; i = nextspritestat[i])
    {
        var s = sprite[i];

        if (s.lotag == SE_29_WAVES)
        {
            var sc = sector[s.sectnum];

            if (sc.wallnum == 4)
            {
                wal = wall[sc.wallptr+2];
                if (wal.nextsector >= 0)
                    alignflorslope(s.sectnum, wal.x,wal.y, sector[wal.nextsector].floorz);
            }
        }
    }
}

function G_DoEffectorLights():void  // STATNUM 14
{
    var/*int32_t */i:number;

    for (i = headspritestat[STAT_LIGHT]; i >= 0; i = nextspritestat[i])
    {
        switch (sprite[i].lotag)
        {
//#ifdef POLYMER
        case SE_49_POINT_LIGHT:
        {
            if (!A_CheckSpriteFlags(i, SPRITE_NOLIGHT) && getrendermode() == REND_POLYMER &&
                    !(A_CheckSpriteFlags(i, SPRITE_USEACTIVATOR) && sector[sprite[i].sectnum].lotag & 16384))
            {todoThrow();
//                if (actor[i].lightptr == NULL)
//                {
////#pragma pack(push,1)
//                    var mylight:_prlight;
////#pragma pack(pop)
//                    mylight.sector = sprite[i].sectnum;
//                    Bmemcpy(&mylight, &sprite[i], sizeof(int32_t) * 3);
//                    mylight.range = sprite[i].hitag;
//                    mylight.color[0] = sprite[i].xvel;
//                    mylight.color[1] = sprite[i].yvel;
//                    mylight.color[2] = sprite[i].zvel;
//                    mylight.radius = 0;
//                    mylight.angle = sprite[i].ang;
//                    mylight.horiz = sprite[i].extra;
//                    mylight.minshade = sprite[i].xoffset;
//                    mylight.maxshade = sprite[i].yoffset;
//                    mylight.tilenum = 0;
//                    mylight.publicflags.emitshadow = 0;
//                    mylight.publicflags.negative = !!(sprite[i].cstat & 128);

//                    if (sprite[i].cstat & 2)
//                    {
//                        if (sprite[i].cstat & 512)
//                            mylight.priority = PR_LIGHT_PRIO_LOW;
//                        else
//                            mylight.priority = PR_LIGHT_PRIO_HIGH;
//                    }
//                    else
//                        mylight.priority = PR_LIGHT_PRIO_MAX;

//                    actor[i].lightId = polymer_addlight(mylight);
//                    if (actor[i].lightId >= 0)
//                        actor[i].lightptr = prlights[actor[i].lightId];
//                    break;
//                }

//                if (Bmemcmp(&sprite[i], actor[i].lightptr, sizeof(int32_t) * 3))
//                {
//                    Bmemcpy(actor[i].lightptr, &sprite[i], sizeof(int32_t) * 3);
//                    actor[i].lightptr.sector = sprite[i].sectnum;
//                    actor[i].lightptr.flags.invalidate = 1;
//                }
//                if (sprite[i].hitag != actor[i].lightptr.range)
//                {
//                    actor[i].lightptr.range = sprite[i].hitag;
//                    actor[i].lightptr.flags.invalidate = 1;
//                }
//                if ((sprite[i].xvel != actor[i].lightptr.color[0]) ||
//                        (sprite[i].yvel != actor[i].lightptr.color[1]) ||
//                        (sprite[i].zvel != actor[i].lightptr.color[2]))
//                {
//                    actor[i].lightptr.color[0] = sprite[i].xvel;
//                    actor[i].lightptr.color[1] = sprite[i].yvel;
//                    actor[i].lightptr.color[2] = sprite[i].zvel;
//                }
//                if (/*(int)*/!!(sprite[i].cstat & 128) != actor[i].lightptr.publicflags.negative) {
//                    actor[i].lightptr.publicflags.negative = !!(sprite[i].cstat & 128);
//                }
            }
            break;
        }
        case SE_50_SPOT_LIGHT:
        {
            if (!A_CheckSpriteFlags(i, SPRITE_NOLIGHT) && getrendermode() == REND_POLYMER &&
                    !(A_CheckSpriteFlags(i, SPRITE_USEACTIVATOR) && sector[sprite[i].sectnum].lotag & 16384))
            {todoThrow();
//                if (actor[i].lightptr == NULL)
//                {
////#pragma pack(push,1)
//                    var mylight:_prlight = new _prlight();
////#pragma pack(pop)

//                    mylight.sector = sprite[i].sectnum;
//                    Bmemcpy(&mylight, &sprite[i], sizeof(int32_t) * 3);
//                    mylight.range = sprite[i].hitag;
//                    mylight.color[0] = sprite[i].xvel;
//                    mylight.color[1] = sprite[i].yvel;
//                    mylight.color[2] = sprite[i].zvel;
//                    mylight.radius = (256-(sprite[i].shade+128))<<1;
//                    mylight.faderadius = int16(mylight.radius * 0.75);
//                    mylight.angle = sprite[i].ang;
//                    mylight.horiz = sprite[i].extra;
//                    mylight.minshade = sprite[i].xoffset;
//                    mylight.maxshade = sprite[i].yoffset;
//                    mylight.tilenum = actor[i].picnum;
//                    mylight.publicflags.emitshadow = !(sprite[i].cstat & 64);
//                    mylight.publicflags.negative = !!(sprite[i].cstat & 128);

//                    if (sprite[i].cstat & 2)
//                    {
//                        if (sprite[i].cstat & 512)
//                            mylight.priority = PR_LIGHT_PRIO_LOW;
//                        else
//                            mylight.priority = PR_LIGHT_PRIO_HIGH;
//                    }
//                    else
//                        mylight.priority = PR_LIGHT_PRIO_MAX;

//                    actor[i].lightId = polymer_addlight(mylight);
//                    if (actor[i].lightId >= 0)
//                    {
//                        actor[i].lightptr = prlights[actor[i].lightId];

//                        // Hack in case polymer_addlight tweaked the horiz value
//                        if (actor[i].lightptr.horiz != sprite[i].extra)
//                            sprite[i].extra = actor[i].lightptr.horiz;
//                    }
//                    break;
//                }

//                if (Bmemcmp(&sprite[i], actor[i].lightptr, sizeof(int32_t) * 3))
//                {
//                    Bmemcpy(actor[i].lightptr, &sprite[i], sizeof(int32_t) * 3);
//                    actor[i].lightptr.sector = sprite[i].sectnum;
//                    actor[i].lightptr.flags.invalidate = 1;
//                }
//                if (sprite[i].hitag != actor[i].lightptr.range)
//                {
//                    actor[i].lightptr.range = sprite[i].hitag;
//                    actor[i].lightptr.flags.invalidate = 1;
//                }
//                if ((sprite[i].xvel != actor[i].lightptr.color[0]) ||
//                        (sprite[i].yvel != actor[i].lightptr.color[1]) ||
//                        (sprite[i].zvel != actor[i].lightptr.color[2]))
//                {
//                    actor[i].lightptr.color[0] = sprite[i].xvel;
//                    actor[i].lightptr.color[1] = sprite[i].yvel;
//                    actor[i].lightptr.color[2] = sprite[i].zvel;
//                }
//                if (((256-(sprite[i].shade+128))<<1) != actor[i].lightptr.radius)
//                {
//                    actor[i].lightptr.radius = (256-(sprite[i].shade+128))<<1;
//                    actor[i].lightptr.faderadius = int16(actor[i].lightptr.radius * 0.75);
//                    actor[i].lightptr.flags.invalidate = 1;
//                }
//                if (sprite[i].ang != actor[i].lightptr.angle)
//                {
//                    actor[i].lightptr.angle = sprite[i].ang;
//                    actor[i].lightptr.flags.invalidate = 1;
//                }
//                if (sprite[i].extra != actor[i].lightptr.horiz)
//                {
//                    actor[i].lightptr.horiz = sprite[i].extra;
//                    actor[i].lightptr.flags.invalidate = 1;
//                }
//                if (/*(int)*/!(sprite[i].cstat & 64) != actor[i].lightptr.publicflags.emitshadow) {
//                    actor[i].lightptr.publicflags.emitshadow = !(sprite[i].cstat & 64);
//                }
//                if (/*(int)*/!!(sprite[i].cstat & 128) != actor[i].lightptr.publicflags.negative) {
//                    actor[i].lightptr.publicflags.negative = !!(sprite[i].cstat & 128);
//                }
//                actor[i].lightptr.tilenum = actor[i].picnum;
            }

            break;
        }
//#endif // POLYMER
        }
    }
}

//#ifdef POLYMER
//static void A_DoLight(int32_t i)
//{
//    spritetype *const s = &sprite[i];
//    int32_t numsavedfires = 0;

//    if ((sprite[i].picnum != SECTOREFFECTOR && ((s.cstat & 32768) || s.yrepeat < 4)) || A_CheckSpriteFlags(i, SPRITE_NOLIGHT) ||
//        (A_CheckSpriteFlags(i, SPRITE_USEACTIVATOR) && sector[sprite[i].sectnum].lotag & 16384))
//    {
//        if (actor[i].lightptr != NULL)
//            A_DeleteLight(i);
//    }
//    else
//    {
//        int32_t ii;

//        if (actor[i].lightptr != NULL && actor[i].lightcount)
//        {
//            if (!(--actor[i].lightcount))
//                A_DeleteLight(i);
//        }

//        for (ii=0; ii<2; ii++)
//        {
//            if (sprite[i].picnum <= 0)  // oob safety
//                break;

//            switch (DYNAMICTILEMAP(sprite[i].picnum-1+ii))
//            {
//            case DIPSWITCH__STATIC:
//            case DIPSWITCH2__STATIC:
//            case DIPSWITCH3__STATIC:
//            case PULLSWITCH__STATIC:
//            case SLOTDOOR__STATIC:
//            case LIGHTSWITCH__STATIC:
//            case SPACELIGHTSWITCH__STATIC:
//            case SPACEDOORSWITCH__STATIC:
//            case FRANKENSTINESWITCH__STATIC:
//            case POWERSWITCH1__STATIC:
//            case LOCKSWITCH1__STATIC:
//            case POWERSWITCH2__STATIC:
//            case TECHSWITCH__STATIC:
//            case ACCESSSWITCH__STATIC:
//            case ACCESSSWITCH2__STATIC:
//                {
//                    int32_t dx = sintable[(s.ang+512)&2047];
//                    int32_t dy = sintable[(s.ang)&2047];

//                    if ((s.cstat & 32768) || A_CheckSpriteFlags(i, SPRITE_NOLIGHT))
//                    {
//                        if (actor[i].lightptr != NULL)
//                            A_DeleteLight(i);
//                        break;
//                    }

//                    s.x += dx>>7;
//                    s.y += dy>>7;

//                    G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), 1024-ii*256,
//                        ii==0 ? (48+(255<<8)+(48<<16)) : 255+(48<<8)+(48<<16), PR_LIGHT_PRIO_LOW);

//                    s.x -= dx>>7;
//                    s.y -= dy>>7;
//                }
//                break;
//            }
//        }

//        switch (DYNAMICTILEMAP(sprite[i].picnum))
//        {
//        case ATOMICHEALTH__STATIC:
//            G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), LIGHTRAD2 * 3, 128+(128<<8)+(255<<16),PR_LIGHT_PRIO_HIGH_GAME);
//            break;

//        case FIRE__STATIC:
//        case FIRE2__STATIC:
//        case BURNING__STATIC:
//        case BURNING2__STATIC:
//            {
//                uint32_t color;
//                int32_t jj;

//                static int32_t savedfires[32][4];  // sectnum x y z

//                /*
//                if (Actor[i].floorz - Actor[i].ceilingz < 128) break;
//                if (s.z > Actor[i].floorz+2048) break;
//                */

//                switch (s.pal)
//                {
//                case 1: color = 128+(128<<8)+(255<<16); break;
//                case 2: color = 255+(48<<8)+(48<<16); break;
//                case 8: color = 48+(255<<8)+(48<<16); break;
//                default: color = 255+(95<<8); break;
//                }

//                for (jj=numsavedfires-1; jj>=0; jj--)
//                    if (savedfires[jj][0]==s.sectnum && savedfires[jj][1]==(s.x>>3) &&
//                        savedfires[jj][2]==(s.y>>3) && savedfires[jj][3]==(s.z>>7))
//                        break;

//                if (jj==-1 && numsavedfires<32)
//                {
//                    jj = numsavedfires;
//                    G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), LIGHTRAD2, color, PR_LIGHT_PRIO_HIGH_GAME);
//                    savedfires[jj][0] = s.sectnum;
//                    savedfires[jj][1] = s.x>>3;
//                    savedfires[jj][2] = s.y>>3;
//                    savedfires[jj][3] = s.z>>7;
//                    numsavedfires++;
//                }
//            }
//            break;

//        case OOZFILTER__STATIC:
//            if (s.xrepeat > 4)
//                G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), 4096, 128+(255<<8)+(128<<16),PR_LIGHT_PRIO_HIGH_GAME);
//            break;
//        case FLOORFLAME__STATIC:
//        case FIREBARREL__STATIC:
//        case FIREVASE__STATIC:
//            G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), LIGHTRAD, 255+(95<<8),PR_LIGHT_PRIO_HIGH_GAME);
//            break;

//        case EXPLOSION2__STATIC:
//            if (!actor[i].lightcount)
//            {
//                // XXX: This block gets CODEDUP'd too much.
//                int32_t x = ((sintable[(s.ang+512)&2047])>>6);
//                int32_t y = ((sintable[(s.ang)&2047])>>6);

//                s.x -= x;
//                s.y -= y;

//                G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), LIGHTRAD, 255+(95<<8),
//                    s.yrepeat > 32 ? PR_LIGHT_PRIO_HIGH_GAME : PR_LIGHT_PRIO_LOW_GAME);

//                s.x += x;
//                s.y += y;
//            }
//            break;
//        case FORCERIPPLE__STATIC:
//        case TRANSPORTERBEAM__STATIC:
//            G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), LIGHTRAD, 80+(80<<8)+(255<<16),PR_LIGHT_PRIO_LOW_GAME);
//            break;
//        case GROWSPARK__STATIC:
//            {
//                int32_t x = ((sintable[(s.ang+512)&2047])>>6);
//                int32_t y = ((sintable[(s.ang)&2047])>>6);

//                s.x -= x;
//                s.y -= y;

//                G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), 2048, 255+(95<<8),PR_LIGHT_PRIO_HIGH_GAME);

//                s.x += x;
//                s.y += y;
//            }
//            break;
//        case SHRINKEREXPLOSION__STATIC:
//            {
//                int32_t x = ((sintable[(s.ang+512)&2047])>>6);
//                int32_t y = ((sintable[(s.ang)&2047])>>6);

//                s.x -= x;
//                s.y -= y;

//                G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), 2048, 128+(255<<8)+(128<<16),PR_LIGHT_PRIO_HIGH_GAME);

//                s.x += x;
//                s.y += y;
//            }
//            break;
//        case FREEZEBLAST__STATIC:
//            G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), LIGHTRAD<<2, 128+(128<<8)+(255<<16),PR_LIGHT_PRIO_HIGH_GAME);
//            break;
//        case COOLEXPLOSION1__STATIC:
//            G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), LIGHTRAD<<2, 128+(0<<8)+(255<<16),PR_LIGHT_PRIO_HIGH_GAME);
//            break;
//        case SHRINKSPARK__STATIC:
//            G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), LIGHTRAD, 128+(255<<8)+(128<<16),PR_LIGHT_PRIO_HIGH_GAME);
//            break;
//        case FIRELASER__STATIC:
//            G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), 64 * s.yrepeat, 255+(95<<8),PR_LIGHT_PRIO_LOW_GAME);
//            break;
//        case RPG__STATIC:
//            G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), 128 * s.yrepeat, 255+(95<<8),PR_LIGHT_PRIO_LOW_GAME);
//            break;
//        case SHOTSPARK1__STATIC:
//            if (actor[i].t_data[2] == 0) // check for first frame of action
//            {
//                int32_t x = ((sintable[(s.ang+512)&2047])>>7);
//                int32_t y = ((sintable[(s.ang)&2047])>>7);

//                s.x -= x;
//                s.y -= y;

//                G_AddGameLight(0, i, ((s.yrepeat*tilesizy[s.picnum])<<1), 16 * s.yrepeat, 255+(95<<8),PR_LIGHT_PRIO_LOW_GAME);
//                actor[i].lightcount = 1;

//                s.x += x;
//                s.y += y;
//            }
//            break;
//        }
//    }
//}
//#endif // POLYMER

function A_PlayAlertSound(/*int32_t*/ i: number): void
{
    if (sprite[i].extra > 0)
        switch (DYNAMICTILEMAP(sprite[i].picnum))
        {
        case LIZTROOPONTOILET__STATIC:
        case LIZTROOPJUSTSIT__STATIC:
        case LIZTROOPSHOOT__STATIC:
        case LIZTROOPJETPACK__STATIC:
        case LIZTROOPDUCKING__STATIC:
        case LIZTROOPRUNNING__STATIC:
        case LIZTROOP__STATIC:
            A_PlaySound(PRED_RECOG,i);
            break;
        case LIZMAN__STATIC:
        case LIZMANSPITTING__STATIC:
        case LIZMANFEEDING__STATIC:
        case LIZMANJUMP__STATIC:
            A_PlaySound(CAPT_RECOG,i);
            break;
        case PIGCOP__STATIC:
        case PIGCOPDIVE__STATIC:
            A_PlaySound(PIG_RECOG,i);
            break;
        case RECON__STATIC:
            A_PlaySound(RECO_RECOG,i);
            break;
        case DRONE__STATIC:
            A_PlaySound(DRON_RECOG,i);
            break;
        case COMMANDER__STATIC:
        case COMMANDERSTAYPUT__STATIC:
            A_PlaySound(COMM_RECOG,i);
            break;
        case ORGANTIC__STATIC:
            A_PlaySound(TURR_RECOG,i);
            break;
        case OCTABRAIN__STATIC:
        case OCTABRAINSTAYPUT__STATIC:
            A_PlaySound(OCTA_RECOG,i);
            break;
        case BOSS1__STATIC:
        case BOSS1STAYPUT__STATIC:
            S_PlaySound(BOS1_RECOG);
            break;
        case BOSS2__STATIC:
            if (sprite[i].pal != 0)
                S_PlaySound(BOS2_RECOG);
            else S_PlaySound(WHIPYOURASS);
            break;
        case BOSS3__STATIC:
            if (sprite[i].pal != 0)
                S_PlaySound(BOS3_RECOG);
            else S_PlaySound(RIPHEADNECK);
            break;
        case BOSS4__STATIC:
        case BOSS4STAYPUT__STATIC:
            if (sprite[i].pal != 0)
                S_PlaySound(BOS4_RECOG);
            else S_PlaySound(BOSS4_FIRSTSEE);
            break;
        case GREENSLIME__STATIC:
            A_PlaySound(SLIM_RECOG,i);
            break;
        }
}

function A_CheckEnemyTile(/*int32_t */pn: number): number
{
    return ((g_tile[pn].flags & (SPRITE_HARDCODED_BADGUY|SPRITE_BADGUY)) != 0)?1:0;
}

function A_CheckSwitchTile(i: number): number
{
    var j: number;

    if (sprite[i].picnum <= 0)  // picnum 0 would oob in the switch below
        return 0;

    // MULTISWITCH has 4 states so deal with it separately.
    if (sprite[i].picnum >= MULTISWITCH && sprite[i].picnum <= MULTISWITCH+3)
        return 1;

    // ACCESSSWITCH and ACCESSSWITCH2 are only active in one state so deal with
    // them separately.
    if (sprite[i].picnum == ACCESSSWITCH || sprite[i].picnum == ACCESSSWITCH2) return 1;

    // Loop to catch both states of switches.
    for (j=1; j>=0; j--)
    {
        switch (DYNAMICTILEMAP(sprite[i].picnum-j))
        {
        case HANDPRINTSWITCH__STATIC:
        case ALIENSWITCH__STATIC:
        case MULTISWITCH__STATIC:
        case PULLSWITCH__STATIC:
        case HANDSWITCH__STATIC:
        case SLOTDOOR__STATIC:
        case LIGHTSWITCH__STATIC:
        case SPACELIGHTSWITCH__STATIC:
        case SPACEDOORSWITCH__STATIC:
        case FRANKENSTINESWITCH__STATIC:
        case LIGHTSWITCH2__STATIC:
        case POWERSWITCH1__STATIC:
        case LOCKSWITCH1__STATIC:
        case POWERSWITCH2__STATIC:
        case DIPSWITCH__STATIC:
        case DIPSWITCH2__STATIC:
        case TECHSWITCH__STATIC:
        case DIPSWITCH3__STATIC:
            return 1;
        }
    }

    return 0;
}

function logSprite(where:string):void {
    if(DEBUG_SPRITE) {
        dlog(DEBUG_SPRITE, where);
		dlog(DEBUG_SPRITE, "\nDEBUG_SPRITE: ");
        for (var i = 0; i < Numsprites; i++) {
			dlog(DEBUG_SPRITE, "(%i: x:%i y:%i z:%i, vel: %i %i %i, %i)\n", i, sprite[i].x, sprite[i].y, sprite[i].z,  sprite[i].xvel, sprite[i].yvel, sprite[i].zvel, sprite[i].cstat);
        }
		dlog(DEBUG_SPRITE, "\n");
    }
}

function logHeadspritestat(where:string):void {
    if(DEBUG_headspritestat) {
        dlog(DEBUG_headspritestat, where);
        dlog(DEBUG_headspritestat, "\nheadspritestat: ");
        var last:number;
        for (var i = 0; i < MAXSTATUS; i++) {
            if(headspritestat[i] !== last)
                dlog(DEBUG_headspritestat, "%i: %i, ", i, headspritestat[0]);
            last = headspritestat[i];
        }

        dlog(DEBUG_headspritestat, "\nprevspritestat: ");
        last = null;
        for (var i = 0; i < MAXSTATUS; i++) {
            if(prevspritestat[i] !== last)
                dlog(DEBUG_headspritestat, "%i: %i, ", i, prevspritestat[0]);
            last = prevspritestat[i];
        }
		dlog(DEBUG_headspritestat, "\n");
    }
}

function G_MoveWorld(): void
{
    var /*int32_t */k = MAXSTATUS-1;

    logHeadspritestat("G_MoveWorld");
    do
    {
        var /*int32_t */i = headspritestat[k];

        while (i >= 0)
        {
            var /*const int32_t */j = nextspritestat[i];

            if (!G_HaveEvent(EVENT_PREGAME) || A_CheckSpriteFlags(i, SPRITE_NOEVENTCODE))
            {
                i = j;
                continue;
            }

            {
                var /*int32_t */p = new R<number>(0), pl = A_FindPlayer(sprite[i], p);
                VM_OnEvent(EVENT_PREGAME, i, pl, p.$, 0);
            }

            i = j;
        }
    }
    while (k--);
    
    logHeadspritestat("G_MoveZombieActors");
    G_MoveZombieActors();     //ST 2
    logHeadspritestat("G_MoveWeapons");
    G_MoveWeapons();          //ST 4
    logHeadspritestat("G_MoveTransports");
    G_MoveTransports();       //ST 9

    logHeadspritestat("G_MovePlayers");
    G_MovePlayers();          //ST 10
    logHeadspritestat("G_MoveFallers");
    G_MoveFallers();          //ST 12
    logHeadspritestat("G_MoveMisc");
    G_MoveMisc();             //ST 5

    logHeadspritestat("G_MoveActors");
    G_MoveActors();           //ST 1

    // XXX: Has to be before effectors, in particular movers?
    // TODO: lights in moving sectors ought to be interpolated
    logHeadspritestat("G_DoEffectorLights");
    G_DoEffectorLights();

    logHeadspritestat("G_MoveEffectors");
    G_MoveEffectors();        //ST 3

    logHeadspritestat("G_MoveStandables");
    G_MoveStandables();       //ST 6

    k = MAXSTATUS-1;

    do
    {
        var /*int32_t */i = headspritestat[k];

        while (i >= 0)
        {
            var/*const int32_t */j = nextspritestat[i];

//#ifdef POLYMER
            if (getrendermode() == REND_POLYMER)
                todoThrow("A_DoLight(i);");
//#endif
            if (!G_HaveEvent(EVENT_GAME) || A_CheckSpriteFlags(i, SPRITE_NOEVENTCODE))
            {
                i = j;
                continue;
            }

            {
                var /*int32_t */p = new R<number>(0), pl = A_FindPlayer(sprite[i], p);
                VM_OnEvent(EVENT_GAME,i, pl, p.$, 0);
            }

            i = j;
        }
    }
    while (k--);

    logHeadspritestat("G_DoSectorAnimations");
    G_DoSectorAnimations();
    logHeadspritestat("G_MoveFX");
    G_MoveFX();              //ST 11
    logHeadspritestat("G_MoveFX end");

    logSprite("EO G_MoveWorld");
}

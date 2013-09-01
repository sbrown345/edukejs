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

/// <reference path="../../jaudiolib/headers/fx_man.h.ts" />
/// <reference path="../../jaudiolib/source/fx_man.c.ts" />

/// <reference path="../../jmact/headers/keyboard.h.ts" />

/// <reference path="../../eduke32/headers/_functio.h.ts" />
/// <reference path="../../eduke32/headers/_rts.h.ts" />
/// <reference path="../../eduke32/headers/actors.h.ts" />
/// <reference path="../../eduke32/headers/common_game.h.ts" />
/// <reference path="../../eduke32/headers/duke3d.h.ts" />
/// <reference path="../../eduke32/headers/function.h.ts" />
/// <reference path="../../eduke32/headers/game.h.ts" />
/// <reference path="../../eduke32/headers/gamedef.h.ts" />
/// <reference path="../../eduke32/headers/gameexec.h.ts" />
/// <reference path="../../eduke32/headers/global.h.ts" />
/// <reference path="../../eduke32/headers/grpscan.h.ts" />
/// <reference path="../../eduke32/headers/player.h.ts" />
/// <reference path="../../eduke32/headers/premap.h.ts" />
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
/// <reference path="../../eduke32/source/music.c.ts" />
/// <reference path="../../eduke32/source/namesdyn.c.ts" />
/// <reference path="../../eduke32/source/net.c.ts" />
/// <reference path="../../eduke32/source/osd.c.ts" />
/// <reference path="../../eduke32/source/osdcmds.c.ts" />
/// <reference path="../../eduke32/source/player.c.ts" />
/// <reference path="../../eduke32/source/rts.c.ts" />
/// <reference path="../../eduke32/source/sector.c.ts" />
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
//#include "game.h"
//#include "common_game.h"
//#include "osd.h"
//#include "gamedef.h"
//#include "premap.h"
//#include "sounds.h"
//#include "gameexec.h"
//#include "anim.h"
//#include "menus.h"
//#include "demo.h"

//#ifdef RENDERTYPEWIN
//#define WIN32_LEAN_AND_MEAN
//#include <windows.h>
//#endif

//#ifdef LUNATIC
//# include "lunatic_game.h"
//#endif

var g_halfScreen: halfdimen_t = new halfdimen_t();
var g_halveScreenArea = 0;//int32_t

var g_whichPalForPlayer = 9;//static int32_t 

var precachehightile: Uint8Array[] = multiDimArray<Uint8Array>(Uint8Array, 2, MAXTILES>>3); //static uint8_t 
var g_precacheCount = 0; //static int32_t  

//var g_levelTextTime = 0; //extern int32_t 
 
function flag_precache(/*int32_t*/ tile: number, /*int32_t*/ type: number): void
{
    if (!(gotpic[tile>>3] & pow2char[tile&7]))
        g_precacheCount++;
    gotpic[tile>>3] |= pow2char[tile&7];
    precachehightile[type][tile>>3] |= pow2char[tile&7];
}

function tloadtile(/*int32_t */tilenume: number, /*int32_t */type: number): void
{
    var i: number,j: number;

    if ((picanm[tilenume].sf&PICANM_ANIMTYPE_MASK)==PICANM_ANIMTYPE_BACK)
    {
        i = tilenume - picanm[tilenume].num;
        j = tilenume;
    }
    else
    {
        i = tilenume;
        j = tilenume + picanm[tilenume].num;
    }   

    for (; i<=j; i++)
        flag_precache(i, type);
}

function G_CacheSpriteNum(/*int32_t*/ i: number): void 
{
    var /*char */maxc: number;
    var /*int32_t */j: number;

    if (ud.monsters_off && A_CheckEnemySprite(sprite[i])) return;

    maxc = 1;

    if (g_tile[sprite[i].picnum].cacherange >= sprite[i].picnum)
        for (j = sprite[i].picnum; j <= g_tile[sprite[i].picnum].cacherange; j++)
            tloadtile(j,1);

    switch (DYNAMICTILEMAP(sprite[i].picnum))
    {
    case HYDRENT__STATIC:
        tloadtile(BROKEFIREHYDRENT,1);
        for (j = TOILETWATER; j < (TOILETWATER+4); j++) tloadtile(j,1);
        break;
    case TOILET__STATIC:
        tloadtile(TOILETBROKE,1);
        for (j = TOILETWATER; j < (TOILETWATER+4); j++) tloadtile(j,1);
        break;
    case STALL__STATIC:
        tloadtile(STALLBROKE,1);
        for (j = TOILETWATER; j < (TOILETWATER+4); j++) tloadtile(j,1);
        break;
    case RUBBERCAN__STATIC:
        maxc = 2;
        break;
    case TOILETWATER__STATIC:
        maxc = 4;
        break;
    case FEMPIC1__STATIC:
        maxc = 44;
        break;
    case LIZTROOP__STATIC:
    case LIZTROOPRUNNING__STATIC:
    case LIZTROOPSHOOT__STATIC:
    case LIZTROOPJETPACK__STATIC:
    case LIZTROOPONTOILET__STATIC:
    case LIZTROOPDUCKING__STATIC:
        for (j = LIZTROOP; j < (LIZTROOP+72); j++) tloadtile(j,1);
        for (j=HEADJIB1; j<LEGJIB1+3; j++) tloadtile(j,1);
        maxc = 0;
        break;
    case WOODENHORSE__STATIC:
        maxc = 5;
        for (j = HORSEONSIDE; j < (HORSEONSIDE+4); j++) tloadtile(j,1);
        break;
    case NEWBEAST__STATIC:
    case NEWBEASTSTAYPUT__STATIC:
        maxc = 90;
        break;
    case BOSS1__STATIC:
    case BOSS2__STATIC:
    case BOSS3__STATIC:
        maxc = 30;
        break;
    case OCTABRAIN__STATIC:
    case OCTABRAINSTAYPUT__STATIC:
    case COMMANDER__STATIC:
    case COMMANDERSTAYPUT__STATIC:
        maxc = 38;
        break;
    case RECON__STATIC:
        maxc = 13;
        break;
    case PIGCOP__STATIC:
    case PIGCOPDIVE__STATIC:
        maxc = 61;
        break;
    case SHARK__STATIC:
        maxc = 30;
        break;
    case LIZMAN__STATIC:
    case LIZMANSPITTING__STATIC:
    case LIZMANFEEDING__STATIC:
    case LIZMANJUMP__STATIC:
        for (j=LIZMANHEAD1; j<LIZMANLEG1+3; j++) tloadtile(j,1);
        maxc = 80;
        break;
    case APLAYER__STATIC:
        maxc = 0;
        if ((g_netServer || ud.multimode > 1))
        {
            maxc = 5;
            for (j = 1420; j < 1420+106; j++) tloadtile(j,1);
        }
        break;
    case ATOMICHEALTH__STATIC:
        maxc = 14;
        break;
    case DRONE__STATIC:
        maxc = 10;
        break;
    case EXPLODINGBARREL__STATIC:
    case SEENINE__STATIC:
    case OOZFILTER__STATIC:
        maxc = 3;
        break;
    case NUKEBARREL__STATIC:
    case CAMERA1__STATIC:
        maxc = 5;
        break;
        // caching of HUD sprites for weapons that may be in the level
    case CHAINGUNSPRITE__STATIC:
        for (j=CHAINGUN; j<=CHAINGUN+7; j++) tloadtile(j,1);
        break;
    case RPGSPRITE__STATIC:
        for (j=RPGGUN; j<=RPGGUN+2; j++) tloadtile(j,1);
        break;
    case FREEZESPRITE__STATIC:
        for (j=FREEZE; j<=FREEZE+5; j++) tloadtile(j,1);
        break;
    case GROWSPRITEICON__STATIC:
    case SHRINKERSPRITE__STATIC:
        for (j=SHRINKER-2; j<=SHRINKER+5; j++) tloadtile(j,1);
        break;
    case HBOMBAMMO__STATIC:
    case HEAVYHBOMB__STATIC:
        for (j=HANDREMOTE; j<=HANDREMOTE+5; j++) tloadtile(j,1);
        break;
    case TRIPBOMBSPRITE__STATIC:
        for (j=HANDHOLDINGLASER; j<=HANDHOLDINGLASER+4; j++) tloadtile(j,1);
        break;
    case SHOTGUNSPRITE__STATIC:
        tloadtile(SHOTGUNSHELL,1);
        for (j=SHOTGUN; j<=SHOTGUN+6; j++) tloadtile(j,1);
        break;
    case DEVISTATORSPRITE__STATIC:
        for (j=DEVISTATOR; j<=DEVISTATOR+1; j++) tloadtile(j,1);
        break;

    }

    for (j = sprite[i].picnum; j < (sprite[i].picnum+maxc); j++) tloadtile(j,1);
}

function G_PrecacheSprites(): void
{
    var /*int32_t */i: number,j: number;

    for (i=0; i<MAXTILES; i++)
    {
        if (g_tile[i].flags & SPRITE_PROJECTILE)
            tloadtile(i,1);

        if (A_CheckSpriteTileFlags(i, SPRITE_CACHE))
            for (j = i; j <= g_tile[i].cacherange; j++)
                tloadtile(j,1);
    }
    tloadtile(BOTTOMSTATUSBAR,1);
    if ((g_netServer || ud.multimode > 1))
        tloadtile(FRAGBAR,1);

    tloadtile(VIEWSCREEN,1);

    for (i=STARTALPHANUM; i<ENDALPHANUM+1; i++) tloadtile(i,1);
    for (i=BIGALPHANUM-11; i<BIGALPHANUM+82; i++) tloadtile(i,1);
    for (i=MINIFONT; i<MINIFONT+93; i++) tloadtile(i,1);

    for (i=FOOTPRINTS; i<FOOTPRINTS+3; i++) tloadtile(i,1);

    for (i = BURNING; i < BURNING+14; i++) tloadtile(i,1);
    for (i = BURNING2; i < BURNING2+14; i++) tloadtile(i,1);

    for (i = CRACKKNUCKLES; i < CRACKKNUCKLES+4; i++) tloadtile(i,1);

    for (i = FIRSTGUN; i < FIRSTGUN+3 ; i++) tloadtile(i,1);
    for (i = FIRSTGUNRELOAD; i < FIRSTGUNRELOAD+8 ; i++) tloadtile(i,1);

    for (i = EXPLOSION2; i < EXPLOSION2+21 ; i++) tloadtile(i,1);

    for (i = COOLEXPLOSION1; i < COOLEXPLOSION1+21 ; i++) tloadtile(i,1);

    tloadtile(BULLETHOLE,1);
    tloadtile(BLOODPOOL,1);
    for (i = TRANSPORTERBEAM; i < (TRANSPORTERBEAM+6); i++) tloadtile(i,1);

    for (i = SMALLSMOKE; i < (SMALLSMOKE+4); i++) tloadtile(i,1);
    for (i = SHOTSPARK1; i < (SHOTSPARK1+4); i++) tloadtile(i,1);

    for (i = BLOOD; i < (BLOOD+4); i++) tloadtile(i,1);
    for (i = JIBS1; i < (JIBS5+5); i++) tloadtile(i,1);
    for (i = JIBS6; i < (JIBS6+8); i++) tloadtile(i,1);

    for (i = SCRAP1; i < (SCRAP1+29); i++) tloadtile(i,1);

    tloadtile(FIRELASER,1);
    for (i=TRANSPORTERSTAR; i<TRANSPORTERSTAR+6; i++) tloadtile(i,1);
    for (i=FORCERIPPLE; i<(FORCERIPPLE+9); i++) tloadtile(i,1);

    for (i=MENUSCREEN; i<DUKECAR; i++) tloadtile(i,1);

    for (i=RPG; i<RPG+7; i++) tloadtile(i,1);
    for (i=FREEZEBLAST; i<FREEZEBLAST+3; i++) tloadtile(i,1);
    for (i=SHRINKSPARK; i<SHRINKSPARK+4; i++) tloadtile(i,1);
    for (i=GROWSPARK; i<GROWSPARK+4; i++) tloadtile(i,1);
    for (i=SHRINKEREXPLOSION; i<SHRINKEREXPLOSION+4; i++) tloadtile(i,1);
    for (i=MORTER; i<MORTER+4; i++) tloadtile(i,1);
    for (i=0; i<=60; i++) tloadtile(i,1);
}

//// FIXME: this function is a piece of shit, needs specific sounds listed
//static int32_t G_CacheSound(uint32_t num)
//{
//    int16_t fp = -1;
//    int32_t   l;

//    if (num >= MAXSOUNDS || ud.config.SoundToggle == 0) return 0;
//    if (ud.config.FXDevice < 0) return 0;

//    if (!g_sounds[num].filename && !g_sounds[num].filename1) return 0;
//    if (g_sounds[num].filename1) fp = kopen4loadfrommod(g_sounds[num].filename1,g_loadFromGroupOnly);
//    if (fp == -1) fp = kopen4loadfrommod(g_sounds[num].filename,g_loadFromGroupOnly);
//    if (fp == -1)
//    {
////        OSD_Printf(OSDTEXT_RED "Sound %s(#%d) not found!\n",g_sounds[num].filename,num);
//        return 0;
//    }

//    l = kfilelength(fp);
//    g_sounds[num].soundsiz = l;

//    if ((ud.level_number == 0 && ud.volume_number == 0 && (num == 189 || num == 232 || num == 99 || num == 233 || num == 17)) ||
//            (l < 12288))
//    {
//        g_soundlocks[num] = 199;
//        allocache((intptr_t *)&g_sounds[num].ptr,l,(char *)&g_soundlocks[num]);
//        if (g_sounds[num].ptr != NULL)
//            kread(fp, g_sounds[num].ptr , l);
//    }
//    kclose(fp);
//    return 1;
//}

function G_PrecacheSounds(): void
{
    todo("G_PrecacheSounds");
    //int32_t i, j;

    //if (ud.config.FXDevice < 0) return;
    //j = 0;

    //for (i=MAXSOUNDS-1; i>=0; i--)
    //    if (g_sounds[i].ptr == 0)
    //    {
    //        j++;
    //        if ((j&7) == 0)
    //            G_HandleAsync();

    //        G_CacheSound(i);
    //    }
}

function G_DoLoadScreen(statustext: string, percent: number): void
{
    var i=0,j: number;
    
    if (ud.recstat != 2)
    {
        j = VM_OnEvent(EVENT_GETLOADTILE, -1, myconnectindex, -1, LOADSCREEN);

        //g_player[myconnectindex].ps.palette = palette;
        P_SetGamePalette(g_player[myconnectindex].ps, BASEPAL, 1);    // JBF 20040308

        if (!statustext)
        {
            i = ud.screen_size;
            ud.screen_size = 0;
            throw "todo G_UpdateScreenArea();";;
            clearallviews(0);
        }

        if (uint32(j) < 2*MAXTILES)
        {
            clearallviews(0);

            rotatesprite_fs(320<<15,200<<15,65536,0, j > MAXTILES-1?j-MAXTILES:j,0,0,
                            2+8+64+(ud.bgstretch?1024:0));
        }
        else
        {
            nextpage();
            return;
        }

        if (boardfilename[0] != 0 && ud.level_number == 7 && ud.volume_number == 0)
        {
            menutext(160,90,0,0,"Loading User Map");
            gametextpal(160,90+10,boardfilename.toString(),14,2);
        }
        else
        {
            menutext(160,90,0,0,"Loading");
            if (MapInfo[(ud.volume_number*MAXLEVELS) + ud.level_number].name != NULL)
                menutext(160,90+16+8,0,0,MapInfo[(ud.volume_number*MAXLEVELS) + ud.level_number].name);
        }
        
        if (statustext) gametext(160,180,statustext,0,2+8+16);

        if (percent != -1)
        {
            todo("percent != -1");
            //var ii = scale(scale(xdim-1,288,320),percent,100);
            //rotatesprite(31<<16,145<<16,65536,0,929,15,0,2+8+16,0,0,ii,ydim-1);
            //rotatesprite(159<<16,145<<16,65536,0,929,15,0,2+8+16,0,0,ii,ydim-1);
            //rotatesprite(30<<16,144<<16,65536,0,929,0,0,2+8+16,0,0,ii,ydim-1);
            //rotatesprite(158<<16,144<<16,65536,0,929,0,0,2+8+16,0,0,ii,ydim-1);
        }

        VM_OnEvent(EVENT_DISPLAYLOADINGSCREEN, g_player[screenpeek].ps.i, screenpeek, -1, 0);
        nextpage();

        if (!statustext)
        {
            KB_FlushKeyboardQueue();
            ud.screen_size = i;
        }
    }
    else
    {
        todoThrow();
//        if (!statustext)
//        {
//            clearallviews(0);
//            //g_player[myconnectindex].ps.palette = palette;
//            //G_FadePalette(0,0,0,0);
//            P_SetGamePalette(g_player[myconnectindex].ps, BASEPAL, 0);    // JBF 20040308
//        }
//        /*Gv_SetVar(g_iReturnVarID,LOADSCREEN, -1, -1);*/

//        j = VM_OnEvent(EVENT_GETLOADTILE, -1, myconnectindex, -1, LOADSCREEN);

//        if ((uint32_t)j < 2*MAXTILES)
//        {
//            rotatesprite_fs(320<<15,200<<15,65536, 0,j > MAXTILES-1?j-MAXTILES:j,0,0,
//                            2+8+64+(ud.bgstretch?1024:0));
//        }
//        else
//        {
//            nextpage();
//            return;
//        }

//        menutext(160,105,0,0,"Loading...");
//        if (statustext) gametext(160,180,statustext,0,2+8+16);
//        VM_OnEvent(EVENT_DISPLAYLOADINGSCREEN, g_player[screenpeek].ps.i, screenpeek, -1, 0);
//        nextpage();
    }
}

//extern void G_SetCrosshairColor(int32_t r, int32_t g, int32_t b);
//extern palette_t CrosshairColors;

function G_CacheMapData(): void
{todo("G_CacheMapData");return;
    var i: number,j: number,pc=0;              //int32_t 
    var tc: number;                    //int32_t 
    var starttime: number, endtime: number;   //uint32_t

    if (ud.recstat == 2)
        return;

    S_PauseMusic(1);
    if (MapInfo[MAXVOLUMES*MAXLEVELS+2].alt_musicfn)
    {
        S_StopMusic();
        S_PlayMusic(EnvMusicFilename[2][0],MAXVOLUMES*MAXLEVELS+2); // loadmus
    }

    starttime = getticks();

    G_PrecacheSounds();
    G_PrecacheSprites();

    for (i=0; i<numwalls; i++)
    {
        tloadtile(wall[i].picnum, 0);

        if (wall[i].overpicnum >= 0)
        {
            tloadtile(wall[i].overpicnum, 0);
        }
    }

    for (i=0; i<numsectors; i++)
    {
        tloadtile(sector[i].floorpicnum, 0);
        tloadtile(sector[i].ceilingpicnum, 0);
        if (sector[i].ceilingpicnum == LA)  // JBF 20040509: if( waloff[sector[i].ceilingpicnum] == LA) WTF?!?!?!?
        {
            tloadtile(LA+1, 0);
            tloadtile(LA+2, 0);
        }

        j = headspritesect[i];
        while (j >= 0)
        {
            if (sprite[j].xrepeat != 0 && sprite[j].yrepeat != 0 && (sprite[j].cstat&32768) == 0)
                G_CacheSpriteNum(j);
            j = nextspritesect[j];
        }
    }

    tc = totalclock;
    j = 0;

    for (i=0; i<MAXTILES; i++)
    {
        if (!(i&7) && !gotpic[i>>3])
        {
            i+=7;
            continue;
        }
        if (gotpic[i>>3] & pow2char[i&7])
        {
            if (waloff[i] == null /*0*/)
                loadtile(/*(int16_t)*/i);

//#ifdef USE_OPENGL
// PRECACHE
            if (ud.config.useprecache && bpp > 8)
            {
                var /*int32_t */k: number,type: number;

                for (type=0; type<=1; type++)
                    if (precachehightile[type][i>>3] & pow2char[i&7])
                    {
                        k = 0;
                        for (k=0; k<MAXPALOOKUPS-RESERVEDPALS && !KB_KeyPressed(sc_Space); k++)
                        {
                            // this is the CROSSHAIR_COLOR, see comment in game.c
                            if (k == MAXPALOOKUPS-RESERVEDPALS-1)
                                break;
//#ifdef POLYMER
                            if (getrendermode() != REND_POLYMER || todoThrow("!polymer_havehighpalookup(0, k)"))
//#endif
                                polymost_precache(i,k,type);
                        }

                        if (r_detailmapping && !KB_KeyPressed(sc_Space))
                            polymost_precache(i,DETAILPAL,type);
                        if (r_glowmapping && !KB_KeyPressed(sc_Space))
                            polymost_precache(i,GLOWPAL,type);
//#ifdef POLYMER
                        if (getrendermode() == REND_POLYMER)
                        {
                            todoThrow();
                            //if (pr_specularmapping && !KB_KeyPressed(sc_Space))
                            //    polymost_precache(i,SPECULARPAL,type);
                            //if (pr_normalmapping && !KB_KeyPressed(sc_Space))
                            //    polymost_precache(i,NORMALPAL,type);
                        }
//#endif
                    }
            }
//#endif
            j++;
            pc++;
        }
        else continue;

        MUSIC_Update();

        if ((j&7) == 0)
            G_HandleAsync();

        if (bpp > 8 && totalclock - tc > TICRATE/4)
        {
            /*Bsprintf(tempbuf,"%d resources remaining\n",g_precacheCount-pc+1);*/
            tc = min(100,100*pc/g_precacheCount);
            Bsprintf(tempbuf,"Loaded %d%% (%d/%d textures)\n",tc,pc,g_precacheCount);
            G_DoLoadScreen(tempbuf.toString(), tc);
            tc = totalclock;
        }
    }

    clearbufbyte(gotpic,0,sizeof(gotpic),0);

    endtime = getticks();
    OSD_Printf("Cache time: %dms\n", endtime-starttime);
}

//void G_SetupCamTile(int32_t i,int32_t wn)
//{
//    //if (waloff[wn] == 0) loadtile(wn);
//    setviewtotile(wn,tilesizy[wn],tilesizx[wn]);

//    yax_preparedrawrooms();
//    drawrooms(sprite[i].x,sprite[i].y,sprite[i].z,sprite[i].ang,100+sprite[i].shade,sprite[i].sectnum);
//    yax_drawrooms(G_DoSpriteAnimations, sprite[i].sectnum, 0, 65536);

//    display_mirror = 1;
//    G_DoSpriteAnimations(sprite[i].x,sprite[i].y,sprite[i].ang,65536);
//    display_mirror = 0;
//    drawmasks();

//    setviewback();
//    squarerotatetile(wn);
//    invalidatetile(wn,-1,255);
//}

function G_UpdateScreenArea(): void 
{
    if (!in3dmode())
        return;

    ud.screen_size = clamp(ud.screen_size, 0, 64);
    if (ud.screen_size == 0)
        flushperms();

    {
        var ss = max(ud.screen_size-8,0); //const int32_t

        var x1 = scale(ss,xdim,160);
        var x2 = xdim-x1;

        var y1 = ss;
        var y2 = 200;

        if (ud.screen_size > 0 && (GametypeFlags[ud.coop]&GAMETYPE_FRAGBAR) && (g_netServer || ud.multimode > 1))
        {
            var i: number, j = 0;

            for (i = 0; i != -1; i = connectpoint2[i])
                if (i > j) j = i;

            if (j >= 1) y1 += 8;
            if (j >= 4) y1 += 8;
            if (j >= 8) y1 += 8;
            if (j >= 12) y1 += 8;
        }
        
        if (ud.screen_size >= 8 && ud.statusbarmode==0)
            y2 -= (ss+scale(tilesizy[BOTTOMSTATUSBAR],ud.statusbarscale,100));

        y1 = scale(y1,ydim,200);
        y2 = scale(y2,ydim,200)+((getrendermode() != REND_CLASSIC)?1:0);

        if (g_halveScreenArea)
        {
            var ourxdimen=x2-x1, ourydimen=y2-y1;

            g_halfScreen.x1 = x1;
            g_halfScreen.y1 = y1;
            g_halfScreen.xdimen = (ourxdimen>>1);
            g_halfScreen.ydimen = (ourydimen>>1);

            x2 = x1 + (ourxdimen>>1);
            y2 = y1 + (ourydimen>>1);
        }

        setview(x1,y1,x2-1,y2-1);
    }

    G_GetCrosshairColor();
    G_SetCrosshairColor(CrosshairColors.r, CrosshairColors.g, CrosshairColors.b);

    pub = NUMPAGES;
    pus = NUMPAGES;
}

function P_RandomSpawnPoint(/*int32_t */snum:number):void
{
    var p = g_player[snum].ps;
    var/*int32_t */i=snum,j:number,k:number;
    var /*uint32_t */dist:number,pdist = -1;

    if ((g_netServer || ud.multimode > 1) && !(GametypeFlags[ud.coop] & GAMETYPE_FIXEDRESPAWN))
    {
        i = krand()%g_numPlayerSprites;
        if (GametypeFlags[ud.coop] & GAMETYPE_TDMSPAWN)
        {
            for (j=0; j<ud.multimode; j++)
            {
                if (j != snum && g_player[j].ps.team == p.team && sprite[g_player[j].ps.i].extra > 0)
                {
                    for (k=0; k<g_numPlayerSprites; k++)
                    {
                        dist = FindDistance2D(g_player[j].ps.pos.x-g_playerSpawnPoints[k].ox,g_player[j].ps.pos.y-g_playerSpawnPoints[k].oy);
                        if (dist < pdist)
                            i = k, pdist = dist;
                    }
                    break;
                }
            }
        }
    }

    p.bobposx = p.opos.x = p.pos.x = g_playerSpawnPoints[i].ox;
    p.bobposy = p.opos.y = p.pos.y = g_playerSpawnPoints[i].oy;
    p.opos.z = p.pos.z = g_playerSpawnPoints[i].oz;
    p.ang = g_playerSpawnPoints[i].oa;
    p.cursectnum = g_playerSpawnPoints[i].os;
    sprite[p.i].cstat = 1+256;
}

function P_ResetTintFade(ps: DukePlayer_t): void
{
    ps.pals.f = 0;
//#ifdef LUNATIC
    //ps.palsfadeprio = 0;
//#endif
}

function P_ResetPlayer(/*int32_t */snum:number):void
{
    var tmpvect = new vec3_t();;
    var pl = g_player[snum].ps;
    var sp = sprite[pl.i];

    tmpvect.x = pl.pos.x;
    tmpvect.y = pl.pos.y;
    tmpvect.z = pl.pos.z+PHEIGHT;
    P_RandomSpawnPoint(snum);
    sp.x = actor[pl.i].bpos.x = pl.bobposx = pl.opos.x = pl.pos.x;
    sp.y = actor[pl.i].bpos.y = pl.bobposy = pl.opos.y = pl.pos.y;
    sp.z = actor[pl.i].bpos.y = pl.opos.z =pl.pos.z;
    var $cursectnum = new R(pl.cursectnum);
    updatesector(pl.pos.x,pl.pos.y,$cursectnum);
    pl.cursectnum = $cursectnum.$;
    setsprite(pl.i,tmpvect);
    sp.cstat = 257;

    sp.shade = -12;
    sp.clipdist = 64;
    sp.xrepeat = 42;
    sp.yrepeat = 36;
    sp.owner = pl.i;
    sp.xoffset = 0;
    sp.pal = pl.palookup;

    pl.last_extra = sp.extra = pl.max_player_health;
    pl.wantweaponfire = -1;
    pl.horiz = 100;
    pl.on_crane = -1;
    pl.frag_ps = snum;
    pl.horizoff = 0;
    pl.opyoff = 0;
    pl.wackedbyactor = -1;
    pl.inv_amount[GET_SHIELD] = g_startArmorAmount;
    pl.dead_flag = 0;
    pl.footprintcount = 0;
    pl.weapreccnt = 0;
    pl.fta = 0;
    pl.ftq = 0;
    pl.vel.x = pl.vel.y = 0;
    pl.rotscrnang = 0;
    pl.runspeed = g_playerFriction;
    pl.falling_counter = 0;

    P_ResetTintFade(pl);

    actor[pl.i].extra = -1;
    actor[pl.i].owner = pl.i;

    actor[pl.i].cgg = 0;
    actor[pl.i].movflag = 0;
    actor[pl.i].tempang = 0;
    actor[pl.i].actorstayput = -1;
    actor[pl.i].dispicnum = 0;
    actor[pl.i].owner = pl.i;

    actor[pl.i].t_data[4] = 0;

    P_ResetInventory(snum);
    P_ResetWeapons(snum);

    pl.reloading = 0;

    pl.movement_lock = 0;

    if (G_HaveEvent(EVENT_RESETPLAYER))
        VM_OnEvent(EVENT_RESETPLAYER, pl.i, snum, -1, 0);
}

function P_ResetStatus(/*int32_t*/ snum: number): void
{
    var p = g_player[snum].ps;

    ud.show_help        = 0;
    ud.showallmap       = 0;
    p.dead_flag        = 0;
    p.wackedbyactor    = -1;
    p.falling_counter  = 0;
    p.quick_kick       = 0;
    p.subweapon        = 0;
    p.last_full_weapon = 0;
    p.ftq              = 0;
    p.fta              = 0;
    p.tipincs          = 0;
    p.buttonpalette    = 0;
    p.actorsqu         =-1;
    p.invdisptime      = 0;
    p.refresh_inventory= 0;
    p.last_pissed_time = 0;
    p.holster_weapon   = 0;
    p.pycount          = 0;
    p.pyoff            = 0;
    p.opyoff           = 0;
    p.loogcnt          = 0;
    p.angvel           = 0;
    p.weapon_sway      = 0;
    //    p.select_dir       = 0;
    p.extra_extra8     = 0;
    p.show_empty_weapon= 0;
    p.dummyplayersprite=-1;
    p.crack_time       = 0;
    p.hbomb_hold_delay = 0;
    p.transporter_hold = 0;
    p.wantweaponfire  = -1;
    p.hurt_delay       = 0;
    p.footprintcount   = 0;
    p.footprintpal     = 0;
    p.footprintshade   = 0;
    p.jumping_toggle   = 0;
    p.ohoriz = p.horiz= 140;
    p.horizoff         = 0;
    p.bobcounter       = 0;
    p.on_ground        = 0;
    p.player_par       = 0;
    p.return_to_center = 9;
    p.airleft          = 15*GAMETICSPERSEC;
    p.rapid_fire_hold  = 0;
    p.toggle_key_flag  = 0;
    p.access_spritenum = -1;
    if ((g_netServer || ud.multimode > 1) && (GametypeFlags[ud.coop] & GAMETYPE_ACCESSATSTART))
        p.got_access = 7;
    else p.got_access      = 0;
    p.random_club_frame= 0;
    pus = 1;
    p.on_warping_sector = 0;
    p.spritebridge      = 0;
    p.sbs          = 0;
    p.palette = BASEPAL;

    if (p.inv_amount[GET_STEROIDS] < 400)
    {
        p.inv_amount[GET_STEROIDS] = 0;
        p.inven_icon = ICON_NONE;
    }
    p.heat_on =            0;
    p.jetpack_on =         0;
    p.holoduke_on =       -1;

    p.look_ang          = 512 - ((ud.level_number&1)<<10);

    p.rotscrnang        = 0;
    p.orotscrnang       = 1;   // JBF 20031220
    p.newowner          =-1;
    p.jumping_counter   = 0;
    p.hard_landing      = 0;
    p.vel.x             = 0;
    p.vel.y             = 0;
    p.vel.z             = 0;
    fricxv            = 0;
    fricyv            = 0;
    p.somethingonplayer =-1;
    p.one_eighty_count  = 0;
    p.cheat_phase       = 0;

    p.on_crane          = -1;

    if ((PWEAPON(snum, p.curr_weapon, WorksLike) == PISTOL_WEAPON) &&
            (PWEAPON(snum, p.curr_weapon, Reload) > PWEAPON(snum, p.curr_weapon, TotalTime)))
        p.kickback_pic  = PWEAPON(snum, p.curr_weapon, TotalTime);
    else p.kickback_pic = 0;

    p.weapon_pos        = WEAPON_POS_START;
    p.walking_snd_toggle= 0;
    p.weapon_ang        = 0;

    p.knuckle_incs      = 1;
    p.fist_incs = 0;
    p.knee_incs         = 0;
    p.jetpack_on        = 0;
    p.reloading        = 0;

    p.movement_lock     = 0;

    p.frag_ps          = snum;

    P_UpdateScreenPal(p);
    VM_OnEvent(EVENT_RESETPLAYER, p.i, snum, -1, 0);
}

function P_ResetWeapons(/*int32_t*/ snum: number): void
{
    var weapon: number;
    var p = g_player[snum].ps;

    for (weapon = PISTOL_WEAPON; weapon < MAX_WEAPONS; weapon++)
        p.ammo_amount[weapon] = 0;

    p.weapon_pos = WEAPON_POS_START;
    p.curr_weapon = PISTOL_WEAPON;
    p.kickback_pic = PWEAPON(snum, p.curr_weapon, TotalTime);
    p.gotweapon = ((1<<PISTOL_WEAPON) | (1<<KNEE_WEAPON) | (1<<HANDREMOTE_WEAPON));
    p.ammo_amount[PISTOL_WEAPON] = min(p.max_ammo_amount[PISTOL_WEAPON], 48);
    p.last_weapon = -1;

    p.show_empty_weapon= 0;
    p.last_pissed_time = 0;
    p.holster_weapon = 0;
    VM_OnEvent(EVENT_RESETWEAPONS, p.i, snum, -1, 0);
}

function P_ResetInventory(/*int32_t*/ snum: number): void
{
    var p = g_player[snum].ps;

    Bmemset(new P(p.inv_amount), 0, sizeof(p.inv_amount));

    p.scuba_on =           0;
    p.heat_on = 0;
    p.jetpack_on =         0;
    p.holoduke_on = -1;
    p.inv_amount[GET_SHIELD] =      g_startArmorAmount;
    p.inven_icon = ICON_NONE;
    VM_OnEvent(EVENT_RESETINVENTORY, p.i, snum, -1, 0);
}

function resetprestat(/*int32_t*/ snum: number,/*int32_t */g: number): void
{
    var p = g_player[snum].ps;
    var i: number;

    g_spriteDeleteQueuePos = 0;
    for (i=0; i<g_spriteDeleteQueueSize; i++) SpriteDeletionQueue[i] = -1;

    p.hbomb_on          = 0;
    p.cheat_phase       = 0;
    p.toggle_key_flag   = 0;
    p.secret_rooms      = 0;
    p.max_secret_rooms  = 0;
    p.actors_killed     = 0;
    p.max_actors_killed = 0;
    p.lastrandomspot    = 0;
    p.weapon_pos = WEAPON_POS_START;

    P_ResetTintFade(p);

    if ((PWEAPON(snum, p.curr_weapon, WorksLike) == PISTOL_WEAPON) &&
            (PWEAPON(snum, p.curr_weapon, Reload) > PWEAPON(snum, p.curr_weapon, TotalTime)))
        p.kickback_pic  = PWEAPON(snum, p.curr_weapon, TotalTime);
    else p.kickback_pic = 0;

    p.last_weapon = -1;
    p.weapreccnt = 0;
    p.interface_toggle_flag = 0;
    p.show_empty_weapon= 0;
    p.holster_weapon = 0;
    p.last_pissed_time = 0;

    p.one_parallax_sectnum = -1;
    p.visibility = ud.const_visibility;

    screenpeek              = myconnectindex;
    g_numAnimWalls            = 0;
    g_numCyclers              = 0;
    g_animateCount              = 0;
    parallaxtype            = 0;
    randomseed              = 1996;
    ud.pause_on             = 0;
    ud.camerasprite         =-1;
    ud.eog                  = 0;
    tempwallptr             = 0;
    camsprite               =-1;
    g_earthquakeTime          = 0;

    g_numInterpolations = 0;
    startofdynamicinterpolations = 0;

    if (((g&MODE_EOL) != MODE_EOL && numplayers < 2 && !g_netServer) ||
            (!(GametypeFlags[ud.coop]&GAMETYPE_PRESERVEINVENTORYDEATH) && numplayers > 1))
    {
        P_ResetWeapons(snum);
        P_ResetInventory(snum);
    }
    else if (p.curr_weapon == HANDREMOTE_WEAPON)
    {
        p.ammo_amount[HANDBOMB_WEAPON]++;
        p.curr_weapon = HANDBOMB_WEAPON;
    }

    p.timebeforeexit   = 0;
    p.customexitsound  = 0;

}

var multiskiesinited=0;
function G_SetupBackdrop(/*int16_t */sky: number): void
{
    if (!multiskiesinited)
    {
        multiskiesinited = 1;
        G_MultiPskyInit();
    }

    Bmemset(new P(pskyoff), 0, sizeof(pskyoff));

    if (parallaxyscale != 65536)
        parallaxyscale = 32768;

    switch (DYNAMICTILEMAP(sky))
    {
    case CLOUDYOCEAN__STATIC:
        parallaxyscale = 65536;
        break;
    case MOONSKY1__STATIC :
        pskyoff[6]=1;
        pskyoff[1]=2;
        pskyoff[4]=2;
        pskyoff[2]=3;
        break;
    case BIGORBIT1__STATIC: // orbit
        pskyoff[5]=1;
        pskyoff[6]=2;
        pskyoff[7]=3;
        pskyoff[2]=4;
        break;
    case LA__STATIC:
        parallaxyscale = 16384+1024;
        pskyoff[0]=1;
        pskyoff[1]=2;
        pskyoff[2]=1;
        pskyoff[3]=3;
        pskyoff[4]=4;
        pskyoff[5]=0;
        pskyoff[6]=2;
        pskyoff[7]=3;
        break;
    }

    pskybits=3;
}

//// tweak moving sectors with these SE lotags
function FIXSPR_SELOTAGP(k: number): boolean { return (k==0) || (k==6) || (k==14) ;}

// Set up sprites in moving sectors that are to be fixed wrt a certain pivot
// position and should not diverge from it due to roundoff error in the future.
// Has to be after the spawning stuff.
function G_SetupRotfixedSprites(): void
{
    var i: number;
    for (i=headspritestat[STAT_EFFECTOR]; i>=0; i=nextspritestat[i])
    {
        if (FIXSPR_SELOTAGP(sprite[i].lotag))
        {
//#ifdef YAX_ENABLE
            var firstrun = 1;
//#endif
            var /*int32_t */j = headspritesect[sprite[i].sectnum];
            while (j>=0)
            {
                // TRIPBOMB uses t_data[7] for its own purposes. Wouldn't be
                // too useful with moving sectors anyway
                if ((ROTFIXSPR_STATNUMP(sprite[j].statnum) && sprite[j].picnum!=TRIPBOMB) ||
                    ((sprite[j].statnum==STAT_ACTOR || sprite[j].statnum==STAT_ZOMBIEACTOR) &&
                     A_CheckSpriteTileFlags(sprite[j].picnum, SPRITE_ROTFIXED)))
                {
                    var /*int32_t */pivot = i;

                    if (sprite[i].lotag==0)
                        pivot = sprite[i].owner;
                    if (j!=i && j!=pivot && pivot>=0 && pivot<MAXSPRITES)
                    {
                        // let's hope we don't step on anyone's toes here
                        actor[j].t_data[7] = ROTFIXSPR_MAGIC | pivot; // 'rs' magic + pivot SE sprite index
                        actor[j].t_data[8] = sprite[j].x - sprite[pivot].x;
                        actor[j].t_data[9] = sprite[j].y - sprite[pivot].y;
                    }
                }

                j = nextspritesect[j];
//#ifdef YAX_ENABLE
                if (j<0 && firstrun)
                    if (sprite[i].lotag==SE_6_SUBWAY || sprite[i].lotag==SE_14_SUBWAY_CAR)
                    {
                        firstrun = 0;
                        j = actor[i].t_data[9];
                        if (j >= 0)
                            j = headspritesect[j];
                    }
//#endif
            }
        }
    }
}

function prelevel(/*char*/ g: number): void
{
    path("prelevel");
    var i: number, nexti: number, j: number, startwall: number, endwall: number;                 // int32_t 
    var switchpicnum: number;                                    // int32_t 
    var tagbitmap = new Uint8Array(65536>>3);// /(uint8_t *)Bcalloc(65536>>3, 1);    // uint8_t 

    if (tagbitmap==NULL)
        G_GameExit("OUT OF MEMORY in prelevel()");

    Bmemset(new P(show2dsector), 0, sizeof(show2dsector));

    Bmemset(new P(ror_protectedsectors), 0, MAXSECTORS);

    resetprestat(0,g);
    g_numClouds = 0;

    for (i=0; i<numsectors; i++)
    {
        sector[i].extra = 256;

        switch (sector[i].lotag)
        {
        case ST_20_CEILING_DOOR:
        case ST_22_SPLITTING_DOOR:
            if (sector[i].floorz > sector[i].ceilingz)
                sector[i].lotag |= 32768;
            continue;
        }

        if (sector[i].ceilingstat&1)
        {
            if (!waloff[sector[i].ceilingpicnum])
            {
                if (sector[i].ceilingpicnum == LA)
                    for (j=0; j<5; j++)
                        tloadtile(sector[i].ceilingpicnum+j, 0);
            }
            G_SetupBackdrop(sector[i].ceilingpicnum);

            if (sector[i].ceilingpicnum == CLOUDYSKIES && g_numClouds < 127)
                clouds[g_numClouds++] = i;

            if (g_player[0].ps.one_parallax_sectnum == -1)
                g_player[0].ps.one_parallax_sectnum = i;
        }

        if (sector[i].lotag == 32767) //Found a secret room
        {
            g_player[0].ps.max_secret_rooms++;
            continue;
        }

        if (sector[i].lotag == UINT16_MAX)
        {
            g_player[0].ps.exitx = wall[sector[i].wallptr].x;
            g_player[0].ps.exity = wall[sector[i].wallptr].y;
            continue;
        }
    }

//#ifdef LUNATIC
//    El_CreateGameState();
//    G_PostCreateGameState();
//#endif
    
    i = headspritestat[STAT_DEFAULT];
    while (i >= 0)
    {
        nexti = nextspritestat[i];
//#if !defined LUNATIC
        A_ResetVars(i);
        A_LoadActor(i);
//#endif
        VM_OnEvent(EVENT_LOADACTOR, i, -1, -1, 0);
        if (sprite[i].lotag == UINT16_MAX && (sprite[i].cstat&16))
        {
            g_player[0].ps.exitx = sprite[i].x;
            g_player[0].ps.exity = sprite[i].y;
        }
        else switch (DYNAMICTILEMAP(sprite[i].picnum))
            {
            case GPSPEED__STATIC:
                sector[sprite[i].sectnum].extra = sprite[i].lotag;
                A_DeleteSprite(i);
                break;

            case CYCLER__STATIC:
                if (g_numCyclers >= MAXCYCLERS)
                {
                    Bsprintf(tempbuf,"\nToo many cycling sectors (%d max).",MAXCYCLERS);
                    G_GameExit(tempbuf.toString());
                }
                cyclers[g_numCyclers][0] = sprite[i].sectnum;
                cyclers[g_numCyclers][1] = sprite[i].lotag;
                cyclers[g_numCyclers][2] = sprite[i].shade;
                cyclers[g_numCyclers][3] = sector[sprite[i].sectnum].floorshade;
                cyclers[g_numCyclers][4] = sprite[i].hitag;
                cyclers[g_numCyclers][5] = (sprite[i].ang == 1536);
                g_numCyclers++;
                A_DeleteSprite(i);
                break;

            case SECTOREFFECTOR__STATIC:
            case ACTIVATOR__STATIC:
            case TOUCHPLATE__STATIC:
            case ACTIVATORLOCKED__STATIC:
            case MUSICANDSFX__STATIC:
            case LOCATORS__STATIC:
            case MASTERSWITCH__STATIC:
            case RESPAWN__STATIC:
                sprite[i].cstat &= ~(1|256);
                break;
            }
        i = nexti;
    }

    for (i=0; i < MAXSPRITES; i++)
    {
        if (sprite[i].statnum < MAXSTATUS)
        {
            if (sprite[i].picnum == SECTOREFFECTOR && sprite[i].lotag == SE_14_SUBWAY_CAR)
                continue;
            A_Spawn(-1,i);
        }
    }

    for (i=0; i < MAXSPRITES; i++)
        if (sprite[i].statnum < MAXSTATUS)
        {
            if (sprite[i].picnum == SECTOREFFECTOR && sprite[i].lotag == SE_14_SUBWAY_CAR)
                A_Spawn(-1,i);
        }

    G_SetupRotfixedSprites();

    for (i=headspritestat[STAT_DEFAULT]; i>=0; i=nextspritestat[i])
    {
        var ii: number;

        if (sprite[i].picnum <= 0)  // oob safety for switch below
            continue;

        for (ii=0; ii<2; ii++)
            switch (DYNAMICTILEMAP(sprite[i].picnum-1+ii))
            {
            case DIPSWITCH__STATIC:
            case DIPSWITCH2__STATIC:
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
                // the lower code only for the 'on' state (*)
                if (ii==0)
                {
                    j = sprite[i].lotag;
                    tagbitmap[j>>3] |= 1<<(j&7);
                }

                break;
            }
    }

    // initially 'on' SE 12 light (*)
    for (j=headspritestat[STAT_EFFECTOR]; j>=0; j=nextspritestat[j])
    {
        var t: number = sprite[j].hitag;
        
        if (sprite[j].lotag == SE_12_LIGHT_SWITCH && tagbitmap[t>>3]&(1<<(t&7)))
            actor[j].t_data[0] = 1;
    }

    tagbitmap = null;

    g_mirrorCount = 0;

    for (i = 0; i < numwalls; i++)
    {
        var wal: walltype;
        wal = wall[i];

        if (wal.overpicnum == MIRROR && (wal.cstat&32) != 0)
        {
            j = wal.nextsector;

            if ((j >= 0) && sector[j].ceilingpicnum != MIRROR)
            {
                if (g_mirrorCount > 63)
                    G_GameExit("\nToo many mirrors (64 max.)");

                sector[j].ceilingpicnum = MIRROR;
                sector[j].floorpicnum = MIRROR;
                g_mirrorWall[g_mirrorCount] = i;
                g_mirrorSector[g_mirrorCount] = j;
                g_mirrorCount++;
                continue;
            }
        }

        if (g_numAnimWalls >= MAXANIMWALLS)
        {
            Bsprintf(tempbuf,"\nToo many 'anim' walls (%d max).",MAXANIMWALLS);
            G_GameExit(tempbuf.toString());
        }

        animwall[g_numAnimWalls].tag = 0;
        animwall[g_numAnimWalls].wallnum = 0;

        switchpicnum = wal.overpicnum;
        if (wal.overpicnum > W_FORCEFIELD && wal.overpicnum <= W_FORCEFIELD+2)
        {
            switchpicnum = W_FORCEFIELD;
        }

        if (switchpicnum >= 0)
        {
            switch (DYNAMICTILEMAP(switchpicnum))
            {
            case FANSHADOW__STATIC:
            case FANSPRITE__STATIC:
                wall[0].cstat |= 65;
                animwall[g_numAnimWalls].wallnum = i;
                g_numAnimWalls++;
                break;

            case W_FORCEFIELD__STATIC:
                if (wal.overpicnum==W_FORCEFIELD__STATIC)
                    for (j=0; j<3; j++)
                        tloadtile(W_FORCEFIELD+j, 0);
                if (wal.shade > 31)
                    wal.cstat = 0;
                else wal.cstat |= 85+256;


                if (wal.lotag && wal.nextwall >= 0)
                    wall[wal.nextwall].lotag =
                        wal.lotag;

            case BIGFORCE__STATIC:
                animwall[g_numAnimWalls].wallnum = i;
                g_numAnimWalls++;

                continue;
            }
        }

        wal.extra = -1;

        switch (DYNAMICTILEMAP(wal.picnum))
        {
        case WATERTILE2__STATIC:
            for (j=0; j<3; j++)
                tloadtile(wal.picnum+j, 0);
            break;

        case TECHLIGHT2__STATIC:
        case TECHLIGHT4__STATIC:
            tloadtile(wal.picnum, 0);
            break;
        case W_TECHWALL1__STATIC:
        case W_TECHWALL2__STATIC:
        case W_TECHWALL3__STATIC:
        case W_TECHWALL4__STATIC:
            animwall[g_numAnimWalls].wallnum = i;
            //                animwall[g_numAnimWalls].tag = -1;
            g_numAnimWalls++;
            break;
        case SCREENBREAK6__STATIC:
        case SCREENBREAK7__STATIC:
        case SCREENBREAK8__STATIC:
            for (j=SCREENBREAK6; j<SCREENBREAK9; j++)
                tloadtile(j, 0);
            animwall[g_numAnimWalls].wallnum = i;
            animwall[g_numAnimWalls].tag = -1;
            g_numAnimWalls++;
            break;

        case FEMPIC1__STATIC:
        case FEMPIC2__STATIC:
        case FEMPIC3__STATIC:
            wal.extra = wal.picnum;
            animwall[g_numAnimWalls].tag = -1;
            if (ud.lockout)
            {
                if (wal.picnum == FEMPIC1)
                    wal.picnum = BLANKSCREEN;
                else wal.picnum = SCREENBREAK6;
            }

            animwall[g_numAnimWalls].wallnum = i;
            animwall[g_numAnimWalls].tag = wal.picnum;
            g_numAnimWalls++;
            break;

        case SCREENBREAK1__STATIC:
        case SCREENBREAK2__STATIC:
        case SCREENBREAK3__STATIC:
        case SCREENBREAK4__STATIC:
        case SCREENBREAK5__STATIC:
            //
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
            animwall[g_numAnimWalls].wallnum = i;
            animwall[g_numAnimWalls].tag = wal.picnum;
            g_numAnimWalls++;
            break;
        }
    }

    //Invalidate textures in sector behind mirror
    for (i=0; i<g_mirrorCount; i++)
    {
        startwall = sector[g_mirrorSector[i]].wallptr;
        endwall = startwall + sector[g_mirrorSector[i]].wallnum;
        for (j=startwall; j<endwall; j++)
        {
            wall[j].picnum = MIRROR;
            wall[j].overpicnum = MIRROR;
            if (wall[g_mirrorWall[i]].pal == 4)
                wall[j].pal = 4;
        }
    }
}


function G_NewGame(vn: number,ln: number,sk: number): void
{
    var p:DukePlayer_t = g_player[0].ps;
    var i: number;

    G_HandleAsync();

    if (g_skillSoundID >= 0 && ud.config.FXDevice >= 0 && ud.config.SoundToggle)
    {
        while (S_CheckSoundPlaying(-1, g_skillSoundID))
            G_HandleAsync();
    }

    g_skillSoundID = -1;

    ready2send = 0;

    if (ud.m_recstat != 2 && ud.last_level >= 0 && (g_netServer || ud.multimode > 1) && (ud.coop&GAMETYPE_SCORESHEET))
        todoThrow("G_BonusScreen(1);");

    if (ln == 0 && vn == 3 && (!g_netServer && ud.multimode < 2) && ud.lockout == 0
            && (G_GetLogoFlags() & LOGO_NOE4CUTSCENE)==0)
    {
        todoThrow();
        //S_PlayMusic(&EnvMusicFilename[1][0],MAXVOLUMES*MAXLEVELS+1);

        //flushperms();
        //setview(0,0,xdim-1,ydim-1);
        //clearview(0);
        //nextpage();

        //G_PlayAnim("vol41a.anm",6);
        //clearview(0);
        //nextpage();

        //G_PlayAnim("vol42a.anm",7);
        //G_PlayAnim("vol43a.anm",9);
        //clearview(0);
        //nextpage();

        //FX_StopAllSounds();
    }

    g_showShareware = GAMETICSPERSEC*34;

    ud.level_number =   ln;
    ud.volume_number =  vn;
    ud.player_skill =   sk;
    ud.secretlevel =    0;
    ud.from_bonus = 0;
    parallaxyscale = 0;

    ud.last_level = -1;
    g_lastSaveSlot = -1;
    p.zoom            = 768;
    p.gm              = 0;

//#if !defined LUNATIC
    //AddLog("Newgame");
    Gv_ResetVars();

    Gv_InitWeaponPointers();

    // PK: Gv_ResetVars() might trip up the system (pointer) gamevars,
    // e.g. if some earlier-version CON code had been loaded before
    Gv_RefreshPointers();
//#endif
    Gv_ResetSystemDefaults();

    for (i=0; i<(MAXVOLUMES*MAXLEVELS); i++)
        if (MapInfo[i].savedstate)
        {
            //Bfree(MapInfo[i].savedstate);
            MapInfo[i].savedstate = NULL;
        }

    if (ud.m_coop != 1)
    {
        for (i=0; i<MAX_WEAPONS; i++)
        {
            if (PWEAPON(0, i, WorksLike)==PISTOL_WEAPON)
            {
                p.curr_weapon = i;
                p.gotweapon |= (1<<i);
                p.ammo_amount[i] = min(p.max_ammo_amount[i], 48);
            }
            else if (PWEAPON(0, i, WorksLike)==KNEE_WEAPON)
                p.gotweapon |= (1<<i);
            else if (PWEAPON(0, i, WorksLike)==HANDREMOTE_WEAPON)
                p.gotweapon |= (1<<i);
        }
        p.last_weapon = -1;
    }

    display_mirror =        0;

    VM_OnEvent(EVENT_NEWGAME, g_player[myconnectindex].ps.i, myconnectindex, -1, 0);
}

function resetpspritevars(/*char */g: number): void
{
    var /*int16_t */i: number, j: number; //circ;

    var aimmode = new Uint8Array(MAXPLAYERS),autoaim= new Uint8Array(MAXPLAYERS),weaponswitch= new Uint8Array(MAXPLAYERS);
    var tsbar = newStructArray<DukeStatus_t>(DukeStatus_t , MAXPLAYERS);

    if (g_player[0].ps.cursectnum >= 0)  // < 0 may happen if we start a map in void space (e.g. testing it)
    {
        A_InsertSprite(g_player[0].ps.cursectnum,g_player[0].ps.pos.x,g_player[0].ps.pos.y,g_player[0].ps.pos.z,
                       APLAYER,0,0,0,g_player[0].ps.ang,0,0,0,10);
    }

    if (ud.recstat != 2)
        for (i = 0; i != -1; i = connectpoint2[i])
        {
            aimmode[i] = g_player[i].ps.aim_mode;
            autoaim[i] = g_player[i].ps.auto_aim;
            weaponswitch[i] = g_player[i].ps.weaponswitch;
            if ((g_netServer || ud.multimode > 1) && (GametypeFlags[ud.coop]&GAMETYPE_PRESERVEINVENTORYDEATH) && ud.last_level >= 0)
            {
                for (j=0; j<MAX_WEAPONS; j++)
                    tsbar[i].ammo_amount[j] = g_player[i].ps.ammo_amount[j];

                tsbar[i].gotweapon = g_player[i].ps.gotweapon;
                Bmemcpy(new P(tsbar[i].inv_amount), new P(g_player[i].ps.inv_amount), sizeof(tsbar[i].inv_amount));
                tsbar[i].curr_weapon = g_player[i].ps.curr_weapon;
                tsbar[i].inven_icon = g_player[i].ps.inven_icon;
            }
        }

    P_ResetStatus(0);

    for (i = 0; i != -1; i = connectpoint2[i])
        if (i) todoThrow("Bmemcpy(g_player[i].ps,g_player[0].ps,sizeof(DukePlayer_t));");

    if (ud.recstat != 2)
        for (i = 0; i != -1; i = connectpoint2[i])
        {
            g_player[i].ps.aim_mode = aimmode[i];
            g_player[i].ps.auto_aim = autoaim[i];
            g_player[i].ps.weaponswitch = weaponswitch[i];
            if ((g_netServer || ud.multimode > 1) && (GametypeFlags[ud.coop]&GAMETYPE_PRESERVEINVENTORYDEATH) && ud.last_level >= 0)
            {
                for (j=0; j<MAX_WEAPONS; j++)
                    g_player[i].ps.ammo_amount[j] = tsbar[i].ammo_amount[j];

                g_player[i].ps.gotweapon = tsbar[i].gotweapon;
                g_player[i].ps.curr_weapon = tsbar[i].curr_weapon;
                g_player[i].ps.inven_icon = tsbar[i].inven_icon;
                Bmemcpy(new P(g_player[i].ps.inv_amount), new P(tsbar[i].inv_amount), sizeof(tsbar[i].inv_amount));
            }
        }

    g_numPlayerSprites = 0;
//    circ = 2048/ud.multimode;

    g_whichPalForPlayer = 9;
    j = 0;
    i = headspritestat[STAT_PLAYER];
    while (i >= 0)
    {
        var /*const int32_t */nexti = nextspritestat[i];
        var /*spritetype *const*/ s = sprite[i];

        if (g_numPlayerSprites == MAXPLAYERS)
            G_GameExit("\nToo many player sprites (max 16.)");

        g_playerSpawnPoints[g_numPlayerSprites].ox = s.x;
        g_playerSpawnPoints[g_numPlayerSprites].oy = s.y;
        g_playerSpawnPoints[g_numPlayerSprites].oz = s.z;
        g_playerSpawnPoints[g_numPlayerSprites].oa = s.ang;
        g_playerSpawnPoints[g_numPlayerSprites].os = s.sectnum;

        g_numPlayerSprites++;

        if (j < MAXPLAYERS)
        {
            s.owner = i;
            s.shade = 0;
            s.xrepeat = 42;
            s.yrepeat = 36;
            if (!g_fakeMultiMode)
                s.cstat = j < numplayers ? 1+256 : 32768;
            else
                s.cstat = j < ud.multimode ? 1+256 : 32768;
            s.xoffset = 0;
            s.clipdist = 64;

//            if (j < playerswhenstarted)
            {
                if ((g&MODE_EOL) != MODE_EOL || g_player[j].ps.last_extra == 0)
                {
                    g_player[j].ps.last_extra = g_player[j].ps.max_player_health;
                    s.extra = g_player[j].ps.max_player_health;
                    g_player[j].ps.runspeed = g_playerFriction;
                }
                else s.extra = g_player[j].ps.last_extra;

                s.yvel = j;

                if (!g_player[j].pcolor && (g_netServer || ud.multimode > 1) && !(GametypeFlags[ud.coop] & GAMETYPE_TDM))
                {
                    if (s.pal == 0)
                    {
                        var /*int32_t */k = 0;

                        for (; k<ud.multimode; k++)
                        {
                            if (g_whichPalForPlayer == g_player[k].ps.palookup)
                            {
                                g_whichPalForPlayer++;
                                if (g_whichPalForPlayer >= 17)
                                    g_whichPalForPlayer = 9;
                                k=0;
                            }
                        }
                        g_player[j].pcolor = s.pal = g_player[j].ps.palookup = g_whichPalForPlayer++;
                        if (g_whichPalForPlayer >= 17)
                            g_whichPalForPlayer = 9;
                    }
                    else g_player[j].pcolor = g_player[j].ps.palookup = s.pal;
                }
                else
                {
                    var /*int32_t */k = g_player[j].pcolor;

                    if (GametypeFlags[ud.coop] & GAMETYPE_TDM)
                    {
                        k = G_GetTeamPalette(g_player[j].pteam);
                        g_player[j].ps.team = g_player[j].pteam;
                    }
                    s.pal = g_player[j].ps.palookup = k;
                }

                g_player[j].ps.i = i;
                g_player[j].ps.frag_ps = j;
                actor[i].owner = i;

                g_player[j].ps.autostep = (20<<8);
                g_player[j].ps.autostep_sbw = (4<<8);

                actor[i].bpos.x = g_player[j].ps.bobposx = g_player[j].ps.opos.x = g_player[j].ps.pos.x =        s.x;
                actor[i].bpos.y = g_player[j].ps.bobposy = g_player[j].ps.opos.y = g_player[j].ps.pos.y =        s.y;
                actor[i].bpos.z = g_player[j].ps.opos.z = g_player[j].ps.pos.z =        s.z;
                g_player[j].ps.oang  = g_player[j].ps.ang  =        s.ang;

                var $cursectnum = new R(g_player[j].ps.cursectnum);
                updatesector(s.x,s.y,$cursectnum);
                g_player[j].ps.cursectnum = $cursectnum.$;
            }

            j++;
        }
        else A_DeleteSprite(i);

        i = nexti;
    }
}

function clearfrags(): void
{
    var /*int32_t */i: number;

    for (i=0; i<ud.multimode; i++)
    {
        var p: playerdata_t = g_player[i];

        p.ps.frag = p.ps.fraggedself = 0;
        Bmemset(new P(p.frags), 0, sizeof(p.frags));
    }
}

function G_ResetTimers(/*uint8_t */keepgtics: number): void 
{
    vel = svel = angvel = horiz = 0;

    totalclock = 0;
    cloudtotalclock = 0;
    ototalclock = 0;
    lockclock = 0;
    ready2send = 1;
    g_levelTextTime = 85;
    if (!keepgtics)
        g_moveThingsCount = 0;
}

function G_ClearFIFO(): void
{
    var /*int32_t */i = MAXPLAYERS-1;
    
    g_emuJumpTics = 0;

    avg.init();//Bmemset(&avg, 0, sizeof(input_t));

    loc.init();//(&loc,sizeof(input_t),0);


    for (var k = 0; k < MOVEFIFOSIZ; k++) {
        for (var j = 0; j < MAXPLAYERS; j++) {
            inputfifo[k][j].init(); //clearbufbyte(inputfifo,sizeof(input_t)*MOVEFIFOSIZ*MAXPLAYERS,0);
        }
    }

    for (; i >= 0; i--)
    {
        if (g_player[i].sync != NULL)
            g_player[i].sync.init();//Bmemset(g_player[i].sync, 0, sizeof(input_t));
        g_player[i].vote = g_player[i].gotvote = 0;
    }
}

function G_FindLevelByFile(fn: string): number
{
    var volume: number, level: number;

    for (volume=0; volume<MAXVOLUMES; volume++)
    {
        for (level=0; level<MAXLEVELS; level++)
        {
            if (MapInfo[(volume*MAXLEVELS)+level].filename != NULL)
                if (!Bstrcasecmp(fn, MapInfo[(volume*MAXLEVELS)+level].filename))
                    return ((volume * MAXLEVELS) + level);
        }
    }
    return MAXLEVELS*MAXVOLUMES;
}

function G_FadeLoad(/*int32_t*/ r: number, /*int32_t */g: number, /*int32_t */b: number, /*int32_t */start: number, /*int32_t */end: number, /*int32_t */step: number, /*int32_t */ticwait: number): void
{todoUnimportant("G_FadeLoad");
    //var /*int32_t */m = (step < 0) ? -1 : 1;

    //var /*int32_t */nexttic = totalclock;

    //for (; m*start <= m*end; start += step)
    //{
    //    while (totalclock < nexttic)
    //        sampletimer();
    //    nexttic += ticwait;

    //    if (KB_KeyPressed(sc_Space))
    //    {
    //        KB_ClearKeyDown(sc_Space);
    //        return;
    //    }

    //    G_FadePalette(r,g,b,start|128);
    //    flushperms();
    //    G_DoLoadScreen(" ", -1);
    //}
}


//static void G_LoadMapHack(char *outbuf, const char *filename)
//{
//    if (filename != NULL)
//        Bstrcpy(outbuf, filename);

//    append_ext_UNSAFE(outbuf, ".mhk");

//    if (!loadmaphack(outbuf))
//        initprintf("Loaded map hack file \"%s\"\n",outbuf);
//}

//static void realloc_and_copy_musicfn(int32_t level_number, const char *levnamebuf, int32_t altp)
//{
//    char **musicfn = altp ? &MapInfo[level_number].alt_musicfn : &MapInfo[level_number].musicfn;
//    int32_t dastrlen = Bstrlen(levnamebuf);

//    *musicfn = (char *)Brealloc(*musicfn, dastrlen+1);
//    Bstrcpy(*musicfn, levnamebuf);
//}

//// levnamebuf should have at least size BMAX_PATH
//// FIXME: This function should be rolled into a loop, testing .flac, then .ogg, then .mid.
//void G_SetupFilenameBasedMusic(char *levnamebuf, const char *boardfilename, int32_t level_number)
//{
//    char *p;
//    int32_t fil;

//    Bstrcpy(levnamebuf, boardfilename);

//    // usermap music based on map filename
//    Bcorrectfilename(levnamebuf,0);

//    p = Bstrrchr(levnamebuf,'.');
//    if (!p)
//    {
//        p = levnamebuf + Bstrlen(levnamebuf);
//        p[0] = '.';
//    }

//    Bmemcpy(p+1, "ogg", 4);
//    fil = kopen4loadfrommod(levnamebuf,0);

//    if (fil > -1)
//    {
//        kclose(fil);

//        realloc_and_copy_musicfn(level_number, levnamebuf, 1);
//    }
//    else if (MapInfo[level_number].alt_musicfn != NULL)
//    {
//        Bfree(MapInfo[level_number].alt_musicfn);
//        MapInfo[level_number].alt_musicfn = NULL;
//    }

//    Bmemcpy(p+1, "mid", 4);
//    fil = kopen4loadfrommod(levnamebuf,0);

//    // XXX: should pull in a "default user map" song entry, probably E1L8 (which would need to not get clobbered)
//    if (fil == -1)
//        Bstrcpy(levnamebuf, "dethtoll.mid");
//    else kclose(fil);

//    realloc_and_copy_musicfn(level_number, levnamebuf, 0);
//}

function G_EnterLevel(g: number): number
{
    path("G_EnterLevel");
    var i: number, mii: number;
    var levname = "";//[BMAX_PATH];

//    flushpackets();
//    waitforeverybody();
    vote_map = vote_episode = voting = -1;
 
    if ((g&MODE_DEMO) != MODE_DEMO) ud.recstat = ud.m_recstat;
    ud.respawn_monsters = ud.m_respawn_monsters;
    ud.respawn_items    = ud.m_respawn_items;
    ud.respawn_inventory    = ud.m_respawn_inventory;
    ud.monsters_off = ud.m_monsters_off;
    ud.coop = ud.m_coop;
    ud.marker = ud.m_marker;
    ud.ffire = ud.m_ffire;
    ud.noexits = ud.m_noexits;

    if ((g&MODE_DEMO) == 0 && ud.recstat == 2)
        ud.recstat = 0;

    if (g_networkMode != NET_DEDICATED_SERVER)
    {
        FX_StopAllSounds();
        S_ClearSoundLocks();
        FX_SetReverb(0);
        setgamemode(ud.config.ScreenMode,ud.config.ScreenWidth,ud.config.ScreenHeight,ud.config.ScreenBPP);
    }	       
      
    if (boardfilename[0] != 0 && ud.m_level_number == 7 && ud.m_volume_number == 0)
    {
        var volume: number, level: number;

        Bcorrectfilename(boardfilename,0);

        volume = level = G_FindLevelByFile(boardfilename.toString());

        if (level != MAXLEVELS*MAXVOLUMES)
        {
            level &= MAXLEVELS-1;
            volume = (volume - level) / MAXLEVELS;

            ud.level_number = ud.m_level_number = level;
            ud.volume_number = ud.m_volume_number = volume;
            boardfilename[0] = 0;
        }
    }
 
    mii = (ud.volume_number*MAXLEVELS)+ud.level_number;

    if (MapInfo[mii].name == NULL || MapInfo[mii].filename == NULL)
    {
        if (boardfilename[0] != 0 && ud.m_level_number == 7 && ud.m_volume_number == 0)
        {
            if (MapInfo[mii].filename == NULL)
                MapInfo[mii].filename = "";//(char *)Bcalloc(BMAX_PATH, sizeof(uint8_t));
            if (MapInfo[mii].name == NULL)
                MapInfo[mii].name = Bstrdup("User Map");
        }
        else
        {
            OSD_Printf(OSDTEXT_RED + "Map E%dL%d not defined!\n", ud.volume_number+1, ud.level_number+1);
            return 1;
        }
    }

    i = ud.screen_size;
    ud.screen_size = 0;

    G_DoLoadScreen("Loading map . . .", -1);
    G_UpdateScreenArea();

    ud.screen_size = i;

    if (boardfilename[0] != 0 && ud.m_level_number == 7 && ud.m_volume_number == 0)
    {
        levname = boardfilename.toString();
        Bsprintf(apptitle,"%s - %s - " + APPNAME,levname,g_gameNamePtr);
    }
    else Bsprintf(apptitle,"%s - %s - " + APPNAME,MapInfo[mii].name,g_gameNamePtr);

    Bstrcpy(tempbuf,apptitle.toString());
    wm_setapptitle(tempbuf.toString());

    if (!window.VOLUMEONE)
    {
        var $ang = new R(g_player[0].ps.ang);
        var $cursectnum = new R(g_player[0].ps.cursectnum);
        if (boardfilename[0] != 0 && ud.m_level_number == 7 && ud.m_volume_number == 0)
        {
            todoThrow();
            //if (loadboard(boardfilename, 0, g_player[0].ps.pos, $ang,
            //              $cursectnum) < 0)
            //{
            //    OSD_Printf(OSD_ERROR "Map \"%s\" not found or invalid map version!\n",boardfilename);

            //    //G_GameExit(tempbuf);
            //    return 1;
            //}

            //g_player[0].ps.ang = $ang.$;
            //g_player[0].ps.cursectnum = $cursectnum.$;
            //G_LoadMapHack(levname, boardfilename);

            //G_SetupFilenameBasedMusic(levname, boardfilename, ud.m_level_number);
        }
        else if (loadboard(MapInfo[mii].filename,0, g_player[0].ps.pos, $ang,
                           $cursectnum) < 0)
        {
            OSD_Printf(OSD_ERROR + "Map \"%s\" not found or invalid map version!\n",
                       MapInfo[mii].filename);

            //G_GameExit(tempbuf);
            return 1;
        }
        else
        {
            g_player[0].ps.ang = $ang.$;
            g_player[0].ps.cursectnum = $cursectnum.$;
            todoUnimportant("G_LoadMapHack(levname, MapInfo[mii].filename);");
        }

    }
    else
    {
        todoThrow();
//        i = Bstrlen(MapInfo[mii].filename);
//        Bmemcpy(levname, MapInfo[mii].filename, i);
//        levname[i] = 255;  // leads to flags=1 for kopen4load
//        levname[i+1] = 0;

//        if (loadboard(levname,1, &g_player[0].ps.pos, &g_player[0].ps.ang,
//                      &g_player[0].ps.cursectnum) < 0)
//        {
//            OSD_Printf(OSD_ERROR "Map \"%s\" not found or invalid map version!\n",
//                       MapInfo[mii].filename);

//            //G_GameExit(tempbuf);
//            return 1;
//        }
//        else
//        {
//            G_LoadMapHack(levname, NULL);
//        }
    }

    g_precacheCount = 0;
    Bmemset(new P(gotpic), 0, sizeof(gotpic));
    for (var j = 0; j < precachehightile.length; j++) {
        Bmemset(new P(precachehightile[j]), 0, sizeof(precachehightile[j]));
    }

    //clearbufbyte(Actor,sizeof(Actor),0l); // JBF 20040531: yes? no?

    prelevel(g);
   
    G_AlignWarpElevators();
    resetpspritevars(g);
     
    G_FadeLoad(0,0,0, 63,0, -7, 4);
    G_CacheMapData();
    G_FadeLoad(0,0,0, 0,63, 7, 4);

    if (ud.recstat != 2)
    {
        g_musicIndex = mii;
        if (MapInfo[g_musicIndex].musicfn != NULL)
            S_PlayMusic(MapInfo[g_musicIndex].musicfn, g_musicIndex);
    }

    if (g & (MODE_GAME|MODE_EOL))
    {
        for (i = 0; i != -1; i = connectpoint2[i])
            g_player[i].ps.gm = MODE_GAME;
    }
    else if (g & MODE_RESTART)
    {
        if (ud.recstat == 2)
            g_player[myconnectindex].ps.gm = MODE_DEMO;
        else g_player[myconnectindex].ps.gm = MODE_GAME;
    }

    if ((ud.recstat == 1) && (g&MODE_RESTART) != MODE_RESTART)
        todoThrow("G_OpenDemoWrite();");

    if (window.VOLUMEONE && ud.level_number == 0 && ud.recstat != 2)
        P_DoQuote(QUOTE_F1HELP,g_player[myconnectindex].ps);

    for (i = 0; i != -1; i = connectpoint2[i])
        switch (DYNAMICTILEMAP(sector[sprite[g_player[i].ps.i].sectnum].floorpicnum))
        {
        case HURTRAIL__STATIC:
        case FLOORSLIME__STATIC:
        case FLOORPLASMA__STATIC:
            P_ResetWeapons(i);
            P_ResetInventory(i);
            g_player[i].ps.gotweapon &= ~(1<<PISTOL_WEAPON);
            g_player[i].ps.ammo_amount[PISTOL_WEAPON] = 0;
            g_player[i].ps.curr_weapon = KNEE_WEAPON;
            g_player[i].ps.kickback_pic = 0;
            break;
        }

    //PREMAP.C - replace near the my's at the end of the file
      
    Net_NotifyNewGame();
    Net_ResetPrediction();

    //g_player[myconnectindex].ps.palette = palette;
    //G_FadePalette(0,0,0,0);
    P_SetGamePalette(g_player[myconnectindex].ps, BASEPAL, 0);    // JBF 20040308

    P_UpdateScreenPal(g_player[myconnectindex].ps);
    flushperms();

    everyothertime = 0;
    g_globalRandom = 0;

    ud.last_level = ud.level_number+1;

    G_ClearFIFO();

    for (i=g_numInterpolations-1; i>=0; i--) bakipos[i] = curipos[i].getValue();// *curipos[i];

    g_restorePalette = -1;

//        mmulti_flushpackets();

    G_FadePalette(0,0,0,0);
    G_UpdateScreenArea();
    clearview(0);
    G_DrawBackground();
    G_DrawRooms(myconnectindex,65536);

    g_player[myconnectindex].ps.over_shoulder_on = 0;

    clearfrags();
 
    G_ResetTimers(0);  // Here we go

//    //Bsprintf(g_szBuf,"G_EnterLevel L=%d V=%d",ud.level_number, ud.volume_number);
//    //AddLog(g_szBuf);
//    // variables are set by pointer...

    Bmemcpy(new P(currentboardfilename), new P(boardfilename), BMAX_PATH);
    VM_OnEvent(EVENT_ENTERLEVEL, -1, -1, -1, 0);
    OSD_Printf(OSDTEXT_YELLOW + "E%dL%d: %s\n", ud.volume_number+1, ud.level_number+1,
               MapInfo[mii].name);

    Net_WaitForServer();
    return 0;
}

//void G_FreeMapState(int32_t mapnum)
//{
//    map_t *mapinfo = &MapInfo[mapnum];
//#if !defined LUNATIC
//    int32_t j;
//#endif
//    if (mapinfo.savedstate == NULL)
//        return;

//#if !defined LUNATIC
//    for (j=0; j<g_gameVarCount; j++)
//    {
//        if (aGameVars[j].dwFlags & GAMEVAR_NORESET) continue;
//        if (aGameVars[j].dwFlags & (GAMEVAR_PERPLAYER|GAMEVAR_PERACTOR))
//        {
//            if (mapinfo.savedstate.vars[j])
//                Bfree(mapinfo.savedstate.vars[j]);
//        }
//    }
//#endif
//    Bfree(mapinfo.savedstate);
//    mapinfo.savedstate = NULL;
//}

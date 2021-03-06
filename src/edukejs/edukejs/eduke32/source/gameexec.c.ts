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

//#include <time.h>
//#include <stdlib.h>
//#include <math.h>  // sqrt

//#include "compat.h"

//#include "duke3d.h"
//#include "gamedef.h"
//#include "gameexec.h"
//#include "scriplib.h"
//#include "savegame.h"
//#include "premap.h"
//#include "osdcmds.h"
//#include "osd.h"
//#include "menus.h"

//#ifdef LUNATIC
//# include "lunatic_game.h"
//#endif

//#if KRANDDEBUG
//# define GAMEEXEC_INLINE
//# define GAMEEXEC_STATIC
//#else
//# define GAMEEXEC_INLINE inline
//# define GAMEEXEC_STATIC static
//#endif

//enum vmflags_t {
var VM_RETURN       = 0x00000001,
    VM_KILL         = 0x00000002,
    VM_NOEXECUTE    = 0x00000004;
//};

var vm = new vmstate_t() ;

//#if !defined LUNATIC
var g_tw: number;
var g_errorLineNum: number;
var g_currentEventExec = -1;

//GAMEEXEC_STATIC void VM_Execute(int32_t loop);

//# include "gamestructures.c"
//#endif

function VM_CONDITIONAL(xxx:any):void { if ((xxx) || ((insptr = /*(intptr_t *)**/script[insptr+1]) && (((script[insptr]) & 0xfff) == CON_ELSE))) 
{ dlog(DEBUG_VM_CONDITIONAL, "VM_CONDITIONAL true\n"); insptr += 2; VM_Execute(0); } }
function VM_ScriptInfo (): void 
{
//#if !defined LUNATIC
    var p: number; //intptr_t

    if (!script)
        return;

    if (insptr)
    {
        initprintf("\n");

        for (p=insptr-20; p<insptr+20; p++)
        {
            initprintf("%5d: %3d: ",script[p],script[p - insptr]);

            if (script[p]>>12&&(script[p]&0xFFF)<CON_END)
                initprintf("%5d %s",int32(script[p]>>12),keyw[script[p]&0xFFF]);
            else                
                initprintf("%d",script[p]);//initprintf("%d",(int32_t)*p);

            initprintf("\n");
        }

        initprintf("\n");
    }

    if (vm.g_i)
        initprintf_nowarn("current actor: %d (%d)\n",vm.g_i,TrackerCast(vm.g_sp.picnum));

    initprintf("g_errorLineNum: %d, g_tw: %d\n",g_errorLineNum,g_tw);
//#endif
}

function VM_KillIt(/*int32_t */iActor:number, /*int32_t */iPlayer:number):void 
{
    if (iActor >= 0)
    {
        // if player was set to squish, first stop that...
        if (iPlayer >= 0 && g_player[iPlayer].ps.actorsqu == iActor)
            g_player[iPlayer].ps.actorsqu = -1;

        A_DeleteSprite(iActor);
    }
}

// May recurse, e.g. through EVENT_XXX . ... . EVENT_KILLIT
function VM_OnEvent(iEventID: number, iActor: number, iPlayer: number, lDist: number, iReturn: number): number
{
//#ifdef LUNATIC
//    const double t = gethitickms();

//    // TODO: handling of RETURN gamevar / iReturn / this function's return value
//    if (L_IsInitialized(&g_ElState) && El_HaveEvent(iEventID))
//        if (El_CallEvent(&g_ElState, iEventID, iActor, iPlayer, lDist, &iReturn)==1)
//            VM_KillIt(iActor, iPlayer);

//    g_eventTotalMs[iEventID] += gethitickms()-t;
//    g_eventCalls[iEventID]++;
//#else

    if (apScriptGameEvent[iEventID])
    {
        todoThrow();
        //intptr_t *oinsptr=insptr;
        //vmstate_t vm_backup;

        //vmstate_t tempvm = { iActor, iPlayer, lDist,
        //                     iActor >= 0 ? &actor[iActor].t_data[0] : NULL,
        //                     iActor >= 0 ? &sprite[iActor] : NULL,
        //                     0 };
                             
        //int32_t backupReturnVar = aGameVars[g_iReturnVarID].val.lValue;
        //int32_t backupEventExec = g_currentEventExec;

        //aGameVars[g_iReturnVarID].val.lValue = iReturn;
        //g_currentEventExec = iEventID;
        //insptr = apScriptGameEvent[iEventID];

        //Bmemcpy(&vm_backup, &vm, sizeof(vmstate_t));
        //Bmemcpy(&vm, &tempvm, sizeof(vmstate_t));

        //VM_Execute(1);

        //if (vm.g_flags & VM_KILL)
        //    VM_KillIt(iActor, iPlayer);

        //Bmemcpy(&vm, &vm_backup, sizeof(vmstate_t));
        //insptr = oinsptr;

        //g_currentEventExec = backupEventExec;
        //iReturn = aGameVars[g_iReturnVarID].val.lValue;
        //aGameVars[g_iReturnVarID].val.lValue = backupReturnVar;
    }
//#endif

    return iReturn;
}

function /*int32_t */VM_CheckSquished():number
{
    var sc = sector[vm.g_sp.sectnum];

    if ((vm.g_sp.picnum == APLAYER && ud.noclip) || sc.lotag == ST_23_SWINGING_DOOR)
        return 0;

    {
        var/*int32_t */fz=sc.floorz, cz=sc.ceilingz;
//#ifdef YAX_ENABLE
        var/*int16_t */cb:number, fb:number;

        var $cb = new R(cb);
        var $fb = new R(fb);
        yax_getbunches(vm.g_sp.sectnum, $cb, $fb);
        cb = $cb.$;
        fb = $fb.$;
        if (cb >= 0 && (sc.ceilingstat&512)==0)  // if ceiling non-blocking...
            cz -= (32<<8);  // unconditionally don't squish... yax_getneighborsect is slowish :/
        if (fb >= 0 && (sc.floorstat&512)==0)
            fz += (32<<8);
//#endif

        if (vm.g_sp.pal == 1 ?
            (fz - cz >= (32<<8) || (sc.lotag&32768)) :
            (fz - cz >= (12<<8)))
        return 0;
    }

    P_DoQuote(QUOTE_SQUISHED, g_player[vm.g_p].ps);

    if (A_CheckEnemySprite(vm.g_sp))
        vm.g_sp.xvel = 0;

    if (vm.g_sp.pal == 1) // frozen
    {
        actor[vm.g_i].picnum = SHOTSPARK1;
        actor[vm.g_i].extra = 1;
        return 0;
    }

    return 1;
}

//GAMEEXEC_STATIC GAMEEXEC_INLINE void P_ForceAngle(DukePlayer_t *p)
//{
//    int32_t n = 128-(krand()&255);

//    p.horiz += 64;
//    p.return_to_center = 9;
//    p.look_ang = p.rotscrnang = n>>1;
//}

function /*int32_t */A_Dodge(s:spritetype):number
{
    var /*int32_t*/ bx:number,by:number,bxvect:number,byvect:number,i:number;
    var /*int32_t*/ mx = s.x, my = s.y;
    var /*int32_t*/ mxvect = sintable[(s.ang+512)&2047];
    var /*int32_t*/ myvect = sintable[s.ang&2047];

    if (A_CheckEnemySprite(s) && s.extra <= 0) // hack
        return 0;

    for (i=headspritestat[STAT_PROJECTILE]; i>=0; i=nextspritestat[i]) //weapons list
    {
        if (sprite[i].owner == i)
            continue;

        bx = sprite[i].x-mx;
        by = sprite[i].y-my;
        bxvect = sintable[(sprite[i].ang+512)&2047];
        byvect = sintable[sprite[i].ang&2047];

        if ((mxvect * bx) + (myvect * by) >= 0 && (bxvect * bx) + (byvect * by) < 0)
        {
            if (klabs((bxvect * by) - (byvect * bx)) < 65536<<6)
            {
                s.ang -= 512+(krand()&1024);
                return 1;
            }
        }
    }
    return 0;
}

function /*int32_t */A_GetFurthestAngle(/*int32_t */iActor:number, /*int32_t */angs:number)
{
    var s = sprite[iActor];

    if (s.picnum != APLAYER && (AC_COUNT(actor[iActor].t_data)&63) > 2)
        return s.ang + 1024;

    {
        var /*int32_t*/ furthest_angle=0;
        var /*int32_t*/ d:number, j:number;
        var /*int32_t*/ greatestd = INT32_MIN;
        var /*int32_t*/ angincs=2048/angs;
        var hit = new hitdata_t();

        for (j=s.ang; j<(2048+s.ang); j+=angincs)
        {
            s.z -= (8<<8);
            hitscan(/*(const vec3_t *)*/new vec3_t(s.x, s.y, s.z), s.sectnum,
                    sintable[(j+512)&2047],
                    sintable[j&2047],0,
                    hit,CLIPMASK1);
            s.z += (8<<8);
            d = klabs(hit.pos.x-s.x) + klabs(hit.pos.y-s.y);

            if (d > greatestd)
            {
                greatestd = d;
                furthest_angle = j;
            }
        }

        return furthest_angle&2047;
    }
}

function/*int32_t */A_FurthestVisiblePoint(/*int32_t*/ iActor:number, ts:spritetype, /*int32_t **/dax:R<number>, /*int32_t **/day:R<number>):number
{
    if (AC_COUNT(actor[iActor].t_data)&63)
        return -1;

    {
        var/*int32_t */d:number, da:number;//, d, cd, ca,tempx,tempy,cx,cy;
        var/*int32_t */j:number, angincs:number;
        var s = sprite[iActor];
        var hit= new hitdata_t();

        if ((!g_netServer && ud.multimode < 2) && ud.player_skill < 3)
            angincs = 2048/2;
        else angincs = 2048/(1+(krand()&1));

        for (j=ts.ang; j<(2048+ts.ang); j+=(angincs-(krand()&511)))
        {
            ts.z -= (16<<8);
            hitscan(/*(const vec3_t *)*/ts, ts.sectnum,
                    sintable[(j+512)&2047],
                    sintable[j&2047],16384-(krand()&32767),
                    hit,CLIPMASK1);

            ts.z += (16<<8);

            d = klabs(hit.pos.x-ts.x)+klabs(hit.pos.y-ts.y);
            da = klabs(hit.pos.x-s.x)+klabs(hit.pos.y-s.y);

            if (d < da && hit.sect > -1)
                if (cansee(hit.pos.x,hit.pos.y,hit.pos.z,
                           hit.sect,s.x,s.y,s.z-(16<<8),s.sectnum))
                {
                    dax.$ = hit.pos.x;
                    day.$ = hit.pos.y;
                    return hit.sect;
                }
        }
        return -1;
    }
}

function A_GetZLimits(/*int32_t */iActor:  number): void
{
    var s = sprite[iActor];

//    if (s.statnum == STAT_PLAYER || s.statnum == STAT_STANDABLE || s.statnum == STAT_ZOMBIEACTOR || s.statnum == STAT_ACTOR || s.statnum == STAT_PROJECTILE)
    {
        var hz:number,lz:number,zr = 127;    
        var cstat = s.cstat;   

        s.cstat = 0;

        if (s.statnum == STAT_PROJECTILE)
            zr = 4;

        s.z -= ZOFFSET;
        var $cz = new R(actor[iActor].ceilingz);
        var $hz = new R(hz);
        var $fz = new R(actor[iActor].floorz);
        var $lz = new R(lz);
        getzrange(s,s.sectnum,$cz,$hz,$fz,$lz,zr,CLIPMASK0);
        actor[iActor].ceilingz = $cz.$;
        hz = $hz.$;
        actor[iActor].floorz = $fz.$;
        lz = $lz.$;

        s.z += ZOFFSET;

        s.cstat = cstat;

        actor[iActor].flags &= ~SPRITE_NOFLOORSHADOW;

        if ((lz&49152) == 49152 && (sprite[lz&(MAXSPRITES-1)].cstat&48) == 0)
        {
            var hitspr = sprite[lz&(MAXSPRITES-1)];

            lz &= (MAXSPRITES-1);

            if ((A_CheckEnemySprite(hitspr) && hitspr.pal != 1 && s.statnum != STAT_PROJECTILE)
                    || (hitspr.picnum == APLAYER && A_CheckEnemySprite(s)))
            {
                actor[iActor].flags |= SPRITE_NOFLOORSHADOW;  // No shadows on actors
                s.xvel = -256;
                A_SetSprite(iActor,CLIPMASK0);
            }
            else if (s.statnum == STAT_PROJECTILE && hitspr.picnum == APLAYER && s.owner==lz)
            {
                actor[iActor].ceilingz = sector[s.sectnum].ceilingz;
                actor[iActor].floorz   = sector[s.sectnum].floorz;
            }
        }
    }
    /*
        else
        {
            actor[iActor].ceilingz = sector[s.sectnum].ceilingz;
            actor[iActor].floorz   = sector[s.sectnum].floorz;
        }
    */
}

function A_Fall(/*int32_t*/ iActor: number): void
{
    var s = sprite[iActor];
    var /*int32_t*/ hz: number,lz: number,c = g_spriteGravity;
//#ifdef YAX_ENABLE
    var fbunch: number;
//#endif
    if (G_CheckForSpaceFloor(s.sectnum))
        c = 0;
    else
    {
        if (G_CheckForSpaceCeiling(s.sectnum) || sector[s.sectnum].lotag == ST_2_UNDERWATER)
            c = int32(g_spriteGravity/6);
    }

    if (s.statnum == STAT_ACTOR || s.statnum == STAT_PLAYER || s.statnum == STAT_ZOMBIEACTOR || s.statnum == STAT_STANDABLE)
    {
        var cstat = s.cstat;
        s.cstat = 0;
        s.z -= ZOFFSET;
        var $ceilingz = new R(actor[iActor].ceilingz);
        var $hz = new R(hz);
        var $floorz = new R(actor[iActor].floorz);
        var $lz = new R(lz);
        getzrange(s,s.sectnum,$ceilingz,$hz,$floorz,$lz,127,CLIPMASK0);
        actor[iActor].ceilingz = $ceilingz.$;
        hz = $hz.$;
        actor[iActor].floorz = $floorz.$;
        lz = $lz.$;

        s.z += ZOFFSET;
        s.cstat = cstat;
    }
    else
    {
        actor[iActor].ceilingz = sector[s.sectnum].ceilingz;
        actor[iActor].floorz   = sector[s.sectnum].floorz;
    }

//#ifdef YAX_ENABLE
    if (sector[s.sectnum].floorstat&512)
        fbunch = -1;
    else
        fbunch = yax_getbunch(s.sectnum, YAX_FLOOR);
//#endif

    if (s.z < actor[iActor].floorz-ZOFFSET
//#ifdef YAX_ENABLE
            || fbunch >= 0
//#endif
       )
    {
        if (sector[s.sectnum].lotag == ST_2_UNDERWATER && s.zvel > 3122)
            s.zvel = 3144;
        s.z += s.zvel = min(6144, s.zvel+c);
    }

//#ifdef YAX_ENABLE
    if (fbunch >= 0)
        setspritez(iActor, s);
    else
//#endif
        if (s.z >= actor[iActor].floorz-ZOFFSET)
        {
            s.z = actor[iActor].floorz-ZOFFSET;
            s.zvel = 0;
        }
}

function /*int32_t */G_GetAngleDelta(/*int32_t */a:number,/*int32_t */na:number):number
{
    a &= 2047;
    na &= 2047;

    if (klabs(a-na) < 1024)
    {
//        OSD_Printf("G_GetAngleDelta() returning %d\n",na-a);
        return (na-a);
    }

    if (na > 1024) na -= 2048;
    if (a > 1024) a -= 2048;

//    OSD_Printf("G_GetAngleDelta() returning %d\n",na-a);
    return (na-a);
}

function VM_AlterAng(/*int32_t */movflags:number):void
{
    var /*const int32_t */ticselapsed = (AC_COUNT(vm.g_t))&31;

//#if !defined LUNATIC
    var /*const intptr_t **/moveptr:number;
	dlog(DEBUG_VM_EXECUTE, "VM_AlterAng movflags: %i\n", movflags);
    if (unsigned(AC_MOVE_ID(vm.g_t)) >= unsigned(g_scriptSize-1))

    {
        vm.g_t[1] = 0;//AC_MOVE_ID(vm.g_t) = 0;
        OSD_Printf_nowarn(OSD_ERROR + "bad moveptr for actor %d (%d)!\n", vm.g_i, TrackerCast(vm.g_sp.picnum));
        return;
    }

    moveptr = AC_MOVE_ID(vm.g_t);//script + AC_MOVE_ID(vm.g_t);

	dlog(DEBUG_VM_EXECUTE, "VM_AlterAng *moveptr: %i, vm.g_t[0]: %i\n", script[moveptr], vm.g_t[0]);
	dlog(DEBUG_VM_EXECUTE, "*moveptr - vm.g_sp->xvel: %i, \n",  script[moveptr] - vm.g_sp.xvel);
    vm.g_sp.xvel += int32((script[moveptr] - vm.g_sp.xvel)/5);
    if (vm.g_sp.zvel < 648)
        vm.g_sp.zvel += int32(((script[moveptr+1]<<4) - vm.g_sp.zvel)/5);
//#else
//    vm.g_sp.xvel += int32((actor[vm.g_i].mv.hvel - vm.g_sp.xvel)/5);
//    if (vm.g_sp.zvel < 648)
//        vm.g_sp.zvel += int32(((actor[vm.g_i].mv.vvel<<4) - vm.g_sp.zvel)/5);
//#endif

    if (A_CheckEnemySprite(vm.g_sp) && vm.g_sp.extra <= 0) // hack
        return;

    if (movflags&seekplayer)
    {
        var/*int32_t */aang = vm.g_sp.ang, angdif:number, goalang:number;
        var/*int32_t */j = g_player[vm.g_p].ps.holoduke_on;

        // NOTE: looks like 'owner' is set to target sprite ID...

        if (j >= 0 && cansee(sprite[j].x,sprite[j].y,sprite[j].z,sprite[j].sectnum,vm.g_sp.x,vm.g_sp.y,vm.g_sp.z,vm.g_sp.sectnum))
            vm.g_sp.owner = j;
        else vm.g_sp.owner = g_player[vm.g_p].ps.i;

        if (sprite[vm.g_sp.owner].picnum == APLAYER)
            goalang = getangle(actor[vm.g_i].lastvx-vm.g_sp.x,actor[vm.g_i].lastvy-vm.g_sp.y);
        else
            goalang = getangle(sprite[vm.g_sp.owner].x-vm.g_sp.x,sprite[vm.g_sp.owner].y-vm.g_sp.y);

        if (vm.g_sp.xvel && vm.g_sp.picnum != DRONE)
        {
            angdif = G_GetAngleDelta(aang,goalang);

            if (ticselapsed < 2)
            {
                if (klabs(angdif) < 256)
                {
                    j = 128-(krand()&256);
                    vm.g_sp.ang += j;
                    if (A_GetHitscanRange(vm.g_i) < 844)
                        vm.g_sp.ang -= j;
                }
            }
            else if (ticselapsed > 18 && ticselapsed < GAMETICSPERSEC) // choose
            {
                if (klabs(angdif>>2) < 128) vm.g_sp.ang = goalang;
                else vm.g_sp.ang += angdif>>2;
            }
        }
        else vm.g_sp.ang = goalang;
    }

    if (ticselapsed < 1)
    {
        if (movflags&furthestdir)
        {
            vm.g_sp.ang = A_GetFurthestAngle(vm.g_i, 2);
            vm.g_sp.owner = g_player[vm.g_p].ps.i;
        }

        if (movflags&fleeenemy)
            vm.g_sp.ang = A_GetFurthestAngle(vm.g_i, 2);
    }
}

function VM_AddAngle(/*int32_t */shr:number, /*int32_t */goalang:number):void
{
    var/*int32_t */angdif = G_GetAngleDelta(vm.g_sp.ang,goalang)>>shr;

    if ((angdif > -8 && angdif < 0) || (angdif < 8 && angdif > 0))
        angdif *= 2;

    vm.g_sp.ang += angdif;
}

function  VM_FacePlayer(/*int32_t */shr:number):void
{
    var/*int32_t */goalang:number;
    var ps = g_player[vm.g_p].ps;

    if (g_player[vm.g_p].ps.newowner >= 0)
        goalang = getangle(ps.opos.x-vm.g_sp.x, ps.opos.y-vm.g_sp.y);
    else
        goalang = getangle(ps.pos.x-vm.g_sp.x, ps.pos.y-vm.g_sp.y);

    VM_AddAngle(shr, goalang);
}

////////// TROR get*zofslope //////////
// These rather belong into the engine.

function /*int32_t */yax_getceilzofslope(/*int16_t */sectnum:number, /*int32_t */dax:number, /*int32_t */day:number):number
{
//#ifdef YAX_ENABLE
    if ((sector[sectnum].ceilingstat&512)==0)
    {
        var /*int32_t */nsect = yax_getneighborsect(dax, day, sectnum, YAX_CEILING);
        if (nsect >= 0)
            return getceilzofslope(nsect, dax, day);
    }
//#endif
    return getceilzofslope(sectnum, dax, day);
}

function /*int32_t */yax_getflorzofslope(/*int16_t */sectnum:number, /*int32_t */dax:number, /*int32_t */day:number):number
{
//#ifdef YAX_ENABLE
    if ((sector[sectnum].floorstat&512)==0)
    {
        var/*int32_t */nsect = yax_getneighborsect(dax, day, sectnum, YAX_FLOOR);
        if (nsect >= 0)
            return getflorzofslope(nsect, dax, day);
    }
//#endif
    return getflorzofslope(sectnum, dax, day);
}

////////////////////

function VM_Move():void
{
//#if !defined LUNATIC
    var /*const intptr_t **/moveptr:Int32Array;
//#endif
    // NOTE: commented out condition is dead since r3159 (making hi/lotag unsigned).
    // XXX: Does it break anything? Where are movflags with all bits set created?
    var /*const uint16_t **/movflagsptr = AC_MOVFLAGS(vm.g_sp, actor[vm.g_i]);
    var/*const int32_t */movflags = /*(*movflagsptr==-1) ? 0 : **/ movflagsptr;
    var /*const int32_t */deadflag = (A_CheckEnemySprite(vm.g_sp) && vm.g_sp.extra <= 0)?1:0;
    var/*int32_t */badguyp:number, angdif:number;

    vm.g_t[0]++;//AC_COUNT(vm.g_t)++;

    // If the move ID is zero, or the movflags are 0
    if (AC_MOVE_ID(vm.g_t) == 0 || movflags == 0)
    {
        if (deadflag || (actor[vm.g_i].bpos.x != vm.g_sp.x) || (actor[vm.g_i].bpos.y != vm.g_sp.y))
        {
            actor[vm.g_i].bpos.x = vm.g_sp.x;
            actor[vm.g_i].bpos.y = vm.g_sp.y;
            setsprite(vm.g_i, /*(vec3_t *)*/vm.g_sp);
        }
        return;
    }

    if (!deadflag) {
        //goto dead;

        if (movflags&face_player)
            VM_FacePlayer(2);

        if (movflags&spin)
            vm.g_sp.ang += sintable[((AC_COUNT(vm.g_t)<<3)&2047)]>>6;

        if (movflags&face_player_slow)
            VM_FacePlayer(4);

        if ((movflags&jumptoplayer) == jumptoplayer)
        {
            if (AC_COUNT(vm.g_t) < 16)
                vm.g_sp.zvel -= (sintable[(512+(AC_COUNT(vm.g_t)<<4))&2047]>>5);
        }

        if (movflags&face_player_smart)
        {
            var /*DukePlayer_t *const */ps = g_player[vm.g_p].ps;
            var /*int32_t */newx = ps.pos.x + (ps.vel.x/768);
            var /*int32_t */newy = ps.pos.y + (ps.vel.y/768);

            var/*int32_t */goalang = getangle(newx-vm.g_sp.x,newy-vm.g_sp.y);
            VM_AddAngle(2, goalang);
        }
    }
//dead:
//#if !defined LUNATIC
    if (unsigned(AC_MOVE_ID(vm.g_t)) >= unsigned(g_scriptSize-1))
    {
        vm.g_t[1] = 0;// AC_MOVE_ID(vm.g_t) = 0;
        OSD_Printf_nowarn(OSD_ERROR + "clearing bad moveptr for actor %d (%d)\n", vm.g_i, TrackerCast(vm.g_sp.picnum));
        return;
    }

    moveptr = script.subarray(vm.g_t[1]);/*AC_MOVE_ID(vm.g_t);*/

    if (movflags&geth) vm.g_sp.xvel += ((moveptr[0])-vm.g_sp.xvel)>>1;
    if (movflags&getv) vm.g_sp.zvel += (((moveptr[1])<<4)-vm.g_sp.zvel)>>1;
//#else
//    if (movflags&geth) vm.g_sp.xvel += (actor[vm.g_i].mv.hvel - vm.g_sp.xvel)>>1;
//    if (movflags&getv) vm.g_sp.zvel += (16*actor[vm.g_i].mv.vvel - vm.g_sp.zvel)>>1;
//#endif

    if (movflags&dodgebullet && !deadflag)
        A_Dodge(vm.g_sp);

    if (vm.g_sp.picnum != APLAYER)
        VM_AlterAng(movflags);

    if (vm.g_sp.xvel > -6 && vm.g_sp.xvel < 6)
        vm.g_sp.xvel = 0;

    badguyp = A_CheckEnemySprite(vm.g_sp);

    if (vm.g_sp.xvel || vm.g_sp.zvel)
    {
        var /*int32_t */daxvel:number;

        if (badguyp && vm.g_sp.picnum != ROTATEGUN)
        {
            if ((vm.g_sp.picnum == DRONE || vm.g_sp.picnum == COMMANDER) && vm.g_sp.extra > 0)
            {
                if (vm.g_sp.picnum == COMMANDER)
                {
                    var /*int32_t */l:number;
                    // NOTE: COMMANDER updates both actor[].floorz and
                    // .ceilingz regardless of its zvel.
                    actor[vm.g_i].floorz = l = yax_getflorzofslope(vm.g_sp.sectnum,vm.g_sp.x,vm.g_sp.y);
                    if (vm.g_sp.z > l-(8<<8))
                    {
                        vm.g_sp.z = l-(8<<8);
                        vm.g_sp.zvel = 0;
                    }

                    actor[vm.g_i].ceilingz = l = yax_getceilzofslope(vm.g_sp.sectnum,vm.g_sp.x,vm.g_sp.y);
                    if (vm.g_sp.z < l+(80<<8))
                    {
                        vm.g_sp.z = l+(80<<8);
                        vm.g_sp.zvel = 0;
                    }
                }
                else
                {
                    var /*int32_t */l:number;
                    // The DRONE updates either .floorz or .ceilingz, not both.
                    if (vm.g_sp.zvel > 0)
                    {
                        actor[vm.g_i].floorz = l = yax_getflorzofslope(vm.g_sp.sectnum,vm.g_sp.x,vm.g_sp.y);
                        if (vm.g_sp.z > l-(30<<8))
                            vm.g_sp.z = l-(30<<8);
                    }
                    else
                    {
                        actor[vm.g_i].ceilingz = l = yax_getceilzofslope(vm.g_sp.sectnum,vm.g_sp.x,vm.g_sp.y);
                        if (vm.g_sp.z < l+(50<<8))
                        {
                            vm.g_sp.z = l+(50<<8);
                            vm.g_sp.zvel = 0;
                        }
                    }
                }
            }
            else if (vm.g_sp.picnum != ORGANTIC)
            {
                // All other actors besides ORGANTIC don't update .floorz or
                // .ceilingz here.
                if (vm.g_sp.zvel > 0 && actor[vm.g_i].floorz < vm.g_sp.z)
                    vm.g_sp.z = actor[vm.g_i].floorz;
                if (vm.g_sp.zvel < 0)
                {
                    var/*const int32_t */l = yax_getceilzofslope(vm.g_sp.sectnum,vm.g_sp.x,vm.g_sp.y);

                    if (vm.g_sp.z < l+(66<<8))
                    {
                        vm.g_sp.z = l+(66<<8);
                        vm.g_sp.zvel >>= 1;
                    }
                }
            }
        }
        else if (vm.g_sp.picnum == APLAYER)
            if (vm.g_sp.z < actor[vm.g_i].ceilingz+(32<<8))
                vm.g_sp.z = actor[vm.g_i].ceilingz+(32<<8);

        daxvel = vm.g_sp.xvel;
        angdif = vm.g_sp.ang;

        if (badguyp && vm.g_sp.picnum != ROTATEGUN)
        {
            var ps = g_player[vm.g_p].ps;

            if (vm.g_x < 960 && vm.g_sp.xrepeat > 16)
            {
                daxvel = -(1024-vm.g_x);
                angdif = getangle(ps.pos.x-vm.g_sp.x, ps.pos.y-vm.g_sp.y);

                if (vm.g_x < 512)
                {
                    ps.vel.x = 0;
                    ps.vel.y = 0;
                }
                else
                {
                    ps.vel.x = mulscale16(ps.vel.x, ps.runspeed-0x2000);
                    ps.vel.y = mulscale16(ps.vel.y, ps.runspeed-0x2000);
                }
            }
            else if (vm.g_sp.picnum != DRONE && vm.g_sp.picnum != SHARK && vm.g_sp.picnum != COMMANDER)
            {
                if (ps.actorsqu == vm.g_i)
                    return;

                if (!A_CheckSpriteFlags(vm.g_i, SPRITE_SMOOTHMOVE))
                {
                    if (AC_COUNT(vm.g_t)&1)
                        return;
                    daxvel <<= 1;
                }
            }
        }

		dlog(DEBUG_VM_EXECUTE, "VM_Move angdif: %i, daxvel:%i, vm.g_sp->zvel: %i\n", angdif, daxvel, vm.g_sp.zvel);
        {
            var tmpvect = new vec3_t( (daxvel*(sintable[(angdif+512)&2047]))>>14,
                               (daxvel*(sintable[angdif&2047]))>>14,
                               vm.g_sp.zvel
                             );

            actor[vm.g_i].movflag = A_MoveSprite(
                vm.g_i,tmpvect, (A_CheckSpriteFlags(vm.g_i, SPRITE_NOCLIP) ? 0 : CLIPMASK0));
        }
    }

    if (!badguyp)
        return;

    if (sector[vm.g_sp.sectnum].ceilingstat&1)
        vm.g_sp.shade += (sector[vm.g_sp.sectnum].ceilingshade-vm.g_sp.shade)>>1;
    else vm.g_sp.shade += (sector[vm.g_sp.sectnum].floorshade-vm.g_sp.shade)>>1;
}

function P_AddWeaponMaybeSwitch(ps:DukePlayer_t, /*int32_t */weap:number):void
{
    if ((ps.weaponswitch & 1) && (ps.weaponswitch & 4))
    {
        var /*int32_t */snum = sprite[ps.i].yvel;
        var/*int32_t */i:number, w:number, new_wchoice = -1, curr_wchoice = -1;

        for (i=0; i<10 && (new_wchoice < 0 || curr_wchoice < 0); i++)
        {
            w = g_player[snum].wchoice[i];

            if (w == 0) w = 9;
            else w--;

            if (w == ps.curr_weapon)
                curr_wchoice = i;
            if (w == weap)
                new_wchoice = i;
        }

        if (new_wchoice < curr_wchoice)
            P_AddWeapon(ps, weap);
        else
            P_AddWeaponNoSwitch(ps, weap);
    }
    else if (ps.weaponswitch & 1)
        P_AddWeapon(ps, weap);
    else
        P_AddWeaponNoSwitch(ps, weap);
}

//#if defined LUNATIC
//void P_AddWeaponMaybeSwitchI(int32_t snum, int32_t weap)
//{
//    P_AddWeaponMaybeSwitch(g_player[snum].ps, weap);
//}
//#else
function P_AddWeaponAmmoCommon(ps:DukePlayer_t , /*int32_t */weap:number, /*int32_t */amount:number):void
{
    P_AddAmmo(weap, ps, amount);

    if (ps.curr_weapon == KNEE_WEAPON && (ps.gotweapon & (1 << weap)))
        P_AddWeaponMaybeSwitch(ps, weap);
}

function /*int32_t */VM_AddWeapon(/*int32_t */weap:number, /*int32_t */amount:number, ps:DukePlayer_t):number
{
    if (unsigned(weap) >= MAX_WEAPONS)
    {
        CON_ERRPRINTF("Invalid weapon ID %d\n", weap);
        return 1;
    }

    if ((ps.gotweapon & (1 << weap)) == 0)
    {
        P_AddWeaponMaybeSwitch(ps, weap);
    }
    else if (ps.ammo_amount[weap] >= ps.max_ammo_amount[weap])
    {
        vm.g_flags |= VM_NOEXECUTE;
        return 2;
    }

    P_AddWeaponAmmoCommon(ps, weap, amount);

    return 0;
}
//#endif

function VM_Fall(/*int32_t */g_i:number, g_sp:spritetype ):void 
{
    var/*int32_t */grav = g_spriteGravity;

    g_sp.xoffset = g_sp.yoffset = 0;

    if (G_CheckForSpaceCeiling(g_sp.sectnum) || sector[g_sp.sectnum].lotag == ST_2_UNDERWATER)
        grav = int32(g_spriteGravity/6);
    else if (G_CheckForSpaceFloor(g_sp.sectnum))
        grav = 0;

    if (!actor[g_i].cgg-- || (sector[g_sp.sectnum].floorstat&2))
    {
        A_GetZLimits(g_i);
        actor[g_i].cgg = 3;
    }

    if (g_sp.z < actor[g_i].floorz-ZOFFSET)
    {
        // Free fall.
        g_sp.zvel = min(g_sp.zvel+grav, ACTOR_MAXFALLINGZVEL);
        g_sp.z += g_sp.zvel;
//#ifdef YAX_ENABLE
        if (yax_getbunch(g_sp.sectnum, YAX_FLOOR) >= 0 &&
                (sector[g_sp.sectnum].floorstat&512)==0)
            setspritez(g_i, /*(vec3_t *)*/g_sp);
        else
//#endif
            if (g_sp.z > actor[g_i].floorz - ZOFFSET)
                g_sp.z = actor[g_i].floorz - ZOFFSET;
        return;
    }

    // SET_SPRITE_Z
    g_sp.z = actor[g_i].floorz - ZOFFSET;

    if (A_CheckEnemySprite(g_sp) || (g_sp.picnum == APLAYER && g_sp.owner >= 0))
    {
        if (g_sp.zvel > 3084 && g_sp.extra <= 1)
        {
            // I'm guessing this DRONE check is from a beta version of the game
            // where they crashed into the ground when killed
            if (!(g_sp.picnum == APLAYER && g_sp.extra > 0) && g_sp.pal != 1 && g_sp.picnum != DRONE)
            {
                A_DoGuts(g_i,JIBS6,15);
                A_PlaySound(SQUISHED,g_i);
                A_Spawn(g_i,BLOODPOOL);
            }

            actor[g_i].picnum = SHOTSPARK1;
            actor[g_i].extra = 1;
            g_sp.zvel = 0;
        }
        else if (g_sp.zvel > 2048 && sector[g_sp.sectnum].lotag != ST_1_ABOVE_WATER)
        {
            var/*int16_t */newsect = g_sp.sectnum;

            var $newsect = new R(newsect);
            pushmove(/*(vec3_t *)*/g_sp, $newsect, 128, 4<<8, 4<<8, CLIPMASK0);
            newsect = $newsect.$;
            if (unsigned(newsect) < MAXSECTORS)
                changespritesect(g_i, newsect);

            A_PlaySound(THUD, g_i);
        }
    }

//#if 0
//    if (g_sp.z > actor[g_i].floorz - ZOFFSET)
//    {
//        // Unreachable because of SET_SPRITE_Z.
//        A_GetZLimits(g_i);
//        if (actor[g_i].floorz != sector[g_sp.sectnum].floorz)
//            g_sp.z = (actor[g_i].floorz - ZOFFSET);
//        return;
//    }
//#endif

    if (sector[g_sp.sectnum].lotag == ST_1_ABOVE_WATER)
    {
        switch (DYNAMICTILEMAP(g_sp.picnum))
        {
        case OCTABRAIN__STATIC:
        case COMMANDER__STATIC:
        case DRONE__STATIC:
            break;

        default:
        {
//#if !defined LUNATIC
            var/*int32_t */moveScriptOfs = AC_MOVE_ID(vm.g_t);
//#endif
            // fix for flying/jumping monsters getting stuck in water
            if ((g_sp.hitag & jumptoplayer) ||
                (G_HaveActor(g_sp.picnum) &&
//#if !defined LUNATIC
                unsigned(moveScriptOfs) < unsigned(g_scriptSize)-1 && script[moveScriptOfs + 1]
//#else
//                 actor[g_i].mv.vvel != 0
//#endif
                    ))
            {
//                OSD_Printf("%d\n", script[moveScriptOfs + 1]);
                break;
            }

//            OSD_Printf("hitag: %d\n",g_sp.hitag);
            g_sp.z += ACTOR_ONWATER_ADDZ;
            break;
        }
        }

        return;
    }

    g_sp.zvel = 0;
}

function /*int32_t */VM_ResetPlayer(/*int32_t */g_p:number, /*int32_t */g_flags:number):number
{
    //AddLog("resetplayer");
    if (!g_netServer && ud.multimode < 2)
    {
        if (g_lastSaveSlot >= 0 && ud.recstat != 2)
        {
            g_player[g_p].ps.gm |= MODE_MENU;
            KB_ClearKeyDown(sc_Space);
            M_ChangeMenu(15000);
        }
        else g_player[g_p].ps.gm = MODE_RESTART;

        g_flags |= VM_NOEXECUTE;
    }
    else
    {
        if (g_p == myconnectindex)
        {
            g_cameraDistance = 0;
            g_cameraClock = totalclock;
        }

        if (g_fakeMultiMode)
            P_ResetPlayer(g_p);
//#ifndef NETCODE_DISABLE
        if (g_netServer)
        {todoThrow();
            var/*int32_t */jj = 0;

            //P_ResetPlayer(g_p);

            //packbuf[jj++] = PACKET_PLAYER_SPAWN;
            //packbuf[jj++] = g_p;

            //Bmemcpy(&packbuf[jj], &g_player[g_p].ps.pos.x, sizeof(vec3_t) * 2);
            //jj += sizeof(vec3_t) * 2;

            //packbuf[jj++] = 0;

            //enet_host_broadcast(g_netServer, CHAN_GAMESTATE, enet_packet_create(
            //                        packbuf, jj, ENET_PACKET_FLAG_RELIABLE));
        }
//#endif
    }

    P_UpdateScreenPal(g_player[g_p].ps);
    //AddLog("EOF: resetplayer");

    return g_flags;
}

//void G_GetTimeDate(int32_t *vals)
//{
//    time_t rawtime;
//    struct tm *ti;

//    time(&rawtime);
//    ti=localtime(&rawtime);
//    // initprintf("Time&date: %s\n",asctime (ti));

//    vals[0] = ti.tm_sec;
//    vals[1] = ti.tm_min;
//    vals[2] = ti.tm_hour;
//    vals[3] = ti.tm_mday;
//    vals[4] = ti.tm_mon;
//    vals[5] = ti.tm_year+1900;
//    vals[6] = ti.tm_wday;
//    vals[7] = ti.tm_yday;
//}

//int32_t G_StartTrack(int32_t level)
//{
//    if (unsigned(level) < MAXLEVELS)
//    {
//        int32_t musicIndex = MAXLEVELS*ud.volume_number + level;

//        if (MapInfo[musicIndex].musicfn != NULL)
//        {
//            // Only set g_musicIndex on success.
//            g_musicIndex = musicIndex;
//            S_PlayMusic(MapInfo[musicIndex].musicfn, g_musicIndex);

//            return 0;
//        }
//    }

//    return 1;
//}

//LUNATIC_EXTERN void G_ShowView(int32_t x, int32_t y, int32_t z, int32_t a, int32_t horiz, int32_t sect,
//                               int32_t x1, int32_t y1, int32_t x2, int32_t y2, int32_t unbiasedp)
//{
//    int32_t smoothratio = calc_smoothratio(totalclock, ototalclock);
//#ifdef USE_OPENGL
//    int32_t oprojhacks;
//#endif

//    if (g_screenCapture)
//        return;

//    if (offscreenrendering)
//    {
//        clearview(0);
//        return;
//    }

//    if (x1 > x2) swaplong(&x1,&x2);
//    if (y1 > y2) swaplong(&y1,&y2);

//    if (!unbiasedp)
//    {
//        // The showview command has a rounding bias towards zero,
//        // e.g. floor((319*1680)/320) == 1674
//        x1 = scale(x1,xdim,320);
//        y1 = scale(y1,ydim,200);
//        x2 = scale(x2,xdim,320);
//        y2 = scale(y2,ydim,200);
//    }
//    else
//    {
//        // This will map the maximum 320-based coordinate to the
//        // maximum real screen coordinate:
//        // floor((319*1679)/319) == 1679
//        x1 = scale(x1,xdim-1,319);
//        y1 = scale(y1,ydim-1,199);
//        x2 = scale(x2,xdim-1,319);
//        y2 = scale(y2,ydim-1,199);
//    }

//    horiz = clamp(horiz, HORIZ_MIN, HORIZ_MAX);

//#ifdef USE_OPENGL
//    oprojhacks = glprojectionhacks;
//    glprojectionhacks = 0;
//#endif
//    {
//        int32_t o = newaspect_enable;
//        newaspect_enable = r_usenewaspect;
//        setaspect_new_use_dimen = 1;

//        setview(x1,y1,x2,y2);

//        setaspect_new_use_dimen = 0;
//        newaspect_enable = o;
//    }

//    G_DoInterpolations(smoothratio);

//    G_HandleMirror(x, y, z, a, horiz, smoothratio);
//#ifdef POLYMER
//    if (getrendermode() == REND_POLYMER)
//        polymer_setanimatesprites(G_DoSpriteAnimations, x,y,a,smoothratio);
//#endif
//    yax_preparedrawrooms();
//    drawrooms(x,y,z,a,horiz,sect);
//    yax_drawrooms(G_DoSpriteAnimations, sect, 0, smoothratio);

//    display_mirror = 2;
//    G_DoSpriteAnimations(x,y,a,smoothratio);
//    display_mirror = 0;
//    drawmasks();
//    G_RestoreInterpolations();
//    G_UpdateScreenArea();
//#ifdef USE_OPENGL
//    glprojectionhacks = oprojhacks;
//#endif
//}

//#if !defined LUNATIC
var vm_exec_loop_count = 0;
function VM_Execute(/*int32_t */loop: number): void
{
   var tw = script[insptr];

    dlog(DEBUG_VM_EXECUTE, "VM_Execute tw: %i\n", tw);
    // jump directly into the loop, saving us from the checks during the first iteration
    var skip_check = true;

    while (loop || skip_check)
    {
        if(!skip_check) {
            dlog(DEBUG_VM_EXECUTE, "loop b4 skip_check tw: %i, instptr: %i\n", tw, script[insptr]);

            if (vm.g_flags & (VM_RETURN|VM_KILL|VM_NOEXECUTE)) 
            {
                dlog(DEBUG_VM_EXECUTE, "VM_return flags: %i insptr: %i\n", tw, script[insptr]);
                return;
            }

            tw = script[insptr];
        }

        skip_check = false;
        //      Bsprintf(g_szBuf,"Parsing: %d",script[insptr]);
        ////      AddLog(g_szBuf);

        g_errorLineNum = tw>>12;
        g_tw = tw &= 0xFFF;
        
        vm_exec_loop_count++;
        dlog(DEBUG_VM_EXECUTE, "loop vm_exec_loop_count: %i, tw: %i, *instptr: %i, insptr: %i\n",vm_exec_loop_count ,tw, script[insptr], insptr);
        dlog(DEBUG_VM_EXECUTE, "vm.g_t: ");
        for (var gt = 0; gt < 9 ; dlog(DEBUG_VM_EXECUTE, "%i:%i, ",gt, vm.g_t[gt++])){};
        dlog(DEBUG_VM_EXECUTE, "\n");

        
        switch (tw)
        {
        case CON_REDEFINEQUOTE:
            insptr++;
            {
                var/*int32_t */q = script[insptr++], i = script[insptr++];
                if ((ScriptQuotes[q] == NULL || ScriptQuoteRedefinitions[i] == NULL))
                {
                    CON_ERRPRINTF("%d %d null quote\n", q,i);
                    break;
                }
                Bstrcpy(ScriptQuotes[q],ScriptQuoteRedefinitions[i].toString());
                continue;
            }

        case CON_GETTHISPROJECTILE:
        case CON_SETTHISPROJECTILE:
            insptr++;
            {
                // syntax [gs]etplayer[<var>].x <VAR>
                // <varid> <xxxid> <varid>
                var/*int32_t */lVar1=script[insptr++], lLabelID=script[insptr++], lVar2=script[insptr++];

                VM_AccessActiveProjectile(tw==CON_SETTHISPROJECTILE?1:0,lVar1,lLabelID,lVar2);
                continue;
            }

        case CON_IFRND:
            VM_CONDITIONAL(rnd(script[++insptr] /* *(++insptr)*/ ));
            continue;

        case CON_IFCANSHOOTTARGET:
        {
            var/*int32_t */j:number;

            if (vm.g_x > 1024)
            {
                var/*int16_t */temphit = new R(0);

                if ((j = A_CheckHitSprite(vm.g_i,temphit)) == (1<<30))
                {
                    VM_CONDITIONAL(1);
                    continue;
                }

                {
                    var/*int32_t */sclip = 768, angdif = 16;

                    if (A_CheckEnemySprite(vm.g_sp) && vm.g_sp.xrepeat > 56)
                    {
                        sclip = 3084;
                        angdif = 48;
                    }

                    if (j > sclip)
                    {
                        if (temphit.$ >= 0 && sprite[temphit.$].picnum == vm.g_sp.picnum)
                        {
                            VM_CONDITIONAL(0);
                            continue;
                        }

                        vm.g_sp.ang += angdif;
                        j = A_CheckHitSprite(vm.g_i,temphit);
                        vm.g_sp.ang -= angdif;

                        if (j > sclip)
                        {
                            if (temphit.$ >= 0 && sprite[temphit.$].picnum == vm.g_sp.picnum)
                            {
                                VM_CONDITIONAL(0);
                                continue;
                            }

                            vm.g_sp.ang -= angdif;
                            j = A_CheckHitSprite(vm.g_i,temphit);
                            vm.g_sp.ang += angdif;

                            if (j > 768)
                            {
                                if (temphit.$ >= 0 && sprite[temphit.$].picnum == vm.g_sp.picnum)
                                {
                                    VM_CONDITIONAL(0);
                                    continue;
                                }

                                VM_CONDITIONAL(1);
                                continue;
                            }
                        }
                    }
                }
            }
            VM_CONDITIONAL(1);
        }
        continue;

        case CON_IFCANSEETARGET:
        {
            var ps = g_player[vm.g_p].ps;
            var/*int32_t */j = cansee(vm.g_sp.x, vm.g_sp.y, vm.g_sp.z-((krand()&41)<<8),
                               vm.g_sp.sectnum, ps.pos.x, ps.pos.y,
                               ps.pos.z/*-((krand()&41)<<8)*/, sprite[ps.i].sectnum);
            VM_CONDITIONAL(j);
            if (j) actor[vm.g_i].timetosleep = SLEEPTIME;
        }
        continue;

        case CON_IFACTORNOTSTAYPUT:
            VM_CONDITIONAL(actor[vm.g_i].actorstayput == -1);
            continue;

        case CON_IFCANSEE:
        {
            var ps = g_player[vm.g_p].ps;
            var s = sprite[ps.i];
            var/*int32_t */j:number;

            // select sprite for monster to target
            // if holoduke is on, let them target holoduke first.
            //
            if (ps.holoduke_on >= 0)
            {
                s = sprite[ps.holoduke_on];
                j = cansee(vm.g_sp.x,vm.g_sp.y,vm.g_sp.z-(krand()&((32<<8)-1)),vm.g_sp.sectnum,
                           s.x,s.y,s.z,s.sectnum);

                if (j == 0)
                {
                    // they can't see player's holoduke
                    // check for player...
                    s = sprite[ps.i];
                }
            }

            // can they see player, (or player's holoduke)
            j = cansee(vm.g_sp.x,vm.g_sp.y,vm.g_sp.z-(krand()&((47<<8))),vm.g_sp.sectnum,
                       s.x,s.y,s.z-(24<<8),s.sectnum);

            if (j == 0)
            {
                // search around for target player

                // also modifies 'target' x&y if found..

                j = 1;
                var $lastvx = new R(actor[vm.g_i].lastvx);
                var $lastvy = new R(actor[vm.g_i].lastvy);
                var result = A_FurthestVisiblePoint(vm.g_i,s,$lastvx,$lastvy) == -1;
                actor[vm.g_i].lastvx = $lastvx.$;
                actor[vm.g_i].lastvy = $lastvy.$;
                if (result)
                    j = 0;
            }
            else
            {
                // else, they did see it.
                // save where we were looking...
                actor[vm.g_i].lastvx = s.x;
                actor[vm.g_i].lastvy = s.y;
            }

            if (j && (vm.g_sp.statnum == STAT_ACTOR || vm.g_sp.statnum == STAT_STANDABLE))
                actor[vm.g_i].timetosleep = SLEEPTIME;

            VM_CONDITIONAL(j);
            continue;
        }

        case CON_IFHITWEAPON:
            VM_CONDITIONAL(A_IncurDamage(vm.g_i) >= 0);
            continue;

        case CON_IFSQUISHED:
            VM_CONDITIONAL(VM_CheckSquished());
            continue;

        case CON_IFDEAD:
            //        j = vm.g_sp.extra;
            //        if (vm.g_sp.picnum == APLAYER)
            //            j--;
            VM_CONDITIONAL(vm.g_sp.extra <= 0);
            continue;

        case CON_AI:
            insptr++;
            //Following changed to use pointersizes
            vm.g_t[5] = script[insptr++];// AC_AI_ID(vm.g_t) = script[insptr++]; // Ai

            vm.g_t[4] = script[AC_AI_ID(vm.g_t)];//AC_ACTION_ID(vm.g_t) = *(script + AC_AI_ID(vm.g_t));  // Action
            
            // NOTE: "if" check added in r1155. It used to be a pointer though.
            if (AC_AI_ID(vm.g_t))
                vm.g_t[1] = script[AC_AI_ID(vm.g_t) + 1];//AC_MOVE_ID(vm.g_t) = *(script + AC_AI_ID(vm.g_t) + 1);  // move

            vm.g_sp.hitag = script[AC_AI_ID(vm.g_t) + 2];//*(script + AC_AI_ID(vm.g_t) + 2);  // move flags

            vm.g_t[0]/*AC_COUNT(vm.g_t)*/ = vm.g_t[2]/*AC_ACTION_COUNT(vm.g_t)*/= vm.g_t[3]/*AC_CURFRAME(vm.g_t)*/ = 0;

            if (!A_CheckEnemySprite(vm.g_sp) || vm.g_sp.extra > 0) // hack
                if (vm.g_sp.hitag&random_angle)
                    vm.g_sp.ang = krand()&2047;
            continue;

        case CON_ACTION:
            insptr++;
            vm.g_t[2] /*AC_ACTION_COUNT(vm.g_t) */= vm.g_t[3] /*AC_CURFRAME(vm.g_t)*/ = 0;
            vm.g_t[4]/*AC_ACTION_ID(vm.g_t)*/ = script[insptr++];
            continue;

        case CON_IFPLAYERSL:
            VM_CONDITIONAL(numplayers < script[++insptr] /* *(++insptr)*/ );
            continue;

        case CON_IFPDISTL:
            VM_CONDITIONAL(vm.g_x < script[++insptr] /* *(++insptr)*/ );
            if (vm.g_x > MAXSLEEPDIST && actor[vm.g_i].timetosleep == 0)
                actor[vm.g_i].timetosleep = SLEEPTIME;
            continue;

        case CON_IFPDISTG:
            VM_CONDITIONAL(vm.g_x > script[++insptr] /* *(++insptr)*/ );
            if (vm.g_x > MAXSLEEPDIST && actor[vm.g_i].timetosleep == 0)
                actor[vm.g_i].timetosleep = SLEEPTIME;
            continue;

        case CON_ELSE:
            insptr = script[insptr+1];//(intptr_t *) script[insptr+1];
            continue;

        case CON_ADDSTRENGTH:
            insptr++;
            vm.g_sp.extra += script[insptr++];
            continue;

        case CON_STRENGTH:
            insptr++;
            vm.g_sp.extra = script[insptr++];
            continue;

        case CON_IFGOTWEAPONCE:
            insptr++;

            if ((GametypeFlags[ud.coop]&GAMETYPE_WEAPSTAY) && (g_netServer || ud.multimode > 1))
            {
                var ps = g_player[vm.g_p].ps;

                if (script[insptr] == 0)
                {
                    var/*int32_t */j = 0;
                    for (; j < ps.weapreccnt; j++)
                        if (ps.weaprecs[j] == vm.g_sp.picnum)
                            break;

                    VM_CONDITIONAL(j < ps.weapreccnt && vm.g_sp.owner == vm.g_i);
                    continue;
                }
                else if (ps.weapreccnt < MAX_WEAPONS)
                {
                    ps.weaprecs[ps.weapreccnt++] = vm.g_sp.picnum;
                    VM_CONDITIONAL(vm.g_sp.owner == vm.g_i);
                    continue;
                }
            }
            VM_CONDITIONAL(0);
            continue;

        case CON_GETLASTPAL:
            insptr++;
            if (vm.g_sp.picnum == APLAYER)
                vm.g_sp.pal = g_player[vm.g_sp.yvel].ps.palookup;
            else
            {
                if (vm.g_sp.pal == 1 && vm.g_sp.extra == 0) // hack for frozen
                    vm.g_sp.extra++;
                vm.g_sp.pal = actor[vm.g_i].tempang;
            }
            actor[vm.g_i].tempang = 0;
            continue;

        case CON_TOSSWEAPON:
            insptr++;
            P_DropWeapon(g_player[vm.g_sp.yvel].ps);
            continue;

        case CON_NULLOP:
            insptr++;
            continue;

        case CON_MIKESND:
            insptr++;
            if ((unsigned(vm.g_sp.yvel) >= MAXSOUNDS))
            {
                CON_ERRPRINTF("Invalid sound %d\n", TrackerCast(vm.g_sp.yvel));
                insptr++;
                continue;
            }
            if (!S_CheckSoundPlaying(vm.g_i,vm.g_sp.yvel))
                A_PlaySound(vm.g_sp.yvel,vm.g_i);
            continue;

        case CON_PKICK:
            insptr++;

            if ((g_netServer || ud.multimode > 1) && vm.g_sp.picnum == APLAYER)
            {
                if (g_player[otherp].ps.quick_kick == 0)
                    g_player[otherp].ps.quick_kick = 14;
            }
            else if (vm.g_sp.picnum != APLAYER && g_player[vm.g_p].ps.quick_kick == 0)
                g_player[vm.g_p].ps.quick_kick = 14;
            continue;

        case CON_SIZETO:
            insptr++;

            {
                var/*int32_t */j = (script[insptr++] - vm.g_sp.xrepeat)<<1;
                vm.g_sp.xrepeat += ksgn(j);

                if ((vm.g_sp.picnum == APLAYER && vm.g_sp.yrepeat < 36) || script[insptr] < vm.g_sp.yrepeat ||
                        ((vm.g_sp.yrepeat*(tilesizy[vm.g_sp.picnum]+8))<<2) < (actor[vm.g_i].floorz - actor[vm.g_i].ceilingz))
                {
                    j = ((script[insptr])-vm.g_sp.yrepeat)<<1;
                    if (klabs(j)) vm.g_sp.yrepeat += ksgn(j);
                }
            }
            insptr++;

            continue;

        case CON_SIZEAT:
            insptr++;
            vm.g_sp.xrepeat = uint8(script[insptr++]);
            vm.g_sp.yrepeat = uint8(script[insptr++]);
            continue;

        case CON_SHOOT:
            insptr++;
            A_Shoot(vm.g_i,script[insptr++]);
            continue;

        case CON_SOUNDONCE:
            if ((unsigned(script[++insptr]) /* *(++insptr)*/  >= MAXSOUNDS))
            {
                CON_ERRPRINTF("Invalid sound %d\n", /*(int32_t)*/script[insptr++]);
                continue;
            }
            if (!S_CheckSoundPlaying(vm.g_i,script[insptr++]))
                A_PlaySound(script[insptr-1],vm.g_i);
            continue;

        case CON_IFACTORSOUND:
            insptr++;
            {
                var/*int32_t */i = Gv_GetVarX(script[insptr++]), j = Gv_GetVarX(script[insptr++]);

                if ((unsigned(j) >= MAXSOUNDS))
                {
                    CON_ERRPRINTF("Invalid sound %d\n", j);
                    insptr++;
                    continue;
                }
                insptr--;
                VM_CONDITIONAL(A_CheckSoundPlaying(i,j));
            }
            continue;

        case CON_IFSOUND:
            if ((unsigned(script[++insptr]) /* *(++insptr)*/  >= MAXSOUNDS))
            {
                CON_ERRPRINTF("Invalid sound %d\n", /*(int32_t)*/script[insptr]);
                insptr++;
                continue;
            }
            VM_CONDITIONAL(S_CheckSoundPlaying(vm.g_i,script[insptr]));
            //    VM_DoConditional(SoundOwner[script[insptr]][0].ow == vm.g_i);
            continue;

        case CON_STOPSOUND:
            if ((unsigned(script[++insptr]) /* *(++insptr)*/  >= MAXSOUNDS))
            {
                CON_ERRPRINTF("Invalid sound %d\n", /*(int32_t)*/script[insptr]);
                insptr++;
                continue;
            }
            if (S_CheckSoundPlaying(vm.g_i,script[insptr]))
                S_StopSound(int16(script[insptr]));
            insptr++;
            continue;

        case CON_STOPACTORSOUND:
            insptr++;
            {
                var/*int32_t */i = Gv_GetVarX(script[insptr++]), j = Gv_GetVarX(script[insptr++]);

                if ((j<0 || j>=MAXSOUNDS))
                {
                    CON_ERRPRINTF("Invalid sound %d\n", j);
                    continue;
                }

                if (A_CheckSoundPlaying(i,j))
                    S_StopEnvSound(j,i);

                continue;
            }

        case CON_SETACTORSOUNDPITCH:
            insptr++;
            {
                var/*int32_t */i = Gv_GetVarX(script[insptr++]), j = Gv_GetVarX(script[insptr++]), pitchoffset = Gv_GetVarX(script[insptr++]);

                if ((j<0 || j>=MAXSOUNDS))
                {
                    CON_ERRPRINTF("Invalid sound %d\n", j);
                    continue;
                }

                S_ChangeSoundPitch(j,i,pitchoffset);

                continue;
            }

        case CON_GLOBALSOUND:
            if ((unsigned(script[++insptr]) /* *(++insptr)*/  >= MAXSOUNDS))
            {
                CON_ERRPRINTF("Invalid sound %d\n", /*(int32_t)*/script[insptr]);
                insptr++;
                continue;
            }
            if (vm.g_p == screenpeek || (GametypeFlags[ud.coop]&GAMETYPE_COOPSOUND)
                || (g_fakeMultiMode==2)
                )
                A_PlaySound(script[insptr],g_player[screenpeek].ps.i);
            insptr++;
            continue;

        case CON_SOUND:
            if (unsigned(script[++insptr]) /* *(++insptr)*/  >= MAXSOUNDS)
            {
                CON_ERRPRINTF("Invalid sound %d\n", /*(int32_t)*/script[insptr]);
                insptr++;
                continue;
            }
            A_PlaySound(script[insptr++],vm.g_i);
            continue;

        case CON_TIP:
            insptr++;
            g_player[vm.g_p].ps.tipincs = GAMETICSPERSEC;
            continue;

        case CON_FALL:
            insptr++;
            VM_Fall(vm.g_i, vm.g_sp);
            continue;

        case CON_RETURN:
            vm.g_flags |= VM_RETURN;
        case CON_ENDA:
        case CON_BREAK:
        case CON_ENDS:
            return;
        case CON_RIGHTBRACE:
            insptr++;
            return;

        case CON_ADDAMMO:
            insptr++;
            {
                var/*int32_t */weap=script[insptr++], amount=script[insptr++];
                var ps = g_player[vm.g_p].ps;

                if (unsigned(weap) >= MAX_WEAPONS)
                {
                    CON_ERRPRINTF("Invalid weapon ID %d\n", weap);
                    break;
                }

                if (ps.ammo_amount[weap] >= ps.max_ammo_amount[weap])
                {
                    vm.g_flags |= VM_NOEXECUTE;
                    break;
                }

                P_AddWeaponAmmoCommon(ps, weap, amount);

                continue;
            }

        case CON_MONEY:
            insptr++;
            A_SpawnMultiple(vm.g_i, MONEY, script[insptr++]);
            continue;

        case CON_MAIL:
            insptr++;
            A_SpawnMultiple(vm.g_i, MAIL, script[insptr++]);
            continue;

        case CON_SLEEPTIME:
            insptr++;
            actor[vm.g_i].timetosleep = int16(script[insptr++]);
            continue;

        case CON_PAPER:
            insptr++;
            A_SpawnMultiple(vm.g_i, PAPER, script[insptr++]);
            continue;

        case CON_ADDKILLS:
            insptr++;
            g_player[vm.g_p].ps.actors_killed += script[insptr++];
            actor[vm.g_i].actorstayput = -1;
            continue;

        case CON_LOTSOFGLASS:
            insptr++;
            A_SpawnGlass(vm.g_i,script[insptr++]);
            continue;

        case CON_KILLIT:
            insptr++;
            vm.g_flags |= VM_KILL;
            continue;

        case CON_ADDWEAPON:
            insptr++;
            {
                var/*int32_t */weap=script[insptr++], amount=script[insptr++];
                VM_AddWeapon(weap, amount, g_player[vm.g_p].ps);

                continue;
            }

        case CON_DEBUG:
            insptr++;
            initprintf("%"+ PRIdPTR + "\n",script[insptr++]);
            continue;

        case CON_ENDOFGAME:
        case CON_ENDOFLEVEL:
            insptr++;
            g_player[vm.g_p].ps.timebeforeexit = script[insptr++];
            g_player[vm.g_p].ps.customexitsound = -1;
            ud.eog = 1;
            continue;

        case CON_ADDPHEALTH:
            insptr++;

            {
                var/*int32_t */j:number;
                var ps = g_player[vm.g_p].ps;

                if (ps.newowner >= 0)
                    G_ClearCameraView(ps);

                j = sprite[ps.i].extra;

                if (vm.g_sp.picnum != ATOMICHEALTH)
                {
                    if (j > ps.max_player_health && script[insptr] > 0)
                    {
                        insptr++;
                        continue;
                    }
                    else
                    {
                        if (j > 0)
                            j += script[insptr];
                        if (j > ps.max_player_health && script[insptr] > 0)
                            j = ps.max_player_health;
                    }
                }
                else
                {
                    if (j > 0)
                        j += script[insptr];
                    if (j > (ps.max_player_health<<1))
                        j = (ps.max_player_health<<1);
                }

                if (j < 0) j = 0;

                if (ud.god == 0)
                {
                    if (script[insptr] > 0)
                    {
                        if ((j - script[insptr]) < (ps.max_player_health>>2) &&
                                j >= (ps.max_player_health>>2))
                            A_PlaySound(DUKE_GOTHEALTHATLOW,ps.i);

                        ps.last_extra = j;
                    }

                    sprite[ps.i].extra = j;
                }
            }

            insptr++;
            continue;

        case CON_STATE:
        {
            var /*intptr_t **/tempscrptr=insptr+2;

            insptr = script[insptr+1];
			dlog(DEBUG_VM_EXECUTE, "CON_STATE insptr: %i\n", insptr);
            VM_Execute(1);
            insptr = tempscrptr;
        }
        continue;

        case CON_LEFTBRACE:
            insptr++;
            VM_Execute(1);
            continue;

        case CON_MOVE:
            insptr++;
            vm.g_t[0] = 0;//AC_COUNT(vm.g_t) = 0;
            vm.g_t[1] = script[insptr++];// AC_MOVE_ID(vm.g_t) = script[insptr++];
            vm.g_sp.hitag = script[insptr++];
            if (A_CheckEnemySprite(vm.g_sp) && vm.g_sp.extra <= 0) // hack
                continue;
            if (vm.g_sp.hitag&random_angle)
                vm.g_sp.ang = krand()&2047;
            continue;

        case CON_ADDWEAPONVAR:
            insptr++;
            {
                var/*int32_t */weap=Gv_GetVarX(script[insptr++]), amount=Gv_GetVarX(script[insptr++]);
                VM_AddWeapon(weap, amount, g_player[vm.g_p].ps);
                continue;
            }

        case CON_ACTIVATEBYSECTOR:
        case CON_OPERATESECTORS:
        case CON_OPERATEACTIVATORS:
        case CON_SETASPECT:
        case CON_SSP:
            insptr++;
            {
                var/*int32_t */var1 = Gv_GetVarX(script[insptr++]), var2:number;
                if (tw == CON_OPERATEACTIVATORS && script[insptr] == g_iThisActorID)
                {
                    var2 = vm.g_p;
                    insptr++;
                }
                else var2 = Gv_GetVarX(script[insptr++]);

                switch (tw)
                {
                case CON_ACTIVATEBYSECTOR:
                    if (unsigned(var1) >= unsigned(numsectors)) {CON_ERRPRINTF("Invalid sector %d\n", var1); break;}
                    G_ActivateBySector(var1, var2);
                    break;
                case CON_OPERATESECTORS:
                    if (unsigned(var1) >= unsigned(numsectors)) {CON_ERRPRINTF("Invalid sector %d\n", var1); break;}
                    G_OperateSectors(var1, var2);
                    break;
                case CON_OPERATEACTIVATORS:
                    if (unsigned(var2)>=unsigned(playerswhenstarted)) {CON_ERRPRINTF("Invalid player %d\n", var2); break;}
                    G_OperateActivators(var1, var2);
                    break;
                case CON_SETASPECT:
                    setaspect(var1, var2);
                    break;
                case CON_SSP:
                    if (unsigned(var1) >= MAXSPRITES) { CON_ERRPRINTF("Invalid sprite %d\n", var1); break;}
                    A_SetSprite(var1, var2);
                    break;
                }
                continue;
            }

        case CON_CANSEESPR:
            insptr++;
            {
                var/*int32_t */lVar1 = Gv_GetVarX(script[insptr++]), lVar2 = Gv_GetVarX(script[insptr++]), res:number;

                if (unsigned(lVar1) >= MAXSPRITES || unsigned(lVar2) >= MAXSPRITES)
                {
                    CON_ERRPRINTF("Invalid sprite %d\n", unsigned(lVar1) >= MAXSPRITES ? lVar1 : lVar2);
                    res=0;
                }
                else res=cansee(sprite[lVar1].x,sprite[lVar1].y,sprite[lVar1].z,sprite[lVar1].sectnum,
                                    sprite[lVar2].x,sprite[lVar2].y,sprite[lVar2].z,sprite[lVar2].sectnum);

                Gv_SetVarX(script[insptr++], res);
                continue;
            }

        case CON_OPERATERESPAWNS:
            insptr++;
            G_OperateRespawns(Gv_GetVarX(script[insptr++]));
            continue;

        case CON_OPERATEMASTERSWITCHES:
            insptr++;
            G_OperateMasterSwitches(Gv_GetVarX(script[insptr++]));
            continue;

        case CON_CHECKACTIVATORMOTION:
            insptr++;
            aGameVars[g_iReturnVarID].val.lValue = G_CheckActivatorMotion(Gv_GetVarX(script[insptr++]));
            continue;

        case CON_INSERTSPRITEQ:
            insptr++;
            A_AddToDeleteQueue(vm.g_i);
            continue;

        case CON_QSTRLEN:
            insptr++;
            {
                var/*int32_t */i=script[insptr++];
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                if ((ScriptQuotes[j] == NULL))
                {
                    CON_ERRPRINTF("null quote %d\n", j);
                    Gv_SetVarX(i,-1);
                    continue;
                }
                Gv_SetVarX(i,Bstrlen(ScriptQuotes[j]));
                continue;
            }

//        case CON_QSTRDIM:
//            insptr++;
//            {
//                vec2_t dim = { 0, 0, };

//                int32_t w=script[insptr++];
//                int32_t h=script[insptr++];

//                int32_t tilenum = Gv_GetVarX(script[insptr++]);
//                int32_t x=Gv_GetVarX(script[insptr++]), y=Gv_GetVarX(script[insptr++]), z = Gv_GetVarX(script[insptr++]);
//                int32_t blockangle=Gv_GetVarX(script[insptr++]);
//                int32_t q=Gv_GetVarX(script[insptr++]);
//                int32_t orientation=Gv_GetVarX(script[insptr++]);
//                int32_t xspace=Gv_GetVarX(script[insptr++]), yline=Gv_GetVarX(script[insptr++]);
//                int32_t xbetween=Gv_GetVarX(script[insptr++]), ybetween=Gv_GetVarX(script[insptr++]);
//                int32_t f=Gv_GetVarX(script[insptr++]);
//                int32_t x1=Gv_GetVarX(script[insptr++]), y1=Gv_GetVarX(script[insptr++]);
//                int32_t x2=Gv_GetVarX(script[insptr++]), y2=Gv_GetVarX(script[insptr++]);

//                orientation &= (ROTATESPRITE_MAX-1);

//                if (tilenum < 0 || tilenum+255 >= MAXTILES)
//                    CON_ERRPRINTF("invalid base tilenum %d\n", tilenum);
//                else if (unsigned(q) >= MAXQUOTES)
//                    CON_ERRPRINTF("invalid quote ID %d\n", q);
//                else if ((ScriptQuotes[q] == NULL))
//                    CON_ERRPRINTF("null quote %d\n", q);
//                else
//                    dim = G_ScreenTextSize(tilenum,x,y,z,blockangle,ScriptQuotes[q],2|orientation,xspace,yline,xbetween,ybetween,f,x1,y1,x2,y2);

//                Gv_SetVarX(w,dim.x);
//                Gv_SetVarX(h,dim.y);
//                continue;
//            }

        case CON_HEADSPRITESTAT:
            insptr++;
            {
                var/*int32_t */i=script[insptr++];
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                if (unsigned(j) > MAXSTATUS)
                {
                    CON_ERRPRINTF("invalid status list %d\n", j);
                    continue;
                }
                Gv_SetVarX(i,headspritestat[j]);
                continue;
            }

        case CON_PREVSPRITESTAT:
            insptr++;
            {
                var/*int32_t */i=script[insptr++];
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                if (unsigned(j) >= MAXSPRITES)
                {
                    CON_ERRPRINTF("invalid sprite ID %d\n", j);
                    continue;
                }
                Gv_SetVarX(i,prevspritestat[j]);
                continue;
            }

        case CON_NEXTSPRITESTAT:
            insptr++;
            {
                var/*int32_t */i=script[insptr++];
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                if (unsigned(j) >= MAXSPRITES)
                {
                    CON_ERRPRINTF("invalid sprite ID %d\n", j);
                    continue;
                }
                Gv_SetVarX(i,nextspritestat[j]);
                continue;
            }

        case CON_HEADSPRITESECT:
            insptr++;
            {
                var/*int32_t */i=script[insptr++];
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                if (unsigned(j) >= unsigned(numsectors))
                {
                    CON_ERRPRINTF("invalid sector %d\n", j);
                    continue;
                }
                Gv_SetVarX(i,headspritesect[j]);
                continue;
            }

        case CON_PREVSPRITESECT:
            insptr++;
            {
                var/*int32_t */i=script[insptr++];
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                if (unsigned(j) >= MAXSPRITES)
                {
                    CON_ERRPRINTF("invalid sprite ID %d\n", j);
                    continue;
                }
                Gv_SetVarX(i,prevspritesect[j]);
                continue;
            }

        case CON_NEXTSPRITESECT:
            insptr++;
            {
                var/*int32_t */i=script[insptr++];
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                if (unsigned(j) >= MAXSPRITES)
                {
                    CON_ERRPRINTF("invalid sprite ID %d\n", j);
                    continue;
                }
                Gv_SetVarX(i,nextspritesect[j]);
                continue;
            }

        case CON_GETKEYNAME:
            insptr++;
            {
                var/*int32_t */i = Gv_GetVarX(script[insptr++]),
                        f = Gv_GetVarX(script[insptr++]);
                var/*int32_t */j = Gv_GetVarX(script[insptr++]);

                if (unsigned(i) >= MAXQUOTES)
                {
                    CON_ERRPRINTF("invalid quote ID %d\n", i);
                    continue;
                }
                else if ((ScriptQuotes[i] == NULL))
                {
                    CON_ERRPRINTF("null quote %d\n", i);
                    continue;
                }
                else if (unsigned(f) >= NUMGAMEFUNCTIONS)
                {
                    CON_ERRPRINTF("invalid function %d\n", f);
                    continue;
                }
                else
                {
                    if (j < 2)
                        Bstrcpy(tempbuf,KB_ScanCodeToString(ud.config.KeyboardKeys[f][j]));
                    else
                    {
                        Bstrcpy(tempbuf,KB_ScanCodeToString(ud.config.KeyboardKeys[f][0]));

                        if (!tempbuf[0])
                            Bstrcpy(tempbuf,KB_ScanCodeToString(ud.config.KeyboardKeys[f][1]));
                    }
                }

                if (tempbuf[0])
                    Bstrcpy(ScriptQuotes[i],tempbuf.toString());

                continue;
            }

//        case CON_QSUBSTR:
//            insptr++;
//            {
//                int32_t q1 = Gv_GetVarX(script[insptr++]);
//                int32_t q2 = Gv_GetVarX(script[insptr++]);
//                int32_t st = Gv_GetVarX(script[insptr++]);
//                int32_t ln = Gv_GetVarX(script[insptr++]);

//                if (unsigned(q1)>=MAXQUOTES)
//                {
//                    CON_ERRPRINTF("invalid quote ID %d\n", q1);
//                    continue;
//                }
//                if ((ScriptQuotes[q1] == NULL))
//                {
//                    CON_ERRPRINTF("null quote %d\n", q1);
//                    continue;
//                }
//                if (unsigned(q2)>=MAXQUOTES)
//                {
//                    CON_ERRPRINTF("invalid quote ID %d\n", q2);
//                    continue;
//                }
//                if ((ScriptQuotes[q2] == NULL))
//                {
//                    CON_ERRPRINTF("null quote %d\n", q2);
//                    continue;
//                }

//                {
//                    char *s1 = ScriptQuotes[q1];
//                    char *s2 = ScriptQuotes[q2];

//                    while (*s2 && st--) s2++;
//                    while ((*s1 = *s2) && ln--)
//                    {
//                        s1++;
//                        s2++;
//                    }
//                    *s1=0;
//                }
//                continue;
//            }

//        case CON_GETPNAME:
//        case CON_QSTRNCAT:
//        case CON_QSTRCAT:
//        case CON_QSTRCPY:
//        case CON_QGETSYSSTR:
//        case CON_CHANGESPRITESECT:
//            insptr++;
//            {
//                var/*int32_t */i = Gv_GetVarX(script[insptr++]), j;
//                if (tw == CON_GETPNAME && script[insptr] == g_iThisActorID)
//                {
//                    j = vm.g_p;
//                    insptr++;
//                }
//                else j = Gv_GetVarX(script[insptr++]);

//                switch (tw)
//                {
//                case CON_GETPNAME:
//                    if ((ScriptQuotes[i] == NULL))
//                    {
//                        CON_ERRPRINTF("null quote %d\n", i);
//                        break;
//                    }
//                    if (g_player[j].user_name[0])
//                        Bstrcpy(ScriptQuotes[i],g_player[j].user_name);
//                    else Bsprintf(ScriptQuotes[i],"%d",j);
//                    break;
//                case CON_QGETSYSSTR:
//                    if ((ScriptQuotes[i] == NULL))
//                    {
//                        CON_ERRPRINTF("null quote %d %d\n", i,j);
//                        break;
//                    }
//                    switch (j)
//                    {
//                    case STR_MAPNAME:
//                        Bstrcpy(ScriptQuotes[i],MapInfo[ud.volume_number*MAXLEVELS + ud.level_number].name);
//                        break;
//                    case STR_MAPFILENAME:
//                        Bstrcpy(ScriptQuotes[i],MapInfo[ud.volume_number*MAXLEVELS + ud.level_number].filename);
//                        break;
//                    case STR_PLAYERNAME:
//                        Bstrcpy(ScriptQuotes[i],g_player[vm.g_p].user_name);
//                        break;
//                    case STR_VERSION:
//                        Bsprintf(tempbuf,HEAD2 " %s",s_buildRev);
//                        Bstrcpy(ScriptQuotes[i],tempbuf);
//                        break;
//                    case STR_GAMETYPE:
//                        Bstrcpy(ScriptQuotes[i],GametypeNames[ud.coop]);
//                        break;
//                    case STR_VOLUMENAME:
//                        Bstrcpy(ScriptQuotes[i],EpisodeNames[ud.volume_number]);
//                        break;
//                    default:
//                        CON_ERRPRINTF("unknown str ID %d %d\n", i,j);
//                    }
//                    break;
//                case CON_QSTRCAT:
//                    if ((ScriptQuotes[i] == NULL || ScriptQuotes[j] == NULL)) goto nullquote;
//                    Bstrncat(ScriptQuotes[i],ScriptQuotes[j],(MAXQUOTELEN-1)-Bstrlen(ScriptQuotes[i]));
//                    break;
//                case CON_QSTRNCAT:
//                    if ((ScriptQuotes[i] == NULL || ScriptQuotes[j] == NULL)) goto nullquote;
//                    Bstrncat(ScriptQuotes[i],ScriptQuotes[j],Gv_GetVarX(script[insptr++]));
//                    break;
//                case CON_QSTRCPY:
//                    if ((ScriptQuotes[i] == NULL || ScriptQuotes[j] == NULL)) goto nullquote;
//                    if (i != j)
//                        Bstrcpy(ScriptQuotes[i],ScriptQuotes[j]);
//                    break;
//                case CON_CHANGESPRITESECT:
//                    if (unsigned(i) >= MAXSPRITES)
//                    {
//                        CON_ERRPRINTF("Invalid sprite %d\n", i);
//                        break;
//                    }
//                    if (unsigned(j) >= unsigned(numsectors))
//                    {
//                        CON_ERRPRINTF("Invalid sector %d\n", j);
//                        break;
//                    }
//                    changespritesect(i,j);
//                    break;
//                default:
//nullquote:
//                    CON_ERRPRINTF("null quote %d\n", ScriptQuotes[i] ? j : i);
//                    break;
//                }
//                continue;
//            }

//        case CON_CHANGESPRITESTAT:
//            insptr++;
//            {
//                var/*int32_t */i = Gv_GetVarX(script[insptr++]);
//                var/*int32_t */j = Gv_GetVarX(script[insptr++]);

//                if (unsigned(i) >= MAXSPRITES)
//                {
//                    CON_ERRPRINTF("Invalid sprite: %d\n", i);
//                    continue;
//                }
//                if (unsigned(j) >= MAXSTATUS)
//                {
//                    CON_ERRPRINTF("Invalid statnum: %d\n", j);
//                    continue;
//                }
//                if (sprite[i].statnum == j)
//                    continue;

//                /* initialize actor data when changing to an actor statnum because there's usually
//                garbage left over from being handled as a hard coded object */

//                if (sprite[i].statnum > STAT_ZOMBIEACTOR && (j == STAT_ACTOR || j == STAT_ZOMBIEACTOR))
//                {
//                    actor_t *a = &actor[i];

//                    a.lastvx = 0;
//                    a.lastvy = 0;
//                    a.timetosleep = 0;
//                    a.cgg = 0;
//                    a.movflag = 0;
//                    a.tempang = 0;
//                    a.dispicnum = 0;
//                    actor[i].t_data[0]=actor[i].t_data[1]=actor[i].t_data[2]=actor[i].t_data[3]=actor[i].t_data[4]=actor[i].t_data[5]= actor[i].t_data[6]=actor[i].t_data[7]=actor[i].t_data[8]=0;
//                    a.flags = 0;
//                    sprite[i].hitag = 0;

//                    if (G_HaveActor(sprite[i].picnum))
//                    {
//                        const intptr_t *actorptr = g_tile[sprite[i].picnum].execPtr;
//                        // offsets
//                        AC_ACTION_ID(a.t_data) = actorptr[1];
//                        AC_MOVE_ID(a.t_data) = actorptr[2];
//                        AC_MOVFLAGS(&sprite[i], &actor[i]) = actorptr[3];  // ai bits (movflags)
//                    }
//                }

//                changespritestat(i,j);
//                continue;
//            }

//        case CON_STARTLEVEL:
//            insptr++; // skip command
//            {
//                // from 'level' cheat in game.c (about line 6250)
//                int32_t volnume=Gv_GetVarX(script[insptr++]), levnume=Gv_GetVarX(script[insptr++]);

//                if ((volnume > MAXVOLUMES-1 || volnume < 0))
//                {
//                    CON_ERRPRINTF("invalid volume (%d)\n", volnume);
//                    continue;
//                }

//                if ((levnume > MAXLEVELS-1 || levnume < 0))
//                {
//                    CON_ERRPRINTF("invalid level (%d)\n", levnume);
//                    continue;
//                }

//                ud.m_volume_number = ud.volume_number = volnume;
//                ud.m_level_number = ud.level_number = levnume;
//                //if (numplayers > 1 && g_netServer)
//                //    Net_NewGame(volnume,levnume);
//                //else
//                {
//                    g_player[myconnectindex].ps.gm |= MODE_EOL;
//                    ud.display_bonus_screen = 0;
//                } // MODE_RESTART;

//                continue;
//            }

        case CON_MYOSX:
        case CON_MYOSPALX:
        case CON_MYOS:
        case CON_MYOSPAL:
            insptr++;
            {
                var /*int32_t*/ x=Gv_GetVarX(script[insptr++]), y=Gv_GetVarX(script[insptr++]), tilenum=Gv_GetVarX(script[insptr++]);
                var /*int32_t*/ shade=Gv_GetVarX(script[insptr++]), orientation=Gv_GetVarX(script[insptr++]);

                switch (tw)
                {
                case CON_MYOS:
                    G_DrawTile(x,y,tilenum,shade,orientation);
                    break;
                case CON_MYOSPAL:
                {
                    var /*int32_t */pal=Gv_GetVarX(script[insptr++]);
                    G_DrawTilePal(x,y,tilenum,shade,orientation,pal);
                    break;
                }
                case CON_MYOSX:
                    G_DrawTileSmall(x,y,tilenum,shade,orientation);
                    break;
                case CON_MYOSPALX:
                {
                    var/*int32_t */pal=Gv_GetVarX(script[insptr++]);
                    G_DrawTilePalSmall(x,y,tilenum,shade,orientation,pal);
                    break;
                }
                }
                continue;
            }

//        case CON_SWITCH:
//            insptr++; // p-code
//            {
//                // command format:
//                // variable ID to check
//                // script offset to 'end'
//                // count of case statements
//                // script offset to default case (null if none)
//                // For each case: value, ptr to code
//                //AddLog("Processing Switch...");
//                int32_t lValue=Gv_GetVarX(script[insptr++]), lEnd=script[insptr++], lCases=script[insptr++];
//                intptr_t *lpDefault=insptr++, *lpCases=insptr;
//                int32_t bMatched=0, lCheckCase;
//                int32_t left,right;
//                insptr += lCases*2;
//                //Bsprintf(g_szBuf,"lEnd= %d *lpDefault=%d",lEnd,*lpDefault);
//                //AddLog(g_szBuf);

//                //Bsprintf(g_szBuf,"Checking %d cases for %d",lCases, lValue);
//                //AddLog(g_szBuf);
//                left=0; right=lCases-1;
//                while (!bMatched)
//                {
//                    //Bsprintf(g_szBuf,"Checking #%d Value= %d",lCheckCase, lpCases[lCheckCase*2]);
//                    //AddLog(g_szBuf);
//                    lCheckCase=(left+right)/2;
//                    //                initprintf("(%2d..%2d..%2d) [%2d..%2d..%2d]==%2d\n",left,lCheckCase,right,lpCases[left*2],lpCases[lCheckCase*2],lpCases[right*2],lValue);
//                    if (lpCases[lCheckCase*2] > lValue)
//                        right=lCheckCase-1;
//                    else if (lpCases[lCheckCase*2] < lValue)
//                        left =lCheckCase+1;
//                    else if (lpCases[lCheckCase*2] == lValue)
//                    {
//                        //AddLog("Found Case Match");
//                        //Bsprintf(g_szBuf,"insptr=%d. lCheckCase=%d, offset=%d, &script[0]=%d",
//                        //            (int32_t)insptr,(int32_t)lCheckCase,lpCases[lCheckCase*2+1],(int32_t)&script[0]);
//                        //AddLog(g_szBuf);
//                        // fake a 2-d Array
//                        insptr=(intptr_t *)(lpCases[lCheckCase*2+1] + &script[0]);
//                        //Bsprintf(g_szBuf,"insptr=%d. ",     (int32_t)insptr);
//                        //AddLog(g_szBuf);
//                        VM_Execute(1);
//                        //AddLog("Done Executing Case");
//                        bMatched=1;
//                    }
//                    if (right-left < 0)
//                        break;
//                }
//                if (!bMatched)
//                {
//                    if (*lpDefault)
//                    {
//                        //AddLog("No Matching Case: Using Default");
//                        insptr=(intptr_t *)(*lpDefault + &script[0]);
//                        VM_Execute(1);
//                    }
//                    else
//                    {
//                        //AddLog("No Matching Case: No Default to use");
//                    }
//                }
//                insptr=(intptr_t *)(lEnd + (intptr_t)&script[0]);
//                //Bsprintf(g_szBuf,"insptr=%d. ",     (int32_t)insptr);
//                //AddLog(g_szBuf);
//                //AddLog("Done Processing Switch");

//                continue;
//            }

        case CON_ENDSWITCH:
        case CON_ENDEVENT:
            insptr++;
            return;

        case CON_DISPLAYRAND:
            insptr++;
            Gv_SetVarX(script[insptr++], system_15bit_rand());
            continue;

        case CON_DRAGPOINT:
            insptr++;
            {
                var/*int32_t */wallnum = Gv_GetVarX(script[insptr++]), newx = Gv_GetVarX(script[insptr++]), newy = Gv_GetVarX(script[insptr++]);

                if ((wallnum<0 || wallnum>=numwalls))
                {
                    CON_ERRPRINTF("Invalid wall %d\n", wallnum);
                    continue;
                }
                dragpoint(wallnum,newx,newy,0);
                continue;
            }

        case CON_LDIST:
            insptr++;
            {
                var /*int32_t */distvar = script[insptr++], xvar = Gv_GetVarX(script[insptr++]), yvar = Gv_GetVarX(script[insptr++]);

                if (unsigned(xvar) >= MAXSPRITES || unsigned(yvar) >= MAXSPRITES)
                {
                    CON_ERRPRINTF("invalid sprite\n");
                    continue;
                }

                Gv_SetVarX(distvar, ldist(sprite[xvar],sprite[yvar]));
                continue;
            }

        case CON_DIST:
            insptr++;
            {
                var/*int32_t */distvar = script[insptr++], xvar = Gv_GetVarX(script[insptr++]), yvar = Gv_GetVarX(script[insptr++]);

                if (unsigned(xvar) >= MAXSPRITES || unsigned(yvar) >= MAXSPRITES)
                {
                    CON_ERRPRINTF("invalid sprite\n");
                    continue;
                }

                Gv_SetVarX(distvar, dist(sprite[xvar],sprite[yvar]));
                continue;
            }

        case CON_GETANGLE:
            insptr++;
            {
                var /*int32_t*/ angvar = script[insptr++];
                var /*int32_t*/ xvar = Gv_GetVarX(script[insptr++]);
                var /*int32_t*/ yvar = Gv_GetVarX(script[insptr++]);

                Gv_SetVarX(angvar, getangle(xvar,yvar));
                continue;
            }

        case CON_GETINCANGLE:
            insptr++;
            {
                var /*int32_t*/ angvar = script[insptr++];
                var /*int32_t*/ xvar = Gv_GetVarX(script[insptr++]);
                var /*int32_t*/ yvar = Gv_GetVarX(script[insptr++]);

                Gv_SetVarX(angvar, G_GetAngleDelta(xvar,yvar));
                continue;
            }

        case CON_MULSCALE:
            insptr++;
            {
                var/*int32_t */var1 = script[insptr++], var2 = Gv_GetVarX(script[insptr++]);
                var/*int32_t */var3 = Gv_GetVarX(script[insptr++]), var4 = Gv_GetVarX(script[insptr++]);

                Gv_SetVarX(var1, mulscale(var2, var3, var4));
                continue;
            }

        case CON_INITTIMER:
            insptr++;
            G_InitTimer(Gv_GetVarX(script[insptr++]));
            continue;

        case CON_TIME:
            insptr += 2;
            continue;

        case CON_ESPAWNVAR:
        case CON_EQSPAWNVAR:
        case CON_QSPAWNVAR:
            insptr++;
            {
                var/*int32_t */lIn=Gv_GetVarX(script[insptr++]);
                var/*int32_t */j:number;
                if (unsigned(vm.g_sp.sectnum) >= unsigned(numsectors))
                {
                    CON_ERRPRINTF("Invalid sector %d\n", TrackerCast(vm.g_sp.sectnum));
                    continue;
                }
                j = A_Spawn(vm.g_i, lIn);
                switch (tw)
                {
                case CON_EQSPAWNVAR:
                    if (j != -1)
                        A_AddToDeleteQueue(j);
                case CON_ESPAWNVAR:
                    aGameVars[g_iReturnVarID].val.lValue = j;
                    break;
                case CON_QSPAWNVAR:
                    if (j != -1)
                        A_AddToDeleteQueue(j);
                    break;
                }
                continue;
            }

        case CON_ESPAWN:
        case CON_EQSPAWN:
        case CON_QSPAWN:
            insptr++;

            {
                var/*int32_t */j:number;

                if (unsigned(vm.g_sp.sectnum) >= unsigned(numsectors))
                {
                    CON_ERRPRINTF("Invalid sector %d\n", TrackerCast(vm.g_sp.sectnum));
                    insptr++;
                    continue;
                }

                j = A_Spawn(vm.g_i,script[insptr++]);

                switch (tw)
                {
                case CON_EQSPAWN:
                    if (j != -1)
                        A_AddToDeleteQueue(j);
                case CON_ESPAWN:
                    aGameVars[g_iReturnVarID].val.lValue = j;
                    break;
                case CON_QSPAWN:
                    if (j != -1)
                        A_AddToDeleteQueue(j);
                    break;
                }
            }
            continue;

        case CON_ESHOOT:
        case CON_EZSHOOT:
        case CON_ZSHOOT:
            insptr++;
            {
                var/*int32_t */j:number;
                // NOTE: (int16_t) cast because we want to exclude that
                // SHOOT_HARDCODED_ZVEL is passed.
                var/*const int32_t */zvel = (tw == CON_ESHOOT) ?
                    SHOOT_HARDCODED_ZVEL : int16(Gv_GetVarX(script[insptr++]));

                if (unsigned(vm.g_sp.sectnum) >= unsigned(numsectors))
                {
                    CON_ERRPRINTF("Invalid sector %d\n", TrackerCast(vm.g_sp.sectnum));
                    insptr++;
                    continue;
                }

                j = A_ShootWithZvel(vm.g_i,script[insptr++],zvel);

                if (tw != CON_ZSHOOT)
                    aGameVars[g_iReturnVarID].val.lValue = j;
            }
            continue;

        case CON_SHOOTVAR:
        case CON_ESHOOTVAR:
            insptr++;
            {
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);

                if (unsigned(vm.g_sp.sectnum) >= unsigned(numsectors))
                {
                    CON_ERRPRINTF("Invalid sector %d\n", TrackerCast(vm.g_sp.sectnum));
                    continue;
                }

                j = A_Shoot(vm.g_i, j);
                if (tw == CON_ESHOOTVAR)
                    aGameVars[g_iReturnVarID].val.lValue = j;
                continue;
            }

//        case CON_EZSHOOTVAR:
//        case CON_ZSHOOTVAR:
//            insptr++;
//            {
//                const int32_t zvel = (int16_t)Gv_GetVarX(script[insptr++]);
//                var/*int32_t */j=Gv_GetVarX(script[insptr++]);

//                if (unsigned(vm.g_sp.sectnum) >= unsigned(numsectors))
//                {
//                    CON_ERRPRINTF("Invalid sector %d\n", TrackerCast(vm.g_sp.sectnum));
//                    continue;
//                }

//                j = A_ShootWithZvel(vm.g_i, j, zvel);
//                if (tw == CON_EZSHOOTVAR)
//                    aGameVars[g_iReturnVarID].val.lValue = j;
//                continue;
//            }

//        case CON_CMENU:
//            insptr++;
//            M_ChangeMenu(Gv_GetVarX(script[insptr++]));
//            continue;

//        case CON_SOUNDVAR:
//        case CON_STOPSOUNDVAR:
//        case CON_SOUNDONCEVAR:
//        case CON_GLOBALSOUNDVAR:
//        case CON_SCREENSOUND:
//            insptr++;
//            {
//                var/*int32_t */j=Gv_GetVarX(script[insptr++]);

//                if (j<0 || j>=MAXSOUNDS)
//                {
//                    CON_ERRPRINTF("Invalid sound %d\n", j);
//                    continue;
//                }

//                switch (tw)
//                {
//                case CON_SOUNDONCEVAR:
//                    if (!S_CheckSoundPlaying(vm.g_i,j))
//                        A_PlaySound((int16_t)j,vm.g_i);
//                    continue;
//                case CON_GLOBALSOUNDVAR:
//                    A_PlaySound((int16_t)j,g_player[screenpeek].ps.i);
//                    continue;
//                case CON_STOPSOUNDVAR:
//                    if (S_CheckSoundPlaying(vm.g_i,j))
//                        S_StopSound((int16_t)j);
//                    continue;
//                case CON_SOUNDVAR:
//                    A_PlaySound((int16_t)j,vm.g_i);
//                    continue;
//                case CON_SCREENSOUND:
//                    A_PlaySound(j, -1);
//                    continue;
//                }
//            }
//            continue;

//        case CON_GUNIQHUDID:
//            insptr++;
//            {
//                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
//                if (j >= 0 && j < MAXUNIQHUDID-1)
//                    guniqhudid = j;
//                else
//                    CON_ERRPRINTF("Invalid ID %d\n", j);
//                continue;
//            }

//        case CON_SAVEGAMEVAR:
//        case CON_READGAMEVAR:
//        {
//            var/*int32_t */i=0;
//            insptr++;
//            if (ud.config.scripthandle < 0)
//            {
//                insptr++;
//                continue;
//            }
//            switch (tw)
//            {
//            case CON_SAVEGAMEVAR:
//                i=Gv_GetVarX(script[insptr]);
//                SCRIPT_PutNumber(ud.config.scripthandle, "Gamevars",aGameVars[script[insptr++]].szLabel,i,FALSE,FALSE);
//                break;
//            case CON_READGAMEVAR:
//                SCRIPT_GetNumber(ud.config.scripthandle, "Gamevars",aGameVars[script[insptr]].szLabel,&i);
//                Gv_SetVarX(script[insptr++], i);
//                break;
//            }
//            continue;
//        }

//        case CON_SHOWVIEW:
//        case CON_SHOWVIEWUNBIASED:
//            insptr++;
//            {
//                int32_t x=Gv_GetVarX(script[insptr++]);
//                int32_t y=Gv_GetVarX(script[insptr++]);
//                int32_t z=Gv_GetVarX(script[insptr++]);
//                int32_t a=Gv_GetVarX(script[insptr++]);
//                int32_t horiz=Gv_GetVarX(script[insptr++]);
//                int32_t sect=Gv_GetVarX(script[insptr++]);
//                int32_t x1=Gv_GetVarX(script[insptr++]);
//                int32_t y1=Gv_GetVarX(script[insptr++]);
//                int32_t x2=Gv_GetVarX(script[insptr++]);
//                int32_t y2=Gv_GetVarX(script[insptr++]);

//                if (x1 < 0 || y1 < 0 || x2 >= 320 || y2 >= 200)
//                {
//                    CON_ERRPRINTF("incorrect coordinates\n");
//                    continue;
//                }

//                if (unsigned(sect) >= unsigned(numsectors))
//                {
//                    CON_ERRPRINTF("Invalid sector %d\n", sect);
//                    continue;
//                }

//                G_ShowView(x, y, z, a, horiz, sect, x1, y1, x2, y2, (tw != CON_SHOWVIEW));

//                continue;
//            }

//        case CON_ROTATESPRITEA:
//        case CON_ROTATESPRITE16:
//        case CON_ROTATESPRITE:
//            insptr++;
//            {
//                int32_t x=Gv_GetVarX(script[insptr++]),   y=Gv_GetVarX(script[insptr++]),           z=Gv_GetVarX(script[insptr++]);
//                int32_t a=Gv_GetVarX(script[insptr++]),   tilenum=Gv_GetVarX(script[insptr++]),     shade=Gv_GetVarX(script[insptr++]);
//                int32_t pal=Gv_GetVarX(script[insptr++]), orientation=Gv_GetVarX(script[insptr++]);
//                int32_t alpha = (tw == CON_ROTATESPRITEA) ? Gv_GetVarX(script[insptr++]) : 0;
//                int32_t x1=Gv_GetVarX(script[insptr++]),  y1=Gv_GetVarX(script[insptr++]);
//                int32_t x2=Gv_GetVarX(script[insptr++]),  y2=Gv_GetVarX(script[insptr++]);

//                if (tw != CON_ROTATESPRITE16 && !(orientation&ROTATESPRITE_FULL16))
//                {
//                    x<<=16;
//                    y<<=16;
//                }

//                if (unsigned(tilenum) >= MAXTILES)
//                {
//                    CON_ERRPRINTF("invalid tilenum %d\n", tilenum);
//                    continue;
//                }

//                if (x < -(320<<16) || x >= (640<<16) || y < -(200<<16) || y >= (400<<16))
//                {
//                    CON_ERRPRINTF("invalid coordinates: %d, %d\n", x, y);
//                    continue;
//                }

//                orientation &= (ROTATESPRITE_MAX-1);

//                rotatesprite_(x,y,z,a,tilenum,shade,pal,2|orientation,alpha,x1,y1,x2,y2);
//                continue;
//            }

//        case CON_GAMETEXT:
//        case CON_GAMETEXTZ:
//            insptr++;
//            {
//                int32_t tilenum = Gv_GetVarX(script[insptr++]);
//                int32_t x=Gv_GetVarX(script[insptr++]), y=Gv_GetVarX(script[insptr++]), q=Gv_GetVarX(script[insptr++]);
//                int32_t shade=Gv_GetVarX(script[insptr++]), pal=Gv_GetVarX(script[insptr++]);
//                int32_t orientation=Gv_GetVarX(script[insptr++]);
//                int32_t x1=Gv_GetVarX(script[insptr++]), y1=Gv_GetVarX(script[insptr++]);
//                int32_t x2=Gv_GetVarX(script[insptr++]), y2=Gv_GetVarX(script[insptr++]);
//                int32_t z = (tw == CON_GAMETEXTZ) ? Gv_GetVarX(script[insptr++]) : 65536;

//                if (tilenum < 0 || tilenum+255 >= MAXTILES)
//                {
//                    CON_ERRPRINTF("invalid base tilenum %d\n", tilenum);
//                    continue;
//                }

//                if (unsigned(q) >= MAXQUOTES)
//                {
//                    CON_ERRPRINTF("invalid quote ID %d\n", q);
//                    continue;
//                }

//                if ((ScriptQuotes[q] == NULL))
//                {
//                    CON_ERRPRINTF("null quote %d\n", q);
//                    continue;
//                }

//                orientation &= (ROTATESPRITE_MAX-1);

//                G_PrintGameText(0,tilenum,x>>1,y,ScriptQuotes[q],shade,pal,orientation,x1,y1,x2,y2,z);
//                continue;
//            }

//        case CON_DIGITALNUMBER:
//        case CON_DIGITALNUMBERZ:
//            insptr++;
//            {
//                int32_t tilenum = Gv_GetVarX(script[insptr++]);
//                int32_t x=Gv_GetVarX(script[insptr++]), y=Gv_GetVarX(script[insptr++]), q=Gv_GetVarX(script[insptr++]);
//                int32_t shade=Gv_GetVarX(script[insptr++]), pal=Gv_GetVarX(script[insptr++]);
//                int32_t orientation=Gv_GetVarX(script[insptr++]);
//                int32_t x1=Gv_GetVarX(script[insptr++]), y1=Gv_GetVarX(script[insptr++]);
//                int32_t x2=Gv_GetVarX(script[insptr++]), y2=Gv_GetVarX(script[insptr++]);
//                int32_t z = (tw == CON_DIGITALNUMBERZ) ? Gv_GetVarX(script[insptr++]) : 65536;

//                // NOTE: '-' not taken into account, but we have rotatesprite() bound check now anyway
//                if (tilenum < 0 || tilenum+9 >= MAXTILES)
//                {
//                    CON_ERRPRINTF("invalid base tilenum %d\n", tilenum);
//                    continue;
//                }

//                G_DrawTXDigiNumZ(tilenum,x,y,q,shade,pal,orientation,x1,y1,x2,y2,z);
//                continue;
//            }

//        case CON_MINITEXT:
//            insptr++;
//            {
//                int32_t x=Gv_GetVarX(script[insptr++]), y=Gv_GetVarX(script[insptr++]), q=Gv_GetVarX(script[insptr++]);
//                int32_t shade=Gv_GetVarX(script[insptr++]), pal=Gv_GetVarX(script[insptr++]);

//                if (unsigned(q) >= MAXQUOTES)
//                {
//                    CON_ERRPRINTF("invalid quote ID %d\n", q);
//                    continue;
//                }

//                if ((ScriptQuotes[q] == NULL))
//                {
//                    CON_ERRPRINTF("null quote %d\n", q);
//                    continue;
//                }
//                minitextshade(x,y,ScriptQuotes[q],shade,pal, 2+8+16);
//                continue;
//            }

//        case CON_SCREENTEXT:
//            insptr++;
//            {
//                int32_t tilenum = Gv_GetVarX(script[insptr++]);
//                int32_t x=Gv_GetVarX(script[insptr++]), y=Gv_GetVarX(script[insptr++]), z = Gv_GetVarX(script[insptr++]);
//                int32_t blockangle=Gv_GetVarX(script[insptr++]), charangle=Gv_GetVarX(script[insptr++]);
//                int32_t q=Gv_GetVarX(script[insptr++]);
//                int32_t shade=Gv_GetVarX(script[insptr++]), pal=Gv_GetVarX(script[insptr++]);
//                int32_t orientation=Gv_GetVarX(script[insptr++]);
//                int32_t alpha=Gv_GetVarX(script[insptr++]);
//                int32_t xspace=Gv_GetVarX(script[insptr++]), yline=Gv_GetVarX(script[insptr++]);
//                int32_t xbetween=Gv_GetVarX(script[insptr++]), ybetween=Gv_GetVarX(script[insptr++]);
//                int32_t f=Gv_GetVarX(script[insptr++]);
//                int32_t x1=Gv_GetVarX(script[insptr++]), y1=Gv_GetVarX(script[insptr++]);
//                int32_t x2=Gv_GetVarX(script[insptr++]), y2=Gv_GetVarX(script[insptr++]);

//                if (tilenum < 0 || tilenum+255 >= MAXTILES)
//                {
//                    CON_ERRPRINTF("invalid base tilenum %d\n", tilenum);
//                    continue;
//                }

//                if (unsigned(q) >= MAXQUOTES)
//                {
//                    CON_ERRPRINTF("invalid quote ID %d\n", q);
//                    continue;
//                }

//                if ((ScriptQuotes[q] == NULL))
//                {
//                    CON_ERRPRINTF("null quote %d\n", q);
//                    continue;
//                }

//                orientation &= (ROTATESPRITE_MAX-1);

//                G_ScreenText(tilenum,x,y,z,blockangle,charangle,ScriptQuotes[q],shade,pal,orientation,alpha,xspace,yline,xbetween,ybetween,f,x1,y1,x2,y2);
//                continue;
//            }

//        case CON_ANGOFF:
//            insptr++;
//            spriteext[vm.g_i].angoff=script[insptr++];
//            continue;

//        case CON_GETZRANGE:
//            insptr++;
//            {
//                vec3_t vect;

//                vect.x = Gv_GetVarX(script[insptr++]);
//                vect.y = Gv_GetVarX(script[insptr++]);
//                vect.z = Gv_GetVarX(script[insptr++]);

//                {
//                    int32_t sectnum=Gv_GetVarX(script[insptr++]);
//                    int32_t ceilzvar=script[insptr++], ceilhitvar=script[insptr++], florzvar=script[insptr++], florhitvar=script[insptr++];
//                    int32_t walldist=Gv_GetVarX(script[insptr++]), clipmask=Gv_GetVarX(script[insptr++]);
//                    int32_t ceilz, ceilhit, florz, florhit;


//                    if (unsigned(sectnum) >= unsigned(numsectors))
//                    {
//                        CON_ERRPRINTF("Invalid sector %d\n", sectnum);
//                        continue;
//                    }
//                    getzrange(&vect, sectnum, &ceilz, &ceilhit, &florz, &florhit, walldist, clipmask);
//                    Gv_SetVarX(ceilzvar, ceilz);
//                    Gv_SetVarX(ceilhitvar, ceilhit);
//                    Gv_SetVarX(florzvar, florz);
//                    Gv_SetVarX(florhitvar, florhit);
//                }
//                continue;
//            }

//        case CON_SECTSETINTERPOLATION:
//        case CON_SECTCLEARINTERPOLATION:
//            insptr++;
//            {
//                int32_t sectnum = Gv_GetVarX(script[insptr++]);

//                if (unsigned(sectnum) >= unsigned(numsectors))
//                {
//                    CON_ERRPRINTF("Invalid sector %d\n", sectnum);
//                    continue;
//                }

//                if (tw==CON_SECTSETINTERPOLATION)
//                    Sect_SetInterpolation(sectnum);
//                else
//                    Sect_ClearInterpolation(sectnum);

//                continue;
//            }

//        case CON_CALCHYPOTENUSE:
//            insptr++;
//            {
//                int32_t retvar=script[insptr++];
//                int64_t dax=Gv_GetVarX(script[insptr++]), day=Gv_GetVarX(script[insptr++]);
//                int64_t hypsq = dax*dax + day*day;

//                if (hypsq > (int64_t)INT32_MAX)
//                    Gv_SetVarX(retvar, (int32_t)sqrt((double)hypsq));
//                else
//                    Gv_SetVarX(retvar, ksqrt((uint32_t)hypsq));

//                continue;
//            }

//        case CON_LINEINTERSECT:
//        case CON_RAYINTERSECT:
//            insptr++;
//            {
//                int32_t x1=Gv_GetVarX(script[insptr++]), y1=Gv_GetVarX(script[insptr++]), z1=Gv_GetVarX(script[insptr++]);
//                int32_t x2=Gv_GetVarX(script[insptr++]), y2=Gv_GetVarX(script[insptr++]), z2=Gv_GetVarX(script[insptr++]);
//                int32_t x3=Gv_GetVarX(script[insptr++]), y3=Gv_GetVarX(script[insptr++]), x4=Gv_GetVarX(script[insptr++]), y4=Gv_GetVarX(script[insptr++]);
//                int32_t intxvar=script[insptr++], intyvar=script[insptr++], intzvar=script[insptr++], retvar=script[insptr++];
//                int32_t intx, inty, intz, ret;

//                if (tw==CON_LINEINTERSECT)
//                    ret = lineintersect(x1, y1, z1, x2, y2, z2, x3, y3, x4, y4, &intx, &inty, &intz);
//                else
//                    ret = rayintersect(x1, y1, z1, x2, y2, z2, x3, y3, x4, y4, &intx, &inty, &intz);

//                Gv_SetVarX(retvar, ret);
//                if (ret)
//                {
//                    Gv_SetVarX(intxvar, intx);
//                    Gv_SetVarX(intyvar, inty);
//                    Gv_SetVarX(intzvar, intz);
//                }

//                continue;
//            }

        case CON_CLIPMOVE:
        case CON_CLIPMOVENOSLIDE:
            insptr++;
            {
                var vect = new vec3_t();
                var /*int32_t*/ retvar=script[insptr++], xvar=script[insptr++], yvar=script[insptr++], z=Gv_GetVarX(script[insptr++]), sectnumvar=script[insptr++];
                var /*int32_t*/ xvect=Gv_GetVarX(script[insptr++]), yvect=Gv_GetVarX(script[insptr++]);
                var /*int32_t*/ walldist=Gv_GetVarX(script[insptr++]), floordist=Gv_GetVarX(script[insptr++]), ceildist=Gv_GetVarX(script[insptr++]);
                var /*int32_t*/ clipmask=Gv_GetVarX(script[insptr++]);
                var /*int16_t*/ sectnum:number;

                vect.x = Gv_GetVarX(xvar);
                vect.y = Gv_GetVarX(yvar);
                vect.z = z;
                sectnum = Gv_GetVarX(sectnumvar);

                if (unsigned(sectnum) >= unsigned(numsectors))
                {
                    CON_ERRPRINTF("Invalid sector %d\n", sectnum);
                    Gv_SetVarX(retvar, 0);
                    continue;
                }

                var $sectnum = new R(sectnum);
                Gv_SetVarX(retvar, clipmovex(vect, $sectnum, xvect, yvect, walldist, floordist, ceildist,
                                             clipmask, (tw==CON_CLIPMOVENOSLIDE)?1:0));
                sectnum = $sectnum.$;
                Gv_SetVarX(sectnumvar, sectnum);
                Gv_SetVarX(xvar, vect.x);
                Gv_SetVarX(yvar, vect.y);

                continue;
            }

        case CON_HITSCAN:
            insptr++;
            {
                var vect = new vec3_t();
                var hit = new hitdata_t();

                vect.x = Gv_GetVarX(script[insptr++]);
                vect.y = Gv_GetVarX(script[insptr++]);
                vect.z = Gv_GetVarX(script[insptr++]);

                {
                    var /*int32_t*/ sectnum=Gv_GetVarX(script[insptr++]);
                    var /*int32_t*/ vx=Gv_GetVarX(script[insptr++]), vy=Gv_GetVarX(script[insptr++]), vz=Gv_GetVarX(script[insptr++]);
                    var /*int32_t*/ hitsectvar=script[insptr++], hitwallvar=script[insptr++], hitspritevar=script[insptr++];
                    var /*int32_t*/ hitxvar=script[insptr++], hityvar=script[insptr++], hitzvar=script[insptr++], cliptype=Gv_GetVarX(script[insptr++]);

                    if (unsigned(sectnum) >= unsigned(numsectors))
                    {
                        CON_ERRPRINTF("Invalid sector %d\n", sectnum);
                        continue;
                    }
                    hitscan(/*(const vec3_t *)&*/vect, sectnum, vx, vy, vz, hit, cliptype);
                    Gv_SetVarX(hitsectvar, hit.sect);
                    Gv_SetVarX(hitwallvar, hit.wall);
                    Gv_SetVarX(hitspritevar, hit.sprite);
                    Gv_SetVarX(hitxvar, hit.pos.x);
                    Gv_SetVarX(hityvar, hit.pos.y);
                    Gv_SetVarX(hitzvar, hit.pos.z);
                }
                continue;
            }

        case CON_CANSEE:
            insptr++;
            {
                var /*int32_t*/ x1=Gv_GetVarX(script[insptr++]), y1=Gv_GetVarX(script[insptr++]), z1=Gv_GetVarX(script[insptr++]);
                var /*int32_t*/ sect1=Gv_GetVarX(script[insptr++]);
                var /*int32_t*/ x2=Gv_GetVarX(script[insptr++]), y2=Gv_GetVarX(script[insptr++]), z2=Gv_GetVarX(script[insptr++]);
                var /*int32_t*/ sect2=Gv_GetVarX(script[insptr++]), rvar=script[insptr++];

                if (unsigned(sect1) >= unsigned(numsectors) || unsigned(sect2) >= unsigned(numsectors))
                {
                    CON_ERRPRINTF("Invalid sector\n");
                    Gv_SetVarX(rvar, 0);
                }

                Gv_SetVarX(rvar, cansee(x1,y1,z1,sect1,x2,y2,z2,sect2));
                continue;
            }

        case CON_ROTATEPOINT:
            insptr++;
            {
                var /*int32_t*/ xpivot=Gv_GetVarX(script[insptr++]), ypivot=Gv_GetVarX(script[insptr++]);
                var /*int32_t*/ x=Gv_GetVarX(script[insptr++]), y=Gv_GetVarX(script[insptr++]), daang=Gv_GetVarX(script[insptr++]);
                var /*int32_t*/ x2var=script[insptr++], y2var=script[insptr++];
                var /*int32_t*/ x2:number, y2:number;

                var $x2 = new R(x2);
                var $y2 = new R(y2);
                rotatepoint(xpivot,ypivot,x,y,daang,$x2,$y2);
                x2 = $x2.$;
                y2 = $y2.$;
                Gv_SetVarX(x2var, x2);
                Gv_SetVarX(y2var, y2);
                continue;
            }

//        case CON_NEARTAG:
//            insptr++;
//            {
//                //             neartag(int32_t x, int32_t y, int32_t z, short sectnum, short ang,  //Starting position & angle
//                //                     short *neartagsector,   //Returns near sector if sector[].tag != 0
//                //                     short *neartagwall,     //Returns near wall if wall[].tag != 0
//                //                     short *neartagsprite,   //Returns near sprite if sprite[].tag != 0
//                //                     int32_t *neartaghitdist,   //Returns actual distance to object (scale: 1024=largest grid size)
//                //                     int32_t neartagrange,      //Choose maximum distance to scan (scale: 1024=largest grid size)
//                //                     char tagsearch)         //1-lotag only, 2-hitag only, 3-lotag&hitag

//                int32_t x=Gv_GetVarX(script[insptr++]), y=Gv_GetVarX(script[insptr++]), z=Gv_GetVarX(script[insptr++]);
//                int32_t sectnum=Gv_GetVarX(script[insptr++]), ang=Gv_GetVarX(script[insptr++]);
//                int32_t neartagsectorvar=script[insptr++], neartagwallvar=script[insptr++], neartagspritevar=script[insptr++], neartaghitdistvar=script[insptr++];
//                int32_t neartagrange=Gv_GetVarX(script[insptr++]), tagsearch=Gv_GetVarX(script[insptr++]);

//                if (unsigned(sectnum) >= unsigned(numsectors))
//                {
//                    CON_ERRPRINTF("Invalid sector %d\n", sectnum);
//                    continue;
//                }
//                neartag(x, y, z, sectnum, ang, &neartagsector, &neartagwall, &neartagsprite,
//                        &neartaghitdist, neartagrange, tagsearch, NULL);

//                Gv_SetVarX(neartagsectorvar, neartagsector);
//                Gv_SetVarX(neartagwallvar, neartagwall);
//                Gv_SetVarX(neartagspritevar, neartagsprite);
//                Gv_SetVarX(neartaghitdistvar, neartaghitdist);
//                continue;
//            }

        case CON_GETTIMEDATE:
            insptr++;
            {
                var /*int32_t */i:number, vals = new Int32Array(8);

                G_GetTimeDate(vals);

                for (i=0; i<8; i++)
                    Gv_SetVarX(script[insptr++], vals[i]);

                continue;
            }

        case CON_MOVESPRITE:
        case CON_SETSPRITE:
            insptr++;
            {
                var/*int32_t */spritenum = Gv_GetVarX(script[insptr++]);
                var davector = new vec3_t ();

                davector.x = Gv_GetVarX(script[insptr++]);
                davector.y = Gv_GetVarX(script[insptr++]);
                davector.z = Gv_GetVarX(script[insptr++]);

                if (tw == CON_SETSPRITE)
                {
                    if (unsigned(spritenum) >= MAXSPRITES)
                    {
                        CON_ERRPRINTF("invalid sprite ID %d\n", spritenum);
                        continue;
                    }
                    setsprite(spritenum, davector);
                    continue;
                }

                {
                    var/*int32_t */cliptype = Gv_GetVarX(script[insptr++]);

                    if (unsigned(spritenum) >= MAXSPRITES)
                    {
                        CON_ERRPRINTF("invalid sprite ID %d\n", spritenum);
                        insptr++;
                        continue;
                    }
                    Gv_SetVarX(script[insptr++], A_MoveSprite(spritenum, davector, cliptype));
                    continue;
                }
            }

        case CON_GETFLORZOFSLOPE:
        case CON_GETCEILZOFSLOPE:
            insptr++;
            {
                var/*int32_t */sectnum = Gv_GetVarX(script[insptr++]), x = Gv_GetVarX(script[insptr++]), y = Gv_GetVarX(script[insptr++]);
                if (unsigned(sectnum) >= unsigned(numsectors))
                {
                    CON_ERRPRINTF("Invalid sector %d\n", sectnum);
                    insptr++;
                    continue;
                }

                if (tw == CON_GETFLORZOFSLOPE)
                {
                    Gv_SetVarX(script[insptr++], getflorzofslope(sectnum,x,y));
                    continue;
                }
                Gv_SetVarX(script[insptr++], getceilzofslope(sectnum,x,y));
                continue;
            }

        case CON_UPDATESECTOR:
        case CON_UPDATESECTORZ:
            insptr++;
            {
                var /*int32_t*/ x=Gv_GetVarX(script[insptr++]), y=Gv_GetVarX(script[insptr++]);
                var /*int32_t*/ z=(tw==CON_UPDATESECTORZ)?Gv_GetVarX(script[insptr++]):0;
                var /*int32_t*/ $var=script[insptr++];
                var /*int16_t*/ w=sprite[vm.g_i].sectnum;

                var $w = new R(w);
                if (tw==CON_UPDATESECTOR) updatesector(x,y,$w);
                else updatesectorz(x,y,z,$w);
                w = $w.$;

                Gv_SetVarX($var, w);
                continue;
            }

        case CON_SPAWN:
            insptr++;
            if (unsigned(vm.g_sp.sectnum) >= MAXSECTORS)
            {
                insptr++;
                continue;
            }
            A_Spawn(vm.g_i,script[insptr++]);
            continue;

        case CON_IFWASWEAPON:
            insptr++;
            VM_CONDITIONAL(actor[vm.g_i].picnum == script[insptr]);
            continue;

        case CON_IFAI:
            insptr++;
            VM_CONDITIONAL(AC_AI_ID(vm.g_t) == script[insptr]);
            continue;

        case CON_IFACTION:
            insptr++;
            VM_CONDITIONAL(AC_ACTION_ID(vm.g_t) == script[insptr]);
            continue;

        case CON_IFACTIONCOUNT:
            insptr++;
            VM_CONDITIONAL(AC_ACTION_COUNT(vm.g_t) >= script[insptr]);
            continue;

        case CON_RESETACTIONCOUNT:
            insptr++;
            vm.g_t[2] = 0;//AC_ACTION_COUNT(vm.g_t) = 0;
            continue;

        case CON_DEBRIS:
            insptr++;
            {
                var/*int32_t */dnum = script[insptr++];
                var/*int32_t */_s:number, l:number, j:number;

                if (unsigned(vm.g_sp.sectnum) < MAXSECTORS)
                    for (j=(script[insptr])-1; j>=0; j--)
                    {
                        if (vm.g_sp.picnum == BLIMP && dnum == SCRAP1)
                            _s = 0;
                        else _s = (krand()%3);

                        var krands = getKrands(8);
                        l = A_InsertSprite(vm.g_sp.sectnum,
                                           vm.g_sp.x+(krands.pop()&255)-128,vm.g_sp.y+(krands.pop()&255)-128,vm.g_sp.z-(8<<8)-(krands.pop()&8191),
                                           dnum+_s,vm.g_sp.shade,32+(krands.pop()&15),32+(krands.pop()&15),
                                           krands.pop()&2047,(krands.pop()&127)+32,
                                           -(krands.pop()&2047),vm.g_i,5);
                        if (vm.g_sp.picnum == BLIMP && dnum == SCRAP1)
                            sprite[l].yvel = BlimpSpawnSprites[j%14];
                        else sprite[l].yvel = -1;
                        sprite[l].pal = vm.g_sp.pal;
                    }
                insptr++;
            }
            continue;

        case CON_COUNT:
            insptr++;
            vm.g_t[0] = int16(script[insptr++]);//AC_COUNT(vm.g_t) 
            continue;

        case CON_CSTATOR:
            insptr++;
            vm.g_sp.cstat |= int16(script[insptr++]);
            continue;

        case CON_CLIPDIST:
            insptr++;
            vm.g_sp.clipdist = int16(script[insptr++]);
            continue;

        case CON_CSTAT:
            insptr++;
            vm.g_sp.cstat = int16( script[insptr++]);
            continue;

//        case CON_SAVENN:
//        case CON_SAVE:
//            insptr++;
//            {
//                g_lastSaveSlot = script[insptr++];

//                if ((unsigned)g_lastSaveSlot >= 10)
//                    continue;

//                if (tw == CON_SAVE || ud.savegame[g_lastSaveSlot][0] == 0)
//                {
//                    time_t curtime = time(NULL);
//                    Bstrcpy(tempbuf,asctime(localtime(&curtime)));
//                    clearbufbyte(ud.savegame[g_lastSaveSlot],sizeof(ud.savegame[g_lastSaveSlot]),0);
//                    Bsprintf(ud.savegame[g_lastSaveSlot],"Auto");
//                    //            for (j=0;j<13;j++)
//                    //                Bmemcpy(&ud.savegame[g_lastSaveSlot][j+4],&tempbuf[j+3],sizeof(tempbuf[j+3]));
//                    //            ud.savegame[g_lastSaveSlot][j+4] = '\0';
//                    Bmemcpy(&ud.savegame[g_lastSaveSlot][4],&tempbuf[3],sizeof(tempbuf[0])*13);
//                    ud.savegame[g_lastSaveSlot][17] = '\0';
//                }

//                OSD_Printf("Saving to slot %d\n",g_lastSaveSlot);

//                KB_FlushKeyboardQueue();

//                g_screenCapture = 1;
//                G_DrawRooms(myconnectindex,65536);
//                g_screenCapture = 0;

//                G_SavePlayerMaybeMulti(g_lastSaveSlot);

//                continue;
//            }

        case CON_QUAKE:
            insptr++;
            g_earthquakeTime = Gv_GetVarX(script[insptr++]);
            A_PlaySound(EARTHQUAKE,g_player[screenpeek].ps.i);
            continue;

        case CON_IFMOVE:
            insptr++;
            VM_CONDITIONAL(AC_MOVE_ID(vm.g_t) == script[insptr]);
            continue;

        case CON_RESETPLAYER:
        {
            insptr++;
            vm.g_flags = VM_ResetPlayer(vm.g_p, vm.g_flags);
        }
        continue;

        case CON_IFONWATER:
            VM_CONDITIONAL(sector[vm.g_sp.sectnum].lotag == ST_1_ABOVE_WATER && klabs(vm.g_sp.z-sector[vm.g_sp.sectnum].floorz) < (32<<8));
            continue;

        case CON_IFINWATER:
            VM_CONDITIONAL(sector[vm.g_sp.sectnum].lotag == ST_2_UNDERWATER);
            continue;

        case CON_IFCOUNT:
            insptr++;
            VM_CONDITIONAL(AC_COUNT(vm.g_t) >= script[insptr]);
            continue;

        case CON_IFACTOR:
            insptr++;
            VM_CONDITIONAL(vm.g_sp.picnum == script[insptr]);
            continue;

        case CON_RESETCOUNT:
            insptr++;
            vm.g_t[0] = 0;//AC_COUNT(vm.g_t) = 0;
            continue;

        case CON_ADDINVENTORY:
        {
            var ps = g_player[vm.g_p].ps;

            insptr += 2;
            switch (script[insptr-1])
            {
            case GET_STEROIDS:
                ps.inv_amount[GET_STEROIDS] = script[insptr];
                ps.inven_icon = ICON_STEROIDS;
                break;

            case GET_SHIELD:
                ps.inv_amount[GET_SHIELD] += script[insptr];// 100;
                if (ps.inv_amount[GET_SHIELD] > ps.max_shield_amount)
                    ps.inv_amount[GET_SHIELD] = ps.max_shield_amount;
                break;

            case GET_SCUBA:
                ps.inv_amount[GET_SCUBA] = script[insptr];// 1600;
                ps.inven_icon = ICON_SCUBA;
                break;

            case GET_HOLODUKE:
                ps.inv_amount[GET_HOLODUKE] = script[insptr];// 1600;
                ps.inven_icon = ICON_HOLODUKE;
                break;

            case GET_JETPACK:
                ps.inv_amount[GET_JETPACK] = script[insptr];// 1600;
                ps.inven_icon = ICON_JETPACK;
                break;

            case GET_ACCESS:
                switch (vm.g_sp.pal)
                {
                case  0:
                    ps.got_access |= 1;
                    break;
                case 21:
                    ps.got_access |= 2;
                    break;
                case 23:
                    ps.got_access |= 4;
                    break;
                }
                break;

            case GET_HEATS:
                ps.inv_amount[GET_HEATS] = script[insptr];
                ps.inven_icon = ICON_HEATS;
                break;

            case GET_FIRSTAID:
                ps.inven_icon = ICON_FIRSTAID;
                ps.inv_amount[GET_FIRSTAID] = script[insptr];
                break;

            case GET_BOOTS:
                ps.inven_icon = ICON_BOOTS;
                ps.inv_amount[GET_BOOTS] = script[insptr];
                break;
            default:
                CON_ERRPRINTF("Invalid inventory ID %d\n", script[insptr-1]);
                break;
            }
            insptr++;
            continue;
        }

        case CON_HITRADIUSVAR:
            insptr++;
            {
                var/*int32_t */v1=Gv_GetVarX(script[insptr++]),v2=Gv_GetVarX(script[insptr++]),v3=Gv_GetVarX(script[insptr++]);
                var/*int32_t */v4=Gv_GetVarX(script[insptr++]),v5=Gv_GetVarX(script[insptr++]);
                A_RadiusDamage(vm.g_i,v1,v2,v3,v4,v5);
            }
            continue;

        case CON_HITRADIUS:
            A_RadiusDamage(vm.g_i,script[insptr+1],script[insptr+2],script[insptr+3],script[insptr+4],script[insptr+5]);
            insptr += 6;
            continue;

        case CON_IFP:
        {
            var /*int32_t */l = script[++insptr] /* *(++insptr)*/ ;
            var/*int32_t */j = 0;
            var ps = g_player[vm.g_p].ps;
            var /*int32_t */_s = sprite[ps.i].xvel;

            if ((l&8) && ps.on_ground && TEST_SYNC_KEY(g_player[vm.g_p].sync.bits, SK_CROUCH))
                j = 1;
            else if ((l&16) && ps.jumping_counter == 0 && !ps.on_ground &&
                     ps.vel.z > 2048)
                j = 1;
            else if ((l&32) && ps.jumping_counter > 348)
                j = 1;
            else if ((l&1) && _s >= 0 && _s < 8)
                j = 1;
            else if ((l&2) && _s >= 8 && !TEST_SYNC_KEY(g_player[vm.g_p].sync.bits, SK_RUN))
                j = 1;
            else if ((l&4) && _s >= 8 && TEST_SYNC_KEY(g_player[vm.g_p].sync.bits, SK_RUN))
                j = 1;
            else if ((l&64) && ps.pos.z < (vm.g_sp.z-(48<<8)))
                j = 1;
            else if ((l&128) && _s <= -8 && !TEST_SYNC_KEY(g_player[vm.g_p].sync.bits, SK_RUN))
                j = 1;
            else if ((l&256) && _s <= -8 && TEST_SYNC_KEY(g_player[vm.g_p].sync.bits, SK_RUN))
                j = 1;
            else if ((l&512) && (ps.quick_kick > 0 || (ps.curr_weapon == KNEE_WEAPON && ps.kickback_pic > 0)))
                j = 1;
            else if ((l&1024) && sprite[ps.i].xrepeat < 32)
                j = 1;
            else if ((l&2048) && ps.jetpack_on)
                j = 1;
            else if ((l&4096) && ps.inv_amount[GET_STEROIDS] > 0 && ps.inv_amount[GET_STEROIDS] < 400)
                j = 1;
            else if ((l&8192) && ps.on_ground)
                j = 1;
            else if ((l&16384) && sprite[ps.i].xrepeat > 32 && sprite[ps.i].extra > 0 && ps.timebeforeexit == 0)
                j = 1;
            else if ((l&32768) && sprite[ps.i].extra <= 0)
                j = 1;
            else if ((l&65536))
            {
                if (vm.g_sp.picnum == APLAYER && (g_netServer || ud.multimode > 1))
                    j = G_GetAngleDelta(g_player[otherp].ps.ang,getangle(ps.pos.x-g_player[otherp].ps.pos.x,ps.pos.y-g_player[otherp].ps.pos.y));
                else
                    j = G_GetAngleDelta(ps.ang,getangle(vm.g_sp.x-ps.pos.x,vm.g_sp.y-ps.pos.y));

                if (j > -128 && j < 128)
                    j = 1;
                else
                    j = 0;
            }
			dlog(DEBUG_VM_EXECUTE, "CON_IFP s: %i, j: %i, *insptr: %i, *insptr+1: %i\n", _s, j, script[insptr], script[insptr+1]);
            VM_CONDITIONAL(/*(intptr_t)*/ j);
        }
        continue;

        case CON_IFSTRENGTH:
            insptr++;
            VM_CONDITIONAL(vm.g_sp.extra <= script[insptr]);
            continue;

        case CON_GUTS:
            A_DoGuts(vm.g_i,script[insptr+1],script[insptr+2]);
            insptr += 3;
            continue;

        case CON_IFSPAWNEDBY:
            insptr++;
            VM_CONDITIONAL(actor[vm.g_i].picnum == script[insptr]);
            continue;

        case CON_WACKPLAYER:
            insptr++;
            P_ForceAngle(g_player[vm.g_p].ps);
            continue;

        case CON_FLASH:
            insptr++;
            sprite[vm.g_i].shade = -127;
            g_player[vm.g_p].ps.visibility = -127;
            lastvisinc = totalclock+32;
            continue;

        case CON_SAVEMAPSTATE:
            G_SaveMapState();
            insptr++;
            continue;

        case CON_LOADMAPSTATE:
            G_RestoreMapState();
            insptr++;
            continue;

        case CON_CLEARMAPSTATE:
            insptr++;
            {
                var /*int32_t */j = Gv_GetVarX(script[insptr++]);
                if (unsigned(j) >= MAXVOLUMES*MAXLEVELS)
                {
                    CON_ERRPRINTF("Invalid map number: %d\n", j);
                    continue;
                }

                G_FreeMapState(j);
            }
            continue;

        case CON_STOPALLSOUNDS:
            insptr++;
            if (screenpeek == vm.g_p)
                FX_StopAllSounds();
            continue;

        case CON_IFGAPZL:
            insptr++;
            VM_CONDITIONAL(((actor[vm.g_i].floorz - actor[vm.g_i].ceilingz) >> 8) < script[insptr]);
            continue;

        case CON_IFHITSPACE:
            VM_CONDITIONAL(TEST_SYNC_KEY(g_player[vm.g_p].sync.bits, SK_OPEN));
            continue;

        case CON_IFOUTSIDE:
            VM_CONDITIONAL(sector[vm.g_sp.sectnum].ceilingstat&1);
            continue;

        case CON_IFMULTIPLAYER:
            VM_CONDITIONAL((g_netServer || g_netClient || ud.multimode > 1));
            continue;

        case CON_IFCLIENT:
            VM_CONDITIONAL(g_netClient != NULL);
            continue;

        case CON_IFSERVER:
            VM_CONDITIONAL(g_netServer != NULL);
            continue;

        case CON_OPERATE:
            insptr++;
            if (sector[vm.g_sp.sectnum].lotag == 0)
            {
                var $neartagsector = new R(neartagsector);
                var $neartagwall = new R(neartagwall);
                var $neartagsprite = new R(neartagsprite);
                var $neartaghitdist = new R(neartaghitdist);
                neartag(vm.g_sp.x,vm.g_sp.y,vm.g_sp.z-(32<<8),vm.g_sp.sectnum,vm.g_sp.ang,
                        $neartagsector,$neartagwall,$neartagsprite,$neartaghitdist, 768, 4+1, NULL);
                neartagsector = $neartagsector.$;
                neartagwall = $neartagwall.$;
                neartagsprite = $neartagsprite.$;
                neartaghitdist = $neartaghitdist.$;

                if (neartagsector >= 0 && isanearoperator(sector[neartagsector].lotag))
                    if ((sector[neartagsector].lotag&0xff) == ST_23_SWINGING_DOOR || sector[neartagsector].floorz == sector[neartagsector].ceilingz)
                        if ((sector[neartagsector].lotag&16384) == 0)
                            if ((sector[neartagsector].lotag&32768) == 0)
                            {
                                var/*int32_t */j = headspritesect[neartagsector];
                                while (j >= 0)
                                {
                                    if (sprite[j].picnum == ACTIVATOR)
                                        break;
                                    j = nextspritesect[j];
                                }
                                if (j == -1)
                                    G_OperateSectors(neartagsector,vm.g_i);
                            }
            }
            continue;

        case CON_IFINSPACE:
            VM_CONDITIONAL(G_CheckForSpaceCeiling(vm.g_sp.sectnum));
            continue;

        case CON_SPRITEPAL:
            insptr++;
            if (vm.g_sp.picnum != APLAYER)
                actor[vm.g_i].tempang = vm.g_sp.pal;
            vm.g_sp.pal = script[insptr++];
            continue;

        case CON_CACTOR:
            insptr++;
            vm.g_sp.picnum = script[insptr++];
            continue;

        case CON_IFBULLETNEAR:
            VM_CONDITIONAL(A_Dodge(vm.g_sp) == 1);
            continue;

        case CON_IFRESPAWN:
            if (A_CheckEnemySprite(vm.g_sp)) VM_CONDITIONAL(ud.respawn_monsters)
            else if (A_CheckInventorySprite(vm.g_sp)) VM_CONDITIONAL(ud.respawn_inventory)
            else VM_CONDITIONAL(ud.respawn_items)
            continue;

        case CON_IFFLOORDISTL:
            insptr++;
            VM_CONDITIONAL((actor[vm.g_i].floorz - vm.g_sp.z) <= ((script[insptr])<<8));
            continue;

        case CON_IFCEILINGDISTL:
            insptr++;
            VM_CONDITIONAL((vm.g_sp.z - actor[vm.g_i].ceilingz) <= ((script[insptr])<<8));
            continue;

        case CON_PALFROM:
            insptr++;
            if (unsigned(vm.g_p) >= unsigned(playerswhenstarted))
            {
                CON_ERRPRINTF("invalid player ID %d\n", vm.g_p);
                insptr += 4;
            }
            else
            {
                var /*uint8_t */f=script[insptr++], r=script[insptr++], g=script[insptr++], b=script[insptr++];

                P_PalFrom(g_player[vm.g_p].ps, f, r,g,b);
            }
            continue;

        case CON_SECTOROFWALL:
            insptr++;
            {
                var/*int32_t */j = script[insptr++];

                Gv_SetVarX(j, sectorofwall(Gv_GetVarX(script[insptr++])));
            }
            continue;

//        case CON_QSPRINTF:
//            insptr++;
//            {
//                int32_t dq = Gv_GetVarX(script[insptr++]), sq = Gv_GetVarX(script[insptr++]);
//                if ((ScriptQuotes[sq] == NULL || ScriptQuotes[dq] == NULL))
//                {
//                    CON_ERRPRINTF("null quote %d\n", ScriptQuotes[sq] ? dq : sq);

//                    while ((script[insptr] & 0xFFF) != CON_NULLOP)
//                        Gv_GetVarX(script[insptr++]);

//                    insptr++; // skip the NOP
//                    continue;
//                }

//                {
//                    int32_t arg[32], i = 0, j = 0, k = 0, numargs;
//                    int32_t len = Bstrlen(ScriptQuotes[sq]);
//                    char tempbuf[MAXQUOTELEN];

//                    while ((script[insptr] & 0xFFF) != CON_NULLOP && i < 32)
//                        arg[i++] = Gv_GetVarX(script[insptr++]);
//                    numargs = i;

//                    insptr++; // skip the NOP

//                    i = 0;

//                    do
//                    {
//                        while (k < len && j < MAXQUOTELEN && ScriptQuotes[sq][k] != '%')
//                            tempbuf[j++] = ScriptQuotes[sq][k++];

//                        if (ScriptQuotes[sq][k] == '%')
//                        {
//                            k++;
//                            switch (ScriptQuotes[sq][k])
//                            {
//                            case 'l':
//                                if (ScriptQuotes[sq][k+1] != 'd')
//                                {
//                                    // write the % and l
//                                    tempbuf[j++] = ScriptQuotes[sq][k-1];
//                                    tempbuf[j++] = ScriptQuotes[sq][k++];
//                                    break;
//                                }
//                                k++;
//                            case 'd':
//                            {
//                                char buf[16];
//                                int32_t ii;

//                                if (i >= numargs)
//                                    goto finish_qsprintf;
//                                Bsprintf(buf, "%d", arg[i++]);

//                                ii = Bstrlen(buf);
//                                Bmemcpy(&tempbuf[j], buf, ii);
//                                j += ii;
//                                k++;
//                            }
//                            break;

//                            case 's':
//                            {
//                                int32_t ii;

//                                if (i >= numargs)
//                                    goto finish_qsprintf;
//                                ii = Bstrlen(ScriptQuotes[arg[i]]);

//                                Bmemcpy(&tempbuf[j], ScriptQuotes[arg[i]], ii);
//                                j += ii;
//                                i++;
//                                k++;
//                            }
//                            break;

//                            default:
//                                tempbuf[j++] = ScriptQuotes[sq][k-1];
//                                break;
//                            }
//                        }
//                    }
//                    while (k < len && j < MAXQUOTELEN);
//finish_qsprintf:
//                    tempbuf[j] = '\0';
//                    Bstrncpyz(ScriptQuotes[dq], tempbuf, MAXQUOTELEN);
//                    continue;
//                }
//            }

        case CON_ADDLOG:
        {
            insptr++;

            OSD_Printf(OSDTEXT_GREEN + "CONLOG: L=%d\n",g_errorLineNum);
            continue;
        }

//        case CON_ADDLOGVAR:
//            insptr++;
//            {
//                int32_t m=1;
//                char szBuf[256];
//                int32_t lVarID = script[insptr];

//                if ((lVarID >= g_gameVarCount) || lVarID < 0)
//                {
//                    if (script[insptr]==MAXGAMEVARS) // addlogvar for a constant?  Har.
//                        insptr++;
//                    //                else if (script[insptr] > g_gameVarCount && (script[insptr] < (MAXGAMEVARS<<1)+MAXGAMEVARS+1+MAXGAMEARRAYS))
//                    else if (script[insptr]&(MAXGAMEVARS<<2))
//                    {
//                        int32_t index;

//                        lVarID ^= (MAXGAMEVARS<<2);

//                        if (lVarID&(MAXGAMEVARS<<1))
//                        {
//                            m = -m;
//                            lVarID ^= (MAXGAMEVARS<<1);
//                        }

//                        insptr++;

//                        index=Gv_GetVarX(script[insptr++]);
//                        if (index>=0 && index < aGameArrays[lVarID].size)
//                        {
//                            OSD_Printf(OSDTEXT_GREEN "%s: L=%d %s[%d] =%d\n", keyw[g_tw], g_errorLineNum,
//                                       aGameArrays[lVarID].szLabel, index,
//                                       (int32_t)(m*aGameArrays[lVarID].plValues[index]));
//                            continue;
//                        }
//                        else
//                        {
//                            CON_ERRPRINTF("invalid array index\n");
//                            continue;
//                        }
//                    }
//                    else if (script[insptr]&(MAXGAMEVARS<<3))
//                    {
//                        //                    FIXME FIXME FIXME
//                        if ((lVarID & (MAXGAMEVARS-1)) == g_iActorVarID)
//                        {
//                            intptr_t *oinsptr = insptr++;
//                            int32_t index = Gv_GetVarX(script[insptr++]);
//                            insptr = oinsptr;
//                            if ((unsigned)index >= MAXSPRITES-1)
//                            {
//                                CON_ERRPRINTF("invalid array index\n");
//                                Gv_GetVarX(script[insptr++]);
//                                continue;
//                            }
//                            OSD_Printf(OSDTEXT_GREEN "%s: L=%d %d %d\n",keyw[g_tw],g_errorLineNum,index,Gv_GetVar(script[insptr++],index,vm.g_p));
//                            continue;
//                        }
//                    }
//                    else if (script[insptr]&(MAXGAMEVARS<<1))
//                    {
//                        m = -m;
//                        lVarID ^= (MAXGAMEVARS<<1);
//                    }
//                    else
//                    {
//                        // invalid varID
//                        insptr++;
//                        CON_ERRPRINTF("invalid variable\n");
//                        continue;  // out of switch
//                    }
//                }
//                Bsprintf(szBuf,"CONLOGVAR: L=%d %s ",g_errorLineNum, aGameVars[lVarID].szLabel);
//                strcpy(g_szBuf,szBuf);

//                if (aGameVars[lVarID].dwFlags & GAMEVAR_READONLY)
//                {
//                    Bsprintf(szBuf," (read-only)");
//                    strcat(g_szBuf,szBuf);
//                }
//                if (aGameVars[lVarID].dwFlags & GAMEVAR_PERPLAYER)
//                {
//                    Bsprintf(szBuf," (Per Player. Player=%d)",vm.g_p);
//                }
//                else if (aGameVars[lVarID].dwFlags & GAMEVAR_PERACTOR)
//                {
//                    Bsprintf(szBuf," (Per Actor. Actor=%d)",vm.g_i);
//                }
//                else
//                {
//                    Bsprintf(szBuf," (Global)");
//                }
//                Bstrcat(g_szBuf,szBuf);
//                Bsprintf(szBuf," =%d\n", Gv_GetVarX(lVarID)*m);
//                Bstrcat(g_szBuf,szBuf);
//                OSD_Printf(OSDTEXT_GREEN "%s",g_szBuf);
//                insptr++;
//                continue;
//            }

        case CON_SETSECTOR:
        case CON_GETSECTOR:
            insptr++;
            {
                // syntax [gs]etsector[<var>].x <VAR>
                // <varid> <xxxid> <varid>
                var/*int32_t */lVar1=script[insptr++], lLabelID=script[insptr++], lVar2=script[insptr++];

                VM_AccessSector(tw==CON_SETSECTOR, lVar1, lLabelID, lVar2);
                continue;
            }

        case CON_SQRT:
            insptr++;
            {
                // syntax sqrt <invar> <outvar>
                var/*int32_t */lInVarID=script[insptr++], lOutVarID=script[insptr++];

                Gv_SetVarX(lOutVarID, ksqrt(uint32(Gv_GetVarX(lInVarID))));
                continue;
            }

        case CON_FINDNEARACTOR:
        case CON_FINDNEARSPRITE:
        case CON_FINDNEARACTOR3D:
        case CON_FINDNEARSPRITE3D:
            insptr++;
            {
                // syntax findnearactorvar <type> <maxdist> <getvar>
                // gets the sprite ID of the nearest actor within max dist
                // that is of <type> into <getvar>
                // -1 for none found
                // <type> <maxdist> <varid>
                var /*int32_t*/ lType=script[insptr++], lMaxDist=script[insptr++], lVarID=script[insptr++];
                var /*int32_t*/ lFound=-1, j:number, k = MAXSTATUS-1;

                if (tw == CON_FINDNEARACTOR || tw == CON_FINDNEARACTOR3D)
                    k = 1;

                if (tw==CON_FINDNEARSPRITE3D || tw==CON_FINDNEARACTOR3D)
                {
                    do
                    {
                        j=headspritestat[k];    // all sprites
                        while (j>=0)
                        {
                            if (sprite[j].picnum == lType && j != vm.g_i && dist(sprite[vm.g_i], sprite[j]) < lMaxDist)
                            {
                                lFound=j;
                                j = MAXSPRITES;
                                break;
                            }
                            j = nextspritestat[j];
                        }
                        if (j == MAXSPRITES || tw == CON_FINDNEARACTOR3D)
                            break;
                    }
                    while (k--);
                    Gv_SetVarX(lVarID, lFound);
                    continue;
                }

                do
                {
                    j=headspritestat[k];    // all sprites
                    while (j>=0)
                    {
                        if (sprite[j].picnum == lType && j != vm.g_i && ldist(sprite[vm.g_i], sprite[j]) < lMaxDist)
                        {
                            lFound=j;
                            j = MAXSPRITES;
                            break;
                        }
                        j = nextspritestat[j];
                    }

                    if (j == MAXSPRITES || tw == CON_FINDNEARACTOR)
                        break;
                }
                while (k--);
                Gv_SetVarX(lVarID, lFound);
                continue;
            }

        case CON_FINDNEARACTORVAR:
        case CON_FINDNEARSPRITEVAR:
        case CON_FINDNEARACTOR3DVAR:
        case CON_FINDNEARSPRITE3DVAR:
            insptr++;
            {
                // syntax findnearactorvar <type> <maxdistvar> <getvar>
                // gets the sprite ID of the nearest actor within max dist
                // that is of <type> into <getvar>
                // -1 for none found
                // <type> <maxdistvarid> <varid>
               var /*int32_t*/ lType=script[insptr++], lMaxDist=Gv_GetVarX(script[insptr++]), lVarID=script[insptr++];
               var /*int32_t*/ lFound=-1, j:number, k = 1;

                if (tw == CON_FINDNEARSPRITEVAR || tw == CON_FINDNEARSPRITE3DVAR)
                    k = MAXSTATUS-1;

                if (tw==CON_FINDNEARACTOR3DVAR || tw==CON_FINDNEARSPRITE3DVAR)
                {
                    do
                    {
                        j=headspritestat[k];    // all sprites

                        while (j >= 0)
                        {
                            if (sprite[j].picnum == lType && j != vm.g_i && dist(sprite[vm.g_i], sprite[j]) < lMaxDist)
                            {
                                lFound=j;
                                j = MAXSPRITES;
                                break;
                            }
                            j = nextspritestat[j];
                        }
                        if (j == MAXSPRITES || tw==CON_FINDNEARACTOR3DVAR)
                            break;
                    }
                    while (k--);
                    Gv_SetVarX(lVarID, lFound);
                    continue;
                }

                do
                {
                    j=headspritestat[k];    // all sprites

                    while (j >= 0)
                    {
                        if (sprite[j].picnum == lType && j != vm.g_i && ldist(sprite[vm.g_i], sprite[j]) < lMaxDist)
                        {
                            lFound=j;
                            j = MAXSPRITES;
                            break;
                        }
                        j = nextspritestat[j];
                    }

                    if (j == MAXSPRITES || tw==CON_FINDNEARACTORVAR)
                        break;
                }
                while (k--);
                Gv_SetVarX(lVarID, lFound);
                continue;
            }

        case CON_FINDNEARACTORZVAR:
        case CON_FINDNEARSPRITEZVAR:
            insptr++;
            {
                // syntax findnearactorvar <type> <maxdistvar> <getvar>
                // gets the sprite ID of the nearest actor within max dist
                // that is of <type> into <getvar>
                // -1 for none found
                // <type> <maxdistvarid> <varid>
                var /*int32_t*/ lType=script[insptr++], lMaxDist=Gv_GetVarX(script[insptr++]);
                var /*int32_t*/ lMaxZDist=Gv_GetVarX(script[insptr++]);
                var /*int32_t*/ lVarID=script[insptr++], lFound=-1, lTemp:number, lTemp2:number, j:number, k=MAXSTATUS-1;
                do
                {
                    j=headspritestat[tw==CON_FINDNEARACTORZVAR?1:k];    // all sprites
                    if (j == -1) continue;
                    do
                    {
                        if (sprite[j].picnum == lType && j != vm.g_i)
                        {
                            lTemp=ldist(sprite[vm.g_i], sprite[j]);
                            if (lTemp < lMaxDist)
                            {
                                lTemp2=klabs(sprite[vm.g_i].z-sprite[j].z);
                                if (lTemp2 < lMaxZDist)
                                {
                                    lFound=j;
                                    j = MAXSPRITES;
                                    break;
                                }
                            }
                        }
                        j = nextspritestat[j];
                    }
                    while (j>=0);
                    if (tw==CON_FINDNEARACTORZVAR || j == MAXSPRITES)
                        break;
                }
                while (k--);
                Gv_SetVarX(lVarID, lFound);

                continue;
            }

        case CON_FINDNEARACTORZ:
        case CON_FINDNEARSPRITEZ:
            insptr++;
            {
                // syntax findnearactorvar <type> <maxdist> <getvar>
                // gets the sprite ID of the nearest actor within max dist
                // that is of <type> into <getvar>
                // -1 for none found
                // <type> <maxdist> <varid>
                var/*int32_t */lType=script[insptr++], lMaxDist=script[insptr++], lMaxZDist=script[insptr++], lVarID=script[insptr++];
                var/*int32_t */lTemp:number, lTemp2:number, lFound=-1, j:number, k=MAXSTATUS-1;
                do
                {
                    j=headspritestat[tw==CON_FINDNEARACTORZ?1:k];    // all sprites
                    if (j == -1) continue;
                    do
                    {
                        if (sprite[j].picnum == lType && j != vm.g_i)
                        {
                            lTemp=ldist(sprite[vm.g_i], sprite[j]);
                            if (lTemp < lMaxDist)
                            {
                                lTemp2=klabs(sprite[vm.g_i].z-sprite[j].z);
                                if (lTemp2 < lMaxZDist)
                                {
                                    lFound=j;
                                    j = MAXSPRITES;
                                    break;
                                }
                            }
                        }
                        j = nextspritestat[j];
                    }
                    while (j>=0);

                    if (tw==CON_FINDNEARACTORZ || j == MAXSPRITES)
                        break;
                }
                while (k--);
                Gv_SetVarX(lVarID, lFound);
                continue;
            }

        case CON_FINDPLAYER:
            insptr++;
            {
                var/*int32_t */j:number;
                var $j = new R(j);
                aGameVars[g_iReturnVarID].val.lValue = A_FindPlayer(sprite[vm.g_i],$j);
                j = $j.$;
                Gv_SetVarX(script[insptr++], j);
            }
            continue;

        case CON_FINDOTHERPLAYER:
            insptr++;
            {
                var/*int32_t */j:number;
                //            Gv_SetVarX(g_iReturnVarID, P_FindOtherPlayer(vm.g_p,&j));
                var $j = new R(j);
                aGameVars[g_iReturnVarID].val.lValue = P_FindOtherPlayer(vm.g_p,$j);
                j = $j.$;
                Gv_SetVarX(script[insptr++], j);
            }
            continue;

        case CON_SETPLAYER:
            insptr++;
            {
                // syntax [gs]etplayer[<var>].x <VAR>
                // <varid> <xxxid> <varid>
                var/*int32_t */lVar1=script[insptr++], lLabelID=script[insptr++], lParm2 = 0, lVar2:number;
                // HACK: need to have access to labels structure at run-time...

                if (PlayerLabels[lLabelID].flags & LABEL_HASPARM2)
                    lParm2=Gv_GetVarX(script[insptr++]);
                lVar2=script[insptr++];

                VM_SetPlayer(lVar1, lLabelID, lVar2, lParm2);
                continue;
            }


        case CON_GETPLAYER:
            insptr++;
            {
                // syntax [gs]etplayer[<var>].x <VAR>
                // <varid> <xxxid> <varid>
                var/*int32_t */lVar1=script[insptr++], lLabelID=script[insptr++], lParm2 = 0, lVar2:number;
                // HACK: need to have access to labels structure at run-time...

                if (PlayerLabels[lLabelID].flags & LABEL_HASPARM2)
                    lParm2=Gv_GetVarX(script[insptr++]);
                lVar2=script[insptr++];

                VM_GetPlayer(lVar1, lLabelID, lVar2, lParm2);
                continue;
            }

        case CON_SETINPUT:
        case CON_GETINPUT:
            insptr++;
            {
                // syntax [gs]etplayer[<var>].x <VAR>
                // <varid> <xxxid> <varid>
                var/*int32_t */lVar1=script[insptr++], lLabelID=script[insptr++], lVar2=script[insptr++];

                VM_AccessPlayerInput(tw==CON_SETINPUT, lVar1, lLabelID, lVar2);
                continue;
            }

        case CON_GETUSERDEF:
        case CON_SETUSERDEF:
            insptr++;
            {
                // syntax [gs]etuserdef.xxx <VAR>
                //  <xxxid> <varid>
                var/*int32_t */lLabelID=script[insptr++], lVar2=script[insptr++];

                VM_AccessUserdef(tw==CON_SETUSERDEF, lLabelID, lVar2);
                continue;
            }

        case CON_GETPROJECTILE:
        case CON_SETPROJECTILE:
            insptr++;
            {
                // syntax [gs]etplayer[<var>].x <VAR>
                // <varid> <xxxid> <varid>
                var/*int32_t */lVar1=Gv_GetVarX(script[insptr++]), lLabelID=script[insptr++], lVar2=script[insptr++];

                VM_AccessProjectile(tw==CON_SETPROJECTILE,lVar1,lLabelID,lVar2);
                continue;
            }

        case CON_SETWALL:
        case CON_GETWALL:
            insptr++;
            {
                // syntax [gs]etwall[<var>].x <VAR>
                // <varid> <xxxid> <varid>
                var/*int32_t */lVar1=script[insptr++], lLabelID=script[insptr++], lVar2=script[insptr++];

                VM_AccessWall(tw==CON_SETWALL, lVar1, lLabelID, lVar2);
                continue;
            }

        case CON_SETACTORVAR:
        case CON_GETACTORVAR:
            insptr++;
            {
                // syntax [gs]etactorvar[<var>].<varx> <VAR>
                // gets the value of the per-actor variable varx into VAR
                // <var> <varx> <VAR>
                var/*int32_t */lSprite=Gv_GetVarX(script[insptr++]), lVar1=script[insptr++];
                var/*int32_t */lVar2=script[insptr++];

                if (unsigned(lSprite) >= MAXSPRITES)
                {
                    CON_ERRPRINTF("invalid sprite ID %d\n", lSprite);
                    if (lVar1 == MAXGAMEVARS || lVar1 & ((MAXGAMEVARS<<2)|(MAXGAMEVARS<<3))) insptr++;
                    if (lVar2 == MAXGAMEVARS || lVar2 & ((MAXGAMEVARS<<2)|(MAXGAMEVARS<<3))) insptr++;
                    continue;
                }

                if (tw == CON_SETACTORVAR)
                {
                    Gv_SetVar(lVar1, Gv_GetVarX(lVar2), lSprite, vm.g_p);
                    continue;
                }
                Gv_SetVarX(lVar2, Gv_GetVar(lVar1, lSprite, vm.g_p));
                continue;
            }

        case CON_SETPLAYERVAR:
        case CON_GETPLAYERVAR:
            insptr++;
            {
                var/*int32_t */iPlayer = vm.g_p;

                if (script[insptr] != g_iThisActorID)
                    iPlayer=Gv_GetVarX(script[insptr]);

                insptr++;
                {
                    var/*int32_t */lVar1=script[insptr++], lVar2=script[insptr++];

                    if (unsigned(iPlayer) >= unsigned(playerswhenstarted))
                    {
                        CON_ERRPRINTF("invalid player ID %d\n", iPlayer);
                        if (lVar1 == MAXGAMEVARS || lVar1 & ((MAXGAMEVARS<<2)|(MAXGAMEVARS<<3))) insptr++;
                        if (lVar2 == MAXGAMEVARS || lVar2 & ((MAXGAMEVARS<<2)|(MAXGAMEVARS<<3))) insptr++;
                        continue;
                    }

                    if (tw == CON_SETPLAYERVAR)
                    {
                        Gv_SetVar(lVar1, Gv_GetVarX(lVar2), vm.g_i, iPlayer);
                        continue;
                    }
                    Gv_SetVarX(lVar2, Gv_GetVar(lVar1, vm.g_i, iPlayer));
                    continue;
                }
            }

        case CON_SETACTOR:
            insptr++;
            {
                // syntax [gs]etactor[<var>].x <VAR>
                // <varid> <xxxid> <varid>

                var/*int32_t */lVar1=script[insptr++], lLabelID=script[insptr++], lParm2 = 0;

                if (ActorLabels[lLabelID].flags & LABEL_HASPARM2)
                    lParm2=Gv_GetVarX(script[insptr++]);

                {
                    var/*int32_t */lVar2=script[insptr++];

                    VM_SetSprite(lVar1, lLabelID, lVar2, lParm2);
                }
                continue;
            }

        case CON_GETACTOR:
            insptr++;
            {
                // syntax [gs]etactor[<var>].x <VAR>
                // <varid> <xxxid> <varid>

                var/*int32_t */lVar1=script[insptr++], lLabelID=script[insptr++], lParm2 = 0;

                if (ActorLabels[lLabelID].flags & LABEL_HASPARM2)
                    lParm2=Gv_GetVarX(script[insptr++]);

                {
                    var/*int32_t */lVar2=script[insptr++];

                    VM_GetSprite(lVar1, lLabelID, lVar2, lParm2);
                }
                continue;
            }

        case CON_SETTSPR:
        case CON_GETTSPR:
            insptr++;
            {
                // syntax [gs]etactor[<var>].x <VAR>
                // <varid> <xxxid> <varid>

                var/*int32_t */lVar1=script[insptr++], lLabelID=script[insptr++], lVar2=script[insptr++];

                VM_AccessTsprite(tw==CON_SETTSPR, lVar1, lLabelID, lVar2);
                continue;
            }

        case CON_GETANGLETOTARGET:
            insptr++;
            // Actor[vm.g_i].lastvx and lastvy are last known location of target.
            Gv_SetVarX(script[insptr++], getangle(actor[vm.g_i].lastvx-vm.g_sp.x,actor[vm.g_i].lastvy-vm.g_sp.y));
            continue;

        case CON_ANGOFFVAR:
            insptr++;
            spriteext[vm.g_i].angoff=Gv_GetVarX(script[insptr++]);
            continue;

        case CON_LOCKPLAYER:
            insptr++;
            g_player[vm.g_p].ps.transporter_hold=Gv_GetVarX(script[insptr++]);
            continue;

        case CON_CHECKAVAILWEAPON:
        case CON_CHECKAVAILINVEN:
            insptr++;
            {
                var/*int32_t */j = vm.g_p;

                if (script[insptr] != g_iThisActorID)
                    j=Gv_GetVarX(script[insptr]);

                insptr++;

                if (unsigned(j) >= unsigned(playerswhenstarted))
                {
                    CON_ERRPRINTF("Invalid player ID %d\n", j);
                    continue;
                }

                if (tw == CON_CHECKAVAILWEAPON)
                    P_CheckWeapon(g_player[j].ps);
                else P_SelectNextInvItem(g_player[j].ps);
            }
            continue;

        case CON_GETPLAYERANGLE:
            insptr++;
            Gv_SetVarX(script[insptr++], g_player[vm.g_p].ps.ang);
            continue;

        case CON_SETPLAYERANGLE:
            insptr++;
            g_player[vm.g_p].ps.ang=Gv_GetVarX(script[insptr++]);
            g_player[vm.g_p].ps.ang &= 2047;
            continue;

        case CON_GETACTORANGLE:
            insptr++;
            Gv_SetVarX(script[insptr++], vm.g_sp.ang);
            continue;

        case CON_SETACTORANGLE:
            insptr++;
            vm.g_sp.ang=Gv_GetVarX(script[insptr++]);
            vm.g_sp.ang &= 2047;
            continue;

        case CON_SETVAR:
            insptr++;
            if ((aGameVars[script[insptr]].dwFlags & (GAMEVAR_USER_MASK|GAMEVAR_PTR_MASK)) == 0)
            {
                aGameVars[script[insptr]].val.lValue = script[insptr+1];
                insptr += 2;
                continue;
            }
            Gv_SetVarX(script[insptr], script[insptr+1]);
            insptr += 2;
            continue;

//        case CON_SETARRAY:
//            insptr++;
//            {
//                var/*int32_t */j=script[insptr++];
//                int32_t index = Gv_GetVarX(script[insptr++]);
//                int32_t value = Gv_GetVarX(script[insptr++]);

//                if (j<0 || j >= g_gameArrayCount || index >= aGameArrays[j].size || index < 0)
//                {
//                    OSD_Printf_nowarn(OSD_ERROR "Gv_SetVar(): tried to set invalid array ID (%d) or index out of bounds from sprite %d (%d), player %d\n",
//                        j,vm.g_i,TrackerCast(sprite[vm.g_i].picnum),vm.g_p);
//                    continue;
//                }
//                if (aGameArrays[j].dwFlags & GAMEARRAY_READONLY)
//                {
//                    OSD_Printf("Tried to set on read-only array `%s'", aGameArrays[j].szLabel);
//                    continue;
//                }
//                aGameArrays[j].plValues[index]=value;
//                continue;
//            }
//        case CON_WRITEARRAYTOFILE:
//        case CON_READARRAYFROMFILE:
//            insptr++;
//            {
//                var/*int32_t */j=script[insptr++];
//                {
//                    int q = script[insptr++];

//                    if (ScriptQuotes[q] == NULL)
//                    {
//                        CON_ERRPRINTF("null quote %d\n", q);
//                        continue;
//                    }

//                    if (tw == CON_READARRAYFROMFILE)
//                    {
//                        int32_t fil = kopen4loadfrommod(ScriptQuotes[q], 0);
//                        int32_t asize;

//                        if (fil < 0)
//                            continue;

//                        asize = kfilelength(fil);

//                        if (asize > 0)
//                        {
//                            // NOTE: this is broken on 64-bit, e.g. for LNGA2.
//                            /*OSD_Printf(OSDTEXT_GREEN "CON_RESIZEARRAY: resizing array %s from %d to %d\n",
//                                aGameArrays[j].szLabel, aGameArrays[j].size, asize / GAR_ELTSZ);*/
//                            aGameArrays[j].plValues = (intptr_t *)Brealloc(aGameArrays[j].plValues, asize);
//                            aGameArrays[j].size = asize / GAR_ELTSZ;
//                            kread(fil, aGameArrays[j].plValues, asize);
//                        }

//                        kclose(fil);
//                        continue;
//                    }

//                    {
//                        FILE *fil;
//                        char temp[BMAX_PATH];

//                        if (G_ModDirSnprintf(temp, sizeof(temp), "%s", ScriptQuotes[q]))
//                        {
//                            CON_ERRPRINTF("file name too long\n");
//                            continue;
//                        }

//                        fil = fopen(temp,"wb");
//                        if (fil == NULL)
//                        {
//                            CON_ERRPRINTF("couldn't open file");
//                            continue;
//                        }

//                        fwrite(aGameArrays[j].plValues,1,sizeof(int) * aGameArrays[j].size,fil);
//                        fclose(fil);
//                    }

//                    continue;
//                }
//            }

        case CON_GETARRAYSIZE:
            insptr++;
            {
                var/*int32_t */j=script[insptr++];
                Gv_SetVarX(script[insptr++], (aGameArrays[j].dwFlags&GAMEARRAY_VARSIZE) ?
                           Gv_GetVarX(aGameArrays[j].size) : aGameArrays[j].size);
            }
            continue;

//        case CON_RESIZEARRAY:
//            insptr++;
//            {
//                var/*int32_t */j=script[insptr++];
//                int32_t asize = Gv_GetVarX(script[insptr++]);

//                if (asize > 0)
//                {
//                    /*OSD_Printf(OSDTEXT_GREEN "CON_RESIZEARRAY: resizing array %s from %d to %d\n", aGameArrays[j].szLabel, aGameArrays[j].size, asize);*/
//                    aGameArrays[j].plValues = (intptr_t *)Brealloc(aGameArrays[j].plValues, GAR_ELTSZ * asize);
//                    aGameArrays[j].size = asize;
//                }
//                continue;
//            }

//        case CON_COPY:
//            insptr++;
//            {
//                int32_t si=script[insptr++], ssiz = 0;
//                int32_t sidx = Gv_GetVarX(script[insptr++]); //, vm.g_i, vm.g_p);
//                int32_t di=script[insptr++], dsiz = 0;
//                int32_t didx = Gv_GetVarX(script[insptr++]);
//                int32_t numelts = Gv_GetVarX(script[insptr++]);

//                if (si<0 || si>=g_gameArrayCount)
//                {
//                    CON_ERRPRINTF("Invalid array %d!", si);
//                    dsiz = 1;
//                }
//                if (di<0 || di>=g_gameArrayCount)
//                {
//                    CON_ERRPRINTF("Invalid array %d!", di);
//                    dsiz = 1;
//                }
//                if (aGameArrays[di].dwFlags & GAMEARRAY_READONLY)
//                {
//                    CON_ERRPRINTF("Array %d is read-only!", di);
//                    dsiz = 1;
//                }
//                if (dsiz) continue; // dirty replacement for VMFLAG_ERROR

//                ssiz = (aGameArrays[si].dwFlags&GAMEARRAY_VARSIZE) ?
//                       Gv_GetVarX(aGameArrays[si].size) : aGameArrays[si].size;
//                dsiz = (aGameArrays[di].dwFlags&GAMEARRAY_VARSIZE) ?
//                       Gv_GetVarX(aGameArrays[si].size) : aGameArrays[di].size;

//                if (sidx > ssiz || didx > dsiz) continue;
//                if ((sidx+numelts) > ssiz) numelts = ssiz-sidx;
//                if ((didx+numelts) > dsiz) numelts = dsiz-didx;

//                // Switch depending on the source array type.
//                switch (aGameArrays[si].dwFlags & GAMEARRAY_TYPE_MASK)
//                {
//                case 0:
//                    // CON array to CON array.
//                    Bmemcpy(aGameArrays[di].plValues+didx, aGameArrays[si].plValues+sidx, numelts*GAR_ELTSZ);
//                    break;
//                case GAMEARRAY_OFINT:
//                    // From int32-sized array. Note that the CON array element
//                    // type is intptr_t, so it is different-sized on 64-bit
//                    // archs, but same-sized on 32-bit ones.
//                    for (; numelts>0; numelts--)
//                        (aGameArrays[di].plValues)[didx++] = ((int32_t *)aGameArrays[si].plValues)[sidx++];
//                    break;
//                case GAMEARRAY_OFSHORT:
//                    // From int16_t array. Always different-sized.
//                    for (; numelts>0; numelts--)
//                        (aGameArrays[di].plValues)[didx++] = ((int16_t *)aGameArrays[si].plValues)[sidx++];
//                    break;
//                case GAMEARRAY_OFCHAR:
//                    // From char array. Always different-sized.
//                    for (; numelts>0; numelts--)
//                        (aGameArrays[di].plValues)[didx++] = ((uint8_t *)aGameArrays[si].plValues)[sidx++];
//                    break;
//                }
//                continue;
//            }

        case CON_RANDVAR:
            insptr++;
            Gv_SetVarX(script[insptr], mulscale16(krand(), script[insptr+1]+1));
            insptr += 2;
            continue;

        case CON_DISPLAYRANDVAR:
            insptr++;
            Gv_SetVarX(script[insptr], mulscale15(system_15bit_rand(), script[insptr+1]+1));
            insptr += 2;
            continue;

        case CON_INV:
            if ((aGameVars[script[insptr+1]].dwFlags & (GAMEVAR_USER_MASK|GAMEVAR_PTR_MASK)) == 0)
            {
                aGameVars[script[insptr+1]].val.lValue = -aGameVars[script[insptr+1]].val.lValue;
                insptr += 2;
                continue;
            }
            Gv_SetVarX(script[insptr+1], -Gv_GetVarX(script[insptr+1]));
            insptr += 2;
            continue;

        case CON_MULVAR:
            insptr++;
            Gv_MulVar(script[insptr], script[insptr+1]);
            insptr += 2;
            continue;

        case CON_DIVVAR:
            insptr++;
            if (script[insptr+1] == 0)
            {
                CON_ERRPRINTF("divide by zero!\n");
                insptr += 2;
                continue;
            }
            Gv_DivVar(script[insptr], script[insptr+1]);
            insptr += 2;
            continue;

        case CON_MODVAR:
            insptr++;
            if (script[insptr+1] == 0)
            {
                CON_ERRPRINTF("mod by zero!\n");
                insptr += 2;
                continue;
            }

            Gv_ModVar(script[insptr],script[insptr+1]);
            insptr += 2;
            continue;

        case CON_ANDVAR:
            insptr++;
            Gv_AndVar(script[insptr],script[insptr+1]);
            insptr += 2;
            continue;

        case CON_ORVAR:
            insptr++;
            Gv_OrVar(script[insptr],script[insptr+1]);
            insptr += 2;
            continue;

        case CON_XORVAR:
            insptr++;
            Gv_XorVar(script[insptr],script[insptr+1]);
            insptr += 2;
            continue;

        case CON_SETVARVAR:
            insptr++;
            {
                var/*int32_t */j=script[insptr++];
                if ((aGameVars[j].dwFlags & (GAMEVAR_USER_MASK|GAMEVAR_PTR_MASK)) == 0)
                {
                    aGameVars[j].val.lValue = Gv_GetVarX(script[insptr++]);
                    continue;
                }

                Gv_SetVarX(j, Gv_GetVarX(script[insptr++]));
            }
            continue;

        case CON_RANDVARVAR:
            insptr++;
            {
                var/*int32_t */j=script[insptr++];
                Gv_SetVarX(j,mulscale16(krand(), Gv_GetVarX(script[insptr++])+1));
            }
            continue;

        case CON_DISPLAYRANDVARVAR:
            insptr++;
            {
                var/*int32_t */j=script[insptr++];
                Gv_SetVarX(j,mulscale15(system_15bit_rand(), Gv_GetVarX(script[insptr++])+1));
            }
            continue;

        case CON_GMAXAMMO:
            insptr++;
            {
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                if (unsigned(j)>=MAX_WEAPONS)
                {
                    CON_ERRPRINTF("Invalid weapon ID %d\n", j);
                    insptr++;
                    continue;
                }
                Gv_SetVarX(script[insptr++], g_player[vm.g_p].ps.max_ammo_amount[j]);
            }
            continue;

        case CON_SMAXAMMO:
            insptr++;
            {
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                if (unsigned(j)>=MAX_WEAPONS)
                {
                    CON_ERRPRINTF("Invalid weapon ID %d\n", j);
                    insptr++;
                    continue;
                }
                g_player[vm.g_p].ps.max_ammo_amount[j]=Gv_GetVarX(script[insptr++]);
            }
            continue;

        case CON_MULVARVAR:
            insptr++;
            {
                var/*int32_t */j=script[insptr++];

                Gv_MulVar(j, Gv_GetVarX(script[insptr++]));
            }
            continue;

        case CON_DIVVARVAR:
            insptr++;
            {
                var/*int32_t */j=script[insptr++];
                var/*int32_t */l2=Gv_GetVarX(script[insptr++]);

                if (!l2)
                {
                    CON_ERRPRINTF("divide by zero!\n");
                    continue;
                }

                Gv_DivVar(j, l2);
                continue;
            }

        case CON_MODVARVAR:
            insptr++;
            {
                var/*int32_t */j=script[insptr++];
                var/*int32_t */l2=Gv_GetVarX(script[insptr++]);

                if (!l2)
                {
                    CON_ERRPRINTF("mod by zero!\n");
                    continue;
                }


                Gv_ModVar(j, l2);
                continue;
            }

        case CON_ANDVARVAR:
            insptr++;
            {
                var/*int32_t */j=script[insptr++];
                Gv_AndVar(j, Gv_GetVarX(script[insptr++]));
            }
            continue;

        case CON_XORVARVAR:
            insptr++;
            {
                var/*int32_t */j=script[insptr++];
                Gv_XorVar(j, Gv_GetVarX(script[insptr++]));
            }
            continue;

        case CON_ORVARVAR:
            insptr++;
            {
                var/*int32_t */j=script[insptr++];
                Gv_OrVar(j, Gv_GetVarX(script[insptr++]));
            }
            continue;

        case CON_SUBVAR:
            insptr++;
            Gv_SubVar(script[insptr], script[insptr+1]);
            insptr += 2;
            continue;

        case CON_SUBVARVAR:
            insptr++;
            {
                var/*int32_t */j=script[insptr++];
                Gv_SubVar(j, Gv_GetVarX(script[insptr++]));
            }
            continue;

        case CON_ADDVAR:
            insptr++;
            Gv_AddVar(script[insptr], script[insptr+1]);
            insptr += 2;
            continue;

        case CON_SHIFTVARL:
            insptr++;
            if ((aGameVars[script[insptr]].dwFlags & (GAMEVAR_USER_MASK|GAMEVAR_PTR_MASK)) == 0)
            {
                aGameVars[script[insptr]].val.lValue <<= script[insptr+1];
                insptr += 2;
                continue;
            }
            Gv_SetVarX(script[insptr], Gv_GetVarX(script[insptr]) << script[insptr+1]);
            insptr += 2;
            continue;

        case CON_SHIFTVARR:
            insptr++;
            if ((aGameVars[script[insptr]].dwFlags & (GAMEVAR_USER_MASK|GAMEVAR_PTR_MASK)) == 0)
            {
                aGameVars[script[insptr]].val.lValue >>= script[insptr+1];
                insptr += 2;
                continue;
            }
            Gv_SetVarX(script[insptr], Gv_GetVarX(script[insptr]) >> script[insptr+1]);
            insptr += 2;
            continue;

        case CON_SIN:
            insptr++;
            Gv_SetVarX(script[insptr], sintable[Gv_GetVarX(script[insptr+1])&2047]);
            insptr += 2;
            continue;

        case CON_COS:
            insptr++;
            Gv_SetVarX(script[insptr], sintable[(Gv_GetVarX(script[insptr+1])+512)&2047]);
            insptr += 2;
            continue;

        case CON_ADDVARVAR:
            insptr++;
            {
                var/*int32_t */j=script[insptr++];
                Gv_AddVar(j, Gv_GetVarX(script[insptr++]));
            }
            continue;

        case CON_SPGETLOTAG:
            insptr++;
            aGameVars[g_iLoTagID].val.lValue = vm.g_sp.lotag;
            continue;

        case CON_SPGETHITAG:
            insptr++;
            aGameVars[g_iHiTagID].val.lValue = vm.g_sp.hitag;
            continue;

        case CON_SECTGETLOTAG:
            insptr++;
            aGameVars[g_iLoTagID].val.lValue = sector[vm.g_sp.sectnum].lotag;
            continue;

        case CON_SECTGETHITAG:
            insptr++;
            aGameVars[g_iHiTagID].val.lValue = sector[vm.g_sp.sectnum].hitag;
            continue;

        case CON_GETTEXTUREFLOOR:
            insptr++;
            aGameVars[g_iTextureID].val.lValue = sector[vm.g_sp.sectnum].floorpicnum;
            continue;

        case CON_STARTTRACK:
        case CON_STARTTRACKVAR:
            insptr++;
            {
                var/*int32_t */level = (tw == CON_STARTTRACK) ? script[insptr++] :
                    Gv_GetVarX(script[insptr++]);

                if (G_StartTrack(level))
                    CON_ERRPRINTF("invalid level %d or null music for volume %d level %d\n",
                                  level, ud.volume_number, level);
            }
            continue;

        case CON_ACTIVATECHEAT:
            insptr++;
            {
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                if (numplayers != 1 || !(g_player[myconnectindex].ps.gm & MODE_GAME))
                {
                    CON_ERRPRINTF("not in a single-player game.\n");
                    continue;
                }
                osdcmd_cheatsinfo_stat.cheatnum = j;
            }
            continue;

        case CON_SETGAMEPALETTE:
            insptr++;
            P_SetGamePalette(g_player[vm.g_p].ps, Gv_GetVarX(script[insptr++]), 2+16);
            continue;

        case CON_GETTEXTURECEILING:
            insptr++;
            aGameVars[g_iTextureID].val.lValue = sector[vm.g_sp.sectnum].ceilingpicnum;
            continue;

        case CON_IFVARVARAND:
            insptr++;
            {
                var/*int32_t */j = Gv_GetVarX(script[insptr++]);
                j &= Gv_GetVarX(script[insptr++]);
                insptr--;
                VM_CONDITIONAL(j);
            }
            continue;

        case CON_IFVARVAROR:
            insptr++;
            {
                var/*int32_t */j = Gv_GetVarX(script[insptr++]);
                j |= Gv_GetVarX(script[insptr++]);
                insptr--;
                VM_CONDITIONAL(j);
            }
            continue;

        case CON_IFVARVARXOR:
            insptr++;
            {
                var/*int32_t */j = Gv_GetVarX(script[insptr++]);
                j ^= Gv_GetVarX(script[insptr++]);
                insptr--;
                VM_CONDITIONAL(j);
            }
            continue;

        case CON_IFVARVAREITHER:
            insptr++;
            {
                var/*int32_t */j = Gv_GetVarX(script[insptr++]);
                var/*nt32_t */l = Gv_GetVarX(script[insptr++]);
                insptr--;
                VM_CONDITIONAL(j || l);
            }
            continue;

        case CON_IFVARVARN:
            insptr++;
            {
                var/*int32_t */j = Gv_GetVarX(script[insptr++]);
                j = (j != Gv_GetVarX(script[insptr++]))?1:0;
                insptr--;
                VM_CONDITIONAL(j);
            }
            continue;

        case CON_IFVARVARE:
            insptr++;
            {
                var/*int32_t */j = Gv_GetVarX(script[insptr++]);
                j = (j == Gv_GetVarX(script[insptr++]))?1:0;
                insptr--;
                VM_CONDITIONAL(j);
            }
            continue;

        case CON_IFVARVARG:
            insptr++;
            {
                var/*int32_t */j = Gv_GetVarX(script[insptr++]);
                j = (j > Gv_GetVarX(script[insptr++]))?1:0;
                insptr--;
                VM_CONDITIONAL(j);
            }
            continue;

        case CON_IFVARVARL:
            insptr++;
            {
                var/*int32_t */j = Gv_GetVarX(script[insptr++]);
                j = (j < Gv_GetVarX(script[insptr++]))?1:0;
                insptr--;
                VM_CONDITIONAL(j);
            }
            continue;

        case CON_IFVARE:
            insptr++;
            {
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                VM_CONDITIONAL(j == script[insptr]);
            }
            continue;

        case CON_IFVARN:
            insptr++;
            {
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                VM_CONDITIONAL(j != script[insptr]);
            }
            continue;

        case CON_WHILEVARN:
        {
            var savedinsptr=insptr+2;//intptr_t *savedinsptr=insptr+2;
            var/*int32_t */j:number;
            do
            {
                insptr=savedinsptr;
                j = (Gv_GetVarX(script[insptr-1]) != script[insptr])?1:0;
                VM_CONDITIONAL(j);
            }
            while (j);
            continue;
        }

        case CON_WHILEVARVARN:
        {
            var/*int32_t */j:number;
            var savedinsptr=insptr+2;
            do
            {
                insptr=savedinsptr;
                j = Gv_GetVarX(script[insptr-1]);
                j = (j != Gv_GetVarX(script[insptr++]))?1:0;
                insptr--;
                VM_CONDITIONAL(j);
            }
            while (j);
            continue;
        }

        case CON_IFVARAND:
            insptr++;
            {
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                VM_CONDITIONAL(j & script[insptr]);
            }
            continue;

        case CON_IFVAROR:
            insptr++;
            {
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                VM_CONDITIONAL(j | script[insptr]);
            }
            continue;

        case CON_IFVARXOR:
            insptr++;
            {
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                VM_CONDITIONAL(j ^ script[insptr]);
            }
            continue;

        case CON_IFVAREITHER:
            insptr++;
            {
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                VM_CONDITIONAL(j || script[insptr]);
            }
            continue;

        case CON_IFVARG:
            insptr++;
            {
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                VM_CONDITIONAL(j > script[insptr]);
            }
            continue;

        case CON_IFVARL:
            insptr++;
            {
                var/*int32_t */j=Gv_GetVarX(script[insptr++]);
                VM_CONDITIONAL(j < script[insptr]);
            }
            continue;

        case CON_IFPHEALTHL:
            insptr++;
            VM_CONDITIONAL(sprite[g_player[vm.g_p].ps.i].extra < script[insptr]);
            continue;

        case CON_IFPINVENTORY:
            insptr++;
            {
                var/*int32_t */j = 0;
                var ps = g_player[vm.g_p].ps;

                switch (script[insptr++])
                {
                case GET_STEROIDS:
                    if (ps.inv_amount[GET_STEROIDS] != script[insptr])
                        j = 1;
                    break;
                case GET_SHIELD:
                    if (ps.inv_amount[GET_SHIELD] != ps.max_shield_amount)
                        j = 1;
                    break;
                case GET_SCUBA:
                    if (ps.inv_amount[GET_SCUBA] != script[insptr]) j = 1;
                    break;
                case GET_HOLODUKE:
                    if (ps.inv_amount[GET_HOLODUKE] != script[insptr]) j = 1;
                    break;
                case GET_JETPACK:
                    if (ps.inv_amount[GET_JETPACK] != script[insptr]) j = 1;
                    break;
                case GET_ACCESS:
                    switch (vm.g_sp.pal)
                    {
                    case  0:
                        if (ps.got_access&1) j = 1;
                        break;
                    case 21:
                        if (ps.got_access&2) j = 1;
                        break;
                    case 23:
                        if (ps.got_access&4) j = 1;
                        break;
                    }
                    break;
                case GET_HEATS:
                    if (ps.inv_amount[GET_HEATS] != script[insptr]) j = 1;
                    break;
                case GET_FIRSTAID:
                    if (ps.inv_amount[GET_FIRSTAID] != script[insptr]) j = 1;
                    break;
                case GET_BOOTS:
                    if (ps.inv_amount[GET_BOOTS] != script[insptr]) j = 1;
                    break;
                default:
                    CON_ERRPRINTF("invalid inventory ID: %d\n", /*(int32_t)*/script[insptr-1]);
                }

                VM_CONDITIONAL(j);
                continue;
            }

        case CON_PSTOMP:
            insptr++;
            {
                var ps = g_player[vm.g_p].ps;

                if (ps.knee_incs == 0 && sprite[ps.i].xrepeat >= 40)
                    if (cansee(vm.g_sp.x,vm.g_sp.y,vm.g_sp.z-(4<<8),vm.g_sp.sectnum,ps.pos.x,
                               ps.pos.y,ps.pos.z+(16<<8),sprite[ps.i].sectnum))
                    {
                        var/*int32_t */j = playerswhenstarted-1;

                        for (; j>=0; j--)
                        {
                            if (g_player[j].ps.actorsqu == vm.g_i)
                                break;
                        }

                        if (j == -1)
                        {
                            ps.knee_incs = 1;
                            if (ps.weapon_pos == 0)
                                ps.weapon_pos = -1;
                            ps.actorsqu = vm.g_i;
                        }
                    }

                continue;
            }

        case CON_IFAWAYFROMWALL:
        {
            var/*int16_t */s1=new R(vm.g_sp.sectnum);
            var/*int32_t */j = 0;

            updatesector(vm.g_sp.x+108,vm.g_sp.y+108,s1);
            if (s1.$ == vm.g_sp.sectnum)
            {
                updatesector(vm.g_sp.x-108,vm.g_sp.y-108,s1);
                if (s1.$ == vm.g_sp.sectnum)
                {
                    updatesector(vm.g_sp.x+108,vm.g_sp.y-108,s1);
                    if (s1.$ == vm.g_sp.sectnum)
                    {
                        updatesector(vm.g_sp.x-108,vm.g_sp.y+108,s1);
                        if (s1.$ == vm.g_sp.sectnum)
                            j = 1;
                    }
                }
            }
            VM_CONDITIONAL(j);
        }
        continue;

        case CON_QUOTE:
            insptr++;

            if (unsigned(script[insptr]) >= MAXQUOTES)
            {
                CON_ERRPRINTF("invalid quote ID %d\n", /*(int32_t)*/(script[insptr]));
                insptr++;
                continue;
            }

            if ((ScriptQuotes[script[insptr]] == NULL))
            {
                CON_ERRPRINTF("null quote %d\n", /*(int32_t)*/script[insptr]);
                insptr++;
                continue;
            }

            if (unsigned(vm.g_p) >= MAXPLAYERS)
            {
                CON_ERRPRINTF("bad player for quote %d: (%d)\n", /*(int32_t)*/script[insptr],vm.g_p);
                insptr++;
                continue;
            }

            P_DoQuote(script[insptr++]|MAXQUOTES,g_player[vm.g_p].ps);
            continue;

        case CON_USERQUOTE:
            insptr++;
            {
                var/*int32_t */i=Gv_GetVarX(script[insptr++]);

                if (unsigned(i) >= MAXQUOTES)
                {
                    CON_ERRPRINTF("invalid quote ID %d\n", i);
                    insptr++;
                    continue;
                }

                if ((ScriptQuotes[i] == NULL))
                {
                    CON_ERRPRINTF("null quote %d\n", i);
                    continue;
                }
                G_AddUserQuote(ScriptQuotes[i]);
            }
            continue;

        case CON_ECHO:
            insptr++;
            {
                var/*int32_t */i=Gv_GetVarX(script[insptr++]);

                if (unsigned(i) >= MAXQUOTES)
                {
                    CON_ERRPRINTF("invalid quote ID %d\n", i);
                    insptr++;
                    continue;
                }

                if ((ScriptQuotes[i] == NULL))
                {
                    CON_ERRPRINTF("null quote %d\n", i);
                    continue;
                }
                OSD_Printf("%s\n",ScriptQuotes[i]);
            }
//            continue;

        case CON_IFINOUTERSPACE:
            VM_CONDITIONAL(G_CheckForSpaceFloor(vm.g_sp.sectnum));
            continue;

        case CON_IFNOTMOVING:
            VM_CONDITIONAL((actor[vm.g_i].movflag&49152) > 16384);
            continue;

        case CON_RESPAWNHITAG:
            insptr++;
            switch (DYNAMICTILEMAP(vm.g_sp.picnum))
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
                if (vm.g_sp.yvel) G_OperateRespawns(vm.g_sp.yvel);
                break;
            default:
//                if (vm.g_sp.hitag >= 0)
                    G_OperateRespawns(vm.g_sp.hitag);
                break;
            }
            continue;

        case CON_IFSPRITEPAL:
            insptr++;
            VM_CONDITIONAL(vm.g_sp.pal == script[insptr]);
            continue;

        case CON_IFANGDIFFL:
            insptr++;
            {
                var/*int32_t */j = klabs(G_GetAngleDelta(g_player[vm.g_p].ps.ang,vm.g_sp.ang));
                VM_CONDITIONAL(j <= script[insptr]);
            }
            continue;

        case CON_IFNOSOUNDS:
        {
            var/*int32_t */j = !A_CheckAnySoundPlaying(vm.g_i)?1:0;
            VM_CONDITIONAL(j);
        }
        continue;

        case CON_SPRITEFLAGS:
            insptr++;
            actor[vm.g_i].flags = Gv_GetVarX(script[insptr++]);
            continue;

        case CON_GETTICKS:
            insptr++;
            Gv_SetVarX(script[insptr++], getticks());
            continue;

        case CON_GETCURRADDRESS:
            insptr++;
            {
                var/*int32_t */j=script[insptr++];
                Gv_SetVarX(j, /*(intptr_t)(insptr-script)*/insptr);
            }
            continue;

        case CON_JUMP:  // XXX XXX XXX
            insptr++;
            {
                var/*int32_t */j = Gv_GetVarX(script[insptr++]);
                insptr = j;//(intptr_t *)(j+script);
            }
            continue;

        default:
            VM_ScriptInfo();

            todoThrow(tw + " missing");
            G_GameExit("An error has occurred in the EDuke32 virtual machine.\n\n"+
                       "If you are an end user, please e-mail the file eduke32.log\n"+
                       "along with links to any mods you're using to terminx@gmail.com.\n\n"+
                       "If you are a mod developer, please attach all of your CON files\n"+
                       "along with instructions on how to reproduce this error.\n\n"+
                       "Thank you!");
            break;
        }
    }
}

// NORECURSE
function A_LoadActor(iActor: number):void
{
    vm.g_i = iActor;    // Sprite ID
    vm.g_p = -1; // iPlayer;    // Player ID
    vm.g_x = -1; // lDist;    // ?
    vm.g_sp = sprite[vm.g_i];    // Pointer to sprite structure
    vm.g_t = actor[vm.g_i].t_data;   // Sprite's 'extra' data

    if (!g_tile[vm.g_sp.picnum].loadPtr)
        return;

    vm.g_flags &= ~(VM_RETURN|VM_KILL|VM_NOEXECUTE);

    if (vm.g_sp.sectnum >= MAXSECTORS)
    {
        //      if(A_CheckEnemySprite(vm.g_sp))
        //          g_player[vm.g_p].ps.actors_killed++;
        A_DeleteSprite(vm.g_i);
        return;
    }

    insptr = g_tile[vm.g_sp.picnum].loadPtr;
    VM_Execute(1);
    insptr = NULL;

    if (vm.g_flags & VM_KILL)
        A_DeleteSprite(vm.g_i);

}
//#endif

// NORECURSE
function A_Execute(/*int32_t */iActor:number,/*int32_t */iPlayer:number,/*int32_t */lDist:number):void
{
//#ifdef LUNATIC
//    int32_t killit=0;
//#else
    var /*intptr_t */actionofs:number, /***/actionptr:Uint32Array;
//#endif
    var tempvm = new vmstate_t( iActor, iPlayer, lDist, actor[iActor].t_data,
                         sprite[iActor], 0
                       );

/*
    if (g_netClient && A_CheckSpriteFlags(iActor, SPRITE_NULL))
    {
        A_DeleteSprite(iActor);
        return;
    }
*/

    if (g_netServer || g_netClient)
        randomseed = ticrandomseed;

    vm.copyFrom(tempvm);// Bmemcpy(&vm, &tempvm, sizeof(vmstate_t));

    if (unsigned(vm.g_sp.sectnum) >= MAXSECTORS)
    {
        if (A_CheckEnemySprite(vm.g_sp))
            g_player[vm.g_p].ps.actors_killed++;
        A_DeleteSprite(vm.g_i);
        return;
    }

    /* Qbix: Changed variables to be aware of the sizeof script[insptr]
     * (whether it is int32_t vs intptr_t), Although it is specifically cast to intptr_t*
     * which might be corrected if the code is converted to use offsets */
    /* Helixhorned: let's do away with intptr_t's... */
//#if !defined LUNATIC
    actionofs = AC_ACTION_ID(vm.g_t);
    actionptr = (actionofs!=0 && actionofs+4 < unsigned(g_scriptSize)) ?
        script.subarray(actionofs) : NULL;

    if (actionptr != NULL)
//#endif
    {
////#if !defined LUNATIC
        var /*const int32_t*/ action_frames = actionptr[1];
        var /*const int32_t*/ action_incval = actionptr[3];
        var /*const int32_t*/ action_delay = actionptr[4];
////#else
////        const int32_t action_frames = actor[vm.g_i].ac.numframes;
////        const int32_t action_incval = actor[vm.g_i].ac.incval;
////        const int32_t action_delay = actor[vm.g_i].ac.delay;
////#endif
        //uint16_t *actionticsptr = &AC_ACTIONTICS(vm.g_sp, &actor[vm.g_i]);
        vm.g_sp.lotag /**actionticsptr */+= TICSPERFRAME;

        if (vm.g_sp.lotag > action_delay)
        {
            vm.g_t[2]++;//AC_ACTION_COUNT(vm.g_t)++;
            vm.g_sp.lotag/**actionticsptr*/ = 0;

            vm.g_t[3] += action_incval//AC_CURFRAME(vm.g_t) += action_incval;
        }

        if (klabs(AC_CURFRAME(vm.g_t)) >= klabs(action_frames * action_incval))
            vm.g_t[3] = 0;//AC_CURFRAME(vm.g_t) = 0;
    }

//#ifdef LUNATIC
//    {
//        double t = gethitickms();
//        const int32_t picnum = vm.g_sp.picnum;

//        if (L_IsInitialized(&g_ElState) && El_HaveActor(picnum))
//            killit = (El_CallActor(&g_ElState, picnum, iActor, iPlayer, lDist)==1);

//        t = gethitickms()-t;
//        g_actorTotalMs[picnum] += t;
//        g_actorMinMs[picnum] = min(g_actorMinMs[picnum], t);
//        g_actorMaxMs[picnum] = max(g_actorMaxMs[picnum], t);
//        g_actorCalls[picnum]++;
//    }
//#else
    insptr = 4 + (g_tile[vm.g_sp.picnum].execPtr);
    VM_Execute(1);
    insptr = NULL;
//#endif

    if ((vm.g_flags & VM_KILL)
//#ifdef LUNATIC
//        || killit
//#endif
        )
    {
        VM_KillIt(iActor, iPlayer);
        return;
    }

    VM_Move();

    if (vm.g_sp.statnum == STAT_STANDABLE)
        switch (DYNAMICTILEMAP(vm.g_sp.picnum))
        {
        case RUBBERCAN__STATIC:
        case EXPLODINGBARREL__STATIC:
        case WOODENHORSE__STATIC:
        case HORSEONSIDE__STATIC:
        case CANWITHSOMETHING__STATIC:
        case FIREBARREL__STATIC:
        case NUKEBARREL__STATIC:
        case NUKEBARRELDENTED__STATIC:
        case NUKEBARRELLEAKED__STATIC:
        case TRIPBOMB__STATIC:
        case EGG__STATIC:
            if (actor[vm.g_i].timetosleep > 1)
                actor[vm.g_i].timetosleep--;
            else if (actor[vm.g_i].timetosleep == 1)
                changespritestat(vm.g_i,STAT_ZOMBIEACTOR);
        default:
            return;
        }

    if (vm.g_sp.statnum != STAT_ACTOR)
        return;

    if (A_CheckEnemySprite(vm.g_sp))
    {
        if (vm.g_sp.xrepeat > 60) return;
        if (ud.respawn_monsters == 1 && vm.g_sp.extra <= 0) return;
    }
    else if (ud.respawn_items == 1 && (vm.g_sp.cstat&32768)) return;

    if (A_CheckSpriteFlags(vm.g_i, SPRITE_USEACTIVATOR) && sector[vm.g_sp.sectnum].lotag & 16384)
        changespritestat(vm.g_i, STAT_ZOMBIEACTOR);
    else if (actor[vm.g_i].timetosleep > 1)
        actor[vm.g_i].timetosleep--;
    else if (actor[vm.g_i].timetosleep == 1)
        changespritestat(vm.g_i, STAT_ZOMBIEACTOR);
}

//void G_SaveMapState(void)
//{
//    map_t *mapinfo = &MapInfo[ud.volume_number*MAXLEVELS+ud.level_number];
//    mapstate_t *save;

//    if (mapinfo.savedstate == NULL)
//        mapinfo.savedstate = (mapstate_t *)Bcalloc(1,sizeof(mapstate_t));
//    save = mapinfo.savedstate;

//    if (save != NULL)
//    {
//        var/*int32_t */i;

//        Bmemcpy(&save.numwalls,&numwalls,sizeof(numwalls));
//        Bmemcpy(&save.wall[0],&wall[0],sizeof(walltype)*MAXWALLS);
//        Bmemcpy(&save.numsectors,&numsectors,sizeof(numsectors));
//        Bmemcpy(&save.sector[0],&sector[0],sizeof(sectortype)*MAXSECTORS);
//        Bmemcpy(&save.sprite[0],&sprite[0],sizeof(spritetype)*MAXSPRITES);

//        // If we're in EVENT_ANIMATESPRITES, we'll be saving pointer values to disk :-/
//#if !defined LUNATIC
//        if (g_currentEventExec == EVENT_ANIMATESPRITES)
//            initprintf("Line %d: savemapstate called from EVENT_ANIMATESPRITES. WHY?\n", g_errorLineNum);
//#endif
//        Bmemcpy(&save.spriteext[0],&spriteext[0],sizeof(spriteext_t)*MAXSPRITES);

//        save.numsprites = Numsprites;
//        save.tailspritefree = tailspritefree;
//        Bmemcpy(&save.headspritesect[0],&headspritesect[0],sizeof(headspritesect));
//        Bmemcpy(&save.prevspritesect[0],&prevspritesect[0],sizeof(prevspritesect));
//        Bmemcpy(&save.nextspritesect[0],&nextspritesect[0],sizeof(nextspritesect));
//        Bmemcpy(&save.headspritestat[0],&headspritestat[0],sizeof(headspritestat));
//        Bmemcpy(&save.prevspritestat[0],&prevspritestat[0],sizeof(prevspritestat));
//        Bmemcpy(&save.nextspritestat[0],&nextspritestat[0],sizeof(nextspritestat));
//#ifdef YAX_ENABLE
//        Bmemcpy(&save.numyaxbunches, &numyaxbunches, sizeof(numyaxbunches));
//# if !defined NEW_MAP_FORMAT
//        Bmemcpy(save.yax_bunchnum, yax_bunchnum, sizeof(yax_bunchnum));
//        Bmemcpy(save.yax_nextwall, yax_nextwall, sizeof(yax_nextwall));
//# endif
//#endif
//        Bmemcpy(&save.actor[0],&actor[0],sizeof(actor_t)*MAXSPRITES);

//        Bmemcpy(&save.g_numCyclers,&g_numCyclers,sizeof(g_numCyclers));
//        Bmemcpy(&save.cyclers[0][0],&cyclers[0][0],sizeof(cyclers));
//        Bmemcpy(&save.g_playerSpawnPoints[0],&g_playerSpawnPoints[0],sizeof(g_playerSpawnPoints));
//        Bmemcpy(&save.g_numAnimWalls,&g_numAnimWalls,sizeof(g_numAnimWalls));
//        Bmemcpy(&save.SpriteDeletionQueue[0],&SpriteDeletionQueue[0],sizeof(SpriteDeletionQueue));
//        Bmemcpy(&save.g_spriteDeleteQueuePos,&g_spriteDeleteQueuePos,sizeof(g_spriteDeleteQueuePos));
//        Bmemcpy(&save.animwall[0],&animwall[0],sizeof(animwall));
//        Bmemcpy(&save.msx[0],&msx[0],sizeof(msx));
//        Bmemcpy(&save.msy[0],&msy[0],sizeof(msy));
//        Bmemcpy(&save.g_mirrorWall[0],&g_mirrorWall[0],sizeof(g_mirrorWall));
//        Bmemcpy(&save.g_mirrorSector[0],&g_mirrorSector[0],sizeof(g_mirrorSector));
//        Bmemcpy(&save.g_mirrorCount,&g_mirrorCount,sizeof(g_mirrorCount));
//        Bmemcpy(&save.show2dsector[0],&show2dsector[0],sizeof(show2dsector));
//        Bmemcpy(&save.g_numClouds,&g_numClouds,sizeof(g_numClouds));
//        Bmemcpy(&save.clouds[0],&clouds[0],sizeof(clouds));
//        Bmemcpy(&save.cloudx[0],&cloudx[0],sizeof(cloudx));
//        Bmemcpy(&save.cloudy[0],&cloudy[0],sizeof(cloudy));
//        Bmemcpy(&save.pskyoff[0],&pskyoff[0],sizeof(pskyoff));
//        Bmemcpy(&save.pskybits,&pskybits,sizeof(pskybits));
//        Bmemcpy(&save.animategoal[0],&animategoal[0],sizeof(animategoal));
//        Bmemcpy(&save.animatevel[0],&animatevel[0],sizeof(animatevel));
//        Bmemcpy(&save.g_animateCount,&g_animateCount,sizeof(g_animateCount));
//        Bmemcpy(&save.animatesect[0],&animatesect[0],sizeof(animatesect));

//        G_Util_PtrToIdx(animateptr, g_animateCount, sector, P2I_FWD);
//        Bmemcpy(&save.animateptr[0],&animateptr[0],sizeof(animateptr));
//        G_Util_PtrToIdx(animateptr, g_animateCount, sector, P2I_BACK);

//        Bmemcpy(&save.g_numPlayerSprites,&g_numPlayerSprites,sizeof(g_numPlayerSprites));
//        Bmemcpy(&save.g_earthquakeTime,&g_earthquakeTime,sizeof(g_earthquakeTime));
//        Bmemcpy(&save.lockclock,&lockclock,sizeof(lockclock));
//        Bmemcpy(&save.randomseed,&randomseed,sizeof(randomseed));
//        Bmemcpy(&save.g_globalRandom,&g_globalRandom,sizeof(g_globalRandom));
//#if !defined LUNATIC
//        for (i=g_gameVarCount-1; i>=0; i--)
//        {
//            if (aGameVars[i].dwFlags & GAMEVAR_NORESET) continue;
//            if (aGameVars[i].dwFlags & GAMEVAR_PERPLAYER)
//            {
//                if (!save.vars[i])
//                    save.vars[i] = (intptr_t *)Bcalloc(MAXPLAYERS,sizeof(intptr_t));
//                Bmemcpy(&save.vars[i][0],&aGameVars[i].val.plValues[0],sizeof(intptr_t) * MAXPLAYERS);
//            }
//            else if (aGameVars[i].dwFlags & GAMEVAR_PERACTOR)
//            {
//                if (!save.vars[i])
//                    save.vars[i] = (intptr_t *)Bcalloc(MAXSPRITES,sizeof(intptr_t));
//                Bmemcpy(&save.vars[i][0],&aGameVars[i].val.plValues[0],sizeof(intptr_t) * MAXSPRITES);
//            }
//            else save.vars[i] = (intptr_t *)aGameVars[i].val.lValue;
//        }
//#endif
//        ototalclock = totalclock;
//    }
//}

//void G_RestoreMapState(void)
//{
//    mapstate_t *save = MapInfo[ud.volume_number*MAXLEVELS+ud.level_number].savedstate;

//    if (save != NULL)
//    {
//        var/*int32_t */i, x;
//        char phealth[MAXPLAYERS];

//        for (i=0; i<playerswhenstarted; i++)
//            phealth[i] = sprite[g_player[i].ps.i].extra;

//        pub = NUMPAGES;
//        pus = NUMPAGES;
//        G_UpdateScreenArea();

//        Bmemcpy(&numwalls,&save.numwalls,sizeof(numwalls));
//        Bmemcpy(&wall[0],&save.wall[0],sizeof(walltype)*MAXWALLS);
//        Bmemcpy(&numsectors,&save.numsectors,sizeof(numsectors));
//        Bmemcpy(&sector[0],&save.sector[0],sizeof(sectortype)*MAXSECTORS);
//        Bmemcpy(&sprite[0],&save.sprite[0],sizeof(spritetype)*MAXSPRITES);
//        Bmemcpy(&spriteext[0],&save.spriteext[0],sizeof(spriteext_t)*MAXSPRITES);

//        // If we're restoring from EVENT_ANIMATESPRITES, all spriteext[].tspr
//        // will be overwritten, so NULL them.
//#if !defined LUNATIC
//        if (g_currentEventExec == EVENT_ANIMATESPRITES)
//        {
//            initprintf("Line %d: loadmapstate called from EVENT_ANIMATESPRITES. WHY?\n",g_errorLineNum);
//            for (i=0; i<MAXSPRITES; i++)
//                spriteext[i].tspr = NULL;
//        }
//#endif
//        Numsprites = save.numsprites;
//        tailspritefree = save.tailspritefree;
//        Bmemcpy(&headspritesect[0],&save.headspritesect[0],sizeof(headspritesect));
//        Bmemcpy(&prevspritesect[0],&save.prevspritesect[0],sizeof(prevspritesect));
//        Bmemcpy(&nextspritesect[0],&save.nextspritesect[0],sizeof(nextspritesect));
//        Bmemcpy(&headspritestat[0],&save.headspritestat[0],sizeof(headspritestat));
//        Bmemcpy(&prevspritestat[0],&save.prevspritestat[0],sizeof(prevspritestat));
//        Bmemcpy(&nextspritestat[0],&save.nextspritestat[0],sizeof(nextspritestat));
//#ifdef YAX_ENABLE
//        Bmemcpy(&numyaxbunches, &save.numyaxbunches, sizeof(numyaxbunches));
//# if !defined NEW_MAP_FORMAT
//        Bmemcpy(yax_bunchnum, save.yax_bunchnum, sizeof(yax_bunchnum));
//        Bmemcpy(yax_nextwall, save.yax_nextwall, sizeof(yax_nextwall));
//# endif
//#endif
//        Bmemcpy(&actor[0],&save.actor[0],sizeof(actor_t)*MAXSPRITES);

//        Bmemcpy(&g_numCyclers,&save.g_numCyclers,sizeof(g_numCyclers));
//        Bmemcpy(&cyclers[0][0],&save.cyclers[0][0],sizeof(cyclers));
//        Bmemcpy(&g_playerSpawnPoints[0],&save.g_playerSpawnPoints[0],sizeof(g_playerSpawnPoints));
//        Bmemcpy(&g_numAnimWalls,&save.g_numAnimWalls,sizeof(g_numAnimWalls));
//        Bmemcpy(&SpriteDeletionQueue[0],&save.SpriteDeletionQueue[0],sizeof(SpriteDeletionQueue));
//        Bmemcpy(&g_spriteDeleteQueuePos,&save.g_spriteDeleteQueuePos,sizeof(g_spriteDeleteQueuePos));
//        Bmemcpy(&animwall[0],&save.animwall[0],sizeof(animwall));
//        Bmemcpy(&msx[0],&save.msx[0],sizeof(msx));
//        Bmemcpy(&msy[0],&save.msy[0],sizeof(msy));
//        Bmemcpy(&g_mirrorWall[0],&save.g_mirrorWall[0],sizeof(g_mirrorWall));
//        Bmemcpy(&g_mirrorSector[0],&save.g_mirrorSector[0],sizeof(g_mirrorSector));
//        Bmemcpy(&g_mirrorCount,&save.g_mirrorCount,sizeof(g_mirrorCount));
//        Bmemcpy(&show2dsector[0],&save.show2dsector[0],sizeof(show2dsector));
//        Bmemcpy(&g_numClouds,&save.g_numClouds,sizeof(g_numClouds));
//        Bmemcpy(&clouds[0],&save.clouds[0],sizeof(clouds));
//        Bmemcpy(&cloudx[0],&save.cloudx[0],sizeof(cloudx));
//        Bmemcpy(&cloudy[0],&save.cloudy[0],sizeof(cloudy));
//        Bmemcpy(&pskyoff[0],&save.pskyoff[0],sizeof(pskyoff));
//        Bmemcpy(&pskybits,&save.pskybits,sizeof(pskybits));
//        Bmemcpy(&animategoal[0],&save.animategoal[0],sizeof(animategoal));
//        Bmemcpy(&animatevel[0],&save.animatevel[0],sizeof(animatevel));
//        Bmemcpy(&g_animateCount,&save.g_animateCount,sizeof(g_animateCount));
//        Bmemcpy(&animatesect[0],&save.animatesect[0],sizeof(animatesect));

//        Bmemcpy(&animateptr[0],&save.animateptr[0],sizeof(animateptr));
//        G_Util_PtrToIdx(animateptr, g_animateCount, sector, P2I_BACK);

//        Bmemcpy(&g_numPlayerSprites,&save.g_numPlayerSprites,sizeof(g_numPlayerSprites));
//        Bmemcpy(&g_earthquakeTime,&save.g_earthquakeTime,sizeof(g_earthquakeTime));
//        Bmemcpy(&lockclock,&save.lockclock,sizeof(lockclock));
//        Bmemcpy(&randomseed,&save.randomseed,sizeof(randomseed));
//        Bmemcpy(&g_globalRandom,&save.g_globalRandom,sizeof(g_globalRandom));
//#if !defined LUNATIC
//        for (i=g_gameVarCount-1; i>=0; i--)
//        {
//            if (aGameVars[i].dwFlags & GAMEVAR_NORESET) continue;
//            if (aGameVars[i].dwFlags & GAMEVAR_PERPLAYER)
//            {
//                if (!save.vars[i]) continue;
//                Bmemcpy(&aGameVars[i].val.plValues[0],&save.vars[i][0],sizeof(intptr_t) * MAXPLAYERS);
//            }
//            else if (aGameVars[i].dwFlags & GAMEVAR_PERACTOR)
//            {
//                if (!save.vars[i]) continue;
//                Bmemcpy(&aGameVars[i].val.plValues[0],&save.vars[i][0],sizeof(intptr_t) * MAXSPRITES);
//            }
//            else aGameVars[i].val.lValue = (intptr_t)save.vars[i];
//        }

//        Gv_RefreshPointers();
//#endif
//        for (i=0; i<playerswhenstarted; i++)
//            sprite[g_player[i].ps.i].extra = phealth[i];

//        if (g_player[myconnectindex].ps.over_shoulder_on != 0)
//        {
//            g_cameraDistance = 0;
//            g_cameraClock = 0;
//            g_player[myconnectindex].ps.over_shoulder_on = 1;
//        }

//        screenpeek = myconnectindex;

//        if (ud.lockout)
//        {
//            for (x=g_numAnimWalls-1; x>=0; x--)
//                switch (DYNAMICTILEMAP(wall[animwall[x].wallnum].picnum))
//                {
//                case FEMPIC1__STATIC:
//                    wall[animwall[x].wallnum].picnum = BLANKSCREEN;
//                    break;
//                case FEMPIC2__STATIC:
//                case FEMPIC3__STATIC:
//                    wall[animwall[x].wallnum].picnum = SCREENBREAK6;
//                    break;
//                }
//        }
//#if 0
//        else
//        {
//            for (x=g_numAnimWalls-1; x>=0; x--)
//                if (wall[animwall[x].wallnum].extra >= 0)
//                    wall[animwall[x].wallnum].picnum = wall[animwall[x].wallnum].extra;
//        }
//#endif
//#ifdef YAX_ENABLE
//        sv_postyaxload();
//#endif
//        G_ResetInterpolations();

//        Net_ResetPrediction();

//        G_ClearFIFO();
//        G_ResetTimers(0);
//    }
//}

//#ifdef LUNATIC
//void VM_FallSprite(int32_t i)
//{
//    VM_Fall(i, &sprite[i]);
//}

//int32_t VM_ResetPlayer2(int32_t snum)
//{
//    return VM_ResetPlayer(snum, 0);
//}

//int32_t VM_CheckSquished2(int32_t i, int32_t snum)
//{
//    vm.g_i = i;
//    vm.g_sp = &sprite[i];
//    vm.g_p = snum;

//    return VM_CheckSquished();
//}
//#endif

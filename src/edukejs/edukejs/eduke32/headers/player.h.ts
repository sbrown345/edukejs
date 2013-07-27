/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/todo.ts" />
/// <reference path="../../utils/types.ts" />

/// <reference path="../../eduke32/headers/duke3d.h.ts" />
/// <reference path="../../eduke32/headers/function.h.ts" />
/// <reference path="../../eduke32/headers/global.h.ts" />

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

//#ifndef __player_h__
//#define __player_h__

//#define MOVEFIFOSIZ                 2

var NAM_GRENADE_LIFETIME       = 120;
var NAM_GRENADE_LIFETIME_VAR   = 30;

//#define HORIZ_MIN                   -99
//#define HORIZ_MAX                   299
//#define AUTO_AIM_ANGLE              48
//#define PHEIGHT                     (38<<8)

//#define TRIPBOMB_TRIPWIRE       0x00000001
//#define TRIPBOMB_TIMER          0x00000002

//#define PIPEBOMB_REMOTE         0x00000001
//#define PIPEBOMB_TIMER          0x00000002

//#define WEAPON_POS_LOWER            -9
//#define WEAPON_POS_RAISE            10
//#define WEAPON_POS_START             6

//enum dukeinv_t {
var GET_STEROIDS=0,  // 0
    GET_SHIELD=1,
    GET_SCUBA=2,
    GET_HOLODUKE=3,
    GET_JETPACK=4,
    GET_DUMMY1=5,  // 5
    GET_ACCESS=6,
    GET_HEATS7,
    GET_DUMMY2=8,
    GET_FIRSTAID=9,
    GET_BOOTS=10,  // 10
    GET_MAX=11;
//};

//// these are not in the same order as the above, and it can't be changed for compat reasons. lame!
//enum dukeinvicon_t {
var ICON_NONE=0,  // 0
    ICON_FIRSTAID=1,
    ICON_STEROIDS=2,
    ICON_HOLODUKE=3,
    ICON_JETPACK=4,
    ICON_HEATS=5,  // 5
    ICON_SCUBA=6,
    ICON_BOOTS=7,
    ICON_MAX=8;
//};

//enum dukeweapon_t {
var KNEE_WEAPON = 0,  // 0
    PISTOL_WEAPON = 1,
    SHOTGUN_WEAPON = 2,
    CHAINGUN_WEAPON = 3,
    RPG_WEAPON = 4,
    HANDBOMB_WEAPON = 5,  // 5
    SHRINKER_WEAPON = 6,
    DEVISTATOR_WEAPON = 7,
    TRIPBOMB_WEAPON = 8,
    FREEZE_WEAPON = 9,
    HANDREMOTE_WEAPON = 10,  // 10
    GROW_WEAPON = 11,
    MAX_WEAPONS = 12;
//};

//enum weaponflags_t {
var WEAPON_SPAWNTYPE1           = 0x00000000, // just spawn
    WEAPON_HOLSTER_CLEARS_CLIP  = 0x00000001, // 'holstering' clears the current clip
    WEAPON_GLOWS                = 0x00000002, // weapon 'glows' (shrinker and grower)
    WEAPON_AUTOMATIC            = 0x00000004, // automatic fire (continues while 'fire' is held down
    WEAPON_FIREEVERYOTHER       = 0x00000008, // during 'hold time' fire every frame
    WEAPON_FIREEVERYTHIRD       = 0x00000010, // during 'hold time' fire every third frame
    WEAPON_RANDOMRESTART        = 0x00000020, // restart for automatic is 'randomized' by RND 3
    WEAPON_AMMOPERSHOT          = 0x00000040, // uses ammo for each shot (for automatic)
    WEAPON_BOMB_TRIGGER         = 0x00000080, // weapon is the 'bomb' trigger
    WEAPON_NOVISIBLE            = 0x00000100, // weapon use does not cause user to become 'visible'
    WEAPON_THROWIT              = 0x00000200, // weapon 'throws' the 'shoots' item...
    WEAPON_CHECKATRELOAD        = 0x00000400, // check weapon availability at 'reload' time
    WEAPON_STANDSTILL           = 0x00000800, // player stops jumping before actual fire (like tripbomb in duke)
    WEAPON_SPAWNTYPE2           = 0x00001000, // spawn like shotgun shells
    WEAPON_SPAWNTYPE3           = 0x00002000, // spawn like chaingun shells
    WEAPON_SEMIAUTO             = 0x00004000, // cancel button press after each shot
    WEAPON_RELOAD_TIMING        = 0x00008000, // special casing for pistol reload sounds
    WEAPON_RESET                = 0x00010000;  // cycle weapon back to frame 1 if fire is held, 0 if not
//};

//enum gamemode_t {
var MODE_MENU                   = 0x00000001,
    MODE_DEMO                   = 0x00000002,
    MODE_GAME                   = 0x00000004,
    MODE_EOL                    = 0x00000008,
    MODE_TYPE                   = 0x00000010,
    MODE_RESTART                = 0x00000020,
    MODE_SENDTOWHOM             = 0x00000040;
//};

//// Player Actions.
//enum playeraction_t {
var pstanding                   = 0x00000001,
    pwalking                    = 0x00000002,
    prunning                    = 0x00000004,
    pducking                    = 0x00000008,
    pfalling                    = 0x00000010,
    pjumping                    = 0x00000020,
    phigher                     = 0x00000040,
    pwalkingback                = 0x00000080,
    prunningback                = 0x00000100,
    pkicking                    = 0x00000200,
    pshrunk                     = 0x00000400,
    pjetpack                    = 0x00000800,
    ponsteroids                 = 0x00001000,
    ponground                   = 0x00002000,
    palive                      = 0x00004000,
    pdead                       = 0x00008000,
    pfacing                     = 0x00010000;
//};

//typedef struct {
//    int32_t ox,oy,oz;
//    int16_t oa,os;
//} playerspawn_t;

//typedef struct {
//    int16_t got_access, last_extra, inv_amount[GET_MAX], curr_weapon, holoduke_on;
//    int16_t last_weapon, weapon_pos, kickback_pic;
//    int16_t ammo_amount[MAX_WEAPONS], frag[MAXPLAYERS];
//    uint16_t gotweapon;
//    char inven_icon, jetpack_on, heat_on;
//} DukeStatus_t;

function input_t() {
    this.bits = 0; // 4b uint32_t
    this.fvel = 0, this.svel = 0; // 4b int16_t
    this.avel = 0, this.horz = 0; // 2b int8_t
    this.extbits = 0, this.filler = 0; // 2b int8_t
} //input_t;

//#pragma pack(push,1)
//// XXX: r1625 changed a lot types here, among others
////  * int32_t --> int16_t
////  * int16_t --> int8_t
////  * char --> int8_t
//// Need to carefully think about implications!
//// TODO: rearrange this if the opportunity arises!
//// KEEPINSYNC lunatic/defs.ilua
function DukePlayer_t() {
//    vec3_t pos, opos, vel, npos;
//    int32_t bobposx, bobposy;
//    int32_t truefz, truecz, player_par;
//    int32_t randomflamex, exitx, exity;
//    int32_t runspeed, max_player_health, max_shield_amount;
//    int32_t autostep, autostep_sbw;

//    uint32_t interface_toggle_flag;
//#ifdef LUNATIC
//    int32_t pipebombControl, pipebombLifetime, pipebombLifetimeVar;
//    int32_t tripbombControl, tripbombLifetime, tripbombLifetimeVar;

//    int32_t zrange;
//    int16_t angrange, autoaimang;
//#endif
//    uint16_t max_actors_killed, actors_killed;
//    uint16_t gotweapon, zoom;

//    int16_t loogiex[64], loogiey[64], sbs, sound_pitch;

//    int16_t ang, oang, angvel, cursectnum, look_ang, last_extra, subweapon;this.
      this.max_ammo_amount = new Int16Array(MAX_WEAPONS), this.ammo_amount = new Int16Array(MAX_WEAPONS), this.inv_amount = new Int16Array(GET_MAX);//    int16_t 
//    int16_t wackedbyactor, pyoff, opyoff;

//    int16_t horiz, horizoff, ohoriz, ohorizoff;
//    int16_t newowner, jumping_counter, airleft;
//    int16_t fta, ftq, access_wallnum, access_spritenum;
//    int16_t got_access, weapon_ang, visibility;
//    int16_t somethingonplayer, on_crane, i, one_parallax_sectnum;
//    int16_t random_club_frame, one_eighty_count;
//    int16_t dummyplayersprite, extra_extra8;
//    int16_t actorsqu, timebeforeexit, customexitsound, last_pissed_time;

//    int16_t weaprecs[MAX_WEAPONS], weapon_sway, crack_time, bobcounter;

//    int16_t orotscrnang, rotscrnang, dead_flag;   // JBF 20031220: added orotscrnang
//    int16_t holoduke_on, pycount;
//    int16_t transporter_hold;

//    uint8_t max_secret_rooms, secret_rooms;
//    // XXX: 255 values for frag(gedself) seems too small.
//    uint8_t frag, fraggedself, quick_kick, last_quick_kick;
//    uint8_t return_to_center, reloading, weapreccnt;
//    uint8_t aim_mode, auto_aim, weaponswitch, movement_lock, team;
//    uint8_t tipincs, hbomb_hold_delay, frag_ps, kickback_pic;

//    uint8_t gm, on_warping_sector, footprintcount, hurt_delay;
//    uint8_t hbomb_on, jumping_toggle, rapid_fire_hold, on_ground;
//    uint8_t inven_icon, buttonpalette, over_shoulder_on, show_empty_weapon;

//    uint8_t jetpack_on, spritebridge, lastrandomspot;
//    uint8_t scuba_on, footprintpal, heat_on, invdisptime;

//    uint8_t holster_weapon, falling_counter, footprintshade;
//    uint8_t refresh_inventory, last_full_weapon;

//    uint8_t toggle_key_flag, knuckle_incs, knee_incs, access_incs;
//    uint8_t walking_snd_toggle, palookup, hard_landing, fist_incs;

//    int8_t numloogs, loogcnt, scream_voice;
//    int8_t last_weapon, cheat_phase, weapon_pos, wantweaponfire, curr_weapon;

//    uint8_t palette;
//    palette_t pals;

//#ifdef LUNATIC
//    int8_t palsfadespeed, palsfadenext, palsfadeprio, padding2_;

//    // The player index. Always valid since we have no loose DukePlayer_t's
//    // anywhere (like with spritetype_t): g_player[i].ps->wa.idx == i.
//    struct { int32_t idx; } wa;
//#endif
//    int8_t padding_;
} //DukePlayer_t;

//// KEEPINSYNC lunatic/defs.ilua
function playerdata_t() {
    this.ps = new DukePlayer_t();
    this.sync = new input_t();                                         //input_t

    this.netsynctime = 0;                                  //int32_t
    this.ping = 0, this.filler = 0;                                 //int16_t
    this.pcolor = 0, this.pteam = 0;                                //int32_t
    this.frags = new Uint8Array(MAXPLAYERS), this. wchoice = new Uint8Array(MAX_WEAPONS);  

    this.vote = 0, this.gotvote = 0, this.pingcnt = 0, this.playerquitflag = 0, this.ready=0;     //char
    this.user_name = "";//[32];                                     //char
    this.revision = 0 ; //uint32_t
}
//#pragma pack(pop)

// KEEPINSYNC lunatic/con_lang.lua
function weapondata_t(wl : number = 0,cl : number = 0,rl : number = 0,fd : number = 0,tt : number = 0,hd : number = 0,f : number = 0,s : number = 0,st : number = 0,spawn : number = 0,
    spb : number = 0,is : number = 0,fs : number = 0, s2t : number = 0, s2s : number = 0, rs1 : number = 0, rs2 : number = 0, sSound : number = 0, fc : number = 0)
{
    // NOTE: the member names must be identical to aplWeapon* suffixes.
    this.WorksLike = wl;  // What the original works like
    this.Clip = cl;  // number of items in magazine
    this.Reload = rl;  // delay to reload (include fire)
    this.FireDelay = fd;  // delay to fire
    this.TotalTime = tt;  // The total time the weapon is cycling before next fire.
    this.HoldDelay = hd;  // delay after release fire button to fire (0 for none)
    this.Flags = f;  // Flags for weapon
    this.Shoots = s;  // what the weapon shoots
    this.SpawnTime = st;  // the frame at which to spawn an item
    this.Spawn = spawn;  // the item to spawn
    this.ShotsPerBurst = spb;  // number of shots per 'burst' (one ammo per 'burst')
    this.InitialSound = is;  // Sound made when weapon starts firing. zero for no sound
    this.FireSound = fs;  // Sound made when firing (each time for automatic)
    this.Sound2Time = s2t;  // Alternate sound time
    this.Sound2Sound = s2s;  // Alternate sound sound ID
    this.ReloadSound1 = rs1;  // Sound of magazine being removed
    this.ReloadSound2 = rs2;  // Sound of magazine being inserted
    this.SelectSound = sSound;  // Sound of weapon being selected
    this.FlashColor = fc;  // Muzzle flash color
} //weapondata_t;

//extern int8_t             g_numPlayerSprites;
//extern int32_t          fricxv,fricyv;

//#ifdef LUNATIC
//# define PWEAPON(Player, Weapon, Wmember) (g_playerWeapon[Player][Weapon].Wmember)
//extern weapondata_t g_playerWeapon[MAXPLAYERS][MAX_WEAPONS];
//#else
//# define PWEAPON(Player, Weapon, Wmember) (aplWeapon ## Wmember [Weapon][Player])
//extern intptr_t         *aplWeaponClip[MAX_WEAPONS];            // number of items in clip
//extern intptr_t         *aplWeaponReload[MAX_WEAPONS];          // delay to reload (include fire)
//extern intptr_t         *aplWeaponFireDelay[MAX_WEAPONS];       // delay to fire
//extern intptr_t         *aplWeaponHoldDelay[MAX_WEAPONS];       // delay after release fire button to fire (0 for none)
//extern intptr_t         *aplWeaponTotalTime[MAX_WEAPONS];       // The total time the weapon is cycling before next fire.
//extern intptr_t         *aplWeaponFlags[MAX_WEAPONS];           // Flags for weapon
//extern intptr_t         *aplWeaponShoots[MAX_WEAPONS];          // what the weapon shoots
//extern intptr_t         *aplWeaponSpawnTime[MAX_WEAPONS];       // the frame at which to spawn an item
//extern intptr_t         *aplWeaponSpawn[MAX_WEAPONS];           // the item to spawn
//extern intptr_t         *aplWeaponShotsPerBurst[MAX_WEAPONS];   // number of shots per 'burst' (one ammo per 'burst'
//extern intptr_t         *aplWeaponWorksLike[MAX_WEAPONS];       // What original the weapon works like
//extern intptr_t         *aplWeaponInitialSound[MAX_WEAPONS];    // Sound made when initialy firing. zero for no sound
//extern intptr_t         *aplWeaponFireSound[MAX_WEAPONS];       // Sound made when firing (each time for automatic)
//extern intptr_t         *aplWeaponSound2Time[MAX_WEAPONS];      // Alternate sound time
//extern intptr_t         *aplWeaponSound2Sound[MAX_WEAPONS];     // Alternate sound sound ID
//extern intptr_t         *aplWeaponReloadSound1[MAX_WEAPONS];    // Sound of magazine being removed
//extern intptr_t         *aplWeaponReloadSound2[MAX_WEAPONS];    // Sound of magazine being inserted
//extern intptr_t         *aplWeaponSelectSound[MAX_WEAPONS];     // Sound for weapon selection
//extern intptr_t         *aplWeaponFlashColor[MAX_WEAPONS];      // Color for polymer muzzle flash
//#endif

//// KEEPINSYNC lunatic/defs.ilua
//typedef struct {
//    int32_t cur, count;  // "cur" is the only member that is *used*
//    int32_t gunposx, lookhalfang;  // weapon_xoffset, ps->look_ang>>1
//    int32_t gunposy, lookhoriz;  // gun_pos, looking_arc
//    int32_t shade;
//} hudweapon_t;

//extern input_t          inputfifo[MOVEFIFOSIZ][MAXPLAYERS];
//extern playerspawn_t    g_playerSpawnPoints[MAXPLAYERS];
var g_player = newStructArray(playerdata_t, MAXPLAYERS);
////extern char             dashow2dsector[(MAXSECTORS+7)>>3];
////extern int16_t          searchsect[MAXSECTORS],searchparent[MAXSECTORS];
//extern int16_t          WeaponPickupSprites[MAX_WEAPONS];
//extern hudweapon_t      hudweap;
//extern int32_t          g_levelTextTime;
//extern int32_t          g_myAimMode;
//extern int32_t          g_numObituaries;
//extern int32_t          g_numSelfObituaries;
//extern int32_t          g_emuJumpTics;
//extern int32_t          lastvisinc;
//extern int32_t          mouseyaxismode;
//extern int32_t          ticrandomseed;

//#define SHOOT_HARDCODED_ZVEL INT32_MIN

//int32_t     A_ShootWithZvel(int32_t i, int32_t atwith, int32_t override_zvel);
//static inline int32_t A_Shoot(int32_t i, int32_t atwith)
//{
//    return A_ShootWithZvel(i, atwith, SHOOT_HARDCODED_ZVEL);
//}

//static inline void P_PalFrom(DukePlayer_t *p, uint8_t f, uint8_t r, uint8_t g, uint8_t b)
//{
//#ifdef LUNATIC
//    // Compare with defs.ilua: player[]:_palfrom().
//    if (p->pals.f == 0 || p->palsfadeprio <= 0)
//#endif
//    {
//        p->pals.f = f;
//        p->pals.r = r;
//        p->pals.g = g;
//        p->pals.b = b;
//#ifdef LUNATIC
//        p->palsfadespeed = p->palsfadenext = 0;
//#endif
//    }
//}

//int32_t     A_GetHitscanRange(int32_t i);
//void        P_GetInput(int32_t snum);
//void        P_AddAmmo(int32_t weapon,DukePlayer_t *p,int32_t amount);
//void        P_AddWeapon(DukePlayer_t *p,int32_t weapon);
//void        P_AddWeaponNoSwitch(DukePlayer_t *p,int32_t weapon);
//void        P_CheckWeapon(DukePlayer_t *p);
//void        P_DisplayScuba(int32_t snum);
//void        P_DisplayWeapon(int32_t snum);
//void        P_DropWeapon(DukePlayer_t *p);
//int32_t     P_FindOtherPlayer(int32_t p,int32_t *d);
//void        P_FragPlayer(int32_t snum);
//void        P_UpdatePosWhenViewingCam(DukePlayer_t *p);
//void        P_ProcessInput(int32_t snum);
//void        P_QuickKill(DukePlayer_t *p);
//void        P_SelectNextInvItem(DukePlayer_t *p);
//void        P_UpdateScreenPal(DukePlayer_t *p);
//void        P_SetWeaponGamevars(int32_t snum, const DukePlayer_t *p);
//#endif


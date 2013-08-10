/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/todo.ts" />
/// <reference path="../../utils/types.ts" />

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

var HORIZ_MIN                 = -99;
var HORIZ_MAX                 = 299;
var AUTO_AIM_ANGLE            = 48;
var PHEIGHT                   = (38<<8);

var TRIPBOMB_TRIPWIRE      = 0x00000001;
var TRIPBOMB_TIMER         = 0x00000002;

var PIPEBOMB_REMOTE        = 0x00000001;
var PIPEBOMB_TIMER         = 0x00000002;

var WEAPON_POS_LOWER =           -9;
var WEAPON_POS_RAISE =           10;
var WEAPON_POS_START =            6;

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

class input_t {
    bits: number; // 4b uint32_t
    fvel: number; svel: number; // 4b int16_t
    avel: number; horz: number; // 2b int8_t
    extbits: number; filler: number; // 2b int8_t

    constructor() {
        this.bits = 0; // 4b uint32_t
        this.fvel = 0, this.svel = 0; // 4b int16_t
        this.avel = 0, this.horz = 0; // 2b int8_t
        this.extbits = 0, this.filler = 0; // 2b int8_t
    }
} //input_t;

//#pragma pack(push,1)
//// XXX: r1625 changed a lot types here, among others
////  * int32_t --> int16_t
////  * int16_t --> int8_t
////  * char --> int8_t
//// Need to carefully think about implications!
//// TODO: rearrange this if the opportunity arises!
//// KEEPINSYNC lunatic/defs.ilua
class DukePlayer_t {
    pos: vec3_t; opos: vec3_t; vel:vec3_t; npos:vec3_t;        
    bobposx:number; bobposy:number;                                  //int32_t
    truefz:number; truecz:number; player_par:number;                        //int32_t
    randomflamex:number; exitx:number; exity:number;                        //int32_t
    runspeed:number; max_player_health:number; max_shield_amount:number;    //int32_t
    autostep:number; autostep_sbw:number;                            //int32_t

    interface_toggle_flag:number;   //uint32_t

    max_actors_killed:number; actors_killed:number;                                                 //uint16_t
    gotweapon:number; zoom:number;                                                                  //uint16_t

    loogiex: Uint16Array/*[64]*/; loogiey: Uint16Array/*[64]*/; sb:number;s; sound_pitch:number;                                       //int16_t

    ang:number; oang:number; angvel:number; cursectnum:number; look_ang:number; last_extra:number; subweapon:number;                   //int16_t
    max_ammo_amount: Int16Array/*[MAX_WEAPONS]*/; ammo_amount: Int16Array/*[MAX_WEAPONS]*/; inv_amount: Int16Array/*[GET_MAX]*/;      //int16_t
    wackedbyactor:number; pyoff:number; opyoff:number;                                                     //int16_t

    horiz:number; horizoff:number; ohoriz:number; ohorizoff:number;                                             //int16_t
    newowner:number; jumping_counter:number; airleft:number;                                             //int16_t
    fta:number; ftq:number; access_wallnum:number; access_spritenum:number;                                     //int16_t
    got_access:number; weapon_ang:number; visibility:number;                                             //int16_t
    somethingonplayer:number; on_crane:number; i:number; one_parallax_sectnum:number;                           //int16_t
    random_club_frame:number; one_eighty_count:number;                                            //int16_t
    dummyplayersprite:number; extra_extra8:number;                                                //int16_t
    actorsqu:number; timebeforeexit:number; customexitsound:number; last_pissed_time:number;                    //int16_t

    weaprecs:Int16Array /*[MAX_WEAPONS]*/; weapon_sway:number; crack_time:number; bobcounter:number;                     //int16_t

    orotscrnang:number; rotscrnang:number; dead_flag:number;   // JBF 20031220: added orotscrnang      //int16_t
    holoduke_on:number; pycount:number;                                                         //int16_t
    transporter_hold:number;                                                             //int16_t

    max_secret_rooms:number; secret_rooms:number;                             //uint8_t 
    // XXX: 255 values for frag(gedself) seems too small.
    frag:number; fraggedself:number; quick_kick:number; last_quick_kick:number;             //uint8_t 
    return_to_center:number; reloading:number; weapreccnt:number;                    //uint8_t 
    aim_mode:number; auto_aim:number; weaponswitch:number; movement_lock:number; team:number;      //uint8_t 
    tipincs:number; hbomb_hold_delay:number; frag_ps:number; kickback_pic:number;           //uint8_t 

    gm:number; on_warping_sector:number; footprintcount:number; hurt_delay:number;                   //uint8_t 
    hbomb_on:number; jumping_toggle:number; rapid_fire_hold:number; on_ground:number;                //uint8_t 
    inven_icon:number; buttonpalette:number; over_shoulder_on:number; show_empty_weapon:number;      //uint8_t 

    jetpack_on:number; spritebridge:number; lastrandomspot:number;                //uint8_t 
    scuba_on:number; footprintpal:number; heat_on:number; invdisptime:number;            //uint8_t 

    holster_weapon:number; falling_counter:number; footprintshade:number;         //uint8_t 
    refresh_inventory:number; last_full_weapon:number;                     //uint8_t 

    toggle_key_flag:number; knuckle_incs:number; knee_incs:number; access_incs:number;    //uint8_t 
    walking_snd_toggle:number; palookup:number; hard_landing:number; fist_incs:number;    //uint8_t 

    numloogs:number; loogcnt:number; scream_voice:number;                                        //int8_t 
    last_weapon:number; cheat_phase:number; weapon_pos:number; wantweaponfire:number; curr_weapon:number;      //int8_t 

    palette:number; //uint8_t 
    pals: palette_t;

//#ifdef LUNATIC
//    int8_t palsfadespeed, palsfadenext, palsfadeprio, padding2_;

//    // The player index. Always valid since we have no loose DukePlayer_t's
//    // anywhere (like with spritetype_t): g_player[i].ps->wa.idx == i.
//    struct { int32_t idx; } wa;
//#endif
//    int8_t padding_;

    constructor() {
        this.pos= new vec3_t(); this.opos= new vec3_t(); this.vel = new vec3_t(); this.npos = new vec3_t();        
        this.bobposx=0; this.bobposy=0;                                  //int32_t
        this.truefz=0; this.truecz=0; this.player_par=0;                        //int32_t
        this.randomflamex=0; this.exitx=0;this. exity=0;                        //int32_t
        this.runspeed=0; this.max_player_health=0; this.max_shield_amount=0;    //int32_t
        this.autostep=0; this.autostep_sbw=0;                            //int32_t

        this.interface_toggle_flag=0;   //uint32_t

        this.ang=0; this.oang=0; this.angvel=0; this.cursectnum=0; this.look_ang=0; this.last_extra=0; this.subweapon=0;                   //int16_t
        this.max_actors_killed=0; this.actors_killed=0;                                                 //uint16_t
        this.gotweapon=0; this.zoom=0;     
        
        this.loogiex = new Uint16Array(64);this.loogiey = new Uint16Array(64);this.sound_pitch=0;

        this.max_ammo_amount = new Int16Array(MAX_WEAPONS);this.ammo_amount = new Int16Array(MAX_WEAPONS);this.inv_amount = new Int16Array(GET_MAX);
        
        this.wackedbyactor=0;this. pyoff=0;this. opyoff=0;                                                     //int16_t

        this.horiz=0;this. horizoff=0;this. ohoriz=0;this. ohorizoff=0;                                             //int16_t
        this.newowner=0;this. jumping_counter=0;this. airleft=0;                                             //int16_t
        this.fta=0;this. ftq=0;this. access_wallnum=0;this. access_spritenum=0;                                     //int16_t
        this.got_access=0;this. weapon_ang=0;this. visibility=0;                                             //int16_t
        this.somethingonplayer=0;this. on_crane=0;this. i=0;this. one_parallax_sectnum=0;                           //int16_t
        this.random_club_frame=0;this. one_eighty_count=0;                                            //int16_t
        this.dummyplayersprite=0;this. extra_extra8=0;                                                //int16_t
        this.actorsqu=0;this. timebeforeexit=0;this. customexitsound=0;this. last_pissed_time=0;     

        this.weaprecs = new Int16Array(MAX_WEAPONS);this.weapon_sway=0; this.crack_time=0; this.bobcounter=0;                     //int16_t

        this.orotscrnang =0; this.rotscrnang =0; this.dead_flag =0;   // JBF 20031220: added orotscrnang      //int16_t
        this.holoduke_on =0; this.pycount =0;                                                        //int16_t
        this.transporter_hold =0;                                                             //int16_t

        this.max_secret_rooms =0; this.secret_rooms =0;                            //uint8_t 
        // XXX: 255 values for frag(gedself) seems too small.
        this.frag =0; this.fraggedself =0; this.quick_kick =0; this.last_quick_kick =0;             //uint8_t 
        this.return_to_center =0; this.reloading =0; this.weapreccnt =0;                   //uint8_t 
        this.aim_mode =0; this.auto_aim =0; this.weaponswitch =0; this.movement_lock =0; this.team =0;      //uint8_t 
        this.tipincs =0; this.hbomb_hold_delay =0; this.frag_ps =0; this.kickback_pic =0;           //uint8_t 

        this.gm =0; this.on_warping_sector =0; this.footprintcount =0; this.hurt_delay =0;                   //uint8_t 
        this.hbomb_on =0; this.jumping_toggle =0; this.rapid_fire_hold =0; this.on_ground =0;                //uint8_t 
        this.inven_icon =0; this.buttonpalette =0; this.over_shoulder_on =0; this.show_empty_weapon =0;      //uint8_t 

        this.jetpack_on =0; this.spritebridge =0; this.lastrandomspot =0;                //uint8_t 
        this.scuba_on =0; this.footprintpal =0; this.heat_on =0; this.invdisptime =0;            //uint8_t 

        this.holster_weapon =0; this.falling_counter =0; this.footprintshade =0;         //uint8_t 
        this.refresh_inventory =0; this.last_full_weapon =0;                     //uint8_t 

        this.toggle_key_flag =0; this.knuckle_incs =0; this.knee_incs =0; this.access_incs =0;   //uint8_t 
        this.walking_snd_toggle =0; this.palookup =0; this.hard_landing =0; this.fist_incs =0;   //uint8_t 

        this.numloogs =0; this.loogcnt =0; this.scream_voice =0;                                     //int8_t 
        this.last_weapon =0; this.cheat_phase =0; this.weapon_pos =0; this.wantweaponfire =0; this.curr_weapon =0;      //int8_t 

        this.palette =0; //uint8_t 
        this.pals = new palette_t();
    }
} //DukePlayer_t;

//// KEEPINSYNC lunatic/defs.ilua
class playerdata_t {
    ps: DukePlayer_t;
    sync: input_t;                                         //input_t

    netsynctime: number;                                  //int32_t
    ping: number; filler: number;                                 //int16_t
    pcolor: number; pteam: number;                                //int32_t
    frags:Uint8Array;  wchoice: Uint8Array;  

    vote: number; gotvote: number; pingcnt: number; playerquitflag: number; ready=0;     //char
    user_name = "";//[32];                                     //char
    revision = 0 ; //uint32_t

    constructor() {
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
}
//#pragma pack(pop)

// KEEPINSYNC lunatic/con_lang.lua
class weapondata_t
{
    // NOTE: the member names must be identical to aplWeapon* suffixes.
    WorksLike: number;  // What the original works like
    Clip : number;  // number of items in magazine
    Reload;  // delay to reload (include fire)
    FireDelay: number;  // delay to fire
    TotalTime: number;  // The total time the weapon is cycling before next fire.
    HoldDelay: number;  // delay after release fire button to fire (0 for none)
    Flags: number;  // Flags for weapon
    Shoots: number;  // what the weapon shoots
    SpawnTime: number;  // the frame at which to spawn an item
    Spawn: number;  // the item to spawn
    ShotsPerBurst: number;  // number of shots per 'burst' (one ammo per 'burst')
    InitialSound: number;  // Sound made when weapon starts firing. zero for no sound
    FireSound: number;  // Sound made when firing (each time for automatic)
    Sound2Time: number;  // Alternate sound time
    Sound2Sound: number;  // Alternate sound sound ID
    ReloadSound1: number;  // Sound of magazine being removed
    ReloadSound2: number;  // Sound of magazine being inserted
    SelectSound: number;  // Sound of weapon being selected
    FlashColor: number;  // Muzzle flash color

    constructor(wl : number = 0,cl : number = 0,rl : number = 0,fd : number = 0,tt : number = 0,hd : number = 0,f : number = 0,s : number = 0,st : number = 0,spawn : number = 0,
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
    }
} //weapondata_t;


//extern int8_t             g_numPlayerSprites;
//extern int32_t          fricxv,fricyv;

//#ifdef LUNATIC
//# define PWEAPON(Player, Weapon, Wmember) (g_playerWeapon[Player][Weapon].Wmember)
//extern weapondata_t g_playerWeapon[MAXPLAYERS][MAX_WEAPONS];
//#else
function PWEAPON(Player: number, Weapon: number, Wmember: string): number {return window["aplWeapon" + Wmember][Weapon][Player];}
var aplWeaponClip: Int32Array[] = new Array(MAX_WEAPONS);            // number of items in clip                                      extern intptr_t         
var aplWeaponReload: Int32Array[] = new Array(MAX_WEAPONS);          // delay to reload (include fire)                               extern intptr_t         
var aplWeaponFireDelay: Int32Array[] = new Array(MAX_WEAPONS);       // delay to fire                                                extern intptr_t         
var aplWeaponHoldDelay: Int32Array[] = new Array(MAX_WEAPONS);       // delay after release fire button to fire (0 for none)         extern intptr_t         
var aplWeaponTotalTime: Int32Array[] = new Array(MAX_WEAPONS);       // The total time the weapon is cycling before next fire.       extern intptr_t         
var aplWeaponFlags: Int32Array[] = new Array(MAX_WEAPONS);           // Flags for weapon                                             extern intptr_t         
var aplWeaponShoots: Int32Array[] = new Array(MAX_WEAPONS);          // what the weapon shoots                                       extern intptr_t         
var aplWeaponSpawnTime: Int32Array[] = new Array(MAX_WEAPONS);       // the frame at which to spawn an item                          extern intptr_t         
var aplWeaponSpawn: Int32Array[] = new Array(MAX_WEAPONS);           // the item to spawn                                            extern intptr_t         
var aplWeaponShotsPerBurst: Int32Array[] = new Array(MAX_WEAPONS);   // number of shots per 'burst' (one ammo per 'burst'            extern intptr_t         
var aplWeaponWorksLike: Int32Array[] = new Array(MAX_WEAPONS);       // What original the weapon works like                          extern intptr_t         
var aplWeaponInitialSound: Int32Array[] = new Array(MAX_WEAPONS);    // Sound made when initialy firing. zero for no sound           extern intptr_t         
var aplWeaponFireSound: Int32Array[] = new Array(MAX_WEAPONS);       // Sound made when firing (each time for automatic)             extern intptr_t         
var aplWeaponSound2Time: Int32Array[] = new Array(MAX_WEAPONS);      // Alternate sound time                                         extern intptr_t         
var aplWeaponSound2Sound: Int32Array[] = new Array(MAX_WEAPONS);     // Alternate sound sound ID                                     extern intptr_t         
var aplWeaponReloadSound1: Int32Array[] = new Array(MAX_WEAPONS);    // Sound of magazine being removed                              extern intptr_t         
var aplWeaponReloadSound2: Int32Array[] = new Array(MAX_WEAPONS);    // Sound of magazine being inserted                             extern intptr_t         
var aplWeaponSelectSound: Int32Array[] = new Array(MAX_WEAPONS);     // Sound for weapon selection                                   extern intptr_t         
var aplWeaponFlashColor: Int32Array[] = new Array(MAX_WEAPONS);      // Color for polymer muzzle flash                               extern intptr_t         
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
var g_player: playerdata_t[] = newStructArray(playerdata_t, MAXPLAYERS);
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


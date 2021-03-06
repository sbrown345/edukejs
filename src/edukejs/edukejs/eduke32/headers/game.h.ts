/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/todo.ts" />
/// <reference path="../../utils/types.ts" />

/// <reference path="../../libs/polyfills.ts" />

/// <reference path="../../eduke32/headers/duke3d.h.ts" />
/// <reference path="../../eduke32/headers/function.h.ts" />
/// <reference path="../../eduke32/headers/global.h.ts" />
/// <reference path="../../eduke32/headers/player.h.ts" />

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

//#ifndef __game_h__
//#define __game_h__

var USERQUOTE_LEFTOFFSET   =5;
var USERQUOTE_RIGHTOFFSET  =14;

//enum GametypeFlags_t {
var GAMETYPE_COOP                   = 0x00000001,
    GAMETYPE_WEAPSTAY               = 0x00000002,
    GAMETYPE_FRAGBAR                = 0x00000004,
    GAMETYPE_SCORESHEET             = 0x00000008,
    GAMETYPE_DMSWITCHES             = 0x00000010,
    GAMETYPE_COOPSPAWN              = 0x00000020,
    GAMETYPE_ACCESSCARDSPRITES      = 0x00000040,
    GAMETYPE_COOPVIEW               = 0x00000080,
    GAMETYPE_COOPSOUND              = 0x00000100,
    GAMETYPE_OTHERPLAYERSINMAP      = 0x00000200,
    GAMETYPE_ITEMRESPAWN            = 0x00000400,
    GAMETYPE_MARKEROPTION           = 0x00000800,
    GAMETYPE_PLAYERSFRIENDLY        = 0x00001000,
    GAMETYPE_FIXEDRESPAWN           = 0x00002000,
    GAMETYPE_ACCESSATSTART          = 0x00004000,
    GAMETYPE_PRESERVEINVENTORYDEATH = 0x00008000,
    GAMETYPE_TDM                    = 0x00010000,
    GAMETYPE_TDMSPAWN               = 0x00020000;
//};

//// logo control
//enum LogoFlags_t {
var LOGO_ENABLED           = 0x00000001,
    LOGO_PLAYANIM          = 0x00000002,
    LOGO_PLAYMUSIC         = 0x00000004,
    LOGO_3DRSCREEN         = 0x00000008,
    LOGO_TITLESCREEN       = 0x00000010,
    LOGO_DUKENUKEM         = 0x00000020,
    LOGO_THREEDEE          = 0x00000040,
    LOGO_PLUTOPAKSPRITE    = 0x00000080,
    LOGO_SHAREWARESCREENS  = 0x00000100,
    LOGO_TENSCREEN         = 0x00000200,
    LOGO_STOPANIMSOUNDS    = 0x00000400,
    LOGO_NOE4CUTSCENE      = 0x00000800;
//};

//typedef enum basepal_ {
var BASEPAL = 0,
    WATERPAL = 1,
    SLIMEPAL = 2,
    DREALMSPAL = 3,
    TITLEPAL = 4,
    ENDINGPAL = 5,  // 5
    ANIMPAL = 6,
    BASEPALCOUNT = 7;
//} basepal_t; 

//enum ScreenTextFlags_t {
var TEXT_XRIGHT          = 0x00000001,
    TEXT_XCENTER         = 0x00000002,
    TEXT_YBOTTOM         = 0x00000004,
    TEXT_YCENTER         = 0x00000008,
    TEXT_INTERNALSPACE   = 0x00000010,
    TEXT_TILESPACE       = 0x00000020,
    TEXT_INTERNALLINE    = 0x00000040,
    TEXT_TILELINE        = 0x00000080,
    TEXT_XOFFSETZERO     = 0x00000100,
    TEXT_XJUSTIFY        = 0x00000200,
    TEXT_YOFFSETZERO     = 0x00000400,
    TEXT_YJUSTIFY        = 0x00000800,
    TEXT_LINEWRAP        = 0x00001000,
    TEXT_UPPERCASE       = 0x00002000,
    TEXT_INVERTCASE      = 0x00004000,
    TEXT_IGNOREESCAPE    = 0x00008000,
    TEXT_LITERALESCAPE   = 0x00010000,
    TEXT_BACKWARDS       = 0x00020000,
    TEXT_GAMETEXTNUMHACK = 0x00040000,
    TEXT_DIGITALNUMBER   = 0x00080000,
    TEXT_BIGALPHANUM     = 0x00100000,
    TEXT_GRAYFONT        = 0x00200000;
//};

//void A_DeleteSprite(int32_t s);

function G_GetLogoFlags(): number
{
    todoThrow();
    var tempToAllowCompile = -999999999; 
    return tempToAllowCompile;

//#if !defined LUNATIC
//    return Gv_GetVarByLabel("LOGO_FLAGS",255, -1, -1);
//#else
//    extern int32_t g_logoFlags;
//    return g_logoFlags;
//#endif
}

//#ifdef LUNATIC
//typedef struct {
//    vec3_t pos;
//    int32_t dist, clock;
//    int16_t ang, horiz, sect;
//} camera_t;

//extern camera_t g_camera;

//# define CAMERA(Membname) (g_camera.Membname)
//# define CAMERADIST (g_camera.dist)
//# define CAMERACLOCK (g_camera.clock)
//#else
//# define CAMERA(Membname) (ud.camera ## Membname)
//# define CAMERADIST g_cameraDistance
//# define CAMERACLOCK g_cameraClock
//#endif

class user_defs {
    //#if !defined LUNATIC
    camerapos: vec3_t;
    //#endif
    const_visibility: number; uw_framerate: number;
    camera_time: number; folfvel: number; folavel: number; folx: number; foly: number; fola: number;
    reccnt: number; crosshairscale: number;

    runkey_mode: number; statusbarscale: number; mouseaiming: number; weaponswitch: number; drawweapon: number;   // JBF 20031125                    // int32_t 
    democams: number; color: number; msgdisptime: number; statusbarmode: number;                                                              // int32_t 
    m_noexits: number; noexits: number; autovote: number; automsg: number; idplayers: number;                                                         // int32_t 
    team: number; viewbob: number; weaponsway: number; althud: number; weaponscale: number; textscale: number;                                    // int32_t 
    //
    entered_name: number; screen_tilting: number; shadows: number; fta_on: number; executions: number; auto_run: number;                               // int32_t 
    coords: number; tickrate: number; levelstats: number; m_coop: number; coop: number; screen_size: number; lockout: number; crosshair: number;         // int32_t 
    playerai: number; angleinterpolation: number; obituaries: number;                                                                           // int32_t 
    //
    respawn_monsters: number; respawn_items: number; respawn_inventory: number; recstat: number; monsters_off: number; brightness: number;             // int32_t 
    m_respawn_items: number; m_respawn_monsters: number; m_respawn_inventory: number; m_recstat: number; m_monsters_off: number; detail: number;        // int32_t 
    m_ffire: number; ffire: number; m_player_skill: number; m_level_number: number; m_volume_number: number; multimode: number;                         // int32_t 
    player_skill: number; level_number: number; volume_number: number; m_marker: number; marker: number; mouseflip: number;                            // int32_t 

    configversion: number;  // int32_t 
    //#if !defined LUNATIC
    cameraang: number; camerasect: number; camerahoriz: number;//int16_t 
    //#endif
    pause_on: number; from_bonus: number;                            //int16_t 
    camerasprite: number; last_camsprite: number;                 //int16_t 
    last_level: number; secretlevel: number; bgstretch: number;      //int16_t 

    config: config;

    overhead_on: number;last_overhead: number;showweapons: number;    //char 
    god: number;warp_on: number;cashman: number;eog: number;showallmap: number; //char 
    show_help: number;scrollmode: number;noclip: number;              //char 
    ridecule: string[];// = Array(10);//[10][40];                         //char 
    savegame: string [];//[10][22];                         //char 
    pwlockout: string/*[128]*/; rtsname: string/*[128]*/;              //char 
    display_bonus_screen:number;                     //char 
    show_level_text:number;                          //char 

    constructor() {
    //#if !defined LUNATIC
        this.camerapos = new vec3_t();
    //#endif
        this.const_visibility=0,this.uw_framerate=0;
        this.camera_time=0,this.folfvel=0,this.folavel=0,this.folx=0,this.foly=0,this.fola=0;
        this.reccnt=0,this.crosshairscale=0;

        this.runkey_mode=0,this.statusbarscale=0,this.mouseaiming=0,this.weaponswitch=0,this.drawweapon=0;   // JBF 20031125
        this.democams=0,this.color=0,this.msgdisptime=0,this.statusbarmode=0;
        this.m_noexits=0,this.noexits=0,this.autovote=0,this.automsg=0,this.idplayers=0;
        this.team=0,this. viewbob=0,this. weaponsway=0,this. althud=0,this. weaponscale=0,this. textscale=0;

        this.entered_name=0,this.screen_tilting=0,this.shadows=0,this.fta_on=0,this.executions=0,this.auto_run=0;
        this.coords=0,this.tickrate=0,this.levelstats=0,this.m_coop=0,this.coop=0,this.screen_size=0,this.lockout=0,this.crosshair=0;
        this.playerai=0,this.angleinterpolation=0,this.obituaries=0;

        this.respawn_monsters=0,this.respawn_items=0,this.respawn_inventory=0,this.recstat=0,this.monsters_off=0,this.brightness=0;
        this.m_respawn_items=0,this.m_respawn_monsters=0,this.m_respawn_inventory=0,this.m_recstat=0,this.m_monsters_off=0,this.detail=0;
        this.m_ffire=0,this.ffire=0,this.m_player_skill=0,this.m_level_number=0,this.m_volume_number=0,this.multimode=0;
        this.player_skill=0,this.level_number=0,this.volume_number=0,this.m_marker=0,this.marker=0,this.mouseflip=0;

        this.configversion=0;
    //#if !defined LUNATIC
        this.cameraang=0,this. camerasect=0,this. camerahoriz=0;
    //#endif
        this.pause_on=0,this.from_bonus=0;
        this.camerasprite=0,this.last_camsprite=0;
        this.last_level=0,this.secretlevel=0,this. bgstretch=0;

        this.config = new config();

        this.overhead_on=0;this.last_overhead=0;this.showweapons=0;    //char 
        this.god=0;this.warp_on=0;this.cashman=0;this.eog=0;this.showallmap=0; //char 
        this.show_help=0;this.scrollmode=0;this.noclip=0;              //char 
        this.ridecule= new Array<string>(10);//[10][40];                         //char 
        this.savegame= new Array<string>(10);//[22];                         //char 
        this.pwlockout= ""/*[128]*/; this.rtsname=""/*[128]*/;              //char 
        this.display_bonus_screen=0;                     //char 
        this.show_level_text=0;                          //char 
    }
};

class config {
    UseJoystick: number;
    UseMouse: number;
    AutoAim: number;
    ShowOpponentWeapons: number;
    MouseDeadZone: number;MouseBias: number;
    SmoothInput: number;

    // JBF 20031211: Store the input settings because
    // (currently) jmact can't regurgitate them
    MouseFunctions/*[MAXMOUSEBUTTONS][2]*/: Uint32Array[];
    MouseDigitalFunctions/*[MAXMOUSEAXES][2]*/: Uint32Array[];
    MouseAnalogueAxes/*[MAXMOUSEAXES]*/: Uint32Array/*[]*/;
    MouseAnalogueScale/*[MAXMOUSEAXES]*/: Uint32Array;
    JoystickFunctions/*[MAXJOYBUTTONS]*//*[2]*/: Uint32Array;
    JoystickDigitalFunctions/*[MAXJOYAXES]*//*[2]*/: Uint32Array;
    JoystickAnalogueAxes/*[MAXJOYAXES]*/: Uint32Array;
    JoystickAnalogueScale/*[MAXJOYAXES]*/: Uint32Array;
    JoystickAnalogueDead/*[MAXJOYAXES]*/: Uint32Array;
    JoystickAnalogueSaturate/*[MAXJOYAXES]*/: Uint32Array;
    KeyboardKeys: Uint8Array[];//[NUMGAMEFUNCTIONS][2]: number;

    //
    // Sound variables
    //
    FXDevice: number;
    MusicDevice: number;
    FXVolume: number;
    MusicVolume: number;
    SoundToggle: number;
    MusicToggle: number;
    VoiceToggle: number;
    AmbienceToggle: number;

    NumVoices: number;
    NumChannels: number;
    NumBits: number;
    MixRate: number;

    ReverseStereo: number;

    //
    // Screen variables
    //

    ScreenMode: number;

    ScreenWidth: number;
    ScreenHeight: number;
    ScreenBPP: number;

    ForceSetup: number;
    NoAutoLoad: number;

    scripthandle: number;
    setupread: number;

    CheckForUpdates: number;
    LastUpdateCheck: number;
    useprecache: number;

    constructor() {
    }
} ;


//extern cactype cac[];

//// this is checked against http://eduke32.com/VERSION
//extern const char *s_buildDate;
//extern const char *g_gameNamePtr;
//extern const char *g_rtsNamePtr;

//extern char **g_scriptModules;
//extern int32_t g_scriptModulesNum;

//extern char CheatStrings[][MAXCHEATLEN];
//extern char boardfilename[BMAX_PATH], currentboardfilename[BMAX_PATH];
//extern char boardfilename[BMAX_PATH];

//extern const char *defaultrtsfilename[GAMECOUNT];
//extern const char *G_DefaultRtsFile(void);

//extern char g_modDir[BMAX_PATH];
//extern char inputloc;
//extern char ror_protectedsectors[MAXSECTORS];

//extern float r_ambientlight;

//extern int32_t althud_flashing;
//extern int32_t althud_numberpal;
//extern int32_t althud_numbertile;
//extern int32_t althud_shadows;
//extern int32_t cacnum;
////extern int32_t drawing_ror;
var g_Shareware: number = 0; //int32_t
//#if !defined LUNATIC
//extern int32_t g_cameraClock;
//extern int32_t g_cameraDistance;
//#endif
//extern int32_t g_crosshairSum;
//extern int32_t g_dependencyCRC;
//extern int32_t g_doQuickSave;
//extern int32_t g_forceWeaponChoice;
//extern int32_t g_fakeMultiMode;
//extern int32_t g_levelTextTime;
//extern int32_t g_noSetup;
//extern int32_t g_quitDeadline;
//extern int32_t g_restorePalette;
//extern int32_t g_usingAddon;
//extern int32_t hud_glowingquotes;
//extern int32_t hud_showmapname;
//extern int32_t lastvisinc;
//extern int32_t rts_numlumps;
//extern int32_t quotebot;
//extern int32_t quotebotgoal;
//extern int32_t r_maxfps;
//extern int32_t tempwallptr;
//extern int32_t ticrandomseed;
//extern int32_t vote_map;
//extern int32_t voting;

////extern int8_t cheatbuf[MAXCHEATLEN],cheatbuflen;

//extern palette_t CrosshairColors;
//extern palette_t DefaultCrosshairColors;

//extern uint32_t g_frameDelay;

//extern uint8_t water_pal[768],slime_pal[768],title_pal[768],dre_alms[768],ending_pal[768];
//extern uint8_t *basepaltable[BASEPALCOUNT];
//extern int8_t g_noFloorPal[MAXPALOOKUPS];

//extern user_defs ud;

//int32_t A_CheckInventorySprite(spritetype *s);
//int32_t A_InsertSprite(int32_t whatsect,int32_t s_x,int32_t s_y,int32_t s_z,int32_t s_pn,int32_t s_s,int32_t s_xr,int32_t s_yr,int32_t s_a,int32_t s_ve,int32_t s_zv,int32_t s_ow,int32_t s_ss);
//int32_t A_Spawn(int32_t j,int32_t pn);
//int32_t G_DoMoveThings(void);
////int32_t G_EndOfLevel(void);
//int32_t G_GameTextLen(int32_t x,const char *t);
//int32_t G_PrintGameText(int32_t hack,int32_t tile,int32_t x,int32_t y,const char *t,int32_t s,int32_t p,int32_t o,int32_t x1,int32_t y1,int32_t x2,int32_t y2,int32_t z);
//int32_t GetTime(void);
//int32_t kopen4loadfrommod(const char *filename,char searchfirst);
//int32_t minitext_(int32_t x,int32_t y,const char *t,int32_t s,int32_t p,int32_t sb);
//void creditsminitext(int32_t x,int32_t y,const char *t,int32_t p,int32_t sb);
//int32_t mpgametext(int32_t y,const char *t,int32_t s,int32_t dabits);
//int32_t startwin_run(void);

//#ifdef YAX_ENABLE
//void Yax_SetBunchZs(int32_t sectnum, int32_t cf, int32_t daz);
//#else
//#define Yax_SetBunchZs(sectnum, cf, daz)
//#endif

//#ifdef LUNATIC
//void El_CreateGameState(void);
//#endif
//void G_PostCreateGameState(void);

//void A_SpawnCeilingGlass(int32_t i,int32_t sectnum,int32_t n);
//void A_SpawnGlass(int32_t i,int32_t n);
//void A_SpawnRandomGlass(int32_t i,int32_t wallnum,int32_t n);
//void A_SpawnWallGlass(int32_t i,int32_t wallnum,int32_t n);
//void G_AddUserQuote(const char *daquote);
//void G_BackToMenu(void);
//void G_BonusScreen(int32_t bonusonly);
////void G_CheatGetInv(void);
//void G_DisplayRest(int32_t smoothratio);
//void G_DoSpriteAnimations(int32_t ourx, int32_t oury, int32_t oura, int32_t smoothratio);
//void G_DrawBackground(void);
//void G_DrawFrags(void);
//void G_HandleMirror(int32_t x, int32_t y, int32_t z, int32_t a, int32_t horiz, int32_t smoothratio);
//void G_DrawRooms(int32_t snum,int32_t smoothratio);
//void G_DrawTXDigiNumZ(int32_t starttile,int32_t x,int32_t y,int32_t n,int32_t s,int32_t pal,int32_t cs,int32_t x1,int32_t y1,int32_t x2,int32_t y2,int32_t z);
//#if !defined LUNATIC
//void G_DrawTile(int32_t x,int32_t y,int32_t tilenum,int32_t shade,int32_t orientation);
//void G_DrawTilePal(int32_t x,int32_t y,int32_t tilenum,int32_t shade,int32_t orientation,int32_t p);
//void G_DrawTilePalSmall(int32_t x,int32_t y,int32_t tilenum,int32_t shade,int32_t orientation,int32_t p);
//void G_DrawTileSmall(int32_t x,int32_t y,int32_t tilenum,int32_t shade,int32_t orientation);
//#endif
//void G_FadePalette(int32_t r,int32_t g,int32_t b,int32_t e);
//void G_GameExit(const char *t) ATTRIBUTE((noreturn));
//void G_GameQuit(void);
//void G_GetCrosshairColor(void);
//void G_HandleLocalKeys(void);
//void G_HandleSpecialKeys(void);
//void G_PrintGameQuotes(int32_t snum);
////void G_SE40(int32_t smoothratio);
//void G_SetCrosshairColor(int32_t r,int32_t g,int32_t b);
//void G_Shutdown(void);
//void G_UpdatePlayerFromMenu(void);
//void M32RunScript(const char *s);
//void P_DoQuote(int32_t q,DukePlayer_t *p);
//extern int32_t textsc(int32_t sc);
//void P_SetGamePalette(DukePlayer_t *player,uint8_t palid,int32_t set);

//extern int32_t G_GetStringLineLength(const char *text, const char *end, const int32_t iter);
//extern int32_t G_GetStringNumLines(const char *text, const char *end, const int32_t iter);
//extern char* G_GetSubString(const char *text, const char *end, const int32_t iter, const int32_t length);
//extern int32_t G_GetStringTile(int32_t font, char *t, int32_t f);
//extern vec2_t G_ScreenTextSize(const int32_t font, int32_t x, int32_t y, const int32_t z, const int32_t blockangle, const char *str, const int32_t o, int32_t xspace, int32_t yline, int32_t xbetween, int32_t ybetween, const int32_t f, const int32_t x1, const int32_t y1, const int32_t x2, const int32_t y2);
//extern void G_AddCoordsFromRotation(vec2_t *coords, const vec2_t *unitDirection, const int32_t magnitude);
//extern vec2_t G_ScreenText(const int32_t font, int32_t x, int32_t y, const int32_t z, const int32_t blockangle, const int32_t charangle, const char *str, const int32_t shade, int32_t pal, int32_t o, const int32_t alpha, int32_t xspace, int32_t yline, int32_t xbetween, int32_t ybetween, const int32_t f, int32_t x1, int32_t y1, int32_t x2, int32_t y2);
//extern vec2_t G_ScreenTextShadow(int32_t sx, int32_t sy, const int32_t font, int32_t x, int32_t y, const int32_t z, const int32_t blockangle, const int32_t charangle, const char *str, const int32_t shade, int32_t pal, int32_t o, const int32_t alpha, int32_t xspace, int32_t yline, int32_t xbetween, int32_t ybetween, const int32_t f, int32_t x1, int32_t y1, int32_t x2, int32_t y2);

//int32_t app_main(int32_t argc,const char **argv);
//void fadepal(int32_t r,int32_t g,int32_t b,int32_t start,int32_t end,int32_t step);
////void fadepaltile(int32_t r,int32_t g,int32_t b,int32_t start,int32_t end,int32_t step,int32_t tile);
//void G_InitTimer(int32_t ticpersec);

function/* int32_t */G_GetTeamPalette(/*int32_t*/ team: number): number
{
    var pal = new Uint8Array([3, 10, 11, 12]);

    if (team >= pal.length/*(sizeof(pal)/sizeof(pal[0]))*/)
        return 0;

    return pal[team];
}

//#if defined(_WIN32)
//int32_t G_GetVersionFromWebsite(char *buffer);
//#endif

//#ifdef USE_OPENGL
//extern char forcegl;
//#endif

function minitextshade(/*int32_t */x:number,/*int32_t */y:number,/*const char **/t:string,/*int32_t */s:number,/*int32_t */p:number,/*int32_t */sb:number):number {return minitext_(x,y,t,s,p,sb);}
function minitext(/*int32_t */x:number,/*int32_t */y:number,/*const char **/t:string,/*int32_t */p:number,/*int32_t */sb:number):number {return minitext_(x,y,t,0,p,sb);}
function menutext(x: number,y: number,s: number,p:number,t: string): number {todo("menutext game.h");return -1;/*menutext_(x,y,s,p,/*(char *)#1#OSD_StripColors(menutextbuf,t),10+16);*/}
function gametext(x: number,y: number,t:string,s: number,dabits: number): number{todo(" gamtexte");return -1;/*G_PrintGameText(0,STARTALPHANUM, x,y,t,s,0,dabits,0, 0, xdim-1, ydim-1, 65536)*/};
//#define gametextscaled(x,y,t,s,dabits) G_PrintGameText(1,STARTALPHANUM, x,y,t,s,0,dabits,0, 0, xdim-1, ydim-1, 65536)
function gametextpal(x: number,y: number,t: string,s: number,p: number): number {todo("");return -1;/*G_PrintGameText(0,STARTALPHANUM, x,y,t,s,p,26,0, 0, xdim-1, ydim-1, 65536);*/}
//#define gametextpalbits(x,y,t,s,p,dabits) G_PrintGameText(0,STARTALPHANUM, x,y,t,s,p,dabits,0, 0, xdim-1, ydim-1, 65536)
function A_CheckSpriteFlags(iActor:number, iType:number):number {return((g_tile[sprite[iActor].picnum].flags^actor[iActor].flags) & iType) != 0 ? 1:0;}
//// (unsigned)iPicnum check: AMC TC Rusty Nails, bayonet MG alt. fire, iPicnum == -1 (via aplWeaponShoots)
function A_CheckSpriteTileFlags(iPicnum: number, iType: number): number {return ((iPicnum < MAXTILES) && (g_tile[iPicnum].flags & iType) != 0) ? 1 : 0;}
//#define G_EnterText(x, y, t, dalen, c) _EnterText(0,x,y,t,dalen,c)
//#define Net_EnterText(x, y, t, dalen, c) _EnterText(1,x,y,t,dalen,c)
function S_StopSound(num:number):void {S_StopEnvSound(num, -1);}

//extern void G_MaybeAllocPlayer(int32_t pnum);

function G_HandleAsync()
{
    handleevents();
    Net_GetPackets();
}

function /* int32_t */calc_smoothratio(/*int32_t */totalclk: number, /*int32_t */ototalclk: number): number
{
	dlog(DEBUG_ANIMATIONS, "totalclk: %i, ototalclk: %i \n", totalclk, ototalclk);
    return clamp(Math.imul((totalclk-ototalclk), (65536/TICSPERFRAME)), 0, 65536);
}

//// sector effector lotags
//enum {
var SE_0_ROTATING_SECTOR = 0,
    SE_1_PIVOT = 1,
    SE_2_EARTHQUAKE = 2,
    SE_3_RANDOM_LIGHTS_AFTER_SHOT_OUT = 3,
    SE_4_RANDOM_LIGHTS = 4,
    SE_5 = 5,
    SE_6_SUBWAY = 6,
    // ^^ potentially incomplete substitution in code
    // vv almost surely complete substitution
    SE_7_TELEPORT = 7,
    SE_8_UP_OPEN_DOOR_LIGHTS = 8,
    SE_9_DOWN_OPEN_DOOR_LIGHTS = 9,
    SE_10_DOOR_AUTO_CLOSE = 10,
    SE_11_SWINGING_DOOR = 11,
    SE_12_LIGHT_SWITCH = 12,
    SE_13_EXPLOSIVE = 13,
    SE_14_SUBWAY_CAR = 14,
    SE_15_SLIDING_DOOR = 15,
    SE_16_REACTOR = 16,
    SE_17_WARP_ELEVATOR = 17,
    SE_18_INCREMENTAL_SECTOR_RISE_FALL = 18,
    SE_19_EXPLOSION_LOWERS_CEILING = 19,
    SE_20_STRETCH_BRIDGE = 20,
    SE_21_DROP_FLOOR = 21,
    SE_22_TEETH_DOOR = 22,
    SE_23_ONE_WAY_TELEPORT = 23,
    SE_24_CONVEYOR = 24,
    SE_25_PISTON = 25,
    SE_26 = 26,
    SE_27_DEMO_CAM = 27,
    SE_28_LIGHTNING = 28,
    SE_29_WAVES = 29,
    SE_30_TWO_WAY_TRAIN = 30,
    SE_31_FLOOR_RISE_FALL = 31,
    SE_32_CEILING_RISE_FALL = 32,
    SE_33_QUAKE_DEBRIS = 33,
    SE_34 = 34,  // XXX
    SE_35 = 35,  // XXX
    SE_36_PROJ_SHOOTER = 36,
    SE_49_POINT_LIGHT = 49,
    SE_50_SPOT_LIGHT = 50,
    SE_130 = 130,
    SE_131 = 131;
//};

//// sector lotags
//enum {
var ST_1_ABOVE_WATER = 1,
    ST_2_UNDERWATER = 2,
    ST_3 = 3,
    // ^^^ maybe not complete substitution in code
    ST_9_SLIDING_ST_DOOR = 9,
    ST_15_WARP_ELEVATOR = 15,
    ST_16_PLATFORM_DOWN = 16,
    ST_17_PLATFORM_UP = 17,
    ST_18_ELEVATOR_DOWN = 18,
    ST_19_ELEVATOR_UP = 19,
    ST_20_CEILING_DOOR = 20,
    ST_21_FLOOR_DOOR = 21,
    ST_22_SPLITTING_DOOR = 22,
    ST_23_SWINGING_DOOR = 23,
    ST_25_SLIDING_DOOR = 25,
    ST_26_SPLITTING_ST_DOOR = 26,
    ST_27_STRETCH_BRIDGE = 27,
    ST_28_DROP_FLOOR = 28,
    ST_29_TEETH_DOOR = 29,
    ST_30_ROTATE_RISE_BRIDGE = 30,
    ST_31_TWO_WAY_TRAIN = 31;
    // left: ST 32767, 65534, 65535
//};

//// Cheats
//// KEEPINSYNC game.c: char CheatStrings[][]
//enum cheatindex_t
//{
var CHEAT_CORNHOLIO=0,  // 0
    CHEAT_STUFF=1,
    CHEAT_SCOTTY=2,
    CHEAT_COORDS=3,
    CHEAT_VIEW=4,
    CHEAT_TIME=5,  // 5
    CHEAT_UNLOCK=6,
    CHEAT_CASHMAN=7,
    CHEAT_ITEMS=8,
    CHEAT_RATE=9,
    CHEAT_SKILL=10,  // 10
    CHEAT_BETA=11,
    CHEAT_HYPER=12,
    CHEAT_MONSTERS=13,
    CHEAT_RESERVED=14,
    CHEAT_RESERVED2=15,  // 15
    CHEAT_TODD=16,
    CHEAT_SHOWMAP=17,
    CHEAT_KROZ=18,
    CHEAT_ALLEN=19,
    CHEAT_CLIP=20,  // 20
    CHEAT_WEAPONS=21,
    CHEAT_INVENTORY=22,
    CHEAT_KEYS=23,
    CHEAT_DEBUG=24,
    CHEAT_RESERVED3=25,  // 25
    CHEAT_COMEGETSOME=26;
//};


//# define G_ModDirSnprintf(buf, size, basename, ...) \
//( \
//    ( \
//        (g_modDir[0] != '/') ? \
//            Bsnprintf(buf, size, "%s/" basename, g_modDir, ## __VA_ARGS__) : \
//            Bsnprintf(buf, size, basename, ## __VA_ARGS__) \
//    ) >= ((int32_t)size)-1 \
//)

//#include "game_inline.h"

//#endif

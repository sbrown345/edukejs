//
// Definitions of common game-only data structures/functions
// (and declarations of data appearing in both)
// for EDuke32 and Mapster32
//

//#ifndef EDUKE32_COMMON_GAME_H_
//#define EDUKE32_COMMON_GAME_H_

var GAMEFLAG_DUKE      = 0x00000001;
var GAMEFLAG_NAM       = 0x00000002;
var GAMEFLAG_NAPALM    = 0x00000004;
var GAMEFLAG_WW2GI     = 0x00000008;
var GAMEFLAG_ADDON     = 0x00000010;
var GAMEFLAG_SHAREWARE = 0x00000020;
var GAMEFLAG_DUKEBETA  = 0x00000060;// includes 0x20 since it's a shareware beta

//extern int32_t g_gameType;

interface Window {
    DUKE: number;
    NAM: number;
    NAPALM: number;
    WW2GI: number;
    SHAREWARE: number;
    DUKEBETA: number;
}
Object.defineProperty(window, 'DUKE', { get: function () { return (g_gameType & GAMEFLAG_DUKE); } });
Object.defineProperty(window, 'NAM', { get: function () { return (g_gameType & GAMEFLAG_NAM); } });
Object.defineProperty(window, 'NAPALM', { get: function () { return (g_gameType & GAMEFLAG_NAPALM); } });
Object.defineProperty(window, 'WW2GI', { get: function () { return (g_gameType & GAMEFLAG_WW2GI); } });
Object.defineProperty(window, 'SHAREWARE', { get: function () { return (g_gameType & GAMEFLAG_SHAREWARE); } });
Object.defineProperty(window, 'DUKEBETA', { get: function () { return (g_gameType & GAMEFLAG_DUKEBETA); } });

//enum Games_t {
var GAME_DUKE = 0,
    GAME_NAM = 1,
    GAME_NAPALM = 2,
    GAME_WW2GI = 3,
    GAMECOUNT = 4;
//};

//enum instpath_t {
//    INSTPATH_STEAM,
//    INSTPATH_GOG,
//    NUMINSTPATHS
//};

//extern const char *defaultgamegrp[GAMECOUNT];
//extern const char *defaultdeffilename[GAMECOUNT];
//extern const char *defaultconfilename;
//extern const char *defaultgameconfilename[GAMECOUNT];

//extern char *g_grpNamePtr;
//extern char *g_scriptNamePtr;

//extern const char *G_DefaultGrpFile(void);
//extern const char *G_GrpFile(void);

//extern const char *G_DefaultConFile(void);
//extern const char *G_ConFile(void);

//extern void clearGrpNamePtr(void);
//extern void clearDefNamePtr(void);
//extern void clearScriptNamePtr(void);

////////////

//extern void G_MultiPskyInit(void);

////////////

//extern void G_ExtPreInit(void);

//extern void G_AddSearchPaths(void);
//extern void G_CleanupSearchPaths(void);

//extern const char * G_GetInstallPath(int32_t insttype);

//#endif

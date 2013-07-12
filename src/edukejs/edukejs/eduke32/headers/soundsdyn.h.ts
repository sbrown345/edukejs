//-------------------------------------------------------------------------
/*
Copyright (C) 2013 EDuke32 developers and contributors

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

//#define DYNSOUNDREMAP_ENABLE


var KICK_HIT__STATIC = 0;
var PISTOL_RICOCHET__STATIC = 1;
var PISTOL_BODYHIT__STATIC = 2;
var PISTOL_FIRE__STATIC = 3;
var EJECT_CLIP__STATIC = 4;
var INSERT_CLIP__STATIC = 5;
var CHAINGUN_FIRE__STATIC = 6;
var RPG_SHOOT__STATIC = 7;
var POOLBALLHIT__STATIC = 8;
var RPG_EXPLODE__STATIC = 9;
var CAT_FIRE__STATIC = 10;
var SHRINKER_FIRE__STATIC = 11;
var ACTOR_SHRINKING__STATIC = 12;
var PIPEBOMB_BOUNCE__STATIC = 13;
var PIPEBOMB_EXPLODE__STATIC = 14;
var LASERTRIP_ONWALL__STATIC = 15;
var LASERTRIP_ARMING__STATIC = 16;
var LASERTRIP_EXPLODE__STATIC = 17;
var VENT_BUST__STATIC = 18;
var GLASS_BREAKING__STATIC = 19;
var GLASS_HEAVYBREAK__STATIC = 20;
var SHORT_CIRCUIT__STATIC = 21;
var ITEM_SPLASH__STATIC = 22;
var DUKE_BREATHING__STATIC = 23;
var DUKE_EXHALING__STATIC = 24;
var DUKE_GASP__STATIC = 25;
var SLIM_RECOG__STATIC = 26;
//// = #define = ENDSEQVOL3SND1__STATIC = 27;
var DUKE_URINATE__STATIC = 28;
var ENDSEQVOL3SND2__STATIC = 29;
var ENDSEQVOL3SND3__STATIC = 30;
var DUKE_PASSWIND__STATIC = 32;
var DUKE_CRACK__STATIC = 33;
var SLIM_ATTACK__STATIC = 34;
var SOMETHINGHITFORCE__STATIC = 35;
var DUKE_DRINKING__STATIC = 36;
var DUKE_KILLED1__STATIC = 37;
var DUKE_GRUNT__STATIC = 38;
var DUKE_HARTBEAT__STATIC = 39;
var DUKE_ONWATER__STATIC = 40;
var DUKE_DEAD__STATIC = 41;
var DUKE_LAND__STATIC = 42;
var DUKE_WALKINDUCTS__STATIC = 43;
var DUKE_GLAD__STATIC = 44;
var DUKE_YES__STATIC = 45;
var DUKE_HEHE__STATIC = 46;
var DUKE_SHUCKS__STATIC = 47;
var DUKE_UNDERWATER__STATIC = 48;
var DUKE_JETPACK_ON__STATIC = 49;
var DUKE_JETPACK_IDLE__STATIC = 50;
var DUKE_JETPACK_OFF__STATIC = 51;
var LIZTROOP_GROWL__STATIC = 52;
var LIZTROOP_TALK1__STATIC = 53;
var LIZTROOP_TALK2__STATIC = 54;
var LIZTROOP_TALK3__STATIC = 55;
var DUKETALKTOBOSS__STATIC = 56;
var LIZCAPT_GROWL__STATIC = 57;
var LIZCAPT_TALK1__STATIC = 58;
var LIZCAPT_TALK2__STATIC = 59;
var LIZCAPT_TALK3__STATIC = 60;
var LIZARD_BEG__STATIC = 61;
var LIZARD_PAIN__STATIC = 62;
var LIZARD_DEATH__STATIC = 63;
var LIZARD_SPIT__STATIC = 64;
var DRONE1_HISSRATTLE__STATIC = 65;
var DRONE1_HISSSCREECH__STATIC = 66;
var DUKE_TIP2__STATIC = 67;
var FLESH_BURNING__STATIC = 68;
var SQUISHED__STATIC = 69;
var TELEPORTER__STATIC = 70;
var ELEVATOR_ON__STATIC = 71;
var DUKE_KILLED3__STATIC = 72;
var ELEVATOR_OFF__STATIC = 73;
var DOOR_OPERATE1__STATIC = 74;
var SUBWAY__STATIC = 75;
var SWITCH_ON__STATIC = 76;
var FAN__STATIC = 77;
var DUKE_GETWEAPON3__STATIC = 78;
var FLUSH_TOILET__STATIC = 79;
var HOVER_CRAFT__STATIC = 80;
var EARTHQUAKE__STATIC = 81;
var INTRUDER_ALERT__STATIC = 82;
var END_OF_LEVEL_WARN__STATIC = 83;
var ENGINE_OPERATING__STATIC = 84;
var REACTOR_ON__STATIC = 85;
var COMPUTER_AMBIENCE__STATIC = 86;
var GEARS_GRINDING__STATIC = 87;
var BUBBLE_AMBIENCE__STATIC = 88;
var MACHINE_AMBIENCE__STATIC = 89;
var SEWER_AMBIENCE__STATIC = 90;
var WIND_AMBIENCE__STATIC = 91;
var SOMETHING_DRIPPING__STATIC = 92;
var STEAM_HISSING__STATIC = 93;
var THEATER_BREATH__STATIC = 94;
var BAR_MUSIC__STATIC = 95;
var BOS1_ROAM__STATIC = 96;
var BOS1_RECOG__STATIC = 97;
var BOS1_ATTACK1__STATIC = 98;
var BOS1_PAIN__STATIC = 99;
var BOS1_DYING__STATIC = 100;
var BOS2_ROAM__STATIC = 101;
var BOS2_RECOG__STATIC = 102;
var BOS2_ATTACK__STATIC = 103;
var BOS2_PAIN__STATIC = 104;
var BOS2_DYING__STATIC = 105;
var GETATOMICHEALTH__STATIC = 106;
var DUKE_GETWEAPON2__STATIC = 107;
var BOS3_DYING__STATIC = 108;
var SHOTGUN_FIRE__STATIC = 109;
var PRED_ROAM__STATIC = 110;
var PRED_RECOG__STATIC = 111;
var PRED_ATTACK__STATIC = 112;
var PRED_PAIN__STATIC = 113;
var PRED_DYING__STATIC = 114;
var CAPT_ROAM__STATIC = 115;
var CAPT_ATTACK__STATIC = 116;
var CAPT_RECOG__STATIC = 117;
var CAPT_PAIN__STATIC = 118;
var CAPT_DYING__STATIC = 119;
var PIG_ROAM__STATIC = 120;
var PIG_RECOG__STATIC = 121;
var PIG_ATTACK__STATIC = 122;
var PIG_PAIN__STATIC = 123;
var PIG_DYING__STATIC = 124;
var RECO_ROAM__STATIC = 125;
var RECO_RECOG__STATIC = 126;
var RECO_ATTACK__STATIC = 127;
var RECO_PAIN__STATIC = 128;
var RECO_DYING__STATIC = 129;
var DRON_ROAM__STATIC = 130;
var DRON_RECOG__STATIC = 131;
var DRON_ATTACK1__STATIC = 132;
var DRON_PAIN__STATIC = 133;
var DRON_DYING__STATIC = 134;
var COMM_ROAM__STATIC = 135;
var COMM_RECOG__STATIC = 136;
var COMM_ATTACK__STATIC = 137;
var COMM_PAIN__STATIC = 138;
var COMM_DYING__STATIC = 139;
var OCTA_ROAM__STATIC = 140;
var OCTA_RECOG__STATIC = 141;
var OCTA_ATTACK1__STATIC = 142;
var OCTA_PAIN__STATIC = 143;
var OCTA_DYING__STATIC = 144;
var TURR_ROAM__STATIC = 145;
var TURR_RECOG__STATIC = 146;
var TURR_ATTACK__STATIC = 147;
var DUMPSTER_MOVE__STATIC = 148;
var SLIM_DYING__STATIC = 149;
var BOS3_ROAM__STATIC = 150;
var BOS3_RECOG__STATIC = 151;
var BOS3_ATTACK1__STATIC = 152;
var BOS3_PAIN__STATIC = 153;
var BOS1_ATTACK2__STATIC = 154;
var COMM_SPIN__STATIC = 155;
var BOS1_WALK__STATIC = 156;
var DRON_ATTACK2__STATIC = 157;
var THUD__STATIC = 158;
var OCTA_ATTACK2__STATIC = 159;
var WIERDSHOT_FLY__STATIC = 160;
var TURR_PAIN__STATIC = 161;
var TURR_DYING__STATIC = 162;
var SLIM_ROAM__STATIC = 163;
var LADY_SCREAM__STATIC = 164;
var DOOR_OPERATE2__STATIC = 165;
var DOOR_OPERATE3__STATIC = 166;
var DOOR_OPERATE4__STATIC = 167;
var BORNTOBEWILDSND__STATIC = 168;
var SHOTGUN_COCK__STATIC = 169;
var GENERIC_AMBIENCE1__STATIC = 170;
var GENERIC_AMBIENCE2__STATIC = 171;
var GENERIC_AMBIENCE3__STATIC = 172;
var GENERIC_AMBIENCE4__STATIC = 173;
var GENERIC_AMBIENCE5__STATIC = 174;
var GENERIC_AMBIENCE6__STATIC = 175;
var BOS3_ATTACK2__STATIC = 176;
var GENERIC_AMBIENCE17__STATIC = 177;
var GENERIC_AMBIENCE18__STATIC = 178;
var GENERIC_AMBIENCE19__STATIC = 179;
var GENERIC_AMBIENCE20__STATIC = 180;
var GENERIC_AMBIENCE21__STATIC = 181;
var GENERIC_AMBIENCE22__STATIC = 182;
var SECRETLEVELSND__STATIC = 183;
var GENERIC_AMBIENCE8__STATIC = 184;
var GENERIC_AMBIENCE9__STATIC = 185;
var GENERIC_AMBIENCE10__STATIC = 186;
var GENERIC_AMBIENCE11__STATIC = 187;
var GENERIC_AMBIENCE12__STATIC = 188;
var GENERIC_AMBIENCE13__STATIC = 189;
var GENERIC_AMBIENCE14__STATIC = 190;
var GENERIC_AMBIENCE15__STATIC = 192;
var GENERIC_AMBIENCE16__STATIC = 193;
var FIRE_CRACKLE__STATIC = 194;
var BONUS_SPEECH1__STATIC = 195;
var BONUS_SPEECH2__STATIC = 196;
var BONUS_SPEECH3__STATIC = 197;
var PIG_CAPTURE_DUKE__STATIC = 198;
var BONUS_SPEECH4__STATIC = 199;
var DUKE_LAND_HURT__STATIC = 200;
var DUKE_HIT_STRIPPER1__STATIC = 201;
var DUKE_TIP1__STATIC = 202;
var DUKE_KILLED2__STATIC = 203;
var PRED_ROAM2__STATIC = 204;
var PIG_ROAM2__STATIC = 205;
var DUKE_GETWEAPON1__STATIC = 206;
var DUKE_SEARCH2__STATIC = 207;
var DUKE_CRACK2__STATIC = 208;
var DUKE_SEARCH__STATIC = 209;
var DUKE_GET__STATIC = 210;
var DUKE_LONGTERM_PAIN__STATIC = 211;
var MONITOR_ACTIVE__STATIC = 212;
var NITEVISION_ONOFF__STATIC = 213;
var DUKE_HIT_STRIPPER2__STATIC = 214;
var DUKE_CRACK_FIRST__STATIC = 215;
var DUKE_USEMEDKIT__STATIC = 216;
var DUKE_TAKEPILLS__STATIC = 217;
var DUKE_PISSRELIEF__STATIC = 218;
var SELECT_WEAPON__STATIC = 219;
var WATER_GURGLE__STATIC = 220;
var DUKE_GETWEAPON4__STATIC = 221;
var JIBBED_ACTOR1__STATIC = 222;
var JIBBED_ACTOR2__STATIC = 223;
var JIBBED_ACTOR3__STATIC = 224;
var JIBBED_ACTOR4__STATIC = 225;
var JIBBED_ACTOR5__STATIC = 226;
var JIBBED_ACTOR6__STATIC = 227;
var JIBBED_ACTOR7__STATIC = 228;
var DUKE_GOTHEALTHATLOW__STATIC = 229;
var BOSSTALKTODUKE__STATIC = 230;
var WAR_AMBIENCE1__STATIC = 231;
var WAR_AMBIENCE2__STATIC = 232;
var WAR_AMBIENCE3__STATIC = 233;
var WAR_AMBIENCE4__STATIC = 234;
var WAR_AMBIENCE5__STATIC = 235;
var WAR_AMBIENCE6__STATIC = 236;
var WAR_AMBIENCE7__STATIC = 237;
var WAR_AMBIENCE8__STATIC = 238;
var WAR_AMBIENCE9__STATIC = 239;
var WAR_AMBIENCE10__STATIC = 240;
var ALIEN_TALK1__STATIC = 241;
var ALIEN_TALK2__STATIC = 242;
var EXITMENUSOUND__STATIC = 243;
var FLY_BY__STATIC = 244;
var DUKE_SCREAM__STATIC = 245;
var SHRINKER_HIT__STATIC = 246;
var RATTY__STATIC = 247;
var INTO_MENU__STATIC = 248;
var BONUSMUSIC__STATIC = 249;
var DUKE_BOOBY__STATIC = 250;
var DUKE_TALKTOBOSSFALL__STATIC = 251;
var DUKE_LOOKINTOMIRROR__STATIC = 252;
var PIG_ROAM3__STATIC = 253;
var KILLME__STATIC = 254;
var DRON_JETSND__STATIC = 255;
var SPACE_DOOR1__STATIC = 256;
var SPACE_DOOR2__STATIC = 257;
var SPACE_DOOR3__STATIC = 258;
var SPACE_DOOR4__STATIC = 259;
var SPACE_DOOR5__STATIC = 260;
var ALIEN_ELEVATOR1__STATIC = 261;
var VAULT_DOOR__STATIC = 262;
var JIBBED_ACTOR13__STATIC = 263;
var DUKE_GETWEAPON6__STATIC = 264;
var JIBBED_ACTOR8__STATIC = 265;
var JIBBED_ACTOR9__STATIC = 266;
var JIBBED_ACTOR10__STATIC = 267;
var JIBBED_ACTOR11__STATIC = 268;
var JIBBED_ACTOR12__STATIC = 269;
var DUKE_KILLED4__STATIC = 270;
var DUKE_KILLED5__STATIC = 271;
var ALIEN_SWITCH1__STATIC = 272;
var DUKE_STEPONFECES__STATIC = 273;
var DUKE_LONGTERM_PAIN2__STATIC = 274;
var DUKE_LONGTERM_PAIN3__STATIC = 275;
var DUKE_LONGTERM_PAIN4__STATIC = 276;
var COMPANB2__STATIC = 277;
var KTIT__STATIC = 278;
var HELICOP_IDLE__STATIC = 279;
var STEPNIT__STATIC = 280;
var SPACE_AMBIENCE1__STATIC = 281;
var SPACE_AMBIENCE2__STATIC = 282;
var SLIM_HATCH__STATIC = 283;
var RIPHEADNECK__STATIC = 284;
var FOUNDJONES__STATIC = 285;
var ALIEN_DOOR1__STATIC = 286;
var ALIEN_DOOR2__STATIC = 287;
var ENDSEQVOL3SND4__STATIC = 288;
var ENDSEQVOL3SND5__STATIC = 289;
var ENDSEQVOL3SND6__STATIC = 290;
var ENDSEQVOL3SND7__STATIC = 291;
var ENDSEQVOL3SND8__STATIC = 292;
var ENDSEQVOL3SND9__STATIC = 293;
var WHIPYOURASS__STATIC = 294;
var ENDSEQVOL2SND1__STATIC = 295;
var ENDSEQVOL2SND2__STATIC = 296;
var ENDSEQVOL2SND3__STATIC = 297;
var ENDSEQVOL2SND4__STATIC = 298;
var ENDSEQVOL2SND5__STATIC = 299;
var ENDSEQVOL2SND6__STATIC = 300;
var ENDSEQVOL2SND7__STATIC = 301;
var GENERIC_AMBIENCE23__STATIC = 302;
var SOMETHINGFROZE__STATIC = 303;
var DUKE_LONGTERM_PAIN5__STATIC = 304;
var DUKE_LONGTERM_PAIN6__STATIC = 305;
var DUKE_LONGTERM_PAIN7__STATIC = 306;
var DUKE_LONGTERM_PAIN8__STATIC = 307;
var WIND_REPEAT__STATIC = 308;
var MYENEMY_ROAM__STATIC = 309;
var MYENEMY_HURT__STATIC = 310;
var MYENEMY_DEAD__STATIC = 311;
var MYENEMY_SHOOT__STATIC = 312;
var STORE_MUSIC__STATIC = 313;
var STORE_MUSIC_BROKE__STATIC = 314;
var ACTOR_GROWING__STATIC = 315;
var NEWBEAST_ROAM__STATIC = 316;
var NEWBEAST_RECOG__STATIC = 317;
var NEWBEAST_ATTACK__STATIC = 318;
var NEWBEAST_PAIN__STATIC = 319;
var NEWBEAST_DYING__STATIC = 320;
var NEWBEAST_SPIT__STATIC = 321;
var VOL4_1__STATIC = 322;
var SUPERMARKET__STATIC = 323;
var MOUSEANNOY__STATIC = 324;
var BOOKEM__STATIC = 325;
var SUPERMARKETCRY__STATIC = 326;
var DESTRUCT__STATIC = 327;
var EATFOOD__STATIC = 328;
var MAKEMYDAY__STATIC = 329;
var WITNESSSTAND__STATIC = 330;
var VACATIONSPEECH__STATIC = 331;
var YIPPEE1__STATIC = 332;
var YOHOO1__STATIC = 333;
var YOHOO2__STATIC = 334;
var DOLPHINSND__STATIC = 335;
var TOUGHGALSND1__STATIC = 336;
var TOUGHGALSND2__STATIC = 337;
var TOUGHGALSND3__STATIC = 338;
var TOUGHGALSND4__STATIC = 339;
var TANK_ROAM__STATIC = 340;
var BOS4_ROAM__STATIC = 341;
var BOS4_RECOG__STATIC = 342;
var BOS4_ATTACK__STATIC = 343;
var BOS4_PAIN__STATIC = 344;
var BOS4_DYING__STATIC = 345;
var NEWBEAST_ATTACKMISS__STATIC = 346;
var VOL4_2__STATIC = 347;
var COOKINGDEEPFRIER__STATIC = 348;
var WHINING_DOG__STATIC = 349;
var DEAD_DOG__STATIC = 350;
var LIGHTNING_SLAP__STATIC = 351;
var THUNDER__STATIC = 352;
var HAPPYMOUSESND1__STATIC = 353;
var HAPPYMOUSESND2__STATIC = 354;
var HAPPYMOUSESND3__STATIC = 355;
var HAPPYMOUSESND4__STATIC = 356;
var ALARM__STATIC = 357;
var RAIN__STATIC = 358;
var DTAG_GREENRUN__STATIC = 359;
var DTAG_BROWNRUN__STATIC = 360;
var DTAG_GREENSCORE__STATIC = 361;
var DTAG_BROWNSCORE__STATIC = 362;
var INTRO4_1__STATIC = 363;
var INTRO4_2__STATIC = 364;
var INTRO4_3__STATIC = 365;
var INTRO4_4__STATIC = 366;
var INTRO4_5__STATIC = 367;
var INTRO4_6__STATIC = 368;
var SCREECH__STATIC = 369;
var BOSS4_DEADSPEECH__STATIC = 370;
var BOSS4_FIRSTSEE__STATIC = 371;
var PARTY_SPEECH__STATIC = 372;
var POSTAL_SPEECH__STATIC = 373;
var TGSPEECH__STATIC = 374;
var DOGROOMSPEECH__STATIC = 375;
var SMACKED__STATIC = 376;
var MDEVSPEECH__STATIC = 377;
var AREA51SPEECH__STATIC = 378;
var JEEPSOUND__STATIC = 379;
var BIGDOORSLAM__STATIC = 380;
var BOS4_LAY__STATIC = 381;
var WAVESOUND__STATIC = 382;
var ILLBEBACK__STATIC = 383;
var VOL4ENDSND1__STATIC = 384;
var VOL4ENDSND2__STATIC = 385;
var EXPANDERHIT__STATIC = 386;
var SNAKESPEECH__STATIC = 387;
var EXPANDERSHOOT__STATIC = 388;
var GETBACKTOWORK__STATIC = 389;
var JIBBED_ACTOR14__STATIC = 390;
var JIBBED_ACTOR15__STATIC = 391;
var INTRO4_B__STATIC = 392;
var BIGBANG__STATIC = 393;
var HORNSND__STATIC = 394;
var BELLSND__STATIC = 395;
var GOAWAY__STATIC = 396;
var JOKE__STATIC = 397;

//extern int16_t DynamicSoundMap[MAXSOUNDS];

//void G_InitDynamicSounds(void);

//#ifdef DYNSOUNDREMAP_ENABLE

//void G_ProcessDynamicSoundMapping(const char *szLabel, int32_t lValue);

//#if !defined LUNATIC
//void initsoundhashnames(void);
//void freesoundhashnames(void);
//#endif

//extern int32_t KICK_HIT;
//extern int32_t PISTOL_RICOCHET;
//extern int32_t PISTOL_BODYHIT;
//extern int32_t PISTOL_FIRE;
//extern int32_t EJECT_CLIP;
//extern int32_t INSERT_CLIP;
//extern int32_t CHAINGUN_FIRE;
//extern int32_t RPG_SHOOT;
//extern int32_t POOLBALLHIT;
//extern int32_t RPG_EXPLODE;
//extern int32_t CAT_FIRE;
//extern int32_t SHRINKER_FIRE;
//extern int32_t ACTOR_SHRINKING;
//extern int32_t PIPEBOMB_BOUNCE;
//extern int32_t PIPEBOMB_EXPLODE;
//extern int32_t LASERTRIP_ONWALL;
//extern int32_t LASERTRIP_ARMING;
//extern int32_t LASERTRIP_EXPLODE;
//extern int32_t VENT_BUST;
//extern int32_t GLASS_BREAKING;
//extern int32_t GLASS_HEAVYBREAK;
//extern int32_t SHORT_CIRCUIT;
//extern int32_t ITEM_SPLASH;
//extern int32_t DUKE_BREATHING;
//extern int32_t DUKE_EXHALING;
//extern int32_t DUKE_GASP;
//extern int32_t SLIM_RECOG;
//// extern int32_t ENDSEQVOL3SND1;
//extern int32_t DUKE_URINATE;
//extern int32_t ENDSEQVOL3SND2;
//extern int32_t ENDSEQVOL3SND3;
//extern int32_t DUKE_PASSWIND;
//extern int32_t DUKE_CRACK;
//extern int32_t SLIM_ATTACK;
//extern int32_t SOMETHINGHITFORCE;
//extern int32_t DUKE_DRINKING;
//extern int32_t DUKE_KILLED1;
//extern int32_t DUKE_GRUNT;
//extern int32_t DUKE_HARTBEAT;
//extern int32_t DUKE_ONWATER;
//extern int32_t DUKE_DEAD;
//extern int32_t DUKE_LAND;
//extern int32_t DUKE_WALKINDUCTS;
//extern int32_t DUKE_GLAD;
//extern int32_t DUKE_YES;
//extern int32_t DUKE_HEHE;
//extern int32_t DUKE_SHUCKS;
//extern int32_t DUKE_UNDERWATER;
//extern int32_t DUKE_JETPACK_ON;
//extern int32_t DUKE_JETPACK_IDLE;
//extern int32_t DUKE_JETPACK_OFF;
//extern int32_t LIZTROOP_GROWL;
//extern int32_t LIZTROOP_TALK1;
//extern int32_t LIZTROOP_TALK2;
//extern int32_t LIZTROOP_TALK3;
//extern int32_t DUKETALKTOBOSS;
//extern int32_t LIZCAPT_GROWL;
//extern int32_t LIZCAPT_TALK1;
//extern int32_t LIZCAPT_TALK2;
//extern int32_t LIZCAPT_TALK3;
//extern int32_t LIZARD_BEG;
//extern int32_t LIZARD_PAIN;
//extern int32_t LIZARD_DEATH;
//extern int32_t LIZARD_SPIT;
//extern int32_t DRONE1_HISSRATTLE;
//extern int32_t DRONE1_HISSSCREECH;
//extern int32_t DUKE_TIP2;
//extern int32_t FLESH_BURNING;
//extern int32_t SQUISHED;
//extern int32_t TELEPORTER;
//extern int32_t ELEVATOR_ON;
//extern int32_t DUKE_KILLED3;
//extern int32_t ELEVATOR_OFF;
//extern int32_t DOOR_OPERATE1;
//extern int32_t SUBWAY;
//extern int32_t SWITCH_ON;
//extern int32_t FAN;
//extern int32_t DUKE_GETWEAPON3;
//extern int32_t FLUSH_TOILET;
//extern int32_t HOVER_CRAFT;
//extern int32_t EARTHQUAKE;
//extern int32_t INTRUDER_ALERT;
//extern int32_t END_OF_LEVEL_WARN;
//extern int32_t ENGINE_OPERATING;
//extern int32_t REACTOR_ON;
//extern int32_t COMPUTER_AMBIENCE;
//extern int32_t GEARS_GRINDING;
//extern int32_t BUBBLE_AMBIENCE;
//extern int32_t MACHINE_AMBIENCE;
//extern int32_t SEWER_AMBIENCE;
//extern int32_t WIND_AMBIENCE;
//extern int32_t SOMETHING_DRIPPING;
//extern int32_t STEAM_HISSING;
//extern int32_t THEATER_BREATH;
//extern int32_t BAR_MUSIC;
//extern int32_t BOS1_ROAM;
//extern int32_t BOS1_RECOG;
//extern int32_t BOS1_ATTACK1;
//extern int32_t BOS1_PAIN;
//extern int32_t BOS1_DYING;
//extern int32_t BOS2_ROAM;
//extern int32_t BOS2_RECOG;
//extern int32_t BOS2_ATTACK;
//extern int32_t BOS2_PAIN;
//extern int32_t BOS2_DYING;
//extern int32_t GETATOMICHEALTH;
//extern int32_t DUKE_GETWEAPON2;
//extern int32_t BOS3_DYING;
//extern int32_t SHOTGUN_FIRE;
//extern int32_t PRED_ROAM;
//extern int32_t PRED_RECOG;
//extern int32_t PRED_ATTACK;
//extern int32_t PRED_PAIN;
//extern int32_t PRED_DYING;
//extern int32_t CAPT_ROAM;
//extern int32_t CAPT_ATTACK;
//extern int32_t CAPT_RECOG;
//extern int32_t CAPT_PAIN;
//extern int32_t CAPT_DYING;
//extern int32_t PIG_ROAM;
//extern int32_t PIG_RECOG;
//extern int32_t PIG_ATTACK;
//extern int32_t PIG_PAIN;
//extern int32_t PIG_DYING;
//extern int32_t RECO_ROAM;
//extern int32_t RECO_RECOG;
//extern int32_t RECO_ATTACK;
//extern int32_t RECO_PAIN;
//extern int32_t RECO_DYING;
//extern int32_t DRON_ROAM;
//extern int32_t DRON_RECOG;
//extern int32_t DRON_ATTACK1;
//extern int32_t DRON_PAIN;
//extern int32_t DRON_DYING;
//extern int32_t COMM_ROAM;
//extern int32_t COMM_RECOG;
//extern int32_t COMM_ATTACK;
//extern int32_t COMM_PAIN;
//extern int32_t COMM_DYING;
//extern int32_t OCTA_ROAM;
//extern int32_t OCTA_RECOG;
//extern int32_t OCTA_ATTACK1;
//extern int32_t OCTA_PAIN;
//extern int32_t OCTA_DYING;
//extern int32_t TURR_ROAM;
//extern int32_t TURR_RECOG;
//extern int32_t TURR_ATTACK;
//extern int32_t DUMPSTER_MOVE;
//extern int32_t SLIM_DYING;
//extern int32_t BOS3_ROAM;
//extern int32_t BOS3_RECOG;
//extern int32_t BOS3_ATTACK1;
//extern int32_t BOS3_PAIN;
//extern int32_t BOS1_ATTACK2;
//extern int32_t COMM_SPIN;
//extern int32_t BOS1_WALK;
//extern int32_t DRON_ATTACK2;
//extern int32_t THUD;
//extern int32_t OCTA_ATTACK2;
//extern int32_t WIERDSHOT_FLY;
//extern int32_t TURR_PAIN;
//extern int32_t TURR_DYING;
//extern int32_t SLIM_ROAM;
//extern int32_t LADY_SCREAM;
//extern int32_t DOOR_OPERATE2;
//extern int32_t DOOR_OPERATE3;
//extern int32_t DOOR_OPERATE4;
//extern int32_t BORNTOBEWILDSND;
//extern int32_t SHOTGUN_COCK;
//extern int32_t GENERIC_AMBIENCE1;
//extern int32_t GENERIC_AMBIENCE2;
//extern int32_t GENERIC_AMBIENCE3;
//extern int32_t GENERIC_AMBIENCE4;
//extern int32_t GENERIC_AMBIENCE5;
//extern int32_t GENERIC_AMBIENCE6;
//extern int32_t BOS3_ATTACK2;
//extern int32_t GENERIC_AMBIENCE17;
//extern int32_t GENERIC_AMBIENCE18;
//extern int32_t GENERIC_AMBIENCE19;
//extern int32_t GENERIC_AMBIENCE20;
//extern int32_t GENERIC_AMBIENCE21;
//extern int32_t GENERIC_AMBIENCE22;
//extern int32_t SECRETLEVELSND;
//extern int32_t GENERIC_AMBIENCE8;
//extern int32_t GENERIC_AMBIENCE9;
//extern int32_t GENERIC_AMBIENCE10;
//extern int32_t GENERIC_AMBIENCE11;
//extern int32_t GENERIC_AMBIENCE12;
//extern int32_t GENERIC_AMBIENCE13;
//extern int32_t GENERIC_AMBIENCE14;
//extern int32_t GENERIC_AMBIENCE15;
//extern int32_t GENERIC_AMBIENCE16;
//extern int32_t FIRE_CRACKLE;
//extern int32_t BONUS_SPEECH1;
//extern int32_t BONUS_SPEECH2;
//extern int32_t BONUS_SPEECH3;
//extern int32_t PIG_CAPTURE_DUKE;
//extern int32_t BONUS_SPEECH4;
//extern int32_t DUKE_LAND_HURT;
//extern int32_t DUKE_HIT_STRIPPER1;
//extern int32_t DUKE_TIP1;
//extern int32_t DUKE_KILLED2;
//extern int32_t PRED_ROAM2;
//extern int32_t PIG_ROAM2;
//extern int32_t DUKE_GETWEAPON1;
//extern int32_t DUKE_SEARCH2;
//extern int32_t DUKE_CRACK2;
//extern int32_t DUKE_SEARCH;
//extern int32_t DUKE_GET;
//extern int32_t DUKE_LONGTERM_PAIN;
//extern int32_t MONITOR_ACTIVE;
//extern int32_t NITEVISION_ONOFF;
//extern int32_t DUKE_HIT_STRIPPER2;
//extern int32_t DUKE_CRACK_FIRST;
//extern int32_t DUKE_USEMEDKIT;
//extern int32_t DUKE_TAKEPILLS;
//extern int32_t DUKE_PISSRELIEF;
//extern int32_t SELECT_WEAPON;
//extern int32_t WATER_GURGLE;
//extern int32_t DUKE_GETWEAPON4;
//extern int32_t JIBBED_ACTOR1;
//extern int32_t JIBBED_ACTOR2;
//extern int32_t JIBBED_ACTOR3;
//extern int32_t JIBBED_ACTOR4;
//extern int32_t JIBBED_ACTOR5;
//extern int32_t JIBBED_ACTOR6;
//extern int32_t JIBBED_ACTOR7;
//extern int32_t DUKE_GOTHEALTHATLOW;
//extern int32_t BOSSTALKTODUKE;
//extern int32_t WAR_AMBIENCE1;
//extern int32_t WAR_AMBIENCE2;
//extern int32_t WAR_AMBIENCE3;
//extern int32_t WAR_AMBIENCE4;
//extern int32_t WAR_AMBIENCE5;
//extern int32_t WAR_AMBIENCE6;
//extern int32_t WAR_AMBIENCE7;
//extern int32_t WAR_AMBIENCE8;
//extern int32_t WAR_AMBIENCE9;
//extern int32_t WAR_AMBIENCE10;
//extern int32_t ALIEN_TALK1;
//extern int32_t ALIEN_TALK2;
//extern int32_t EXITMENUSOUND;
//extern int32_t FLY_BY;
//extern int32_t DUKE_SCREAM;
//extern int32_t SHRINKER_HIT;
//extern int32_t RATTY;
//extern int32_t INTO_MENU;
//extern int32_t BONUSMUSIC;
//extern int32_t DUKE_BOOBY;
//extern int32_t DUKE_TALKTOBOSSFALL;
//extern int32_t DUKE_LOOKINTOMIRROR;
//extern int32_t PIG_ROAM3;
//extern int32_t KILLME;
//extern int32_t DRON_JETSND;
//extern int32_t SPACE_DOOR1;
//extern int32_t SPACE_DOOR2;
//extern int32_t SPACE_DOOR3;
//extern int32_t SPACE_DOOR4;
//extern int32_t SPACE_DOOR5;
//extern int32_t ALIEN_ELEVATOR1;
//extern int32_t VAULT_DOOR;
//extern int32_t JIBBED_ACTOR13;
//extern int32_t DUKE_GETWEAPON6;
//extern int32_t JIBBED_ACTOR8;
//extern int32_t JIBBED_ACTOR9;
//extern int32_t JIBBED_ACTOR10;
//extern int32_t JIBBED_ACTOR11;
//extern int32_t JIBBED_ACTOR12;
//extern int32_t DUKE_KILLED4;
//extern int32_t DUKE_KILLED5;
//extern int32_t ALIEN_SWITCH1;
//extern int32_t DUKE_STEPONFECES;
//extern int32_t DUKE_LONGTERM_PAIN2;
//extern int32_t DUKE_LONGTERM_PAIN3;
//extern int32_t DUKE_LONGTERM_PAIN4;
//extern int32_t COMPANB2;
//extern int32_t KTIT;
//extern int32_t HELICOP_IDLE;
//extern int32_t STEPNIT;
//extern int32_t SPACE_AMBIENCE1;
//extern int32_t SPACE_AMBIENCE2;
//extern int32_t SLIM_HATCH;
//extern int32_t RIPHEADNECK;
//extern int32_t FOUNDJONES;
//extern int32_t ALIEN_DOOR1;
//extern int32_t ALIEN_DOOR2;
//extern int32_t ENDSEQVOL3SND4;
//extern int32_t ENDSEQVOL3SND5;
//extern int32_t ENDSEQVOL3SND6;
//extern int32_t ENDSEQVOL3SND7;
//extern int32_t ENDSEQVOL3SND8;
//extern int32_t ENDSEQVOL3SND9;
//extern int32_t WHIPYOURASS;
//extern int32_t ENDSEQVOL2SND1;
//extern int32_t ENDSEQVOL2SND2;
//extern int32_t ENDSEQVOL2SND3;
//extern int32_t ENDSEQVOL2SND4;
//extern int32_t ENDSEQVOL2SND5;
//extern int32_t ENDSEQVOL2SND6;
//extern int32_t ENDSEQVOL2SND7;
//extern int32_t GENERIC_AMBIENCE23;
//extern int32_t SOMETHINGFROZE;
//extern int32_t DUKE_LONGTERM_PAIN5;
//extern int32_t DUKE_LONGTERM_PAIN6;
//extern int32_t DUKE_LONGTERM_PAIN7;
//extern int32_t DUKE_LONGTERM_PAIN8;
//extern int32_t WIND_REPEAT;
//extern int32_t MYENEMY_ROAM;
//extern int32_t MYENEMY_HURT;
//extern int32_t MYENEMY_DEAD;
//extern int32_t MYENEMY_SHOOT;
//extern int32_t STORE_MUSIC;
//extern int32_t STORE_MUSIC_BROKE;
//extern int32_t ACTOR_GROWING;
//extern int32_t NEWBEAST_ROAM;
//extern int32_t NEWBEAST_RECOG;
//extern int32_t NEWBEAST_ATTACK;
//extern int32_t NEWBEAST_PAIN;
//extern int32_t NEWBEAST_DYING;
//extern int32_t NEWBEAST_SPIT;
//extern int32_t VOL4_1;
//extern int32_t SUPERMARKET;
//extern int32_t MOUSEANNOY;
//extern int32_t BOOKEM;
//extern int32_t SUPERMARKETCRY;
//extern int32_t DESTRUCT;
//extern int32_t EATFOOD;
//extern int32_t MAKEMYDAY;
//extern int32_t WITNESSSTAND;
//extern int32_t VACATIONSPEECH;
//extern int32_t YIPPEE1;
//extern int32_t YOHOO1;
//extern int32_t YOHOO2;
//extern int32_t DOLPHINSND;
//extern int32_t TOUGHGALSND1;
//extern int32_t TOUGHGALSND2;
//extern int32_t TOUGHGALSND3;
//extern int32_t TOUGHGALSND4;
//extern int32_t TANK_ROAM;
//extern int32_t BOS4_ROAM;
//extern int32_t BOS4_RECOG;
//extern int32_t BOS4_ATTACK;
//extern int32_t BOS4_PAIN;
//extern int32_t BOS4_DYING;
//extern int32_t NEWBEAST_ATTACKMISS;
//extern int32_t VOL4_2;
//extern int32_t COOKINGDEEPFRIER;
//extern int32_t WHINING_DOG;
//extern int32_t DEAD_DOG;
//extern int32_t LIGHTNING_SLAP;
//extern int32_t THUNDER;
//extern int32_t HAPPYMOUSESND1;
//extern int32_t HAPPYMOUSESND2;
//extern int32_t HAPPYMOUSESND3;
//extern int32_t HAPPYMOUSESND4;
//extern int32_t ALARM;
//extern int32_t RAIN;
//extern int32_t DTAG_GREENRUN;
//extern int32_t DTAG_BROWNRUN;
//extern int32_t DTAG_GREENSCORE;
//extern int32_t DTAG_BROWNSCORE;
//extern int32_t INTRO4_1;
//extern int32_t INTRO4_2;
//extern int32_t INTRO4_3;
//extern int32_t INTRO4_4;
//extern int32_t INTRO4_5;
//extern int32_t INTRO4_6;
//extern int32_t SCREECH;
//extern int32_t BOSS4_DEADSPEECH;
//extern int32_t BOSS4_FIRSTSEE;
//extern int32_t PARTY_SPEECH;
//extern int32_t POSTAL_SPEECH;
//extern int32_t TGSPEECH;
//extern int32_t DOGROOMSPEECH;
//extern int32_t SMACKED;
//extern int32_t MDEVSPEECH;
//extern int32_t AREA51SPEECH;
//extern int32_t JEEPSOUND;
//extern int32_t BIGDOORSLAM;
//extern int32_t BOS4_LAY;
//extern int32_t WAVESOUND;
//extern int32_t ILLBEBACK;
//extern int32_t VOL4ENDSND1;
//extern int32_t VOL4ENDSND2;
//extern int32_t EXPANDERHIT;
//extern int32_t SNAKESPEECH;
//extern int32_t EXPANDERSHOOT;
//extern int32_t GETBACKTOWORK;
//extern int32_t JIBBED_ACTOR14;
//extern int32_t JIBBED_ACTOR15;
//extern int32_t INTRO4_B;
//extern int32_t BIGBANG;
//extern int32_t HORNSND;
//extern int32_t BELLSND;
//extern int32_t GOAWAY;
//extern int32_t JOKE;

//#define DYNAMICSOUNDMAP(Soundnum) (DynamicSoundMap[Soundnum])

//#else  /* if !defined DYNSOUNDREMAP_ENABLE */

//#define G_ProcessDynamicSoundMapping(x, y) ((void)(0))

//#define initsoundhashnames() ((void)0)
//#define freesoundhashnames() ((void)0)

//#include "soundefs.h"

//#define DYNAMICSOUNDMAP(Soundnum) (Soundnum)

//#endif

//-------------------------------------------------------------------------
/*
Copyright (C) 2011 EDuke32 developers and contributors

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
//-------------------------------------------------------------------------T

//#ifndef __quotes_h__
//#define __quotes_h__

var MAXQUOTES                  =16384;
var MAXQUOTELEN                =128;
var OBITQUOTEINDEX             =(MAXQUOTES-128);
var SUICIDEQUOTEINDEX          =(MAXQUOTES-32);

function NOBETAQUOTE(x: number): number {return /*window.DUKEBETA todo!*/ false ? -1 : x;}

var  QUOTE_SHOW_MAP_OFF          =NOBETAQUOTE(1)
var  QUOTE_ACTIVATED             =2
var  QUOTE_MEDKIT                =3
var  QUOTE_LOCKED                =4
var  QUOTE_CHEAT_EVERYTHING      =5
var  QUOTE_BOOTS                 =6
var  QUOTE_WASTED                =7
var  QUOTE_UNLOCKED              =8
var  QUOTE_FOUND_SECRET          =9
var  QUOTE_SQUISHED              =10
var  QUOTE_USED_STEROIDS         =NOBETAQUOTE(12)
var  QUOTE_DEACTIVATED           =15
var  QUOTE_CHEAT_GODMODE_ON      =17
var  QUOTE_CHEAT_GODMODE_OFF     =18
var  QUOTE_CROSSHAIR_OFF         =NOBETAQUOTE(21)
var  QUOTE_CHEATS_DISABLED       =22
var  QUOTE_MESSAGES_ON           =23
var  QUOTE_MESSAGES_OFF          =24
var  QUOTE_MUSIC                 =26
var  QUOTE_CHEAT_STEROIDS        =37
var  QUOTE_F1HELP                =40
var  QUOTE_MOUSE_AIMING_OFF      =44
var  QUOTE_HOLODUKE_ON           =47
var  QUOTE_HOLODUKE_OFF          =48
var  QUOTE_HOLODUKE_NOT_FOUND    =49
var  QUOTE_JETPACK_NOT_FOUND     =50
var  QUOTE_JETPACK_ON            =52
var  QUOTE_JETPACK_OFF           =53
var  QUOTE_NEED_BLUE_KEY         =70
var  QUOTE_NEED_RED_KEY          =71
var  QUOTE_NEED_YELLOW_KEY       =72
var  QUOTE_WEAPON_LOWERED        =73
var  QUOTE_WEAPON_RAISED         =74
var  QUOTE_BOOTS_ON              =75
var  QUOTE_SCUBA_ON              =76
var  QUOTE_CHEAT_ALLEN           =NOBETAQUOTE(79)
var  QUOTE_MIGHTY_FOOT           =80
var  QUOTE_WEAPON_MODE_OFF       =NOBETAQUOTE(82)
var  QUOTE_MAP_FOLLOW_OFF        =83
var  QUOTE_RUN_MODE_OFF          =85
var  QUOTE_JETPACK               =88
var  QUOTE_SCUBA                 =89
var  QUOTE_STEROIDS              =90
var  QUOTE_HOLODUKE              =91
var  QUOTE_CHEAT_TODD            =NOBETAQUOTE(99)
var  QUOTE_CHEAT_UNLOCK          =NOBETAQUOTE(100)
var  QUOTE_NVG                   =101
var  QUOTE_WEREGONNAFRYYOURASS   =102
var  QUOTE_SCREEN_SAVED          =103
var  QUOTE_CHEAT_BETA            =NOBETAQUOTE(105)
var  QUOTE_NVG_OFF               =107
var  QUOTE_VIEW_MODE_OFF         =NOBETAQUOTE(109)
var  QUOTE_SHOW_MAP_ON           =NOBETAQUOTE(111)
var  QUOTE_CHEAT_NOCLIP          =NOBETAQUOTE(113)
var  QUOTE_SAVE_BAD_VERSION      =114
var  QUOTE_RESERVED              =115
var  QUOTE_RESERVED2             =116
var  QUOTE_RESERVED3             =117
var  QUOTE_SAVE_DEAD             =NOBETAQUOTE(118)
var  QUOTE_CHEAT_ALL_WEAPONS     =NOBETAQUOTE(119)
var  QUOTE_CHEAT_ALL_INV         =NOBETAQUOTE(120)
var  QUOTE_CHEAT_ALL_KEYS        =NOBETAQUOTE(121)
var  QUOTE_RESERVED4             =122
var  QUOTE_SAVE_BAD_PLAYERS      =124

//#endif

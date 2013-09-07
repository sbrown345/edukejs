/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/todo.ts" />
/// <reference path="../../utils/types.ts" />

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

// function.h

// file created by makehead.exe
// these headers contain default key assignments, as well as
// default button assignments and game function names
// axis defaults are also included


//#ifndef _function_public_
//#define _function_public_
//#ifdef EXTERNC
//{
//#endif

var NUMKEYENTRIES = 56;
var NUMGAMEFUNCTIONS = 56;
var MAXGAMEFUNCLEN = 32;

//extern char [NUMGAMEFUNCTIONS][MAXGAMEFUNCLEN];
//extern char keydefaults[NUMGAMEFUNCTIONS*3][MAXGAMEFUNCLEN];
//extern const char oldkeydefaults[NUMGAMEFUNCTIONS*3][MAXGAMEFUNCLEN];

//enum GameFunction_t
//   {
var gamefunc_Move_Forward=0,
    gamefunc_Move_Backward=1,
    gamefunc_Turn_Left=2,
    gamefunc_Turn_Right=3,
    gamefunc_Strafe=4,
    gamefunc_Fire=5,
    gamefunc_Open=6,
    gamefunc_Run=7,
    gamefunc_AutoRun=8,
    gamefunc_Jump=9,
    gamefunc_Crouch=10,
    gamefunc_Look_Up=11,
    gamefunc_Look_Down=12,
    gamefunc_Look_Left=13,
    gamefunc_Look_Right=14,
    gamefunc_Strafe_Left=15,
    gamefunc_Strafe_Right=16,
    gamefunc_Aim_Up=17,
    gamefunc_Aim_Down=18,
    gamefunc_Weapon_1=19,
    gamefunc_Weapon_2=20,
    gamefunc_Weapon_3=21,
    gamefunc_Weapon_4=22,
    gamefunc_Weapon_5=23,
    gamefunc_Weapon_6=24,
    gamefunc_Weapon_7=25,
    gamefunc_Weapon_8=26,
    gamefunc_Weapon_9=27,
    gamefunc_Weapon_10=28,
    gamefunc_Inventory=29,
    gamefunc_Inventory_Left=30,
    gamefunc_Inventory_Right=31,
    gamefunc_Holo_Duke=32,
    gamefunc_Jetpack=33,
    gamefunc_NightVision=34,
    gamefunc_MedKit=35,
    gamefunc_TurnAround=36,
    gamefunc_SendMessage=37,
    gamefunc_Map=38,
    gamefunc_Shrink_Screen=39,
    gamefunc_Enlarge_Screen=40,
    gamefunc_Center_View=41,
    gamefunc_Holster_Weapon=42,
    gamefunc_Show_Opponents_Weapon=43,
    gamefunc_Map_Follow_Mode=44,
    gamefunc_See_Coop_View=45,
    gamefunc_Mouse_Aiming=46,
    gamefunc_Toggle_Crosshair=47,
    gamefunc_Steroids=48,
    gamefunc_Quick_Kick=49,
    gamefunc_Next_Weapon=50,
    gamefunc_Previous_Weapon=51,
    gamefunc_Show_Console=52,
    gamefunc_Show_DukeMatch_Scores=53,
    gamefunc_Dpad_Select=54,
    gamefunc_Dpad_Aiming=55;
   //};
//#ifdef EXTERNC
//};
//#endif
//#endif

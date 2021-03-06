/// <reference path="../../eduke32/headers/gamedef.h.ts" />


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

//#ifndef __gamevars_h__
//#define __gamevars_h__

//#include "gamedef.h"

var MAXGAMEVARS = 2048; // must be a power of two
var MAXVARLABEL = 26;

// store global game definitions
//enum GamevarFlags_t {
var GAMEVAR_PERPLAYER  = 0x00000001, // per-player variable
    GAMEVAR_PERACTOR   = 0x00000002, // per-actor variable
    GAMEVAR_USER_MASK  = (GAMEVAR_PERPLAYER|GAMEVAR_PERACTOR),
    GAMEVAR_RESET      = 0x00000008, // INTERNAL, don't use
    GAMEVAR_DEFAULT    = 0x00000100, // UNUSED, but always cleared for user-defined gamevars
    GAMEVAR_SECRET     = 0x00000200, // don't dump...
    GAMEVAR_NODEFAULT  = 0x00000400, // don't reset on actor spawn
    GAMEVAR_SYSTEM     = 0x00000800, // cannot change mode flags...(only default value)
    GAMEVAR_READONLY   = 0x00001000, // values are read-only (no setvar allowed)
    GAMEVAR_INTPTR     = 0x00002000, // plValues is a pointer to an int32_t
    GAMEVAR_SHORTPTR   = 0x00008000, // plValues is a pointer to a short
    GAMEVAR_CHARPTR    = 0x00010000, // plValues is a pointer to a char
    GAMEVAR_PTR_MASK   = (GAMEVAR_INTPTR|GAMEVAR_SHORTPTR|GAMEVAR_CHARPTR),
    GAMEVAR_NORESET    = 0x00020000, // var values are not reset when restoring map state
    GAMEVAR_SPECIAL    = 0x00040000, // flag for structure member shortcut vars
    GAMEVAR_NOMULTI    = 0x00080000; // don't attach to multiplayer packets
//};

//#if !defined LUNATIC

var MAXGAMEARRAYS = (MAXGAMEVARS>>2); // must be lower than MAXGAMEVARS
var MAXARRAYLABEL = MAXVARLABEL;

//enum GamearrayFlags_t {

var GAMEARRAY_READONLY = 0x00001000,
    GAMEARRAY_WARN = 0x00002000,
    
    GAMEARRAY_NORMAL   = 0x00004000,
    GAMEARRAY_OFCHAR   = 0x00000001,
    GAMEARRAY_OFSHORT  = 0x00000002,
    GAMEARRAY_OFINT    = 0x00000004,
    GAMEARRAY_TYPE_MASK = GAMEARRAY_OFCHAR|GAMEARRAY_OFSHORT|GAMEARRAY_OFINT,
    
    GAMEARRAY_VARSIZE = 0x00000020,
    
    GAMEARRAY_RESET    = 0x00000008;
/////    GAMEARRAY_NORESET  = 0x00000001,
//};

// or maybe function GetAddress(str)  - returns address number so can also use
class PtrVal {
    private _: string;

    getVal<T>(): T {
        return eval(this._);
    }

    setVal(val: any) {
        var src = this._ + " = val;";

        // http://blog.rakeshpai.me/2008/10/understanding-eval-scope-spoiler-its.html
        if (window.execScript)
            window.execScript(src); // ie
        else
            eval.call(null, src);
    }

    constructor(strToEval: string) {
        // todo: drop the string eval thing
        this._ = strToEval;
    }
}

var ptrMemoryCount = 0;
var ptrMemory: PtrVal[] = [];
var ptrMemoryMap = {};

function regIntptr_t(evalSrc: string): number {
    //if(typeof ptrMemoryMap[evalSrc] !== "undefined") {
    //    console.warn("already registered " + evalSrc);
    //}

    var offset = 10000;
    var location = offset + (ptrMemoryCount++);
    ptrMemory[location] = new PtrVal(evalSrc);
    ptrMemoryMap[evalSrc] = location;
    return location;
}

function getIntptrVal(location: number): any {
    if(typeof ptrMemory[location] == "undefined") {
        throw "not registered " + location;
    }
    return ptrMemory[location].getVal(); 
}

//#pragma pack(push,1)
class gamevar_t {
    val: gamevar_t_union;
    lDefault: number;
    dwFlags: number;
    szLabel: string;
    
    constructor() {
        this.val = new gamevar_t_union(0, null);
        this.lDefault = 0; //intptr_t lDefault;
        this.dwFlags = 0; //uintptr_t dwFlags;
        this.szLabel = ""; //char *szLabel;
    }
} //gamevar_t;

class gamevar_t_union {
    lValue: number;// intptr_t lValue;
    plValues: Int32Array;   // intptr_t *plValues;     // array of values when 'per-player', or 'per-actor'
    constructor(val: number, vals: Int32Array) {
        this.lValue = val;
        this.plValues = vals;
    }
}

class gamearray_t {
    szLabel: string;
    plValues: Int32Array;     // array of values           //intptr_t *
    size: number;                                       //intptr_t 
    dwFlags: number;                                    //intptr_t 

    constructor() {
        this.szLabel = "";
        this.plValues=null;  // intptr_t *plValues;   // array of values
        this.size=0;
        this.dwFlags=0;
    }
}
//#pragma pack(pop)

//# define GAR_ELTSZ (sizeof(aGameArrays[0].plValues[0]))

var aGameVars : gamevar_t[];
var aGameArrays : gamearray_t[];
var g_gameVarCount : number = 0;
var g_gameArrayCount : number = 0;

//int32_t __fastcall Gv_GetVar(register int32_t id,register int32_t iActor,register int32_t iPlayer);
//void __fastcall Gv_SetVar(register int32_t id,register int32_t lValue,register int32_t iActor,register int32_t iPlayer);
//int32_t __fastcall Gv_GetVarX(register int32_t id);
//void __fastcall Gv_SetVarX(register int32_t id,register int32_t lValue);

//int32_t Gv_GetVarByLabel(const char *szGameLabel,int32_t lDefault,int32_t iActor,int32_t iPlayer);
//int32_t Gv_NewArray(const char *pszLabel,void *arrayptr,intptr_t asize,uint32_t dwFlags);
//int32_t Gv_NewVar(const char *pszLabel,intptr_t lValue,uint32_t dwFlags);
//void __fastcall A_ResetVars(register int32_t iActor);
//void Gv_DumpValues(void);
//void Gv_InitWeaponPointers(void);
//void Gv_RefreshPointers(void);
//void Gv_ResetVars(void);
//int32_t Gv_ReadSave(int32_t fil,int32_t newbehav);
//void Gv_WriteSave(FILE *fil,int32_t newbehav);
//#else
//int32_t g_noResetVars;
//LUNATIC_CB void (*A_ResetVars)(int32_t iActor);
//#endif

//void Gv_ResetSystemDefaults(void);
//void Gv_Init(void);
//void Gv_FinalizeWeaponDefaults(void);

//#if !defined LUNATIC
//#define GV_VAROP(func, operator) static inline void __fastcall func(register int32_t id, register int32_t lValue) \
//{ \
//    switch (aGameVars[id].dwFlags & (GAMEVAR_USER_MASK|GAMEVAR_PTR_MASK)) \
//    { \
//    default: \
//        aGameVars[id].val.lValue operator lValue; \
//        return; \
//    case GAMEVAR_PERPLAYER: \
//        if ((unsigned)vm.g_p > MAXPLAYERS-1) return; \
//        aGameVars[id].val.plValues[vm.g_p] operator lValue; \
//        return; \
//    case GAMEVAR_PERACTOR: \
//        if ((unsigned)vm.g_i > MAXSPRITES-1) return; \
//        aGameVars[id].val.plValues[vm.g_i] operator lValue; \
//        return; \
//    case GAMEVAR_INTPTR: \
//        *((int32_t *)aGameVars[id].val.lValue) operator (int32_t)lValue; \
//        return; \
//    case GAMEVAR_SHORTPTR: \
//        *((int16_t *)aGameVars[id].val.lValue) operator (int16_t)lValue; \
//        return; \
//    case GAMEVAR_CHARPTR: \
//        *((uint8_t *)aGameVars[id].val.lValue) operator (uint8_t)lValue; \
//        return; \
//    } \
//}

//GV_VAROP(Gv_AddVar, +=)
//GV_VAROP(Gv_SubVar, -=)
//GV_VAROP(Gv_MulVar, *=)
//GV_VAROP(Gv_DivVar, /=)
//GV_VAROP(Gv_ModVar, %=)
//GV_VAROP(Gv_AndVar, &=)
//GV_VAROP(Gv_XorVar, ^=)
//GV_VAROP(Gv_OrVar, |=)
//#endif

//#endif

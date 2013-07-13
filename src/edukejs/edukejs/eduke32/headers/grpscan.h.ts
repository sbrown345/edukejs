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

//#ifndef __grpscan_h__
//#define __grpscan_h__

//#define MAXLISTNAMELEN 32

//// List of internally-known GRP files
var NUMGRPFILES = 15;

var DUKE13_CRC = int32(0xBBC9CE44);
var DUKEKR_CRC = int32(0xAA4F6A40);
var DUKE15_CRC = int32(0xFD3DCFF1);
var DUKEPP_CRC = int32(0xF514A6AC);
var DUKE099_CRC= int32(0x02F18900);
var DUKE10_CRC = int32(0xA28AA589);
var DUKE11_CRC = int32(0x912E1E8D);
var DUKESW_CRC = int32(0x983AD923);
var DUKEMD_CRC = int32(0xC5F71561);
var DUKEDC_CRC = int32(0xA8CF80DA);
var DUKECB_CRC = int32(0x18F01C5B);
var DUKENW_CRC = int32(0xF1CAE8E4);
var NAM_CRC    = int32(0x75C1F07B);
var NAPALM_CRC = int32(0x3DE1589A);
var WW2GI_CRC  = int32(0x907B82BF);

enum addon_t {
    ADDON_NONE,
    ADDON_DUKEDC,
    ADDON_NWINTER,
    ADDON_CARIBBEAN,
    NUMADDONS
};

function grpfile(name: string, crcval: number, size: number, game: number, dependency: number, scriptname: string, defname: string, next: Object /*grpfile*/) {
    this.crcval = crcval;
    this.size = size;
    this.game = game;
    this.dependency = dependency;
    this.scriptname = scriptname;
    this.defname = defname;
    this.next = next;
} //grpfile_type;

//// extern struct grpfile grpfiles[NUMGRPFILES];
//extern struct grpfile *foundgrps;
//extern struct grpfile *listgrps;

//extern struct grpfile * FindGroup(int32_t crcval);
//int32_t ScanGroups(void);
//void FreeGroups(void);

//#endif

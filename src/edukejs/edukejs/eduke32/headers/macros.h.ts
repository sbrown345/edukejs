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

//#ifndef EDUKE32_MACROS_H_
//#define EDUKE32_MACROS_H_

//// Macros, some from SW source

//#define ALT_IS_PRESSED ( KB_KeyPressed( sc_RightAlt ) || KB_KeyPressed( sc_LeftAlt ) )
function SHIFTS_IS_PRESSED():number {return KB_KeyPressed( sc_RightShift ) || KB_KeyPressed( sc_LeftShift ) ;}
function RANDOMSCRAP(s:spritetype,i:number):void {
    var krands = [krand(), krand(), krand(), krand(), krand(), krand(), krand()];
    
    A_InsertSprite(s.sectnum,s.x+(krands[6]&255)-128,s.y+(krands[5]&255)-128,s.z-(8<<8)-(krands[4]&8191),
    SCRAP6+(krands[3]&15),-8,48,48,krands[2]&2047,(krands[1]&63)+64,-512-(krands[0]&2047),i,5);
}

function GTFLAGS(x: number) {return GametypeFlags[ud.coop] & x;}

//#define TRAVERSE_SPRITE_SECT(l, o, n)    (o) = (l); ((o) != -1) && ((n) = nextspritesect[o]); (o) = (n)
//#define TRAVERSE_SPRITE_STAT(l, o, n)    (o) = (l); ((o) != -1) && ((n) = nextspritestat[o]); (o) = (n)
//#define TRAVERSE_CONNECT(i)              i = 0; i != -1; i = connectpoint2[i]

function TEST(flags:number,mask:number) :number {return (flags) & (mask)?1:0;}
function SET(flags:number,mask:number)  :number {return (flags) |= (mask)?1:0;}
function RESET(flags:number,mask:number):number {return (flags) &= ~(mask)?1:0;}
function FLIP(flags:number,mask:number) :number {return (flags) ^= (mask)?1:0;}

// mask definitions

function BIT(shift:number):number {return 1<<(shift);}

function TEST_SYNC_KEY(bits:number, sync_num:number):number {return TEST(bits, BIT(sync_num)); }

function AFLAMABLE(X:number):number {return (X==BOX||X==TREE1||X==TREE2||X==TIRE||X==CONE)?1:0;}
function rnd(X:number):number { return (krand()>>8)>=(255-(X))?1:0; }

//
// NETWORK - REDEFINABLE SHARED (SYNC) KEYS BIT POSITIONS
//

var SK_JUMP        = 0;
var SK_CROUCH      = 1;
var SK_FIRE        = 2;
var SK_AIM_UP      = 3;
var SK_AIM_DOWN    = 4;
var SK_RUN         = 5;
var SK_LOOK_LEFT   = 6;
var SK_LOOK_RIGHT  = 7;
// weapons take up 4 bits...
var SK_WEAPON_BITS = 8;
var SK_WEAPON_BITS1= 9;
var SK_WEAPON_BITS2= 10;
var SK_WEAPON_BITS3= 11;
var SK_STEROIDS    = 12;
var SK_LOOK_UP     = 13;
var SK_LOOK_DOWN   = 14;
var SK_NIGHTVISION = 15;
var SK_MEDKIT      = 16;
var SK_MULTIFLAG   = 17;
var SK_CENTER_VIEW = 18;
var SK_HOLSTER     = 19;
var SK_INV_LEFT    = 20;
var SK_PAUSE       = 21;
var SK_QUICK_KICK  = 22;
var SK_AIMMODE     = 23;
var SK_HOLODUKE    = 24;
var SK_JETPACK     = 25;
var SK_GAMEQUIT    = 26;
var SK_INV_RIGHT   = 27;
var SK_TURNAROUND  = 28;
var SK_OPEN        = 29;
var SK_INVENTORY   = 30;
var SK_ESCAPE      = 31;
    
//// rotatesprite flags
//#define ROTATE_SPRITE_TRANSLUCENT   (BIT(0))
//#define ROTATE_SPRITE_VIEW_CLIP     (BIT(1)) // clip to view
//#define ROTATE_SPRITE_YFLIP         (BIT(2))
//#define ROTATE_SPRITE_IGNORE_START_MOST (BIT(3)) // don't clip to startumost
//#define ROTATE_SPRITE_SCREEN_CLIP   (BIT(1)|BIT(3)) // use window
//#define ROTATE_SPRITE_CORNER        (BIT(4)) // place sprite from upper left corner
//#define ROTATE_SPRITE_TRANS_FLIP    (BIT(5))
//#define ROTATE_SPRITE_NON_MASK      (BIT(6)) // non masked sprites
//#define ROTATE_SPRITE_ALL_PAGES     (BIT(7)) // copies to all pages

//#define RS_SCALE                    BIT(16)

//// system defines for status bits
//#define CEILING_STAT_PLAX           BIT(0)
//#define CEILING_STAT_SLOPE          BIT(1)
//#define CEILING_STAT_SWAPXY         BIT(2)
//#define CEILING_STAT_SMOOSH         BIT(3)
//#define CEILING_STAT_XFLIP          BIT(4)
//#define CEILING_STAT_YFLIP          BIT(5)
//#define CEILING_STAT_RELATIVE       BIT(6)
//#define CEILING_STAT_TYPE_MASK     (BIT(7)|BIT(8))
//#define CEILING_STAT_MASKED         BIT(7)
//#define CEILING_STAT_TRANS          BIT(8)
//#define CEILING_STAT_TRANS_FLIP     (BIT(7)|BIT(8))
//#define CEILING_STAT_FAF_BLOCK_HITSCAN      BIT(15)

//#define FLOOR_STAT_PLAX           BIT(0)
//#define FLOOR_STAT_SLOPE          BIT(1)
//#define FLOOR_STAT_SWAPXY         BIT(2)
//#define FLOOR_STAT_SMOOSH         BIT(3)
//#define FLOOR_STAT_XFLIP          BIT(4)
//#define FLOOR_STAT_YFLIP          BIT(5)
//#define FLOOR_STAT_RELATIVE       BIT(6)
//#define FLOOR_STAT_TYPE_MASK     (BIT(7)|BIT(8))
//#define FLOOR_STAT_MASKED         BIT(7)
//#define FLOOR_STAT_TRANS          BIT(8)
//#define FLOOR_STAT_TRANS_FLIP     (BIT(7)|BIT(8))
//#define FLOOR_STAT_FAF_BLOCK_HITSCAN      BIT(15)

//#define CSTAT_WALL_BLOCK            BIT(0)
//#define CSTAT_WALL_BOTTOM_SWAP      BIT(1)
//#define CSTAT_WALL_ALIGN_BOTTOM     BIT(2)
//#define CSTAT_WALL_XFLIP            BIT(3)
//#define CSTAT_WALL_MASKED           BIT(4)
//#define CSTAT_WALL_1WAY             BIT(5)
//#define CSTAT_WALL_BLOCK_HITSCAN    BIT(6)
//#define CSTAT_WALL_TRANSLUCENT      BIT(7)
//#define CSTAT_WALL_YFLIP            BIT(8)
//#define CSTAT_WALL_TRANS_FLIP       BIT(9)
//#define CSTAT_WALL_BLOCK_ACTOR (BIT(14)) // my def
//#define CSTAT_WALL_WARP_HITSCAN (BIT(15)) // my def

////cstat, bit 0: 1 = Blocking sprite (use with clipmove, getzrange)    "B"
////       bit 1: 1 = 50/50 transluscence, 0 = normal                   "T"
////       bit 2: 1 = x-flipped, 0 = normal                             "F"
////       bit 3: 1 = y-flipped, 0 = normal                             "F"
////       bits 5-4: 00 = FACE sprite (default)                         "R"
////                 01 = WALL sprite (like masked walls)
////                 10 = FLOOR sprite (parallel to ceilings&floors)
////                 11 = SPIN sprite (face sprite that can spin 2draw style - not done yet)
////       bit 6: 1 = 1-sided sprite, 0 = normal                        "1"
////       bit 7: 1 = Real centered centering, 0 = foot center          "C"
////       bit 8: 1 = Blocking sprite (use with hitscan)                "H"
////       bit 9: reserved
////       bit 10: reserved
////       bit 11: reserved
////       bit 12: reserved
////       bit 13: reserved
////       bit 14: reserved
////       bit 15: 1 = Invisible sprite, 0 = not invisible

//#define CSTAT_SPRITE_BLOCK          BIT(0)
//#define CSTAT_SPRITE_TRANSLUCENT    BIT(1)
//#define CSTAT_SPRITE_XFLIP          BIT(2)
//#define CSTAT_SPRITE_YFLIP          BIT(3)
//#define CSTAT_SPRITE_WALL           BIT(4)
//#define CSTAT_SPRITE_FLOOR          BIT(5)
//#define CSTAT_SPRITE_SLAB           (BIT(4)|BIT(5))
//#define CSTAT_SPRITE_ONE_SIDE       BIT(6)
//#define CSTAT_SPRITE_YCENTER        BIT(7)
//#define CSTAT_SPRITE_BLOCK_HITSCAN  BIT(8)
//#define CSTAT_SPRITE_TRANS_FLIP     BIT(9)

//#define CSTAT_SPRITE_INVISIBLE      BIT(15)

//#define CSTAT_SPRITE_BREAKABLE (CSTAT_SPRITE_BLOCK_HITSCAN)

//#define SP  sprite[i].yvel
//#define SX  sprite[i].x
//#define SY  sprite[i].y
//#define SZ  sprite[i].z
//#define SS  sprite[i].shade
//#define PN  sprite[i].picnum
//#define SA  sprite[i].ang
////#define SV  sprite[i].xvel
////#define ZV  sprite[i].zvel
////#define RX  sprite[i].xrepeat
////#define RY  sprite[i].yrepeat
//#define OW  sprite[i].owner
//#define CS  sprite[i].cstat
//#define SH  sprite[i].extra
////#define CX  sprite[i].xoffset
////#define CY  sprite[i].yoffset
////#define CD  sprite[i].clipdist
////#define PL  sprite[i].pal
//#define SLT  sprite[i].lotag
//#define SHT  sprite[i].hitag
//#define SECT sprite[i].sectnum

//#define T1  actor[i].t_data[0]
//#define T2  actor[i].t_data[1]
//#define T3  actor[i].t_data[2]
//#define T4  actor[i].t_data[3]
//#define T5  actor[i].t_data[4]
//#define T6  actor[i].t_data[5]
//#define T7  actor[i].t_data[6]
//#define T8  actor[i].t_data[7]
//#define T9  actor[i].t_data[8]

//#endif

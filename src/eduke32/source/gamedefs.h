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

//****************************************************************************
//
// gamedefs.h
//
// common defines between the game and the setup program
//
//****************************************************************************

#ifndef _gamedefs_public_
#define _gamedefs_public_
#ifdef EXTERNC
{
#endif

//****************************************************************************
//
// DEFINES
//
//****************************************************************************

//
// Setup program defines
//
#define SETUPFILENAME "eduke32.cfg"

// Number of JOY buttons
// XXX: out of sync with jmact/_control.h
#define MAXJOYBUTTONS (32+4)

// Number of Mouse Axes
// KEEPINSYNC jmact/_control.h
#define MAXMOUSEAXES 2

// Number of JOY axes
// KEEPINSYNC jmact/_control.h
#define MAXJOYAXES 8

// DEFAULT mouse sensitivity scale
#define DEFAULTMOUSESENSITIVITY             7
#define DEFAULTMOUSEANALOGUESCALE           65536

// DEFAULT joystick settings

#if defined(GEKKO)
#define DEFAULTJOYSTICKANALOGUESCALE        16384
#define DEFAULTJOYSTICKANALOGUEDEAD         1000
#define DEFAULTJOYSTICKANALOGUESATURATE     9500
#else
#define DEFAULTJOYSTICKANALOGUESCALE        65536
#define DEFAULTJOYSTICKANALOGUEDEAD         1000
#define DEFAULTJOYSTICKANALOGUESATURATE     9500
#endif

enum
   {
   gametype_network=3,
   gametype_serial=1,
   gametype_modem=2
   };

enum
   {
   connecttype_dialing=0,
   connecttype_answer=1,
   connecttype_alreadyconnected=2
   };

enum
   {
   screenbuffer_320x200,
   screenbuffer_640x400,
   screenbuffer_640x480,
   screenbuffer_800x600,
   screenbuffer_1024x768,
   screenbuffer_1280x1024,
   screenbuffer_1600x1200
   };

enum
   {
   vesa_320x200,
   vesa_360x200,
   vesa_320x240,
   vesa_360x240,
   vesa_320x400,
   vesa_360x400,
   vesa_640x350,
   vesa_640x400,
   vesa_640x480,
   vesa_800x600,
   vesa_1024x768,
   vesa_1280x1024,
   vesa_1600x1200
   };

enum
   {
   screenmode_chained,
   screenmode_vesa,
   screenmode_buffered,
   screenmode_tseng,
   screenmode_paradise,
   screenmode_s3,
   screenmode_crystal,
   screenmode_redblue,
   };


#ifdef EXTERNC
};
#endif
#endif


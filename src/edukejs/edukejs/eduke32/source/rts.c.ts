/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/todo.ts" />
/// <reference path="../../utils/types.ts" />

/// <reference path="../../build/headers/baselayer.h.ts" />
/// <reference path="../../build/headers/build.h.ts" />
/// <reference path="../../build/headers/cache1d.h.ts" />
/// <reference path="../../build/headers/compat.h.ts" />
/// <reference path="../../build/headers/engine_priv.h.ts" />
/// <reference path="../../build/headers/hightile.h.ts" />
/// <reference path="../../build/headers/mdsprite.h.ts" />
/// <reference path="../../build/headers/osd.h.ts" />
/// <reference path="../../build/headers/pragmas.h.ts" />
/// <reference path="../../build/headers/scancodes.h.ts" />

/// <reference path="../../build/source/baselayer.c.ts" />
/// <reference path="../../build/source/build.c.ts" />
/// <reference path="../../build/source/compat.c.ts" />
/// <reference path="../../build/source/crc32.c.ts" />
/// <reference path="../../build/source/engine.c.ts" />
/// <reference path="../../build/source/polymost.c.ts" />
/// <reference path="../../build/source/hightile.c.ts" />

/// <reference path="../../eduke32/headers/_functio.h.ts" />
/// <reference path="../../eduke32/headers/_rts.h.ts" />
/// <reference path="../../eduke32/headers/actors.h.ts" />
/// <reference path="../../eduke32/headers/common_game.h.ts" />
/// <reference path="../../eduke32/headers/duke3d.h.ts" />
/// <reference path="../../eduke32/headers/function.h.ts" />
/// <reference path="../../eduke32/headers/gameexec.h.ts" />
/// <reference path="../../eduke32/headers/global.h.ts" />
/// <reference path="../../eduke32/headers/grpscan.h.ts" />
/// <reference path="../../eduke32/headers/game.h.ts" />
/// <reference path="../../eduke32/headers/gamedef.h.ts" />
/// <reference path="../../eduke32/headers/player.h.ts" />
/// <reference path="../../eduke32/headers/quotes.h.ts" />

/// <reference path="../../eduke32/source/astub.c.ts" />
/// <reference path="../../eduke32/source/common.c.ts" />
/// <reference path="../../eduke32/source/game.c.ts" />
/// <reference path="../../eduke32/source/gamedef.c.ts" />
/// <reference path="../../eduke32/source/gamevars.c.ts" />
/// <reference path="../../eduke32/source/glbuild.c.ts" />
/// <reference path="../../eduke32/source/global.c.ts" />
/// <reference path="../../eduke32/source/grpscan.c.ts" />
/// <reference path="../../eduke32/source/namesdyn.c.ts" />
/// <reference path="../../eduke32/source/net.c.ts" />
/// <reference path="../../eduke32/source/osd.c.ts" />
/// <reference path="../../eduke32/source/player.c.ts" />
/// <reference path="../../eduke32/source/osdfuncs.c.ts" />
/// <reference path="../../eduke32/source/soundsdyn.c.ts" />
/// <reference path="../../eduke32/source/winbits.c.ts" />
/// <reference path="../../eduke32/source/winlayer.c.ts" />
/// <reference path="../../eduke32/source/winbits.c.ts" />
/// <reference path="../../eduke32/source/winlayer.c.ts" />

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

//#include "duke3d.h"

////=============
//// STATICS
////=============

var rts_numlumps: number;
//static void  **rts_lumpcache;
var rts_lumpinfo: lumpinfo_t[]; //lumpinfo_t              // location of each lump on disk
//static int32_t RTS_Started = FALSE;

//char rts_lumplockbyte[11];

//int32_t  IntelLong(int32_t l)
//{
//#if B_BIG_ENDIAN != 0
//    int32_t t = ((l & 0x00ff00ffl) << 8) | ((l & 0xff00ff00l) >> 8);
//    return ((t & 0x0000ffffl) << 16) | ((t & 0xffff0000l) >> 16);
//#else
//    return l;
//#endif
//}

///*
//============================================================================

//                                                LUMP BASED ROUTINES

//============================================================================
//*/

///*
//====================
//=
//= RTS_AddFile
//=
//= All files are optional, but at least one file must be found
//= Files with a .rts extension are wadlink files with multiple lumps
//= Other files are single lumps with the base filename for the lump name
//=
//====================
//*/

//int32_t RTS_AddFile(const char *filename)
//{
//    wadinfo_t  header;
//    lumpinfo_t *lump_p;
//    uint32_t     i;
//    int32_t      handle, length;
//    int32_t      startlump;
//    filelump_t *fileinfo, *fileinfoo;

//    //
//    // read the entire file in
//    //      FIXME: shared opens

//    handle = kopen4loadfrommod((char *)filename, 0);
//    if (handle < 0)
//    {
//        initprintf("RTS file \"%s\" was not found\n",filename);
//        return -1;
//    }

//    startlump = rts_numlumps;

//    // WAD file
////    initprintf("    Adding \"%s\".\n",filename);
//    kread(handle, &header, sizeof(header));
//    if (strncmp(header.identification,"IWAD",4))
//    {
//        initprintf("RTS file \"%s\" doesn't have IWAD id\n",filename);
//        kclose(handle);
//        return -1;
//    }
//    header.numlumps = IntelLong(header.numlumps);
//    header.infotableofs = IntelLong(header.infotableofs);
//    length = header.numlumps*sizeof(filelump_t);
//    fileinfo = fileinfoo = (filelump_t *)Bmalloc(length);
//    if (!fileinfo)
//    {
//        initprintf("RTS file could not allocate header info\n");
//        kclose(handle);
//        return -1;
//    }
//    klseek(handle, header.infotableofs, SEEK_SET);
//    kread(handle, fileinfo, length);

//    //
//    // Fill in lumpinfo
//    //
//    lump_p = (lumpinfo_t *)Brealloc(rts_lumpinfo, (rts_numlumps + header.numlumps)*sizeof(lumpinfo_t));
//    if (!lump_p)
//    {
//        kclose(handle);
//        return -1;
//    }
//    rts_lumpinfo = lump_p;

//    rts_numlumps += header.numlumps;

//    lump_p = &rts_lumpinfo[startlump];

//    for (i=startlump ; i<(uint32_t)rts_numlumps ; i++,lump_p++, fileinfo++)
//    {
//        lump_p->handle = handle;
//        lump_p->position = IntelLong(fileinfo->filepos);
//        lump_p->size = IntelLong(fileinfo->size);
//        Bstrncpy(lump_p->name, fileinfo->name, 8);
//    }

//    Bfree(fileinfoo);

//    return 0;
//}

/*
====================
=
= RTS_Init
=
= Files with a .rts extension are idlink files with multiple lumps
=
====================
*/

function RTS_Init(filename: string): void
{
    todo("RTS_Init");
//    var length: number;
//    //
//    // open all the files, load headers, and count lumps
//    //
//    rts_numlumps = 0;
//    rts_lumpinfo = NULL;   // will be realloced as lumps are added

////    initprintf("RTS Manager Started.\n");
//    if (RTS_AddFile(filename)) return;

//    if (!rts_numlumps) return;

//    //
//    // set up caching
//    //
//    length = (rts_numlumps) * sizeof(*rts_lumpcache);
//    rts_lumpcache = (void **)Bmalloc(length);
//    memset(rts_lumpcache,0,length);
//    RTS_Started = TRUE;
}


///*
//====================
//=
//= RTS_NumSounds
//=
//====================
//*/

//int32_t RTS_NumSounds(void)
//{
//    return rts_numlumps-1;
//}

///*
//====================
//=
//= RTS_SoundLength
//=
//= Returns the buffer size needed to load the given lump
//=
//====================
//*/

//int32_t RTS_SoundLength(int32_t lump)
//{
//    lump++;
//    if (lump >= rts_numlumps)
//    {
//        initprintf("RTS_SoundLength: %i >= numlumps\n",lump);
//        RTS_Started = FALSE;
//        rts_numlumps = 0;
//        return 0;
//    }
//    return rts_lumpinfo[lump].size;
//}

///*
//====================
//=
//= RTS_GetSoundName
//=
//====================
//*/

//const char *RTS_GetSoundName(int32_t i)
//{
//    i++;
//    if (i>=rts_numlumps)
//    {
//        initprintf("RTS_GetSoundName: %i >= numlumps\n",i);
//        RTS_Started = FALSE;
//        rts_numlumps = 0;
//        return 0;
//    }

//    return &(rts_lumpinfo[i].name[0]);
//}

///*
//====================
//=
//= RTS_ReadLump
//=
//= Loads the lump into the given buffer, which must be >= RTS_SoundLength()
//=
//====================
//*/
//void RTS_ReadLump(int32_t lump, void *dest)
//{
//    lumpinfo_t *l;

//    if (lump >= rts_numlumps)
//    {
//        initprintf("RTS_ReadLump: %i >= numlumps\n",lump);
//        RTS_Started = FALSE;
//        rts_numlumps = 0;
//        return;
//    }

//    if (lump < 0)
//    {
//        initprintf("RTS_ReadLump: %i < 0\n",lump);
//        RTS_Started = FALSE;
//        rts_numlumps = 0;
//        return;
//    }

//    l = rts_lumpinfo+lump;
//    klseek(l->handle, l->position, SEEK_SET);
//    kread(l->handle,dest,l->size);
//}

///*
//====================
//=
//= RTS_GetSound
//=
//====================
//*/
//void *RTS_GetSound(int32_t lump)
//{
//    lump++;
//    if ((uint32_t)lump >= (uint32_t)rts_numlumps)
//    {
//        initprintf("RTS_GetSound: %i >= %i\n",lump,rts_numlumps);
//        RTS_Started = FALSE;
//        rts_numlumps = 0;
//        return 0;
//    }


//    if (rts_lumpcache[lump] == NULL)
//    {
//        rts_lumplockbyte[lump] = 200;
//        allocache((intptr_t *)&rts_lumpcache[lump],(int32_t)RTS_SoundLength(lump-1),&rts_lumplockbyte[lump]);	// JBF 20030910: char * => int32_t *
//        RTS_ReadLump(lump, rts_lumpcache[lump]);
//    }
//    else
//    {
//        if (rts_lumplockbyte[lump] < 200)
//            rts_lumplockbyte[lump] = 200;
//        else
//            rts_lumplockbyte[lump]++;
//    }
//    return rts_lumpcache[lump];
//}


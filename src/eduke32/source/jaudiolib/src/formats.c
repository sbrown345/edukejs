/*
 Copyright (C) 2009 Jonathon Fowler <jf@jonof.id.au>

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

 See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.

 */

/**
 * Raw, DemandFeed, WAV, and VOC source support for MultiVoc
 */

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#ifndef _MSC_VER
#include <unistd.h>
#endif
#include <errno.h>
#include "pitch.h"
#include "multivoc.h"
#include "_multivc.h"


/*---------------------------------------------------------------------
   Function: MV_GetNextRawBlock

   Controls playback of demand fed data.
---------------------------------------------------------------------*/

static playbackstatus MV_GetNextRawBlock(VoiceNode *voice)
{
    if (voice->BlockLength <= 0)
    {
        if (voice->LoopStart == NULL)
        {
            voice->Playing = FALSE;
            return NoMoreData;
        }

        voice->BlockLength = voice->LoopSize;
        voice->NextBlock   = voice->LoopStart;
        voice->length = 0;
        voice->position = 0;
    }

    voice->sound        = voice->NextBlock;
    voice->position    -= voice->length;
    voice->length       = min(voice->BlockLength, 0x8000);
    voice->NextBlock   += voice->length * (voice->channels * voice->bits / 8);
    voice->BlockLength -= voice->length;
    voice->length     <<= 16;

    return KeepPlaying;
}


/*---------------------------------------------------------------------
   Function: MV_GetNextWAVBlock

   Controls playback of demand fed data.
---------------------------------------------------------------------*/

static playbackstatus MV_GetNextWAVBlock(VoiceNode *voice)
{
    if (voice->BlockLength <= 0)
    {
        if (voice->LoopStart == NULL)
        {
            voice->Playing = FALSE;
            return NoMoreData;
        }

        voice->BlockLength = voice->LoopSize;
        voice->NextBlock   = voice->LoopStart;
        voice->length      = 0;
        voice->position    = 0;
    }

    voice->sound        = voice->NextBlock;
    voice->position    -= voice->length;
    voice->length       = min(voice->BlockLength, 0x8000);
    voice->NextBlock   += voice->length * (voice->channels * voice->bits / 8);
    voice->BlockLength -= voice->length;
    voice->length     <<= 16;

    return KeepPlaying;
}


/*---------------------------------------------------------------------
   Function: MV_GetNextVOCBlock

   Interpret the information of a VOC format sound file.
---------------------------------------------------------------------*/

static playbackstatus MV_GetNextVOCBlock(VoiceNode *voice)
{
    const uint8_t *ptr;
    int32_t            blocktype;
    int32_t            lastblocktype;
    size_t  blocklength = 0;
    uint32_t   samplespeed = 0;  // XXX: compiler-happy on synthesis
    uint32_t   tc = 0;
    int32_t            packtype;
    int32_t            voicemode;
    int32_t            done;
    unsigned       BitsPerSample;
    unsigned       Channels;
    unsigned       Format;

    if (voice->BlockLength > 0)
    {
        voice->position    -= voice->length;
        voice->sound       += (voice->length >> 16) * (voice->channels * voice->bits / 8);
        voice->length       = min(voice->BlockLength, 0x8000);
        voice->BlockLength -= voice->length;
        voice->length     <<= 16;
        return KeepPlaying;
    }

    ptr = (uint8_t *)voice->NextBlock;

    voice->Playing = TRUE;
    voice->Paused = FALSE;

    voicemode = 0;
    lastblocktype = 0;
    packtype = 0;

    done = FALSE;

    do
    {
        // Stop playing if we get a NULL pointer
        if (ptr == NULL)
        {
            voice->Playing = FALSE;
            done = TRUE;
            break;
        }

        // terminator is not mandatory according to
        // http://wiki.multimedia.cx/index.php?title=Creative_Voice

        if (ptr - voice->rawdataptr >= voice->ptrlength)
            blocktype = 0;  // fake a terminator
        else
            blocktype = *ptr;

        if (blocktype != 0)
            blocklength = ptr[1]|(ptr[2]<<8)|(ptr[3]<<16);
        else
            blocklength = 0;
        // would need one byte pad at end of alloc'd region:
//        blocklength = LITTLE32(*(uint32_t *)(ptr + 1)) & 0x00ffffff;

        ptr += 4;

        switch (blocktype)
        {
        case 0 :
end_of_data:
            // End of data
            if ((voice->LoopStart == NULL) ||
                    ((intptr_t) voice->LoopStart >= ((intptr_t) ptr - 4)))
            {
                voice->Playing = FALSE;
                done = TRUE;
            }
            else
            {
                voice->NextBlock    = voice->LoopStart;
                voice->BlockLength  = 0;
                voice->position     = 0;
                return MV_GetNextVOCBlock(voice);
            }
            break;

        case 1 :
            // Sound data block
            voice->bits  = 8;
            voice->channels = voicemode + 1;
            if (lastblocktype != 8)
            {
                tc = (uint32_t)*ptr << 8;
                packtype = *(ptr + 1);
            }

            ptr += 2;
            blocklength -= 2;

            samplespeed = 256000000L / (voice->channels * (65536 - tc));

            // Skip packed or stereo data
            if ((packtype != 0) || (voicemode != 0 && voicemode != 1))
            {
                ptr += blocklength;
            }
            else
            {
                done = TRUE;
            }
            if (ptr - voice->rawdataptr >= voice->ptrlength)
                goto end_of_data;

            voicemode = 0;
            break;

        case 2 :
            // Sound continuation block
            samplespeed = voice->SamplingRate;
            done = TRUE;
            break;

        case 3 :
            // Silence
            // Not implimented.
            ptr += blocklength;
            break;

        case 4 :
            // Marker
            // Not implimented.
            ptr += blocklength;
            break;

        case 5 :
            // ASCII string
            // Not implimented.
            ptr += blocklength;
            break;

        case 6 :
            // Repeat begin
            if (voice->LoopEnd == NULL)
            {
                voice->LoopCount = LITTLE16(*(uint16_t *)ptr);
                voice->LoopStart = (char *)((intptr_t) ptr + blocklength);
            }
            ptr += blocklength;
            break;

        case 7 :
            // Repeat end
            ptr += blocklength;
            if (lastblocktype == 6)
            {
                voice->LoopCount = 0;
            }
            else
            {
                if ((voice->LoopCount > 0) && (voice->LoopStart != NULL))
                {
                    ptr = (uint8_t *) voice->LoopStart;
                    if (voice->LoopCount < 0xffff)
                    {
                        voice->LoopCount--;
                        if (voice->LoopCount == 0)
                        {
                            voice->LoopStart = NULL;
                        }
                    }
                }
            }
            break;

        case 8 :
            // Extended block
            voice->bits  = 8;
            voice->channels = 1;
            tc = LITTLE16(*(uint16_t *)ptr);
            packtype = *(ptr + 2);
            voicemode = *(ptr + 3);
            ptr += blocklength;
            break;

        case 9 :
            // New sound data block
            samplespeed = LITTLE32(*(uint32_t *)ptr);
            BitsPerSample = (unsigned)*(ptr + 4);
            Channels = (unsigned)*(ptr + 5);
            Format = (unsigned)LITTLE16(*(uint16_t *)(ptr + 6));

            if ((BitsPerSample == 8) && (Channels == 1 || Channels == 2) &&
                    (Format == VOC_8BIT))
            {
                ptr         += 12;
                blocklength -= 12;
                voice->bits  = 8;
                voice->channels = Channels;
                done         = TRUE;
            }
            else if ((BitsPerSample == 16) && (Channels == 1 || Channels == 2) &&
                     (Format == VOC_16BIT))
            {
                ptr         += 12;
                blocklength -= 12;
                voice->bits  = 16;
                voice->channels = Channels;
                done         = TRUE;
            }
            else
            {
                ptr += blocklength;
            }

            // CAUTION:
            //  SNAKRM.VOC is corrupt!  blocklength gets us beyond the
            //  end of the file.
            if (ptr - voice->rawdataptr >= voice->ptrlength)
                goto end_of_data;

            break;

        default :
            // Unknown data.  Probably not a VOC file.
            voice->Playing = FALSE;
            done = TRUE;
            break;
        }

        lastblocktype = blocktype;
    }
    while (!done);

    if (voice->Playing)
    {
        voice->NextBlock    = (char *)ptr + blocklength;
        voice->sound        = (char *)ptr;

        // CODEDUP multivoc.c MV_SetVoicePitch
        voice->SamplingRate = samplespeed;
        voice->RateScale    = (voice->SamplingRate * voice->PitchScale) / MV_MixRate;

        // Multiply by MV_MIXBUFFERSIZE - 1
        voice->FixedPointBufferSize = (voice->RateScale * MV_MIXBUFFERSIZE) -
                                      voice->RateScale;

        if (voice->LoopEnd != NULL)
        {
            if (blocklength > (uintptr_t)voice->LoopEnd)
                blocklength = (uintptr_t)voice->LoopEnd;
            else
                voice->LoopEnd = (char *)blocklength;

            voice->LoopStart = voice->sound + (uintptr_t)voice->LoopStart;
            voice->LoopEnd   = voice->sound + (uintptr_t)voice->LoopEnd;
            voice->LoopSize  = voice->LoopEnd - voice->LoopStart;
        }

        if (voice->bits == 16)
            blocklength /= 2;

        if (voice->channels == 2)
            blocklength /= 2;

        voice->position     = 0;
        voice->length       = min(blocklength, 0x8000);
        voice->BlockLength  = blocklength - voice->length;
        voice->length     <<= 16;

        MV_SetVoiceMixMode(voice);

        return KeepPlaying;
    }

    return NoMoreData;
}


/*---------------------------------------------------------------------
   Function: MV_GetNextDemandFeedBlock

   Controls playback of demand fed data.
---------------------------------------------------------------------*/

static playbackstatus MV_GetNextDemandFeedBlock(VoiceNode *voice)
{
    if (voice->BlockLength > 0)
    {
        voice->position    -= voice->length;
        voice->sound       += voice->length >> 16;
        voice->length       = min(voice->BlockLength, 0x8000);
        voice->BlockLength -= voice->length;
        voice->length     <<= 16;

        return KeepPlaying;
    }

    if (voice->DemandFeed == NULL)
        return NoMoreData;

    voice->position     = 0;
    // TODO: learn how to properly attach the 'const' in pointer-pointers :O
    (voice->DemandFeed)((char **)&voice->sound, &voice->BlockLength);
    voice->length       = min(voice->BlockLength, 0x8000);
    voice->BlockLength -= voice->length;
    voice->length     <<= 16;

    return ((voice->length > 0) && (voice->sound != NULL) ? KeepPlaying : NoMoreData);
}



/*---------------------------------------------------------------------
   Function: MV_PlayRaw

   Begin playback of sound data with the given sound levels and
   priority.
---------------------------------------------------------------------*/

int32_t MV_PlayRaw
(
    char *ptr,
    uint32_t length,
    char *loopstart,
    char *loopend,
    unsigned rate,
    int32_t   pitchoffset,
    int32_t   vol,
    int32_t   left,
    int32_t   right,
    int32_t   priority,
    uint32_t callbackval
)

{
    VoiceNode *voice;

    if (!MV_Installed)
    {
        MV_SetErrorCode(MV_NotInstalled);
        return MV_Error;
    }

    // Request a voice from the voice pool
    voice = MV_AllocVoice(priority);
    if (voice == NULL)
    {
        MV_SetErrorCode(MV_NoVoices);
        return MV_Error;
    }

    voice->wavetype    = Raw;
    voice->bits        = 8;
    voice->channels    = 1;
    voice->GetSound    = MV_GetNextRawBlock;
    voice->Playing     = TRUE;
    voice->Paused     = FALSE;
    voice->NextBlock   = ptr;
    voice->position    = 0;
    voice->BlockLength = length;
    voice->length      = 0;
    voice->next        = NULL;
    voice->prev        = NULL;
    voice->priority    = priority;
    voice->callbackval = callbackval;
    voice->LoopStart   = loopstart;
    voice->LoopEnd     = loopend;
    voice->LoopSize    = loopend > (char*) 0 ? (uintptr_t) loopend - (uintptr_t) loopstart + 1 : length;

    MV_SetVoicePitch(voice, rate, pitchoffset);
    MV_SetVoiceVolume(voice, vol, left, right);
    MV_PlayVoice(voice);

    return voice->handle;
}


/*---------------------------------------------------------------------
   Function: MV_PlayWAV3D

   Begin playback of sound data at specified angle and distance
   from listener.
---------------------------------------------------------------------*/

int32_t MV_PlayWAV3D
(
    char *ptr,
    uint32_t length,
    int32_t loophow,
    int32_t  pitchoffset,
    int32_t  angle,
    int32_t  distance,
    int32_t  priority,
    uint32_t callbackval
)

{
    int32_t left;
    int32_t right;
    int32_t mid;
    int32_t volume;
    int32_t status;

    if (!MV_Installed)
    {
        MV_SetErrorCode(MV_NotInstalled);
        return MV_Error;
    }

    if (distance < 0)
    {
        distance  = -distance;
        angle    += MV_NUMPANPOSITIONS / 2;
    }

    volume = MIX_VOLUME(distance);

    // Ensure angle is within 0 - 127
    angle &= MV_MAXPANPOSITION;

    left  = MV_PanTable[ angle ][ volume ].left;
    right = MV_PanTable[ angle ][ volume ].right;
    mid   = max(0, 255 - distance);

    status = MV_PlayWAV(ptr, length, loophow, -1, pitchoffset, mid, left, right, priority, callbackval);

    return status;
}


/*---------------------------------------------------------------------
   Function: MV_PlayWAV

   Begin playback of sound data with the given sound levels and
   priority.
---------------------------------------------------------------------*/

int32_t MV_PlayWAV
(
    char *ptr,
    uint32_t ptrlength,
    int32_t   loopstart,
    int32_t   loopend,
    int32_t   pitchoffset,
    int32_t   vol,
    int32_t   left,
    int32_t   right,
    int32_t   priority,
    uint32_t callbackval
)

{
    riff_header   riff;
    format_header format;
    data_header   data;
    VoiceNode     *voice;
    int32_t length;

    if (!MV_Installed)
    {
        MV_SetErrorCode(MV_NotInstalled);
        return MV_Error;
    }

    memcpy(&riff, ptr, sizeof(riff_header));
    riff.file_size   = LITTLE32(riff.file_size);
    riff.format_size = LITTLE32(riff.format_size);

    if ((memcmp(riff.RIFF, "RIFF", 4) != 0) ||
            (memcmp(riff.WAVE, "WAVE", 4) != 0) ||
            (memcmp(riff.fmt, "fmt ", 4) != 0))
    {
        MV_SetErrorCode(MV_InvalidWAVFile);
        return MV_Error;
    }

    memcpy(&format, ptr + sizeof(riff_header), sizeof(format_header));
    format.wFormatTag      = LITTLE16(format.wFormatTag);
    format.nChannels       = LITTLE16(format.nChannels);
    format.nSamplesPerSec  = LITTLE32(format.nSamplesPerSec);
    format.nAvgBytesPerSec = LITTLE32(format.nAvgBytesPerSec);
    format.nBlockAlign     = LITTLE16(format.nBlockAlign);
    format.nBitsPerSample  = LITTLE16(format.nBitsPerSample);

    memcpy(&data, ptr + sizeof(riff_header) + riff.format_size, sizeof(data_header));
    data.size = LITTLE32(data.size);

    // Check if it's PCM data.
    if (format.wFormatTag != 1)
    {
        MV_SetErrorCode(MV_InvalidWAVFile);
        return MV_Error;
    }

    if (format.nChannels != 1 && format.nChannels != 2)
    {
        MV_SetErrorCode(MV_InvalidWAVFile);
        return MV_Error;
    }

    if ((format.nBitsPerSample != 8) &&
            (format.nBitsPerSample != 16))
    {
        MV_SetErrorCode(MV_InvalidWAVFile);
        return MV_Error;
    }

    if (memcmp(data.DATA, "data", 4) != 0)
    {
        MV_SetErrorCode(MV_InvalidWAVFile);
        return MV_Error;
    }

    // Request a voice from the voice pool
    voice = MV_AllocVoice(priority);
    if (voice == NULL)
    {
        MV_SetErrorCode(MV_NoVoices);
        return MV_Error;
    }

    voice->wavetype    = WAV;
    voice->bits        = format.nBitsPerSample;
    voice->channels    = format.nChannels;
    voice->GetSound    = MV_GetNextWAVBlock;

    length = data.size;
    if (voice->bits == 16)
    {
        data.size  &= ~1;
        length     /= 2;
    }
    if (voice->channels == 2)
    {
        data.size &= ~1;
        length    /= 2;
    }

    voice->rawdataptr = (uint8_t *)ptr;
    voice->ptrlength = ptrlength;
    voice->Playing     = TRUE;
    voice->Paused      = FALSE;
    voice->DemandFeed  = NULL;
    voice->LoopCount   = 0;
    voice->position    = 0;
    voice->length      = 0;
    voice->BlockLength = length;
    voice->NextBlock   = (char *)((intptr_t) ptr + sizeof(riff_header) + riff.format_size + sizeof(data_header));
    voice->next        = NULL;
    voice->prev        = NULL;
    voice->priority    = priority;
    voice->callbackval = callbackval;
    voice->LoopStart   = loopstart >= 0 ? voice->NextBlock : NULL;
    voice->LoopEnd     = NULL;
    voice->LoopSize    = loopend > 0 ? loopend - loopstart + 1 : length;

    MV_SetVoicePitch(voice, format.nSamplesPerSec, pitchoffset);
    MV_SetVoiceVolume(voice, vol, left, right);
    MV_PlayVoice(voice);

    return voice->handle;
}


/*---------------------------------------------------------------------
   Function: MV_PlayVOC3D

   Begin playback of sound data at specified angle and distance
   from listener.
---------------------------------------------------------------------*/

int32_t MV_PlayVOC3D
(
    char *ptr,
    uint32_t ptrlength,
    int32_t loophow,
    int32_t  pitchoffset,
    int32_t  angle,
    int32_t  distance,
    int32_t  priority,
    uint32_t callbackval
)

{
    int32_t left;
    int32_t right;
    int32_t mid;
    int32_t volume;
    int32_t status;

    if (!MV_Installed)
    {
        MV_SetErrorCode(MV_NotInstalled);
        return MV_Error;
    }

    if (distance < 0)
    {
        distance  = -distance;
        angle    += MV_NUMPANPOSITIONS / 2;
    }

    volume = MIX_VOLUME(distance);

    // Ensure angle is within 0 - 127
    angle &= MV_MAXPANPOSITION;

    left  = MV_PanTable[ angle ][ volume ].left;
    right = MV_PanTable[ angle ][ volume ].right;
    mid   = max(0, 255 - distance);

    status = MV_PlayVOC(ptr, ptrlength, loophow, -1, pitchoffset, mid, left, right, priority, callbackval);

    return status;
}


/*---------------------------------------------------------------------
   Function: MV_PlayVOC

   Begin playback of sound data with the given sound levels and
   priority.
---------------------------------------------------------------------*/

int32_t MV_PlayVOC
(
    char *ptr,
    uint32_t ptrlength,
    int32_t   loopstart,
    int32_t   loopend,
    int32_t   pitchoffset,
    int32_t   vol,
    int32_t   left,
    int32_t   right,
    int32_t   priority,
    uint32_t callbackval
)

{
    VoiceNode   *voice;
    int32_t          status;

    if (!MV_Installed)
    {
        MV_SetErrorCode(MV_NotInstalled);
        return MV_Error;
    }

    // Make sure it looks like a valid VOC file.
    status = memcmp(ptr, "Creative Voice File", 19);
    if (status != 0)
    {
        MV_SetErrorCode(MV_InvalidVOCFile);
        return MV_Error;
    }

    // Request a voice from the voice pool
    voice = MV_AllocVoice(priority);
    if (voice == NULL)
    {
        MV_SetErrorCode(MV_NoVoices);
        return MV_Error;
    }

    voice->rawdataptr = (uint8_t *)ptr;
    voice->ptrlength = ptrlength;
    voice->Playing = TRUE;
    voice->Paused = FALSE;
    voice->wavetype    = VOC;
    voice->bits        = 8;
    voice->channels    = 1;
    voice->GetSound    = MV_GetNextVOCBlock;
    voice->NextBlock   = ptr + LITTLE16(*(uint16_t *)(ptr + 0x14));
    voice->DemandFeed  = NULL;
    voice->LoopCount   = 0;
    voice->BlockLength = 0;
    voice->PitchScale  = PITCH_GetScale(pitchoffset);
    voice->length      = 0;
    voice->next        = NULL;
    voice->prev        = NULL;
    voice->priority    = priority;
    voice->callbackval = callbackval;
    voice->LoopStart   = loopstart >= 0 ? voice->NextBlock : NULL;
    voice->LoopEnd     = NULL;
    voice->LoopSize    = loopend - loopstart + 1;

    MV_SetVoiceVolume(voice, vol, left, right);
    MV_PlayVoice(voice);

    return voice->handle;
}


/*---------------------------------------------------------------------
   Function: MV_StartDemandFeedPlayback

   Plays a digitized sound from a user controlled buffering system.
---------------------------------------------------------------------*/

int32_t MV_StartDemandFeedPlayback
(
    void (*function)(char **ptr, uint32_t *length),
    int32_t rate,
    int32_t pitchoffset,
    int32_t vol,
    int32_t left,
    int32_t right,
    int32_t priority,
    uint32_t callbackval
)

{
    VoiceNode *voice;

    if (!MV_Installed)
    {
        MV_SetErrorCode(MV_NotInstalled);
        return MV_Error;
    }

    // Request a voice from the voice pool
    voice = MV_AllocVoice(priority);
    if (voice == NULL)
    {
        MV_SetErrorCode(MV_NoVoices);
        return MV_Error;
    }

    voice->wavetype    = DemandFeed;
    voice->bits        = 8;
    voice->channels    = 1;
    voice->GetSound    = MV_GetNextDemandFeedBlock;
    voice->NextBlock   = NULL;
    voice->DemandFeed  = function;
    voice->LoopStart   = NULL;
    voice->LoopCount   = 0;
    voice->position    = 0;
    voice->sound       = NULL;
    voice->length      = 0;
    voice->BlockLength = 0;
    voice->Playing     = TRUE;
    voice->next        = NULL;
    voice->prev        = NULL;
    voice->priority    = priority;
    voice->callbackval = callbackval;

    MV_SetVoicePitch(voice, rate, pitchoffset);
    MV_SetVoiceVolume(voice, vol, left, right);
    MV_PlayVoice(voice);

    return voice->handle;
}

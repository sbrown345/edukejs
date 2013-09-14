// here lies the GREAT JUSTICE RENDERER
// TODO :
// - CORE STUFF
//   o there's also the texture alignment problem Hunter reported (san andreas fault)
//   o RTT portals (water)
//   o clip mirrors/portals to their planes
//   o merge mirrors/portals from the same plane
// - SPRITES
//   o sprite panning
// - SKIES
//   o skyview
// - MDSPRITES
//   o need full translation and rotation support from CON to attach to game world or tags
//
// the renderer should hopefully be pretty solid after all that
// the rest will be a bliss :)

//#ifndef _polymer_h_
//# define _polymer_h_

//# include "compat.h"
//# include "baselayer.h"
//# include "glbuild.h"
//# include "build.h"
//# include "osd.h"
//# include "hightile.h"
//# include "mdsprite.h"
//# include "polymost.h"
//# include "pragmas.h"

//#define PR_LINEAR_FOG

//// CVARS
//extern int32_t      pr_lighting;
//extern int32_t      pr_normalmapping;
//extern int32_t      pr_specularmapping;
//extern int32_t      pr_shadows;
//extern int32_t      pr_shadowcount;
//extern int32_t      pr_shadowdetail;
//extern int32_t      pr_shadowfiltering;
//extern int32_t      pr_maxlightpasses;
//extern int32_t      pr_maxlightpriority;
//extern int32_t      pr_fov;
//extern double       pr_customaspect;
//extern int32_t      pr_billboardingmode;
//extern int32_t      pr_verbosity;
//extern int32_t      pr_wireframe;
//extern int32_t      pr_vbos;
//extern int32_t      pr_gpusmoothing;
//extern int32_t      pr_overrideparallax;
//extern float        pr_parallaxscale;
//extern float        pr_parallaxbias;
//extern int32_t      pr_overridespecular;
//extern float        pr_specularpower;
//extern float        pr_specularfactor;
//extern int32_t      pr_highpalookups;
//extern int32_t      pr_artmapping;
//extern int32_t      pr_overridehud;
//extern float        pr_hudxadd;
//extern float        pr_hudyadd;
//extern float        pr_hudzadd;
//extern int32_t      pr_hudangadd;
//extern int32_t      pr_hudfov;
//extern float        pr_overridemodelscale;
//extern int32_t      pr_ati_fboworkaround;
//extern int32_t      pr_ati_nodepthoffset;
//#ifdef __APPLE__
//extern int32_t      pr_ati_textureformat_one;
//#endif

//extern int32_t      r_pr_maxlightpasses;

//// MATERIAL
//typedef enum {
var                   PR_BIT_HEADER=0,                    // must be first
                      PR_BIT_ANIM_INTERPOLATION=1,
                      PR_BIT_LIGHTING_PASS=2,
                      PR_BIT_NORMAL_MAP=3,
                      PR_BIT_ART_MAP=4,
                      PR_BIT_DIFFUSE_MAP=5,
                      PR_BIT_DIFFUSE_DETAIL_MAP=6,
                      PR_BIT_DIFFUSE_MODULATION=7,
                      PR_BIT_DIFFUSE_MAP2=8,
                      PR_BIT_HIGHPALOOKUP_MAP=9,
                      PR_BIT_SPECULAR_MAP=10,
                      PR_BIT_SPECULAR_MATERIAL=11,
                      PR_BIT_MIRROR_MAP=12,
                      PR_BIT_FOG=13,
                      PR_BIT_GLOW_MAP=14,
                      PR_BIT_PROJECTION_MAP=15,
                      PR_BIT_SHADOW_MAP=16,
                      PR_BIT_LIGHT_MAP=17,
                      PR_BIT_SPOT_LIGHT=18,
                      PR_BIT_POINT_LIGHT=19,
                      PR_BIT_FOOTER=20,                    // must be just before last
                      PR_BIT_COUNT=21;                     // must be last
//}                   prbittype;

class /*s_prmaterial*/ _prmaterial {
    // PR_BIT_ANIM_INTERPOLATION               //// PR_BIT_ANIM_INTERPOLATION
    frameprogress:number;             //GLfloat         frameprogress;
    nextframedata:number;             //GLfloat*        nextframedata;
    // PR_BIT_NORMAL_MAP                       //// PR_BIT_NORMAL_MAP
    normalmap:number;                 //GLuint          normalmap;
    normalbias:Float32Array/*[2]*/;             //GLfloat         normalbias[2];
    tbn:number;                       //GLfloat*        tbn;
    // PR_BIT_ART_MAP                          //// PR_BIT_ART_MAP
    artmap:number;                    //GLuint          artmap;
    basepalmap:number;                //GLuint          basepalmap;
    lookupmap:number;                 //GLuint          lookupmap;
    shadeoffset:number;               //GLint           shadeoffset;
    visibility:number;                //GLfloat         visibility;
    // PR_BIT_DIFFUSE_MAP                      //// PR_BIT_DIFFUSE_MAP
    diffusemap:WebGLTexture;                //GLuint          diffusemap;
    diffusescale:Float32Array/*[2]*/;           //GLfloat         diffusescale[2];
    // PR_BIT_HIGHPALOOKUP_MAP                 //// PR_BIT_HIGHPALOOKUP_MAP
    highpalookupmap:number;           //GLuint          highpalookupmap;
    // PR_BIT_DIFFUSE_DETAIL_MAP               //// PR_BIT_DIFFUSE_DETAIL_MAP
    detailmap:number;                 //GLuint          detailmap;
    detailscale:Float32Array/*[2]*/;            //GLfloat         detailscale[2];
    // PR_BIT_DIFFUSE_MODULATION               //// PR_BIT_DIFFUSE_MODULATION
    diffusemodulation:Float32Array/*[4]*/;      //GLubyte         diffusemodulation[4]
    // PR_BIT_SPECULAR_MAP                     //// PR_BIT_SPECULAR_MAP
    specmap:number;                   //GLuint          specmap;
    // PR_BIT_SPECULAR_MATERIAL                //// PR_BIT_SPECULAR_MATERIAL
    specmaterial:Float32Array/*[2]*/;           //GLfloat         specmaterial[2];
    // PR_BIT_MIRROR_MAP                       //// PR_BIT_MIRROR_MAP
    mirrormap:number;                 //GLuint          mirrormap;
    // PR_BIT_GLOW_MAP                         //// PR_BIT_GLOW_MAP
    glowmap:number;                   //GLuint          glowmap;
    // PR_BIT_SHADOW_MAP                       //// PR_BIT_SHADOW_MAP
    mdspritespace:number;             //GLboolean       mdspritespace;

    init() {
        // PR_BIT_ANIM_INTERPOLATION      
        this.frameprogress=0;             
        this.nextframedata=0;             
        // PR_BIT_NORMAL_MAP              
        this.normalmap=0;                 
        this.normalbias = set0OrNewArray(this.diffusescale, Float32Array, 2);
        this.tbn=0;                       
        // PR_BIT_ART_MAP                 
        this.artmap=0;                    
        this.basepalmap=0;                
        this.lookupmap=0;                 
        this.shadeoffset=0;               
        this.visibility=0;                
        // PR_BIT_DIFFUSE_MAP             
        this.diffusemap=0;                
        this.diffusescale = set0OrNewArray(this.diffusescale, Float32Array, 2);
        // PR_BIT_HIGHPALOOKUP_MAP        
        this.highpalookupmap=0;           
        // PR_BIT_DIFFUSE_DETAIL_MAP      
        this.detailmap=0;                 
        this.detailscale = set0OrNewArray(this.detailscale, Float32Array, 2);
        // PR_BIT_DIFFUSE_MODULATION      
        this.diffusemodulation = set0OrNewArray(this.diffusemodulation, Float32Array, 4);
        // PR_BIT_SPECULAR_MAP            
        this.specmap=0;                   
        // PR_BIT_SPECULAR_MATERIAL       
        this.specmaterial = set0OrNewArray(this.specmaterial, Float32Array, 2);
        // PR_BIT_MIRROR_MAP              
        this.mirrormap=0;                 
        // PR_BIT_GLOW_MAP                
        this.glowmap=0;                   
        // PR_BIT_SHADOW_MAP              
        this.mdspritespace=0;   
    }

    constructor() {    
        this.init();      
    }        
}

class /*s_prrograminfo*/  _prprograminfo{
    handle:WebGLProgram; //GLhandleARB uint
    // PR_BIT_ANIM_INTERPOLATION
    attrib_nextFrameData:number;            //GLint           
    attrib_nextFrameNormal:number;          //GLint           
    uniform_frameProgress:number;           //GLint           
    // PR_BIT_NORMAL_MAP
    attrib_T:number;                      //GLint           
    attrib_B:number;                      //GLint           
    attrib_N:number;                      //GLint           
    uniform_eyePosition:number;           //GLint           
    uniform_normalMap:number;             //GLint           
    uniform_normalBias:number;            //GLint           
    // PR_BIT_ART_MAP
    uniform_artMap:number;          //GLuint          
    uniform_basePalMap:number;      //GLuint          
    uniform_lookupMap:number;       //GLuint          
    uniform_shadeOffset:number;     //GLuint          
    uniform_visibility:number;      //GLuint          
    // PR_BIT_DIFFUSE_MAP
    uniform_diffuseMap:number;       //GLint           
    uniform_diffuseScale:number;     //GLint           
    // PR_BIT_HIGHPALOOKUP_MAP
    uniform_highPalookupMap:number; //GLuint          
    // PR_BIT_DIFFUSE_DETAIL_MAP
    uniform_detailMap:number;        //GLint           
    uniform_detailScale:number;      //GLint           
    // PR_BIT_SPECULAR_MAP
    uniform_specMap:number;          //GLint           
    // PR_BIT_SPECULAR_MATERIAL
    uniform_specMaterial:number;    //GLint           
    // PR_BIT_MIRROR_MAP
    uniform_mirrorMap:number;
//#ifdef PR_LINEAR_FOG         //GLint           
    // PR_BIT_FOG
    uniform_linearFog:number;       //GLint           
//#endif
    // PR_BIT_GLOW_MAP
    uniform_glowMap:number;          //GLint           
    // PR_BIT_PROJECTION_MAP
    uniform_shadowProjMatrix:number;//GLint           
    // PR_BIT_SHADOW_MAP
    uniform_shadowMap:number;       //GLint           
    // PR_BIT_LIGHT_MAP
    uniform_lightMap:number;//GLint           
    // PR_BIT_SPOT_LIGHT
    uniform_spotDir:number;         //GLint           
    uniform_spotRadius:number;      //GLint       
    constructor() {
        this.handle=0; //GLhandleARB uint
        // PR_BIT_ANIM_INTERPOLATION
        this.attrib_nextFrameData=0;            //GLint           
        this.attrib_nextFrameNormal=0;          //GLint           
        this.uniform_frameProgress=0;           //GLint           
        // PR_BIT_NORMAL_MAP
        this.attrib_T=0;                      //GLint           
        this.attrib_B=0;                      //GLint           
        this.attrib_N=0;                      //GLint           
        this.uniform_eyePosition=0;           //GLint           
        this.uniform_normalMap=0;             //GLint           
        this.uniform_normalBias=0;            //GLint           
        // PR_BIT_ART_MAP
        this.uniform_artMap=0;          //GLuint          
        this.uniform_basePalMap=0;      //GLuint          
        this.uniform_lookupMap=0;       //GLuint          
        this.uniform_shadeOffset=0;     //GLuint          
        this.uniform_visibility=0;      //GLuint          
        // PR_BIT_DIFFUSE_MAP
        this.uniform_diffuseMap=0;       //GLint           
        this.uniform_diffuseScale=0;     //GLint           
        // PR_BIT_HIGHPALOOKUP_MAP
        this.uniform_highPalookupMap=0; //GLuint          
        // PR_BIT_DIFFUSE_DETAIL_MAP
        this.uniform_detailMap=0;        //GLint           
        this.uniform_detailScale=0;      //GLint           
        // PR_BIT_SPECULAR_MAP
        this.uniform_specMap=0;          //GLint           
        // PR_BIT_SPECULAR_MATERIAL
        this.uniform_specMaterial=0;    //GLint           
        // PR_BIT_MIRROR_MAP
        this.uniform_mirrorMap=0;
        //#ifdef PR_LINEAR_FOG         //GLint           
        // PR_BIT_FOG
        this.uniform_linearFog=0;       //GLint           
        //#endif
        // PR_BIT_GLOW_MAP
        this.uniform_glowMap=0;          //GLint           
        // PR_BIT_PROJECTION_MAP
        this.uniform_shadowProjMatrix=0;//GLint           
        // PR_BIT_SHADOW_MAP
        this.uniform_shadowMap=0;       //GLint           
        // PR_BIT_LIGHT_MAP
        this.uniform_lightMap=0;//GLint           
        // PR_BIT_SPOT_LIGHT
        this.uniform_spotDir=0;         //GLint           
        this.uniform_spotRadius=0;      //GLint  
    }
}                   

var PR_INFO_LOG_BUFFER_SIZE=8192;

//// Think about changing highPal[Scale|Bias] in the program bit if you change this
//#define             PR_HIGHPALOOKUP_BIT_DEPTH 6
//#define             PR_HIGHPALOOKUP_DIM (1 << PR_HIGHPALOOKUP_BIT_DEPTH)
//#define             PR_HIGHPALOOKUP_DATA_SIZE (4 * PR_HIGHPALOOKUP_DIM * \
//                                                   PR_HIGHPALOOKUP_DIM * \
//                                                   PR_HIGHPALOOKUP_DIM)

class  /*s_prprogrambit*/ _prprogrambit {
    bit:number;//int32_t         
    vert_def:string;          //const char*           
    vert_prog:string;         //const char*           
    frag_def:string;          //const char*           
    frag_prog:string;         //const char*           

    constructor(bit: number, vert_def:string, vert_prog:string, frag_def:string, frag_prog:string) {
        this.bit = bit;
        this.vert_def = vert_def;
        this.vert_prog = vert_prog;
        this.frag_def = frag_def;
        this.frag_prog = frag_prog;
    }
}

//#include "prlights.h"

//// RENDER TARGETS
//typedef struct      s_prrt {
//    GLenum          target;
//    GLuint          color;
//    GLuint          z;
//    GLuint          fbo;
//    int32_t         xdim, ydim;
//}                   _prrt;

// BUILD DATA
class _prplane     /*s_prplane*/ {
    // geometry
    buffer;       //GLfloat*        
    vertcount;    //int32_t         
    vbo:WebGLBuffer;          //GLuint          
    // attributes
    tbn: Float32Array[];//[3][3];                   //GLfloat         
    plane: Float32Array;//[4];                    //GLfloat         
    material:_prmaterial;                    //_prmaterial     
    // elements
    indices;                   //GLushort*       
    indicescount;              //int32_t         
    ivbo;                      //GLuint          
    // lights
    lights: Int16Array;//[PR_MAXLIGHTS];               //int16_t         
    lightcount;                         //uint16_t        

    init() {
        this.buffer = null;
        this.vertcount = 0;
        this.vbo = 0;
        if(typeof this.tbn === "undefined") 
            this.tbn = multiDimArray(Float32Array, 3, 3);
        else {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    this.tbn[j][k] = 0;
                }
            }
        }

        if(typeof this.plane === "undefined") 
            this.plane = new Float32Array(4);
        else {
            for (var i = 0; i < this.plane.length; i++) {
                this.plane[i] = 0;
            }
        }
        if(!this.material) this.material = new _prmaterial(); else this.material.init();
        this.indices = 0;
        this.indicescount = 0;
        this.ivbo = 0;
        if(typeof this.lights === "undefined") 
            this.lights = new Int16Array(PR_MAXLIGHTS);
        else {
            for (var i = 0; i < this.lights.length; i++) {
                this.lights[i] = 0;
            }
        }
        this.lightcount = 0;
    }

    constructor() {
        this.init();
    }
};

class/*      s_prsector */_prsector{
    // polymer data
    verts:Float64Array;                                                   //  // polymer data
    floor:_prplane;                                                   //  GLdouble*       
    ceil:_prplane;                                                    //  _prplane        
    curindice:number;                                               //  _prplane        
    indicescount:number;                                            //  int16_t         
    oldindicescount:number;                                         //  int32_t         
    // stuff                                                                 //  int32_t         
    wallsproffset:number;                                           //  // stuff
    floorsproffset:number;                                          //  float           
    // build sector data                                                     //  float           
    ceilingz:number; floorz:number;                                        //  // build sector 
    ceilingstat:number; floorstat:number;                                  //  int32_t         
    ceilingpicnum:number; ceilingheinum:number;                            //  int16_t         
    ceilingshade:number;                                            //  int16_t         
    ceilingpal:number; ceilingxpanning:number; ceilingypanning:number;            //  int8_t          
    floorpicnum:number; floorheinum:number;                                //  char            
    floorshade:number;                                              //  int16_t         
    floorpal:number; floorxpanning:number; floorypanning:number;                  //  int8_t          
    visibility:number;                                              //  char            
    flags: flags;
    invalidid:number;                                               //  }        //  uint32_t       
    
    init() {
    // polymer data
        this.verts=null;                                                 
        if(!this.floor) this.floor = new _prplane(); else this.floor.init();                                          
        if(!this.ceil) this.ceil = new _prplane(); else this.ceil.init();                                          
        this.curindice=0;                                         
        this.indicescount=0;                                      
        this.oldindicescount=0;                                   
        // stuff                                                  
        this.wallsproffset=0;                                     
        this.floorsproffset=0;                                    
        // build sector data                                      
        this.ceilingz=0; this.floorz=0;                           
        this.ceilingstat=0; this.floorstat=0;                     
        this.ceilingpicnum=0; this.ceilingheinum=0;               
        this.ceilingshade=0;                                      
        this.ceilingpal=0; this.ceilingxpanning=0; this.ceilingypanning=0;        
        this.floorpicnum=0; this.floorheinum=0;                             
        this.floorshade=0;                                             
        this.floorpal=0; this.floorxpanning=0; this.floorypanning=0;       
        this.visibility=0;                                             
        if(this.flags) this.flags.init(); else this.flags = new flags();
        this.invalidid=0;
    }

    constructor() {
        this.init();
    }     
}                                                                        
                                                                                                 
class _prwall/*s_prwall */{
    wall:_prplane;
    over:_prplane;
    mask:_prplane;
    // stuff
    bigportal:Float32Array;        //GLfloat*        
    cap:Float32Array;              //GLfloat*        
    stuffvbo:WebGLBuffer;         //GLuint          
    // build wall data
    cstat:number; nwallcstat:number;                            //int16_t         
    picnum:number; overpicnum:number; nwallpicnum:number;              //int16_t         
    shade:number;                                        //int8_t          
    pal:number; xrepeat:number; yrepeat:number; xpanning:number; ypanning:number;    //char            
    nwallxpanning:number; nwallypanning:number;                 //char            
    nwallshade:number;                                   //int8_t          

    underover:number;      //char            
    invalidid:number;      //uint32_t     
    flags: flags;

    init() {
        if(this.wall) this.wall.init(); else this.wall= new _prplane();
        if(this.over) this.over.init(); else this.over= new _prplane();
        if(this.mask) this.mask.init(); else this.mask= new _prplane();
        // stuff       
        this.bigportal=null;        //GLfloat*        
        this.cap=null;              //GLfloat*        
        this.stuffvbo=null;         //GLuint          
        // build wall data
        this.cstat=0; this.nwallcstat=0;                           //int16_t         
        this.picnum=0; this.overpicnum=0; this.nwallpicnum=0;             //int16_t         
        this.shade=0;                                        //int8_t          
        this.pal=0; this.xrepeat=0; this.yrepeat=0; this.xpanning=0; this.ypanning=0;   //char            
        this.nwallxpanning=0; this.nwallypanning=0;                //char            
        this.nwallshade=0;                                  //int8_t      
        this.underover=0;
        this.invalidid=0;
        if(this.flags) this.flags.init(); else this.flags = new flags();
    }

    constructor() {
        this.init();
    }
}

class flags {
    empty     :number;         //    int32_t     
    uptodate  :number;         //    int32_t     
    invalidtex:number;         //    int32_t     
    init() {
        this.empty      = 1;
        this.uptodate   = 1;
        this.invalidtex = 1;
    }    
    constructor() {
        this.init();
    }
}

class /*s_prsprite */_prsprite{
    plane:_prplane; //      _prplane        
    crc:number;     //    uint32_t   
    
    constructor() {
        this.plane = null;   
        this.crc = 0;
    }     
}               
//typedef struct      s_prmirror {
//    _prplane        *plane;
//    int16_t         sectnum;
//    int16_t         wallnum;
//}                   _prmirror;

class /*s_prhighpalookup */_prhighpalookup{
    data:Uint8Array;       //char            
    map:number;         //GLuint        
    constructor() {
        this.data = null;
        this.map = 0;    
    }  
}

//typedef void    (*animatespritesptr)(int32_t, int32_t, int32_t, int32_t);

//typedef struct      s_pranimatespritesinfo {
//    animatespritesptr animatesprites;
//    int32_t         x, y, a, smoothratio;
//}                   _pranimatespritesinfo;

//// this one has to be provided by the application
//extern void G_Polymer_UnInit(void);

//// EXTERNAL FUNCTIONS
//int32_t             polymer_init(void);
//void                polymer_uninit(void);
//void                polymer_setaspect(int32_t);
//void                polymer_glinit(void);
//void                polymer_resetlights(void);
//void                polymer_loadboard(void);
//void                polymer_drawrooms(int32_t daposx, int32_t daposy, int32_t daposz, int16_t daang, int32_t dahoriz, int16_t dacursectnum);
//void                polymer_drawmasks(void);
//void                polymer_editorpick(void);
//void                polymer_inb4rotatesprite(int16_t tilenum, char pal, int8_t shade);
//void                polymer_postrotatesprite(void);
//void                polymer_drawmaskwall(int32_t damaskwallcnt);
//void                polymer_drawsprite(int32_t snum);
//void                polymer_setanimatesprites(animatespritesptr animatesprites, int32_t x, int32_t y, int32_t a, int32_t smoothratio);
//int16_t             polymer_addlight(_prlight* light);
//void                polymer_deletelight(int16_t lighti);
//void                polymer_invalidatelights(void);
//void                polymer_texinvalidate(void);
//void                polymer_definehighpalookup(char basepalnum, char palnum, char *fn);
//int32_t             polymer_havehighpalookup(int32_t basepalnum, int32_t palnum);

//# ifdef POLYMER_C

//// CORE
//static void         polymer_displayrooms(int16_t sectnum);
//static void         polymer_drawplane(_prplane* plane);
//static inline void  polymer_inb4mirror(GLfloat* buffer, GLfloat* plane);
//static void         polymer_animatesprites(void);
//static void         polymer_freeboard(void);
//// SECTORS
//static int32_t      polymer_initsector(int16_t sectnum);
//static int32_t      polymer_updatesector(int16_t sectnum);
//void PR_CALLBACK    polymer_tesserror(GLenum error);
//void PR_CALLBACK    polymer_tessedgeflag(GLenum error);
//void PR_CALLBACK    polymer_tessvertex(void* vertex, void* sector);
//static int32_t      polymer_buildfloor(int16_t sectnum);
//static void         polymer_drawsector(int16_t sectnum, int32_t domasks);
//// WALLS
//static int32_t      polymer_initwall(int16_t wallnum);
//static void         polymer_updatewall(int16_t wallnum);
//static void         polymer_drawwall(int16_t sectnum, int16_t wallnum);
//// HSR
//static void         polymer_computeplane(_prplane* p);
//static inline void  polymer_crossproduct(GLfloat* in_a, GLfloat* in_b, GLfloat* out);
//static inline void  polymer_transformpoint(const float* inpos, float* pos, float* matrix);
//static inline void  polymer_normalize(float* vec);
//static inline void  polymer_pokesector(int16_t sectnum);
//static void         polymer_extractfrustum(GLfloat* modelview, GLfloat* projection, float* frustum);
//static inline int32_t polymer_planeinfrustum(_prplane *plane, float* frustum);
//static inline void  polymer_scansprites(int16_t sectnum, spritetype* tsprite, int32_t* spritesortcnt);
//static void         polymer_updatesprite(int32_t snum);
//// SKIES
//static void         polymer_getsky(void);
//static void         polymer_drawsky(int16_t tilenum, char palnum, int8_t shade);
//static void         polymer_initartsky(void);
//static void         polymer_drawartsky(int16_t tilenum, char palnum, int8_t shade);
//static void         polymer_drawartskyquad(int32_t p1, int32_t p2, GLfloat height);
//static void         polymer_drawskybox(int16_t tilenum, char palnum, int8_t shade);
//// MDSPRITES
//static void         polymer_drawmdsprite(spritetype *tspr);
//static void         polymer_loadmodelvbos(md3model_t* m);
//// MATERIALS
//static void         polymer_getscratchmaterial(_prmaterial* material);
//static void         polymer_getbuildmaterial(_prmaterial* material, int16_t tilenum, char pal, int8_t shade, int8_t vis, int32_t cmeth);
//static int32_t      polymer_bindmaterial(_prmaterial material, int16_t* lights, int lightcount);
//static void         polymer_unbindmaterial(int32_t programbits);
//static void         polymer_compileprogram(int32_t programbits);
//// LIGHTS
//static void         polymer_removelight(int16_t lighti);
//static void         polymer_updatelights(void);
//static inline void  polymer_resetplanelights(_prplane* plane);
//static void         polymer_addplanelight(_prplane* plane, int16_t lighti);
//static inline void  polymer_deleteplanelight(_prplane* plane, int16_t lighti);
//static int32_t      polymer_planeinlight(_prplane* plane, _prlight* light);
//static void         polymer_invalidateplanelights(_prplane* plane);
//static void         polymer_invalidatesectorlights(int16_t sectnum);
//static void         polymer_processspotlight(_prlight* light);
//static inline void  polymer_culllight(int16_t lighti);
//static void         polymer_prepareshadows(void);
//// RENDER TARGETS
//static void         polymer_initrendertargets(int32_t count);
//// DEBUG OUTPUT
//void PR_CALLBACK    polymer_debugoutputcallback(GLenum source,GLenum type,GLuint id,GLenum severity,GLsizei length,const GLchar *message,GLvoid *userParam);

//function INDICE(n:number):number { return (p.indices) ? (p.indices[(i+n)%p.indicescount]*5) : (((i+n)%p.vertcount)*5)} //moved to func

//#define SWITCH_CULL_DIRECTION { culledface = (culledface == GL_FRONT) ? GL_BACK : GL_FRONT; bglCullFace(culledface); }

//static inline GLfloat dot2f(GLfloat *v1, GLfloat *v2)
//{
//    return v1[0]*v2[0] + v1[1]*v2[1];
//}

//static inline GLfloat dot3f(GLfloat *v1, GLfloat *v2)
//{
//    return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
//}

//static inline void relvec2f(GLfloat *v1, GLfloat *v2, GLfloat *out)
//{
//    out[0] = v2[0]-v1[0];
//    out[1] = v2[1]-v1[1];
//}

//// the following from gle/vvector.h

///* ========================================================== */
///* determinant of matrix
// *
// * Computes determinant of matrix m, returning d
// */

function DETERMINANT_3X3(m:number[][]):number           
{                                
   var d = m[0][0] * (m[1][1]*m[2][2] - m[1][2] * m[2][1]);        
   d -= m[0][1] * (m[1][0]*m[2][2] - m[1][2] * m[2][0]);    
   d += m[0][2] * (m[1][0]*m[2][1] - m[1][1] * m[2][0]);    
  return d;
}

///* ========================================================== */
///* i,j,th cofactor of a 4x4 matrix
// *
// */

//#define COFACTOR_4X4_IJ(fac,m,i,j)                 \
//{                                \
//   int ii[4], jj[4], k;                        \
//                                \
//   /* compute which row, columnt to skip */            \
//   for (k=0; k<i; k++) ii[k] = k;                \
//   for (k=i; k<3; k++) ii[k] = k+1;                \
//   for (k=0; k<j; k++) jj[k] = k;                \
//   for (k=j; k<3; k++) jj[k] = k+1;                \
//                                \
//   (fac) = m[ii[0]][jj[0]] * (m[ii[1]][jj[1]]*m[ii[2]][jj[2]]     \
//                            - m[ii[1]][jj[2]]*m[ii[2]][jj[1]]); \
//   (fac) -= m[ii[0]][jj[1]] * (m[ii[1]][jj[0]]*m[ii[2]][jj[2]]    \
//                             - m[ii[1]][jj[2]]*m[ii[2]][jj[0]]);\
//   (fac) += m[ii[0]][jj[2]] * (m[ii[1]][jj[0]]*m[ii[2]][jj[1]]    \
//                             - m[ii[1]][jj[1]]*m[ii[2]][jj[0]]);\
//                                \
//   /* compute sign */                        \
//   k = i+j;                            \
//   if ( k != (k/2)*2) {                        \
//      (fac) = -(fac);                        \
//   }                                \
//}

///* ========================================================== */
///* determinant of matrix
// *
// * Computes determinant of matrix m, returning d
// */

//#define DETERMINANT_4X4(d,m)                    \
//{                                \
//   double cofac;                        \
//   COFACTOR_4X4_IJ (cofac, m, 0, 0);                \
//   d = m[0][0] * cofac;                        \
//   COFACTOR_4X4_IJ (cofac, m, 0, 1);                \
//   d += m[0][1] * cofac;                    \
//   COFACTOR_4X4_IJ (cofac, m, 0, 2);                \
//   d += m[0][2] * cofac;                    \
//   COFACTOR_4X4_IJ (cofac, m, 0, 3);                \
//   d += m[0][3] * cofac;                    \
//}

/* ========================================================== */
/* compute adjoint of matrix and scale
 *
 * Computes adjoint of matrix m, scales it by s, returning a
 */

function SCALE_ADJOINT_3X3(a:number[][],s:number,m:number[][]):void
{                                
   a[0][0] = (s) * (m[1][1] * m[2][2] - m[1][2] * m[2][1]);    
   a[1][0] = (s) * (m[1][2] * m[2][0] - m[1][0] * m[2][2]);   
   a[2][0] = (s) * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);    
                                
   a[0][1] = (s) * (m[0][2] * m[2][1] - m[0][1] * m[2][2]);    
   a[1][1] = (s) * (m[0][0] * m[2][2] - m[0][2] * m[2][0]);   
   a[2][1] = (s) * (m[0][1] * m[2][0] - m[0][0] * m[2][1]);    
                                
   a[0][2] = (s) * (m[0][1] * m[1][2] - m[0][2] * m[1][1]);    
   a[1][2] = (s) * (m[0][2] * m[1][0] - m[0][0] * m[1][2]);   
   a[2][2] = (s) * (m[0][0] * m[1][1] - m[0][1] * m[1][0]);    
}

///* ========================================================== */
///* compute adjoint of matrix and scale
// *
// * Computes adjoint of matrix m, scales it by s, returning a
// */

//#define SCALE_ADJOINT_4X4(a,s,m)                \
//{                                \
//   int i,j;                            \
//                                \
//   for (i=0; i<4; i++) {                    \
//      for (j=0; j<4; j++) {                    \
//         COFACTOR_4X4_IJ (a[j][i], m, i, j);            \
//         a[j][i] *= s;                        \
//      }                                \
//   }                                \
//}

///* ========================================================== */
///* inverse of matrix 
// *
// * Compute inverse of matrix a, returning determinant m and 
// * inverse b
// */

function INVERT_3X3(b,det,a):void
{                        
   var/*double */tmp;                    
   det = DETERMINANT_3X3 (a);            
   tmp = 1.0 / (det);                
   SCALE_ADJOINT_3X3 (b, tmp, a);        
}

///* ========================================================== */
///* inverse of matrix 
// *
// * Compute inverse of matrix a, returning determinant m and 
// * inverse b
// */

//#define INVERT_4X4(b,det,a)            \
//{                        \
//   double tmp;                    \
//   DETERMINANT_4X4 (det, a);            \
//   tmp = 1.0 / (det);                \
//   SCALE_ADJOINT_4X4 (b, tmp, a);        \
//}

//# endif // !POLYMER_C

//#endif // !_polymer_h_

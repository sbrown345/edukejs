// LIGHTS
//#ifndef _prlight_h_
//# define _prlight_h_

var             PR_MAXLIGHTS           =1024;
var             SHADOW_DEPTH_OFFSET    =30;
var             PR_MAXLIGHTPRIORITY    =6;

//typedef struct      s_prplanelist {
//    struct s_prplane*       plane;
//    struct s_prplanelist*   n;
//}                   _prplanelist;

//#pragma pack(push,1)
class /*s_prlight*/ _prlight {
    x:number; y:number; z:number; horiz:number; range:number;                   //    int32_t         
    angle:number; faderadius:number; radius:number; sector:number;       //    int16_t         
    color:Uint8Array/*3*/;priority:number;                      //    uint8_t         
    minshade:number; maxshade:number;                      //    int8_t          
    tilenum:number;                                 //    int16_t     
    publicflags:publicflags;    
    
    // internal members
    proj:Float32Array;//[16];            //float          
    transform:Float32Array;//[16];       //float          
    frustum:Float32Array;//[5 * 4];      //float          
    rtindex:number;             //int32_t        
    flags:flags_light;
    lightmap:number;           //uint32_t        
    planelist:number;          //_prplanelist*   
    planecount:number;         //int32_t      
    
    constructor() {
        this.x=0; this.y=0; this.z=0; this.horiz=0; this.range=0;                   //    int32_t         
        this.angle=0; this.faderadius=0; this.radius=0; this.sector=0;       //    int16_t         
        this.color = new Uint8Array(3);this.priority=0;                      //    uint8_t         
        this.minshade=0; this.maxshade=0;                      //    int8_t          
        this.tilenum=0;                                 //    int16_t     
        this.publicflags = new publicflags();    
    
        // internal members
        this.proj = new Float32Array(16);            //float          
        this.transform = new Float32Array(16);       //float          
        this.frustum =  new Float32Array(5 * 4);      //float          
        this.rtindex=0;             //int32_t        
        this.flags = new flags_light();
        this.lightmap=0;           //uint32_t        
        this.planelist=0;          //_prplanelist*   
        this.planecount=0;         //int32_t      
    }   
}

class publicflags {
    emitshadow:number ;//int32_t      
    negative:number;//int32_t     
    constructor() {
        this.emitshadow = 0;
        this.negative = 0;
    }
}

class flags_light {
    active     :number;         //    int32_t     
    invalidate  :number;         //    int32_t     
    isinview:number;         //    int32_t     
    constructor() {
        this.active      = 1;
        this.invalidate   = 1;
        this.isinview = 1;
    }
}

//extern _prlight     prlights[PR_MAXLIGHTS];
//extern int32_t      lightcount;
//#pragma pack(pop)

//#endif

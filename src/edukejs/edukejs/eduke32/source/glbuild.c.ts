/// <reference path="../../utils/assert.ts" />
/// <reference path="../../utils/c.ts" />
/// <reference path="../../utils/todo.ts" />

/// <reference path="../../utils/types.ts" />
/// <reference path="../../libs/WebGL.d.ts" />
/// <reference path="../../libs/tsm/tsm-0.6.d.ts" />

/// <reference path="../../build/headers/glbuild.h.ts" />

declare module WebGLDebugUtils {
    function makeDebugContext(ctx: WebGLRenderingContext, nothingInParticular: any, fnForEveryCall: any): WebGLRenderingContext;
    function glFunctionArgsToString(fn: string, args: any[]): WebGLRenderingContext;
}

function logGLCall(functionName: string, args: any[]): void {   
   console.error("gl." + functionName + "(" + 
      WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");   
} 

function validateNoneOfTheArgsAreUndefined(functionName: string, args: any[]): void {
  for (var ii = 0; ii < args.length; ++ii) {
    if (args[ii] === undefined) {
      debugger;
      console.error("undefined passed to gl." + functionName + "(" +
                     WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
    }
    if (typeof args[ii] === "number" && isNaN(args[ii])) {
      debugger;
      console.error("NaN passed to gl." + functionName + "(" +
                     WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
    }
  }
} 

function logAndValidate(functionName: string, args: any[]): void {
   logGLCall(functionName, args);
   validateNoneOfTheArgsAreUndefined (functionName, args);
}


var gl: WebGLRenderingContext = DEBUG_WEBGL_UTIL ? WebGLDebugUtils.makeDebugContext(GL.create({}), undefined, logAndValidate) : GL.create({});
//var gl: WebGLRenderingContext= GL.create({});
if(document.body /*qunit*/)
    document.body.appendChild(gl.canvas);
//gl.canvas.width = document.documentElement.clientWidth - 5;
//gl.canvas.height = document.documentElement.clientHeight - 5;
gl.canvas.width = 1200;
gl.canvas.height = 800;

// set non-existent enums negative
var GL_TEXTURE0_ARB = gl.TEXTURE0;
var GL_TEXTURE_MIN_FILTER = gl.TEXTURE_MIN_FILTER;
var GL_TEXTURE_MAG_FILTER = gl.TEXTURE_MAG_FILTER;
var GL_NEAREST = gl.NEAREST;
var GL_COLOR_BUFFER_BIT = gl.COLOR_BUFFER_BIT;
var GL_DEPTH_BUFFER_BIT = gl.DEPTH_BUFFER_BIT;
var GL_STENCIL_BUFFER_BIT = gl.STENCIL_BUFFER_BIT;
var GL_TRIANGLE_FAN = gl.TRIANGLE_FAN;
var GL_TEXTURE_2D = gl.TEXTURE_2D;
var GL_TEXTURE = gl.TEXTURE;
var GL_MODELVIEW = gl.MODELVIEW;
var GL_BLEND = gl.BLEND;
var GL_ALPHA_TEST = -99000;//todo?gl.ALPHA_TEST;
var GL_GREATER = gl.GREATER;//todo?gl.ALPHA_TEST;
var GL_RGB = gl.RGB;
var GL_RGBA = gl.RGBA;
var GL_PROJECTION = gl.PROJECTION;
var GL_DEPTH_TEST = gl.DEPTH_TEST;
var GL_TEXTURE_WRAP_S = gl.TEXTURE_WRAP_S;
var GL_TEXTURE_WRAP_T = gl.TEXTURE_WRAP_T;
var GL_REPEAT = gl.REPEAT;
var GL_CLAMP_TO_EDGE = gl.CLAMP_TO_EDGE;
var GL_CLAMP: number = null; //off
var GL_FOG = -99999; 
var GL_UNSIGNED_BYTE = gl.UNSIGNED_BYTE;
var GL_MAX_TEXTURE_SIZE = gl.MAX_TEXTURE_SIZE;
var GL_ALWAYS = gl.ALWAYS;
var GL_FRONT_AND_BACK = gl.FRONT_AND_BACK;
var GL_LEQUAL = gl.LEQUAL;
var GL_POLYGON_OFFSET_FILL = gl.POLYGON_OFFSET_FILL;
var GL_ARRAY_BUFFER_ARB = gl.ARRAY_BUFFER;
var GL_VERTEX_SHADER_ARB = gl.VERTEX_SHADER;
var GL_FRAGMENT_SHADER_ARB = gl.FRAGMENT_SHADER;
var GL_OBJECT_LINK_STATUS_ARB = gl.LINK_STATUS;
var GL_FLOAT = gl.FLOAT;
var GL_CULL_FACE = gl.CULL_FACE;
var GL_FRONT = gl.FRONT;
var GL_BACK = gl.BACK;
var GL_ELEMENT_ARRAY_BUFFER_ARB = gl.ELEMENT_ARRAY_BUFFER;
var GL_STREAM_DRAW_ARB = gl.STREAM_DRAW;
var GL_STATIC_DRAW_ARB = gl.STATIC_DRAW;

//var GL_FILL = gl.FILL;
//var GL_LINE = gl.LINE;
//var GL_POINT = gl.POINT;

var GL_TEXTURE_3D = 0x806F;//todo
var GL_TEXTURE_RECTANGLE = 0x84F5;//todo

var GL_TRUE = 0;
var GL_FALSE = 0;
//#include "compat.h"
//#include "glbuild.h"
//#include "baselayer.h"
//#include <stdlib.h>
//#include <string.h>
//#include <stdio.h>

//#if defined USE_OPENGL

//#ifdef RENDERTYPESDL
//#include "sdl_inc.h"
//#endif

var bglClearColor = gl.clearColor.bind(gl);//bglClearColorProcPtr;
var bglClear = gl.clear.bind(gl);//bglClearProcPtr;
var bglColorMask = gl.colorMask.bind(gl); //bglColorMaskProcPtr 
var bglAlphaFunc = function (arg1:any,arg2:any) {todoUnimportant("alphaFunc");}//gl.alphaFunc.bind(gl); //bglAlphaFuncProcPtr  //http://stackoverflow.com/questions/7277047/alphafunctions-in-webgl
//bglBlendFuncProcPtr bglBlendFunc;
//bglBlendEquationProcPtr bglBlendEquation;
var bglCullFace = gl.cullFace.bind(gl);
//bglFrontFaceProcPtr bglFrontFace;
var bglPolygonOffset = gl.polygonOffset.bind(gl); //bglPolygonOffsetProcPtr 
//bglPolygonModeProcPtr bglPolygonMode;

var bglEnable = function(v) {
    if(v < 0) return; // manually set values to negative
    gl.enable.call(gl, v);
}; 
var bglDisable = function(v) {
    if(v < 0) return; // manually set values to negative
    gl.disable.call(gl, v);
}; 
//bglGetDoublevProcPtr bglGetDoublev;
var bglGetFloatv =  gl.getParameter.bind(gl);//bglGetFloatvProcPtr  //http://msdn.microsoft.com/en-us/library/windows/desktop/ee872026(v=vs.85).aspx
var bglGetIntegerv = gl.getParameter.bind(gl); //bglGetIntegervProcPtr 
var bglPushAttrib = function() {todoThrow();/*gone!*/};//bglPushAttribProcPtr 
var bglPopAttrib = function() {todoThrow();/*gone!*/};
//bglGetErrorProcPtr bglGetError;
//bglGetStringProcPtr bglGetString;
//bglHintProcPtr bglHint;
//bglDrawBufferProcPtr bglDrawBuffer;
//bglReadBufferProcPtr bglReadBuffer;
//bglScissorProcPtr bglScissor;
//bglClipPlaneProcPtr bglClipPlane;

// Depth
var bglDepthFunc = gl.depthFunc.bind(gl); //bglDepthFuncProcPtr 
//bglDepthMaskProcPtr bglDepthMask;
var bglDepthRange = gl.depthRange.bind(gl); //bglDepthRangeProcPtr 

// Matrix
var bglMatrixMode = gl.matrixMode.bind(gl);//bglMatrixModeProcPtr ;
//bglOrthoProcPtr bglOrtho;
//bglFrustumProcPtr bglFrustum;
var bglViewport = gl.viewport.bind(gl);//bglViewportProcPtr ;
var bglPushMatrix = gl.pushMatrix.bind(gl);//bglPushMatrixProcPtr ;
var bglPopMatrix = gl.popMatrix.bind(gl); //bglPopMatrixProcPtr 
var bglLoadIdentity = gl.loadIdentity.bind(gl);//bglLoadIdentityProcPtr ;
//var bglLoadMatrixf = gl.loadMatrix.bind(gl);
function bglLoadMatrixf (arr: any):void  {
    if(arr.length === 4) {
        var mat = new GL.Matrix(
            arr[0][0],
            arr[1][0],
            arr[2][0],
            arr[3][0],
            arr[0][1],
            arr[1][1],
            arr[2][1],
            arr[3][1],
            arr[0][2],
            arr[1][2],
            arr[2][2],
            arr[3][2],
            arr[0][3],
            arr[1][3],
            arr[2][3],
            arr[3][3]);
    
        gl.loadMatrix.call(gl, mat);//bglLoadMatrixfProcPtr ;
    }
    else if(arr.length === 16) {
        gl.loadMatrix.call(gl, arr);
    }
    else {
        throw "matrix must be either 4x4 or 1x16";
    }
}

//bglLoadMatrixdProcPtr bglLoadMatrixd;
var bglMultMatrixf = function() {
    todoThrow();
    //http://stackoverflow.com/questions/11228187/trying-and-failing-to-implement-glulookat-in-webgl
};//bglMultMatrixfProcPtr 
//bglMultMatrixdProcPtr bglMultMatrixd;
var bglRotatef = gl.rotate.bind(gl);
var bglScalef = gl.scale.bind(gl);
var bglTranslatef = gl.translate.bind(gl);

// Drawing // http://www.irit.fr/~Rodolphe.Vaillant/?e=8 - c++ class to emulate direct drawing mode
// http://stackoverflow.com/questions/14765017/opengl-point-funtionality-in-webgl
var bglBegin = gl.begin.bind(gl);//bglBeginProcPtr bglBegin;
var bglEnd = gl.end.bind(gl); //bglEndProcPtr 
//bglVertex2fProcPtr bglVertex2f;
//bglVertex2iProcPtr bglVertex2i;
var bglVertex3f = function(x: number, y: number, z: number) {
    gl.vertex.call(gl, x, y, z);
}; //bglVertex3fProcPtr 
var bglVertex3d = bglVertex3f;//bglVertex3dProcPtr;
//bglVertex3fvProcPtr bglVertex3fv;
//bglVertex3dvProcPtr bglVertex3dv;
//bglRectdProcPtr bglRectd;
var bglColor4f = gl.color.bind(gl);/*4f*/; //bglColor4fProcPtr 
var bglColor4ub = gl.color.bind(gl);//bglColor4ubProcPtr ;
var bglTexCoord2d = gl.texCoord.bind(gl); //bglTexCoord2dProcPtr 
//bglTexCoord2fProcPtr bglTexCoord2f;
//bglTexCoord2iProcPtr bglTexCoord2i;
//bglNormal3fProcPtr bglNormal3f;

// Lighting
//bglShadeModelProcPtr bglShadeModel;
var bglLightfv = function() {todoThrow();};//bglLightfvProcPtr 

// Raster funcs
//bglReadPixelsProcPtr bglReadPixels;
//bglRasterPos4iProcPtr bglRasterPos4i;
//bglDrawPixelsProcPtr bglDrawPixels;
//bglPixelStoreiProcPtr bglPixelStorei;

// Texture mapping
//texture wrap stuff https://code.google.com/p/webglsamples/source/browse/color-adjust/color-adjust.html (linked from http://stackoverflow.com/questions/14150941/webgl-glsl-emulate-texture3d )
//bglTexEnvfProcPtr bglTexEnvf;
var bglGenTextures = function(/*GLsizei (int)*/ n: number, /*GLuint **/textures: number): void {
    todo("use params??");
    gl.createTexture.call(gl);
};//gl.createTexture;//bglGenTexturesProcPtr// http://www.khronos.org/files/webgl/webgl-reference-card-1_0.pdf Note: Corresponding OpenGL ES function is GenTextures
//bglDeleteTexturesProcPtr bglDeleteTextures;
var bglBindTexture =  gl.bindTexture.bind(gl);//bglBindTextureProcPtr 
var bglTexImage2D = function(target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: ArrayBufferView) {
    if(target === GL_TEXTURE_3D) {
        todoThrow(); //http://stackoverflow.com/questions/14150941/webgl-glsl-emulate-texture3d
    }

    if(target === GL_TEXTURE_RECTANGLE) {
        todoThrow(); //http://stackoverflow.com/questions/6883160/opengl-es-gl-texture-rectangle
    }

    if(DEBUG_APPEND_TEXTURES_TO_BODY) {
        if(level < 2) {
            var can = <HTMLCanvasElement>document.createElement("canvas"),
	          ctx = can.getContext('2d');
              can.width = width;   
              can.height = height;
            var img = ctx.createImageData(width, height);
            for (var i=0; i<img.data.length; i++) {
                img.data[i] = pixels[i];
            }
            ctx.putImageData(img, 0, 0);
            var text ="target: " + target + ", level: " + level+ ", internalformat: " + internalformat+ ", width: " + width+ ", height: " + height+ ", border: " + border+ ", format: " + format+ ", type: " + type;
            //console.log(text);
            //console.image(can.toDataURL());

            can.title = text;
            document.body.appendChild(can);
        }

        //http://stackoverflow.com/questions/3792027/webgl-and-the-power-of-two-problem
        //resize: http://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Non-Power_of_Two_Texture_Support
    }
    if(internalformat != format) {
        todoThrow("internalformat must === format");
    }

    gl.texImage2D.call(gl, target, level, internalformat, width, height, border, format, type, pixels);
};

//bglTexImage2DProcPtr 
//bglTexImage3DProcPtr bglTexImage3D;
//bglCopyTexImage2DProcPtr bglCopyTexImage2D;
//bglCopyTexSubImage2DProcPtr bglCopyTexSubImage2D;
var bglTexSubImage2D = gl.texSubImage2D.bind(gl);//bglTexSubImage2DProcPtr 
//bglTexParameterfProcPtr bglTexParameterf;
var bglTexParameteri = gl. texParameteri.bind(gl);//bglTexParameteriProcPtr 
//bglGetTexParameterivProcPtr bglGetTexParameteriv;
//bglGetTexLevelParameterivProcPtr bglGetTexLevelParameteriv;
//bglCompressedTexImage2DARBProcPtr bglCompressedTexImage2DARB;
//bglGetCompressedTexImageARBProcPtr bglGetCompressedTexImageARB;
//bglTexGenfvProcPtr bglTexGenfv;

//// Fog
//bglFogfProcPtr bglFogf;
//bglFogiProcPtr bglFogi;
//bglFogfvProcPtr bglFogfv;

//// Display Lists
//bglNewListProcPtr bglNewList;
//bglEndListProcPtr bglEndList;
//bglCallListProcPtr bglCallList;
//bglDeleteListsProcPtr bglDeleteLists;

// Vertex Arrays
var bglEnableClientState = gl.enable.bind(gl);
var bglDisableClientState = gl.disable.bind(gl);
//bglVertexPointerProcPtr bglVertexPointer;
//bglNormalPointerProcPtr bglNormalPointer;
//bglTexCoordPointerProcPtr bglTexCoordPointer;
//bglDrawArraysProcPtr bglDrawArrays;
//bglDrawElementsProcPtr bglDrawElements;

// Stencil Buffer
var bglClearStencil = gl.clearStencil.bind(gl);
//bglStencilOpProcPtr bglStencilOp;
//bglStencilFuncProcPtr bglStencilFunc;

//// GPU Programs
//bglGenProgramsARBProcPtr bglGenProgramsARB;
//bglBindProgramARBProcPtr bglBindProgramARB;
//bglProgramStringARBProcPtr bglProgramStringARB;
//bglDeleteProgramsARBProcPtr bglDeleteProgramsARB;

//// Multitexturing
var bglActiveTextureARB = gl.activeTexture.bind(gl); //bglActiveTextureARBProcPtr 
//bglClientActiveTextureARBProcPtr bglClientActiveTextureARB;
//var bglMultiTexCoord2dARB = gl.multiTexCoord2dARB; //bglMultiTexCoord2dARBProcPtr   //https://groups.google.com/forum/#!topic/webgl-dev-list/jHejip4u-Vo
//bglMultiTexCoord2fARBProcPtr bglMultiTexCoord2fARB; //http://stackoverflow.com/questions/1524736/glmultitexcoord-in-opengl-es

//// Frame Buffer Objects
//bglGenFramebuffersEXTProcPtr bglGenFramebuffersEXT;
//bglBindFramebufferEXTProcPtr bglBindFramebufferEXT;
//bglFramebufferTexture2DEXTProcPtr bglFramebufferTexture2DEXT;
//bglCheckFramebufferStatusEXTProcPtr bglCheckFramebufferStatusEXT;
//bglDeleteFramebuffersEXTProcPtr bglDeleteFramebuffersEXT;

// Vertex Buffer Objects
//bglGenBuffersARBProcPtr bglGenBuffersARB; // use gl.createBuffer instead
var bglBindBufferARB = gl.bindBuffer.bind(gl);
//bglDeleteBuffersARBProcPtr bglDeleteBuffersARB;
var bglBufferDataARB = gl.bufferData.bind(gl);
var bglBufferSubDataARB = function(target:number, offset:number, size: number, data: any /*ArrayBufferView|number*/ ) {
    if(offset > 0) todoThrow("maybe need todo a subarray");
    gl.bufferSubData.call(gl, target, offset, data);
};
//bglMapBufferARBProcPtr bglMapBufferARB;
//bglUnmapBufferARBProcPtr bglUnmapBufferARB;

//// Occlusion queries
//bglGenQueriesARBProcPtr bglGenQueriesARB;
//bglDeleteQueriesARBProcPtr bglDeleteQueriesARB;
//bglIsQueryARBProcPtr bglIsQueryARB;
//bglBeginQueryARBProcPtr bglBeginQueryARB;
//bglEndQueryARBProcPtr bglEndQueryARB;
//bglGetQueryivARBProcPtr bglGetQueryivARB;
//bglGetQueryObjectivARBProcPtr bglGetQueryObjectivARB;
//bglGetQueryObjectuivARBProcPtr bglGetQueryObjectuivARB;

//// Shader Objects
//bglDeleteObjectARBProcPtr bglDeleteObjectARB;
//bglGetHandleARBProcPtr bglGetHandleARB;
//bglDetachObjectARBProcPtr bglDetachObjectARB;
var bglCreateShaderObjectARB = gl.createShader.bind(gl); ////bglCreateShaderObjectARBProcPtr 
var bglShaderSourceARB = function(shader: WebGLShader, count:number, source:string, length: number) {
    console.log("shader source: \n" + source);
    gl.shaderSource.call(gl, shader, source);
} ////bglShaderSourceARBProcPtr 
var bglCompileShaderARB = function(shader: WebGLShader):void {
    gl.compileShader.call(gl, shader); 
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(shader));
        throw "shader error";
    }
}
var bglCreateProgramObjectARB = gl.createProgram.bind(gl);//bglCreateProgramObjectARBProcPtr 
var bglAttachObjectARB = gl.attachShader.bind(gl);//bglAttachObjectARBProcPtr 
var bglLinkProgramARB = gl.linkProgram.bind(gl);//bglLinkProgramARBProcPtr 
var bglUseProgramObjectARB = gl.useProgram.bind(gl);//bglUseProgramObjectARBProcPtr 
//bglValidateProgramARBProcPtr bglValidateProgramARB;
var bglUniform1fARB  = gl.uniform1f.bind(gl);//bglUniform1fARBProcPtr 
var bglUniform2fARB  = gl.uniform2f.bind(gl);         //bglUniform2fARBProcPtr 
var bglUniform3fARB  = gl.uniform3f.bind(gl);         //bglUniform3fARBProcPtr 
var bglUniform4fARB  = gl.uniform4f.bind(gl);         //bglUniform4fARBProcPtr 
var bglUniform1iARB  = gl.uniform1i.bind(gl);         //bglUniform1iARBProcPtr 
var bglUniform2iARB  = gl.uniform2i.bind(gl);         //bglUniform2iARBProcPtr 
var bglUniform3iARB  = gl.uniform3i.bind(gl);         //bglUniform3iARBProcPtr 
var bglUniform4iARB  = gl.uniform4i.bind(gl);         //bglUniform4iARBProcPtr 
var bglUniform1fvARB = gl.uniform1fv.bind(gl);       //bglUniform1fvARBProcPtr
var bglUniform2fvARB = function(location: WebGLUniformLocation, count:number , v: Float32Array):void {gl.uniform2fv.call(gl, location, v);}
var bglUniform3fvARB = gl.uniform3fv.bind(gl);       //bglUniform3fvARBProcPtr
var bglUniform4fvARB = gl.uniform4fv.bind(gl);       //bglUniform4fvARBProcPtr
var bglUniform1ivARB = gl.uniform1iv.bind(gl);       //bglUniform1ivARBProcPtr
var bglUniform2ivARB = gl.uniform2iv.bind(gl);       //bglUniform2ivARBProcPtr
var bglUniform3ivARB = gl.uniform3iv.bind(gl);       //bglUniform3ivARBProcPtr
var bglUniform4ivARB = gl.uniform4iv.bind(gl);       //bglUniform4ivARBProcPtr
var bglUniformMatrix2fvARB = gl.uniformMatrix2fv.bind(gl);
var bglUniformMatrix3fvARB = gl.uniformMatrix3fv.bind(gl);
var bglUniformMatrix4fvARB = gl.uniformMatrix4fv.bind(gl);
//bglGetObjectParameterfvARBProcPtr bglGetObjectParameterfvARB;
var bglGetObjectParameterivARB = gl.getProgramParameter.bind(gl);//bglGetObjectParameterivARBProcPtr 
var bglGetInfoLogARB = gl.getProgramInfoLog.bind(gl);
//bglGetAttachedObjectsARBProcPtr bglGetAttachedObjectsARB;
var bglGetUniformLocationARB = gl.getUniformLocation.bind(gl);//bglGetUniformLocationARBProcPtr 
//bglGetActiveUniformARBProcPtr bglGetActiveUniformARB;
//bglGetUniformfvARBProcPtr bglGetUniformfvARB;
//bglGetUniformivARBProcPtr bglGetUniformivARB;
var bglGetShaderSourceARB = gl.getShaderSource.bind(gl);

//// Vertex Shaders
//bglVertexAttrib1dARBProcPtr bglVertexAttrib1dARB;
//bglVertexAttrib1dvARBProcPtr bglVertexAttrib1dvARB;
//bglVertexAttrib1fARBProcPtr bglVertexAttrib1fARB;
//bglVertexAttrib1fvARBProcPtr bglVertexAttrib1fvARB;
//bglVertexAttrib1sARBProcPtr bglVertexAttrib1sARB;
//bglVertexAttrib1svARBProcPtr bglVertexAttrib1svARB;
//bglVertexAttrib2dARBProcPtr bglVertexAttrib2dARB;
//bglVertexAttrib2dvARBProcPtr bglVertexAttrib2dvARB;
//bglVertexAttrib2fARBProcPtr bglVertexAttrib2fARB;
//bglVertexAttrib2fvARBProcPtr bglVertexAttrib2fvARB;
//bglVertexAttrib2sARBProcPtr bglVertexAttrib2sARB;
//bglVertexAttrib2svARBProcPtr bglVertexAttrib2svARB;
//bglVertexAttrib3dARBProcPtr bglVertexAttrib3dARB;
//bglVertexAttrib3dvARBProcPtr bglVertexAttrib3dvARB;
//bglVertexAttrib3fARBProcPtr bglVertexAttrib3fARB;
//bglVertexAttrib3fvARBProcPtr bglVertexAttrib3fvARB;
//bglVertexAttrib3sARBProcPtr bglVertexAttrib3sARB;
//bglVertexAttrib3svARBProcPtr bglVertexAttrib3svARB;
//bglVertexAttrib4NbvARBProcPtr bglVertexAttrib4NbvARB;
//bglVertexAttrib4NivARBProcPtr bglVertexAttrib4NivARB;
//bglVertexAttrib4NsvARBProcPtr bglVertexAttrib4NsvARB;
//bglVertexAttrib4NubARBProcPtr bglVertexAttrib4NubARB;
//bglVertexAttrib4NubvARBProcPtr bglVertexAttrib4NubvARB;
//bglVertexAttrib4NuivARBProcPtr bglVertexAttrib4NuivARB;
//bglVertexAttrib4NusvARBProcPtr bglVertexAttrib4NusvARB;
//bglVertexAttrib4bvARBProcPtr bglVertexAttrib4bvARB;
//bglVertexAttrib4dARBProcPtr bglVertexAttrib4dARB;
//bglVertexAttrib4dvARBProcPtr bglVertexAttrib4dvARB;
//bglVertexAttrib4fARBProcPtr bglVertexAttrib4fARB;
//bglVertexAttrib4fvARBProcPtr bglVertexAttrib4fvARB;
//bglVertexAttrib4ivARBProcPtr bglVertexAttrib4ivARB;
//bglVertexAttrib4sARBProcPtr bglVertexAttrib4sARB;
//bglVertexAttrib4svARBProcPtr bglVertexAttrib4svARB;
//bglVertexAttrib4ubvARBProcPtr bglVertexAttrib4ubvARB;
//bglVertexAttrib4uivARBProcPtr bglVertexAttrib4uivARB;
//bglVertexAttrib4usvARBProcPtr bglVertexAttrib4usvARB;
var bglVertexAttribPointerARB = gl.vertexAttribPointer.bind(gl);//bglVertexAttribPointerARBProcPtr 
var bglEnableVertexAttribArrayARB = gl.enableVertexAttribArray.bind(gl);//bglEnableVertexAttribArrayARBProcPtr 
var bglDisableVertexAttribArrayARB = gl.disableVertexAttribArray.bind(gl);
//bglGetVertexAttribdvARBProcPtr bglGetVertexAttribdvARB;
//bglGetVertexAttribfvARBProcPtr bglGetVertexAttribfvARB;
//bglGetVertexAttribivARBProcPtr bglGetVertexAttribivARB;
//bglGetVertexAttribPointervARBProcPtr bglGetVertexAttribPointervARB;
//bglBindAttribLocationARBProcPtr bglBindAttribLocationARB;
//bglGetActiveAttribARBProcPtr bglGetActiveAttribARB;
var bglGetAttribLocationARB = gl.getAttribLocation.bind(gl);//bglGetAttribLocationARBProcPtr 

//// Debug Output
//#ifndef __APPLE__
//bglDebugMessageControlARBProcPtr bglDebugMessageControlARB;
//bglDebugMessageCallbackARBProcPtr bglDebugMessageCallbackARB;
//#endif

//// GLU
//bgluTessBeginContourProcPtr bgluTessBeginContour;
//bgluTessBeginPolygonProcPtr bgluTessBeginPolygon;
//bgluTessCallbackProcPtr bgluTessCallback;
//bgluTessEndContourProcPtr bgluTessEndContour;
//bgluTessEndPolygonProcPtr bgluTessEndPolygon;
//bgluTessNormalProcPtr bgluTessNormal;
//bgluTessPropertyProcPtr bgluTessProperty;
//bgluTessVertexProcPtr bgluTessVertex;
//bgluNewTessProcPtr bgluNewTess;
//bgluDeleteTessProcPtr bgluDeleteTess;

var bgluPerspective = gl.perspective.bind(gl);
//var bgluPerspective = function(fov:number, aspect:number, near:number, far:number) {
//    console.log("todo perspective!");

//    //http://forums.inside3d.com/viewtopic.php?t=3369
//    //http://learningwebgl.com/blog/?p=507

//    //https://github.com/OneGeek/WebGLU/blob/73e7c4f341e5d1464b29c10db2168779907764d5/src/GLU.js
//    //var m = TSM.mat4.perspective(fov, aspect, near, far);


//    //gl_ModelViewProjectionMatrix??

//    //http://stackoverflow.com/questions/2417697/gluperspective-was-removed-in-opengl-3-1-any-replacements ------------
//    //http://granular.cs.umu.se/browserphysics/?p=237

//    //https://github.com/toji/webgl-source/search?q=perspective&ref=cmdform
//    //https://github.com/toji/webgl-source/search?q=projectionMat&ref=cmdform



//    /////////

//    // replace gl_ModelViewProjectionMatrix
//    //http://granular.cs.umu.se/browserphysics/?p=237

//};


//bgluErrorStringProcPtr bgluErrorString;

//bgluProjectProcPtr bgluProject;
//bgluUnProjectProcPtr bgluUnProject;


//#ifdef _WIN32
//// Windows
//bwglCreateContextProcPtr bwglCreateContext;
//bwglDeleteContextProcPtr bwglDeleteContext;
//bwglGetProcAddressProcPtr bwglGetProcAddress;
//bwglMakeCurrentProcPtr bwglMakeCurrent;

//bwglSwapBuffersProcPtr bwglSwapBuffers;
//bwglChoosePixelFormatProcPtr bwglChoosePixelFormat;
//bwglDescribePixelFormatProcPtr bwglDescribePixelFormat;
//bwglGetPixelFormatProcPtr bwglGetPixelFormat;
//bwglSetPixelFormatProcPtr bwglSetPixelFormat;
//bwglSwapIntervalEXTProcPtr bwglSwapIntervalEXT;
//bwglCreateContextAttribsARBProcPtr bwglCreateContextAttribsARB;

//static HMODULE hGLDLL, hGLUDLL;
//#else
//#include <dlfcn.h>

//static void *gluhandle = NULL;
//#endif

//char *gldriver = NULL, *glulibrary = NULL;

//static void *getproc_(const char *s, int32_t *err, int32_t fatal, int32_t extension)
//{
//    void *t;
//#if defined RENDERTYPESDL
//    UNREFERENCED_PARAMETER(extension);
//    t = (void *)SDL_GL_GetProcAddress(s);
//#elif defined _WIN32
//    if (extension) t = (void *)bwglGetProcAddress(s);
//    else t = (void *)GetProcAddress(hGLDLL,s);
//#else
//#error Need a dynamic loader for this platform...
//#endif
//    if (!t && fatal)
//    {
//        initprintf("Failed to find %s in %s\n", s, gldriver);
//        *err = 1;
//    }
//    return t;
//}
//#define GETPROC(s)        getproc_(s,&err,1,0)
//#define GETPROCSOFT(s)    getproc_(s,&err,0,0)
//#define GETPROCEXT(s)     getproc_(s,&err,1,1)
//#define GETPROCEXTSOFT(s) getproc_(s,&err,0,1)

//int32_t loadgldriver(const char *driver)
//{
//    int32_t err=0;

//#ifdef _WIN32
//    if (hGLDLL) return 0;
//#endif

//    if (!driver)
//    {
//#ifdef _WIN32
//        driver = "opengl32.dll";
//#elif defined __APPLE__
//        driver = "/System/Library/Frameworks/OpenGL.framework/OpenGL";
//#else
//        driver = "libGL.so.1";
//#endif
//    }

//#if defined RENDERTYPESDL
//    if (SDL_GL_LoadLibrary(driver)) goto fail;
//#elif defined _WIN32
//    hGLDLL = LoadLibrary(driver);
//    if (!hGLDLL) goto fail;
//#endif
//    gldriver = Bstrdup(driver);

//#ifdef _WIN32
//    bwglCreateContext = (bwglCreateContextProcPtr) GETPROC("wglCreateContext");
//    bwglDeleteContext = (bwglDeleteContextProcPtr) GETPROC("wglDeleteContext");
//    bwglGetProcAddress = (bwglGetProcAddressProcPtr) GETPROC("wglGetProcAddress");
//    bwglMakeCurrent = (bwglMakeCurrentProcPtr) GETPROC("wglMakeCurrent");

//    bwglSwapBuffers = (bwglSwapBuffersProcPtr) GETPROC("wglSwapBuffers");
//    bwglChoosePixelFormat = (bwglChoosePixelFormatProcPtr) GETPROC("wglChoosePixelFormat");
//    bwglDescribePixelFormat = (bwglDescribePixelFormatProcPtr) GETPROC("wglDescribePixelFormat");
//    bwglGetPixelFormat = (bwglGetPixelFormatProcPtr) GETPROC("wglGetPixelFormat");
//    bwglSetPixelFormat = (bwglSetPixelFormatProcPtr) GETPROC("wglSetPixelFormat");
//#endif

//    bglClearColor = (bglClearColorProcPtr) GETPROC("glClearColor");
//    bglClear = (bglClearProcPtr) GETPROC("glClear");
//    bglColorMask = (bglColorMaskProcPtr) GETPROC("glColorMask");
//    bglAlphaFunc = (bglAlphaFuncProcPtr) GETPROC("glAlphaFunc");
//    bglBlendFunc = (bglBlendFuncProcPtr) GETPROC("glBlendFunc");
//    bglCullFace = (bglCullFaceProcPtr) GETPROC("glCullFace");
//    bglFrontFace = (bglFrontFaceProcPtr) GETPROC("glFrontFace");
//    bglPolygonOffset = (bglPolygonOffsetProcPtr) GETPROC("glPolygonOffset");
//    bglPolygonMode = (bglPolygonModeProcPtr) GETPROC("glPolygonMode");
//    bglEnable = (bglEnableProcPtr) GETPROC("glEnable");
//    bglDisable = (bglDisableProcPtr) GETPROC("glDisable");
//    bglGetDoublev = (bglGetDoublevProcPtr) GETPROC("glGetDoublev");
//    bglGetFloatv = (bglGetFloatvProcPtr) GETPROC("glGetFloatv");
//    bglGetIntegerv = (bglGetIntegervProcPtr) GETPROC("glGetIntegerv");
//    bglPushAttrib = (bglPushAttribProcPtr) GETPROC("glPushAttrib");
//    bglPopAttrib = (bglPopAttribProcPtr) GETPROC("glPopAttrib");
//    bglGetError = (bglGetErrorProcPtr) GETPROC("glGetError");
//    bglGetString = (bglGetStringProcPtr) GETPROC("glGetString");
//    bglHint = (bglHintProcPtr) GETPROC("glHint");
//    bglDrawBuffer = (bglDrawBufferProcPtr) GETPROC("glDrawBuffer");
//    bglReadBuffer = (bglReadBufferProcPtr) GETPROC("glDrawBuffer");
//    bglScissor = (bglScissorProcPtr) GETPROC("glScissor");
//    bglClipPlane = (bglClipPlaneProcPtr) GETPROC("glClipPlane");

//    // Depth
//    bglDepthFunc = (bglDepthFuncProcPtr) GETPROC("glDepthFunc");
//    bglDepthMask = (bglDepthMaskProcPtr) GETPROC("glDepthMask");
//    bglDepthRange = (bglDepthRangeProcPtr) GETPROC("glDepthRange");

//    // Matrix
//    bglMatrixMode = (bglMatrixModeProcPtr) GETPROC("glMatrixMode");
//    bglOrtho = (bglOrthoProcPtr) GETPROC("glOrtho");
//    bglFrustum = (bglFrustumProcPtr) GETPROC("glFrustum");
//    bglViewport = (bglViewportProcPtr) GETPROC("glViewport");
//    bglPushMatrix = (bglPushMatrixProcPtr) GETPROC("glPushMatrix");
//    bglPopMatrix = (bglPopMatrixProcPtr) GETPROC("glPopMatrix");
//    bglLoadIdentity = (bglLoadIdentityProcPtr) GETPROC("glLoadIdentity");
//    bglLoadMatrixf = (bglLoadMatrixfProcPtr) GETPROC("glLoadMatrixf");
//    bglLoadMatrixd = (bglLoadMatrixdProcPtr) GETPROC("glLoadMatrixd");
//    bglMultMatrixf = (bglMultMatrixfProcPtr) GETPROC("glMultMatrixf");
//    bglMultMatrixd = (bglMultMatrixdProcPtr) GETPROC("glMultMatrixd");
//    bglRotatef = (bglRotatefProcPtr) GETPROC("glRotatef");
//    bglScalef = (bglScalefProcPtr) GETPROC("glScalef");
//    bglTranslatef = (bglTranslatefProcPtr) GETPROC("glTranslatef");

//    // Drawing
//    bglBegin = (bglBeginProcPtr) GETPROC("glBegin");
//    bglEnd = (bglEndProcPtr) GETPROC("glEnd");
//    bglVertex2f = (bglVertex2fProcPtr) GETPROC("glVertex2f");
//    bglVertex2i = (bglVertex2iProcPtr) GETPROC("glVertex2i");
//    bglVertex3f = (bglVertex3fProcPtr) GETPROC("glVertex3f");
//    bglVertex3d = (bglVertex3dProcPtr) GETPROC("glVertex3d");
//    bglVertex3fv = (bglVertex3fvProcPtr) GETPROC("glVertex3fv");
//    bglVertex3dv = (bglVertex3dvProcPtr) GETPROC("glVertex3dv");
//    bglRectd = (bglRectdProcPtr) GETPROC("glRectd");
//    bglColor4f = (bglColor4fProcPtr) GETPROC("glColor4f");
//    bglColor4ub = (bglColor4ubProcPtr) GETPROC("glColor4ub");
//    bglTexCoord2d = (bglTexCoord2dProcPtr) GETPROC("glTexCoord2d");
//    bglTexCoord2f = (bglTexCoord2fProcPtr) GETPROC("glTexCoord2f");
//    bglTexCoord2i = (bglTexCoord2iProcPtr) GETPROC("glTexCoord2i");
//    bglNormal3f = (bglNormal3fProcPtr) GETPROC("glNormal3f");

//    // Lighting
//    bglShadeModel = (bglShadeModelProcPtr) GETPROC("glShadeModel");
//    bglLightfv = (bglLightfvProcPtr) GETPROC("glLightfv");

//    // Raster funcs
//    bglReadPixels = (bglReadPixelsProcPtr) GETPROC("glReadPixels");
//    bglRasterPos4i = (bglRasterPos4iProcPtr) GETPROC("glRasterPos4i");
//    bglDrawPixels = (bglDrawPixelsProcPtr) GETPROC("glDrawPixels");
//    bglPixelStorei = (bglPixelStoreiProcPtr) GETPROC("glPixelStorei");

//    // Texture mapping
//    bglTexEnvf = (bglTexEnvfProcPtr) GETPROC("glTexEnvf");
//    bglGenTextures = (bglGenTexturesProcPtr) GETPROC("glGenTextures");
//    bglDeleteTextures = (bglDeleteTexturesProcPtr) GETPROC("glDeleteTextures");
//    bglBindTexture = (bglBindTextureProcPtr) GETPROC("glBindTexture");
//    bglTexImage2D = (bglTexImage2DProcPtr) GETPROC("glTexImage2D");
//    bglCopyTexImage2D = (bglCopyTexImage2DProcPtr) GETPROC("glCopyTexImage2D");
//    bglCopyTexSubImage2D = (bglCopyTexSubImage2DProcPtr) GETPROC("glCopyTexSubImage2D");
//    bglTexSubImage2D = (bglTexSubImage2DProcPtr) GETPROC("glTexSubImage2D");
//    bglTexParameterf = (bglTexParameterfProcPtr) GETPROC("glTexParameterf");
//    bglTexParameteri = (bglTexParameteriProcPtr) GETPROC("glTexParameteri");
//    bglGetTexParameteriv = (bglGetTexParameterivProcPtr) GETPROC("glGetTexParameteriv");
//    bglGetTexLevelParameteriv = (bglGetTexLevelParameterivProcPtr) GETPROC("glGetTexLevelParameteriv");
//    bglTexGenfv = (bglTexGenfvProcPtr) GETPROC("glTexGenfv");

//    // Fog
//    bglFogf = (bglFogfProcPtr) GETPROC("glFogf");
//    bglFogi = (bglFogiProcPtr) GETPROC("glFogi");
//    bglFogfv = (bglFogfvProcPtr) GETPROC("glFogfv");

//    // Display Lists
//    bglNewList = (bglNewListProcPtr) GETPROC("glNewList");
//    bglEndList = (bglEndListProcPtr) GETPROC("glEndList");
//    bglCallList = (bglCallListProcPtr) GETPROC("glCallList");
//    bglDeleteLists = (bglDeleteListsProcPtr) GETPROC("glDeleteLists");

//    // Vertex Arrays
//    bglEnableClientState = (bglEnableClientStateProcPtr) GETPROC("glEnableClientState");
//    bglDisableClientState = (bglDisableClientStateProcPtr) GETPROC("glDisableClientState");
//    bglVertexPointer = (bglVertexPointerProcPtr) GETPROC("glVertexPointer");
//    bglNormalPointer = (bglNormalPointerProcPtr) GETPROC("glNormalPointer");
//    bglTexCoordPointer = (bglTexCoordPointerProcPtr) GETPROC("glTexCoordPointer");
//    bglDrawArrays = (bglDrawArraysProcPtr) GETPROC("glDrawArrays");
//    bglDrawElements = (bglDrawElementsProcPtr) GETPROC("glDrawElements");

//    // Stencil Buffer
//    bglClearStencil = (bglClearStencilProcPtr) GETPROC("glClearStencil");
//    bglStencilOp = (bglStencilOpProcPtr) GETPROC("glStencilOp");
//    bglStencilFunc = (bglStencilFuncProcPtr) GETPROC("glStencilFunc");

//    loadglextensions();
//    loadglulibrary(getenv("BUILD_GLULIB"));

//    if (err) unloadgldriver();
//    return err;

//fail:
//    initprintf("Failed loading \"%s\"\n",driver);
//    return -1;
//}

//int32_t loadglextensions(void)
//{
//    int32_t err = 0;
//#ifdef _WIN32
//    if (!hGLDLL) return 0;
//#endif

//    bglBlendEquation = (bglBlendEquationProcPtr) GETPROCEXTSOFT("glBlendEquation");

//    bglTexImage3D = (bglTexImage3DProcPtr) GETPROCEXTSOFT("glTexImage3D");
//    bglCompressedTexImage2DARB = (bglCompressedTexImage2DARBProcPtr) GETPROCEXTSOFT("glCompressedTexImage2DARB");
//    bglGetCompressedTexImageARB = (bglGetCompressedTexImageARBProcPtr) GETPROCEXTSOFT("glGetCompressedTexImageARB");

//    // GPU Programs
//    bglGenProgramsARB = (bglGenProgramsARBProcPtr) GETPROCEXTSOFT("glGenProgramsARB");
//    bglBindProgramARB = (bglBindProgramARBProcPtr) GETPROCEXTSOFT("glBindProgramARB");
//    bglProgramStringARB = (bglProgramStringARBProcPtr) GETPROCEXTSOFT("glProgramStringARB");
//    bglDeleteProgramsARB = (bglDeleteProgramsARBProcPtr) GETPROCEXTSOFT("glDeleteProgramsARB");

//    // Multitexturing
//    bglActiveTextureARB = (bglActiveTextureARBProcPtr) GETPROCEXTSOFT("glActiveTextureARB");
//    bglClientActiveTextureARB = (bglClientActiveTextureARBProcPtr) GETPROCEXTSOFT("glClientActiveTextureARB");
//    bglMultiTexCoord2dARB = (bglMultiTexCoord2dARBProcPtr) GETPROCEXTSOFT("glMultiTexCoord2dARB");
//    bglMultiTexCoord2fARB = (bglMultiTexCoord2fARBProcPtr) GETPROCEXTSOFT("glMultiTexCoord2fARB");

//    // Frame Buffer Objects
//    bglGenFramebuffersEXT = (bglGenFramebuffersEXTProcPtr) GETPROCEXTSOFT("glGenFramebuffersEXT");
//    bglBindFramebufferEXT = (bglBindFramebufferEXTProcPtr) GETPROCEXTSOFT("glBindFramebufferEXT");
//    bglFramebufferTexture2DEXT = (bglFramebufferTexture2DEXTProcPtr) GETPROCEXTSOFT("glFramebufferTexture2DEXT");
//    bglCheckFramebufferStatusEXT = (bglCheckFramebufferStatusEXTProcPtr) GETPROCEXTSOFT("glCheckFramebufferStatusEXT");
//    bglDeleteFramebuffersEXT = (bglDeleteFramebuffersEXTProcPtr) GETPROCEXTSOFT("glDeleteFramebuffersEXT");

//    // Vertex Buffer Objects
//    bglGenBuffersARB = (bglGenBuffersARBProcPtr) GETPROCEXTSOFT("glGenBuffersARB");
//    bglBindBufferARB = (bglBindBufferARBProcPtr) GETPROCEXTSOFT("glBindBufferARB");
//    bglDeleteBuffersARB = (bglDeleteBuffersARBProcPtr) GETPROCEXTSOFT("glDeleteBuffersARB");
//    bglBufferDataARB = (bglBufferDataARBProcPtr) GETPROCEXTSOFT("glBufferDataARB");
//    bglBufferSubDataARB = (bglBufferSubDataARBProcPtr) GETPROCEXTSOFT("glBufferSubDataARB");
//    bglMapBufferARB = (bglMapBufferARBProcPtr) GETPROCEXTSOFT("glMapBufferARB");
//    bglUnmapBufferARB = (bglUnmapBufferARBProcPtr) GETPROCEXTSOFT("glUnmapBufferARB");

//    // Occlusion queries
//    bglGenQueriesARB = (bglGenQueriesARBProcPtr) GETPROCEXTSOFT("glGenQueriesARB");
//    bglDeleteQueriesARB = (bglDeleteQueriesARBProcPtr) GETPROCEXTSOFT("glDeleteQueriesARB");
//    bglIsQueryARB = (bglIsQueryARBProcPtr) GETPROCEXTSOFT("glIsQueryARB");
//    bglBeginQueryARB = (bglBeginQueryARBProcPtr) GETPROCEXTSOFT("glBeginQueryARB");
//    bglEndQueryARB = (bglEndQueryARBProcPtr) GETPROCEXTSOFT("glEndQueryARB");
//    bglGetQueryivARB = (bglGetQueryivARBProcPtr) GETPROCEXTSOFT("glGetQueryivARB");
//    bglGetQueryObjectivARB = (bglGetQueryObjectivARBProcPtr) GETPROCEXTSOFT("glGetQueryObjectivARB");
//    bglGetQueryObjectuivARB = (bglGetQueryObjectuivARBProcPtr) GETPROCEXTSOFT("glGetQueryObjectuivARB");

//    // Shader Objects
//    bglDeleteObjectARB = (bglDeleteObjectARBProcPtr) GETPROCEXTSOFT("glDeleteObjectARB");
//    bglGetHandleARB = (bglGetHandleARBProcPtr) GETPROCEXTSOFT("glGetHandleARB");
//    bglDetachObjectARB = (bglDetachObjectARBProcPtr) GETPROCEXTSOFT("glDetachObjectARB");
//    bglCreateShaderObjectARB = (bglCreateShaderObjectARBProcPtr) GETPROCEXTSOFT("glCreateShaderObjectARB");
//    bglShaderSourceARB = (bglShaderSourceARBProcPtr) GETPROCEXTSOFT("glShaderSourceARB");
//    bglCompileShaderARB = (bglCompileShaderARBProcPtr) GETPROCEXTSOFT("glCompileShaderARB");
//    bglCreateProgramObjectARB = (bglCreateProgramObjectARBProcPtr) GETPROCEXTSOFT("glCreateProgramObjectARB");
//    bglAttachObjectARB = (bglAttachObjectARBProcPtr) GETPROCEXTSOFT("glAttachObjectARB");
//    bglLinkProgramARB = (bglLinkProgramARBProcPtr) GETPROCEXTSOFT("glLinkProgramARB");
//    bglUseProgramObjectARB = (bglUseProgramObjectARBProcPtr) GETPROCEXTSOFT("glUseProgramObjectARB");
//    bglValidateProgramARB = (bglValidateProgramARBProcPtr) GETPROCEXTSOFT("glValidateProgramARB");
//    bglUniform1fARB = (bglUniform1fARBProcPtr) GETPROCEXTSOFT("glUniform1fARB");
//    bglUniform2fARB = (bglUniform2fARBProcPtr) GETPROCEXTSOFT("glUniform2fARB");
//    bglUniform3fARB = (bglUniform3fARBProcPtr) GETPROCEXTSOFT("glUniform3fARB");
//    bglUniform4fARB = (bglUniform4fARBProcPtr) GETPROCEXTSOFT("glUniform4fARB");
//    bglUniform1iARB = (bglUniform1iARBProcPtr) GETPROCEXTSOFT("glUniform1iARB");
//    bglUniform2iARB = (bglUniform2iARBProcPtr) GETPROCEXTSOFT("glUniform2iARB");
//    bglUniform3iARB = (bglUniform3iARBProcPtr) GETPROCEXTSOFT("glUniform3iARB");
//    bglUniform4iARB = (bglUniform4iARBProcPtr) GETPROCEXTSOFT("glUniform4iARB");
//    bglUniform1fvARB = (bglUniform1fvARBProcPtr) GETPROCEXTSOFT("glUniform1fvARB");
//    bglUniform2fvARB = (bglUniform2fvARBProcPtr) GETPROCEXTSOFT("glUniform2fvARB");
//    bglUniform3fvARB = (bglUniform3fvARBProcPtr) GETPROCEXTSOFT("glUniform3fvARB");
//    bglUniform4fvARB = (bglUniform4fvARBProcPtr) GETPROCEXTSOFT("glUniform4fvARB");
//    bglUniform1ivARB = (bglUniform1ivARBProcPtr) GETPROCEXTSOFT("glUniform1ivARB");
//    bglUniform2ivARB = (bglUniform2ivARBProcPtr) GETPROCEXTSOFT("glUniform2ivARB");
//    bglUniform3ivARB = (bglUniform3ivARBProcPtr) GETPROCEXTSOFT("glUniform3ivARB");
//    bglUniform4ivARB = (bglUniform4ivARBProcPtr) GETPROCEXTSOFT("glUniform4ivARB");
//    bglUniformMatrix2fvARB = (bglUniformMatrix2fvARBProcPtr) GETPROCEXTSOFT("glUniformMatrix2fvARB");
//    bglUniformMatrix3fvARB = (bglUniformMatrix3fvARBProcPtr) GETPROCEXTSOFT("glUniformMatrix3fvARB");
//    bglUniformMatrix4fvARB = (bglUniformMatrix4fvARBProcPtr) GETPROCEXTSOFT("glUniformMatrix4fvARB");
//    bglGetObjectParameterfvARB = (bglGetObjectParameterfvARBProcPtr) GETPROCEXTSOFT("glGetObjectParameterfvARB");
//    bglGetObjectParameterivARB = (bglGetObjectParameterivARBProcPtr) GETPROCEXTSOFT("glGetObjectParameterivARB");
//    bglGetInfoLogARB = (bglGetInfoLogARBProcPtr) GETPROCEXTSOFT("glGetInfoLogARB");
//    bglGetAttachedObjectsARB = (bglGetAttachedObjectsARBProcPtr) GETPROCEXTSOFT("glGetAttachedObjectsARB");
//    bglGetUniformLocationARB = (bglGetUniformLocationARBProcPtr) GETPROCEXTSOFT("glGetUniformLocationARB");
//    bglGetActiveUniformARB = (bglGetActiveUniformARBProcPtr) GETPROCEXTSOFT("glGetActiveUniformARB");
//    bglGetUniformfvARB = (bglGetUniformfvARBProcPtr) GETPROCEXTSOFT("glGetUniformfvARB");
//    bglGetUniformivARB = (bglGetUniformivARBProcPtr) GETPROCEXTSOFT("glGetUniformivARB");
//    bglGetShaderSourceARB = (bglGetShaderSourceARBProcPtr) GETPROCEXTSOFT("glGetShaderSourceARB");

//    // Vertex Shaders
//    bglVertexAttrib1dARB = (bglVertexAttrib1dARBProcPtr) GETPROCEXTSOFT("glVertexAttrib1dARB");
//    bglVertexAttrib1dvARB = (bglVertexAttrib1dvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib1dvARB");
//    bglVertexAttrib1fARB = (bglVertexAttrib1fARBProcPtr) GETPROCEXTSOFT("glVertexAttrib1fARB");
//    bglVertexAttrib1fvARB = (bglVertexAttrib1fvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib1fvARB");
//    bglVertexAttrib1sARB = (bglVertexAttrib1sARBProcPtr) GETPROCEXTSOFT("glVertexAttrib1sARB");
//    bglVertexAttrib1svARB = (bglVertexAttrib1svARBProcPtr) GETPROCEXTSOFT("glVertexAttrib1svARB");
//    bglVertexAttrib2dARB = (bglVertexAttrib2dARBProcPtr) GETPROCEXTSOFT("glVertexAttrib2dARB");
//    bglVertexAttrib2dvARB = (bglVertexAttrib2dvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib2dvARB");
//    bglVertexAttrib2fARB = (bglVertexAttrib2fARBProcPtr) GETPROCEXTSOFT("glVertexAttrib2fARB");
//    bglVertexAttrib2fvARB = (bglVertexAttrib2fvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib2fvARB");
//    bglVertexAttrib2sARB = (bglVertexAttrib2sARBProcPtr) GETPROCEXTSOFT("glVertexAttrib2sARB");
//    bglVertexAttrib2svARB = (bglVertexAttrib2svARBProcPtr) GETPROCEXTSOFT("glVertexAttrib2svARB");
//    bglVertexAttrib3dARB = (bglVertexAttrib3dARBProcPtr) GETPROCEXTSOFT("glVertexAttrib3dARB");
//    bglVertexAttrib3dvARB = (bglVertexAttrib3dvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib3dvARB");
//    bglVertexAttrib3fARB = (bglVertexAttrib3fARBProcPtr) GETPROCEXTSOFT("glVertexAttrib3fARB");
//    bglVertexAttrib3fvARB = (bglVertexAttrib3fvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib3fvARB");
//    bglVertexAttrib3sARB = (bglVertexAttrib3sARBProcPtr) GETPROCEXTSOFT("glVertexAttrib3sARB");
//    bglVertexAttrib3svARB = (bglVertexAttrib3svARBProcPtr) GETPROCEXTSOFT("glVertexAttrib3svARB");
//    bglVertexAttrib4NbvARB = (bglVertexAttrib4NbvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4NbvARB");
//    bglVertexAttrib4NivARB = (bglVertexAttrib4NivARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4NivARB");
//    bglVertexAttrib4NsvARB = (bglVertexAttrib4NsvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4NsvARB");
//    bglVertexAttrib4NubARB = (bglVertexAttrib4NubARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4NubARB");
//    bglVertexAttrib4NubvARB = (bglVertexAttrib4NubvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4NubvARB");
//    bglVertexAttrib4NuivARB = (bglVertexAttrib4NuivARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4NuivARB");
//    bglVertexAttrib4NusvARB = (bglVertexAttrib4NusvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4NusvARB");
//    bglVertexAttrib4bvARB = (bglVertexAttrib4bvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4bvARB");
//    bglVertexAttrib4dARB = (bglVertexAttrib4dARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4dARB");
//    bglVertexAttrib4dvARB = (bglVertexAttrib4dvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4dvARB");
//    bglVertexAttrib4fARB = (bglVertexAttrib4fARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4fARB");
//    bglVertexAttrib4fvARB = (bglVertexAttrib4fvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4fvARB");
//    bglVertexAttrib4ivARB = (bglVertexAttrib4ivARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4ivARB");
//    bglVertexAttrib4sARB = (bglVertexAttrib4sARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4sARB");
//    bglVertexAttrib4svARB = (bglVertexAttrib4svARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4svARB");
//    bglVertexAttrib4ubvARB = (bglVertexAttrib4ubvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4ubvARB");
//    bglVertexAttrib4uivARB = (bglVertexAttrib4uivARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4uivARB");
//    bglVertexAttrib4usvARB = (bglVertexAttrib4usvARBProcPtr) GETPROCEXTSOFT("glVertexAttrib4usvARB");
//    bglVertexAttribPointerARB = (bglVertexAttribPointerARBProcPtr) GETPROCEXTSOFT("glVertexAttribPointerARB");
//    bglEnableVertexAttribArrayARB = (bglEnableVertexAttribArrayARBProcPtr) GETPROCEXTSOFT("glEnableVertexAttribArrayARB");
//    bglDisableVertexAttribArrayARB = (bglDisableVertexAttribArrayARBProcPtr) GETPROCEXTSOFT("glDisableVertexAttribArrayARB");
//    bglGetVertexAttribdvARB = (bglGetVertexAttribdvARBProcPtr) GETPROCEXTSOFT("glGetVertexAttribdvARB");
//    bglGetVertexAttribfvARB = (bglGetVertexAttribfvARBProcPtr) GETPROCEXTSOFT("glGetVertexAttribfvARB");
//    bglGetVertexAttribivARB = (bglGetVertexAttribivARBProcPtr) GETPROCEXTSOFT("glGetVertexAttribivARB");
//    bglGetVertexAttribPointervARB = (bglGetVertexAttribPointervARBProcPtr) GETPROCEXTSOFT("glGetVertexAttribPointervARB");
//    bglBindAttribLocationARB = (bglBindAttribLocationARBProcPtr) GETPROCEXTSOFT("glBindAttribLocationARB");
//    bglGetActiveAttribARB = (bglGetActiveAttribARBProcPtr) GETPROCEXTSOFT("glGetActiveAttribARB");
//    bglGetAttribLocationARB = (bglGetAttribLocationARBProcPtr) GETPROCEXTSOFT("glGetAttribLocationARB");

//    // Debug Output
//#ifndef __APPLE__
//    bglDebugMessageControlARB = (bglDebugMessageControlARBProcPtr) GETPROCEXTSOFT("glDebugMessageControlARB");
//    bglDebugMessageCallbackARB = (bglDebugMessageCallbackARBProcPtr) GETPROCEXTSOFT("glDebugMessageCallbackARB");
//#endif

//#ifdef _WIN32
//    bwglSwapIntervalEXT = (bwglSwapIntervalEXTProcPtr) GETPROCEXTSOFT("wglSwapIntervalEXT");
    var bwglSwapIntervalEXT = function(vsync: number) {todo("bwglSwapIntervalEXT");}
//    bwglCreateContextAttribsARB = (bwglCreateContextAttribsARBProcPtr) GETPROCEXTSOFT("wglCreateContextAttribsARB");
//#endif
//    return err;
//}

//int32_t unloadgldriver(void)
//{
//    unloadglulibrary();

//#ifdef _WIN32
//    if (!hGLDLL) return 0;
//#endif

//    Bfree(gldriver);
//    gldriver = NULL;

//#ifdef _WIN32
//    FreeLibrary(hGLDLL);
//    hGLDLL = NULL;
//#endif

//    bglClearColor = (bglClearColorProcPtr) NULL;
//    bglClear = (bglClearProcPtr) NULL;
//    bglColorMask = (bglColorMaskProcPtr) NULL;
//    bglAlphaFunc = (bglAlphaFuncProcPtr) NULL;
//    bglBlendFunc = (bglBlendFuncProcPtr) NULL;
//    bglBlendEquation = (bglBlendEquationProcPtr) NULL;
//    bglCullFace = (bglCullFaceProcPtr) NULL;
//    bglFrontFace = (bglFrontFaceProcPtr) NULL;
//    bglPolygonOffset = (bglPolygonOffsetProcPtr) NULL;
//    bglPolygonMode = (bglPolygonModeProcPtr) NULL;
//    bglEnable = (bglEnableProcPtr) NULL;
//    bglDisable = (bglDisableProcPtr) NULL;
//    bglGetDoublev = (bglGetDoublevProcPtr) NULL;
//    bglGetFloatv = (bglGetFloatvProcPtr) NULL;
//    bglGetIntegerv = (bglGetIntegervProcPtr) NULL;
//    bglPushAttrib = (bglPushAttribProcPtr) NULL;
//    bglPopAttrib = (bglPopAttribProcPtr) NULL;
//    bglGetError = (bglGetErrorProcPtr) NULL;
//    bglGetString = (bglGetStringProcPtr) NULL;
//    bglHint = (bglHintProcPtr) NULL;
//    bglDrawBuffer = (bglDrawBufferProcPtr) NULL;
//    bglReadBuffer = (bglReadBufferProcPtr) NULL;
//    bglScissor = (bglScissorProcPtr) NULL;
//    bglClipPlane = (bglClipPlaneProcPtr) NULL;

//    // Depth
//    bglDepthFunc = (bglDepthFuncProcPtr) NULL;
//    bglDepthMask = (bglDepthMaskProcPtr) NULL;
//    bglDepthRange = (bglDepthRangeProcPtr) NULL;

//    // Matrix
//    bglMatrixMode = (bglMatrixModeProcPtr) NULL;
//    bglOrtho = (bglOrthoProcPtr) NULL;
//    bglFrustum = (bglFrustumProcPtr) NULL;
//    bglViewport = (bglViewportProcPtr) NULL;
//    bglPushMatrix = (bglPushMatrixProcPtr) NULL;
//    bglPopMatrix = (bglPopMatrixProcPtr) NULL;
//    bglLoadIdentity = (bglLoadIdentityProcPtr) NULL;
//    bglLoadMatrixf = (bglLoadMatrixfProcPtr) NULL;
//    bglLoadMatrixd = (bglLoadMatrixdProcPtr) NULL;
//    bglMultMatrixf = (bglMultMatrixfProcPtr) NULL;
//    bglMultMatrixd = (bglMultMatrixdProcPtr) NULL;
//    bglRotatef = (bglRotatefProcPtr) NULL;
//    bglScalef = (bglScalefProcPtr) NULL;
//    bglTranslatef = (bglTranslatefProcPtr) NULL;

//    // Drawing
//    bglBegin = (bglBeginProcPtr) NULL;
//    bglEnd = (bglEndProcPtr) NULL;
//    bglVertex2f = (bglVertex2fProcPtr) NULL;
//    bglVertex2i = (bglVertex2iProcPtr) NULL;
//    bglVertex3f = (bglVertex3fProcPtr) NULL;
//    bglVertex3d = (bglVertex3dProcPtr) NULL;
//    bglVertex3fv = (bglVertex3fvProcPtr) NULL;
//    bglColor4f = (bglColor4fProcPtr) NULL;
//    bglColor4ub = (bglColor4ubProcPtr) NULL;
//    bglTexCoord2d = (bglTexCoord2dProcPtr) NULL;
//    bglTexCoord2f = (bglTexCoord2fProcPtr) NULL;
//    bglTexCoord2i = (bglTexCoord2iProcPtr) NULL;
//    bglNormal3f = (bglNormal3fProcPtr) NULL;

//    // Lighting
//    bglShadeModel = (bglShadeModelProcPtr) NULL;
//    bglLightfv = (bglLightfvProcPtr) NULL;

//    // Raster funcs
//    bglReadPixels = (bglReadPixelsProcPtr) NULL;
//    bglRasterPos4i = (bglRasterPos4iProcPtr) NULL;
//    bglDrawPixels = (bglDrawPixelsProcPtr) NULL;
//    bglPixelStorei = (bglPixelStoreiProcPtr) NULL;

//    // Texture mapping
//    bglTexEnvf = (bglTexEnvfProcPtr) NULL;
//    bglGenTextures = (bglGenTexturesProcPtr) NULL;
//    bglDeleteTextures = (bglDeleteTexturesProcPtr) NULL;
//    bglBindTexture = (bglBindTextureProcPtr) NULL;
//    bglTexImage2D = (bglTexImage2DProcPtr) NULL;
//    bglTexImage3D = (bglTexImage3DProcPtr) NULL;
//    bglCopyTexImage2D = (bglCopyTexImage2DProcPtr) NULL;
//    bglCopyTexSubImage2D= NULL;
//    bglTexSubImage2D = (bglTexSubImage2DProcPtr) NULL;
//    bglTexParameterf = (bglTexParameterfProcPtr) NULL;
//    bglTexParameteri = (bglTexParameteriProcPtr) NULL;
//    bglGetTexParameteriv = (bglGetTexParameterivProcPtr) NULL;
//    bglGetTexLevelParameteriv = (bglGetTexLevelParameterivProcPtr) NULL;
//    bglCompressedTexImage2DARB = (bglCompressedTexImage2DARBProcPtr) NULL;
//    bglGetCompressedTexImageARB = (bglGetCompressedTexImageARBProcPtr) NULL;

//    // Fog
//    bglFogf = (bglFogfProcPtr) NULL;
//    bglFogi = (bglFogiProcPtr) NULL;
//    bglFogfv = (bglFogfvProcPtr) NULL;

//    // Display Lists
//    bglNewList = (bglNewListProcPtr) NULL;
//    bglEndList = (bglEndListProcPtr) NULL;
//    bglCallList = (bglCallListProcPtr) NULL;
//    bglDeleteLists = (bglDeleteListsProcPtr) NULL;

//    // Vertex Arrays
//    bglEnableClientState = (bglEnableClientStateProcPtr) NULL;
//    bglDisableClientState = (bglDisableClientStateProcPtr) NULL;
//    bglVertexPointer = (bglVertexPointerProcPtr) NULL;
//    bglNormalPointer = (bglNormalPointerProcPtr) NULL;
//    bglTexCoordPointer = (bglTexCoordPointerProcPtr) NULL;
//    bglDrawElements = (bglDrawElementsProcPtr) NULL;

//    // Stencil Buffer
//    bglClearStencil = (bglClearStencilProcPtr) NULL;
//    bglStencilOp = (bglStencilOpProcPtr) NULL;
//    bglStencilFunc = (bglStencilFuncProcPtr) NULL;

//    // GPU Programs
//    bglGenProgramsARB = (bglGenProgramsARBProcPtr) NULL;
//    bglBindProgramARB = (bglBindProgramARBProcPtr) NULL;
//    bglProgramStringARB = (bglProgramStringARBProcPtr) NULL;
//    bglDeleteProgramsARB= NULL;

//    // Multitexturing
//    bglActiveTextureARB = (bglActiveTextureARBProcPtr) NULL;
//    bglClientActiveTextureARB = (bglClientActiveTextureARBProcPtr) NULL;
//    bglMultiTexCoord2dARB = (bglMultiTexCoord2dARBProcPtr) NULL;
//    bglMultiTexCoord2fARB = (bglMultiTexCoord2fARBProcPtr) NULL;

//    // Frame Buffer Objects
//    bglGenFramebuffersEXT = (bglGenFramebuffersEXTProcPtr) NULL;
//    bglBindFramebufferEXT = (bglBindFramebufferEXTProcPtr) NULL;
//    bglFramebufferTexture2DEXT = (bglFramebufferTexture2DEXTProcPtr) NULL;
//    bglCheckFramebufferStatusEXT = (bglCheckFramebufferStatusEXTProcPtr) NULL;
//    bglDeleteFramebuffersEXT = (bglDeleteFramebuffersEXTProcPtr) NULL;

//    // Vertex Buffer Objects
//    bglGenBuffersARB = (bglGenBuffersARBProcPtr) NULL;
//    bglBindBufferARB = (bglBindBufferARBProcPtr) NULL;
//    bglDeleteBuffersARB = (bglDeleteBuffersARBProcPtr) NULL;
//    bglBufferDataARB = (bglBufferDataARBProcPtr) NULL;
//    bglBufferSubDataARB = (bglBufferSubDataARBProcPtr) NULL;
//    bglMapBufferARB = (bglMapBufferARBProcPtr) NULL;
//    bglUnmapBufferARB = (bglUnmapBufferARBProcPtr) NULL;

//    // Occlusion queries
//    bglGenQueriesARB = (bglGenQueriesARBProcPtr) NULL;
//    bglDeleteQueriesARB = (bglDeleteQueriesARBProcPtr) NULL;
//    bglIsQueryARB = (bglIsQueryARBProcPtr) NULL;
//    bglBeginQueryARB = (bglBeginQueryARBProcPtr) NULL;
//    bglEndQueryARB = (bglEndQueryARBProcPtr) NULL;
//    bglGetQueryivARB = (bglGetQueryivARBProcPtr) NULL;
//    bglGetQueryObjectivARB = (bglGetQueryObjectivARBProcPtr) NULL;
//    bglGetQueryObjectuivARB = (bglGetQueryObjectuivARBProcPtr) NULL;

//    // Shader Objects
//    bglDeleteObjectARB = (bglDeleteObjectARBProcPtr) NULL;
//    bglGetHandleARB = (bglGetHandleARBProcPtr) NULL;
//    bglDetachObjectARB = (bglDetachObjectARBProcPtr) NULL;
//    bglCreateShaderObjectARB = (bglCreateShaderObjectARBProcPtr) NULL;
//    bglShaderSourceARB = (bglShaderSourceARBProcPtr) NULL;
//    bglCompileShaderARB = (bglCompileShaderARBProcPtr) NULL;
//    bglCreateProgramObjectARB = (bglCreateProgramObjectARBProcPtr) NULL;
//    bglAttachObjectARB = (bglAttachObjectARBProcPtr) NULL;
//    bglLinkProgramARB = (bglLinkProgramARBProcPtr) NULL;
//    bglUseProgramObjectARB = (bglUseProgramObjectARBProcPtr) NULL;
//    bglValidateProgramARB = (bglValidateProgramARBProcPtr) NULL;
//    bglUniform1fARB = (bglUniform1fARBProcPtr) NULL;
//    bglUniform2fARB = (bglUniform2fARBProcPtr) NULL;
//    bglUniform3fARB = (bglUniform3fARBProcPtr) NULL;
//    bglUniform4fARB = (bglUniform4fARBProcPtr) NULL;
//    bglUniform1iARB = (bglUniform1iARBProcPtr) NULL;
//    bglUniform2iARB = (bglUniform2iARBProcPtr) NULL;
//    bglUniform3iARB = (bglUniform3iARBProcPtr) NULL;
//    bglUniform4iARB = (bglUniform4iARBProcPtr) NULL;
//    bglUniform1fvARB = (bglUniform1fvARBProcPtr) NULL;
//    bglUniform2fvARB = (bglUniform2fvARBProcPtr) NULL;
//    bglUniform3fvARB = (bglUniform3fvARBProcPtr) NULL;
//    bglUniform4fvARB = (bglUniform4fvARBProcPtr) NULL;
//    bglUniform1ivARB = (bglUniform1ivARBProcPtr) NULL;
//    bglUniform2ivARB = (bglUniform2ivARBProcPtr) NULL;
//    bglUniform3ivARB = (bglUniform3ivARBProcPtr) NULL;
//    bglUniform4ivARB = (bglUniform4ivARBProcPtr) NULL;
//    bglUniformMatrix2fvARB = (bglUniformMatrix2fvARBProcPtr) NULL;
//    bglUniformMatrix3fvARB = (bglUniformMatrix3fvARBProcPtr) NULL;
//    bglUniformMatrix4fvARB = (bglUniformMatrix4fvARBProcPtr) NULL;
//    bglGetObjectParameterfvARB = (bglGetObjectParameterfvARBProcPtr) NULL;
//    bglGetObjectParameterivARB = (bglGetObjectParameterivARBProcPtr) NULL;
//    bglGetInfoLogARB = (bglGetInfoLogARBProcPtr) NULL;
//    bglGetAttachedObjectsARB = (bglGetAttachedObjectsARBProcPtr) NULL;
//    bglGetUniformLocationARB = (bglGetUniformLocationARBProcPtr) NULL;
//    bglGetActiveUniformARB = (bglGetActiveUniformARBProcPtr) NULL;
//    bglGetUniformfvARB = (bglGetUniformfvARBProcPtr) NULL;
//    bglGetUniformivARB = (bglGetUniformivARBProcPtr) NULL;
//    bglGetShaderSourceARB = (bglGetShaderSourceARBProcPtr) NULL;

//    // Vertex Shaders
//    bglVertexAttrib1dARB = (bglVertexAttrib1dARBProcPtr) NULL;
//    bglVertexAttrib1dvARB = (bglVertexAttrib1dvARBProcPtr) NULL;
//    bglVertexAttrib1fARB = (bglVertexAttrib1fARBProcPtr) NULL;
//    bglVertexAttrib1fvARB = (bglVertexAttrib1fvARBProcPtr) NULL;
//    bglVertexAttrib1sARB = (bglVertexAttrib1sARBProcPtr) NULL;
//    bglVertexAttrib1svARB = (bglVertexAttrib1svARBProcPtr) NULL;
//    bglVertexAttrib2dARB = (bglVertexAttrib2dARBProcPtr) NULL;
//    bglVertexAttrib2dvARB = (bglVertexAttrib2dvARBProcPtr) NULL;
//    bglVertexAttrib2fARB = (bglVertexAttrib2fARBProcPtr) NULL;
//    bglVertexAttrib2fvARB = (bglVertexAttrib2fvARBProcPtr) NULL;
//    bglVertexAttrib2sARB = (bglVertexAttrib2sARBProcPtr) NULL;
//    bglVertexAttrib2svARB = (bglVertexAttrib2svARBProcPtr) NULL;
//    bglVertexAttrib3dARB = (bglVertexAttrib3dARBProcPtr) NULL;
//    bglVertexAttrib3dvARB = (bglVertexAttrib3dvARBProcPtr) NULL;
//    bglVertexAttrib3fARB = (bglVertexAttrib3fARBProcPtr) NULL;
//    bglVertexAttrib3fvARB = (bglVertexAttrib3fvARBProcPtr) NULL;
//    bglVertexAttrib3sARB = (bglVertexAttrib3sARBProcPtr) NULL;
//    bglVertexAttrib3svARB = (bglVertexAttrib3svARBProcPtr) NULL;
//    bglVertexAttrib4NbvARB = (bglVertexAttrib4NbvARBProcPtr) NULL;
//    bglVertexAttrib4NivARB = (bglVertexAttrib4NivARBProcPtr) NULL;
//    bglVertexAttrib4NsvARB = (bglVertexAttrib4NsvARBProcPtr) NULL;
//    bglVertexAttrib4NubARB = (bglVertexAttrib4NubARBProcPtr) NULL;
//    bglVertexAttrib4NubvARB = (bglVertexAttrib4NubvARBProcPtr) NULL;
//    bglVertexAttrib4NuivARB = (bglVertexAttrib4NuivARBProcPtr) NULL;
//    bglVertexAttrib4NusvARB = (bglVertexAttrib4NusvARBProcPtr) NULL;
//    bglVertexAttrib4bvARB = (bglVertexAttrib4bvARBProcPtr) NULL;
//    bglVertexAttrib4dARB = (bglVertexAttrib4dARBProcPtr) NULL;
//    bglVertexAttrib4dvARB = (bglVertexAttrib4dvARBProcPtr) NULL;
//    bglVertexAttrib4fARB = (bglVertexAttrib4fARBProcPtr) NULL;
//    bglVertexAttrib4fvARB = (bglVertexAttrib4fvARBProcPtr) NULL;
//    bglVertexAttrib4ivARB = (bglVertexAttrib4ivARBProcPtr) NULL;
//    bglVertexAttrib4sARB = (bglVertexAttrib4sARBProcPtr) NULL;
//    bglVertexAttrib4svARB = (bglVertexAttrib4svARBProcPtr) NULL;
//    bglVertexAttrib4ubvARB = (bglVertexAttrib4ubvARBProcPtr) NULL;
//    bglVertexAttrib4uivARB = (bglVertexAttrib4uivARBProcPtr) NULL;
//    bglVertexAttrib4usvARB = (bglVertexAttrib4usvARBProcPtr) NULL;
//    bglVertexAttribPointerARB = (bglVertexAttribPointerARBProcPtr) NULL;
//    bglEnableVertexAttribArrayARB = (bglEnableVertexAttribArrayARBProcPtr) NULL;
//    bglDisableVertexAttribArrayARB = (bglDisableVertexAttribArrayARBProcPtr) NULL;
//    bglGetVertexAttribdvARB = (bglGetVertexAttribdvARBProcPtr) NULL;
//    bglGetVertexAttribfvARB = (bglGetVertexAttribfvARBProcPtr) NULL;
//    bglGetVertexAttribivARB = (bglGetVertexAttribivARBProcPtr) NULL;
//    bglGetVertexAttribPointervARB = (bglGetVertexAttribPointervARBProcPtr) NULL;
//    bglBindAttribLocationARB = (bglBindAttribLocationARBProcPtr) NULL;
//    bglGetActiveAttribARB = (bglGetActiveAttribARBProcPtr) NULL;
//    bglGetAttribLocationARB = (bglGetAttribLocationARBProcPtr) NULL;

//#ifdef _WIN32
//    bwglCreateContext = (bwglCreateContextProcPtr) NULL;
//    bwglDeleteContext = (bwglDeleteContextProcPtr) NULL;
//    bwglGetProcAddress = (bwglGetProcAddressProcPtr) NULL;
//    bwglMakeCurrent = (bwglMakeCurrentProcPtr) NULL;

//    bwglSwapBuffers = (bwglSwapBuffersProcPtr) NULL;
//    bwglChoosePixelFormat = (bwglChoosePixelFormatProcPtr) NULL;
//    bwglDescribePixelFormat = (bwglDescribePixelFormatProcPtr) NULL;
//    bwglGetPixelFormat = (bwglGetPixelFormatProcPtr) NULL;
//    bwglSetPixelFormat = (bwglSetPixelFormatProcPtr) NULL;
//    bwglSwapIntervalEXT = (bwglSwapIntervalEXTProcPtr) NULL;
//#endif

//    return 0;
//}

//static void *glugetproc_(const char *s, int32_t *err, int32_t fatal)
//{
//    void *t;
//#if defined _WIN32
//    t = (void *)GetProcAddress(hGLUDLL,s);
//#else
//    t = (void *)dlsym(gluhandle,s);
//#endif
//    if (!t && fatal)
//    {
//        initprintf("Failed to find %s in %s\n", s, glulibrary);
//        *err = 1;
//    }
//    return t;
//}
//#define GLUGETPROC(s)        glugetproc_(s,&err,1)
//#define GLUGETPROCSOFT(s)    glugetproc_(s,&err,0)

//int32_t loadglulibrary(const char *driver)
//{
//    int32_t err=0;

//#ifdef _WIN32
//    if (hGLUDLL) return 0;
//#endif

//    if (!driver)
//    {
//#ifdef _WIN32
//        driver = "glu32.dll";
//#elif defined __APPLE__
//        driver = "/System/Library/Frameworks/OpenGL.framework/OpenGL"; // FIXME: like I know anything about Apple.  Hah.
//#else
//        driver = "libGLU.so.1";
//#endif
//    }

//#if defined _WIN32
//    hGLUDLL = LoadLibrary(driver);
//    if (!hGLUDLL) goto fail;
//#else
//    gluhandle = dlopen(driver, RTLD_NOW|RTLD_GLOBAL);
//    if (!gluhandle) goto fail;
//#endif
//    glulibrary = Bstrdup(driver);

//    bgluTessBeginContour = (bgluTessBeginContourProcPtr) GLUGETPROC("gluTessBeginContour");
//    bgluTessBeginPolygon = (bgluTessBeginPolygonProcPtr) GLUGETPROC("gluTessBeginPolygon");
//    bgluTessCallback = (bgluTessCallbackProcPtr) GLUGETPROC("gluTessCallback");
//    bgluTessEndContour = (bgluTessEndContourProcPtr) GLUGETPROC("gluTessEndContour");
//    bgluTessEndPolygon = (bgluTessEndPolygonProcPtr) GLUGETPROC("gluTessEndPolygon");
//    bgluTessNormal = (bgluTessNormalProcPtr) GLUGETPROC("gluTessNormal");
//    bgluTessProperty = (bgluTessPropertyProcPtr) GLUGETPROC("gluTessProperty");
//    bgluTessVertex = (bgluTessVertexProcPtr) GLUGETPROC("gluTessVertex");
//    bgluNewTess = (bgluNewTessProcPtr) GLUGETPROC("gluNewTess");
//    bgluDeleteTess = (bgluDeleteTessProcPtr) GLUGETPROC("gluDeleteTess");

//    bgluPerspective = (bgluPerspectiveProcPtr) GLUGETPROC("gluPerspective");

//    bgluErrorString = (bgluErrorStringProcPtr) GLUGETPROC("gluErrorString");

//    bgluProject = (bgluProjectProcPtr) GLUGETPROC("gluProject");
//    bgluUnProject = (bgluUnProjectProcPtr) GLUGETPROC("gluUnProject");

//    if (err) unloadglulibrary();
//    return err;

//fail:
//    initprintf("Failed loading \"%s\"\n",driver);
//    return -1;
//}

//int32_t unloadglulibrary(void)
//{
//#ifdef _WIN32
//    if (!hGLUDLL) return 0;
//#endif

//    Bfree(glulibrary);
//    glulibrary = NULL;

//#ifdef _WIN32
//    FreeLibrary(hGLUDLL);
//    hGLUDLL = NULL;
//#else
//    if (gluhandle) dlclose(gluhandle);
//    gluhandle = NULL;
//#endif

//    bgluTessBeginContour = (bgluTessBeginContourProcPtr) NULL;
//    bgluTessBeginPolygon = (bgluTessBeginPolygonProcPtr) NULL;
//    bgluTessCallback = (bgluTessCallbackProcPtr) NULL;
//    bgluTessEndContour = (bgluTessEndContourProcPtr) NULL;
//    bgluTessEndPolygon = (bgluTessEndPolygonProcPtr) NULL;
//    bgluTessNormal = (bgluTessNormalProcPtr) NULL;
//    bgluTessProperty = (bgluTessPropertyProcPtr) NULL;
//    bgluTessVertex = (bgluTessVertexProcPtr) NULL;
//    bgluNewTess = (bgluNewTessProcPtr) NULL;
//    bgluDeleteTess = (bgluDeleteTessProcPtr) NULL;

//    bgluPerspective = (bgluPerspectiveProcPtr) NULL;

//    bgluErrorString = (bgluErrorStringProcPtr) NULL;

//    bgluProject = (bgluProjectProcPtr) NULL;
//    bgluUnProject = (bgluUnProjectProcPtr) NULL;

//    return 0;
//}


////////// glGenTextures/glDeleteTextures debugging ////////
//# if defined DEBUGGINGAIDS && defined DEBUG_TEXTURE_NAMES
//static uint8_t *texnameused;  // bitmap
//static uint32_t *texnamefromwhere;  // hash of __FILE__
//static uint32_t texnameallocsize;

//// djb3 algorithm
//static inline uint32_t texdbg_getcode(const char *s)
//{
//    uint32_t h = 5381;
//    int32_t ch;

//    while ((ch = *s++) != '\0')
//        h = ((h << 5) + h) ^ ch;

//    return h;
//}

//static void texdbg_realloc(uint32_t maxtexname)
//{
//    uint32_t newsize = texnameallocsize ? texnameallocsize : 64;

//    if (maxtexname < texnameallocsize)
//        return;

//    while (maxtexname >= newsize)
//        newsize <<= 1;
////    initprintf("texdebug: new size %u\n", newsize);

//    texnameused = Brealloc(texnameused, newsize>>3);
//    texnamefromwhere = Brealloc(texnamefromwhere, newsize*sizeof(uint32_t));

//    Bmemset(texnameused + (texnameallocsize>>3), 0, (newsize-texnameallocsize)>>3);
//    Bmemset(texnamefromwhere + texnameallocsize, 0, (newsize-texnameallocsize)*sizeof(uint32_t));

//    texnameallocsize = newsize;
//}

//#undef bglGenTextures
//void texdbg_bglGenTextures(GLsizei n, GLuint *textures, const char *srcfn)
//{
//    int32_t i;
//    uint32_t hash = srcfn ? texdbg_getcode(srcfn) : 0;

//    for (i=0; i<n; i++)
//        if (textures[i] < texnameallocsize && (texnameused[textures[i]>>3]&(1<<(textures[i]&7))))
//            initprintf("texdebug %x Gen: overwriting used tex name %u from %x\n", hash, textures[i], texnamefromwhere[textures[i]]);

//    bglGenTextures(n, textures);

//    {
//        GLuint maxtexname = 0;

//        for (i=0; i<n; i++)
//            maxtexname = max(maxtexname, textures[i]);

//        texdbg_realloc(maxtexname);

//        for (i=0; i<n; i++)
//        {
//            texnameused[textures[i]>>3] |= (1<<(textures[i]&7));
//            texnamefromwhere[textures[i]] = hash;
//        }
//    }
//}

//#undef bglDeleteTextures
//void texdbg_bglDeleteTextures(GLsizei n, const GLuint *textures, const char *srcfn)
//{
//    int32_t i;
//    uint32_t hash = srcfn ? texdbg_getcode(srcfn) : 0;

//    for (i=0; i<n; i++)
//        if (textures[i] < texnameallocsize)
//        {
//            if ((texnameused[textures[i]>>3]&(1<<(textures[i]&7)))==0)
//                initprintf("texdebug %x Del: deleting unused tex name %u\n", hash, textures[i]);
//            else if ((texnameused[textures[i]>>3]&(1<<(textures[i]&7))) &&
//                         texnamefromwhere[textures[i]] != hash)
//                initprintf("texdebug %x Del: deleting foreign tex name %u from %x\n", hash,
//                           textures[i], texnamefromwhere[textures[i]]);
//        }

//    bglDeleteTextures(n, textures);

//    if (texnameallocsize)
//        for (i=0; i<n; i++)
//        {
//            texnameused[textures[i]>>3] &= ~(1<<(textures[i]&7));
//            texnamefromwhere[textures[i]] = 0;
//        }
//}
//# endif  // defined DEBUGGINGAIDS

//#endif

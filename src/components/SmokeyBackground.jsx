import { useEffect, useRef } from "react";

const vertex = `attribute vec2 a_position; void main(){ gl_Position=vec4(a_position,0.0,1.0); }`;
const fragment = `precision mediump float;
uniform vec2 iResolution; uniform float iTime; uniform vec2 iMouse;
void main(){
 vec2 uv=(2.0*gl_FragCoord.xy-iResolution.xy)/min(iResolution.x,iResolution.y);
 vec2 mouse=(2.0*iMouse-iResolution.xy)/min(iResolution.x,iResolution.y);
 float t=iTime*.18;
 vec2 p=uv;
 for(int i=1;i<7;i++){float f=float(i);p.x+=.22/f*sin(f*2.0*p.y+t+mouse.x);p.y+=.22/f*cos(f*2.0*p.x-t+mouse.y);}
 float wave=abs(sin(p.x+p.y+t));float glow=1.0-smoothstep(.18,.95,wave);
 float haze=exp(-dot(uv-mouse,uv-mouse)*.28);
 vec3 gold=vec3(.65,.39,.12);vec3 blue=vec3(.12,.25,.4);
 float mixv=clamp(.5+.5*sin(p.x*.7-p.y*.5+t),0.0,1.0);
 vec3 col=mix(blue,gold,mixv)*glow*(.35+.45*haze);
 gl_FragColor=vec4(col,clamp(glow*.72,0.0,.72));
}`;

export function SmokeyBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: false });
    if (!gl) return;
    const compile = (type, source) => {
      const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    };
    const vs = compile(gl.VERTEX_SHADER, vertex), fs = compile(gl.FRAGMENT_SHADER, fragment);
    if (!vs || !fs) return;
    const program = gl.createProgram(); gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_position"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    const resLoc=gl.getUniformLocation(program,"iResolution"), timeLoc=gl.getUniformLocation(program,"iTime"), mouseLoc=gl.getUniformLocation(program,"iMouse");
    let w=1,h=1,px=0,py=0,raf=0,active=true; const start=performance.now();
    const resize=()=>{const rect=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,1.5);w=Math.max(1,Math.floor(rect.width*dpr));h=Math.max(1,Math.floor(rect.height*dpr));canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);};
    const move=e=>{const r=canvas.getBoundingClientRect();px=(e.clientX-r.left)/r.width*w;py=(r.bottom-e.clientY)/r.height*h;};
    const draw=now=>{if(!active)return;gl.uniform2f(resLoc,w,h);gl.uniform1f(timeLoc,(now-start)/1000);gl.uniform2f(mouseLoc,px||w*.6,py||h*.5);gl.drawArrays(gl.TRIANGLES,0,6);raf=requestAnimationFrame(draw);};
    const observer=new ResizeObserver(resize);observer.observe(canvas);resize();canvas.addEventListener("pointermove",move,{passive:true});raf=requestAnimationFrame(draw);
    return()=>{active=false;cancelAnimationFrame(raf);observer.disconnect();canvas.removeEventListener("pointermove",move);gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);};
  }, []);
  return <canvas className="contact-smoke" ref={canvasRef} aria-hidden="true" />;
}

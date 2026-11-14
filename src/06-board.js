/* ---------- mapa mental com tema por idioma ---------- */
const NS = "http://www.w3.org/2000/svg";
const BW = 1400, BH = 760;
function E(tag, attrs, parent, text){
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (text != null) e.textContent = text;
  if (parent) parent.appendChild(e);
  return e;
}
function bz(p0,p1,p2,p3,t){ const u=1-t; return {x:u*u*u*p0.x+3*u*u*t*p1.x+3*u*t*t*p2.x+t*t*t*p3.x, y:u*u*u*p0.y+3*u*u*t*p1.y+3*u*t*t*p2.y+t*t*t*p3.y}; }
function bzd(p0,p1,p2,p3,t){ const u=1-t; return {x:3*u*u*(p1.x-p0.x)+6*u*t*(p2.x-p1.x)+3*t*t*(p3.x-p2.x), y:3*u*u*(p1.y-p0.y)+6*u*t*(p2.y-p1.y)+3*t*t*(p3.y-p2.y)}; }
function taper(p0,p1,p2,p3,w0,w1){
  const N = 36, A = [], B = [];
  for (let i=0;i<=N;i++){
    const t = i/N, p = bz(p0,p1,p2,p3,t), d = bzd(p0,p1,p2,p3,t);
    const len = Math.hypot(d.x,d.y) || 1, nx = -d.y/len, ny = d.x/len;
    const w = (w1 + (w0-w1)*Math.pow(1-t,1.3)) / 2;
    A.push([p.x+nx*w, p.y+ny*w]); B.push([p.x-nx*w, p.y-ny*w]);
  }
  const f = a => a[0].toFixed(1)+","+a[1].toFixed(1);
  return "M"+A.map(f).join(" L")+" L"+B.reverse().map(f).join(" L")+" Z";
}
const cub = (a,b,c,d) => `M${a.x.toFixed(1)},${a.y.toFixed(1)} C${b.x.toFixed(1)},${b.y.toFixed(1)} ${c.x.toFixed(1)},${c.y.toFixed(1)} ${d.x.toFixed(1)},${d.y.toFixed(1)}`;
function wrapLines(s, max){
  const out = [""];
  for (const w of s.split(" ")) { const cur = out[out.length-1]; if (cur && (cur + " " + w).length > max) out.push(w); else out[out.length-1] = (cur ? cur + " " : "") + w; }
  return out.slice(0, 3);
}
const sinPath = (amp, per, from, to) => { let d = ""; for (let x=from;x<=to;x+=2){ const y = 10 + amp*Math.sin(Math.PI*2*x/per); d += (x===from?"M":"L") + x + "," + y.toFixed(2); } return d; };

const THEMES = {
  en:{paper:"#F3E6C4", frame:"#F4E9CB", blot:"#D9C08A", ink:"#2A1E14", gold:"#C9A13B", goldLt:"#EDD27A", red:"#B8321F", blue:"#24377A", tree:"#4E7A4A", medalText:"#EDD27A", medalSub:"#F9F2DE",
    border(p){ E("rect",{width:64,height:20,fill:"#F4E9CB"},p); E("path",{d:sinPath(4.5,64,-2,66),fill:"none",stroke:"#2A1E14","stroke-width":1.3},p);
      const leaf = (x,y,up) => { const s = up?-1:1; E("path",{d:`M${x},${y} c-4,${s*-1} -6,${s*5} -2,${s*8} c1,${s*-1} 2,${s*-1} 2,${s*-3} c0,${s*2} 1,${s*2} 2,${s*3} c4,${s*-3} 2,${s*-9} -2,${s*-8} z`,fill:"#D6AE45",stroke:"#2A1E14","stroke-width":.9},p); };
      leaf(16,6,true); leaf(48,14,false); for (const [x,c] of [[0,"#24377A"],[64,"#24377A"],[32,"#B8321F"]]) E("circle",{cx:x,cy:10,r:2.4,fill:c,stroke:"#2A1E14","stroke-width":.6},p); },
    medal(defs){ const dp = E("pattern",{id:"medal",width:16,height:16,patternUnits:"userSpaceOnUse",patternTransform:"rotate(45)"},defs); E("rect",{width:16,height:16,fill:"#24377A"},dp); E("path",{d:"M0,0 H16 M0,0 V16",stroke:"#C9A13B","stroke-width":1.2,opacity:.8},dp); E("circle",{cx:8,cy:8,r:1.5,fill:"#EDD27A"},dp); },
    landmark(g, gx, gy){
      const tower = (x, w, h) => { E("rect",{x:x-w/2,y:gy-h,width:w,height:h,fill:"#EFE4D2",stroke:"#2A1E14","stroke-width":1.5},g); E("path",{d:`M${x-w/2-3},${gy-h} L${x},${gy-h-w*1.5} L${x+w/2+3},${gy-h} Z`,fill:"#24377A",stroke:"#2A1E14","stroke-width":1.5},g); E("path",{d:`M${x},${gy-h-w*1.5-3} v-12`,stroke:"#2A1E14","stroke-width":1.3},g); E("path",{d:`M${x},${gy-h-w*1.5-15} l12,3 l-12,4 Z`,fill:"#B8321F",stroke:"#2A1E14","stroke-width":.9},g); E("rect",{x:x-2,y:gy-h+8,width:4,height:8,rx:2,fill:"#2A1E14"},g); };
      E("rect",{x:gx-28,y:gy-32,width:56,height:32,fill:"#E6D9C2",stroke:"#2A1E14","stroke-width":1.5},g);
      for (let i=0;i<6;i++) E("rect",{x:gx-28+i*9.5+1,y:gy-38,width:7,height:6,fill:"#E6D9C2",stroke:"#2A1E14","stroke-width":1.2},g);
      tower(gx-32,15,46); tower(gx+32,15,46); tower(gx,13,58);
      E("path",{d:`M${gx-8},${gy} v-12 a8,8 0 0 1 16,0 v12 Z`,fill:"#3A2414"},g); }},
  es:{paper:"#F6E8CC", frame:"#F8EDD6", blot:"#E2C892", ink:"#3A2415", gold:"#D9A441", goldLt:"#F2CF7A", red:"#B5461F", blue:"#1F4E8C", tree:"#5E8A3C", medalText:"#F2CF7A", medalSub:"#FBF3E2",
    border(p){ E("rect",{width:64,height:20,fill:"#FBF3E2"},p);
      const star = (cx,cy,R,r,fill) => { let d=""; for (let i=0;i<16;i++){ const a=i*Math.PI/8, rr=i%2?r:R; d+=(i?"L":"M")+(cx+Math.cos(a)*rr).toFixed(1)+","+(cy+Math.sin(a)*rr).toFixed(1);} E("path",{d:d+"Z",fill,stroke:"#1F4E8C","stroke-width":.8},p); };
      star(16,10,8.5,4.5,"#1F4E8C"); star(48,10,8.5,4.5,"#1F4E8C"); star(16,10,3.5,1.8,"#F2CF7A"); star(48,10,3.5,1.8,"#F2CF7A");
      E("path",{d:"M32,4 l5,6 l-5,6 l-5,-6 Z",fill:"#B5461F"},p); E("path",{d:"M0,4 l5,6 l-5,6 M64,4 l-5,6 l5,6",fill:"#B5461F",stroke:"none"},p);
      E("path",{d:"M0,1 H64 M0,19 H64",stroke:"#1F4E8C","stroke-width":1.4},p); },
    medal(defs){ const dp = E("pattern",{id:"medal",width:24,height:24,patternUnits:"userSpaceOnUse"},defs); E("rect",{width:24,height:24,fill:"#1F4E8C"},dp);
      let d=""; for (let i=0;i<16;i++){ const a=i*Math.PI/8, rr=i%2?4.5:9; d+=(i?"L":"M")+(12+Math.cos(a)*rr).toFixed(1)+","+(12+Math.sin(a)*rr).toFixed(1);} E("path",{d:d+"Z",fill:"#FBF3E2",opacity:.9},dp); E("circle",{cx:12,cy:12,r:2.2,fill:"#B5461F"},dp);
      for (const [x,y] of [[0,0],[24,0],[0,24],[24,24]]) E("circle",{cx:x,cy:y,r:3,fill:"#F2CF7A"},dp); },
    landmark(g, gx, gy){
      E("rect",{x:gx-40,y:gy-54,width:80,height:54,fill:"#E8C9A0",stroke:"#3A2415","stroke-width":1.5},g);
      for (let i=0;i<7;i++) E("rect",{x:gx-40+i*11.5+1,y:gy-61,width:8,height:7,fill:"#E8C9A0",stroke:"#3A2415","stroke-width":1.2},g);
      E("rect",{x:gx-40,y:gy-40,width:80,height:7,fill:"#1F4E8C"},g);
      for (let i=0;i<8;i++) E("circle",{cx:gx-35+i*10,cy:gy-36.5,r:2,fill:"#F2CF7A"},g);
      E("path",{d:`M${gx-13},${gy} V${gy-16} A14,14 0 1 1 ${gx+13},${gy-16} V${gy} Z`,fill:"#3A2415"},g);
      E("path",{d:`M${gx-16},${gy-14} A16,16 0 1 1 ${gx+16},${gy-14}`,fill:"none",stroke:"#B5461F","stroke-width":3},g);
      E("rect",{x:gx-9,y:gy-82,width:18,height:28,fill:"#E8C9A0",stroke:"#3A2415","stroke-width":1.5},g);
      E("path",{d:`M${gx-12},${gy-82} L${gx},${gy-96} L${gx+12},${gy-82} Z`,fill:"#B5461F",stroke:"#3A2415","stroke-width":1.3},g); }},
  fr:{paper:"#F4EDDC", frame:"#F8F3E6", blot:"#DDD3B6", ink:"#2E2A22", gold:"#C9A961", goldLt:"#EAD59A", red:"#7A3B5E", blue:"#2E4A3F", tree:"#4F7A5A", medalText:"#EAD59A", medalSub:"#FBF7EC",
    border(p){ E("rect",{width:64,height:20,fill:"#FBF7EC"},p);
      E("path",{d:"M0,16 C12,16 16,4 24,4 S36,16 44,16 S56,4 64,4",fill:"none",stroke:"#2E4A3F","stroke-width":1.6},p);
      E("path",{d:"M8,15 c-4,-2 -3,-8 2,-7 c-2,3 -1,5 -2,7z M40,15 c-4,-2 -3,-8 2,-7 c-2,3 -1,5 -2,7z",fill:"#4F7A5A"},p);
      E("path",{d:"M24,4 c-3,-4 3,-6 3,-1 c0,3 -3,3 -3,1z M56,4 c-3,-4 3,-6 3,-1 c0,3 -3,3 -3,1z",fill:"#7A3B5E"},p);
      for (const x of [16,48]) E("circle",{cx:x,cy:10,r:1.8,fill:"#C9A961"},p); },
    medal(defs){ const dp = E("radialGradient",{id:"medalG"},defs); E("stop",{offset:"0","stop-color":"#4A6B5C"},dp); E("stop",{offset:"1","stop-color":"#2E4A3F"},dp);
      const pt = E("pattern",{id:"medal",width:30,height:30,patternUnits:"userSpaceOnUse"},defs); E("rect",{width:30,height:30,fill:"url(#medalG)"},pt);
      E("path",{d:"M0,15 C8,15 10,5 15,5 S22,15 30,15 M15,0 C15,8 25,10 25,15 S15,22 15,30",fill:"none",stroke:"#C9A961","stroke-width":1,opacity:.8},pt); },
    landmark(g, gx, gy){
      E("path",{d:`M${gx-34},${gy} L${gx-10},${gy-50} L${gx-5},${gy-96} L${gx},${gy-112} L${gx+5},${gy-96} L${gx+10},${gy-50} L${gx+34},${gy}`,fill:"none",stroke:"#2E2A22","stroke-width":2.4,"stroke-linejoin":"round"},g);
      E("path",{d:`M${gx-30},${gy-8} L${gx-12},${gy-42} L${gx+12},${gy-42} L${gx+30},${gy-8}`,fill:"none",stroke:"#2E2A22","stroke-width":2},g);
      E("path",{d:`M${gx-22},${gy-22} A24,10 0 0 1 ${gx+22},${gy-22}`,fill:"none",stroke:"#2E2A22","stroke-width":2},g);
      E("path",{d:`M${gx-14},${gy-46} H${gx+14} M${gx-8},${gy-70} H${gx+8}`,stroke:"#2E2A22","stroke-width":2.2},g);
      for (let y=gy-8;y>gy-44;y-=9) E("path",{d:`M${gx-26+(gy-8-y)*.5},${y} L${gx+26-(gy-8-y)*.5},${y-8} M${gx+26-(gy-8-y)*.5},${y} L${gx-26+(gy-8-y)*.5},${y-8}`,stroke:"#2E2A22","stroke-width":.9,opacity:.6},g);
      E("path",{d:`M${gx-8},${gy-50} L${gx+5},${gy-78} M${gx+8},${gy-50} L${gx-5},${gy-78} M${gx-5},${gy-78} L${gx+4},${gy-96} M${gx+5},${gy-78} L${gx-4},${gy-96}`,stroke:"#2E2A22","stroke-width":.9,opacity:.6},g);
      E("circle",{cx:gx,cy:gy-114,r:2.5,fill:"#C9A961",stroke:"#2E2A22","stroke-width":.8},g); }},
  ru:{paper:"#F5E7C3", frame:"#1A100A", blot:"#E2CC97", ink:"#2A1A10", gold:"#D9A441", goldLt:"#F2CF7A", red:"#C8281E", blue:"#1E6B3A", tree:"#2F7A45", medalText:"#F2CF7A", medalSub:"#FCF4DE",
    border(p){ E("rect",{width:64,height:20,fill:"#140C08"},p);
      E("path",{d:sinPath(5,64,-2,66),fill:"none",stroke:"#D9A441","stroke-width":1.6},p);
      E("path",{d:"M16,5 c-5,-5 1,-11 6,-6 s-1,11 -6,6z M48,15 c-5,-5 1,-11 6,-6 s-1,11 -6,6z",fill:"#1E6B3A",stroke:"#D9A441","stroke-width":.7},p);
      for (const [x,y] of [[6,13],[11,16],[38,4],[43,7],[60,11]]) E("circle",{cx:x,cy:y,r:2.6,fill:"#C8281E",stroke:"#D9A441","stroke-width":.6},p); },
    medal(defs){ const pt = E("pattern",{id:"medal",width:28,height:28,patternUnits:"userSpaceOnUse"},defs); E("rect",{width:28,height:28,fill:"#1A100A"},pt);
      E("path",{d:"M2,26 C10,10 18,10 26,2",fill:"none",stroke:"#D9A441","stroke-width":1.3},pt); E("path",{d:"M10,16 c-4,-4 1,-9 5,-5 s-1,9 -5,5z",fill:"#1E6B3A"},pt); E("circle",{cx:21,cy:7,r:2.4,fill:"#C8281E"},pt); E("circle",{cx:6,cy:22,r:2,fill:"#C8281E"},pt); },
    landmark(g, gx, gy){
      const dome = (x, w, h, col) => { E("rect",{x:x-w/2,y:gy-h,width:w,height:h,fill:"#F5E7C3",stroke:"#2A1A10","stroke-width":1.5},g);
        E("path",{d:`M${x-w/2-4},${gy-h} C${x-w/2-4},${gy-h-w*.9} ${x-4},${gy-h-w*.9} ${x},${gy-h-w*1.5} C${x+4},${gy-h-w*.9} ${x+w/2+4},${gy-h-w*.9} ${x+w/2+4},${gy-h} Z`,fill:col,stroke:"#2A1A10","stroke-width":1.5},g);
        E("path",{d:`M${x},${gy-h-w*1.5} v-9 M${x-4},${gy-h-w*1.5-6} h8 M${x-3},${gy-h-w*1.5-2} h6`,stroke:"#D9A441","stroke-width":1.6},g);
        E("path",{d:`M${x-2},${gy-h+8} a2,2 0 0 1 4,0 v9 h-4z`,fill:"#2A1A10"},g); };
      E("rect",{x:gx-44,y:gy-30,width:88,height:30,fill:"#F5E7C3",stroke:"#2A1A10","stroke-width":1.5},g);
      dome(gx-30,18,40,"#1E6B3A"); dome(gx+30,18,40,"#1E6B3A"); dome(gx,24,52,"#C8281E");
      E("path",{d:`M${gx-7},${gy} v-12 a7,7 0 0 1 14,0 v12 Z`,fill:"#2A1A10"},g); }},
  tr:{paper:"#F6EEDC", frame:"#FCF7EB", blot:"#E4D9BE", ink:"#1E2A3A", gold:"#D9A441", goldLt:"#F2CF7A", red:"#C8372D", blue:"#17A0A8", tree:"#3F8A6A", medalText:"#F2CF7A", medalSub:"#FCF7EB",
    border(p){ E("rect",{width:64,height:20,fill:"#FCF7EB"},p);
      E("path",{d:"M0,10 C10,2 22,2 32,10 S54,18 64,10",fill:"none",stroke:"#0F3A5C","stroke-width":1.4},p);
      const tulip = (x,y,c) => E("path",{d:`M${x},${y} c-5,-3 -5,-10 0,-8 c0,-4 2,-4 2,0 c5,-2 5,5 0,8 c-1,1 -1,1 -2,0z`,fill:c,stroke:"#0F3A5C","stroke-width":.7},p);
      tulip(15,17,"#C8372D"); tulip(47,17,"#17A0A8"); tulip(31,10,"#17A0A8");
      for (const x of [6,24,40,58]) E("circle",{cx:x,cy:6,r:1.6,fill:"#C8372D"},p); },
    medal(defs){ const pt = E("pattern",{id:"medal",width:32,height:32,patternUnits:"userSpaceOnUse"},defs); E("rect",{width:32,height:32,fill:"#17A0A8"},pt);
      E("path",{d:"M16,2 C26,12 26,20 16,30 C6,20 6,12 16,2z",fill:"none",stroke:"#FCF7EB","stroke-width":1.4},pt); E("path",{d:"M0,16 C8,8 24,8 32,16 M0,16 C8,24 24,24 32,16",fill:"none",stroke:"#FCF7EB","stroke-width":1,opacity:.7},pt); E("circle",{cx:16,cy:16,r:2.4,fill:"#C8372D"},pt); },
    landmark(g, gx, gy){
      const minaret = x => { E("rect",{x:x-4,y:gy-96,width:8,height:96,fill:"#F6EEDC",stroke:"#1E2A3A","stroke-width":1.4},g); E("path",{d:`M${x-6},${gy-96} L${x},${gy-112} L${x+6},${gy-96} Z`,fill:"#17A0A8",stroke:"#1E2A3A","stroke-width":1.3},g); E("rect",{x:x-6,y:gy-70,width:12,height:4,fill:"#1E2A3A"},g); };
      minaret(gx-46); minaret(gx+46);
      E("rect",{x:gx-32,y:gy-34,width:64,height:34,fill:"#F6EEDC",stroke:"#1E2A3A","stroke-width":1.5},g);
      E("path",{d:`M${gx-34},${gy-34} A34,34 0 0 1 ${gx+34},${gy-34} Z`,fill:"#17A0A8",stroke:"#1E2A3A","stroke-width":1.5},g);
      for (const dx of [-24,24]) E("path",{d:`M${gx+dx-12},${gy-34} A12,12 0 0 1 ${gx+dx+12},${gy-34}`,fill:"#17A0A8",stroke:"#1E2A3A","stroke-width":1.3},g);
      E("path",{d:`M${gx},${gy-68} v-10`,stroke:"#1E2A3A","stroke-width":1.6},g);
      E("path",{d:`M${gx+3},${gy-84} a5,5 0 1 0 0,8 a4,4 0 1 1 0,-8z`,fill:"#D9A441",stroke:"#1E2A3A","stroke-width":.8},g);
      E("path",{d:`M${gx-7},${gy} v-12 a7,7 0 0 1 14,0 v12 Z`,fill:"#1E2A3A"},g);
      for (const dx of [-20,20]) E("path",{d:`M${gx+dx-4},${gy-8} v-9 a4,4 0 0 1 8,0 v9 Z`,fill:"#1E2A3A"},g); }}
};

function drawBoard(id){
  const B = document.getElementById("board"); B.innerHTML = "";
  const L = lvl(id), Ld = lvData(id), T = THEMES[S.lang];
  const X0=24, Y0=24, X1=BW-24, Y1=BH-24, CX=BW/2, CY=380, CR=96;
  const defs = E("defs", {}, B);
  for (const [pid, tf] of [["bT","translate(0 4)"],["bB",`translate(0 ${BH-24})`],["bL","translate(24 0) rotate(90)"],["bR",`translate(${BW-4} 0) rotate(90)`]]) {
    const p = E("pattern",{id:pid,width:64,height:20,patternUnits:"userSpaceOnUse",patternTransform:tf},defs); T.border(p);
  }
  const cg = E("radialGradient",{id:"coin",cx:"38%",cy:"32%",r:"70%"},defs);
  E("stop",{offset:"0","stop-color":"#FFF2B8"},cg); E("stop",{offset:".5","stop-color":"#E0B94E"},cg); E("stop",{offset:"1","stop-color":"#94701F"},cg);
  T.medal(defs);
  const gr = E("filter",{id:"grain",x:0,y:0,width:"100%",height:"100%"},defs);
  E("feTurbulence",{type:"fractalNoise",baseFrequency:".7",numOctaves:2,seed:5,stitchTiles:"stitch"},gr);
  E("feColorMatrix",{values:"0 0 0 0 .3 0 0 0 0 .2 0 0 0 0 .07 0 0 0 .22 0"},gr);
  const vg = E("radialGradient",{id:"vig",cx:"50%",cy:"50%",r:"72%"},defs);
  E("stop",{offset:"60%","stop-color":"#6A4512","stop-opacity":0},vg); E("stop",{offset:"100%","stop-color":"#6A4512","stop-opacity":.28},vg);
  const tree = (tid, fill) => { const g = E("g",{id:tid},defs); E("ellipse",{cx:2,cy:1,rx:8,ry:2.5,fill:"rgba(40,25,5,.2)"},g); E("rect",{x:-1.6,y:-10,width:3.2,height:11,fill:"#6B4426",stroke:T.ink,"stroke-width":.9},g); E("circle",{cx:0,cy:-19,r:11,fill,stroke:T.ink,"stroke-width":1.4},g); E("path",{d:"M-6,-23 q2,-3 5,-3 M2,-16 q2,-2 5,-1 M-5,-14 q2,-1 4,0",stroke:T.goldLt,"stroke-width":1.3,fill:"none","stroke-linecap":"round"},g); };
  tree("tA", T.tree);

  E("rect",{x:0,y:0,width:BW,height:BH,fill:T.frame},B);
  E("rect",{x:X0,y:Y0,width:X1-X0,height:Y1-Y0,fill:T.paper},B);
  [[200,160,240,120],[1200,600,260,140],[700,700,300,60],[320,620,200,100],[1080,140,220,90]].forEach(([x,y,rx,ry]) => E("ellipse",{cx:x,cy:y,rx,ry,fill:T.blot,opacity:.22},B));

  // monumento acima do centro
  const gx = CX, gy = CY - CR - 34, gg = E("g",{},B);
  E("path",{d:`M${gx-82},${gy+4} Q${gx},${gy-14} ${gx+82},${gy+4} Z`,fill:"#9DB06A",stroke:T.ink,"stroke-width":1.4},gg);
  T.landmark(gg, gx, gy);
  for (const [x,s] of [[gx-72,1],[gx+72,1]]) E("use",{href:"#tA",transform:`translate(${x} ${gy+2}) scale(${s})`},gg);

  // fita sob o centro
  const rib = E("g",{},B), rw = L.name.length*11 + 60, ry = CY + CR + 40;
  E("path",{d:`M${CX-rw/2-18},${ry-8} H${CX-rw/2+6} V${ry+18} H${CX-rw/2-18} L${CX-rw/2-11},${ry+5} Z`,fill:T.red,stroke:T.ink,"stroke-width":1.3,filter:"brightness(.75)"},rib);
  E("path",{d:`M${CX+rw/2+18},${ry-8} H${CX+rw/2-6} V${ry+18} H${CX+rw/2+18} L${CX+rw/2+11},${ry+5} Z`,fill:T.red,stroke:T.ink,"stroke-width":1.3,filter:"brightness(.75)"},rib);
  E("path",{d:`M${CX-rw/2},${ry-15} Q${CX},${ry-21} ${CX+rw/2},${ry-15} V${ry+13} Q${CX},${ry+7} ${CX-rw/2},${ry+13} Z`,fill:T.red,stroke:T.ink,"stroke-width":1.5},rib);
  E("text",{x:CX,y:ry+5,"text-anchor":"middle",class:"goth","font-size":21,"font-weight":600,fill:"#FFF8E6"},rib,L.name);

  const ROWS = [120, 292, 468, 640], coins = {}, nk = nextStep(id);
  const gR = E("g",{},B), gN = E("g",{},B);
  SUBJ.forEach((s, g) => {
    const side = g < 4 ? 1 : -1, row = g % 4, w = s.n.length*10.5 + 80;
    const Bc = {x:CX + side*265, y:ROWS[row]};
    const tailIn = {x:Bc.x - side*(w/2+12), y:Bc.y}, tailOut = {x:Bc.x + side*(w/2+12), y:Bc.y};
    let ang = Math.atan2(tailIn.y - CY, (tailIn.x - CX)*side); ang = Math.max(-0.87, Math.min(0.87, ang));
    const P0 = {x:CX + side*Math.cos(ang)*(CR+18), y:CY + Math.sin(ang)*(CR+18)};
    const P1 = {x:P0.x + side*Math.cos(ang)*70, y:P0.y + Math.sin(ang)*70};
    const P2 = {x:tailIn.x - side*70, y:tailIn.y};
    E("path",{d:taper(P0,P1,P2,tailIn,20,8),fill:s.c,stroke:T.ink,"stroke-width":1},gR);
    E("path",{d:cub(P0,P1,P2,tailIn),fill:"none",stroke:T.goldLt,"stroke-width":1.2,opacity:.85},gR);
    [2*g+1, 2*g+2].forEach((k, j) => {
      const c = {x:CX + side*420, y:Bc.y + (j ? 38 : -38)}; coins[k] = c;
      const e0 = {x:c.x - side*18, y:c.y};
      E("path",{d:taper(tailOut,{x:tailOut.x + side*30, y:tailOut.y},{x:e0.x - side*30, y:e0.y},e0,8,3),fill:s.c,stroke:T.ink,"stroke-width":.8},gR);
      const step = Ld.steps[k-1], done = isDone(id,k);
      const gk = E("g",{class:"space","data-k":k},gN);
      if (pend && pend.lv === id && pend.k === k) E("circle",{class:"pulse",cx:c.x,cy:c.y,r:24,fill:"none",stroke:T.red,"stroke-width":3.5},gk);
      else if (k === nk) E("circle",{class:"spin",cx:c.x,cy:c.y,r:23,fill:"none",stroke:T.gold,"stroke-width":3,"stroke-dasharray":"5 4"},gk);
      E("circle",{cx:c.x,cy:c.y+2.5,r:16.5,fill:T.ink},gk);
      E("circle",{class:"face",cx:c.x,cy:c.y,r:16.5,fill:done ? s.c : "url(#coin)",stroke:T.ink,"stroke-width":1.8},gk);
      E("circle",{cx:c.x,cy:c.y,r:12.3,fill:"none",stroke:done ? T.goldLt : s.c,"stroke-width":2.4},gk);
      if (done) E("path",{d:`M${c.x-5.5},${c.y} l3.8,4 l7.5,-8`,fill:"none",stroke:"#FAF3E0","stroke-width":2.8,"stroke-linecap":"round","stroke-linejoin":"round"},gk);
      else E("text",{x:c.x,y:c.y+5,"text-anchor":"middle",class:"sv","font-size":15,"font-weight":700,fill:T.ink},gk,k);
      const lines = wrapLines(step.t, 24), lh = 19, by = c.y + 6 - (lines.length-1)*lh/2;
      const tx = E("text",{x:c.x + side*26, y:by, "text-anchor": side > 0 ? "start" : "end", class:"sv", "font-size":17.5, "font-weight":done ? 400 : 600, "font-style":done ? "italic" : "normal", fill:done ? "#5C4A36" : T.ink},gk);
      lines.forEach((ln, i) => E("tspan",{x:c.x + side*26, dy: i ? lh : 0},tx, ln));
      const tw = Math.max(...lines.map(l => l.length))*8.3 + 50;
      E("rect",{x: side > 0 ? c.x-22 : c.x+22-tw, y:c.y-24-(lines.length-1)*lh/2, width:tw, height:48+(lines.length-1)*lh, fill:"transparent"},gk);
      gk.setAttribute("tabindex","0"); gk.setAttribute("role","button");
      gk.setAttribute("aria-label", `Etapa ${k}, ${s.n}: ${step.t}${done ? ", concluída" : ""}`);
      const go = e => { if (e) e.stopPropagation(); onSpace(k); };
      gk.addEventListener("click", go);
      gk.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
    const bg = E("g",{},gN), xl = Bc.x - w/2, xr = Bc.x + w/2, cy = Bc.y;
    E("path",{d:`M${xl-16},${cy-6} H${xl+6} V${cy+20} H${xl-16} L${xl-9},${cy+7} Z`,fill:s.c,stroke:T.ink,"stroke-width":1.4,filter:"brightness(.8)"},bg);
    E("path",{d:`M${xr+16},${cy-6} H${xr-6} V${cy+20} H${xr+16} L${xr+9},${cy+7} Z`,fill:s.c,stroke:T.ink,"stroke-width":1.4},bg);
    E("path",{d:`M${xl},${cy-16} Q${Bc.x},${cy-22} ${xr},${cy-16} V${cy+14} Q${Bc.x},${cy+8} ${xl},${cy+14} Z`,fill:"#FAF3E0",stroke:T.ink,"stroke-width":1.6},bg);
    E("path",{d:`M${xl+4},${cy-12} Q${Bc.x},${cy-18} ${xr-4},${cy-12}`,fill:"none",stroke:s.c,"stroke-width":1.2},bg);
    E("circle",{cx:xl+16,cy:cy-1,r:12.5,fill:s.c,stroke:T.gold,"stroke-width":2},bg);
    E("path",{d:s.icon,transform:`translate(${xl+16-8.4} ${cy-1-8.4}) scale(.7)`,fill:"none",stroke:"#FAF3E0","stroke-width":2.4,"stroke-linecap":"round","stroke-linejoin":"round"},bg);
    const dn = [2*g+1,2*g+2].filter(k=>isDone(id,k)).length;
    E("text",{x:xl+34,y:cy+6,class:"goth","font-size":22,"font-weight":600,fill:s.c},bg,s.n);
    E("text",{x:xr-8,y:cy+5,"text-anchor":"end",class:"sv","font-size":13,"font-weight":700,fill:"#5C4A36"},bg,`${dn}/2`);
  });

  // medalhão central
  const gc = E("g",{},B), r = CR + 11, C = 2*Math.PI*r, seg = C/8;
  SUBJ.forEach((s, i) => {
    const order = i < 4 ? i : 11 - i, len = seg - 8, p = [2*i+1,2*i+2].filter(k=>isDone(id,k)).length/2;
    const base = {cx:CX, cy:CY, r, fill:"none", stroke:s.c, "stroke-width":11, transform:`rotate(-90 ${CX} ${CY})`, "stroke-dashoffset": -(order*seg + 4)};
    E("circle",{...base, opacity:.22, "stroke-dasharray":`${len} ${C}`},gc);
    if (p > 0) E("circle",{...base, "stroke-dasharray":`${len*p} ${C}`},gc);
  });
  E("circle",{cx:CX,cy:CY,r:CR,fill:"url(#medal)",stroke:T.gold,"stroke-width":5},gc);
  E("circle",{cx:CX,cy:CY,r:CR-8,fill:"none",stroke:T.red,"stroke-width":1.6},gc);
  E("text",{x:CX,y:CY-4,"text-anchor":"middle",class:"goth","font-size":64,"font-weight":800,fill:T.medalText,stroke:"rgba(0,0,0,.35)","stroke-width":1},gc,L.id);
  E("text",{x:CX,y:CY+24,"text-anchor":"middle",class:"sv","font-size":16,"font-weight":600,fill:T.medalSub,"letter-spacing":"2"},gc,CL().name.toUpperCase());
  E("text",{x:CX,y:CY+48,"text-anchor":"middle",class:"sv","font-size":14.5,"font-style":"italic",fill:T.medalSub,opacity:.85},gc,`${doneCount(id)} de ${nStep(id)} etapas`);

  E("rect",{x:X0,y:Y0,width:X1-X0,height:Y1-Y0,filter:"url(#grain)","pointer-events":"none",style:"mix-blend-mode:multiply"},B);
  E("rect",{x:X0,y:Y0,width:X1-X0,height:Y1-Y0,fill:"url(#vig)","pointer-events":"none"},B);
  E("rect",{x:4,y:4,width:BW-8,height:20,fill:"url(#bT)"},B);
  E("rect",{x:4,y:BH-24,width:BW-8,height:20,fill:"url(#bB)"},B);
  E("rect",{x:4,y:4,width:20,height:BH-8,fill:"url(#bL)"},B);
  E("rect",{x:BW-24,y:4,width:20,height:BH-8,fill:"url(#bR)"},B);
  E("rect",{x:X0-1,y:Y0-1,width:X1-X0+2,height:Y1-Y0+2,fill:"none",stroke:T.gold,"stroke-width":4},B);
  E("rect",{x:X0-3,y:Y0-3,width:X1-X0+6,height:Y1-Y0+6,fill:"none",stroke:T.ink,"stroke-width":1},B);
  E("rect",{x:3,y:3,width:BW-6,height:BH-6,fill:"none",stroke:T.ink,"stroke-width":2},B);
  for (const [x,y] of [[14,14],[BW-14,14],[14,BH-14],[BW-14,BH-14]]) {
    E("rect",{x:x-13,y:y-13,width:26,height:26,fill:T.blue,stroke:T.gold,"stroke-width":2},B);
    for (const [dx,dy] of [[0,-5],[5,0],[0,5],[-5,0]]) E("circle",{cx:x+dx,cy:y+dy,r:4,fill:T.goldLt,stroke:T.ink,"stroke-width":.6},B);
    E("circle",{cx:x,cy:y,r:3,fill:T.red},B);
  }
  B._spaceAt = k => coins[k];
}
THEMES.ar = Object.assign({}, THEMES.tr, {paper:"#F6EEDC", frame:"#FCF7EB", blot:"#E4D9BE", ink:"#10281F", red:"#B5461F", blue:"#1F6E80", tree:"#2F7A56"});

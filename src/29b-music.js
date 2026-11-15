/* ---------- Música ambiente instrumental por idioma (sintetizada no navegador, sem voz) ---------- */
(function(){
  const NN = {C:0,D:2,E:4,F:5,G:7,A:9,B:11};
  const midi = n => { const m = /^([A-G])([#b]?)(\d)$/.exec(n); return 12*(+m[3]+1) + NN[m[1]] + (m[2]==="#"?1:m[2]==="b"?-1:0); };
  const seq = s => s.trim().split(/\s+/).map(t => { const [n,d] = t.split(":"); return [n==="R"?null:midi(n), +d]; });
  /* melodias tradicionais (domínio público) em versão simplificada; duração em tempos */
  const TUNES = {
    en:{name:"Greensleeves (Inglaterra)", bpm:84, wave:"triangle", dec:1.4, bass:["A2","A2","C3","G2","A2","E2"],
      m:"A4:1 C5:2 D5:1 E5:1.5 F5:.5 E5:1 D5:2 B4:1 G4:1.5 A4:.5 B4:1 C5:2 A4:1 A4:1.5 G#4:.5 A4:1 B4:2 G#4:1 E4:3 A4:1 C5:2 D5:1 E5:1.5 F5:.5 E5:1 D5:2 B4:1 G4:1.5 A4:.5 B4:1 C5:1.5 B4:.5 A4:1 G#4:1.5 F#4:.5 G#4:1 A4:3"},
    es:{name:"Estilo flamenco (Espanha)", bpm:132, wave:"sawtooth", dec:.55, bass:["A2","G2","F2","E2"],
      m:"E5:.5 F5:.5 E5:.5 D5:.5 C5:1 B4:.5 C5:.5 D5:1 C5:.5 B4:.5 A4:2 E5:.5 F5:.5 G5:.5 F5:.5 E5:1 D5:.5 E5:.5 F5:1 E5:.5 D5:.5 E5:2 A4:.5 B4:.5 C5:.5 D5:.5 E5:1 F5:.5 E5:.5 D5:1 C5:.5 B4:.5 A4:2"},
    fr:{name:"La Marseillaise (França)", bpm:100, wave:"triangle", dec:1, bass:["C3","C3","G2","C3"],
      m:"G4:1 C5:1.5 C5:.5 C5:1 D5:1.5 E5:.5 E5:1 E5:1.5 D5:.5 E5:1 F5:2 C5:1 D5:1.5 D5:.5 D5:1 E5:1.5 F5:.5 F5:1 F5:1.5 E5:.5 F5:1 G5:2 R:1 G5:1 G5:1 E5:1 C5:1 G5:1.5 G5:.5 G5:1 E5:1 C5:1 D5:1.5 C5:.5 D5:1 G4:2"},
    ru:{name:"Kalinka (Rússia)", bpm:116, wave:"triangle", dec:.9, bass:["A2","E2","A2","E2"],
      m:"E5:1 E5:.5 E5:.5 D5:1 C5:1 B4:1 A4:1 A4:2 E5:1 E5:.5 E5:.5 D5:1 C5:1 B4:1 A4:1 A4:2 C5:1 C5:.5 C5:.5 B4:1 A4:1 G#4:1 A4:1 E4:2 E5:1 E5:.5 E5:.5 D5:1 C5:1 B4:1 A4:3"},
    tr:{name:"Üsküdar'a Gider (Turquia)", bpm:104, wave:"sawtooth", dec:.8, bass:["A2","A2","E2","A2"],
      m:"A4:1 A4:1 C5:2 B4:1 A4:1 G#4:1 A4:1 B4:2 E4:1 A4:1 C5:2 B4:1 A4:1 G#4:1 A4:3 B4:1 B4:1 D5:2 C5:1 B4:1 A4:1 B4:1 C5:2 E5:1 E5:1 D5:1 C5:1 B4:1 A4:1 G#4:1 A4:3"},
    ar:{name:"Estilo árabe, maqam hijaz", bpm:92, wave:"sawtooth", dec:.9, bass:["D2","D2","D2","A2"],
      m:"D5:1 D5:.5 Eb5:.5 F#5:1 G5:1 F#5:.5 Eb5:.5 D5:1 Eb5:1 D5:2 A4:1 Bb4:.5 A4:.5 G4:1 F#4:1 G4:1 A4:2 D5:1 Eb5:.5 F#5:.5 G5:1 A5:1 G5:.5 F#5:.5 Eb5:1 D5:1 R:1 F#5:1 G5:1 Eb5:1 D5:1 C5:1 Bb4:1 A4:1 D5:2"}
  };
  Object.keys(TUNES).forEach(k => { TUNES[k].seq = seq(TUNES[k].m); TUNES[k].bseq = TUNES[k].bass.map(n => midi(n)); });
  const KEY = "mapa-musica-v1";
  let st = {on:false, vol:.5};
  try { st = Object.assign(st, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch(e){}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch(e){} };
  let ctx = null, gain = null, timer = null, curLang = null, idx = 0, bi = 0, nextT = 0, panelOpen = false;
  const f = m => 440 * Math.pow(2, (m - 69) / 12);
  /* corda dedilhada (Karplus-Strong) + reverberação de sala: soa como violão/alaúde, não como sintetizador */
  const cache = {};
  function strBuf(m, tune){
    const key = m + tune.wave; if (cache[key]) return cache[key];
    const sr = ctx.sampleRate, n = Math.floor(sr * 3), p = Math.max(2, Math.round(sr / f(m))), buf = ctx.createBuffer(1, n, sr), d = buf.getChannelData(0);
    const ring = new Float32Array(p); let seed = m * 97 + 13;
    for (let i = 0; i < p; i++){ seed = (seed * 1664525 + 1013904223) | 0; ring[i] = ((seed >>> 8) / 8388608 - 1) * (i < p * .6 ? 1 : .5); }
    const damp = tune.wave === "sawtooth" ? .9965 : .9985, bright = .5;
    let prev = 0;
    for (let i = 0; i < n; i++){ const j = i % p, nx = (j + 1) % p, v = (ring[j] + ring[nx]) * bright * damp * 1.0; ring[j] = v; d[i] = v; prev = v; }
    return (cache[key] = buf);
  }
  let verb = null, wet = null;
  function setupVerb(){
    const sr = ctx.sampleRate, len = Math.floor(sr * 2.2), ir = ctx.createBuffer(2, len, sr);
    for (let c = 0; c < 2; c++){ const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    verb = ctx.createConvolver(); verb.buffer = ir; wet = ctx.createGain(); wet.gain.value = .45; verb.connect(wet); wet.connect(gain);
  }
  function pluck(m, t, dur, tune, vol){
    if (!verb) setupVerb();
    const src = ctx.createBufferSource(), g = ctx.createGain(), lp = ctx.createBiquadFilter();
    src.buffer = strBuf(m, tune); lp.type = "lowpass"; lp.frequency.value = tune.wave === "sawtooth" ? 3800 : 3000;
    g.gain.setValueAtTime(vol * 2.2, t); g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(1.2, Math.min(2.8, dur * 1.2 + 1)));
    src.connect(lp); lp.connect(g); g.connect(gain); g.connect(verb); src.start(t); src.stop(t + 3);
  }
  function schedule(){
    const tune = TUNES[curLang]; if (!tune || !ctx) return;
    const beat = 60 / tune.bpm;
    while (nextT < ctx.currentTime + .6){
      const [m, d] = tune.seq[idx];
      if (m != null) pluck(m, nextT, d * beat, tune, .22);
      /* baixo no início de cada compasso de 2 tempos aproximadamente */
      if (idx % 3 === 0){ pluck(tune.bseq[bi % tune.bseq.length], nextT, beat * 2, tune, .16); bi++; }
      nextT += d * beat; idx = (idx + 1) % tune.seq.length;
      if (idx === 0) nextT += beat;
    }
  }
  /* músicas escolhidas pelo usuário (YouTube, tocam em repetição); se o vídeo não carregar, cai na melodia sintetizada */
  const YT = {}; /* YouTube não roda dentro da página publicada: desativado */
  const YT_TITLE = {tr:"Music of Ottoman empire - Üsküdara Giderken, Intrument 1 Hour Loop", en:"10 HOURS | Simon & Garfunkel - Scarborough Fair | 10h Loops", ar:"Lamma bada \"Muwashah of Arab-Andalusian tradition\"", ru:"Russian Folk Music & Slavic Music | Fantasy & World Music by the Fiechters", es:"Traditional Spanish Folk Music | Flamenco & Andalusian Heritage"};
  let yf = null, ytLang = null, ytOk = false, ytFail = {}, ytTimer = null, xw = null;
  try { ytFail = JSON.parse(localStorage.getItem("mapa-musica-ytfail") || "{}"); } catch(e){}
  const saveFail = () => { try { localStorage.setItem("mapa-musica-ytfail", JSON.stringify(ytFail)); } catch(e){} };
  const embedUrl = l => "https://www.youtube.com/embed/" + YT[l] + "?autoplay=1&loop=1&playlist=" + YT[l];
  const ytCmd = (fn, args) => { try { yf && yf.contentWindow.postMessage(JSON.stringify({event:"command", func:fn, args:args || []}), "*"); } catch(e){} };
  window.addEventListener("message", e => {
    if (!yf || e.source !== yf.contentWindow) return;
    let d; try { d = typeof e.data === "string" ? JSON.parse(e.data) : e.data; } catch(_){ return; }
    if (!d) return;
    try { const t = d.info && d.info.videoData && d.info.videoData.title; if (t){ YT_TITLE[ytLang] = t; ui(); } } catch(_){}
    if (d.event === "onReady" || d.event === "infoDelivery" || d.event === "initialDelivery"){ ytOk = true; clearTimeout(ytTimer); ytCmd("setVolume", [Math.round(st.vol * 100)]); }
    if (d.event === "onError"){ ytFail[ytLang] = 1; saveFail(); if (timer === "yt") { timer = null; start(); } }
    if (d.event === "onStateChange" && d.info === 0) ytCmd("playVideo");
    if (d.event === "infoDelivery" && d.info && d.info.playerState === 0) ytCmd("playVideo");
  });
  /* Plano B (sem abrir janela): pede ao navegador embutido do app Claude para abrir o vídeo em uma aba em segundo plano */
  let bgTab = null;
  async function bgCall(tool, input){
    const c = window.claude && window.claude.use ? await window.claude.use("mcp") : null;
    if (!c) throw new Error("sem mcp");
    return c.callTool("host:claude_browser", tool, input);
  }
  function tabIdOf(r){ try { const t = (r.payload && JSON.stringify(r.payload)) || (r.content || []).map(x => x.text || "").join(" "); const m = /"?tabId"?\s*[:=]\s*"?(\d+)/.exec(t) || /tab\s*(?:id)?\D{0,6}(\d+)/i.exec(t); return m ? +m[1] : null; } catch(e){ return null; } }
  function startExt(lang){
    clearInterval(timer); if (ctx) ctx.suspend(); if (au) au.pause(); if (yf){ yf.remove(); yf = null; }
    curLang = lang; timer = "ext";
    bgCall("preview_start", {url: embedUrl(lang)}).then(r => { bgTab = tabIdOf(r); }).catch(() => { bgTab = null; });
  }
  function startYT(lang){
    clearInterval(timer); if (ctx) ctx.suspend(); if (au) au.pause();
    if (!yf || ytLang !== lang){
      if (yf) yf.remove();
      yf = document.createElement("iframe"); yf.id = "musYT"; ytLang = lang; ytOk = false;
      const id = YT[lang];
      yf.src = "https://www.youtube.com/embed/" + id + "?enablejsapi=1&autoplay=1&loop=1&playlist=" + id + "&controls=0&playsinline=1&rel=0";
      yf.allow = "autoplay; encrypted-media"; yf.setAttribute("title", "Música de fundo");
      yf.onload = () => { try { yf.contentWindow.postMessage(JSON.stringify({event:"listening", id:1, channel:"widget"}), "*"); } catch(e){} };
      yf.style.cssText = "position:fixed;right:0;bottom:0;width:2px;height:2px;opacity:.01;pointer-events:none;border:0"; document.body.appendChild(yf);
      clearTimeout(ytTimer); ytTimer = setTimeout(() => { if (!ytOk){ ytFail[lang] = 1; saveFail(); if (timer === "yt"){ timer = null; start(); } } }, 5000);
    } else ytCmd("playVideo");
    curLang = lang; timer = "yt";
  }
  /* arquivo de música do próprio usuário, guardado no navegador (IndexedDB), um por idioma */
  const userBlob = {};
  const idb = () => new Promise((ok, no) => { const r = indexedDB.open("mapa-musica", 1); r.onupgradeneeded = () => r.result.createObjectStore("mus"); r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error); });
  const idbGet = async k => { const d = await idb(); return new Promise(ok => { const q = d.transaction("mus").objectStore("mus").get(k); q.onsuccess = () => ok(q.result); q.onerror = () => ok(null); }); };
  const idbPut = async (k, v) => { const d = await idb(); return new Promise(ok => { const t = d.transaction("mus", "readwrite"); t.objectStore("mus").put(v, k); t.oncomplete = () => ok(true); t.onerror = () => ok(false); }); };
  try { Object.keys(TUNES).forEach(l => idbGet(l).then(v => { if (v) userBlob[l] = v; }).catch(() => {})); } catch(e){}
  let au = null;
  function startAudio(lang, url){
    clearInterval(timer); timer = null; if (ctx) ctx.suspend();
    if (!au){ au = new Audio(); au.loop = true; }
    au.src = url || window.MUSIC_AUDIO[lang]; au.volume = st.vol; curLang = lang; au.play().catch(() => {}); timer = "audio";
  }
  function start(){
    const lang = (typeof S !== "undefined" && S.lang) || "en";
    if (!TUNES[lang]) return;
    if (au){ au.pause(); }
    if (yf && ytLang !== lang){ yf.remove(); yf = null; }
    if (YT[lang] && !ytFail[lang]) return startYT(lang);
    if (YT[lang]) return startExt(lang);
    if (yf){ yf.remove(); yf = null; }
    if (userBlob[lang]) return startAudio(lang, URL.createObjectURL(userBlob[lang].blob));
    if (window.MUSIC_AUDIO && window.MUSIC_AUDIO[lang]) return startAudio(lang);
    if (!ctx){ const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; ctx = new AC(); gain = ctx.createGain(); gain.connect(ctx.destination); }
    if (ctx.state === "suspended") ctx.resume();
    gain.gain.value = st.vol;
    curLang = lang; idx = 0; bi = 0; nextT = ctx.currentTime + .15;
    clearInterval(timer); timer = setInterval(schedule, 150); schedule();
  }
  function stop(){ if (timer === "ext"){ if (bgTab != null) bgCall("navigate", {tabId: bgTab, url: "about:blank"}).catch(() => {}); bgTab = null; } if (timer === "yt") ytCmd("pauseVideo"); if (timer !== "audio" && timer !== "yt" && timer !== "ext") clearInterval(timer); timer = null; if (au) au.pause(); if (ctx) ctx.suspend(); }
  const playing = () => !!timer;
  /* interface flutuante */
  const css = document.createElement("style");
  css.textContent = `#musFab{position:fixed;right:14px;bottom:84px;z-index:9998;font-family:inherit;touch-action:none}
  #musBtn{width:46px;height:46px;border-radius:50%;border:2px solid #fff;background:#235a4b;color:#fff;font-size:22px;cursor:grab;box-shadow:0 2px 10px rgba(0,0,0,.35)}
  #musBtn.off{background:#777}
  #musBtn.on{background:#e8a317;color:#3a2600;border-color:#fff3c4;animation:musGlow 1.6s ease-in-out infinite}
  @keyframes musGlow{0%,100%{box-shadow:0 0 0 0 rgba(232,163,23,.7),0 2px 10px rgba(0,0,0,.35)}50%{box-shadow:0 0 0 12px rgba(232,163,23,0),0 2px 10px rgba(0,0,0,.35)}}
  .musnote{position:absolute;bottom:34px;font-size:18px;color:#e8a317;text-shadow:0 1px 2px rgba(0,0,0,.5);pointer-events:none;animation:musFloat 2.4s ease-out forwards}
  @keyframes musFloat{0%{opacity:0;transform:translate(0,0) scale(.7)}15%{opacity:1}100%{opacity:0;transform:translate(var(--dx,10px),-70px) rotate(var(--rot,15deg)) scale(1.1)}}
  #musClose{position:absolute;top:4px;right:6px;background:transparent!important;color:#555!important;font-size:16px!important;padding:2px 6px!important}
  #musName{padding-right:18px;line-height:1.25}
  #musPan{display:none;position:absolute;right:0;bottom:54px;width:210px;background:#fff;color:#222;border-radius:10px;padding:10px 12px;box-shadow:0 4px 16px rgba(0,0,0,.35);font-size:13px}
  #musPan.open{display:block}#musPan b{display:block;margin-bottom:6px}
  #musPan button{border:0;background:#235a4b;color:#fff;border-radius:6px;padding:6px 12px;cursor:pointer;font-size:14px}
  #musPan input{width:100%;margin-top:8px}`;
  document.head.appendChild(css);
  const fab = document.createElement("div"); fab.id = "musFab";
  fab.innerHTML = `<div id="musPan"><button id="musClose" title="Fechar">✕</button><b id="musName"></b><a id="musExt" target="_blank" rel="noopener" style="display:none;margin:6px 0;color:#c0392b;font-weight:700">▶ Abrir a música no YouTube</a><button id="musPP">⏸ Pausar</button><label style="display:block;margin-top:8px">Volume <span id="musV"></span></label><input id="musVol" type="range" min="0" max="100"></div><button id="musBtn" title="Música (arraste para mover)">♪</button>`;
  fab.style.display = "none"; /* botão ♪ oculto a pedido; volta quando as músicas MP3 forem embutidas */
  document.body.appendChild(fab);
  const $ = id => document.getElementById(id);
  function ui(){
    const l = (typeof S !== "undefined" && S.lang) || "en";
    $("musName").textContent = "♪ " + (userBlob[l] ? userBlob[l].name : l === "fr" ? "La Marseillaise (gravação)" : TUNES[l] ? TUNES[l].name + " · melodia provisória" : "Música");
    const ext = timer === "ext"; $("musExt").style.display = ext ? "block" : "none"; if (ext && YT[curLang]){ $("musExt").href = embedUrl(curLang); $("musExt").textContent = "Tocando em segundo plano. Se não ouvir nada, toque aqui para abrir o vídeo no YouTube"; }
    $("musPP").textContent = playing() ? "⏸ Pausar" : "▶ Tocar";
    $("musBtn").classList.toggle("off", !playing()); $("musBtn").classList.toggle("on", playing());
    $("musVol").value = Math.round(st.vol * 100); $("musV").textContent = Math.round(st.vol * 100) + "%";
  }
  $("musClose").onclick = () => { panelOpen = false; $("musPan").classList.remove("open"); };
  const openPan = () => { panelOpen = true; $("musPan").classList.add("open"); };
  let noteT = null;
  const notes = ["♪","♫","♩","♬"];
  function emit(){ if (!playing()) return; const n = document.createElement("span"); n.className = "musnote"; n.textContent = notes[Math.floor(Math.random()*4)]; n.style.left = (6 + Math.random()*30) + "px"; n.style.setProperty("--dx", (Math.random()*50-25) + "px"); n.style.setProperty("--rot", (Math.random()*50-25) + "deg"); fab.appendChild(n); setTimeout(() => n.remove(), 2500); }
  noteT = setInterval(emit, 650);
  $("musPP").onclick = () => { if (playing()){ stop(); st.on = false; } else { start(); st.on = true; openPan(); } save(); ui(); };
  $("musVol").oninput = e => { st.vol = e.target.value / 100; if (gain) gain.gain.value = st.vol; if (au) au.volume = st.vol; ytCmd("setVolume", [Math.round(st.vol * 100)]); save(); ui(); };
  /* arrastar o botão; toque simples abre/fecha o painel */
  let drag = null;
  $("musBtn").addEventListener("pointerdown", e => { const r = fab.getBoundingClientRect(); drag = {x:e.clientX, y:e.clientY, l:r.left, t:r.top, moved:false}; $("musBtn").setPointerCapture(e.pointerId); });
  $("musBtn").addEventListener("pointermove", e => { if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
    if (drag.moved){ fab.style.left = Math.max(0, Math.min(innerWidth - 46, drag.l + dx)) + "px"; fab.style.top = Math.max(0, Math.min(innerHeight - 46, drag.t + dy)) + "px"; fab.style.right = "auto"; fab.style.bottom = "auto"; } });
  $("musBtn").addEventListener("pointerup", () => { if (drag && !drag.moved){ if (!playing()){ start(); st.on = true; save(); openPan(); } else { panelOpen = !panelOpen; $("musPan").classList.toggle("open", panelOpen); } ui(); } drag = null; });
  /* primeira interação do usuário libera o áudio do navegador */
  const first = () => { document.removeEventListener("pointerdown", first, true); if (st.on !== false && !playing()){ st.on = true; start(); openPan(); save(); ui(); } };
  
  /* troca de idioma troca a música */
  setInterval(() => { const l = (typeof S !== "undefined" && S.lang) || "en"; if (playing() && l !== curLang){ start(); openPan(); } ui(); }, 800);
  ui();
  window.MUSIC = {start, stop, TUNES};
})();

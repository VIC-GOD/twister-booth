// Teleprompter for Twister Booth: twisters scroll up the screen at a set speed, to read aloud.
(function(){
"use strict";
const TW=window.CONTENT&&window.CONTENT.TW;if(!TW)return;
const S={
 en:{btn:"Teleprompter",title:"Teleprompter",lead:"The twisters scroll up the screen. Read each line aloud as it crosses the yellow guide. Raise the speed when it feels easy.",
  lang:"Language",lvl:"Level",all:"All",speed:"Speed (words per minute)",size:"Text size",mirror:"Mirror (for a glass prompter)",shuffle:"Shuffle",start:"Start",close:"Close",
  keys:"Space: pause · ↑ ↓: speed · Esc: stop. On a phone, tap to pause.",L:{en:"English",fr:"Français",de:"Deutsch",sl:"Sign (ASL)"},done:"End. Well read!",again:"Again",wpm:"wpm"},
 fr:{btn:"Prompteur",title:"Prompteur",lead:"Les virelangues défilent vers le haut. Lisez chaque ligne à voix haute quand elle passe la ligne jaune. Accélérez quand c'est facile.",
  lang:"Langue",lvl:"Niveau",all:"Tous",speed:"Vitesse (mots par minute)",size:"Taille du texte",mirror:"Miroir (pour prompteur à vitre)",shuffle:"Mélanger",start:"Démarrer",close:"Fermer",
  keys:"Espace : pause · ↑ ↓ : vitesse · Échap : arrêter. Sur téléphone, touchez pour mettre en pause.",L:{en:"English",fr:"Français",de:"Deutsch",sl:"Signes (ASL)"},done:"Fin. Bien lu !",again:"Encore",wpm:"mots/min"},
 de:{btn:"Teleprompter",title:"Teleprompter",lead:"Die Zungenbrecher laufen nach oben. Lesen Sie jede Zeile laut, wenn sie die gelbe Linie kreuzt. Erhöhen Sie das Tempo, wenn es leicht wird.",
  lang:"Sprache",lvl:"Stufe",all:"Alle",speed:"Tempo (Wörter pro Minute)",size:"Textgröße",mirror:"Spiegeln (für Glas-Prompter)",shuffle:"Mischen",start:"Start",close:"Schließen",
  keys:"Leertaste: Pause · ↑ ↓: Tempo · Esc: Stopp. Am Handy: tippen für Pause.",L:{en:"English",fr:"Français",de:"Deutsch",sl:"Gebärden (ASL)"},done:"Ende. Gut gelesen!",again:"Nochmal",wpm:"W/min"}};
let UI="en";try{UI=localStorage.getItem("twb-ui")||document.documentElement.lang||"en"}catch(e){}UI=(UI||"en").slice(0,2);if(!S[UI])UI="en";let t=S[UI];
let cfg={lang:UI,lvl:0,wpm:110,size:56,mirror:false,shuffle:true};try{Object.assign(cfg,JSON.parse(localStorage.getItem("tp-cfg")||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem("tp-cfg",JSON.stringify(cfg))}catch(e){}};
const css=document.createElement("style");css.textContent=`
#tp-btn{position:fixed;z-index:9998;right:max(10px,env(safe-area-inset-right));bottom:max(64px,calc(env(safe-area-inset-bottom) + 64px));background:#e0a526;color:#1a1300;border:0;font:700 15px/1 -apple-system,Segoe UI,Arial,sans-serif;padding:12px 16px;border-radius:999px;box-shadow:0 2px 10px rgba(0,0,0,.3);cursor:pointer;min-height:44px}
#tp{position:fixed;inset:0;z-index:10000;background:#05070a;color:#fff;display:none;font-family:-apple-system,Segoe UI,Arial,sans-serif}
#tp.on{display:block}
#tp .tp-set{max-width:640px;margin:0 auto;padding:24px 18px 40px;display:grid;gap:12px;overflow:auto;max-height:100%}
#tp h2{margin:0;font-size:30px}#tp p{margin:0;color:#c8d0da;line-height:1.5}
#tp .tp-lb{font-size:13px;font-weight:700;color:#9aa6b4;text-transform:uppercase;letter-spacing:.05em;margin-top:6px}
#tp .tp-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
#tp button{font:600 15px -apple-system,Segoe UI,Arial,sans-serif;background:#1a212c;color:#fff;border:1px solid #2c3644;border-radius:10px;padding:9px 14px;min-height:44px;cursor:pointer}
#tp button[aria-pressed=true]{background:#fff;color:#05070a}
#tp button.tp-pri{background:#e0a526;color:#1a1300;border-color:#e0a526;font-size:17px;padding:12px 24px}
#tp input[type=range]{flex:1;min-width:180px;accent-color:#e0a526;height:32px}
#tp .tp-val{font-weight:700;min-width:70px}
#tp .tp-view{position:absolute;inset:0;overflow:hidden;display:none;cursor:pointer}
#tp .tp-view.on{display:block}
#tp .tp-roll{position:absolute;left:0;right:0;top:0;padding:0 6vw;will-change:transform}
#tp .tp-roll .tp-it{font-weight:700;line-height:1.35;margin:0 0 1.4em;text-wrap:pretty}
#tp .tp-roll .tp-meta{display:block;font-size:.36em;color:#e0a526;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-bottom:.3em}
#tp .tp-roll .tp-end{text-align:center;color:#9aa6b4;font-size:.6em}
#tp .tp-guide{position:absolute;left:0;right:0;top:34%;height:0;border-top:3px solid #e0a52699;pointer-events:none}
#tp .tp-guide:before,#tp .tp-guide:after{content:"▶";position:absolute;left:6px;top:-15px;color:#e0a526;font-size:22px}#tp .tp-guide:after{content:"◀";left:auto;right:6px}
#tp .tp-fade{position:absolute;left:0;right:0;pointer-events:none}#tp .tp-fade.t{top:0;height:18%;background:linear-gradient(#05070a,#05070a00)}#tp .tp-fade.b{bottom:0;height:22%;background:linear-gradient(#05070a00,#05070a)}
#tp .tp-bar{position:absolute;left:0;right:0;bottom:0;display:flex;gap:8px;justify-content:center;align-items:center;padding:10px 10px max(10px,env(safe-area-inset-bottom));flex-wrap:wrap}
#tp .tp-bar button{min-width:48px;background:#1a212ccc}
#tp .tp-cd{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:140px;font-weight:800;color:#e0a526;pointer-events:none}
#tp .tp-mir{transform:scaleX(-1)}`;
document.head.appendChild(css);
const btn=document.createElement("button");btn.id="tp-btn";btn.type="button";btn.textContent="📜 "+t.btn;document.body.appendChild(btn);
const ov=document.createElement("div");ov.id="tp";ov.setAttribute("role","dialog");document.body.appendChild(ov);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let raf=0,y=0,run=false,last=0,pxPerWord=1,maxY=0;
function list(){let a=TW.T.filter(x=>x.l===cfg.lang&&(!cfg.lvl||x.v===cfg.lvl));if(cfg.shuffle){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}}return a}
function settings(){stop();const b=(k,v,l)=>`<button data-k="${k}" data-v="${v}" aria-pressed="${String(cfg[k])===String(v)}">${l}</button>`;
 const langs=[...new Set(TW.T.map(x=>x.l))];const lv=TW.lvl[UI]||TW.lvl.en;
 ov.innerHTML=`<div class="tp-set"><div class="tp-row" style="justify-content:space-between"><h2>${t.title}</h2><button data-x="close">✕ ${t.close}</button></div><p>${t.lead}</p>
 <div class="tp-lb">${t.lang}</div><div class="tp-row">${langs.map(l=>b("lang",l,t.L[l]||l)).join("")}</div>
 <div class="tp-lb">${t.lvl}</div><div class="tp-row">${b("lvl",0,t.all)}${[1,2,3].map(v=>b("lvl",v,lv[v])).join("")}</div>
 <div class="tp-lb">${t.speed}</div><div class="tp-row"><input type="range" min="50" max="260" step="5" value="${cfg.wpm}" data-r="wpm"><span class="tp-val" id="tp-wpm">${cfg.wpm} ${t.wpm}</span></div>
 <div class="tp-lb">${t.size}</div><div class="tp-row"><input type="range" min="28" max="110" step="2" value="${cfg.size}" data-r="size"><span class="tp-val" id="tp-size">${cfg.size}px</span></div>
 <div class="tp-row">${`<button data-t="shuffle" aria-pressed="${cfg.shuffle}">${t.shuffle}</button><button data-t="mirror" aria-pressed="${cfg.mirror}">${t.mirror}</button>`}</div>
 <div class="tp-row" style="margin-top:8px"><button class="tp-pri" data-x="go">▶ ${t.start}</button></div><p style="font-size:14px;color:#9aa6b4">${t.keys}</p></div>`;
 ov.querySelectorAll("[data-k]").forEach(e=>e.onclick=()=>{cfg[e.dataset.k]=e.dataset.k==="lvl"?+e.dataset.v:e.dataset.v;save();settings()});
 ov.querySelectorAll("[data-t]").forEach(e=>e.onclick=()=>{cfg[e.dataset.t]=!cfg[e.dataset.t];save();settings()});
 ov.querySelectorAll("[data-r]").forEach(e=>e.oninput=()=>{cfg[e.dataset.r]=+e.value;save();ov.querySelector("#tp-"+e.dataset.r).textContent=e.dataset.r==="wpm"?cfg.wpm+" "+t.wpm:cfg.size+"px"});
 ov.querySelector('[data-x=close]').onclick=close;ov.querySelector('[data-x=go]').onclick=start}
function start(){const a=list();let words=0;
 ov.innerHTML=`<div class="tp-view on"><div class="tp-roll${cfg.mirror?" tp-mir":""}" style="font-size:${cfg.size}px">${a.map((x,i)=>{words+=x.t.split(/\s+/).length;
  return`<div class="tp-it"><span class="tp-meta">${i+1}/${a.length} · ${esc((TW.cat[UI]||TW.cat.en)[x.c]||"")}</span>${esc(x.t)}</div>`}).join("")}<div class="tp-it tp-end">— ${t.done} —</div></div>
  <div class="tp-fade t"></div><div class="tp-fade b"></div><div class="tp-guide"></div><div class="tp-cd"></div>
  <div class="tp-bar"><button data-x="slow" aria-label="Slower">−</button><button data-x="pp" aria-label="Pause">❚❚</button><button data-x="fast" aria-label="Faster">+</button><span class="tp-val" id="tp-w" style="min-width:90px;text-align:center">${cfg.wpm} ${t.wpm}</span><button data-x="back">↺</button><button data-x="set">✕</button></div></div>`;
 const roll=ov.querySelector(".tp-roll"),view=ov.querySelector(".tp-view");
 const startY=view.clientHeight*.34;const h=roll.scrollHeight;pxPerWord=(h-view.clientHeight*.4)/Math.max(1,words);maxY=h-view.clientHeight*.34+20;y=-startY;place();
 view.onclick=e=>{if(e.target.closest(".tp-bar"))return;toggle()};
 ov.querySelector('[data-x=pp]').onclick=toggle;ov.querySelector('[data-x=slow]').onclick=()=>spd(-10);ov.querySelector('[data-x=fast]').onclick=()=>spd(10);
 ov.querySelector('[data-x=back]').onclick=()=>{y=-startY;place()};ov.querySelector('[data-x=set]').onclick=settings;
 countdown()}
function countdown(){const cd=ov.querySelector(".tp-cd");let n=3;run=false;const tick=()=>{if(!cd.isConnected)return;if(n>0){cd.textContent=n;n--;setTimeout(tick,700)}else{cd.textContent="";play()}};tick()}
function place(){const r=ov.querySelector(".tp-roll");if(r)r.style.transform=`translateY(${-y}px)`+(cfg.mirror?" scaleX(-1)":"")}
function spd(d){cfg.wpm=Math.max(40,Math.min(300,cfg.wpm+d));save();const w=ov.querySelector("#tp-w");if(w)w.textContent=cfg.wpm+" "+t.wpm}
function play(){run=true;last=performance.now();const pp=ov.querySelector('[data-x=pp]');if(pp)pp.textContent="❚❚";cancelAnimationFrame(raf);raf=requestAnimationFrame(loop)}
function toggle(){if(run){run=false;cancelAnimationFrame(raf);const pp=ov.querySelector('[data-x=pp]');if(pp)pp.textContent="▶"}else play()}
function loop(now){if(!run)return;const dt=Math.min(.1,(now-last)/1000);last=now;y+=dt*cfg.wpm/60*pxPerWord;if(y>=maxY){y=maxY;place();run=false;const pp=ov.querySelector('[data-x=pp]');if(pp)pp.textContent="▶";return}place();raf=requestAnimationFrame(loop)}
function stop(){run=false;cancelAnimationFrame(raf)}
function open(){try{UI=(localStorage.getItem("twb-ui")||UI).slice(0,2)}catch(e){}if(!S[UI])UI="en";t=S[UI];ov.classList.add("on");document.body.style.overflow="hidden";settings()}
function close(){stop();ov.classList.remove("on");document.body.style.overflow=""}
btn.onclick=open;
addEventListener("keydown",e=>{if(!ov.classList.contains("on"))return;e.stopPropagation();const v=ov.querySelector(".tp-view");
 if(e.key==="Escape"){v?settings():close();e.preventDefault()}else if(!v)return;else if(e.key===" "){toggle();e.preventDefault()}else if(e.key==="ArrowUp"){spd(10);e.preventDefault()}else if(e.key==="ArrowDown"){spd(-10);e.preventDefault()}},true);
if(/[#&?]teleprompter/.test(location.hash))setTimeout(open,50);
window.TWPROMPT={open};
})();

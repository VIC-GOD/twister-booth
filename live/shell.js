// Small helpers shared by the Phase 1 games: UI language, header, pause, menu and result screens.
window.SH=(function(){
 const $=s=>document.querySelector(s),esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 let UI="en";try{UI=(localStorage.getItem("twb-ui")||(navigator.language||"en")).slice(0,2)}catch(e){}if(!["en","fr","de"].includes(UI))UI="en";
 const B={en:{all:"← All games",pause:"Pause",play:"Play",paused:"Paused",menu:"Menu",again:"Play again",change:"Change settings",start:"Start",review:"To review",none:"Nothing to review. Clean round.",best:"Best",score:"Score",progress:"My progress",bank:"Saved to your error bank: it comes back tomorrow."},
  fr:{all:"← Tous les jeux",pause:"Pause",play:"Jouer",paused:"Pause",menu:"Menu",again:"Rejouer",change:"Changer les réglages",start:"Commencer",review:"À revoir",none:"Rien à revoir. Manche parfaite.",best:"Record",score:"Score",progress:"Ma progression",bank:"Ajouté à votre banque d'erreurs : retour demain."},
  de:{all:"← Alle Spiele",pause:"Pause",play:"Weiter",paused:"Pause",menu:"Menü",again:"Nochmal",change:"Einstellungen",start:"Start",review:"Zum Wiederholen",none:"Nichts zu wiederholen. Perfekte Runde.",best:"Rekord",score:"Punkte",progress:"Mein Fortschritt",bank:"In Ihrer Fehlerbank gespeichert: kommt morgen wieder."}};
 const sh={$,esc,UI,t:B[UI],B,state:"menu",onPause:null,onResume:null,onMenu:null,music:null};
 sh.setUI=l=>{sh.UI=l;sh.t=B[l];try{localStorage.setItem("twb-ui",l)}catch(e){}document.documentElement.lang=l};
 sh.header=()=>`<div class="hud"><a href="../" id="sh-back">${sh.t.all}</a><div class="st" id="sh-st"></div><div class="btns"><button id="sh-mu" aria-label="Music">🎵</button><button id="sh-pz" class="pzb">⏸ ${sh.t.pause}</button></div></div>`;
 sh.mount=()=>{const first=!$("#sh-pov");if(first)document.body.insertAdjacentHTML("beforeend",`<div class="pov" id="sh-pov"><h2>${sh.t.paused}</h2><button class="pri" id="sh-res">▶ ${sh.t.play}</button><button id="sh-menu">${sh.t.menu}</button></div><div class="toast" id="sh-toast"></div>`);
  const mu=$("#sh-mu");if(mu){mu.setAttribute("aria-pressed",SFX.get("music"));mu.onclick=()=>{const v=!SFX.get("music");SFX.set("music",v);mu.setAttribute("aria-pressed",v);if(v&&sh.state==="run"&&sh.music)SFX.music(sh.music)}}
  const pz=$("#sh-pz");if(pz)pz.onclick=sh.toggle;if(!first)return;$("#sh-res").onclick=sh.toggle;$("#sh-menu").onclick=()=>{$("#sh-pov").classList.remove("on");sh.state="menu";SFX.stop();sh.onMenu&&sh.onMenu()};
  addEventListener("keydown",e=>{if(e.key==="Escape"&&(sh.state==="run"||sh.state==="pause")){sh.toggle();e.preventDefault()}});
  document.addEventListener("visibilitychange",()=>{if(document.hidden&&sh.state==="run")sh.toggle()})};
 sh.toggle=()=>{if(sh.state==="run"){sh.state="pause";SFX.stop();try{speechSynthesis.pause()}catch(e){}$("#sh-pov").classList.add("on");$("#sh-pz").textContent="▶ "+sh.t.play;sh.onPause&&sh.onPause()}
  else if(sh.state==="pause"){sh.state="run";if(sh.music)SFX.music(sh.music);try{speechSynthesis.resume()}catch(e){}$("#sh-pov").classList.remove("on");$("#sh-pz").textContent="⏸ "+sh.t.pause;sh.onResume&&sh.onResume()}};
 sh.toast=(s,ok)=>{const e=$("#sh-toast");e.textContent=s;e.className="toast"+(ok?" ok":"");e.style.display="block";clearTimeout(sh.toast.h);sh.toast.h=setTimeout(()=>e.style.display="none",ok?900:1800)};
 sh.langBar=(cb)=>`<div class="lang">${["en","fr","de"].map(l=>`<button data-ui="${l}" aria-pressed="${l===sh.UI}">${l.toUpperCase()}</button>`).join("")}</div>`;
 sh.bindLang=(root,cb)=>root.querySelectorAll("[data-ui]").forEach(e=>e.onclick=()=>{sh.setUI(e.dataset.ui);cb()});
 sh.opt=(cfg,k,v,label)=>`<button data-k="${k}" data-v="${v}" aria-pressed="${String(cfg[k])===String(v)}">${label}</button>`;
 sh.bindOpts=(root,cfg,key,cb)=>root.querySelectorAll("[data-k]").forEach(e=>e.onclick=()=>{let v=e.dataset.v;if(/^-?\d+(\.\d+)?$/.test(v))v=+v;cfg[e.dataset.k]=v;try{localStorage.setItem(key,JSON.stringify(cfg))}catch(x){}cb()});
 // speech
 sh.voice=(lang)=>{const vs=(window.speechSynthesis&&speechSynthesis.getVoices())||[];const want=lang.toLowerCase(),base=want.slice(0,2);
  return vs.find(v=>v.lang.toLowerCase().replace("_","-")===want&&/natural|google|premium|enhanced/i.test(v.name))||vs.find(v=>v.lang.toLowerCase().replace("_","-")===want)||vs.find(v=>v.lang.toLowerCase().startsWith(base)&&/natural|google|premium|enhanced/i.test(v.name))||vs.find(v=>v.lang.toLowerCase().startsWith(base))||null};
 sh.say=(text,lang,rate,onend,onboundary)=>{if(!window.speechSynthesis){onend&&setTimeout(onend,500);return null}const u=new SpeechSynthesisUtterance(text);const v=sh.voice(lang);if(v)u.voice=v;u.lang=lang;u.rate=rate||1;
  if(onend)u.onend=onend;if(onboundary)u.onboundary=onboundary;speechSynthesis.speak(u);return u};
 sh.SR=window.SpeechRecognition||window.webkitSpeechRecognition||null;
 sh.LOC={en:"en-GB",fr:"fr-FR",de:"de-DE",pt:"pt-PT",ptbr:"pt-BR",frbe:"fr-BE",frch:"fr-CH"};
 return sh;
})();
if(window.speechSynthesis)speechSynthesis.getVoices();

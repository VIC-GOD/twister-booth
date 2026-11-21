/* Live room quiz: everyone on their own device, same question, live scoreboard.
   A page sets window.LIVE_CFG = {game, settings:[{k,label:{en,fr,de},opts:[[value,{en,fr,de}|string]]}], make(settings)->{q,opts,ans,sub}} */
(function(){
const CFG=window.LIVE_CFG; if(!CFG||!window.TWROOM) return;
const UL=(document.documentElement.lang||"en").slice(0,2); const L=["en","fr","de"].includes(UL)?UL:"en";
const TX={
en:{btn:"Live room",title:"Live room",intro:"Play together, each on your own phone. One person creates a room and reads out the code, the others join with it. Same question for everyone, live scoreboard.",name:"Your name",code:"Code",create:"Create a room",join:"Join",bad:"Enter a name and a 4-letter code.",joining:"Connecting…",fail:"Couldn't connect. Check the code and that the host still has the page open.",room:"Room",tell:"Read this code out to the group.",players:"Players",host:"host",you:"you",rounds:"Questions",start:"Start",wait:"Waiting for the host to start…",gone:"The host has left. Create a new room to keep playing.",q:"Question",answered:"answered",reveal:"Show answer",next:"Next question",finish:"Final results",again:"New game",leave:"Leave",close:"Close",right:"Right!",wrong:"Not this time. Answer:",timeUp:"Time's up.",total:"Scoreboard",podium:"Final scoreboard",score:"Correct answer +2, fastest correct answer +1. 20 seconds per question.",offline:"Live rooms couldn't load in this browser."},
fr:{btn:"Salle en direct",title:"Salle en direct",intro:"Jouez ensemble, chacun sur son téléphone. Une personne crée une salle et lit le code, les autres la rejoignent. Même question pour tous, classement en direct.",name:"Votre prénom",code:"Code",create:"Créer une salle",join:"Rejoindre",bad:"Entrez un prénom et un code de 4 lettres.",joining:"Connexion…",fail:"Connexion impossible. Vérifiez le code et que l'hôte a toujours la page ouverte.",room:"Salle",tell:"Lisez ce code au groupe.",players:"Joueurs",host:"hôte",you:"vous",rounds:"Questions",start:"Lancer",wait:"En attente du lancement par l'hôte…",gone:"L'hôte est parti. Créez une nouvelle salle pour continuer.",q:"Question",answered:"ont répondu",reveal:"Montrer la réponse",next:"Question suivante",finish:"Résultats finaux",again:"Nouvelle partie",leave:"Quitter",close:"Fermer",right:"Bravo !",wrong:"Raté. Réponse :",timeUp:"Temps écoulé.",total:"Classement",podium:"Classement final",score:"Bonne réponse +2, bonne réponse la plus rapide +1. 20 secondes par question.",offline:"Les salles en direct n'ont pas pu se charger dans ce navigateur."},
de:{btn:"Live-Raum",title:"Live-Raum",intro:"Gemeinsam spielen, jede Person auf dem eigenen Handy. Eine Person eröffnet einen Raum und liest den Code vor, die anderen treten bei. Gleiche Frage für alle, Live-Rangliste.",name:"Ihr Name",code:"Code",create:"Raum eröffnen",join:"Beitreten",bad:"Namen und vierstelligen Buchstabencode eingeben.",joining:"Verbinde…",fail:"Keine Verbindung. Code prüfen und ob der Gastgeber die Seite noch offen hat.",room:"Raum",tell:"Lesen Sie diesen Code der Gruppe vor.",players:"Mitspielende",host:"Gastgeber",you:"Sie",rounds:"Fragen",start:"Starten",wait:"Warten, bis der Gastgeber startet…",gone:"Der Gastgeber ist weg. Neuen Raum eröffnen, um weiterzuspielen.",q:"Frage",answered:"geantwortet",reveal:"Antwort zeigen",next:"Nächste Frage",finish:"Endergebnis",again:"Neues Spiel",leave:"Verlassen",close:"Schließen",right:"Richtig!",wrong:"Diesmal nicht. Antwort:",timeUp:"Zeit abgelaufen.",total:"Rangliste",podium:"Endstand",score:"Richtige Antwort +2, schnellste richtige Antwort +1. 20 Sekunden pro Frage.",offline:"Live-Räume konnten in diesem Browser nicht geladen werden."}}[L];
const tr=v=>typeof v==="string"?v:(v[L]||v.en);
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const clip=(s,n)=>String(s||"").replace(/[\u0000-\u001f​-‏‪-‮⁠-⁯﻿]/g,"").slice(0,n);
const SECS=20;
// ---- styles + shell ----
const css=`#lq-btn{position:fixed;z-index:9998;right:max(10px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));background:#d23b2a;color:#fff;border:0;border-radius:999px;padding:11px 16px;font:600 15px/1 -apple-system,Segoe UI,Arial,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.3);cursor:pointer;min-height:44px}
#lq{position:fixed;inset:0;z-index:10000;background:rgba(10,14,20,.55);display:none;align-items:flex-start;justify-content:center;overflow:auto;padding:16px}
#lq.on{display:flex}#lq .bx{background:#fff;color:#16202c;width:min(640px,100%);border-radius:16px;padding:20px;display:grid;gap:14px;font:16px/1.5 -apple-system,Segoe UI,Arial,sans-serif;margin:auto 0}
#lq h2{margin:0;font-size:22px}#lq p{margin:0}#lq .sm{color:#5b6675;font-size:14.5px}#lq .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}#lq .sp{justify-content:space-between}
#lq button{font:600 15px -apple-system,Segoe UI,Arial,sans-serif;border:1px solid #cfd5dd;background:#fff;color:#16202c;border-radius:10px;padding:10px 14px;min-height:44px;cursor:pointer}
#lq button.pr{background:#16202c;color:#fff;border-color:#16202c}#lq button:disabled{opacity:.5;cursor:default}
#lq input,#lq select{font:16px -apple-system,Segoe UI,Arial,sans-serif;padding:9px 10px;border:1px solid #cfd5dd;border-radius:10px;background:#fff;color:#16202c;max-width:100%}
#lq .code{font:700 30px ui-monospace,Menlo,monospace;letter-spacing:.2em}#lq .pl{display:flex;flex-wrap:wrap;gap:6px}#lq .pl span{border:1px solid #cfd5dd;border-radius:999px;padding:3px 10px;font-size:14px}
#lq .qq{font-size:clamp(20px,4.5vw,26px);font-weight:700;line-height:1.25}#lq .sub{color:#5b6675}#lq .ops{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
#lq .ops button{text-align:left;font-weight:500;min-height:56px}#lq .ops button.sel{border:2px solid #16202c}#lq .ops button.ok{background:#e1f1e7;border-color:#2f7d4f}#lq .ops button.no{background:#f7e3e3;border-color:#b23a3a}
#lq .bar{height:8px;background:#e5e8ec;border-radius:4px;overflow:hidden}#lq .bar i{display:block;height:100%;background:#d23b2a}
#lq table{border-collapse:collapse;width:100%}#lq td{padding:6px 4px;border-bottom:1px solid #e5e8ec}#lq td:last-child{text-align:right;font-weight:700}
#lq .fb{border-radius:8px;padding:10px 12px}#lq .fb.ok{background:#e1f1e7}#lq .fb.no{background:#f7e3e3}#lq .fb.mid{background:#eef1f5}
@media(max-width:520px){#lq .ops{grid-template-columns:1fr}}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const btn=document.createElement("button");btn.id="lq-btn";btn.textContent="● "+TX.btn;document.body.appendChild(btn);
const ov=document.createElement("div");ov.id="lq";ov.innerHTML=`<div class="bx" role="dialog" aria-modal="true" aria-label="${TX.title}"><div id="lqb"></div></div>`;document.body.appendChild(ov);
btn.onclick=()=>{ov.classList.add("on");render()};
ov.addEventListener("click",e=>{if(e.target===ov&&!S.room)ov.classList.remove("on")});
const box=()=>document.getElementById("lqb");
const S={room:null,code:"",host:false,g:null,sb:{},my:null,lr:-1,t0:0,timer:null,settings:{}};
CFG.settings.forEach(s=>S.settings[s.k]=s.opts[0][0]);
function peers(){return S.room?S.room.peers().filter(p=>p.presence&&p.presence.name):[]}
function hostPeer(ps){return ps.filter(p=>typeof p.presence.host==="number"&&p.presence.g).sort((a,b)=>a.presence.host-b.presence.host)[0]||null}
function push(){S.room.presence({g:S.g}).catch(()=>{})}
async function enter(isHost){const name=clip(document.getElementById("lqn").value.trim(),16);
 const code=isHost?Array.from({length:4},()=>"abcdefghjkmnpqrstuvwxyz"[Math.floor(Math.random()*23)]).join(""):document.getElementById("lqc").value.trim().toLowerCase();
 const msg=document.getElementById("lqm");if(!name||!/^[a-z]{4}$/.test(code)){msg.innerHTML=`<div class="fb no">${TX.bad}</div>`;return}
 try{localStorage.setItem("twb-name",name)}catch(e){}msg.innerHTML=`<p class="sm">${TX.joining}</p>`;
 try{const room=await TWROOM.join(CFG.game+"-"+code,isHost);Object.assign(S,{room,code,host:isHost,sb:{},my:null,lr:-1});
  if(isHost)S.g={st:"lobby",r:0,n:10,set:S.settings};
  await room.presence({name,host:isHost?Date.now():null,g:isHost?S.g:null,res:null});
  room.onPeers(()=>{autoReveal();render()});render()}
 catch(e){msg.innerHTML=`<div class="fb no">${TX.fail}</div>`}}
function leave(){if(S.room)S.room.leave();clearInterval(S.timer);Object.assign(S,{room:null,code:"",host:false,g:null});render()}
function newQ(){const g=S.g;const q=CFG.make(g.set);g.r++;g.st="play";g.q={q:q.q,sub:q.sub||"",opts:q.opts};g.ans=null;S.secret=q.ans;g.at=Date.now();push();
 clearTimeout(S.auto);S.auto=setTimeout(()=>{if(S.g&&S.g.st==="play"&&S.g.r===g.r)reveal()},SECS*1000+800);render()}
function reveal(){const g=S.g;if(!g||g.st!=="play")return;const ps=peers();g.ans=S.secret;
 const rows=ps.map(p=>({k:p.peer,name:clip(p.presence.name,16),res:p.presence.res&&p.presence.res.r===g.r?p.presence.res:null}));
 const ok=rows.filter(r=>r.res&&r.res.a===g.ans);const fast=ok.length?Math.min(...ok.map(r=>r.res.t)):null;
 rows.forEach(r=>{let p=0;if(r.res&&r.res.a===g.ans){p=2;if(r.res.t===fast)p++}const e=S.sb[r.k]||(S.sb[r.k]={n:r.name,p:0});e.n=r.name;e.p+=p});
 g.sb=Object.values(S.sb).slice(0,30).map(e=>[e.n,e.p]);g.st="res";push();render()}
function autoReveal(){if(!S.host||!S.g||S.g.st!=="play")return;const ps=peers();if(ps.length&&ps.every(p=>p.presence.res&&p.presence.res.r===S.g.r))reveal()}
function sbTable(sb){return `<table>${sb.slice().sort((a,b)=>b[1]-a[1]).map((r,i)=>`<tr><td>${i===0&&r[1]>0?"★ ":""}${i+1}. ${esc(clip(r[0],16))}</td><td>${r[1]}</td></tr>`).join("")}</table>`}
function render(){const b=box();if(!b)return;
 if(!S.room){const nm=(()=>{try{return localStorage.getItem("twb-name")||""}catch(e){return ""}})();
  b.innerHTML=`<div class="row sp"><h2>${TX.title}</h2><button id="lqx">${TX.close}</button></div><p>${TX.intro}</p><p class="sm">${TX.score}</p>
  <label class="row"><span class="sm">${TX.name}</span><input id="lqn" maxlength="16" value="${esc(nm)}" autocomplete="off"></label>
  <div class="row"><button class="pr" id="lqcr">${TX.create}</button><input id="lqc" maxlength="4" placeholder="${TX.code}" aria-label="${TX.code}" autocomplete="off" style="width:7em;text-transform:uppercase;letter-spacing:.2em"><button id="lqj">${TX.join}</button></div><div id="lqm"></div>`;
  document.getElementById("lqx").onclick=()=>ov.classList.remove("on");document.getElementById("lqcr").onclick=()=>enter(true);document.getElementById("lqj").onclick=()=>enter(false);
  document.getElementById("lqc").onkeydown=e=>{if(e.key==="Enter")enter(false)};return}
 const ps=peers(),hp=hostPeer(ps),amHost=!!(hp&&hp.sameTab),g=amHost?S.g:hp&&hp.presence.g;
 const head=`<div class="row sp"><span><span class="sm">${TX.room}</span> <span class="code">${S.code.toUpperCase()}</span></span><span class="row"><button id="lqmin">${TX.close}</button><button id="lql">${TX.leave}</button></span></div>`;
 const pl=`<div class="pl">${ps.map(p=>`<span>${esc(clip(p.presence.name,16))}${p.sameTab?` (${TX.you})`:""}${hp&&p.peer===hp.peer?` · ${TX.host}`:""}${g&&g.st==="play"&&p.presence.res&&p.presence.res.r===g.r?" ✓":""}</span>`).join("")}</div>`;
 const bind=()=>{document.getElementById("lql").onclick=leave;document.getElementById("lqmin").onclick=()=>ov.classList.remove("on")};
 if(!hp||!g){b.innerHTML=head+`<div class="fb mid">${S.host?TX.joining:TX.gone}</div>`+pl;bind();return}
 if(g.st==="lobby"){b.innerHTML=head+`<p class="sm">${TX.tell}</p><h3 style="margin:0">${TX.players} (${ps.length})</h3>${pl}<p class="sm">${TX.score}</p>`+(amHost?`<div class="row">${CFG.settings.map(s=>`<label class="row"><span class="sm">${tr(s.label)}</span><select data-k="${s.k}">${s.opts.map(o=>`<option value="${esc(o[0])}" ${String(g.set[s.k])===String(o[0])?"selected":""}>${esc(tr(o[1]))}</option>`).join("")}</select></label>`).join("")}
   <label class="row"><span class="sm">${TX.rounds}</span><select id="lqn2">${[5,10,15,20].map(n=>`<option ${n===g.n?"selected":""}>${n}</option>`).join("")}</select></label></div><div class="row"><button class="pr" id="lqs">${TX.start}</button></div>`:`<div class="fb mid">${TX.wait}</div>`);
  bind();if(amHost){b.querySelectorAll("select[data-k]").forEach(s=>s.onchange=()=>{g.set[s.dataset.k]=s.value;S.settings[s.dataset.k]=s.value;push()});
   document.getElementById("lqs").onclick=()=>{g.n=+document.getElementById("lqn2").value;S.sb={};g.sb=[];g.r=0;newQ()}}return}
 if(g.st==="play"||g.st==="res"){
  if(S.lr!==g.r){S.lr=g.r;S.my=null;S.t0=performance.now();S.room.presence({res:null}).catch(()=>{})}
  const n=ps.filter(p=>p.presence.res&&p.presence.res.r===g.r).length;const shown=g.st==="res";
  const left=Math.max(0,SECS-(performance.now()-S.t0)/1000);const late=!shown&&left<=0&&S.my==null;
  b.innerHTML=head+`<div class="row sp"><span class="sm">${TX.q} ${g.r} / ${g.n}</span><span class="sm">${n} / ${ps.length} ${TX.answered}</span></div>${shown?"":`<div class="bar"><i id="lqt" style="width:${100*left/SECS}%"></i></div>`}
   <div class="qq">${esc(g.q.q)}</div>${g.q.sub?`<div class="sub">${esc(g.q.sub)}</div>`:""}
   <div class="ops">${g.q.opts.map((o,i)=>`<button data-i="${i}" class="${shown&&i===g.ans?"ok":shown&&S.my===i?"no":S.my===i?"sel":""}" ${S.my!=null||shown||late?"disabled":""}>${esc(o)}</button>`).join("")}</div>
   ${shown?`<div class="fb ${S.my===g.ans?"ok":"no"}">${S.my===g.ans?TX.right:(S.my==null?TX.timeUp+" ":"")+TX.wrong+" "+esc(g.q.opts[g.ans])}</div><h3 style="margin:0">${TX.total}</h3>${sbTable(g.sb||[])}`:late?`<div class="fb mid">${TX.timeUp}</div>`:""}
   ${amHost?`<div class="row">${shown?(g.r>=g.n?`<button class="pr" id="lqf">${TX.finish}</button>`:`<button class="pr" id="lqnx">${TX.next}</button>`):`<button id="lqr">${TX.reveal}</button>`}</div>`:""}`;
  bind();b.querySelectorAll("[data-i]").forEach(x=>x.onclick=()=>{if(S.my!=null)return;S.my=+x.dataset.i;S.room.presence({res:{r:g.r,a:S.my,t:Math.round(performance.now()-S.t0)}}).catch(()=>{});render()});
  if(amHost){const r=document.getElementById("lqr");if(r)r.onclick=reveal;const nx=document.getElementById("lqnx");if(nx)nx.onclick=newQ;const f=document.getElementById("lqf");if(f)f.onclick=()=>{g.st="end";push();render()}}
  clearInterval(S.timer);if(!shown)S.timer=setInterval(()=>{const t=document.getElementById("lqt");if(!t){clearInterval(S.timer);return}const l=Math.max(0,SECS-(performance.now()-S.t0)/1000);t.style.width=(100*l/SECS)+"%";if(l<=0){clearInterval(S.timer);render()}},250);
  return}
 if(g.st==="end"){b.innerHTML=head+`<h2>${TX.podium}</h2>${sbTable(g.sb||[])}`+(amHost?`<div class="row"><button class="pr" id="lqa">${TX.again}</button></div>`:"");bind();
  if(amHost)document.getElementById("lqa").onclick=()=>{g.st="lobby";g.r=0;g.sb=[];S.sb={};push();render()}}}
})();

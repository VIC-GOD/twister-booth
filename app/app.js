(function(){
const $=s=>document.querySelector(s),esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const LS={get:(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let P=LS.get("gl-profile",null);
const ui=()=>(P&&P.ui)||((navigator.language||"fr").slice(0,2)==="de"?"de":(navigator.language||"fr").slice(0,2)==="en"?"en":"fr");
const t=()=>GL.T[ui()],tx=o=>o?(o[ui()]||o.en||o.fr||""):"";
const langs=()=>P?[P.A].concat(P.BC||[]):["fr","en"];
const LN=k=>(GL.LANGS.find(l=>l.k===k)||{n:k}).n;
const ROOT="../";
const app=$("#app"),nav=$("#nav");

// ---------- onboarding ----------
let OB=null;
function onboarding(step){
 OB=OB||{role:P&&P.role||"",A:P&&P.A||"",BC:(P&&P.BC||[]).slice(),level:P&&P.level||"",goal:P&&P.goal||10,step:1};if(step)OB.step=step;
 nav.hidden=true;$("#top").hidden=true;const T=t();let h="";
 const dots=`<div class="dots">${[1,2,3,4].map(i=>`<i class="${i<=OB.step?"on":""}"></i>`).join("")}</div>`;
 const opt=(v,cur,label,desc,ic)=>`<button class="opt" data-v="${v}" aria-pressed="${v===cur}"><span class="oi">${ic||""}</span><span><b>${label}</b>${desc?`<small>${desc}</small>`:""}</span></button>`;
 if(OB.step===1)h=`<h1>${T.ob1}</h1><div class="opts">${opt("int",OB.role,T.int,T.intD,"🎧")}${opt("tra",OB.role,T.tra,T.traD,"✍️")}${opt("both",OB.role,T.both,T.bothD,"🌍")}</div>`;
 if(OB.step===2){const chip=(l,sel,grp)=>`<button class="lchip" data-g="${grp}" data-v="${l.k}" aria-pressed="${sel}" ${grp==="bc"&&l.k===OB.A?"disabled":""}>${esc(l.n)}${l.st!=="full"?`<em>${l.st==="soon"?T.soon:T.part}</em>`:""}</button>`;
  h=`<h1>${T.ob2}</h1><p class="muted">${T.ob2d}</p><h3>${T.la}</h3><div class="chips">${GL.LANGS.map(l=>chip(l,OB.A===l.k,"a")).join("")}</div><h3>${T.lbc}</h3><div class="chips">${GL.LANGS.map(l=>chip(l,OB.BC.includes(l.k),"bc")).join("")}</div>`}
 if(OB.step===3)h=`<h1>${T.ob3}</h1><div class="opts">${opt("1",OB.level,T.lv1,T.lv1d,"🌱")}${opt("2",OB.level,T.lv2,T.lv2d,"🎓")}${opt("3",OB.level,T.lv3,T.lv3d,"🏆")}</div>`;
 if(OB.step===4)h=`<h1>${T.ob4}</h1><div class="opts">${[5,10,20,30].map(m=>opt(String(m),String(OB.goal),m+" "+T.min,"","⏱️")).join("")}</div>`;
 const ok=OB.step===1?!!OB.role:OB.step===2?!!OB.A&&OB.BC.length>0:OB.step===3?!!OB.level:true;
 app.innerHTML=`<section class="ob">${OB.step===1?`<div class="brand big"><span class="logo">God<b>♥</b>Love</span><p>${T.tag}</p></div>`:""}${dots}${h}
  <div class="obnav">${OB.step>1?`<button class="ghost" id="obb">${T.back}</button>`:"<span></span>"}<button class="pri" id="obn" ${ok?"":"disabled"}>${OB.step===4?T.obDone:T.next}</button></div></section>`;
 app.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const v=b.dataset.v;if(OB.step===1)OB.role=v;if(OB.step===3)OB.level=v;if(OB.step===4)OB.goal=+v;onboarding()});
 app.querySelectorAll(".lchip").forEach(b=>b.onclick=()=>{const v=b.dataset.v;if(b.dataset.g==="a"){OB.A=v;OB.BC=OB.BC.filter(x=>x!==v)}else{OB.BC=OB.BC.includes(v)?OB.BC.filter(x=>x!==v):OB.BC.concat(v)}onboarding()});
 $("#obb")&&($("#obb").onclick=()=>onboarding(OB.step-1));
 $("#obn").onclick=()=>{if(OB.step<4)return onboarding(OB.step+1);
  P=Object.assign({},P||{},{role:OB.role,A:OB.A,BC:OB.BC,level:OB.level,goal:OB.goal,ui:(P&&P.ui)||(["fr","en","de"].includes(OB.A)?OB.A:ui())});LS.set("gl-profile",P);OB=null;location.hash="#/today";route()};
 window.scrollTo(0,0)}

// ---------- shell ----------
function shell(active,title){nav.hidden=false;$("#top").hidden=false;const T=t();
 const items=[["today","🏠"],["learn","🎓"],["practice","✍️"],["games","🎮"],["dict","📖"]];
 nav.innerHTML=items.map(([k,i])=>`<a href="#/${k}" class="${k===active?"on":""}" ${k===active?'aria-current="page"':""}><span>${i}</span>${T.nav[k]}</a>`).join("");
 const xi=window.XP?XP.info():null;
 $("#top").innerHTML=`<a class="logo" href="#/today">God<b>♥</b>Love</a><span class="beta">${T.beta}</span><span class="sp"></span>${xi?`<span class="stat" title="${esc(T.streak(xi.streak))}">🔥 ${xi.streak}</span><span class="stat">⭐ ${xi.xp}</span>`:""}<a class="me" href="#/me" aria-label="${T.profile}">👤</a>`;
 document.title=(title?title+" · ":"")+"God Love"}
const card=(href,ic,title,desc,extra,cls)=>`<a class="card ${cls||""}" href="${href}"><span class="ci">${ic}</span><span class="cb"><b>${esc(title)}</b>${desc?`<small>${esc(desc)}</small>`:""}${extra||""}</span><span class="go">›</span></a>`;

// ---------- today ----------
function today(){const T=t();shell("today",T.nav.today);const xi=window.XP?XP.info():null,due=window.BANK?BANK.due().length:0;
 const dayN=Math.floor(Date.now()/864e5),mods=modsFor(),m=mods[dayN%mods.length];
 const gs=GL.GAMES.filter(g=>g.l.some(l=>langs().includes(l))),g=gs[dayN%gs.length];
 const pairs=trPairs(),grL=langs().filter(l=>GL.GRAM[l]);
 const pr=pairs.length?["#/practice/tr","✍️",T.trT,T.trD]:grL.length?["#/practice/gr/"+grL[0],"📐",T.grT,T.grD]:["#/dict","📖",T.dictT,T.dictD];
 app.innerHTML=`<h1>${T.hi} 👋</h1>
 ${xi?`<div class="goalbox"><div><b>${esc(tx(xi.rank))}</b> · ${T.lvl} ${xi.level}</div><div class="bar"><i style="width:${Math.min(100,100*xi.rounds/xi.goalRounds)}%"></i></div><small>${T.goal} : ${Math.min(xi.rounds,xi.goalRounds)}/${xi.goalRounds} · 🔥 ${T.streak(xi.streak)}</small></div>`:""}
 <h2>${T.todayT}</h2><div class="steps">
 <div class="stepl">1 · ${T.step1}</div>${card("#/learn/"+m.k+"/tech",m.i,tx(m),tx({fr:"Les techniques clés, puis une vidéo",en:"Key techniques, then a video",de:"Die wichtigsten Techniken, dann ein Video"}))}
 <div class="stepl">2 · ${T.step2}</div>${card(pr[0],pr[1],pr[2],pr[3])}
 <div class="stepl">3 · ${T.step3}</div>${card(gameHref(g),g.i,g.n,tx(g))}</div>
 <h2>🧠 ${due?T.reviews(due):T.noRev}</h2>${due?card(ROOT+"progress/","🧠",T.reviews(due),"",""):""}
 <p class="langsum">${langs().map(LN).join(" · ")} · <a href="#/me">${T.edit}</a></p>`}

// ---------- learn ----------
const modsFor=()=>GL.MODULES.filter(m=>P.role==="both"||m.r===P.role||m.r==="both");
function learn(k,tab){const T=t();
 if(!k){shell("learn",T.learnT);const grp=(r,label)=>{const ms=modsFor().filter(m=>m.r===r);return ms.length?`<h2>${label}</h2>`+ms.map(m=>card("#/learn/"+m.k,m.i,tx(m),(tx(m.tech)||[]).length+" "+T.tabs.tech.toLowerCase()+" · "+vidsOf(m).length+" "+T.tabs.vid.toLowerCase())).join(""):""};
  app.innerHTML=`<h1>${T.learnT}</h1><p class="muted">${T.learnD}</p>${grp("int",T.intMods)}${grp("tra",T.traMods)}${grp("both",T.bothMods)}`;return}
 const m=GL.MODULES.find(x=>x.k===k);if(!m)return go("#/learn");tab=tab||"cours";shell("learn",tx(m));
 const tabs=Object.keys(T.tabs).map(x=>`<a href="#/learn/${k}/${x}" class="${x===tab?"on":""}">${T.tabs[x]}</a>`).join("");
 let body="";
 if(tab==="cours")body=`<div class="prog"><b>📚 ${T.prog}</b><small>${T.progD}</small></div>`+m.cours.map((c,i)=>{const x=c[ui()]||c.en;return`<article class="lesson"><span class="num">${i+1}</span><div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div></article>`}).join("");
 if(tab==="tech")body=`<ol class="tech">${(tx(m.tech)||[]).map(s=>`<li>${esc(s)}</li>`).join("")}</ol>`;
 if(tab==="vid"){const v=vidsOf(m),mine=v.filter(x=>x[2]&&pairIn(x[2])),gen=v.filter(x=>!x[2]),other=v.filter(x=>x[2]&&!pairIn(x[2]));
  const li=a=>`<li><a href="${a[1]}" target="_blank" rel="noopener">▶ ${esc(a[0])}</a></li>`;
  body=v.length?`${mine.length?`<h3>${T.vidYour}</h3><ul class="vids">${mine.map(li).join("")}</ul>`:""}${gen.length?`<h3>${T.vidGen}</h3><ul class="vids">${gen.map(li).join("")}</ul>`:""}${other.length?`<details><summary>${T.vidAll} (${other.length})</summary><ul class="vids">${other.map(li).join("")}</ul></details>`:""}<p class="muted sm">${T.src}</p>`:`<p class="muted">${T.vidNone}</p>`;
  if(m.res.length)body+=`<h3>${T.res}</h3><ul class="vids">${m.res.map(r=>GL.RES[r]).filter(Boolean).map(r=>`<li><a href="${r[1]}" target="_blank" rel="noopener">🔗 ${esc(r[0])}</a></li>`).join("")}</ul>`}
 if(tab==="ex")body=m.ex.map(([ty,key])=>{if(ty==="game"){const g=GL.GAMES.find(x=>x.k===key);return g?card(gameHref(g),g.i,g.n,tx(g)):""}
  if(ty==="practice")return key==="tr"?card("#/practice/tr","✍️",T.trT,T.trD):card("#/practice/gr/"+(langs().find(l=>GL.GRAM[l])||"fr"),"📐",T.grT,T.grD);
  return card("#/dict","📖",T.dictT,T.dictD)}).join("");
 if(tab==="ev"){const crit=tx(m.ev)||[],H=LS.get("gl-ev-"+k,[]);
  body=`<p class="muted">${T.evD}</p><form id="evf">${crit.map((c,i)=>`<label class="crit"><span>${esc(c)}</span><input type="range" min="1" max="5" value="3" name="c${i}"><output>3</output></label>`).join("")}<button class="pri" type="submit">${T.save}</button></form>
  ${H.length?`<h3>${T.hist}</h3><table class="hist"><tr><th></th>${crit.map(c=>`<th>${esc(c)}</th>`).join("")}</tr>${H.slice(-8).reverse().map(h=>`<tr><td>${h.d}</td>${h.s.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</table>`:""}`}
 app.innerHTML=`<a class="back" href="#/learn">‹ ${T.learnT}</a><h1>${m.i} ${esc(tx(m))}</h1><nav class="tabs">${tabs}</nav><div class="tabbody">${body}</div>`;
 const f=$("#evf");if(f){f.querySelectorAll("input").forEach(r=>r.oninput=()=>r.nextElementSibling.textContent=r.value);
  f.onsubmit=e=>{e.preventDefault();const H=LS.get("gl-ev-"+k,[]);H.push({d:new Date().toISOString().slice(0,10),s:[...f.querySelectorAll("input")].map(r=>+r.value)});LS.set("gl-ev-"+k,H);window.XP&&XP.add(5,{noRound:1});learn(k,"ev")}}}
function vidsOf(m){const out=[];for(const spec of m.vid){const [g,title]=spec.split(":");const list=GL.VIDEOS[g]||[];out.push(...(title?list.filter(v=>v[0].startsWith(title)):list))}return out}
const pairIn=p=>{const [a,b]=p.split("-");return langs().includes(a)&&langs().includes(b)};

// ---------- practice ----------
const trPairs=()=>{const L=langs(),s=new Set();GL.TR.forEach(i=>{if(L.includes(i.s)&&L.includes(i.t))s.add(i.s+"-"+i.t)});return[...s]};
let TRS={pair:null,i:null};
function practice(sub,a,b){const T=t();
 if(!sub){shell("practice",T.practiceT);const gl=langs().filter(l=>GL.GRAM[l]);
  app.innerHTML=`<h1>${T.practiceT}</h1>${card("#/practice/tr","✍️",T.trT,T.trD)}<h2>📐 ${T.grT}</h2><p class="muted">${T.grD}</p>${gl.map(l=>card("#/practice/gr/"+l,"📐",T.grT+" · "+LN(l),GL.GRAM[l].map(x=>tx(x)).join(" · "))).join("")||`<p class="muted">${T.noPair}</p>`}`;return}
 if(sub==="tr")return trView();
 if(sub==="gr")return grView(a,b)}
function trView(){const T=t();shell("practice",T.trT);const pairs=trPairs();
 if(!pairs.length){app.innerHTML=`<a class="back" href="#/practice">‹ ${T.practiceT}</a><h1>${T.trT}</h1><p class="muted">${T.noPair}</p>`;return}
 if(!TRS.pair||!pairs.includes(TRS.pair))TRS.pair=pairs[0];
 const pool=GL.TR.map((x,i)=>[x,i]).filter(([x])=>x.s+"-"+x.t===TRS.pair);
 if(TRS.i==null||!pool.some(([,i])=>i===TRS.i))TRS.i=pool[Math.floor(Math.random()*pool.length)][1];
 const it=GL.TR[TRS.i];
 app.innerHTML=`<a class="back" href="#/practice">‹ ${T.practiceT}</a><h1>✍️ ${T.trT}</h1>
 <label class="muted sm">${T.dir}</label><div class="chips">${pairs.map(p=>`<button class="lchip" data-p="${p}" aria-pressed="${p===TRS.pair}">${p.split("-").map(x=>x.toUpperCase()).join(" → ")}</button>`).join("")}</div>
 <div class="src"><small>${LN(it.s)}</small><p>${esc(it.src)}</p></div>
 <label class="muted sm" for="ans">${T.yourAns} (${LN(it.t)})</label><textarea id="ans" rows="3" placeholder="${T.typeHere}" lang="${it.t}" autocapitalize="off" spellcheck="false"></textarea>
 <div class="row"><button class="pri" id="chk">${T.check}</button><button class="ghost" id="nxt">${T.again} ↻</button></div><div id="res"></div>`;
 app.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{TRS.pair=b.dataset.p;TRS.i=null;trView()});
 $("#nxt").onclick=()=>{const p=pool.filter(([,i])=>i!==TRS.i);TRS.i=(p.length?p:pool)[Math.floor(Math.random()*(p.length||pool.length))][1];trView()};
 $("#chk").onclick=()=>{const v=$("#ans").value;if(!v.trim())return;const r=GL.correct(it,v,ui());
  const marks=r.ops.map(([k,w,y])=>k==="ok"?`<span class="tk ok">${esc(y)}</span>`:k==="miss"?`<span class="tk miss" title="${esc(w)}">⁁${esc(w)}</span>`:k==="extra"?`<span class="tk extra">${esc(y)}</span>`:`<span class="tk ${k==="form"?"form":"bad"}">${esc(y)}<sup>${esc(w)}</sup></span>`).join(" ");
  $("#res").innerHTML=`<div class="result ${r.errs?"":"perfect"}"><div class="scorel">${T.score} : <b>${r.score}/100</b></div>
   ${r.errs?`<p class="marked">${marks}</p><ol class="notes">${r.notes.map(n=>`<li><b>${esc(n.msg)}</b>${n.why?`<span class="whyx">💡 ${esc(n.why)}</span>`:""}</li>`).join("")}</ol>`:`<p>✅ ${T.perfect}</p>`}
   <div class="refa"><small>${T.refA}</small><p>${esc(r.ref)}</p>${r.others.length?`<small>${T.otherA}</small>${r.others.map(o=>`<p class="alt">${esc(o)}</p>`).join("")}`:""}</div></div>`;
  if(window.XP)XP.add(r.errs?4:10,{lang:it.t});if(r.errs&&window.BANK)BANK.add({game:"translate",q:it.src,a:r.ref,lang:it.t})};
 $("#ans").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();$("#chk").click()}})}
function grView(l,k){const T=t(),G=GL.GRAM[l];if(!G)return go("#/practice");
 if(!k){shell("practice",T.grT);app.innerHTML=`<a class="back" href="#/practice">‹ ${T.practiceT}</a><h1>📐 ${T.grT} · ${LN(l)}</h1>${G.map(g=>card("#/practice/gr/"+l+"/"+g.k,"📐",tx(g),tx(g.rule).slice(0,90)+"…")).join("")}`;return}
 const g=G.find(x=>x.k===k);if(!g)return go("#/practice/gr/"+l);shell("practice",tx(g));
 app.innerHTML=`<a class="back" href="#/practice/gr/${l}">‹ ${T.grT} · ${LN(l)}</a><h1>${esc(tx(g))}</h1>
 <section class="sheet"><h3>${T.rule}</h3><p>${esc(tx(g.rule))}</p><h3>${T.ex}</h3><ul class="exm" lang="${l}">${g.exm.map(e=>`<li>${esc(e)}</li>`).join("")}</ul><div class="trap"><b>⚠️ ${T.trap}</b><p>${esc(tx(g.trap))}</p></div></section>
 <h2>${T.exo}</h2><div id="exo">${g.ex.map((e,i)=>`<div class="q" data-i="${i}"><p lang="${l}">${esc(e[0]).replace("___",'<span class="blank">___</span>')}</p><div class="row">${e[1].map((o,j)=>`<button class="ghost" data-j="${j}">${esc(o)}</button>`).join("")}</div><p class="fb"></p></div>`).join("")}</div>`;
 app.querySelectorAll(".q").forEach(q=>q.querySelectorAll("button").forEach(b=>b.onclick=()=>{const e=g.ex[+q.dataset.i],ok=+b.dataset.j===e[2];
  q.querySelectorAll("button").forEach(x=>{x.disabled=true;if(+x.dataset.j===e[2])x.classList.add("right")});if(!ok)b.classList.add("wrongb");
  q.querySelector(".blank").textContent=e[1][e[2]];q.querySelector(".fb").innerHTML=`<b>${ok?"✅ "+T.right:"❌ "+T.wrong}</b> ${esc(e[3][ui()==="fr"?0:1])}`;
  if(window.XP)XP.add(ok?3:1,{noRound:1});if(!ok&&window.BANK)BANK.add({game:"grammar",q:e[0],a:e[1][e[2]],lang:l})}))}

// ---------- games ----------
const gameHref=g=>ROOT+((g.uby&&g.uby[ui()])||g.u);
function games(){const T=t();shell("games",T.gamesT);const L=langs();
 const sec=GL.SKILLS.map(s=>{const gs=GL.GAMES.filter(g=>g.s===s.k).sort((a,b)=>(b.l.some(l=>L.includes(l))?1:0)-(a.l.some(l=>L.includes(l))?1:0));
  return`<h2>${s.i} ${tx(s)}</h2>`+gs.map(g=>{const inC=g.l.some(l=>L.includes(l));return card(gameHref(g),g.i,g.n,tx(g),`<span class="tags">${g.l.map(l=>`<em class="${L.includes(l)?"y":""}">${l.toUpperCase()}</em>`).join("")}${inC?"":`<em>${T.notIn}</em>`}</span>`,inC?"":"dim")}).join("")}).join("");
 app.innerHTML=`<h1>${T.gamesT}</h1><p class="muted">${T.gamesD}</p>${sec}`}

// ---------- dictionary ----------
let DIX=null,DQ={q:"",ty:"all"};
function buildDict(){const C=window.CONTENT||{},out=[];
 const ID=C.ID||{},NOTES=ID.NOTES||{};
 (ID.IDIOMS||[]).forEach(i=>{const pt=window.PT&&PT.ID?PT.ID[i.id]:"";
  const n=NOTES[i.id]||{};out.push({ty:"idiom",L:{en:i.en,fr:i.fr,de:i.de,pt:pt||""},m:{en:i.m},x:i.x?{en:i.x[0],fr:i.x[1],de:i.x[2]}:null,note:n,tag:i.c})});
 (window.PROVERBS||[]).forEach(p=>out.push({ty:"prov",L:{en:p.en,fr:p.fr,de:p.de,pt:p.pt},m:p.m,note:p.note}));
 (window.FFDATA||[]).forEach(f=>out.push({ty:"ff",ff:f}));
 (ID.FF_FE||[]).concat(ID.FF_FD||[]).forEach(f=>out.push({ty:"ff",ff:Object.assign({t:"fr"},f)}));
 const BG=C.BG||{};(BG.ACRONYMS||[]).forEach(a=>out.push({ty:"acr",L:{en:a[1]+" · "+a[2],fr:a[3]+" · "+a[4],de:a[5]+" · "+a[6]},tag:a[7],key:a[0]}));
 (window.VOCAB||[]).forEach(v=>out.push({ty:"voc",L:{en:v[0],fr:v[1],de:v[2],pt:v[4]}}));
 ((C.CP||{}).COUNTRIES||[]).forEach(c=>{if(window.PT&&PT.country)try{PT.country(c)}catch(e){}
  const L={};["en","fr","de","pt"].forEach(l=>{if(c[l])L[l]=c[l]+" · "+((c.cap||{})[l]||"")});out.push({ty:"geo",L,flag:c.id})});
 out.forEach(e=>{e.f=GL.fold(e.ff?[e.ff.w,e.ff.ok].concat(e.ff.bad||[]).join(" | "):Object.values(e.L||{}).join(" | ")+(e.key?" | "+e.key:""))});return out}
function dict(){const T=t();shell("dict",T.dictT);if(!DIX)DIX=buildDict();
 const q=(new URLSearchParams(location.hash.split("?")[1]||"")).get("q");if(q!=null&&q!==DQ.q)DQ.q=q;
 app.innerHTML=`<h1>📖 ${T.dictT}</h1><p class="muted">${T.dictD}</p><div class="searchbar"><input id="dq" type="search" placeholder="${T.search}" value="${esc(DQ.q)}" autocomplete="off" autocapitalize="off"></div>
 <div class="chips" id="dty">${Object.keys(T.types).map(k=>`<button class="lchip" data-t="${k}" aria-pressed="${DQ.ty===k}">${T.types[k]}</button>`).join("")}</div><div id="dres"></div>`;
 const inp=$("#dq");inp.oninput=()=>{DQ.q=inp.value;history.replaceState(null,"","#/dict"+(DQ.q?"?q="+encodeURIComponent(DQ.q):""));dres()};
 app.querySelectorAll("#dty button").forEach(b=>b.onclick=()=>{DQ.ty=b.dataset.t;app.querySelectorAll("#dty button").forEach(x=>x.setAttribute("aria-pressed",x===b));dres()});
 dres();if(!DQ.q)inp.focus()}
function dres(){const T=t(),L=langs(),q=GL.fold(DQ.q.trim()),box=$("#dres");
 if(q.length<2&&DQ.ty==="all"){box.innerHTML=`<p class="muted">${T.dictHint}</p>`;return}
 let r=DIX.filter(e=>(DQ.ty==="all"||e.ty===DQ.ty)&&(!q||e.f.includes(q)));
 r=r.filter(e=>e.ff?(L.includes(e.ff.l)&&L.includes(e.ff.t)):Object.keys(e.L).some(l=>L.includes(l)&&e.L[l]));
 const score=e=>{const parts=e.f.split(" | ");return parts.some(p=>p===q)?0:parts.some(p=>p.startsWith(q))?1:2};if(q)r.sort((a,b)=>score(a)-score(b));
 const shown=r.slice(0,60);
 box.innerHTML=(q?`<p class="muted sm">${T.count(r.length)}</p>`:"")+shown.map((e,i)=>dcard(e,i)).join("")+(q?extLinks(DQ.q.trim(),!r.length):"");
 box.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>{const e=shown[+b.dataset.add];const a=langs().filter(l=>e.L&&e.L[l]);
  if(window.BANK){if(e.ff)BANK.add({game:"dict",q:e.ff.w,a:e.ff.ok,lang:e.ff.t});else BANK.add({game:"dict",q:e.L[a[0]],a:a.slice(1).map(l=>e.L[l]).join(" / ")||e.L[a[0]],lang:a[1]||a[0]})}
  b.textContent=T.added;b.disabled=true})}
function dcard(e,i){const T=t(),L=langs(),u=ui();
 const badge=`<span class="dtype">${T.types[e.ty]}</span>`;
 if(e.ff){const f=e.ff;return`<article class="dcard">${badge}<p class="ffl"><b>${esc(f.w)}</b> <em>${f.l.toUpperCase()}</em></p><p class="ffl">✅ ${T.ffIs} <b>${esc(f.ok)}</b> <em>${f.t.toUpperCase()}</em><br>❌ ${T.ffMeans} <s>${esc((f.bad||[])[0]||"")}</s></p>${f.n?`<p class="muted sm">${esc(f.n)}</p>`:""}<button class="mini" data-add="${i}">${T.addRev}</button></article>`}
 const rows=L.filter(l=>e.L[l]).map(l=>`<div class="dl"><em>${l.toUpperCase()}</em><span lang="${l}">${e.flag&&l===L.filter(x=>e.L[x])[0]?`<img src="${ROOT}flags/${e.flag.toLowerCase()}.svg" alt="" class="flag">`:""}${esc(e.L[l])}</span></div>`).join("");
 const m=e.m?(e.m[u]||e.m.en):"",note=e.note?(e.note[u]||e.note.x||""):"",ex=e.x?(e.x[u]||e.x.en):"";
 return`<article class="dcard">${badge}${e.tag?`<span class="dtag">${esc(e.tag)}</span>`:""}${rows}${m?`<p class="dm"><b>${T.meaning} :</b> ${esc(m)}</p>`:""}${ex?`<p class="dm"><b>${T.exampleL} :</b> <i>${esc(ex)}</i></p>`:""}${note?`<p class="muted sm">💡 ${esc(note)}</p>`:""}<button class="mini" data-add="${i}">${T.addRev}</button></article>`}
function extLinks(q,none){const T=t(),L=langs(),N={fr:"french",en:"english",de:"german",es:"spanish",pt:"portuguese",it:"italian",ar:"arabic",zh:"chinese",ru:"russian"},E=encodeURIComponent(q),links=[];
 const sp=L.filter(l=>N[l]);for(let i=0;i<sp.length;i++)for(let j=0;j<sp.length;j++)if(i!==j&&(i===0||j===0))links.push([`Reverso ${sp[i].toUpperCase()}→${sp[j].toUpperCase()}`,`https://context.reverso.net/translation/${N[sp[i]]}-${N[sp[j]]}/${E}`]);
 const WR=["fr","de","es","it","pt"];sp.filter(l=>WR.includes(l)).forEach(l=>{if(sp.includes("en")){links.push([`WordReference EN→${l.toUpperCase()}`,`https://www.wordreference.com/en${l}/${E}`]);links.push([`WordReference ${l.toUpperCase()}→EN`,`https://www.wordreference.com/${l}en/${E}`])}});
 if(sp.includes("en"))sp.filter(l=>l!=="en").forEach(l=>links.push([`Linguee EN–${l.toUpperCase()}`,`https://www.linguee.com/english-${N[l]}/search?query=${E}`]));
 links.push(["IATE (terminologie UE)","https://iate.europa.eu/home"]);
 return`<div class="ext"><b>${none?T.noRes:T.ext}</b><div class="chips">${links.slice(0,10).map(l=>`<a class="lchip" href="${l[1]}" target="_blank" rel="noopener">${esc(l[0])} ↗</a>`).join("")}</div></div>`}

// ---------- profile ----------
function me(){const T=t();shell("",T.meT);const R={int:T.int,tra:T.tra,both:T.both};
 app.innerHTML=`<h1>👤 ${T.meT}</h1>
 <section class="box"><div class="kv"><span>${T.role}</span><b>${R[P.role]}</b></div><div class="kv"><span>${T.myLangs}</span><b>A : ${LN(P.A)} · B/C : ${P.BC.map(LN).join(", ")}</b></div><button class="ghost" id="ed">${T.edit}</button></section>
 <section class="box"><div class="kv"><span>${T.uiLang}</span></div><div class="chips">${["fr","en","de"].map(l=>`<button class="lchip" data-ui="${l}" aria-pressed="${ui()===l}">${LN(l)}</button>`).join("")}</div></section>
 <h2>${T.links}</h2>${card(ROOT+"progress/","📈",T.progress,"")}${card(ROOT+"myvoice/","🎙️",T.voice,"")}${card(ROOT+"print/level-test-plan/12-Week-Training-Plan.pdf","🖨️",T.pdfs,"")}${card(ROOT,"🕹️",T.oldSite,"")}
 <p><button class="ghost" id="rs">${T.reset}</button></p>`;
 $("#ed").onclick=$("#rs").onclick=()=>{OB=null;go("#/welcome")};
 app.querySelectorAll("[data-ui]").forEach(b=>b.onclick=()=>{P.ui=b.dataset.ui;LS.set("gl-profile",P);document.documentElement.lang=P.ui;me()})}

// ---------- router ----------
function go(h){location.hash=h}
function route(){const h=location.hash.replace(/^#\/?/,"").split("?")[0],[a,b,c,d]=h.split("/");document.documentElement.lang=ui();
 if(!P||a==="welcome")return onboarding(a==="welcome"?1:0);
 ({today,learn:()=>learn(b,c),practice:()=>practice(b,c,d),games,dict,me}[a]||today)();window.scrollTo(0,0)}
window.addEventListener("hashchange",route);route();
})();

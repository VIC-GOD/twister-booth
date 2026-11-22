// Pass-the-phone players, turns and challenge links shared by the Phase 2 games. Needs shell.js (SH).
window.PARTY=(function(){
 const T={en:{players:"Players (pass the phone)",p:"Player",turn:n=>n+", your turn",link:"Challenge link: a friend gets exactly the same questions",copy:"Copy link",copied:"Copied",ch:"Challenge: same questions as your friend",win:n=>n+" wins!",tie:"Tie!",lives:"Lives"},
  fr:{players:"Joueurs (passez le téléphone)",p:"Joueur",turn:n=>n+", à vous",link:"Lien de défi : un ami reçoit exactement les mêmes questions",copy:"Copier le lien",copied:"Copié",ch:"Défi : mêmes questions que votre ami",win:n=>n+" gagne !",tie:"Égalité !",lives:"Vies"},
  de:{players:"Spieler (Handy weitergeben)",p:"Spieler",turn:n=>n+", Sie sind dran",link:"Herausforderungs-Link: Ein Freund bekommt genau dieselben Fragen",copy:"Link kopieren",copied:"Kopiert",ch:"Herausforderung: dieselben Fragen wie Ihr Freund",win:n=>n+" gewinnt!",tie:"Unentschieden!",lives:"Leben"}};
 const P={T};
 P.t=()=>T[SH.UI];
 P.mulberry=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
 P.shuffle=(a,r)=>{a=a.slice();r=r||Math.random;for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 P.hashSeed=()=>{const m=location.hash.match(/s=(\d+)/);return m?+m[1]:0};
 P.newSeed=()=>(Math.random()*1e9)>>>0;
 P.link=(seed,extra)=>location.origin+location.pathname+"#s="+seed+(extra?"&"+extra:"");
 P.menu=cfg=>{const t=P.t();return `<div class="lbl">${t.players}</div><div class="row">${[1,2,3,4,5,6].map(n=>SH.opt(cfg,"np",n,n)).join("")}</div>
  ${cfg.np>1?`<div class="row">${[...Array(cfg.np)].map((_,i)=>`<input class="nm" data-pn="${i}" maxlength="16" placeholder="${t.p} ${i+1}" value="${SH.esc((cfg.names||[])[i]||"")}" style="font-size:17px;min-height:42px;width:9.5em">`).join("")}</div>`:""}`};
 P.bind=(root,cfg,key)=>root.querySelectorAll("[data-pn]").forEach(e=>e.oninput=()=>{cfg.names=cfg.names||[];cfg.names[+e.dataset.pn]=e.value;try{localStorage.setItem(key,JSON.stringify(cfg))}catch(x){}});
 P.players=(cfg,lives)=>[...Array(cfg.np)].map((_,i)=>({name:((cfg.names||[])[i]||"").trim()||(cfg.np>1?P.t().p+" "+(i+1):"🙂"),lives:lives||3,score:0,ok:0,streak:0,best:0}));
 P.pills=(G)=>G.players.length<2?"":`<div class="row" id="pills">${G.players.map((p,i)=>`<span class="pl${i===G.pi?" on":""}${p.lives<=0?" out":""}">${SH.esc(p.name)} · ${p.score}${G.lives?" · "+"❤".repeat(Math.max(0,p.lives)):""}</span>`).join("")}</div>`;
 P.refresh=G=>{const e=document.getElementById("pills");if(e)e.outerHTML=P.pills(G)};
 // next alive player after the current one; returns false when nobody is left
 P.advance=G=>{const n=G.players.length;for(let k=1;k<=n;k++){const j=(G.pi+k)%n;if(G.players[j].lives>0){G.pi=j;return true}}return false};
 P.winner=G=>{const s=G.players.slice().sort((a,b)=>b.score-a.score);if(G.players.length<2)return"";return s[0].score===s[1].score?P.t().tie:P.t().win(s[0].name)};
 P.share=seed=>{const t=P.t(),u=P.link(seed);return `<div class="card" style="gap:6px"><b>${t.link}</b><div class="row"><input readonly value="${SH.esc(u)}" style="flex:1;font-size:14px;min-height:40px" onclick="this.select()"><button onclick="navigator.clipboard&&navigator.clipboard.writeText(this.previousElementSibling.value);this.textContent='${t.copied}'">${t.copy}</button></div></div>`};
 return P;
})();

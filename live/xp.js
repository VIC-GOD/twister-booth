// Shared progress for every game on the site, stored in this browser only:
// XP and career ranks, daily goal (rounds), day streak with a weekly streak freeze, badges, metrics, and the error bank.
window.XP=(function(){
 const K="twb-xp",GOAL_ROUNDS=5;
 const day=d=>{d=d||new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
 const addDays=(s,n)=>{const d=new Date(s+"T12:00:00");d.setDate(d.getDate()+n);return day(d)};
 const week=s=>{const d=new Date(s+"T12:00:00");const j=new Date(d.getFullYear(),0,1);return d.getFullYear()+"-W"+Math.ceil(((d-j)/864e5+j.getDay()+1)/7)};
 function load(){let s={};try{s=JSON.parse(localStorage.getItem(K)||"{}")}catch(e){}
  return Object.assign({xp:0,days:{},rounds:{},streak:0,best:0,last:"",freezeWeek:"",badges:{},langs:{},stats:{},golden:0},s)}
 function save(s){try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}}
 const RANKS=[
  {lv:1,en:"Trainee",fr:"Stagiaire",de:"Praktikant·in"},
  {lv:3,en:"Community Interpreter",fr:"Interprète communautaire",de:"Kommunaldolmetscher·in"},
  {lv:6,en:"Liaison Interpreter",fr:"Interprète de liaison",de:"Verhandlungsdolmetscher·in"},
  {lv:10,en:"Conference Interpreter",fr:"Interprète de conférence",de:"Konferenzdolmetscher·in"},
  {lv:15,en:"Chief Interpreter",fr:"Interprète en chef",de:"Chefdolmetscher·in"},
  {lv:21,en:"UN Booth",fr:"Cabine ONU",de:"UN-Kabine"}];
 const BADGES={
  ninja:{i:"🥷",en:"Number Ninja: 100 perfect numbers",fr:"Ninja des chiffres : 100 nombres parfaits",de:"Zahlen-Ninja: 100 perfekte Zahlen",need:s=>(s.stats.numOk||0)>=100},
  poly:{i:"🌍",en:"Polyglot: 5 languages in one week",fr:"Polyglotte : 5 langues en une semaine",de:"Polyglott: 5 Sprachen in einer Woche",need:s=>Object.keys(s.langs[week(day())]||{}).length>=5},
  face:{i:"🤟",en:"Fast Fingers: 50 fingerspelled words",fr:"Doigts agiles : 50 mots épelés",de:"Flinke Finger: 50 buchstabierte Wörter",need:s=>(s.stats.fsOk||0)>=50},
  mine:{i:"💣",en:"Minesweeper: 20 false friends in a row",fr:"Démineur : 20 faux amis d'affilée",de:"Minenräumer: 20 falsche Freunde in Folge",need:s=>(s.stats.ffBest||0)>=20},
  shadow:{i:"🎧",en:"Boss Slayer: beat a boss speaker",fr:"Tueur de boss : battre un orateur boss",de:"Boss-Bezwinger: einen Boss-Redner schlagen",need:s=>(s.stats.bossWin||0)>=1},
  clean:{i:"🧼",en:"Clean Speaker: a minute with no filler",fr:"Orateur net : une minute sans tic",de:"Sauberer Redner: eine Minute ohne Füllwort",need:s=>(s.stats.cleanMin||0)>=1},
  week:{i:"🔥",en:"7-day streak",fr:"7 jours d'affilée",de:"7 Tage in Folge",need:s=>s.best>=7},
  month:{i:"🏆",en:"30-day streak",fr:"30 jours d'affilée",de:"30 Tage in Folge",need:s=>s.best>=30},
  bank:{i:"🧠",en:"Memory: 50 cards mastered in the error bank",fr:"Mémoire : 50 cartes maîtrisées",de:"Gedächtnis: 50 Karten gemeistert",need:s=>(s.stats.mastered||0)>=50}};
 function level(xp){return Math.floor(Math.sqrt(xp/60))+1}
 function need(l){return 60*(l-1)*(l-1)}
 function rank(l){let r=RANKS[0];for(const x of RANKS)if(l>=x.lv)r=x;return r}
 function streakAlive(s){const d=day();return s.last===d||s.last===addDays(d,-1)||(s.last===addDays(d,-2)&&s.freezeWeek!==week(d))}
 function info(){const s=load(),l=level(s.xp),a=need(l),b=need(l+1),d=day();
  return{xp:s.xp,level:l,into:s.xp-a,span:b-a,today:s.days[d]||0,rounds:s.rounds[d]||0,goalRounds:GOAL_ROUNDS,goal:150,goalReached:(s.rounds[d]||0)>=GOAL_ROUNDS,
   streak:streakAlive(s)?s.streak:0,best:s.best,freezeFree:s.freezeWeek!==week(d),rank:rank(l),nextRank:RANKS.find(r=>r.lv>l)||null,badges:s.badges,stats:s.stats,days:s.days,rounds7:s.rounds}}
 // add(xp, {lang:"fr", stats:{numOk:+3}, max:{ffBest:12}})
 function add(n,opt){opt=opt||{};const s=load(),before=level(s.xp),d=day(),wasGoal=(s.rounds[d]||0)>=GOAL_ROUNDS;
  let golden=false;if(n>0&&Math.random()<.05){n*=3;golden=true}
  n=Math.max(0,Math.round(n));
  if(!opt.noRound){if(s.last!==d){if(s.last===addDays(d,-1))s.streak++;else if(s.last===addDays(d,-2)&&s.freezeWeek!==week(d)){s.streak++;s.freezeWeek=week(d)}else s.streak=1;s.last=d;s.best=Math.max(s.best,s.streak)}
  s.rounds[d]=(s.rounds[d]||0)+1}
  s.xp+=n;s.days[d]=(s.days[d]||0)+n;
  for(const k of ["days","rounds"]){const ks=Object.keys(s[k]).sort();while(ks.length>90)delete s[k][ks.shift()]}
  if(opt.lang){const w=week(d);(s.langs[w]=s.langs[w]||{})[opt.lang]=1;const ws=Object.keys(s.langs).sort();while(ws.length>4)delete s.langs[ws.shift()]}
  for(const k in (opt.stats||{}))s.stats[k]=(s.stats[k]||0)+opt.stats[k];
  for(const k in (opt.max||{}))s.stats[k]=Math.max(s.stats[k]||0,opt.max[k]);
  if(opt.metric){const m=s.stats.metrics=s.stats.metrics||{};for(const k in opt.metric){(m[k]=m[k]||[]).push([d,opt.metric[k]]);if(m[k].length>60)m[k].shift()}}
  const newBadges=[];for(const k in BADGES)if(!s.badges[k]&&BADGES[k].need(s)){s.badges[k]=d;newBadges.push(k)}
  save(s);const i=info();i.gained=n;i.golden=golden;i.up=i.level>before;i.newBadges=newBadges;i.goalJustReached=!wasGoal&&i.goalReached;
  try{window.dispatchEvent(new CustomEvent("xp",{detail:i}))}catch(e){}return i}
 // A small result strip any game can show after a round.
 function strip(i,L){L=L||"en";const T={en:["Level","Daily goal reached! Extra rounds are optional.","rounds today","Golden round: triple XP!","New badge"],fr:["Niveau","Objectif du jour atteint ! Les manches en plus sont facultatives.","manches aujourd'hui","Manche en or : XP triple !","Nouveau badge"],de:["Stufe","Tagesziel erreicht! Weitere Runden sind freiwillig.","Runden heute","Goldene Runde: dreifache XP!","Neues Abzeichen"]}[L]||[];
  return `<div style="display:grid;gap:4px;background:#ffffff10;border:1px solid #ffffff30;border-radius:12px;padding:10px 14px">`+
   `<b>+${i.gained} XP${i.golden?" · ✨ "+T[3]:""}${i.up?" · ⬆ "+T[0]+" "+i.level:""}</b>`+
   `<span style="opacity:.85">${i.rank[L]||i.rank.en} · ${T[0]} ${i.level} · ${Math.min(i.rounds,i.goalRounds)}/${i.goalRounds} ${T[2]}${i.streak?" · 🔥 "+i.streak:""}</span>`+
   (i.goalJustReached?`<b style="color:#7ff0b2">✅ ${T[1]}</b>`:"")+
   (i.newBadges&&i.newBadges.length?`<b>${T[4]}: ${i.newBadges.map(k=>BADGES[k].i+" "+(BADGES[k][L]||BADGES[k].en)).join(" · ")}</b>`:"")+`</div>`}
 return{add,info,day,addDays,strip,RANKS,BADGES};
})();
// Error bank: every miss becomes a card that comes back after 1, 3, 7 and 21 days.
window.BANK=(function(){
 const K="twb-bank",STEPS=[1,3,7,21];
 function load(){try{return JSON.parse(localStorage.getItem(K)||"[]")}catch(e){return[]}}
 function save(a){try{localStorage.setItem(K,JSON.stringify(a.slice(-800)))}catch(e){}}
 // card: {game, q (prompt), a (answer), img?, note?, lang?}
 function add(c){if(!c||!c.q||!c.a)return;const a=load(),id=(c.game||"")+"|"+(typeof c.q==="string"?c.q:"")+"|"+(c.img||"")+"|"+c.a;
  const ex=a.find(x=>x.id===id);const due=window.XP.addDays(window.XP.day(),1);
  if(ex){ex.step=0;ex.due=due;ex.miss=(ex.miss||0)+1}else a.push(Object.assign({id,step:0,due,miss:1,added:window.XP.day()},c));save(a)}
 function due(){const d=window.XP.day();return load().filter(x=>x.step<STEPS.length&&x.due<=d)}
 function all(){return load()}
 function grade(id,ok){const a=load(),c=a.find(x=>x.id===id);if(!c)return;
  if(ok){c.step++;if(c.step>=STEPS.length){c.done=window.XP.day();window.XP.add(3,{noRound:1,stats:{mastered:1}})}else c.due=window.XP.addDays(window.XP.day(),STEPS[c.step])}else{c.step=0;c.due=window.XP.addDays(window.XP.day(),1)}save(a)}
 function remove(id){save(load().filter(x=>x.id!==id))}
 return{add,due,all,grade,remove,STEPS};
})();

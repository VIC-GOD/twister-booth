// Shared XP, levels and daily streak for every game on the site (stored in this browser only).
window.XP=(function(){
 const K="twb-xp",GOAL=150;
 const day=d=>{d=d||new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
 function load(){let s={};try{s=JSON.parse(localStorage.getItem(K)||"{}")}catch(e){}return Object.assign({xp:0,days:{},streak:0,best:0,last:""},s)}
 function save(s){try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}}
 function level(xp){return Math.floor(Math.sqrt(xp/60))+1}
 function need(l){return 60*(l-1)*(l-1)}
 function info(){const s=load(),l=level(s.xp),a=need(l),b=need(l+1),today=s.days[day()]||0;
  const y=new Date();y.setDate(y.getDate()-1);const alive=s.last===day()||s.last===day(y);
  return{xp:s.xp,level:l,into:s.xp-a,span:b-a,today,goal:GOAL,streak:alive?s.streak:0,best:s.best}}
 function add(n,why){n=Math.max(0,Math.round(n));if(!n)return info();const s=load(),before=level(s.xp),d=day();
  if(s.last!==d){const y=new Date();y.setDate(y.getDate()-1);s.streak=s.last===day(y)?s.streak+1:1;s.last=d;s.best=Math.max(s.best,s.streak)}
  s.xp+=n;s.days[d]=(s.days[d]||0)+n;const ks=Object.keys(s.days).sort();while(ks.length>60)delete s.days[ks.shift()];save(s);
  const i=info();i.gained=n;i.up=i.level>before;try{window.dispatchEvent(new CustomEvent("xp",{detail:i}))}catch(e){}return i}
 return{add,info,day};
})();

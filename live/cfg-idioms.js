if(window.PT&&typeof IDIOMS!=="undefined")IDIOMS.forEach(window.PT.idiom);
window.LIVE_CFG={game:"idioms",
 settings:[
  {k:"from",label:{en:"Show",fr:"Afficher",de:"Zeigen"},opts:[["en","English"],["fr","Français"],["de","Deutsch"]].concat(window.PT?[["pt","Português"]]:[])},
  {k:"to",label:{en:"Answer",fr:"Réponse",de:"Antwort"},opts:[["fr","Français"],["en","English"],["de","Deutsch"]].concat(window.PT?[["pt","Português"]]:[]).concat([["m",{en:"Meaning (English)",fr:"Sens (en anglais)",de:"Bedeutung (Englisch)"}]])}],
 make(set){const P=IDIOMS.filter(i=>i[set.from]&&i[set.to==="m"?"m":set.to]);let to=set.to===set.from?"m":set.to;
  const sh=a=>a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
  const x=P[Math.floor(Math.random()*P.length)];const right=x[to];
  const others=sh(P.filter(o=>o!==x&&o[to]&&o[to]!==right)).slice(0,3).map(o=>o[to]);
  const opts=sh([right,...others]);const UL0=(document.documentElement.lang||"en").slice(0,2);const ln={en:{en:"English",fr:"French",de:"German",pt:"Portuguese"},fr:{en:"anglais",fr:"français",de:"allemand",pt:"portugais"},de:{en:"Englisch",fr:"Französisch",de:"Deutsch",pt:"Portugiesisch"}}[UL0]||{en:"English",fr:"French",de:"German",pt:"Portuguese"};
  const UL=(document.documentElement.lang||"en").slice(0,2);
  const sub=to==="m"?{en:"What does it mean?",fr:"Que signifie cette expression ?",de:"Was bedeutet das?"}:{en:"Equivalent in "+ln[to]+"?",fr:"Équivalent en "+ln[to]+" ?",de:"Entsprechung auf "+ln[to]+"?"};
  return {q:x[set.from],sub:sub[UL]||sub.en,opts,ans:opts.indexOf(right)}}};

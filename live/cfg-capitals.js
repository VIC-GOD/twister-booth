window.LIVE_CFG={game:"capitals",
 settings:[
  {k:"type",label:{en:"Question",fr:"Question",de:"Frage"},opts:[["cap",{en:"Country → capital",fr:"Pays → capitale",de:"Land → Hauptstadt"}],["cty",{en:"Capital → country",fr:"Capitale → pays",de:"Hauptstadt → Land"}]]},
  {k:"lang",label:{en:"Language",fr:"Langue",de:"Sprache"},opts:[["en","English"],["fr","Français"],["de","Deutsch"]]},
  {k:"cont",label:{en:"Region",fr:"Région",de:"Region"},opts:[["all",{en:"Whole world",fr:"Monde entier",de:"Ganze Welt"}]].concat(Object.keys(CONTINENTS).map(k=>[k,CONTINENTS[k]]))}],
 make(set){const l=set.lang;const P=COUNTRIES.filter(c=>set.cont==="all"||c.continent===set.cont);
  const sh=a=>a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
  const x=P[Math.floor(Math.random()*P.length)];const val=c=>set.type==="cap"?c.cap[l]:c[l];
  const near=COUNTRIES.filter(c=>c!==x&&c.continent===x.continent&&val(c)!==val(x));
  const opts=sh([val(x),...sh(near).slice(0,3).map(val)]);
  const UL=(document.documentElement.lang||"en").slice(0,2);
  const sub=set.type==="cap"?{en:"Capital?",fr:"Capitale ?",de:"Hauptstadt?"}:{en:"Which country?",fr:"Quel pays ?",de:"Welches Land?"};
  return {q:set.type==="cap"?x[l]:x.cap[l],sub:sub[UL]||sub.en,opts,ans:opts.indexOf(val(x))}}};

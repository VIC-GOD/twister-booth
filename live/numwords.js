// Numbers written out in words: English, French (France, Belgium, Switzerland), German, Portuguese (Portugal, Brazil).
window.NUMW=(function(){
 // ---------- English ----------
 const enU=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
 const enT=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
 function en99(n){return n<20?enU[n]:enT[Math.floor(n/10)]+(n%10?"-"+enU[n%10]:"")}
 function en999(n){const h=Math.floor(n/100),r=n%100;return(h?enU[h]+" hundred"+(r?" and ":""):"")+(r||!h?en99(r):"")}
 function en(n){if(n===0)return"zero";const parts=[];const sc=[[1e9,"billion"],[1e6,"million"],[1e3,"thousand"]];
  for(const [v,w] of sc){if(n>=v){parts.push(en999(Math.floor(n/v))+" "+w);n%=v}}
  if(n){parts.push((parts.length&&n<100?"and ":"")+en999(n))}return parts.join(" ")}
 // ---------- French ----------
 const frU=["zéro","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize"];
 function fr99(n,v){if(n<17)return frU[n];if(n<20)return"dix-"+frU[n-10];
  const t=Math.floor(n/10),u=n%10;
  const T={2:"vingt",3:"trente",4:"quarante",5:"cinquante",6:"soixante"};
  if(t<=6)return T[t]+(u===1?" et un":u?"-"+frU[u]:"");
  if(t===7){if(v==="be"||v==="ch")return"septante"+(u===1?" et un":u?"-"+frU[u]:"");return"soixante"+(u===1?" et onze":"-"+fr99(10+u))}
  if(t===8){if(v==="ch")return"huitante"+(u===1?" et un":u?"-"+frU[u]:"");return"quatre-vingt"+(u?"-"+frU[u]:"s")}
  if(v==="be"||v==="ch")return"nonante"+(u===1?" et un":u?"-"+frU[u]:"");return"quatre-vingt-"+fr99(10+u)}
 function fr999(n,v,final){const h=Math.floor(n/100),r=n%100;let s="";
  if(h)s=(h>1?frU[h]+" ":"")+"cent"+(h>1&&!r&&final?"s":"");
  if(r){let w=fr99(r,v);if(!final&&w.endsWith("quatre-vingts"))w=w.slice(0,-1);s+=(s?" ":"")+w}
  return s||"zéro"}
 function fr(n,v){if(n===0)return"zéro";const out=[];
  const b=Math.floor(n/1e9),m=Math.floor(n/1e6)%1000,k=Math.floor(n/1e3)%1000,r=n%1000;
  if(b)out.push(fr999(b,v,true)+" milliard"+(b>1?"s":""));
  if(m)out.push(fr999(m,v,true)+" million"+(m>1?"s":""));
  if(k)out.push(k===1?"mille":fr999(k,v,false)+" mille");
  if(r)out.push(fr999(r,v,true));return out.join(" ")}
 // ---------- German ----------
 const deU=["null","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn","elf","zwölf","dreizehn","vierzehn","fünfzehn","sechzehn","siebzehn","achtzehn","neunzehn"];
 const deT=["","","zwanzig","dreißig","vierzig","fünfzig","sechzig","siebzig","achtzig","neunzig"];
 function de99(n,inner){if(n===1)return inner?"ein":"eins";if(n<20)return deU[n];const u=n%10,t=Math.floor(n/10);return(u?(u===1?"ein":deU[u])+"und":"")+deT[t]}
 function de999(n,inner){const h=Math.floor(n/100),r=n%100;return(h?(h===1?"ein":deU[h])+"hundert":"")+(r?de99(r,inner||!!h&&false):"")}
 function de(n){if(n===0)return"null";const out=[];const b=Math.floor(n/1e9),m=Math.floor(n/1e6)%1000,k=Math.floor(n/1e3)%1000,r=n%1000;
  if(b)out.push(b===1?"eine Milliarde":de999(b)+" Milliarden");
  if(m)out.push(m===1?"eine Million":de999(m)+" Millionen");
  let tail="";if(k)tail+=(k===1?"ein":de999(k,true))+"tausend";if(r)tail+=de999(r);if(tail)out.push(tail);return out.join(" ")}
 // ---------- Portuguese ----------
 const ptU=["zero","um","dois","três","quatro","cinco","seis","sete","oito","nove","dez","onze","doze","treze","catorze","quinze","dezasseis","dezassete","dezoito","dezanove"];
 const ptBR={14:"quatorze",16:"dezesseis",17:"dezessete",19:"dezenove"};
 const ptT=["","","vinte","trinta","quarenta","cinquenta","sessenta","setenta","oitenta","noventa"];
 const ptH=["","cento","duzentos","trezentos","quatrocentos","quinhentos","seiscentos","setecentos","oitocentos","novecentos"];
 function pt99(n,br){if(n<20)return(br&&ptBR[n])||ptU[n];const u=n%10;return ptT[Math.floor(n/10)]+(u?" e "+((br&&ptBR[u])||ptU[u]):"")}
 function pt999(n,br){if(n===100)return"cem";const h=Math.floor(n/100),r=n%100;return(h?ptH[h]:"")+(h&&r?" e ":"")+(r?pt99(r,br):"")}
 function pt(n,br){if(n===0)return"zero";const groups=[];const b=Math.floor(n/1e9),m=Math.floor(n/1e6)%1000,k=Math.floor(n/1e3)%1000,r=n%1000;
  if(b)groups.push([b===1?(br?"um bilhão":"mil milhões"):pt999(b,br)+(br?" bilhões":" mil milhões"),b*1e9]);
  if(m)groups.push([m===1?"um milhão":pt999(m,br)+" milhões",m*1e6]);
  if(k)groups.push([k===1?"mil":pt999(k,br)+" mil",k*1e3]);
  if(r)groups.push([pt999(r,br),r]);
  let s="";groups.forEach((g,i)=>{if(i===0){s=g[0];return}const last=i===groups.length-1,v=g[1];s+=(last&&(v<100||v%100===0)?" e ":" ")+g[0]});return s}
 // ---------- dispatch ----------
 function int(n,L){switch(L){case"en":return en(n);case"fr":return fr(n);case"frbe":return fr(n,"be");case"frch":return fr(n,"ch");case"de":return de(n);case"pt":return pt(n,false);case"ptbr":return pt(n,true)}return String(n)}
 function year(y,L){if(L==="en"){if(y>=2000&&y<2010)return"two thousand"+(y%100?" and "+enU[y%100]:"");const a=Math.floor(y/100),b=y%100;if(y>=1100&&y<2100&&!(y%1000===0))return en99(a)+" "+(b===0?"hundred":b<10?"oh "+enU[b]:en99(b));return en(y)}
  if(L==="de"&&y>=1100&&y<2000){const a=Math.floor(y/100),b=y%100;return deU[a]+"hundert"+(b?de99(b):"")}
  return int(y,L)}
 const POINT={en:"point",fr:"virgule",frbe:"virgule",frch:"virgule",de:"Komma",pt:"vírgula",ptbr:"vírgula"};
 const PCT={en:"per cent",fr:"pour cent",frbe:"pour cent",frch:"pour cent",de:"Prozent",pt:"por cento",ptbr:"por cento"};
 function dec(x,L){const [a,b]=String(x).split(".");if(!b)return int(+a,L);const dig=(L==="en"||L==="de")?b.split("").map(d=>int(+d,L)).join(" "):(b.length<=2&&b[0]!=="0"?int(+b,L):b.split("").map(d=>int(+d,L)).join(" "));return int(+a,L)+" "+POINT[L]+" "+dig}
 function pct(x,L){return dec(x,L)+" "+PCT[L]}
 return{int,year,dec,pct};
})();

// Lists every [lang, text] the question voice can read, for generating a voice pack (voice/index.json).
// Usage: node tools/voice-texts.js > /tmp/voice-texts.json
global.window={};global.document={};
const R=__dirname+"/../";require(R+"content/data.js");require(R+"live/vocab.js");require(R+"content/pt.js");
const C=window.CONTENT,out=new Map(),add=(l,t)=>{t=String(t||"").replace(/[“”?]/g,"").trim();if(t&&t!=="—")out.set(l+"|"+t.toLowerCase(),[l,t])};
const LI={en:0,fr:1,de:2,pt:4},AX={en:1,fr:3,de:5,pt:8};
for(const L of ["en","fr","de","pt"]){
 C.CP.COUNTRIES.forEach(c=>{add(L,c[L]);add(L,c.cap[L])});
 C.ID.IDIOMS.forEach(i=>add(L,i[L]));
 window.VOCAB.forEach(v=>add(L,v[LI[L]]));
 C.BG.ACRONYMS.forEach(a=>add(L,a[AX[L]]));
 C.BG.LADDERS.filter(x=>x[0]===L.toUpperCase()).forEach(x=>add(L,x[1]));}
console.log(JSON.stringify([...out.values()]));

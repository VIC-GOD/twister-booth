/* Voice pack: plays recorded clips instead of the device voice.
   Two sources:
   1. voice/index.json on the site = {name, files:{"<lang>|<normalised text>":"<lang>/<file>.mp3"}} (a generated pack).
   2. Clips the player recorded on this device in My Voice (../myvoice/), kept in IndexedDB "twb-voice".
   VP.speak(parts) takes [[text,lang],...] and returns true when it plays the question from a pack,
   false when the caller should fall back to speechSynthesis. */
(function(){
const base=(document.currentScript&&document.currentScript.src||"").replace(/live\/voicepack\.js.*$/,"");
const VP={ready:false,name:"",files:{},local:new Set(),on:true,audio:null,url:null};
try{VP.on=localStorage.getItem("twb-myvoice")!=="0"}catch(e){}
VP.key=(t,l)=>(l||"en").slice(0,2)+"|"+String(t||"").replace(/[“”"?¿!¡.:]/g,"").replace(/\s+/g," ").trim().toLowerCase();
VP.has=(t,l)=>{const k=VP.key(t,l);return VP.local.has(k)||!!VP.files[k]};
// ---- IndexedDB store for recorded clips ----
let dbp=null;
VP.db=()=>dbp||(dbp=new Promise((res,rej)=>{if(!window.indexedDB)return rej(new Error("no idb"));const r=indexedDB.open("twb-voice",1);
 r.onupgradeneeded=()=>r.result.createObjectStore("clips");r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}));
const tx=(mode,fn)=>VP.db().then(db=>new Promise((res,rej)=>{const t=db.transaction("clips",mode),s=t.objectStore("clips");const r=fn(s);t.oncomplete=()=>res(r&&r.result);t.onerror=()=>rej(t.error)}));
VP.put=(k,blob)=>tx("readwrite",s=>s.put(blob,k)).then(()=>{VP.local.add(k);VP.ready=true});
VP.get=k=>tx("readonly",s=>s.get(k));
VP.del=k=>tx("readwrite",s=>s.delete(k)).then(()=>VP.local.delete(k));
VP.keys=()=>tx("readonly",s=>s.getAllKeys());
VP.clear=()=>tx("readwrite",s=>s.clear()).then(()=>VP.local.clear());
// ---- playback ----
VP.stop=()=>{if(VP.audio){try{VP.audio.pause()}catch(e){}VP.audio=null}if(VP.url){URL.revokeObjectURL(VP.url);VP.url=null}};
VP.pause=()=>{if(VP.audio)try{VP.audio.pause()}catch(e){}};
VP.resume=()=>{if(VP.audio)try{VP.audio.play()}catch(e){}};
const src=k=>VP.local.has(k)?VP.get(k).then(b=>b?(VP.url=URL.createObjectURL(b)):null):Promise.resolve(VP.files[k]?base+"voice/"+VP.files[k]:null);
VP.speak=(parts,onend)=>{if(!VP.on||!parts||!parts.length)return false;
 const main=parts[parts.length-1];if(!VP.has(main[0],main[1]))return false;
 const q=parts.filter(p=>VP.has(p[0],p[1])).map(p=>VP.key(p[0],p[1]));
 VP.stop();try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}
 let i=0;const my={};VP.cur=my;
 const next=()=>{if(VP.cur!==my)return;if(VP.url){URL.revokeObjectURL(VP.url);VP.url=null}if(i>=q.length){VP.audio=null;onend&&onend();return}
  src(q[i++]).then(u=>{if(VP.cur!==my)return;if(!u)return next();const a=new Audio(u);VP.audio=a;a.onended=next;a.onerror=next;a.play().catch(next)}).catch(next)};
 next();return true};
VP.set=on=>{VP.on=on;try{localStorage.setItem("twb-myvoice",on?"1":"0")}catch(e){}if(!on)VP.stop()};
VP.load=Promise.all([
 fetch(base+"voice/index.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(j&&j.files){VP.files=j.files;VP.name=j.name||""}}).catch(()=>{}),
 VP.keys().then(ks=>(ks||[]).forEach(k=>VP.local.add(k))).catch(()=>{})
]).then(()=>VP.ready=VP.local.size>0||Object.keys(VP.files).length>0);
window.VP=VP;
})();

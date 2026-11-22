/* Voice pack: plays pre-recorded clips (e.g. the coach's cloned voice) instead of the device voice.
   voice/index.json = {name, files:{"<lang>|<normalised text>":"<lang>/<file>.mp3"}}.
   VP.speak(parts) takes [[text,lang],...]. It returns true when it played the question from the pack,
   false when the caller should fall back to speechSynthesis. */
(function(){
const base=(document.currentScript&&document.currentScript.src||"").replace(/live\/voicepack\.js.*$/,"");
const VP={ready:false,name:"",files:{},on:true,audio:null};
try{VP.on=localStorage.getItem("twb-myvoice")!=="0"}catch(e){}
VP.key=(t,l)=>(l||"en").slice(0,2)+"|"+String(t||"").replace(/[“”"?¿!¡.:]/g,"").replace(/\s+/g," ").trim().toLowerCase();
VP.has=(t,l)=>!!VP.files[VP.key(t,l)];
VP.stop=()=>{if(VP.audio){try{VP.audio.pause()}catch(e){}VP.audio=null}};
VP.pause=()=>{if(VP.audio)try{VP.audio.pause()}catch(e){}};
VP.resume=()=>{if(VP.audio)try{VP.audio.play()}catch(e){}};
VP.speak=(parts,onend)=>{if(!VP.ready||!VP.on||!parts||!parts.length)return false;
 const main=parts[parts.length-1];if(!VP.has(main[0],main[1]))return false;
 const q=parts.filter(p=>VP.has(p[0],p[1])).map(p=>base+"voice/"+VP.files[VP.key(p[0],p[1])]);
 VP.stop();try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}
 let i=0;const next=()=>{if(i>=q.length){VP.audio=null;onend&&onend();return}const a=new Audio(q[i++]);VP.audio=a;a.onended=next;a.onerror=next;a.play().catch(next)};next();return true};
VP.set=on=>{VP.on=on;try{localStorage.setItem("twb-myvoice",on?"1":"0")}catch(e){}if(!on)VP.stop()};
VP.load=fetch(base+"voice/index.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(j&&j.files){VP.files=j.files;VP.name=j.name||"";VP.ready=true}return VP.ready}).catch(()=>false);
window.VP=VP;
})();

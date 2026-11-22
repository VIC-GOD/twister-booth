// Music, sound effects and vibration for the games. Everything is synthesised in the browser (no audio files).
window.SFX=(function(){
 let ctx=null,master=null,musicGain=null,timer=0,step=0,song=null,nextT=0;
 let on={music:true,sound:true};try{Object.assign(on,JSON.parse(localStorage.getItem("twb-audio")||"{}"))}catch(e){}
 const save=()=>{try{localStorage.setItem("twb-audio",JSON.stringify(on))}catch(e){}};
 function ac(){if(!ctx){const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;ctx=new A();master=ctx.createGain();master.gain.value=.7;master.connect(ctx.destination);
   musicGain=ctx.createGain();musicGain.gain.value=.22;musicGain.connect(master)}if(ctx.state==="suspended")ctx.resume();return ctx}
 const hz=n=>440*Math.pow(2,(n-69)/12);
 function tone(n,t,d,type,vol,dest,slide){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type||"square";o.frequency.setValueAtTime(hz(n),t);if(slide)o.frequency.linearRampToValueAtTime(hz(n+slide),t+d);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(dest||master);o.start(t);o.stop(t+d+.02)}
 function noise(t,d,vol,hp){const b=ctx.createBuffer(1,ctx.sampleRate*d,ctx.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;
  const s=ctx.createBufferSource(),g=ctx.createGain(),f=ctx.createBiquadFilter();f.type="highpass";f.frequency.value=hp||6000;s.buffer=b;g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(musicGain);s.start(t)}
 // Songs: chord roots, bass pattern, lead scale, tempo.
 const SONGS={
  run:{bpm:132,chords:[57,53,48,55],lead:[0,3,5,7,10,12],bass:"x.x.x.xx",drum:"k.h.s.h.k.k.s.h.",leadType:"square"},
  calm:{bpm:96,chords:[60,57,53,55],lead:[0,2,4,7,9,12],bass:"x...x...",drum:"k...s...k...s...",leadType:"triangle"},
  quiz:{bpm:116,chords:[62,58,53,60],lead:[0,2,3,5,7,10],bass:"x.x.x.x.",drum:"k.h.s.hhk.h.s.h.",leadType:"square"}};
 let seedL=1;const rl=()=>{seedL=(seedL*16807)%2147483647;return seedL/2147483647};
 function sched(){if(!song||!ctx)return;const spb=60/song.bpm/4;while(nextT<ctx.currentTime+.25){const bar=Math.floor(step/16)%4,s16=step%16,root=song.chords[bar];
   if(song.bass[s16%8]==="x")tone(root-24,nextT,spb*1.6,"triangle",.5,musicGain);
   const d=song.drum[s16];if(d==="k")tone(36,nextT,.12,"sine",.9,musicGain,-12);else if(d==="s")noise(nextT,.09,.35,2500);else if(d==="h")noise(nextT,.03,.12,8000);
   if(s16%4===0)[0,4,7].forEach(i=>tone(root+i,nextT,spb*3.5,"sawtooth",.05,musicGain));
   if(s16%2===0&&rl()<.55){const n=root+12+song.lead[Math.floor(rl()*song.lead.length)]-(bar%2?0:0);tone(n,nextT,spb*1.8,song.leadType,.09,musicGain)}
   nextT+=spb;step++}}
 function music(name){if(!on.music){stop();return}if(!ac())return;if(song===SONGS[name]&&timer)return;stop();song=SONGS[name]||SONGS.run;step=0;seedL=7;nextT=ctx.currentTime+.05;timer=setInterval(sched,60);sched()}
 function stop(){clearInterval(timer);timer=0;song=null}
 function vib(p){try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}}
 const fx={
  ok(){vib(30);if(!on.sound||!ac())return;const t=ctx.currentTime;tone(76,t,.12,"square",.18);tone(83,t+.08,.22,"square",.18)},
  bad(){vib([90,50,140]);if(!on.sound||!ac())return;const t=ctx.currentTime;tone(52,t,.18,"sawtooth",.22,master,-3);tone(47,t+.16,.35,"sawtooth",.22,master,-5)},
  combo(){vib(40);if(!on.sound||!ac())return;const t=ctx.currentTime;[72,76,79,84].forEach((n,i)=>tone(n,t+i*.06,.14,"square",.15))},
  win(){vib([60,40,60,40,200]);if(!on.sound||!ac())return;const t=ctx.currentTime;[60,64,67,72,67,72,76].forEach((n,i)=>tone(n,t+i*.11,i===6?.6:.16,"square",.17))},
  over(){vib([200,80,300]);if(!on.sound||!ac())return;const t=ctx.currentTime;[67,63,60,55].forEach((n,i)=>tone(n,t+i*.18,i===3?.6:.2,"triangle",.25))},
  tick(){if(!on.sound||!ac())return;tone(88,ctx.currentTime,.05,"square",.08)},
  move(){if(!on.sound||!ac())return;tone(70,ctx.currentTime,.04,"triangle",.07,master,5)}};
 function set(k,v){on[k]=v;save();if(k==="music"&&!v)stop()}
 return Object.assign({music,stop,set,get:k=>on[k],unlock:ac},fx);
})();

// Twister Booth live rooms over WebRTC (PeerJS). Same shape as the room API the page already uses.
window.TWROOM=(function(){
 const PFX="twisterbooth-v1-";
 function make(peer,myId,isHost){
  const cbs=new Set();let list=[];let me={};const conns=new Map();const pres=new Map();let hostConn=null;let closed=false;
  const fire=()=>{const ch={peers:list};setTimeout(()=>cbs.forEach(f=>{try{f(ch)}catch(e){}}),0)};
  const setList=l=>{list=Object.freeze(l.map(x=>Object.freeze({peer:x.id,by:null,isMe:x.id===myId,sameTab:x.id===myId,kind:"viewer",guest:false,presence:Object.freeze(Object.assign({},x.p||{})),updatedAt:Date.now()})));fire()};
  const hostList=()=>[{id:myId,p:me}].concat([...pres].map(([id,p])=>({id,p})));
  const broadcast=()=>{const l=hostList();const msg={t:"l",l};conns.forEach(c=>{try{c.send(msg)}catch(e){}});setList(l)};
  if(isHost){peer.on("connection",c=>{c.on("open",()=>{conns.set(c.peer,c);c.send({t:"l",l:hostList()})});
    c.on("data",d=>{if(d&&d.t==="p"&&d.p&&typeof d.p==="object"&&JSON.stringify(d.p).length<4096){pres.set(c.peer,d.p);broadcast()}});
    const gone=()=>{conns.delete(c.peer);pres.delete(c.peer);broadcast()};c.on("close",gone);c.on("error",gone)});}
  const api={name:myId,
   presence(patch){for(const k in patch){if(patch[k]===null)delete me[k];else me[k]=JSON.parse(JSON.stringify(patch[k]))}
    if(isHost)broadcast();else if(hostConn&&hostConn.open){hostConn.send({t:"p",p:me});setList(list.map(x=>({id:x.peer,p:x.peer===myId?me:x.presence})))}
    return Promise.resolve()},
   peers(){return list},
   onPeers(f){cbs.add(f);setTimeout(()=>f({peers:list}),0);return()=>cbs.delete(f)},
   emit(){return Promise.resolve()},on(){return()=>{}},connected(){return !closed},onConnection(){return()=>{}},
   leave(){closed=true;try{peer.destroy()}catch(e){}return Promise.resolve()},
   _setHostConn(c){hostConn=c;c.on("data",d=>{if(d&&d.t==="l"&&Array.isArray(d.l))setList(d.l)});
    const gone=()=>{setList([{id:myId,p:me}])};c.on("close",gone);c.on("error",gone)}};
  setList([{id:myId,p:me}]);return api}
 function join(name,isHost){const code=String(name).replace(/[^a-z0-9-]/g,"");const opts=window.TW_PEER_OPTS||{};
  return new Promise((resolve,reject)=>{let done=false;const fail=e=>{if(!done){done=true;reject(e)}};setTimeout(()=>fail(new Error("timeout")),15000);
   if(isHost){const peer=new Peer(PFX+code,opts);peer.on("open",id=>{if(done)return;done=true;resolve(make(peer,id,true))});peer.on("error",e=>{fail(e)});}
   else{const peer=new Peer(undefined,opts);peer.on("error",e=>fail(e));peer.on("open",id=>{const c=peer.connect(PFX+code,{reliable:true});
     c.on("open",()=>{if(done)return;done=true;const r=make(peer,id,false);r._setHostConn(c);resolve(r)});c.on("error",fail)})}})}
 return {join};
})();

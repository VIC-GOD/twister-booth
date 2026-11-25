// node tools/check-synonyms.js : fails if a word appears twice in the same language of content/synonyms.js
global.window={};require("../content/synonyms.js");
const norm=s=>s.toLowerCase().replace(/^(the|le|la|les|der|die|das|o|a|os|as)\s+/,"").replace(/^(l'|s'|se |sich )/,"").replace(/-se$/,"").replace(/^(l'|s'|se )/,"").trim();
let bad=0,n=0;
for(const l of ["en","fr","de","pt"]){const seen={};
 for(const c of window.SYN){const all=[c[l].w,...c[l].syn,...c[l].ant];
  if(c[l].syn.length<4){console.log(l,"short syn",c[l].w);bad++}
  if(!!c.en.ant.length!==!!c[l].ant.length){console.log(l,"antonym mismatch",c[l].w);bad++}
  for(const w of all){n++;const k=norm(w);if(seen[k]){console.log(`${l}: "${w}" in "${c[l].w}" and "${seen[k]}"`);bad++}else seen[k]=c[l].w}}}
console.log(window.SYN.length,"concepts,",n,"words,",bad,"problems");process.exit(bad?1:0);

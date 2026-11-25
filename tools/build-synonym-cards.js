// node tools/build-synonym-cards.js OUTDIR  -> writes one HTML per edition; print each with Chrome to A4 PDF.
global.window={};require("../content/synonyms.js");
const fs=require("fs"),path=require("path");const OUT=process.argv[2]||"/tmp/ww";fs.mkdirSync(OUT,{recursive:true});
const {SYN,SYNCATS}=window;const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ED=[{id:"English",langs:["en"],ui:"en",ed:"ENGLISH EDITION",short:"English"},{id:"Francais",langs:["fr"],ui:"fr",ed:"ÉDITION FRANÇAISE",short:"Français"},
 {id:"Deutsch",langs:["de"],ui:"de",ed:"DEUTSCHE AUSGABE",short:"Deutsch"},{id:"FR-EN",langs:["fr","en"],ui:"en",ed:"FRENCH–ENGLISH EDITION",short:"FR–EN"},{id:"FR-DE",langs:["fr","de"],ui:"en",ed:"FRENCH–GERMAN EDITION",short:"FR–DE"}];
const U={
 en:{cards:"CARDS",lead:n=>`${n} word-group cards. Each card gives a key word, four synonyms and, where there is one, its opposites. Built for interpreters who must never get stuck on one word. For 1 to 10 players.`,
  ways:[["Solo","Cover the card except the key word. Say three synonyms and one opposite out loud, then check. Put the cards you missed back in the pile."],
   ["Pairs: booth drill","Your partner says a sentence with the key word. Repeat it at once with a synonym instead (in a two-language deck, interpret it and vary the word)."],
   ["Group: describe it","One player explains the key word without saying any word printed on the card. The first to name it wins the card."],
   ["Combine with Open Floor","Draw a topic card and three Word Web cards. Speak for two minutes and use a synonym of each key word, never the key word itself."]],
  cat:"CATEGORIES",syn:"Synonyms",ant:"Opposites",
  pr:"BEFORE YOU PRINT",prh:"How to print this deck",prl:["Print on A4, <b>double-sided, flip on long edge, at 100% / actual size</b>.","Each card sheet is followed by its backs page, so every card gets the same back.","Thicker paper (160 to 250 g/m²) makes the cards easier to shuffle.","Cut along the dashed lines on the front side. Every card is 90 × 64 mm, 8 per sheet.","Cards with no opposite are linking words and nouns: use them for the synonym games."],back:"This is the card back.",
  cp:"COMPETITIVE PLAY",cph:"Five ways to compete",cpl:"For 2 to 10 players. Keep score with the point tokens on the next page. First to 10 points wins, or play a fixed number of rounds.",
  games:[["1 · Synonym race","The reader says only the key word. The first player to give a correct synonym takes the card (+1). A word printed on the card or one the group accepts both count."],
   ["2 · Opposite flip","The reader says the key word. The first to give its opposite scores +1. Giving a synonym by mistake costs −1. Skip cards with no opposite."],
   ["3 · Three ways in ten seconds","The player on turn says three different synonyms in ten seconds: +1 for each. Repeating a word already said this game: the repeat token (−1)."],
   ["4 · Odd one out","The reader reads three synonyms from one card and one word from another card, in any order. The first to name the intruder scores +1, a wrong guess −1."],
   ["5 · Rephrase relay","The first player says a sentence with the key word. Each next player repeats it with a new synonym. Whoever gets stuck or repeats a word is out of the round; the last one standing scores +2."]],
  tk:"Point tokens",tkl:"Cut out and keep in an envelope. +1 and +2 are points, −1 is the repeat penalty, the star goes to the round champion.",rep:"REPEAT",champ:"CHAMPION",sub:"SYNONYMS · ANTONYMS"},
 fr:{cards:"CARTES",lead:n=>`${n} cartes de familles de mots. Chaque carte donne un mot clé, quatre synonymes et, quand il existe, ses contraires. Pour les interprètes qui ne doivent jamais rester bloqués sur un mot. De 1 à 10 joueurs.`,
  ways:[["Seul","Cachez la carte sauf le mot clé. Dites trois synonymes et un contraire à voix haute, puis vérifiez. Remettez les cartes ratées dans la pioche."],
   ["À deux : exercice de cabine","Votre partenaire dit une phrase avec le mot clé. Répétez-la aussitôt avec un synonyme à la place."],
   ["En groupe : faites deviner","Un joueur explique le mot clé sans dire aucun mot imprimé sur la carte. Le premier qui le trouve gagne la carte."],
   ["Avec Sujet libre","Tirez une carte sujet et trois cartes Word Web. Parlez deux minutes en utilisant un synonyme de chaque mot clé, jamais le mot clé lui-même."]],
  cat:"CATÉGORIES",syn:"Synonymes",ant:"Contraires",
  pr:"AVANT D'IMPRIMER",prh:"Comment imprimer ce jeu",prl:["Imprimez en A4, <b>recto verso, retournement bord long, à 100 % / taille réelle</b>.","Chaque planche de cartes est suivie de sa page de dos : toutes les cartes ont le même dos.","Un papier épais (160 à 250 g/m²) rend les cartes plus faciles à mélanger.","Découpez le long des pointillés côté recto. Chaque carte mesure 90 × 64 mm, 8 par planche.","Les cartes sans contraire sont des mots de liaison et des noms : utilisez-les pour les jeux de synonymes."],back:"Voici le dos des cartes.",
  cp:"JEU EN COMPÉTITION",cph:"Cinq façons de s'affronter",cpl:"De 2 à 10 joueurs. Comptez les points avec les jetons de la page suivante. Le premier à 10 points gagne, ou jouez un nombre fixe de manches.",
  games:[["1 · La course aux synonymes","Le lecteur dit seulement le mot clé. Le premier qui donne un synonyme correct prend la carte (+1). Un mot imprimé sur la carte ou accepté par le groupe compte."],
   ["2 · Le contraire","Le lecteur dit le mot clé. Le premier qui donne son contraire marque +1. Donner un synonyme par erreur coûte −1. Passez les cartes sans contraire."],
   ["3 · Trois façons en dix secondes","Le joueur dont c'est le tour dit trois synonymes différents en dix secondes : +1 pour chacun. Répéter un mot déjà dit dans la partie : jeton répétition (−1)."],
   ["4 · L'intrus","Le lecteur lit trois synonymes d'une carte et un mot d'une autre carte, dans n'importe quel ordre. Le premier qui nomme l'intrus marque +1, une erreur −1."],
   ["5 · Le relais de reformulation","Le premier joueur dit une phrase avec le mot clé. Chaque joueur suivant la répète avec un nouveau synonyme. Celui qui bloque ou répète un mot sort de la manche ; le dernier en lice marque +2."]],
  tk:"Jetons de points",tkl:"Découpez-les et rangez-les dans une enveloppe. +1 et +2 sont des points, −1 est la pénalité de répétition, l'étoile va au champion de la manche.",rep:"RÉPÉTITION",champ:"CHAMPION",sub:"SYNONYMES · ANTONYMES"},
 de:{cards:"KARTEN",lead:n=>`${n} Wortgruppen-Karten. Jede Karte nennt ein Schlüsselwort, vier Synonyme und, wo es eines gibt, das Gegenteil. Für Dolmetscher, die nie an einem Wort hängen bleiben dürfen. Für 1 bis 10 Spieler.`,
  ways:[["Allein","Die Karte bis auf das Schlüsselwort abdecken. Drei Synonyme und ein Gegenteil laut sagen, dann prüfen. Verpasste Karten zurück in den Stapel."],
   ["Zu zweit: Kabinenübung","Ihr Partner sagt einen Satz mit dem Schlüsselwort. Wiederholen Sie ihn sofort mit einem Synonym an seiner Stelle."],
   ["In der Gruppe: umschreiben","Eine Person erklärt das Schlüsselwort, ohne ein Wort von der Karte zu sagen. Wer es zuerst nennt, gewinnt die Karte."],
   ["Mit Freie Rede","Eine Themenkarte und drei Word-Web-Karten ziehen. Zwei Minuten sprechen und für jedes Schlüsselwort ein Synonym verwenden, nie das Wort selbst."]],
  cat:"KATEGORIEN",syn:"Synonyme",ant:"Gegenteile",
  pr:"VOR DEM DRUCKEN",prh:"So drucken Sie dieses Spiel",prl:["Auf A4 drucken, <b>beidseitig, an der langen Kante spiegeln, 100 % / tatsächliche Größe</b>.","Auf jeden Kartenbogen folgt seine Rückseiten-Seite, so haben alle Karten dieselbe Rückseite.","Dickeres Papier (160 bis 250 g/m²) lässt sich besser mischen.","Auf der Vorderseite entlang der gestrichelten Linien schneiden. Jede Karte misst 90 × 64 mm, 8 pro Bogen.","Karten ohne Gegenteil sind Bindewörter und Nomen: nutzen Sie sie für die Synonymspiele."],back:"Das ist die Kartenrückseite.",
  cp:"WETTKAMPF",cph:"Fünf Spiele gegeneinander",cpl:"Für 2 bis 10 Spieler. Punkte mit den Spielmarken auf der nächsten Seite zählen. Wer zuerst 10 Punkte hat, gewinnt, oder eine feste Zahl an Runden spielen.",
  games:[["1 · Synonym-Wettlauf","Der Vorleser sagt nur das Schlüsselwort. Wer zuerst ein richtiges Synonym nennt, bekommt die Karte (+1). Wörter auf der Karte und von der Gruppe akzeptierte Wörter zählen."],
   ["2 · Gegenteil","Der Vorleser sagt das Schlüsselwort. Wer zuerst das Gegenteil nennt, erhält +1. Ein Synonym aus Versehen kostet −1. Karten ohne Gegenteil überspringen."],
   ["3 · Dreimal in zehn Sekunden","Wer dran ist, nennt in zehn Sekunden drei verschiedene Synonyme: +1 für jedes. Ein Wort wiederholen, das im Spiel schon fiel: Wiederholungsmarke (−1)."],
   ["4 · Was passt nicht?","Der Vorleser liest drei Synonyme einer Karte und ein Wort einer anderen Karte in beliebiger Reihenfolge. Wer zuerst den Eindringling nennt, erhält +1, ein Fehler −1."],
   ["5 · Umformulier-Staffel","Die erste Person sagt einen Satz mit dem Schlüsselwort. Jede nächste wiederholt ihn mit einem neuen Synonym. Wer hängen bleibt oder ein Wort wiederholt, scheidet aus; der Letzte erhält +2."]],
  tk:"Spielmarken",tkl:"Ausschneiden und in einem Umschlag aufbewahren. +1 und +2 sind Punkte, −1 ist die Strafe fürs Wiederholen, der Stern geht an den Rundensieger.",rep:"WIEDERHOLT",champ:"SIEGER",sub:"SYNONYME · ANTONYME"}};
const LAB={en:"EN",fr:"FR",de:"DE"};
const css=`@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;font-family:Inter,sans-serif;color:#16202c;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;padding:22mm 20mm}
.eye{font:500 7.5pt "DejaVu Sans Mono",monospace;letter-spacing:.12em;color:#2a8aa8}h1{font:700 26pt Inter;margin:5mm 0 4mm}h2{font:700 20pt Inter;margin:5mm 0 4mm}
p,li{font-size:9.5pt;line-height:1.55}.ways{display:grid;grid-template-columns:1fr 1fr;gap:6mm 10mm;margin:8mm 0}.ways div{border-top:1.2pt solid #16202c;padding-top:2.5mm}.ways b{font-size:9.5pt}.ways p{margin:1.5mm 0 0;font-size:8.8pt;color:#333}
.cats{display:grid;grid-template-columns:1fr 1fr;gap:2.5mm 10mm;font-size:9pt;margin-top:3mm}.cats i{display:inline-block;width:3mm;height:3mm;border-radius:50%;margin-right:2mm;vertical-align:-.3mm}
.game{border-top:1pt solid #16202c;padding:2.5mm 0 3mm}.game b{font-size:10pt}.game p{margin:1.2mm 0 0;font-size:8.8pt;color:#333}
.tok{display:grid;grid-template-columns:repeat(7,22mm);gap:3mm;margin-top:6mm}.tok div{width:20mm;height:20mm;border-radius:50%;border:1.3pt solid;display:flex;flex-direction:column;align-items:center;justify-content:center;font:700 13pt Inter}.tok small{font:700 4.2pt Inter;letter-spacing:.04em}
.sheet{padding:20.5mm 15mm;display:grid;grid-template-columns:90mm 90mm;grid-template-rows:repeat(4,64mm)}
.card{width:90mm;height:64mm;border:.4pt dashed #9aa3ad;position:relative;padding:5.5mm 5mm 4mm;overflow:hidden}
.card:before{content:"";position:absolute;left:0;right:0;top:0;height:2.6mm;background:var(--c)}
.ch{display:flex;justify-content:space-between;align-items:center;font:700 6pt Inter;letter-spacing:.06em;color:var(--c);text-transform:uppercase}.ch span:last-child{border:.6pt solid #9aa3ad;color:#5b6675;border-radius:3mm;padding:.4mm 2.2mm;font-size:5.4pt}
.blk{margin-top:2.6mm}.hw{font:700 15pt/1.1 Inter}.bi .hw{font-size:12pt}.ln{font-size:8.2pt;line-height:1.35;margin-top:1.2mm;display:flex;gap:1.6mm}.bi .ln{font-size:7.4pt;margin-top:.8mm}
.ln b{flex:none;width:4mm;height:4mm;border-radius:1mm;display:inline-flex;align-items:center;justify-content:center;font:700 7pt Inter;color:#fff}.ln .s{background:#2f7d4f}.ln .a{background:#b8432f}
.tag{display:inline-block;font:700 5.6pt Inter;color:#fff;background:#16202c;border-radius:.8mm;padding:.3mm 1mm;margin-right:1.6mm;vertical-align:2pt}
.mono .hw{font-size:21pt}.mono .blk{margin-top:4mm}.mono .ln{font-size:10.5pt;margin-top:2.4mm;line-height:1.3}.mono .ln b{width:5mm;height:5mm;font-size:8.5pt}
.xl{position:absolute;left:5mm;right:14mm;bottom:3.2mm;font-size:6.6pt;color:#5b6675;border-top:.4pt solid #d5dae1;padding-top:1.4mm}.xl em{font-style:normal;font-weight:700;color:#16202c;margin-right:.8mm}
.num{position:absolute;right:4mm;bottom:2.6mm;font:500 5.5pt "DejaVu Sans Mono";color:#9aa3ad}
.back{width:90mm;height:64mm;background:#123a4f;position:relative;display:flex;align-items:center;gap:5mm;padding-left:8mm;color:#fff}
.back svg{width:30mm;height:30mm;flex:none}.back h3{font:800 15pt/1.05 Inter;margin:0}.back small{display:block;font:500 5.3pt "DejaVu Sans Mono";letter-spacing:.12em;color:#cfe6ef;margin-top:2mm}
.bsheet{padding:20.5mm 15mm;display:grid;grid-template-columns:90mm 90mm;grid-template-rows:repeat(4,64mm);background:#123a4f}`;
const logo=`<svg viewBox="0 0 100 100"><g fill="none" stroke="#f0a640" stroke-width="1.6" opacity=".55"><path d="M50 4V96M4 50H96M17 17L83 83M83 17L17 83"/><circle cx="50" cy="50" r="44"/></g><g fill="none" stroke="#f0a640" stroke-width="2.4"><circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="17"/></g><circle cx="50" cy="50" r="7" fill="#f0a640"/></svg>`;
const backHTML=e=>`<div class="back">${logo}<div><h3>Word<br>Web</h3><small>${U[e.ui].sub}</small><small>${e.ed}</small></div></div>`;
function cardHTML(c,e,n){const u=U[e.ui],k=SYNCATS[c.cat],bi=e.langs.length>1;
 const blk=l=>{const d=c[l];return `<div class="blk"><div class="hw">${bi?`<span class="tag">${LAB[l]}</span>`:""}${esc(d.w)}</div><div class="ln"><b class="s">=</b><span>${esc(d.syn.join(" · "))}</span></div>${d.ant.length?`<div class="ln"><b class="a">≠</b><span>${esc(d.ant.join(" · "))}</span></div>`:""}</div>`};
 return `<div class="card${bi?" bi":" mono"}" style="--c:${k.c}"><div class="ch"><span>${esc(k[e.ui])}</span><span>${c[e.langs[0]].ant.length?u.syn+" · "+u.ant:u.syn}</span></div>${e.langs.map(blk).join("")}${bi?"":`<div class="xl">${["en","fr","de","pt"].filter(l=>l!==e.langs[0]).map(l=>`<em>${l.toUpperCase()}</em>${esc(c[l].w)}`).join(" &nbsp;·&nbsp; ")}</div>`}<div class="num">${n}/${SYN.length}</div></div>`}
function build(e){const u=U[e.ui],cnt={};SYN.forEach(c=>cnt[c.cat]=(cnt[c.cat]||0)+1);const P=[];
 P.push(`<section class="page"><div class="eye">${u.cards} · ${e.ed}</div><h1>Word Web ${e.short}</h1><p>${u.lead(SYN.length)}</p><div class="ways">${u.ways.map(w=>`<div><b>${w[0]}</b><p>${w[1]}</p></div>`).join("")}</div>
  <div class="eye">${u.cat}</div><div class="cats">${Object.entries(SYNCATS).map(([k,v])=>`<div><i style="background:${v.c}"></i>${esc(v[e.ui])} (${cnt[k]})</div>`).join("")}</div></section>`);
 P.push(`<section class="page"><div class="eye">${u.pr}</div><h2>${u.prh}</h2><ol>${u.prl.map(x=>`<li>${x}</li>`).join("")}</ol><div style="margin-top:12mm;border:.5pt dashed #9aa3ad;display:inline-block;padding:4mm">${backHTML(e)}</div><p>${u.back}</p></section>`);
 P.push(`<section class="page"><div class="eye">${u.cp}</div><h2>${u.cph}</h2><p>${u.cpl}</p>${u.games.map(g=>`<div class="game"><b>${g[0]}</b><p>${g[1]}</p></div>`).join("")}</section>`);
 const T=[...Array(28)].map(()=>`<div style="border-color:#1f5e8c;color:#1f5e8c">+1</div>`).concat([...Array(14)].map(()=>`<div style="border-color:#2f7d4f;color:#2f7d4f">+2</div>`),[...Array(17)].map(()=>`<div style="border-color:#b8432f;color:#b8432f">−1<small>${u.rep}</small></div>`),[...Array(4)].map(()=>`<div style="border-color:#a77a12;color:#a77a12">★<small>${u.champ}</small></div>`));
 P.push(`<section class="page"><div class="eye">${u.cp}</div><h2>${u.tk}</h2><p>${u.tkl}</p><div class="tok">${T.join("")}</div></section>`);
 for(let i=0;i<SYN.length;i+=8){const cs=SYN.slice(i,i+8);
  P.push(`<section class="page sheet">${cs.map((c,j)=>cardHTML(c,e,i+j+1)).join("")}</section>`);
  P.push(`<section class="page bsheet">${cs.map(()=>backHTML(e)).join("")}</section>`)}
 return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${P.join("")}</body></html>`}
for(const e of ED){fs.writeFileSync(path.join(OUT,`Word-Web-${e.id}-cards.html`),build(e))}
console.log("written",ED.map(e=>e.id).join(", "));

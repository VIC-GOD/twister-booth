// God Love catalog: languages, games, learning modules and verified video links.
window.GL=window.GL||{};var GL=window.GL;
// st: "full" = content ready, "part" = some content, "soon" = coming soon
GL.LANGS=[
 {k:"fr",n:"Français",st:"full"},{k:"en",n:"English",st:"full"},{k:"de",n:"Deutsch",st:"full"},
 {k:"pt",n:"Português",st:"part"},{k:"es",n:"Español",st:"soon"},{k:"it",n:"Italiano",st:"soon"},
 {k:"ar",n:"العربية",st:"soon"},{k:"zh",n:"中文",st:"soon"},{k:"ru",n:"Русский",st:"soon"},
 {k:"asl",n:"ASL",st:"part",sign:1},{k:"lsf",n:"LSF",st:"soon",sign:1},{k:"dgs",n:"DGS",st:"soon",sign:1}];

// Games, grouped by skill. l = languages the game supports.
GL.SKILLS=[
 {k:"num",i:"🔢",fr:"Chiffres et dates",en:"Numbers and dates",de:"Zahlen und Daten"},
 {k:"voc",i:"📚",fr:"Vocabulaire et expressions",en:"Vocabulary and idioms",de:"Wortschatz und Redewendungen"},
 {k:"ear",i:"🎧",fr:"Écoute, anticipation et traduction à vue",en:"Listening, anticipation and sight translation",de:"Hören, Antizipation und Vom-Blatt-Übersetzen"},
 {k:"spk",i:"🎤",fr:"Prise de parole et diction",en:"Public speaking and diction",de:"Reden und Aussprache"},
 {k:"sign",i:"🤟",fr:"Langue des signes",en:"Sign language",de:"Gebärdensprache"},
 {k:"multi",i:"⚔️",fr:"Duels et multijoueur",en:"Duels and multiplayer",de:"Duelle und Mehrspieler"}];
GL.GAMES=[
 {k:"na",s:"num",i:"🔢",n:"Number Avalanche",u:"numbers/",l:["en","fr","de","pt"],fr:"Chiffres, années, pourcentages : tape-les avant le suivant. Aussi dans l'autre sens, en toutes lettres.",en:"Figures, years and percentages: type them before the next one lands. Also digits to words.",de:"Zahlen, Jahre, Prozente: tippen, bevor die nächste kommt. Auch Ziffern in Worten."},
 {k:"cr",s:"num",i:"🌍",n:"Capital Relay",u:"capitals/",l:["en","fr","de","pt"],fr:"Chaque pays et sa capitale dans tes langues.",en:"Every country and its capital in your languages.",de:"Jedes Land und seine Hauptstadt in Ihren Sprachen."},
 {k:"ff",s:"voc",i:"💣",n:"False Friends Minefield",u:"minefield/",l:["en","fr","de","pt"],fr:"Trouve le vrai sens des faux amis.",en:"Find the true meaning of false friends.",de:"Finden Sie die wahre Bedeutung falscher Freunde."},
 {k:"id",s:"voc",i:"💬",n:"Idiom Booth",u:"idioms/all.html",l:["en","fr","de","asl"],fr:"Expressions idiomatiques et langue de presse.",en:"Idioms and press language.",de:"Redewendungen und Pressesprache."},
 {k:"pv",s:"voc",i:"🦁",n:"Proverb Duel",u:"proverbs/",l:["en","fr","de","pt"],fr:"Le proverbe que les natifs emploient vraiment, y compris des proverbes africains.",en:"The proverb native speakers really use, African proverbs included.",de:"Das Sprichwort, das Muttersprachler wirklich verwenden, auch afrikanische."},
 {k:"mr",s:"voc",i:"⚡",n:"Match Rush",u:"match/",l:["en","fr","de"],fr:"Associe les paires avant la fin du chrono.",en:"Match the pairs before time runs out.",de:"Paare zuordnen, bevor die Zeit abläuft."},
 {k:"rn",s:"voc",i:"🏃",n:"Lane Runner",u:"runner/",l:["en","fr","de","pt"],fr:"Change de couloir vers la bonne réponse.",en:"Switch to the lane with the right answer.",de:"Wechseln Sie auf die Spur mit der richtigen Antwort."},
 {k:"bg",s:"voc",i:"🏋️",n:"Booth Gym",u:"booth-gym/all.html",l:["en","fr","de"],fr:"Sigles, discours chronométrés, dilemmes, registre.",en:"Acronyms, timed speeches, dilemmas, register.",de:"Abkürzungen, Reden auf Zeit, Dilemmata, Register."},
 {k:"sb",s:"ear",i:"🎧",n:"Shadow Boss",u:"shadow/",l:["en","fr","de","pt"],fr:"Shadowing : répète le discours avec un léger décalage.",en:"Shadowing: repeat the speech a few words behind.",de:"Shadowing: die Rede leicht versetzt nachsprechen."},
 {k:"ab",s:"ear",i:"🎲",n:"Anticipation Bet",u:"anticipate/",l:["de","fr","en","pt"],fr:"Devine la fin de la phrase avant le verbe.",en:"Bet on how the sentence ends before the verb.",de:"Wetten Sie auf das Satzende vor dem Verb."},
 {k:"vt",s:"ear",i:"👁️",n:"Vanishing Text",u:"vanish/",l:["en","fr","de","pt"],fr:"Traduction à vue : le texte disparaît de plus en plus vite.",en:"Sight translation: the text vanishes faster and faster.",de:"Vom-Blatt-Übersetzen: der Text verschwindet immer schneller."},
 {k:"tw",s:"spk",i:"👅",n:"Twister Booth",u:"twister/",l:["en","fr","de","asl"],fr:"Virelangues pour la diction et le débit.",en:"Tongue twisters for diction and pace.",de:"Zungenbrecher für Aussprache und Tempo."},
 {k:"fh",s:"spk",i:"🎯",n:"Filler Hunter",u:"filler/",l:["en","fr","de","pt"],fr:"Parle 60 secondes sans « euh ».",en:"Talk for 60 seconds with no “um”.",de:"60 Sekunden ohne „äh“ sprechen."},
 {k:"tp",s:"spk",i:"🗣️",n:"Sujet libre / Open Floor",u:"topics/fr.html",l:["fr","en","de"],uby:{fr:"topics/fr.html",en:"topics/en.html",de:"topics/de.html"},fr:"Tire un sujet et parle pendant un temps donné.",en:"Draw a topic and speak for a set time.",de:"Thema ziehen und frei sprechen."},
 {k:"fs",s:"sign",i:"🤟",n:"Fingerspelling Rush",u:"fingerspell/",l:["asl"],fr:"Lis l'épellation ASL de plus en plus vite.",en:"Read ASL fingerspelling at rising speed.",de:"ASL-Fingeralphabet in steigendem Tempo lesen."},
 {k:"du",s:"multi",i:"⚔️",n:"Live Duel",u:"duel/",l:["en","fr","de","pt"],fr:"Un contre un, en face à face ou en ligne.",en:"One against one, face to face or online.",de:"Eins gegen eins, am Handy oder online."},
 {k:"mc",s:"multi",i:"🐒",n:"Monkey Climb",u:"climb/",l:["en","fr","de"],fr:"Course de quiz contre l'ordinateur ou tes amis.",en:"Quiz race against the computer or friends.",de:"Quiz-Rennen gegen Computer oder Freunde."}];

// Verified EU (DG SCIC / SCICtrain) videos. p = language pair, or "" for general.
const W="https://webcast.ec.europa.eu/";
GL.VIDEOS={
 basics:[["Interpreter training over the centuries",W+"a01dfc715df9621113e91549c0ee7651"],["Performance assessment and training objectives",W+"037a595e6f4f0576a9efe43154d71c18"],["Skills acquisition",W+"skill-acquisition"],["Giving feedback",W+"giving-feedback"],["Self-training",W+"a5fdfa672284da6bf4f4326e2b3698bd"],["Managing stress",W+"managing-stress"],["How important is general knowledge for interpreting?",W+"c4bbac870026694953a91cbd99149a13"]],
 speak:[["Speechmaking",W+"5516adb142fcb18a017c72602abbdb6d"],["Speechmaking brainstorming 1",W+"6aadca7bd86c4743e6724f9607256126"],["Speechmaking brainstorming 2",W+"70f250e2d762fbde8a2e70eabf6eb953"]],
 analysis:[["Prioritising information, part 1",W+"prioritising-information-part-1"],["Prioritising information, part 2",W+"prioritising-information-part-2"],["Consistency and links between ideas",W+"a714ec6796f638ba4d5792f78dccd134"]],
 notes:[["Introduction to note-taking",W+"358f9e7be09177c17d0d17ff73584307"],["Notes, symbols and the notepad, part 1",W+"fe663a72b27bdc613873fbbb512f6f67"],["Notes, symbols and the notepad, part 2",W+"47e338b3c082945eff04de6d65915ade"]],
 consec:[["Why should we learn consecutive?",W+"why-do-we-have-to-learn-consecutive"],
  ["Demo FR→EN: original speech",W+"197838c579c3b78927e0cd15ba4c9689","fr-en"],["Demo FR→EN: interpretation",W+"73d915c91b99b170993ea97d875a6330","fr-en"],["Demo FR→EN: analysis",W+"237168031d88451c78fd8d6d6378c0b2","fr-en"],
  ["Demo EN→FR: original speech",W+"53b354612d26628e73986a80e254864e","en-fr"],["Demo EN→FR: interpretation",W+"9b1c93a6864c39e48417ee486b83c387","en-fr"],["Demo EN→FR: analysis",W+"5cc4bb753030a3d804351b2dfec0d8b5","en-fr"],
  ["Demo DE→EN: original speech",W+"043c2ec6c6390dd0ac5519190a57c88c","de-en"],["Demo DE→EN: interpretation",W+"71e63ef5b7249cfc60852f0e0f5bf4c8","de-en"],["Demo DE→EN: analysis",W+"9ce3c52fc54362e22053399d3181c638","de-en"],
  ["Demo EN→DE: original speech",W+"b294504229c668e750dfcc4ea9617f0a","en-de"],["Demo EN→DE: interpretation",W+"c92383002f757cddd52df84e68894b5e","en-de"],["Demo EN→DE: analysis",W+"c54bc2ded4480856dc9f39bdcf35a3e7","en-de"],
  ["Demo EN→ES: original speech",W+"169be908d18ff83896292dd6de0df58c","en-es"],["Demo EN→ES: interpretation",W+"5648d7fb4f1ea9a69fd10fccacd7d007","en-es"],["Demo EN→ES: analysis",W+"b91a76b0b2fa7ce160212f53f3d2edba","en-es"],
  ["Demo ES→EN: original speech",W+"98c56bce74669e2e4e7a9fc1caa8c326","es-en"],["Demo ES→EN: interpretation",W+"12b668a1ada1828ba795332f419d4ef7","es-en"],["Demo ES→EN: analysis",W+"04fcc65450efcccdc9869442c3e36310","es-en"],
  ["Demo EN→IT: original speech",W+"abebb7c39f4b5e46bbcfab2b565ef32b","en-it"],["Demo EN→IT: interpretation",W+"ef1f4d925a67ffc924862f69f6bb120b","en-it"],["Demo EN→IT: analysis",W+"e562cd9c0768d5464b64cf61da7fc6bb","en-it"],
  ["Demo EN→PT: original speech",W+"demo-consecutive-en-pt-original-speech","en-pt"],["Demo EN→PT: interpretation",W+"demo-consecutive-en-pt-interpreters-perfomance","en-pt"],["Demo EN→PT: analysis",W+"demo-consecutive-en-pt-analysis-by-speaker-and-interpreter","en-pt"]],
 simul:[["Introduction to simultaneous interpretation",W+"90fd4f88f588ae64038134f1eeaa023f"],["Simultaneous interpretation: advanced",W+"simultaneous-interpretation-advanced"],["Simultaneous with text",W+"simultaneous-interpretation-with-text"],
  ["Demo FR→EN: original speech",W+"03a3655fff3e9bdea48de9f49e938e32","fr-en"],["Demo FR→EN: interpretation",W+"7417744a2bac776fabe5a09b21c707a2","fr-en"],["Demo FR→EN: analysis",W+"2c26f9a59b0ba61233e6fc0af8e47f14","fr-en"],
  ["Demo EN→FR: original speech",W+"8c5149362e6e7f7947fd2f578df6b575","en-fr"],["Demo EN→FR: interpretation",W+"1fe46a07a9ba5f05129cab882582d907","en-fr"],["Demo EN→FR: analysis",W+"bc1ad6e8f86c42a371aff945535baebb","en-fr"],
  ["Demo DE→EN: original speech",W+"6e66329891cbb9adb1966e44379cfadf","de-en"],["Demo DE→EN: interpretation",W+"5a7b238ba0f6502e5d6be14424b20ded","de-en"],["Demo DE→EN: analysis",W+"f5ac21cd0ef1b88e9848571aeb53551a","de-en"],
  ["Demo EN→DE: original speech",W+"a3a3e8b30dd6eadfc78c77bb2b8e6b60","en-de"],["Demo EN→DE: interpretation",W+"0aca829c00e4fe15c9523e665f681643","en-de"],["Demo EN→DE: analysis",W+"adad9e1c91a7e0f63a139458941b1c66","en-de"],
  ["Demo IT→EN: original speech",W+"173f0f6bb0ee97cf5098f73ee94029d4","it-en"],["Demo IT→EN: interpretation",W+"a71378c0f8d76dbf90feeecd095d0ed9","it-en"],["Demo IT→EN: analysis",W+"91a4d5c9c78d0de89b38ff408f49f39c","it-en"],
  ["Demo EN→IT: original speech",W+"9f16b57bdd4400066a83cd8eaa151c41","en-it"],["Demo EN→IT: interpretation",W+"c6862d63b17d713ee14f3a405d9fde77","en-it"],["Demo EN→IT: analysis",W+"3c69ccff8acc065aa5618b36b74703de","en-it"],
  ["Demo EN→ES: original speech",W+"f72f78a365657d56853b6867fb37dc3c","en-es"],["Demo EN→ES: interpretation",W+"5fde40544cff0001484ecae2466ce96e","en-es"],["Demo EN→ES: analysis",W+"db5f9f42a7157abe65bb145000b5871a","en-es"],
  ["Demo EN→PT: original speech",W+"demo-simultaneous-en-pt-original-speech","en-pt"],["Demo EN→PT: interpretation",W+"demo-simultaneous-en-pt-interpreters-performance","en-pt"],["Demo EN→PT: analysis",W+"demo-simultaneous-en-pt-analysis-by-speaker-and-interpreter","en-pt"]]};
const SC="https://commission.europa.eu/about/departments-and-executive-agencies/interpretation/interpretation-training-toolbox/scictrain-training-modules-interpreting-students/";
GL.RES={
 speechrepo:["Speech Repository (UE) : plus de 5 000 discours, plus de 30 langues","https://speech-repository.webcloud.ec.europa.eu/"],
 toolbox:["Boîte à outils de formation de la DG Interprétation","https://commission.europa.eu/about/departments-and-executive-agencies/interpretation/interpretation-training-toolbox_en"],
 kc:["Centre de connaissances traduction et interprétation (UE)","https://knowledge-centre-translation-interpretation.ec.europa.eu/en/training-tools-and-support/training-tools"],
 m3:["SCICtrain, module 3 : apprendre à interpréter",SC+"module-3-learning-interpret_en"],
 m5:["SCICtrain, module 5 : consécutive",SC+"module-5-consecutive-interpretation_en"],
 m6:["SCICtrain, module 6 : simultanée",SC+"module-6-simultaneous-interpretation_en"],
 m7:["SCICtrain, module 7 : retour vers la langue B",SC+"module-7-retour-interpretation-b-language_en"],
 m8:["SCICtrain, module 8 : test d'accréditation",SC+"module-8-accreditation-test_en"],
 m9:["SCICtrain, module 9 : conférences simulées",SC+"module-9-mock-conferences-and-other-practice-speeches_en"]};

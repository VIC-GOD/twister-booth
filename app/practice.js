// Translation exercises with detailed correction, and grammar sheets.
// Each item: s/t = source/target language, src = sentence, ans = accepted translations (first = reference),
// why = explanation keyed by an expected target word (lower case): [fr, en].
GL.TR=[
// FR -> EN
{s:"fr",t:"en",src:"La réunion aura lieu lundi prochain à Genève.",ans:["The meeting will take place next Monday in Geneva.","The meeting will be held next Monday in Geneva."],
 why:{monday:["En anglais, les jours de la semaine prennent toujours une majuscule : Monday.","Days of the week always take a capital in English: Monday."],next:["« Lundi prochain » se dit next Monday, sans article ni préposition.","“Lundi prochain” is next Monday, with no article or preposition."],geneva:["Le nom anglais de Genève est Geneva.","The English name of Genève is Geneva."]}},
{s:"fr",t:"en",src:"Le Premier ministre a annoncé une réforme des retraites.",ans:["The Prime Minister announced a pension reform.","The Prime Minister has announced a pension reform.","The Prime Minister announced a reform of pensions."],
 why:{announced:["Le passé composé se rend par le prétérit (announced), ou par le present perfect (has announced) si l'annonce est récente.","The French passé composé becomes the simple past, or the present perfect if the news is recent."],pension:["« Une réforme des retraites » : en anglais, le complément passe devant le nom : a pension reform.","The modifier goes before the noun in English: a pension reform."],prime:["Prime Minister prend des majuscules quand il désigne la fonction précise.","Prime Minister is capitalised when it names the specific office."],minister:["Prime Minister prend des majuscules quand il désigne la fonction précise.","Prime Minister is capitalised when it names the specific office."]}},
{s:"fr",t:"en",src:"Je suis d'accord avec vous.",ans:["I agree with you."],
 why:{agree:["« Être d'accord » se dit to agree. On ne dit jamais *I am agree.","“Être d'accord” is to agree. Never say *I am agree."],i:["Le pronom I s'écrit toujours avec une majuscule, même au milieu d'une phrase.","The pronoun I is always capitalised."]}},
{s:"fr",t:"en",src:"Les Français parlent souvent de politique.",ans:["The French often talk about politics.","French people often talk about politics.","The French often speak about politics."],
 why:{french:["Les nationalités prennent toujours une majuscule en anglais, nom ou adjectif : French.","Nationalities are always capitalised in English, noun or adjective: French."],politics:["La politique (le domaine) se dit politics, avec un s.","Politics as a field is politics, with an s."],often:["Often se place avant le verbe principal : often talk.","Often goes before the main verb: often talk."],about:["Talk about : la préposition about introduit le sujet de conversation.","Talk about takes the preposition about."]}},
{s:"fr",t:"en",src:"Depuis 2015, le chômage a baissé de 3 %.",ans:["Since 2015, unemployment has fallen by 3%.","Since 2015, unemployment has dropped by 3%.","Unemployment has fallen by 3% since 2015.","Since 2015, unemployment has decreased by 3%."],
 why:{has:["Avec since + date, on emploie le present perfect (has fallen), jamais le prétérit seul.","With since + a date, use the present perfect (has fallen)."],by:["Baisser de 3 % : to fall by 3%. La préposition by exprime l'écart.","By expresses the size of the change: fall by 3%."],unemployment:["Le chômage en général : unemployment, sans article.","Unemployment in general takes no article."],"%":["En anglais, pas d'espace avant le signe % : 3%.","No space before % in English: 3%."],since:["Depuis + date = since ; depuis + durée = for.","Since + a point in time; for + a duration."]}},
{s:"fr",t:"en",src:"Il faut que nous agissions maintenant.",ans:["We must act now.","We need to act now.","We have to act now."],
 why:{must:["« Il faut que » + subjonctif se rend par un sujet personnel + must, need to ou have to.","“Il faut que” becomes a personal subject + must, need to or have to."],we:["En anglais, on fait du sujet de la subordonnée (nous) le sujet de la phrase.","The French subordinate subject (nous) becomes the main subject."]}},
// EN -> FR
{s:"en",t:"fr",src:"The conference starts on Tuesday, 4 March.",ans:["La conférence commence le mardi 4 mars.","La conférence débute le mardi 4 mars.","La conférence commence mardi 4 mars."],
 why:{mardi:["En français, les jours de la semaine s'écrivent en minuscule : mardi.","In French, days of the week are lower case: mardi."],mars:["Les mois s'écrivent aussi en minuscule : mars.","Months are lower case too: mars."],le:["Devant une date précise, on met l'article : le mardi 4 mars. Pas de « on ».","Before a full date French uses the article: le mardi 4 mars."],conférence:["Conférence prend un accent aigu sur le premier e.","Conférence has an acute accent."]}},
{s:"en",t:"fr",src:"She speaks English, German and Spanish.",ans:["Elle parle anglais, allemand et espagnol.","Elle parle l'anglais, l'allemand et l'espagnol."],
 why:{anglais:["Les noms de langues s'écrivent en minuscule en français : anglais.","Language names are lower case in French: anglais."],allemand:["Les noms de langues s'écrivent en minuscule en français : allemand.","Language names are lower case in French."],espagnol:["Les noms de langues s'écrivent en minuscule en français : espagnol.","Language names are lower case in French."]}},
{s:"en",t:"fr",src:"The delegates have arrived.",ans:["Les délégués sont arrivés.","Les délégués sont là."],
 why:{sont:["Arriver est un verbe de mouvement : il se conjugue avec être au passé composé.","Arriver takes être in the passé composé."],arrivés:["Avec être, le participe passé s'accorde avec le sujet : les délégués (masculin pluriel) → arrivés.","With être, the past participle agrees with the subject: arrivés."],délégués:["Délégué prend un accent aigu sur les deux premiers e.","Délégué has two acute accents."]}},
{s:"en",t:"fr",src:"Is this seat free?",ans:["Cette place est-elle libre ?","Est-ce que cette place est libre ?","Cette place est libre ?"],
 why:{"est-elle":["Dans l'interrogation avec inversion, on reprend le sujet par un pronom relié par un trait d'union : est-elle.","Inverted questions repeat the subject as a hyphenated pronoun."]}},
{s:"en",t:"fr",src:"The minister's speech was very well received.",ans:["Le discours du ministre a été très bien reçu.","Le discours de la ministre a été très bien reçu.","Le discours du ministre a été très bien accueilli."],
 why:{reçu:["Reçu prend une cédille : devant a, o, u, le c doit être adouci (ç) pour garder le son [s].","Reçu needs a cedilla to keep the [s] sound before u."],été:["Passif au passé composé : a été + participe passé.","Passive in the passé composé: a été + past participle."],du:["Le génitif ’s se traduit par « de » : le discours du ministre (de + le = du).","The ’s genitive becomes de: du ministre (de + le)."]}},
{s:"en",t:"fr",src:"We look forward to working with you.",ans:["Nous nous réjouissons de travailler avec vous.","Nous avons hâte de travailler avec vous.","Nous nous réjouissons de collaborer avec vous."],
 why:{réjouissons:["Look forward to n'a pas d'équivalent mot à mot : on dit se réjouir de ou avoir hâte de.","Look forward to has no word-for-word match: se réjouir de, avoir hâte de."],nous:["Se réjouir est pronominal : nous nous réjouissons.","Se réjouir is reflexive: nous nous réjouissons."]}},
// FR -> DE
{s:"fr",t:"de",src:"La réunion commence à neuf heures.",ans:["Die Sitzung beginnt um neun Uhr.","Die Besprechung beginnt um neun Uhr.","Das Treffen beginnt um neun Uhr.","Die Sitzung beginnt um 9 Uhr."],
 why:{sitzung:["En allemand, tous les noms prennent une majuscule : Sitzung.","All German nouns are capitalised: Sitzung."],um:["Pour donner l'heure : um + heure (um neun Uhr).","Clock time takes um: um neun Uhr."],uhr:["Uhr est un nom : majuscule.","Uhr is a noun: capital letter."]}},
{s:"fr",t:"de",src:"Je pense que la proposition est bonne.",ans:["Ich denke, dass der Vorschlag gut ist.","Ich glaube, dass der Vorschlag gut ist.","Ich finde, dass der Vorschlag gut ist.","Ich denke, der Vorschlag ist gut."],
 why:{ist:["Dans une subordonnée introduite par dass, le verbe conjugué va à la fin : … gut ist.","In a dass clause the conjugated verb goes last."],",":["En allemand, la virgule est obligatoire avant dass.","German requires a comma before dass."],dass:["Dass (conjonction « que ») s'écrit avec deux s. Das (un seul s) est l'article ou le pronom.","Dass (that, conjunction) has two s; das is the article or pronoun."],vorschlag:["Proposition = der Vorschlag (masculin), avec majuscule.","Der Vorschlag is masculine and capitalised."]}},
{s:"fr",t:"de",src:"Hier, nous avons visité le Parlement.",ans:["Gestern haben wir das Parlament besucht.","Wir haben gestern das Parlament besucht."],
 why:{haben:["Le verbe conjugué est toujours en 2e position. Si la phrase commence par Gestern, le sujet passe après le verbe : Gestern haben wir.","The verb is always second: Gestern haben wir."],besucht:["Le participe passé va à la fin de la phrase : … besucht.","The past participle goes to the end."],parlament:["Parlament est un nom : majuscule.","Parlament is a noun: capital letter."]}},
{s:"fr",t:"de",src:"Les interprètes travaillent en cabine.",ans:["Die Dolmetscher arbeiten in der Kabine.","Die Dolmetscherinnen und Dolmetscher arbeiten in der Kabine.","Die Dolmetschenden arbeiten in der Kabine."],
 why:{der:["Lieu sans mouvement (wo?) : in + datif → in der Kabine.","Location (wo?): in + dative → in der Kabine."],kabine:["Kabine est un nom : majuscule.","Kabine is a noun: capital letter."]}},
{s:"fr",t:"de",src:"Nous devons réduire les émissions.",ans:["Wir müssen die Emissionen reduzieren.","Wir müssen die Emissionen senken.","Wir müssen die Emissionen verringern."],
 why:{reduzieren:["Avec un verbe de modalité (müssen), l'infinitif va à la fin de la phrase.","With a modal verb (müssen) the infinitive goes last."],müssen:["Müssen prend un umlaut : ü.","Müssen has an umlaut: ü."]}},
{s:"fr",t:"de",src:"Merci pour votre attention.",ans:["Vielen Dank für Ihre Aufmerksamkeit.","Danke für Ihre Aufmerksamkeit."],
 why:{ihre:["Forme de politesse : Ihre, toujours avec majuscule.","Formal you: Ihre, always capitalised."],für:["Für est suivi de l'accusatif et prend un umlaut.","Für takes the accusative and has an umlaut."]}},
// DE -> FR
{s:"de",t:"fr",src:"Der Bericht wurde gestern veröffentlicht.",ans:["Le rapport a été publié hier.","Hier, le rapport a été publié.","Le rapport est paru hier."],
 why:{publié:["Publié prend un accent aigu, et s'accorde avec le sujet (le rapport, masculin singulier).","Publié has an acute accent and agrees with the subject."],été:["Passif allemand wurde + participe → en français a été + participe.","German passive wurde + participle → a été + participle."]}},
{s:"de",t:"fr",src:"Wir sind am Montag nach Brüssel gefahren.",ans:["Nous sommes allés à Bruxelles lundi.","Lundi, nous sommes allés à Bruxelles.","Nous sommes allées à Bruxelles lundi."],
 why:{lundi:["Les jours s'écrivent en minuscule en français. Et on ne met pas d'article pour un jour proche : lundi.","Days are lower case in French, with no article for a nearby day."],allés:["Aller se conjugue avec être : le participe s'accorde avec nous (allés, ou allées si ce sont des femmes).","Aller takes être: the participle agrees with nous."],à:["Devant une ville : à (à Bruxelles).","Before a city: à."]}},
{s:"de",t:"fr",src:"Die Arbeitslosigkeit ist gesunken.",ans:["Le chômage a baissé.","Le chômage a diminué.","Le chômage est en baisse."],
 why:{chômage:["Chômage prend un accent circonflexe sur le o.","Chômage has a circumflex on the o."],a:["Baisser se conjugue avec avoir au passé composé, même si l'allemand emploie sein.","Baisser takes avoir, even though German uses sein."]}},
{s:"de",t:"fr",src:"Können Sie bitte langsamer sprechen?",ans:["Pouvez-vous parler plus lentement, s'il vous plaît ?","Pourriez-vous parler plus lentement, s'il vous plaît ?","Pouvez-vous parler plus lentement s'il vous plaît ?"],
 why:{"pouvez-vous":["Inversion du sujet : trait d'union entre le verbe et le pronom (pouvez-vous).","Inverted subject: hyphen between verb and pronoun."]}},
// EN -> DE
{s:"en",t:"de",src:"The President will speak on Friday.",ans:["Der Präsident wird am Freitag sprechen.","Die Präsidentin wird am Freitag sprechen.","Der Präsident spricht am Freitag."],
 why:{am:["Jour de la semaine : am (an + dem) Freitag.","Days take am: am Freitag."],freitag:["Freitag est un nom : majuscule.","Freitag is a noun: capital letter."],sprechen:["Futur : werden + infinitif à la fin.","Future: werden + infinitive at the end."]}},
{s:"en",t:"de",src:"I have been living in Berlin for three years.",ans:["Ich wohne seit drei Jahren in Berlin.","Ich lebe seit drei Jahren in Berlin."],
 why:{wohne:["Une action qui continue : l'allemand emploie le présent + seit, pas le passé.","An ongoing action: German uses the present + seit."],seit:["Depuis = seit, suivi du datif.","Seit takes the dative."],jahren:["Après seit, datif pluriel : Jahren (avec -n).","After seit, dative plural: Jahren."]}},
{s:"en",t:"de",src:"We need more time.",ans:["Wir brauchen mehr Zeit."],why:{zeit:["Zeit est un nom : majuscule.","Zeit is a noun: capital letter."]}},
{s:"en",t:"de",src:"The agreement was signed in Paris.",ans:["Das Abkommen wurde in Paris unterzeichnet.","Das Abkommen wurde in Paris unterschrieben.","Die Vereinbarung wurde in Paris unterzeichnet."],
 why:{wurde:["Passif au passé : wurde + participe passé.","Past passive: wurde + past participle."],unterzeichnet:["Le participe passé va à la fin de la phrase.","The participle goes last."]}},
// DE -> EN
{s:"de",t:"en",src:"Ich arbeite seit 2020 als Dolmetscherin.",ans:["I have been working as an interpreter since 2020.","I have worked as an interpreter since 2020."],
 why:{have:["Seit + présent en allemand → present perfect en anglais (I have been working).","German seit + present → English present perfect."],an:["Devant un métier, l'anglais met l'article indéfini : as an interpreter.","English needs the article before a job: as an interpreter."]}},
{s:"de",t:"en",src:"Die Kommission hat einen neuen Vorschlag vorgelegt.",ans:["The Commission has presented a new proposal.","The Commission has put forward a new proposal.","The Commission has tabled a new proposal.","The Commission presented a new proposal."],
 why:{commission:["La Commission (institution précise) prend une majuscule.","The Commission as a specific institution is capitalised."],proposal:["Vorschlag = proposal (pas proposition, plus rare dans ce sens).","Vorschlag = proposal."]}},
{s:"de",t:"en",src:"Wir treffen uns am Mittwoch.",ans:["We are meeting on Wednesday.","We're meeting on Wednesday.","We will meet on Wednesday.","We meet on Wednesday."],
 why:{wednesday:["Les jours prennent une majuscule en anglais : Wednesday.","Days are capitalised in English."],on:["Avec un jour : on Wednesday.","Days take on."]}},
{s:"de",t:"en",src:"Das ist eine gute Frage.",ans:["That is a good question.","That's a good question.","This is a good question."],why:{}}];

// Grammar sheets per language. ex: [question with ___, options, answer index, why [fr,en]]
GL.GRAM={
fr:[
 {k:"maj",fr:"Les majuscules en français",en:"Capital letters in French",
  rule:{fr:"En français, la majuscule est rare. Elle s'emploie en début de phrase, pour les noms propres, et pour les noms de peuples (les Français). Les jours, les mois, les langues et les adjectifs de nationalité s'écrivent en minuscule.",en:"French uses few capitals: sentence start, proper nouns, and names of peoples (les Français). Days, months, languages and nationality adjectives are lower case."},
  exm:["La réunion a lieu le lundi 3 mars.","Elle parle anglais et allemand.","Les Allemands aiment le cinéma français.","Un député européen."],
  trap:{fr:"« les Français » (le peuple) prend une majuscule, mais « le français » (la langue) et « un film français » n'en prennent pas.",en:"les Français (the people) is capitalised, but le français (language) and un film français are not."},
  ex:[["La conférence commence ___.",["Mardi","mardi"],1,["Les jours s'écrivent en minuscule.","Days are lower case."]],["Il parle couramment ___.",["l'Espagnol","l'espagnol"],1,["Les langues s'écrivent en minuscule.","Languages are lower case."]],["Les ___ votent dimanche.",["Italiens","italiens"],0,["Le peuple prend une majuscule.","Peoples are capitalised."]],["Un journal ___.",["Allemand","allemand"],1,["L'adjectif de nationalité s'écrit en minuscule.","Nationality adjectives are lower case."]]]},
 {k:"pp",fr:"L'accord du participe passé",en:"Past participle agreement",
  rule:{fr:"Avec être, le participe passé s'accorde avec le sujet. Avec avoir, il ne s'accorde pas avec le sujet, mais avec le complément d'objet direct s'il est placé avant le verbe.",en:"With être, the participle agrees with the subject. With avoir, it agrees only with a direct object placed before the verb."},
  exm:["Les délégués sont arrivés.","La décision a été prise.","Les lettres que j'ai écrites.","Elles ont signé l'accord."],
  trap:{fr:"« Elles ont signé » (pas d'accord avec avoir), mais « l'accord qu'elles ont signé » (accord avec le COD placé avant : l'accord, masculin → signé).",en:"no agreement with avoir unless the direct object comes first."},
  ex:[["Les ministres sont ___ hier.",["arrivé","arrivés"],1,["Être : accord avec le sujet (ministres, pluriel).","Être: agrees with the subject."]],["Elles ont ___ le traité.",["signé","signées"],0,["Avoir : pas d'accord avec le sujet.","Avoir: no agreement with the subject."]],["La résolution a été ___.",["adopté","adoptée"],1,["Passif (être) : accord avec résolution (féminin).","Passive: agrees with résolution."]],["Les notes que j'ai ___.",["pris","prises"],1,["COD (les notes) placé avant avoir : accord.","Direct object before avoir: agreement."]]]},
 {k:"typo",fr:"La ponctuation française",en:"French punctuation",
  rule:{fr:"On met une espace (insécable) avant les signes doubles : ? ! : ; et à l'intérieur des guillemets « ». Pas d'espace avant le point et la virgule. On écrit 3 % et 12 h 30.",en:"French puts a (non-breaking) space before ? ! : ; and inside « » quotes. No space before . and ,. Write 3 % and 12 h 30."},
  exm:["Êtes-vous prêt ?","Il a dit : « Merci. »","Le taux est de 3 %."],
  trap:{fr:"l'anglais n'a pas cette espace. Ne la mets pas quand tu écris en anglais.",en:"English has no such space."},
  ex:[["Quelle est votre question___",["?"," ?"],1,["Espace avant le point d'interrogation.","Space before ?."]],["Le taux est de 5___",["%"," %"],1,["Espace avant % en français.","Space before % in French."]],["Bonjour___ Mesdames",[","," ,"],0,["Pas d'espace avant la virgule.","No space before a comma."]]]}],
en:[
 {k:"cap",fr:"Les majuscules en anglais",en:"Capital letters in English",
  rule:{fr:"L'anglais met une majuscule aux jours, mois, langues, nationalités (noms et adjectifs), au pronom I, et aux titres devant un nom (President Macron).",en:"English capitalises days, months, languages, nationalities (nouns and adjectives), the pronoun I, and titles before a name (President Macron)."},
  exm:["The meeting is on Monday, 3 March.","She speaks French and German.","A French film.","I think I agree."],
  trap:{fr:"les saisons ne prennent pas de majuscule (spring, summer).",en:"seasons are lower case (spring, summer)."},
  ex:[["The summit starts on ___.",["monday","Monday"],1,["Les jours prennent une majuscule.","Days are capitalised."]],["He reads ___ newspapers.",["german","German"],1,["Les adjectifs de nationalité prennent une majuscule.","Nationality adjectives are capitalised."]],["We meet in ___.",["Spring","spring"],1,["Pas de majuscule pour les saisons.","Seasons are lower case."]],["Yesterday ___ spoke to the press.",["i","I"],1,["I toujours en majuscule.","I is always capitalised."]]]},
 {k:"pp",fr:"Present perfect ou prétérit",en:"Present perfect or simple past",
  rule:{fr:"Prétérit : action terminée à un moment passé précis (yesterday, in 2019). Present perfect : lien avec le présent, sans date (just, already, since, for, ever).",en:"Simple past: finished action at a stated past time. Present perfect: link to the present, no date (just, already, since, for, ever)."},
  exm:["The minister resigned yesterday.","The minister has just resigned.","Unemployment has fallen since 2015.","I have worked here for ten years."],
  trap:{fr:"« depuis » se traduit par since/for + present perfect, jamais par le présent simple (*I work here since 2015).",en:"never *I work here since 2015."},
  ex:[["She ___ the report last week.",["has finished","finished"],1,["Moment précis (last week) : prétérit.","Stated time: simple past."]],["We ___ here since 2020.",["live","have lived"],1,["Since : present perfect.","Since: present perfect."]],["They ___ arrived.",["have just","just have"],0,["Just se place entre have et le participe.","Just goes between have and the participle."]]]},
 {k:"its",fr:"Its ou it's",en:"Its or it's",
  rule:{fr:"It's = it is ou it has. Its = possessif (son, sa, ses). Le possessif n'a jamais d'apostrophe.",en:"It's = it is / it has. Its = possessive. The possessive never takes an apostrophe."},
  exm:["It's time to start.","The Council and its members.","It's been a long day."],
  trap:{fr:"Astuce : si tu peux remplacer par it is, mets l'apostrophe.",en:"Tip: if you can say it is, use the apostrophe."},
  ex:[["The committee published ___ report.",["it's","its"],1,["Possessif : its.","Possessive: its."]],["___ a difficult question.",["It's","Its"],0,["It is : it's.","It is: it's."]]]}],
de:[
 {k:"gross",fr:"La majuscule en allemand",en:"Capital letters in German",
  rule:{fr:"Tous les noms prennent une majuscule, ainsi que les mots employés comme noms (das Lesen, etwas Neues) et la forme de politesse Sie, Ihnen, Ihr.",en:"All nouns are capitalised, as are words used as nouns (das Lesen, etwas Neues) and the formal Sie, Ihnen, Ihr."},
  exm:["Die Sitzung beginnt um neun Uhr.","Vielen Dank für Ihre Aufmerksamkeit.","Wir wünschen Ihnen alles Gute.","Beim Dolmetschen ist Konzentration wichtig."],
  trap:{fr:"les adjectifs de nationalité restent en minuscule (die deutsche Regierung), mais les langues employées comme noms prennent une majuscule (auf Deutsch).",en:"nationality adjectives are lower case (die deutsche Regierung), but languages as nouns are capitalised (auf Deutsch)."},
  ex:[["Die ___ beginnt morgen.",["konferenz","Konferenz"],1,["Nom : majuscule.","Noun: capital."]],["Danke für ___ Hilfe.",["ihre","Ihre"],1,["Politesse (votre) : Ihre.","Formal your: Ihre."]],["Die ___ Regierung.",["Deutsche","deutsche"],1,["Adjectif : minuscule.","Adjective: lower case."]],["Sie spricht gut ___.",["deutsch","Deutsch"],1,["Langue employée comme nom : majuscule.","Language as a noun: capital."]]]},
 {k:"verb",fr:"La place du verbe",en:"Verb position",
  rule:{fr:"Principale : le verbe conjugué est en 2e position (pas forcément après le sujet). Subordonnée (dass, weil, wenn, ob) : le verbe conjugué va à la fin. Infinitifs et participes vont à la fin de la principale.",en:"Main clause: the conjugated verb is in position 2. Subordinate clause (dass, weil, wenn, ob): it goes last. Infinitives and participles go to the end."},
  exm:["Morgen fliegen wir nach Wien.","Ich glaube, dass er recht hat.","Wir haben das Dokument gelesen.","Weil es regnet, bleiben wir hier."],
  trap:{fr:"après une subordonnée placée en tête, la principale commence par le verbe : Weil es regnet, bleiben wir.",en:"after a leading subordinate clause, the main clause starts with the verb."},
  ex:[["Heute ___.",["spricht der Minister","der Minister spricht"],0,["Verbe en 2e position : après Heute vient le verbe, puis le sujet.","Verb second: after Heute comes the verb, then the subject."]],["Ich weiß, dass sie morgen ___.",["kommt","kommt sie"],0,["Subordonnée : verbe à la fin.","Subordinate: verb last."]],["Wir haben den Text ___.",["übersetzt","übersetzen"],0,["Participe passé à la fin.","Participle last."]]]},
 {k:"dass",fr:"Das ou dass",en:"Das or dass",
  rule:{fr:"Das : article (das Buch), démonstratif ou relatif (remplaçable par dieses, welches). Dass : conjonction (« que »), toujours après une virgule.",en:"Das: article, demonstrative or relative (can be replaced by dieses/welches). Dass: conjunction (that), always after a comma."},
  exm:["Das Abkommen, das gestern unterzeichnet wurde.","Ich hoffe, dass alles klappt."],
  trap:{fr:"Astuce : si tu peux remplacer par welches ou dieses, écris das.",en:"Tip: if welches or dieses fits, write das."},
  ex:[["Er sagt, ___ er kommt.",["das","dass"],1,["Conjonction « que » : dass.","Conjunction: dass."]],["Das Buch, ___ ich lese.",["das","dass"],0,["Pronom relatif (welches) : das.","Relative pronoun: das."]]]}]};

// ---------- correction engine ----------
GL.fold=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/ß/g,"ss");
GL.tok=s=>(s.replace(/[’`]/g,"'").match(/[\p{L}\p{N}][\p{L}\p{N}'\-]*|%|[^\s\p{L}\p{N}]/gu)||[]);
GL.align=function(a,b){ // a = expected tokens, b = user tokens
 const n=a.length,m=b.length,D=[];for(let i=0;i<=n;i++){D[i]=[];for(let j=0;j<=m;j++)D[i][j]=i===0?j:j===0?i:0}
 const c=(x,y)=>x===y?0:GL.fold(x)===GL.fold(y)?.3:1;
 for(let i=1;i<=n;i++)for(let j=1;j<=m;j++)D[i][j]=Math.min(D[i-1][j]+1,D[i][j-1]+1,D[i-1][j-1]+c(a[i-1],b[j-1]));
 const ops=[];let i=n,j=m;
 while(i>0||j>0){if(i>0&&j>0&&D[i][j]===D[i-1][j-1]+c(a[i-1],b[j-1])){ops.push([a[i-1]===b[j-1]?"ok":GL.fold(a[i-1])===GL.fold(b[j-1])?"form":"sub",a[i-1],b[j-1],i-1]);i--;j--}
  else if(i>0&&D[i][j]===D[i-1][j]+1){ops.push(["miss",a[i-1],null,i-1]);i--}else{ops.push(["extra",null,b[j-1],i]);j--}}
 return{cost:D[n][m],ops:ops.reverse()}};
GL.correct=function(item,input,ui){
 const L=ui==="fr"?0:1,u=GL.tok(input.trim());let best=null;
 for(const a of item.ans){const r=GL.align(GL.tok(a),u);if(!best||r.cost<best.cost)best=Object.assign(r,{ref:a})}
 const notes=[],M={fr:{
  capStart:w=>`« ${w} » : une phrase commence toujours par une majuscule.`,
  capDe:w=>`« ${w} » : en allemand, tous les noms prennent une majuscule.`,
  capEn:w=>`« ${w} » : en anglais, jours, mois, langues, nationalités et le pronom I prennent une majuscule.`,
  lowFr:w=>`« ${w} » : en français, jours, mois, langues et adjectifs de nationalité s'écrivent en minuscule.`,
  low:w=>`« ${w} » s'écrit sans majuscule ici.`,cap:w=>`« ${w} » prend une majuscule ici.`,
  acc:(w,y)=>`Accent ou signe : on écrit « ${w} », pas « ${y} ».`,
  sub:(w,y)=>`On attend « ${w} » ici, pas « ${y} ».`,miss:w=>`Il manque « ${w} ».`,extra:y=>`« ${y} » est en trop.`,
  punct:(w,y)=>y?`Ponctuation : « ${w} » au lieu de « ${y} ».`:`Ponctuation : il manque « ${w} ».`,
  frSpace:"En français, on met une espace avant ? ! : ; et %.",enSpace:"En anglais, pas d'espace avant ? ! : ; ni %."},
 en:{capStart:w=>`“${w}”: a sentence always starts with a capital.`,capDe:w=>`“${w}”: all German nouns are capitalised.`,capEn:w=>`“${w}”: English capitalises days, months, languages, nationalities and I.`,
  lowFr:w=>`“${w}”: French writes days, months, languages and nationality adjectives in lower case.`,low:w=>`“${w}” takes no capital here.`,cap:w=>`“${w}” takes a capital here.`,
  acc:(w,y)=>`Accent or special letter: write “${w}”, not “${y}”.`,sub:(w,y)=>`Expected “${w}” here, not “${y}”.`,miss:w=>`Missing: “${w}”.`,extra:y=>`“${y}” is not needed.`,
  punct:(w,y)=>y?`Punctuation: “${w}” instead of “${y}”.`:`Punctuation: “${w}” is missing.`,frSpace:"French puts a space before ? ! : ; and %.",enSpace:"English has no space before ? ! : ; or %."}}[L?"en":"fr"];
 const isP=w=>w&&/^[^\p{L}\p{N}]+$/u.test(w),why=w=>{const x=item.why[(w||"").toLowerCase()];return x?x[L]:""};
 let errs=0;const FRLOW=/^(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre|anglais|français|allemand|espagnol|portugais|italien|arabe|chinois|russe)$/i;
 const whyK=(w,re)=>{const x=why(w);return re.test(x)?x:""},RC=/majuscule|minuscule|capital|lower case/i,RA=/accent|cédille|cedilla|umlaut|circonflexe|circumflex|special/i;
 // split word<->punctuation substitutions into a missing + an extra, and spot swapped neighbours
 const ops=[];for(const o of best.ops){if(o[0]==="sub"&&(isP(o[1])!==isP(o[2]))){ops.push(["miss",o[1],null,o[3]],["extra",null,o[2],o[3]])}else ops.push(o)}
 for(let q=0;q<ops.length-1;q++){const a=ops[q],b=ops[q+1];if(a[0]==="sub"&&b[0]==="sub"&&GL.fold(a[1])===GL.fold(b[2])&&GL.fold(b[1])===GL.fold(a[2])){ops.splice(q,2,["swap",a[1]+" "+b[1],a[2]+" "+b[2],a[3]]);}}
 for(const [k,w,y,i] of ops){if(k==="ok")continue;errs++;let msg;
  if(k==="swap"){const x=why(w.split(" ")[0])||why(w.split(" ")[1]);notes.push({k:"order",w,y,msg:L?`Word order: “${w}”, not “${y}”.`:`Ordre des mots : « ${w} », pas « ${y} ».`,why:x});continue}
  if(k==="form"){const caseOnly=w.toLowerCase()===y.toLowerCase(),up=w[0]!==w[0].toLowerCase();
   if(caseOnly){const wc=whyK(w,RC);msg=i===0&&up?M.capStart(w):wc?(up?M.cap(w):M.low(w)):up?(item.t==="de"?M.capDe(w):item.t==="en"?M.capEn(w):M.cap(w)):(item.t==="fr"&&FRLOW.test(w)?M.lowFr(w):M.low(w));notes.push({k:"case",w,y,msg,why:whyK(w,RC)})}
   else{msg=M.acc(w,y);notes.push({k:"acc",w,y,msg,why:whyK(w,RA)})}}
  else if(isP(w)||isP(y)){notes.push({k:"punct",w,y,msg:k==="extra"?M.extra(y):M.punct(w||"",y),why:why(w)})}
  else if(k==="sub")notes.push({k:"word",w,y,msg:M.sub(w,y),why:why(w)});
  else if(k==="miss")notes.push({k:"word",w,y,msg:M.miss(w),why:why(w)});
  else notes.push({k:"word",w,y,msg:M.extra(y),why:""})}
 const raw=input.trim();
 if(item.t==="fr"&&/[^\s][?!:;%]/.test(raw)){errs++;notes.push({k:"punct",msg:M.frSpace,why:""})}
 if(item.t!=="fr"&&/\s[?!:;%]/.test(raw)){errs++;notes.push({k:"punct",msg:M.enSpace,why:""})}
 const total=GL.tok(best.ref).length,score=Math.max(0,Math.round(100*(1-errs/Math.max(total,1))));
 return{ref:best.ref,ops:best.ops,notes,errs,score,others:item.ans.filter(a=>a!==best.ref)}};

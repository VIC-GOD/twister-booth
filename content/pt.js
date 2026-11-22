// Portuguese layer for the shared content (European Portuguese spelling; Brazilian forms noted where they differ a lot).
(function(){
const C=window.CONTENT||{CP:{COUNTRIES:[],CONTINENTS:{},REGIONS:{}},ID:{IDIOMS:[]},BG:{ACRONYMS:[],LADDERS:[]}};
// id: [country, capital]. A capital left empty keeps the English/local form.
const CO={DZ:["Argélia","Argel"],EG:["Egito","Cairo"],LY:["Líbia","Trípoli"],MA:["Marrocos","Rabat"],SD:["Sudão","Cartum"],TN:["Tunísia","Tunes"],
BJ:["Benim","Porto Novo"],BF:["Burquina Faso","Uagadugu"],CV:["Cabo Verde","Praia"],CI:["Costa do Marfim","Yamoussoukro"],GM:["Gâmbia","Banjul"],GH:["Gana","Acra"],GN:["Guiné","Conacri"],GW:["Guiné-Bissau","Bissau"],
LR:["Libéria","Monróvia"],ML:["Mali","Bamaco"],MR:["Mauritânia","Nouakchott"],NE:["Níger","Niamei"],NG:["Nigéria","Abuja"],SN:["Senegal","Dacar"],SL:["Serra Leoa","Freetown"],TG:["Togo","Lomé"],
AO:["Angola","Luanda"],CM:["Camarões","Iaundé"],CF:["República Centro-Africana","Bangui"],TD:["Chade","N'Djamena"],CG:["República do Congo","Brazzaville"],CD:["República Democrática do Congo","Kinshasa"],
GQ:["Guiné Equatorial","Ciudad de la Paz"],GA:["Gabão","Libreville"],ST:["São Tomé e Príncipe","São Tomé"],BI:["Burúndi","Gitega"],KM:["Comores","Moroni"],DJ:["Djibuti","Djibuti"],ER:["Eritreia","Asmara"],
ET:["Etiópia","Adis Abeba"],KE:["Quénia","Nairóbi"],MG:["Madagáscar","Antananarivo"],MW:["Maláui","Lilongwe"],MU:["Maurícia","Port Louis"],MZ:["Moçambique","Maputo"],RW:["Ruanda","Kigali"],
SC:["Seicheles","Vitória"],SO:["Somália","Mogadíscio"],SS:["Sudão do Sul","Juba"],TZ:["Tanzânia","Dodoma"],UG:["Uganda","Kampala"],ZM:["Zâmbia","Lusaca"],ZW:["Zimbabué","Harare"],
BW:["Botsuana","Gaborone"],SZ:["Essuatíni","Mbabane"],LS:["Lesoto","Maseru"],NA:["Namíbia","Windhoek"],ZA:["África do Sul","Pretória"],
DK:["Dinamarca","Copenhaga"],EE:["Estónia","Taline"],FI:["Finlândia","Helsínquia"],IS:["Islândia","Reiquiavique"],IE:["Irlanda","Dublin"],LV:["Letónia","Riga"],LT:["Lituânia","Vílnius"],
NO:["Noruega","Oslo"],SE:["Suécia","Estocolmo"],GB:["Reino Unido","Londres"],AT:["Áustria","Viena"],BE:["Bélgica","Bruxelas"],FR:["França","Paris"],DE:["Alemanha","Berlim"],
LI:["Listenstaine","Vaduz"],LU:["Luxemburgo","Luxemburgo"],MC:["Mónaco","Mónaco"],NL:["Países Baixos","Amesterdão"],CH:["Suíça","Berna"],AL:["Albânia","Tirana"],AD:["Andorra","Andorra-a-Velha"],
BA:["Bósnia e Herzegovina","Sarajevo"],HR:["Croácia","Zagreb"],GR:["Grécia","Atenas"],IT:["Itália","Roma"],MT:["Malta","Valeta"],ME:["Montenegro","Podgorica"],MK:["Macedónia do Norte","Escópia"],
PT:["Portugal","Lisboa"],SM:["São Marinho","São Marinho"],RS:["Sérvia","Belgrado"],SI:["Eslovénia","Liubliana"],ES:["Espanha","Madrid"],VA:["Vaticano","Cidade do Vaticano"],
BY:["Bielorrússia","Minsk"],BG:["Bulgária","Sófia"],CZ:["Chéquia","Praga"],HU:["Hungria","Budapeste"],MD:["Moldávia","Chisinau"],PL:["Polónia","Varsóvia"],RO:["Roménia","Bucareste"],
RU:["Rússia","Moscovo"],SK:["Eslováquia","Bratislava"],UA:["Ucrânia","Kiev"],AM:["Arménia","Erevan"],AZ:["Azerbaijão","Baku"],BH:["Barém","Manama"],CY:["Chipre","Nicósia"],
GE:["Geórgia","Tbilissi"],IR:["Irão","Teerão"],IQ:["Iraque","Bagdade"],IL:["Israel","Jerusalém"],JO:["Jordânia","Amã"],KW:["Kuwait","Cidade do Kuwait"],LB:["Líbano","Beirute"],
OM:["Omã","Mascate"],PS:["Palestina","Ramala"],QA:["Catar","Doha"],SA:["Arábia Saudita","Riade"],SY:["Síria","Damasco"],TR:["Turquia","Ancara"],AE:["Emirados Árabes Unidos","Abu Dhabi"],
YE:["Iémen","Saná"],KZ:["Cazaquistão","Astana"],KG:["Quirguistão","Bisqueque"],TJ:["Tajiquistão","Duchambé"],TM:["Turquemenistão","Asgabate"],UZ:["Usbequistão","Tasquente"],
AF:["Afeganistão","Cabul"],BD:["Bangladexe","Daca"],BT:["Butão","Timphu"],IN:["Índia","Nova Deli"],MV:["Maldivas","Malé"],NP:["Nepal","Catmandu"],PK:["Paquistão","Islamabade"],
LK:["Sri Lanka","Sri Jayawardenepura Kotte"],CN:["China","Pequim"],JP:["Japão","Tóquio"],MN:["Mongólia","Ulã Bator"],KP:["Coreia do Norte","Pyongyang"],KR:["Coreia do Sul","Seul"],
BN:["Brunei","Bandar Seri Begawan"],KH:["Camboja","Phnom Penh"],ID:["Indonésia","Jacarta"],LA:["Laos","Vientiane"],MY:["Malásia","Kuala Lumpur"],MM:["Mianmar","Naypyidaw"],
PH:["Filipinas","Manila"],SG:["Singapura","Singapura"],TH:["Tailândia","Banguecoque"],TL:["Timor-Leste","Díli"],VN:["Vietname","Hanói"],
CA:["Canadá","Otava"],MX:["México","Cidade do México"],US:["Estados Unidos","Washington, D.C."],BZ:["Belize","Belmopã"],CR:["Costa Rica","São José"],SV:["El Salvador","São Salvador"],
GT:["Guatemala","Cidade da Guatemala"],HN:["Honduras","Tegucigalpa"],NI:["Nicarágua","Manágua"],PA:["Panamá","Cidade do Panamá"],AG:["Antígua e Barbuda","Saint John's"],BS:["Baamas","Nassau"],
BB:["Barbados","Bridgetown"],CU:["Cuba","Havana"],DM:["Domínica","Roseau"],DO:["República Dominicana","São Domingos"],GD:["Granada","Saint George's"],HT:["Haiti","Porto Príncipe"],
JM:["Jamaica","Kingston"],KN:["São Cristóvão e Neves","Basseterre"],LC:["Santa Lúcia","Castries"],VC:["São Vicente e Granadinas","Kingstown"],TT:["Trindade e Tobago","Port of Spain"],
AR:["Argentina","Buenos Aires"],BO:["Bolívia","Sucre"],BR:["Brasil","Brasília"],CL:["Chile","Santiago"],CO:["Colômbia","Bogotá"],EC:["Equador","Quito"],GY:["Guiana","Georgetown"],
PY:["Paraguai","Assunção"],PE:["Peru","Lima"],SR:["Suriname","Paramaribo"],UY:["Uruguai","Montevideu"],VE:["Venezuela","Caracas"],AU:["Austrália","Camberra"],NZ:["Nova Zelândia","Wellington"],
FJ:["Fiji","Suva"],PG:["Papua-Nova Guiné","Port Moresby"],SB:["Ilhas Salomão","Honiara"],VU:["Vanuatu","Port Vila"],KI:["Quiribáti","Tarawa do Sul"],MH:["Ilhas Marshall","Majuro"],
FM:["Micronésia","Palikir"],NR:["Nauru","Yaren"],PW:["Palau","Ngerulmud"],WS:["Samoa","Apia"],TO:["Tonga","Nucualofa"],TV:["Tuvalu","Funafuti"]};
C.CP.COUNTRIES.forEach(c=>{const p=CO[c.id];c.pt=p?p[0]:c.en;c.cap.pt=p&&p[1]?p[1]:c.cap.en});
const CONT={AF:"África",EU:"Europa",AS:"Ásia",NA:"América do Norte",SA:"América do Sul",OC:"Oceânia"};for(const k in C.CP.CONTINENTS)C.CP.CONTINENTS[k].pt=CONT[k]||C.CP.CONTINENTS[k].en;
const REG={"AF-N":"Norte de África","AF-W":"África Ocidental","AF-C":"África Central","AF-E":"África Oriental","AF-S":"África Austral","EU-N":"Europa do Norte","EU-W":"Europa Ocidental","EU-S":"Europa do Sul","EU-E":"Europa de Leste",
 "AS-W":"Ásia Ocidental","AS-C":"Ásia Central","AS-S":"Ásia do Sul","AS-E":"Ásia Oriental","AS-SE":"Sudeste Asiático","NA-N":"América do Norte","NA-C":"América Central","NA-K":"Caraíbas","SA":"América do Sul","OC-A":"Austrália e Nova Zelândia","OC-M":"Melanésia","OC-I":"Micronésia","OC-P":"Polinésia"};
for(const k in C.CP.REGIONS)C.CP.REGIONS[k].pt=REG[k]||C.CP.REGIONS[k].en;

// ---- idioms: European Portuguese equivalents ----
const ID={rain:"Chove a cântaros",ice:"quebrar o gelo",bush:"andar com rodeios",birds:"matar dois coelhos de uma cajadada",cake:"é canja",armleg:"custar os olhos da cara",
frog:"ter um pigarro na garganta",pigs:"quando as galinhas tiverem dentes",leg:"gozar com alguém",moon:"estar nas sete quintas",greek:"isto para mim é chinês",catbag:"dar com a língua nos dentes",
poke:"comprar gato por lebre",nail:"acertar em cheio",boat:"estar no mesmo barco",straw:"a gota de água que faz transbordar o copo",fuel:"deitar achas para a fogueira",log:"dormir como uma pedra",
bull:"pegar o touro pelos cornos",tea:"não é a minha praia",butterflies:"ter borboletas na barriga",breakleg:"Merda!",cuff:"falar de improviso",thread:"perder o fio à meada",point:"ir direto ao assunto",
tongue:"na ponta da língua",lines:"ler nas entrelinhas",foot:"meter o pé na poça",bone:"ter contas a ajustar com alguém",wits:"já não saber o que fazer",wolf:"dar alarmes falsos",fence:"ficar em cima do muro",
blue:"sem mais nem menos",earlybird:"Deus ajuda quem cedo madruga.",chickens:"Não se deve vender a pele do urso antes de o matar.",molehill:"fazer uma tempestade num copo de água",fish:"ter mais com que me preocupar",
peas:"parecidos como duas gotas de água",dust:"morder o pó",cards:"pôr as cartas na mesa",fingers:"fazer figas",blindeye:"fazer vista grossa",bed:"levantar-se com o pé esquerdo",
fishwater:"como peixe fora de água",ears:"ser todo ouvidos",coldfeet:"acobardar-se à última hora",nutshell:"em poucas palavras",endday:"no fim de contas",hotwater:"estar em maus lençóis",
salt:"aceitar com reservas",spade:"chamar os bois pelos nomes",towel:"atirar a toalha ao chão",devil:"fala-se no diabo e aparece-lhe o rabo",neck:"uma chatice",heaven:"mover céus e terra",belt:"apertar o cinto",
can:"empurrar o problema com a barriga",drop:"uma gota no oceano",elephant:"o elefante na sala",thinice:"estar a pisar gelo fino",eggshells:"pisar ovos",tunnel:"ver a luz ao fundo do túnel",
hands:"ter as mãos atadas",wave:"estar na mesma onda",sources:"fontes próximas do governo",breaking:"última hora",headlines:"fazer manchetes",offrecord:"em off",wordwar:"uma troca de acusações",
underfire:"estar debaixo de fogo",uturn:"uma reviravolta",landslide:"uma vitória esmagadora",neckneck:"taco a taco",record:"repor a verdade",court:"a bola está do lado deles",closeddoors:"à porta fechada",
redline:"uma linha vermelha",frank:"uma franca troca de opiniões",leak:"ser divulgado à imprensa",smear:"uma campanha de difamação",lameduck:"um presidente em fim de mandato",bombshell:"uma bomba"};
C.ID.IDIOMS.forEach(i=>{i.pt=ID[i.id]||i.en});
// ---- acronyms: PT short form and full name at indices 8 and 9 ----
const AC={UN:["ONU","Organização das Nações Unidas"],UNSC:["CSNU","Conselho de Segurança das Nações Unidas"],ECOSOC:["ECOSOC","Conselho Económico e Social"],ICJ:["TIJ","Tribunal Internacional de Justiça"],
ICC:["TPI","Tribunal Penal Internacional"],WHO:["OMS","Organização Mundial da Saúde"],UNESCO:["UNESCO","Organização das Nações Unidas para a Educação, a Ciência e a Cultura"],UNICEF:["UNICEF","Fundo das Nações Unidas para a Infância"],
UNHCR:["ACNUR","Alto Comissariado das Nações Unidas para os Refugiados"],UNDP:["PNUD","Programa das Nações Unidas para o Desenvolvimento"],WFP:["PAM","Programa Alimentar Mundial"],FAO:["FAO","Organização das Nações Unidas para a Alimentação e a Agricultura"],
ILO:["OIT","Organização Internacional do Trabalho"],IOM:["OIM","Organização Internacional para as Migrações"],WIPO:["OMPI","Organização Mundial da Propriedade Intelectual"],IAEA:["AIEA","Agência Internacional de Energia Atómica"],
IPCC:["IPCC","Painel Intergovernamental sobre as Alterações Climáticas"],SDGs:["ODS","Objetivos de Desenvolvimento Sustentável"],AU:["UA","União Africana"],PSC:["CPS","Conselho de Paz e Segurança (UA)"],
ECOWAS:["CEDEAO","Comunidade Económica dos Estados da África Ocidental"],ECCAS:["CEEAC","Comunidade Económica dos Estados da África Central"],SADC:["SADC","Comunidade de Desenvolvimento da África Austral"],
WAEMU:["UEMOA","União Económica e Monetária Oeste-Africana"],AfCFTA:["ZCLCA","Zona de Comércio Livre Continental Africana"],AfDB:["BAD","Banco Africano de Desenvolvimento"],NEPAD:["NEPAD","Nova Parceria para o Desenvolvimento de África"],
EU:["UE","União Europeia"],ECB:["BCE","Banco Central Europeu"],MEP:["—","deputado ao Parlamento Europeu"],NATO:["NATO / OTAN","Organização do Tratado do Atlântico Norte"],OECD:["OCDE","Organização para a Cooperação e Desenvolvimento Económico"],
IMF:["FMI","Fundo Monetário Internacional"],WTO:["OMC","Organização Mundial do Comércio"],OPEC:["OPEP","Organização dos Países Exportadores de Petróleo"],GDP:["PIB","Produto Interno Bruto"],FDI:["IDE","Investimento Direto Estrangeiro"],
VAT:["IVA","Imposto sobre o Valor Acrescentado"],CPI:["IPC","Índice de Preços no Consumidor"],NGO:["ONG","Organização Não Governamental"],OHCHR:["ACNUDH","Alto Comissariado das Nações Unidas para os Direitos Humanos"],
OIF:["OIF","Organização Internacional da Francofonia"],AIIC:["AIIC","Associação Internacional de Intérpretes de Conferência"],COP:["COP","Conferência das Partes"],UNGA:["AGNU","Assembleia Geral das Nações Unidas"],WB:["BM","Banco Mundial"]};
C.BG.ACRONYMS.forEach(a=>{const p=AC[a[0]]||[a[1],a[2]];a[8]=p[0];a[9]=p[1]});
// ---- register ladders (slang, neutral, formal) ----
C.BG.LADDERS.push(["PT","comer",["papar","comer","tomar uma refeição"]],["PT","um carro",["um popó","um carro","uma viatura"]],["PT","o dinheiro",["a massa","o dinheiro","os fundos"]],
 ["PT","ir embora",["bazar","ir embora","retirar-se"]],["PT","uma criança",["um puto","uma criança","um menor"]],["PT","um polícia",["um bófia","um polícia","um agente da autoridade"]],
 ["PT","trabalhar",["bulir","trabalhar","exercer funções"]],["PT","perceber",["topar","perceber","compreender"]],["PT","cansado",["estoirado","cansado","exausto"]],["PT","um emprego",["um biscate","um emprego","um posto de trabalho"]],
 ["PT","ajudar",["dar uma mão","ajudar","prestar assistência"]],["PT","começar",["arrancar","começar","dar início"]],["PT","uma casa",["a toca","uma casa","uma residência"]],["PT","dizer",["dizer","informar","comunicar"]]);
// ---- vocabulary: PT at index 4 (index 3 is the topic) ----
const VO=["acordo", "tratado", "eleição", "voto", "governo", "parlamento", "ministro", "lei", "projeto de lei", "alteração", "cessar-fogo", "sanções", "cimeira", "delegação", "embaixador", "embaixada", "fronteira", "refugiado", "direitos humanos", "manutenção da paz", "resolução", "soberania", "oposição", "coligação", "política", "negociação", "crescimento", "desemprego", "inflação", "dívida", "orçamento", "imposto", "comércio", "cadeia de abastecimento", "taxa de juro", "empréstimo", "investimento", "acionista", "receitas", "lucro", "prejuízo", "quota de mercado", "recessão", "subsídio", "alfândega", "pobreza", "trabalhador", "empregador", "sindicato", "greve", "saúde", "hospital", "vacina", "doença", "educação", "escola", "universidade", "habitação", "pensão", "segurança social", "população", "igualdade", "alterações climáticas", "emissões", "energias renováveis", "seca", "inundação", "biodiversidade", "resíduos", "abastecimento de água", "desflorestação", "sustentável", "tribunal", "juiz", "advogado", "testemunha", "prova", "pena", "procurador", "arguido", "contrato", "reunião", "ordem de trabalhos", "presidente (da sessão)", "a palavra", "ata", "orador", "intérprete", "cabina", "auscultadores", "microfone", "pausa", "proposta", "prazo", "relatório", "inquérito", "desafio", "parte interessada", "resultado", "objetivo", "questão", "fundamental", "pão", "queijo", "estação de comboios", "aeroporto", "bilhete", "tempo", "segunda-feira", "quarta-feira", "quinta-feira", "semana", "ano", "ontem", "amanhã", "sempre", "nunca", "muitas vezes", "já", "ainda", "no entanto", "portanto", "embora", "entretanto", "além disso", "melhorar", "reduzir", "aumentar", "alcançar", "apoiar", "exigir", "fornecer", "garantir", "abordar (uma questão)", "aplicar", "adiar", "retirar", "concordar", "recusar", "avisar", "pedir emprestado", "assistir a", "assinar", "lançar", "financiar"];
if(window.VOCAB)window.VOCAB.forEach((v,i)=>{v[4]=VO[i]||v[0]});window.VOCAB_PT=VO;
window.PT_LAYER=true;
window.PT={CO,CONT,REG,ID,AC,VO,
 country(c){const p=CO[c.id];c.pt=p?p[0]:c.en;c.cap.pt=p&&p[1]?p[1]:c.cap.en},
 idiom(i){i.pt=ID[i.id]||i.en}};
})();

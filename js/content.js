/* ============================================
   WMC Kerkrade 1951 — Bilingual Story Content
   Nederlands & English
   ============================================ */

// ─── Scene Mood Colors (shared) ────────────────────
const sceneMoodColors = {
  proloog: '#999999',
  missie: '#ff6e00',
  ch1_keuze: '#ffdd00',
  ch1_deuren: '#ffdd00',
  ch1_cafe: '#ff6e00',
  ch1_frickley: '#1bafe6',
  ch1_schmitz: '#e73089',
  ch1_janssen: '#289b38',
  ch2_intro: '#e30513',
  ch2_muziek: '#1bafe6',
  ch2_veilig: '#999999',
  ch2_stad: '#ffdd00',
  ch3_intro: '#e73089',
  ch3_traditie: '#ff6e00',
  ch3_innovatie: '#1bafe6',
  epiloog: '#ffdd00'
};

// ─── Content Object ────────────────────────────────
const content = {

  // ====================================================
  //  NEDERLANDS
  // ====================================================
  nl: {
    ui: {
      langTitle: 'Kies je taal',
      startBtn: 'Begin het verhaal',
      continueDefault: 'Verder',
      readMore: 'Lees verder',
      choicesPrompt: 'Wat doe je?',
      restart: 'Opnieuw spelen',
      stadstrots: 'Stadstrots',
      openheid: 'Openheid',
      audioListen: 'Luister',
      audioPause: 'Pauzeer',
      audioResume: 'Hervat',
      audioStop: 'Stop',
      audioPlaying: 'Aan het vertellen...',
      audioPaused: 'Gepauzeerd',
      audioLoading: 'Stem laden...',
      howTitle: 'Hoe werkt het?',
      howSteps: [
        'Lees het verhaal op je eigen tempo door op <strong>Lees verder</strong> te klikken, of druk op <strong>▶</strong> links onder om het verhaal te laten voorlezen.',
        'Maak keuzes wanneer die verschijnen. Elke keuze verandert het verloop van het verhaal.',
        'Twee verborgen meters, <strong>Stadstrots</strong> en <strong>Openheid</strong>, houden bij wat voor leider je bent.',
        'Er zijn vier verschillende eindes mogelijk. Speel opnieuw om ze allemaal te ontdekken.'
      ],
      introText: 'Welkom bij <strong>Klankstad</strong>, een interactief verhaal over het eerste Wereld Muziek Concours in Kerkrade, 1951. Jij speelt als Zef, een voormalig mijnwerker die het onmogelijke moet regelen.',
      tagline: 'De stad is grijs van het kolenstof. Maar in de huiskamers van Kerkrade groeit een droom die de hele wereld zal bereiken. Jij bent Zef, voormalig mijnwerker, ritselaar, en de man die het onmogelijke moet regelen voor het eerste Wereld Muziek Concours.'
    },

    sceneLocations: {
      proloog: 'Kerkrade, kwart voor vijf \u2019s ochtends',
      missie: 'Caf\u00e9 van Sjeng, De Markt',
      ch1_keuze: 'Wijk Hopel',
      ch1_deuren: 'Hopelstraat',
      ch1_cafe: 'Caf\u00e9 De Kroon, die avond',
      ch1_frickley: 'Station Kerkrade, een week later',
      ch1_schmitz: 'Huiskamer Schmitz, Domanialstraat',
      ch1_janssen: 'Hopelstraat, die avond',
      ch2_intro: 'Station Kerkrade',
      ch2_muziek: 'Het stationsplein',
      ch2_veilig: 'Het stationsplein',
      ch2_stad: 'Overal in Kerkrade',
      ch3_intro: 'De Markt, de laatste dag',
      ch3_traditie: 'Achter het podium',
      ch3_innovatie: 'Achter het podium',
      epiloog: 'De Markt, een maand later'
    },

    scenes: {
      proloog: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p>De wekker rinkelt om kwart voor vijf. Niet dat Zef hem nog nodig heeft, zijn lichaam is nog steeds afgesteld op de mijn, ook al is het al acht maanden geleden dat hij voor het laatst de kooi in stapte.</p>

          <p>Hij zwaait zijn benen uit bed, en daar is het weer: die droge hoest die niet weg wil. <em>Stoflongen</em>, zei dokter Maassen. Alsof het niks was. Alsof je zomaar een ander paar longen koopt bij de Hema.</p>

          <p>Buiten kleurt de lucht boven Kerkrade hetzelfde grijs als altijd. Grijs van het kolenstof dat in elke kier zit, in elke muur, in elke vezel van de gordijnen die zijn moeder toch echt vorige maand nog gewassen heeft. De Domaniale Mijn torent boven de daken uit als een donkere kathedraal van staal en steen.</p>

          <p>Maar vanochtend voelt de lucht anders. Lichter, misschien. Want er hangt iets in de stad dat Zef niet kan thuisbrengen. Een soort koorts, maar dan de goede variant. Overal waar hij kijkt, ziet hij vlaggen. Nederlandse, Belgische, Britse, Franse, ze hangen uit ramen die normaal nooit open gaan.</p>

          <p><em>Augustus 1951.</em> Over drie weken begint het eerste Wereld Muziek Concours. En Zef Houben, drieënveertig jaar, muzikant bij harmonie Sint-Cecilia en voormalig mijnwerker, ritselaar bij de gratie Gods, heeft net de opdracht van zijn leven gekregen.</p>
        `,
        continueText: 'Verder \u2192',
        next: 'missie'
      },

      missie: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p>Het caf\u00e9 van Sjeng aan de Markt ruikt naar tabak en koffie van gisteren. Achter een tafel vol papieren, kaarten en lijsten zitten twee mannen die er uitzien alsof ze al dagen niet geslapen hebben.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"Zef. Goed dat je er bent. Ga zitten."</span></p>

          <p>Jan Meijs, voorzitter van het organisatiecomit\u00e9, schuift een vel papier naar hem toe. Naast hem knikt Pie Slijpen kort. Die man verspilt nooit een woord.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"Luister goed, jong. We krijgen vierduizend muzikanten. Uit zeventien landen. Dat is over drie weken. En we hebben een probleem."</span></p>

          <p>Meijs tikt met zijn vinger op het papier. Het is een lijst met namen, adressen, doorgestreepte regels, vraagtekens.</p>

          <p><span class="dialogue"><span class="speaker">Pie Slijpen</span>"Bedden. We hebben niet genoeg bedden."</span></p>

          <p>Het Home Hospitality systeem, het hart van het hele concours. Geen hotels voor die duizenden muzikanten, nee. Ze slapen bij de mensen thuis. Bij gewone gezinnen. In gewone huizen in gewone straten. Dat is het idee: verbroedering begint in de huiskamer.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"De wijk Hopel. Daar moeten we nog minstens honderd bedden regelen. En jij, Zef, jij kent iedereen daar. Jij gaat dat regelen."</span></p>

          <p>Hij kijkt Zef recht aan.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"En er is nog iets. De Darlington Railway Band komt. Uit Newcastle. Mijnwerkers, net als wij. Die moeten we goed ontvangen, die mannen zijn de reden dat dit hele concours \u00fcberhaupt bestaat."</span></p>

          <p>Zef kent het verhaal. Twee jaar geleden, in '49, kwamen die Engelse mijnwerkers naar Kerkrade. Harmonie St. Aemiliaan uit Bleijerheide en St. Pancratius uit Nulland hadden ze uitgenodigd. Vijfduizend mensen kwamen kijken. <em>Vijfduizend.</em> En toen wist iedereen: hier moet meer van komen.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"Dus, Zef. Hoe pak je het aan?"</span></p>
        `,
        continueText: 'Verder \u2192',
        next: 'ch1_keuze'
      },

      ch1_keuze: {
        chapter: 'Hoofdstuk 1',
        chapterTitle: 'De Bedden-nood',
        text: `
          <p>Zef leunt achterover en denkt na. Honderd gezinnen in drie weken die een muzikant onderdak geven, kost en inwoning, in ruil voor een concourspas. In Hopel, een wijk waar de mensen niet bepaald zitten te wachten op vreemden in hun huis. De oorlog is pas vijf jaar geleden. Veel mensen zijn terughoudend, op hun hoede. Maar Zef weet ook dat achter die gesloten gordijnen het grootste hart van Kerkrade klopt.</p>

          <p>De vraag is: hoe krijg je die deuren open?</p>
        `,
        choices: [
          {
            label: 'Deur aan deur',
            desc: 'Trek je beste pak aan en ga persoonlijk langs in Hopel. Kijk de mensen in de ogen, vertel het verhaal, vraag het ze recht in hun gezicht.',
            next: 'ch1_deuren',
            effects: { stadstrots: 1, openheid: 1 }
          },
          {
            label: 'Caf\u00e9 De Kroon',
            desc: 'Trommel de buurt bij elkaar in het caf\u00e9. Bier erbij, een goed verhaal, en laat de gemeenschap zelf beslissen. Samen is beter dan alleen.',
            next: 'ch1_cafe',
            effects: { stadstrots: 2, openheid: 0 }
          }
        ]
      },

      ch1_deuren: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p>Om negen uur staat Zef in zijn enige nette overhemd, het witte met de opgevouwen boorden die zijn moeder elke zondag strijkt, voor het eerste huis in de Hopelstraat.</p>

          <p>Mevrouw Cremers doet open. Zestig, scherpe ogen, armen over elkaar.</p>

          <p><span class="dialogue"><span class="speaker">Mevr. Cremers</span>"Wat moet je?"</span></p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Mevrouw Cremers, ik kom vragen of u een muzikant in huis wilt nemen. Voor het concours."</span></p>

          <p><span class="dialogue"><span class="speaker">Mevr. Cremers</span>"Onzin. Ik heb niet eens een extra bed."</span></p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Een matras op de grond is ook goed. Het gaat om het gebaar, mevrouw. Die mannen komen van ver. Sommigen hebben de oorlog meegemaakt, net als wij. En ze brengen alleen maar muziek mee."</span></p>

          <p>Ze kijkt hem lang aan. Dan draait ze zich om.</p>

          <p><span class="dialogue"><span class="speaker">Mevr. Cremers</span>"E\u00e9ntje. Meer niet. En hij eet wat de pot schaft."</span></p>

          <p>Zo gaat het de hele dag. Deur na deur. Soms een nee. Soms een aarzelend ja. Soms een enthousiast "doe maar twee!" Bij de oude M\u00fcller op nummer 37 krijgt hij koffie en drie bedden aangeboden. Bij de Janssens een koele blik en een dichte deur.</p>

          <p>Tegen de avond heeft Zef twee\u00ebnzestig bedden. Nog net niet genoeg. Maar het is een begin, en de hele wijk praat erover.</p>
        `,
        continueText: 'Verder \u2192',
        next: 'ch1_frickley'
      },

      ch1_cafe: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p>Die avond staat Zef op een stoel in Caf\u00e9 De Kroon. Het is er warm, het is er vol, en het ruikt naar bier en frituurvet. Precies goed.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Luister even, allemaal. Stil!"</span></p>

          <p>Het geroezemoes sterft langzaam weg. Dertig, veertig gezichten kijken omhoog. Mijnwerkers, huisvrouwen, de bakker van de hoek, de oude M\u00fcller die er altijd zit.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Over drie weken komen er vierduizend muzikanten naar Kerkrade. Uit zeventien landen. En die moeten ergens slapen. Niet in hotels, die hebben we niet. Niet in kazernes, die heeft het leger zelf nodig. Nee. Bij ons. In onze huizen."</span></p>

          <p>Gemompel. Hier en daar een lach.</p>

          <p><span class="dialogue"><span class="speaker">Iemand achteraan</span>"Bij mij thuis? Mijn vrouw vermoordt me!"</span></p>

          <p>Gelach. Zef grinnikt mee, maar gaat door.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Weten jullie nog, twee jaar geleden? Die Engelse mijnwerkers die hier kwamen spelen? De Darlington Railway Band? Vijfduizend man stond te kijken op de Markt. En daarna zaten die Newcastle-jongens bij Sjeng aan de bar, en wij verstonden geen woord van wat ze zeiden, maar het maakte niet uit. Want de muziek, <em>die</em> verstonden we."</span></p>

          <p>Het is stil nu.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Dit wordt groter dan dat. Veel groter. En de hele wereld kijkt mee. Laten we ze laten zien wie we zijn."</span></p>

          <p>De oude M\u00fcller staat als eerste op.</p>

          <p><span class="dialogue"><span class="speaker">M\u00fcller</span>"Drie bedden. Bij mij."</span></p>

          <p>Dan gaat het snel. De bakker biedt twee plekken aan. De vrouw van Hendriks zegt vier, "als ze hun eigen handdoeken meebrengen." Binnen een uur heeft Zef achtenzeventig bedden op zijn lijst.</p>

          <p>En de hele wijk heeft het gevoel dat dit <em>hun</em> project is.</p>
        `,
        continueText: 'Verder \u2192',
        next: 'ch1_frickley'
      },

      ch1_frickley: {
        chapter: null,
        chapterTitle: null,
        text: `

          <p>Een week later. Station Kerkrade. Het perron trilt onder de naderende trein uit het noorden.</p>

          <p>De Darlington Railway Band uit Newcastle. Mijnwerkers, net als de mannen in Hopel. Alleen spreken ze Engels met zo'n zwaar accent dat zelfs andere Engelsen het niet verstaan. Ze stappen uit de trein met hun instrumentkoffers, verkreukelde pakken, en dat typisch Engelse mengsel van verlegenheid en vastberadenheid.</p>

          <p>Zef staat te wachten met zijn lijst. De bandleider, een brede man met een snor als een schoenenborstel, steekt zijn hand uit.</p>

          <p><span class="dialogue"><span class="speaker">Bandleider</span>"F. Tompkins. Darlington Railway. Where d'we go, lad?"</span></p>

          <p>Zef schudt zijn hand. En nu moet hij beslissen. Op zijn lijst staan twee opties voor de Engelsen:</p>

          <p>De <strong>familie Schmitz</strong> in de Nieuwstraat, Duits-Limburgse achtergrond, oud-mijnwerkers, groot huis, spreken een beetje Engels. Maar de naam klinkt Duits, en sommige Britten... ja, de oorlog is pas vijf jaar geleden.</p>

          <p>Of de <strong>familie Pilipiec</strong> aan de Hopelstraat, een gezellig gezin, kleiner huis, maar niemand zal er iets achter zoeken.</p>
        `,
        choices: [
          {
            label: 'Familie Schmitz',
            desc: 'Mijnwerkers herkennen mijnwerkers, ongeacht de achternaam. Die verbinding is sterker dan welk vooroordeel ook.',
            next: 'ch1_schmitz',
            effects: { stadstrots: 0, openheid: 2 }
          },
          {
            label: 'Familie Pilipiec',
            desc: 'Houd het simpel en veilig. Geen onnodige spanning. De muziek is al spannend genoeg.',
            next: 'ch1_janssen',
            effects: { stadstrots: 1, openheid: 0 }
          }
        ]
      },

      ch1_schmitz: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p><span class="dialogue"><span class="speaker">Zef</span>"Schmitz. Nieuwstraat. Oude mijnwerkers, net als jullie."</span></p>

          <p>Hij ziet de aarzeling in de ogen van F. Tompkins. <em>Schmitz.</em> De naam hangt even in de lucht. Maar dan doet Zef iets wat hij niet gepland had: hij trekt zijn hemd omhoog en laat de blauwe tatoeage zien op zijn onderarm. Een houweel en een lamp. Het mijnwerkersteken.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Same job. Same dust. Same lungs."</span></p>

          <p>Tompkins kijkt. Dan barst hij in lachen uit en slaat Zef op zijn schouder.</p>

          <p><span class="dialogue"><span class="speaker">Tompkins</span>"Right then. Schmitz it is."</span></p>

          <p>Die avond, in de huiskamer van de Schmitz-familie, gebeurt wat Zef had gehoopt. Vader Schmitz, die in '44 zelf onder de Duitsers gewerkt heeft en er niet over praat, haalt zijn oude cornet van zolder. Stoffig, gedeukt, al jaren niet bespeeld. En zonder een woord te zeggen gaat hij naast F. Tompkins zitten, die net zijn eigen instrument aan het oppoetsen is.</p>

          <p>Ze spelen. Geen noten, geen bladmuziek. Gewoon twee oude mijnwerkers die dezelfde melodie kennen zonder dat ze ooit dezelfde taal hebben gesproken.</p>

          <p>Mevrouw Schmitz staat in de deuropening en veegt haar ogen af.</p>
        `,
        continueText: 'Verder naar hoofdstuk 2 \u2192',
        next: 'ch2_intro'
      },

      ch1_janssen: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p><span class="dialogue"><span class="speaker">Zef</span>"Pilipiec. Hopelstraat. Goed volk, warm gezin."</span></p>

          <p>Tompkins knikt tevreden. De naam klinkt neutraal, vriendelijk. Geen lading.</p>

          <p>Bij de familie Pilipiec worden de Engelsen met open armen ontvangen. Mevrouw Pilipiec heeft Zondagse soep gemaakt, "want ik weet niet wat Engelsen eten, maar soep lust iedereen," en de kinderen staan met grote ogen te kijken naar de vreemde mannen met hun grote zwarte koffers.</p>

          <p>Het is gezellig. Warm. <em>Veilig.</em></p>

          <p>Tompkins speelt na het eten een wijsje op zijn trompet voor de kinderen. De kleine Marieke danst in haar nachtpon door de kamer. Iedereen lacht.</p>

          <p>Later, als het stil is en Zef naar huis loopt, vraagt hij zich af of hij de juiste keuze heeft gemaakt. De Janssens zijn geweldig. Maar de Schmitz-familie had misschien iets <em>meer</em> gekund. Iets wat verder gaat dan gastvrijheid alleen.</p>

          <p>Hij schudt zijn hoofd. Het is goed zo. De muzikanten slapen warm, de kinderen zijn blij, en morgen begint de echte chaos.</p>
        `,
        continueText: 'Verder naar hoofdstuk 2 \u2192',
        next: 'ch2_intro'
      },

      ch2_intro: {
        chapter: 'Hoofdstuk 2',
        chapterTitle: 'De Spanning op het Station',
        text: `
          <p>De week voor het concours barst Kerkrade uit zijn voegen.</p>

          <p>Elke dag arriveren er korpsen. Sommigen per trein — uit Brussel, uit Parijs, uit Londen, uit Wenen — maar de meesten met de bus, rechtstreeks naar de grote parkeerplaatsen en de verenigingsgebouwen in de wijken. Zeventien landen, tientallen orkesten, duizenden koffers vol instrumenten. Zef rent van perron naar parkeerplaats met zijn notitieboekje en zijn lijst van gastgezinnen.</p>

          <p>De stad verandert. Letterlijk. Waar gisteren nog grijs kolenstof hing, wapperen nu vlaggen van landen waarvan de meeste inwoners van Kerkrade het bestaan niet kenden. Er hangen spandoeken over de Markt. De bakker heeft speciaal brood gebakken in de vorm van muzieknoten. De kinderen lopen achter muzikanten aan alsof het circusartiesten zijn.</p>

          <p>En dan komt donderdagochtend.</p>

          <p>Zef staat op perron 2, wachtend op de bus uit Duitsland. Daar zit een Duits blaasorkest in, de <strong>Musikvereine Hilden-Ohligs</strong>. Goede muzikanten, heeft hij gehoord. Maar Duits. En dat is in 1951, vijf jaar na de oorlog, geen detail.</p>

          <p>Op datzelfde moment stopt een bus uit de Belgische Oostkantons op het plein. Er stapt een Belgisch korps uit: de <strong>Fanfare B\u00fcllingen</strong>. Mannen van wie sommigen in het verzet hebben gezeten. Mannen die de Duitsers nog heel goed kennen.</p>

          <p>De twee groepen staan op hetzelfde stationsplein. De Duitsers met hun koffers links. De Belgen met hun instrumenten rechts. En ertussen: tien meter lege kasseien en een stilte waar je een speld kunt horen vallen.</p>

          <p>Pie Slijpen verschijnt naast Zef en fluistert:</p>

          <p><span class="dialogue"><span class="speaker">Pie Slijpen</span>"Dit kan fout gaan, Zef. Houd het rustig."</span></p>

          <p>Een van de Belgische muzikanten staart naar de Duitsers. Zijn gezicht is hard. Zef ziet zijn handen trillen, niet van de kou.</p>
        `,
        choices: [
          {
            label: 'De muziek spreken laten',
            desc: 'Loop naar het midden, pak een instrument van iemand over, en begin te spelen. Muziek is de enige taal die iedereen hier verstaat. Dwing ze niet samen, nodig ze uit.',
            next: 'ch2_muziek',
            effects: { stadstrots: 1, openheid: 2 }
          },
          {
            label: 'Veilig begeleiden',
            desc: 'Houd de groepen gescheiden. Begeleid de Duitsers rechtsaf, de Belgen linksaf. Geen sc\u00e8nes, geen risico. Er is een heel concours om ze later samen te brengen.',
            next: 'ch2_veilig',
            effects: { stadstrots: 1, openheid: 0 }
          }
        ]
      },

      ch2_muziek: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p>Zef zijn hart bonst. Maar hij denkt aan iets dat Jan Meijs vorige week zei: <em>"Als we het alleen over muziek laten gaan, dan lukt het."</em></p>

          <p>Hij loopt naar de dichtstbijzijnde Belgische muzikant, een man met een trombone in een versleten koffer. Zef buigt zich naar hem toe.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Excusez-moi, monsieur. Pouvez-vous jouer quelque chose? Maintenant?"</span></p>

          <p>De man kijkt hem aan alsof hij gek is. Maar dan, misschien door de absurditeit van het moment, misschien door iets diepers, haalt hij zijn trombone uit de koffer. Hij speelt. Een eenvoudige melodie. Warm, vol, met dat typische Belgische vibrato.</p>

          <p>De noten zweven over het stationsplein.</p>

          <p>Het duurt misschien tien seconden. Dan maakt een van de Duitse muzikanten zijn koffer open. Een klarinet. Hij zoekt de toonsoort, vindt die, en valt in.</p>

          <p>Nog een instrument. En nog een. Een hobo. Een trompet. Een hoorn.</p>

          <p>Binnen twee minuten staan er twaalf muzikanten op het lege stationsplein te spelen. Geen dirigent, geen partituur. Gewoon klank die klank zoekt. Duits naast Belgisch. Koper naast hout. Oorlog naast vrede.</p>

          <p>Pie Slijpen staat met zijn mond open. Een stationswerkster leunt op haar bezem en huilt. Een groep kinderen begint te klappen.</p>

          <p>Als het stuk, als je het een stuk kunt noemen, stopt, is er een moment van stilte. Dan steekt de Belgische trombonist zijn hand uit naar de Duitse klarinettist.</p>

          <p><span class="dialogue"><span class="speaker">Trombonist</span>"Bien jou\u00e9."</span></p>

          <p>De Duitser pakt de hand.</p>

          <p><span class="dialogue"><span class="speaker">Klarinettist</span>"Danke. Gleichfalls."</span></p>

          <p>Is alles nu goed? Nee. Zo simpel werkt dat niet. Maar er is iets verschoven, daar op dat koude stationsplein in Kerkrade. Iets kleins. Iets dat misschien kan groeien.</p>
        `,
        continueText: 'Verder \u2192',
        next: 'ch2_stad'
      },

      ch2_veilig: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p>Zef ademt in. Zijn instinct zegt: niet forceren.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Ok\u00e9. Pierre, jij gaat met de Belgen linksaf, door de Stationsstraat. Ik neem de Duitsers rechtsaf via de Markt. We zien elkaar bij de registratie."</span></p>

          <p>Pie Slijpen knikt goedkeurend. Professioneel, rustig, geregeld.</p>

          <p>De twee groepen vertrekken in tegengestelde richtingen. De Belgische trombonist kijkt nog \u00e9\u00e9n keer om naar de Duitsers, zijn gezicht onleesbaar. Dan verdwijnt hij om de hoek.</p>

          <p>Zef loopt voorop met het Duitse orkest. Ze zijn beleefd, correct. De bandleider, een lange, magere man met een bril, bedankt Zef in gebrekkig Nederlands.</p>

          <p><span class="dialogue"><span class="speaker">Bandleider</span>"Dankesch\u00f6n. Wir... wissen, dass es nicht einfach ist."</span></p>

          <p>Zef knikt. Hij weet het. Het is niet makkelijk. Voor niemand.</p>

          <p>Later die avond, in Caf\u00e9 De Kroon, hoort hij dat de Belgische musici en de Duitse musici de hele dag netjes uit elkaars buurt zijn gebleven. Geen incidenten. Geen problemen.</p>

          <p>Maar ook geen handdrukken. Geen gedeelde melodie\u00ebn. Geen moment waarvan mensen over twintig jaar nog vertellen.</p>

          <p>Zef drinkt zijn bier en staart naar het schuim. Had hij meer moeten doen? Of was dit precies genoeg?</p>
        `,
        continueText: 'Verder \u2192',
        next: 'ch2_stad'
      },

      ch2_stad: {
        chapter: null,
        chapterTitle: null,
        text: `

          <p>De dagen die volgen zijn een waas van chaos, muziek en improvisatie.</p>

          <p>Zef ritselt. Dat is wat hij doet. Hij ritselt bierkratten als de voorraad opraakt. Hij ritselt een smid om een tuba te repareren die de reis vanuit Denemarken niet overleefd heeft. Hij ritselt extra slaapplekken als een Noors korps met dubbel zoveel man aankomt als opgegeven.</p>

          <p>En langzaam, dag na dag, ziet hij iets gebeuren met Kerkrade.</p>

          <p>De stad komt tot leven. Niet een beetje, <em>helemaal.</em></p>

          <p>Op de Markt oefent een Zweeds korps naast een Italiaans ensemble, en de koude Scandinavische klanken vloeien samen met de warme Mediterrane tonen op een manier die niemand had verwacht. In de Hopelstraat leren Engelse muzikanten van de Darlington Railway Band de kinderen "It's a Long Way to Tipperary", en de kinderen leren ze "In het Mooiste Stadje" terug.</p>

          <p>Bij de tentoonstelling <em>Kirchroa Alaaf</em> op het Mucherveld staan rijen die twee straten lang zijn. Tweeduizend man, drieduizend. De organisatie had op vijftigduizend bezoekers gerekend voor het hele concours. Ze zitten nu al op honderdduizend en het is pas woensdag.</p>

          <p>Jan Meijs trekt Zef apart.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"Het loopt uit de hand, Zef. In de goede zin. Maar de finale... daar moeten we het over hebben."</span></p>
        `,
        continueText: 'Verder naar hoofdstuk 3 \u2192',
        next: 'ch3_intro'
      },

      ch3_intro: {
        chapter: 'Hoofdstuk 3',
        chapterTitle: 'De Finale op de Markt',
        text: `

          <p>De laatste dag. De Markt van Kerkrade is onherkenbaar.</p>

          <p>Waar normaal mijnwerkers met lege broodtrommels naar huis sjokken, staan nu tribunes. Provisorisch, gemaakt van hout en ijzer dat Zef "geleend" heeft van een bouwplaats bij de Domaniale. Het podium is versierd met de vlaggen van alle zeventien deelnemende landen, en de zon, die eindelijk, <em>eindelijk</em> door de grijze wolken breekt, laat het koper van de instrumenten glanzen als goud.</p>

          <p>Tweehonderdduizend bezoekers. Dat getal gaat later de kranten in. Maar nu, op dit moment, is het gewoon een zee van mensen. Een zee die ademt, praat, lacht, en wacht.</p>

          <p>Zef staat achter het podium met Jan Meijs en Pie Slijpen. Er is een beslissing die genomen moet worden. Niet door de jury, niet door het publiek, maar door de organisatie. Door hen.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"Het comit\u00e9 is verdeeld, Zef. We moeten kiezen. En ik wil jouw mening horen."</span></p>

          <p>Het gaat over de toekomst. Over wat dit concours gaat <em>worden</em>.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"De ene helft wil het houden zoals het is. Klassiek concours. Strakke jury, vaste regels, traditie. Bewezen formule. Dat trekt orkesten van topniveau."</span></p>

          <p>Hij pauzeert.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"De andere helft wil verder gaan. Open divisies, nieuwe muziekvormen, een plek waar orkesten niet alleen wedstrijden maar ook <em>ontdekken</em>. Een laboratorium, zeggen ze. De plek waar de toekomst van de blaasmuziek wordt gemaakt."</span></p>

          <p>Hij kijkt Zef aan.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"Wat denk jij, jong? Wat moet het worden?"</span></p>
        `,
        choices: [
          {
            label: 'De traditie bewaken',
            desc: 'Houd vast aan wat werkt. Een strak, eerlijk concours met hoge standaarden. Laat de kwaliteit voor zich spreken. Zo bouw je iets dat honderd jaar meegaat.',
            next: 'ch3_traditie',
            effects: { stadstrots: 2, openheid: 0 }
          },
          {
            label: 'De toekomst omarmen',
            desc: 'Maak het groter dan een wedstrijd. Een plek waar muzikanten uit de hele wereld samen iets nieuws cre\u00ebren. Het laboratorium van de blaasmuziek. Dat maakt Kerkrade uniek.',
            next: 'ch3_innovatie',
            effects: { stadstrots: 0, openheid: 2 }
          }
        ]
      },

      ch3_traditie: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p><span class="dialogue"><span class="speaker">Zef</span>"Traditie, meneer Meijs. Maar niet uit angst, uit kracht."</span></p>

          <p>Hij wijst naar het podium, waar het volgende korps zich opstelt.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Kijk naar die gezichten. Die mannen hebben maanden geoefend. Sommigen hebben hun vakantiegeld opgespaard om hier te komen. Ze willen niet <em>experimenteren</em>, ze willen het beste van zichzelf laten horen. En ze willen dat een jury zegt: jij bent de beste. Daar gaat dit over."</span></p>

          <p>Jan Meijs luistert.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Als je een goede wedstrijd maakt, eerlijk, streng, met hoge standaarden, dan komen de beste orkesten van de wereld. En als de besten komen, dan kijkt de wereld mee. Dan wordt dit niet zomaar een festival. Dan wordt dit de plek waar je bewezen hebt dat je de allerbeste bent."</span></p>

          <p>Meijs knikt langzaam.</p>

          <p>Die middag beslist het comit\u00e9: het WMC wordt een concours in de klassieke zin. Strenge jury's, vaste categorie\u00ebn, en \u00e9\u00e9n doel: het hoogste muzikale niveau ter wereld.</p>

          <p>Op het podium speelt een Belgisch korps een mars die zo strak en zuiver is dat zelfs de kinderen op de tribune stil worden. De jury noteert. Het publiek wacht. En als de laatste noot wegsterft, barst het applaus los, niet beleefd maar <em>donderend</em>, van tweehonderdduizend paar handen tegelijk.</p>

          <p>Zef staat in de coulissen en voelt het door zijn hele lijf. Dit is het. Dit is iets groots.</p>
        `,
        continueText: 'Verder naar het einde \u2192',
        next: 'epiloog'
      },

      ch3_innovatie: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p><span class="dialogue"><span class="speaker">Zef</span>"Verder. Altijd verder."</span></p>

          <p>Hij denkt aan het stationsplein. Aan de trombone en de klarinet die samen een melodie vonden die niet in de bladmuziek stond.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Een concours, dat kan overal. In Brussel, in Londen, in Wenen. Maar een plek waar muzikanten uit de hele wereld samen iets <em>nieuws</em> maken? Waar een harmonie uit Newcastle naast een harmonie uit Parijs staat en ze samen klinken als iets wat nog niemand eerder gehoord heeft? Dat kan alleen hier. Alleen in Kerkrade."</span></p>

          <p>Pie Slijpen, die tot nu toe gezwegen heeft, schrapt zijn keel.</p>

          <p><span class="dialogue"><span class="speaker">Pie Slijpen</span>"De jongen heeft gelijk."</span></p>

          <p>Het is het langste dat Slijpen de hele week gezegd heeft. Jan Meijs glimlacht.</p>

          <p>Die middag wordt het programma aangepast. Naast de wedstrijden komt er een open podium. Orkesten uit verschillende landen worden uitgenodigd om samen te spelen, onvoorbereid, zonder partituur, gewoon op gehoor en gevoel. Het is rommelig. Het is onvoorspelbaar. Het is <em>prachtig.</em></p>

          <p>Een Italiaanse trompettist en een Nederlandse hoornist maken een duet dat niemand ooit zal vergeten. Het publiek gaat staan. Niet voor de techniek, voor het gevoel. Voor dat moment waarop twee vreemden dezelfde taal spraken zonder die taal ooit geleerd te hebben.</p>

          <p>Zef staat naast het podium en weet: dit is meer dan een concours. Dit is een belofte.</p>
        `,
        continueText: 'Verder naar het einde \u2192',
        next: 'epiloog'
      },

      epiloog: {
        chapter: 'Epiloog',
        chapterTitle: 'Na de Laatste Noot',
        text: `
          <p>Een maand later.</p>

          <p>De vlaggen zijn weg. De tribunes afgebroken. Het hout terug naar de bouwplaats bij de Domaniale. Zef heeft het persoonlijk teruggebracht, 's nachts, want officieel had hij het nooit "geleend."</p>

          <p>Kerkrade is weer grijs. Het kolenstof hangt weer in de lucht, de wekkers rinkelen weer om kwart voor vijf, en in de Hopelstraat zijn de extra bedden weer opgeborgen.</p>

          <p>Maar er is iets veranderd.</p>

          <p>Mevrouw Cremers heeft een foto in haar vensterbank gezet van de Noorse tubaspeler die bij haar gelogeerd heeft. "Een aardige jongen," zegt ze tegen iedereen die het horen wil. "At alles op." Bij de Schmitz-familie hangt een ingelijste brief van F. Tompkins aan de muur, in een Engels dat ze niet helemaal verstaan maar dat ze desondanks koesteren.</p>

          <p>En Zef? Zef zit op het bankje bij de Markt, op dezelfde plek waar drie weken geleden tweehonderdduizend mensen stonden. Het is stil nu. Alleen een merel fluit, ergens op een dak.</p>

          <p>Hij hoest. Die verdomde longen. Maar hij glimlacht ook.</p>

          <p>Want hij weet iets wat de rest van de wereld nog niet weet:</p>

          <p><em>Dit was pas het begin.</em></p>

          <p>In 1954 doen ze het weer. En dan wordt het groter. En dan is het hele land erbij. En dan de hele wereld.</p>
        `,
        continueText: null,
        next: null,
        isEnding: true
      }
    },

    endings: {
      olympisch: {
        title: 'De Olympische Spelen van de Blaasmuziek',
        text: `
          <p>In de jaren die volgen groeit het WMC uit tot het grootste en meest prestigieuze muziekconcours ter wereld. De combinatie van hoge standaarden en een open, verkennende geest trekt orkesten van alle continenten.</p>
          <p>De gastgezinnen van Kerkrade worden legendarisch. Het Home Hospitality systeem groeit mee met het festival, en in 2026, vijfenzeventig jaar later, openen de inwoners opnieuw hun deuren voor muzikanten uit de hele wereld.</p>
          <p>Zef Houben zal het niet allemaal meer meemaken. Maar op de Markt van Kerkrade, waar het ooit grijs was van het kolenstof, staat nu een stad die de hele wereld kent als <strong>Klankstad</strong>.</p>
          <p>En het begon met honderd bedden in de Hopelstraat.</p>
        `,
        condition: (s) => s.stadstrots >= 3 && s.openheid >= 3
      },
      trots: {
        title: 'Ons Eigen Festival',
        text: `
          <p>Het WMC wordt een instituut. Strak, professioneel, en diep geworteld in de gemeenschap van Kerkrade. Winnen in Kerkrade is de hoogst denkbare eer voor elk blaasorkest.</p>
          <p>De stad is trots. Enorm trots. Maar de wereld buiten de mijnstreek kent het festival minder goed dan het zou kunnen. Het is een feest van en voor de eigen mensen, en misschien is dat ook precies genoeg.</p>
          <p>Zef zou het op deze manier gewild hebben. Hij was altijd meer van hier dan van daar.</p>
        `,
        condition: (s) => s.stadstrots >= 3 && s.openheid < 3
      },
      wereldburger: {
        title: 'De Wereldburger',
        text: `
          <p>Kerkrade wordt een knooppunt van muzikale uitwisseling. Orkesten komen niet alleen om te wedijveren, maar om te leren, te delen, te groeien. Het internationale karakter van het WMC is ongekend.</p>
          <p>Maar in de Hopelstraat vragen ze zich soms af of het festival nog wel van hen is. De vlaggen zijn er, de muziek ook, maar het hart? Dat zoekt soms nog naar de warmte van die eerste keer.</p>
          <p>Zef zou zeggen: "Jong, je moet de deur openzetten. Maar vergeet niet waar de sleutel ligt."</p>
        `,
        condition: (s) => s.stadstrots < 3 && s.openheid >= 3
      },
      stilte: {
        title: 'De Stille Hoop',
        text: `
          <p>Het concours gaat door, elke vier jaar, zoals beloofd. Maar de vonk van '51, die vreemde, onverklaarbare magie, is moeilijk te vangen in regels en structuren.</p>
          <p>Toch, op stille avonden, als een oude mijnwerker een ingelijste foto van een muzikant uit een ver land van de schoorsteenmantel pakt, is die vonk er nog. Klein, maar onuitblusbaar.</p>
          <p>Want wat in Kerkrade begon was nooit alleen muziek. Het was de ontdekking dat vreemden geen vreemden hoeven te zijn. En die les vergeet je niet. Nooit.</p>
        `,
        condition: (s) => true
      }
    }
  },

  // ====================================================
  //  ENGLISH
  // ====================================================
  en: {
    ui: {
      langTitle: 'Choose your language',
      startBtn: 'Start the story',
      continueDefault: 'Continue',
      readMore: 'Read more',
      choicesPrompt: 'What do you do?',
      restart: 'Play again',
      stadstrots: 'City Pride',
      openheid: 'Openness',
      audioListen: 'Listen',
      audioPause: 'Pause',
      audioResume: 'Resume',
      audioStop: 'Stop',
      audioPlaying: 'Narrating...',
      audioPaused: 'Paused',
      audioLoading: 'Loading voice...',
      howTitle: 'How does it work?',
      howSteps: [
        'Read the story at your own pace by clicking <strong>Read more</strong>, or press <strong>▶</strong> at the bottom left to have the story read aloud.',
        'Make choices when they appear. Each choice changes the course of the story.',
        'Two hidden meters, <strong>City Pride</strong> and <strong>Openness</strong>, track what kind of leader you are.',
        'Four different endings are possible. Play again to discover them all.'
      ],
      introText: 'Welcome to <strong>Klankstad</strong>, an interactive story about the first World Music Competition in Kerkrade, 1951. You play as Zef, a former miner who must accomplish the impossible.',
      tagline: 'The city is grey with coal dust. But in the living rooms of Kerkrade, a dream is growing that will reach the entire world. You are Zef, former miner, fixer, and the man who must make the impossible happen for the first World Music Competition.'
    },

    sceneLocations: {
      proloog: 'Kerkrade, quarter to five in the morning',
      missie: 'Sjeng\u2019s Caf\u00e9, the Market Square',
      ch1_keuze: 'Hopel Neighbourhood',
      ch1_deuren: 'Hopelstraat',
      ch1_cafe: 'Caf\u00e9 De Kroon, that evening',
      ch1_frickley: 'Kerkrade Station, one week later',
      ch1_schmitz: 'Schmitz Living Room, Domanialstraat',
      ch1_janssen: 'Hopelstraat, that evening',
      ch2_intro: 'Kerkrade Station',
      ch2_muziek: 'The station square',
      ch2_veilig: 'The station square',
      ch2_stad: 'All across Kerkrade',
      ch3_intro: 'The Market Square, the final day',
      ch3_traditie: 'Behind the stage',
      ch3_innovatie: 'Behind the stage',
      epiloog: 'The Market Square, one month later'
    },

    scenes: {
      proloog: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p>The alarm clock rings at quarter to five. Not that Zef still needs it, his body is still attuned to the mine, even though it has been eight months since he last stepped into the cage.</p>

          <p>He swings his legs out of bed, and there it is again: that dry cough that will not go away. <em>Dust lungs</em>, Doctor Maassen said. As if it were nothing. As if you could simply buy a new pair of lungs at the department store.</p>

          <p>Outside, the sky above Kerkrade is the same grey as always. Grey from the coal dust that sits in every crack, in every wall, in every fibre of the curtains that his mother definitely washed just last month. The Domaniale Mine towers above the rooftops like a dark cathedral of steel and stone.</p>

          <p>But this morning the air feels different. Lighter, perhaps. Because something hangs in the city that Zef cannot quite place. A kind of fever, but the good kind. Everywhere he looks, he sees flags. Dutch, Belgian, British, French, they hang from windows that normally never open.</p>

          <p><em>August 1951.</em> In three weeks, the first World Music Competition begins. And Zef Houben, forty-three years old, musician with the Sint-Cecilia harmony and former miner, fixer by the grace of God, has just received the assignment of his life.</p>
        `,
        continueText: 'Continue \u2192',
        next: 'missie'
      },

      missie: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p>Sjeng's caf\u00e9 on the Market Square smells of tobacco and yesterday's coffee. Behind a table full of papers, maps, and lists sit two men who look as if they have not slept in days.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"Zef. Glad you're here. Sit down."</span></p>

          <p>Jan Meijs, chairman of the organising committee, pushes a sheet of paper towards him. Next to him, Pie Slijpen nods briefly. That man never wastes a word.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"Listen carefully, son. We are getting four thousand musicians. From seventeen countries. That is in three weeks. And we have a problem."</span></p>

          <p>Meijs taps his finger on the paper. It is a list of names, addresses, crossed-out lines, question marks.</p>

          <p><span class="dialogue"><span class="speaker">Pie Slijpen</span>"Beds. We don't have enough beds."</span></p>

          <p>The Home Hospitality system, the heart of the entire competition. No hotels for those thousands of musicians, no. They sleep at people's homes. With ordinary families. In ordinary houses on ordinary streets. That is the idea: brotherhood begins in the living room.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"The Hopel neighbourhood. We still need to arrange at least a hundred beds there. And you, Zef, you know everyone there. You are going to sort that out."</span></p>

          <p>He looks Zef straight in the eye.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"And there is something else. The Darlington Railway Band is coming. From Newcastle. Miners, just like us. We need to welcome them properly, those men are the reason this entire competition exists in the first place."</span></p>

          <p>Zef knows the story. Two years ago, in '49, those English miners came to Kerkrade. The Harmonie St. Aemiliaan from Bleijerheide and St. Pancratius from Nulland had invited them. Five thousand people came to watch. <em>Five thousand.</em> And then everyone knew: there has to be more of this.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"So, Zef. How are you going to handle it?"</span></p>
        `,
        continueText: 'Continue \u2192',
        next: 'ch1_keuze'
      },

      ch1_keuze: {
        chapter: 'Chapter 1',
        chapterTitle: 'The Bed Shortage',
        text: `
          <p>Zef leans back and thinks. A hundred families in three weeks willing to take a musician in — board, lodging and a competition pass in return. In Hopel, a neighbourhood where people are not exactly waiting for strangers in their homes. The war was only five years ago. Many people are cautious, on their guard. But Zef also knows that behind those closed curtains beats the biggest heart in Kerkrade.</p>

          <p>The question is: how do you get those doors to open?</p>
        `,
        choices: [
          {
            label: 'Door to door',
            desc: 'Put on your best suit and visit the people of Hopel in person. Look them in the eye, tell the story, ask them to their face.',
            next: 'ch1_deuren',
            effects: { stadstrots: 1, openheid: 1 }
          },
          {
            label: 'Caf\u00e9 De Kroon',
            desc: 'Gather the neighbourhood at the caf\u00e9. Beer at the ready, a good story, and let the community decide for themselves. Together is better than alone.',
            next: 'ch1_cafe',
            effects: { stadstrots: 2, openheid: 0 }
          }
        ]
      },

      ch1_deuren: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p>At nine o'clock, Zef stands in his only decent shirt, the white one with the folded cuffs that his mother irons every Sunday, at the first house on Hopelstraat.</p>

          <p>Mrs Cremers opens the door. Sixty years old, sharp eyes, arms crossed.</p>

          <p><span class="dialogue"><span class="speaker">Mrs Cremers</span>"What do you want?"</span></p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Mrs Cremers, I've come to ask if you would host a musician in your home. For the competition."</span></p>

          <p><span class="dialogue"><span class="speaker">Mrs Cremers</span>"Nonsense. I don't even have an extra bed."</span></p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"A mattress on the floor works too. It's about the gesture, ma'am. These men come from far away. Some of them lived through the war, just like us. And they only bring music."</span></p>

          <p>She looks at him for a long time. Then she turns around.</p>

          <p><span class="dialogue"><span class="speaker">Mrs Cremers</span>"One. No more. And he eats what I cook."</span></p>

          <p>And so it goes, all day long. Door after door. Sometimes a no. Sometimes a hesitant yes. Sometimes an enthusiastic "make it two!" Old M\u00fcller at number 37 offers him coffee and three beds. The Janssens give him a cold look and a closed door.</p>

          <p>By evening, Zef has sixty-two beds. Not quite enough. But it is a start, and the whole neighbourhood is talking about it.</p>
        `,
        continueText: 'Continue \u2192',
        next: 'ch1_frickley'
      },

      ch1_cafe: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p>That evening, Zef stands on a chair in Caf\u00e9 De Kroon. It is warm, it is packed, and it smells of beer and frying fat. Perfect.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Listen up, everyone. Quiet!"</span></p>

          <p>The murmur slowly dies away. Thirty, forty faces look up. Miners, housewives, the baker from the corner, old M\u00fcller who is always there.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"In three weeks, four thousand musicians are coming to Kerkrade. From seventeen countries. And they need somewhere to sleep. Not in hotels, we don't have any. Not in barracks, the army needs those. No. With us. In our homes."</span></p>

          <p>Murmuring. A laugh here and there.</p>

          <p><span class="dialogue"><span class="speaker">Someone in the back</span>"In my house? My wife will kill me!"</span></p>

          <p>Laughter. Zef grins along, but continues.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Do you remember, two years ago? Those English miners who came here to play? The Darlington Railway Band? Five thousand people watched on the Market Square. And afterwards, those Newcastle lads sat at Sjeng's bar, and we didn't understand a word they said, but it didn't matter. Because the music, <em>that</em> we understood."</span></p>

          <p>It is quiet now.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"This is going to be bigger than that. Much bigger. And the whole world is watching. Let's show them who we are."</span></p>

          <p>Old M\u00fcller stands up first.</p>

          <p><span class="dialogue"><span class="speaker">M\u00fcller</span>"Three beds. At my place."</span></p>

          <p>Then it goes quickly. The baker offers two spots. Mrs Hendriks says four, "if they bring their own towels." Within an hour, Zef has seventy-eight beds on his list.</p>

          <p>And the whole neighbourhood feels that this is <em>their</em> project.</p>
        `,
        continueText: 'Continue \u2192',
        next: 'ch1_frickley'
      },

      ch1_frickley: {
        chapter: null,
        chapterTitle: null,
        text: `

          <p>One week later. Kerkrade Station. The platform trembles under the approaching train from the north.</p>

          <p>The Darlington Railway Band from Newcastle. Miners, just like the men in Hopel. Except they speak English with such a thick accent that even other Englishmen cannot understand them. They step off the train with their instrument cases, crumpled suits, and that typically English mixture of shyness and determination.</p>

          <p>Zef is waiting with his list. The bandleader, a broad man with a moustache like a shoe brush, extends his hand.</p>

          <p><span class="dialogue"><span class="speaker">Bandleader</span>"F. Tompkins. Darlington Railway. Where d'we go, lad?"</span></p>

          <p>Zef shakes his hand. And now he must decide. On his list are two options for the English:</p>

          <p>The <strong>Schmitz family</strong> on Nieuwstraat, German-Limburgish background, former miners, large house, speak a little English. But the name sounds German, and some of the British... well, the war was only five years ago.</p>

          <p>Or the <strong>Pilipiec family</strong> on Hopelstraat, a welcoming family in the neighbourhood, smaller house, but nobody will think twice.</p>
        `,
        choices: [
          {
            label: 'The Schmitz family',
            desc: 'Miners recognise miners, regardless of the surname. That bond is stronger than any prejudice.',
            next: 'ch1_schmitz',
            effects: { stadstrots: 0, openheid: 2 }
          },
          {
            label: 'The Pilipiec family',
            desc: 'Keep it simple and safe. No unnecessary tension. The music is exciting enough.',
            next: 'ch1_janssen',
            effects: { stadstrots: 1, openheid: 0 }
          }
        ]
      },

      ch1_schmitz: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p><span class="dialogue"><span class="speaker">Zef</span>"Schmitz. Nieuwstraat. Old miners, just like you."</span></p>

          <p>He sees the hesitation in F. Tompkins's eyes. <em>Schmitz.</em> The name hangs in the air for a moment. But then Zef does something unplanned: he pulls up his shirt and shows the blue tattoo on his forearm. A pickaxe and a lamp. The miner's mark.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Same job. Same dust. Same lungs."</span></p>

          <p>Tompkins looks. Then he bursts out laughing and claps Zef on the shoulder.</p>

          <p><span class="dialogue"><span class="speaker">Tompkins</span>"Right then. Schmitz it is."</span></p>

          <p>That evening, in the living room of the Schmitz family, what Zef had hoped for happens. Father Schmitz, who worked under the Germans in '44 and never speaks of it, brings his old cornet down from the attic. Dusty, dented, unplayed for years. And without saying a word, he sits down next to F. Tompkins, who is busy polishing his own instrument.</p>

          <p>They play. No sheet music, no notes. Just two old miners who know the same melody without ever having spoken the same language.</p>

          <p>Mrs Schmitz stands in the doorway and wipes her eyes.</p>
        `,
        continueText: 'Continue to Chapter 2 \u2192',
        next: 'ch2_intro'
      },

      ch1_janssen: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p><span class="dialogue"><span class="speaker">Zef</span>"Pilipiec. Hopelstraat. Good people, warm family."</span></p>

          <p>Tompkins nods, satisfied. The name sounds neutral, friendly. No baggage.</p>

          <p>At the Pilipiec family, the English are welcomed with open arms. Mrs Pilipiec has made Sunday soup, "because I don't know what Englishmen eat, but everyone enjoys a good soup," and the children stare wide-eyed at the strange men with their big black cases.</p>

          <p>It is cosy. Warm. <em>Safe.</em></p>

          <p>After dinner, Tompkins plays a tune on his trumpet for the children. Little Marieke dances through the room in her nightgown. Everyone laughs.</p>

          <p>Later, when it is quiet and Zef walks home, he wonders whether he made the right choice. The Janssens are wonderful. But the Schmitz family might have offered something <em>more</em>. Something that goes beyond hospitality alone.</p>

          <p>He shakes his head. It is fine. The musicians are sleeping warm, the children are happy, and tomorrow the real chaos begins.</p>
        `,
        continueText: 'Continue to Chapter 2 \u2192',
        next: 'ch2_intro'
      },

      ch2_intro: {
        chapter: 'Chapter 2',
        chapterTitle: 'Tension at the Station',
        text: `
          <p>In the week before the competition, Kerkrade bursts at the seams.</p>

          <p>Every day, more ensembles arrive. Some by train — from Brussels, from Paris, from London, from Vienna — but most by bus, directly to the large car parks and the association buildings in the neighbourhoods. Seventeen countries, dozens of orchestras, thousands of cases full of instruments. Zef runs from platform to car park with his notebook and his list of host families.</p>

          <p>The city is transforming. Literally. Where yesterday there was only grey coal dust, flags now flutter from countries that most residents of Kerkrade did not even know existed. Banners hang across the Market Square. The baker has baked special bread in the shape of musical notes. Children follow musicians around as if they were circus performers.</p>

          <p>And then Thursday morning arrives.</p>

          <p>Zef stands near the car park, waiting for the bus from Germany. It carries a German brass ensemble, the <strong>Musikvereine Hilden-Ohligs</strong>. Good musicians, he has heard. But German. And in 1951, five years after the war, that is no small detail.</p>

          <p>At the same moment, a bus from the Belgian East Cantons pulls up in the square. A Belgian ensemble steps out: the <strong>Fanfare B\u00fcllingen</strong>. Men, some of whom served in the resistance. Men who remember the Germans very well.</p>

          <p>The two groups stand on the same station square. The Germans with their cases on the left. The Belgians with their instruments on the right. And between them: ten metres of empty cobblestones and a silence in which you could hear a pin drop.</p>

          <p>Pie Slijpen appears beside Zef and whispers:</p>

          <p><span class="dialogue"><span class="speaker">Pie Slijpen</span>"This could go wrong, Zef. Keep it calm."</span></p>

          <p>One of the Belgian musicians stares at the Germans. His face is hard. Zef sees his hands trembling, not from the cold.</p>
        `,
        choices: [
          {
            label: 'Let the music speak',
            desc: 'Walk to the middle, take an instrument from someone, and start playing. Music is the only language everyone here understands. Don\u2019t force them together, invite them.',
            next: 'ch2_muziek',
            effects: { stadstrots: 1, openheid: 2 }
          },
          {
            label: 'Guide them safely',
            desc: 'Keep the groups separate. Guide the Germans to the right, the Belgians to the left. No scenes, no risk. There is an entire competition to bring them together later.',
            next: 'ch2_veilig',
            effects: { stadstrots: 1, openheid: 0 }
          }
        ]
      },

      ch2_muziek: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p>Zef's heart pounds. But he thinks of something Jan Meijs said last week: <em>"If we keep it about the music, it will work."</em></p>

          <p>He walks to the nearest Belgian musician, a man with a trombone in a worn case. Zef leans towards him.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Excusez-moi, monsieur. Pouvez-vous jouer quelque chose? Maintenant?"</span></p>

          <p>The man looks at him as if he has lost his mind. But then, perhaps because of the absurdity of the moment, perhaps because of something deeper, he takes his trombone from the case. He plays. A simple melody. Warm, full, with that typical Belgian vibrato.</p>

          <p>The notes float across the station square.</p>

          <p>It lasts maybe ten seconds. Then one of the German musicians opens his case. A clarinet. He searches for the key, finds it, and joins in.</p>

          <p>Another instrument. And another. An oboe. A trumpet. A horn.</p>

          <p>Within two minutes, twelve musicians stand playing on the empty station square. No conductor, no score. Just sound seeking sound. German beside Belgian. Brass beside woodwind. War beside peace.</p>

          <p>Pie Slijpen stands with his mouth open. A station worker leans on her broom and weeps. A group of children starts clapping.</p>

          <p>When the piece, if you can call it a piece, stops, there is a moment of silence. Then the Belgian trombonist extends his hand to the German clarinettist.</p>

          <p><span class="dialogue"><span class="speaker">Trombonist</span>"Bien jou\u00e9."</span></p>

          <p>The German takes the hand.</p>

          <p><span class="dialogue"><span class="speaker">Clarinettist</span>"Danke. Gleichfalls."</span></p>

          <p>Is everything fine now? No. It does not work that simply. But something has shifted, there on that cold station square in Kerkrade. Something small. Something that might grow.</p>
        `,
        continueText: 'Continue \u2192',
        next: 'ch2_stad'
      },

      ch2_veilig: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p>Zef breathes in. His instinct says: don't force it.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Alright. Pierre, you take the Belgians left, through Stationsstraat. I'll take the Germans right, via the Market. We'll meet at the registration."</span></p>

          <p>Pie Slijpen nods approvingly. Professional, calm, sorted.</p>

          <p>The two groups depart in opposite directions. The Belgian trombonist looks back once at the Germans, his face unreadable. Then he disappears around the corner.</p>

          <p>Zef walks at the front with the German orchestra. They are polite, correct. The bandleader, a tall, thin man with glasses, thanks Zef in broken Dutch.</p>

          <p><span class="dialogue"><span class="speaker">Bandleader</span>"Dankesch\u00f6n. Wir... wissen, dass es nicht einfach ist."</span></p>

          <p>Zef nods. He knows. It is not easy. For anyone.</p>

          <p>Later that evening, in Caf\u00e9 De Kroon, he hears that the Belgian and German musicians kept a polite distance from each other all day. No incidents. No problems.</p>

          <p>But also no handshakes. No shared melodies. No moment that people will still tell their grandchildren about in twenty years.</p>

          <p>Zef drinks his beer and stares at the foam. Should he have done more? Or was this exactly enough?</p>
        `,
        continueText: 'Continue \u2192',
        next: 'ch2_stad'
      },

      ch2_stad: {
        chapter: null,
        chapterTitle: null,
        text: `

          <p>The days that follow are a blur of chaos, music, and improvisation.</p>

          <p>Zef hustles. That is what he does. He hustles beer crates when supplies run out. He hustles a blacksmith to repair a tuba that did not survive the journey from Denmark. He hustles extra sleeping spots when a Norwegian ensemble arrives with twice as many men as registered.</p>

          <p>And slowly, day by day, he sees something happening to Kerkrade.</p>

          <p>The city comes alive. Not a little, <em>completely.</em></p>

          <p>On the Market Square, a Swedish ensemble rehearses beside an Italian one, and the cold Scandinavian sounds flow together with the warm Mediterranean tones in a way nobody expected. On Hopelstraat, English musicians from the Darlington Railway Band teach the children "It's a Long Way to Tipperary", and the children teach them a Dutch folk song in return.</p>

          <p>At the <em>Kirchroa Alaaf</em> exhibition on the Mucherveld, queues stretch two streets long. Two thousand people, three thousand. The organisation had expected fifty thousand visitors for the entire competition. They are already at a hundred thousand and it is only Wednesday.</p>

          <p>Jan Meijs pulls Zef aside.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"It's getting out of hand, Zef. In the good sense. But the final... we need to talk about that."</span></p>
        `,
        continueText: 'Continue to Chapter 3 \u2192',
        next: 'ch3_intro'
      },

      ch3_intro: {
        chapter: 'Chapter 3',
        chapterTitle: 'The Final on the Market Square',
        text: `

          <p>The final day. The Market Square of Kerkrade is unrecognisable.</p>

          <p>Where miners normally walk home with empty lunch boxes, there now stand grandstands. Makeshift, built from wood and iron that Zef "borrowed" from a construction site at the Domaniale. The stage is decorated with the flags of all seventeen participating countries, and the sun, which finally, <em>finally</em> breaks through the grey clouds, makes the brass of the instruments gleam like gold.</p>

          <p>Two hundred thousand visitors. That number will make the papers later. But right now, at this moment, it is simply a sea of people. A sea that breathes, talks, laughs, and waits.</p>

          <p>Zef stands behind the stage with Jan Meijs and Pie Slijpen. There is a decision to be made. Not by the jury, not by the audience, but by the organisation. By them.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"The committee is divided, Zef. We must choose. And I want to hear your opinion."</span></p>

          <p>It is about the future. About what this competition will <em>become</em>.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"One half wants to keep it as it is. A classic competition. Strict jury, fixed rules, tradition. A proven formula. That attracts top-level orchestras."</span></p>

          <p>He pauses.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"The other half wants to go further. Open divisions, new musical forms, a place where orchestras do not just compete but also <em>discover</em>. A laboratory, they say. The place where the future of wind music is created."</span></p>

          <p>He looks at Zef.</p>

          <p><span class="dialogue"><span class="speaker">Jan Meijs</span>"What do you think, son? What should it become?"</span></p>
        `,
        choices: [
          {
            label: 'Guard the tradition',
            desc: 'Hold on to what works. A tight, fair competition with high standards. Let the quality speak for itself. That is how you build something that lasts a hundred years.',
            next: 'ch3_traditie',
            effects: { stadstrots: 2, openheid: 0 }
          },
          {
            label: 'Embrace the future',
            desc: 'Make it bigger than a competition. A place where musicians from around the world create something new together. The laboratory of wind music. That is what makes Kerkrade unique.',
            next: 'ch3_innovatie',
            effects: { stadstrots: 0, openheid: 2 }
          }
        ]
      },

      ch3_traditie: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p><span class="dialogue"><span class="speaker">Zef</span>"Tradition, Mr Meijs. But not out of fear, out of strength."</span></p>

          <p>He points to the stage, where the next ensemble is setting up.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"Look at those faces. Those men have rehearsed for months. Some saved their holiday money to come here. They don't want to <em>experiment</em>, they want to show the best of themselves. And they want a jury to say: you are the best. That is what this is about."</span></p>

          <p>Jan Meijs listens.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"If you create a good competition, fair, strict, with high standards, then the best orchestras in the world will come. And when the best come, the world watches. Then this is not just a festival. Then this becomes the place where you have proven you are the very best."</span></p>

          <p>Meijs nods slowly.</p>

          <p>That afternoon, the committee decides: the WMC will be a competition in the classic sense. Strict juries, fixed categories, and one goal: the highest musical standard in the world.</p>

          <p>On stage, a Belgian ensemble plays a march so tight and pure that even the children in the stands fall silent. The jury takes notes. The audience waits. And when the last note fades, the applause erupts, not politely but <em>thunderously</em>, from two hundred thousand pairs of hands at once.</p>

          <p>Zef stands in the wings and feels it through his entire body. This is it. This is something great.</p>
        `,
        continueText: 'Continue to the ending \u2192',
        next: 'epiloog'
      },

      ch3_innovatie: {
        chapter: null,
        chapterTitle: null,
        text: `
          <p><span class="dialogue"><span class="speaker">Zef</span>"Forward. Always forward."</span></p>

          <p>He thinks of the station square. Of the trombone and the clarinet that found a melody together that was not in any sheet music.</p>

          <p><span class="dialogue"><span class="speaker">Zef</span>"A competition, that can happen anywhere. In Brussels, in London, in Vienna. But a place where musicians from all over the world create something <em>new</em> together? Where a harmonie from Newcastle stands next to a harmonie from Paris and together they sound like something no one has ever heard before? That can only happen here. Only in Kerkrade."</span></p>

          <p>Pie Slijpen, who has been silent until now, clears his throat.</p>

          <p><span class="dialogue"><span class="speaker">Pie Slijpen</span>"The lad is right."</span></p>

          <p>It is the most Slijpen has said all week. Jan Meijs smiles.</p>

          <p>That afternoon, the programme is adjusted. Alongside the competitions, an open stage is added. Orchestras from different countries are invited to play together, unrehearsed, without a score, purely by ear and feeling. It is messy. It is unpredictable. It is <em>beautiful.</em></p>

          <p>An Italian trumpeter and a Dutch horn player create a duet that no one will ever forget. The audience rises to its feet. Not for the technique, for the feeling. For that moment when two strangers spoke the same language without ever having learned it.</p>

          <p>Zef stands beside the stage and knows: this is more than a competition. This is a promise.</p>
        `,
        continueText: 'Continue to the ending \u2192',
        next: 'epiloog'
      },

      epiloog: {
        chapter: 'Epilogue',
        chapterTitle: 'After the Last Note',
        text: `
          <p>One month later.</p>

          <p>The flags are gone. The grandstands dismantled. The wood returned to the construction site at the Domaniale. Zef brought it back personally, at night, because officially he had never "borrowed" it.</p>

          <p>Kerkrade is grey again. The coal dust hangs in the air once more, the alarm clocks ring at quarter to five again, and on Hopelstraat the extra beds have been put away.</p>

          <p>But something has changed.</p>

          <p>Mrs Cremers has placed a photograph on her windowsill of the Norwegian tuba player who stayed with her. "A nice young man," she tells everyone who will listen. "Ate everything." At the Schmitz home, a framed letter from F. Tompkins hangs on the wall, in an English they do not entirely understand but cherish nonetheless.</p>

          <p>And Zef? Zef sits on the bench by the Market Square, in the same spot where three weeks ago two hundred thousand people stood. It is quiet now. Only a blackbird sings, somewhere on a rooftop.</p>

          <p>He coughs. Those cursed lungs. But he smiles too.</p>

          <p>Because he knows something that the rest of the world does not yet know:</p>

          <p><em>This was only the beginning.</em></p>

          <p>In 1954, they will do it again. And then it will be bigger. And then the whole country will be part of it. And then the whole world.</p>
        `,
        continueText: null,
        next: null,
        isEnding: true
      }
    },

    endings: {
      olympisch: {
        title: 'The Olympic Games of Wind Music',
        text: `
          <p>In the years that follow, the WMC grows into the largest and most prestigious music competition in the world. The combination of high standards and an open, exploratory spirit attracts orchestras from every continent.</p>
          <p>The host families of Kerkrade become legendary. The Home Hospitality system grows with the festival, and in 2026, seventy-five years later, residents once again open their doors to musicians from around the world.</p>
          <p>Zef Houben will not live to see all of it. But on the Market Square of Kerkrade, where it was once grey with coal dust, there now stands a city that the whole world knows as <strong>Klankstad</strong>.</p>
          <p>And it all started with a hundred beds on Hopelstraat.</p>
        `,
        condition: (s) => s.stadstrots >= 3 && s.openheid >= 3
      },
      trots: {
        title: 'Our Own Festival',
        text: `
          <p>The WMC becomes an institution. Tight, professional, and deeply rooted in the community of Kerkrade. Winning in Kerkrade is the highest honour for any wind orchestra.</p>
          <p>The city is proud. Immensely proud. But the world beyond the mining region knows the festival less well than it could. It is a celebration by and for its own people, and perhaps that is exactly enough.</p>
          <p>Zef would have wanted it this way. He always belonged more to here than to there.</p>
        `,
        condition: (s) => s.stadstrots >= 3 && s.openheid < 3
      },
      wereldburger: {
        title: 'The Global Citizen',
        text: `
          <p>Kerkrade becomes a hub of musical exchange. Orchestras come not just to compete, but to learn, to share, to grow. The international character of the WMC is unprecedented.</p>
          <p>But on Hopelstraat, people sometimes wonder whether the festival still belongs to them. The flags are there, the music too, but the heart? It sometimes still searches for the warmth of that first time.</p>
          <p>Zef would say: "Son, you have to open the door. But don't forget where the key is."</p>
        `,
        condition: (s) => s.stadstrots < 3 && s.openheid >= 3
      },
      stilte: {
        title: 'The Quiet Hope',
        text: `
          <p>The competition continues, every four years, as promised. But the spark of '51, that strange, inexplicable magic, is hard to capture in rules and structures.</p>
          <p>Yet on quiet evenings, when an old miner picks up a framed photograph of a musician from a distant land from the mantelpiece, that spark is still there. Small, but inextinguishable.</p>
          <p>Because what began in Kerkrade was never just about music. It was the discovery that strangers need not remain strangers. And that is a lesson you never forget. Never.</p>
        `,
        condition: (s) => true
      }
    }
  }
};

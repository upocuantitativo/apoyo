// Mapa transfronterizo de recursos contra la trata por país UE.
// Datos públicos verificables (líneas oficiales, autoridades nacionales y
// ONGs reconocidas). Cualquier número de teléfono debe verificarse antes de
// publicar la versión definitiva — los recogidos aquí son los de referencia
// pública en 2025/2026.
window.RESOURCES = {
  countries: [
    {
      code: "ES",
      name: "España",
      flag: "🇪🇸",
      emergency: "112",
      trafficking_line: {
        number: "900 10 50 90",
        name: "Línea contra la trata de mujeres con fines de explotación sexual",
        info: "Gratuita, anónima, 24h, multilingüe.",
      },
      authority: "Delegación del Gobierno contra la Violencia de Género; Centro de Inteligencia contra el Terrorismo y el Crimen Organizado (CITCO).",
      ngos: [
        { name: "Proyecto Esperanza (Adoratrices)", url: "https://www.proyectoesperanza.org/", note: "Atención integral a víctimas de trata, acogida." },
        { name: "APRAMP", url: "https://apramp.org/", note: "Unidad móvil 24h, identificación y acompañamiento." },
        { name: "Diaconía España", url: "https://diaconia.es/", note: "Proyecto Desactiva la Trata (digital)." },
        { name: "Sevilla Acoge", url: "https://www.sevillaacoge.org/", note: "Recursos sociales en Sevilla." },
      ],
    },
    {
      code: "FR",
      name: "France",
      flag: "🇫🇷",
      emergency: "112 / 17",
      trafficking_line: {
        number: "01 40 26 04 45",
        name: "Ac.Sé — Dispositif national d'accueil et de protection",
        info: "Réseau national de mise en sécurité des victimes de traite.",
      },
      authority: "MIPROF (Mission interministérielle pour la protection des femmes contre les violences et la lutte contre la traite).",
      ngos: [
        { name: "Comité contre l'esclavage moderne (CCEM)", url: "https://www.ccem.org/" },
        { name: "Les Amis du Bus des Femmes", url: "https://www.lesamisdubusdesfemmes.org/" },
      ],
    },
    {
      code: "IT",
      name: "Italia",
      flag: "🇮🇹",
      emergency: "112",
      trafficking_line: {
        number: "800 290 290",
        name: "Numero Verde Anti-tratta",
        info: "Gratuito, anonimo, 24h, multilingue.",
      },
      authority: "Dipartimento per le Pari Opportunità — Presidenza del Consiglio dei Ministri.",
      ngos: [
        { name: "On the Road", url: "https://www.ontheroadonlus.it/" },
        { name: "Comunità Papa Giovanni XXIII", url: "https://www.apg23.org/" },
      ],
    },
    {
      code: "DE",
      name: "Deutschland",
      flag: "🇩🇪",
      emergency: "112 / 110",
      trafficking_line: {
        number: "08000 116 016",
        name: "Hilfetelefon Gewalt gegen Frauen",
        info: "Kostenlos, anonym, 24h, in 18 Sprachen.",
      },
      authority: "Bundeskriminalamt (BKA); Bundesweiter Koordinierungskreis gegen Menschenhandel (KOK).",
      ngos: [
        { name: "KOK e.V.", url: "https://www.kok-gegen-menschenhandel.de/" },
        { name: "SOLWODI", url: "https://www.solwodi.de/" },
      ],
    },
    {
      code: "RO",
      name: "România",
      flag: "🇷🇴",
      emergency: "112",
      trafficking_line: {
        number: "0 800 800 678",
        name: "Linia telefonică gratuită ANITP",
        info: "Agenția Națională Împotriva Traficului de Persoane.",
      },
      authority: "ANITP — Agenția Națională Împotriva Traficului de Persoane.",
      ngos: [
        { name: "ADPARE", url: "https://www.adpare.eu/" },
        { name: "eLiberare", url: "https://eliberare.com/" },
      ],
    },
    {
      code: "BG",
      name: "България",
      flag: "🇧🇬",
      emergency: "112",
      trafficking_line: {
        number: "+359 2 981 76 86",
        name: "National Commission for Combating Trafficking in Human Beings",
        info: "Помощ за жертви на трафик.",
      },
      authority: "NCCTHB — Национална комисия за борба с трафика на хора.",
      ngos: [
        { name: "Animus Association", url: "https://animusassociation.org/" },
        { name: "Nadja Center Foundation", url: "https://centernadja.bg/" },
      ],
    },
    {
      code: "PT",
      name: "Portugal",
      flag: "🇵🇹",
      emergency: "112",
      trafficking_line: {
        number: "800 202 148",
        name: "SOS Imigrante",
        info: "Atendimento gratuito a imigrantes, multilingue.",
      },
      authority: "APF — Observatório do Tráfico de Seres Humanos.",
      ngos: [
        { name: "APAV", url: "https://apav.pt/", note: "Apoio à vítima — Unidade UAVMD trata." },
        { name: "Saúde em Português", url: "https://www.saudeportugues.org/" },
      ],
    },
    {
      code: "EL",
      name: "Ελλάδα",
      flag: "🇬🇷",
      emergency: "112",
      trafficking_line: {
        number: "1109",
        name: "EKKA — Εθνική γραμμή για την Παιδική Προστασία και ενημέρωση για την Εμπορία Ανθρώπων",
        info: "24h, gratuita.",
      },
      authority: "Office of the National Rapporteur on Trafficking in Human Beings (Ministry of Foreign Affairs).",
      ngos: [
        { name: "A21", url: "https://www.a21.org/" },
        { name: "ARSIS", url: "https://arsis.gr/" },
      ],
    },
    {
      code: "BE",
      name: "België / Belgique",
      flag: "🇧🇪",
      emergency: "112",
      trafficking_line: {
        number: "+32 2 511 64 64",
        name: "Centres spécialisés (PAG-ASA, Payoke, Sürya)",
        info: "Trois centres reconnus pour l'accueil et l'accompagnement.",
      },
      authority: "Myria — Federal Migration Centre; SPF Justice.",
      ngos: [
        { name: "PAG-ASA", url: "https://pag-asa.be/" },
        { name: "Payoke", url: "https://www.payoke.be/" },
        { name: "Sürya", url: "https://asblsurya.be/" },
      ],
    },
    {
      code: "NL",
      name: "Nederland",
      flag: "🇳🇱",
      emergency: "112",
      trafficking_line: {
        number: "088 1239 999",
        name: "CoMensha — Coördinatiecentrum tegen Mensenhandel",
        info: "Coordinación nacional de víctimas.",
      },
      authority: "Nationaal Rapporteur Mensenhandel en Seksueel Geweld tegen Kinderen.",
      ngos: [
        { name: "CoMensha", url: "https://www.comensha.nl/" },
        { name: "Fier", url: "https://www.fier.nl/" },
      ],
    },
  ],

  // Recursos transversales europeos
  transnational: [
    {
      name: "EU Anti-Trafficking Coordinator",
      url: "https://home-affairs.ec.europa.eu/policies/internal-security/organised-crime-and-human-trafficking/together-against-trafficking-human-beings_en",
      note: "Punto focal de la Comisión Europea.",
    },
    {
      name: "Council of Europe — GRETA",
      url: "https://www.coe.int/en/web/anti-human-trafficking",
      note: "Grupo de expertos del Consejo de Europa contra la trata.",
    },
    {
      name: "Europol — Trafficking in Human Beings",
      url: "https://www.europol.europa.eu/crime-areas/trafficking-in-human-beings",
    },
    {
      name: "ICMPD — Anti-Trafficking Programme",
      url: "https://www.icmpd.org/our-work/migration-dialogues/anti-trafficking",
    },
    {
      name: "IOM Counter-Trafficking",
      url: "https://www.iom.int/counter-trafficking",
    },
  ],
};

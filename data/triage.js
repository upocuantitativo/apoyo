// Triage multilingüe: clasifica el mensaje del usuario en categorías de riesgo
// ANTES de invocar al LLM, para evitar alucinaciones en situaciones críticas.
//
// Categorías:
//   - crisis          → peligro físico inmediato / autolesión / captor presente
//   - menor           → la persona o alguien mencionado es menor de edad
//   - identificacion  → indicadores OIM/Palermo de trata sin pedir ayuda explícita
//   - informacion     → consulta informativa normal (flujo RAG)
//
// El módulo es client-side y no llama a ningún servicio externo.

window.TRIAGE = (function () {
  // Patrones por idioma. Coincidencia por palabra completa cuando es corta,
  // por subcadena (substring) cuando es larga. Multilingüe básico: ES, EN, FR,
  // AR, RO, RU. Las víctimas escriben con errores, así que se prioriza recall.
  const PATTERNS = {
    crisis: [
      // español
      "me va a matar","me van a matar","me pega","me pegan","me va a pegar",
      "me esta golpeando","me está golpeando","quiero morir","quiero morirme",
      "matarme","suicidarme","suicidio","no quiero vivir","peligro ahora",
      "estoy en peligro","ayuda urgente","socorro","esta aqui","está aquí",
      "me persigue","encerrada","encerrado","no me deja salir","me obliga",
      "violacion","violación","me esta violando","me está violando",
      "sangrando","sangro mucho","no puedo respirar",
      // english
      "he will kill me","they will kill me","he is hitting me","help me now",
      "i want to die","kill myself","suicide","i am in danger","danger now",
      "he is here","she is here","locked in","cannot leave","he forces me",
      "rape","raping","bleeding","cannot breathe","emergency",
      // français
      "il va me tuer","ils vont me tuer","il me frappe","aide urgente",
      "je veux mourir","me suicider","suicide","en danger maintenant","au secours",
      "il est ici","enfermée","enfermé","il me force","viol","je saigne",
      // arabic (transliterado y árabe)
      "ساعدوني","النجدة","سيقتلني","يضربني","أريد أن أموت","انتحار","خطر",
      "yusaaiduni","najda","sayaqtuluni","khatar",
      // română
      "ma omoara","mă omoară","ma loveste","mă lovește","ajutor urgent",
      "vreau sa mor","vreau să mor","sinucidere","sunt in pericol","sunt în pericol",
      // русский
      "он меня убьет","убьёт","он бьет","он бьёт","помогите","я в опасности",
      "хочу умереть","самоубийство",
    ],
    menor: [
      "tengo 13","tengo 14","tengo 15","tengo 16","tengo 17","soy menor",
      "mi hija menor","mi hijo menor","una niña","una nina","un niño","un nino",
      "menor de edad","tiene 13","tiene 14","tiene 15","tiene 16","tiene 17",
      "i am 13","i am 14","i am 15","i am 16","i am 17","i'm a minor","underage",
      "minor","my daughter is","my son is","a girl","a child","a kid",
      "j'ai 13","j'ai 14","j'ai 15","j'ai 16","j'ai 17","mineure","mineur",
      "ma fille","mon fils","une enfant","un enfant",
      "قاصر","طفلة","طفل","ابنتي","ابني",
      "minor","sunt minor","sunt minoră","fiica mea","fiul meu",
      "несовершеннолет","моя дочь","мой сын","ребёнок","ребенок",
    ],
    identificacion: [
      // indicadores Palermo / OIM detectados sin que la persona pida ayuda
      "me quitaron el pasaporte","me retienen el pasaporte","no tengo mis papeles",
      "le debo dinero","tengo una deuda","trabajo para pagar","no me pagan",
      "no me dejan salir","controlan mis llamadas","controlan mi telefono",
      "no puedo hablar con mi familia","me trajeron engañada","me trajeron enganada",
      "me dijeron que era otro trabajo","me amenazan","mi familia esta amenazada",
      "tengo que pagar","no conozco la ciudad","no sé dónde estoy","no se donde estoy",
      "they took my passport","my passport is held","i owe money","working off debt",
      "they control my phone","they don't let me leave","i was deceived",
      "different job than promised","they threaten my family",
      "ils ont pris mon passeport","je dois de l'argent","ils contrôlent",
      "je ne peux pas partir","on m'a trompée","menacent ma famille",
      "أخذوا جوازي","علي دين","يتحكمون بهاتفي","لا يسمحون لي بالخروج","خدعوني",
      "mi-au luat pașaportul","mi-au luat pasaportul","datorez bani",
      "îmi controlează telefonul","imi controleaza telefonul","nu mă lasă să plec",
      "забрали паспорт","я должна денег","контролируют телефон",
      "не выпускают","меня обманули",
    ],
  };

  function normalize(s) {
    return (s || "").toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[¿?¡!.,;:()"']/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function matchAny(haystack, needles) {
    const out = [];
    for (const n of needles) {
      const norm = normalize(n);
      if (norm.length >= 2 && haystack.includes(norm)) out.push(n);
    }
    return out;
  }

  // Devuelve { category, confidence, matched }
  // crisis tiene prioridad absoluta, después menor, después identificacion.
  function classify(text) {
    const hay = " " + normalize(text) + " ";

    const crisis = matchAny(hay, PATTERNS.crisis);
    if (crisis.length > 0) {
      return { category: "crisis", confidence: Math.min(1, crisis.length * 0.6), matched: crisis };
    }
    const menor = matchAny(hay, PATTERNS.menor);
    if (menor.length > 0) {
      return { category: "menor", confidence: Math.min(1, menor.length * 0.5), matched: menor };
    }
    const indic = matchAny(hay, PATTERNS.identificacion);
    if (indic.length >= 2) {
      // Solo activamos identificación si hay al menos 2 indicadores distintos,
      // para reducir falsos positivos.
      return { category: "identificacion", confidence: Math.min(1, indic.length * 0.35), matched: indic };
    }
    return { category: "informacion", confidence: 1, matched: [] };
  }

  // Respuesta plantilla para crisis. NO se llama al LLM en este caso.
  // Multilingüe básico vía detección de pista por keywords del propio mensaje.
  function crisisResponse(userText) {
    const t = normalize(userText);
    let lang = "es";
    if (/[a-z]/.test(t) && /\b(help|kill|die|danger|i am|i'm)\b/.test(t)) lang = "en";
    else if (/\b(aide|tuer|mourir|danger|je suis)\b/.test(t)) lang = "fr";
    else if (/[ا-ي]/.test(userText)) lang = "ar";
    else if (/\b(ajutor|omoara|mor|pericol|sunt)\b/.test(t)) lang = "ro";
    else if (/[а-я]/.test(userText)) lang = "ru";

    const M = {
      es: {
        title: "Estoy aquí. Tu seguridad es lo primero.",
        body:
          "Si estás en **peligro inmediato**, llama al **112** ahora mismo. Es gratuito y funciona desde cualquier teléfono, también sin cobertura ni saldo.\n\n" +
          "Si no puedes hablar, marca 112 y deja la línea abierta o pulsa cualquier tecla para que sepan que estás ahí.\n\n" +
          "También puedes llamar a la **línea contra la trata: 900 10 50 90**. Es gratuita, anónima y atiende 24 horas en varios idiomas.\n\n" +
          "Si crees que tu dispositivo está siendo vigilado, usa el botón **«Salir rápido»** que está arriba en esta página. Borra todo y te lleva a otra web.\n\n" +
          "Cuando estés a salvo, vuelve y aquí seguiré para ayudarte con lo que necesites.",
      },
      en: {
        title: "I'm here. Your safety comes first.",
        body:
          "If you are in **immediate danger**, call **112** right now. It is free and works from any phone, even without a SIM or credit.\n\n" +
          "If you cannot speak, dial 112 and keep the line open, or press any key so they know someone is there.\n\n" +
          "You can also call the **anti-trafficking helpline: 900 10 50 90** (Spain). It is free, anonymous and available 24/7 in several languages.\n\n" +
          "If you think your device is being monitored, use the **«Quick exit»** button at the top of this page. It clears everything and takes you to a neutral site.\n\n" +
          "When you are safe, come back and I will be here to help you.",
      },
      fr: {
        title: "Je suis là. Ta sécurité passe avant tout.",
        body:
          "Si tu es en **danger immédiat**, appelle le **112** maintenant. C'est gratuit, depuis n'importe quel téléphone, même sans crédit.\n\n" +
          "Si tu ne peux pas parler, compose le 112 et laisse la ligne ouverte.\n\n" +
          "Tu peux aussi appeler la **ligne contre la traite : 900 10 50 90** (Espagne). Gratuite, anonyme, 24h/24, plusieurs langues.\n\n" +
          "Si tu penses que ton appareil est surveillé, utilise le bouton **«Sortie rapide»** en haut. Il efface tout et t'emmène ailleurs.",
      },
      ar: {
        title: "أنا هنا. سلامتك أولاً.",
        body:
          "إذا كنتِ في **خطر فوري**، اتصلي بالرقم **112** الآن. المكالمة مجانية وتعمل من أي هاتف حتى بدون شريحة أو رصيد.\n\n" +
          "إذا لم تستطيعي التحدث، اطلبي 112 واتركي الخط مفتوحاً.\n\n" +
          "يمكنك أيضاً الاتصال بـ **خط مكافحة الاتجار: 900 10 50 90** (إسبانيا). مجاني، مجهول، 24 ساعة، بعدة لغات.\n\n" +
          "إذا كنت تعتقدين أن جهازك مراقَب، استخدمي زر **«خروج سريع»** في الأعلى.",
      },
      ro: {
        title: "Sunt aici. Siguranța ta este pe primul loc.",
        body:
          "Dacă ești în **pericol imediat**, sună la **112** acum. Este gratuit, de pe orice telefon, chiar fără credit.\n\n" +
          "Dacă nu poți vorbi, formează 112 și lasă linia deschisă.\n\n" +
          "Poți suna și la **linia anti-trafic: 900 10 50 90** (Spania). Gratuit, anonim, 24/7, în mai multe limbi.\n\n" +
          "Dacă crezi că telefonul tău este urmărit, folosește butonul **«Ieșire rapidă»** din partea de sus.",
      },
      ru: {
        title: "Я здесь. Ваша безопасность важнее всего.",
        body:
          "Если вы в **непосредственной опасности**, позвоните по **112** прямо сейчас. Бесплатно, с любого телефона, даже без SIM-карты или баланса.\n\n" +
          "Если вы не можете говорить, наберите 112 и оставьте линию открытой.\n\n" +
          "Можно также позвонить на **линию против торговли людьми: 900 10 50 90** (Испания). Бесплатно, анонимно, 24/7, на нескольких языках.\n\n" +
          "Если вы думаете, что устройство под наблюдением, используйте кнопку **«Быстрый выход»** сверху.",
      },
    };
    return M[lang] || M.es;
  }

  function minorNote(lang) {
    const M = {
      es: "He notado que mencionas a una persona menor de edad. La protección de menores es prioritaria. Puedes contactar con **ANAR (900 20 20 10, gratuito y 24h)** o con Fiscalía de Menores. El **112** atiende cualquier situación de riesgo. Sigue contándome lo que necesitas.",
      en: "I notice you mention a person under 18. Protection of minors is a top priority. In Spain you can call **ANAR (900 20 20 10, free, 24/7)** or contact the Juvenile Prosecutor's Office. **112** handles any urgent situation. Please continue and tell me what you need.",
      fr: "Je remarque que tu parles d'un·e mineur·e. La protection des mineurs est prioritaire. En Espagne : **ANAR (900 20 20 10, gratuit, 24h/24)** ou le Parquet des mineurs. Le **112** prend en charge toute urgence.",
    };
    return M[lang] || M.es;
  }

  return { classify, crisisResponse, minorNote, normalize };
})();

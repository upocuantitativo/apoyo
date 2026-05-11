// Apoyo / ARIADNA — chatbot estático.
// Sin claves de API. LLM gratuito vía Pollinations.ai.
// Arquitectura de razonamiento:
//   1. Consentimiento explícito al inicio de sesión.
//   2. Triage del mensaje (crisis / menor / identificación / información).
//      En crisis no se invoca al LLM: respuesta plantilla fija.
//   3. Retrieval híbrido sobre la KB (BM25-lite + bonificación por keywords).
//   4. Generación con citación verificada: chunk_ids enviados al LLM y
//      post-validados antes de mostrar la respuesta.
//   5. Privacidad: borrado granular, resumen anonimizado para escalado,
//      botón pánico que limpia todo y redirige.

const SPECIALIST_EMAIL = "especialista@sevilla.org";
const LLM_ENDPOINT = "https://text.pollinations.ai/openai";
const LLM_MODEL = "openai";
const PANIC_REDIRECT = "https://www.google.com/search?q=weather";
const STORAGE_PREFIX = "apoyo_";

const LANGS = [
  { code: "es",    native: "Español",         en: "Spanish" },
  { code: "en",    native: "English",         en: "English" },
  { code: "fr",    native: "Français",        en: "French" },
  { code: "ar",    native: "العربية",         en: "Arabic" },
  { code: "pt",    native: "Português",       en: "Portuguese" },
  { code: "ro",    native: "Română",          en: "Romanian" },
  { code: "ru",    native: "Русский",         en: "Russian" },
  { code: "uk",    native: "Українська",      en: "Ukrainian" },
  { code: "zh-CN", native: "中文",              en: "Chinese" },
  { code: "bn",    native: "বাংলা",            en: "Bengali" },
  { code: "hi",    native: "हिन्दी",            en: "Hindi" },
  { code: "ur",    native: "اردو",             en: "Urdu" },
  { code: "fa",    native: "فارسی",            en: "Persian" },
];
const LANGS_EXTRA = [
  { code: "sw", native: "Kiswahili",  en: "Swahili" },
  { code: "wo", native: "Wolof",      en: "Wolof" },
  { code: "ha", native: "Hausa",      en: "Hausa" },
  { code: "yo", native: "Yorùbá",     en: "Yoruba" },
  { code: "ig", native: "Igbo",       en: "Igbo" },
  { code: "zu", native: "isiZulu",    en: "Zulu" },
  { code: "xh", native: "isiXhosa",   en: "Xhosa" },
  { code: "am", native: "አማርኛ",       en: "Amharic" },
  { code: "ti", native: "ትግርኛ",        en: "Tigrinya" },
  { code: "so", native: "Soomaali",   en: "Somali" },
  { code: "om", native: "Afaan Oromoo", en: "Oromo" },
  { code: "rw", native: "Kinyarwanda", en: "Kinyarwanda" },
  { code: "sn", native: "chiShona",   en: "Shona" },
  { code: "ny", native: "Chichewa",   en: "Chichewa" },
  { code: "lg", native: "Luganda",    en: "Ganda" },
  { code: "ln", native: "Lingála",    en: "Lingala" },
  { code: "mg", native: "Malagasy",   en: "Malagasy" },
  { code: "bm", native: "Bámanankan", en: "Bambara" },
  { code: "ee", native: "Eʋegbe",     en: "Ewe" },
  { code: "ff", native: "Fulfulde",   en: "Fulani" },
  { code: "kg", native: "Kikongo",    en: "Kongo" },
  { code: "st", native: "Sesotho",    en: "Sotho" },
  { code: "tn", native: "Setswana",   en: "Tswana" },
  { code: "ts", native: "Xitsonga",   en: "Tsonga" },
  { code: "ps", native: "پښتو",        en: "Pashto" },
];

// ---------- Estado ----------
let conversation = []; // {id, role, text, sources?, suppressed?}
let turnCounter = 0;
const FLAT_KB = []; // [{chunk_id, cat, item}]
let KB_INDEX = null; // {df:Map, N:number}

// ---------- Screen helpers ----------
function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- Consentimiento ----------
function hasConsent() {
  return sessionStorage.getItem(STORAGE_PREFIX + "consent") === "yes";
}
function grantConsent() {
  sessionStorage.setItem(STORAGE_PREFIX + "consent", "yes");
  sessionStorage.setItem(STORAGE_PREFIX + "consent_ts", String(Date.now()));
  show("screen-menu");
}

// ---------- Botón pánico ----------
function panicExit() {
  try {
    // Limpia chat en memoria
    conversation = [];
    const chat = document.getElementById("chat");
    if (chat) chat.innerHTML = "";
    // Limpia storage propio
    Object.keys(sessionStorage).filter(k => k.startsWith(STORAGE_PREFIX)).forEach(k => sessionStorage.removeItem(k));
    Object.keys(localStorage).filter(k => k.startsWith(STORAGE_PREFIX)).forEach(k => localStorage.removeItem(k));
    // Borra historial de navegación reciente sustituyendo location
    window.location.replace(PANIC_REDIRECT);
  } catch (_) {
    window.location.href = PANIC_REDIRECT;
  }
}

// ---------- Idioma (Google Translate) ----------
function clearGoogleTranslateCookies() {
  const host = location.hostname;
  const expire = "; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  const variants = [
    "googtrans=" + expire,
    "googtrans=" + expire + "; domain=" + host,
    "googtrans=" + expire + "; domain=." + host,
  ];
  variants.forEach(v => { document.cookie = v; });
  const parts = host.split(".");
  for (let i = 1; i < parts.length; i++) {
    const d = "." + parts.slice(i).join(".");
    document.cookie = "googtrans=" + expire + "; domain=" + d;
  }
}
function setGoogleLanguage(code) {
  clearGoogleTranslateCookies();
  if (code === "es") { location.reload(); return; }
  document.cookie = "googtrans=/es/" + code + "; path=/";
  document.cookie = "googtrans=/es/" + code + "; path=/; domain=" + location.hostname;
  document.cookie = "googtrans=/es/" + code + "; path=/; domain=." + location.hostname;
  location.reload();
}
function renderLangGrid(grid, list) {
  grid.innerHTML = "";
  list.forEach(l => {
    const b = document.createElement("button");
    b.className = "lang-card";
    b.innerHTML = `<span class="native">${l.native}</span><span class="en">${l.en}</span>`;
    b.addEventListener("click", () => {
      document.getElementById("lang-current").textContent = l.native;
      sessionStorage.setItem(STORAGE_PREFIX + "post_lang", "menu");
      if (l.code === "es") {
        clearGoogleTranslateCookies();
        location.reload();
      } else {
        setGoogleLanguage(l.code);
      }
    });
    grid.appendChild(b);
  });
}
function goHomeSpanish() {
  const hasGoogTrans = document.cookie.split(";").some(c => c.trim().startsWith("googtrans="));
  if (hasGoogTrans) {
    clearGoogleTranslateCookies();
    sessionStorage.setItem(STORAGE_PREFIX + "post_lang", "menu");
    location.replace(location.pathname);
    return;
  }
  document.getElementById("lang-current").textContent = "Español";
  show(hasConsent() ? "screen-menu" : "screen-consent");
}

// ---------- KB: indexación al cargar ----------
function buildKbIndex() {
  FLAT_KB.length = 0;
  KB.categories.forEach(cat => {
    cat.items.forEach((item, idx) => {
      const chunk_id = `${cat.id}_${String(idx).padStart(2, "0")}`;
      FLAT_KB.push({ chunk_id, cat, item });
    });
  });
  // Document frequency para BM25-lite
  const df = new Map();
  FLAT_KB.forEach(({ item }) => {
    const tokens = new Set(tokenize(item.q + " " + item.a + " " + (item.keywords || []).join(" ")));
    tokens.forEach(t => df.set(t, (df.get(t) || 0) + 1));
  });
  KB_INDEX = { df, N: FLAT_KB.length };
}

function tokenize(s) {
  return TRIAGE.normalize(s).split(/\s+/).filter(t => t.length >= 3);
}

// BM25 ligero — k1=1.5, b=0 (sin normalización por longitud, simplifica).
function bm25Score(queryTokens, item) {
  const text = TRIAGE.normalize(item.q + " " + item.a + " " + (item.keywords || []).join(" "));
  const counts = new Map();
  text.split(/\s+/).forEach(t => { if (t.length >= 3) counts.set(t, (counts.get(t) || 0) + 1); });
  let s = 0;
  const N = KB_INDEX.N;
  queryTokens.forEach(qt => {
    const f = counts.get(qt) || 0;
    if (!f) return;
    const dfq = KB_INDEX.df.get(qt) || 0.5;
    const idf = Math.log(1 + (N - dfq + 0.5) / (dfq + 0.5));
    s += idf * ((f * 2.5) / (f + 1.5));
  });
  return s;
}

function searchKB(query, topN = 4) {
  const qTokens = tokenize(query);
  if (!qTokens.length) return [];
  const scored = FLAT_KB.map(rec => {
    let score = bm25Score(qTokens, rec.item);
    // Bonus por keyword explícita
    const qNorm = TRIAGE.normalize(query);
    (rec.item.keywords || []).forEach(k => {
      if (qNorm.includes(TRIAGE.normalize(k))) score += 2.5;
    });
    return { ...rec, score };
  }).filter(x => x.score > 0);
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topN);
}

// ---------- Menú principal ----------
function renderMenu() {
  const grid = document.getElementById("menu-grid");
  grid.innerHTML = "";
  // 1. Chat libre
  const free = document.createElement("button");
  free.className = "card card-highlight";
  free.innerHTML = `<span class="icon">💬</span><strong>Hacer una pregunta libre</strong><small>Habla con el asistente IA: te escucha con empatía y busca información para ti</small>`;
  free.addEventListener("click", () => openChatFresh());
  grid.appendChild(free);
  // 2. Categorías
  KB.categories.forEach(cat => {
    const c = document.createElement("button");
    c.className = "card";
    c.innerHTML = `<span class="icon">${cat.icon}</span><strong>${cat.title}</strong><small>${cat.desc}</small>`;
    c.addEventListener("click", () => openCategory(cat));
    grid.appendChild(c);
  });
  // 3. Recursos por país
  const res = document.createElement("button");
  res.className = "card";
  res.innerHTML = `<span class="icon">🗺️</span><strong>Recursos por país</strong><small>Líneas de ayuda y entidades especializadas en cada país de la UE</small>`;
  res.addEventListener("click", () => { renderResources(); show("screen-resources"); });
  grid.appendChild(res);
  // 4. Documentación
  const docs = document.createElement("button");
  docs.className = "card";
  docs.innerHTML = `<span class="icon">📚</span><strong>Documentación</strong><small>Consulta y descarga toda la documentación clasificada por tema</small>`;
  docs.addEventListener("click", () => { renderDocs(); show("screen-docs"); });
  grid.appendChild(docs);
  // 5. Modo profesional
  const pro = document.createElement("button");
  pro.className = "card card-pro";
  pro.innerHTML = `<span class="icon">🧑‍⚕️</span><strong>Modo profesional</strong><small>Para trabajadoras/es sociales, sanitarios, policía y ONGs</small>`;
  pro.addEventListener("click", () => openProGate());
  grid.appendChild(pro);
}

function openCategory(cat) {
  document.getElementById("sub-title").textContent = `${cat.icon}  ${cat.title}`;
  const grid = document.getElementById("sub-grid");
  grid.innerHTML = "";
  cat.items.forEach(item => {
    const c = document.createElement("button");
    c.className = "card";
    c.innerHTML = `<strong>${item.q}</strong>`;
    c.addEventListener("click", () => openChatWith(item, cat));
    grid.appendChild(c);
  });
  const free = document.createElement("button");
  free.className = "card";
  free.innerHTML = `<span class="icon">💬</span><strong>Otra pregunta sobre ${cat.title}</strong>`;
  free.addEventListener("click", () => openChatFresh(cat));
  grid.appendChild(free);
  show("screen-sub");
}

// ---------- Documentación ----------
function renderDocs() {
  const wrap = document.getElementById("docs-list");
  wrap.innerHTML = "";
  DOCS.forEach(cat => {
    const div = document.createElement("div");
    div.className = "doc-cat";
    const h = document.createElement("h3");
    h.textContent = `${cat.icon}  ${cat.title}`;
    div.appendChild(h);
    const ul = document.createElement("ul");
    cat.files.forEach(f => {
      const li = document.createElement("li");
      const url = "docs/" + encodeURIComponent(cat.folder) + "/" + encodeURIComponent(f.file);
      li.innerHTML = `<span class="pdf-icon">📄</span><a href="${url}" target="_blank" rel="noopener">${escapeHtml(f.name)}</a>`;
      ul.appendChild(li);
    });
    div.appendChild(ul);
    wrap.appendChild(div);
  });
}

// ---------- Recursos por país ----------
function renderResources() {
  const wrap = document.getElementById("resources-list");
  wrap.innerHTML = "";
  RESOURCES.countries.forEach(c => {
    const div = document.createElement("div");
    div.className = "country-card";
    div.innerHTML = `
      <h3>${c.flag}  ${c.name}</h3>
      <p class="emergency-line">📞 Emergencias: <strong>${c.emergency}</strong></p>
      <p class="trafficking-line">
        <span class="ribbon">Línea trata</span>
        <strong>${c.trafficking_line.number}</strong> — ${escapeHtml(c.trafficking_line.name)}
        <small>${escapeHtml(c.trafficking_line.info || "")}</small>
      </p>
      <p class="authority"><strong>Autoridad:</strong> ${escapeHtml(c.authority)}</p>
      <details>
        <summary>Entidades especializadas (${c.ngos.length})</summary>
        <ul>${c.ngos.map(n => `<li><a href="${n.url}" target="_blank" rel="noopener">${escapeHtml(n.name)}</a>${n.note ? " — " + escapeHtml(n.note) : ""}</li>`).join("")}</ul>
      </details>
    `;
    wrap.appendChild(div);
  });
  // Transnacionales
  const tr = document.createElement("div");
  tr.className = "country-card transnational";
  tr.innerHTML = `<h3>🇪🇺 Recursos transnacionales</h3><ul>${
    RESOURCES.transnational.map(r => `<li><a href="${r.url}" target="_blank" rel="noopener">${escapeHtml(r.name)}</a>${r.note ? " — " + escapeHtml(r.note) : ""}</li>`).join("")
  }</ul>`;
  wrap.appendChild(tr);
}

// ---------- Modo profesional ----------
function openProGate() {
  // Si ya autorizado en esta sesión, salta directo
  if (sessionStorage.getItem(STORAGE_PREFIX + "pro_unlocked") === "yes") {
    renderPro();
    show("screen-pro");
    return;
  }
  show("screen-pro-gate");
  setTimeout(() => document.getElementById("pro-pass-input")?.focus(), 100);
}
function tryUnlockPro() {
  const val = (document.getElementById("pro-pass-input").value || "").trim();
  const err = document.getElementById("pro-pass-error");
  if (val === PRO.passphrase) {
    sessionStorage.setItem(STORAGE_PREFIX + "pro_unlocked", "yes");
    err.hidden = true;
    renderPro();
    show("screen-pro");
  } else {
    err.hidden = false;
  }
}
function renderPro() {
  const wrap = document.getElementById("pro-content");
  wrap.innerHTML = "";
  // Checklist de identificación
  const sec1 = document.createElement("section");
  sec1.className = "pro-section";
  sec1.innerHTML = `<h3>🔍 Checklist de identificación temprana</h3><p class="muted">Indicadores OIM / Palermo / Directiva UE 2024/1712. Marca lo que observes para hacerte una idea global (no es un instrumento diagnóstico).</p>`;
  PRO.identification_checklist.forEach((block, bi) => {
    const div = document.createElement("div");
    div.className = "pro-block";
    div.innerHTML = `<h4>${escapeHtml(block.block)}</h4>` + block.items.map((it, ii) => {
      const id = `pro_chk_${bi}_${ii}`;
      return `<label class="pro-check"><input type="checkbox" id="${id}"> <span>${escapeHtml(it)}</span></label>`;
    }).join("");
    sec1.appendChild(div);
  });
  wrap.appendChild(sec1);

  // Guion de entrevista
  const sec2 = document.createElement("section");
  sec2.className = "pro-section";
  sec2.innerHTML = `<h3>🗣️ Guion de entrevista trauma-informada</h3>
    <p>${escapeHtml(PRO.interview_script.intro)}</p>
    <h4>Reglas</h4>
    <ul>${PRO.interview_script.rules.map(r => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
    <h4>Preguntas sugeridas</h4>
    <ol>${PRO.interview_script.questions.map(q => `<li>${escapeHtml(q)}</li>`).join("")}</ol>
    <h4>Si detectas banderas rojas</h4>
    <ul>${PRO.interview_script.redflags_actions.map(r => `<li>${escapeHtml(r)}</li>`).join("")}</ul>`;
  wrap.appendChild(sec2);

  // Mapa de derivación
  const sec3 = document.createElement("section");
  sec3.className = "pro-section";
  sec3.innerHTML = `<h3>🧭 Mapa de derivación rápida (España)</h3>
    <table class="pro-table"><thead><tr><th>Necesidad</th><th>Recurso</th><th>Notas</th></tr></thead><tbody>${
      PRO.referral_map.map(r => `<tr><td>${escapeHtml(r.etiqueta)}</td><td>${escapeHtml(r.recurso)}</td><td>${escapeHtml(r.nota)}</td></tr>`).join("")
    }</tbody></table>
    <p class="muted">Para otros países UE consulta «Recursos por país» en el menú principal.</p>`;
  wrap.appendChild(sec3);
}

// ---------- Chat ----------
function openChatFresh(cat) {
  conversation = [];
  turnCounter = 0;
  document.getElementById("chat").innerHTML = "";
  document.getElementById("escalate-btn").hidden = true;
  botSay(cat
    ? `Hola. Estás en la sección **${cat.title}**. Puedes contarme con tus propias palabras lo que necesitas saber. Te escucho.`
    : `Hola. Soy el asistente de Apoyo. Estoy aquí para escucharte sin juzgarte y ayudarte a encontrar información y recursos. Cuéntame con tus palabras qué te preocupa o qué necesitas saber.`);
  show("screen-chat");
  document.getElementById("chat-input").focus();
}

function openChatWith(item, cat) {
  conversation = [];
  turnCounter = 0;
  document.getElementById("chat").innerHTML = "";
  document.getElementById("escalate-btn").hidden = true;
  userSay(item.q);
  botAnswer(item);
  show("screen-chat");
}

function userSay(text) {
  const id = "t" + (++turnCounter);
  conversation.push({ id, role: "user", text });
  appendMsg(id, "user", text);
}

function botSay(text, sourceHtml) {
  const id = "t" + (++turnCounter);
  conversation.push({ id, role: "bot", text, sourceHtml });
  appendMsg(id, "bot", text, sourceHtml);
  return document.querySelector(`[data-turn="${id}"]`);
}

function appendMsg(id, role, text, sourceHtml) {
  const div = document.createElement("div");
  div.className = "msg " + role;
  div.dataset.turn = id;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
  if (sourceHtml) {
    const s = document.createElement("span");
    s.className = "source";
    s.innerHTML = sourceHtml;
    bubble.appendChild(s);
  }
  // Botón borrar turno
  const del = document.createElement("button");
  del.className = "turn-del";
  del.title = "Borrar este mensaje del historial";
  del.setAttribute("aria-label", "Borrar este mensaje");
  del.textContent = "✕";
  del.addEventListener("click", () => deleteTurn(id));
  div.appendChild(bubble);
  div.appendChild(del);
  document.getElementById("chat").appendChild(div);
  scrollChat();
}

function deleteTurn(id) {
  conversation = conversation.filter(m => m.id !== id);
  const node = document.querySelector(`[data-turn="${id}"]`);
  if (node) node.remove();
}

function botAnswer(item) {
  let src = `📚 <strong>Fuente:</strong> ${escapeHtml(item.source)}`;
  if (item.link) {
    src += `<br>🔗 Consulta: <a href="${item.link}" target="_blank" rel="noopener">${item.link}</a>`;
  }
  botSay(item.a, src);
  document.getElementById("escalate-btn").hidden = false;
}

// ---------- Generación con citación verificada ----------
const SYSTEM_PROMPT = `Eres "Apoyo", un asistente virtual confidencial para personas víctimas o supervivientes de trata y explotación sexual, en su mayoría mujeres migrantes en situación vulnerable.

REGLAS OBLIGATORIAS:
1. EMPATÍA. Habla con calidez y sin juicio. Reconoce las emociones antes de informar. Nunca culpabilices.
2. SEGURIDAD. Si detectas peligro: 112 (emergencias) y 900 10 50 90 (línea anónima 24h trata). No pidas datos identificativos (nombre, dirección, DNI).
3. CLARIDAD. Frases cortas, A2-B1, sin tecnicismos.
4. MISMO IDIOMA. Responde en el idioma de la persona.
5. SOLO USA EL CONTEXTO. Las respuestas SOLO pueden basarse en los pasajes del CONTEXTO marcados con [chunk:ID]. Si la respuesta no está claramente en el contexto, di "No tengo información verificada sobre esto" e invita a contactar con especialista@sevilla.org.
6. CITA OBLIGATORIA. Cada afirmación factual debe ir seguida del marcador [chunk:ID] correspondiente. Al final añade una línea "Fuentes: [chunk:ID1], [chunk:ID2]" con todos los chunks usados.
7. PRÓXIMO PASO. Cuando sea posible, ofrece una acción concreta (un teléfono, una entidad, un trámite).
8. NUNCA inventes leyes, teléfonos, direcciones, plazos o nombres de entidades.`;

function buildContextFromKB(query) {
  const hits = searchKB(query, 4);
  if (!hits.length) return { text: "(no hay pasajes relevantes)", hits: [] };
  const text = hits.map(h =>
    `[chunk:${h.chunk_id}] Tema: ${h.cat.title}\nPregunta: ${h.item.q}\nContenido: ${h.item.a}\nFuente bibliográfica: ${h.item.source}${h.item.link ? "\nEnlace: " + h.item.link : ""}`
  ).join("\n\n---\n\n");
  return { text, hits };
}

// Verifica que las citas [chunk:ID] en la respuesta corresponden a chunks
// realmente enviados al modelo. Devuelve {text, valid_ids, invalid_ids}.
function verifyCitations(reply, validIds) {
  const cited = Array.from(reply.matchAll(/\[chunk:([a-z0-9_]+)\]/gi)).map(m => m[1]);
  const validSet = new Set(validIds);
  const invalid = cited.filter(c => !validSet.has(c));
  const valid = cited.filter(c => validSet.has(c));
  return { cited, valid, invalid };
}

async function askLLM(userText, hits) {
  const context = hits.length
    ? hits.map(h =>
        `[chunk:${h.chunk_id}] Tema: ${h.cat.title}\nPregunta: ${h.item.q}\nContenido: ${h.item.a}\nFuente bibliográfica: ${h.item.source}${h.item.link ? "\nEnlace: " + h.item.link : ""}`
      ).join("\n\n---\n\n")
    : "(no hay pasajes relevantes en la base de conocimiento)";

  const history = conversation.slice(-8).map(m => ({
    role: m.role === "user" ? "user" : "assistant",
    content: m.text
  }));
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "system", content: "CONTEXTO DOCUMENTAL (chunks disponibles para citar):\n\n" + context },
    ...history,
    { role: "user", content: userText }
  ];
  const res = await fetch(LLM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: LLM_MODEL,
      messages,
      temperature: 0.4,
      private: true,
      referrer: "apoyo-ariadna"
    })
  });
  if (!res.ok) throw new Error("LLM HTTP " + res.status);
  const raw = await res.text();
  try {
    const j = JSON.parse(raw);
    if (j.choices && j.choices[0]) {
      return (j.choices[0].message?.content || j.choices[0].text || "").trim();
    }
  } catch (_) {}
  return raw.trim();
}

async function handleUserQuery(text) {
  // 1) Triage SIEMPRE primero
  const triage = TRIAGE.classify(text);
  userSay(text);

  if (triage.category === "crisis") {
    const cr = TRIAGE.crisisResponse(text);
    botSay("**" + cr.title + "**\n\n" + cr.body);
    document.getElementById("escalate-btn").hidden = false;
    return;
  }

  // 2) RAG
  const typing = botSay("");
  typing.querySelector(".bubble").innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
  // No conservar el placeholder en el historial
  conversation.pop();

  const { hits } = { hits: searchKB(text, 4) };

  try {
    let reply = await askLLM(text, hits);
    const validIds = hits.map(h => h.chunk_id);
    const check = verifyCitations(reply, validIds);

    // Si el modelo no cita o cita inexistentes y SÍ había hits → marcar advertencia.
    let sourceHtml = "";
    if (hits.length && check.valid.length) {
      const usedHits = hits.filter(h => check.valid.includes(h.chunk_id));
      sourceHtml = "📚 <strong>Fuentes verificadas:</strong><br>" +
        usedHits.map(h => {
          const link = h.item.link ? ` · <a href="${h.item.link}" target="_blank" rel="noopener">enlace</a>` : "";
          return `• ${escapeHtml(h.item.source)}${link}`;
        }).join("<br>");
    } else if (hits.length && !check.valid.length) {
      sourceHtml = "⚠️ <em>El asistente no ha citado fuentes verificables. Considera contactar con un especialista para confirmar la información.</em>";
    }
    if (check.invalid.length) {
      // Limpia citas inválidas del texto mostrado
      reply = reply.replace(/\[chunk:[a-z0-9_]+\]/gi, m => {
        const id = m.match(/\[chunk:([a-z0-9_]+)\]/i)[1];
        return validIds.includes(id) ? "" : "";
      }).replace(/\s{2,}/g, " ").trim();
    } else {
      reply = reply.replace(/\[chunk:[a-z0-9_]+\]/gi, "").replace(/\s{2,}/g, " ").trim();
    }

    // Anexo para menores
    if (triage.category === "menor") {
      reply += "\n\n" + TRIAGE.minorNote("es");
    }

    typing.remove();
    botSay(reply, sourceHtml || undefined);
    document.getElementById("escalate-btn").hidden = false;
  } catch (err) {
    console.error(err);
    typing.remove();
    if (hits.length) {
      botAnswer(hits[0].item);
    } else {
      botSay(
        "Lo siento, en este momento no puedo conectarme con el asistente avanzado y no encuentro una respuesta clara en mi documentación.\n\n" +
        "Si quieres recibir apoyo concreto sobre esto, pulsa el botón de abajo: se preparará un resumen para enviar a " +
        SPECIALIST_EMAIL + " (tú decides si lo envías)."
      );
      document.getElementById("escalate-btn").hidden = false;
    }
  }
}

// ---------- Escalado a especialista con resumen anonimizado ----------
function buildAnonymizedSummary() {
  // Resumen estructurado, no transcripción literal. El usuario lo revisa antes de enviar.
  const userMsgs = conversation.filter(m => m.role === "user").map(m => m.text);
  const botMsgs = conversation.filter(m => m.role === "bot").map(m => m.text);
  const topics = new Set();
  // Detecta temas por keywords de KB
  conversation.forEach(m => {
    if (m.role !== "user") return;
    KB.categories.forEach(cat => {
      const norm = TRIAGE.normalize(m.text);
      cat.items.forEach(it => {
        (it.keywords || []).forEach(k => {
          if (norm.includes(TRIAGE.normalize(k))) topics.add(cat.title);
        });
      });
    });
  });
  return {
    n_msgs_user: userMsgs.length,
    n_msgs_bot: botMsgs.length,
    topics: Array.from(topics),
    first_query: userMsgs[0] || "",
    last_query: userMsgs[userMsgs.length - 1] || "",
  };
}

function escalate() {
  const s = buildAnonymizedSummary();
  // Pre-rellena el modal de revisión antes del mailto
  document.getElementById("esc-topics").textContent = s.topics.join(", ") || "—";
  document.getElementById("esc-counts").textContent = `${s.n_msgs_user} mensajes tuyos, ${s.n_msgs_bot} del asistente.`;
  document.getElementById("esc-first").value = s.first_query;
  document.getElementById("esc-last").value = s.last_query;
  document.getElementById("esc-extra").value = "";
  document.getElementById("esc-include-full").checked = false;
  document.getElementById("esc-modal").hidden = false;
}

function escalateConfirm() {
  const includeFull = document.getElementById("esc-include-full").checked;
  const first = (document.getElementById("esc-first").value || "").trim();
  const last = (document.getElementById("esc-last").value || "").trim();
  const extra = (document.getElementById("esc-extra").value || "").trim();
  const topics = document.getElementById("esc-topics").textContent;

  let body = "Hola,\n\nMe gustaría recibir apoyo de un/a especialista.\n\n";
  body += "TEMAS TRATADOS: " + topics + "\n";
  if (first) body += "PRIMERA CONSULTA: " + first + "\n";
  if (last && last !== first) body += "ÚLTIMA CONSULTA: " + last + "\n";
  if (extra) body += "\nLO QUE QUIERO AÑADIR:\n" + extra + "\n";
  if (includeFull) {
    const lines = conversation.map(m => (m.role === "user" ? "👤 " : "🤖 ") + m.text);
    body += "\n\n--- HISTORIAL COMPLETO (incluido a petición) ---\n" + lines.join("\n\n") + "\n";
  }
  body += "\nMis datos de contacto (rellénalos si quieres):\n• Nombre o alias:\n• Idioma preferido:\n• Teléfono o email:\n\nGracias.";
  const subject = "Solicitud de apoyo — Asistente Apoyo";
  const url = "mailto:" + SPECIALIST_EMAIL +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);
  document.getElementById("esc-modal").hidden = true;
  window.location.href = url;
}

function escalateCancel() {
  document.getElementById("esc-modal").hidden = true;
}

// ---------- Utils ----------
function escapeHtml(s) {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function scrollChat() {
  const c = document.getElementById("chat");
  c.scrollTop = c.scrollHeight;
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  buildKbIndex();
  renderLangGrid(document.getElementById("lang-grid"), LANGS);
  renderLangGrid(document.getElementById("lang-grid-extra"), LANGS_EXTRA);
  renderMenu();

  document.querySelectorAll(".back").forEach(b =>
    b.addEventListener("click", () => show(b.dataset.target))
  );

  document.getElementById("chat-form").addEventListener("submit", e => {
    e.preventDefault();
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    handleUserQuery(text);
  });

  document.getElementById("escalate-btn").addEventListener("click", escalate);
  document.getElementById("esc-confirm").addEventListener("click", escalateConfirm);
  document.getElementById("esc-cancel").addEventListener("click", escalateCancel);

  document.getElementById("lang-btn").addEventListener("click", () => show("screen-lang"));
  document.getElementById("home-btn").addEventListener("click", goHomeSpanish);

  // Pánico: botón + Esc x3
  document.getElementById("panic-btn").addEventListener("click", panicExit);
  let escCount = 0, escTimer = null;
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      escCount++;
      if (escCount >= 3) { escCount = 0; panicExit(); return; }
      clearTimeout(escTimer);
      escTimer = setTimeout(() => { escCount = 0; }, 1200);
    }
  });

  // Consentimiento
  document.getElementById("consent-accept")?.addEventListener("click", grantConsent);

  // Modo profesional
  document.getElementById("pro-pass-submit")?.addEventListener("click", tryUnlockPro);
  document.getElementById("pro-pass-input")?.addEventListener("keydown", e => {
    if (e.key === "Enter") { e.preventDefault(); tryUnlockPro(); }
  });

  // Inicio: respetar reload de Google Translate
  if (sessionStorage.getItem(STORAGE_PREFIX + "post_lang") === "menu") {
    sessionStorage.removeItem(STORAGE_PREFIX + "post_lang");
    show(hasConsent() ? "screen-menu" : "screen-consent");
  } else {
    show(hasConsent() ? "screen-menu" : "screen-consent");
  }
});

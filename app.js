// Apoyo chatbot — vanilla JS, no API keys.
// - Free LLM via Pollinations.ai (https://text.pollinations.ai) for empathic free chat.
// - Knowledge base in window.KB.
// - Documentation listing in window.DOCS.
// - Translation via Google Translate widget.

const SPECIALIST_EMAIL = "especialista@sevilla.org";
const LLM_ENDPOINT = "https://text.pollinations.ai/openai";
const LLM_MODEL = "openai"; // free, OpenAI-compatible chat

// Languages: native name + English label.
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

let conversation = []; // {role, text} for escalation email and LLM history

// ---------- Screen helpers ----------
function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- Language ----------
function clearGoogleTranslateCookies() {
  // Cookie variants set by the Google Translate widget across reloads.
  const host = location.hostname;
  const expire = "; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  const variants = [
    "googtrans=" + expire,
    "googtrans=" + expire + "; domain=" + host,
    "googtrans=" + expire + "; domain=." + host,
  ];
  variants.forEach(v => { document.cookie = v; });
  // Also try parent domains (e.g. github.io)
  const parts = host.split(".");
  for (let i = 1; i < parts.length; i++) {
    const d = "." + parts.slice(i).join(".");
    document.cookie = "googtrans=" + expire + "; domain=" + d;
  }
}

function setGoogleLanguage(code) {
  clearGoogleTranslateCookies();
  if (code === "es") {
    location.reload();
    return;
  }
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
      sessionStorage.setItem("apoyo_post_lang", "menu");
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

// Heart / home button: reset language to Spanish (no persist) and go to menu
function goHomeSpanish() {
  // Detect if a googtrans cookie is currently active; if so, clear and reload to root
  const hasGoogTrans = document.cookie.split(";").some(c => c.trim().startsWith("googtrans="));
  if (hasGoogTrans) {
    clearGoogleTranslateCookies();
    sessionStorage.setItem("apoyo_post_lang", "menu");
    location.replace(location.pathname);
    return;
  }
  document.getElementById("lang-current").textContent = "Español";
  show("screen-menu");
}

// ---------- Menu ----------
function renderMenu() {
  const grid = document.getElementById("menu-grid");
  grid.innerHTML = "";
  // Free chat card FIRST
  const free = document.createElement("button");
  free.className = "card card-highlight";
  free.innerHTML = `<span class="icon">💬</span><strong>Hacer una pregunta libre</strong><small>Habla con el asistente IA: te escucha con empatía y busca información para ti</small>`;
  free.addEventListener("click", () => openChatFresh());
  grid.appendChild(free);
  KB.categories.forEach(cat => {
    const c = document.createElement("button");
    c.className = "card";
    c.innerHTML = `<span class="icon">${cat.icon}</span><strong>${cat.title}</strong><small>${cat.desc}</small>`;
    c.addEventListener("click", () => openCategory(cat));
    grid.appendChild(c);
  });
  // Documentation card last
  const docs = document.createElement("button");
  docs.className = "card";
  docs.innerHTML = `<span class="icon">📚</span><strong>Documentación</strong><small>Consulta y descarga toda la documentación clasificada por tema</small>`;
  docs.addEventListener("click", () => { renderDocs(); show("screen-docs"); });
  grid.appendChild(docs);
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

// ---------- Documentation ----------
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

// ---------- Chat ----------
function openChatFresh(cat) {
  conversation = [];
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
  document.getElementById("chat").innerHTML = "";
  document.getElementById("escalate-btn").hidden = true;
  userSay(item.q);
  botAnswer(item);
  show("screen-chat");
}

function userSay(text) {
  conversation.push({ role: "user", text });
  const div = document.createElement("div");
  div.className = "msg user";
  div.innerHTML = `<div class="bubble"></div>`;
  div.querySelector(".bubble").textContent = text;
  document.getElementById("chat").appendChild(div);
  scrollChat();
}

function botSay(text, sourceHtml) {
  conversation.push({ role: "bot", text });
  const div = document.createElement("div");
  div.className = "msg bot";
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
  div.appendChild(bubble);
  document.getElementById("chat").appendChild(div);
  scrollChat();
  return div;
}

function botAnswer(item) {
  let src = `📚 <strong>Fuente:</strong> ${escapeHtml(item.source)}`;
  if (item.link) {
    src += `<br>🔗 Consulta: <a href="${item.link}" target="_blank" rel="noopener">${item.link}</a>`;
  }
  botSay(item.a, src);
  document.getElementById("escalate-btn").hidden = false;
}

// ---------- Search (KB lookup, used as context for the LLM) ----------
function normalize(s) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,;:()"']/g, " ");
}
function searchKB(query, topN = 3) {
  const q = normalize(query);
  const tokens = q.split(/\s+/).filter(t => t.length > 2);
  if (!tokens.length) return [];
  const scored = [];
  KB.categories.forEach(cat => cat.items.forEach(item => {
    const hay = normalize(item.q + " " + item.a + " " + (item.keywords || []).join(" "));
    let score = 0;
    tokens.forEach(t => { if (hay.includes(t)) score++; });
    (item.keywords || []).forEach(k => { if (q.includes(normalize(k))) score += 2; });
    if (score > 0) scored.push({ item, cat, score });
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topN);
}

// ---------- LLM (free, no API key) ----------
const SYSTEM_PROMPT = `Eres "Apoyo", un asistente virtual confidencial dirigido a personas víctimas o supervivientes de trata de seres humanos y explotación sexual, en su mayoría mujeres migrantes en situación de vulnerabilidad.

Reglas de comportamiento OBLIGATORIAS:
1. EMPATÍA MÁXIMA. Habla siempre con calidez, respeto y sin juicio. Reconoce las emociones de la persona antes de dar información ("Entiendo que esto es difícil…", "Gracias por confiar en mí…"). Nunca culpabilices. Nunca uses tono burocrático o frío.
2. SEGURIDAD PRIMERO. Si detectas peligro inmediato, recuerda los teléfonos: 112 (emergencias) y 900 10 50 90 (línea anónima 24h sobre trata). No pidas datos personales identificativos (nombre, dirección).
3. CLARIDAD. Frases cortas, lenguaje sencillo (nivel A2-B1), sin tecnicismos. Si tienes que usar uno, explícalo.
4. RESPONDE EN EL MISMO IDIOMA en el que escribe la persona. Si escribe en árabe, responde en árabe. Si escribe en francés, en francés. Etc.
5. BASA TUS RESPUESTAS en el CONTEXTO documental que se te aporta más abajo. Si la respuesta NO está claramente en el contexto, dilo con honestidad: "No tengo información clara sobre esto en mi documentación" e invita a contactar con un especialista (especialista@sevilla.org).
6. CITA LA FUENTE al final de cada respuesta sustantiva (en una línea aparte, prefijada por "Fuente:").
7. OFRECE SIGUIENTE PASO concreto siempre que sea posible (un teléfono, una entidad, un trámite).
8. NUNCA inventes datos, leyes, teléfonos o direcciones. Si dudas, di que dudas.
9. RECUERDA al final, cuando sea apropiado, que puede pedir apoyo personalizado escribiendo a especialista@sevilla.org.`;

function buildContextFromKB(query) {
  const hits = searchKB(query, 4);
  if (!hits.length) return "(no se han encontrado pasajes relevantes en la base de conocimiento)";
  return hits.map((h, i) =>
    `[${i + 1}] Tema: ${h.cat.title}\nPregunta de referencia: ${h.item.q}\nContenido: ${h.item.a}\nFuente: ${h.item.source}${h.item.link ? "\nEnlace: " + h.item.link : ""}`
  ).join("\n\n---\n\n");
}

async function askLLM(userText) {
  const context = buildContextFromKB(userText);
  const history = conversation.slice(-8).map(m => ({
    role: m.role === "user" ? "user" : "assistant",
    content: m.text
  }));
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "system", content: "CONTEXTO DOCUMENTAL DISPONIBLE (úsalo como base de tus respuestas):\n\n" + context },
    ...history,
    { role: "user", content: userText }
  ];
  const res = await fetch(LLM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: LLM_MODEL,
      messages,
      temperature: 0.6,
      private: true,
      referrer: "apoyo-upo"
    })
  });
  if (!res.ok) throw new Error("LLM HTTP " + res.status);
  const raw = await res.text();
  // OpenAI-compatible JSON; fallback to plain text
  try {
    const j = JSON.parse(raw);
    if (j.choices && j.choices[0]) {
      return (j.choices[0].message?.content || j.choices[0].text || "").trim();
    }
  } catch (_) {}
  return raw.trim();
}

async function handleUserQuery(text) {
  userSay(text);
  // Show typing indicator
  const typing = botSay("");
  typing.querySelector(".bubble").innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
  conversation.pop(); // don't keep empty msg in history
  try {
    const reply = await askLLM(text);
    typing.remove();
    botSay(reply);
    document.getElementById("escalate-btn").hidden = false;
  } catch (err) {
    console.error(err);
    typing.remove();
    // Fallback: keyword-based KB hit
    const hits = searchKB(text, 1);
    if (hits.length) {
      botAnswer(hits[0].item);
    } else {
      botSay(
        "Lo siento, en este momento no puedo conectarme con el asistente avanzado y no encuentro una respuesta clara en mi documentación.\n\n" +
        "Si quieres recibir apoyo concreto sobre esto, pulsa el botón de abajo: se enviará la conversación a " +
        SPECIALIST_EMAIL + " y se pondrán en contacto contigo."
      );
      document.getElementById("escalate-btn").hidden = false;
    }
  }
}

// ---------- Escalation ----------
function escalate() {
  const lines = conversation.map(m => (m.role === "user" ? "👤 Usuario: " : "🤖 Apoyo: ") + m.text);
  const body =
    "Hola,\n\nMe gustaría recibir apoyo personalizado de un especialista. " +
    "A continuación incluyo la conversación mantenida con el asistente Apoyo:\n\n" +
    "------------------------------\n" +
    lines.join("\n\n") +
    "\n------------------------------\n\n" +
    "Mis datos de contacto (rellénalos por favor):\n" +
    "• Nombre: \n• Idioma preferido: \n• Teléfono / email de contacto: \n\nGracias.";
  const subject = "Solicitud de apoyo — Asistente Apoyo";
  const url = "mailto:" + SPECIALIST_EMAIL +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);
  window.location.href = url;
}

// ---------- Utils ----------
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function scrollChat() {
  const c = document.getElementById("chat");
  c.scrollTop = c.scrollHeight;
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
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
  document.getElementById("lang-btn").addEventListener("click", () => show("screen-lang"));
  document.getElementById("home-btn").addEventListener("click", goHomeSpanish);

  // After a translation reload, jump to menu
  if (sessionStorage.getItem("apoyo_post_lang") === "menu") {
    sessionStorage.removeItem("apoyo_post_lang");
    show("screen-menu");
  } else {
    show("screen-menu");
  }
});

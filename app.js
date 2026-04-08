// Apoyo chatbot — vanilla JS, no backend, no API keys.
// Knowledge base in window.KB. Translation via Google Translate widget.

const SPECIALIST_EMAIL = "especialista@sevilla.org";

// Languages: native name + English label. The Google Translate widget translates
// the entire page once activated; we just trigger the cookie/select.
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

let conversation = []; // {role, text} for escalation email

// ---------- Screen helpers ----------
function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- Language ----------
function setGoogleLanguage(code) {
  if (code === "es") {
    // clear cookie -> back to original
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=." + location.hostname;
    location.reload();
    return;
  }
  document.cookie = "googtrans=/es/" + code + "; path=/";
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
      if (l.code === "es") {
        show("screen-menu");
      } else {
        // store target so after reload we land in menu
        sessionStorage.setItem("apoyo_post_lang", "menu");
        setGoogleLanguage(l.code);
      }
    });
    grid.appendChild(b);
  });
}

// ---------- Menu ----------
function renderMenu() {
  const grid = document.getElementById("menu-grid");
  grid.innerHTML = "";
  KB.categories.forEach(cat => {
    const c = document.createElement("button");
    c.className = "card";
    c.innerHTML = `<span class="icon">${cat.icon}</span><strong>${cat.title}</strong><small>${cat.desc}</small>`;
    c.addEventListener("click", () => openCategory(cat));
    grid.appendChild(c);
  });
  // Also: free chat card
  const free = document.createElement("button");
  free.className = "card";
  free.innerHTML = `<span class="icon">💬</span><strong>Hacer una pregunta libre</strong><small>Escribe tu consulta y te buscaremos información</small>`;
  free.addEventListener("click", () => {
    openChatFresh();
  });
  grid.appendChild(free);
}

function openCategory(cat) {
  document.getElementById("sub-title").textContent = `${cat.icon}  ${cat.title}`;
  const grid = document.getElementById("sub-grid");
  grid.innerHTML = "";
  cat.items.forEach(item => {
    const c = document.createElement("button");
    c.className = "card";
    c.innerHTML = `<strong>${item.q}</strong>`;
    c.addEventListener("click", () => {
      openChatWith(item, cat);
    });
    grid.appendChild(c);
  });
  // Free question within this category
  const free = document.createElement("button");
  free.className = "card";
  free.innerHTML = `<span class="icon">💬</span><strong>Otra pregunta sobre ${cat.title}</strong>`;
  free.addEventListener("click", () => openChatFresh(cat));
  grid.appendChild(free);
  show("screen-sub");
}

// ---------- Chat ----------
function openChatFresh(cat) {
  conversation = [];
  document.getElementById("chat").innerHTML = "";
  document.getElementById("escalate-btn").hidden = true;
  botSay(cat
    ? `Estás en la sección **${cat.title}**. Escribe tu pregunta y buscaré la mejor respuesta en la documentación disponible.`
    : `Hola. Cuéntame en qué te puedo ayudar. Escribe tu pregunta con tus propias palabras.`);
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
  bubble.innerHTML = escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
  if (sourceHtml) {
    const s = document.createElement("span");
    s.className = "source";
    s.innerHTML = sourceHtml;
    bubble.appendChild(s);
  }
  div.appendChild(bubble);
  document.getElementById("chat").appendChild(div);
  scrollChat();
}

function botAnswer(item) {
  let src = `📚 <strong>Fuente:</strong> ${escapeHtml(item.source)}`;
  if (item.link) {
    src += `<br>🔗 Consulta: <a href="${item.link}" target="_blank" rel="noopener">${item.link}</a>`;
  }
  botSay(item.a, src);
  // Suggestions: other items same category
  showSuggestions(item);
  document.getElementById("escalate-btn").hidden = false;
}

function showSuggestions(currentItem) {
  // gather other questions from KB
  const others = [];
  KB.categories.forEach(c => c.items.forEach(i => {
    if (i.q !== currentItem.q) others.push({ cat: c, item: i });
  }));
  const pick = others.sort(() => Math.random() - 0.5).slice(0, 3);
  const wrap = document.createElement("div");
  wrap.className = "suggestions";
  pick.forEach(p => {
    const b = document.createElement("button");
    b.textContent = p.item.q;
    b.addEventListener("click", () => { userSay(p.item.q); botAnswer(p.item); });
    wrap.appendChild(b);
  });
  document.getElementById("chat").appendChild(wrap);
  scrollChat();
}

// ---------- Search ----------
function normalize(s) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,;:()"']/g, " ");
}
function searchKB(query) {
  const q = normalize(query);
  const tokens = q.split(/\s+/).filter(t => t.length > 2);
  if (!tokens.length) return null;
  let best = null, bestScore = 0;
  KB.categories.forEach(cat => cat.items.forEach(item => {
    const hay = normalize(item.q + " " + item.a + " " + (item.keywords || []).join(" "));
    let score = 0;
    tokens.forEach(t => { if (hay.includes(t)) score++; });
    // boost on keyword exact match
    (item.keywords || []).forEach(k => {
      if (q.includes(normalize(k))) score += 2;
    });
    if (score > bestScore) { bestScore = score; best = item; }
  }));
  // require at least 2 hits or one strong keyword
  if (bestScore >= 2) return best;
  return null;
}

function handleUserQuery(text) {
  userSay(text);
  const hit = searchKB(text);
  if (hit) {
    botAnswer(hit);
  } else {
    botSay(
      "Lo siento, no encuentro una respuesta clara a tu consulta en la documentación disponible.\n\n" +
      "Si quieres recibir apoyo concreto sobre esto, puedes enviar tu solicitud a un Especialista. Pulsa el botón de abajo: " +
      "se enviará la conversación a " + SPECIALIST_EMAIL + " y se pondrán en contacto contigo para asistirte."
    );
    document.getElementById("escalate-btn").hidden = false;
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

  // After a translation reload, jump to menu instead of language screen
  if (sessionStorage.getItem("apoyo_post_lang") === "menu") {
    sessionStorage.removeItem("apoyo_post_lang");
    show("screen-menu");
  } else {
    show("screen-lang");
  }
});

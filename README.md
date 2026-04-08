# Apoyo — Asistente confidencial para víctimas de trata

Chatbot estático, **gratuito y sin APIs de pago**, que ofrece información organizada por problemáticas a partir de documentación pública (empadronamiento, regularización, vivienda, salud mental, empleo, tecnología, detección, desinformación).

🌐 **Demo (GitHub Pages):** activa Pages en este repositorio (rama `main`, carpeta raíz) y abre `https://upocuantitativo.github.io/apoyo/`.

## Características

- 100% estático: HTML + CSS + JS. Sin backend, sin claves de API, sin coste.
- **Multidispositivo:** diseño responsive (móvil y escritorio).
- **Selector de idioma inicial** con muchos idiomas, incluidos minoritarios africanos (suajili, wolof, hausa, yoruba, igbo, zulú, amárico, somalí, tigriña, kinyarwanda, shona, lingala, malgache, bambara, ewe, fula, etc.) usando el widget gratuito de Google Translate.
- **Menú por temáticas** inspirado en el esquema del recurso de Genially de referencia.
- Cada respuesta incluye **fuente** y enlace cuando está disponible.
- **Escalado a especialista:** si el bot no encuentra respuesta clara, ofrece enviar la conversación completa a `especialista@sevilla.org` mediante `mailto:` (no requiere servidor).
- Aviso permanente con teléfonos de emergencia (**112**) y línea gratuita y anónima 24h sobre trata (**900 10 50 90**).

## Cómo desplegar

1. Sube el contenido del repositorio (esta carpeta) a `https://github.com/upocuantitativo/apoyo`.
2. En GitHub: **Settings → Pages → Source: `main` / root**.
3. Espera 1-2 minutos y abre la URL pública.

También se puede abrir directamente `index.html` en cualquier navegador moderno.

## Estructura

```
apoyo/
├── index.html      # estructura y pantallas
├── styles.css      # diseño responsive
├── app.js          # lógica del chat, búsqueda y escalado
├── data/
│   └── kb.js       # base de conocimiento por categorías (editable)
└── README.md
```

## Añadir o editar contenido

Edita `data/kb.js`. Cada categoría tiene `items` con esta forma:

```js
{
  q: "Pregunta visible",
  keywords: ["palabras", "clave", "para", "buscar"],
  a: "Respuesta. Soporta saltos de línea y **negritas**.",
  source: "Título del documento o autor",
  link: "https://opcional"
}
```

Cuanto más completas las `keywords`, mejor encuentra el chatbot la respuesta cuando el usuario escribe libremente.

## Fuentes documentales utilizadas

Las respuestas se han extraído de la documentación clasificada en la carpeta `TRATA/`, incluyendo entre otros:

- **Empadronamiento:** Ayuntamiento de Sevilla — Padrón Municipal; guía "Para acceder a derechos: empadronamiento e inclusión financiera de víctimas de trata y explotación sexual".
- **Regularización:** Informe Acreditaciones víctimas de trata 2025; Directiva (UE) 2024/1712.
- **Vivienda:** Sevilla Acoge — Guía de Recursos Sociales de Sevilla 2024; Memoria Proyecto Esperanza 2023.
- **Salud mental:** Pastor-Moreno G. et al. (2023) *Gaceta Sanitaria* 37: 102333.
- **Tecnología:** Diaconía España — *Trata en el mundo digital* (Proyecto Desactiva la Trata).
- **Detección:** *2025 Trafficking in Persons Report* — U.S. Dept. of State.
- **Desinformación:** Macroestudio sobre la trata.

## Privacidad

- No se almacena nada en servidores propios: todo ocurre en el navegador del usuario.
- El widget de Google Translate carga recursos de Google sólo si el usuario elige un idioma distinto del español.
- El escalado a especialista usa `mailto:` y abre el cliente de correo del usuario, que decide si envía o no.

## Licencia

Uso libre con fines de apoyo a víctimas y profesionales.

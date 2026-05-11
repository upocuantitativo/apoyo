// Contenido del MODO PROFESIONAL — destinado a frontline workers
// (trabajo social, sanitario, policial, ONGs) que asisten a víctimas.
// Acceso protegido por passphrase (cliente, no es secreto criptográfico:
// es una fricción que impide entrada accidental por parte de víctimas).
window.PRO = {
  passphrase: "ariadna2026", // editable; cambiar antes del despliegue final

  // Checklist de identificación temprana (basado en indicadores OIM /
  // Protocolo de Palermo / Directiva UE 2024/1712). Cada bloque es una
  // dimensión: control, deuda, condiciones, identificación, salud.
  identification_checklist: [
    {
      block: "Control y libertad de movimiento",
      items: [
        "La persona no porta su documento de identidad / pasaporte y dice que lo tiene «alguien que la ayuda».",
        "Responde con miradas a una tercera persona presente o consulta el móvil antes de cada respuesta.",
        "Desconoce la dirección donde vive o la ciudad en la que se encuentra.",
        "Le acompañan al primer contacto y la tercera persona insiste en hablar por ella o traducir.",
        "No puede salir sola, no tiene horario propio o el móvil lo gestiona otra persona.",
      ],
    },
    {
      block: "Deuda y coacción económica",
      items: [
        "Refiere deber dinero por el viaje, la documentación, el alojamiento o «la oportunidad de trabajo».",
        "Trabaja muchas horas, vive en el lugar de trabajo o no cobra directamente.",
        "Existe presión para enviar dinero a un país de origen sin saber a quién va.",
      ],
    },
    {
      block: "Engaño / promesas de origen",
      items: [
        "Llegó esperando un empleo distinto al que realiza actualmente.",
        "La oferta inicial venía de un conocido o familiar en su país.",
        "Su itinerario migratorio incluye tránsitos por países con redes activas (rutas marítimas, balcánica, magrebí, latinoamericana).",
      ],
    },
    {
      block: "Indicadores de salud y bienestar",
      items: [
        "Lesiones compatibles con violencia (hematomas, cicatrices, fracturas mal consolidadas).",
        "ITS reiteradas, embarazos no deseados, ausencia de seguimiento ginecológico.",
        "Síntomas de estrés postraumático: hipervigilancia, evitación, sueño fragmentado, disociación.",
        "Consumo de sustancias, frecuentemente inducido o tolerado por el explotador.",
      ],
    },
    {
      block: "Amenazas y miedo",
      items: [
        "Refiere temor por su familia en el país de origen.",
        "Conoce direcciones o nombres de familiares en boca del presunto explotador.",
        "Manifiesta miedo a la policía o a las autoridades de inmigración como obstáculo para pedir ayuda.",
      ],
    },
  ],

  // Guion de entrevista trauma-informada (primera entrevista, no formal)
  interview_script: {
    intro:
      "El objetivo es construir confianza, NO obtener una declaración judicial. " +
      "Adapta cada pregunta al ritmo de la persona. Si te detiene, no insistas. " +
      "Reformula con calma. Permite silencios. No tomes notas mientras hablas (mejor justo después).",
    rules: [
      "Garantiza confidencialidad explícitamente y por adelantado.",
      "Ofrece elección en todo lo que puedas (idioma, persona que acompaña, lugar de la conversación).",
      "Nunca preguntes «¿por qué no…?» (te fuiste, denunciaste, dijiste antes). Reemplaza por «¿qué pasaría si…?».",
      "Evita pedir cronología exhaustiva en el primer encuentro. Lo importante es la situación actual de seguridad.",
      "No prometas resultados que no controlas (papeles, permisos, plazas en recurso de acogida).",
    ],
    questions: [
      "¿Cómo te sientes ahora mismo? ¿Hay algo que necesites antes de seguir hablando? (agua, descanso, ir al baño)",
      "¿Estás en un lugar seguro hoy? ¿Y esta noche?",
      "¿Hay alguien que necesite saber dónde estás o que pueda estar buscándote?",
      "¿Tienes acceso libre a tu teléfono y a tus documentos?",
      "¿Te gustaría que alguien te acompañe? ¿Hablamos en otro idioma?",
      "Si quisieras volver a hablar conmigo otro día, ¿cómo podríamos hacerlo de forma segura?",
    ],
    redflags_actions: [
      "Si detectas peligro inmediato: 112 o coordinación con FFCCSE especializadas (UFAM en España).",
      "Si la persona pide explícitamente ayuda: ofrecer entidad especializada (Proyecto Esperanza, APRAMP, Adoratrices) y, si procede, periodo de restablecimiento y reflexión (mínimo 90 días, art. 59 bis LO 4/2000).",
      "Si la persona no pide ayuda hoy: entregar un canal de contacto seguro y volver a verla con un pretexto que ella elija (revisión médica, cita en oficina de extranjería, taller).",
    ],
  },

  // Mapa de derivación rápida — España. En modo profesional, esto se
  // contextualizará al país del usuario cuando exista.
  referral_map: [
    { etiqueta: "Emergencia inmediata", recurso: "112", nota: "Cobertura nacional, gratis, sin SIM." },
    { etiqueta: "Línea trata 24h", recurso: "900 10 50 90", nota: "Anónima, multilingüe." },
    { etiqueta: "Acreditación como víctima", recurso: "Unidad policial competente o entidad especializada", nota: "No requiere denuncia previa. Informe de identificación de entidad reconocida activa la protección." },
    { etiqueta: "Permiso de residencia", recurso: "Art. 59 bis LO 4/2000 — circunstancias excepcionales", nota: "Periodo de restablecimiento mínimo 90 días sin expulsión." },
    { etiqueta: "Acogida especializada", recurso: "Proyecto Esperanza, APRAMP, Adoratrices, Cruz Blanca", nota: "Pisos protegidos, atención integral." },
    { etiqueta: "Salud mental", recurso: "Centros de Salud Mental Comunitaria + ONG especializadas en trauma complejo", nota: "Pastor-Moreno et al. (2023) — Gaceta Sanitaria 37:102333." },
    { etiqueta: "Empadronamiento sin domicilio", recurso: "Servicios Sociales Comunitarios del Ayuntamiento", nota: "Empadronamiento es derecho independiente de la situación administrativa." },
  ],

  // Recursos formativos descargables (PDFs que ya están en /docs)
  training_materials: [
    { titulo: "Bibliografía Marco Teórico (UPO)", file: "1ER APARTADO MARCO TEORICO/BIBLIOGRAFÍA DEL PRIMER APARTADO_.docx" },
    { titulo: "Guía empadronamiento e inclusión financiera", folder: "EMPADRONAMIENTO" },
    { titulo: "Acreditación de víctimas de trata 2025", folder: "REGULARIZACIÓN" },
    { titulo: "Trata en el mundo digital — Diaconía", folder: "TECNOLOGÍA" },
    { titulo: "2025 Trafficking in Persons Report — U.S. State Dept.", folder: "BARRERAS EN LA DETECCIÓN" },
  ],
};

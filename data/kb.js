// Knowledge base built from documentation in /TRATA, classified by problem area.
// Each item: { q (display question), keywords (matching), a (answer), source (file/title), link (optional URL) }
window.KB = {
  categories: [
    {
      id: "empadronamiento",
      icon: "🏠",
      title: "Empadronamiento",
      desc: "Registrarte en el padrón municipal",
      items: [
        {
          q: "¿Qué documentos necesito para empadronarme en Sevilla?",
          keywords: ["empadron", "padron", "documentos", "necesito", "papeles", "registrar"],
          a: "Necesitas presentar:\n\n1) HOJA PADRONAL cumplimentada y firmada (sin tachaduras). Es esencial incluir teléfono y correo electrónico.\n\n2) DOCUMENTO DE IDENTIDAD de todas las personas mayores de 16 años:\n  • Españoles: DNI.\n  • Ciudadanos UE/EEE/Suiza: Certificado de Registro de Ciudadano de la Unión (CUE / tarjeta verde con NIE) + Pasaporte o documento de identidad del país de origen.\n  • Resto de países (no UE): Tarjeta de Identidad de Extranjero (TIE) en vigor; si no se dispone, Pasaporte en vigor.\n\n3) DOCUMENTACIÓN DE LA VIVIENDA (uno de los siguientes):\n  • Título de propiedad o referencia catastral.\n  • Contrato de alquiler + último recibo.\n  • Contrato de suministro de AGUA (EMASESA) o última factura de agua. ¡Las facturas de luz o gas NO son válidas!\n\nSi en el domicilio ya hay otras personas empadronadas, una persona adulta titular de la vivienda debe firmar la autorización en la hoja padronal.",
          source: "Ayuntamiento de Sevilla — Documentación necesaria para empadronarse (Padrón Municipal)",
          link: "https://www.sevilla.org/servicios/empadronamiento/informacion-cambio-en-el-padron-de-habitantes-de-sevilla"
        },
        {
          q: "¿Puedo empadronarme sin permiso de residencia?",
          keywords: ["sin papeles", "irregular", "sin permiso", "sin residencia", "indocumentado"],
          a: "SÍ. El empadronamiento es un derecho y una obligación de toda persona que resida en el municipio, independientemente de su situación administrativa. La documentación solo acredita la identidad: el Ayuntamiento NO realiza control sobre la legalidad de la residencia. Podrás empadronarte presentando tu pasaporte en vigor aunque no tengas TIE/NIE. Las personas no comunitarias sin residencia permanente deben renovar su inscripción cada dos años.",
          source: "Padrón Municipal de Sevilla y guía 'Para acceder a derechos: empadronamiento e inclusión financiera de víctimas de trata y explotación sexual'"
        },
        {
          q: "¿Qué pasa si no tengo domicilio fijo o vivo en una habitación cedida?",
          keywords: ["sin domicilio", "sin casa", "habitacion", "cedida", "calle", "homeless"],
          a: "Existe el llamado 'empadronamiento sin domicilio fijo' que los Servicios Sociales municipales pueden tramitar. Si vives en una habitación cedida o en casa de alguien, esa persona (titular o arrendataria) debe firmar la autorización y aportar su documento de identidad y un título habilitante (escritura, contrato de alquiler o contrato de agua a su nombre). Acude a tu Centro de Servicios Sociales Comunitarios más cercano para que te orienten.",
          source: "Guía 'Para acceder a derechos: empadronamiento e inclusión financiera de víctimas de trata y explotación sexual'"
        }
      ]
    },
    {
      id: "regularizacion",
      icon: "📄",
      title: "Regularización",
      desc: "Permisos de residencia y trabajo",
      items: [
        {
          q: "Soy víctima de trata, ¿puedo obtener un permiso de residencia?",
          keywords: ["trata", "victima", "permiso", "residencia", "regularizar", "papeles"],
          a: "Sí. La legislación española reconoce a las víctimas de trata el derecho a un periodo de restablecimiento y reflexión (mínimo 90 días), durante el cual no se ejecuta ninguna expulsión. Además, pueden solicitar autorización de residencia y trabajo por circunstancias excepcionales por colaboración con las autoridades o por su situación personal (art. 59 bis Ley Orgánica 4/2000). Es fundamental contar con la acreditación formal como víctima, emitida por las autoridades competentes (Fuerzas y Cuerpos de Seguridad o entidades especializadas).",
          source: "Informe Acreditaciones víctimas de trata y explotación sexual 2025; Directiva (UE) 2024/1712"
        },
        {
          q: "¿Cómo se obtiene la acreditación como víctima de trata?",
          keywords: ["acreditacion", "acreditar", "como victima", "denuncia"],
          a: "La acreditación oficial la emite la unidad policial competente. No obstante, las entidades especializadas (asociaciones reconocidas por el Ministerio) pueden emitir informes de identificación que sirven para activar la protección. NO es imprescindible denunciar para acceder a recursos de acogida y ayuda. Te recomendamos contactar con una entidad especializada que te acompañe en todo el proceso.",
          source: "Informe Acreditaciones víctimas de trata y explotación sexual 2025"
        },
        {
          q: "¿Existe una nueva ley europea sobre trata?",
          keywords: ["directiva", "europea", "ue", "ley", "nueva"],
          a: "Sí. La Directiva (UE) 2024/1712 actualiza el marco europeo contra la trata de seres humanos. Refuerza la prevención, amplía el catálogo de formas de explotación reconocidas (incluyendo gestación subrogada, matrimonio forzado, adopción ilegal) y mejora los derechos de asistencia, protección y compensación a las víctimas. Los Estados deben transponerla a su derecho interno.",
          source: "OJ_L_202401712_EN — Directiva (UE) 2024/1712"
        }
      ]
    },
    {
      id: "vivienda",
      icon: "🏘️",
      title: "Vivienda y recursos",
      desc: "Alojamiento y servicios sociales",
      items: [
        {
          q: "¿Dónde puedo pedir ayuda urgente en Sevilla?",
          keywords: ["urgente", "ayuda", "donde", "sevilla", "servicios sociales"],
          a: "Acude a los Centros de Servicios Sociales Comunitarios del Ayuntamiento de Sevilla. Atienden de lunes a viernes de 9:00 a 14:00, y algunas tardes de 16:00 a 19:30. Para muchas ayudas se requiere permiso de residencia, pero también pueden emitir informes a personas sin permiso. Algunos centros:\n\n• Casco Antiguo — 955 472 170 — C/ Arrayán, 1\n• Triana-Los Remedios — 955 473 535 — C/ San Jacinto, 27\n• Macarena — 955 472 222 — C/ Fray Isidoro de Sevilla, 1\n• Polígono Sur — 955 473 460 — Av. de la Paz, 10\n• Nervión — 955 472 770 — C/ Santo Domingo de la Calzada, 14\n• Cerro - Su Eminencia — 955 472 555 — C/ Tarragona, 3\n• San Pablo - Santa Justa — 955 473 100 — Av. Pedro Romero, s/n\n• Sevilla Este - Alcosa — 955 471 600 — Av. de las Ciencias, 43 B\n\nEn caso de emergencia llama al 112. Línea gratuita y anónima 24h sobre trata: 900 10 50 90.",
          source: "Sevilla Acoge — Guía de Recursos Sociales de Sevilla 2024"
        },
        {
          q: "¿Hay recursos de acogida específicos para víctimas de trata?",
          keywords: ["acogida", "casa", "refugio", "alojamiento", "piso"],
          a: "Sí. Existen entidades especializadas con pisos y centros de acogida confidenciales para mujeres víctimas de trata y explotación sexual (por ejemplo, Proyecto Esperanza, APRAMP, Diaconía, Sevilla Acoge, Cáritas, Médicos del Mundo). Ofrecen alojamiento seguro, atención psicológica, asesoramiento jurídico y acompañamiento en la integración. El acceso suele articularse a través de Servicios Sociales o de la entidad directamente.",
          source: "Memoria Proyecto Esperanza 2023; Guía de Recursos Sociales de Sevilla 2024"
        }
      ]
    },
    {
      id: "salud",
      icon: "🧠",
      title: "Salud mental y física",
      desc: "Atención sanitaria y apoyo psicológico",
      items: [
        {
          q: "¿Tengo derecho a atención sanitaria si no tengo papeles?",
          keywords: ["sanitaria", "medico", "salud", "sin papeles", "tarjeta sanitaria"],
          a: "Sí. En España, cualquier persona tiene derecho a la atención sanitaria de urgencia. Además, las personas extranjeras en situación irregular tienen derecho a la asistencia sanitaria pública en igualdad de condiciones, según el RD-ley 7/2018, siempre que no puedan acreditar cobertura sanitaria por otra vía. Acude a un centro de salud y solicita el alta. Si tienes dificultades, los Servicios Sociales o entidades como Médicos del Mundo pueden ayudarte.",
          source: "Real Decreto-ley 7/2018; entidades de apoyo en Andalucía"
        },
        {
          q: "Necesito apoyo psicológico, ¿qué puedo hacer?",
          keywords: ["psicologico", "psicologo", "trauma", "ansiedad", "depresion", "salud mental", "estres"],
          a: "Las víctimas de trata y explotación sexual presentan con frecuencia trastornos de estrés postraumático complejo, ansiedad, depresión y problemas del sueño. Tienes derecho a atención psicológica especializada. Vías de acceso:\n\n• Tu centro de salud (medicina de familia te derivará a salud mental).\n• Entidades especializadas que ofrecen atención psicológica gratuita y culturalmente sensible (Proyecto Esperanza, APRAMP, Médicos del Mundo, Diaconía).\n• En crisis: 024 (línea de atención a la conducta suicida) o 112.\n\nPide siempre una profesional con perspectiva de género y, si lo necesitas, mediación cultural.",
          source: "Pastor-Moreno G. et al. (2023). 'Barreras y propuestas para el abordaje sanitario de la trata con fines de explotación sexual'. Gaceta Sanitaria 37: 102333"
        }
      ]
    },
    {
      id: "empleo",
      icon: "💼",
      title: "Empleo",
      desc: "Sectores con oportunidades",
      items: [
        {
          q: "¿En qué sectores hay más oportunidades de empleo?",
          keywords: ["empleo", "trabajo", "trabajar", "sector", "oportunidades"],
          a: "En España actualmente los sectores con mayor demanda de personal son: hostelería y restauración, cuidados a personas mayores y dependientes, servicio doméstico, agricultura de temporada, construcción, logística y limpieza. Para muchas ofertas regularizadas se necesita permiso de trabajo, pero también existen programas de formación e inserción específicos para mujeres en situación de vulnerabilidad. (El usuario indicó que se añadirá un documento adicional sobre empleo: cuando esté disponible se ampliará esta sección).",
          source: "Sectores con más oportunidades de empleo (documento del expediente)"
        }
      ]
    },
    {
      id: "tecnologia",
      icon: "📱",
      title: "Tecnología y trata digital",
      desc: "Riesgos en redes y captación online",
      items: [
        {
          q: "¿Cómo me captan los tratantes a través de Internet?",
          keywords: ["internet", "redes", "online", "captacion", "digital", "instagram", "tiktok"],
          a: "Los tratantes utilizan redes sociales, aplicaciones de citas y de mensajería para localizar a víctimas potenciales. Estrategias frecuentes: ofertas de trabajo falsas (modelo, niñera, camarera en el extranjero) con sueldos irreales; 'loverboys' que fingen una relación afectiva para ganarse la confianza; promesas de viaje, becas o cirugías estéticas pagadas. Señales de alarma: insisten en pagarte el viaje y guardarte el pasaporte, te piden fotos íntimas, no te dan detalles claros del trabajo, te empujan a tomar decisiones rápidas, o aíslan tu contacto con familia y amistades.",
          source: "Diaconía España — 'Trata en el mundo digital: protegiendo a l@s menores'. Guía para profesionales del ámbito educativo (ALMMA)",
          link: "https://www.desactivalatrata.es"
        },
        {
          q: "¿Cómo puedo protegerme online?",
          keywords: ["proteger", "seguridad", "privacidad", "consejos"],
          a: "Algunas medidas básicas:\n\n• Configura tus redes en privado y no aceptes contactos de personas desconocidas.\n• No compartas tu ubicación en tiempo real.\n• Desconfía de ofertas de trabajo que te exijan viajar urgentemente o entregar el pasaporte.\n• No envíes fotos íntimas; pueden usarse como chantaje (sextorsión).\n• Guarda capturas de pantalla de cualquier conversación sospechosa.\n• Si recibes amenazas, denuncia en grupos.gdt@guardiacivil.org o en denuncias.policia.es.\n\nEn caso de duda, contacta con una entidad especializada antes de aceptar cualquier 'oportunidad'.",
          source: "Diaconía España — Proyecto Desactiva la Trata"
        }
      ]
    },
    {
      id: "deteccion",
      icon: "🔍",
      title: "Detección e identificación",
      desc: "Cómo reconocer una situación de trata",
      items: [
        {
          q: "¿Cómo puedo saber si soy o conozco a una víctima de trata?",
          keywords: ["detectar", "identificar", "victima", "reconocer", "indicios", "señales"],
          a: "Indicadores frecuentes de trata con fines de explotación sexual o laboral:\n\n• La persona no controla su propia documentación (pasaporte retenido).\n• Tiene una deuda impuesta que debe saldar trabajando.\n• Vive y trabaja en el mismo lugar y no puede salir libremente.\n• Está siempre acompañada y no habla por sí misma.\n• Presenta signos de violencia, miedo, ansiedad o trauma.\n• Desconoce dónde vive o no sabe la dirección.\n• Repite respuestas aprendidas o evita el contacto visual.\n\nMuchas víctimas tardan en reconocerse como tales por miedo, desconfianza hacia las autoridades o vínculos afectivos con el tratante. Si tienes sospechas, llama al 900 10 50 90 (gratuito, anónimo, 24h) o al 112.",
          source: "U.S. Department of State — 2025 Trafficking in Persons Report; Pastor-Moreno et al. 2023"
        }
      ]
    },
    {
      id: "desinformacion",
      icon: "📰",
      title: "Desinformación y derechos",
      desc: "Mitos comunes sobre la trata",
      items: [
        {
          q: "¿Es verdad que si denuncio me deportan?",
          keywords: ["denuncia", "deportar", "expulsar", "miedo"],
          a: "NO. La ley española establece un periodo de restablecimiento y reflexión (mínimo 90 días) durante el cual NO puede ejecutarse ninguna expulsión. Además, las víctimas identificadas pueden obtener una autorización de residencia por circunstancias excepcionales, sin necesidad de colaborar obligatoriamente con la justicia. Tienes derecho a información en tu idioma, a un abogado/a de oficio y a protección.",
          source: "Informe Acreditaciones víctimas de trata y explotación sexual 2025; Macroestudio sobre trata"
        },
        {
          q: "¿La trata solo afecta a mujeres extranjeras?",
          keywords: ["mujeres", "hombres", "españolas", "mito"],
          a: "NO. Aunque las mujeres y niñas representan la mayoría de las víctimas de trata con fines de explotación sexual (más del 95% en España), la trata también afecta a hombres, niños y personas LGTBIQ+, y puede tener fines laborales, de mendicidad forzada, matrimonios forzados o tráfico de órganos. También hay víctimas españolas.",
          source: "Macroestudio sobre la trata; 2025 Trafficking in Persons Report — Spain"
        }
      ]
    }
  ]
};

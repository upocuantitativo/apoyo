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
          keywords: ["empleo", "trabajo", "trabajar", "sector", "oportunidades", "demanda"],
          a: "En España y Andalucía los sectores con mayor demanda son: hostelería y restauración, cuidados a personas mayores y dependientes, servicio doméstico, agricultura de temporada, construcción, logística, limpieza y atención sanitaria. Para muchas ofertas se necesita permiso de trabajo, pero existen programas específicos de formación e inserción para personas en situación de vulnerabilidad y para ocupaciones de difícil cobertura.",
          source: "Sectores con más oportunidades de empleo; Guía Interactiva de Empleo para Migrantes en Andalucía (Junta de Andalucía / SAE)"
        },
        {
          q: "¿Qué formación gratuita puedo hacer si estoy en paro?",
          keywords: ["formacion", "cursos", "estudiar", "sae", "sepe", "gratis", "formarme"],
          a: "Tienes varias vías de formación gratuita:\n\n• **Cursos del SAE (Servicio Andaluz de Empleo):** Formación Profesional para el Empleo dirigida a personas desempleadas inscritas en el SAE. Algunos permiten obtener un certificado de profesionalidad oficial. El personal de la oficina te ayuda a buscar cursos y a inscribirte aunque no tengas el nivel educativo requerido.\n• **Cursos del SEPE (Servicio Público de Empleo Estatal):** buscadores de cursos online y presenciales a nivel nacional.\n• **Continuar estudiando:** modalidades a distancia, programas de alfabetización y obtención de titulaciones básicas.\n• **Homologación de títulos extranjeros:** si ya estudiaste en tu país, puedes solicitar el reconocimiento oficial en España. La oficina de empleo te orienta.",
          source: "Guía Interactiva de Empleo para Migrantes en Andalucía — apartado 'Tu FORMACIÓN' (SAE / Junta de Andalucía)"
        },
        {
          q: "¿Cómo me inscribo como demandante de empleo en el SAE?",
          keywords: ["sae", "demandante", "inscribir", "darse de alta", "oficina empleo"],
          a: "Puedes hacerlo en línea con **SAE Online**, que permite inscribirte como demandante de empleo, consultar ofertas o descargar la app del SAE. Si tienes dudas, pide cita en la oficina del SAE más cercana. El SAE también desarrolla **Proyectos Integrales para la Inserción**, **Programas de Empleo y Formación**, la **Red Andalucía Orienta** y prácticas en empresas (EPES). Para menores de 30 años existe la **Garantía Juvenil**.",
          source: "Guía Interactiva de Empleo para Migrantes en Andalucía — apartado 'Tu acceso al EMPLEO'"
        },
        {
          q: "¿Puedo acreditar la experiencia laboral que ya tengo aunque no tenga títulos?",
          keywords: ["acreditacion", "competencias", "experiencia", "titulo", "certificado profesionalidad"],
          a: "Sí. Existe el procedimiento de **Acreditación de Competencias Profesionales**, que reconoce oficialmente los conocimientos adquiridos por experiencia laboral o formación no formal. La acreditación es válida en toda España y permite obtener un certificado de profesionalidad. Pregunta en tu oficina del SAE por las convocatorias abiertas.",
          source: "Guía Interactiva de Empleo para Migrantes en Andalucía — Acreditación de competencias profesionales"
        },
        {
          q: "Quiero trabajar por mi cuenta o montar un negocio, ¿cómo lo hago?",
          keywords: ["autonomo", "autoempleo", "negocio", "emprender", "cade"],
          a: "Para emprender en Andalucía necesitas tramitar la **autorización inicial de residencia y trabajo por cuenta propia**. Los **Centros Andaluces de Emprendimiento (CADE)** te asesoran gratuitamente y te ayudan a preparar el proyecto. Los **Puntos de Atención al Emprendedor (PAE)** informan sobre los procedimientos de alta como autónomo/a y ofrecen tramitación telemática. Existen **subvenciones y bonificaciones** para autónomos: los CADE te orientan sobre las ayudas disponibles. Algunos servicios son gratuitos y otros requieren pago de tasas.",
          source: "Guía Interactiva de Empleo para Migrantes en Andalucía — Autoempleo / CADE / PAE"
        },
        {
          q: "¿Qué es el arraigo y qué tipos hay para regularizar mi situación?",
          keywords: ["arraigo", "regularizar", "social", "laboral", "familiar", "sociolaboral", "sociolormativo", "segunda oportunidad"],
          a: "El **arraigo** es una autorización excepcional de residencia para personas en situación irregular. Requisitos generales: estar en España, no tener protección internacional pendiente, residir al menos 2 años (excepto el familiar), carecer de antecedentes penales, pagar la tasa y solicitar la TIE en el plazo de un mes. Tipos:\n\n• **Arraigo familiar:** 5 años, para progenitores/tutores de menores UE/EEE/Suiza o familiares de personas UE con discapacidad. NO exige residencia previa.\n• **Arraigo sociolaboral:** se concede a quienes acreditan integración social y un contrato/relación laboral.\n• **Arraigo social:** para quienes acreditan integración y vínculos familiares.\n• **Arraigo sociolaborativo (sociolormativo):** 1 año (ampliable a 4) tras 2 años en España, comprometiéndose a hacer formación oficial. Permite trabajar hasta 30 h/semana. Requiere informe de integración social.\n• **Arraigo de segunda oportunidad:** para quienes han residido al menos 2 años en España y cotizado 6 meses, y no han renovado una autorización no excepcional. También aplica a solicitantes de asilo que cumplan condiciones.",
          source: "Guía Interactiva de Empleo para Migrantes en Andalucía — Trámites de interés / Arraigos"
        },
        {
          q: "¿Existe un visado para venir a buscar trabajo a España?",
          keywords: ["visado", "buscar trabajo", "visa", "venir", "12 meses"],
          a: "Sí. El **visado para la búsqueda de empleo** autoriza a trasladarse a España para buscar trabajo durante 12 meses. Los requisitos son similares a los de residencia y a los de contratación en origen. Hay dos modalidades: para descendientes de españoles y para ocupaciones de difícil cobertura. Una vez obtengas un contrato, la empresa debe solicitar tu autorización de residencia y trabajo. Para que el visado surta efecto debes inscribirte en la Seguridad Social en el plazo de un mes.",
          source: "Guía Interactiva de Empleo para Migrantes en Andalucía — Visado para la búsqueda de empleo"
        },
        {
          q: "¿Puedo traer a mi familia a España (reagrupación familiar)?",
          keywords: ["reagrupacion", "familia", "traer", "conyuge", "hijos", "familiar"],
          a: "Sí. Puedes reagrupar a tu **cónyuge o pareja de hecho, hijos menores o ascendientes** si dispones de residencia legal, vivienda adecuada y recursos económicos. Debes haber residido legalmente al menos un año. Las personas reagrupadas pueden trabajar sin necesidad de otro permiso y, posteriormente, pueden obtener autorización propia.\n\nOtra vía: **residencia para familiares de personas con nacionalidad española**. Concede 5 años de residencia y trabajo a familiares extracomunitarios de españoles o de la UE/EEE que conviven con ellos. NO exige tiempo previo de residencia y, una vez concedida, se puede obtener autorización independiente.",
          source: "Guía Interactiva de Empleo para Migrantes en Andalucía — Reúne a tu familia"
        },
        {
          q: "¿Cómo obtengo el certificado digital o Cl@ve para hacer trámites por internet?",
          keywords: ["certificado digital", "clave", "cl@ve", "tramites online", "internet", "firma electronica"],
          a: "Para hacer gestiones administrativas online necesitas identificarte digitalmente:\n\n• **Certificado electrónico/digital:** sirve para empadronamiento, vida laboral, prestaciones, reclamaciones. Lo solicitas por internet y luego acudes a una oficina a acreditar tu identidad. Si tienes autorización, dispones de un mes para solicitar la TIE.\n• **Cl@ve Permanente:** combina usuario y contraseña para acceder a la Administración pública.\n• **Cl@ve PIN:** genera una contraseña temporal que llega a tu teléfono y es válida durante 24 horas.",
          source: "Guía Interactiva de Empleo para Migrantes en Andalucía — Tramitación online"
        },
        {
          q: "¿Puedo venir a estudiar a España (estancia por estudios)?",
          keywords: ["estudios", "estudiar", "universidad", "estancia", "estudiante"],
          a: "Sí. La **estancia por estudios** autoriza a extranjeros no comunitarios a realizar estudios o investigaciones de más de 90 días en centros oficiales (universitarios, posgrado, certificaciones profesionales, intercambios, voluntariado). Se otorga por la duración del programa y puede extenderse a familiares. La solicitud puede presentarse hasta dos meses antes del inicio. El permiso permite **trabajar a tiempo parcial**; la oficina de empleo te asesora sobre los límites y requisitos.",
          source: "Guía Interactiva de Empleo para Migrantes en Andalucía — Estancia por estudios"
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

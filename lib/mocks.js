/**
 * Mocks para simular respuestas de la API del agente.
 * Estos datos se usan durante el desarrollo del frontend.
 */

// Dominios soportados por el sistema
export const DOMAINS = {
  academico: {
    id: "academico",
    label: "Académico",
    description: "Consultas sobre notas, materias, horarios, profesores",
  },
  administrativo_financiero: {
    id: "administrativo_financiero",
    label: "Administrativo y Financiero",
    description: "Matrículas, pagos, certificados, trámites administrativos",
  },
  bienestar_estudiantil: {
    id: "bienestar_estudiantil",
    label: "Bienestar Estudiantil",
    description: "Subsidios, becas, salud, deportes, cultura",
  },
  internacionalizacion: {
    id: "internacionalizacion",
    label: "Internacionalización",
    description: "Intercambios, convenios, movilidad académica",
  },
  investigacion: {
    id: "investigacion",
    label: "Investigación",
    description: "Grupos de investigación, semilleros, proyectos",
  },
};

// Mock de respuesta para consulta sobre subsidio de alimentación
export const mockSubsidioResponse = {
  question: "¿Cómo pido el subsidio de alimentación?",
  answer:
    "Para solicitar el subsidio de alimentación debes dirigirte a la Oficina de Bienestar Universitario ubicada en el Edificio 124, primer piso. Debes presentar tu carné estudiantil vigente y el recibo de matrícula del semestre actual. El proceso de aprobación toma aproximadamente 5 días hábiles.",
  detected_domain: "bienestar_estudiantil",
  domain_confidence: 0.95,
  sources: [
    {
      name: "Resolución 091 de 2004",
      type: "normativa",
      status: "vigente",
      url: "https://corporate.univalle.edu.co/resoluciones/091-2004",
    },
    {
      name: "Portal Vicebienestar",
      type: "web",
      status: "actualizado",
      url: "https://vicebienestar.univalle.edu.co/subsidios",
    },
  ],
  action_links: [
    {
      label: "Ir a SIRA",
      url: "https://sira.univalle.edu.co",
      type: "primary",
    },
    {
      label: "Ver requisitos completos",
      url: "https://vicebienestar.univalle.edu.co/subsidios/requisitos",
      type: "secondary",
    },
  ],
  timeline_events: [
    {
      step: "planning",
      message: "Detectando área de consulta...",
      timestamp: new Date().toISOString(),
    },
    {
      step: "domain_detected",
      message: "Bienestar Estudiantil",
      timestamp: new Date().toISOString(),
    },
    {
      step: "searching",
      message: "Consultando Resolución 091 de 2004 (Subsidios)",
      timestamp: new Date().toISOString(),
    },
    {
      step: "external_search",
      message: "Consultando portal de Vicebienestar vía Serper",
      timestamp: new Date().toISOString(),
    },
    {
      step: "synthesizing",
      message: "Generando respuesta...",
      timestamp: new Date().toISOString(),
    },
  ],
  history: [],
};

// Mock de respuesta para consulta sobre intercambio
export const mockIntercambioResponse = {
  question: "¿Cuáles son las fechas de inscripciones para intercambio?",
  answer:
    "Las inscripciones para el programa de intercambio académico se realizan en dos periodos: del 1 al 28 de febrero para el semestre A, y del 1 al 31 de agosto para el semestre B. Debes tener promedio acumulado mínimo de 3.5 y haber cursado al menos dos semestres.",
  detected_domain: "internacionalizacion",
  domain_confidence: 0.92,
  sources: [
    {
      name: "Acuerdo 009 - Movilidad Académica",
      type: "normativa",
      status: "vigente",
      url: "https://corporate.univalle.edu.co/acuerdos/009",
    },
    {
      name: "ORI - Oficina de Relaciones Internacionales",
      type: "web",
      status: "actualizado",
      url: "https://ori.univalle.edu.co",
    },
  ],
  action_links: [
    {
      label: "Portal ORI",
      url: "https://ori.univalle.edu.co",
      type: "primary",
    },
    {
      label: "Ver convenios disponibles",
      url: "https://ori.univalle.edu.co/convenios",
      type: "secondary",
    },
  ],
  timeline_events: [
    {
      step: "planning",
      message: "Detectando área de consulta...",
      timestamp: new Date().toISOString(),
    },
    {
      step: "domain_detected",
      message: "Internacionalización",
      timestamp: new Date().toISOString(),
    },
    {
      step: "searching",
      message: "Consultando Acuerdo 009 - Movilidad Académica",
      timestamp: new Date().toISOString(),
    },
    {
      step: "external_search",
      message: "Consultando ORI vía Serper",
      timestamp: new Date().toISOString(),
    },
    {
      step: "synthesizing",
      message: "Generando respuesta...",
      timestamp: new Date().toISOString(),
    },
  ],
  history: [],
};

// Mock de respuesta para consulta sobre certificado de notas
export const mockCertificadoResponse = {
  question: "¿Cómo solicito un certificado de notas?",
  answer:
    "Puedes solicitar el certificado de notas a través del portal SIRA en la sección 'Certificados Académicos'. El costo es de $5.000 COP y puedes pagarlo con tarjeta débito/crédito o en la tesorería de la universidad. El certificado estará disponible en 24 horas hábiles.",
  detected_domain: "academico",
  domain_confidence: 0.98,
  sources: [
    {
      name: "Portal SIRA",
      type: "sistema",
      status: "disponible",
      url: "https://sira.univalle.edu.co",
    },
    {
      name: "Acuerdo 009 - Reglamento Estudiantil",
      type: "normativa",
      status: "vigente",
      url: "https://corporate.univalle.edu.co/acuerdos/009",
    },
  ],
  action_links: [
    {
      label: "Ir a SIRA",
      url: "https://sira.univalle.edu.co",
      type: "primary",
    },
  ],
  timeline_events: [
    {
      step: "planning",
      message: "Detectando área de consulta...",
      timestamp: new Date().toISOString(),
    },
    {
      step: "domain_detected",
      message: "Académico",
      timestamp: new Date().toISOString(),
    },
    {
      step: "searching",
      message: "Consultando Acuerdo 009 - Reglamento Estudiantil",
      timestamp: new Date().toISOString(),
    },
    {
      step: "synthesizing",
      message: "Generando respuesta...",
      timestamp: new Date().toISOString(),
    },
  ],
  history: [],
};

// Mock de respuesta para consulta sobre pagos de matrícula
export const mockMatriculaResponse = {
  question: "¿Cuándo debo pagar la matrícula?",
  answer:
    "El pago de matrícula se realiza según las fechas establecidas en el calendario académico. Para el semestre 2024-A, las fechas son: primera cuota del 15 al 25 de enero, segunda cuota del 15 al 25 de marzo. Puedes pagar en línea a través del portal de pagos o en los bancos autorizados.",
  detected_domain: "administrativo_financiero",
  domain_confidence: 0.94,
  sources: [
    {
      name: "Calendario Académico 2024",
      type: "documento",
      status: "vigente",
      url: "https://univalle.edu.co/calendario-2024",
    },
    {
      name: "Portal de Pagos",
      type: "sistema",
      status: "disponible",
      url: "https://pagos.univalle.edu.co",
    },
  ],
  action_links: [
    {
      label: "Portal de Pagos",
      url: "https://pagos.univalle.edu.co",
      type: "primary",
    },
    {
      label: "Ver calendario académico",
      url: "https://univalle.edu.co/calendario-2024",
      type: "secondary",
    },
  ],
  timeline_events: [
    {
      step: "planning",
      message: "Detectando área de consulta...",
      timestamp: new Date().toISOString(),
    },
    {
      step: "domain_detected",
      message: "Administrativo y Financiero",
      timestamp: new Date().toISOString(),
    },
    {
      step: "searching",
      message: "Consultando Calendario Académico 2024",
      timestamp: new Date().toISOString(),
    },
    {
      step: "external_search",
      message: "Consultando portal de pagos vía Serper",
      timestamp: new Date().toISOString(),
    },
    {
      step: "synthesizing",
      message: "Generando respuesta...",
      timestamp: new Date().toISOString(),
    },
  ],
  history: [],
};

// Mock de respuesta para consulta sobre grupos de investigación
export const mockInvestigacionResponse = {
  question: "¿Cómo puedo unirme a un grupo de investigación?",
  answer:
    "Para unirte a un grupo de investigación debes identificar los grupos registrados en COLCIENCIAS que trabajen en tu área de interés. Luego contacta al líder del grupo directamente o a través de la coordinación de tu programa. Muchos grupos tienen semilleros de investigación para estudiantes de pregrado.",
  detected_domain: "investigacion",
  domain_confidence: 0.91,
  sources: [
    {
      name: "Portal de Investigación Univalle",
      type: "web",
      status: "actualizado",
      url: "https://investigacion.univalle.edu.co",
    },
    {
      name: "Grupos COLCIENCIAS",
      type: "externo",
      status: "disponible",
      url: "https://minciencias.gov.co/grupos",
    },
  ],
  action_links: [
    {
      label: "Ver grupos de investigación",
      url: "https://investigacion.univalle.edu.co/grupos",
      type: "primary",
    },
    {
      label: "Portal MinCiencias",
      url: "https://minciencias.gov.co",
      type: "secondary",
    },
  ],
  timeline_events: [
    {
      step: "planning",
      message: "Detectando área de consulta...",
      timestamp: new Date().toISOString(),
    },
    {
      step: "domain_detected",
      message: "Investigación",
      timestamp: new Date().toISOString(),
    },
    {
      step: "searching",
      message: "Consultando Portal de Investigación Univalle",
      timestamp: new Date().toISOString(),
    },
    {
      step: "external_search",
      message: "Consultando MinCiencias vía Serper",
      timestamp: new Date().toISOString(),
    },
    {
      step: "synthesizing",
      message: "Generando respuesta...",
      timestamp: new Date().toISOString(),
    },
  ],
  history: [],
};

// Función para simular delay de red
export const simulateDelay = (ms = 1500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Función para obtener mock basado en palabras clave
export function getMockResponse(question) {
  const q = question.toLowerCase();

  if (
    q.includes("subsidio") ||
    q.includes("alimentación") ||
    q.includes("bienestar")
  ) {
    return mockSubsidioResponse;
  }
  if (
    q.includes("intercambio") ||
    q.includes("internacional") ||
    q.includes("movilidad")
  ) {
    return mockIntercambioResponse;
  }
  if (
    q.includes("certificado") ||
    q.includes("notas") ||
    q.includes("académic")
  ) {
    return mockCertificadoResponse;
  }
  if (
    q.includes("matrícula") ||
    q.includes("pago") ||
    q.includes("financiero") ||
    q.includes("administrativo")
  ) {
    return mockMatriculaResponse;
  }
  if (
    q.includes("investigación") ||
    q.includes("grupo") ||
    q.includes("semillero")
  ) {
    return mockInvestigacionResponse;
  }

  // Respuesta por defecto
  return {
    question: question,
    answer:
      "Gracias por tu consulta. Estoy procesando tu pregunta para encontrar la información más relevante en los sistemas de la Universidad del Valle.",
    detected_domain: "academico",
    domain_confidence: 0.75,
    sources: [],
    action_links: [],
    timeline_events: [
      {
        step: "planning",
        message: "Analizando consulta...",
        timestamp: new Date().toISOString(),
      },
    ],
    history: [],
  };
}

// Simular streaming de eventos
export async function* mockStreamEvents(question) {
  const response = getMockResponse(question);

  // Emitir eventos de timeline
  for (const event of response.timeline_events) {
    yield { type: "timeline", data: event };
    await simulateDelay(300);
  }

  // Emitir tokens de respuesta
  const words = response.answer.split(" ");
  for (const word of words) {
    yield { type: "token", data: { token: word + " " } };
    await simulateDelay(50);
  }

  // Emitir respuesta completa
  yield { type: "done", data: response };
}

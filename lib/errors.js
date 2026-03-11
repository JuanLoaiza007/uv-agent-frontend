import { AlertCircle, WifiOff, Timer, ServerCrash } from "lucide-react";

/**
 * Diccionario de errores amigables para el usuario
 */
export const ERROR_CATALOG = {
  CONNECTION_ERROR: {
    title: "Sin conexión",
    message: "No logramos conectar con el servidor. Verifica tu internet e inténtalo de nuevo.",
    icon: WifiOff,
    color: "text-amber-600",
  },
  TIMEOUT_ERROR: {
    title: "Tiempo excedido",
    message: "La consulta está tardando más de lo esperado. Por favor, intenta de nuevo.",
    icon: Timer,
    color: "text-amber-600",
  },
  SERVER_ERROR: {
    title: "Error del sistema",
    message: "Hubo un problema técnico en nuestros servicios. Ya estamos trabajando para solucionarlo.",
    icon: ServerCrash,
    color: "text-red-600",
  },
  DEFAULT: {
    title: "Algo salió mal",
    message: "Ocurrió un error inesperado al procesar tu pregunta. Por favor, intenta más tarde.",
    icon: AlertCircle,
    color: "text-red-600",
  },
};

/**
 * Identifica el tipo de error basado en el mensaje o status
 */
export function getErrorType(err) {
  const message = (err?.message || String(err)).toLowerCase();
  
  if (message.includes("fetch") || message.includes("network") || message.includes("failed to fetch")) {
    return "CONNECTION_ERROR";
  }
  
  if (message.includes("timeout") || message.includes("deadline")) {
    return "TIMEOUT_ERROR";
  }

  if (message.includes("500") || message.includes("internal server error")) {
    return "SERVER_ERROR";
  }

  return "DEFAULT";
}

/**
 * Formatea la información técnica para el botón de copiado
 */
export function formatErrorForClipboard(errorData) {
  const timestamp = new Date().toISOString();

  // Datos de red
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const networkInfo = connection
    ? `${connection.effectiveType || "desconocido"} (downlink: ${connection.downlink ?? "?"} Mbps, rtt: ${connection.rtt ?? "?"}ms)`
    : "No disponible";

  // Memoria del dispositivo (si el navegador lo expone)
  const memory = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "No disponible";

  // Viewport
  const viewport = `${window.innerWidth}x${window.innerHeight}px`;

  // Zona horaria
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const lines = [
    "╔══════════════════════════════════════════╗",
    "║         INFORME DE ERROR - UV AGENTE     ║",
    "╚══════════════════════════════════════════╝",
    "",
    "▸ IDENTIFICACIÓN DEL ERROR",
    `  Tipo              : ${errorData.type || "UNKNOWN"}`,
    `  Fecha/Hora        : ${timestamp}`,
    `  Zona horaria      : ${timezone}`,
    "",
    "▸ MENSAJE TÉCNICO",
    `  ${errorData.raw_message || "Sin mensaje"}`,
    "",
    "▸ CONTEXTO DE NAVEGACIÓN",
    `  URL               : ${window.location.href}`,
    `  Referrer          : ${document.referrer || "directo"}`,
    "",
    "▸ ENTORNO DEL CLIENTE",
    `  Navegador         : ${navigator.userAgent}`,
    `  Idioma            : ${navigator.language}`,
    `  Plataforma        : ${navigator.platform}`,
    `  Viewport          : ${viewport}`,
    `  Memoria RAM       : ${memory}`,
    `  Núcleos lógicos   : ${navigator.hardwareConcurrency ?? "No disponible"}`,
    "",
    "▸ CONECTIVIDAD",
    `  Estado online     : ${navigator.onLine ? "Sí" : "No"}`,
    `  Tipo de red       : ${networkInfo}`,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "Por favor, comparte este informe con el equipo de soporte.",
    "No incluye contraseñas ni sesiones activas.",
  ];

  return lines.join("\n");
}


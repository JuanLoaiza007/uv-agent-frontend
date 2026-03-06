"use client";

import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { DomainTags } from "@/components/DomainTags";
import { Timeline } from "@/components/Timeline";
import { ResponseCard } from "@/components/ResponseCard";

// URL del backend desde variables de entorno
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

/**
 * Página principal del sistema de consulta agéntico
 *
 * Según filosofia-interfaz.md:
 * - Buscador único estilo Perplexity
 * - Clasificación pasiva de dominios
 * - Timeline de razonamiento visible
 * - Ficha de trámite como respuesta
 */
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [activeDomain, setActiveDomain] = useState(null);
  const [domainConfidence, setDomainConfidence] = useState(null);

  // Mapeo de eventos del backend al formato del Timeline
  // Según documentación: prompt_agent_stream_api.md
  const mapBackendEventToTimeline = (eventType, data) => {
    switch (eventType) {
      case "action_start":
        // Mapear según el tipo de acción
        if (data.action_type === "domain_detector") {
          return { step: "planning", message: data.message };
        }
        if (data.action_type === "vector_search") {
          return { step: "searching", message: data.message };
        }
        if (
          data.action_type === "search_web_pages" ||
          data.action_type === "web_search"
        ) {
          return { step: "external_search", message: data.message };
        }
        if (data.action_type === "final_response") {
          return { step: "synthesizing", message: data.message };
        }
        return { step: "planning", message: data.message };
      case "domain_detected":
        return {
          step: "domain_detected",
          message: data.domain_label || data.domain,
        };
      default:
        return null;
    }
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    setResponse(null);
    setTimelineEvents([]);
    setActiveDomain(null);
    setDomainConfidence(null);

    try {
      const response = await fetch(`${BACKEND_URL}/agent/v1/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: query, history: [] }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finalData = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();

        let currentEventType = null;

        for (const line of lines) {
          if (line.startsWith("event: ")) {
            currentEventType = line.slice(7).trim();
          } else if (line.startsWith("data: ") && currentEventType) {
            try {
              const data = JSON.parse(line.slice(6));

              // Mapear evento a formato Timeline
              const timelineEvent = mapBackendEventToTimeline(
                currentEventType,
                data,
              );

              if (timelineEvent) {
                setTimelineEvents((prev) => [...prev, timelineEvent]);
              }

              // Actualizar dominio cuando se detecta
              if (currentEventType === "domain_detected") {
                setActiveDomain(data.domain);
                setDomainConfidence(data.confidence);
              }

              // Guardar datos finales cuando llegue el evento done
              if (currentEventType === "done") {
                finalData = data;
              }
            } catch (e) {
              console.error("Error parsing event data:", e);
            }
          }
        }
      }

      // Configurar respuesta final
      if (finalData) {
        setResponse({
          question: finalData.question,
          answer: finalData.answer,
          detected_domain: finalData.detected_domain,
          domain_confidence: finalData.domain_confidence,
          sources: finalData.sources || [],
          action_links: finalData.action_links || [],
        });
      }
    } catch (error) {
      console.error("Error en la consulta:", error);
      setResponse({
        answer: `Error al conectar con el servidor: ${error.message}`,
        detected_domain: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shrink-0">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#C8102E] flex items-center justify-center">
                <span className="text-white font-bold text-sm">UV</span>
              </div>
              <div>
                <h1 className="font-semibold text-base">Sistema de Consulta</h1>
                <p className="text-xs text-muted-foreground">
                  Universidad del Valle
                </p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground hidden sm:block">
              Tesis Juan & Julián
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Buscador Central */}
      <section className="container mx-auto px-4 py-6 lg:py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            ¿En qué podemos ayudarte?
          </h2>
          <p className="text-muted-foreground text-sm lg:text-base">
            Consulta información sobre trámites, servicios y recursos de la
            Universidad del Valle
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Barra de Estado de Dominios */}
        <DomainTags activeDomain={activeDomain} confidence={domainConfidence} />
      </section>

      {/* Results Section - Altura máxima para mantener todo en pantalla */}
      {(isLoading || response || timelineEvents.length > 0) && (
        <section className="container mx-auto px-4 pb-4 flex-1 min-h-0">
          {/* Contenedor con altura máxima */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[50vh] lg:h-[55vh] min-h-[300px]">
            {/* Timeline - Columna izquierda con scroll */}
            <div className="lg:col-span-1 overflow-hidden bg-muted/20 rounded-lg p-3">
              <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                Proceso de búsqueda
              </h3>
              <div className="h-[calc(100%-28px)] overflow-y-auto pr-1">
                <Timeline
                  events={timelineEvents}
                  isLoading={isLoading && timelineEvents.length === 0}
                />
              </div>
            </div>

            {/* Response Card - Columna derecha */}
            <div className="lg:col-span-2 overflow-hidden">
              <div className="h-full overflow-y-auto">
                <ResponseCard
                  response={response}
                  isLoading={isLoading && !response}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-2 shrink-0">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>
            Sistema de pregunta y respuesta agéntico - Universidad del Valle
          </p>
          <p className="text-[10px]">Tesis de grado</p>
        </div>
      </footer>
    </main>
  );
}

"use client";

import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { DomainTags } from "@/components/DomainTags";
import { Timeline } from "@/components/Timeline";
import { ResponseCard } from "@/components/ResponseCard";
import { getMockResponse, simulateDelay } from "@/lib/mocks";

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

  const handleSearch = async (query) => {
    setIsLoading(true);
    setResponse(null);
    setTimelineEvents([]);
    setActiveDomain(null);
    setDomainConfidence(null);

    // Simular obtención de respuesta con delay
    const mockResponse = getMockResponse(query);

    // Simular streaming de eventos de timeline
    for (const event of mockResponse.timeline_events) {
      await simulateDelay(400);
      setTimelineEvents((prev) => [...prev, event]);

      // Actualizar dominio activo cuando se detecta
      if (event.step === "domain_detected") {
        setActiveDomain(mockResponse.detected_domain);
        setDomainConfidence(mockResponse.domain_confidence);
      }
    }

    // Simular delay final antes de mostrar respuesta
    await simulateDelay(500);
    setResponse(mockResponse);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C8102E] flex items-center justify-center">
                <span className="text-white font-bold text-lg">UV</span>
              </div>
              <div>
                <h1 className="font-semibold text-lg">Sistema de Consulta</h1>
                <p className="text-xs text-muted-foreground">
                  Universidad del Valle
                </p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Tesis Juan & Julián
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Buscador Central */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">¿En qué podemos ayudarte?</h2>
          <p className="text-muted-foreground">
            Consulta información sobre trámites, servicios y recursos de la
            Universidad del Valle
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Barra de Estado de Dominios */}
        <DomainTags activeDomain={activeDomain} confidence={domainConfidence} />
      </section>

      {/* Results Section */}
      {(isLoading || response || timelineEvents.length > 0) && (
        <section className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timeline - Columna izquierda */}
            <div className="lg:col-span-1">
              <Timeline
                events={timelineEvents}
                isLoading={isLoading && timelineEvents.length === 0}
              />
            </div>

            {/* Response Card - Columna derecha */}
            <div className="lg:col-span-2">
              <ResponseCard
                response={response}
                isLoading={isLoading && !response}
              />
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Sistema de pregunta y respuesta agéntico para la Universidad del
            Valle sede Meléndez
          </p>
          <p className="mt-1 text-xs">Prueba de concepto - Tesis de grado</p>
        </div>
      </footer>
    </main>
  );
}

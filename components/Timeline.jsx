"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Database,
  Globe,
  Sparkles,
  CheckCircle2,
  Circle,
} from "lucide-react";

/**
 * Timeline - Timeline de Razonamiento
 *
 * Muestra el flujo de los agentes de forma visual.
 * Según filosofia-interfiz.md:
 * 1. Identificando área: "Bienestar Estudiantil" detectado.
 * 2. Consultando fuentes: "Revisando Resolución 091 de 2004 (Subsidios)".
 * 3. Búsqueda externa: "Consultando portal de Vicebienestar vía Serper".
 */

const STEP_ICONS = {
  planning: Search,
  domain_detected: CheckCircle2,
  searching: Database,
  external_search: Globe,
  synthesizing: Sparkles,
};

const STEP_LABELS = {
  planning: "Analizando consulta",
  domain_detected: "Dominio detectado",
  searching: "Consultando fuentes",
  external_search: "Búsqueda externa",
  synthesizing: "Generando respuesta",
};

const STEP_COLORS = {
  planning: "text-blue-500",
  domain_detected: "text-green-500",
  searching: "text-amber-500",
  external_search: "text-purple-500",
  synthesizing: "text-pink-500",
};

function TimelineItem({ event, isLast }) {
  const Icon = STEP_ICONS[event.step] || Circle;
  const colorClass = STEP_COLORS[event.step] || "text-gray-400";
  const label = STEP_LABELS[event.step] || event.step;

  return (
    <div className="flex items-start gap-3 pb-4">
      <div className="flex flex-col items-center">
        <div className={`rounded-full p-1 ${colorClass}`}>
          <Icon className="h-4 w-4" />
        </div>
        {!isLast && <div className="w-px h-full bg-border min-h-4" />}
      </div>
      <div className="flex-1 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{label}</span>
          {event.step === "domain_detected" && (
            <Badge variant="secondary" className="text-xs">
              {event.message}
            </Badge>
          )}
        </div>
        {event.step !== "domain_detected" && (
          <p className="text-sm text-muted-foreground mt-0.5">
            {event.message}
          </p>
        )}
      </div>
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Timeline({ events = [], isLoading = false }) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-4">
        <h3 className="font-semibold mb-4 text-sm">Proceso de búsqueda</h3>
        <TimelineSkeleton />
      </div>
    );
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="font-semibold mb-4 text-sm">Proceso de búsqueda</h3>
      <div className="relative">
        {events.map((event, index) => (
          <TimelineItem
            key={index}
            event={event}
            isLast={index === events.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * TimelineAccordion - Versión en acordeón del timeline
 * Para usar cuando se quiere colapsar el timeline
 */
export function TimelineAccordion({ events = [], isLoading = false }) {
  if (isLoading) {
    return (
      <Accordion type="single" collapsible defaultValue="timeline">
        <AccordionItem value="timeline">
          <AccordionTrigger className="text-sm">
            Proceso de búsqueda
          </AccordionTrigger>
          <AccordionContent>
            <TimelineSkeleton />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <Accordion type="single" collapsible defaultValue="timeline">
      <AccordionItem value="timeline">
        <AccordionTrigger className="text-sm">
          Proceso de búsqueda ({events.length} pasos)
        </AccordionTrigger>
        <AccordionContent>
          <div className="relative">
            {events.map((event, index) => (
              <TimelineItem
                key={index}
                event={event}
                isLast={index === events.length - 1}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

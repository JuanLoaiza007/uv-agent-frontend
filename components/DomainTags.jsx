"use client";

import { Badge } from "@/components/ui/badge";
import { DOMAINS } from "@/lib/mocks";

/**
 * DomainTags - Barra de Estado de Dominios
 *
 * Cinco etiquetas (tags) con los nombres de los dominios.
 * Según filosofia-interfaz.md:
 * - Por defecto: etiquetas en gris tenue
 * - Cuando el Planner detecta el área: el dominio se ilumina en Rojo Univalle
 */
export function DomainTags({ activeDomain = null, confidence = null }) {
  const domainList = Object.values(DOMAINS);

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      {domainList.map((domain) => {
        const isActive = activeDomain === domain.id;

        return (
          <Badge
            key={domain.id}
            variant={isActive ? "default" : "outline"}
            className={`
              px-4 py-2 text-sm transition-all duration-300 cursor-default
              ${
                isActive
                  ? "bg-[#C8102E] hover:bg-[#A00D24] text-white shadow-md scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }
            `}
            title={domain.description}
          >
            {domain.label}
            {isActive && confidence && (
              <span className="ml-2 text-xs opacity-80">
                ({Math.round(confidence * 100)}%)
              </span>
            )}
          </Badge>
        );
      })}
    </div>
  );
}

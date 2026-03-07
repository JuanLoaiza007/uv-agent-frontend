"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

/**
 * SearchBar - Componente de buscador central (héroe)
 *
 * Barra de búsqueda prominente con texto de ayuda que menciona los dominios.
 * Según filosofia-interfaz.md: "Una barra de búsqueda prominente en el centro
 * con un texto de ayuda que mencione los dominios"
 */
export function SearchBar({ onSearch, isLoading = false }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full lg:max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground sm:left-4 sm:h-5 sm:w-5" />
          <Input
            type="text"
            placeholder="Pregunta sobre matrícula, becas, servicios..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="pl-10 pr-20 h-11 text-base rounded-lg border-2 border-border focus:border-primary shadow-md"
          />
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Buscar"
            )}
          </Button>
        </div>
      </form>
      <p className="text-center text-xs text-muted-foreground mt-2 hidden sm:block">
        Sistema de consulta agéntico - Universidad del Valle
      </p>
    </div>
  );
}

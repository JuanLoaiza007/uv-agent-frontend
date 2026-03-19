"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Code,
  Database,
  Brain,
  Search,
  Terminal,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Moon,
  Sun,
  Laptop,
  MessageSquare,
} from "lucide-react";
import { useTheme } from "next-themes";

const NODE_TEMPLATES = {
  domain_detector: {
    question: "Como sacar un certificado de estudio?",
    history: [],
  },
  planner: {
    question: "Como sacar un certificado de estudio?",
    user_intent: "administrativo_financiero",
    strategy_lane: "standard",
    vector_search_sufficient: false,
    vector_search_query: "certificado estudio univalle",
  },
  executor: {
    plan: [
      "Buscar información actualizada en la web sobre requisitos de certificados de estudio",
    ],
    user_intent: "obtener certificado",
    strategy_lane: "standard",
    available_pages: [
      {
        url: "https://registro.univalle.edu.co/",
        title: "Registro Académico Univalle",
      },
      {
        url: "https://registro.univalle.edu.co/certificados",
        title: "Certificados - Registro Académico Univalle",
      },
    ],
    available_pdfs: [
      {
        url: "https://registro.univalle.edu.co/certificados/instructivo_estampillas.pdf",
        title: "Certificados - Registro Académico Univalle",
      },
      {
        url: "https://registro.univalle.edu.co/certificados/resolucion_2642.pdf",
        title: "Certificados - Registro Académico Univalle",
      },
    ],
  },
  replanner: {
    question: "Como sacar un certificado de estudio?",
    context: [
      {
        type: "web_page",
        content:
          "El certificado tiene un costo de $17.550 para pregrado. Debes solicitarlo en el portal de registro.",
        source_title: "Registro Académico Univalle",
      },
    ],
    plan: ["Identificar portal de pagos"],
    available_pages: [
      {
        url: "https://registro.univalle.edu.co/pagos",
        title: "Pagos y Certificados",
      },
    ],
    available_pdfs: [
      {
        url: "https://registro.univalle.edu.co/certificados/instructivo_estampillas.pdf",
        title: "Certificados - Registro Académico Univalle",
      },
      {
        url: "https://registro.univalle.edu.co/certificados/resolucion_2642.pdf",
        title: "Certificados - Registro Académico Univalle",
      },
    ],
    used_sources: [],
  },
  vector_search: {
    question: "requisitos de matricula",
    history: [],
  },
};

const NODE_LABELS = {
  domain_detector: "Domain Detector (Clasificación)",
  planner: "Planner (Planificación)",
  executor: "Executor (Llamada a Herramientas)",
  replanner: "Replanner (Evaluación y Ajuste)",
  vector_search: "Vector Search (Búsqueda Documental)",
};

export default function TestNodesPage() {
  const [selectedNode, setSelectedNode] = useState("planner");
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(NODE_TEMPLATES.planner, null, 2),
  );
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [promptLoading, setPromptLoading] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  // Fetch node prompt when selectedNode changes
  useEffect(() => {
    const fetchPrompt = async () => {
      setPromptLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/agent/v1/node-prompt/${selectedNode}`,
        );
        const data = await response.json();
        setPrompt(data.prompt || "No disponible");
      } catch (err) {
        setPrompt("Error al cargar el prompt");
      } finally {
        setPromptLoading(false);
      }
    };

    fetchPrompt();
  }, [selectedNode]);

  useEffect(() => {
    setJsonInput(JSON.stringify(NODE_TEMPLATES[selectedNode], null, 2));
    setResult(null);
    setError(null);
  }, [selectedNode]);

  const handleRunTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let state;
      try {
        state = JSON.parse(jsonInput);
      } catch (e) {
        throw new Error("JSON de entrada inválido: " + e.message);
      }

      const response = await fetch(
        `http://localhost:8000/agent/v1/test-node/${selectedNode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Error en el servidor");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-background text-foreground py-8 md:py-12 lg:py-16 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Terminal size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Node Isolation Tester
              </h1>
              <p className="text-muted-foreground text-sm">
                Prueba el comportamiento de los prompts en total aislamiento.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <select
              className="bg-secondary/50 border border-border text-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none transition-colors"
              value={selectedNode}
              onChange={(e) => setSelectedNode(e.target.value)}
            >
              {Object.entries(NODE_LABELS).map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>

            <button
              onClick={handleRunTest}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground text-sm font-semibold rounded-lg transition-all shadow-lg shadow-primary/20"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
              ) : (
                <Play size={16} />
              )}
              Ejecutar Test
            </button>
          </div>
        </div>

        {/* System Prompt Section */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest pl-1">
            <MessageSquare size={14} /> System Prompt Actual
          </div>
          <div className="relative group overflow-hidden rounded-xl border border-border bg-muted/30 ">
            {promptLoading ? (
              <div className="p-6 h-48 flex items-center justify-center">
                <div className="animate-spin h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full" />
              </div>
            ) : (
              <pre className="p-6 text-xs font-mono text-muted-foreground whitespace-pre-wrap max-h-64 overflow-y-auto custom-scrollbar">
                {prompt}
              </pre>
            )}
            <div className="absolute top-0 right-0 p-3">
              <div className="px-2 py-1 bg-secondary text-[10px] font-bold rounded border border-border text-muted-foreground">
                READ-ONLY
              </div>
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest pl-1">
              <Code size={14} /> Entrada (Simulated State)
            </div>
            <div className="relative group flex-1">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-border to-primary/10 rounded-xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <textarea
                className="relative w-11/12 h-[600px] bg-muted/30 border border-border/50 rounded-xl p-6 text-sm font-mono text-foreground outline-none focus:border-primary/50 transition-colors resize-none overflow-y-auto custom-scrollbar"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                spellCheck={false}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pl-1">
              <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest">
                <Database size={14} /> Salida (Node Update)
              </div>
              {result && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 size={12} /> Completado con éxito
                </div>
              )}
            </div>

            <div className="relative flex-1">
              <div className="absolute inset-0 bg-slate-900/40 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-slate-600">
                {!result && !error && !loading && (
                  <div className="text-center">
                    <Brain size={48} className="mx-auto mb-4 opacity-10" />
                    <p className="text-sm text-muted-foreground">
                      Configura el estado y presiona "Ejecutar Test"
                    </p>
                  </div>
                )}
                {loading && (
                  <div className="text-center">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-4 w-32 bg-indigo-500/20 rounded-full mb-3"></div>
                      <div className="h-3 w-48 bg-slate-800 rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>

              {(result || error) && (
                <div
                  className={`relative w-full h-[600px] rounded-xl border overflow-y-auto custom-scrollbar p-6 text-sm font-mono ${error ? "bg-destructive/5 border-destructive/20 text-destructive" : "bg-muted/30 border-border text-foreground"}`}
                >
                  {error ? (
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className="text-red-500 shrink-0"
                        size={20}
                      />
                      <div>
                        <h3 className="font-bold text-red-400 mb-1">
                          Error de Ejecución
                        </h3>
                        <p className="whitespace-pre-wrap">{error}</p>
                      </div>
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Help / Footer */}
        <div className="mt-8 p-6 rounded-xl bg-muted/20 border border-border">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle size={14} className="text-primary" />
            Notas Técnicas
          </h3>
          <ul className="text-sm text-muted-foreground space-y-3">
            <li className="flex gap-2">
              <ChevronRight size={14} className="shrink-0 mt-0.5" />
              Esta herramienta instancia un `AgentSystem` real en el backend y
              llama directamente al método solicitado.
            </li>
            <li className="flex gap-2">
              <ChevronRight size={14} className="shrink-0 mt-0.5" />
              Los cambios en los archivos de prompts (`.py`) se reflejarán
              inmediatamente sin necesidad de reiniciar el servidor.
            </li>
            <li className="flex gap-2">
              <ChevronRight size={14} className="shrink-0 mt-0.5" />
              El estado de entrada debe ser un JSON válido. Si faltan campos
              opcionales del `AgentState`, el nodo usará valores por defecto o
              fallará según la lógica interna.
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

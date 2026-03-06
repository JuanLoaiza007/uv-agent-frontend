"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

/**
 * Header component - Fixed at the top with transparent background and blur
 */
export function Header() {
  const [systemStatus, setSystemStatus] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/health`);
        const data = await res.json();
        setSystemStatus(data);
      } catch (e) {
        setSystemStatus({ status: "error", agent: "unknown" });
      }
    };
    fetchHealth();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C8102E] flex items-center justify-center">
              <span className="text-white font-bold text-sm">UV</span>
            </div>
            <div>
              <h1 className="font-semibold text-base">Sistema de Consulta</h1>
              <p className="text-xs text-muted-foreground">
                Tesis Juan & Julián
              </p>
            </div>
          </div>
          <div className="text-xs text-center text-muted-foreground hidden sm:block">
            {systemStatus ? (
              <Badge
                className={`text-xs ${
                  systemStatus.status === "ok"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {systemStatus.status === "ok" ? "Online" : "Offline"}
              </Badge>
            ) : (
              <Skeleton className="h-5 w-14 rounded-full" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

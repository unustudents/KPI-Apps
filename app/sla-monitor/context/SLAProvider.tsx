"use client";

import { createContext, useContext, useMemo } from "react";
import { useIncidents } from "../hooks/useIncidents";
import { useConfig } from "../hooks/useConfig";
import { useToast } from "../hooks/useToast";
import { calcMetrics } from "../utils/calculations";
import type { Incident, Config, Metrics } from "../types";

interface ToastAPI {
  visible: boolean;
  message: string;
  type: "success" | "error";
  show: (msg: string, t?: "success" | "error") => void;
}

interface SLAContextType {
  incidents: Incident[];
  activeIncidentId: string | null;
  addIncident: (i: Incident) => void;
  endActiveIncident: (end: string, rc: string) => number;
  getActiveIncident: () => Incident | null;
  startActiveIncident: (id: string) => void;
  config: Config;
  saveConfig: (c: Config) => void;
  metrics: Metrics;
  toast: ToastAPI;
}

const SLAContext = createContext<SLAContextType | null>(null);

export function useSLA() {
  const ctx = useContext(SLAContext);
  if (!ctx) throw new Error("useSLA must be used within SLAProvider");
  return ctx;
}

export function SLAProvider({ children }: { children: React.ReactNode }) {
  const inc = useIncidents();
  const cfg = useConfig();
  const toast = useToast();
  const metrics = useMemo(() => calcMetrics(inc.incidents, cfg.config), [inc.incidents, cfg.config]);

  if (!inc.isLoaded || !cfg.isLoaded) return null;

  return (
    <SLAContext.Provider value={{
      incidents: inc.incidents, activeIncidentId: inc.activeIncidentId,
      addIncident: inc.addIncident, endActiveIncident: inc.endActiveIncident,
      getActiveIncident: inc.getActiveIncident, startActiveIncident: inc.startActiveIncident,
      config: cfg.config, saveConfig: cfg.saveConfig, metrics, toast,
    }}>
      {children}
    </SLAContext.Provider>
  );
}

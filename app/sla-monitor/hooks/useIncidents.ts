"use client";

import { useState, useEffect, useCallback } from "react";
import type { Incident } from "../types";
import { createSeedData } from "../utils/seed-data";

const STORAGE_KEY = "sla_incidents";
const ACTIVE_KEY = "sla_active";

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let data: Incident[] = stored ? JSON.parse(stored) : [];
    if (data.length === 0) {
      data = createSeedData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    setIncidents(data);
    setActiveIncidentId(localStorage.getItem(ACTIVE_KEY) || null);
    setIsLoaded(true);
  }, []);

  // Persist incidents
  const saveIncidents = useCallback((newIncidents: Incident[]) => {
    setIncidents(newIncidents);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newIncidents));
  }, []);

  // Add incident
  const addIncident = useCallback(
    (incident: Incident) => {
      const updated = [incident, ...incidents];
      saveIncidents(updated);
    },
    [incidents, saveIncidents]
  );

  // Start active incident
  const startActiveIncident = useCallback(
    (id: string) => {
      setActiveIncidentId(id);
      localStorage.setItem(ACTIVE_KEY, id);
    },
    []
  );

  // End active incident
  const endActiveIncident = useCallback(
    (endTime: string, rootCause: string) => {
      const idx = incidents.findIndex((i) => i.id === activeIncidentId);
      if (idx === -1) return 0;
      const updated = [...incidents];
      const eDate = new Date(endTime);
      const sDate = new Date(updated[idx].start);
      const duration = Math.round((eDate.getTime() - sDate.getTime()) / 60000);
      updated[idx] = {
        ...updated[idx],
        end: eDate.toISOString(),
        duration,
        rootCause,
        status: "closed",
      };
      saveIncidents(updated);
      setActiveIncidentId(null);
      localStorage.removeItem(ACTIVE_KEY);
      return duration;
    },
    [incidents, activeIncidentId, saveIncidents]
  );

  const getActiveIncident = useCallback(() => {
    return incidents.find((i) => i.id === activeIncidentId) || null;
  }, [incidents, activeIncidentId]);

  return {
    incidents,
    activeIncidentId,
    isLoaded,
    addIncident,
    startActiveIncident,
    endActiveIncident,
    getActiveIncident,
  };
}

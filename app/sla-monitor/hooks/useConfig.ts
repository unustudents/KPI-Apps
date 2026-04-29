"use client";

import { useState, useEffect, useCallback } from "react";
import type { Config } from "../types";
import { getCurrentMonth } from "../utils/formatters";

const STORAGE_KEY = "sla_config";

const DEFAULT_CONFIG: Config = {
  periode: getCurrentMonth(),
  sistem: "SIMRS (Sistem Informasi Manajemen RS)",
  pic: "Budi Santoso, S.Kom",
  jamOps: 720,
};

export function useConfig() {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setConfig(JSON.parse(stored));
    }
    setIsLoaded(true);
  }, []);

  const saveConfig = useCallback((newConfig: Config) => {
    setConfig(newConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  }, []);

  return { config, saveConfig, isLoaded };
}

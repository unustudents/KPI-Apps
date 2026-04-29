"use client";

import { createContext, useContext } from "react";

interface MonitorActionsType {
  openNewModal: () => void;
  openEndModal: () => void;
}

export const MonitorActionsContext = createContext<MonitorActionsType>({
  openNewModal: () => {},
  openEndModal: () => {},
});

export function useMonitorActions() {
  return useContext(MonitorActionsContext);
}

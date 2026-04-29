import type { Incident } from "../types";
import { uid } from "./formatters";

export function createSeedData(): Incident[] {
  const now = new Date();
  const m = now.getMonth();
  const y = now.getFullYear();
  return [
    {
      id: uid(),
      start: new Date(y, m, 3, 9, 15).toISOString(),
      end: new Date(y, m, 3, 11, 45).toISOString(),
      duration: 150,
      type: "Unplanned",
      rootCause: "Server crash akibat overload / high CPU",
      units: ["IGD", "Rawat Inap", "Farmasi"],
      notes: "Eskalasi ke vendor Telkom. Server direstart.",
      status: "closed",
    },
    {
      id: uid(),
      start: new Date(y, m, 8, 14, 30).toISOString(),
      end: new Date(y, m, 8, 15, 10).toISOString(),
      duration: 40,
      type: "Unplanned",
      rootCause: "Kabel LAN / fiber putus atau longgar",
      units: ["Laboratorium", "Radiologi"],
      notes: "Kabel patch panel lantai 2 diganti.",
      status: "closed",
    },
    {
      id: uid(),
      start: new Date(y, m, 15, 8, 0).toISOString(),
      end: new Date(y, m, 15, 10, 0).toISOString(),
      duration: 120,
      type: "Planned",
      rootCause: "Update/patch sistem gagal",
      units: ["Seluruh RS"],
      notes: "Maintenance terjadwal update SIMRS v4.2.1.",
      status: "closed",
    },
    {
      id: uid(),
      start: new Date(y, m, 20, 22, 45).toISOString(),
      end: new Date(y, m, 21, 0, 5).toISOString(),
      duration: 80,
      type: "Unplanned",
      rootCause: "UPS / listrik mati mendadak",
      units: ["IGD", "ICU / ICCU"],
      notes: "Genset tidak otomatis. Manual start oleh teknisi.",
      status: "closed",
    },
  ];
}

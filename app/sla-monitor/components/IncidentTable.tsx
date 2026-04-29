"use client";

import type { Incident } from "../types";
import { formatDate } from "../utils/formatters";

interface IncidentTableProps {
  incidents: Incident[];
  title: string;
  action?: React.ReactNode;
}

export default function IncidentTable({ incidents, title, action }: IncidentTableProps) {
  return (
    <div className="bg-card border border-bd rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-bd flex items-center gap-3">
        <h3 className="text-[14px] font-semibold flex-1">{title}</h3>
        {action}
      </div>
      {incidents.length === 0 ? (
        <div className="py-12 px-6 text-center text-muted">
          <svg className="w-10 h-10 opacity-30 mx-auto mb-3 block" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
            <path d="M20 12V20L25 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="text-[13px]">Belum ada insiden tercatat</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["Mulai", "Pulih", "Durasi", "Jenis", "Root Cause", "Unit Terdampak", "Status"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[11px] font-medium tracking-[0.05em] uppercase text-muted border-b border-bd bg-surface">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incidents.map((i) => (
                <tr key={i.id} className="border-b border-bd last:border-b-0 transition-colors duration-100 hover:bg-hovr">
                  <td className="px-4 py-3 text-primary font-mono text-[12px]">
                    {formatDate(i.start)}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-secondary align-middle">
                    <span className="font-mono text-[12px]">{formatDate(i.end)}</span>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-secondary align-middle">
                    {i.duration ? (
                      <span className="font-mono text-[12px]">{i.duration} mnt</span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-secondary align-middle">
                    {i.type === "Unplanned" ? (
                      <span className="inline-flex items-center gap-[5px] px-[9px] py-[3px] rounded-sm text-[11px] font-medium font-mono bg-red-dim text-red border border-[rgba(240,79,88,0.25)]">⚠ Unplanned</span>
                    ) : (
                      <span className="inline-flex items-center gap-[5px] px-[9px] py-[3px] rounded-sm text-[11px] font-medium font-mono bg-blue-dim text-blue border border-[rgba(79,142,245,0.25)]">📋 Planned</span>
                    )}
                  </td>
                  <td className="px-4 py-3 max-w-[180px] text-[12px] text-secondary align-middle">{i.rootCause || "—"}</td>
                  <td className="px-4 py-3 text-[13px] text-secondary align-middle">
                    <div className="flex flex-wrap gap-1">
                      {(i.units || []).map((u) => (
                        <span key={u} className="bg-raised border border-bd rounded px-[7px] py-[2px] text-[11px] text-muted">{u}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-secondary align-middle">
                    {i.status === "active" ? (
                      <span className="inline-flex items-center gap-[5px] px-[9px] py-[3px] rounded-sm text-[11px] font-medium font-mono bg-red-dim text-red border border-[rgba(240,79,88,0.25)]">● AKTIF</span>
                    ) : (
                      <span className="inline-flex items-center gap-[5px] px-[9px] py-[3px] rounded-sm text-[11px] font-medium font-mono bg-green-dim text-green border border-[rgba(52,211,153,0.25)]">✓ Selesai</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

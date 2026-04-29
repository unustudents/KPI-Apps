"use client";

import type { Metrics } from "@/app/sla-monitor/types";

interface DashboardDetailTableProps {
  metrics: Metrics;
}

export default function DashboardDetailTable({
  metrics,
}: DashboardDetailTableProps) {
  const { jamOps, minsOps, totalDowntime, count, availability } = metrics;
  const pct = availability.toFixed(2);
  const achieved = availability >= 99;

  const rows = [
    [
      "Jam Operasional Bulanan",
      `${jamOps} jam`,
      `${jamOps} × 60 = ${minsOps.toLocaleString()} menit`,
    ],
    [
      "Total Menit Operasional",
      `${minsOps.toLocaleString()} menit`,
      "Basis perhitungan availability",
    ],
    [
      "Total Downtime Unplanned",
      `${totalDowntime} menit`,
      `Sum durasi ${count} insiden bertipe Unplanned`,
    ],
    [
      "Sisa Uptime",
      `${(minsOps - totalDowntime).toLocaleString()} menit`,
      `${minsOps} − ${totalDowntime}`,
    ],
    [
      "Availability (%)",
      `${pct}%`,
      `(${minsOps} − ${totalDowntime}) ÷ ${minsOps} × 100`,
    ],
    ["Target SLA", "≥ 99.00%", "Standar akreditasi MRMIK"],
    [
      "Status",
      achieved ? "✓ TERCAPAI" : "✗ TIDAK TERCAPAI",
      achieved
        ? `Selisih +${(availability - 99).toFixed(3)}%`
        : `Defisit −${(99 - availability).toFixed(3)}%`,
    ],
  ];

  return (
    <div className="bg-card border-bd overflow-hidden rounded-lg border">
      <div className="border-bd border-b px-5 py-4">
        <h3 className="text-[14px] font-semibold">
          Detail Kalkulasi Availability
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["Parameter", "Nilai", "Keterangan"].map((h) => (
                <th
                  key={h}
                  className="text-muted border-bd bg-surface border-b px-4 py-2.5 text-left text-[11px] font-medium tracking-[0.05em] uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([k, v, n]) => (
              <tr
                key={k}
                className="border-bd hover:bg-hovr border-b transition-colors duration-100 last:border-b-0"
              >
                <td className="text-primary px-4 py-3 text-[13px] font-medium whitespace-nowrap">
                  {k}
                </td>
                <td className="text-cyan px-4 py-3 font-mono text-[12px]">
                  {v}
                </td>
                <td className="text-muted px-4 py-3 text-[12px]">{n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

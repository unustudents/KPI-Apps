"use client";

import type { Metrics } from "@/app/sla-monitor/types";

interface DashboardCardsProps {
  metrics: Metrics;
  periode: string;
}

export default function DashboardCards({
  metrics,
  periode,
}: DashboardCardsProps) {
  const { totalDowntime, count, mttr, mtbf } = metrics;

  const cards = [
    {
      label: "Total Downtime Unplanned",
      value: totalDowntime,
      color: "text-red",
      unit: "menit",
      formula: `= penjumlahan durasi ${count} insiden unplanned`,
    },
    {
      label: "Jumlah Insiden Unplanned",
      value: count,
      color: "text-amber",
      unit: "kejadian",
      formula: `= insiden unplanned bulan ${periode}`,
    },
    {
      label: "MTTR",
      value: mttr.toFixed(1),
      color: "text-amber",
      unit: "menit / insiden",
      formula: "= Total Downtime ÷ Jumlah Insiden",
    },
    {
      label: "MTBF",
      value: mtbf.toFixed(1),
      color: "text-blue",
      unit: "jam antar insiden",
      formula: "= (Jam Operasional − Jam Downtime) ÷ Insiden",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-card border-bd rounded-lg border p-5">
          <div className="text-muted text-[11px] font-medium tracking-[0.06em] uppercase">
            {c.label}
          </div>
          <div
            className={`my-2.5 font-mono text-[36px] leading-none font-normal ${c.color}`}
          >
            {c.value}
          </div>
          <div className="text-muted text-[12px]">{c.unit}</div>
          <div className="text-muted border-bd mt-2 border-t pt-2 font-mono text-[11px] leading-[1.6]">
            {c.formula}
          </div>
        </div>
      ))}
    </div>
  );
}

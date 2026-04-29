"use client";

import type { Metrics } from "@/app/sla-monitor/types";

interface DashboardGaugeProps {
  metrics: Metrics;
}

export default function DashboardGauge({ metrics }: DashboardGaugeProps) {
  const { availability, minsOps, jamOps, totalDowntime, count } = metrics;
  const pct = availability.toFixed(2);
  const achieved = availability >= 99;
  const circ = 326.7;
  const offset = circ - (circ * Math.min(availability, 100)) / 100;

  return (
    <div className="bg-card border-bd mb-6 flex flex-col items-center gap-5 rounded-lg border px-6 py-5 text-center md:flex-row md:text-left">
      <svg className="shrink-0" width="130" height="130" viewBox="0 0 130 130">
        <circle
          cx="65"
          cy="65"
          r="52"
          fill="none"
          stroke="#1c2539"
          strokeWidth="10"
        />
        <circle
          cx="65"
          cy="65"
          r="52"
          fill="none"
          stroke={achieved ? "#00d4c8" : "#f04f58"}
          strokeWidth="10"
          strokeDasharray="326.7"
          strokeDashoffset={offset.toFixed(1)}
          strokeLinecap="round"
          transform="rotate(-90 65 65)"
        />
        <text
          x="65"
          y="58"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="16"
          fill={achieved ? "#e8edf7" : "#f04f58"}
        >
          {pct}%
        </text>
        <text
          x="65"
          y="74"
          textAnchor="middle"
          fontFamily="var(--font-ui)"
          fontSize="9"
          fill="#4d6080"
        >
          AVAILABILITY
        </text>
      </svg>
      <div className="flex-1">
        <div
          className={`font-mono text-[40px] leading-none font-normal ${achieved ? "text-cyan" : "text-red"}`}
        >
          {pct}%
        </div>
        <div className="text-muted mt-1 text-[12px]">
          Target SLA: <span className="text-amber">≥ 99.00%</span> ·{" "}
          <span
            style={{
              color: achieved ? "var(--color-cyan)" : "var(--color-red)",
            }}
          >
            {achieved ? "✓ TARGET TERCAPAI" : "✗ DI BAWAH TARGET"}
          </span>
        </div>
        <div className="text-secondary mt-2.5 text-[13px] leading-[1.6]">
          Total operasional {minsOps.toLocaleString()} menit ({jamOps} jam).
          Downtime unplanned {totalDowntime} menit dari {count} insiden. Sisa
          uptime {(minsOps - totalDowntime).toLocaleString()} menit.
        </div>
      </div>
    </div>
  );
}

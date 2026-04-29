"use client";

import { useSLA } from "./sla-monitor/context/SLAProvider";
import DashboardGauge from "./(menu)/dashboard/components/DashboardGauge";
import DashboardCards from "./(menu)/dashboard/components/DashboardCards";
import DashboardDetailTable from "./(menu)/dashboard/components/DashboardDetailTable";

export default function DashboardPage() {
  const { metrics, config } = useSLA();
  const periode = config.periode;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="mb-1 text-[20px] font-semibold">
          Dashboard Operasional
        </h1>
        <p className="text-secondary text-[13px]">
          Ringkasan performa sistem · Diperbarui real-time
        </p>
      </div>

      <DashboardGauge metrics={metrics} />
      <DashboardCards metrics={metrics} periode={periode} />
      <DashboardDetailTable metrics={metrics} />
    </div>
  );
}

"use client";

import { useSLA } from "@/app/sla-monitor/context/SLAProvider";
import { useMonitorActions } from "@/app/sla-monitor/context/MonitorActions";
import IncidentTable from "@/app/sla-monitor/components/IncidentTable";

export default function IncidentList() {
  const { incidents } = useSLA();
  const { openNewModal } = useMonitorActions();

  return (
    <IncidentTable
      incidents={incidents}
      title="Semua Insiden"
      action={
        <button
          className="inline-flex items-center gap-1.5 bg-cyan text-[#0a0e1a] border-none rounded-md px-3.5 py-2 text-[12px] font-semibold font-ui cursor-pointer transition-[opacity,transform] duration-150 hover:opacity-88 active:scale-[0.97]"
          onClick={openNewModal}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Catat Insiden Baru
        </button>
      }
    />
  );
}

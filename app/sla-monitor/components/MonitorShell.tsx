"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Toast from "./Toast";
import FAB from "./FAB";
import NewIncidentModal from "./NewIncidentModal";
import EndIncidentModal from "./EndIncidentModal";
import { useSLA } from "../context/SLAProvider";
import { MonitorActionsContext } from "../context/MonitorActions";
import { MONTH_SHORT } from "../utils/constants";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/incidents": "Log Insiden",
  "/rekap": "Rekap Bulanan",
  "/identitas": "Identitas Laporan",
};

export default function MonitorShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [endModalOpen, setEndModalOpen] = useState(false);

  const {
    incidents,
    activeIncidentId,
    addIncident,
    endActiveIncident,
    getActiveIncident,
    config,
    toast,
  } = useSLA();

  const activeIncident = getActiveIncident();
  const hasActive = !!activeIncidentId;
  const unplannedCount = incidents.filter(
    (i) => i.type === "Unplanned" && i.status === "closed",
  ).length;

  const period = config.periode.split("-");
  const periodLabel = `${MONTH_SHORT[parseInt(period[1]) - 1] || ""} ${period[0]} · ${config.sistem.split(" ")[0]}`;
  const title = PAGE_TITLES[pathname] || "Dashboard";

  const handleFab = () => {
    if (hasActive) setEndModalOpen(true);
    else setNewModalOpen(true);
  };

  const handleEndIncident = (endTime: string, rootCause: string) => {
    const duration = endActiveIncident(endTime, rootCause);
    toast.show(`Insiden diselesaikan · ${duration} menit downtime`, "success");
  };

  return (
    <MonitorActionsContext.Provider
      value={{
        openNewModal: () => setNewModalOpen(true),
        openEndModal: () => setEndModalOpen(true),
      }}
    >
      <div className="flex min-h-screen">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          incidentCount={unplannedCount}
          hasActiveIncident={hasActive}
        />

        <div className="flex flex-1 flex-col md:ml-[220px]">
          <header className="border-bd bg-surface sticky top-0 z-50 flex h-14 items-center gap-4 border-b px-7">
            <button
              className="text-secondary flex cursor-pointer border-none bg-transparent p-1 md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M2 4H16M2 9H16M2 14H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <span className="flex-1 text-[14px] font-semibold">{title}</span>
            <span className="text-secondary bg-card border-bd rounded-sm border px-3 py-[5px] font-mono text-[12px]">
              {periodLabel}
            </span>
            <div className="bg-blue-dim border-blue text-blue flex h-[30px] w-[30px] items-center justify-center rounded-full border text-[11px] font-semibold">
              IT
            </div>
          </header>
          <div className="flex-1 p-4 md:p-7">{children}</div>
        </div>

        <FAB isActive={hasActive} onClick={handleFab} />

        <NewIncidentModal
          open={newModalOpen}
          onClose={() => setNewModalOpen(false)}
          onSave={(incident) => {
            addIncident(incident);
            toast.show("Insiden berhasil dicatat", "success");
          }}
          onError={(msg) => toast.show(msg, "error")}
        />
        <EndIncidentModal
          open={endModalOpen}
          active={activeIncident}
          onClose={() => setEndModalOpen(false)}
          onEnd={handleEndIncident}
          onError={(msg) => toast.show(msg, "error")}
        />
        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
        />
      </div>
    </MonitorActionsContext.Provider>
  );
}

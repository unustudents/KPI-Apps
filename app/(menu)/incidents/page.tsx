"use client";

import IncidentList from "./components/IncidentList";

export default function IncidentsPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold mb-1">Log Insiden Gangguan</h1>
        <p className="text-[13px] text-secondary">
          Setiap insiden unplanned dicatat di sini · Planned downtime tidak masuk perhitungan SLA
        </p>
      </div>
      <IncidentList />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { toLocalInput, fmtDuration, uid } from "../utils/formatters";
import { ROOT_CAUSE_OPTIONS, UNIT_OPTIONS } from "../utils/constants";
import type { Incident } from "../types";

interface NewIncidentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (incident: Incident) => void;
  onError: (msg: string) => void;
}

const inputCls = "bg-raised border border-bd rounded-md px-3.5 py-2.5 text-[13px] text-primary font-ui transition-[border-color] duration-150 w-full focus:outline-none focus:border-cyan focus:shadow-[0_0_0_3px_var(--color-cyan-dim)]";
const labelCls = "text-[11px] font-medium tracking-[0.05em] uppercase text-muted";

export default function NewIncidentModal({ open, onClose, onSave, onError }: NewIncidentModalProps) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [incidentType, setIncidentType] = useState<"Unplanned" | "Planned">("Unplanned");
  const [rootCause, setRootCause] = useState("");
  const [rootCauseOther, setRootCauseOther] = useState("");
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      setStartTime(toLocalInput(new Date()));
      setEndTime("");
      setIncidentType("Unplanned");
      setRootCause("");
      setRootCauseOther("");
      setSelectedUnits([]);
      setNotes("");
    }
  }, [open]);

  const duration = (() => {
    const s = new Date(startTime);
    const e = new Date(endTime);
    if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && e > s) return Math.round((e.getTime() - s.getTime()) / 60000);
    return 0;
  })();

  const toggleUnit = (unit: string) => {
    setSelectedUnits((prev) => prev.includes(unit) ? prev.filter((u) => u !== unit) : [...prev, unit]);
  };

  const handleSave = () => {
    const cause = rootCause === "other" ? rootCauseOther : rootCause;
    if (!startTime || !endTime || !cause || selectedUnits.length === 0) { onError("Lengkapi semua field wajib"); return; }
    const sDate = new Date(startTime), eDate = new Date(endTime);
    if (eDate <= sDate) { onError("Waktu pulih harus setelah waktu mulai"); return; }
    onSave({
      id: uid(), start: sDate.toISOString(), end: eDate.toISOString(),
      duration: Math.round((eDate.getTime() - sDate.getTime()) / 60000),
      type: incidentType, rootCause: cause, units: selectedUnits, notes, status: "closed",
    });
    onClose();
  };

  return (
    <div className={`fixed inset-0 bg-black/75 backdrop-blur-[4px] z-[200] flex items-center justify-center p-5 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className={`bg-card border border-bd-bright rounded-xl w-full max-w-[640px] max-h-[90vh] overflow-y-auto transition-transform duration-200 max-md:max-h-[95vh] ${open ? "translate-y-0" : "translate-y-4"}`}>
        <div className="px-6 pt-[22px] pb-[18px] border-b border-bd flex items-start gap-3">
          <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 bg-cyan-dim">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="var(--color-cyan)" strokeWidth="1.5" />
              <path d="M9 5.5V9.5L11.5 11" stroke="var(--color-cyan)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-[16px] font-semibold mb-[3px]">Catat Insiden Baru</div>
            <div className="text-[12px] text-secondary">Isi detail kejadian · Waktu mulai sudah di-capture otomatis</div>
          </div>
          <button className="ml-auto bg-transparent border-none text-muted cursor-pointer text-[18px] leading-none p-0.5 transition-colors duration-150 hover:text-primary" onClick={onClose}>✕</button>
        </div>
        <div className="p-6 flex flex-col gap-[18px]">
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Waktu Mulai<span className="text-red ml-0.5">*</span></label>
              <input type="datetime-local" className={`${inputCls} font-mono !text-[12px]`} value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Waktu Pulih<span className="text-red ml-0.5">*</span></label>
              <input type="datetime-local" className={`${inputCls} font-mono !text-[12px]`} value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Durasi (otomatis)</label>
              <div className="bg-surface border border-dashed border-bd-bright rounded-md px-3.5 py-2.5 font-mono text-[13px] text-cyan min-h-[42px] flex items-center">
                {duration > 0 ? `${duration} menit (${fmtDuration(duration)})` : "— menit"}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Jenis Gangguan<span className="text-red ml-0.5">*</span></label>
              <div className="flex gap-2">
                <div className={`flex-1 py-2.5 rounded-md border cursor-pointer text-[12px] font-medium text-center transition-all duration-150 select-none ${incidentType === "Unplanned" ? "bg-red-dim border-[rgba(240,79,88,0.4)] text-red" : "bg-raised border-bd text-secondary hover:border-bd-bright"}`} onClick={() => setIncidentType("Unplanned")}>⚠ Unplanned</div>
                <div className={`flex-1 py-2.5 rounded-md border cursor-pointer text-[12px] font-medium text-center transition-all duration-150 select-none ${incidentType === "Planned" ? "bg-blue-dim border-[rgba(79,142,245,0.4)] text-blue" : "bg-raised border-bd text-secondary hover:border-bd-bright"}`} onClick={() => setIncidentType("Planned")}>📋 Planned</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Root Cause (Penyebab)<span className="text-red ml-0.5">*</span></label>
            <select className={`${inputCls} cursor-pointer`} value={rootCause} onChange={(e) => setRootCause(e.target.value)}>
              <option value="">— Pilih template penyebab —</option>
              {ROOT_CAUSE_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
              <option value="other">Lainnya (isi manual)</option>
            </select>
            {rootCause === "other" && (
              <textarea className={`${inputCls} resize-y min-h-[80px] leading-[1.6] mt-2`} placeholder="Jelaskan penyebab secara spesifik..." value={rootCauseOther} onChange={(e) => setRootCauseOther(e.target.value)} />
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Unit / Pengguna Terdampak<span className="text-red ml-0.5">*</span></label>
            <div className="flex flex-wrap gap-2">
              {UNIT_OPTIONS.map((u) => (
                <div key={u} className={`px-3 py-1.5 rounded-sm border cursor-pointer text-[12px] transition-all duration-150 select-none ${selectedUnits.includes(u) ? "bg-cyan-dim border-[rgba(0,212,200,0.4)] text-cyan" : "bg-raised border-bd text-secondary hover:border-bd-bright"}`} onClick={() => toggleUnit(u)}>{u}</div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Catatan Tambahan</label>
            <textarea className={`${inputCls} resize-y min-h-[80px] leading-[1.6]`} placeholder="Tindakan yang diambil, eskalasi ke vendor, dll..." value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-bd flex justify-end gap-2.5">
          <button className="inline-flex items-center gap-1.5 bg-raised text-secondary border border-bd rounded-md px-3.5 py-2 text-[12px] font-medium font-ui cursor-pointer transition-all duration-150 hover:border-bd-bright hover:text-primary" onClick={onClose}>Batal</button>
          <button className="inline-flex items-center gap-1.5 bg-cyan text-[#0a0e1a] border-none rounded-md px-3.5 py-2 text-[12px] font-semibold font-ui cursor-pointer transition-[opacity,transform] duration-150 hover:opacity-88 active:scale-[0.97]" onClick={handleSave}>Simpan Insiden</button>
        </div>
      </div>
    </div>
  );
}

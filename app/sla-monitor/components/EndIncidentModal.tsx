"use client";

import { useState, useEffect } from "react";
import { toLocalInput, fmtDuration, formatDT } from "../utils/formatters";
import { ROOT_CAUSE_OPTIONS } from "../utils/constants";
import type { Incident } from "../types";

interface EndIncidentModalProps {
  open: boolean;
  active: Incident | null;
  onClose: () => void;
  onEnd: (endTime: string, rootCause: string) => void;
  onError: (msg: string) => void;
}

const inputCls = "bg-raised border border-bd rounded-md px-3.5 py-2.5 text-[13px] text-primary font-ui transition-[border-color] duration-150 w-full focus:outline-none focus:border-cyan focus:shadow-[0_0_0_3px_var(--color-cyan-dim)]";
const labelCls = "text-[11px] font-medium tracking-[0.05em] uppercase text-muted";

export default function EndIncidentModal({ open, active, onClose, onEnd, onError }: EndIncidentModalProps) {
  const [endTime, setEndTime] = useState("");
  const [rootCause, setRootCause] = useState("");

  useEffect(() => {
    if (open) { setEndTime(toLocalInput(new Date())); setRootCause(""); }
  }, [open]);

  const duration = (() => {
    if (!active) return 0;
    const e = new Date(endTime), s = new Date(active.start);
    if (!isNaN(e.getTime()) && e > s) return Math.round((e.getTime() - s.getTime()) / 60000);
    return 0;
  })();

  const handleEnd = () => {
    if (!endTime || !rootCause) { onError("Lengkapi waktu pulih dan root cause"); return; }
    onEnd(endTime, rootCause);
    onClose();
  };

  return (
    <div className={`fixed inset-0 bg-black/75 backdrop-blur-[4px] z-[200] flex items-center justify-center p-5 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className={`bg-card border border-bd-bright rounded-xl w-full max-w-[480px] max-h-[90vh] overflow-y-auto transition-transform duration-200 ${open ? "translate-y-0" : "translate-y-4"}`}>
        <div className="px-6 pt-[22px] pb-[18px] border-b border-bd flex items-start gap-3">
          <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 bg-red-dim">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15.5 13H2.5L9 2Z" stroke="var(--color-red)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M9 7V10" stroke="var(--color-red)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="9" cy="12.5" r="0.75" fill="var(--color-red)" />
            </svg>
          </div>
          <div>
            <div className="text-[16px] font-semibold mb-[3px]">Selesaikan Insiden Aktif</div>
            <div className="text-[12px] text-secondary">{active ? `Dimulai: ${formatDT(active.start)}` : "—"}</div>
          </div>
          <button className="ml-auto bg-transparent border-none text-muted cursor-pointer text-[18px] leading-none p-0.5 transition-colors duration-150 hover:text-primary" onClick={onClose}>✕</button>
        </div>
        <div className="p-6 flex flex-col gap-[18px]">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Waktu Sistem Pulih<span className="text-red ml-0.5">*</span></label>
            <input type="datetime-local" className={`${inputCls} font-mono`} value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Durasi Total (otomatis)</label>
            <div className="bg-surface border border-dashed border-bd-bright rounded-md px-3.5 py-2.5 font-mono text-[13px] text-cyan min-h-[42px] flex items-center">
              {duration > 0 ? `${duration} menit (${fmtDuration(duration)})` : "—"}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Root Cause (wajib diisi sebelum tutup)</label>
            <select className={`${inputCls} cursor-pointer`} value={rootCause} onChange={(e) => setRootCause(e.target.value)}>
              <option value="">— Pilih penyebab —</option>
              {ROOT_CAUSE_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
              <option value="other">Lainnya</option>
            </select>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-bd flex justify-end gap-2.5">
          <button className="inline-flex items-center gap-1.5 bg-raised text-secondary border border-bd rounded-md px-3.5 py-2 text-[12px] font-medium font-ui cursor-pointer transition-all duration-150 hover:border-bd-bright hover:text-primary" onClick={onClose}>Batal</button>
          <button className="bg-red text-white border-none rounded-md px-4 py-2 text-[12px] font-semibold font-ui cursor-pointer transition-opacity duration-150 hover:opacity-85" onClick={handleEnd}>Konfirmasi Selesai</button>
        </div>
      </div>
    </div>
  );
}

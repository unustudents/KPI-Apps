"use client";

import { useState, useEffect } from "react";
import type { Config } from "@/app/sla-monitor/types";
import { SYSTEM_OPTIONS, MONTH_NAMES } from "@/app/sla-monitor/utils/constants";

interface IdentityFormProps {
  config: Config;
  onSave: (cfg: Config) => void;
}

const inputCls =
  "bg-raised border border-bd rounded-md px-3.5 py-2.5 text-[13px] text-primary font-ui transition-[border-color] duration-150 w-full focus:outline-none focus:border-cyan focus:shadow-[0_0_0_3px_var(--color-cyan-dim)]";
const labelCls =
  "text-[11px] font-medium tracking-[0.05em] uppercase text-muted";

export default function IdentityForm({ config, onSave }: IdentityFormProps) {
  const [periode, setPeriode] = useState(config.periode);
  const [sistem, setSistem] = useState(config.sistem);
  const [pic, setPic] = useState(config.pic);
  const [jamOps, setJamOps] = useState(String(config.jamOps));

  useEffect(() => {
    setPeriode(config.periode);
    setSistem(config.sistem);
    setPic(config.pic);
    setJamOps(String(config.jamOps));
  }, [config]);

  const [y, m] = config.periode.split("-");
  const periodeLabel = `${MONTH_NAMES[parseInt(m) - 1] || m} ${y}`;

  const handleSave = () => {
    onSave({
      periode: periode || config.periode,
      sistem: sistem || config.sistem,
      pic: pic || config.pic,
      jamOps: parseFloat(jamOps) || config.jamOps,
    });
  };

  const infoCards = [
    { label: "Periode Pelaporan", value: periodeLabel, mono: true },
    { label: "Nama Sistem", value: config.sistem, mono: false },
    { label: "Penanggung Jawab", value: config.pic, mono: false },
    {
      label: "Total Jam Operasional",
      value: `${config.jamOps} jam / bulan`,
      mono: true,
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="mb-1 text-[20px] font-semibold">Identitas Laporan</h1>
        <p className="text-secondary text-[13px]">
          Pengaturan periode, sistem yang dipantau, dan penanggung jawab
        </p>
      </div>

      {/* Info cards (read-only) */}
      <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2">
        {infoCards.map((c) => (
          <div
            key={c.label}
            className="bg-card border-bd rounded-lg border px-5 py-[18px]"
          >
            <div className="text-muted mb-1.5 text-[11px] tracking-[0.05em] uppercase">
              {c.label}
            </div>
            <div
              className={`text-primary text-[14px] font-medium ${c.mono ? "font-mono text-[13px]" : ""}`}
            >
              {c.value}
            </div>
          </div>
        ))}
      </div>

      {/* Edit form */}
      <div className="bg-card border-bd overflow-hidden rounded-lg border">
        <div className="border-bd border-b px-5 py-4">
          <h3 className="text-[14px] font-semibold">
            Ubah Konfigurasi Identitas
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                Periode (Bulan/Tahun)<span className="text-red ml-0.5">*</span>
              </label>
              <input
                type="month"
                className={`${inputCls} font-mono`}
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                Nama Sistem<span className="text-red ml-0.5">*</span>
              </label>
              <select
                className={`${inputCls} cursor-pointer`}
                value={sistem}
                onChange={(e) => setSistem(e.target.value)}
              >
                {SYSTEM_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                Penanggung Jawab<span className="text-red ml-0.5">*</span>
              </label>
              <input
                type="text"
                className={inputCls}
                value={pic}
                onChange={(e) => setPic(e.target.value)}
                placeholder="Nama PIC IT"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                Total Jam Operasional / Bulan
                <span className="text-red ml-0.5">*</span>
              </label>
              <input
                type="number"
                className={`${inputCls} font-mono`}
                value={jamOps}
                onChange={(e) => setJamOps(e.target.value)}
                placeholder="cth: 720"
              />
            </div>

            <div className="col-span-full">
              <button
                className="bg-cyan font-ui inline-flex cursor-pointer items-center gap-1.5 rounded-md border-none px-3.5 py-2 text-[12px] font-semibold text-[#0a0e1a] transition-[opacity,transform] duration-150 hover:opacity-88 active:scale-[0.97]"
                onClick={handleSave}
              >
                Simpan Konfigurasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

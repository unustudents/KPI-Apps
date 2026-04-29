"use client";

import { useSLA } from "@/app/sla-monitor/context/SLAProvider";
import IdentityForm from "./components/IdentityForm";

export default function IdentitasPage() {
  const { config, saveConfig, toast } = useSLA();
  return (
    <IdentityForm
      config={config}
      onSave={(cfg) => {
        saveConfig(cfg);
        toast.show("Konfigurasi tersimpan", "success");
      }}
    />
  );
}

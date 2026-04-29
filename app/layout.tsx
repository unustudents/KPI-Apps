import type { Metadata } from "next";
import { Sora, DM_Mono } from "next/font/google";
import { SLAProvider } from "./sla-monitor/context/SLAProvider";
import MonitorShell from "./sla-monitor/components/MonitorShell";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "SIMRS Incident Log — Manajemen Downtime & SLA",
  description:
    "Aplikasi monitoring SLA dan manajemen downtime sistem informasi rumah sakit",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${sora.variable} ${dmMono.variable}`}>
      <body>
        <SLAProvider>
          <MonitorShell>{children}</MonitorShell>
        </SLAProvider>
      </body>
    </html>
  );
}

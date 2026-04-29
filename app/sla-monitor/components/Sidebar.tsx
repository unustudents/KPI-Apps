"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  incidentCount: number;
  hasActiveIncident: boolean;
}

const navBase =
  "flex items-center gap-2.5 px-2.5 py-[9px] rounded-md cursor-pointer text-[13px] text-secondary transition-all duration-150 mb-0.5 border border-transparent select-none hover:bg-hovr hover:text-primary no-underline";
const navActive = "!bg-cyan-dim !text-cyan !border-[rgba(0,212,200,0.2)]";

export default function Sidebar({
  isOpen,
  onClose,
  incidentCount,
  hasActiveIncident,
}: SidebarProps) {
  const pathname = usePathname();
  const isAt = (p: string) => pathname === p;

  const links = [
    {
      href: "/",
      label: "Dashboard",
      icon: (
        <svg
          className="h-4 w-4 shrink-0 opacity-80"
          viewBox="0 0 16 16"
          fill="none"
        >
          <rect
            x="1"
            y="1"
            width="6"
            height="6"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect
            x="9"
            y="1"
            width="6"
            height="6"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect
            x="1"
            y="9"
            width="6"
            height="6"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect
            x="9"
            y="9"
            width="6"
            height="6"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      ),
    },
    {
      href: "/incidents",
      label: "Log Insiden",
      icon: (
        <svg
          className="h-4 w-4 shrink-0 opacity-80"
          viewBox="0 0 16 16"
          fill="none"
        >
          <circle
            cx="8"
            cy="8"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M8 5V8.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="8" cy="11" r="0.75" fill="currentColor" />
        </svg>
      ),
      badge: incidentCount,
    },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-[99] bg-black/60 md:hidden ${isOpen ? "block" : "hidden"}`}
        onClick={onClose}
      />
      <aside
        className={`bg-surface border-bd fixed top-0 bottom-0 left-0 z-[100] flex w-[220px] flex-col border-r transition-transform duration-250 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="border-bd border-b px-5 pt-[22px] pb-[18px]">
          <div className="mb-2 inline-flex items-center gap-2">
            <div className="bg-cyan flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px]">
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z"
                  stroke="#0a0e1a"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 5V8L10 9.5"
                  stroke="#0a0e1a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-primary text-[13px] font-semibold tracking-[0.02em]">
              SLA Monitor
            </span>
          </div>
          <div className="text-muted font-mono text-[11px] leading-[1.4]">
            RSUD Banyumas · TI Division
            <br />
            v2.4 · App Router
          </div>
        </div>

        <nav className="flex-1 p-[12px_10px]">
          <div className="text-muted px-2.5 pt-2.5 pb-1.5 text-[10px] font-medium tracking-[0.08em] uppercase">
            Utama
          </div>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${navBase} ${isAt(l.href) ? navActive : ""}`}
              onClick={onClose}
            >
              {l.icon}
              {l.label}
              {l.badge !== undefined && (
                <span className="bg-red ml-auto rounded-[10px] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white">
                  {l.badge}
                </span>
              )}
            </Link>
          ))}

          <div className="text-muted mt-2 px-2.5 pt-2.5 pb-1.5 text-[10px] font-medium tracking-[0.08em] uppercase">
            Konfigurasi
          </div>
          <Link
            href="/identitas"
            className={`${navBase} ${isAt("/identitas") ? navActive : ""}`}
            onClick={onClose}
          >
            <svg
              className="h-4 w-4 shrink-0 opacity-80"
              viewBox="0 0 16 16"
              fill="none"
            >
              <rect
                x="2"
                y="3"
                width="12"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M5 7H11M5 9.5H8.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            Identitas Laporan
          </Link>
        </nav>

        <div className="border-bd border-t px-3.5 pt-3.5 pb-[18px]">
          <div className="text-muted flex items-center gap-2 text-[11px]">
            <div
              className={`animate-pulse-dot h-[7px] w-[7px] rounded-full ${hasActiveIncident ? "bg-red shadow-[0_0_6px_var(--color-red)]" : "bg-green shadow-[0_0_6px_var(--color-green)]"}`}
            />
            <span>
              {hasActiveIncident ? "Insiden aktif" : "Semua sistem normal"}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}

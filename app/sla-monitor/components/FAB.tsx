"use client";

interface FABProps {
  isActive: boolean;
  onClick: () => void;
}

export default function FAB({ isActive, onClick }: FABProps) {
  return (
    <button
      className={`fixed bottom-7 right-7 z-[150] border-none rounded-[50px] px-[22px] py-3.5 text-[13px] font-bold font-ui cursor-pointer flex items-center gap-2 transition-all duration-200 tracking-[0.02em] max-md:bottom-4 max-md:right-4 max-md:px-[18px] max-md:py-3 ${
        isActive
          ? "bg-red text-white shadow-[0_4px_24px_rgba(240,79,88,0.35)] hover:shadow-[0_6px_32px_rgba(240,79,88,0.5)]"
          : "bg-cyan text-[#0a0e1a] shadow-[0_4px_24px_rgba(0,212,200,0.35)] hover:shadow-[0_6px_32px_rgba(0,212,200,0.5)]"
      } hover:-translate-y-0.5 active:scale-[0.97]`}
      onClick={onClick}
    >
      {isActive ? (
        <>
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <rect x="3" y="3" width="10" height="10" rx="2" fill="currentColor" />
          </svg>
          Selesaikan Insiden
        </>
      ) : (
        <>
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5V11M5 8H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Mulai Insiden
        </>
      )}
    </button>
  );
}

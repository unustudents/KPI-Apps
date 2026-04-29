"use client";

interface ToastProps {
  visible: boolean;
  message: string;
  type: "success" | "error";
}

export default function Toast({ visible, message, type }: ToastProps) {
  return (
    <div
      className={`fixed bottom-[88px] right-7 z-[300] bg-raised border border-bd-bright rounded-lg px-[18px] py-3 text-[13px] flex items-center gap-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.5)] max-w-[300px] transition-all duration-250 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] ${
          type === "success"
            ? "bg-green-dim text-green"
            : "bg-red-dim text-red"
        }`}
      >
        {type === "success" ? "✓" : "!"}
      </div>
      <span>{message}</span>
    </div>
  );
}

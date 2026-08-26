import type { Toast as HotToast } from "react-hot-toast";
import toast from "react-hot-toast";

import {
  CheckCircle2,
  CircleAlert,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

interface AppToastProps {
  toastData: HotToast;
  message: string;
  type: ToastType;
}

const toastConfig = {
  success: {
    Icon: CheckCircle2,

    background: "bg-white",
    text: "text-slate-700",
    border: "border-green-200",
    icon: "text-green-600",

    progressBackground: "bg-green-100",
    progress: "bg-green-500",

    hover: "hover:bg-green-50 hover:text-green-700",
  },

  error: {
    Icon: CircleAlert,

    background: "bg-white",
    text: "text-slate-700",
    border: "border-red-200",
    icon: "text-red-600",

    progressBackground: "bg-red-100",
    progress: "bg-red-500",

    hover: "hover:bg-red-50 hover:text-red-700",
  },

  info: {
    Icon: Info,

    background: "bg-white",
    text: "text-slate-700",
    border: "border-blue-200",
    icon: "text-blue-600",

    progressBackground: "bg-blue-100",
    progress: "bg-blue-500",

    hover: "hover:bg-blue-50 hover:text-blue-700",
  },

  warning: {
    Icon: TriangleAlert,

    background: "bg-white",
    text: "text-slate-700",
    border: "border-amber-200",
    icon: "text-amber-600",

    progressBackground: "bg-amber-100",
    progress: "bg-amber-500",

    hover: "hover:bg-amber-50 hover:text-amber-700",
  },
} as const;

export function AppToast({
  toastData,
  message,
  type,
}: Readonly<AppToastProps>) {
  const config = toastConfig[type];
  const Icon = config.Icon;

  return (
    <div
      className={`
        relative w-[360px] overflow-hidden
        rounded-xl border
        ${config.background}
        ${config.border}
        shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.1)]
      `}
    >
      <div className="flex items-center gap-3 p-4">
        {/* Icon */}
        <Icon className={`size-5 shrink-0 ${config.icon}`} strokeWidth={2} />

        {/* Message */}
        <p className={`flex-1 text-sm font-medium ${config.text}`}>{message}</p>

        {/* Close */}
        <button
          type="button"
          onClick={() => toast.dismiss(toastData.id)}
          className={`
            flex size-8 shrink-0
            items-center justify-center
            rounded-lg
            text-slate-400
            transition-colors duration-200
            ${config.hover}
            focus:outline-none
            focus:ring-2
            focus:ring-red-500/30
          `}
          aria-label="Close notification"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Timeline background */}
      <div className={`h-1 w-full ${config.progressBackground}`}>
        {/* Timeline */}
        <div
          className={`
            h-full origin-left
            ${config.progress}
            animate-[toast-progress_4s_linear_forwards]
          `}
        />
      </div>
    </div>
  );
}

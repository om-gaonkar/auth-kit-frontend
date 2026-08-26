import toast from "react-hot-toast";

import { AppToast, type ToastType } from "./AppToast";

function showToast(type: ToastType, message: string) {
  return toast.custom(
    (t) => <AppToast toastData={t} type={type} message={message} />,
    {
      duration: 4000,
    },
  );
}

export const appToast = {
  success: (message: string) => showToast("success", message),

  error: (message: string) => showToast("error", message),

  info: (message: string) => showToast("info", message),

  warning: (message: string) => showToast("warning", message),
};

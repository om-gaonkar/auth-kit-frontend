import { Toaster } from "react-hot-toast";

export function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,

        style: {
          background: "#ffffff",
          color: "#1f2937",
          border: "1px solid #fecaca",
          borderRadius: "0.5rem",
          padding: "16px",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        },
      }}
    />
  );
}

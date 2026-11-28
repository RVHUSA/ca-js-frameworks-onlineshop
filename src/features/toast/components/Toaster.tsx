import type { Toast } from "../ToastContext";

interface ToasterProps {
  toast: Toast | null;
}

// Shows the current toast, or nothing when there is none
export function Toaster({ toast }: ToasterProps) {
  return (
    // The container is always on the page so screen readers announce new messages
    <div role="status" aria-live="polite">
      {toast && <p>{toast.message}</p>}
    </div>
  );
}

import type { Toast } from "../ToastContext";

interface ToasterProps {
  toast: Toast | null;
}

// Shows the current toast, or nothing when there is none
export function Toaster({ toast }: ToasterProps) {
  return (
    // The container is always on the page so screen readers announce new messages
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed bottom-6 right-6 z-50 max-w-sm"
    >
      {toast && (
        <p className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white shadow-lg">
          {toast.message}
        </p>
      )}
    </div>
  );
}

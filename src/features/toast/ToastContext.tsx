"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Toaster } from "./components/Toaster";

// A message shown to the user where the id makes every toast unique
export interface Toast {
  id: number;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string) => void;
}

// Context that lets any component show a toast
const ToastContext = createContext<ToastContextValue | null>(null);

// Holds the current toast and removes it after a few seconds
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  // useCallback keeps the function the same between renders
  const showToast = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
  }, []);

  // Remove the toast after 3 seconds, a new toast restarts the timer
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toaster toast={toast} />
    </ToastContext.Provider>
  );
}

// Hook for showing a toast from any component
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside a ToastProvider");
  }
  return context;
}

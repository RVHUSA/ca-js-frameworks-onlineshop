"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

// Shows when a page throws an error
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  // Refetch server data, then try to render the page again
  function handleRetry() {
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  return (
    <div
      role="alert"
      className="m-6 rounded border border-red-400 bg-red-100 p-4 text-red-700 text-center"
    >
      <h2 className="font-bold">Something went wrong</h2>
      <p>{error.message}</p>
      <button
        onClick={handleRetry}
        className="mt-5 cursor-pointer rounded bg-red-700 px-3 py-1 text-white hover:bg-red-800"
      >
        Try again
      </button>
    </div>
  );
}

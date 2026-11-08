// Loading spinner showning while the page is waiting for data
export default function Loading() {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 p-12"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-800" />
      <p className="text-gray-600">Loading products...</p>
    </div>
  );
}

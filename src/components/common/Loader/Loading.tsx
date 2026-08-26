export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-100 border-t-red-600" />

      <div className="text-center">
        <h1 className="text-lg font-semibold text-gray-900">Loading</h1>

        <p className="mt-1 text-sm text-gray-500">Please wait a moment...</p>
      </div>
    </main>
  );
}

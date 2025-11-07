export default function SkeletonCard() {
  return (
    <div className="rounded-2xl border bg-white/70 p-6 animate-pulse">
      <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
      <div className="space-y-2 mt-4">
        <div className="h-4 bg-neutral-200 rounded"></div>
        <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
      </div>
      <div className="flex items-center mt-6">
        <div className="w-10 h-10 rounded-full bg-neutral-200"></div>
        <div className="ml-3 space-y-2">
          <div className="h-4 bg-neutral-200 rounded w-24"></div>
          <div className="h-4 bg-neutral-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

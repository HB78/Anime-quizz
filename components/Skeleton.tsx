export function AnimeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      {/* Image skeleton */}
      <div className="relative h-48 animate-pulse bg-zinc-800">
        {/* Badge placeholders */}
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="h-5 w-14 rounded bg-zinc-700" />
          <div className="h-5 w-16 rounded bg-zinc-700" />
        </div>
        {/* Title placeholder */}
        <div className="absolute bottom-3 left-3 right-3 space-y-2">
          <div className="h-5 w-3/4 rounded bg-zinc-700" />
          <div className="flex gap-2">
            <div className="h-4 w-16 rounded bg-zinc-700/60" />
          </div>
        </div>
      </div>

      {/* Theme skeletons */}
      <div className="space-y-2 p-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex animate-pulse items-center gap-3 rounded-xl p-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-800" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-10 rounded bg-zinc-800" />
              <div className="h-4 w-3/4 rounded bg-zinc-800" />
              <div className="h-3 w-1/2 rounded bg-zinc-800/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <AnimeCardSkeleton key={i} />
      ))}
    </div>
  );
}

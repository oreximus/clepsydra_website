export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar placeholder */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-surface-muted animate-pulse" />
            <div className="h-5 w-40 bg-surface-muted rounded animate-pulse hidden sm:block" />
          </div>
          <div className="flex items-center gap-6">
            <div className="h-4 w-16 bg-surface-muted rounded animate-pulse hidden md:block" />
            <div className="h-4 w-16 bg-surface-muted rounded animate-pulse hidden md:block" />
            <div className="h-9 w-28 bg-surface-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </header>

      <main className="pt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-4 w-24 bg-surface-muted rounded animate-pulse mx-auto mb-4" />
            <div className="h-10 w-64 bg-surface-muted rounded animate-pulse mx-auto mb-4" />
            <div className="h-5 w-96 max-w-full bg-surface-muted rounded animate-pulse mx-auto" />
          </div>

          {/* Featured article skeleton */}
          <div className="grid md:grid-cols-5 gap-8 bg-surface-off rounded-2xl overflow-hidden mb-12">
            <div className="md:col-span-2 md:min-h-[320px] bg-surface-muted animate-pulse" />
            <div className="md:col-span-3 p-8 md:p-10">
              <div className="h-4 w-28 bg-surface-muted rounded animate-pulse mb-3" />
              <div className="h-8 w-full bg-surface-muted rounded animate-pulse mb-3" />
              <div className="h-8 w-3/4 bg-surface-muted rounded animate-pulse mb-3" />
              <div className="h-4 w-full bg-surface-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-full bg-surface-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-2/3 bg-surface-muted rounded animate-pulse mb-4" />
              <div className="flex gap-4">
                <div className="h-4 w-20 bg-surface-muted rounded animate-pulse" />
                <div className="h-4 w-16 bg-surface-muted rounded animate-pulse" />
                <div className="h-4 w-24 bg-surface-muted rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Grid skeletons */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-[#E5EAF4] rounded-xl overflow-hidden bg-white">
                <div className="aspect-[16/10] bg-surface-muted animate-pulse" />
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <div className="h-3 w-20 bg-surface-muted rounded animate-pulse" />
                    <div className="h-3 w-12 bg-surface-muted rounded animate-pulse" />
                  </div>
                  <div className="h-5 w-full bg-surface-muted rounded animate-pulse mb-2" />
                  <div className="h-5 w-3/4 bg-surface-muted rounded animate-pulse mb-2" />
                  <div className="h-4 w-full bg-surface-muted rounded animate-pulse mb-1" />
                  <div className="h-4 w-5/6 bg-surface-muted rounded animate-pulse mb-4" />
                  <div className="pt-4 border-t border-[#E5EAF4] flex justify-between">
                    <div className="h-3 w-24 bg-surface-muted rounded animate-pulse" />
                    <div className="h-3 w-16 bg-surface-muted rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

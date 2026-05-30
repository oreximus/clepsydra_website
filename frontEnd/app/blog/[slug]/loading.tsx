import { Navbar } from "@/components/navbar";

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24">
        <article className="max-w-3xl mx-auto px-6 lg:px-8 pb-24">
          <div className="h-4 w-28 bg-[#E5EAF4] rounded animate-pulse mb-10" />

          <header className="mb-10 space-y-4">
            <div className="h-10 md:h-12 w-full bg-[#E5EAF4] rounded-lg animate-pulse" />
            <div className="h-10 md:h-12 w-3/4 bg-[#E5EAF4] rounded-lg animate-pulse" />
            <div className="flex gap-5">
              <div className="h-4 w-32 bg-[#E5EAF4] rounded animate-pulse" />
              <div className="h-4 w-28 bg-[#E5EAF4] rounded animate-pulse" />
              <div className="h-4 w-36 bg-[#E5EAF4] rounded animate-pulse" />
            </div>
          </header>

          <div className="aspect-[2/1] bg-[#E5EAF4] rounded-xl animate-pulse mb-12" />

          <div className="space-y-4">
            <div className="h-4 w-full bg-[#E5EAF4] rounded animate-pulse" />
            <div className="h-4 w-full bg-[#E5EAF4] rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-[#E5EAF4] rounded animate-pulse" />
            <div className="h-4 w-full bg-[#E5EAF4] rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-[#E5EAF4] rounded animate-pulse" />
            <div className="h-4 w-full bg-[#E5EAF4] rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-[#E5EAF4] rounded animate-pulse" />
          </div>
        </article>
      </main>
    </div>
  );
}

import { Navbar } from "@/components/navbar";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="h-5 w-24 bg-[#E5EAF4] rounded-full animate-pulse" />
            </div>
            <div className="h-10 md:h-14 w-80 mx-auto bg-[#E5EAF4] rounded-lg animate-pulse mb-4" />
            <div className="h-5 w-96 max-w-full mx-auto bg-[#E5EAF4] rounded animate-pulse" />
          </div>

          <div className="grid md:grid-cols-5 gap-8 bg-surface-off rounded-2xl overflow-hidden border border-[#E5EAF4] mb-12 min-h-[280px]">
            <div className="md:col-span-2 bg-[#E5EAF4] animate-pulse min-h-[280px]" />
            <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center gap-4">
              <div className="h-4 w-28 bg-[#E5EAF4] rounded animate-pulse" />
              <div className="h-8 w-full bg-[#E5EAF4] rounded-lg animate-pulse" />
              <div className="h-4 w-full bg-[#E5EAF4] rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-[#E5EAF4] rounded animate-pulse" />
              <div className="h-4 w-48 bg-[#E5EAF4] rounded animate-pulse" />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-[#E5EAF4] rounded-xl overflow-hidden bg-white"
              >
                <div className="aspect-[16/10] bg-[#E5EAF4] animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-32 bg-[#E5EAF4] rounded animate-pulse" />
                  <div className="h-5 w-full bg-[#E5EAF4] rounded animate-pulse" />
                  <div className="h-4 w-full bg-[#E5EAF4] rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-[#E5EAF4] rounded animate-pulse" />
                  <div className="pt-4 border-t border-[#E5EAF4]">
                    <div className="h-3 w-24 bg-[#E5EAF4] rounded animate-pulse" />
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

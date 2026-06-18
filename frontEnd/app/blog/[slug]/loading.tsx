export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 rounded-full border-[3px] border-brand-blue border-t-transparent animate-spin" />
        <p className="font-body text-sm text-muted-foreground animate-pulse">
          Loading article...
        </p>
      </div>
    </div>
  );
}

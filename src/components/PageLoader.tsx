const PageLoader = () => {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm px-4"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card/90 p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12">
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/25 to-secondary/25 blur-md" />
            <span className="absolute inset-0 rounded-full border-4 border-border border-t-primary animate-spin" />
          </div>
          <div className="min-w-0">
            <p className="text-base font-semibold text-foreground">Loading…</p>
            <p className="text-sm text-muted-foreground">
              Please wait while we prepare the page.
            </p>
          </div>
        </div>
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-gradient-to-r from-primary to-secondary" />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;



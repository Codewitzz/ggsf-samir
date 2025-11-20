const PageLoader = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4" role="status" aria-live="polite">
      <span className="h-12 w-12 rounded-full border-4 border-border border-t-primary animate-spin" />
      <div className="space-y-1">
        <p className="text-base font-medium text-foreground">Loading experience...</p>
        <p className="text-sm text-muted-foreground max-w-md">
          Assets are streamed progressively so the site stays light even for large audiences.
        </p>
      </div>
    </div>
  );
};

export default PageLoader;



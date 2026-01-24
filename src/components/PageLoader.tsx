const PageLoader = () => {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="relative h-12 w-12">
        <span className="absolute inset-0 rounded-full border-4 border-border border-t-primary animate-spin" />
      </div>
    </div>
  );
};

export default PageLoader;

import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const formatBreadcrumb = (str: string) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="bg-muted py-3 px-4">
      <div className="container mx-auto">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <li key={name} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                {isLast ? (
                  <span className="text-foreground font-medium">{formatBreadcrumb(name)}</span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {formatBreadcrumb(name)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;

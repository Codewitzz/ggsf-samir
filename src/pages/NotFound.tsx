import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-8xl font-bold text-primary">404</h1>
            <h2 className="text-3xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-lg text-muted-foreground">
              Sorry, the page you are looking for does not exist or has been moved.
            </p>
            {location.pathname && location.pathname !== "/" && (
              <p className="text-sm text-muted-foreground">
                Attempted URL: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" onClick={() => window.history.back()}>
              <Link to="#" onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Link>
            </Button>
          </div>
          <div className="pt-8 space-y-2 text-sm text-muted-foreground">
            <p>You might be looking for:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>•</span>
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <span>•</span>
              <Link to="/engineering/about" className="hover:text-primary transition-colors">Engineering</Link>
              <span>•</span>
              <Link to="/mba/about" className="hover:text-primary transition-colors">MBA</Link>
              <span>•</span>
              <Link to="/me/about" className="hover:text-primary transition-colors">ME</Link>
              <span>•</span>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;

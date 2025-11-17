import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

type PlaceholderProps = {
  title?: string;
  message?: string;
};

const Placeholder = ({ title = "Coming Soon", message = "This section is under development." }: PlaceholderProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl text-center space-y-4">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-lg">{message}</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Placeholder;



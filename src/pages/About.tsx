import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold text-center">About Guru Gobind Singh Foundation</h1>
          <p className="text-muted-foreground text-lg text-center">
            Guru Gobind Singh Foundation nurtures future-ready graduates through its Engineering and Management institutions. With NAAC B+ Grade accreditation, NBA-recognised programs, and strong industry partnerships,
            the foundation emphasizes academic excellence, innovation, and holistic development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Established", value: "1994" },
              { label: "Students", value: "6000+" },
              { label: "Corporate Partners", value: "300+" },
            ].map((item, index) => (
              <div key={index} className="text-center border border-border rounded-lg p-6">
                <p className="text-3xl font-bold text-primary">{item.value}</p>
                <p className="text-sm uppercase tracking-wide text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;



import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const MBAFacilities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold">MBA Facilities</h1>
          <p className="text-muted-foreground text-lg">
            Business labs, collaborative spaces, and digital resources create an ecosystem for managerial excellence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Learning Infrastructure</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Case discussion rooms with smart boards and video conferencing</li>
                <li>Business analytics lab with licensed tools (Tableau, SPSS, Python)</li>
                <li>Bloomberg terminal access through partner universities</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Student Support</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Dedicated placement lounge and corporate interview cabins</li>
                <li>Entrepreneurship incubation hub and mentor network</li>
                <li>Management club rooms for finance, marketing, HR forums</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MBAFacilities;



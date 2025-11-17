import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const MEActivities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold">M.E. Activities</h1>
          <p className="text-muted-foreground text-lg">
            Research colloquia, faculty development programs, and collaborative hackathons help postgraduate students
            engage with the latest advancements in engineering and technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Research Forums</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Monthly research colloquiums with invited scientists</li>
                <li>Paper writing workshops and journal club sessions</li>
                <li>Collaborative projects with DRDO, ISRO, and MSME partners</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Professional Development</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Faculty development programs (FDPs) hosted on campus</li>
                <li>National conferences and symposiums on emerging engineering areas</li>
                <li>Innovation challenges and research hackathons</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MEActivities;



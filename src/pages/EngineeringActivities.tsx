import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const EngineeringActivities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold">Engineering Activities</h1>
          <p className="text-muted-foreground text-lg">
            A vibrant calendar of technical, cultural, and social initiatives nurture leadership,
            innovation, and community engagement among engineering students.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Technical Clubs & Events</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>IEEE, ISTE, and TRIZ student chapters organizing annual conclaves</li>
                <li>Hackathons, Make-a-thon, and SAE BAJA participation</li>
                <li>Industry workshops on Industry 4.0, AI/ML, and EV systems</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Social & Cultural Outreach</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>NSS, student council, and community service initiatives</li>
                <li>Annual festival “Technovation” with project expos and cultural nights</li>
                <li>Professional development seminars and alumni interactions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EngineeringActivities;



import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const MBAActivities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold">MBA Activities</h1>
          <p className="text-muted-foreground text-lg">
            From corporate conclaves to live projects, the MBA program is enriched with experiential engagements that
            sharpen managerial acumen and leadership skills.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Corporate Connect</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>CXO lecture series featuring Fortune 500 leaders</li>
                <li>Management Development Programs with industry partners</li>
                <li>Live consulting assignments with SMEs and start-ups</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Student Life</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Student-driven clubs: Finance, Marketing, HR, Analytics</li>
                <li>National level fest “Synergy” with case competitions</li>
                <li>CSR initiatives and rural immersion programs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MBAActivities;



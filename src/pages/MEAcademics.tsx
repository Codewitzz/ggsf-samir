import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const MEAcademics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold">M.E. Academics</h1>
          <p className="text-muted-foreground text-lg">
            A blend of advanced coursework, lab immersion, and research dissertation ensures scholars contribute
            to cutting-edge innovations and publications.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Academic Structure</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Four semesters including advanced electives and open electives</li>
                <li>Mandatory seminar, journal club, and research methodology modules</li>
                <li>Thesis guided by faculty with industry co-mentors</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Research Support</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access to SCOPUS, IEEE, and Springer digital libraries</li>
                <li>Funding support for conference presentations and patents</li>
                <li>Collaboration with R&D organisations for sponsored research</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MEAcademics;



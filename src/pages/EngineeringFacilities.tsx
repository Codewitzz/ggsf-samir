import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import CampusInfrastructure from "@/components/CampusInfrastructure";

const EngineeringFacilities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Engineering Facilities</h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              The campus houses specialised centres of excellence, modern laboratories, and digital infrastructure
              that facilitate immersive, hands-on learning for all engineering disciplines.
            </p>
          </div>
          
          <CampusInfrastructure />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Centres of Excellence</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Siemens Centre for Mechatronics & Industrial Automation</li>
                <li>Bosch-Rexroth Hydraulics & Pneumatics Lab</li>
                <li>AI & Data Science Innovation Lab powered by NVIDIA GPUs</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Student Amenities</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Digital library with access to IEEE, Springer, and Elsevier resources</li>
                <li>Hostel facilities with Wi-Fi and 24/7 security</li>
                <li>Wellness centre, sports complex, and cafeteria</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EngineeringFacilities;



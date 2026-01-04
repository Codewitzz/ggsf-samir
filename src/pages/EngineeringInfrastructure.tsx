import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import CampusInfrastructure from "@/components/CampusInfrastructure";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EngineeringInfrastructure = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Campus Infrastructure</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            World-class infrastructure designed to support excellence in engineering education and research
          </p>
        </div>
      </section>

      {/* Infrastructure Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Infrastructure Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our campus infrastructure is designed to provide students with access to the latest technology, 
                modern facilities, and comfortable learning spaces. From cutting-edge laboratories to well-equipped 
                classrooms, every aspect of our infrastructure is planned to enhance the learning experience.
              </p>
              <p className="text-muted-foreground">
                We continuously invest in upgrading our facilities to ensure that our students have access to 
                industry-standard equipment and resources. Our commitment to infrastructure development reflects 
                our dedication to providing quality engineering education.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Campus Infrastructure Component */}
      <CampusInfrastructure />

      {/* Additional Infrastructure Details */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Technology Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• High-speed Wi-Fi connectivity across campus</li>
                  <li>• 100 Mbps dedicated internet connection</li>
                  <li>• Computer labs with latest hardware and software</li>
                  <li>• Digital classrooms with smart boards</li>
                  <li>• Online learning management system</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Support Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Medical facilities and first aid center</li>
                  <li>• Banking and ATM services on campus</li>
                  <li>• Cafeteria with hygienic food options</li>
                  <li>• Sports complex and playground</li>
                  <li>• Auditorium with 400+ seating capacity</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EngineeringInfrastructure;



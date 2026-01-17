import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb } from "lucide-react";

const VisionMission = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision & Mission</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Guiding principles that shape our commitment to excellence in education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <Card className="h-full border-2 border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-full bg-primary/10 p-3">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                An institute striving for excellence in providing transformative academic education and stimulating 
                environment for research to enhance skills for developing intellectuals and to inculcate quality 
                education with social and technical knowledge which will benefit the society and industrial challenges.
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="h-full border-2 border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-full bg-secondary/20 p-3">
                  <Lightbulb className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>To be a technical educational Institute in transforming aspiring engineers through rigorous course work and technical skills.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>To benchmark with the best global standards of quality education.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>To enhance commitment of the faculty, staff and students by inculcating the spirit of inquiry, team work and professionalism.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Establish a centre of excellence to enhance academia-industry partnership, work on collaborative projects, and develop new products, services and patents.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>To develop globally competent students by enhancing indigenous technologies and inculcate entrepreneurship in them.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;

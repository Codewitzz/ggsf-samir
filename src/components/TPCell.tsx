import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Phone, Mail, Globe } from "lucide-react";

const TPCell = () => {
  return (
    <section className=" bg-primary text-primary-foreground">
      <div className="container  max-w-5xl">
        <Card className="bg-primary text-primary-foreground border-primary-foreground/20">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Briefcase className="h-7 w-7" />
              Training & Placement Cell
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-lg mb-2">Highlights</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>868+ recruiters on campus</li>
                <li>National record by TCS with 4004 offers</li>
                <li>Highest CTC: ₹1 crore per annum</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Contact</h3>
              <p className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                +91 253 237 3547 / 7768004585
              </p>
              <p className="flex items-center gap-2 text-primary-foreground/80 mt-2 break-all">
                <Mail className="h-4 w-4" />
                tpo@ggsf.edu.in
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Resources</h3>
              <a
                href="https://engg.ggsf.edu.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary-foreground hover:underline"
              >
                <Globe className="h-4 w-4" />
                Placement Portal
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TPCell;



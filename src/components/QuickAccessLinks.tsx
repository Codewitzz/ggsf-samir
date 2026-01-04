import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, GraduationCap, BookMarked, Users, IndianRupee } from "lucide-react";

const links = [
  { title: "Fee Structure", href: "/fee-structure", icon: IndianRupee },
  { title: "Academic Calendar", href: "/downloads", icon: BookMarked },
  { title: "College Brochure", href: "/downloads", icon: FileText },
  { title: "Placement Cell", href: "/contact", icon: Users },
  { title: "Admissions Enquiry", href: "/contact", icon: GraduationCap },
];

const QuickAccessLinks = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {links.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">
                    <Link to={link.href} className="hover:underline">
                      {link.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessLinks;



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const disclosures = [
  { title: "Mandatory Disclosure", href: "/downloads" },
  { title: "AICTE Approval Letters", href: "/downloads" },
  { title: "NAAC & NBA Reports", href: "/downloads" },
  { title: "Fee Regulation Authority", href: "/downloads" },
];

const PublicDisclosure = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-dashed">
          <CardHeader className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-info" />
            <CardTitle className="text-2xl">Public Disclosure & Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Transparent governance with statutory documents accessible for students, parents, and stakeholders.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {disclosures.map((item, index) => (
                <li key={index}>
                  <Link to={item.href} className="text-primary hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PublicDisclosure;



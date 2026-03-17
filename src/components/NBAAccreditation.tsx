import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

const NBAAccreditation = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-dashed border-info/40">
          <CardHeader className="flex items-center gap-3">
            <Award className="h-6 w-6 text-info" />
            <CardTitle className="text-2xl">NBA Accreditation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The Mechanical Engineering program at Guru Gobind Singh College of Engineering and Research Centre
              has been accredited by the National Board of Accreditation (NBA) for a period of three years, valid until 2028.
              This recognition underscores our commitment to outcome-based education, top-tier infrastructure,
              and strong industry-aligned curriculum.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NBAAccreditation;



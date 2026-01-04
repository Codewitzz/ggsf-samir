import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

const NAACAccreditation = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-dashed border-primary/40 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="flex items-center gap-3">
            <Award className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">NAAC Accreditation - B+ Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground text-lg">
                Guru Gobind Singh College of Engineering and Research Center has been accredited by the National Assessment and Accreditation Council (NAAC) with <strong className="text-primary font-bold">B+ Grade</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Accreditation Status</p>
                  <p className="text-xl font-bold text-primary">B+ Grade</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Ranking</p>
                  <p className="text-xl font-bold text-primary">62nd across India</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                  <p className="text-lg font-semibold">GOLD Band Institution of Excellence</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                This accreditation reflects our commitment to quality education, infrastructure, and holistic development of students.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NAACAccreditation;


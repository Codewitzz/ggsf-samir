import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";

const alumniStories = [
  {
    name: "Alumni (Provided)",
    role: "Batch —",
    quote:
      "The college ecosystem, faculty support, and hands-on learning helped me grow in confidence and career readiness.",
  },
  {
    name: "Alumni (Provided)",
    role: "Batch —",
    quote:
      "Strong academics, practical labs, and mentorship prepared me for real-world engineering challenges.",
  },
  {
    name: "Alumni (Provided)",
    role: "Batch —",
    quote:
      "Industry exposure, projects, and campus opportunities made my learning journey meaningful and future-focused.",
  },
];

const AlumniSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Alumni Voices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {alumniStories.map((alumni, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Quote className="h-5 w-5 text-secondary" />
                </div>
                <CardTitle className="text-lg">{alumni.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{alumni.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{alumni.quote}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlumniSection;



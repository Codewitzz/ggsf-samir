import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";

const alumniStories = [
  {
    name: "Rahul Parakh",
    role: "Senior Software Engineer, Amazon",
    quote:
      "The rigorous curriculum and mentorship at GGSF laid the foundation for my career. Industry projects prepared me for real-world challenges.",
  },
  {
    name: "Falguni",
    role: "Project Manager, L&T Construction",
    quote:
      "Hands-on lab sessions, field visits, and the supportive faculty ensured I was job-ready with strong technical skills.",
  },
  {
    name: "Himalaya Mahajan",
    role: "Entrepreneur, Mechatronics Solutions",
    quote:
      "Innovation labs and the incubation cell encouraged me to convert my ideas into a successful automation start-up.",
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



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";

/** Voices sourced from the official GCOERC student corner testimonials page. */
const alumniStories = [
  {
    name: "Pooja Dharmendra Bhargav",
    role: "Alumni",
    quote:
      "It has been an unforgettable experience at GGSF, GCOERC. My doubts and queries were always welcomed by the lecturers and sometimes led to healthy discussions which made me explore other topics as well.",
  },
  {
    name: "Madhushree Kalyanchaitanya Naigaonkar",
    role: "Alumni",
    quote:
      "I strongly recommend GCOERC as one of the best Engineering colleges we have in Nashik. Its Training and Placement Cell is also very strong.",
  },
  {
    name: "Shruti Raut",
    role: "Alumni",
    quote:
      "Professional teaching, creative classes, effective explanations, and entertaining material that you get here – all contribute to your success in industry.",
  },
  {
    name: "Gayatri Rahane",
    role: "Alumni",
    quote:
      "The college with good infrastructure and being one of the top colleges in Nashik is Guru Gobind Singh College of Engineering. It sustains the top position in providing quality education.",
  },
  {
    name: "Hitesh Arvind Patil",
    role: "Alumni · Civil · 2022",
    quote:
      "Most humbly, my name is Hitesh Patil and I am a pass-out student of year 2022 from civil department of GCOERC. My overall experience to date has been amazing, and the college is having an amazing environment for learning.",
  },
  {
    name: "Omkar Vikram Tajane",
    role: "Alumni",
    quote:
      "Throughout my time as a student, I was continually inspired by the dedication of the faculty members who not only imparted invaluable theoretical knowledge but also encouraged critical thinking.",
  },
];

const AlumniSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Alumni Voices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <p className="text-muted-foreground text-sm leading-relaxed">{alumni.quote}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlumniSection;

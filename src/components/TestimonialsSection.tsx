import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "MBA Graduate 2023",
      company: "Tech Corp",
      content: "The MBA program transformed my career. The faculty's industry experience and practical approach prepared me perfectly for the corporate world.",
      initials: "PS",
    },
    {
      name: "Rahul Patel",
      role: "Engineering Alumni",
      company: "Innovation Labs",
      content: "The engineering college provided excellent infrastructure and mentorship. I gained both theoretical knowledge and hands-on experience.",
      initials: "RP",
    },
    {
      name: "Anjali Desai",
      role: "Polytechnic Student",
      company: "Current Student",
      content: "The polytechnic program focuses on practical skills that are directly applicable in the industry. The workshops and lab sessions are outstanding.",
      initials: "AD",
    },
    {
      name: "Vikram Singh",
      role: "Recruiter",
      company: "Global Solutions Inc.",
      content: "We consistently hire from this foundation. The students are well-prepared, skilled, and demonstrate excellent professionalism.",
      initials: "VS",
    },
  ];

  return (
    <section className="py-16 px-4 bg-accent/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What People Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our students, alumni, and recruiting partners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-6">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 bg-primary text-primary-foreground">
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-foreground mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

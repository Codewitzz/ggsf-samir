import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import engineeringIcon from "@/assets/engineering-icon.png";
import mbaIcon from "@/assets/mba-icon.png";
import polytechnicIcon from "@/assets/polytechnic-icon.png";

const CollegeCards = () => {
  const colleges = [
    {
      title: "MBA Programs",
      description: "Master of Business Administration - Develop leadership and strategic business skills",
      icon: mbaIcon,
      link: "/mba/about",
      color: "from-primary to-primary-light",
    },
    {
      title: "Engineering College",
      description: "Bachelor of Engineering - Innovation through technology and engineering excellence",
      icon: engineeringIcon,
      link: "/engineering/about",
      color: "from-info to-primary",
    },
    {
      title: "Polytechnic College",
      description: "Diploma Programs - Hands-on technical education for practical skills",
      icon: polytechnicIcon,
      link: "/polytechnic/about",
      color: "from-warning to-secondary",
    },
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Colleges</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our three prestigious institutions, each offering world-class education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {colleges.map((college) => (
            <Card
              key={college.title}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${college.color}`} />
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-32 h-32 rounded-full bg-accent flex items-center justify-center p-6">
                  <img src={college.icon} alt={college.title} className="w-full h-full object-contain" />
                </div>
                <CardTitle className="text-2xl mb-2">{college.title}</CardTitle>
                <CardDescription className="text-base">{college.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button asChild className="group-hover:bg-primary group-hover:text-primary-foreground">
                  <Link to={college.link}>
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollegeCards;

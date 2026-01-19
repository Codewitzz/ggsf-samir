import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import engineeringIcon from "@/assets/engineering-icon.png";
import mbaIcon from "@/assets/mba-icon.png";

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
      title: "ME Programs",
      description: "Master of Engineering - Advanced specialization and research-oriented postgraduate programs",
      icon: engineeringIcon,
      link: "/me/about",
      color: "from-warning to-secondary",
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">Our Colleges</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our prestigious institutions, each offering world-class education
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {colleges.map((college) => (
            <Card
              key={college.title}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${college.color}`} />
              <CardHeader className="text-center pb-3 sm:pb-4">
                <div className="mx-auto mb-3 sm:mb-4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center p-2">
                  <img
                    src={college.icon}
                    alt={college.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl mb-2">{college.title}</CardTitle>
                <CardDescription className="text-xs sm:text-sm md:text-base">{college.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-4 sm:pb-6">
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

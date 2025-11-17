import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award, Users, BookOpen, Calendar, CheckCircle } from "lucide-react";
import mbaIcon from "@/assets/mba-icon.png";

const SchoolAbout = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "CBSE Affiliated",
      description: "Affiliated to Central Board of Secondary Education (CBSE)",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Curriculum",
      description: "Well-structured curriculum from KG to Class 12",
    },
    {
      icon: Users,
      title: "Experienced Faculty",
      description: "Dedicated and qualified teaching staff",
    },
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Consistent track record of outstanding results",
    },
  ];

  const highlights = [
    "Established in 1978 on Baisakhi",
    "Motto: 'Knowledge is Divine'",
    "CBSE affiliated school and junior college",
    "Programs from Kindergarten to Class 12",
    "Well-equipped laboratories for Physics, Chemistry, Biology, and Computer Science",
    "Modern library with extensive collection of books and digital resources",
    "Art Room, Music Room, and Dance Room for creative expression",
    "Sports facilities for physical development",
    "Hygienic cafeteria serving nutritious meals",
    "Focus on holistic development of students",
    "Regular co-curricular and extra-curricular activities",
    "Parent-teacher collaboration for student success",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-6 inline-block">
            <img src={mbaIcon} alt="School" className="w-32 h-32 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Guru Gobind Singh Public School & Junior College
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Excellence in school education since 1978. Empowering students with knowledge and values for a bright future.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">CBSE Affiliated</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">Established 1978</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">Knowledge is Divine</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl mb-4">About Our School</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Guru Gobind Singh Public School & Junior College (GGSPSJC) was established in 1978 on the auspicious 
                occasion of Baisakhi. Since its inception, the school has been committed to providing quality education 
                and holistic development to students from Kindergarten to Class 12.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our motto "Knowledge is Divine" reflects our belief in the transformative power of education. We strive 
                to create an environment where students can explore, learn, and grow into confident, responsible, and 
                successful individuals.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Affiliated to the Central Board of Secondary Education (CBSE), we follow a comprehensive curriculum that 
                balances academic excellence with co-curricular activities, ensuring the all-round development of our students.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Key Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Programs Offered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">School Programs</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Kindergarten (KG)</li>
                  <li>Primary Section (Classes 1-5)</li>
                  <li>Middle Section (Classes 6-8)</li>
                  <li>Secondary Section (Classes 9-10)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Junior College Programs</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Class 11-12 (Science Stream)</li>
                  <li>Class 11-12 (Commerce Stream)</li>
                  <li>Class 11-12 (Arts Stream)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Affiliation</h3>
                <p className="text-muted-foreground">
                  Affiliated to Central Board of Secondary Education (CBSE), New Delhi
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SchoolAbout;


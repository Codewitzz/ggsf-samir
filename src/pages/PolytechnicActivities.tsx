import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Trophy, 
  Wrench, 
  Users, 
  BookOpen,
  Lightbulb,
  Globe,
  Heart,
  Briefcase
} from "lucide-react";

const PolytechnicActivities = () => {
  const activities = [
    {
      icon: Wrench,
      title: "Technical Workshops",
      description: "Hands-on workshops and training programs in various technical skills",
      activities: ["BOSCH Workshops", "Siemens Training", "Industry 4.0 Programs", "PLC Training", "Automation Workshops", "Skill Development"],
    },
    {
      icon: Lightbulb,
      title: "Project Exhibitions",
      description: "Technical project exhibitions and innovation challenges",
      activities: ["Project Exhibitions", "Innovation Challenges", "Mini Projects", "Major Projects", "Technical Competitions"],
    },
    {
      icon: Briefcase,
      title: "Industry Interaction",
      description: "Industry visits, guest lectures, and industrial training programs",
      activities: ["Industry Visits", "Guest Lectures", "Industrial Training", "Internship Programs", "Placement Drives", "Industry-Academia Meet"],
    },
    {
      icon: BookOpen,
      title: "Academic Activities",
      description: "Seminars, workshops, conferences, and academic competitions",
      activities: ["Technical Seminars", "Workshops", "Paper Presentations", "Poster Competitions", "Academic Quiz", "Technical Quiz"],
    },
    {
      icon: Trophy,
      title: "Sports & Games",
      description: "Annual sports day, inter-college competitions, and recreational activities",
      activities: ["Sports Day", "Cricket", "Football", "Basketball", "Volleyball", "Indoor Games"],
    },
    {
      icon: Users,
      title: "Cultural Activities",
      description: "Cultural festivals, talent shows, and entertainment events",
      activities: ["Cultural Fest", "Talent Show", "Music & Dance", "Drama", "Art Exhibition", "Photography"],
    },
    {
      icon: Globe,
      title: "Social & Environmental",
      description: "Community service, environmental awareness, and social responsibility",
      activities: ["NSS Activities", "Tree Plantation", "Cleanliness Drives", "Social Service", "Environmental Awareness", "Health Camps"],
    },
    {
      icon: Heart,
      title: "Student Clubs",
      description: "Various student clubs and societies for different interests",
      activities: ["Technical Clubs", "Cultural Clubs", "Sports Clubs", "Entrepreneurship Club", "Photography Club", "IIC Activities"],
    },
  ];

  const annualEvents = [
    "Technical Fest",
    "Annual Day Celebration",
    "Sports Day",
    "Cultural Fest",
    "Project Exhibition",
    "Industry-Academia Meet",
    "Alumni Meet",
    "Freshers' Party",
    "Farewell",
    "Skill Development Programs",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-warning to-secondary text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Polytechnic Activities</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Holistic development through diverse technical, cultural, and social activities
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Co-Curricular Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-warning" />
                    </div>
                    <CardTitle className="text-lg mb-2">{activity.title}</CardTitle>
                    <CardDescription>{activity.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {activity.activities.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Annual Events */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Annual Events & Celebrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {annualEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                    <Trophy className="h-5 w-5 text-warning flex-shrink-0" />
                    <p className="text-muted-foreground">{event}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Benefits of Co-Curricular Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">Enhances technical and practical skills</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">Develops industry-relevant competencies</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">Builds industry connections and networking</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">Improves communication and teamwork skills</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">Fosters innovation and entrepreneurship</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">Provides stress relief and work-life balance</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PolytechnicActivities;


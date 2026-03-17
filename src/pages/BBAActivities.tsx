import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, CalendarDays, Presentation, Users, Zap } from "lucide-react";

const BBAActivities = () => {
  const activities = [
    {
      title: "Industry Guest Lectures",
      description: "Sessions with corporate leaders and entrepreneurs to connect classroom learning with industry reality.",
      icon: Presentation,
    },
    {
      title: "Workshops & Skill Programs",
      description: "Resume building, communication, aptitude, and basic analytics workshops for career readiness.",
      icon: Zap,
    },
    {
      title: "Student Clubs",
      description: "Student-driven activities that build leadership, teamwork, and event management skills.",
      icon: Users,
    },
    {
      title: "Competitions & Case Challenges",
      description: "Participate in inter-collegiate events, marketing challenges, and business case presentations.",
      icon: Award,
    },
    {
      title: "Events & Engagement",
      description: "Management events, seminars, cultural participation and community activities across the year.",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">B.B.A. Activities</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Beyond the classroom — events and initiatives that shape confidence, leadership, and professional skills.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <Card key={activity.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-3 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{activity.title}</CardTitle>
                    </div>
                    <CardDescription>{activity.description}</CardDescription>
                  </CardHeader>
                  <CardContent />
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BBAActivities;


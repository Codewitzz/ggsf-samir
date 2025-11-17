import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Trophy, 
  Music, 
  Palette, 
  Dumbbell, 
  Users, 
  BookOpen,
  Globe,
  Heart,
  Lightbulb
} from "lucide-react";

const SchoolActivities = () => {
  const activities = [
    {
      icon: Trophy,
      title: "Sports & Games",
      description: "Annual sports day, inter-house competitions, and participation in district/state level sports events",
      activities: ["Athletics", "Cricket", "Football", "Basketball", "Volleyball", "Badminton", "Table Tennis", "Chess"],
    },
    {
      icon: Music,
      title: "Music & Dance",
      description: "Music and dance classes, annual cultural programs, and participation in various competitions",
      activities: ["Vocal Music", "Instrumental Music", "Classical Dance", "Folk Dance", "Western Dance", "Choir"],
    },
    {
      icon: Palette,
      title: "Art & Craft",
      description: "Art exhibitions, craft workshops, and creative expression activities",
      activities: ["Painting", "Drawing", "Sculpture", "Pottery", "Paper Craft", "Rangoli Making"],
    },
    {
      icon: BookOpen,
      title: "Literary Activities",
      description: "Debate competitions, elocution, essay writing, poetry recitation, and literary festivals",
      activities: ["Debate Club", "Quiz Competitions", "Essay Writing", "Poetry Recitation", "Book Reviews", "Storytelling"],
    },
    {
      icon: Lightbulb,
      title: "Science & Technology",
      description: "Science exhibitions, project competitions, and innovation challenges",
      activities: ["Science Fair", "Project Exhibitions", "Robotics Club", "Computer Club", "Innovation Challenges"],
    },
    {
      icon: Globe,
      title: "Social & Environmental",
      description: "Community service, environmental awareness programs, and social responsibility initiatives",
      activities: ["Tree Plantation", "Cleanliness Drives", "Social Service", "Environmental Awareness", "Health Camps"],
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Health checkups, yoga sessions, and wellness programs",
      activities: ["Health Camps", "Yoga Classes", "Meditation Sessions", "Fitness Programs", "Nutrition Awareness"],
    },
    {
      icon: Users,
      title: "Student Council",
      description: "Student leadership opportunities through various clubs and committees",
      activities: ["Student Council", "Prefect System", "House Captains", "Club Leadership", "Event Organization"],
    },
  ];

  const annualEvents = [
    "Annual Day Celebration",
    "Sports Day",
    "Science Exhibition",
    "Cultural Fest",
    "Independence Day Celebration",
    "Republic Day Celebration",
    "Teachers' Day",
    "Children's Day",
    "Annual Prize Distribution",
    "Graduation Ceremony",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">School Activities</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Holistic development through diverse co-curricular and extra-curricular activities
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
                    <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
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
                    <Trophy className="h-5 w-5 text-primary flex-shrink-0" />
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
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">Enhances creativity and self-expression</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">Develops leadership and teamwork skills</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">Builds confidence and public speaking abilities</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">Promotes physical fitness and healthy lifestyle</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">Fosters social skills and cultural awareness</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
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

export default SchoolActivities;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Rocket } from "lucide-react";

const achievements = [
  {
    title: "Smart India Hackathon Winners",
    description: "Engineering students secured the top prize for an AI-powered rural health monitoring solution.",
    icon: Trophy,
  },
  {
    title: "Global MBA Case Challenge",
    description: "MBA team reached the finals of an international case-study contest hosted by Ivey Business School.",
    icon: Medal,
  },
  {
    title: "Robotics Championship",
    description: "Automation & Robotics students won accolades at ROBOCON for autonomous warehouse bots.",
    icon: Rocket,
  },
];

const StudentAchievements = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Student Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                    <IconComponent className="h-7 w-7 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StudentAchievements;



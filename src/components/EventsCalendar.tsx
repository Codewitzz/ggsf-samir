import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const EventsCalendar = () => {
  const events = [
    {
      title: "Annual Tech Fest 2025",
      date: "March 15-17, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Main Campus Ground",
      category: "Technical",
      description: "A three-day technical fest featuring competitions, workshops, and guest lectures.",
    },
    {
      title: "MBA Leadership Summit",
      date: "April 5, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Auditorium Hall",
      category: "MBA",
      description: "Industry leaders share insights on modern business strategies and leadership.",
    },
    {
      title: "Engineering Workshop Series",
      date: "April 20-22, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Engineering Block",
      category: "Engineering",
      description: "Hands-on workshops on latest technologies including AI, IoT, and Robotics.",
    },
    {
      title: "Engineering Skills Competition",
      date: "May 10, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Engineering Campus",
      category: "Engineering",
      description: "Students showcase their technical skills in various practical competitions.",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technical":
        return "bg-info text-white";
      case "MBA":
        return "bg-warning text-white";
      case "Engineering":
        return "bg-primary text-primary-foreground";
      case "Campus":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted";
    }
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Upcoming Events</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest events, workshops, and academic activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                </div>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{event.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;

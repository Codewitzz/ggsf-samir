import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, GraduationCap, Network, Award, Quote, Mail, Phone, Linkedin } from "lucide-react";

const Alumni = () => {
  const stats = [
    { icon: Users, label: "Alumni Network", value: "5000+" },
    { icon: GraduationCap, label: "Graduates", value: "4000+" },
    { icon: Network, label: "Active Members", value: "1200+" },
    { icon: Award, label: "Success Stories", value: "800+" },
  ];

  const alumniStories = [
    {
      name: "Rahul Parakh",
      role: "Senior Software Engineer, Amazon",
      quote: "The rigorous curriculum and mentorship at GGSF laid the foundation for my career. Industry projects prepared me for real-world challenges.",
      year: "2018",
      department: "Computer Engineering",
    },
    {
      name: "Falguni",
      role: "Project Manager, L&T Construction",
      quote: "Hands-on lab sessions, field visits, and the supportive faculty ensured I was job-ready with strong technical skills.",
      year: "2017",
      department: "Civil Engineering",
    },
    {
      name: "Himalaya Mahajan",
      role: "Entrepreneur, Mechatronics Solutions",
      quote: "Innovation labs and the incubation cell encouraged me to convert my ideas into a successful automation start-up.",
      year: "2019",
      department: "Mechanical Engineering",
    },
    {
      name: "Priya Sharma",
      role: "Data Scientist, Microsoft",
      quote: "The AI & Data Science program provided cutting-edge knowledge and practical experience that directly contributed to my career success.",
      year: "2020",
      department: "AI & Data Science",
    },
  ];

  const alumniBenefits = [
    {
      title: "Networking Opportunities",
      description: "Connect with fellow alumni across industries and build professional relationships.",
    },
    {
      title: "Career Support",
      description: "Access job opportunities, mentorship programs, and career guidance from experienced alumni.",
    },
    {
      title: "Campus Events",
      description: "Attend reunions, workshops, and seminars to stay connected with your alma mater.",
    },
    {
      title: "Give Back",
      description: "Mentor current students, share your expertise, and contribute to the college's growth.",
    },
  ];

  const executiveBody = [
    { name: "Dr. Rajesh Kumar", position: "President", department: "Computer Engineering, 2010" },
    { name: "Ms. Anjali Deshmukh", position: "Vice President", department: "MBA, 2012" },
    { name: "Mr. Vikram Singh", position: "Secretary", department: "Mechanical Engineering, 2011" },
    { name: "Ms. Sneha Patel", position: "Treasurer", department: "Electrical Engineering, 2013" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Alumni Association</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Connecting past, present, and future - Building a strong network of successful professionals
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-primary">{stat.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{stat.label}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Aims & Objectives */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Aims & Objectives</h2>
            <p className="text-muted-foreground">
              Our alumni association is committed to fostering lifelong connections and supporting the college community
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alumni Association Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>To extend help to students for placement and industrial training</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>To act as a bridge between college and industries for interaction on new developments</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>To assist the college to promote R & D activities, testing and consultancy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>To encourage students by awarding prizes to meritorious students in education, sports and cultural activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>To enrich the central library by donating books and subscribing journals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>To extend every possible help to college authorities for overall progress of the institution</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>To organize programmes on personality development, interview techniques, and leadership development</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>To invite past students to guide present students</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>To guide students for competitive examinations</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Alumni Stories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Alumni Voices</h2>
            <p className="text-muted-foreground">
              Success stories from our distinguished alumni across various industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alumniStories.map((alumni, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Quote className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{alumni.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{alumni.role}</p>
                      <p className="text-xs text-primary mt-1">{alumni.department} • Batch {alumni.year}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{alumni.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Benefits */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits of Joining</h2>
            <p className="text-muted-foreground">
              Discover the advantages of being part of our vibrant alumni network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alumniBenefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Body */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Executive Body</h2>
            <p className="text-muted-foreground">
              Meet the dedicated alumni leading our association
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {executiveBody.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-semibold text-primary">{member.position}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.department}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Registration */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Get Involved</CardTitle>
              <CardDescription>
                Join our alumni network and stay connected with your alma mater
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Contact Alumni Association</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    alumni@ggsf.edu.in
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    +91-253-237-3547
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link to="/alumni/register">Register as Alumni</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/alumni/stories">Share Your Story</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/alumni/gallery">View Gallery</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Alumni;

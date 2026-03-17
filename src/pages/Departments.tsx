import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Building, Compass, FlaskConical, GraduationCap, Layers, Rocket, Users } from "lucide-react";

const academicClusters = [
  {
    title: "Engineering & Technology",
    summary: "11 NBA-aligned departments with multidisciplinary innovation centers and industry mentors.",
    programs: ["Computer, IT & AI", "Electronics & Communication", "Mechanical & Automation"],
    icon: Layers,
    href: "/engineering",
  },
  {
    title: "Management & Entrepreneurship",
    summary: "MBA, ME and Management Studies with live cases, venture labs, and CXO mentorship.",
    programs: ["MBA Core & Dual", "Business Analytics Lab", "Entrepreneurship Cell"],
    icon: Building,
    href: "/mba/about",
  },
  {
    title: "Campus Facilities & Infrastructure",
    summary: "State-of-the-art campus facilities including labs, library, canteen, and modern infrastructure.",
    programs: ["Engineering Labs", "Central Library", "Cafeteria", "Modern Classrooms"],
    icon: BookOpen,
    href: "/engineering/facilities",
  },
  {
    title: "Postgraduate & Research",
    summary: "ME, research labs, and doctoral mentorship with funded projects and MoUs.",
    programs: ["Advanced Computing", "Sustainable Engineering", "Applied Sciences"],
    icon: FlaskConical,
    href: "/me/about",
  },
];

const spotlightDepartments = [
  {
    title: "Artificial Intelligence & Data Science",
    description: "Deep learning labs, NVIDIA-powered clusters, and global AI hackathons.",
    href: "/engineering/departments/artificial-intelligence-data-science",
  },
  {
    title: "Automation & Robotics",
    description: "Industry 4.0 training arena with PLC, cobots, and Bosch-Siemens excellence centre.",
    href: "/engineering/departments/automation-robotics",
  },
  {
    title: "Computer Engineering",
    description: "Full-stack, cloud and cybersecurity tracks with AWS Academy & Red Hat partnerships.",
    href: "/engineering/departments/computer-engineering",
  },
  {
    title: "Mechanical Engineering",
    description: "NBA-accredited with CAD/CAM, EV prototyping, and additive manufacturing pods.",
    href: "/engineering/departments/mechanical",
  },
  {
    title: "Electronics & Communication",
    description: "VLSI, 5G communication, and IoT studios backed by global component partners.",
    href: "/engineering/departments/electronics-communication",
  },

  {
    title: "Management Studies",
    description: "Interdisciplinary management programs with analytics lab and startup incubator.",
    href: "/engineering/departments/management-studies",
  },
];

const Departments = () => {
  const sliderImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero with Image Slider */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageSlider 
            images={sliderImages} 
            height="h-[500px]"
            className="rounded-none"
          />
        </div>
        <div className="relative z-10 bg-black/60 py-20 px-4">
          <div className="absolute inset-y-0 right-0 w-1/2 opacity-40 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_60%)]" />
          </div>
          <div className="container mx-auto">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/90">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              Academic Architecture
            </p>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold max-w-3xl text-white">
              Departments that reimagine <span className="text-secondary">future-ready</span> education
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl text-white/90">
              Explore engineering, management, and postgraduate programs connected through shared innovation hubs,
              global accreditations, and experiential learning pathways.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link to="/contact">
                  Meet Academic Advisors
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/60 bg-white/10 text-white hover:bg-white hover:text-primary">
                <Link to="/downloads">Download Prospectus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 gsap-fade">
        <div className="container mx-auto grid gap-6 md:grid-cols-4">
          {[
            { label: "Departments & centers", value: "24", icon: Layers },
            { label: "Industry MoUs", value: "65+", icon: Rocket },
            { label: "Faculty experts", value: "180+", icon: Users },
            { label: "Research labs", value: "28", icon: FlaskConical },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border border-white/40 bg-card/70 backdrop-blur">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* MoU CTA */}
      <section className="py-10 px-4 gsap-fade">
        <div className="container mx-auto">
          <Card className="border border-border/80 bg-card/70 backdrop-blur">
            <CardHeader>
              <CardTitle>Department-wise MoUs</CardTitle>
              <CardDescription>View MoU information in table format (department wise).</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link to="/mou">View MoUs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Clusters */}
      <section className="py-16 px-4 bg-muted/30 gsap-fade">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Academic clusters</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Every cluster is powered by outcome-based curriculum, analytics dashboards, and co-created industry modules.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {academicClusters.map((cluster) => {
              const Icon = cluster.icon;
              return (
                <Card key={cluster.title} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-3 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{cluster.title}</CardTitle>
                    </div>
                    <CardDescription>{cluster.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {cluster.programs.map((program) => (
                        <li key={program} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                          {program}
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" className="self-start px-0 text-primary" asChild>
                      <Link to={cluster.href}>Read more →</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spotlight */}
      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Spotlight</p>
              <h2 className="text-3xl font-bold">Departments in focus</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Browse a few of the most sought-after specialisations. Each link takes you to a detailed department page
                with labs, career pathways, faculty strength, and achievements.
              </p>
            </div>
            <Button asChild>
              <Link to="/engineering/departments/computer-engineering">View engineering map</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {spotlightDepartments.map((dept) => (
              <Card key={dept.title} className="border border-border/80 hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl">{dept.title}</CardTitle>
                  <CardDescription>{dept.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={dept.href}>Visit department</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 px-4 bg-muted/40 gsap-fade">
        <div className="container mx-auto grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Compass,
              title: "Guided pathways",
              description:
                "Personalised roadmaps from foundation to specialization with mentor hours and peer review studios.",
            },
            {
              icon: GraduationCap,
              title: "Global credentials",
              description: "NAAC, NBA tracks plus Coursera, AWS, and Cisco certifications embedded in coursework.",
            },
            {
              icon: Rocket,
              title: "Future labs",
              description: "Research pods in EV, Renewable Tech, XR, and Smart Manufacturing with live grants.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="h-full">
                <CardHeader>
                  <div className="rounded-full bg-secondary/20 p-3 text-secondary-foreground inline-flex mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Departments;


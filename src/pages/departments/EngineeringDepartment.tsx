import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import {
  GraduationCap,
  Users,
  BookOpen,
  Briefcase,
  Award,
  TrendingUp,
  Target,
  Rocket,
  BookMarked,
  Medal,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EngineeringDepartment = () => {
  const { deptName } = useParams<{ deptName: string }>();

  const departmentData: Record<
    string,
    {
      name: string;
      description: string;
      icon: string;
      faculty: string;
      labs: string[];
      career: string[];
      highlights: string[];
      vision?: string;
      mission?: string[];
      achievements?: string[];
      publications?: string[];
      mouPartners?: string[];
    }
  > = {
    "first-year": {
      name: "First Year Engineering",
      description:
        "Building strong foundations in mathematics, physics, chemistry, and basic engineering principles to prepare students for specialized engineering streams.",
      icon: "🎓",
      faculty: "30+ experienced faculty members",
      labs: ["Physics Lab", "Chemistry Lab", "Engineering Graphics Lab", "Workshop Practice Lab", "Computer Programming Lab"],
      career: ["Foundation for all engineering disciplines", "Research Assistant", "Teaching Assistant", "Technical Writer"],
      highlights: [
        "Comprehensive foundation in basic sciences and mathematics",
        "Hands-on experience in engineering workshops",
        "Introduction to computer programming",
        "Engineering graphics and design fundamentals",
        "Strong preparation for specialized branches",
      ],
      vision: "To provide a solid foundation in engineering sciences and prepare students for advanced studies in their chosen specialization.",
      mission: [
        "Impart fundamental knowledge in mathematics, physics, and chemistry.",
        "Develop problem-solving and analytical skills.",
        "Introduce engineering concepts and practices.",
        "Prepare students for specialized engineering branches.",
      ],
      achievements: [
        "Excellent pass percentage in first year examinations.",
        "Strong foundation for advanced engineering courses.",
      ],
      publications: ["Faculty publications in engineering education and pedagogy."],
      mouPartners: [],
    },
    "computer-engineering": {
      name: "Computer Engineering",
      description:
        "Leading the digital revolution with cutting-edge programming, software development, and computer systems expertise.",
      icon: "💻",
      faculty: "25+ experienced faculty members",
      labs: ["Programming Lab", "Database Lab", "Network Lab", "AI/ML Lab", "Cyber Security Lab"],
      career: ["Software Engineer", "Data Scientist", "System Architect", "DevOps Engineer", "Full Stack Developer"],
      highlights: [
        "Industry partnerships with leading tech companies",
        "State-of-the-art computer labs with latest hardware",
        "Active participation in coding competitions",
        "Internship opportunities with top IT firms",
        "Research projects in AI and Machine Learning",
      ],
      vision: "To impart quality technical education and develop industry-ready computing professionals.",
      mission: [
        "Provide strong foundations in computer science and engineering.",
        "Promote research and innovation culture.",
        "Build ethical, employable, and entrepreneurial graduates.",
      ],
      achievements: [
        "Hackathon winners at state and national level.",
        "MoUs with CISCO Networking, AWS Academy, and Red Hat Academy.",
      ],
      publications: ["Faculty publications in reputed journals in AI/ML and Networks."],
      mouPartners: ["CISCO", "AWS Academy", "Microchip", "Red Hat Academy"],
    },
    "electronics-communication": {
      name: "Electronics & Communication Engineering",
      description: "Pioneering communication technologies and electronic systems for the modern world.",
      icon: "📡",
      faculty: "20+ dedicated faculty members",
      labs: ["Electronics Lab", "Communication Lab", "VLSI Lab", "Embedded Systems Lab", "Signal Processing Lab"],
      career: ["Electronics Engineer", "Communication Engineer", "VLSI Designer", "Embedded Systems Engineer", "RF Engineer"],
      highlights: [
        "Modern electronics and communication laboratories",
        "Industry collaborations for research projects",
        "Hands-on training with latest equipment",
        "Placement opportunities in telecom and electronics sectors",
        "Focus on IoT and embedded systems",
      ],
      vision: "To excel in electronics and communication engineering education and research.",
      mission: [
        "Enable hands-on learning with modern E&TC infrastructure.",
        "Collaborate with industry for real-world problem solving.",
      ],
      achievements: ["Established IoT and VLSI training initiatives."],
      publications: ["Papers in signal processing and embedded systems."],
    },
    mechanical: {
      name: "Mechanical Engineering",
      description: "Designing and manufacturing the machines and systems that power our world.",
      icon: "⚙️",
      faculty: "22+ expert faculty members",
      labs: ["CAD/CAM Lab", "Thermodynamics Lab", "Manufacturing Lab", "Automation Lab", "Materials Testing Lab"],
      career: ["Mechanical Engineer", "Design Engineer", "Production Engineer", "Quality Engineer", "Maintenance Engineer"],
      highlights: [
        "Well-equipped workshops and manufacturing labs",
        "Industry-standard CAD/CAM software",
        "Automation and robotics training",
        "Strong placement record in manufacturing sector",
        "Research in sustainable engineering",
      ],
      vision: "To create competent mechanical engineers with strong fundamentals and innovative skills.",
      mission: [
        "Deliver outcome-based education with industry exposure.",
        "Foster research in sustainable manufacturing and design.",
      ],
      achievements: [
        "NBA Accreditation (valid until 2028).",
        "Awards in national level design competitions.",
      ],
      publications: ["Publications in thermal and design domains."],
    },
    civil: {
      name: "Civil Engineering",
      description: "Building the infrastructure that shapes our cities and communities.",
      icon: "🏗️",
      faculty: "18+ qualified faculty members",
      labs: ["Structural Lab", "Concrete Lab", "Surveying Lab", "Geotechnical Lab", "Environmental Lab"],
      career: ["Structural Engineer", "Site Engineer", "Project Manager", "Design Engineer", "Quality Control Engineer"],
      highlights: [
        "Comprehensive civil engineering laboratories",
        "Field visits and site training",
        "Modern surveying and construction equipment",
        "Placement in construction and infrastructure companies",
        "Focus on sustainable construction practices",
      ],
      vision: "To develop civil engineers for sustainable infrastructure.",
      mission: [
        "Strengthen field-focused learning with modern labs.",
        "Promote green construction practices.",
      ],
      achievements: ["Consultancy projects with local industry and government."],
      publications: ["Publications in structural and environmental engineering."],
    },
    electrical: {
      name: "Electrical Engineering",
      description: "Powering the future with electrical systems and renewable energy solutions.",
      icon: "⚡",
      faculty: "20+ experienced faculty members",
      labs: ["Power Systems Lab", "Control Systems Lab", "Electrical Machines Lab", "Renewable Energy Lab", "PLC Lab"],
      career: ["Electrical Engineer", "Power Systems Engineer", "Control Engineer", "Renewable Energy Engineer", "Maintenance Engineer"],
      highlights: [
        "Advanced electrical engineering laboratories",
        "Training in renewable energy systems",
        "Industry partnerships with power companies",
        "Focus on smart grid and automation",
        "Excellent placement opportunities",
      ],
      vision: "To empower students with electrical engineering excellence.",
      mission: [
        "Hands-on training with power and control labs.",
        "Focus on renewable energy systems.",
      ],
      achievements: ["Smart grid and automation student projects recognized."],
      publications: ["Publications in power systems and control."],
    },
    "information-technology": {
      name: "Information Technology",
      description: "Transforming businesses through innovative IT solutions and digital technologies.",
      icon: "🌐",
      faculty: "23+ skilled faculty members",
      labs: ["Web Development Lab", "Cloud Computing Lab", "Mobile App Lab", "Network Security Lab", "Data Analytics Lab"],
      career: ["IT Consultant", "Network Administrator", "Cloud Architect", "IT Project Manager", "Cybersecurity Specialist"],
      highlights: [
        "Modern IT infrastructure and labs",
        "Cloud computing and virtualization training",
        "Cybersecurity and ethical hacking courses",
        "Industry collaborations for live projects",
        "Strong placement support in IT sector",
      ],
      vision: "To nurture professionals in information technology for digital transformation.",
      mission: [
        "Provide exposure to cloud, cybersecurity, and data analytics.",
        "Enable industry certifications and internships.",
      ],
      achievements: ["Student placements in leading IT companies."],
      publications: ["Publications in cloud computing and cybersecurity."],
    },
    "basic-engineering-science": {
      name: "Basic Engineering Science",
      description:
        "Foundation of engineering principles covering mathematics, physics, chemistry, and basic engineering concepts.",
      icon: "📚",
      faculty: "15+ experienced faculty members",
      labs: ["Physics Lab", "Chemistry Lab", "Mathematics Lab", "Engineering Graphics Lab", "Workshop Practice Lab"],
      career: ["Foundation for all engineering disciplines", "Research Assistant", "Teaching Assistant", "Technical Writer"],
      highlights: [
        "Strong foundation in basic sciences",
        "Well-equipped laboratories for practical learning",
        "Experienced faculty with strong academic background",
        "Focus on building fundamental engineering concepts",
        "Support for all engineering departments",
      ],
      vision: "To build strong foundations across engineering sciences.",
      mission: ["Provide robust lab-based learning in sciences and graphics."],
    },
    "artificial-intelligence-data-science": {
      name: "Artificial Intelligence & Data Science",
      description: "Cutting-edge program in AI, machine learning, and data science to prepare students for the future of technology.",
      icon: "🤖",
      faculty: "18+ AI and Data Science experts",
      labs: ["AI/ML Lab", "Data Science Lab", "Deep Learning Lab", "Big Data Lab", "Computer Vision Lab"],
      career: ["AI Engineer", "Data Scientist", "ML Engineer", "Data Analyst", "AI Researcher", "Business Intelligence Analyst"],
      highlights: [
        "State-of-the-art AI and ML laboratories",
        "Industry partnerships with tech companies",
        "Hands-on projects in AI and data science",
        "Certification programs in AI/ML",
        "Strong placement in AI and data science roles",
      ],
      vision: "To shape AI & DS graduates for cutting-edge technology roles.",
      mission: [
        "Enable project-based learning in AI/ML.",
        "Partner with industry for certifications and internships.",
      ],
      achievements: ["Appreciation Certificate from E-Yantra; active AI projects."],
      publications: ["Papers in deep learning and computer vision."],
      mouPartners: ["Industry partners for AI/ML projects"],
    },
    "automation-robotics": {
      name: "Automation & Robotics",
      description: "Pioneering automation technologies and robotics systems for Industry 4.0 and smart manufacturing.",
      icon: "🤖",
      faculty: "16+ automation and robotics specialists",
      labs: ["Robotics Lab", "Automation Lab", "PLC Lab", "Mechatronics Lab", "Industrial Automation Lab"],
      career: ["Robotics Engineer", "Automation Engineer", "Control Systems Engineer", "PLC Programmer", "Mechatronics Engineer"],
      highlights: [
        "Modern robotics and automation laboratories",
        "Industry 4.0 training and workshops",
        "Partnerships with automation companies",
        "Hands-on training with industrial robots",
        "Excellent placement in automation sector",
      ],
      vision: "To advance automation technologies for Industry 4.0.",
      mission: [
        "Provide training in robotics, PLC, and mechatronics.",
        "Collaborate with Siemens, Bosch etc.",
      ],
      achievements: ["Workshops and training aligned with Industry 4.0."],
      publications: ["Applied research in robotics and automation."],
    },
    "management-studies": {
      name: "Management Studies (MBA, BBA)",
      description: "Comprehensive management education preparing future business leaders and entrepreneurs.",
      icon: "💼",
      faculty: "20+ management faculty and industry experts",
      labs: ["Business Analytics Lab", "Finance Lab", "Marketing Lab", "HR Lab", "Case Study Room"],
      career: ["Business Manager", "Marketing Manager", "HR Manager", "Financial Analyst", "Operations Manager", "Entrepreneur"],
      highlights: [
        "Industry-aligned curriculum",
        "Guest lectures from business leaders",
        "Live projects and internships",
        "Strong placement in corporate sector",
        "Entrepreneurship development programs",
      ],
      vision: "To prepare future business leaders with ethical and entrepreneurial mindset.",
      mission: ["Deliver industry-aligned curriculum with live projects."],
      achievements: ["Strong placements and entrepreneurship initiatives."],
      publications: ["Case studies and business research publications."],
    },
    "post-graduate": {
      name: "Post Graduate Program (M.E.)",
      description: "Advanced engineering education and research opportunities for postgraduate students.",
      icon: "🎓",
      faculty: "25+ research-oriented faculty members",
      labs: ["Research Lab", "Advanced Computing Lab", "Specialized Department Labs"],
      career: ["Research Engineer", "R&D Specialist", "Senior Engineer", "Research Scholar", "Technical Consultant"],
      highlights: [
        "Advanced research facilities",
        "Industry-sponsored research projects",
        "Publication opportunities",
        "Ph.D. preparation",
        "Strong research and development focus",
      ],
      vision: "To promote advanced engineering education and research.",
      mission: ["Enable industry-sponsored research and publications."],
      achievements: ["Research publications and funded projects."],
      publications: ["Journal and conference publications by PG scholars."],
    },
  };

  const dept = departmentData[deptName || ""];

  if (!dept) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Breadcrumbs />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Department Not Found</h1>
          <p className="text-muted-foreground">The requested department page does not exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-info to-primary text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="text-6xl mb-6">{dept.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{dept.name}</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">{dept.description}</p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-6xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Department Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5 text-info" />
                  Faculty
                </h3>
                <p className="text-muted-foreground">{dept.faculty}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-info" />
                  Description
                </h3>
                <p className="text-muted-foreground">{dept.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Laboratories */}
      <section className="py-16 px-4 bg-muted/30 gsap-fade">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Laboratories & Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dept.labs.map((lab, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <p className="font-medium text-foreground">{lab}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
            <Briefcase className="h-8 w-8 text-info" />
            Career Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dept.career.map((career, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <p className="font-medium text-foreground">{career}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 px-4 bg-muted/30 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Award className="h-6 w-6 text-info" />
                Key Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {dept.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Program Details + Tabs */}
      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-info" />
                Program Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Duration</h3>
                <p className="text-muted-foreground">4 Years (8 Semesters)</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Degree Awarded</h3>
                <p className="text-muted-foreground">Bachelor of Engineering (B.E.) in {dept.name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Eligibility</h3>
                <p className="text-muted-foreground">
                  10+2 with Physics, Chemistry, and Mathematics. Valid JEE Main or state entrance exam scores required.
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="about">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="vision">Vision & Mission</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="mou">MoU</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookMarked className="h-5 w-5 text-info" />
                    About Department
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{dept.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="vision">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Target className="h-5 w-5 text-info" />
                    Vision & Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dept.vision ? <p className="text-foreground font-medium">Vision: {dept.vision}</p> : null}
                  {dept.mission ? (
                    <div>
                      <p className="font-medium mb-2">Mission</p>
                      <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                        {dept.mission.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Medal className="h-5 w-5 text-info" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {(dept.achievements || ["Recent achievements will be updated."]).map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="publications">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-info" />
                    Publications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {(dept.publications || ["Department publications will be listed here."]).map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="mou">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-info" />
                    Memorandum of Understanding (MoU)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {(dept.mouPartners || ["MoU partners will be updated."]).map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EngineeringDepartment;



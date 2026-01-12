import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 5000;

const EngineeringDepartment = () => {
  const { deptName } = useParams<{ deptName: string }>();

  interface FacultyMember {
    name: string;
    image?: string;
    qualifications: string;
    experience: string;
    areaOfInterest: string;
  }

  const departmentData: Record<
    string,
    {
      name: string;
      description: string;
      icon: string;
      faculty: string;
      facultyMembers?: FacultyMember[];
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
      facultyMembers: [
        {
          name: "Dr. Arvind Tiwari",
          image: "/faculty/arvind-tiwari.jpg",
          qualifications: "Ph.D. in Computer Science, M.Tech in Computer Engineering",
          experience: "16+ years",
          areaOfInterest: "Computer Networks, Distributed Systems, Cloud Computing",
        },
        {
          name: "Prof. Sneha Reddy",
          image: "/faculty/sneha-reddy.jpg",
          qualifications: "M.Tech in Software Engineering, B.E. Computer",
          experience: "12+ years",
          areaOfInterest: "Software Engineering, Web Technologies, Database Systems",
        },
        {
          name: "Prof. Karan Malhotra",
          image: "/faculty/karan-malhotra.jpg",
          qualifications: "M.Tech in Network Security, B.E. Computer",
          experience: "10+ years",
          areaOfInterest: "Cyber Security, Network Protocols, Information Security",
        },
        {
          name: "Prof. Divya Nair",
          image: "/faculty/divya-nair.jpg",
          qualifications: "M.Tech in Data Science, B.E. Computer",
          experience: "9+ years",
          areaOfInterest: "Data Analytics, Machine Learning, Big Data",
        },
        {
          name: "Prof. Aditya Rao",
          image: "/faculty/aditya-rao.jpg",
          qualifications: "M.Tech in Cloud Computing, B.E. Computer",
          experience: "8+ years",
          areaOfInterest: "Cloud Architecture, DevOps, Virtualization",
        },
      ],
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
      facultyMembers: [
        {
          name: "Dr. Neelkanth G Nikam",
          image: "/faculty/neelkanth-nikam.jpg",
          qualifications: "Ph.D. in Mechanical Engineering, M.Tech in Thermal Engineering",
          experience: "20+ years",
          areaOfInterest: "Thermal Engineering, Heat Transfer, Energy Systems",
        },
        {
          name: "Prof. Rahul Patel",
          image: "/faculty/rahul-patel.jpg",
          qualifications: "M.Tech in CAD/CAM, B.E. Mechanical",
          experience: "14+ years",
          areaOfInterest: "CAD/CAM, Product Design, Finite Element Analysis",
        },
        {
          name: "Prof. Sunita Verma",
          image: "/faculty/sunita-verma.jpg",
          qualifications: "M.Tech in Manufacturing Engineering, B.E. Mechanical",
          experience: "12+ years",
          areaOfInterest: "Manufacturing Processes, Quality Control, Industrial Engineering",
        },
        {
          name: "Prof. Amit Kumar",
          image: "/faculty/amit-kumar.jpg",
          qualifications: "M.Tech in Industrial Engineering, B.E. Mechanical",
          experience: "10+ years",
          areaOfInterest: "Operations Research, Production Planning, Supply Chain Management",
        },
        {
          name: "Prof. Kavita Nair",
          image: "/faculty/kavita-nair.jpg",
          qualifications: "M.Tech in Design Engineering, B.E. Mechanical",
          experience: "9+ years",
          areaOfInterest: "Machine Design, Material Science, Stress Analysis",
        },
      ],
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
      facultyMembers: [
        {
          name: "Dr. Rajesh Kumar",
          image: "/faculty/rajesh-kumar.jpg",
          qualifications: "Ph.D. in Structural Engineering, M.Tech in Civil Engineering",
          experience: "15+ years",
          areaOfInterest: "Structural Analysis, Reinforced Concrete Design, Seismic Engineering",
        },
        {
          name: "Prof. Anjali Desai",
          image: "/faculty/anjali-desai.jpg",
          qualifications: "M.Tech in Environmental Engineering, B.E. Civil",
          experience: "12+ years",
          areaOfInterest: "Environmental Engineering, Water Treatment, Waste Management",
        },
        {
          name: "Prof. Vikram Singh",
          image: "/faculty/vikram-singh.jpg",
          qualifications: "M.Tech in Geotechnical Engineering, B.E. Civil",
          experience: "10+ years",
          areaOfInterest: "Soil Mechanics, Foundation Engineering, Slope Stability",
        },
        {
          name: "Prof. Priya Sharma",
          image: "/faculty/priya-sharma.jpg",
          qualifications: "M.Tech in Construction Management, B.E. Civil",
          experience: "8+ years",
          areaOfInterest: "Project Management, Construction Planning, Building Materials",
        },
        {
          name: "Prof. Sunil Mehta",
          image: "/faculty/sunil-mehta.jpg",
          qualifications: "M.Tech in Transportation Engineering, B.E. Civil",
          experience: "9+ years",
          areaOfInterest: "Highway Engineering, Traffic Engineering, Pavement Design",
        },
      ],
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
      facultyMembers: [
        {
          name: "Dr. Sanjay Mehta",
          image: "/faculty/sanjay-mehta.jpg",
          qualifications: "Ph.D. in Power Systems, M.Tech in Electrical Engineering",
          experience: "18+ years",
          areaOfInterest: "Power Systems, Smart Grid, Electrical Machines",
        },
        {
          name: "Prof. Deepak Shah",
          image: "/faculty/deepak-shah.jpg",
          qualifications: "M.Tech in Control Systems, B.E. Electrical",
          experience: "13+ years",
          areaOfInterest: "Control Systems, Automation, PLC Programming",
        },
        {
          name: "Prof. Meera Joshi",
          image: "/faculty/meera-joshi.jpg",
          qualifications: "M.Tech in Renewable Energy, B.E. Electrical",
          experience: "11+ years",
          areaOfInterest: "Renewable Energy Systems, Solar Power, Wind Energy",
        },
        {
          name: "Prof. Ramesh Iyer",
          image: "/faculty/ramesh-iyer.jpg",
          qualifications: "M.Tech in Power Electronics, B.E. Electrical",
          experience: "9+ years",
          areaOfInterest: "Power Electronics, Drives, Converters",
        },
        {
          name: "Prof. Nisha Reddy",
          image: "/faculty/nisha-reddy.jpg",
          qualifications: "M.Tech in Electrical Machines, B.E. Electrical",
          experience: "8+ years",
          areaOfInterest: "Electrical Machines, Motor Control, Transformers",
        },
      ],
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
      facultyMembers: [
        {
          name: "Dr. Umakant D Butkar (HOD)",
          image: "public/faculty/umakant-butkar.jpg",
          qualifications: "Ph.D. in Physics, M.Sc. Physics, B.Ed",
          experience: "16+ years",
          areaOfInterest: "Computer Network",
        },
        {
          name: "Prof.  Kushdip Kucheriya",
          image: "public/faculty/kushdip-kucheriya.jpg",
          qualifications: "M.Sc. Maths.SET",
          experience: "6+ years",
          areaOfInterest: "Applied Mathematics, Numerical Methods, Engineering Mathematics",
        },
        {
          name: "Prof. Manisha A Sonawane",
          image: "public/faculty/manisha-sonawane.jpg",
          qualifications: "M.Sc. B.Ed(SET),PhD (Pursuing)",
          experience: "13+ years",
          areaOfInterest: " Organic Chemistry",
        },
        {
          name: "Prof. Farhat J Shaikh",
          image: "public/faculty/farhat-shaikh.png",
          qualifications: "MSc(Maths), SET , PET, B.Ed. Ph.D Pursuing",
          experience: "6+ years",
          areaOfInterest: "Mathematics",
        },
      {
          name: "Prof. Vimal S Bodke",
          image: "public/faculty/vimal-bodke.jpeg",
          qualifications: "ME (E & TC)",
          experience: "12+ years",
          areaOfInterest: "VLSI & Embedded System",
        },
      {
          name: "Prof.Ms. Arjita K Srivastava",
          image: "public/faculty/arjita-srivastava.jpg",
          qualifications: "M.sc Physics",
          experience: "7+ years",
          areaOfInterest: "Physics",
        },
      {
          name: "Dr. Megha K Kothawade",
          image: "public/faculty/megha-kothawade.png",
          qualifications: "Ph. D (Mathematics)",
          experience: "13+ years",
          areaOfInterest: "Real Analysis",
        },
      {
          name: "Prof. Rupali B Bhusare",
          image: "public/faculty/rupali-bhusare.jpg",
          qualifications: "M.Sc. Physics B.Ed. SET",
          experience: "12+ years",
          areaOfInterest: "physics",
        },
      {
          name: "Prof. Ms.Pranita S Bhosale",
          image: "public/faculty/pranita-bhosale.jpg",
          qualifications: "M.S.C Mathematics",
          experience: "2+ years",
          areaOfInterest: "Mathematics and Computing ",
        },
      {
          name: "Prof. Pooja K Borade",
          image: "public/faculty/pooja-borade.png",
          qualifications: "BSc. Chemistry ",
          experience: "3+ years",
          areaOfInterest: "Chemistry",
        },
      {
          name: "Prof.  Kalyani Dattatray Gholap",
          image: "public/faculty/kalyani-gholap.jpg",
          qualifications: "Bsc Comp Science",
          experience: "2+ years",
          areaOfInterest: "Computer",
        },
      {
          name: "Prof.Mr.Abhijit Sharma",
          image: "public/faculty/abhijit-sharma.jpg",
          qualifications: "M.Com",
          experience: "2+ years",
          areaOfInterest: "Computer science",
        },      ],
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
      facultyMembers: [
        {
          name: "Dr. Manoj Agarwal",
          image: "/faculty/manoj-agarwal.jpg",
          qualifications: "Ph.D. in Machine Learning, M.Tech in Computer Science",
          experience: "15+ years",
          areaOfInterest: "Machine Learning, Deep Learning, Neural Networks",
        },
        {
          name: "Prof. Swati Kulkarni",
          image: "/faculty/swati-kulkarni.jpg",
          qualifications: "M.Tech in Artificial Intelligence, B.E. Computer",
          experience: "11+ years",
          areaOfInterest: "Artificial Intelligence, Expert Systems, Knowledge Representation",
        },
        {
          name: "Prof. Rohit Deshmukh",
          image: "/faculty/rohit-deshmukh.jpg",
          qualifications: "M.Tech in Data Science, B.E. Computer",
          experience: "9+ years",
          areaOfInterest: "Data Science, Data Mining, Predictive Analytics",
        },
        {
          name: "Prof. Neha Gupta",
          image: "/faculty/neha-gupta.jpg",
          qualifications: "M.Tech in Deep Learning, B.E. Computer",
          experience: "8+ years",
          areaOfInterest: "Deep Learning, Computer Vision, Pattern Recognition",
        },
        {
          name: "Prof. Varun Pillai",
          image: "/faculty/varun-pillai-ai.jpg",
          qualifications: "M.Tech in Natural Language Processing, B.E. Computer",
          experience: "7+ years",
          areaOfInterest: "Natural Language Processing, Text Mining, Chatbots",
        },
      ],
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
      facultyMembers: [
        {
          name: "Dr. Pradeep Menon",
          image: "/faculty/pradeep-menon.jpg",
          qualifications: "Ph.D. in Robotics, M.Tech in Automation",
          experience: "14+ years",
          areaOfInterest: "Industrial Robotics, Automation Systems, Robot Control",
        },
        {
          name: "Prof. Kiran Shetty",
          image: "/faculty/kiran-shetty.jpg",
          qualifications: "M.Tech in Industrial Automation, B.E. Mechanical",
          experience: "11+ years",
          areaOfInterest: "PLC Programming, SCADA Systems, Industrial Automation",
        },
        {
          name: "Prof. Varun Pillai",
          image: "/faculty/varun-pillai-robotics.jpg",
          qualifications: "M.Tech in Mechatronics, B.E. Mechanical",
          experience: "9+ years",
          areaOfInterest: "Mechatronics, Embedded Systems, Sensor Integration",
        },
        {
          name: "Prof. Aishwarya Nair",
          image: "/faculty/aishwarya-nair.jpg",
          qualifications: "M.Tech in Robotics Engineering, B.E. Mechanical",
          experience: "8+ years",
          areaOfInterest: "Robot Kinematics, Path Planning, Human-Robot Interaction",
        },
      ],
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
    "me-computer-engineering-ai-ds": {
      name: "ME - Computer Engineering (AI & DS)",
      description:
        "Advanced postgraduate program focused on artificial intelligence, machine learning, big data engineering, and MLOps for research and industry innovation.",
      icon: "🧠",
      faculty: "10+ research-oriented faculty and industry mentors",
      labs: ["AI/ML Research Lab", "Big Data & Cloud Lab", "Deep Learning Lab", "Cyber Security Lab", "High Performance Computing Lab"],
      career: ["Data Scientist", "AI/ML Engineer", "Research Engineer", "MLOps Engineer", "Solution Architect", "Academic/Research Scholar"],
      highlights: [
        "NVIDIA-powered compute clusters for deep learning",
        "Industry projects with real datasets and publication mentorship",
        "Advanced coursework in MLOps, big data pipelines, and generative AI",
        "Hackathons, Kaggle-style competitions, and research paper writing support",
        "Collaborations with tech partners for certifications and internships",
      ],
      vision: "To develop AI leaders with strong research capabilities and industry readiness.",
      mission: [
        "Deliver rigorous AI/ML curriculum aligned with industry needs.",
        "Enable research publications and patents in data science and AI.",
        "Provide experiential learning through real-world datasets and cloud platforms.",
      ],
      achievements: ["Student papers in reputed AI/ML conferences; winning teams in hackathons."],
      publications: ["Faculty and student publications in deep learning, NLP, and data engineering."],
      mouPartners: ["CISCO", "AWS Academy", "Red Hat Academy", "Industry AI partners"],
    },
    "me-mechanical-engineering-automation-robotics": {
      name: "ME - Mechanical Engineering (Automation and Robotics)",
      description:
        "Postgraduate specialization integrating mechanical systems with robotics, mechatronics, advanced controls, and Industry 4.0 automation.",
      icon: "🏭",
      faculty: "12+ experts in robotics, mechatronics, and automation",
      labs: ["Robotics & Mechatronics Lab", "Automation & PLC/SCADA Lab", "Advanced Manufacturing Lab", "CAD/CAM & Simulation Lab", "Smart Factory Lab"],
      career: [
        "Robotics Engineer",
        "Automation Specialist",
        "Mechatronics Engineer",
        "Controls Engineer",
        "Industrial R&D Engineer",
        "Manufacturing Systems Engineer",
      ],
      highlights: [
        "Hands-on training with industrial robots, cobots, and PLC/SCADA systems",
        "Digital twin and smart factory simulations for Industry 4.0",
        "Projects in predictive maintenance, advanced controls, and machine vision",
        "Collaborations with automation OEMs for certifications and internships",
        "Focus on sustainable and efficient manufacturing automation",
      ],
      vision: "To create automation and robotics specialists who can lead smart manufacturing initiatives.",
      mission: [
        "Blend mechanical engineering fundamentals with modern robotics and automation.",
        "Provide lab-intensive learning with industrial-grade equipment.",
        "Promote research and innovation in smart factories and intelligent systems.",
      ],
      achievements: ["Student projects showcased in Industry 4.0 exhibitions; consultancy mini-projects with local industry."],
      publications: ["Research outputs in automation, robotics, and smart manufacturing domains."],
      mouPartners: ["Bosch", "Siemens", "Industry robotics partners"],
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

  const heroSlides = useMemo(
    () => [
      {
        id: "dept-labs",
        title: "Advanced Laboratories",
        description: `State-of-the-art labs and facilities for ${dept?.name || "engineering"} students`,
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "dept-research",
        title: "Research & Innovation",
        description: `Cutting-edge research and innovation in ${dept?.name || "engineering"} domain`,
        image: "https://images.unsplash.com/photo-1532619675605-1ede6c7edf47?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "dept-industry",
        title: "Industry Connections",
        description: `Strong industry partnerships for projects and placements in ${dept?.name || "engineering"}`,
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "dept-learning",
        title: "Experiential Learning",
        description: `Hands-on learning and practical experience in ${dept?.name || "engineering"} field`,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    [dept],
  );

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!dept) return;
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => {
      window.clearInterval(interval);
    };
  }, [heroSlides.length, dept]);

  // Helper function to get initials from name
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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

      {/* Hero Section with Image Slider */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-info to-primary">
        {/* Background Slider */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex h-full w-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {heroSlides.map((slide) => (
              <div key={slide.id} className="relative h-full w-full flex-shrink-0">
                <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
              </div>
            ))}
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-info/80 via-primary/80 to-info/80 mix-blend-multiply" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="text-6xl mb-6">{dept.icon}</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{dept.name}</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 mb-2">
              {heroSlides[activeSlide].title}
            </p>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/80">
              {heroSlides[activeSlide].description}
            </p>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === activeSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
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

      {/* Faculty Members */}
      {dept.facultyMembers && dept.facultyMembers.length > 0 && (
        <section className="py-16 px-4 bg-muted/30 gsap-fade">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-2">Our Faculty</h2>
              <div className="h-1 w-24 bg-info rounded-full mx-auto"></div>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Meet our experienced and dedicated faculty members who bring industry expertise and academic excellence to
                the classroom.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dept.facultyMembers.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:border-info/50">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-28 w-28 mb-4 border-4 border-info/20">
                        <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="bg-info/10 text-info text-xl font-semibold">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-lg font-semibold mb-2">{member.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-info mb-1">QUALIFICATIONS</p>
                      <p className="text-sm text-muted-foreground">{member.qualifications}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-info mb-1">EXPERIENCE</p>
                      <p className="text-sm text-muted-foreground">{member.experience}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-info mb-1">AREA OF INTEREST</p>
                      <p className="text-sm text-muted-foreground">{member.areaOfInterest}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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



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
import MBA from "@/pages/MBA";

const SLIDE_DURATION = 5000;

const EngineeringDepartment = () => {
  const { deptName } = useParams<{ deptName: string }>();

  // If management-studies, render the MBA component
  if (deptName === "management-studies") {
    return <MBA />;
  }

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
          name: "Dr . Nita M. Thakare (HOD) ",
          image: "/Faculty/Nita-thakare.jpg",
          qualifications: "PhD (CSE)",
          experience: "29+ years",
          areaOfInterest: "  Data Structures , OOP, Machine Learning",
        },
       
        {
          name: "Prof. Sandeep G Shukla (HOD) ",
          image: "/Faculty/sandip-shukla.jpg",
          qualifications: "M.Tech I.T. , PhD (Pursuing)",
          experience: "17+ years",
          areaOfInterest: " Cloud Computing",
        },
        {
          name: "Prof. Pradnya K Bachhav",
          image: "/Faculty/pradnya-bachhav.jpg",
          qualifications: "M.E. Computer , PhD (Pursuing)",
          experience: "14+ years",
          areaOfInterest: "Cloud Computing, Networking, Artificial Intelligence",
        },
        {
          name: "Prof.Pramod C Patil",
          image: "/Faculty/promod-patil.jpg",
          qualifications: "M. E. Software Engineering , PhD (Pursuing)",
          experience: "16+ years",
          areaOfInterest: "Data mining",
        },
        {
          name: "Prof. Piyush R Kulkarni",
          image: "/Faculty/piyush-kulkarni.jpg",
          qualifications: "M.Tech CSE , PhD (Pursuing)",
          experience: "12+ years",
          areaOfInterest: "Data Mining, Web Development",
        },
        {
          name: "Dr. Sweety G Jachak",
          image: "/Faculty/sweety-jachak.png",
          qualifications: "PhD , M.Tech CSE",
          experience: "16+ years",
          areaOfInterest: "Cloud computing, distributed systems, deep learning",
        },
        {
          name: "Prof .  Shyamrao A Gade",
          image: "/Faculty/shyamrao-gade.jpg",
          qualifications: "M.E.Computer , PhD (Pursuing)",
          experience: "15+ years",
          areaOfInterest: "Web Development ,Software Testing",
        },
        {
          name: "Prof . Manish P Gangawane",
          image: "/Faculty/Manish-gangawane.jpg",
          qualifications: "M.E. I. T. ,PhD (Pursuing)",
          experience: "14+ years",
          areaOfInterest: "",
        },
        {
          name: "Prof. Akshay R Jain",
          image: "/Faculty/akshay-jain.jpg",
          qualifications: "M Tech CSE, PhD (Pursuing)",
          experience: "12 years",
          areaOfInterest: "Design and Analysis of Algorithm,Computer Network",
        },
        {
          name: "Prof. Farhat A Patel",
          image: "/Faculty/farhat-patel.png",
          qualifications: "M.E. Computer , PhD (Pursuing)",
          experience: "12 years",
          areaOfInterest: "Image Processing",
        },
        {
          name: "Prof. Nilam M Deshmukh",
          image: "/Faculty/nilam-deshmukh.jpg",
          qualifications: "M.E. Computer",
          experience: "6 years",
          areaOfInterest: "Cloud computing",
        },
        {
          name: "Prof. Ajit R Pagar",
          image: "/Faculty/ajit-pagar.png",
          qualifications: "M.E. Computer",
          experience: "11 years",
          areaOfInterest: "Cloud Computing",
        },
        {
          name: "Prof. Riya R Chinchwadkar",
          image: "public/Faculty/riya-chinchwadkar.png",
          qualifications: "M.E. Computer",
          experience: "8 Years",
          areaOfInterest: "Machin Learning",
        },
        {
          name: "Prof. Swati R Khokale",
          image: "/Faculty/swati-ghokhle.jpeg",
          qualifications: "M.E. Computer , PhD (Pursuing)",
          experience: "14 years",
          areaOfInterest: "Machin Learning",
        },
        {
          name: "Prof. Gauri M Puranik",
          image: "/Faculty/gauri-puranik.jpeg",
          qualifications: "M.E. Computer",
          experience: "10 years",
          areaOfInterest: "Cloud Computing, Big Data",
        },
        {
          name: "Prof. Bharti P Ahuja",
          image: "/Faculty/bharti-ahuja.jpg",
          qualifications: "M.E. Computer",
          experience: "13 Years",
          areaOfInterest: "Data Science",
        },
        {
          name: "Prof. Sharada N Jundre",
          image: "/Faculty/sharda-jundre.png",
          qualifications: "M. E. Computer",
          experience: "6 years",
          areaOfInterest: "Machine Learning",
        },
        {
          name: "Prof.Priyanka M Salunke",
          image: "/Faculty/priyanka-salunke.png",
          qualifications: "M E Computer",
          experience: "9 years",
          areaOfInterest: "Cloud Computing",
        },
        {
          name: "Prof. Akshata V Dighe",
          image: "/Faculty/akshata-dighe.jpeg",
          qualifications: "M.Tech. COMPUTER",
          experience: "12 years",
          areaOfInterest: "Natural Language Processing",
        },
        {
          name: "Prof . Pradnya A Shirsath",
          image: "/Faculty/pradnya-shirsath.jpeg",
          qualifications: "M.Tech (Computer Science and Engineering)",
          experience: "6 years",
          areaOfInterest: "Data Mining",
        },
        {
          name: "Prof. Roshani S Patil",
          image: "/Faculty/roshani-patil.jpeg",
          qualifications: "M.sc (Computer science)",
          experience: "1 year, Industry : 3 years",
          areaOfInterest: "Computer Science",
        },
        {
          name: "Prof. Vilas R Kuyate",
          image: "/Faculty/vilas-kuyate.jpg",
          qualifications: "D.C.E. and Hardware Networking",
          experience: "13 years",
          areaOfInterest: "Hardware ,Networking",
        },
        {
          name: "Prof. Sushma R Gore",
          image: "/Faculty/sushma-gore.jpg",
          qualifications: "B.E. Computer, D.C.E.",
          experience: "13 Years",
          areaOfInterest: "Software Installation &Testing",
        },
        {
          name: "Prof. Amol Ugale",
          image: "/Faculty/amol-ugale.png",
          qualifications: "Diploma in Computer",
          experience: "8 Years",
          areaOfInterest: "Networking",
        },
        {
          name: "Prof. Kunal Londhe",
          image: "/Faculty/kunal-londhe.jpg",
          qualifications: "Diploma in E & TC",
          experience: "4 Years",
          areaOfInterest: "Software Installation &Testing",
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
          name: "Prof. Dr C D Mohod (HOD)",
          image: "public/Faculty/c-d-mohod.jpg",
          qualifications: "PhD, M.E (Production Engineering)",
          experience: "31 years",
          areaOfInterest: "Production",
        },
        {
          name: "Prof. Sandip S Patil",
          image: "public/Faculty/sandip-patil.jpg",
          qualifications: "M.E. Production, PhD (Pursuing)",
          experience: "17 years",
          areaOfInterest: "Production",
        },
        {
          name: "Dr. M S Patil",
          image: "public/Faculty/m-s-patil.jpg",
          qualifications: "PhD, M.Tech (Thermal and Fluids Engineering)",
          experience: "29 years",
          areaOfInterest: "Thermal & Fluids Engineering",
        },
        {
          name: "Prof. S H Kondo",
          image: "public/Faculty/s-h-kondo.jpg",
          qualifications: "M.E (Design)",
          experience: "17 years",
          areaOfInterest: "Design",
        },
        {
          name: "Dr. V B Sarode",
          image: "public/Faculty/v-b-sarode.jpg",
          qualifications: "PhD, M.E (Design)",
          experience: "25 years",
          areaOfInterest: "Design",
        },
        {
          name: "Prof. V J Dhore",
          image: "public/Faculty/v-j-dhore.jpg",
          qualifications: "M.E (CAAD), PhD (Pursuing)",
          experience: "16 years",
          areaOfInterest: "CAAD, Mechanical Design, Engineering Metallurgy",
        },
        {
          name: "Prof. K V Dhande",
          image: "public/Faculty/k-v-dhande.jpg",
          qualifications: "M.E.(Design), PhD (Pursuing)",
          experience: "15 years",
          areaOfInterest: "Design",
        },
        {
          name: "Prof. D D Patil",
          image: "public/Faculty/d-d-patil.jpg",
          qualifications: "M.E (Production Technology & Management)",
          experience: "18 years",
          areaOfInterest: "Production Technology, Manufacturing Processes & 3D Modelling",
        },
        {
          name: "Prof. R S Khandare",
          image: "public/Faculty/r-s-khandare.jpg",
          qualifications: "M.E (Design)",
          experience: "16 years",
          areaOfInterest: "Design",
        },
        {
          name: "Prof. D P Chavan",
          image: "public/Faculty/d-p-chavan.jpg",
          qualifications: "M.E (Design)",
          experience: "16 years",
          areaOfInterest: "Design",
        },
        {
          name: "Prof. V S Gawali",
          image: "public/Faculty/v-s-gawali.jpg",
          qualifications: "M.E (CAD/CAM), PhD (Pursuing)",
          experience: "14 years",
          areaOfInterest: "CAD/CAM",
        },
        {
          name: "Prof. Parag Desale",
          image: "public/Faculty/parag-desale.jpg",
          qualifications: "M.E. (Heat Power)",
          experience: "16 years",
          areaOfInterest: "Thermal Engineering",
        },
        {
          name: "Prof . Kiran Rajendra Sonawane",
          image: "public/Faculty/kiran-sonawane.jpg",
          qualifications: "M.E. (Heat Power)",
          experience: "16 Years",
          areaOfInterest: "Thermal Engineering",
        },
        {
          name: "Prof. S V Shinde",
          image: "public/Faculty/s-v-shinde.jpg",
          qualifications: "M.E. (Heat Power), PhD (Pursuing)",
          experience: "10 years",
          areaOfInterest: "Heat Power Engineering",
        },
        {
          name: " Prof . Ankita Kailas Patil",
          image: "public/Faculty/ankita-patil.jpg",
          qualifications: "M. E. (Design)",
          experience: "10 Years",
          areaOfInterest: "Design",
        },
        {
          name: "Mr. Vilas R Kuyate",
          image: "/Faculty/vilas-kuyate.jpg",
          qualifications: "D.C.E. and Hardware Networking",
          experience: "13 years",
          areaOfInterest: "Hardware ,Networking",
        },
        {
          name: "Prof. G D Gadilohar",
          image: "public/Faculty/g-d-gadilohar.jpg",
          qualifications: "I.T.I.(Carpentry), NCTVT",
          experience: "19 years",
          areaOfInterest: "Carpentry",
        },
        {
          name: "Prof . S M Kele",
          image: "public/Faculty/s-m-kele.jpg",
          qualifications: "I.T.I.(Turner), NCTVT",
          experience: "13 years",
          areaOfInterest: "Turner",
        },
        {
          name: "Prof. B T Khairnar",
          image: "public/Faculty/b-t-khairnar.jpg",
          qualifications: "I.T.I.(Welder), NCTVT",
          experience: "11 years",
          areaOfInterest: "Welding",
        },
        {
          name: "Prof . V P Apsingkar",
          image: "public/Faculty/v-p-apsingkar.jpg",
          qualifications: "D.M.E.",
          experience: "02 years",
          areaOfInterest: "Engg. Drawing",
        },
        {
          name: "Prof . R G Dixit",
          image: "public/Faculty/r-g-dixit.jpg",
          qualifications: "1st Class in Boiler Proficiency",
          experience: "31 years",
          areaOfInterest: "Technical Work regarding Boiler, Engine.",
        },
        {
          name: "Mr. Aditya Jadhav",
          image: "/Faculty/aditya-jadhav.jpg",
          qualifications: "Diploma in Automobile Engineering",
          experience: "3 years",
          areaOfInterest: "Technical Work regarding Machinery.",
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
      faculty: "14 qualified faculty members",
      facultyMembers: [
        {
          name: "Dr. V M Natraj (HOD)",
          image: "public/faculty/v-m-natraj.jpg",
          qualifications: "PhD (Env Mgmt), MTech (Hydraulics)",
          experience: "35 years",
          areaOfInterest: "Hydraulics",
        },
        {
          name: "Dr. Vishvanath N Kanthe",
          image: "public/faculty/vn-kanthe.jpg",
          qualifications: "Ph.D (Structural Engineering), MTech (Structural Engineering)",
          experience: "12 years",
          areaOfInterest: "Concrete Technology",
        },
        {
          name: "Prof. P A Padalkar",
          image: "public/faculty/pa-padalkar.jpg",
          qualifications: "M.E. (Geotechnical Engineering)",
          experience: "14 years",
          areaOfInterest: "Geotechnical Engineering",
        },
        {
          name: "Prof. A G Chaudhari",
          image: "public/faculty/a-g-chaudhari.jpg",
          qualifications: "M.E.(Structure), PhD.(Structure)(Pursuing)",
          experience: "25 years",
          areaOfInterest: "Structure",
        },
        {
          name: "Prof. Chetan G Joshi",
          image: "public/faculty/chetan-g-joshi.jpg",
          qualifications: "M.Tech.( Transportation Engg & Management)",
          experience: "11 years",
          areaOfInterest: "Transportation Engg.& Management",
        },
        {
          name: "Dr. T A Kulkarni",
          image: "public/faculty/t-a-kulkarni.jpg",
          qualifications: "PhD ,M.E. (Geotechnical Engineering)",
          experience: "10 years",
          areaOfInterest: "Geotechnical Engineering",
        },
        {
          name: "Prof. P B Shinde",
          image: "public/faculty/p-b-shinde.jpg",
          qualifications: "M.E.(Structure),PhD Pursuing",
          experience: "10 years",
          areaOfInterest: "Structure & Water Resource",
        },
        {
          name: "Prof. V S Bhalerao",
          image: "public/faculty/v-s-bhalerao.jpg",
          qualifications: "M.E.(Structure), PhD Pursuing",
          experience: "11 years 9 Months",
          areaOfInterest: "Structures",
        },
        {
          name: "Prof. V V Pawar",
          image: "public/faculty/v-v-pawar.jpg",
          qualifications: "M.E. Structure",
          experience: "6 years",
          areaOfInterest: "Structure",
        },
        {
          name: "Prof. D S Desale",
          image: "public/faculty/d-s-desale.jpg",
          qualifications: "M.E.(Structure)",
          experience: "12 years",
          areaOfInterest: "Structure",
        },
        {
          name: "Prof. R K Paikarao",
          image: "public/faculty/r-k-paikarao.jpg",
          qualifications: "M.E. (Structure)",
          experience: "4 years",
          areaOfInterest: "Structure",
        },
        {
          name: "Prof. Kamlesh P Bhagat",
          image: "public/faculty/kamlesh-p-bhagat.jpg",
          qualifications: "M.E.(Construction and Management )",
          experience: "6.5 Years",
          areaOfInterest: "Construction Management & Estimation and Valuation",
        },
        {
          name: "Prof. Pavan K Jadhav",
          image: "public/faculty/pavan-k-jadhav.jpg",
          qualifications: "Civil Diploma",
          experience: "3 year industry, 1 year college",
          areaOfInterest: "civil",
        },
        {
          name: "Prof. Radheshyam I Patil",
          image: "public/faculty/radheshyam-i-patil.jpg",
          qualifications: "D.C.E ,BE (Pursing)",
          experience: "Industrial 02 & Educational 03 Yrs",
          areaOfInterest: "Construction Technology Construction Management 2 D Modelling",
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
      faculty: "15 qualified faculty members",
      facultyMembers: [
        {
          name: "Dr. Rahul Agrawal (HOD)",
          image: "public/faculty/rahul-agrawal.jpg",
          qualifications: "PhD (Power System Optimization)",
          experience: "24 years",
          areaOfInterest: "Power System Optimization, Power Quality",
        },
        {
          name: "Dr. Sunil M More",
          image: "public/faculty/sunil-m-more.jpg",
          qualifications: "PhD",
          experience: "16 years",
          areaOfInterest: "Power System",
        },
        {
          name: "Prof. B G Dhabhade",
          image: "public/faculty/b-g-dhabhade.jpg",
          qualifications: "M.E.(Electrical Machine & Drives)",
          experience: "13.6 years",
          areaOfInterest: "Electrical Machine & Drives",
        },
        {
          name: "Prof. Swapnil N Jadhav",
          image: "public/faculty/swapnil-n-jadhav.png",
          qualifications: "M.E. (Embedded Systems), PhD (Pursuing)",
          experience: "16 years",
          areaOfInterest: "IOT, Embedded systems",
        },
        {
          name: "Prof. Nilima J Bhamare",
          image: "public/faculty/nilima-j-bhamare.jpg",
          qualifications: "ME Power System",
          experience: "6.1 Years",
          areaOfInterest: "Power System Basic Electrical",
        },
        {
          name: "Prof. Rutika S More",
          image: "public/faculty/rutika-s-more.jpg",
          qualifications: "M.Tech Power System",
          experience: "4 Years",
          areaOfInterest: "Power System PLC & SCADA Renewable Energy",
        },
        {
          name: "Prof. Vishakha Ananda Chavan",
          image: "public/faculty/vishakha-ananda-chavan.jpg",
          qualifications: "M. E( Power Electronics and drives)",
          experience: "11 Years",
          areaOfInterest: "Power System, HVDC and FACTS, Power Electronics",
        },
        {
          name: "Prof. Sonali P Gosavi",
          image: "public/faculty/sonali-p-gosavi.jpg",
          qualifications: "M.E (Electrical Power System)",
          experience: "3.3 years",
          areaOfInterest: "Power System",
        },
        {
          name: "Prof. Sushant S Sananse",
          image: "public/faculty/sushant-s-sananse.jpg",
          qualifications: "M.Tech (EPS)",
          experience: "13.5 years",
          areaOfInterest: "Power system",
        },
        {
          name: "Prof. Diba A Ansari",
          image: "public/faculty/diba-a-ansari.jpg",
          qualifications: "M.E. (VLSI & Embedded systems),PhD (Pursuing)",
          experience: "15.5 Years",
          areaOfInterest: "VLSI & Embedded systems",
        },
        {
          name: "Prof. Harshal Shelar",
          image: "public/faculty/harshal-shelar.jpg",
          qualifications: "M.Tech (Power Electronics & Power Systems)",
          experience: "11 Years",
          areaOfInterest: "Power Electronics",
        },
        {
          name: "Prof. Sagar N Deo",
          image: "public/faculty/sagar-n-deo.jpg",
          qualifications: "ME (Power System)",
          experience: "11 Years",
          areaOfInterest: "Power System, Power Quality",
        },
        {
          name: "Prof. Pankaj B Mahale",
          image: "public/faculty/pankaj-b-mahale.jpg",
          qualifications: "Diploma in Computer Engineering",
          experience: "18 Years",
          areaOfInterest: "Hardware & Networking",
        },
        {
          name: "Prof. Hemant Jadhav",
          image: "public/faculty/hemant-jadhav.jpg",
          qualifications: "Diploma (Electrical)",
          experience: "3.3 years",
          areaOfInterest: "Machine",
        },
        {
          name: "Prof. Manoj Amale",
          image: "public/faculty/manoj-amale.jpg",
          qualifications: "Diploma in Electrical Engineering",
          experience: "3 Years",
          areaOfInterest: "Electrical Engineering",
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
          image: "/Faculty/umakant-butkar.jpg",
          qualifications: "Ph.D. in Physics, M.Sc. Physics, B.Ed",
          experience: "16+ years",
          areaOfInterest: "Computer Network",
        },
        {
          name: "Prof.  Kushdip Kucheriya",
          image: "/Faculty/kushdip-kucheriya.jpg",
          qualifications: "M.Sc. Maths.SET",
          experience: "6+ years",
          areaOfInterest: "Applied Mathematics, Numerical Methods, Engineering Mathematics",
        },
        {
          name: "Prof. Manisha A Sonawane",
          image: "/Faculty/manisha-sonawane.jpg",
          qualifications: "M.Sc. B.Ed(SET),PhD (Pursuing)",
          experience: "13+ years",
          areaOfInterest: " Organic Chemistry",
        },
        {
          name: "Prof. Farhat J Shaikh",
          image: "/Faculty/farhat-shaikh.png",
          qualifications: "MSc(Maths), SET , PET, B.Ed. Ph.D Pursuing",
          experience: "6+ years",
          areaOfInterest: "Mathematics",
        },
      {
          name: "Prof. Vimal S Bodke",
          image: "/Faculty/vimal-bodke.jpeg",
          qualifications: "ME (E & TC)",
          experience: "12+ years",
          areaOfInterest: "VLSI & Embedded System",
        },
      {
          name: "Prof.Ms. Arjita K Srivastava",
          image: "/Faculty/arjita-srivastava.jpg",
          qualifications: "M.sc Physics",
          experience: "7+ years",
          areaOfInterest: "Physics",
        },
      {
          name: "Dr. Megha K Kothawade",
          image: "/Faculty/megha-kothawade.png",
          qualifications: "Ph. D (Mathematics)",
          experience: "13+ years",
          areaOfInterest: "Real Analysis",
        },
      {
          name: "Prof. Rupali B Bhusare",
          image: "/Faculty/rupali-bhusare.jpg",
          qualifications: "M.Sc. Physics B.Ed. SET",
          experience: "12+ years",
          areaOfInterest: "physics",
        },
      {
          name: "Prof. Ms.Pranita S Bhosale",
          image: "/Faculty/pranita-bhosale.jpg",
          qualifications: "M.S.C Mathematics",
          experience: "2+ years",
          areaOfInterest: "Mathematics and Computing ",
        },
      {
          name: "Prof. Pooja K Borade",
          image: "/Faculty/pooja-borade.png",
          qualifications: "BSc. Chemistry ",
          experience: "3+ years",
          areaOfInterest: "Chemistry",
        },
      {
          name: "Prof.  Kalyani Dattatray Gholap",
          image: "/Faculty/kalyani-gholap.jpg",
          qualifications: "Bsc Comp Science",
          experience: "2+ years",
          areaOfInterest: "Computer",
        },
      {
          name: "Prof.Mr.Abhijit Sharma",
          image: "/Faculty/abhijit-sharma.jpg",
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
      faculty: "9+ AI and Data Science experts",
      facultyMembers: [
        {
          name: "Prof.Charushila D Patil (HOD)",
          image: "public/Faculty/charushila-patil.jpg",
          qualifications: "M.E.(Computer),PhD (Pursuing)",
          experience: "20years",
          areaOfInterest: "Data Mining",
        },
        {
          name: "Prof.Apurva M Bhavsar",
          image: "public/Faculty/apurva-bhavsar.jpg",
          qualifications: "M.E. Computer",
          experience: "11 Years",
          areaOfInterest: "Computer Network",
        },
        {
          name: "Prof.Nilesh S Sonawane",
          image: "public/Faculty/nilesh-sonawane.jpg",
          qualifications: "ME Computer",
          experience: "10 Years-Teaching & 1 Years- Industry",
          areaOfInterest: "Machine learning, Deep Learning, NLP Learning",
        },
        {
          name: "Prof.Tanvi P Deshmukh",
          image: "public/Faculty/tanvi-deshmukh.jpg",
          qualifications: "ME IT, PhD (Pursuing)",
          experience: "7+ Years",
          areaOfInterest: "Machine Learning",
        },
        {
          name: "Prof.Jayshree M Khairnar",
          image: "public/Faculty/jayshree-khairnar.jpg",
          qualifications: "ME Computer",
          experience: "1 Year-Teaching & 4.6 Years- Industry",
          areaOfInterest: "Image processing",
        },
        {
          name: "Prof . Nutan A Dheringe",
          image: "public/Faculty/nutan-dheringe.jpg",
          qualifications: "ME (Electronics (Digital Systems))",
          experience: "7 Years",
          areaOfInterest: "Data Science",
        },
        {
          name: "Prof.Dipak P Kandare",
          image: "public/Faculty/dipak-kandare.jpeg",
          qualifications: "BE (Computer)",
          experience: "6 Years",
          areaOfInterest: "Cloud Compuing",
        },
        {
          name: "Prof.Yogita P Nirgude",
          image: "public/Faculty/yogita-nirgude.jpg",
          qualifications: "Diploma in Computer Engineering",
          experience: "14 Years",
          areaOfInterest: "Hardware & Software",
        },
        {
          name: "Prof . Ankita Gore",
          image: "public/Faculty/ankita-gore.jpg",
          qualifications: "B.E. Computer",
          experience: "3 Years",
          areaOfInterest: "Data Science",
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
      faculty: "6+ automation and robotics specialists",
      facultyMembers: [
        {
          name: "Prof. Sandip S Patil (HOD)",
          image: "/Faculty/sandip-patil.jpg",
          qualifications: "M.E. Production, PhD (Pursuing)",
          experience: "17 years",
          areaOfInterest: "Production",
        },
        {
          name: "Dr. Manoj D Salunke",
          image: "public/Faculty/manoj-salunke.jpg",
          qualifications: "PhD ,M.E. Production",
          experience: "15 years",
          areaOfInterest: "Production",
        },
        {
          name: "Prof . Gokul R Jadhav",
          image: "public/Faculty/gokul-jadhav.jpg",
          qualifications: "M.E. Design",
          experience: "11 years",
          areaOfInterest: "Robotics",
        },
        {
          name: "Prof . Subodh A Shirsath",
          image: "public/Faculty/subodh-shirsath.jpg",
          qualifications: "PhD (Pursuing) (Mechanical) M. E. (Production)",
          experience: "7 Years",
          areaOfInterest: "Production",
        },
        {
          name: "Prof.Sonali V Panchawatkar",
          image: "public/Faculty/sonali-panchawatkar.jpg",
          qualifications: "M.E (Electronics Eng)",
          experience: "7 Years",
          areaOfInterest: "Electronics",
        },
        {
          name: "Prof. Tushar R Sonawane",
          image: "public/Faculty/tushar-sonawane.jpeg",
          qualifications: "B.E. Mechanical",
          experience: "2 years Industry",
          areaOfInterest: "Production",
        },
        {
          name: "Prof. Hujefa B Pinjari",
          image: "public/Faculty/hujefa-pinjari.jpeg",
          qualifications: "Diploma in Mechanical Engineering",
          experience: "0.5 years",
          areaOfInterest: "Design",
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
      facultyMembers: [
        {
          name: "Prof. Rida Shaikh (HoD)",
          image: undefined,
          qualifications: "MMM, Ph.D (Pursuing)",
          experience: "15 years",
          areaOfInterest: "Management Studies",
        },
        {
          name: "Prof. Amogh Kshirsagar",
          image: undefined,
          qualifications: "M.A. Psychology, Master of Personnel Management",
          experience: "20 years",
          areaOfInterest: "Human Resource Management",
        },
        {
          name: "Prof. Aditi Kulkarni",
          image: undefined,
          qualifications: "MBA (Finance), MBA (HR- Additional Spl.), M.Com, GDC&A, DTL, Ph.D (Pursuing)",
          experience: "9 years",
          areaOfInterest: "Finance & HR",
        },
        {
          name: "Prof. Radhika Gaikwad",
          image: undefined,
          qualifications: "MBA (HR)",
          experience: "5 years",
          areaOfInterest: "Human Resource Management",
        },
        {
          name: "Prof. Satbir Singh Hundal",
          image: undefined,
          qualifications: "MBA (HR), BE (IT)",
          experience: "9 years",
          areaOfInterest: "Human Resource Management",
        },
        {
          name: "Prof. Nivedita Pawar",
          image: undefined,
          qualifications: "BTech Biotechnology, MBA (Finance)",
          experience: "4 years",
          areaOfInterest: "Finance",
        },
        {
          name: "Prof. Rachana Badode",
          image: undefined,
          qualifications: "B.E. Computer",
          experience: "—",
          areaOfInterest: "Business Analytics",
        },
      ],
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/35 to-black/20" />
              </div>
            ))}
          </div>
        </div>

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
                <Card
                  key={index}
                  className="group relative overflow-hidden border-2 border-info/20 bg-gradient-to-br from-background via-background to-info/5 hover:shadow-2xl hover:border-info/50 hover:-translate-y-2 transition-all duration-500 rounded-xl"
                >
                  {/* Decorative top border */}
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-info via-primary to-info opacity-80" />
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-info/0 to-primary/0 group-hover:from-info/5 group-hover:to-primary/5 transition-all duration-500 rounded-xl" />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="relative">
                        <Avatar className="h-32 w-32 ring-4 ring-info/20 bg-background shadow-lg group-hover:ring-info/50 group-hover:scale-105 transition-all duration-500">
                          <AvatarImage 
                            src={member.image || "/placeholder.svg"} 
                            alt={member.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-info/20 to-primary/20 text-info text-2xl font-bold">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        {/* Decorative circle behind avatar */}
                        <div className="absolute inset-0 rounded-full bg-info/10 blur-xl group-hover:bg-info/20 transition-all duration-500 -z-10" />
                      </div>
                      <CardTitle className="text-lg font-bold mb-0 group-hover:text-info transition-colors duration-300 leading-tight px-2">
                        {member.name.trim()}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-2 space-y-3 relative z-10 pb-6">
                    <div className="rounded-lg bg-gradient-to-br from-info/5 to-primary/5 border border-info/10 px-4 py-3 shadow-sm group-hover:shadow-md group-hover:border-info/20 transition-all duration-300">
                      <p className="text-xs font-bold text-info mb-2 uppercase tracking-wider">Qualifications</p>
                      <p className="text-sm text-foreground leading-relaxed break-words">{member.qualifications || "—"}</p>
                    </div>
                    
                    <div className="rounded-lg bg-gradient-to-br from-info/5 to-primary/5 border border-info/10 px-4 py-3 shadow-sm group-hover:shadow-md group-hover:border-info/20 transition-all duration-300">
                      <p className="text-xs font-bold text-info mb-2 uppercase tracking-wider">Experience</p>
                      <p className="text-sm text-foreground font-medium">{member.experience || "—"}</p>
                    </div>
                    
                    {member.areaOfInterest && (
                      <div className="rounded-lg bg-gradient-to-br from-info/5 to-primary/5 border border-info/10 px-4 py-3 shadow-sm group-hover:shadow-md group-hover:border-info/20 transition-all duration-300">
                        <p className="text-xs font-bold text-info mb-2 uppercase tracking-wider">Area of Interest</p>
                        <p className="text-sm text-foreground leading-relaxed break-words">{member.areaOfInterest}</p>
                      </div>
                    )}
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



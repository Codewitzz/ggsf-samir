import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CivilMouRow = {
  srNo: number;
  details: string;
  validFrom: string;
  validTo: string;
};

type SimpleMouRow = {
  srNo: number;
  organisation: string;
  description: string;
  date: string;
};

type BasicEngineeringScienceMouRow = {
  srNo: number;
  region: string;
  level: string;
  instituteName: string;
  dteCode: string;
  description: string;
  date: string;
};

type ElectricalMouRow = {
  srNo: number;
  organisation: string;
  objectives: string;
  yearOfSigning: string;
  duration: string;
};

const civilMouByAcademicYear: Array<{ academicYear: string; rows: CivilMouRow[] }> = [
  {
    academicYear: "2021-22",
    rows: [
      {
        srNo: 1,
        details:
          "MOU by & Between Vikhe Patil Engineering & Management Academy (Franchise partners with CADD CENTRE Training services Pvt. Ltd.) (Party A) & GCOERC, Nashik (Party B), (Life Time)",
        validFrom: "20-08-2017",
        validTo: "Open Ended",
      },
      {
        srNo: 2,
        details: "Agreement between GCOERC, Nashik (Party A) & Chauhan Constructions, (Party B) Nashik for the period of 3 years",
        validFrom: "01-01-2018",
        validTo: "31-12-2021",
      },
      {
        srNo: 3,
        details: "Agreement between GCOERC, Nashik (Party A) & Rehoboth Construction, (Party B) Nashik for the period of 3 years",
        validFrom: "01-11-2018",
        validTo: "31-10-2021",
      },
      {
        srNo: 4,
        details: "Agreement between GCOERC, Nashik (Party A) & Alpha Construwells, (Party B) Nashik for the period of 3 years",
        validFrom: "01-11-2018",
        validTo: "31-10-2021",
      },
      {
        srNo: 5,
        details: "Agreement between GGSF, Nashik (Party A) & Akash Buildcon and Developers, Nashik for the period of 3 years",
        validFrom: "15-10-2020",
        validTo: "14-10-2023",
      },
      {
        srNo: 6,
        details:
          "Agreement between GGSF, Nashik (Party A) & Prashant Sancheti, Nashik, India (Consulting Engineer, Structural Consultant & Government Approved Valuer) for the period of 3 years",
        validFrom: "15-10-2020",
        validTo: "14-10-2023",
      },
      {
        srNo: 7,
        details: "Agreement between GGSF, Nashik (Party A) & PraSad Infrastructure Developers, Pune for the period of 3 years",
        validFrom: "15-10-2020",
        validTo: "14-10-2023",
      },
      {
        srNo: 8,
        details: "Agreement between GGSF, Nashik (Party A) & LT Buildcon, Nashik for the period of 3 years",
        validFrom: "31-12-2020",
        validTo: "30-12-2023",
      },
      {
        srNo: 9,
        details: "Agreement between GGSF, Nashik (Party A) & BP Sangle Constructions Pvt. Ltd., Nashik for the period of 3 years",
        validFrom: "17-03-2021",
        validTo: "16-03-2024",
      },
      {
        srNo: 10,
        details: "Agreement between GGSF, Nashik (Party A) & Sai Vatsal Structural Consultant, Nashik for the period of 3 years",
        validFrom: "17-03-2021",
        validTo: "16-03-2024",
      },
      {
        srNo: 11,
        details: "Agreement between GCOERC, Nashik (Party A) & RESILIENT India, Nashik for the period of 3 years",
        validFrom: "01-10-2021",
        validTo: "30-09-2024",
      },
      {
        srNo: 12,
        details: "Agreement between GGSF, Nashik (Party A) & Abhinav Civil Infrastructures, Nashik for the period of 3 years",
        validFrom: "15-01-2022",
        validTo: "14-01-2025",
      },
      {
        srNo: 13,
        details: "Agreement between GGSF, Nashik (Party A) & Leo Realtecc, Nashik for the period of 3 years",
        validFrom: "15-01-2022",
        validTo: "14-01-2025",
      },
      {
        srNo: 14,
        details: "Agreement between GGSF, Nashik (Party A) & Cortex AI Invention, Nashik for the period life time",
        validFrom: "08-02-2021",
        validTo: "Open Ended",
      },
      {
        srNo: 15,
        details: "Agreement between GGSF, Nashik (Party A) & WX consultants Pvt. Ltd., Nashik",
        validFrom: "20-02-2018",
        validTo: "19-02-2026",
      },
    ],
  },
  {
    academicYear: "2022-23",
    rows: [
      {
        srNo: 1,
        details:
          "MOU by & Between Vikhe Patil Engineering & Management Academy (Franchise partners with CADD CENTRE Training services Pvt. Ltd.) (Party A) & GCOERC, Nashik (Party B), (Life Time)",
        validFrom: "20-08-2017",
        validTo: "Open Ended",
      },
      { srNo: 2, details: "Agreement between GGSF, Nashik (Party A) & Akash Buildcon and Developers, Nashik for the period of 3 years", validFrom: "15-10-2020", validTo: "14-10-2023" },
      {
        srNo: 3,
        details:
          "Agreement between GGSF, Nashik (Party A) & Prashant Sancheti, Nashik, India (Consulting Engineer, Structural Consultant & Government Approved Valuer) for the period of 3 years",
        validFrom: "15-10-2020",
        validTo: "14-10-2023",
      },
      { srNo: 4, details: "Agreement between GGSF, Nashik (Party A) & PraSad Infrastructure Developers, Pune for the period of 3 years", validFrom: "15-10-2020", validTo: "14-10-2023" },
      { srNo: 5, details: "Agreement between GGSF, Nashik (Party A) & LT Buildcon, Nashik for the period of 3 years", validFrom: "31-12-2020", validTo: "30-12-2023" },
      { srNo: 6, details: "Agreement between GGSF, Nashik (Party A) & BP Sangle Constructions Pvt. Ltd., Nashik for the period of 3 years", validFrom: "17-03-2021", validTo: "16-03-2024" },
      { srNo: 7, details: "Agreement between GGSF, Nashik (Party A) & Sai Vatsal Structural Consultant, Nashik for the period of 3 years", validFrom: "17-03-2021", validTo: "16-03-2024" },
      { srNo: 8, details: "Agreement between GCOERC, Nashik (Party A) & RESILIENT India, Nashik for the period of 3 years", validFrom: "01-10-2021", validTo: "30-09-2024" },
      { srNo: 9, details: "Agreement between GGSF, Nashik (Party A) & Abhinav Civil Infrastructures, Nashik for the period of 3 years", validFrom: "15-01-2022", validTo: "14-01-2025" },
      { srNo: 10, details: "Agreement between GGSF, Nashik (Party A) & Leo Realtecc, Nashik for the period of 3 years", validFrom: "15-01-2022", validTo: "14-01-2025" },
      { srNo: 11, details: "Agreement between GGSF, Nashik (Party A) & Make Infracon, Nashik for the period from 09-02-2022 to life time", validFrom: "09-02-2022", validTo: "Open Ended" },
      { srNo: 12, details: "Agreement between GGSF, Nashik (Party A) & Cortex AI Invention, Nashik for the period life time", validFrom: "08-02-2021", validTo: "Open Ended" },
      { srNo: 13, details: "Agreement between GGSF, Nashik (Party A) & WX consultants Pvt. Ltd., Nashik", validFrom: "20-02-2018", validTo: "19-02-2026" },
    ],
  },
  {
    academicYear: "2023-24",
    rows: [
      {
        srNo: 1,
        details:
          "MOU By & Between Vikhe Patil Engineering & Management Academy (Franchise partners with CADD CENTRE Training services Pvt. Ltd.) (Party A) & GCOERC, Nashik (Party B), (Life Time)",
        validFrom: "20-08-2017",
        validTo: "Open Ended",
      },
      { srNo: 2, details: "Agreement between GGSF, Nashik (Party A) & Akash Buildcon and Developers, Nashik for the period of 3 years", validFrom: "15-10-2020", validTo: "14-10-2023" },
      {
        srNo: 3,
        details:
          "Agreement between GGSF, Nashik (Party A) & Prashant Sancheti, Nashik, India (Consulting Engineer, Structural Consultant & Government Approved Valuer) for the period of 3 years",
        validFrom: "15-10-2020",
        validTo: "14-10-2023",
      },
      { srNo: 4, details: "Agreement between GGSF, Nashik (Party A) & PraSad Infrastructure Developers, Pune for the period of 3 years", validFrom: "15-10-2020", validTo: "14-10-2023" },
      { srNo: 5, details: "Agreement between GGSF, Nashik (Party A) & LT Buildcon, Nashik for the period of 3 years", validFrom: "31-12-2020", validTo: "30-12-2023" },
      { srNo: 6, details: "Agreement between GGSF, Nashik (Party A) & BP Sangle Constructions Pvt. Ltd., Nashik for the period of 3 years", validFrom: "17-03-2021", validTo: "16-03-2024" },
      { srNo: 7, details: "Agreement between GGSF, Nashik (Party A) & Sai Vatsal Structural Consultant, Nashik for the period of 3 years", validFrom: "17-03-2021", validTo: "16-03-2024" },
      { srNo: 8, details: "Agreement between GCOERC, Nashik (Party A) & RESILIENT India, Nashik for the period of 3 years", validFrom: "01-10-2021", validTo: "30-09-2024" },
      { srNo: 9, details: "Agreement between GGSF, Nashik (Party A) & Abhinav Civil Infrastructures, Nashik for the period of 3 years", validFrom: "15-01-2022", validTo: "14-01-2025" },
      { srNo: 10, details: "Agreement between GGSF, Nashik (Party A) & Leo Realtecc, Nashik for the period of 3 years", validFrom: "15-01-2022", validTo: "14-01-2025" },
      { srNo: 11, details: "Agreement between GGSF, Nashik (Party A) & Make Infracon, Nashik for the period from 09-02-2022 to life time", validFrom: "09-02-2022", validTo: "Open Ended" },
      {
        srNo: 12,
        details: "Agreement between GGSF, Nashik (Party A) & Invera Testing & Inspection Lab Pvt. Ltd., Nashik",
        validFrom: "18-09-2023",
        validTo: "14-01-2025",
      },
      { srNo: 13, details: "Agreement between GGSF, Nashik (Party A) & Cortex AI Invention, Nashik for the period life time", validFrom: "08-02-2021", validTo: "Open Ended" },
      { srNo: 14, details: "Agreement between GGSF, Nashik (Party A) & WX consultants Pvt. Ltd., Nashik", validFrom: "20-02-2018", validTo: "19-02-2026" },
    ],
  },
  {
    academicYear: "2024-25",
    rows: [
      { srNo: 1, details: "Agreement between GGSF, Nashik (Party A) & Abhinav Civil Infrastructures, Nashik for the period of 3 years", validFrom: "16-01-2025", validTo: "15-01-2028" },
      { srNo: 2, details: "Agreement between GGSF, Nashik (Party A) & Sai Vatsal Structural Consultant, Nashik for the period of 5 years", validFrom: "16-03-2024", validTo: "23-03-2029" },
      {
        srNo: 3,
        details:
          "MOU By & Between Vikhe Patil Engineering & Management Academy (Franchise partners with CADD CENTRE Training services Pvt. Ltd.) (Party A) & GCOERC, Nashik (Party B), (Life Time)",
        validFrom: "20-08-2017",
        validTo: "Open Ended",
      },
      { srNo: 4, details: "Agreement between GGSF, Nashik (Party A) & BP Sangle Constructions Pvt. Ltd., Nashik for the period of 3 years", validFrom: "17-03-2024", validTo: "16-03-2027" },
      { srNo: 5, details: "Agreement between GGSF, Nashik (Party A) & Prashant Sancheti, Nashik for the period of 6 years", validFrom: "15-10-2020", validTo: "15-10-2026" },
      { srNo: 6, details: "Agreement between GGSF, Nashik (Party A) & Make Infracon, Nashik from 09-02-2022 to life time", validFrom: "09-02-2022", validTo: "Open Ended" },
      { srNo: 7, details: "Agreement between GGSF, Nashik (Party A) & PraSad Infrastructure Developers, Pune for the period of 3 years", validFrom: "19-10-2023", validTo: "18-10-2026" },
      { srNo: 8, details: "Agreement between GGSF, Nashik (Party A) & Invera Testing & Inspection Lab Pvt. Ltd., Nashik for life time", validFrom: "18-09-2023", validTo: "Open Ended" },
      { srNo: 9, details: "Agreement between GGSF, Nashik (Party A) & Cortex AI Invention, Nashik for life time", validFrom: "18-02-2021", validTo: "Open Ended" },
      { srNo: 10, details: "Agreement between GGSF, Nashik (Party A) & WX consultants Pvt. Ltd., Nashik", validFrom: "20-02-2018", validTo: "19-02-2026" },
      { srNo: 11, details: "Agreement between GGSF, Nashik (Party A) & SNJB's College of Engineering Chandwad, Nashik for the period of 3 years", validFrom: "01-07-2024", validTo: "30-06-2027" },
      { srNo: 12, details: "Agreement between GGSF, Nashik (Party A) & Golden Nexus LLP, Nashik for the period of 3 years", validFrom: "30-05-2025", validTo: "29-05-2028" },
      { srNo: 13, details: "Agreement between GCOERC, Nashik (Party A) & Global Student for Sustainability, Nashik for the period of 2 years", validFrom: "17-01-2025", validTo: "16-01-2026" },
      { srNo: 14, details: "Agreement between GCOERC, Nashik (Party A) & RESILIENT India, Nashik for the period of 3 years", validFrom: "01-10-2024", validTo: "30-09-2027" },
    ],
  },
  {
    academicYear: "2025-26",
    rows: [
      { srNo: 1, details: "Agreement between GGSF, Nashik (Party A) & Abhinav Civil Infrastructures, Nashik for the period of 3 years", validFrom: "16-01-2025", validTo: "15-01-2028" },
      { srNo: 2, details: "Agreement between GGSF, Nashik (Party A) & Sai Vatsal Structural Consultant, Nashik for the period of 5 years", validFrom: "16-03-2024", validTo: "23-03-2029" },
      {
        srNo: 3,
        details:
          "MOU By & Between Vikhe Patil Engineering & Management Academy (Franchise partners with CADD CENTRE Training services Pvt. Ltd.) (Party A) & GCOERC, Nashik (Party B), (Life Time)",
        validFrom: "20-08-2017",
        validTo: "Open Ended",
      },
      { srNo: 4, details: "Agreement between GGSF, Nashik (Party A) & BP Sangle Constructions Pvt. Ltd., Nashik for the period of 3 years", validFrom: "17-03-2024", validTo: "16-03-2027" },
      { srNo: 5, details: "Agreement between GGSF, Nashik (Party A) & Prashant Sancheti, Nashik for the period of 6 years", validFrom: "15-10-2020", validTo: "15-10-2026" },
      { srNo: 6, details: "Agreement between GGSF, Nashik (Party A) & Make Infracon, Nashik from 09-02-2022 to life time", validFrom: "09-02-2022", validTo: "Open Ended" },
      { srNo: 7, details: "Agreement between GGSF, Nashik (Party A) & PraSad Infrastructure Developers, Pune for the period of 3 years", validFrom: "19-10-2023", validTo: "18-10-2026" },
      { srNo: 8, details: "Agreement between GGSF, Nashik (Party A) & Invera Testing & Inspection Lab Pvt. Ltd., Nashik for life time", validFrom: "18-09-2023", validTo: "Open Ended" },
      { srNo: 9, details: "Agreement between GGSF, Nashik (Party A) & Cortex AI Invention, Nashik for life time", validFrom: "18-02-2021", validTo: "Open Ended" },
      { srNo: 10, details: "Agreement between GGSF, Nashik (Party A) & WX consultants Pvt. Ltd., Nashik", validFrom: "20-02-2018", validTo: "19-02-2026" },
      { srNo: 11, details: "Agreement between GGSF, Nashik (Party A) & SNJB's College of Engineering Chandwad, Nashik for the period of 3 years", validFrom: "01-07-2024", validTo: "30-06-2027" },
      { srNo: 12, details: "Agreement between GGSF, Nashik (Party A) & Golden Nexus LLP, Nashik for the period of 3 years", validFrom: "30-05-2025", validTo: "29-05-2028" },
      { srNo: 13, details: "Agreement between GCOERC, Nashik (Party A) & Global Student for Sustainability, Nashik for the period of 2 years", validFrom: "17-01-2025", validTo: "16-01-2026" },
      { srNo: 14, details: "Agreement between GCOERC, Nashik (Party A) & RESILIENT India, Nashik for the period of 3 years", validFrom: "01-10-2024", validTo: "30-09-2027" },
    ],
  },
];

const basicEngineeringScienceMou: BasicEngineeringScienceMouRow[] = [
  {
    srNo: 1,
    region: "Nashik",
    level: "Degree",
    instituteName: "with MathTech Thinking Foundation",
    dteCode: "-",
    description: "Signed An MOU with MathTech Thinking Foundation",
    date: "10/7/2024",
  },
  {
    srNo: 2,
    region: "Nashik",
    level: "Degree",
    instituteName: "Swapnapurti Foundation",
    dteCode: "-",
    description: "Signed An MOU with Swapnapurti Foundation",
    date: "27/11/2024",
  },
];

const computerEngineeringMou: SimpleMouRow[] = [
  {
    srNo: 1,
    organisation: "Eduskills Foundation",
    description: "Under Eduskills Foundation training provided (Robotics, Cisco Networking, AWS Academy, Microchip, Cyber Security)",
    date: "19/06/2020",
  },
  {
    srNo: 2,
    organisation: "QUANTUM LEARNINGS Centre of Excellence",
    description: "MoU for training students to prepare for placement and certification courses",
    date: "25/03/2021",
  },
  { srNo: 3, organisation: "Sumago Infotech", description: "Industrial Visit and Training", date: "16/08/2022" },
  { srNo: 4, organisation: "NP IT Solutions, Nashik", description: "MoU for training students to prepare for placement and certification courses", date: "15/09/2022" },
  { srNo: 5, organisation: "Cyber Sanskar, Nashik", description: "MoU for training students to prepare for placement and certification courses", date: "15/09/2022" },
  { srNo: 6, organisation: "Nector Studio", description: "Mobile App and Game Development: Expert Lecture / Workshop / Internship", date: "23/11/2022" },
  { srNo: 7, organisation: "Cognifront", description: "Industrial Visit and Training", date: "14/08/2022" },
  { srNo: 8, organisation: "Sumago Infotech", description: "Industrial Visit and Training", date: "16/08/2023" },
  { srNo: 9, organisation: "R3 System", description: "Industrial Visit and Training", date: "22/08/2023" },
  { srNo: 10, organisation: "Eagle Byte Solutions", description: "Industrial Visit and Training", date: "04/12/2023" },
  { srNo: 11, organisation: "NetworkZ Infosystem Pvt. Ltd.", description: "Industrial Visit and Training", date: "21/12/2023" },
  { srNo: 12, organisation: "WoW Infotech Pvt. Ltd.", description: "Industrial Visit and Training", date: "10/01/2024" },
  {
    srNo: 13,
    organisation: "Application Square Pvt. Ltd.",
    description: "Training + placement prep, Industrial Visit & Training, Internship, FDP, SDP",
    date: "12/02/2025",
  },
];

const aidsMou: SimpleMouRow[] = [
  {
    srNo: 1,
    organisation: "Eduskills Foundation",
    description: "Under Eduskills Foundation training provided (Robotics, Cisco Networking, AWS Academy, Microchip, Cyber Security)",
    date: "19/06/2020",
  },
  {
    srNo: 2,
    organisation: "QUANTUM LEARNINGS Centre of Excellence",
    description: "MoU for training students to prepare for placement and certification courses",
    date: "25/03/2021",
  },
  { srNo: 3, organisation: "Sumago Infotech", description: "Industrial Visit and Training", date: "16/08/2022" },
  { srNo: 4, organisation: "NP IT Solutions, Nashik", description: "MoU for training students to prepare for placement and certification courses", date: "15/09/2022" },
  { srNo: 5, organisation: "Cyber Sanskar, Nashik", description: "MoU for training students to prepare for placement and certification courses", date: "15/09/2022" },
  { srNo: 6, organisation: "Nector Studio", description: "Mobile App and Game Development: Expert Lecture / Workshop / Internship", date: "23/11/2022" },
  { srNo: 7, organisation: "Cognifront", description: "Industrial Visit and Training", date: "14/08/2022" },
  { srNo: 8, organisation: "Sumago Infotech", description: "Industrial Visit and Training", date: "16/08/2023" },
  { srNo: 9, organisation: "R3 System", description: "Industrial Visit and Training", date: "22/08/2023" },
  { srNo: 10, organisation: "Eagle Byte Solutions", description: "Industrial Visit and Training", date: "04/12/2023" },
  { srNo: 11, organisation: "Passenger Drone Research Pvt. Ltd.", description: "Industrial Visit and Training", date: "26/08/2024" },
  { srNo: 12, organisation: "Calibers Infotech.", description: "Industrial Visit and Training", date: "06/09/2024" },
  { srNo: 13, organisation: "Arrow Technologies, College Road, Nashik", description: "Industrial Visit and Training", date: "26/09/2025" },
  { srNo: 14, organisation: "White Rays Technologies, Nashik", description: "Industrial Visit and Training", date: "03/10/2025" },
];

const electricalMou_2024_25: ElectricalMouRow[] = [
  { srNo: 1, organisation: "Rotomatic Containers Pvt. Ltd", objectives: "Internship opportunities and job assistance, Industrial visit of students", yearOfSigning: "01/07/2021", duration: "Open Ended" },
  { srNo: 2, organisation: "MACCIA", objectives: "Skill based training, technical education, innovation, entrepreneurship, research, problem solving for industries", yearOfSigning: "07/01/2021", duration: "Open Ended" },
  { srNo: 3, organisation: "Fairdeal Electricals & Engineering Pvt. Ltd., Nashik", objectives: "Industrial visit of students, internship opportunities and job assistance", yearOfSigning: "12/08/2021", duration: "Open Ended" },
  { srNo: 4, organisation: "Technosys Control Solutions", objectives: "Internship opportunities and job assistance, Industrial visit of students", yearOfSigning: "13/08/2021", duration: "Open Ended" },
  { srNo: 5, organisation: "Electrofab Innovations (India) Pvt. Ltd", objectives: "Guest lecture/training/workshop, industrial visit, internship opportunities and job assistance", yearOfSigning: "01/09/2021", duration: "Open Ended" },
  { srNo: 6, organisation: "Vibha Corporation", objectives: "Guest lecture/training/workshop, industrial visit, internship opportunities and job assistance", yearOfSigning: "15/09/2021", duration: "Open Ended" },
  {
    srNo: 7,
    organisation: "Shree Ganesh Industrial Control, Nashik",
    objectives:
      "Curriculum design, industrial training & visit, internship & placement, guest lectures, research & development, faculty development program",
    yearOfSigning: "02/11/2023",
    duration: "Open Ended",
  },
  { srNo: 8, organisation: "enTra - Engineers Training Academy, Nashik", objectives: "Skill development programmes, industrial training, patent, guest lectures", yearOfSigning: "04/08/2022", duration: "04/08/2025" },
  { srNo: 9, organisation: "AutoTech Nashik", objectives: "Internship & placement, skill development programmes, guest lectures, faculty development program", yearOfSigning: "03/07/2023", duration: "03/07/2026" },
  { srNo: 10, organisation: "Gauss Electromagnetics, Nashik", objectives: "Industrial training, skill development programmes, guest lectures, faculty development program", yearOfSigning: "03/06/2024", duration: "02/06/2027" },
  { srNo: 11, organisation: "Visionary Technologies, Nashik", objectives: "Internship & placement, skill development programmes, guest lectures, faculty development program", yearOfSigning: "04/06/2024", duration: "03/06/2027" },
];

const electricalMou_2025_26: ElectricalMouRow[] = [
  { srNo: 1, organisation: "Rotomatic Containers Pvt. Ltd", objectives: "Internship opportunities and job assistance, Industrial visit of students", yearOfSigning: "01/07/2021", duration: "Open Ended" },
  { srNo: 2, organisation: "MACCIA", objectives: "Skill based training, technical education, innovation, entrepreneurship, research, problem solving for industries", yearOfSigning: "07/01/2021", duration: "Open Ended" },
  { srNo: 3, organisation: "Fairdeal Electricals & Engineering Pvt. Ltd., Nashik", objectives: "Industrial visit of students, internship opportunities and job assistance", yearOfSigning: "12/08/2021", duration: "Open Ended" },
  { srNo: 4, organisation: "Technosys Control Solutions", objectives: "Internship opportunities and job assistance, Industrial visit of students", yearOfSigning: "13/08/2021", duration: "Open Ended" },
  { srNo: 5, organisation: "Electrofab Innovations (India) Pvt. Ltd", objectives: "Guest lecture/training/workshop, industrial visit, internship opportunities and job assistance", yearOfSigning: "01/09/2021", duration: "Open Ended" },
  { srNo: 6, organisation: "Vibha Corporation", objectives: "Guest lecture/training/workshop, industrial visit, internship opportunities and job assistance", yearOfSigning: "15/09/2021", duration: "Open Ended" },
  {
    srNo: 7,
    organisation: "Shree Ganesh Industrial Control, Nashik",
    objectives:
      "Curriculum design, industrial training & visit, internship & placement, guest lectures, research & development, faculty development program",
    yearOfSigning: "02/11/2023",
    duration: "Open Ended",
  },
  { srNo: 8, organisation: "AutoTech Nashik", objectives: "Internship & placement, skill development programmes, guest lectures, faculty development program", yearOfSigning: "03/07/2023", duration: "03/07/2026" },
  { srNo: 9, organisation: "Gauss Electromagnetics, Nashik", objectives: "Industrial training, skill development programmes, guest lectures, faculty development program", yearOfSigning: "03/06/2024", duration: "02/06/2027" },
  { srNo: 10, organisation: "Visionary Technologies, Nashik", objectives: "Internship & placement, skill development programmes, guest lectures, faculty development program", yearOfSigning: "04/06/2024", duration: "03/06/2027" },
];

const mechanicalMou: Array<{ srNo: number; partner: string; description: string; date: string }> = [
  { srNo: 1, partner: "Right Tight Fastner, Nashik", description: "-", date: "01-01-2024" },
  { srNo: 2, partner: "Bhoge Enterprises", description: "-", date: "02-09-2022" },
  { srNo: 3, partner: "Samarth Krupa Instrulab", description: "-", date: "02-09-2022" },
  { srNo: 4, partner: "Sansun Industries Pvt. Ltd", description: "-", date: "01-10-2021" },
  { srNo: 5, partner: "Invensys Cad Solutions, Nashik", description: "-", date: "02-08-2021" },
  {
    srNo: 6,
    partner: "Rashtriya Chemicals & Fertilizers Ltd.",
    description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements",
    date: "16/03/2021",
  },
  {
    srNo: 7,
    partner: "Galaxy Wheels, Nashik",
    description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements",
    date: "01/02/2021",
  },
  {
    srNo: 8,
    partner: "EvolvingX Services (OPC) Private Limited, Nashik",
    description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements",
    date: "02/10/2020",
  },
  {
    srNo: 9,
    partner: "CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY (CHARUSAT), CHANGA, GUJARAT",
    description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements",
    date: "17/05/2020",
  },
  {
    srNo: 10,
    partner: "Sushmi Engineering, Nashik",
    description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements",
    date: "01/02/2020",
  },
  {
    srNo: 11,
    partner: "Right Tight Fastner, Nashik",
    description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements",
    date: "01/01/2020",
  },
  {
    srNo: 12,
    partner: "Niraj Thermocols & Electricals Pvt. Ltd.",
    description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements",
    date: "01/01/2020",
  },
  { srNo: 13, partner: "Nashik Industries and Manufacturers Association", description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop", date: "01/01/2020" },
  { srNo: 14, partner: "Jadhav Casting, Ambad MIDC, Nashik", description: "-", date: "26/07/2019" },
  { srNo: 15, partner: "Elite Auto Engineers, Nashik", description: "-", date: "01/07/2019" },
  { srNo: 16, partner: "Million Minds Pvt. Ltd., Mumbai", description: "Open Ended", date: "28/02/2019" },
  { srNo: 17, partner: "PSP-IP Pvt. Ltd., Nigadi, Pune", description: "-", date: "01/01/2019" },
  { srNo: 18, partner: "Samsonite South Asia Pvt. Ltd., Nashik", description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements", date: "05/12/2019" },
  { srNo: 19, partner: "Nashik Engineering Cluster, MIDC Ambad, Nashik", description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop", date: "02/01/2018" },
  { srNo: 20, partner: "Stalwart's Space Pvt. Ltd.", description: "Permanent", date: "27/11/2018" },
  { srNo: 21, partner: "Amey Industries, MIDC Ambad, Nashik", description: "-", date: "02/01/2018" },
  { srNo: 22, partner: "Sansun Industries, MIDC Ambad, Nashik", description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements", date: "02/01/2018" },
  { srNo: 23, partner: "Arm Strong Machine Builders Pvt. Ltd., Nashik", description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements", date: "01/05/2017" },
  {
    srNo: 24,
    partner: "Caprihans India Ltd.",
    description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements, Organizing technical events",
    date: "09/03/2017",
  },
  {
    srNo: 25,
    partner: "Suyog Rubber Ind Pvt. Ltd., Satpur MIDC, Nashik",
    description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements, Organizing technical events",
    date: "07/03/2018",
  },
  {
    srNo: 26,
    partner: "Invensis CAD Solutions (iCAD), Nashik",
    description:
      "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements, Organizing technical events, software training support",
    date: "07/03/2018",
  },
  {
    srNo: 27,
    partner: "Nandi Foundation – Mahindra Pride Classroom",
    description: "Employability skilling program (CSR) for final year students",
    date: "01/08/2018",
  },
  {
    srNo: 28,
    partner: "Right Tight Fastner",
    description: "Industrial Visit, Sponsorship for projects, Guest lecture/training/workshop, Exploring placements, Organizing technical events",
    date: "06/12/2018",
  },
  { srNo: 29, partner: "GGSF-BOSCH Joint Certification Program", description: "Joint Training Program", date: "10/08/2016" },
  { srNo: 30, partner: "CADD CENTRE Training Services Pvt. Ltd., Nashik", description: "-", date: "20/08/2017" },
  { srNo: 31, partner: "Waldevi Hitech Nursery", description: "-", date: "23/05/2017" },
  { srNo: 32, partner: "GGSF-SIEMENS Joint Certification Program", description: "Joint Training Program", date: "16/01/2017" },
];

const mbaBbaMou: SimpleMouRow[] = [
  {
    srNo: 1,
    organisation: "Jhatpat Easy Foods LLP (Spill the Curry)",
    description:
      "Collaboration framework for annual engagement aimed at providing students with practical, industry-relevant exposure in marketing, branding & digital communication.",
    date: "25/08/2025",
  },
  {
    srNo: 2,
    organisation: "Cyber Sanskar",
    description:
      "Collaboration to integrate AI applications into management education, promote research & innovation, and develop future-ready leaders skilled in AI-driven business transformation (aligned with Digital India & AI for all).",
    date: "08/10/2025",
  },
];

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      {subtitle ? <p className="mt-2 text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}

function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-border/70">
      <table className="min-w-[900px] w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`bg-muted/50 px-4 py-3 text-left font-semibold text-foreground border-b border-border/70 ${className}`}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top text-muted-foreground border-b border-border/50 ${className}`}>{children}</td>;
}

const MoU = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      <section className="py-12 px-4 gsap-fade">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">MoU</p>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold">Department-wise Memorandum of Understanding</h1>
            <p className="mt-3 text-muted-foreground max-w-3xl">
              Information is presented in table format, separated department-wise and academic-year-wise where applicable.
            </p>
          </div>

          <div className="space-y-10">
            <Card id="civil-engineering">
              <CardHeader>
                <CardTitle className="text-xl">Civil Engineering</CardTitle>
                <CardDescription>Academic year-wise MoU details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {civilMouByAcademicYear.map((year) => (
                  <div key={year.academicYear}>
                    <SectionTitle title={`Academic Year ${year.academicYear}`} />
                    <TableShell>
                      <thead>
                        <tr>
                          <Th className="w-[90px]">Sr. No.</Th>
                          <Th>MoU Details</Th>
                          <Th className="w-[160px]">Valid From</Th>
                          <Th className="w-[160px]">Valid To</Th>
                        </tr>
                      </thead>
                      <tbody>
                        {year.rows.map((row) => (
                          <tr key={`${year.academicYear}-${row.srNo}`}>
                            <Td className="text-foreground font-medium">{row.srNo}</Td>
                            <Td>{row.details}</Td>
                            <Td>{row.validFrom}</Td>
                            <Td>{row.validTo}</Td>
                          </tr>
                        ))}
                      </tbody>
                    </TableShell>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card id="basic-engineering-science">
              <CardHeader>
                <CardTitle className="text-xl">Basic Engineering Science</CardTitle>
                <CardDescription>MoU list</CardDescription>
              </CardHeader>
              <CardContent>
                <TableShell>
                  <thead>
                    <tr>
                      <Th className="w-[90px]">Sr. No.</Th>
                      <Th className="w-[140px]">Region</Th>
                      <Th className="w-[160px]">Diploma / Degree</Th>
                      <Th className="w-[320px]">Institute Name</Th>
                      <Th className="w-[140px]">DTE Code</Th>
                      <Th>Description of MOU</Th>
                      <Th className="w-[160px]">Date of MOU</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {basicEngineeringScienceMou.map((row) => (
                      <tr key={row.srNo}>
                        <Td className="text-foreground font-medium">{row.srNo}</Td>
                        <Td>{row.region}</Td>
                        <Td>{row.level}</Td>
                        <Td>{row.instituteName}</Td>
                        <Td>{row.dteCode}</Td>
                        <Td>{row.description}</Td>
                        <Td>{row.date}</Td>
                      </tr>
                    ))}
                  </tbody>
                </TableShell>
              </CardContent>
            </Card>

            <Card id="computer-engineering">
              <CardHeader>
                <CardTitle className="text-xl">Computer Engineering</CardTitle>
                <CardDescription>MoU list</CardDescription>
              </CardHeader>
              <CardContent>
                <TableShell>
                  <thead>
                    <tr>
                      <Th className="w-[90px]">Sr. No.</Th>
                      <Th className="w-[320px]">Organisation</Th>
                      <Th>Description</Th>
                      <Th className="w-[160px]">Date of MoU</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {computerEngineeringMou.map((row) => (
                      <tr key={row.srNo}>
                        <Td className="text-foreground font-medium">{row.srNo}</Td>
                        <Td>{row.organisation}</Td>
                        <Td>{row.description}</Td>
                        <Td>{row.date}</Td>
                      </tr>
                    ))}
                  </tbody>
                </TableShell>
              </CardContent>
            </Card>

            <Card id="aids">
              <CardHeader>
                <CardTitle className="text-xl">Artificial Intelligence and Data Science</CardTitle>
                <CardDescription>MoU list</CardDescription>
              </CardHeader>
              <CardContent>
                <TableShell>
                  <thead>
                    <tr>
                      <Th className="w-[90px]">Sr. No.</Th>
                      <Th className="w-[320px]">Organisation</Th>
                      <Th>Description</Th>
                      <Th className="w-[160px]">Date of MoU</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {aidsMou.map((row) => (
                      <tr key={row.srNo}>
                        <Td className="text-foreground font-medium">{row.srNo}</Td>
                        <Td>{row.organisation}</Td>
                        <Td>{row.description}</Td>
                        <Td>{row.date}</Td>
                      </tr>
                    ))}
                  </tbody>
                </TableShell>
              </CardContent>
            </Card>

            <Card id="electrical-engineering">
              <CardHeader>
                <CardTitle className="text-xl">Electrical Engineering</CardTitle>
                <CardDescription>Academic year-wise MoU details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {[
                  { label: "2024-25", rows: electricalMou_2024_25 },
                  { label: "2025-26", rows: electricalMou_2025_26 },
                ].map((year) => (
                  <div key={year.label}>
                    <SectionTitle title={`Academic Year ${year.label}`} />
                    <TableShell>
                      <thead>
                        <tr>
                          <Th className="w-[90px]">Sr. No.</Th>
                          <Th className="w-[280px]">Organisation</Th>
                          <Th>Objectives of MoU</Th>
                          <Th className="w-[160px]">Year of signing</Th>
                          <Th className="w-[160px]">Duration</Th>
                        </tr>
                      </thead>
                      <tbody>
                        {year.rows.map((row) => (
                          <tr key={`${year.label}-${row.srNo}`}>
                            <Td className="text-foreground font-medium">{row.srNo}</Td>
                            <Td>{row.organisation}</Td>
                            <Td>{row.objectives}</Td>
                            <Td>{row.yearOfSigning}</Td>
                            <Td>{row.duration}</Td>
                          </tr>
                        ))}
                      </tbody>
                    </TableShell>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card id="mechanical-engineering">
              <CardHeader>
                <CardTitle className="text-xl">Mechanical Engineering</CardTitle>
                <CardDescription>MoU list</CardDescription>
              </CardHeader>
              <CardContent>
                <TableShell>
                  <thead>
                    <tr>
                      <Th className="w-[90px]">Sr. No.</Th>
                      <Th className="w-[380px]">Partner / Organisation</Th>
                      <Th>Description</Th>
                      <Th className="w-[160px]">Date of MoU</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {mechanicalMou.map((row) => (
                      <tr key={row.srNo}>
                        <Td className="text-foreground font-medium">{row.srNo}</Td>
                        <Td>{row.partner}</Td>
                        <Td>{row.description}</Td>
                        <Td>{row.date}</Td>
                      </tr>
                    ))}
                  </tbody>
                </TableShell>
              </CardContent>
            </Card>

            <Card id="mba-bba">
              <CardHeader>
                <CardTitle className="text-xl">MBA / BBA</CardTitle>
                <CardDescription>MoU list</CardDescription>
              </CardHeader>
              <CardContent>
                <TableShell>
                  <thead>
                    <tr>
                      <Th className="w-[90px]">Sr. No.</Th>
                      <Th className="w-[320px]">Organisation</Th>
                      <Th>Description</Th>
                      <Th className="w-[160px]">Date of MoU</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {mbaBbaMou.map((row) => (
                      <tr key={row.srNo}>
                        <Td className="text-foreground font-medium">{row.srNo}</Td>
                        <Td>{row.organisation}</Td>
                        <Td>{row.description}</Td>
                        <Td>{row.date}</Td>
                      </tr>
                    ))}
                  </tbody>
                </TableShell>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MoU;


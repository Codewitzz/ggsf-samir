import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface QAItem {
  question: string;
  answer: string;
  keywords: string[];
}

// Q&A Knowledge Base
const qaKnowledgeBase: QAItem[] = [
  {
    question: "What courses are offered at Guru Gobind Singh College of Engineering and Research Centre?",
    answer: "The college offers several undergraduate and postgraduate programs:\n\nUndergraduate (UG) Programs (4 years):\n• B.E. in Civil Engineering\n• B.E. in Computer Engineering\n• B.E. in Electrical Engineering\n• B.E. in Mechanical Engineering\n• B.E. in Artificial Intelligence & Data Science\n• B.E. in Automation & Robotics\n\nPostgraduate (PG) Programs:\n• Master of Engineering (M.E.) in Mechanical Engineering (Automation & Robotics)\n• M.E. in Artificial Intelligence & Data Science\n• Master of Business Administration (MBA)\n• Bachelor of Business Administration (BBA)",
    keywords: ["courses", "programs", "offered", "bachelor", "master", "engineering", "mba", "bba"]
  },
  {
    question: "Where is the college located?",
    answer: "Guru Gobind Singh College Of Engineering And Research Centre is located at:\nKhalsa Educational Complex, Guru Gobind Singh Marg, Wadala-Pathardi Road, Indira Nagar Annexe, Nashik – 422009, Maharashtra, India.",
    keywords: ["location", "address", "where", "nashik"]
  },
  {
    question: "Is the college approved by AICTE?",
    answer: "Yes, the college is approved by the All India Council for Technical Education (AICTE).",
    keywords: ["aicte", "approved", "approval"]
  },
  {
    question: "What are the college working hours?",
    answer: "9:00 AM – 4:30 PM (typically Monday to Friday).",
    keywords: ["working", "hours", "time", "office"]
  },
  {
    question: "How can I contact the college office?",
    answer: "You can contact us via:\n• Phone: +91-0253-2372766 / +91-0253-2372666 / +91-7768004581 / +91-7768004582\n• Email: gcoerc.nashik@ggsf.edu.in\n• Website: https://engg.ggsf.edu.in/\n• Address: Khalsa Educational Complex, Guru Gobind Singh Marg, Nashik – 422009, Maharashtra.",
    keywords: ["contact", "phone", "email", "reach", "call"]
  },
  {
    question: "What is the NAAC grade?",
    answer: "The college is accredited with an A grade by NAAC.",
    keywords: ["naac", "grade", "accreditation", "accredited"]
  },
  {
    question: "What is the admission process for first-year engineering?",
    answer: "Admission for First Year B.E. is done through the Maharashtra Centralized Admission Process (CAP) conducted by DTE Maharashtra:\n\n1. Appear in entrance exams — MHT-CET or JEE Main for engineering\n2. Register online on the DTE Maharashtra CAP portal\n3. Fill choice form selecting this college and preferred branch\n4. Participate in CAP rounds based on merit & preferences\n5. Seat allotment happens according to merit and availability\n6. Report to college with original documents to confirm admission and pay fees",
    keywords: ["admission", "process", "first year", "cap", "dte", "mht-cet", "jee"]
  },
  {
    question: "What are the eligibility criteria for admission?",
    answer: "To get admission in First Year Engineering (B.E./B.Tech):\n• Passed 10+2 (Class 12) exam with Physics, Chemistry & Mathematics as compulsory subjects\n• Minimum marks: 75% in PCM for open category, 70% for reserved categories (SC/ST/OBC)\n• Valid score in MHT-CET or JEE Main",
    keywords: ["eligibility", "criteria", "marks", "percentage", "pcm", "12th"]
  },
  {
    question: "What documents are required for admission?",
    answer: "Students must submit these documents during CAP counseling and college reporting:\n• 10th class marksheet & passing certificate\n• 12th class marksheet & passing certificate\n• MHT-CET / JEE Main scorecard\n• Domicile certificate\n• Nationality / Birth certificate\n• Caste certificate (if applicable)\n• Income / EWS certificate (if applicable)\n• Photo ID proof (Aadhaar, passport, etc.)\n• Passport-size photographs\n• Leaving / Transfer Certificate (from previous school/college)",
    keywords: ["documents", "required", "marksheet", "certificate", "admission"]
  },
  {
    question: "Is there any management quota?",
    answer: "Yes, Management / Institutional Quota seats are available.",
    keywords: ["management", "quota", "institutional"]
  },
  {
    question: "Are scholarships available?",
    answer:
      "Yes, scholarships and fee concessions are available for eligible students. Apply online on Maharashtra State Scholarship portal (MahaDBT) and submit required documents to the college scholarship coordinator.\n\nMahaDBT link: https://mahadbt.maharashtra.gov.in/",
    keywords: ["scholarship", "scholarships", "fee", "concession"]
  },
  {
    question: "What branches are available in engineering?",
    answer: "GCOERC offers the following Engineering branches:\n• Computer Engineering\n• Civil Engineering\n• Mechanical Engineering\n• Electrical Engineering\n• Artificial Intelligence & Data Science\n• Automation & Robotics\n\nThese programs are affiliated with SPPU, Pune and approved by AICTE.",
    keywords: ["branches", "departments", "computer", "civil", "mechanical", "electrical", "ai", "robotics"]
  },
  {
    question: "How many semesters are there in B.E.?",
    answer: "Bachelor of Engineering (B.E.) consists of 8 semesters spread over 4 years:\n• Year 1: Semester I & II\n• Year 2: Semester III & IV\n• Year 3: Semester V & VI\n• Year 4: Semester VII & VIII\n\nEach semester includes theory, practicals, and internal assessments.",
    keywords: ["semesters", "semester", "years", "duration"]
  },
  {
    question: "How is the internal assessment done?",
    answer: "SPPU follows a Continuous Internal Evaluation (CIE) system.\n\nInternal Assessment Components:\n• Unit Tests / Mid-Semester Exams\n• Assignments & Tutorials\n• Practical / Lab Performance\n• Mini-projects (if applicable)\n• Attendance & Class Participation\n\nInternal marks are added to End-Semester Exam marks for final grading.",
    keywords: ["internal", "assessment", "marks", "cie", "evaluation"]
  },
  {
    question: "What is the exam pattern under SPPU?",
    answer: "SPPU follows a credit-based semester system.",
    keywords: ["exam", "pattern", "sppu", "credit"]
  },
  {
    question: "Is hostel facility available?",
    answer: "No, hostel facility is not available.",
    keywords: ["hostel", "accommodation", "stay"]
  },
  {
    question: "Is there a library in the college?",
    answer: "Yes, the college has a well-maintained central library with:\n• Textbooks as per SPPU syllabus\n• Reference books, journals, and magazines\n• Digital learning resources\n• Reading room facility for students",
    keywords: ["library", "books", "reading"]
  },
  {
    question: "What sports facilities are provided?",
    answer: "The college encourages sports and physical activities:\n• Indoor games like chess, carrom, table tennis\n• Outdoor games like cricket, football, volleyball, badminton\n• Facilities for annual sports events and competitions\n\nThis helps in overall personality development of students.",
    keywords: ["sports", "games", "facilities", "indoor", "outdoor"]
  },
  {
    question: "Is Wi-Fi available on campus?",
    answer: "Yes, Wi-Fi connectivity is available on campus.",
    keywords: ["wifi", "wi-fi", "internet", "connectivity"]
  },
  {
    question: "What companies visit the campus for placements?",
    answer: "Various IT, core engineering, and service-based companies visit the campus every year for placements. Companies like Bosch, Mahindra & Mahindra, Siemens, Tata Motors, Infosys, TCS, Accenture, Cognizant, Deloitte, QSpiders, and more.\n\nFor the latest list of recruiting companies, please contact the Training & Placement Cell.",
    keywords: ["companies", "placement", "recruiters", "visiting", "bosch", "infosys", "tcs"]
  },
  {
    question: "What is the average placement package?",
    answer: "The average placement package depends on the branch, student skills, and company.\n• Average package ranges from ₹3 LPA to ₹5 LPA\n• Higher packages are offered to students with strong technical skills and projects\n• Core branch packages may vary compared to IT sector\n• Exact figures change every year.",
    keywords: ["package", "salary", "lpa", "placement", "average"]
  },
  {
    question: "Are placement training sessions conducted?",
    answer: "Yes, placement training sessions are regularly conducted by the Training & Placement Cell.\n\nTraining Includes:\n• Aptitude and logical reasoning\n• Technical skill training\n• Soft skills & communication\n• Resume writing and interview preparation\n• Mock interviews and group discussions\n\nThese sessions help students become placement-ready.",
    keywords: ["training", "placement", "aptitude", "interview", "resume"]
  },
  {
    question: "What technical events are organized?",
    answer: "The college regularly organizes technical events to enhance students' technical skills and innovation:\n• Technical workshops and seminars\n• Coding competitions and hackathons\n• Project exhibitions\n• Paper presentation competitions",
    keywords: ["events", "technical", "workshops", "hackathon", "competitions"]
  },
  {
    question: "Is there any annual cultural fest?",
    answer: "Yes, the college organizes an annual cultural fest every year.\n\nCultural Fest Includes:\n• Dance and music performances\n• Drama and skits\n• Singing competitions\n• Fashion show\n• Traditional and cultural activities\n\nThe cultural fest promotes creativity, teamwork, and confidence among students.",
    keywords: ["cultural", "fest", "festival", "annual", "dance", "music"]
  },
  {
    question: "Are there student clubs and committees?",
    answer: "Yes, the college has various student clubs and committees:\n• Technical clubs (coding, robotics, AI, etc.)\n• Cultural committee\n• Sports committee\n• NSS / social activity groups\n• Entrepreneurship and innovation clubs\n\nThese clubs help students develop leadership, communication, and organizational skills.",
    keywords: ["clubs", "committees", "student", "nss"]
  },
  {
    question: "How can I apply online for admission inquiry?",
    answer: "Fill the admission inquiry form on our official website; the office will contact you.",
    keywords: ["apply", "online", "inquiry", "admission", "form"]
  },
  {
    question: "Can you suggest skills for placements for computer engineering?",
    answer: "Focus on coding, problem-solving, communication, aptitude, and domain-specific skills like AI, DBMS, or Cloud Computing.",
    keywords: ["skills", "computer", "engineering", "placement", "coding"]
  },
  {
    question: "Which branch should I choose?",
    answer: "It depends on your interests:\n• Coding → Computer Engineering\n• AI → AI & Data Science\n• Machines → Mechanical\n• Electronics → Electrical\n• Structures → Civil",
    keywords: ["branch", "choose", "select", "which", "interest"]
  },
  {
    question: "I am interested in AI, which branch can I take?",
    answer: "AI & Data Science or Computer Engineering are ideal. Both focus on AI, machine learning, and data analytics.",
    keywords: ["ai", "artificial intelligence", "data science", "branch"]
  },
  {
    question: "Which field is best for future jobs?",
    answer: "Fields like AI & Data Science, Computer Engineering, Automation & Robotics, and Electrical Engineering have good future job prospects.",
    keywords: ["future", "jobs", "prospects", "career", "best"]
  },
  {
    question: "How does the college monitor student attendance?",
    answer: "Attendance is tracked daily via the college portal (vmedulife) and teachers mark it for each class and lab. This attendance is sent to parents directly.",
    keywords: ["attendance", "monitor", "track", "vmedulife", "portal"]
  },
  {
    question: "Are parents informed about student performance?",
    answer: "Yes, the college updates parents about performance, attendance, and exam results through reports or the student portal.",
    keywords: ["parents", "performance", "informed", "updates"]
  },
  {
    question: "Are medical facilities available on campus?",
    answer: "Yes, the college has basic medical facilities and first aid for students, and nearby hospitals are accessible in emergencies.",
    keywords: ["medical", "facilities", "health", "first aid"]
  },
  {
    question: "When will the semester exams start?",
    answer: "Semester exam dates are announced by SPPU. Check the official SPPU or college website for the schedule.",
    keywords: ["exams", "semester", "dates", "schedule", "sppu"]
  },
  {
    question: "How can I check my exam results?",
    answer: "You can check your results on the SPPU website or via the student portal of the college.",
    keywords: ["results", "exam", "check", "sppu", "portal"]
  },
  {
    question: "What happens if I fail in one subject?",
    answer: "You can appear for the back paper/semester exam in that subject in the next available exam cycle.",
    keywords: ["fail", "back", "paper", "subject", "exam"]
  },
  {
    question: "What is the minimum attendance required?",
    answer: "A minimum of 75% attendance is required to appear for exams.",
    keywords: ["attendance", "minimum", "75", "required", "percentage"]
  },
  {
    question: "What happens if attendance is below required percentage?",
    answer: "If attendance is below 75%, students may not be allowed to appear for exams.",
    keywords: ["attendance", "below", "75", "not allowed"]
  },
  {
    question: "How is internal marks calculated?",
    answer: "Internal marks are based on unit tests, assignments, practicals, attendance, and mini-projects as per SPPU guidelines.",
    keywords: ["internal", "marks", "calculated", "calculation"]
  },
  {
    question: "How can I apply for scholarship online?",
    answer:
      "Apply online on Maharashtra State Scholarship portal (MahaDBT) and submit required documents to the college scholarship coordinator.\n\nMahaDBT link: https://mahadbt.maharashtra.gov.in/",
    keywords: ["scholarship", "apply", "online", "maharashtra"]
  },
  {
    question: "What documents are required for scholarship?",
    answer: "You will typically need Aadhaar, caste/income certificate, academic marksheets, admission proof, fee receipts, and bank details for online scholarship applications.",
    keywords: ["scholarship", "documents", "required", "aadhaar"]
  },
  {
    question: "Is college bus facility available?",
    answer: "No, bus facility is not available.",
    keywords: ["bus", "transport", "facility"]
  },
  {
    question: "Does the college have an alumni interaction?",
    answer: "Yes, GCOERC organizes Alumni interaction that help students to share their experiences, give career guidance, and offer networking opportunities.",
    keywords: ["alumni", "interaction", "network"]
  },
  {
    question: "What are the qualifications of faculty members?",
    answer: "Faculty at the college are well-qualified with M.Tech / Ph.D. degrees and have years of teaching experience in their subjects.",
    keywords: ["faculty", "teachers", "qualifications", "phd", "mtech"]
  },
  {
    question: "Is guidance provided for higher studies like GATE or GRE?",
    answer: "Yes, the college supports students aiming for higher studies such as GATE, GRE, or university postgraduate programs through mentorship, career guidance, and training sessions.",
    keywords: ["gate", "gre", "higher", "studies", "guidance"]
  },
  {
    question: "Is there an anti-ragging helpline?",
    answer: "Yes, the college follows UGC anti-ragging regulations. Students can report issues to the anti-ragging committee or via the Maharashtra State anti-ragging helpline.",
    keywords: ["ragging", "anti-ragging", "helpline", "report"]
  },
  {
    question: "Whom should I contact in case of emergency?",
    answer: "In emergencies, contact the college security or admin office immediately. Security numbers are available at the campus entrances.",
    keywords: ["emergency", "contact", "security", "help"]
  },
  {
    question: "What are the departments and intake (seats) available at GCOERC?",
    answer: "Departments of Engineering (with intake):\n\n1) Department of Basic Engineering Science (First Year)\n2) Department of Civil Engineering (60 seats)\n3) Department of Computer Engineering (120 seats)\n4) Department of Electrical Engineering (60 seats)\n5) Department of Mechanical Engineering (60 seats)\n6) Department of Artificial Intelligence and Data Science (120 seats)\n7) Department of Automation and Robotics (60 seats)\n\nDepartment of Management Studies:\n\n1) BBA (Bachelor of Business Administration) – 60 seats\n2) MBA (Master of Business Administration) – 60 seats\n\nDepartments of ME (Postgraduate Engineering):\n\n1) ME - Computer Engineering (AI & DS) – 12 seats\n2) ME - Mechanical Engineering (Automation and Robotics) – 12 seats",
    keywords: [
      "departments",
      "department",
      "branch",
      "branches",
      "intake",
      "seats",
      "civil",
      "computer",
      "electrical",
      "mechanical",
      "ai",
      "data science",
      "automation",
      "robotics",
      "bba",
      "mba",
      "me",
      "postgraduate",
      "pg",
      "basic engineering",
      "first year"
    ]
  }
];

// Fallback function to find answers from knowledge base
const findAnswerFromKB = (query: string): string | null => {
  const lowerQuery = query.toLowerCase();
  
  // Calculate relevance score for each Q&A item
  const scoredItems = qaKnowledgeBase.map(item => {
    let score = 0;
    const questionWords = item.question.toLowerCase().split(/\s+/);
    const answerWords = item.answer.toLowerCase().split(/\s+/);
    const keywordMatches = item.keywords.filter(kw => 
      lowerQuery.includes(kw.toLowerCase())
    ).length;
    
    // Check if query words match question or answer
    const questionMatches = questionWords.filter(qw => 
      lowerQuery.includes(qw) && qw.length > 3
    ).length;
    
    const answerMatches = answerWords.filter(aw => 
      lowerQuery.includes(aw) && aw.length > 3
    ).length;
    
    score = keywordMatches * 3 + questionMatches * 2 + answerMatches;
    
    return { item, score };
  });
  
  // Sort by score and get the best match
  scoredItems.sort((a, b) => b.score - a.score);
  const bestMatch = scoredItems[0];
  
  // Return answer if score is above threshold
  if (bestMatch && bestMatch.score > 0) {
    return bestMatch.item.answer;
  }
  
  return null;
};

const AIChatBot = () => {
  const genAI = useMemo(() => {
    if (!GEMINI_API_KEY) return null;
    try {
      return new GoogleGenerativeAI(GEMINI_API_KEY);
    } catch (error) {
      console.error("Failed to init Gemini client", error);
      return null;
    }
  }, [GEMINI_API_KEY]);
  const [isOpen, setIsOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Edi.\nI can help with admissions, programs, facilities, placements, scholarships and more. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const hasSeen = window.localStorage.getItem("edi_intro_seen");
      setShowIntro(!hasSeen);
    } catch {
      setShowIntro(true);
    }
  }, []);

  // Auto-scroll to bottom when messages or loading state changes
  useEffect(() => {
    const scrollToBottom = () => {
      // Method 1: Scroll to the messages end element
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
      
      // Method 2: Find and scroll the ScrollArea viewport (Radix UI structure)
      if (scrollRef.current) {
        // Find the ScrollArea viewport element
        const viewport = scrollRef.current.closest('[data-radix-scroll-area-viewport]') as HTMLElement;
        if (viewport) {
          viewport.scrollTo({
            top: viewport.scrollHeight,
            behavior: "smooth"
          });
        } else {
          // Fallback: Direct scroll on the container
          const container = scrollRef.current.parentElement;
          if (container) {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: "smooth"
            });
          }
        }
      }
    };

    // Use requestAnimationFrame and small delay to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(scrollToBottom);
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [messages, isLoading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInput("");

    // Try fallback knowledge base first
    const fallbackAnswer = findAnswerFromKB(trimmed);
    
    if (!genAI) {
      // Use fallback knowledge base if API is not available
      if (fallbackAnswer) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: fallbackAnswer,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm sorry, I couldn't find a specific answer to your question. Please contact us directly:\n\n• Phone: +91-0253-2372766 / +91-0253-2372666 / +91-7768004581 / +91-7768004582\n• Email: gcoerc.nashik@ggsf.edu.in\n• Website: https://engg.ggsf.edu.in/\n\nOr visit our contact page for more information.",
          },
        ]);
      }
      return;
    }

    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

      const systemPrompt = `You are COERC Bot, a helpful AI assistant for Guru Gobind Singh College of Engineering and Research Centre (GCOERC). 
      Answer student questions about admissions, programs, courses, facilities, events, and general inquiries. 
      Be concise, friendly, and informative. Use the following knowledge base to answer questions accurately:

      COLLEGE INFORMATION:
      - Location: Khalsa Educational Complex, Guru Gobind Singh Marg, Wadala-Pathardi Road, Indira Nagar Annexe, Nashik – 422009, Maharashtra, India
      - Contact: +91-0253-2372766 / +91-0253-2372666 / +91-7768004581 / +91-7768004582
      - Email: gcoerc.nashik@ggsf.edu.in
      - Website: https://engg.ggsf.edu.in/
      - Working Hours: 9:00 AM – 4:30 PM (Monday to Friday)
      - NAAC Grade: A grade
      - AICTE Approved: Yes

      DEPARTMENTS AND INTAKE (SEATS):
      
      Departments of Engineering:
      - Department of Basic Engineering Science (First Year)
      - Department of Civil Engineering (60 seats)
      - Department of Computer Engineering (120 seats)
      - Department of Electrical Engineering (60 seats)
      - Department of Mechanical Engineering (60 seats)
      - Department of Artificial Intelligence and Data Science (120 seats)
      - Department of Automation and Robotics (60 seats)
      
      Department of Management Studies:
      - BBA (Bachelor of Business Administration) – 60 seats
      - MBA (Master of Business Administration) – 60 seats
      
      Departments of ME (Postgraduate Engineering):
      - ME - Computer Engineering (AI & DS) – 12 seats
      - ME - Mechanical Engineering (Automation and Robotics) – 12 seats

      UNDERGRADUATE (UG) PROGRAMS (4 years):
      - B.E. in Civil Engineering (60 seats)
      - B.E. in Computer Engineering (120 seats)
      - B.E. in Electrical Engineering (60 seats)
      - B.E. in Mechanical Engineering (60 seats)
      - B.E. in Artificial Intelligence & Data Science (120 seats)
      - B.E. in Automation & Robotics (60 seats)

      POSTGRADUATE (PG) PROGRAMS:
      - Master of Engineering (M.E.) in Computer Engineering (AI & DS) – 12 seats
      - M.E. in Mechanical Engineering (Automation & Robotics) – 12 seats
      - Master of Business Administration (MBA) – 60 seats
      - Bachelor of Business Administration (BBA) – 60 seats

      ADMISSION PROCESS (First Year Engineering):
      Admission is done through Maharashtra Centralized Admission Process (CAP) conducted by DTE Maharashtra:
      1. Appear in entrance exams — MHT-CET or JEE Main for engineering
      2. Register online on the DTE Maharashtra CAP portal
      3. Fill choice form selecting this college and preferred branch
      4. Participate in CAP rounds based on merit & preferences
      5. Seat allotment happens according to merit and availability
      6. Report to college with original documents to confirm admission and pay fees

      ELIGIBILITY CRITERIA:
      - Passed 10+2 (Class 12) exam with Physics, Chemistry & Mathematics as compulsory subjects
      - Minimum marks: 75% in PCM for open category, 70% for reserved categories (SC/ST/OBC)
      - Valid score in MHT-CET or JEE Main

      REQUIRED DOCUMENTS FOR ADMISSION:
      - 10th class marksheet & passing certificate
      - 12th class marksheet & passing certificate
      - MHT-CET / JEE Main scorecard
      - Domicile certificate
      - Nationality / Birth certificate
      - Caste certificate (if applicable)
      - Income / EWS certificate (if applicable)
      - Photo ID proof (Aadhaar, passport, etc.)
      - Passport-size photographs
      - Leaving / Transfer Certificate (from previous school/college)

      ADMISSION QUOTAS:
      - Management / Institutional Quota seats are available
      - Scholarships and fee concessions are available for eligible students

      ACADEMIC STRUCTURE:
      - B.E. consists of 8 semesters spread over 4 years (Year 1: Sem I & II, Year 2: Sem III & IV, Year 3: Sem V & VI, Year 4: Sem VII & VIII)
      - Affiliated with SPPU (Savitribai Phule Pune University)
      - Follows credit-based semester system
      - Continuous Internal Evaluation (CIE) system for internal assessment
      - Internal Assessment includes: Unit Tests/Mid-Semester Exams, Assignments & Tutorials, Practical/Lab Performance, Mini-projects, Attendance & Class Participation
      - Minimum 75% attendance required to appear for exams
      - If attendance is below 75%, students may not be allowed to appear for exams

      FACILITIES:
      - Library: Well-maintained central library with textbooks, reference books, journals, magazines, digital learning resources, and reading room
      - Wi-Fi: Available on campus
      - Sports: Indoor games (chess, carrom, table tennis), Outdoor games (cricket, football, volleyball, badminton)
      - Medical: Basic medical facilities and first aid available on campus
      - Hostel: NOT available
      - Bus: NOT available

      PLACEMENTS:
      - Companies visit: Bosch, Mahindra & Mahindra, Siemens, Tata Motors, Infosys, TCS, Accenture, Cognizant, Deloitte, QSpiders, and more
      - Top recruiters: Bosch, Siemens, Infosys, Deloitte, TCS, QSpiders, Accenture
      - Average package: ₹3 LPA to ₹5 LPA (varies by branch, student skills, and company)
      - Placement training includes: Aptitude and logical reasoning, Technical skill training, Soft skills & communication, Resume writing and interview preparation, Mock interviews and group discussions

      EVENTS & ACTIVITIES:
      - Technical events: Workshops, seminars, coding competitions, hackathons, project exhibitions, paper presentations
      - Annual cultural fest: Dance, music, drama, skits, singing competitions, fashion show, traditional activities
      - Student clubs: Technical clubs (coding, robotics, AI), Cultural committee, Sports committee, NSS/social activity groups, Entrepreneurship and innovation clubs

      STUDENT SERVICES:
      - Attendance tracking: Daily via college portal (vmedulife), sent to parents directly
      - Parent updates: Performance, attendance, and exam results through reports or student portal
      - Exam results: Available on SPPU website or college student portal
      - Semester exam dates: Announced by SPPU (check official SPPU or college website)
      - Back papers: Can appear in next available exam cycle if failed in a subject

      SCHOLARSHIPS:
      - Apply online on Maharashtra State Scholarship portal (MahaDBT): https://mahadbt.maharashtra.gov.in/
      - Required documents: Aadhaar, caste/income certificate, academic marksheets, admission proof, fee receipts, bank details
      - Submit required documents to college scholarship coordinator

      HIGHER STUDIES & GUIDANCE:
      - Support provided for GATE, GRE, or university postgraduate programs
      - Mentorship, career guidance, and training sessions available

      BRANCH SELECTION GUIDANCE:
      - Coding interest → Computer Engineering
      - AI interest → AI & Data Science or Computer Engineering
      - Machines interest → Mechanical Engineering
      - Electronics interest → Electrical Engineering
      - Structures interest → Civil Engineering
      - Best future job prospects: AI & Data Science, Computer Engineering, Automation & Robotics, Electrical Engineering

      PLACEMENT SKILLS FOR COMPUTER ENGINEERING:
      Focus on coding, problem-solving, communication, aptitude, and domain-specific skills like AI, DBMS, or Cloud Computing

      OTHER INFORMATION:
      - Alumni interaction: Yes, organized to share experiences, give career guidance, and offer networking opportunities
      - Faculty qualifications: Well-qualified with M.Tech/Ph.D. degrees and years of teaching experience
      - Anti-ragging: College follows UGC anti-ragging regulations. Students can report issues to anti-ragging committee or Maharashtra State anti-ragging helpline
      - Emergency contact: Contact college security or admin office immediately. Security numbers available at campus entrances
      - Online admission inquiry: Fill the admission inquiry form on official website; office will contact you

      If you don't know something specific about the college, acknowledge it politely and suggest contacting the college directly.`;

      const chat = model.startChat({
        history: updatedHistory.slice(1).map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
      });

      const result = await chat.sendMessage(`${systemPrompt}\n\nStudent question: ${trimmed}`);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      
      // Try fallback knowledge base on API error
      const fallbackAnswer = findAnswerFromKB(trimmed);
      
      if (fallbackAnswer) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: fallbackAnswer,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I apologize, but I'm having trouble connecting to the AI service right now. However, you can still contact us directly:\n\n• Phone: +91-0253-2372766 / +91-0253-2372666 / +91-7768004581 / +91-7768004582\n• Email: gcoerc.nashik@ggsf.edu.in\n• Website: https://engg.ggsf.edu.in/\n\nPlease try again later or visit our contact page for immediate assistance.",
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {showIntro && (
            <button
              type="button"
              onClick={() => {
                setShowIntro(false);
                try {
                  window.localStorage.setItem("edi_intro_seen", "1");
                } catch {
                  // ignore
                }
              }}
              className="relative rounded-full bg-white text-foreground shadow-xl ring-1 ring-black/10 px-4 py-2 text-sm font-semibold hover:shadow-2xl transition-shadow"
              aria-label="Dismiss intro"
            >
              Hi! I&apos;m GCOERC
              <span className="absolute right-6 -bottom-2 h-4 w-4 rotate-45 bg-white ring-1 ring-black/10" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setShowIntro(false);
              try {
                window.localStorage.setItem("edi_intro_seen", "1");
              } catch {
                // ignore
              }
            }}
            className="group relative h-16 w-16 rounded-full bg-gradient-to-br from-primary via-primary-dark to-slate-900 shadow-2xl ring-1 ring-white/20 hover:shadow-[0_20px_60px_rgba(2,6,23,0.45)] transition-all duration-300 hover:-translate-y-0.5"
            aria-label="Open chat"
          >
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-secondary/60 via-white/10 to-secondary/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.25),transparent_55%)]" />
            <span className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-950/60  grid place-items-center">
              <span className="relative grid h-10 w-10 place-items-center rounded-full  shadow-inner ring-1 ring-black/10">
                <img
                  src="/chatbot-logo.png"
                  alt="GCOERC"
                    className="h-10 w-10 rounded-full object-cover chatbot-logo-float"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </span>
            </span>
            <span className="absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-white text-slate-900 shadow-lg ring-1 ring-black/10">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden border border-border bg-card shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-card/90 rounded-2xl w-[calc(100vw-3rem)] max-w-[380px] h-[70vh] max-h-[640px] min-h-[420px]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary via-primary/95 to-primary-dark text-primary-foreground shadow-md">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-white/20 ring-2 ring-white/30 shadow-lg overflow-hidden">
                <img
                  src="/chatbot-logo.png"
                  alt="GCOERC"
                  className="h-full w-full object-cover chatbot-logo-float"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold leading-tight truncate text-base">Edi</h3>
                <p className="text-xs text-primary-foreground/90 truncate font-medium">AI Assistant • Always Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-9 w-9 rounded-xl hover:bg-primary-foreground/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-background to-muted/20">
            <div className="space-y-4 h-full" ref={scrollRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md transition-all ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-primary to-primary-dark text-primary-foreground"
                        : "bg-gradient-to-br from-muted/90 to-muted/70 text-foreground border border-border/50"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-br from-muted/90 to-muted/70 text-foreground border border-border/50 rounded-2xl px-4 py-3 shadow-md">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-xs text-muted-foreground font-medium">Thinking…</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Suggestions */}
              {messages.length === 1 && !isLoading && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium px-1">Quick suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "What courses are offered?",
                      "Admission process?",
                      "Placement information",
                      "College facilities"
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={async () => {
                          const trimmed = suggestion.trim();
                          if (!trimmed || isLoading) return;

                          const userMessage: Message = { role: "user", content: trimmed };
                          const updatedHistory = [...messages, userMessage];
                          setMessages(updatedHistory);
                          setInput("");

                          const fallbackAnswer = findAnswerFromKB(trimmed);
                          
                          if (!genAI) {
                            if (fallbackAnswer) {
                              setMessages((prev) => [
                                ...prev,
                                {
                                  role: "assistant",
                                  content: fallbackAnswer,
                                },
                              ]);
                            } else {
                              setMessages((prev) => [
                                ...prev,
                                {
                                  role: "assistant",
                                  content: "I'm sorry, I couldn't find a specific answer to your question. Please contact us directly:\n\n• Phone: +91-0253-2372766 / +91-0253-2372666 / +91-7768004581 / +91-7768004582\n• Email: gcoerc.nashik@ggsf.edu.in\n• Website: https://engg.ggsf.edu.in/\n\nOr visit our contact page for more information.",
                                },
                              ]);
                            }
                            return;
                          }

                          setIsLoading(true);

                          try {
                            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
                            const systemPrompt = `You are COERC Bot, a helpful AI assistant for Guru Gobind Singh College of Engineering and Research Centre (GCOERC). Answer student questions about admissions, programs, courses, facilities, events, and general inquiries. Be concise, friendly, and informative.`;
                            const chat = model.startChat({
                              history: updatedHistory.slice(1).map((msg) => ({
                                role: msg.role === "assistant" ? "model" : "user",
                                parts: [{ text: msg.content }],
                              })),
                            });
                            const result = await chat.sendMessage(`${systemPrompt}\n\nStudent question: ${trimmed}`);
                            const response = await result.response;
                            const text = response.text();
                            setMessages((prev) => [...prev, { role: "assistant", content: text }]);
                          } catch (error) {
                            console.error("Error calling Gemini API:", error);
                            const fallbackAnswer = findAnswerFromKB(trimmed);
                            if (fallbackAnswer) {
                              setMessages((prev) => [
                                ...prev,
                                { role: "assistant", content: fallbackAnswer },
                              ]);
                            } else {
                              setMessages((prev) => [
                                ...prev,
                                {
                                  role: "assistant",
                                  content: "I apologize, but I'm having trouble connecting to the AI service right now. Please try again later or contact us directly.",
                                },
                              ]);
                            }
                          } finally {
                            setIsLoading(false);
                          }
                        }}
                        className="text-xs px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-all hover:scale-105 font-medium cursor-pointer"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Scroll target element */}
              <div ref={messagesEndRef} className="h-1" />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-border bg-gradient-to-b from-background to-muted/10">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your question..."
                disabled={isLoading}
                className="flex-1 h-11 rounded-xl border-border/50 focus:border-primary transition-colors"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;

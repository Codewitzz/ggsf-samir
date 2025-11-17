import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Departments from "./pages/Departments";
import Downloads from "./pages/Downloads";
import FAQ from "./pages/FAQ";
import Testimonials from "./pages/Testimonials";
import MBA from "./pages/MBA";
import Engineering from "./pages/Engineering";
import Polytechnic from "./pages/Polytechnic";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";
import Placeholder from "./pages/Placeholder";
import EngineeringDepartment from "./pages/departments/EngineeringDepartment";
import MBASpecialization from "./pages/departments/MBASpecialization";
import PolytechnicCourse from "./pages/departments/PolytechnicCourse";
import EngineeringAcademics from "./pages/EngineeringAcademics";
import EngineeringFacilities from "./pages/EngineeringFacilities";
import EngineeringActivities from "./pages/EngineeringActivities";
import EngineeringAdmissions from "./pages/EngineeringAdmissions";
import MBAAbout from "./pages/MBAAbout";
import MBAAcademics from "./pages/MBAAcademics";
import MBAFacilities from "./pages/MBAFacilities";
import MBAAdmissions from "./pages/MBAAdmissions";
import MBAActivities from "./pages/MBAActivities";
import MEAbout from "./pages/MEAbout";
import MEAcademics from "./pages/MEAcademics";
import MEFacilities from "./pages/MEFacilities";
import MEAdmissions from "./pages/MEAdmissions";
import MEActivities from "./pages/MEActivities";
import PolytechnicAcademics from "./pages/PolytechnicAcademics";
import PolytechnicActivities from "./pages/PolytechnicActivities";
import PolytechnicFacilities from "./pages/PolytechnicFacilities";
import SchoolAbout from "./pages/SchoolAbout";
import SchoolAcademics from "./pages/SchoolAcademics";
import SchoolActivities from "./pages/SchoolActivities";
import SchoolAdmissions from "./pages/SchoolAdmissions";
import SchoolFacilities from "./pages/SchoolFacilities";
import { useGsapAnimations } from "./hooks/useGsapAnimations";

const queryClient = new QueryClient();

const App = () => {
  useGsapAnimations();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/sitemap" element={<Sitemap />} />

            {/* MBA Routes */}
            <Route path="/mba/about" element={<MBAAbout />} />
            <Route path="/mba/academics" element={<MBAAcademics />} />
            <Route path="/mba/facilities" element={<MBAFacilities />} />
            <Route path="/mba/admissions" element={<MBAAdmissions />} />
            <Route path="/mba/activities" element={<MBAActivities />} />
            <Route path="/mba/programs" element={<MBA />} />
            <Route path="/mba/faculty" element={<MBA />} />
            <Route path="/mba/placements" element={<MBA />} />
            <Route path="/mba/specializations/:specName" element={<MBASpecialization />} />

            {/* Engineering Routes */}
            <Route path="/engineering/about" element={<Engineering />} />
            <Route path="/engineering/academics" element={<EngineeringAcademics />} />
            <Route path="/engineering/departments" element={<Engineering />} />
            <Route path="/engineering/departments/:deptName" element={<EngineeringDepartment />} />
            <Route path="/engineering/facilities" element={<EngineeringFacilities />} />
            <Route path="/engineering/faculty" element={<Engineering />} />
            <Route path="/engineering/admissions" element={<EngineeringAdmissions />} />
            <Route path="/engineering/activities" element={<EngineeringActivities />} />
            <Route path="/engineering/research" element={<Engineering />} />
            <Route path="/engineering/departments/:dept" element={<Placeholder />} />

            {/* ME (Masters of Engineering) Routes */}
            <Route path="/me/about" element={<MEAbout />} />
            <Route path="/me/academics" element={<MEAcademics />} />
            <Route path="/me/facilities" element={<MEFacilities />} />
            <Route path="/me/admissions" element={<MEAdmissions />} />
            <Route path="/me/activities" element={<MEActivities />} />
            <Route path="/me/specializations/:specName" element={<Placeholder />} />

            {/* Polytechnic Routes */}
            <Route path="/polytechnic/about" element={<Polytechnic />} />
            <Route path="/polytechnic/academics" element={<PolytechnicAcademics />} />
            <Route path="/polytechnic/activities" element={<PolytechnicActivities />} />
            <Route path="/polytechnic/facilities" element={<PolytechnicFacilities />} />
            <Route path="/polytechnic/courses" element={<Polytechnic />} />
            <Route path="/polytechnic/courses/:courseName" element={<PolytechnicCourse />} />
            <Route path="/polytechnic/faculty" element={<Polytechnic />} />
            <Route path="/polytechnic/admissions" element={<Polytechnic />} />
            <Route path="/polytechnic/workshops" element={<Polytechnic />} />

            {/* School Routes */}
            <Route path="/school/about" element={<SchoolAbout />} />
            <Route path="/school/academics" element={<SchoolAcademics />} />
            <Route path="/school/activities" element={<SchoolActivities />} />
            <Route path="/school/admissions" element={<SchoolAdmissions />} />
            <Route path="/school/facilities" element={<SchoolFacilities />} />

            {/* Research Routes */}
            <Route path="/research/doctorates" element={<Placeholder />} />
            <Route path="/research/patents" element={<Placeholder />} />
            <Route path="/research/projects" element={<Placeholder />} />
            <Route path="/research/conferences" element={<Placeholder />} />
            <Route path="/research/journals" element={<Placeholder />} />

            {/* Campus Cells Routes */}
            <Route path="/campus-cells/ipr" element={<Placeholder />} />
            <Route path="/campus-cells/isr" element={<Placeholder />} />
            <Route path="/campus-cells/edc" element={<Placeholder />} />
            <Route path="/campus-cells/bosch-siemens" element={<Placeholder />} />
            <Route path="/campus-cells/idea-lab" element={<Placeholder />} />
            <Route path="/campus-cells/incubation" element={<Placeholder />} />
            <Route path="/campus-cells/iciu" element={<Placeholder />} />
            <Route path="/campus-cells/iic" element={<Placeholder />} />
            <Route path="/campus-cells/complaint-committee" element={<Placeholder />} />

            {/* Facilities Routes */}
            <Route path="/facilities/art-room" element={<Placeholder />} />
            <Route path="/facilities/music-room" element={<Placeholder />} />
            <Route path="/facilities/biology-lab" element={<Placeholder />} />
            <Route path="/facilities/chemistry-lab" element={<Placeholder />} />
            <Route path="/facilities/physics-lab" element={<Placeholder />} />
            <Route path="/facilities/computer-lab" element={<Placeholder />} />
            <Route path="/facilities/library" element={<Placeholder />} />
            <Route path="/facilities/cafeteria" element={<Placeholder />} />
            <Route path="/facilities/sports" element={<Placeholder />} />

            {/* Public Disclosure Routes */}
            <Route path="/public-disclosure" element={<Placeholder />} />
            <Route path="/public-disclosure/approval-letter" element={<Placeholder />} />
            <Route path="/public-disclosure/establishment-letter" element={<Placeholder />} />
            <Route path="/public-disclosure/society-registration" element={<Placeholder />} />
            <Route path="/public-disclosure/building-safety" element={<Placeholder />} />
            <Route path="/public-disclosure/land-certificate" element={<Placeholder />} />
            <Route path="/public-disclosure/water-certificate" element={<Placeholder />} />
            <Route path="/public-disclosure/cbse-affiliation" element={<Placeholder />} />
            <Route path="/public-disclosure/fee-fixation" element={<Placeholder />} />

            {/* Enrollment Routes */}
            <Route path="/enrollment/strength" element={<Placeholder />} />
            <Route path="/enrollment/tc-issued" element={<Placeholder />} />
            <Route path="/enrollment/statistics" element={<Placeholder />} />

            {/* Notices Routes */}
            <Route path="/notices" element={<Placeholder />} />
            <Route path="/notices/examination-winter-2025" element={<Placeholder />} />
            <Route path="/notices/scholarship-2025" element={<Placeholder />} />
            <Route path="/notices/re-evaluation" element={<Placeholder />} />
            <Route path="/notices/lab-manuals" element={<Placeholder />} />

            {/* Achievements Routes */}
            <Route path="/achievements" element={<Placeholder />} />
            <Route path="/achievements/:rank" element={<Placeholder />} />

            {/* Placement Routes */}
            <Route path="/placement/contact" element={<Placeholder />} />
            <Route path="/placement/students" element={<Placeholder />} />
            <Route path="/placement/stories" element={<Placeholder />} />

            {/* Alumni Routes */}
            <Route path="/alumni/register" element={<Placeholder />} />
            <Route path="/alumni/stories" element={<Placeholder />} />
            <Route path="/alumni/gallery" element={<Placeholder />} />

            {/* Admissions Route */}
            <Route path="/admissions" element={<Placeholder />} />

            {/* Placeholder routes for future content */}
            <Route path="/research/:topic" element={<Placeholder />} />
            <Route path="/campus-cells/:cell" element={<Placeholder />} />
            <Route path="/facilities/:facility" element={<Placeholder />} />
            <Route path="/public-disclosure/:doc" element={<Placeholder />} />
            <Route path="/enrollment/:metric" element={<Placeholder />} />
            <Route path="/notices/:noticeId" element={<Placeholder />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;


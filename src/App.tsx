import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import PageLoader from "@/components/PageLoader";
import AIChatBot from "@/components/AIChatBot";
import { useGsapAnimations } from "./hooks/useGsapAnimations";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Events = lazy(() => import("./pages/Events"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Departments = lazy(() => import("./pages/Departments"));
const Downloads = lazy(() => import("./pages/Downloads"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const MBA = lazy(() => import("./pages/MBA"));
const Engineering = lazy(() => import("./pages/Engineering"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Placeholder = lazy(() => import("./pages/Placeholder"));
const Campus = lazy(() => import("./pages/Campus"));
const EngineeringDepartment = lazy(() => import("./pages/departments/EngineeringDepartment"));
const MBASpecialization = lazy(() => import("./pages/departments/MBASpecialization"));
const EngineeringAcademics = lazy(() => import("./pages/EngineeringAcademics"));
const EngineeringFacilities = lazy(() => import("./pages/EngineeringFacilities"));
const EngineeringActivities = lazy(() => import("./pages/EngineeringActivities"));
const EngineeringAdmissions = lazy(() => import("./pages/EngineeringAdmissions"));
const MBAAbout = lazy(() => import("./pages/MBAAbout"));
const MBAAcademics = lazy(() => import("./pages/MBAAcademics"));
const MBAFacilities = lazy(() => import("./pages/MBAFacilities"));
const MBAAdmissions = lazy(() => import("./pages/MBAAdmissions"));
const MBAActivities = lazy(() => import("./pages/MBAActivities"));
const MEAbout = lazy(() => import("./pages/MEAbout"));
const MEAcademics = lazy(() => import("./pages/MEAcademics"));
const MEFacilities = lazy(() => import("./pages/MEFacilities"));
const MEAdmissions = lazy(() => import("./pages/MEAdmissions"));
const MEActivities = lazy(() => import("./pages/MEActivities"));
const SchoolAbout = lazy(() => import("./pages/SchoolAbout"));
const SchoolAcademics = lazy(() => import("./pages/SchoolAcademics"));
const SchoolActivities = lazy(() => import("./pages/SchoolActivities"));
const SchoolAdmissions = lazy(() => import("./pages/SchoolAdmissions"));
const SchoolFacilities = lazy(() => import("./pages/SchoolFacilities"));
const FeeStructure = lazy(() => import("./pages/FeeStructure"));
const EngineeringCampus = lazy(() => import("./pages/EngineeringCampus"));
const EngineeringInfrastructure = lazy(() => import("./pages/EngineeringInfrastructure"));
const Admissions = lazy(() => import("./pages/Admissions"));
const Placements = lazy(() => import("./pages/Placements"));
const Alumni = lazy(() => import("./pages/Alumni"));
const Library = lazy(() => import("./pages/Library"));

const queryClient = new QueryClient();

const App = () => {
  useGsapAnimations();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/fee-structure" element={<FeeStructure />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/placements" element={<Placements />} />
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/campus" element={<Campus />} />
              <Route path="/library" element={<Library />} />

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
              <Route path="/engineering/campus" element={<EngineeringCampus />} />
              <Route path="/engineering/infrastructure" element={<EngineeringInfrastructure />} />

              {/* ME (Masters of Engineering) Routes */}
              <Route path="/me/about" element={<MEAbout />} />
              <Route path="/me/academics" element={<MEAcademics />} />
              <Route path="/me/facilities" element={<MEFacilities />} />
              <Route path="/me/admissions" element={<MEAdmissions />} />
              <Route path="/me/activities" element={<MEActivities />} />
              <Route path="/me/specializations/:specName" element={<Placeholder />} />

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
          </Suspense>
          <AIChatBot />
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;


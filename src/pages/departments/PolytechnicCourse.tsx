import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";

const courses: Record<
  string,
  {
    title: string;
    overview: string;
    labs: string[];
  }
> = {
  "mechanical-engineering": {
    title: "Diploma in Mechanical Engineering",
    overview:
      "Covers manufacturing processes, thermal engineering, and CAD/CAM with extensive workshop practice.",
    labs: ["Machine Shop", "Thermal Lab", "CAD/CAM Studio"],
  },
  "civil-engineering": {
    title: "Diploma in Civil Engineering",
    overview:
      "Focus on surveying, structural design, and construction management with field visits and site studies.",
    labs: ["Concrete Lab", "Surveying Lab", "Soil Testing Lab"],
  },
  "electrical-engineering": {
    title: "Diploma in Electrical Engineering",
    overview:
      "Covers power systems, electrical machines, and industrial electronics with PLC training modules.",
    labs: ["Machines Lab", "Power Electronics Lab", "Control Systems Lab"],
  },
  "electronics-telecommunication": {
    title: "Diploma in Electronics & Telecommunication",
    overview:
      "Communication systems, embedded electronics, and networking along with IoT-focused projects.",
    labs: ["Communication Lab", "Microprocessor Lab", "Embedded Systems Lab"],
  },
  "computer-engineering": {
    title: "Diploma in Computer Engineering",
    overview:
      "Software development, database management, and networking with emphasis on full-stack projects.",
    labs: ["Programming Lab", "Networking Lab", "Mobile App Lab"],
  },
  "automobile-engineering": {
    title: "Diploma in Automobile Engineering",
    overview:
      "Vehicle dynamics, powertrain systems, and EV technology supported by Bosch-automotive labs.",
    labs: ["Automobile Workshop", "Engine Testing Lab", "EV Lab"],
  },
};

const PolytechnicCourse = () => {
  const { courseName } = useParams<{ courseName: string }>();
  const course = courseName ? courses[courseName] : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold">
            {course ? course.title : "Polytechnic Course"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {course
              ? course.overview
              : "Detailed curriculum for this diploma course will be published soon."}
          </p>
          <div className="bg-muted rounded-lg p-6 space-y-3">
            <h2 className="text-xl font-semibold">Key Laboratories</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              {course
                ? course.labs.map((lab, index) => <li key={index}>{lab}</li>)
                : ["Lab details will be updated shortly."]}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PolytechnicCourse;



import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";

const specializations: Record<
  string,
  {
    title: string;
    overview: string;
    outcomes: string[];
  }
> = {
  "finance-accounting": {
    title: "Finance & Accounting",
    overview:
      "Focus on corporate finance, investment analysis, and strategic financial management with SAP FICO exposure.",
    outcomes: [
      "Financial modelling and equity research",
      "Risk management and compliance",
      "Corporate taxation & valuation",
    ],
  },
  "marketing-management": {
    title: "Marketing Management",
    overview:
      "Brand management, digital marketing, and consumer analytics with live projects and industry mentorship.",
    outcomes: [
      "Brand strategy and product launches",
      "Digital campaign analytics",
      "Sales leadership and channel management",
    ],
  },
  "human-resource-management": {
    title: "Human Resource Management",
    overview:
      "HR analytics, talent acquisition, and organizational development with exposure to HRMS platforms.",
    outcomes: [
      "Talent management and HR strategy",
      "Industrial relations and labour laws",
      "Learning & development frameworks",
    ],
  },
  "operations-management": {
    title: "Operations Management",
    overview:
      "Supply chain optimization, lean manufacturing, and quality systems with Six Sigma orientation.",
    outcomes: [
      "Process excellence and lean deployments",
      "Supply chain analytics",
      "Project management and ERP integration",
    ],
  },
  "international-business": {
    title: "International Business",
    overview:
      "Global trade policies, export-import regulations, and cross-cultural management with study abroad options.",
    outcomes: [
      "Export management and documentation",
      "Global market entry strategy",
      "Cross-border negotiations",
    ],
  },
  "business-analytics": {
    title: "Business Analytics",
    overview:
      "Data-driven decision making, predictive modelling, and BI tools with hands-on analytics labs.",
    outcomes: [
      "Data visualization and dashboards",
      "Predictive analytics using Python/R",
      "Business intelligence solutions",
    ],
  },
};

const MBASpecialization = () => {
  const { specName } = useParams<{ specName: string }>();
  const spec = specName ? specializations[specName] : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold">
            {spec ? spec.title : "MBA Specialization"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {spec
              ? spec.overview
              : "Detailed information about this specialization will be available soon."}
          </p>
          <div className="bg-muted rounded-lg p-6 space-y-3">
            <h2 className="text-xl font-semibold">Learning Outcomes</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              {spec
                ? spec.outcomes.map((item, index) => <li key={index}>{item}</li>)
                : ["Curriculum details will be updated shortly."]}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MBASpecialization;



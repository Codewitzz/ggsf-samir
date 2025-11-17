import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, BookOpen, GraduationCap } from "lucide-react";

const DownloadsSection = () => {
  const downloads = [
    {
      title: "MBA Prospectus 2025",
      description: "Complete information about MBA programs, curriculum, and admission process",
      icon: GraduationCap,
      size: "2.4 MB",
      format: "PDF",
      category: "MBA",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      title: "Engineering Course Syllabus",
      description: "Detailed syllabus for all engineering branches and specializations",
      icon: BookOpen,
      size: "3.1 MB",
      format: "PDF",
      category: "Engineering",
      url: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      title: "Polytechnic Admission Brochure",
      description: "Information about diploma programs, fees, and admission requirements",
      icon: FileText,
      size: "1.8 MB",
      format: "PDF",
      category: "Polytechnic",
      url: "https://file-examples.com/storage/fe7d08cfa1f4f185c4b5e0a/2017/10/file-sample_150kB.pdf",
    },
    {
      title: "College Calendar 2024-25",
      description: "Academic calendar with important dates, holidays, and events",
      icon: FileText,
      size: "890 KB",
      format: "PDF",
      category: "General",
      url: "https://file-examples.com/storage/fe7d08cfa1f4f185c4b5e0a/2017/10/file-sample_150kB.pdf",
    },
    {
      title: "Placement Statistics Report",
      description: "Annual placement report with company details and package information",
      icon: FileText,
      size: "1.2 MB",
      format: "PDF",
      category: "Placements",
      url: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    },
    {
      title: "Infrastructure & Facilities",
      description: "Detailed guide about campus facilities, labs, and infrastructure",
      icon: BookOpen,
      size: "5.6 MB",
      format: "PDF",
      category: "General",
      url: "https://www.hq.nasa.gov/alsj/a17/A17_FlightPlan.pdf",
    },
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Downloads</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access important documents, brochures, syllabus, and forms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloads.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-3 bg-primary rounded-lg">
                      <IconComponent className="h-8 w-8 text-white " />
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground block">Size: {item.size}</span>
                      <span className="text-xs text-muted-foreground">{item.format}</span>
                    </div>
                    <Button size="sm" className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" download>
                        <Download className="h-4 w-4 " />
                        Download
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;

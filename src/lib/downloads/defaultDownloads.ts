import type { DownloadIconKey } from "@/lib/downloads/downloadIcons";

/** Built-in download cards (editable from Admin → Downloads). */
export type BuiltinDownloadDefinition = {
  key: string;
  title: string;
  description: string;
  iconKey: DownloadIconKey;
  size: string;
  format: string;
  category: string;
  url: string;
  fileName?: string;
};

export const BUILTIN_DOWNLOADS: BuiltinDownloadDefinition[] = [
  {
    key: "default-mba-prospectus",
    title: "MBA Prospectus 2025",
    description: "Complete information about MBA programs, curriculum, and admission process",
    iconKey: "graduationCap",
    size: "2.4 MB",
    format: "PDF",
    category: "MBA",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    key: "default-eng-syllabus",
    title: "Engineering Course Syllabus",
    description: "Detailed syllabus for all engineering branches and specializations",
    iconKey: "bookOpen",
    size: "3.1 MB",
    format: "PDF",
    category: "Engineering",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    key: "default-campus-brochure",
    title: "Campus Facilities Brochure",
    description: "Information about campus facilities, infrastructure, and amenities",
    iconKey: "fileText",
    size: "1.8 MB",
    format: "PDF",
    category: "Campus",
    url: "https://file-examples.com/storage/fe7d08cfa1f4f185c4b5e0a/2017/10/file-sample_150kB.pdf",
  },
  {
    key: "default-calendar",
    title: "College Calendar 2024-25",
    description: "Academic calendar with important dates, holidays, and events",
    iconKey: "fileText",
    size: "890 KB",
    format: "PDF",
    category: "General",
    url: "https://file-examples.com/storage/fe7d08cfa1f4f185c4b5e0a/2017/10/file-sample_150kB.pdf",
  },
  {
    key: "default-placement",
    title: "Placement Statistics Report",
    description: "Annual placement report with company details and package information",
    iconKey: "fileText",
    size: "1.2 MB",
    format: "PDF",
    category: "Placements",
    url: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
  },
  {
    key: "default-infra",
    title: "Infrastructure & Facilities",
    description: "Detailed guide about campus facilities, labs, and infrastructure",
    iconKey: "bookOpen",
    size: "5.6 MB",
    format: "PDF",
    category: "General",
    url: "https://www.hq.nasa.gov/alsj/a17/A17_FlightPlan.pdf",
  },
];

export function getBuiltinDownloadByKey(key: string): BuiltinDownloadDefinition | undefined {
  return BUILTIN_DOWNLOADS.find((b) => b.key === key);
}

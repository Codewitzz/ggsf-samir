import { GraduationCap, BookOpen, FileText, Briefcase, Building2, type LucideIcon } from "lucide-react";

export type DownloadIconKey = "graduationCap" | "bookOpen" | "fileText" | "briefcase" | "building";

export const DOWNLOAD_ICONS: Record<DownloadIconKey, LucideIcon> = {
  graduationCap: GraduationCap,
  bookOpen: BookOpen,
  fileText: FileText,
  briefcase: Briefcase,
  building: Building2,
};

/** Stable keys for gallery sections (used by admin uploads + live gallery). */
export const GALLERY_SECTION_KEYS = [
  "campus-overview",
  "engineering-labs",
  "library",
  "workshops",
  "seminar-events",
  "student-life",
  "innovation-corner",
  "green-campus",
] as const;

export type GallerySectionKey = (typeof GALLERY_SECTION_KEYS)[number];

export type GalleryMainCategory = "Campus" | "Facilities" | "Events" | "Academics" | "Others";

export type DefaultGallerySection = {
  sectionKey: GallerySectionKey;
  title: string;
  /** Shown on badge; used for admin default category string */
  displayCategory: string;
  mainCategory: GalleryMainCategory;
  image: string;
  span: string;
};

export const DEFAULT_GALLERY_SECTIONS: DefaultGallerySection[] = [
  {
    sectionKey: "campus-overview",
    title: "Campus Overview",
    displayCategory: "Campus",
    mainCategory: "Campus",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&h=1200&fit=crop&q=80",
    span: "col-span-2 row-span-2",
  },
  {
    sectionKey: "engineering-labs",
    title: "Engineering Labs",
    displayCategory: "Facilities",
    mainCategory: "Facilities",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&h=1200&fit=crop&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    sectionKey: "library",
    title: "Library",
    displayCategory: "Facilities",
    mainCategory: "Facilities",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&h=1200&fit=crop&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    sectionKey: "workshops",
    title: "Workshops",
    displayCategory: "Academics",
    mainCategory: "Academics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=1200&fit=crop&q=80",
    span: "col-span-1 row-span-2",
  },
  {
    sectionKey: "seminar-events",
    title: "Seminar & Events",
    displayCategory: "Events",
    mainCategory: "Events",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=1200&fit=crop&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    sectionKey: "student-life",
    title: "Student Life",
    displayCategory: "Campus",
    mainCategory: "Campus",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=1200&fit=crop&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    sectionKey: "innovation-corner",
    title: "Innovation Corner",
    displayCategory: "Academics",
    mainCategory: "Academics",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=1200&fit=crop&q=80",
    span: "col-span-2 row-span-1",
  },
  {
    sectionKey: "green-campus",
    title: "Green Campus",
    displayCategory: "Campus",
    mainCategory: "Campus",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&h=1200&fit=crop&q=80",
    span: "col-span-1 row-span-1",
  },
];

export function getSectionMeta(sectionKey: string): DefaultGallerySection | undefined {
  return DEFAULT_GALLERY_SECTIONS.find((s) => s.sectionKey === sectionKey);
}

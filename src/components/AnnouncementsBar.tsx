import { Link } from "react-router-dom";
import { Megaphone } from "lucide-react";
import { useMemo } from "react";

type Announcement = {
  label: string;
  href?: string;
  accent?: "primary" | "secondary" | "info" | "warning" | "success";
};

const AnnouncementsBar = () => {
  const announcements: Announcement[] = useMemo(
    () => [
      { label: "Admissions Open 2025-26", href: "/admissions", accent: "primary" },
      { label: "MBA Admissions – Apply Now", href: "/mba/admissions", accent: "secondary" },
      { label: "Engineering Admissions – Apply Now", href: "/engineering/admissions", accent: "info" },
      { label: "ME Admissions – Apply Now", href: "/me/admissions", accent: "warning" },
      { label: "Beware of fake websites – apply only via official site", href: "/faq", accent: "success" },
    ],
    []
  );

  return (
    <div className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 py-2 overflow-hidden">
          <div className="relative w-full">
            <div
              className="flex gap-3 animate-[scroll_30s_linear_infinite]"
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {[...announcements, ...announcements].map((a, i) => {
                const badgeColor =
                  a.accent === "secondary"
                    ? "bg-secondary text-secondary-foreground"
                    : a.accent === "info"
                    ? "bg-info text-info-foreground"
                    : a.accent === "warning"
                    ? "bg-warning text-warning-foreground"
                    : a.accent === "success"
                    ? "bg-success text-success-foreground"
                    : "bg-primary text-primary-foreground";
                const content = (
                  <span
                    className={`text-xs md:text-sm px-3 py-1 rounded-full ${badgeColor} inline-block`}
                  >
                    {a.label}
                  </span>
                );
                return a.href ? (
                  <Link key={i} to={a.href} className="hover:opacity-90 transition-opacity">
                    {content}
                  </Link>
                ) : (
                  <span key={i}>{content}</span>
                );
              })}
            </div>
          </div>
          <Link
            to="/contact"
            className="ml-auto hidden md:inline-flex text-xs md:text-sm px-3 py-1 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Apply Now
          </Link>
        </div>
      </div>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default AnnouncementsBar;



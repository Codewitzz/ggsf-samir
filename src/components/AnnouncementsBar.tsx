import { Link } from "react-router-dom";
import { useAdminNotices } from "@/hooks/useAdminNotices";

const AnnouncementsBar = () => {
  const { items } = useAdminNotices();

  const announcements = items
    .filter((i) => i.kind === "announcement" && i.enabledOnHomepage)
    .slice()
    .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));

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
                  <span className={`text-xs md:text-sm px-3 py-1 rounded-full ${badgeColor} inline-block`}>
                    {a.title}
                  </span>
                );

                if (!a.linkUrl) return <span key={i}>{content}</span>;

                const isExternal = !a.linkUrl.startsWith("/");
                return isExternal ? (
                  <a
                    key={i}
                    href={a.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-90 transition-opacity"
                  >
                    {content}
                  </a>
                ) : (
                  <Link key={i} to={a.linkUrl} className="hover:opacity-90 transition-opacity">
                    {content}
                  </Link>
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



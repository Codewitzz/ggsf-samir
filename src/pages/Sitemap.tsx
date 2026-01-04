import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Sitemap = () => {
  const siteStructure = {
    "Main Pages": [
      { title: "Home", href: "/" },
      { title: "Events", href: "/events" },
      { title: "Gallery", href: "/gallery" },
      { title: "Downloads", href: "/downloads" },
      { title: "Testimonials", href: "/testimonials" },
      { title: "FAQ", href: "/faq" },
      { title: "Contact", href: "/contact" },
    ],
    "MBA Programs": [
      { title: "About MBA", href: "/mba/about" },
      { title: "Programs", href: "/mba/programs" },
      { title: "Faculty", href: "/mba/faculty" },
      { title: "Admissions", href: "/mba/admissions" },
      { title: "Placements", href: "/mba/placements" },
    ],
    "Engineering": [
      { title: "About Engineering", href: "/engineering/about" },
      { title: "Departments", href: "/engineering/departments" },
      { title: "Faculty", href: "/engineering/faculty" },
      { title: "Admissions", href: "/engineering/admissions" },
      { title: "Research", href: "/engineering/research" },
    ],
    "ME Programs": [
      { title: "About ME", href: "/me/about" },
      { title: "ME Academics", href: "/me/academics" },
      { title: "ME Facilities", href: "/me/facilities" },
      { title: "ME Admissions", href: "/me/admissions" },
      { title: "ME Activities", href: "/me/activities" },
    ],
    "Resources": [
      { title: "Fee Structure", href: "/fee-structure" },
      { title: "Downloads", href: "/downloads" },
      { title: "FAQ", href: "/faq" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Sitemap</h1>
            <p className="text-lg text-muted-foreground">
              Complete overview of all pages and sections on our website
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(siteStructure).map(([category, links]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className="text-primary hover:underline hover:text-primary-light transition-colors"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sitemap;

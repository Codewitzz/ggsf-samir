import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape" && searchOpen) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  // Engineering departments
  const engineeringDepartments = [
    { title: "Basic Engineering Science", href: "/engineering/departments/basic-engineering-science" },
    { title: "Artificial Intelligence & Data Science", href: "/engineering/departments/artificial-intelligence-data-science" },
    { title: "Automation & Robotics", href: "/engineering/departments/automation-robotics" },
    { title: "Civil Engineering", href: "/engineering/departments/civil" },
    { title: "Computer Engineering", href: "/engineering/departments/computer-engineering" },
    { title: "Electrical Engineering", href: "/engineering/departments/electrical" },
    { title: "Mechanical Engineering", href: "/engineering/departments/mechanical" },
  ];

  // MBA departments
  const mbaDepartments = [
    { title: "Management Studies (MBA, BBA)", href: "/engineering/departments/management-studies" },
  ];

  // ME departments
  const meDepartments = [
    { title: "Post Graduate Program (M.E.)", href: "/engineering/departments/post-graduate" },
  ];

  // Engineering menu items
  const engineeringMenuItems = [
    { title: "Departments Overview", href: "/engineering/departments" },
    { title: "About Engineering", href: "/engineering/about" },
    { title: "Admissions", href: "/engineering/admissions" },
    { title: "Facilities", href: "/engineering/facilities" },
    { title: "Activities", href: "/engineering/activities" },
  ];

  const searchableItems = [
    { title: "Home", href: "/", category: "Main Pages", keywords: ["home", "main", "index"] },
    { title: "About Us", href: "/about", category: "Main Pages", keywords: ["about", "foundation", "institute"] },
    { title: "Contact", href: "/contact", category: "Main Pages", keywords: ["contact", "reach", "get in touch"] },
    { title: "Events", href: "/events", category: "Main Pages", keywords: ["events", "calendar", "activities"] },
    { title: "Gallery", href: "/gallery", category: "Main Pages", keywords: ["gallery", "photos", "images"] },
    { title: "Downloads", href: "/downloads", category: "Main Pages", keywords: ["downloads", "documents", "forms"] },
    { title: "FAQ", href: "/faq", category: "Main Pages", keywords: ["faq", "questions", "help"] },
    { title: "Testimonials", href: "/testimonials", category: "Main Pages", keywords: ["testimonials", "reviews", "feedback"] },
    { title: "Alumni", href: "/alumni", category: "Main Pages", keywords: ["alumni", "graduates", "network"] },
    { title: "Placements", href: "/placements", category: "Main Pages", keywords: ["placements", "jobs", "careers", "recruitment"] },

    ...engineeringMenuItems.map((item) => ({
      title: item.title,
      href: item.href,
      category: "Engineering",
      keywords: item.title.toLowerCase().split(" "),
    })),

    ...engineeringDepartments.map((dept) => ({
      title: dept.title,
      href: dept.href,
      category: "Engineering Departments",
      keywords: dept.title.toLowerCase().split(" "),
    })),

    ...mbaDepartments.map((dept) => ({
      title: dept.title,
      href: dept.href,
      category: "MBA Departments",
      keywords: dept.title.toLowerCase().split(" "),
    })),

    ...meDepartments.map((dept) => ({
      title: dept.title,
      href: dept.href,
      category: "M.E. Departments",
      keywords: dept.title.toLowerCase().split(" "),
    })),
  ];

  const filteredResults = searchQuery
    ? searchableItems.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.keywords.some((keyword) => keyword.toLowerCase().includes(query))
        );
      })
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  const handleSelect = (href: string) => {
    navigate(href);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const triggerClassName = cn(
    "bg-transparent data-[state=open]:bg-primary/10 transition-colors text-sm font-medium px-4 py-2 rounded-md",
    isScrolled ? "text-white hover:text-secondary" : "text-foreground/90 hover:text-primary",
  );
  const navLinkClassName = cn(
    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    isScrolled
      ? "text-white hover:text-secondary focus-visible:ring-white/40 focus-visible:ring-offset-primary"
      : "text-foreground/90 hover:text-primary focus-visible:ring-primary/40 focus-visible:ring-offset-background",
  );

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex gap-6">
            <a href="mailto:ggsps.nsk@ggsf.edu.in" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Mail className="h-4 w-4" />
              ggsps.nsk@ggsf.edu.in
            </a>
            <a href="tel:02532373547" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Phone className="h-4 w-4" />
              0253-237-3547
            </a>
            <a href="tel:7768004585" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Phone className="h-4 w-4" />
              7768004585
            </a>
          </div>
          <div className="text-xs hidden pl-1.5 pr-1.5 font-bold  text-red-400 animate-pulse sm:block">
            Mechanical Engineering Program is Accredited by NBA
          </div>
          <div className="hidden md:block">
            <Link to="/contact" className="hover:bg-yellow-900 font-medium bg-yellow-600  rounded-full p-1 pr-3 pl-3 transition-colors">
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 border-b border-border
    transition-[background,backdrop-filter,box-shadow] 
    duration-700 ease-in-out ${
          isScrolled ? "bg-primary text-white  backdrop-blur-md shadow-lg" : "bg-background"
        } border-b border-border`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <img
                  src="/ggsf-logo.jpg"
                  alt=" Guru Gobind Singh College of Engineering and Research Center"
                  className="h-16 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold  "> Guru Gobind Singh College of Engineering and Research Center  </h1>
                <p className="text-xs  ">Knowledge is Divine</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex  ">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={navLinkClassName}>Home</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={triggerClassName}>Departments</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[700px] gap-4 p-4 md:grid-cols-3">
                      {/* Engineering Section */}
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-primary">Engineering</h4>
                        <ul className="space-y-2">
                          {engineeringMenuItems.map((item) => (
                            <li key={item.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={item.href}
                                  className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary"
                                >
                                  {item.title}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                        <h5 className="mt-4 mb-2 text-xs font-semibold text-muted-foreground uppercase">Engineering Departments</h5>
                        <ul className="space-y-1">
                          {engineeringDepartments.map((item) => (
                            <li key={item.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={item.href}
                                  className="block select-none rounded-md p-1.5 text-xs leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary"
                                >
                                  {item.title}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* MBA Section */}
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-primary">MBA</h4>
                        <ul className="space-y-1">
                          {mbaDepartments.map((item) => (
                            <li key={item.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={item.href}
                                  className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary"
                                >
                                  {item.title}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* ME Section */}
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-primary">M.E.</h4>
                        <ul className="space-y-1">
                          {meDepartments.map((item) => (
                            <li key={item.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={item.href}
                                  className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary"
                                >
                                  {item.title}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/events">
                    <NavigationMenuLink className={navLinkClassName}>Events</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/alumni">
                    <NavigationMenuLink className={navLinkClassName}>Alumni</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/placements">
                    <NavigationMenuLink className={navLinkClassName}>Placements</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/gallery">
                    <NavigationMenuLink className={navLinkClassName}>Gallery</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/campus">
                    <NavigationMenuLink className={navLinkClassName}>Campus</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                 <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink className={navLinkClassName}>Contact</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuIndicator />
            </NavigationMenu>

            {/* Search & Mobile Menu */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn(
                  "hover:text-primary",
                  isScrolled ? "text-white hover:text-secondary" : "text-foreground",
                )}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div ref={searchRef} className="pb-4 relative">
              <Command className="rounded-lg border shadow-md">
                <CommandInput
                  placeholder="Search courses, departments, faculty..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  autoFocus
                />
                <CommandList>
                  {filteredResults.length === 0 && searchQuery ? (
                    <CommandEmpty>No results found.</CommandEmpty>
                  ) : (
                    <>
                      {filteredResults.length > 0 && (
                        <>
                          {Object.entries(
                            filteredResults.reduce((acc, item) => {
                              if (!acc[item.category]) {
                                acc[item.category] = [];
                              }
                              acc[item.category].push(item);
                              return acc;
                            }, {} as Record<string, typeof filteredResults>)
                          ).map(([category, items]) => (
                            <CommandGroup key={category} heading={category}>
                              {items.map((item) => (
                                <CommandItem
                                  key={item.href}
                                  value={item.title}
                                  onSelect={() => handleSelect(item.href)}
                                  className="cursor-pointer"
                                >
                                  <div className="flex flex-col">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-xs text-muted-foreground">{category}</span>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          ))}
                        </>
                      )}
                      {!searchQuery && (
                        <div className="px-4 py-6 text-sm text-muted-foreground">
                          Start typing to search across departments, programs, and resources.
                        </div>
                      )}
                    </>
                  )}
                </CommandList>
              </Command>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link to="/" className="block py-2 hover:text-primary transition-colors">
                Home
              </Link>
              <div>
                <p className="font-semibold text-sm text-muted-foreground mb-2">Departments</p>
                <p className="text-xs text-muted-foreground mb-1 pl-4">Engineering</p>
                {engineeringMenuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block py-2 pl-6 hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
                <p className="text-xs text-muted-foreground mb-1 mt-3 pl-4">Engineering Departments</p>
                {engineeringDepartments.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block py-2 pl-6 hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
                <p className="text-xs text-muted-foreground mb-1 mt-3 pl-4">MBA</p>
                {mbaDepartments.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block py-2 pl-6 hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
                <p className="text-xs text-muted-foreground mb-1 mt-3 pl-4">M.E.</p>
                {meDepartments.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block py-2 pl-6 hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <Link to="/events" className="block py-2 hover:text-primary transition-colors">
                Events
              </Link>
              <Link to="/alumni" className="block py-2 hover:text-primary transition-colors">
                Alumni
              </Link>
              <Link to="/placements" className="block py-2 hover:text-primary transition-colors">
                Placements
              </Link>
              <Link to="/gallery" className="block py-2 hover:text-primary transition-colors">
                Gallery
              </Link>
              <Link to="/contact" className="block py-2 hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/campus" className="block py-2 hover:text-primary transition-colors">
                Campus
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

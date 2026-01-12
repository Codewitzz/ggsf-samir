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

  const mbaMenuItems = [
    { title: "About MBA", href: "/mba/about" },
    { title: "Academics", href: "/mba/academics" },
    { title: "Facilities", href: "/mba/facilities" },
    { title: "Admissions", href: "/mba/admissions" },
    { title: "Activities", href: "/mba/activities" },
  ];

const engineeringMenuItems = [
  { title: "Departments Overview", href: "/engineering/departments" },
  { title: "About Engineering", href: "/engineering/about" },
  { title: "Admissions", href: "/engineering/admissions" },
  { title: "Facilities", href: "/engineering/facilities" },
  { title: "Research", href: "/engineering/research" },
  { title: "Activities", href: "/engineering/activities" },
  { title: "Faculty", href: "/engineering/faculty" },
];

  const engineeringDepartments = [
    { title: "First Year Engineering", href: "/engineering/departments/first-year" },
    { title: "Computer Engineering", href: "/engineering/departments/computer-engineering" },
    { title: "Electronics & Communication", href: "/engineering/departments/electronics-communication" },
    { title: "Mechanical Engineering", href: "/engineering/departments/mechanical" },
    { title: "Civil Engineering", href: "/engineering/departments/civil" },
    { title: "Electrical Engineering", href: "/engineering/departments/electrical" },
    { title: "Information Technology", href: "/engineering/departments/information-technology" },
    { title: "AI & Data Science", href: "/engineering/departments/artificial-intelligence-data-science" },
    { title: "Automation & Robotics", href: "/engineering/departments/automation-robotics" },
    { title: "Basic Engineering Science", href: "/engineering/departments/basic-engineering-science" },
    { title: "Management Studies", href: "/engineering/departments/management-studies" },
    { title: "Post Graduate (M.E.)", href: "/engineering/departments/post-graduate" },
  ];

  const campusMenuItems = [
    { title: "About ME", href: "/me/about" },
    { title: "ME Departments", href: "/me/about#me-departments" },
    { title: "ME Academics", href: "/me/academics" },
    { title: "ME Facilities", href: "/me/facilities" },
    { title: "ME Admissions", href: "/me/admissions" },
    { title: "ME Activities", href: "/me/activities" },
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

    { title: "About MBA", href: "/mba/about", category: "MBA Programs", keywords: ["mba", "business", "administration", "management"] },
    { title: "MBA Academics", href: "/mba/academics", category: "MBA Programs", keywords: ["mba", "academics", "curriculum"] },
    { title: "MBA Facilities", href: "/mba/facilities", category: "MBA Programs", keywords: ["mba", "facilities", "campus"] },
    { title: "MBA Admissions", href: "/mba/admissions", category: "MBA Programs", keywords: ["mba", "admissions", "apply", "enrollment"] },
    { title: "MBA Activities", href: "/mba/activities", category: "MBA Programs", keywords: ["mba", "activities", "clubs"] },

    { title: "About Engineering", href: "/engineering/about", category: "Engineering", keywords: ["engineering", "bachelor", "be", "btech"] },
    { title: "Engineering Admissions", href: "/engineering/admissions", category: "Engineering", keywords: ["engineering", "admissions", "jee", "entrance"] },
    { title: "Engineering Facilities", href: "/engineering/facilities", category: "Engineering", keywords: ["engineering", "facilities", "labs"] },
    { title: "Engineering Activities", href: "/engineering/activities", category: "Engineering", keywords: ["engineering", "activities", "clubs"] },
    { title: "Engineering Academics", href: "/engineering/academics", category: "Engineering", keywords: ["engineering", "academics", "curriculum"] },

    ...engineeringDepartments.map((dept) => ({
      title: dept.title,
      href: dept.href,
      category: "Engineering Departments",
      keywords: dept.title.toLowerCase().split(" "),
    })),

    { title: "About ME", href: "/me/about", category: "ME Programs", keywords: ["me", "masters", "engineering"] },
    {
      title: "ME Departments",
      href: "/me/about#me-departments",
      category: "ME Programs",
      keywords: ["me", "departments", "ai", "robotics"],
    },
    { title: "ME Admissions", href: "/me/admissions", category: "ME Programs", keywords: ["me", "admissions", "pg"] },

    { title: "About ME", href: "/me/about", category: "ME Programs", keywords: ["me", "masters", "engineering", "postgraduate"] },
    {
      title: "ME Departments",
      href: "/me/about#me-departments",
      category: "ME Programs",
      keywords: ["me", "departments", "ai", "robotics"],
    },
    { title: "ME Academics", href: "/me/academics", category: "ME Programs", keywords: ["me", "academics", "curriculum"] },
    { title: "ME Facilities", href: "/me/facilities", category: "ME Programs", keywords: ["me", "facilities", "labs"] },
    { title: "ME Admissions", href: "/me/admissions", category: "ME Programs", keywords: ["me", "admissions", "pg"] },
    { title: "ME Activities", href: "/me/activities", category: "ME Programs", keywords: ["me", "activities"] },
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
                  <NavigationMenuTrigger className={triggerClassName}>MBA</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {mbaMenuItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild >
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none bg-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary"
                            >
                              <div className="text-sm  font-medium leading-none">{item.title}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={triggerClassName}>Engineering</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[280px] space-y-2 p-4">
                      <li className="px-2 py-1 text-xs uppercase text-muted-foreground">Quick Links</li>
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
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={triggerClassName}>ME</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {campusMenuItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary"
                            >
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/events">
                    <NavigationMenuLink className={navLinkClassName}>Events</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/gallery">
                    <NavigationMenuLink className={navLinkClassName}>Gallery</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink className={navLinkClassName}>Contact</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/campus">
                    <NavigationMenuLink className={navLinkClassName}>Campus</NavigationMenuLink>
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
                <p className="font-semibold text-sm text-muted-foreground mb-2">MBA</p>
                {mbaMenuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block py-2 pl-4 hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div>
                <p className="font-semibold text-sm text-muted-foreground mb-2">Engineering</p>
                {engineeringMenuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block py-2 pl-4 hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div>
                <p className="font-semibold text-sm text-muted-foreground mb-2">ME</p>
                {campusMenuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block py-2 pl-4 hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <Link to="/events" className="block py-2 hover:text-primary transition-colors">
                Events
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

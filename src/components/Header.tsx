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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  // Engineering menu items
  const engineeringMenuItems = [
    { title: "About Engineering", href: "/engineering/about" },
    { title: "Admissions", href: "/engineering/admissions" },
    { title: "Facilities", href: "/engineering/facilities" },
    { title: "MoU", href: "/mou" },
    
  ];

  // MBA menu items
  const mbaMenuItems = [
    { title: "About MBA", href: "/mba/about" },
    { title: "Academics", href: "/mba/academics" },
    { title: "Facilities", href: "/mba/facilities" },
    { title: "Admissions", href: "/mba/admissions" },
    { title: "Activities", href: "/mba/activities" },
  ];

  // BBA menu items
  const bbaMenuItems = [
    { title: "About BBA", href: "/bba/about" },
    { title: "Academics", href: "/bba/academics" },
    { title: "Facilities", href: "/bba/facilities" },
    { title: "Admissions", href: "/bba/admissions" },
    { title: "Activities", href: "/bba/activities" },
  ];

  // ME menu items
  const meMenuItems = [
    { title: "About M.E.", href: "/me/about" },
    { title: "Academics", href: "/me/academics" },
    { title: "Facilities", href: "/me/facilities" },
    { title: "Admissions", href: "/me/admissions" },
    { title: "Activities", href: "/me/activities" },
  ];

  const campusMenuItems = [
    { title: "Campus Overview", href: "/campus" },
    { title: "Library", href: "/library" },
    { title: "Canteen & Cafeteria", href: "/campus/canteen-cafeteria" },
    { title: "Sport", href: "/campus#sport" },

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
    { title: "Library", href: "/library", category: "Main Pages", keywords: ["library", "books", "resources", "reading"] },

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

    ...mbaMenuItems.map((item) => ({
      title: item.title,
      href: item.href,
      category: "MBA",
      keywords: item.title.toLowerCase().split(" "),
    })),

    ...bbaMenuItems.map((item) => ({
      title: item.title,
      href: item.href,
      category: "BBA",
      keywords: item.title.toLowerCase().split(" "),
    })),

    ...meMenuItems.map((item) => ({
      title: item.title,
      href: item.href,
      category: "M.E. Programs",
      keywords: item.title.toLowerCase().split(" "),
    })),

    ...campusMenuItems.map((item) => ({
      title: item.title,
      href: item.href,
      category: "Campus",
      keywords: item.title.toLowerCase().split(" "),
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
    "bg-transparent data-[state=open]:bg-gradient-to-r data-[state=open]:from-secondary/20 data-[state=open]:to-primary/20 transition-all duration-300 text-sm font-medium px-3 py-1.5 rounded-md",
    isScrolled ? "text-white hover:text-secondary hover:bg-white/10" : "text-gray-800 hover:text-primary hover:bg-primary/5",
  );
  const navLinkClassName = cn(
    "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    isScrolled
      ? "text-white hover:text-secondary hover:bg-white/10 focus-visible:ring-white/40 focus-visible:ring-offset-primary"
      : "text-gray-800 hover:text-primary hover:bg-primary/5 focus-visible:ring-primary/40 focus-visible:ring-offset-background",
  );

  return (
    <div className="sticky top-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center text-sm">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <a href="mailto:gcoerc.nashik@ggsf.edu.in" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Mail className="h-4 w-4" />
              gcoerc.nashik@ggsf.edu.in
            </a>
            <a href="tel:0553237276" className="hidden sm:flex items-center gap-2 hover:text-secondary transition-colors">
              <Phone className="h-4 w-4" />
              0553-237-276
            </a>
            <a href="tel:7768004581" className="hidden sm:flex items-center gap-2 hover:text-secondary transition-colors">
              <Phone className="h-4 w-4" />
              7768004581/82
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
        className={`border-b border-border
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
                  src="/naac-logo.png"
                  alt="NAAC"
                  className="h-20 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
              <div className="flex-shrink-0">
                <img
                  src="/ggsf-logo.jpg"
                  alt=" Guru Gobind Singh College of Engineering and Research Centre"
                  className="h-20 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
              
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold"> Guru Gobind Singh College of Engineering and Research Centre</h1>
                <p className="text-xs">Knowledge is Divine</p>
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
                    <div className="w-full max-w-[800px] p-5 bg-gradient-to-br from-white to-gray-50">
                      <div className="grid grid-cols-4 gap-5">
                        {/* Engineering */}
                        <div className="group col-span-2 bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <Link to="/engineering/about">
                            <h4 className="mb-3 text-sm font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                              <span className="w-1 h-5 bg-primary rounded-full"></span>
                              Engineering
                            </h4>
                          </Link>
                          <ul className="space-y-1.5 mb-3">
                            {engineeringMenuItems.map((item) => (
                              <li key={item.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={item.href}
                                    className="block select-none rounded-md p-1.5 text-xs font-medium leading-relaxed no-underline outline-none transition-all hover:bg-primary/10 hover:text-primary hover:pl-2.5"
                                  >
                                    {item.title}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                          <h5 className="mt-3 mb-2 text-[10px] font-bold text-gray-600 uppercase tracking-wide border-t pt-2">Engineering Departments</h5>
                          <ul className="grid grid-cols-2 gap-1.5">
                            {engineeringDepartments.map((item) => (
                              <li key={item.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={item.href}
                                    className="block select-none rounded-md p-1.5 text-[11px] font-medium leading-tight no-underline outline-none transition-all hover:bg-primary/10 hover:text-primary"
                                  >
                                    {item.title}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* MBA */}
                        <div className="group bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <Link to="/engineering/departments/management-studies">
                            <h4 className="mb-3 text-sm font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                              <span className="w-1 h-5 bg-primary rounded-full"></span>
                              Management Studies
                            </h4>
                          </Link>
                          <ul className="space-y-1.5">
                            {[...mbaMenuItems, ...bbaMenuItems].map((item) => (
                              <li key={item.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={item.href}
                                    className="block select-none rounded-md p-1.5 text-xs font-medium leading-relaxed no-underline outline-none transition-all hover:bg-primary/10 hover:text-primary hover:pl-2.5"
                                  >
                                    {item.title}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* ME */}
                        <div className="group bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <Link to="/me/about">
                            <h4 className="mb-3 text-sm font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                              <span className="w-1 h-5 bg-primary rounded-full"></span>
                              M.E.
                            </h4>
                          </Link>
                          <ul className="space-y-1.5">
                            {meMenuItems.map((item) => (
                              <li key={item.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={item.href}
                                    className="block select-none rounded-md p-1.5 text-xs font-medium leading-relaxed no-underline outline-none transition-all hover:bg-primary/10 hover:text-primary hover:pl-2.5"
                                  >
                                    {item.title}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button type="button" className={navLinkClassName}>
                        Campus
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64 p-2">
                      {campusMenuItems.map((item) => (
                        <DropdownMenuItem
                          key={item.title}
                          className="cursor-pointer"
                          onSelect={(e) => {
                            e.preventDefault();
                            navigate(item.href);
                          }}
                        >
                          <span className="w-full px-2 py-1.5">{item.title}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
              <Command className="rounded-xl border-2 border-primary/20 shadow-2xl bg-background/95 backdrop-blur-md">
                <CommandInput
                  placeholder="Search courses, departments, faculty..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  autoFocus
                  className="h-12 text-base"
                />
                <CommandList className="max-h-[400px]">
                  {filteredResults.length === 0 && searchQuery ? (
                    <CommandEmpty className="py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-muted-foreground opacity-50" />
                        <p className="text-sm font-medium">No results found.</p>
                        <p className="text-xs text-muted-foreground">Try a different search term</p>
                      </div>
                    </CommandEmpty>
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
                            <CommandGroup key={category} heading={category} className="px-2">
                              {items.map((item) => (
                                <CommandItem
                                  key={item.href}
                                  value={item.title}
                                  onSelect={() => handleSelect(item.href)}
                                  className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-primary/10 transition-colors my-1"
                                >
                                  <div className="flex flex-col gap-0.5">
                                    <span className="font-semibold text-sm">{item.title}</span>
                                    <span className="text-xs text-muted-foreground">{category}</span>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          ))}
                        </>
                      )}
                      {!searchQuery && (
                        <div className="px-4 py-8 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-primary/10 rounded-full">
                              <Search className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-1">Start typing to search</p>
                              <p className="text-xs text-muted-foreground">Search across departments, programs, and resources</p>
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center mt-2">
                              <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">Ctrl+K</span>
                              <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">to open</span>
                            </div>
                          </div>
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
            <div className="container mx-auto px-4 py-4 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <Link to="/" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              
              {/* Departments Section */}
              <div>
                <p className="font-semibold text-sm mb-2">Departments</p>
                
                {/* Engineering */}
                <p className="text-xs font-semibold text-primary mb-1 pl-4">Engineering</p>
                {engineeringMenuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block py-1.5 pl-6 text-sm hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                
                {/* MBA */}
                <p className="text-xs font-semibold text-primary mb-1 mt-3 pl-4">Management Studies</p>
                {[...mbaMenuItems, ...bbaMenuItems].map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block py-1.5 pl-6 text-sm hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                
                {/* M.E. */}
                <p className="text-xs font-semibold text-primary mb-1 mt-3 pl-4">M.E.</p>
                {meMenuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block py-1.5 pl-6 text-sm hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              {/* Engineering Departments Section */}
              <div>
                <p className="font-semibold text-sm mb-2">Engineering Departments</p>
                {engineeringDepartments.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block py-1.5 pl-4 text-sm hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              <Link to="/events" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Events
              </Link>
              <Link to="/alumni" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Alumni
              </Link>
              <Link to="/placements" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Placements
              </Link>
              <Link to="/gallery" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Gallery
              </Link>
              <div>
                <p className="font-semibold text-sm mb-2">Campus</p>
                {campusMenuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block py-1.5 pl-4 text-sm hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <Link to="/library" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Library
              </Link>
              <Link to="/contact" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Book, Users, Clock, BookOpen, Award, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Library = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const libraryImages = [
    {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=800&fit=crop&q=80",
      title: "Modern Library Facilities",
      description: "State-of-the-art reading rooms and study spaces"
    },
    {
      url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&h=800&fit=crop&q=80",
      title: "Digital Resources",
      description: "Access to thousands of e-books and journals"
    },
    {
      url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&h=800&fit=crop&q=80",
      title: "Reading Spaces",
      description: "Comfortable and quiet study environments"
    },
    {
      url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&h=800&fit=crop&q=80",
      title: "Resource Collection",
      description: "Extensive collection across all disciplines"
    },
  ];

  const libraryStats = [
    { icon: Book, label: "Books", value: "50,000+" },
    { icon: Globe, label: "E-Journals", value: "15,000+" },
    { icon: Users, label: "Daily Visitors", value: "500+" },
    { icon: Clock, label: "Operating Hours", value: "12 hrs/day" },
  ];

  const facilities = [
    {
      title: "Digital Library",
      description: "Access to online databases, e-books, and digital journals from leading publishers worldwide.",
      icon: BookOpen,
    },
    {
      title: "Reading Rooms",
      description: "Spacious, well-lit reading rooms with comfortable seating for students and faculty.",
      icon: Book,
    },
    {
      title: "Reference Section",
      description: "Comprehensive reference materials including encyclopedias, dictionaries, and handbooks.",
      icon: Award,
    },
    {
      title: "Research Support",
      description: "Dedicated support for research scholars with access to thesis, dissertations, and journals.",
      icon: Users,
    },
  ];

  const libraryStaff = [
    {
      name: "Nishigandha Rakesh Khaire",
      designation: "Librarian",
      qualifications: "B. Sc (Chemistry) M.LIB. I. Sc. SET & NET",
      experience: "9+ years",
      image: "/Faculty/nishigandha-khaire.jpg",
      
    },
    {
      name: "Mr. Yogesh Shyamkant Chumbhale",
      designation: " Librarian",
      qualifications: "M.A.M.LIB.I.Sc.",
      experience: "9+ years",
      image: "/Faculty/yogesh-shyamkant.jpg",
      
    },
    {
      name: "Ms. Savita K Bahirat",
      designation: "Library Attendant",
      qualifications: "-",
      experience: "8+ years",
      image: "/Faculty/savita-bahirat.jpg",
      areaOfInterest: " fdgdg "
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % libraryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [libraryImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % libraryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + libraryImages.length) % libraryImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Image Slider */}
      <section className="relative h-[500px] overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          {libraryImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Central Library
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-2">
              {libraryImages[currentSlide].title}
            </p>
            <p className="text-lg text-white/80">
              {libraryImages[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {libraryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-secondary" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-b from-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {libraryStats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12" />
                </div>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-lg opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Library Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About Our Library
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The Central Library at Guru Gobind Singh College of Engineering and Research Center serves as the heart of academic excellence and research. With a vast collection of books, journals, and digital resources, our library provides comprehensive support to students, faculty, and researchers.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to foster a culture of learning and innovation by providing access to quality information resources and creating an environment conducive to study and research. The library is equipped with modern infrastructure, including high-speed internet, digital cataloging systems, and comfortable reading spaces.
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <facility.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {facility.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Resources */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Library Resources
          </h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Print Collection</h3>
              <p className="text-gray-600 mb-4">
                Extensive collection of textbooks, reference books, and general reading materials across all subjects.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 text-left">
                <li>• Engineering & Technology</li>
                <li>• Management & Business</li>
                <li>• Science & Mathematics</li>
                <li>• Humanities & Social Sciences</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Digital Resources</h3>
              <p className="text-gray-600 mb-4">
                Access to premium online databases and digital libraries from around the world.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 text-left">
                <li>• IEEE Xplore Digital Library</li>
                <li>• DELNET Membership</li>
                <li>• Science Direct</li>
                <li>• ProQuest Dissertations</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Special Collections</h3>
              <p className="text-gray-600 mb-4">
                Curated collections for research and specialized study programs.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 text-left">
                <li>• PhD Theses & Dissertations</li>
                <li>• Project Reports</li>
                <li>• Conference Proceedings</li>
                <li>• Competitive Exam Materials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Library Staff Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Our Library Team</h2>
            <div className="h-1 w-24 bg-primary rounded-full mx-auto"></div>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our dedicated team of library professionals is committed to providing excellent service and support to our academic community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {libraryStaff.map((member, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-2 transition-all duration-500 rounded-xl"
              >
                {/* Decorative top border */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-primary to-primary opacity-80" />
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/5 transition-all duration-500 rounded-xl" />
                
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="relative">
                      <Avatar className="h-32 w-32 ring-4 ring-primary/20 bg-background shadow-lg group-hover:ring-primary/50 group-hover:scale-105 transition-all duration-500">
                        <AvatarImage 
                          src={member.image} 
                          alt={member.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/20 text-primary text-2xl font-bold">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      {/* Decorative circle behind avatar */}
                      <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl group-hover:bg-primary/20 transition-all duration-500 -z-10" />
                    </div>
                    <CardTitle className="text-lg font-bold mb-0 group-hover:text-primary transition-colors duration-300 leading-tight px-2">
                      {member.name.trim()}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">{member.designation}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-2 space-y-3 relative z-10 pb-6">
                  <div className="rounded-lg bg-gradient-to-br from-primary/5 to-primary/5 border border-primary/10 px-4 py-3 shadow-sm group-hover:shadow-md group-hover:border-primary/20 transition-all duration-300">
                    <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">Qualifications</p>
                    <p className="text-sm text-foreground leading-relaxed break-words">{member.qualifications || "—"}</p>
                  </div>
                  
                  <div className="rounded-lg bg-gradient-to-br from-primary/5 to-primary/5 border border-primary/10 px-4 py-3 shadow-sm group-hover:shadow-md group-hover:border-primary/20 transition-all duration-300">
                    <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">Experience</p>
                    <p className="text-sm text-foreground font-medium">{member.experience || "—"}</p>
                  </div>

                 
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timing & Contact Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Library Timings</h3>
              <div className="space-y-3 text-lg">
                <p><span className="font-semibold">Monday - Friday :</span> 9:00 AM - 5:00 PM</p>
                <p><span className="font-semibold">Saturday :</span> 9:00 AM - 2:00 PM</p>
                <p><span className="font-semibold">Sunday :</span> Closed .</p>
                <p className="text-sm opacity-90 mt-4">
                  * Extended hours during examination periods
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-3 text-lg">
                <p><span className="font-semibold">Email:</span> library@ggsf.edu.in</p>
                <p><span className="font-semibold">Location:</span> Second Floor, Main Building</p>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Library;

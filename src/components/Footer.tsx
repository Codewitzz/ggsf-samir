import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin, GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-primary-dark text-primary-foreground overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">GCOERC</h3>
            </div>
            <p className="text-sm text-primary-foreground/90 mb-6 leading-relaxed">
              Excellence in education across MBA and Engineering programs. Shaping future leaders and innovators with world-class infrastructure and experienced faculty.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110 backdrop-blur-sm">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110 backdrop-blur-sm">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110 backdrop-blur-sm">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110 backdrop-blur-sm">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110 backdrop-blur-sm">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-secondary">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/mba/about" className="flex items-center gap-2 hover:text-secondary transition-all hover:translate-x-1 group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  MBA Programs
                </Link>
              </li>
              <li>
                <Link to="/engineering/about" className="flex items-center gap-2 hover:text-secondary transition-all hover:translate-x-1 group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Engineering
                </Link>
              </li>
              <li>
                <Link to="/me/about" className="flex items-center gap-2 hover:text-secondary transition-all hover:translate-x-1 group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  ME Programs
                </Link>
              </li>
              <li>
                <Link to="/events" className="flex items-center gap-2 hover:text-secondary transition-all hover:translate-x-1 group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="flex items-center gap-2 hover:text-secondary transition-all hover:translate-x-1 group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="flex items-center gap-2 hover:text-secondary transition-all hover:translate-x-1 group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Downloads
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-secondary">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/admissions" className="flex items-center gap-2 hover:text-secondary transition-all hover:translate-x-1 group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/placements" className="flex items-center gap-2 hover:text-secondary transition-all hover:translate-x-1 group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Placements
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="flex items-center gap-2 hover:text-secondary transition-all hover:translate-x-1 group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center gap-2 hover:text-secondary transition-all hover:translate-x-1 group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="flex items-center gap-2 hover:text-secondary transition-all hover:translate-x-1 group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Sitemap
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-secondary transition-all hover:translate-x-1 group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-secondary">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-primary-foreground/90 leading-relaxed">Khalsa Educational Complex, Guru Gobind Singh Marg, Wadala- Pathardi Road, Indira Nagar Annexe, Nashik-422009</span>
              </li>
              <li className="flex gap-3 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <a href="tel:+917768004581" className="hover:text-secondary transition-colors font-medium">
                  +91-7768004581/82
                </a>
              </li>
              <li className="flex gap-3 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <a href="mailto:gcoerc.nashik@ggsf.edu.in" className="hover:text-secondary transition-colors font-medium break-all">
                  gcoerc.nashik@ggsf.edu.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-primary-foreground/80">
              © {new Date().getFullYear()} Guru Gobind Singh College of Engineering and Research Centre. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-primary-foreground/70">
              <Link to="/sitemap" className="hover:text-secondary transition-colors">Sitemap</Link>
              <Link to="/faq" className="hover:text-secondary transition-colors">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-secondary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Guru Gobind Singh College of Engineering and Research Center </h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Excellence in education across MBA and Engineering programs. Shaping future leaders and innovators.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/mba/about" className="hover:text-secondary transition-colors">
                  MBA Programs
                </Link>
              </li>
              <li>
                <Link to="/engineering/about" className="hover:text-secondary transition-colors">
                  Engineering
                </Link>
              </li>
              <li>
                <Link to="/me/about" className="hover:text-secondary transition-colors">
                  ME Programs
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-secondary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-secondary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-secondary transition-colors">
                  Downloads
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/admissions" className="hover:text-secondary transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/placements" className="hover:text-secondary transition-colors">
                  Placements
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-secondary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-secondary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-secondary transition-colors">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span>Khalsa Educational Complex, Guru Gobind Singh Marg, Wadala- Pathardi Road, Indira Nagar Annexe, Nashik-422009</span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-secondary transition-colors">
                   +91-7768004581/82
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@college.edu" className="hover:text-secondary transition-colors">
                  gcoerc.nashik@ggsf.edu.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} College Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

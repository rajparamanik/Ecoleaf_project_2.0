import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-white">EcoLeaf</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              EcoLeaf is dedicated to building a better tomorrow through tree preservation, 
              education, and community engagement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/trees" className="text-gray-400 hover:text-primary transition-colors">Tree Categories</Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-primary transition-colors">Community</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Tree Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Tree Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/trees/evergreen" className="text-gray-400 hover:text-primary transition-colors">Evergreen Trees</Link>
              </li>
              <li>
                <Link to="/trees/deciduous" className="text-gray-400 hover:text-primary transition-colors">Deciduous Trees</Link>
              </li>
              <li>
                <Link to="/trees/fruit" className="text-gray-400 hover:text-primary transition-colors">Fruit Trees</Link>
              </li>
              <li>
                <Link to="/trees/flowering" className="text-gray-400 hover:text-primary transition-colors">Flowering Trees</Link>
              </li>
              <li>
                <Link to="/trees/endangered" className="text-gray-400 hover:text-primary transition-colors">Endangered Species</Link>
              </li>
              <li>
                <Link to="/trees/medicinal" className="text-gray-400 hover:text-primary transition-colors">Medicinal Trees</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Sarbari, Raghunathpur, Purulia 723121</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span>(+91) 86175 07071</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <a href="mailto:rgpstudent2023@ecoleaf.com" className="hover:text-primary transition-colors">
                  <span>rgpstudent2023@ecoleaf.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {currentYear} EcoLeaf. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-brand-navy text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Grand Anse Beach Palace</h3>
            <p className="text-gray-300 mb-4">
              Your beachfront paradise in Grenada's most beautiful location
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('#about')}
                  className="text-gray-300 hover:text-brand-sunshine transition-colors focus:outline-none focus:underline"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#rooms')}
                  className="text-gray-300 hover:text-brand-sunshine transition-colors focus:outline-none focus:underline"
                >
                  Our Rooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#explore')}
                  className="text-gray-300 hover:text-brand-sunshine transition-colors focus:outline-none focus:underline"
                >
                  Explore Grenada
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#rates')}
                  className="text-gray-300 hover:text-brand-sunshine transition-colors focus:outline-none focus:underline"
                >
                  Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="text-gray-300 hover:text-brand-sunshine transition-colors focus:outline-none focus:underline"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-300">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Grand Anse Beach, St. George's, Grenada</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <a
                  href="tel:+14734444000"
                  className="hover:text-brand-sunshine transition-colors"
                >
                  +1 (473) 444-4000
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <a
                  href="mailto:grandansepalace@gmail.com"
                  className="hover:text-brand-sunshine transition-colors"
                >
                  grandansepalace@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Check-in Information</h4>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-semibold text-white">Check-in:</span> 2:00 PM
              </p>
              <p>
                <span className="font-semibold text-white">Check-out:</span> 11:00 AM
              </p>
              <p className="text-sm mt-4">
                Early check-in and late check-out available upon request, subject to availability
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm text-center md:text-left">
              © {currentYear} Grand Anse Beach Palace. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs text-center md:text-right">
              Photos include on-site images and representative views of Grand Anse & Grenada
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/Grand Anse Beach Palace Hotel.png';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#rooms', label: 'Rooms' },
    { href: '#explore', label: 'Explore' },
    { href: '#rates', label: 'Rates' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-lg"
          >
            <img
              src={logo}
              alt="Grand Anse Beach Palace"
              className="h-14 sm:h-16 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-700 hover:text-brand-primary font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-lg px-3 py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="bg-brand-primary text-white px-6 py-2.5 rounded-2xl font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            >
              Book Now
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-lg"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand-primary font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="block text-center bg-brand-primary text-white px-4 py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

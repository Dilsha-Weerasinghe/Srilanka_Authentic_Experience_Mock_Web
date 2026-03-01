import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Tours', href: '#tours' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`nav-fixed ${isScrolled ? 'scrolled' : ''}`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center">
          <span className="text-lg md:text-xl font-bold text-white uppercase tracking-wide">
            Sri Lanka Travel <span className="text-[#D4A03A]">V3N</span> Tours
          </span>
        </a>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden md:block btn-outline-accent text-xs py-2 px-4"
          >
            Plan Your Trip
          </a>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 text-white hover:text-[#D4A03A] transition-colors"
          >
            <span className="text-sm font-medium uppercase tracking-wider hidden sm:inline">Menu</span>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[200] bg-[#0B3D2E] transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-[6vw] text-white hover:text-[#D4A03A] transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Menu Content */}
        <div className="h-full flex flex-col items-center justify-center">
          {/* Logo in Menu */}
          <div className="mb-12 text-center">
            <span className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide flex flex-col leading-tight gap-2">
              <span>Sri Lanka Travel</span>
              <span className="text-[#D4A03A]">V3N Tours</span>
            </span>
          </div>

          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-3xl md:text-4xl font-bold uppercase tracking-tight hover:text-[#D4A03A] transition-colors"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.4s ease ${index * 0.1}s`
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Menu CTA */}
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-12 btn-primary"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.4s ease 0.4s'
            }}
          >
            Request a Quote
          </a>
        </div>
      </div>
    </>
  );
}

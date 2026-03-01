import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Tours', href: '#tours' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Group tours',
  'Private tours',
  'Airport Taxi Service',
  'Boat Safari',
  'Elephant Safari',
  'Luxury Tour',
  'Round Tour',
  'Sri Lanka Tour',
  'Village Tour',
  'Whale Watching',
  'Yoga And Meditation',
];

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    const columns = content.querySelectorAll('.footer-column');

    const ctx = gsap.context(() => {
      gsap.fromTo(columns,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.3,
          }
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-50 bg-[#0B3D2E] pt-16 md:pt-20 pb-8"
    >
      <div ref={contentRef} className="px-[7vw]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Brand Column with Logo */}
          <div className="footer-column">
            <div className="mb-6">
              <span className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide flex flex-col leading-tight gap-1">
                <span>Sri Lanka Travel</span>
                <span className="text-[#D4A03A]">V3N Tours</span>
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Tailor-made Sri Lanka journeys designed with authenticity, comfort, and personalized service at heart.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#D4A03A] hover:border-[#D4A03A] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#D4A03A] hover:border-[#D4A03A] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 text-sm hover:text-[#D4A03A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/70 text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D4A03A] mt-0.5" />
                <a
                  href="mailto:info@srilankatravelv3ntours.com"
                  className="text-white/70 text-sm hover:text-[#D4A03A] transition-colors"
                >
                  info@srilankatravelv3ntours.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4A03A] mt-0.5" />
                <a
                  href="tel:+94718965775"
                  className="text-white/70 text-sm hover:text-[#D4A03A] transition-colors"
                >
                  +94 71 896 5775
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4A03A] mt-0.5" />
                <span className="text-white/70 text-sm">
                  Colombo, Sri Lanka (Island Wide Travel)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-xs">
              © 2026 Sri Lanka travel V3N tours. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/50 text-xs hover:text-white/70 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/50 text-xs hover:text-white/70 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

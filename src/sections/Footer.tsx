import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About Us', href: '/about' },
    { label: 'Turnkey Projects', href: '/services/turnkey' },
    { label: 'Refurbishment', href: '/services/refurbishment' },
    { label: 'Contact', href: '/contact' },
  ];

  const productLinks = [
    { label: 'Blow Moulding Machines', href: '/products' },
    { label: 'BFS Moulds', href: '/products' },
    { label: 'PET Bottle Moulds', href: '/products' },
    { label: 'Hydraulic Cylinders', href: '/products' },
    { label: 'SS Filter Housings', href: '/products' },
    { label: 'Ampoule Filling', href: '/products' },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-bvm-footer border-t border-white/5"
    >
      {/* Main Footer Content */}
      <div className="px-4 sm:px-8 lg:px-[8vw] py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img
                src={theme === 'dark' ? '/new_assets/optimized/bvm-logo-dark.webp' : '/new_assets/optimized/bvm-logo-light.webp'}
                alt="BVM Industries"
                width={360}
                height={128}
                className="h-16 w-auto object-contain"
                loading="lazy"
              />
            </Link>
            <p className="text-bvm-gray text-sm leading-relaxed mb-6">
              Precision engineering for aseptic packaging. Manufacturer of blow moulding
              machines, BFS moulds, and precision components for pharmaceutical and industrial applications.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="tel:+917949303163"
                className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-bvm-gray hover:bg-bvm-blue hover:text-white transition-all"
                aria-label="Call BVM"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="mailto:sales@bvmindustries.com"
                className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-bvm-gray hover:bg-bvm-blue hover:text-white transition-all"
                aria-label="Email BVM"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-bvm-gray hover:text-bvm-blue text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-bvm-gray hover:text-bvm-blue text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Map */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-bvm-blue mt-0.5 flex-shrink-0" />
                <div className="text-bvm-gray text-sm">
                  <p>Ground Floor, Khasra No. 929/565/280</p>
                  <p>Sai Road, Near Affy Parenterals</p>
                  <p>Baddi, Solan - 173205, HP, India</p>
                </div>
              </div>

              <a
                href="tel:+917949303163"
                className="flex items-center gap-3 text-bvm-gray hover:text-bvm-blue text-sm transition-colors"
              >
                <Phone className="w-5 h-5 text-bvm-blue flex-shrink-0" />
                +91-79493-03163
              </a>

              <a
                href="mailto:sales@bvmindustries.com"
                className="flex items-center gap-3 text-bvm-gray hover:text-bvm-blue text-sm transition-colors"
              >
                <Mail className="w-5 h-5 text-bvm-blue flex-shrink-0" />
                sales@bvmindustries.com
              </a>
            </div>


          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="px-4 sm:px-8 lg:px-[8vw] py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-bvm-gray text-sm text-center sm:text-left">
              © 2026 BVM Industries. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-bvm-gray">GST: <span
                className="text-white cursor-text select-all"
                onDoubleClick={(e) => { if (e.detail === 3) navigate('/quotation'); }}
                onClick={(e) => { if (e.detail === 3) navigate('/quotation'); }}
              >02GNLPS7342F1ZS</span></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

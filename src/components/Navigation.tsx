import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Sun, Moon, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    {
      label: 'Applications',
      href: '/machines',
      dropdown: [
        { label: 'Injectables (SVP/LVP)', href: '/machines?filter=injectables' },
        { label: 'Ophthalmic', href: '/machines?filter=ophthalmic' },
        { label: 'Respiratory', href: '/machines?filter=respiratory' },
        { label: 'Oral Liquids', href: '/machines?filter=oral' },
      ]
    },
    {
      label: 'Machines',
      href: '/machines',
      dropdown: [
        { label: 'F.F.S Machines', href: '/machines/ffs' },
        { label: 'B.F.S Machines', href: '/machines/bfs' },
        { label: 'Euro Cap Sealing', href: '/machines/euro-cap-sealing' },
      ]
    },
    { label: 'Moulds', href: '/moulds' },
    { label: 'Products', href: '/products' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/career' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  return (
    <>
      {/* Top contact bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-bvm-navy/90 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center justify-between px-4 sm:px-8 py-2 text-xs">
          <div className="flex items-center gap-4 text-bvm-gray">
            <a href="mailto:sales@bvmindustries.com" className="hover:text-bvm-blue transition-colors">
              sales@bvmindustries.com
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="tel:+917949303163" className="flex items-center gap-1 hover:text-bvm-blue transition-colors">
              <Phone className="w-3 h-3" />
              +91-79493-03163
            </a>
          </div>
          <div className="hidden sm:block text-bvm-gray">
            Baddi, Himachal Pradesh, India
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'top-0 bg-bvm-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'top-10 bg-transparent'
          }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-8 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={theme === 'dark' ? '/new_assets/optimized/bvm-logo-dark.webp' : '/new_assets/optimized/bvm-logo-light.webp'}
              alt="BVM Industries"
              width={320}
              height={112}
              className="h-14 w-auto object-contain"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8" ref={dropdownRef}>
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                {link.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${isActive(link.href) || activeDropdown === link.label
                      ? 'text-bvm-blue'
                      : 'text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white'
                      }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-colors ${isActive(link.href)
                      ? 'text-bvm-blue'
                      : 'text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white'
                      }`}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.dropdown && activeDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 w-56 pt-4"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="bg-bvm-navy border border-white/10 rounded-xl shadow-xl overflow-hidden backdrop-blur-xl">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-bvm-gray hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* CTA Button */}
            <Link to="/contact" className="btn-primary text-sm whitespace-nowrap">
              Request a Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-bvm-gray"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-bvm-navy/98 backdrop-blur-md border-t border-white/10 h-screen overflow-y-auto pb-40">
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.label)}
                        className={`flex items-center justify-between w-full text-left text-lg font-medium py-2 transition-colors ${isActive(link.href) ? 'text-bvm-blue' : 'text-gray-700 dark:text-white/80'
                          }`}
                      >
                        {link.label}
                        <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                      </button>

                      {activeDropdown === link.label && (
                        <div className="pl-4 border-l border-white/10 ml-2 space-y-2 mt-2 mb-4">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="block py-2 text-base text-gray-400 hover:text-white transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      className={`block w-full text-left text-lg font-medium py-2 transition-colors ${isActive(link.href)
                        ? 'text-bvm-blue'
                        : 'text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link to="/contact" className="btn-primary w-full mt-6 text-center block">
                Request a Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;

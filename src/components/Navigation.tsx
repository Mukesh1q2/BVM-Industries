import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navStructure } from '../data/navigation';


const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (label: string) => setActiveDropdown(activeDropdown === label ? null : label);

  return (
    <>
      {/* Top Bar — always visible, pinned at top */}
      <div className="fixed top-0 w-full z-50 bg-white/95 dark:bg-bvm-navy/95 border-b border-gray-200 dark:border-white/5 text-gray-600 dark:text-bvm-text-muted shadow-sm dark:shadow-none">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 py-2 flex justify-between items-center text-xs">
          <div className="flex gap-4">
            <a href="mailto:sales@bvmindustries.com" className="hover:text-bvm-blue transition-colors">sales@bvmindustries.com</a>
            <span className="text-gray-300 dark:text-white/20">|</span>
            <a href="tel:+917949303163" className="hover:text-bvm-blue transition-colors">+91-79493-03163</a>
          </div>
          <div className="hidden sm:block">Global Leader in Aseptic Packaging Technology</div>
        </div>
      </div>

      {/* Main Nav — pinned below top bar, consistent size */}
      <nav
        ref={navRef}
        className={`fixed top-[36px] left-0 right-0 z-40 h-16 flex items-center bg-white/90 dark:bg-bvm-navy/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-none'}`}
      >
        <div className="max-w-[1920px] w-full mx-auto px-4 sm:px-8 flex items-center justify-between">

          {/* Logo — strictly dark mode for premium brand consistency */}
          <Link to="/" className="relative z-50 flex items-center" onClick={() => setActiveDropdown(null)}>
            <img
              src="/new_assets/optimized/bvm-logo-dark.webp"
              alt="BVM Logo"
              className="w-auto object-contain h-10"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navStructure.map((item) => (
              <div
                key={item.label}
                className="relative"
              >
                <div className="px-3 py-2 cursor-pointer group flex items-center gap-1">
                  {item.href ? (
                    <Link to={item.href} className="text-sm font-medium transition-colors uppercase tracking-wide text-gray-700 dark:text-white/90 hover:text-bvm-blue" onClick={() => setActiveDropdown(null)}>
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => item.type && toggleDropdown(item.label)}
                      className="text-sm font-medium group-hover:text-bvm-blue transition-colors uppercase tracking-wide flex items-center gap-1 text-gray-700 dark:text-white/90"
                    >
                      {item.label}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  )}

                  {/* Active Indicator */}
                  <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-bvm-blue scale-x-0 transition-transform duration-300 origin-left ${activeDropdown === item.label || (item.href && location.pathname === item.href) ? 'scale-x-100' : 'group-hover:scale-x-100'}`} />
                </div>

                {/* Dropdowns */}
                {activeDropdown === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-max">
                    {item.type === 'mega' ? (
                      /* Mega Menu */
                      <div className="bg-white/95 dark:bg-bvm-navy/95 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl grid grid-cols-3 gap-12 w-[800px] animate-in fade-in slide-in-from-top-2 duration-200">
                        {item.columns?.map((col, idx) => (
                          <div key={idx} className="space-y-4">
                            <h4 className="text-xs font-bold text-bvm-blue uppercase tracking-wider mb-4 border-b border-gray-100 dark:border-white/10 pb-2">{col.title}</h4>
                            <ul className="space-y-3">
                              {col.items.map((subItem) => (
                                <li key={subItem.label}>
                                  <Link to={subItem.href} className="group/item block" onClick={() => setActiveDropdown(null)}>
                                    <div className="flex items-start gap-3">
                                      {subItem.icon && (
                                        <div className="p-2 rounded-lg bg-gray-50 dark:bg-white/5 group-hover/item:bg-bvm-blue/10 dark:group-hover/item:bg-bvm-blue/20 text-gray-500 dark:text-white/70 group-hover/item:text-bvm-blue transition-colors mt-0.5">
                                          <subItem.icon className="w-4 h-4" />
                                        </div>
                                      )}
                                      <div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white group-hover/item:text-bvm-blue transition-colors">{subItem.label}</div>
                                        {subItem.desc && <div className="text-xs text-gray-500 dark:text-white/40 group-hover/item:text-gray-700 dark:group-hover/item:text-white/60 transition-colors mt-0.5">{subItem.desc}</div>}
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Simple Dropdown */
                      <div className="bg-white/95 dark:bg-bvm-navy/95 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-xl p-4 shadow-xl min-w-[220px] animate-in fade-in slide-in-from-top-2 duration-200">
                        <ul className="space-y-1">
                          {item.items?.map((subItem) => (
                            <li key={subItem.label}>
                              <Link to={subItem.href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 group/dItem transition-colors" onClick={() => setActiveDropdown(null)}>
                                {subItem.icon && <subItem.icon className="w-4 h-4 text-gray-500 dark:text-white/50 group-hover/dItem:text-bvm-blue" />}
                                <span className="text-sm text-gray-700 dark:text-white/80 group-hover/dItem:text-gray-900 dark:group-hover/dItem:text-white">{subItem.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/contact" className="group relative px-6 py-2.5 overflow-hidden rounded-full font-semibold text-sm transition-all shadow-lg bg-bvm-blue text-white hover:bg-bvm-blue-dark">
              <span className="relative z-10 flex items-center gap-2">
                Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-900 dark:text-white">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden fixed inset-0 z-30 bg-white dark:bg-bvm-navy transition-transform duration-500 pt-24 px-6 overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="space-y-6">
            {navStructure.map((item) => (
              <div key={item.label} className="border-b border-gray-100 dark:border-white/5 pb-4">
                {item.type ? (
                  <div>
                    <button onClick={() => toggleDropdown(item.label)} className="flex items-center justify-between w-full text-xl font-display font-medium text-gray-900 dark:text-white mb-4">
                      {item.label}
                      <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`space-y-4 pl-4 overflow-hidden transition-all ${activeDropdown === item.label ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      {item.columns ? (
                        // Mega Menu Mobile
                        item.columns.map(col => (
                          <div key={col.title} className="space-y-2">
                            <div className="text-xs font-bold text-bvm-blue uppercase">{col.title}</div>
                            {col.items.map(sub => (
                              <Link key={sub.label} to={sub.href} className="block text-gray-600 dark:text-white/70 py-1" onClick={() => setIsMobileMenuOpen(false)}>{sub.label}</Link>
                            ))}
                          </div>
                        ))
                      ) : (
                        // Dropdown Mobile
                        item.items?.map(sub => (
                          <Link key={sub.label} to={sub.href} className="block text-gray-600 dark:text-white/70 py-1" onClick={() => setIsMobileMenuOpen(false)}>{sub.label}</Link>
                        ))
                      )}
                    </div>
                  </div>
                ) : (
                  item.href && <Link to={item.href} className="block text-xl font-display font-medium text-gray-900 dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>{item.label}</Link>
                )}
              </div>
            ))}
            <Link to="/contact" className="block w-full py-4 text-center bg-bvm-blue text-white rounded-xl font-bold mt-8" onClick={() => setIsMobileMenuOpen(false)}>
              Request a Quote
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;

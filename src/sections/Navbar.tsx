import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Investors', href: '#investors' },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-2rem)] max-w-[1200px] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <nav className="glass-panel rounded-full h-16 px-6 flex items-center justify-between">
        <a href="#" className="font-geist text-xl font-bold text-navy tracking-tight">
          StudySpace
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-navy/70 hover:text-navy transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="bg-teal text-navy font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all">
            <Download size={16} />
            Download App
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-navy"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass-panel rounded-2xl mt-2 p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-navy font-medium hover:text-teal transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button className="bg-teal text-navy font-bold text-sm px-5 py-2.5 rounded-full flex items-center justify-center gap-2 hover:brightness-105 transition-all">
            <Download size={16} />
            Download App
          </button>
        </div>
      )}
    </header>
  );
}

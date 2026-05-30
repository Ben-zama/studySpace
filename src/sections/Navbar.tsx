import { useState, useEffect } from 'react';
import { Menu, X, Download, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/use-auth';
import { Link } from 'react-router';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Investors', href: '#investors' },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

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

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-navy/70 flex items-center gap-2">
                <UserIcon size={16} />
                {user.name}
              </span>
              <button 
                onClick={() => logout()}
                className="bg-red-50 text-red-500 font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-red-100 active:scale-[0.98] transition-all"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/auth"
              className="bg-teal text-navy font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all"
            >
              <UserIcon size={16} />
              Login / Sign Up
            </Link>
          )}
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
          
          <div className="h-px w-full bg-navy/10 my-2"></div>
          
          {user ? (
            <>
              <div className="flex items-center gap-2 text-navy font-medium">
                <UserIcon size={16} />
                {user.name}
              </div>
              <button 
                onClick={() => { logout(); setMenuOpen(false); }}
                className="bg-red-50 text-red-500 font-bold text-sm px-5 py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-red-100 transition-all mt-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="bg-teal text-navy font-bold text-sm px-5 py-2.5 rounded-full flex items-center justify-center gap-2 hover:brightness-105 transition-all mt-2"
            >
              <UserIcon size={16} />
              Login / Sign Up
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

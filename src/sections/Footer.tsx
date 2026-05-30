import { useState, useRef, useEffect } from 'react';
import { Download, Send, Mail, Phone, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    contactName: '',
    whatsapp: '',
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({ businessName: '', category: '', contactName: '', whatsapp: '' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="investors"
      ref={sectionRef}
      className="relative bg-navy text-white overflow-hidden"
      style={{ zIndex: 2 }}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-12">
        {/* B2B Portal */}
        <div className="grid lg:grid-cols-2 gap-16 pb-16 border-b border-white/10">
          {/* Investor Pitch */}
          <div>
            <span className="text-teal text-sm font-medium uppercase tracking-widest mb-4 block">
              Investor Relations
            </span>
            <h2 className="font-geist text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Partner with
              <br />
              StudySpace
            </h2>
            <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-md">
              Interested in funding our regional campus expansion? Partner with
              the StudySpace Syndicate and be part of the future of campus
              productivity.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-teal text-navy font-bold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all text-sm">
                <Download size={16} />
                Download Venture Proposal
              </button>
              <button onClick={() => window.location.href = 'mailto:your.studyspace.gmail.com'} className="border border-white/30 text-white font-semibold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-sm">
                <Mail size={16} />
                Contact Team
              </button>
            </div>

            <div className="mt-10 flex flex-col md:flex-row items-center gap-8 text-white/40 text-sm">
              <span className="flex items-center gap-2">
                <Phone size={14} />
                +234 903 1128 162
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} />
                Bowen University, Nigeria
              </span>
            </div>
          </div>

          {/* Merchant Onboarding Form */}
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <span className="text-teal text-sm font-medium uppercase tracking-widest mb-4 block">
              Merchant Onboarding
            </span>
            <h3 className="font-geist text-2xl font-bold mb-2">
              Join Our Network
            </h3>
            <p className="text-white/50 text-sm mb-8">
              Sell on StudySpace. Reach thousands of students daily.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-teal focus:outline-none transition-colors"
                />
              </div>
              <div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-teal focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-navy text-white/50">
                    Service Category
                  </option>
                  <option value="food" className="bg-navy">Food & Snacks</option>
                  <option value="stationery" className="bg-navy">
                    Stationery & Supplies
                  </option>
                  <option value="printing" className="bg-navy">
                    Printing Services
                  </option>
                  <option value="advertising" className="bg-navy">
                    In-App Advertising
                  </option>
                  <option value="other" className="bg-navy">Other</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  name="contactName"
                  placeholder="Contact Name"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-teal focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="WhatsApp Number"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-teal focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal text-navy font-bold py-3.5 rounded-full flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all text-sm"
              >
                <Send size={16} />
                Submit Application
              </button>
            </form>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="pt-12 relative">
          {/* Giant watermark */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none">
            <span
              className="block text-center font-geist font-extrabold text-white/[0.03] whitespace-nowrap"
              style={{ fontSize: 'clamp(80px, 15vw, 200px)', letterSpacing: '-0.02em' }}
            >
              STUDYSPACE
            </span>
          </div>

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="font-geist text-2xl font-bold tracking-tight">
              StudySpace
            </div>

            <div className="flex items-center gap-8 text-white/40 text-sm">
              <a href="#" className="hover:text-teal transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-teal transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-teal transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-teal transition-colors">
                Careers
              </a>
            </div>

            <div className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} StudySpace. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

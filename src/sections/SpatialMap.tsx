import { useState, useRef, useEffect } from 'react';
import { Zap, Snowflake, VolumeX, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Desk {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  available: boolean;
  hasPower: boolean;
  hasAC: boolean;
  isSilent: boolean;
}

const desks: Desk[] = [
  { id: 'LIB-01', x: 60, y: 40, width: 40, height: 30, available: true, hasPower: true, hasAC: true, isSilent: true },
  { id: 'LIB-02', x: 110, y: 40, width: 40, height: 30, available: false, hasPower: true, hasAC: true, isSilent: true },
  { id: 'LIB-03', x: 160, y: 40, width: 40, height: 30, available: true, hasPower: false, hasAC: true, isSilent: true },
  { id: 'LIB-04', x: 210, y: 40, width: 40, height: 30, available: true, hasPower: true, hasAC: false, isSilent: false },
  { id: 'LIB-05', x: 60, y: 90, width: 40, height: 30, available: false, hasPower: true, hasAC: true, isSilent: true },
  { id: 'LIB-06', x: 110, y: 90, width: 40, height: 30, available: true, hasPower: true, hasAC: false, isSilent: false },
  { id: 'LIB-07', x: 160, y: 90, width: 40, height: 30, available: true, hasPower: false, hasAC: true, isSilent: true },
  { id: 'LIB-08', x: 210, y: 90, width: 40, height: 30, available: false, hasPower: true, hasAC: true, isSilent: false },
  { id: 'LIB-09', x: 60, y: 140, width: 40, height: 30, available: true, hasPower: true, hasAC: true, isSilent: true },
  { id: 'LIB-10', x: 110, y: 140, width: 40, height: 30, available: true, hasPower: false, hasAC: false, isSilent: false },
  { id: 'LIB-11', x: 160, y: 140, width: 40, height: 30, available: false, hasPower: true, hasAC: true, isSilent: true },
  { id: 'LIB-12', x: 210, y: 140, width: 40, height: 30, available: true, hasPower: true, hasAC: true, isSilent: false },
];

const filters = [
  { key: 'hasPower', label: 'Power', icon: Zap },
  { key: 'hasAC', label: 'A/C', icon: Snowflake },
  { key: 'isSilent', label: 'Silent', icon: VolumeX },
] as const;

export default function SpatialMap() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const isDeskVisible = (desk: Desk) => {
    if (activeFilters.size === 0) return true;
    for (const filter of activeFilters) {
      if (desk[filter as keyof Desk]) return true;
    }
    return false;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative min-h-screen bg-navy overflow-hidden"
      style={{ zIndex: 2 }}
    >

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <span className="text-teal text-sm font-medium uppercase tracking-widest mb-4 block">
              Interactive Demo
            </span>
            <h2 className="font-geist text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
              See Available
              <br />
              Spaces in Real-Time
            </h2>
            <p className="mt-6 text-white/60 text-lg max-w-md leading-relaxed">
              Toggle filters to find your ideal study environment. Our live campus
              layout twin shows exactly which desks match your preferences.
            </p>

            {/* Filter Buttons */}
            <div className="mt-10 flex flex-wrap gap-3">
              {filters.map((f) => {
                const Icon = f.icon;
                const isActive = activeFilters.has(f.key);
                return (
                  <button
                    key={f.key}
                    onClick={() => toggleFilter(f.key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-teal text-navy'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <Icon size={16} />
                    {f.label}
                  </button>
                );
              })}
              {activeFilters.size > 0 && (
                <button
                  onClick={() => setActiveFilters(new Set())}
                  className="px-4 py-2.5 rounded-full text-sm font-medium text-white/50 hover:text-white transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-mono font-bold text-teal">
                  {desks.filter((d) => d.available).length}
                </div>
                <div className="text-white/40 text-sm mt-1">Available</div>
              </div>
              <div>
                <div className="text-3xl font-mono font-bold text-white/70">
                  {desks.filter((d) => !d.available).length}
                </div>
                <div className="text-white/40 text-sm mt-1">Occupied</div>
              </div>
              <div>
                <div className="text-3xl font-mono font-bold text-white">
                  {desks.length}
                </div>
                <div className="text-white/40 text-sm mt-1">Total Desks</div>
              </div>
            </div>
          </div>

          {/* Right: Interactive HTML Map */}
          <div className="relative">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-teal/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative bg-[#0A1124]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 lg:p-8 overflow-hidden">
              {/* Architectural Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

              <div className="relative flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-geist font-semibold text-white text-xl">
                    LIB Floor 1 — East Wing
                  </h3>
                  <p className="text-white/50 text-sm mt-1">
                    Select an available desk to book
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-teal/10 border border-teal/20 rounded-full px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
                  </span>
                  <span className="text-xs font-mono font-medium text-teal uppercase tracking-wider">Live</span>
                </div>
              </div>

              {/* HTML Grid Floor Plan */}
              <div className="relative grid grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {desks.map((desk) => {
                  const visible = isDeskVisible(desk);
                  return (
                    <div
                      key={desk.id}
                      className={`group relative aspect-square rounded-2xl p-3 sm:p-4 border transition-all duration-500 cursor-pointer overflow-hidden ${
                        !visible ? 'opacity-20 scale-95 grayscale' : 'opacity-100 scale-100 hover:scale-105 hover:z-10'
                      } ${
                        desk.available
                          ? 'bg-teal/10 border-teal/30 hover:border-teal hover:bg-teal/20 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]'
                          : 'bg-rose-500/5 border-rose-500/20 hover:border-rose-500/50 hover:bg-rose-500/10'
                      }`}
                    >
                      {/* Desk Header */}
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] sm:text-xs font-bold text-white/90">
                          {desk.id.replace('LIB-', '')}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${
                            desk.available ? 'bg-teal shadow-teal/50' : 'bg-rose-500 shadow-rose-500/50'
                          }`}
                        />
                      </div>

                      {/* Desk Center / Status */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className={`text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${desk.available ? 'text-teal' : 'text-rose-400'}`}>
                          {desk.available ? 'Book' : 'Full'}
                        </span>
                      </div>

                      {/* Icons Footer */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 transition-opacity duration-300 group-hover:opacity-10">
                        {desk.hasPower && <Zap size={12} className="text-amber-400" />}
                        {desk.hasAC && <Snowflake size={12} className="text-blue-400" />}
                        {desk.isSilent && <VolumeX size={12} className="text-purple-400" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend & Quick Info */}
              <div className="relative mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs font-medium">
                  <span className="flex items-center gap-2 text-white/70">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal shadow-[0_0_8px_rgba(0,229,255,0.5)]" />
                    Available
                  </span>
                  <span className="flex items-center gap-2 text-white/70">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                    Occupied
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-white/50">
                  <span className="flex items-center gap-1"><Zap size={12}/> Power</span>
                  <span className="flex items-center gap-1"><Snowflake size={12}/> A/C</span>
                  <span className="flex items-center gap-1"><VolumeX size={12}/> Silent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

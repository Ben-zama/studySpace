import { useEffect, useRef } from 'react';
import { Download, Globe, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      h1Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.inOut' },
        '+=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ zIndex: 1 }}
    >
      <div ref={contentRef} className="text-center max-w-3xl mx-auto">
        <h1
          ref={h1Ref}
          className="font-geist text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-200 tracking-tight leading-tight opacity-0"
          style={{ letterSpacing: '-0.02em' }}
        >
          Your Seat is Waiting
        </h1>

        <p
          ref={subRef}
          className="mt-6 text-lg sm:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed opacity-0"
        >
          Eradicate campus space-hunting. Reserve premium desks, secure your
          belongings, and order study snacks directly to your desk ID in under
          30 seconds.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <button className="bg-teal text-navy font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all text-base shadow-lg shadow-teal/20">
            <Download size={20} />
            Download App
          </button>
          <button className="border border-gray-200 text-gray-200 font-semibold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-gray-200 hover:text-navy transition-all text-base">
            <Globe size={20} />
            Use Web Version
          </button>
        </div>

{/*    
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="bg-navy text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </div>
          <div className="bg-navy text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h.37L20.7 11.52c.37.28.37.68 0 .96L4.87 22h-.37c-.83 0-1.5-.67-1.5-1.5zM16.5 14.2L5.5 21.5V2.5l11 11.7zM19 3h2v2h-2V3zm0 16h2v2h-2v-2zm4-8h2v2h-2v-2z" />
            </svg>
            Google Play
          </div>
        </div> */}
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={24} className="animate-bounce" />
      </div>
    </section>
  );
}

import { useRef, useEffect } from 'react';
import { Camera, Coins, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Camera,
    title: 'Photo Verification',
    description: 'Upload a photo to end your session and keep spaces accountable.',
    color: 'bg-teal/10 text-teal',
  },
  {
    icon: Coins,
    title: 'Report & Earn',
    description: 'Report dirty spaces, fine the offender ₦300, earn ₦100 wallet credit.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Users,
    title: 'Eco-Marshals',
    description: 'Our 30-person on-ground team keeps every space pristine.',
    color: 'bg-emerald-100 text-emerald-600',
  },
];

export default function GreenStudy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
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
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-pale-gray overflow-hidden"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-teal text-sm font-medium uppercase tracking-widest mb-4 block">
            Accountability
          </span>
          <h2 className="font-geist text-4xl sm:text-5xl font-bold text-navy tracking-tight">
            Green Study Initiative
          </h2>
          <p className="mt-4 text-slate text-lg max-w-lg mx-auto">
            Our ground mechanics keep spaces clean and incentivize responsible campus behavior.
          </p>
        </div>
      </div>

      {/* Timeline indicators */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="text-center">
                <div
                  className={`w-16 h-16 rounded-2xl ${card.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon size={28} />
                </div>
                <div className="font-mono text-3xl font-bold text-navy mb-2">
                  0{i + 1}
                </div>
                <h3 className="font-geist font-semibold text-navy text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed max-w-xs mx-auto">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

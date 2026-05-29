import { useState, useRef, useEffect } from 'react';
import { Check, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const individualPlans: Plan[] = [
  {
    name: 'Pay-Per-Use',
    price: '₦400',
    period: '/session',
    description: 'Perfect for occasional studiers',
    features: ['Max 2-hour session cap', 'Instant booking', 'Basic desk access', 'Standard support'],
    cta: 'Select Plan',
  },
  {
    name: 'Monthly Basic',
    price: '₦2,000',
    period: '/month',
    description: 'Ideal for dedicated individual studiers',
    features: ['Unlimited access', '24/7 booking', 'All desk types', 'Priority email support'],
    cta: 'Select Plan',
  },
  {
    name: 'Premium Elite',
    price: '₦5,000',
    period: '/month',
    description: 'The ultimate study experience',
    features: ['48-hour priority booking', 'VIP A/C zones', 'Zero delivery fees', 'Personal concierge'],
    popular: true,
    cta: 'Select Plan',
  },
];

const groupPlans: Plan[] = [
  {
    name: 'Group of 5',
    price: '₦15,000',
    period: '/month',
    description: 'Team workspace pass for 5 students',
    features: ['₦3,000 per student', '40% savings over individual', 'Team workspace block', 'Shared calendar', 'Group snack ordering'],
    popular: true,
    cta: 'Select Plan',
  },
];

export default function Pricing() {
  const [isGroup, setIsGroup] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const plans = isGroup ? groupPlans : individualPlans;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.pricing-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-20 lg:py-28"
      style={{
        zIndex: 2,
        background: '#F5F7FA',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-teal text-sm font-medium uppercase tracking-widest mb-4 block">
            Pricing
          </span>
          <h2 className="font-geist text-4xl sm:text-5xl font-bold text-navy tracking-tight">
            Choose Your Flow
          </h2>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center bg-white rounded-full p-1 shadow-card">
            <button
              onClick={() => setIsGroup(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                !isGroup ? 'bg-navy text-white' : 'text-navy/60 hover:text-navy'
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setIsGroup(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                isGroup ? 'bg-navy text-white' : 'text-navy/60 hover:text-navy'
              }`}
            >
              Group
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className={`grid gap-6 ${
            isGroup ? 'max-w-md mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-shadow relative ${
                plan.popular ? 'ring-2 ring-teal' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-navy text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={12} />
                  Most Popular
                </div>
              )}

              <h3 className="font-geist text-xl font-semibold text-navy">
                {plan.name}
              </h3>
              <p className="text-slate text-sm mt-1">{plan.description}</p>

              <div className="mt-6 flex items-baseline">
                <span className="font-mono text-4xl font-bold text-navy">
                  {plan.price}
                </span>
                <span className="text-slate ml-1">{plan.period}</span>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-navy/80">
                    <Check size={16} className="text-teal mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full py-3.5 rounded-full font-semibold text-sm transition-all active:scale-[0.98] ${
                  plan.popular
                    ? 'bg-teal text-navy hover:brightness-105'
                    : 'border border-navy text-navy hover:bg-navy hover:text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

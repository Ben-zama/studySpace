import { useRef, useEffect } from 'react';
import { Upload, ShoppingCart, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: 'Academic Stationery Set',
    price: '₦5,500',
    image: '/stationery-set.jpg',
    category: 'Stationery',
  },
  {
    name: 'Premium Notebook & Pen',
    price: '₦3,200',
    image: '/notebook-planner.jpg',
    category: 'Planners',
  },
  {
    name: 'Study Snacks Bundle',
    price: '₦2,800',
    image: '/study-snacks.jpg',
    category: 'Snacks',
  },
  {
    name: 'Print Services',
    price: 'From ₦100',
    image: '/print-portal.jpg',
    category: 'Printing',
  },
];

export default function Marketplace() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        uploadRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );

      const productCards = productsRef.current?.querySelectorAll('.product-card');
      if (productCards) {
        gsap.fromTo(
          productCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: productsRef.current,
              start: 'top 65%',
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
      id="marketplace"
      ref={sectionRef}
      className="relative py-32 lg:py-40 bg-pale-gray"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Print Portal */}
          <div ref={uploadRef}>
            <span className="text-teal text-sm font-medium uppercase tracking-widest mb-4 block">
              Study-Concierge
            </span>
            <h2 className="font-geist text-4xl sm:text-5xl font-bold text-navy tracking-tight leading-tight">
              Study-Concierge
              <br />
              Services
            </h2>
            <p className="mt-6 text-slate text-lg leading-relaxed max-w-md">
              Upload documents for desk-side printing, order study snacks, and
              browse premium academic supplies — all delivered to your desk ID.
            </p>

            {/* Upload Zone */}
            <div className="mt-10 bg-white rounded-3xl p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                  <FileText size={20} className="text-teal" />
                </div>
                <div>
                  <h3 className="font-geist font-semibold text-navy">
                    Print Portal
                  </h3>
                  <p className="text-slate text-sm">
                    Upload and print to any desk
                  </p>
                </div>
              </div>

              <div className="border-2 border-dashed border-navy/10 rounded-2xl p-6 sm:p-10 text-center hover:border-teal/50 hover:bg-teal/5 transition-all cursor-pointer group">
                <Upload
                  size={32}
                  className="mx-auto text-navy/30 group-hover:text-teal transition-colors"
                />
                <p className="mt-4 text-navy font-medium">
                  Drop your files here
                </p>
                <p className="mt-1 text-slate text-sm">
                  PDF or Word, max 50MB each
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <select className="bg-pale-gray rounded-lg px-4 py-3 sm:py-2.5 text-sm text-navy border-0 outline-none cursor-pointer w-full sm:w-auto">
                  <option>Black & White</option>
                  <option>Color</option>
                </select>
                <input
                  type="text"
                  placeholder="Desk ID (e.g. LIB-01)"
                  className="bg-pale-gray rounded-lg px-4 py-3 sm:py-2.5 text-sm text-navy border-0 outline-none flex-1 placeholder:text-slate/50 w-full"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-100">
                <span className="text-sm text-slate">Delivery fee</span>
                <span className="font-mono font-semibold text-navy">₦100 flat</span>
              </div>

              <button className="mt-4 w-full bg-teal text-navy font-semibold py-3.5 rounded-full hover:brightness-105 active:scale-[0.98] transition-all text-sm">
                Upload & Print
              </button>
            </div>
          </div>

          {/* Right: Product Grid */}
          <div ref={productsRef} className="grid sm:grid-cols-2 gap-6">
            {products.map((product) => (
              <div
                key={product.name}
                className="product-card bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
              >
                <div className="gallery-item aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-150 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-teal uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-geist font-semibold text-navy mt-1 text-base">
                    {product.name}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono font-bold text-navy text-lg">
                      {product.price}
                    </span>
                    <button className="bg-navy/5 hover:bg-navy hover:text-white text-navy p-2.5 rounded-full transition-all">
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

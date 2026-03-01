import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 1,
    title: 'What to pack for a Sri Lanka safari',
    excerpt: 'Essential gear and tips for an unforgettable wildlife experience in Yala and Udawalawe.',
    image: '/images/journal_safari.jpg',
  },
  {
    id: 2,
    title: 'How many days do you need?',
    excerpt: 'A practical guide to planning the perfect itinerary based on your interests and pace.',
    image: '/images/journal_train.jpg',
  },
  {
    id: 3,
    title: 'The best time to visit the hill country',
    excerpt: 'Discover when to catch the misty mornings and lush green tea plantations at their finest.',
    image: '/images/journal_waterfall.jpg',
  },
];

export default function JournalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const cardElements = cards.querySelectorAll('.journal-card');

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(header, 
        { y: 24, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4,
          }
        }
      );

      // Cards reveal (staggered)
      cardElements.forEach((card) => {
        gsap.fromTo(card, 
          { y: 40, opacity: 0, scale: 0.98 }, 
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.4,
            }
          }
        );

        // Image parallax
        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(img, 
            { y: -12 }, 
            { 
              y: 12, 
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.4,
              }
            }
          );
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="journal"
      className="relative z-40 bg-[#F4F1EA] py-20 md:py-28"
    >
      <div className="px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <div className="eyebrow text-[#0B3D2E] mb-3">Journal</div>
          <h2 className="text-[#0B3D2E] text-3xl md:text-4xl lg:text-5xl font-bold uppercase">
            Stories from the Island
          </h2>
        </div>
        
        {/* Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {articles.map((article) => (
            <article 
              key={article.id}
              className="journal-card cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="p-6 bg-white">
                <h3 className="text-[#0B3D2E] text-lg font-semibold mb-2 group-hover:text-[#D4A03A] transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-[#D4A03A] text-sm font-medium">
                  <span>Read more</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="btn-outline-accent border-[#0B3D2E] text-[#0B3D2E] hover:bg-[#0B3D2E] hover:text-white">
            Read More Stories
          </button>
        </div>
      </div>
    </section>
  );
}

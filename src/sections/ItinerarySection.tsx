import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, DollarSign } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ItinerarySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const titleBlock = titleBlockRef.current;
    const card = cardRef.current;
    const caption = captionRef.current;

    if (!section || !bg || !titleBlock || !card || !caption) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE phase (0% - 30%)
      scrollTl
        // Background entrance
        .fromTo(bg, 
          { scale: 1.10, y: '6vh', opacity: 0.6 }, 
          { scale: 1, y: 0, opacity: 1, ease: 'none' }, 
          0
        )
        // Eyebrow entrance
        .fromTo(titleBlock.querySelector('.eyebrow'), 
          { x: '-10vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power2.out' }, 
          0
        )
        // Title lines entrance
        .fromTo(titleBlock.querySelectorAll('.title-line'), 
          { x: '-18vw', opacity: 0 }, 
          { x: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' }, 
          0.05
        )
        // Card entrance
        .fromTo(card, 
          { x: '18vw', opacity: 0, scale: 0.96 }, 
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' }, 
          0.10
        )
        // Meta lines entrance
        .fromTo(card.querySelectorAll('.meta-item'), 
          { y: 14, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' }, 
          0.18
        )
        // CTA entrance
        .fromTo(card.querySelector('.card-cta'), 
          { y: 10, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.22
        )
        // Caption entrance
        .fromTo(caption, 
          { opacity: 0 }, 
          { opacity: 1, ease: 'power2.out' }, 
          0.18
        );

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(titleBlock, 
          { x: 0, opacity: 1 }, 
          { x: '-14vw', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(card, 
          { x: 0, opacity: 1 }, 
          { x: '14vw', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(bg, 
          { scale: 1, y: 0 }, 
          { scale: 1.05, y: '-3vh', ease: 'none' }, 
          0.70
        )
        .fromTo(caption, 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.75
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-20">
      {/* Background Image */}
      <img 
        ref={bgRef}
        src="/images/itinerary_ruins.jpg" 
        alt="Ancient Ruins"
        className="bg-image"
      />
      
      {/* Vignette Overlay */}
      <div className="vignette-overlay" />
      
      {/* Title Block - Left */}
      <div 
        ref={titleBlockRef}
        className="absolute z-10 left-[7vw] top-1/2 -translate-y-1/2 w-[42vw] max-w-xl"
      >
        <div className="eyebrow mb-4">Signature Journey</div>
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight">
          <span className="title-line block">10-Day</span>
          <span className="title-line block">Wildlife &</span>
          <span className="title-line block">Culture</span>
        </h2>
      </div>
      
      {/* Info Card - Right */}
      <div 
        ref={cardRef}
        className="absolute z-10 right-[6vw] top-1/2 -translate-y-1/2 w-[28vw] min-w-[320px] max-w-[420px] glass-card rounded-lg p-7"
      >
        {/* Meta Items */}
        <div className="space-y-3 mb-5">
          <div className="meta-item flex items-center gap-3 text-white/80">
            <Clock className="w-4 h-4 text-[#D4A03A]" />
            <span className="text-sm">10 days · 9 nights</span>
          </div>
          <div className="meta-item flex items-center gap-3 text-white/80">
            <Users className="w-4 h-4 text-[#D4A03A]" />
            <span className="text-sm">Private guide & vehicle</span>
          </div>
          <div className="meta-item flex items-center gap-3 text-white/80">
            <DollarSign className="w-4 h-4 text-[#D4A03A]" />
            <span className="text-sm">From USD 2,490 per person</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-white/70 text-sm leading-relaxed mb-6">
          A balanced route through ancient cities, highland tea country, and coastal wildlife—designed for travelers who want depth without rush.
        </p>
        
        {/* CTA */}
        <button className="card-cta btn-outline-accent w-full">
          View Full Itinerary
        </button>
      </div>
      
      {/* Bottom Caption */}
      <div 
        ref={captionRef}
        className="absolute bottom-8 left-[6vw] z-10 text-white/70 text-sm font-light"
      >
        Polonnaruwa, Cultural Triangle
      </div>
    </section>
  );
}

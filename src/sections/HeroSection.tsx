import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const eyebrow = eyebrowRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const caption = captionRef.current;
    const scrollHint = scrollHintRef.current;

    if (!section || !bg || !content || !eyebrow || !headline || !subhead || !cta || !caption || !scrollHint) return;

    const ctx = gsap.context(() => {
      // Initial state - hide elements
      gsap.set([eyebrow, headline, subhead, cta, caption, scrollHint], { opacity: 0 });
      gsap.set(bg, { scale: 1.08, opacity: 0 });

      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ delay: 0.2 });
      
      loadTl
        .to(bg, { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' })
        .to(eyebrow, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.6')
        .to(headline, { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, '-=0.4')
        .to(subhead, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5')
        .to(cta, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .to([caption, scrollHint], { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible state when scrolling back
            gsap.to([eyebrow, headline, subhead, cta, caption, scrollHint], { opacity: 1, y: 0, duration: 0.3 });
            gsap.to(bg, { scale: 1, y: 0, duration: 0.3 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(headline, 
          { y: 0, opacity: 1 }, 
          { y: '-18vh', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo([subhead, cta], 
          { y: 0, opacity: 1 }, 
          { y: '-10vh', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo([eyebrow, caption, scrollHint], 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.75
        )
        .fromTo(bg, 
          { scale: 1, y: 0 }, 
          { scale: 1.06, y: '-4vh', ease: 'none' }, 
          0.70
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-10">
      {/* Background Image */}
      <img 
        ref={bgRef}
        src="/images/hero_sigiriya.jpg" 
        alt="Sigiriya Rock Fortress"
        className="bg-image"
      />
      
      {/* Vignette Overlay */}
      <div className="vignette-overlay" />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
      >
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="eyebrow mb-6 text-center">
          Sri Lanka travel V3N tours
        </div>
        
        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="text-center text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight max-w-5xl"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.4)' }}
        >
          Discover the<br />Authentic Soul
        </h1>
        
        {/* Subheadline */}
        <p 
          ref={subheadRef}
          className="mt-8 text-center text-white/80 text-lg md:text-xl max-w-2xl font-light"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
        >
          Private, tailor-made journeys through ancient ruins, wildlife, and coast.
        </p>
        
        {/* CTA Buttons */}
        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4">
          <button className="btn-primary">Explore Tours</button>
          <button className="btn-outline">Plan Your Journey</button>
        </div>
      </div>
      
      {/* Bottom Caption */}
      <div 
        ref={captionRef}
        className="absolute bottom-8 left-[6vw] z-10 text-white/70 text-sm font-light"
      >
        Sigiriya, Cultural Triangle
      </div>
      
      {/* Scroll Hint */}
      <div 
        ref={scrollHintRef}
        className="absolute bottom-8 right-[6vw] z-10 flex flex-col items-center text-white/60 text-xs"
      >
        <span className="mb-2 uppercase tracking-widest">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 scroll-hint" />
      </div>
    </section>
  );
}

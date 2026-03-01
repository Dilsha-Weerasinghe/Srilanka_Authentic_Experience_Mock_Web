import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const caption = captionRef.current;

    if (!section || !bg || !content || !caption) return;

    const headline = content.querySelector('h2');
    const body = content.querySelector('p');
    const ctaRow = content.querySelector('.cta-row');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE phase (0% - 30%)
      scrollTl
        // Background entrance
        .fromTo(bg, 
          { scale: 1.08, opacity: 0.7 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        // Headline entrance
        .fromTo(headline, 
          { y: '10vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.06
        )
        // Body entrance
        .fromTo(body, 
          { y: '6vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.14
        )
        // CTA entrance
        .fromTo(ctaRow, 
          { y: '4vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.18
        )
        // Caption entrance
        .fromTo(caption, 
          { opacity: 0 }, 
          { opacity: 1, ease: 'power2.out' }, 
          0.20
        );

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(content, 
          { y: 0, opacity: 1 }, 
          { y: '-6vh', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(bg, 
          { scale: 1 }, 
          { scale: 1.04, ease: 'none' }, 
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
    <section ref={sectionRef} className="section-pinned z-50">
      {/* Background Image */}
      <img 
        ref={bgRef}
        src="/images/closing_tea.jpg" 
        alt="Tea Plantations"
        className="bg-image"
      />
      
      {/* Vignette Overlay */}
      <div className="vignette-overlay" />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
      >
        <div className="text-center max-w-3xl">
          <h2 
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-6"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.4)' }}
          >
            Ready to Design<br />Your Journey?
          </h2>
          
          <p 
            className="text-white/80 text-lg md:text-xl leading-relaxed mb-10"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            Tell us what you love—wildlife, culture, food, beach—and we'll craft a day-by-day plan tailored to your pace.
          </p>
          
          <div className="cta-row flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Request a Quote</button>
            <button className="btn-outline">Email Us</button>
          </div>
        </div>
      </div>
      
      {/* Bottom Caption */}
      <div 
        ref={captionRef}
        className="absolute bottom-8 left-[6vw] z-10 text-white/70 text-sm font-light"
      >
        Hill Country
      </div>
    </section>
  );
}

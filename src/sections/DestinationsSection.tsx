import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    id: 1,
    name: 'Cultural Triangle',
    description: 'Ancient cities and sacred caves',
    image: '/images/dest_cultural.jpg',
  },
  {
    id: 2,
    name: 'Hill Country',
    description: 'Tea estates and cool trails',
    image: '/images/dest_hills.jpg',
  },
  {
    id: 3,
    name: 'The Coast',
    description: 'Quiet beaches and whale watching',
    image: '/images/dest_coast.jpg',
  },
];

export default function DestinationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const cardElements = cards.querySelectorAll('.dest-card');
    const cardImages = cards.querySelectorAll('.dest-card img');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.7,
        }
      });

      // ENTRANCE phase (0% - 30%)
      scrollTl
        // Eyebrow entrance
        .fromTo(heading.querySelector('.eyebrow'), 
          { y: -16, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0
        )
        // Heading entrance
        .fromTo(heading.querySelector('h2'), 
          { y: 24, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.06
        )
        // Cards entrance (staggered)
        .fromTo(cardElements[0], 
          { y: '60vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.08
        )
        .fromTo(cardElements[1], 
          { y: '60vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.12
        )
        .fromTo(cardElements[2], 
          { y: '60vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.16
        )
        // Card images scale
        .fromTo(cardImages, 
          { scale: 1.10 }, 
          { scale: 1, ease: 'none' }, 
          0.08
        );

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(cardElements, 
          { y: 0, opacity: 1 }, 
          { y: '-18vh', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(heading, 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.75
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="destinations" className="section-pinned z-30 bg-[#0B3D2E]">
      {/* Heading Block */}
      <div 
        ref={headingRef}
        className="absolute z-10 left-[7vw] top-[14vh]"
      >
        <div className="eyebrow mb-3">Destinations</div>
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold uppercase">
          Culture, Hills<br />& Coast
        </h2>
      </div>
      
      {/* Cards Grid */}
      <div 
        ref={cardsRef}
        className="absolute z-10 left-[7vw] right-[7vw] top-[34vh] flex gap-[2vw]"
      >
        {destinations.map((dest) => (
          <div 
            key={dest.id}
            className="dest-card flex-1 h-[52vh] cursor-pointer"
          >
            <img 
              src={dest.image} 
              alt={dest.name}
              className="w-full h-full object-cover"
            />
            <div className="dest-card-label">
              <h3 className="text-white text-xl font-semibold mb-1">
                {dest.name}
              </h3>
              <p className="text-white/70 text-sm">
                {dest.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

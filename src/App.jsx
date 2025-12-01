import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const images = Array.from({ length: 31 }, (_, i) => `https://picsum.photos/600?${i + 1}`);
 const App = () => {
  useEffect(() => {

    // ✅ LENIS SETUP
    const lenis = new Lenis({ smooth: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ======================
    // SECTION 1 ANIMATION
    // ======================
    document.querySelectorAll('.elem').forEach(elem => {
      let image = elem.querySelector('img');
      let xTransform = gsap.utils.random(-100, 100);

      gsap.timeline()
        .set(image, {
          transformOrigin: `${xTransform < 0 ? '0%' : '100%'} center`
        })
        .to(image, {
          scale: 0,
          scrollTrigger: {
            trigger: elem,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        })
        .to(image, {
          xPercent: xTransform,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: image,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
    });

    // ======================
    // SECTION 2 ANIMATION
    // ======================
    document.querySelectorAll('.elem2').forEach(elem => {
      let image = elem.querySelector('img');

      let xMove = gsap.utils.random(-100, 100);
      let yMove = gsap.utils.random(-100, 100);
      let rotate = gsap.utils.random(-10, 10);

      gsap.set(image, { scale: gsap.utils.random(1.2, 1.5) });

      gsap.timeline({
        scrollTrigger: {
          trigger: elem,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      }).to(image, {
        x: xMove,
        y: yMove,
        rotate: rotate,
        scale: 0.6,
        opacity: 0,
        ease: 'power3.out'
      });
    });

    // ======================
    // SECTION 3 ANIMATION
    // ======================
    document.querySelectorAll('.elem3').forEach(elem => {
      let img = elem.querySelector('img');

      let xMove = gsap.utils.random(-120, 120);

      gsap.set(img, {
        scale: gsap.utils.random(1.2, 1.4),
        borderRadius: "0%"
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: elem,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }).to(img, {
        x: xMove,
        scale: 0.65,
        opacity: 0.7,
        borderRadius: "50%",
        ease: 'power3.out'
      });
    });

    // Clean up
    return () => ScrollTrigger.getAll().forEach(t => t.kill());

  }, []);
   return (
    <div className="bg-zinc-900">

    {[1, 2, 3].map((section) => (

      <div className="relative min-h-screen p-8" key={section}>

        <div className="fixed top-10 left-10 text-white text-7xl font-black">GALLERY</div>
        <div className="fixed bottom-10 right-10 text-white tracking-widest">VISUAL COLLECTION</div>

        <div className="grid grid-rows-24 grid-cols-12 gap-20 max-w-7xl mx-auto">

          {images.map((src, i) => (
            <div
              key={`${section}-${i}`}
              className={`${section === 1 ? 'elem' : section === 2 ? 'elem2' : 'elem3'} 
              row-span-2 col-span-2`}
            >
              <img
                src={src}
                className="w-full h-full object-cover rounded-lg shadow-xl"
                alt=""
              />
            </div>
          ))}
        </div>

      </div>

    ))}

    <div className="h-screen bg-zinc-400 flex items-center justify-center">
      <p className="max-w-3xl font-bold text-red-500 text-xl text-center">
        SCROLL EFFECT ZONE — GSAP & LENIS POWERED
      </p>
    </div>

  </div>
   )
 }
 
 export default App
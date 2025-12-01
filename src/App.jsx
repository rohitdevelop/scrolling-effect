import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// DEMO IMAGES
const images = Array.from({ length: 28 }, (_, i) =>
  `https://picsum.photos/600?random=${i + 1}`
);

const App = () => {

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: true,
      lerp: 0.08,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value)
          : window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed"
    });

    lenis.on("scroll", ScrollTrigger.update);

    return () => lenis.destroy();
  }, []);

  useGSAP(() => {

    const items = gsap.utils.toArray(".elem");
    const gridCols = window.innerWidth < 640 ? 2 : 12;

    items.forEach((item, index) => {

      const column = index % gridCols;
      const center = gridCols / 2;
      const distance = Math.abs(center - column);

      const strength = gsap.utils.mapRange(0, center, 0.3, 1.2, distance);

      gsap.fromTo(
        item,
        { y: 80 * strength },
        {
          y: -100 * strength,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );

      gsap.fromTo(
        item.querySelector("img"),
        { scale: 0 },
        {
          scale: 1,
          ease: "Power2.easeInOut",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

    });

    ScrollTrigger.refresh();

  }, []);

  return (
    <div className="bg-zinc-900 text-white overflow-x-hidden">

      {/* TEXT */}
      <h1 className="fixed top-6 left-6 text-6xl font-black opacity-80 pointer-events-none">
        GALLERY
      </h1>
      <p className="fixed bottom-6 right-6 tracking-[0.3em] opacity-80 pointer-events-none">
        VISUAL COLLECTION
      </p>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 pt-40 grid grid-cols-2 sm:grid-cols-6 md:grid-cols-12 gap-20">

        {images.map((src, i) => (
          <div key={i}
            className="elem overflow-hidden rounded-xl shadow-2xl"
            style={{
              gridColumn: `span ${i % 3 === 0 ? 3 : 2}`,
              gridRow: `span ${i % 2 === 0 ? 2 : 3}`
            }}
          >
            <img src={src} className="w-full h-full object-cover" alt="" />
          </div>
        ))}

      </section>

      {/* END SECTION */}
      <div className="h-screen flex items-center justify-center bg-zinc-800 mt-40">
        <p className="text-2xl md:text-3xl text-center max-w-4xl opacity-80">
          CINEMATIC SCROLL POWERED BY GSAP AND LENIS
        </p>
      </div>

    </div>
  );
};

export default App;

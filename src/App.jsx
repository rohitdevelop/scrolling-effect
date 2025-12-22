import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const images = Array.from(
  { length: 28 },
  (_, i) => `https://picsum.photos/700?random=${i + 1}`
);

const App = () => {
  // LENIS SMOOTH SCROLL
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, smoothTouch: true, lerp: 0.07 });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value) : window.scrollY;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    return () => lenis.destroy();
  }, []);

  // GSAP ANIMATIONS
  useEffect(() => {
    // Hero text fade & scale
    gsap.fromTo(".hero-title", 
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power4.out" }
    );

    gsap.fromTo(".hero-subtitle", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
    );

    // Parallax scroll text
    gsap.to(".hero-title", {
      y: 200,
      opacity: 0,
      scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 }
    });
    gsap.to(".hero-subtitle", {
      y: 150,
      opacity: 0,
      scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 }
    });

    // Gallery animation
    const items = gsap.utils.toArray(".elem");

    items.forEach((item, index) => {
      const col = index % 12; // max 12 columns
      const center = 6;
      const distance = Math.abs(center - col);
      const strength = gsap.utils.mapRange(0, center, 0.4, 1.5, distance);

      // Type 1: Vertical Parallax
      gsap.fromTo(item, 
        { y: 120 * strength, rotateZ: -5 }, 
        { y: -150 * strength, rotateZ: 5, ease: "none", scrollTrigger: {
          trigger: item, start: "top bottom", end: "bottom top", scrub: 1.5
        }}
      );

      // Type 2: Scale & Fade on enter
      gsap.fromTo(item.querySelector("img"), 
        { scale: 0, rotate: -10, opacity: 0 }, 
        { scale: 1, rotate: 0, opacity: 1, ease: "power2.out", scrollTrigger: {
          trigger: item, start: "top bottom-=100", end: "top center", scrub: 1
        }}
      );

      // Hover effect
      item.addEventListener("mouseenter", () => gsap.to(item, { scale: 1.05, duration: 0.4, ease: "power2.out" }));
      item.addEventListener("mouseleave", () => gsap.to(item, { scale: 1, duration: 0.4, ease: "power2.out" }));
    });

    // Footer animation
    gsap.fromTo(".footer-text", 
      { opacity: 0, y: 100 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: {
        trigger: ".footer-section", start: "top bottom-=200", end: "top center", scrub: 1
      }}
    );

    ScrollTrigger.refresh();
  }, []);

  return (
  <div className="bg-zinc-900 text-white overflow-x-hidden">
  {/* FIXED TEXT */}
  <h1 className="fixed top-6 left-6 text-4xl sm:text-6xl font-black opacity-70 pointer-events-none">GALLERY</h1>
  <p className="fixed bottom-6 right-6 tracking-[0.3em] opacity-70 pointer-events-none text-xs sm:text-sm">VISUAL COLLECTION</p>

  {/* HERO GRID */}
  <section className="hero-section relative max-w-7xl mx-auto px-6 pt-40 grid grid-cols-2 sm:grid-cols-6 md:grid-cols-12 gap-16 sm:gap-20">
    {images.map((src, i) => (
      <div
        key={i}
        className="elem z-10 overflow-hidden rounded-2xl shadow-2xl bg-zinc-800"
        style={{
          gridColumn: `span ${i % 3 === 0 ? 3 : 2}`,
          gridRow: `span ${i % 2 === 0 ? 2 : 3}`,
        }}
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    ))}

    {/* CENTER CINEMATIC TEXT */}
    <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none">
      <h2 className="center-text text-center text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl leading-tight opacity-90">
        CINEMATIC SCROLL EXPERIENCE <br />
        <span className="text-zinc-400 text-xl sm:text-2xl">
          Powered by GSAP & Lenis
        </span>
      </h2>
    </div>
  </section>

  {/* FOOTER */}
  <div className="footer-section z-10 h-screen bg-zinc-800 text-center pt-24">
    <a href="https://scrolling-effect-b2tl.vercel.app/ " className="">
 <button className="bg-teal-100 text-black py-2 px-2 rounded-2xl">VIEW MORE</button>
    </a>
  </div>
</div>

  );
};

export default App;

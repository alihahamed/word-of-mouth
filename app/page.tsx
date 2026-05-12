"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import MenuOverlay from "@/components/MenuOverlay";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Services from "@/components/Services";
import HowItWorksAccordion from "@/components/HowItWorksAccordion";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
// import LatestWorks from "@/components/LatestWorks";
import ClientsMarquee from "@/components/ClientsMarquee";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

// Lazy load heavy Three.js component
const LiquidEther = dynamic(() => import("@/components/LiquidEther"), {
  ssr: false,
  loading: () => null,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useGSAP(
    () => {
      if (isLoading) return;

      const tl = gsap.timeline();

      gsap.set(".header-item", { visibility: "hidden" });

      requestAnimationFrame(() => {
        tl.fromTo(
          ".header-item",
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            visibility: "visible",
          },
        );
      });

      // Reveal the main title characters
      tl.fromTo(
        ".title-char",
        {
          y: 120,
          rotateX: -80,
          skewX: 20,
          scale: 0.6,
          opacity: 0,
          filter: "blur(15px)",
        },
        {
          y: 0,
          rotateX: 0,
          skewX: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          stagger: {
            each: 0.04,
            from: "start",
          },
          ease: "back.out(1.4)",
        },
        0,
      );

      // Cool staggered word entrance for the subtext
      tl.to(".subtitle-word",
        { y: '0%', duration: 0.8, ease: "power4.out", stagger: 0.015 },
        "-=0.35"
      );
    },
    { scope: container, dependencies: [isLoading] },
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div
        ref={container}
        className="min-h-screen flex flex-col bg-white text-black p-6 md:p-10 font-sans tracking-wide relative overflow-hidden"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-out",
        }}
      >
        <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
          {!isLoading && (
            <LiquidEther colors={["#C8A2D4", "#9B72B0", "#7B4F9E"]} />
          )}
        </div>

        {/* Header specifically z-20 to ensure it doesn't get clipped/hidden */}
        <header className="flex justify-between items-start w-full uppercase text-xs md:text-sm font-[400] tracking-widest z-20 relative">
          <div
            onClick={() => setIsMenuOpen(true)}
            className="header-item cursor-pointer group"
          >
            <div className="relative overflow-hidden flex flex-col leading-tight montserrat-hero">
              <span className="group-hover:-translate-y-[120%] block transition-transform duration-500 ease-in-out">
                MENU
              </span>
              <span className="absolute left-0 top-0 translate-y-[120%] group-hover:translate-y-0 block transition-transform duration-500 ease-in-out text-[#C8A2D4]">
                MENU
              </span>
            </div>
          </div>
          <div 
            className="header-item flex items-center gap-3 group cursor-pointer"
            onClick={() => window.open('https://calendly.com', '_blank')}
          >
            <div className="relative overflow-hidden flex flex-col text-right leading-tight montserrat-hero">
              <span className="group-hover:-translate-y-[120%] block transition-transform duration-500 ease-in-out">
                BOOK A
                <br />
                CALL
              </span>
              <span className="absolute right-0 top-0 translate-y-[120%] group-hover:translate-y-0 block transition-transform duration-500 ease-in-out text-[#C8A2D4]">
                BOOK A<br />
                CALL
              </span>
            </div>
            <div className="relative overflow-hidden w-10 h-10 md:w-12 md:h-12 rounded-full border border-black flex items-center justify-center text-black transition-colors duration-500 z-10">
              <div className="absolute left-0 w-full bg-[#C8A2D4] h-[150%] top-[100%] rounded-t-[100%] group-hover:top-0 group-hover:rounded-t-none transition-all duration-500 ease-in-out -z-10"></div>
              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                className="group-hover:rotate-45 transition-transform duration-500"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center relative w-full overflow-hidden">
        <div className="flex flex-col items-center">
          <h1 className="title-container flex items-baseline justify-center montserrat-hero whitespace-nowrap w-full" style={{ letterSpacing: '-0.04em', perspective: '1000px' }}>
            {"Word of Mouth".split("").map((char, index) => (
              <span key={index} className="title-char inline-block will-change-transform text-black leading-[0.85] origin-bottom" style={{ fontSize: 'clamp(2rem, 7.2vw, 8rem)' }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <div className="w-full flex justify-between md:justify-end md:gap-12 px-2 text-black/90 montserrat-medium text-xs md:text-[16px] max-w-[90vw] md:max-w-max">
            <p className="w-full text-center md:text-justify max-w-xl md:max-w-3xl flex flex-wrap justify-center md:justify-end gap-x-[0.25em] gap-y-1 mt-2">
              {"Spreading the word about your business one word at a time • NYC"
                .split(" ")
                .map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block">
                    <span className="subtitle-word inline-block will-change-transform translate-y-[120%]">
                      {word}
                    </span>
                  </span>
                ))}
            </p>
          </div>
        </div>
        </main>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
      </div>

      <div
        className="bg-white text-black relative z-10"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-out",
        }}
      >
        <AboutUs />
        <Services />
        {/* <HowItWorksAccordion /> */}
        {/* <LatestWorks /> */}
        <ClientsMarquee />
        {/* <Testimonials /> */}
        {/* <StatsSection /> */}
        <Footer />
      </div>
    </>
  );
}

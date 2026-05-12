'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export default function AboutUs() {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    })

    // Heading entrance animation
    tl.to('.about-heading-char', {
      y: 0,
      opacity: 1,
      rotate: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.05,
      ease: 'back.out(1.5)'
    }, 0)

    // Image slides up and scales in
    tl.fromTo('.about-image-container', 
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
      0.2
    )

    // SVG frame
    tl.fromTo('.about-decor',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
      '-=0.8'
    )
    
    // Left text blocks stagger in from the left
    tl.fromTo('.about-text-left',
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
      '-=1.0'
    )

    // Right text blocks stagger in from the right
    tl.fromTo('.about-text-right',
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
      '-=1.0'
    )

  }, { scope: container })

  const headingText = "Meet Bonnie".split("")

  return (
    <section id="about" ref={container} className="w-full py-32 md:py-48 bg-[#FDF6EE] relative overflow-hidden text-black px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">

        <div className="text-center mb-24 overflow-hidden pt-4">
           <h2 className="montserrat-black text-[12vw] md:text-[10rem] leading-[0.8] tracking-tighter text-[#C8A2D4] flex justify-center uppercase scale-x-110 origin-center">
             {headingText.map((char, index) => (
               <span key={index} className="about-heading-char inline-block opacity-0 translate-y-[100%] rotate-12 blur-md">
                 {char === " " ? "\u00A0" : char}
               </span>
             ))}
           </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Left Side - Details */}
          <div className="w-full md:w-1/4 flex flex-col gap-12 text-center md:text-left order-2 md:order-1">
            <div className="about-text-left">
              <h4 className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-black/40 font-bold mb-4">Years of Experience</h4>
              <p className="montserrat-medium text-sm md:text-base text-black/80 leading-relaxed">
                8+ years operating in NYC and internationally, developing an extensive portfolio with industry-leading brands like Google, Vanity Fair & more.
              </p>
            </div>
            <div className="about-text-left">
              <h4 className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-black/40 font-bold mb-4">Clients on Worldwide</h4>
              <p className="montserrat-medium text-sm md:text-base text-black/80 leading-relaxed">
                Word of Mouth provides clients around the globe with high-end social media, paid ads, and SEO copywriting services.
              </p>
            </div>
            <div className="about-text-left">
              <h4 className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-black/40 font-bold mb-4">Goal</h4>
              <p className="montserrat-medium text-sm md:text-base text-black/80 leading-relaxed">
                Our goal is to always exceed our clients' expectations with personalized service as we spread the word about your business one word at a time.
              </p>
            </div>
          </div>

          {/* Center - Image with Frame and SVG Decor */}
          <div className="w-full md:w-2/4 flex justify-center order-1 md:order-2 about-image-container relative mt-12 md:mt-0 pt-10">
            
            {/* The SVG Frame */}
            <div className="about-decor absolute inset-0 pointer-events-none flex justify-center items-end z-0">
              {/* Arch Frame */}
              <div className="absolute bottom-0 w-[310px] h-[465px] md:w-[410px] md:h-[585px] border-[1.5px] border-black/30 rounded-t-full rounded-b-none"></div>
            </div>

            {/* Image Container (Arched) */}
            <div className="relative w-[280px] h-[450px] md:w-[380px] md:h-[570px] rounded-t-full overflow-hidden z-10 bg-[#E8573A]/10">
              <Image 
                src="/bonnie.png" 
                alt="Bonnie - Word of Mouth"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom Caption */}
            <div className="absolute -bottom-12 md:-bottom-16 text-center w-full">
              <p className="montserrat-medium text-xs text-black/50">Brand based in NYC, since 2018</p>
            </div>
          </div>

          {/* Right Side - Statistics */}
          <div className="w-full md:w-1/4 flex flex-col gap-12 text-center md:text-right order-3 md:order-3">
            <div className="about-text-right flex flex-col items-center md:items-end">
              <h4 className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-black/40 font-bold mb-2">Average Reach</h4>
              <p className="montserrat-medium text-5xl md:text-7xl text-[#C8A2D4] tracking-tighter">3.2x</p>
            </div>
            <div className="about-text-right flex flex-col items-center md:items-end">
              <h4 className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-black/40 font-bold mb-2">Traffic Growth</h4>
              <p className="montserrat-medium text-5xl md:text-7xl text-[#E8573A] tracking-tighter">156%</p>
            </div>
            <div className="about-text-right flex flex-col items-center md:items-end">
              <h4 className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-black/40 font-bold mb-2">Leads Generated</h4>
              <p className="montserrat-medium text-5xl md:text-7xl text-black tracking-tighter">28k+</p>
            </div>
            <div className="about-text-right flex flex-col items-center md:items-end">
              <h4 className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-black/40 font-bold mb-2">Sale Done</h4>
              <p className="montserrat-medium text-5xl md:text-7xl text-black tracking-tighter">124k+</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

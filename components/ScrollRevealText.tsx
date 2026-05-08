'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const WORDS = [
  { text: "KEIKŌ" }, { text: "ISN'T" }, { text: "AN" }, { text: "AGENCY." },
  { text: "WE'RE" }, { text: "THE" }, { text: "VOICE" }, { text: "YOUR" }, { text: "BRAND" }, { text: "DIDN'T" }, { text: "KNOW" }, { text: "IT" }, { text: "HAD." },
  { text: "BUILT" }, { text: "IN" }, { text: "CAPE" }, { text: "TOWN." },
  { text: "OBSESSED" }, { text: "WITH" }, { text: "DETAIL." },
  { text: "WE" }, { text: "DON'T" }, { text: "JUST" }, { text: "MANAGE" }, { text: "YOUR" }, { text: "SOCIALS" }, { text: "—" },
  { text: "WE" }, { text: "LIVE" }, { text: "INSIDE" }, { text: "YOUR" }, { text: "BRAND" }, { text: "UNTIL" }, { text: "YOUR" }, { text: "AUDIENCE" }, { text: "CAN'T" }, { text: "TELL" }, { text: "THE" }, { text: "DIFFERENCE" }, { text: "BETWEEN" }, { text: "YOU" }, { text: "AND" }, { text: "US." },
  { text: "BOUTIQUE", highlight: true }, { text: "BY", highlight: true }, { text: "CHOICE.", highlight: true },
  { text: "BECAUSE", highlight: true }, { text: "GREAT", highlight: true }, { text: "WORK", highlight: true }, { text: "DOESN'T", highlight: true }, { text: "SCALE", highlight: true }, { text: "ON", highlight: true }, { text: "AUTOPILOT.", highlight: true }
];

export default function ScrollRevealText() {
  const container = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    const elements = gsap.utils.toArray<HTMLElement>('.reveal-element')
    
    gsap.fromTo(elements, 
      { 
        opacity: 0.1,
        y: 30,
        scale: 0.9,
        filter: 'blur(8px)'
      }, 
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'center center',
          end: '+=150%',
          pin: true,
          scrub: 1.5, // Smooth scrubbing
        }
      }
    )
  }, { scope: container })

  return (
    <section ref={container} className="w-full max-w-[90vw] xl:max-w-8xl mx-auto px-6 font-sans flex flex-col items-start justify-center min-h-screen relative z-20">
      <div className="mb-6 md:mb-10 uppercase text-[10px] md:text-xs tracking-[0.2em] montserrat-medium text-black/90 ml-1">
        Who We Are
      </div>
      <div className="w-full text-left">
        <h2 className="montserrat-hero text-2xl md:text-4xl lg:text-[3vw]  leading-[1.1] tracking-tight uppercase flex flex-wrap justify-start gap-x-[0.25em] gap-y-[0.1em] items-center">
          {WORDS.map((item, i) => (
            <span key={i} className="flex items-center gap-[0.1em]">
              <span className={`reveal-element ${item.highlight ? 'text-[#ff1493] ' : 'text-black'}`}>
                {item.text}
              </span>
              {/* {item.icon && (
                <Image width={64} height={64} src={item.icon} alt="emoji" className="reveal-element ml-[0.1em] w-[0.9em] h-[0.9em] inline-block object-contain" />
              )} */}
            </span>
          ))}
        </h2>
      </div>
    </section>
  )
}

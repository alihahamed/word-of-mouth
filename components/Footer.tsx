'use client'

import { useRef } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import Aurora from './Aurora'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export default function Footer() {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Set initial states to prevent flash of unstyled content
    gsap.set(['.footer-cta-text', '.footer-cta-btn', '.footer-links'], { opacity: 0 })
    gsap.set('.footer-massive-text', { opacity: 0, y: '100%', rotateX: 45, scale: 0.9 })
    gsap.set('.footer-aurora', { opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    })

    // Animate Aurora background fade in
    tl.to('.footer-aurora', {
      opacity: 0.3,
      duration: 1.5,
      ease: 'power2.inOut'
    })

    // Slide and blur reveal for the CTA heading
    tl.fromTo('.footer-cta-text',
      { y: 50, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
      '-=1.2'
    )

    // Pop in the CTA button
    tl.fromTo('.footer-cta-btn',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.8'
    )

    // 3D fold-up reveal for the massive Word of Mouth text
    tl.to('.footer-massive-text', {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      scale: 1,
      duration: 1.4,
      ease: 'power4.out',
      transformOrigin: 'bottom center',
    }, '-=0.6')

    // Fade up the bottom links
    tl.fromTo('.footer-links',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=1.0'
    )

  }, { scope: container })

  return (
    <footer id="contact" ref={container} className="w-full relative flex flex-col min-h-screen overflow-hidden bg-white font-sans text-black" style={{ perspective: '1000px' }}>
      
      {/* Background Aurora */}
      <div className="footer-aurora absolute inset-0 z-0">
        <Aurora 
          colorStops={['#e8d5f0', '#C8A2D4', '#9B72B0']} 
          blend={0.5} 
          amplitude={3} 
          speed={1} 
        />
      </div>

      {/* Transition Layer - Smooth blend from StatsSection */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent z-10" />

      {/* ===== TOP HALF: CTA ===== */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-16 pb-6">
        {/* CTA */}
        <h3 className="footer-cta-text montserrat-medium text-lg md:text-3xl text-black mb-2 text-center px-6">
          Your brand deserves to be talked about.
        </h3>
        
        <div 
          className="footer-cta-btn flex items-center gap-4 group cursor-pointer mt-6"
          onClick={() => window.open('https://calendly.com', '_blank')}
        >
          <div className="relative overflow-hidden flex flex-col text-right leading-tight montserrat-medium text-xl md:text-2xl lg:text-3xl text-black pb-1">
            <span className="group-hover:-translate-y-[120%] block transition-transform duration-500 ease-in-out">
              Book a call
            </span>
            <span className="absolute right-0 top-0 translate-y-[120%] group-hover:translate-y-0 block transition-transform duration-500 ease-in-out text-[#C8A2D4]">
              Book a call
            </span>
          </div>
          <div className="relative overflow-hidden w-12 h-12 md:w-16 md:h-16 rounded-full border border-black flex items-center justify-center text-black group-hover:text-white transition-colors duration-500 z-10 shrink-0">
            <div className="absolute left-0 w-full bg-[#C8A2D4] h-[150%] top-[100%] rounded-t-[100%] group-hover:top-0 group-hover:rounded-t-none transition-all duration-500 ease-in-out -z-10"></div>
            <ArrowUpRight size={24} strokeWidth={1.5} className="group-hover:rotate-45 transition-transform duration-500" />
          </div>
        </div>
      </div>

      {/* ===== BOTTOM HALF: Massive WORD OF MOUTH ===== */}
      <div className="relative z-10 flex items-end justify-center select-none overflow-hidden mt-auto pb-6 w-full" style={{ perspective: '1200px' }}>
        <h1 
          className="footer-massive-text w-full montserrat-hero text-black tracking-tighter whitespace-nowrap text-center"
          style={{ fontSize: 'clamp(3rem, 14.5vw, 19rem)', letterSpacing: '-0.04em' }}
        >
          Word of Mouth
        </h1>
      </div>

      {/* Links Row - placed below the massive text */}
      <div className="footer-links relative z-10 w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-6 montserrat-medium text-xs md:text-sm text-black/60 border-t border-black/10 bg-white gap-4 md:gap-0">
        <div>
          © 2026 Word of Mouth Content
        </div>
        <div className="flex items-center gap-5">
          {/* <a href="https://instagram.com/wordofmouthcontent" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A2D4] transition-colors"><Instagram size={18} /></a> */}
          <a href="#" className="hover:text-[#C8A2D4] transition-colors"><Mail size={18} /></a>
          <a href="#" className="hover:text-[#C8A2D4] transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-[18px] h-[18px]">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

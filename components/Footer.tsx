'use client'

import { ArrowUpRight, Mail } from 'lucide-react'
import Aurora from './Aurora'

export default function Footer() {
  const titleChars = 'Keikō'.split('')

  return (
    <footer className="w-full relative flex flex-col min-h-screen overflow-hidden bg-white font-sans text-black">
      
      {/* Background Aurora */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Aurora 
          colorStops={['#ffd1ea', '#ff1493', '#b00064']} 
          blend={0.5} 
          amplitude={3} 
          speed={1} 
        />
      </div>

      {/* Transition Layer - Smooth blend from StatsSection */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent z-10" />

      {/* ===== TOP HALF: CTA ===== */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow pt-24 pb-10 min-h-[40vh]">
        {/* CTA */}
        <h3 className="montserrat-medium text-lg md:text-5xl text-black mb-2 text-center px-6">
          Your brand deserves better than average.
        </h3>
        
        <div className="flex items-center gap-4 group cursor-pointer mt-6">
          <div className="relative overflow-hidden flex flex-col text-right leading-tight montserrat-medium text-xl md:text-2xl lg:text-3xl text-black pb-1">
            <span className="group-hover:-translate-y-[120%] block transition-transform duration-500 ease-in-out">
              Book a call
            </span>
            <span className="absolute right-0 top-0 translate-y-[120%] group-hover:translate-y-0 block transition-transform duration-500 ease-in-out text-[#ff1493]">
              Book a call
            </span>
          </div>
          <div className="relative overflow-hidden w-12 h-12 md:w-16 md:h-16 rounded-full border border-black flex items-center justify-center text-black group-hover:text-white transition-colors duration-500 z-10 shrink-0">
            <div className="absolute left-0 w-full bg-[#ff1493] h-[150%] top-[100%] rounded-t-[100%] group-hover:top-0 group-hover:rounded-t-none transition-all duration-500 ease-in-out -z-10"></div>
            <ArrowUpRight size={24} strokeWidth={1.5} className="group-hover:rotate-45 transition-transform duration-500" />
          </div>
        </div>
      </div>

      {/* ===== BOTTOM HALF: Massive KEIKO ===== */}
      <div className="relative z-10 flex items-end justify-center select-none overflow-hidden mt-auto pb-4 w-full px-6">
        <h1 
          className="flex items-baseline justify-center w-full montserrat-hero text-black tracking-tighter whitespace-nowrap text-center origin-bottom"
          style={{ 
            fontSize: '12.7vw', 
            
          }}
        >
          {titleChars.map((char, i) => {
            const isMacronLetter = i === titleChars.length - 1
            if (!isMacronLetter) {
              return (
                <span key={i} className="char inline-block">
                  {char}
                </span>
              )
            }

            return (
              <span key={i} className="char relative inline-flex overflow-visible">
                {char}
                {/* <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-[-0.02em] h-[0.08em] w-[0.58em] -translate-x-1/2 rounded-full bg-black"
                /> */}
              </span>
            )
          })}
        </h1>
      </div>

      {/* Links Row - placed below the massive text */}
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-6 montserrat-medium text-xs md:text-sm text-black/60 border-t border-black/10 bg-white gap-4 md:gap-0">
        <div>
          © 2026 Keiko, Inc.
        </div>
        {/* <div className="flex items-center gap-6 md:gap-8">
          <a href="#" className="hover:text-white transition-colors">Work</a>
          <a href="#" className="hover:text-white transition-colors">Services</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div> */}
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-[#ff1493] transition-colors"><Mail size={18} /></a>
          <a href="#" className="hover:text-[#ff1493] transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-[18px] h-[18px]">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

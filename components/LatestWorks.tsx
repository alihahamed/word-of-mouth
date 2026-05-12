'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const WORKS = [
  { id: 1,  tags: ['Leah Degois - Creator Convos'], video: '/keiko-1.mp4' },
  { id: 2, tags: ['Catherine Van Rees - Creator Convos'], video: '/keiko-2.mp4' },
  { id: 3, tags: ['Wellness From Within'], video: '/keiko-3.mp4' },
]

export default function LatestWorks() {
  const [index, setIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Lazy load section with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Explicitly control play/pause for reliability when changing index
  useEffect(() => {
    if (isVisible) {
      videoRefs.current.forEach((video, i) => {
        if (video) {
          // Index 2 is always the center card (physicalIdx - index + 2)
          if (i === 2) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      });
    }
  }, [index, isVisible]);

  useGSAP(() => {
    // Initialize absolute positions correctly
    gsap.set('.latest-heading-container', { top: '50%', yPercent: -50 })
    gsap.set('.latest-heading', { scale: 1.8 })
    gsap.set('.latest-carousel', { opacity: 0, top: '45%' }) // Starts slightly lower

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center center',
        end: '+=150%',
        pin: true,
        scrub: true
      }
    })

    // Absolute translates guarantee strict positioning
    tl.to('.latest-heading-container', { top: '8%', yPercent: 0, ease: 'power2.inOut', duration: 1 }, 0)
      .to('.latest-heading', { scale: 1, ease: 'power2.inOut', duration: 1 }, 0)
      .to('.latest-carousel', { opacity: 1, top: '22%', ease: 'power2.out', duration: 0.8 }, 0.4)

  }, { scope: containerRef })

  // Only render 5 virtual blocks (reduced from 7) to cut DOM weight
  const visibleIndices = [-2, -1, 0, 1, 2].map(i => index + i)
  const activeWork = WORKS[((index % WORKS.length) + WORKS.length) % WORKS.length]

  return (
    <section ref={containerRef} className="w-full h-screen relative z-10 overflow-hidden font-sans bg-white">

      {/* Header Area */}
      <div className="latest-heading-container absolute left-0 w-full z-20 flex flex-col items-center px-6 mb-10 pointer-events-none">
        <h2 className="latest-heading font-[400] text-5xl md:text-7xl tracking-tighter text-black montserrat-medium text-center">
       Our<span className='cormorant-font italic text-[#C8A2D4]'>Latest   </span>   works
        </h2>
      </div>

      {/* Carousel Area */}
      <div className="latest-carousel absolute left-0 w-full z-10 flex flex-col items-center">

        {/* Track */}
        <div className="relative w-full h-[400px] md:h-[480px] flex justify-center items-center">

          {/* Navigation Arrows absolute flanked */}
          <button
            onClick={() => setIndex(index - 1)}
            className="absolute left-4 md:left-[15%] top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 border border-black/15 hover:bg-[#C8A2D4]/12 transition-colors pointer-events-auto shadow-lg"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button
            onClick={() => setIndex(index + 1)}
            className="absolute right-4 md:right-[15%] top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 border border-black/15 hover:bg-[#C8A2D4]/12 transition-colors pointer-events-auto shadow-lg"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          <AnimatePresence mode="popLayout">
            {visibleIndices.map((physicalIdx) => {
              const work = WORKS[((physicalIdx % WORKS.length) + WORKS.length) % WORKS.length]
              const isCenter = physicalIdx === index

              // CSS logic mathematically maps horizontal spacing offsets fluidly
              const xOffset = `calc(${(physicalIdx - index)} * (100% + 1rem))`

              return (
                <motion.div
                  key={physicalIdx}
                  className="absolute w-[225px] h-[400px] md:w-[270px] md:h-[480px] rounded-[2rem] overflow-hidden bg-[#f2f2f2]"
                  initial={{ x: xOffset, opacity: 0, scale: 0.8 }}
                  animate={{
                    x: xOffset,
                    scale: isCenter ? 1 : 0.8,
                    opacity: isCenter ? 1 : 0.3,
                    filter: isCenter ? 'brightness(1) blur(0px)' : 'brightness(0.3) blur(2px)',
                    zIndex: isCenter ? 20 : 10
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Lazy load video - only load when section is visible */}
                  {isVisible && (
                    <video
                      ref={(el) => {
                        videoRefs.current[physicalIdx - index + 2] = el;
                      }}
                      src={work.video}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay={isCenter}
                      loop
                      muted={!isCenter || isMuted}
                      playsInline
                      preload={isCenter ? "auto" : "metadata"}
                    />
                  )}
                  <div className="absolute inset-0 border border-black/12 rounded-[2rem] pointer-events-none" />

                  {/* Custom Minimal Media Player Toggle */}
                  {isCenter && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                      className="absolute bottom-4 right-4 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/75 backdrop-blur-md border border-[#C8A2D4]/35 text-[#C8A2D4] hover:bg-[#C8A2D4]/18 transition-all duration-300 pointer-events-auto"
                    >
                      {isMuted ? (
                        <svg fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4 h-4">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <line x1="23" y1="9" x2="17" y2="15" />
                          <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                      ) : (
                        <svg fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4 h-4">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                      )}
                    </button>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Focus Metadata Bottom Overlay */}
        <div className="flex flex-col items-center justify-center text-center px-4 overflow-hidden h-[130px] w-full max-w-[800px] z-30 pointer-events-none montserrat-hero">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWork.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center w-full"
            >
              <div className="flex gap-2 justify-center flex-wrap mb-4">
                {activeWork.tags.map((t, i) => (
                  <span key={i} className="px-5 py-2 rounded-full border border-black/15 text-xs text-black tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
              {/* <h3 className="text-xl md:text-2xl font-[400] text-white tracking-tight">
                {activeWork.title}
              </h3> */}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const TESTIMONIALS = [
  {
    id: '01',
    name: 'Jonathon Crawford',
    role: 'Founder of Project Knight',
    quote: '"Thanks again for everything with your work bro. Im very very impressed with what you do, youve got a client for life brother!"',
    image: '/jonathon.webp',
    video: '/jonathon-vid.mp4'
  },
  {
    id: '02',
    name: 'John Nwaneri',
    role: 'Fitness Expert for Founders & CEOs',
    quote: '"Brilliant job man! I\'m not easy to please either haha so well done. Looking forward to the rest."',
    image: '/black dude.webp',
    video: '/john-vid.mp4'
  },
  {
    id: '03',
    name: 'Kelvin Arnott',
    role: 'Body Transformation Coach',
    quote: '"Got the videos and love it! Thank you my dude."',
    image: '/kelvin.webp',
    video: '/kelvin-vid.mp4'
  }
]

export default function Testimonials() {
  const [active, setActive] = useState<number | null>(null)
  const [playing, setPlaying] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)

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
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseLeave = () => {
    setActive(null)
    setPlaying(null)
    videoRefs.current.forEach(v => {
      if (v) {
        v.pause()
        v.currentTime = 0
      }
    })
  }

  const handlePlay = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation()
    const v = videoRefs.current[idx]
    if (v) {
      if (v.paused) {
        v.play()
        setPlaying(idx)
      } else {
        v.pause()
        setPlaying(null)
      }
    }
  }

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto py-28 md:py-25 px-6 relative z-10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl lg:text-7xl  montserrat-medium tracking-tighter font-[400] text-white max-w-5xl">
          Don&apos;t take  <span className='cormorant-font italic text-[#2cb85f] text-5xl md:text-6xl lg:text-8xl'>our </span> word for it.
        </h2>
      </motion.div>

      <div
        className="flex flex-col md:flex-row gap-4 md:gap-5 w-full h-[700px] md:h-[650px] overflow-hidden"
        onMouseLeave={handleMouseLeave}
      >
        {TESTIMONIALS.map((testimonial, idx) => {
          const isActive = active === idx
          const isPlaying = playing === idx
          return (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 80, scale: 0.95, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 + 0.2 }}
              onClick={() => setActive(idx)}
              onMouseEnter={() => setActive(idx)}
              className="relative rounded-3xl cursor-pointer overflow-hidden flex flex-col justify-end p-6 md:p-8 group"
              style={{
                flex: isActive ? '2 2 0%' : '1 1 0%',
                transition: 'flex 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Image & Video Background */}
              <div className="absolute inset-0 bg-[#161616]" />
              {testimonial.image && (
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  className={`object-cover transition-all duration-[1.5s] ease-out ${isPlaying ? 'opacity-0' : 'opacity-100 group-hover:scale-105'}`}
                />
              )}
              {/* Lazy load video - only load when section is visible */}
              {isVisible && testimonial.video && (
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={testimonial.video}
                  playsInline
                  loop
                  muted={false}
                  preload="none"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                />
              )}

              {/* Blur Overlay (Active state, hides when playing) */}
              <div
                className="absolute inset-0 bg-black/30 backdrop-blur-lg pointer-events-none"
                style={{
                  opacity: isActive && !isPlaying ? 1 : 0,
                  transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />

              {/* Gradient map & blurred vignette for bottom text readability */}
              <div
                className="absolute inset-x-0 bottom-0 h-[40%] backdrop-blur-md pointer-events-none z-10"
                style={{
                  WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 100%)',
                  maskImage: 'linear-gradient(to top, black 10%, transparent 100%)'
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-10" />

              {/* Top layer Container */}
              <div className="relative z-20 w-full h-full flex flex-col mt-auto pointer-events-none">

                {/* Header elements */}
                <div className="flex justify-between items-start w-full pointer-events-none">
                  <div className="text-white/80 shrink-0 text-xl font-bold tracking-widest mt-2">
                    ∞
                  </div>

                  {/* Play icon inside square #09c74e background */}
                  <div
                    onClick={(e) => handlePlay(e, idx)}
                    className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl bg-[#09c74e] flex items-center justify-center pl-1 text-black shadow-lg cursor-pointer pointer-events-auto hover:bg-[#07a641] transition-colors"
                  >
                    {isPlaying ? (
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 -ml-1">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-full max-w-sm md:max-w-xl mx-auto pointer-events-none"
                  style={{
                    opacity: isActive && !isPlaying ? 1 : 0,
                    transform: `translateY(-50%) translateY(${isActive && !isPlaying ? '0px' : '20px'})`,
                    transition: 'opacity 0.5s ease 0.2s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
                  }}
                >
                  <p className="text-white text-lg md:text-2xl lg:text-3xl font-[400] text-center leading-tight">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Footer elements (Name/Role) */}
                <div className="mt-auto pointer-events-none flex flex-col justify-end w-full overflow-hidden">
                  <h3 className="text-white text-xl md:text-2xl font-[400] mb-1 truncate w-full">
                    {testimonial.name}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base montserrat-medium truncate w-full">
                    {testimonial.role}
                  </p>
                </div>
              </div>

            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
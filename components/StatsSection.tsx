'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STATS = [
  { value: 15, suffix: 'M+', label: 'Views Generated' },
  { value: 5, suffix: 'x', label: 'Average Engagement Rate' },
  { value: 65, suffix: '%', label: 'Conversion Uplift' },
  { value: 100, suffix: '%', label: 'Happy Clients' },
]

// Logic moved cleanly to parent for stable trigger calculation

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const nums = gsap.utils.toArray('.stat-num') as HTMLElement[]
    if (!nums.length) return

    nums.forEach((node) => {
      const target = parseFloat(node.dataset.target || "0")
      const suffix = node.dataset.suffix || ""
      const obj = { val: 0 }
      
      gsap.to(obj, {
        val: target,
        duration: 3.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current, // Extremely stable trigger, detached from moving children
          start: "top 50%", // Triggers precisely when stats section is squarely in view
          once: true // Prevents animation loop bugs
        },
        onUpdate: () => {
          node.innerText = Math.round(obj.val) + suffix
        }
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto py-28 md:py-32 px-6 relative z-10 font-sans bg-black">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 md:mb-18"
      >
        <h2 className="text-4xl md:text-5xl lg:text-7xl tracking-tighter font-[400] text-white max-w-5x montserrat-medium">
          We&apos;re not <span className="cormorant-font italic text-[#2cb85f] text-5xl md:text-6xl lg:text-7xl">bragging.</span>
        </h2>
        <h2 className="text-4xl md:text-5xl lg:text-7xl tracking-tighter font-[400] montserrat-medium text-white max-w-5xl mt-1 md:mt-2">
          Actually, yeah we are.
        </h2>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] border border-white/10 rounded-[1rem] overflow-hidden bg-white/10">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
            className="flex flex-col relative p-6 lg:p-10 bg-[#0a0a0a] overflow-hidden will-change-transform"
          >
            {/* Faint green radial glow */}
            <div className="absolute bottom-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-[#2cb85f] rounded-full blur-[30px] opacity-20 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="montserrat-hero text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-none stat-num" data-target={stat.value} data-suffix={stat.suffix}>
                0{stat.suffix}
              </span>
              <span className="montserrat-medium text-white/50 text-sm md:text-base mt-3 md:mt-4 tracking-wide">
                {stat.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

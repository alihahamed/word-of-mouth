'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const CARDS = [
  { 
    id: '01', 
    title: "01 — Drop your footage, go touch grass.",
    image: "/touch-grass.webp"
  },
  { 
    id: '02', 
    title: "02 — We edit, script, hook, and package it.",
    image: "/edit,package.webp"
  },
  { 
    id: '03', 
    title: "03 — You wake up to DMs.",
    image: "/shocked.webp"
  }
]

export default function HowItWorksAccordion() {
  const [active, setActive] = useState(0)

  return (
    <section className="w-full max-w-7xl mx-auto py-36 px-6 relative z-10 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24"
      >
        <h2 className="text-5xl md:text-6xl lg:text-8xl tracking-tighter montserrat-medium font-[400] text-white">
          How <span className='cormorant-font italic text-[#2cb85f]'> DigiDifference</span> Works
        </h2>
        <p className="text-white/60 mt-6 max-w-xl mx-auto montserrat-medium text-lg">
          Less meetings. More results.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full h-[700px] md:h-[600px] overflow-hidden">
        {CARDS.map((card, idx) => {
          const isActive = active === idx
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              onClick={() => setActive(idx)}
              onMouseEnter={() => setActive(idx)}
              className="relative rounded-[2.5rem] cursor-pointer group flex flex-col items-start p-8 md:p-12 overflow-hidden will-change-transform"
              style={{
                flex: isActive ? '3 1 0%' : '1 1 0%',
                transition: 'flex 0.8s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.8s, border-color 0.8s',
                backgroundColor: isActive ? '#111111' : '#050505',
                border: '1px solid',
                borderColor: isActive ? '#222' : '#111',
                transform: 'translateZ(0)' // Force GPU layer
              }}
            >
              <h3 
               className={`text-xl md:text-2xl font-[400] z-20 transition-all duration-300 w-[280px] shrink-0 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}
               >
                 {card.title}
              </h3>
              
              <div 
                className="absolute right-0 bottom-0 w-3/4 h-3/4 flex items-end justify-end overflow-hidden"
                style={{
                  opacity: isActive ? 1 : 0.15,
                  transform: `translateY(${isActive ? '0px' : '20px'}) scale(${isActive ? 1 : 0.98})`,
                  transition: 'opacity 0.5s ease 0.1s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: isActive ? 'auto' : 'none'
                }}
              >
                {card.image ? (
                  <Image 
                    src={card.image} 
                    alt="card visual" 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-right-bottom opacity-90 rounded-tl-3xl" 
                  />
                ) : (
                  <div className="text-white/20 montserrat-medium tracking-widest text-sm uppercase p-8">
                    [ PENDING ]
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

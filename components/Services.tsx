'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const SERVICES = [
  {
    title: 'SOCIAL MEDIA\nMANAGEMENT',
    text: "Posting without a plan is just noise. We build full content ecosystems — strategy, scheduling, community management — so your brand stays consistent, engaging, and impossible to scroll past.",
    tag: 'Content Strategy',
    personalLine: 'Your audience hears your voice, amplified. We handle everything from content calendars to community replies.',
    statLabel: 'Recent result',
    statValue: '3.2x reach in 8 weeks',
    outcomes: ['Content calendar', 'Community management', 'Analytics reporting'],
    bg: 'bg-[#1A1A1A]',
    textColor: 'text-white',
  },
  {
    title: 'PAID\nADS',
    text: "We don't guess with your budget. Every campaign across Facebook, Instagram, and TikTok is built on real data, tight targeting, and creative that converts — so your money goes where it actually works.",
    tag: 'Paid Acquisition',
    personalLine: 'You see exactly where spend goes and why each optimization decision gets made. Full transparency, always.',
    statLabel: 'Recent result',
    statValue: '-28% CPL in 30 days',
    outcomes: ['Ad creative', 'Audience targeting', 'ROI tracking'],
    bg: 'bg-[#C8A2D4]',
    textColor: 'text-black',
  },
  {
    title: 'SEO\nCOPYWRITING',
    text: "Words that rank and words that sell don't have to be different. We write blog posts, website copy, and newsletters that Google loves and your audience actually wants to read.",
    tag: 'Organic Growth',
    personalLine: 'Every piece of copy is crafted to convert — not just rank. Your brand voice stays front and center.',
    statLabel: 'Recent result',
    statValue: '+156% organic traffic',
    outcomes: ['Blog content', 'Website copy', 'Newsletter strategy'],
    bg: 'bg-[#E8573A]',
    textColor: 'text-white',
  },
]

export default function Services() {
  const container = useRef<HTMLDivElement>(null)
  const lastIndex = SERVICES.length - 1

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.service-card')

      cards.forEach((card, index) => {
        const titleLines = gsap.utils.toArray<HTMLElement>('.service-title-line', card)
        const text = card.querySelector<HTMLElement>('.service-text')
        const metaItems = gsap.utils.toArray<HTMLElement>('.service-meta-item', card)

        gsap.set(titleLines, {
          opacity: 0,
          force3D: true,
        })

        gsap.set(metaItems, {
          opacity: 0,
          y: 36,
          filter: 'blur(8px)',
          force3D: true,
        })

        gsap.set(text, {
          opacity: 0,
          x: 36,
          force3D: true,
        })

        const enterTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })

        enterTl.to(
          titleLines,
          {
            opacity: 1,
            ease: 'none',
            duration: 1,
          },
          0,
        )

        enterTl.to(
          metaItems,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'none',
            duration: 1,
          },
          0.04,
        )

        enterTl.to(
          text,
          {
            opacity: 0.9,
            x: 0,
            ease: 'none',
            duration: 1,
          },
          0,
        )

        if (index < cards.length - 1) {
          const nextCard = cards[index + 1]

          gsap.set(card, {
            transformPerspective: 1400,
            transformOrigin: 'center center',
            force3D: true,
          })

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: nextCard,
              start: 'top bottom',
              end: 'top 20%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          })

          tl.to(
            card,
            {
              scale: 0.88,
              z: -240,
              y: -28,
              rotateX: 8,
              transformOrigin: 'center center',
              ease: 'none',
              duration: 0.84,
            },
            0,
          )

          tl.to(
            card,
            {
              opacity: 0,
              filter: 'blur(14px)',
              clipPath: 'inset(0 0 16% 0 round 0px)',
              ease: 'power2.in',
              duration: 0.24,
            },
            0.62,
          )

          tl.to(
            titleLines,
            {
              opacity: 0,
              ease: 'none',
              duration: 0.38,
            },
            0.62,
          )

          tl.to(
            metaItems,
            {
              opacity: 0,
              y: -24,
              filter: 'blur(8px)',
              ease: 'none',
              duration: 0.38,
            },
            0.62,
          )

          tl.to(
            text,
            {
              opacity: 0,
              x: -32,
              ease: 'none',
              duration: 0.38,
            },
            0.62,
          )
        } else {
          const lastExitTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'bottom bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          })

          lastExitTl.to(
            titleLines,
            {
              opacity: 0,
              ease: 'none',
              duration: 1,
            },
            0,
          )

          lastExitTl.to(
            metaItems,
            {
              opacity: 0,
              y: -24,
              filter: 'blur(8px)',
              ease: 'none',
              duration: 1,
            },
            0,
          )

          lastExitTl.to(
            text,
            {
              opacity: 0,
              x: -32,
              ease: 'none',
              duration: 1,
            },
            0,
          )
        }
      })
    },
    { scope: container },
  )

  return (
    <section id="services" ref={container} className="relative w-full z-20">
      {SERVICES.map((service, index) => (
        <div
          key={index}
          className={`service-card sticky top-0 w-full h-screen overflow-hidden p-6 sm:p-8 md:p-12 lg:p-16 ${service.bg} ${service.textColor} ${index === lastIndex ? 'mb-0' : 'mb-[50vh]'}`}
          style={{ zIndex: index + 10 }}
        >
          <div className="relative z-10 flex h-full flex-col">
            <div className="w-full max-w-5xl pt-2 sm:pt-4 md:pt-6 lg:pt-8">
              <h2 className="service-title montserrat-hero text-[clamp(3.4rem,10vw,8.2rem)] leading-[0.83] tracking-tighter uppercase">
                {service.title.split('\n').map((line) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <span className="service-title-line block will-change-transform">
                      {line}
                    </span>
                  </span>
                ))}
              </h2>
            </div>

            <div className="service-meta-item mt-5 sm:mt-6 md:mt-8 flex-1">
              <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-7 flex flex-col justify-start">
                  <p className="montserrat-medium text-[11px] uppercase tracking-[0.2em] opacity-70">
                    {service.tag}
                  </p>
                  <p className="montserrat-medium mt-3 max-w-[32rem] text-[clamp(0.95rem,1.2vw,1.2rem)] leading-[1.45] opacity-95">
                    {service.personalLine}
                  </p>
                </div>
                <div className="md:col-span-5 md:items-end flex flex-col justify-start md:justify-end">
                  <p className="montserrat-medium text-[11px] uppercase tracking-[0.2em] opacity-70">
                    {service.statLabel}
                  </p>
                  <p className="montserrat-hero mt-2 text-[clamp(1.35rem,2.2vw,2rem)] leading-[1]">
                    {service.statValue}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.outcomes.map((outcome) => (
                      <span
                        key={outcome}
                        className="montserrat-medium border border-current/25 px-3 py-1 text-[12px] leading-none opacity-85"
                      >
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex justify-end pb-3 sm:pb-4 md:pb-6 lg:pb-8">
              <p className="service-text montserrat-hero max-w-[18rem] sm:max-w-[22rem] md:max-w-[28rem] lg:max-w-[24rem] text-[clamp(0.95rem,1.7vw,1.25rem)] leading-relaxed opacity-90">
                {service.text}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div aria-hidden className="h-screen" />
    </section>
  )
}

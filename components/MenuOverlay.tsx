import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MenuOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Entrance
      gsap.set(container.current, { display: 'flex', opacity: 1, y: '100%' });
      
      const enterTl = gsap.timeline();
      
      enterTl.to(container.current, { y: '0%', duration: 0.8, ease: 'power4.inOut' });
      
      enterTl.fromTo('.menu-line', 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 1, ease: 'power4.inOut', stagger: 0.1 }, 
        '-=0.4'
      );
      
      enterTl.fromTo('.menu-text-inner', 
        { y: '120%' }, 
        { y: '0%', duration: 1, ease: 'power4.out', stagger: 0.1 }, 
        '-=0.6'
      );

      enterTl.fromTo('.menu-number', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.5, stagger: 0.1 }, 
        '-=0.4'
      );
      
      tl.current = enterTl;
    } else if (!isOpen && tl.current) {
      // Exit
      const exitTl = gsap.timeline({
        onComplete: () => gsap.set(container.current, { display: 'none' })
      });
      
      exitTl.to('.menu-text-inner', { y: '-120%', duration: 0.6, ease: 'power3.in', stagger: 0.05 })
            .to('.menu-line', { scaleX: 0, duration: 0.6, ease: 'power3.in', stagger: 0.05 }, 0)
            .to('.menu-number', { opacity: 0, duration: 0.4 }, 0)
            .to(container.current, { y: '-100%', duration: 0.8, ease: 'power4.inOut' }, 0.4);
            
      tl.current = exitTl;
    }
  }, [isOpen]);

  const items = ['ABOUT', 'WORKS', 'REVIEWS'];

  return (
    <div ref={container} className="fixed inset-0 bg-[#FDF6EE] text-black z-50 justify-center px-6 md:px-16 hidden origin-top montserrat-hero">
       <header className="absolute top-6 md:top-10 left-6 md:left-10 z-10 uppercase text-xs md:text-sm tracking-widest">
         <div onClick={onClose} className="cursor-pointer group">
          <div className="relative overflow-hidden flex flex-col leading-tight">
            <span className="group-hover:-translate-y-[120%] block transition-transform duration-500 ease-in-out">
              CLOSE
            </span>
            <span className="absolute left-0 top-0 translate-y-[120%] group-hover:translate-y-0 block transition-transform duration-500 ease-in-out text-[#C8A2D4]">
              CLOSE
            </span>
          </div>
         </div>
       </header>
       <div className="w-full max-w-7xl mx-auto flex flex-col pt-10">
         {items.map((item, i) => (
           <div key={item} className="relative w-full">
             <div className="flex justify-between items-start pt-10 pb-4 md:pt-14 md:pb-6">
               <span className="menu-number text-[10px] md:text-xs tracking-widest mt-4 opacity-0 text-black/50">0{i + 1}</span>
               <div className="overflow-hidden group cursor-pointer">
                 <h2 className="menu-text-inner relative flex flex-col text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] tracking-tight uppercase font-[400] translate-y-[120%]">
                   <span className="block group-hover:-translate-y-[120%] transition-transform duration-500 ease-in-out">
                     {item}
                   </span>
                    <span className="absolute left-0 top-0 w-full text-right block translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out text-[#C8A2D4]">
                     {item}
                   </span>
                 </h2>
               </div>
             </div>
             {i < items.length - 1 && <div className="menu-line w-full h-[1px] bg-black/10 origin-left scale-x-0" />}
           </div>
         ))}
       </div>
    </div>
  );
}

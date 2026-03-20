"use client";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Settings, Cpu, HardDrive, Target, Scissors, Hammer, MonitorCheck, LayoutGrid, GitMerge, FileDigit, Zap } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const toolRoomMachines = [
  { name: '4 VMC Machines', icon: MonitorCheck },
  { name: '2 CNC Machines', icon: Cpu },
  { name: '3 Milling Machines', icon: HardDrive },
  { name: '3 Lathe Machines', icon: Settings },
  { name: 'Wire Cut Machine', icon: Scissors },
  { name: 'EDM Machine', icon: Zap },
  { name: 'Radial Drill Machine', icon: Target },
  { name: 'Table Drill Machine', icon: LayoutGrid },
  { name: 'Micro Drilling Machine', icon: FileDigit },
  { name: 'Automatic Surface Grinder', icon: GitMerge },
  { name: 'Band Saw Cutter', icon: Hammer },
];

const EngineeredSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      const items = containerRef.current.querySelectorAll('.tool-item');
      gsap.fromTo(items,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-bvm-navy-light py-24 lg:py-32 border-y border-white/5 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-bvm-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-[8vw] z-10 relative flex flex-col xl:flex-row gap-16 xl:gap-24">
        
        {/* Text Side */}
        <div className="xl:w-5/12 shrink-0">
          <div className="sticky top-32">
            <span className="text-bvm-blue font-mono text-sm uppercase mb-4 block tracking-wider">INFRASTRUCTURE</span>
            <h2 className="headline-md text-white mb-6">
              Advanced In-House Tool Room & Precision Manufacturing
            </h2>
            <div className="space-y-6 text-bvm-gray text-lg leading-relaxed">
              <p>
                Our company is supported by a fully integrated in-house tool room, enabling complete control over the precision manufacturing of molds, machine components, and customized parts. Equipped with advanced machining technology and operated by skilled technicians, our facility ensures high accuracy, consistency, and superior manufacturing quality.
              </p>
              <p>
                The availability of a comprehensive range of machining equipment allows us to efficiently handle complex engineering requirements and deliver reliable solutions for BFS and FFS machine components.
              </p>
              <div className="h-px w-24 bg-bvm-blue/30 my-8" />
              <p className="text-white font-medium border-l-2 border-bvm-blue pl-4">
                This robust manufacturing setup enables us to develop high-precision molds, machine parts, and custom tooling solutions, ensuring consistent performance and long-term reliability of our machines.
              </p>
            </div>
          </div>
        </div>

        {/* Grid Side */}
        <div className="xl:w-7/12" ref={containerRef}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {toolRoomMachines.map((machine, idx) => {
              const Icon = machine.icon;
              return (
                <div 
                  key={idx} 
                  className="tool-item group p-6 bg-bvm-navy border border-white/5 rounded-2xl hover:bg-white/5 hover:border-bvm-blue/30 hover:shadow-glow-blue transition-all duration-300 flex flex-col items-center justify-center text-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-white/5 text-bvm-gray group-hover:bg-bvm-blue group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-display font-medium text-white/90 leading-tight">
                    {machine.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default EngineeredSection;

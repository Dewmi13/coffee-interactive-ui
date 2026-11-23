import React from 'react';
import { ArrowUp, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#080605] text-[#F5EFE6] border-t border-white/[0.08] pt-20 pb-12 px-6 md:px-12 lg:px-16 relative overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#D98A3C]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/[0.06]">
          
          {/* Left Column: Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D98A3C] shadow-[0_0_10px_#D98A3C]" />
              <span className="font-serif tracking-[0.3em] font-bold text-xl text-[#F5EFE6] uppercase">
                NOIR ROAST
              </span>
            </div>
            <p className="text-xs text-[#A89F95] tracking-wide font-sans font-light leading-relaxed max-w-sm">
              Architectural dark roast coffee engineered for the discerning palate. Sourced from high-altitude volcanic micro-lots, roasted with thermal precision, and nitrogen-sealed for timeless purity.
            </p>
            <div className="pt-2 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#A89F95]">
                Roastery Dispatch: Active • Batch #04
              </span>
            </div>
          </div>

          {/* Middle Column 1: Explore Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-[#D98A3C] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#A89F95]">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#F5EFE6] transition-colors cursor-pointer">
                  Heritage
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-[#F5EFE6] transition-colors cursor-pointer">
                  Extraction
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('model-showcase')} className="hover:text-[#F5EFE6] transition-colors cursor-pointer">
                  3D Tasting
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('bento-craft')} className="hover:text-[#F5EFE6] transition-colors cursor-pointer">
                  Craft Bento
                </button>
              </li>
            </ul>
          </div>

          {/* Middle Column 2: Cellar Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-[#D98A3C] font-semibold">
              Cellar
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#A89F95]">
              <li>
                <button onClick={() => scrollToSection('private-cellar')} className="hover:text-[#F5EFE6] transition-colors cursor-pointer">
                  Private Allocation
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('model-showcase')} className="hover:text-[#F5EFE6] transition-colors cursor-pointer">
                  Tasting Notes
                </button>
              </li>
              <li>
                <span className="hover:text-[#F5EFE6] transition-colors cursor-pointer">Wholesale Reserve</span>
              </li>
              <li>
                <span className="hover:text-[#F5EFE6] transition-colors cursor-pointer">Lab Telemetry</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Magnetic Back to Top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between">
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-3 py-3 px-5 rounded-full border border-white/10 hover:border-[#D98A3C] bg-black/40 hover:bg-[#D98A3C] transition-all duration-300 text-xs font-mono tracking-widest uppercase text-[#F5EFE6] hover:text-[#0E0B09] cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
            </button>
            <div className="mt-6 md:mt-0 text-left md:text-right">
              <span className="text-[11px] font-mono text-[#A89F95]/60 block">Haute Roastery Atelier</span>
              <span className="text-xs text-[#D98A3C] font-mono">1,900M • 9.2 BAR</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A89F95]/60">
          <div>
            © {new Date().getFullYear()} NOIR ROAST Inc. All rights reserved. Limited vintage allocations.
          </div>
          <div className="flex items-center space-x-2">
            <span>Editorial Design &</span>
            <span className="text-[#D98A3C] hover:text-[#E5A95C] font-semibold transition-colors cursor-pointer">
              Interactive 3D Experience by Motiq
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

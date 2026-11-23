import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Flame, 
  Activity, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Gauge, 
  Timer, 
  Thermometer, 
  Layers, 
  Check, 
  ChevronRight,
  TrendingUp,
  PackageCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ORIGINS = [
  {
    id: 'ethiopia',
    name: 'Ethiopia Yirgacheffe',
    elevation: '2,150m',
    harvest: 'Dec – Feb',
    process: 'Washed / Sun-Dried African Beds',
    flavor: 'Bergamot, Candied Lemon, Dark Cocoa nibs',
    soil: 'Rich Volcanic Clay',
    curvePath: 'M0,80 Q50,20 100,50 T200,15 T300,45 T400,10 L400,100 L0,100 Z'
  },
  {
    id: 'guatemala',
    name: 'Guatemala Huehuetenango',
    elevation: '1,980m',
    harvest: 'Jan – Apr',
    process: 'Fully Washed Mountain Spring',
    flavor: 'Toasted Marcona Almond, Red Currant, Dark Honey',
    soil: 'Limestone Calcareous Rock',
    curvePath: 'M0,70 Q60,35 120,60 T220,25 T320,55 T400,20 L400,100 L0,100 Z'
  },
  {
    id: 'colombia',
    name: 'Colombia Huila',
    elevation: '1,920m',
    harvest: 'Oct – Jan',
    process: 'Anaerobic Slow Maceration',
    flavor: 'Black Cherry, Vanilla Crema, Brown Sugar',
    soil: 'Volcanic Ash Bedrock',
    curvePath: 'M0,60 Q70,15 140,40 T240,10 T330,35 T400,15 L400,100 L0,100 Z'
  }
];

const SENSORY_ATTRIBUTES = [
  { label: 'Body Density', pct: 92, note: 'Velvet, Syrupy' },
  { label: 'Crema Density', pct: 96, note: 'Micro-Foam Gold' },
  { label: 'Caramel Sweetness', pct: 84, note: 'Cacao Torched Sugar' },
  { label: 'Bright Acidity', pct: 68, note: 'Crisp Stone Fruit' }
];

export default function BentoCraft() {
  const [selectedOrigin, setSelectedOrigin] = useState(0);
  const [tinReserved, setTinReserved] = useState(false);
  const [reservesLeft, setReservesLeft] = useState(14);
  const currentOrigin = ORIGINS[selectedOrigin];

  const handleReserveTin = () => {
    if (!tinReserved && reservesLeft > 0) {
      setTinReserved(true);
      setReservesLeft(prev => prev - 1);
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#D98A3C', '#F5EFE6', '#2A180E']
      });
    }
  };

  return (
    <section id="bento-craft" className="relative w-full bg-[#0E0B09] py-28 px-6 md:px-12 lg:px-16 text-[#F5EFE6] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#D98A3C]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#D98A3C]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-14 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center md:justify-start space-x-2 text-[#D98A3C] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL ROASTING</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight text-[#F5EFE6]">
            The Craft Behind <span className="italic font-normal text-[#D98A3C]">Every Pour.</span>
          </h2>
          <p className="text-sm md:text-base text-[#A89F95] font-light max-w-xl mt-3 font-sans">
            Every batch is an obsession of thermodynamics, high-altitude terroir isolation, and micrometric grind calibration.
          </p>
        </motion.div>
      </div>

      {/* 12-Column Responsive Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* ============================================================== */}
        {/* BENTO CARD 1 (md:col-span-7) — High-Altitude Micro-Lot Origin */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-7 rounded-3xl bg-[#15110E] border border-white/[0.08] p-7 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#D98A3C]/35 transition-colors duration-500"
        >
          {/* Top subtle highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D98A3C]/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest uppercase text-[#D98A3C]">
                <Compass className="w-4 h-4" />
                <span>Terroir & Elevation Matrix</span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A89F95] bg-black/40 px-3 py-1 rounded-full border border-white/5">
                Volcanic Strata
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif text-[#F5EFE6] font-normal mb-4">
              High-Altitude Micro-Lot Isolation
            </h3>

            {/* Interactive Origin Selector Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {ORIGINS.map((origin, idx) => (
                <button
                  key={origin.id}
                  onClick={() => setSelectedOrigin(idx)}
                  className={`text-xs font-mono uppercase tracking-wider py-2 px-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedOrigin === idx
                      ? 'bg-[#D98A3C] text-[#0E0B09] border-[#D98A3C] font-bold shadow-[0_0_15px_rgba(217,138,60,0.3)]'
                      : 'bg-black/30 text-[#A89F95] border-white/10 hover:border-[#D98A3C]/40 hover:text-[#F5EFE6]'
                  }`}
                >
                  {origin.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Details panel with smooth animated content switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentOrigin.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6"
              >
                <div className="bg-black/40 p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-[#A89F95] block mb-1">Peak Elevation</span>
                  <span className="text-[#D98A3C] text-lg font-bold font-mono block">{currentOrigin.elevation}</span>
                  <span className="text-[10px] text-[#A89F95]">Above Sea Level</span>
                </div>
                <div className="bg-black/40 p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-[#A89F95] block mb-1">Harvest Window</span>
                  <span className="text-[#F5EFE6] text-sm font-semibold block">{currentOrigin.harvest}</span>
                  <span className="text-[10px] text-[#A89F95]">Hand-picked cherry</span>
                </div>
                <div className="col-span-2 sm:col-span-1 bg-black/40 p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-[#A89F95] block mb-1">Processing Method</span>
                  <span className="text-[#F5EFE6] text-xs font-medium block leading-snug">{currentOrigin.process}</span>
                  <span className="text-[10px] text-[#A89F95] block mt-0.5">{currentOrigin.soil}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimalist SVG Topographic Elevation Curve */}
          <div className="relative w-full h-24 rounded-2xl bg-black/40 border border-white/5 p-3 flex flex-col justify-end overflow-hidden">
            <div className="absolute top-2 left-3 text-[10px] font-mono tracking-widest text-[#A89F95] uppercase">
              Topographic Contour Profile — {currentOrigin.name}
            </div>
            <svg viewBox="0 0 400 100" className="w-full h-16 stroke-[#D98A3C] fill-[#D98A3C]/10" preserveAspectRatio="none">
              <path d={currentOrigin.curvePath} strokeWidth="2" strokeLinecap="round" className="transition-all duration-700 ease-out" />
            </svg>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* BENTO CARD 2 (md:col-span-5) — Precision Extraction Telemetry */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-5 rounded-3xl bg-[#15110E] border border-white/[0.08] p-7 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#D98A3C]/35 transition-colors duration-500"
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest uppercase text-[#D98A3C]">
                <Activity className="w-4 h-4" />
                <span>Extraction Lab Telemetry</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-[#D98A3C]/15 border border-[#D98A3C]/30 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D98A3C] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D98A3C] font-semibold">Live Calibrated</span>
              </div>
            </div>

            <h3 className="text-2xl font-serif text-[#F5EFE6] font-normal mb-2">
              Micro-Bar Dynamic Equilibrium
            </h3>
            <p className="text-xs text-[#A89F95] font-light mb-6">
              Synchronized 9.2-bar rotary pump with PID dual-boiler temperature stabilization.
            </p>

            {/* 4 Telemetry Metrics */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-black/40 p-4 rounded-2xl border border-white/5 relative group/metric">
                <div className="flex items-center space-x-2 text-[#A89F95] text-[10px] font-mono uppercase mb-1">
                  <Gauge className="w-3.5 h-3.5 text-[#D98A3C]" />
                  <span>Head Pressure</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#F5EFE6]">9.2 <span className="text-xs text-[#D98A3C] font-normal">BAR</span></div>
                <div className="text-[10px] text-[#A89F95] mt-1">±0.05 bar variance</div>
              </div>

              <div className="bg-black/40 p-4 rounded-2xl border border-white/5 relative group/metric">
                <div className="flex items-center space-x-2 text-[#A89F95] text-[10px] font-mono uppercase mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#D98A3C]" />
                  <span>Thermal Lock</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#F5EFE6]">93.4 <span className="text-xs text-[#D98A3C] font-normal">°C</span></div>
                <div className="text-[10px] text-[#A89F95] mt-1">Dual-PID stability</div>
              </div>

              <div className="bg-black/40 p-4 rounded-2xl border border-white/5 relative group/metric">
                <div className="flex items-center space-x-2 text-[#A89F95] text-[10px] font-mono uppercase mb-1">
                  <Layers className="w-3.5 h-3.5 text-[#D98A3C]" />
                  <span>Brew Ratio</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#F5EFE6]">1:2.1 <span className="text-xs text-[#D98A3C] font-normal">G</span></div>
                <div className="text-[10px] text-[#A89F95] mt-1">19.5g in → 41g out</div>
              </div>

              <div className="bg-black/40 p-4 rounded-2xl border border-white/5 relative group/metric">
                <div className="flex items-center space-x-2 text-[#A89F95] text-[10px] font-mono uppercase mb-1">
                  <Timer className="w-3.5 h-3.5 text-[#D98A3C]" />
                  <span>Golden Pull</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#F5EFE6]">28.0 <span className="text-xs text-[#D98A3C] font-normal">SEC</span></div>
                <div className="text-[10px] text-[#A89F95] mt-1">Pre-infusion 4.5s</div>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-black/50 border border-[#D98A3C]/20 flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#A89F95] uppercase">Roast Profile</span>
            <span className="text-xs font-mono font-bold text-[#D98A3C] tracking-wider">VELVET DARK • LOT 04</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* BENTO CARD 3 (md:col-span-4) — Interactive Sensory Intensity */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-4 rounded-3xl bg-[#15110E] border border-white/[0.08] p-7 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#D98A3C]/35 transition-colors duration-500"
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest uppercase text-[#D98A3C] mb-3">
              <TrendingUp className="w-4 h-4" />
              <span>Sensory Matrix</span>
            </div>
            <h3 className="text-xl font-serif text-[#F5EFE6] font-normal mb-1">
              Intensity Profile
            </h3>
            <p className="text-xs text-[#A89F95] font-light mb-6">
              Organoleptic evaluation tested across temperature drops.
            </p>

            <div className="space-y-4">
              {SENSORY_ATTRIBUTES.map((attr, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#F5EFE6] font-medium">{attr.label}</span>
                    <span className="text-[#D98A3C] font-bold">{attr.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#D98A3C] to-[#F5EFE6] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${attr.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.0, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="text-[10px] text-[#A89F95] font-sans font-light">{attr.note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#A89F95]">
            <span>Sensory Index: 9.4/10</span>
            <span className="text-[#D98A3C]">Full Resonance</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* BENTO CARD 4 (md:col-span-4) — The Roaster's Standard */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-4 rounded-3xl bg-[#15110E] border border-white/[0.08] p-7 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#D98A3C]/35 transition-colors duration-500"
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest uppercase text-[#D98A3C] mb-3">
              <Award className="w-4 h-4" />
              <span>Standard of Purity</span>
            </div>
            
            <h3 className="text-xl font-serif text-[#F5EFE6] font-normal mb-4">
              The Roaster's Ethos
            </h3>

            {/* Pull Quote */}
            <blockquote className="text-sm font-serif italic text-[#F5EFE6]/90 border-l-2 border-[#D98A3C] pl-4 py-1 my-4 leading-relaxed bg-black/20 rounded-r-xl">
              "Heat is merely a tool; restraint creates velvet."
            </blockquote>

            <p className="text-xs text-[#A89F95] font-light leading-relaxed mb-6 font-sans">
              Each small-batch roast is cooled with laminar conditioned air and resting under pressurized nitrogen to prevent volatile lipid oxidation.
            </p>
          </div>

          {/* Seals */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
            <div className="bg-black/40 p-3 rounded-xl border border-white/5 flex items-center space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-[#D98A3C] shrink-0" />
              <div>
                <span className="text-[10px] font-mono uppercase text-[#A89F95] block">Q-Grader</span>
                <span className="text-xs font-bold text-[#F5EFE6]">91.5 / 100</span>
              </div>
            </div>
            <div className="bg-black/40 p-3 rounded-xl border border-white/5 flex items-center space-x-2.5">
              <PackageCheck className="w-4 h-4 text-[#D98A3C] shrink-0" />
              <div>
                <span className="text-[10px] font-mono uppercase text-[#A89F95] block">Traceability</span>
                <span className="text-xs font-bold text-[#F5EFE6]">Direct Trade</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* BENTO CARD 5 (md:col-span-4) — Limited Batch #04 Allocation */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-4 rounded-3xl bg-[#15110E] border border-white/[0.08] p-7 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#D98A3C]/35 transition-colors duration-500"
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#D98A3C]/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest uppercase text-[#D98A3C]">
                <Flame className="w-4 h-4" />
                <span>Cellar Allocation</span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D98A3C] bg-[#D98A3C]/10 border border-[#D98A3C]/30 px-2 py-0.5 rounded-full font-bold">
                Batch #04
              </span>
            </div>

            <h3 className="text-xl font-serif text-[#F5EFE6] font-normal mb-2">
              Nitrogen Sealed Tins
            </h3>
            <p className="text-xs text-[#A89F95] font-light mb-6">
              Milled in limited quantities of 100 sealed cylindrical dark obsidian tins per harvest.
            </p>

            {/* Scarcity Bar */}
            <div className="bg-black/40 p-4 rounded-2xl border border-white/5 mb-6">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#A89F95]">Reserve Status</span>
                <span className="text-[#D98A3C] font-bold">{reservesLeft} / 100 Remaining</span>
              </div>
              <div className="w-full h-2 bg-black/70 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D98A3C] to-[#E5A95C] rounded-full amber-glow"
                  initial={{ width: '86%' }}
                  animate={{ width: `${(reservesLeft / 100) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-[10px] font-mono text-[#A89F95] mt-2 block">
                Next Roasting Batch: Dispatches in 4 days
              </span>
            </div>
          </div>

          {/* Interactive Button */}
          <button
            onClick={handleReserveTin}
            disabled={tinReserved}
            className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
              tinReserved
                ? 'bg-[#1e2a1e] text-[#a3e635] border border-[#a3e635]/40'
                : 'bg-[#D98A3C] text-[#0E0B09] hover:bg-[#e49b52] amber-glow hover:scale-[1.02]'
            }`}
          >
            {tinReserved ? (
              <>
                <Check className="w-4 h-4 text-[#a3e635]" />
                <span>Added to Allocation</span>
              </>
            ) : (
              <>
                <span>Reserve Tin — $48</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.div>

      </div>
    </section>
  );
}

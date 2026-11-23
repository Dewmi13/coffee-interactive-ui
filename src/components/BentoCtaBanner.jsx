import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BentoCtaBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.8 },
      colors: ['#D98A3C', '#F5EFE6', '#2A180E']
    });
  };

  return (
    <section id="private-cellar" className="relative w-full bg-[#0E0B09] py-20 px-6 md:px-12 lg:px-16 text-[#F5EFE6]">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#181310] to-[#120E0C] border border-white/[0.08] p-8 md:p-14 lg:p-16 overflow-hidden shadow-2xl group hover:border-[#D98A3C]/30 transition-colors duration-500">
          
          {/* Subtle top inner edge highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {/* Warm Amber Radial Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#D98A3C]/12 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#D98A3C]/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 text-[#D98A3C] text-xs font-semibold uppercase tracking-[0.3em] mb-4 bg-black/40 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE PRIVATE CELLAR ALLOCATION</span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-[#F5EFE6] leading-tight mb-4">
              Enter the Inner Reserve <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#D98A3C] via-[#E5A95C] to-[#F5EFE6]">
                of Exceptional Extractions.
              </span>
            </h2>

            <p className="text-sm md:text-base text-[#A89F95] font-light leading-relaxed mb-8 font-sans">
              Join an exclusive collective of coffee sommeliers. Receive first access to micro-lot cuvées, seasonal single-origin releases, and private harvest invitations.
            </p>

            {/* Email Form */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black/60 border border-[#D98A3C]/40 p-5 rounded-2xl flex items-center justify-center space-x-3 text-sm font-mono text-[#D98A3C]"
              >
                <CheckCircle2 className="w-5 h-5 text-[#D98A3C]" />
                <span className="font-semibold tracking-wide">
                  Invitation Registered — Batch #05 Priority Access Granted.
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89F95]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your VIP email..."
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-full py-4 pl-11 pr-4 text-xs font-sans text-[#F5EFE6] placeholder:text-[#A89F95]/60 focus:outline-none focus:border-[#D98A3C] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="py-4 px-8 rounded-full bg-[#D98A3C] text-[#0E0B09] font-bold text-xs uppercase tracking-widest hover:bg-[#e49b52] amber-glow transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shrink-0 hover:scale-105"
                >
                  <span>Request Invitation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="mt-6 flex items-center justify-center space-x-6 text-[11px] font-mono text-[#A89F95]/60">
              <span>Strictly Limited Allocation</span>
              <span>•</span>
              <span>No Spam • Encrypted Dispatch</span>
              <span>•</span>
              <span>Direct Roastery Access</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

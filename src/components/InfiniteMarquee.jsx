import React from 'react';

const MARQUEE_ITEMS = [
  "SINGLE-ORIGIN MICRO-LOTS",
  "91.5 Q-GRADER CERTIFIED",
  "9.2 BAR PRECISION EXTRACTION",
  "SMALL-BATCH NITROGEN SEALED",
  "DIRECT TRADE HARVEST",
  "1,900M HIGH-ALTITUDE VOLCANIC SOIL",
  "HEIRLOOM TYPICA & BOURBON",
  "HAND-ROASTED BY MOTIQ ATELIERS"
];

export default function InfiniteMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.06] bg-[#0A0807] py-4.5 select-none z-20">
      <div className="flex w-max animate-marquee space-x-8">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
          <div key={index} className="flex items-center space-x-8">
            <span className="font-mono text-xs tracking-[0.25em] text-[#A89F95] uppercase font-light whitespace-nowrap hover:text-[#D98A3C] transition-colors">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D98A3C]/60" />
          </div>
        ))}
      </div>
    </div>
  );
}

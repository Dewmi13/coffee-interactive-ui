import React from 'react';
import HeroCanvas from './components/HeroCanvas';
import ModelShowcase from './components/ModelShowcase';
import InfiniteMarquee from './components/InfiniteMarquee';
import BentoCraft from './components/BentoCraft';
import BentoCtaBanner from './components/BentoCtaBanner';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0E0B09] text-[#F5EFE6] selection:bg-[#D98A3C] selection:text-[#0E0B09]">
      {/* 1. Multi-Stage Scroll-Driven Canvas Hero (500vh) with Frosted Navbar & Scrim */}
      <HeroCanvas />

      {/* 2. Interactive 3D Model Showcase with Center Framing & Balanced Tasting Pills */}
      <ModelShowcase />

      {/* 3. Subtle Infinite Marquee Divider */}
      <InfiniteMarquee />

      {/* 4. Modern Dark-Luxury Bento Grid ("The Craft Behind Every Pour") */}
      <BentoCraft />

      {/* 5. Full-Width Bento CTA Banner ("The Private Cellar Allocation") */}
      <BentoCtaBanner />

      {/* 6. Upgraded Architectural Luxury Multi-Column Footer */}
      <Footer />
    </div>
  );
}

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowDown, Sparkles, Compass, Flame, Droplets } from 'lucide-react';

const TOTAL_FRAMES = 180;

export default function HeroCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrolledPastNav, setScrolledPastNav] = useState(false);

  // Cache preloaded Image objects
  const imagesRef = useRef([]);

  // Mouse tilt position for 3D parallax effect on the canvas container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 25 });

  // Scroll progress through the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track scroll position for navbar frosted glass transition
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 40) {
        setScrolledPastNav(true);
      } else {
        setScrolledPastNav(false);
      }
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  // Preload frames 001 - 180
  useEffect(() => {
    let loadedCount = 0;
    const imgs = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/frames/frame_${paddedIndex}.webp`;
      img.onload = () => {
        loadedCount++;
        const pct = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(pct);
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = imgs;
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        const pct = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(pct);
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = imgs;
          setImagesLoaded(true);
        }
      };
      imgs.push(img);
    }
  }, []);

  // Subtle mouse parallax tilt
  const handleMouseMove = (e) => {
    const { clientWidth, clientHeight } = document.documentElement;
    const x = (e.clientX / clientWidth - 0.5) * 2; // -1 to 1
    const y = (e.clientY / clientHeight - 0.5) * 2; // -1 to 1
    mouseX.set(x * 10);
    mouseY.set(-y * 10);
  };

  // Canvas drawing loop synchronized with scroll progress
  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    const render = () => {
      const scrollVal = scrollYProgress.get();
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(scrollVal * (TOTAL_FRAMES - 1)))
      );

      const img = imagesRef.current[frameIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        const dpr = window.devicePixelRatio || 1;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
          canvas.width = width * dpr;
          canvas.height = height * dpr;
        }

        ctx.save();
        ctx.scale(dpr, dpr);

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = width / height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = width;
          drawHeight = width / imgRatio;
          offsetX = 0;
          offsetY = (height - drawHeight) / 2;
        } else {
          drawHeight = height;
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        // Subtle dark luxury vignette overlay
        const gradient = ctx.createRadialGradient(
          width / 2, height / 2, Math.min(width, height) * 0.25,
          width / 2, height / 2, Math.max(width, height) * 0.75
        );
        gradient.addColorStop(0, 'rgba(14, 11, 9, 0)');
        gradient.addColorStop(0.7, 'rgba(14, 11, 9, 0.4)');
        gradient.addColorStop(1, 'rgba(14, 11, 9, 0.85)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [imagesLoaded, scrollYProgress]);

  // Framer Motion transforms for Stage 1 (0% - 33%)
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.24, 0.33], [1, 1, 0.85, 0]);
  const stage1Y = useTransform(scrollYProgress, [0, 0.28, 0.33], [0, 0, -35]);
  const stage1Scale = useTransform(scrollYProgress, [0, 0.33], [1, 0.97]);

  // Framer Motion transforms for Stage 2 (34% - 66%)
  const stage2Opacity = useTransform(scrollYProgress, [0.33, 0.42, 0.58, 0.67], [0, 1, 1, 0]);
  const stage2Y = useTransform(scrollYProgress, [0.33, 0.42, 0.58, 0.67], [35, 0, 0, -35]);

  // Framer Motion transforms for Stage 3 (67% - 100%)
  const stage3Opacity = useTransform(scrollYProgress, [0.67, 0.76, 0.95, 1.0], [0, 1, 1, 1]);
  const stage3Y = useTransform(scrollYProgress, [0.67, 0.76, 1.0], [35, 0, 0]);

  // Bottom scroll indicator fades out past 85% to prevent overlap with beans/pour
  const bottomIndicatorOpacity = useTransform(scrollYProgress, [0, 0.75, 0.85], [1, 1, 0]);

  // Scrubber chapter state
  const [activeChapter, setActiveChapter] = useState(1);
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.34) setActiveChapter(1);
      else if (latest < 0.67) setActiveChapter(2);
      else setActiveChapter(3);
    });
  }, [scrollYProgress]);

  const scrollToChapter = (chapterNum) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;

    let targetRatio = 0.04;
    if (chapterNum === 2) targetRatio = 0.48;
    if (chapterNum === 3) targetRatio = 0.86;

    window.scrollTo({
      top: containerTop + totalHeight * targetRatio,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative w-full h-[500vh] bg-[#0E0B09] selection:bg-[#D98A3C]"
    >
      {/* 1. Full-Viewport Sticky Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">

        {/* Loading Progress Bar Screen before full reveal */}
        {!imagesLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0E0B09] text-[#F5EFE6]">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center px-6"
            >
              <span className="text-[#D98A3C] tracking-[0.4em] uppercase text-xs font-semibold block mb-4">
                Haute Dark Roast Experience
              </span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-widest uppercase mb-8 font-light text-[#F5EFE6]">
                NOIR ROAST
              </h2>

              <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mx-auto mb-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D98A3C] to-[#F5EFE6]"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <div className="text-xs font-mono text-[#D98A3C] tracking-widest">
                PREHEATING EXTRACTION — {loadProgress}%
              </div>
            </motion.div>
          </div>
        )}

        {/* Parallax Tilt Canvas Container */}
        <motion.div
          style={{
            rotateY: springX,
            rotateX: springY,
            transformPerspective: 1200
          }}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block object-cover pointer-events-none"
          />
        </motion.div>

        {/* Hero Text Readability Scrim (Left-to-Right smooth gradient) */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(90deg, rgba(14,11,9,0.88) 0%, rgba(14,11,9,0.55) 35%, rgba(14,11,9,0.15) 60%, transparent 75%)'
          }}
        />

        {/* Top subtle vignette */}
        <div className="absolute top-0 inset-x-0 h-40 pointer-events-none z-10 bg-gradient-to-b from-[#0E0B09]/90 to-transparent" />

        {/* Seamless Exit: Soft bottom gradient mask (h-36) blending invisibly into Section 2 */}
        <div className="absolute bottom-0 inset-x-0 h-36 pointer-events-none z-10 bg-gradient-to-t from-[#0E0B09] via-[#0E0B09]/80 to-transparent" />

        {/* Scroll-Aware Frosted Glass Navbar */}
        <header
          className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-300 pointer-events-auto ${
            scrolledPastNav
              ? 'bg-[#0E0B09]/80 backdrop-blur-md border-b border-white/[0.06] shadow-lg shadow-black/50 py-3.5'
              : 'bg-transparent border-b border-transparent py-6'
          }`}
        >
          <div
            onClick={() => scrollToChapter(1)}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#D98A3C] inline-block animate-pulse shadow-[0_0_10px_#D98A3C]" />
            <h1 className="text-lg md:text-xl font-serif tracking-[0.28em] font-bold text-[#F5EFE6] group-hover:text-[#D98A3C] transition-colors">
              NOIR ROAST
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-[11px] tracking-[0.22em] uppercase font-medium text-[#A89F95]">
            <button
              onClick={() => scrollToChapter(1)}
              className="hover:text-[#F5EFE6] transition-colors cursor-pointer"
            >
              Heritage
            </button>
            <button
              onClick={() => scrollToChapter(2)}
              className="hover:text-[#F5EFE6] transition-colors cursor-pointer"
            >
              Extraction
            </button>
            <button
              onClick={() => scrollToSection('model-showcase')}
              className="hover:text-[#D98A3C] transition-colors cursor-pointer"
            >
              Tasting 3D
            </button>
            <button
              onClick={() => scrollToSection('bento-craft')}
              className="hover:text-[#D98A3C] transition-colors cursor-pointer"
            >
              Bento Craft
            </button>
            <button
              onClick={() => scrollToSection('private-cellar')}
              className="hover:text-[#D98A3C] transition-colors cursor-pointer"
            >
              Allocation
            </button>
          </nav>

          <button
            onClick={() => scrollToSection('private-cellar')}
            className="text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-[#D98A3C]/40 text-[#D98A3C] hover:bg-[#D98A3C] hover:text-[#0E0B09] transition-all duration-300 font-semibold backdrop-blur-md cursor-pointer hover:shadow-[0_0_15px_rgba(217,138,60,0.3)]"
          >
            Curated Cellar
          </button>
        </header>

        {/* STAGE 1 TYPOGRAPHY (0% - 33%) */}
        <motion.div
          style={{ opacity: stage1Opacity, y: stage1Y, scale: stage1Scale }}
          className="absolute left-6 sm:left-12 md:left-20 max-w-xl pointer-events-none z-20"
        >
          <div className="flex items-center space-x-2 text-[#D98A3C] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            <Compass className="w-4 h-4 text-[#D98A3C]" />
            <span>01. Single-Origin Beans</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#F5EFE6] font-light leading-[1.08] tracking-tight mb-5">
            Born at <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F5EFE6] via-[#E2D4C3] to-[#D98A3C]">
              1,900 Meters.
            </span>
          </h2>
          <p className="text-sm md:text-base font-sans text-[#A89F95] font-light leading-relaxed max-w-md backdrop-blur-sm bg-black/30 p-4 rounded-2xl border border-white/5">
            Harvested in volcanic micro-climates where slow maturation condenses high-altitude sugars into profound notes of heirloom dark chocolate and stone fruit.
          </p>
          <div className="mt-6 flex items-center space-x-3 text-xs tracking-widest uppercase text-[#D98A3C]/90 font-mono">
            <span className="inline-block w-8 h-[1px] bg-[#D98A3C]" />
            <span>Scroll to Initiate Extraction</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#D98A3C]" />
          </div>
        </motion.div>

        {/* STAGE 2 TYPOGRAPHY (34% - 66%) */}
        <motion.div
          style={{ opacity: stage2Opacity, y: stage2Y }}
          className="absolute left-6 sm:left-12 md:left-20 max-w-xl pointer-events-none z-20"
        >
          <div className="flex items-center space-x-2 text-[#D98A3C] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            <Flame className="w-4 h-4 text-[#D98A3C]" />
            <span>02. Micro-Grind Extraction</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#F5EFE6] font-light leading-[1.08] tracking-tight mb-5">
            Crushed. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D98A3C] via-[#E2D4C3] to-[#F5EFE6] font-normal">
              Pressurized.
            </span> <br />
            Pure.
          </h2>
          <p className="text-sm md:text-base font-sans text-[#A89F95] font-light leading-relaxed max-w-md backdrop-blur-sm bg-black/30 p-4 rounded-2xl border border-white/5">
            Precision 9-bar pre-infusion fractures the roasted cellular structure, releasing dense volatile aromatic oils before steam condenses into liquid gold.
          </p>
          <div className="mt-5 flex items-center space-x-5 text-xs text-[#A89F95] font-mono">
            <div>
              <span className="text-[#D98A3C] text-lg font-bold block">9.2 BAR</span>
              <span className="text-[10px]">PRESSURE</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-[#D98A3C] text-lg font-bold block">93.4°C</span>
              <span className="text-[10px]">STABILITY</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-[#D98A3C] text-lg font-bold block">1:2.1</span>
              <span className="text-[10px]">EXTRACTION RATIO</span>
            </div>
          </div>
        </motion.div>

        {/* STAGE 3 TYPOGRAPHY (67% - 100%) */}
        <motion.div
          style={{ opacity: stage3Opacity, y: stage3Y }}
          className="absolute left-6 sm:left-12 md:left-20 max-w-xl pointer-events-auto z-20"
        >
          <div className="flex items-center space-x-2 text-[#D98A3C] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            <Droplets className="w-4 h-4 text-[#D98A3C]" />
            <span>03. The Velvet Pour</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#F5EFE6] font-light leading-[1.08] tracking-tight mb-5">
            Crafted for the <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#D98A3C] to-[#F5EFE6]">
              First Sip.
            </span>
          </h2>
          <p className="text-sm md:text-base font-sans text-[#A89F95] font-light leading-relaxed max-w-md mb-8 backdrop-blur-sm bg-black/30 p-4 rounded-2xl border border-white/5">
            A golden-hued micro-foam crema blanket suspended over unadulterated espresso. Thick, unyielding, and impeccably balanced.
          </p>

          {/* Glowing Amber CTA Pill Button */}
          <button
            onClick={() => scrollToSection('model-showcase')}
            className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#D98A3C] text-[#0E0B09] font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:bg-[#e49b52] amber-glow cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#0E0B09] transition-transform group-hover:rotate-12" />
            <span>Explore the Roast</span>
            <span className="w-2 h-2 rounded-full bg-[#0E0B09]/80 group-hover:scale-125 transition-transform" />
          </button>
        </motion.div>

        {/* FIXED RIGHT-SIDE VERTICAL CHAPTER SCRUBBER WITH DARK FROSTED BACKDROP PILL */}
        <aside className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-40 bg-[#0E0B09]/55 backdrop-blur-sm border border-white/[0.06] rounded-full px-3 py-4 flex flex-col items-end space-y-5 pointer-events-auto shadow-2xl">
          {/* Chapter 1 */}
          <button
            onClick={() => scrollToChapter(1)}
            className="group flex items-center space-x-2.5 cursor-pointer text-right transition-all"
            aria-label="Jump to Chapter 1"
          >
            <span
              className={`text-[11px] tracking-[0.2em] uppercase font-mono transition-colors duration-300 ${
                activeChapter === 1 ? 'text-[#D98A3C] font-semibold' : 'text-[#A89F95]/60 group-hover:text-[#F5EFE6]'
              }`}
            >
              01. Beans
            </span>
            <div
              className={`w-1.5 transition-all duration-300 rounded-full ${
                activeChapter === 1
                  ? 'h-7 bg-[#D98A3C] amber-glow'
                  : 'h-2 bg-white/20 group-hover:bg-white/50'
              }`}
            />
          </button>

          {/* Chapter 2 */}
          <button
            onClick={() => scrollToChapter(2)}
            className="group flex items-center space-x-2.5 cursor-pointer text-right transition-all"
            aria-label="Jump to Chapter 2"
          >
            <span
              className={`text-[11px] tracking-[0.2em] uppercase font-mono transition-colors duration-300 ${
                activeChapter === 2 ? 'text-[#D98A3C] font-semibold' : 'text-[#A89F95]/60 group-hover:text-[#F5EFE6]'
              }`}
            >
              02. Extraction
            </span>
            <div
              className={`w-1.5 transition-all duration-300 rounded-full ${
                activeChapter === 2
                  ? 'h-7 bg-[#D98A3C] amber-glow'
                  : 'h-2 bg-white/20 group-hover:bg-white/50'
              }`}
            />
          </button>

          {/* Chapter 3 */}
          <button
            onClick={() => scrollToChapter(3)}
            className="group flex items-center space-x-2.5 cursor-pointer text-right transition-all"
            aria-label="Jump to Chapter 3"
          >
            <span
              className={`text-[11px] tracking-[0.2em] uppercase font-mono transition-colors duration-300 ${
                activeChapter === 3 ? 'text-[#D98A3C] font-semibold' : 'text-[#A89F95]/60 group-hover:text-[#F5EFE6]'
              }`}
            >
              03. The Pour
            </span>
            <div
              className={`w-1.5 transition-all duration-300 rounded-full ${
                activeChapter === 3
                  ? 'h-7 bg-[#D98A3C] amber-glow'
                  : 'h-2 bg-white/20 group-hover:bg-white/50'
              }`}
            />
          </button>
        </aside>

        {/* Bottom Scroll Indicator - smoothly fades out past 85% */}
        <motion.div
          style={{ opacity: bottomIndicatorOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#A89F95]/60 uppercase pointer-events-none font-mono z-20"
        >
          <span>Continuous Scroll Interaction</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D98A3C]/80" />
        </motion.div>
      </div>
    </div>
  );
}

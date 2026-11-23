import React, { useRef, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, ContactShadows, Center } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Award, Sparkles, ShieldCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const TASTING_NOTES = [
  {
    id: "dark-cacao",
    label: "Dark Cacao",
    // Well-balanced 3/4 hero camera angle pulled safely back (distance ~7.0)
    cameraPos: [2.0, 2.8, 6.4],
    targetPos: [0, 0.05, 0],
    intensity: "88% Intensity",
    origin: "Yirgacheffe High-Plateau",
    roastProfile: "French Black Velvet",
    notes: "Deep bittersweet Dutch cocoa, roasted nibs, hints of black cherry liqueur.",
    tagline: "Dense, earthy and unapologetically bold."
  },
  {
    id: "caramel-crema",
    label: "Caramel Crema",
    // Elevated 45° angle showcasing the crema layer from safe distance (distance ~7.1)
    cameraPos: [0.0, 4.4, 5.6],
    targetPos: [0, 0.15, 0],
    intensity: "72% Intensity",
    origin: "Antioquia Volcanic Slopes",
    roastProfile: "Molten Honey Roast",
    notes: "Salted butterscotch, torched sugar cane, rich golden velvet mouthfeel.",
    tagline: "Silky sweetness that lingers with unyielding warmth."
  },
  {
    id: "toasted-almond",
    label: "Toasted Almond",
    // Side angle viewing beans and handle silhouette from safe distance (distance ~7.2)
    cameraPos: [-4.2, 2.6, 5.2],
    targetPos: [0, 0.0, 0],
    intensity: "65% Intensity",
    origin: "Huehuetenango Highlands",
    roastProfile: "Viennese Amber Roast",
    notes: "Dry-roasted marcona almond, subtle wild hazelnut, crisp Madagascar vanilla finish.",
    tagline: "Nutty, nuanced and exquisitely aromatic."
  }
];

// Gentle rising steam particles
function SteamParticles() {
  const count = 18;
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.4,
      y: 0.8 + Math.random() * 0.9,
      z: (Math.random() - 0.5) * 0.4,
      speed: 0.004 + Math.random() * 0.006,
      scale: 0.04 + Math.random() * 0.05,
      drift: (Math.random() - 0.5) * 0.002,
    }));
  }, []);

  const meshRefs = useRef([]);

  useFrame(() => {
    particles.forEach((p, i) => {
      p.y += p.speed;
      p.x += p.drift;
      if (p.y > 2.0) {
        p.y = 0.8;
        p.x = (Math.random() - 0.5) * 0.4;
      }
      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.set(p.x, p.y, p.z);
        // Fade out as it rises
        const alpha = Math.max(0, 1 - (p.y - 0.8) / 1.2);
        mesh.scale.setScalar(p.scale * (1 + (p.y - 0.8)));
        if (mesh.material) mesh.material.opacity = alpha * 0.16;
      }
    });
  });

  return (
    <group>
      {particles.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => (meshRefs.current[i] = el)}
          position={[p.x, p.y, p.z]}
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial
            color="#EAE3D2"
            transparent
            opacity={0.15}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// 3D Cup Model using GLTF with fallback procedural geometry
function CoffeeCupModel() {
  let gltf;
  try {
    gltf = useGLTF('/models/coffee_cup.glb');
  } catch {
    gltf = null;
  }

  const modelRef = useRef();

  if (gltf && gltf.scene) {
    return (
      <group>
        <primitive
          ref={modelRef}
          object={gltf.scene}
          scale={0.58}
          position={[0, 0, 0]}
        />
        <SteamParticles />
      </group>
    );
  }

  // Fallback procedural sculpture
  return (
    <group position={[0, -0.1, 0]} scale={0.58}>
      {/* Matte charcoal cup */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.9, 0.6, 1.2, 48]} />
        <meshStandardMaterial color="#221C18" roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Gold rim */}
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.02, 16, 48]} />
        <meshStandardMaterial color="#E5A95C" roughness={0.15} metalness={0.9} />
      </mesh>
      {/* Crema */}
      <mesh position={[0, 1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.82, 36]} />
        <meshStandardMaterial color="#D49A5E" roughness={0.5} />
      </mesh>
      {/* Saucer */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[1.6, 1.2, 0.06, 48]} />
        <meshStandardMaterial color="#1C1714" roughness={0.35} metalness={0.2} />
      </mesh>
      <SteamParticles />
    </group>
  );
}

// Camera Rig interpolating smoothly to target tasting note without zoom traps
function CameraRig({ activeNoteIndex }) {
  const controlsRef = useRef();

  useFrame((state, delta) => {
    if (!controlsRef.current) return;

    const note = TASTING_NOTES[activeNoteIndex];
    const targetCamVec = new THREE.Vector3(...note.cameraPos);
    const targetLookAt = new THREE.Vector3(...note.targetPos);

    // Smooth camera position interpolation
    state.camera.position.lerp(targetCamVec, delta * 2.8);
    controlsRef.current.target.lerp(targetLookAt, delta * 2.8);
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false} // NEVER trap user scroll
      enablePan={false}
      enableDamping={true}
      dampingFactor={0.05}
      autoRotate={true}
      autoRotateSpeed={0.6}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.15}
    />
  );
}

export default function ModelShowcase() {
  const [activeNoteIndex, setActiveNoteIndex] = useState(0);
  const [orderSaved, setOrderSaved] = useState(false);
  const activeNote = TASTING_NOTES[activeNoteIndex];

  const triggerOrderFeedback = () => {
    setOrderSaved(true);
    confetti({
      particleCount: 55,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D98A3C', '#F5EFE6', '#4A2810']
    });
    setTimeout(() => setOrderSaved(false), 2400);
  };

  return (
    <section
      id="model-showcase"
      className="relative w-full bg-[#0E0B09] text-[#F5EFE6] py-28 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Background Ambience Radial Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#D98A3C]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#D98A3C]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Header Info - Balanced Single Line Title */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center space-x-2 text-[#D98A3C] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Tasting Experience</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide text-[#F5EFE6]">
              NOIR Signature <span className="italic font-normal text-[#D98A3C]">3D Tasting</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#A89F95] font-sans font-light max-w-sm mt-4 md:mt-0 leading-relaxed">
            Drag to inspect in 360° studio lighting. Toggle flavor profiles below to navigate camera perspectives and sensory compound analysis.
          </p>
        </div>
      </div>

      {/* Main 2-Column Showcase Grid with Shared Equal Heights */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: 3D Canvas with Center & Safe Framing */}
        <div className="lg:col-span-7 relative min-h-[520px] lg:min-h-[580px] w-full rounded-3xl bg-[#15110E] border border-white/[0.08] overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#D98A3C]/30 transition-colors duration-500">
          
          {/* Subtle warm radial spotlight gradient directly behind the 3D canvas so dark ceramic silhouettes stand out */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle at 50% 52%, rgba(217, 138, 60, 0.16) 0%, rgba(14, 11, 9, 0) 62%)'
            }}
          />

          {/* Subtle canvas top bar */}
          <div className="absolute top-4 left-6 z-10 flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#D98A3C] uppercase backdrop-blur-md bg-black/50 px-3.5 py-1.5 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#D98A3C] animate-ping" />
            <span>Realtime WebGL 3D Studio</span>
          </div>

          <div className="absolute top-4 right-6 z-10 text-[11px] font-mono text-[#A89F95] tracking-wider hidden sm:block backdrop-blur-md bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
            360° DRAG ROTATE • ZOOM LOCKED
          </div>

          {/* Three.js Canvas with pulled back camera and Center framing */}
          <div className="w-full h-full flex-1 min-h-[460px] relative z-10">
            <Canvas
              shadows
              camera={{ position: [2.0, 2.8, 6.4], fov: 32 }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              {/* Studio lighting environment with brightened ceramic rim & fill */}
              <ambientLight intensity={0.95} />
              
              {/* Key Studio Light */}
              <directionalLight
                position={[5, 8, 4]}
                intensity={2.4}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                color="#FFF8F0"
              />

              {/* Brightened Molten Amber Rim Light emphasizing ceramic body & handle */}
              <spotLight
                position={[-5, 5, -3]}
                intensity={4.8}
                angle={0.7}
                penumbra={1}
                color="#E5A95C"
              />

              {/* Cool-white specular fill light for glossy ceramic and saucer reflections */}
              <directionalLight position={[-4, 2, 4]} intensity={1.4} color="#E8F0FE" />

              {/* Soft bottom uplift light */}
              <pointLight position={[0, -2, 2.5]} intensity={0.8} color="#F5EFE6" />

              <Suspense fallback={null}>
                {/* Center ensures the model never clips card borders */}
                <Center top>
                  <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.2}>
                    <CoffeeCupModel />
                  </Float>
                </Center>
                
                <ContactShadows
                  position={[0, -0.45, 0]}
                  opacity={0.65}
                  scale={4.8}
                  blur={2.4}
                  far={3.0}
                  color="#000000"
                />
                <CameraRig activeNoteIndex={activeNoteIndex} />
              </Suspense>
            </Canvas>
          </div>

          {/* Hint Overlay at bottom of canvas */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none text-center z-10 w-full px-4">
            <span className="text-[10px] tracking-widest uppercase font-mono text-[#A89F95] bg-black/60 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
              Drag horizontally or vertically • Scroll page freely
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Tasting Note Selector & Stable Glassmorphic Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Note Selection: Single-row equal-width 3-column pill bar */}
          <div>
            <span className="text-[11px] uppercase font-mono text-[#D98A3C] tracking-[0.2em] font-semibold block mb-3">
              SELECT AROMA & TASTING PROFILE
            </span>
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#15110E] border border-white/[0.08]">
              {TASTING_NOTES.map((note, idx) => {
                const isActive = activeNoteIndex === idx;
                return (
                  <button
                    key={note.id}
                    onClick={() => setActiveNoteIndex(idx)}
                    className={`relative py-3 px-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer text-center z-10 ${
                      isActive ? 'text-[#0E0B09]' : 'text-[#A89F95] hover:text-[#F5EFE6]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePillTab"
                        className="absolute inset-0 bg-[#D98A3C] rounded-xl amber-glow -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="truncate block font-mono text-[11px] sm:text-xs">
                      {note.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fixed min-height Glassmorphic Card (Zero-Jump Crossfade) */}
          <div className="flex-1 min-h-[350px] relative rounded-3xl bg-[#15110E] border border-white/[0.08] p-7 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl group hover:border-[#D98A3C]/30 transition-colors duration-500">
            {/* Ambient amber corner glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D98A3C]/10 rounded-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeNote.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#D98A3C] font-semibold">
                      Tasting Layer 0{activeNoteIndex + 1}
                    </span>
                    <span className="text-[11px] font-mono tracking-wider text-black bg-[#D98A3C] px-2.5 py-0.5 rounded-full font-bold">
                      {activeNote.intensity}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif text-[#F5EFE6] font-normal mb-1">
                    {activeNote.label}
                  </h3>
                  <p className="text-xs italic text-[#D98A3C] mb-4 font-serif">
                    "{activeNote.tagline}"
                  </p>

                  <div className="w-full h-[1px] bg-white/[0.08] mb-4" />

                  {/* Flavor notes breakdown */}
                  <div className="space-y-4 text-xs font-sans">
                    <div>
                      <span className="text-[#A89F95] uppercase tracking-widest text-[10px] block mb-1">
                        Aromatic Compound & Palate
                      </span>
                      <p className="text-[#F5EFE6]/90 leading-relaxed font-light text-sm">
                        {activeNote.notes}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                        <span className="text-[#D98A3C] text-[10px] uppercase font-mono block">Terroir Origin</span>
                        <span className="text-[#F5EFE6] font-medium text-xs truncate block">{activeNote.origin}</span>
                      </div>
                      <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                        <span className="text-[#D98A3C] text-[10px] uppercase font-mono block">Roast Method</span>
                        <span className="text-[#F5EFE6] font-medium text-xs truncate block">{activeNote.roastProfile}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card CTA Action Buttons */}
                <div className="mt-6 flex items-center space-x-3">
                  <button
                    onClick={triggerOrderFeedback}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#D98A3C] text-[#0E0B09] font-bold text-xs uppercase tracking-widest hover:bg-[#e49b52] transition-all amber-glow cursor-pointer text-center flex items-center justify-center space-x-2"
                  >
                    {orderSaved ? (
                      <>
                        <Check className="w-4 h-4 text-[#0E0B09]" />
                        <span>Allocated to Cart</span>
                      </>
                    ) : (
                      <span>Acquire Vintage Bag — $48</span>
                    )}
                  </button>
                  <button
                    onClick={triggerOrderFeedback}
                    className="p-3.5 rounded-full border border-white/15 text-[#F5EFE6] hover:border-[#D98A3C] hover:text-[#D98A3C] transition-colors cursor-pointer"
                    title="Reserve Tasting Session"
                  >
                    <Coffee className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Guarantee Badges */}
          <div className="flex items-center justify-between text-xs text-[#A89F95] px-2">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#D98A3C]" />
              <span>Direct Trade Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-[#D98A3C]" />
              <span>Q-Grader Score 91.5</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

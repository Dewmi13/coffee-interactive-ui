# NOIR ROAST — Interactive 3D & Canvas Coffee Experience

> Designed and engineered by Motiq Labs.

NOIR ROAST is a dark-luxury digital coffee showcase. Built with high-performance scroll choreography, hardware-accelerated canvas frame rendering, and interactive Three.js 3D WebGL inspection.

---

## Key Features

- **Interactive Canvas & Video Scrubbing Engine**: 60 FPS hardware-accelerated scroll playback across 180 high-fidelity frames with adaptive DPR scaling.
- **Interactive 3D WebGL Studio**: Real-time coffee cup model with OrbitControls, custom studio lighting, ambient reflections, and animated camera viewpoints linked to tasting profiles.
- **Scroll-Aware Frosted Navigation**: Dynamic backdrop transition ensuring readability across bright roasting particle sequences.
- **Modern Dark-Luxury Bento Grid**: Asymmetric layout highlighting high-altitude terroir data, extraction telemetry, sensory intensity matrices, and live allocation scarcity tracking.
- **Responsive Viewport Architecture**: Engineered for smooth presentation across mobile screens, tablet displays, and desktop viewports.

---

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Icons**: Lucide React
- **Micro-Interactions**: Canvas Confetti

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dewmi13/coffee-interactive-ui.git
   cd coffee-interactive-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## Project Structure

```text
coffee-interactive-ui/
├── public/
│   ├── frames/             # 180 optimized webp scroll sequence frames
│   └── models/             # 3D GLTF/GLB models
├── src/
│   ├── components/
│   │   ├── BentoCraft.jsx      # Asymmetric craft bento grid
│   │   ├── BentoCtaBanner.jsx  # Private Cellar allocation card
│   │   ├── Footer.jsx          # Multi-column editorial footer
│   │   ├── HeroCanvas.jsx      # Scroll-driven canvas engine & navbar
│   │   ├── InfiniteMarquee.jsx # Seamless technical ticker band
│   │   └── ModelShowcase.jsx   # Three.js 3D model canvas & tasting selector
│   ├── App.jsx             # Main layout orchestrator
│   ├── index.css           # Tailwind CSS imports & theme styles
│   └── main.jsx            # Application root
├── index.html              # HTML shell & typography imports
├── package.json
└── vite.config.js
```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Credits

Interactive 3D Experience designed and engineered by **Motiq Labs**.

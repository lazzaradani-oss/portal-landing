"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Corridor from "./portfolio/page";

function WormholeIntro({ onComplete }: { onComplete: () => void }) {
  // Failsafe in case animation callbacks don't fire (tab throttling, etc.)
  useEffect(() => {
    const id = setTimeout(() => onComplete(), 3600);
    return () => clearTimeout(id);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.6, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      {/* Swirling tunnel */}
      <motion.div
        className="relative rounded-full"
        style={{ width: "180vmax", height: "180vmax", filter: "blur(2px)" }}
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: 720, scale: 0.05 }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage:
              "conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.95), rgba(0,0,0,0.95) 12.5%, rgba(255,255,255,0.95) 25%, rgba(0,0,0,0.95) 37.5%, rgba(255,255,255,0.95) 50%, rgba(0,0,0,0.95) 62.5%, rgba(255,255,255,0.95) 75%, rgba(0,0,0,0.95) 87.5%, rgba(255,255,255,0.95) 100%)",
            boxShadow:
              "inset 0 0 120px rgba(0,0,0,0.8), 0 0 60px rgba(255,255,255,0.15)",
          }}
        />

        {/* Aperture ring to sell depth */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "62vmin",
            height: "62vmin",
            background:
              "radial-gradient(circle, rgba(0,0,0,0) 40%, rgba(255,255,255,0.55) 46%, rgba(0,0,0,1) 62%)",
            filter: "blur(1.5px)",
            boxShadow: "0 0 80px rgba(255,255,255,0.08)",
          }}
        />
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute bottom-6 right-6 px-3 py-1.5 rounded-md border border-white/25 bg-black/50 text-white/90 text-xs hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
        title="Skip intro"
      >
        Skip
      </button>

      {/* Subtle hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-white/70 font-mono">
        Entering…
      </div>
    </motion.div>
  );
}

export default function Page() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* Render corridor underneath so it’s ready when the intro fades */}
      <Corridor />

      {showIntro && <WormholeIntro onComplete={() => setShowIntro(false)} />}
    </>
  );
}

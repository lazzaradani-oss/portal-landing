"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  const [showHero, setShowHero] = useState(true);

  // Subtle parallax for hero elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);
  const px = useSpring(useTransform(mouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1920], [-6, 6]), { stiffness: 40, damping: 15 });
  const py = useSpring(useTransform(mouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1080], [-4, 4]), { stiffness: 40, damping: 15 });

  return (
    <>
      {/* Render corridor underneath so it’s ready when the intro fades */}
      <Corridor />

      {showIntro && <WormholeIntro onComplete={() => setShowIntro(false)} />}

      {/* Junji Ito–inspired hero overlay */}
      {!showIntro && showHero && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center text-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Soft spotlight glow behind text */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.0) 45%, rgba(0,0,0,0.8) 100%)",
              mixBlendMode: "screen",
              x: px,
              y: py,
            }}
          />

          {/* Name */}
          <motion.h1
            className="relative font-serif tracking-tight text-white select-none px-4"
            style={{
              x: px,
              y: py,
              textShadow: "0 0 6px rgba(255,255,255,0.2)",
              WebkitTextStroke: "0.5px rgba(0,0,0,0.9)",
              filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.8))",
            }}
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.01, 1],
              rotate: [0, 0.1, 0, -0.1, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold">
              Danielle Lazzara
            </span>

            {/* Whisper-thin ink outline via layered ghost text */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 text-transparent"
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.35)",
                filter: "blur(0.4px)",
              }}
            >
              Danielle Lazzara
            </span>

            {/* Grain overlay */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -inset-y-6 opacity-20"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3Csvg viewBox=\'0 0 120 120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E')",
                mixBlendMode: "overlay",
              }}
            />
          </motion.h1>

          {/* Button - positioned lower for balance */}
          <motion.div className="mt-10 sm:mt-12 md:mt-16 pointer-events-auto">
            <motion.button
              aria-label="Enter My Portfolio"
              onClick={() => setShowHero(false)}
              className="relative px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-black/80 border border-white/70 text-white uppercase tracking-wide text-xs sm:text-sm md:text-base rounded-[6px] focus:outline-none focus:ring-2 focus:ring-white/40"
              initial={false}
              whileHover={{ skewX: [-1, 1, 0], scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Pulsating border glow */}
              <motion.span
                aria-hidden
                className="absolute -inset-0.5 rounded-[7px]"
                style={{ boxShadow: "0 0 0px rgba(255,255,255,0.0)" }}
                animate={{ boxShadow: [
                  "0 0 0px rgba(255,255,255,0.0)",
                  "0 0 18px rgba(255,255,255,0.35)",
                  "0 0 0px rgba(255,255,255,0.0)",
                ] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative z-10">Enter My Portfolio</span>
              {/* Ink ripple on hover - subtle mask using gradient */}
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-[6px]"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                style={{
                  background:
                    "radial-gradient(120px 60px at 30% 50%, rgba(255,255,255,0.35), transparent 60%), radial-gradient(90px 40px at 70% 50%, rgba(255,255,255,0.25), transparent 60%)",
                  mixBlendMode: "screen",
                }}
              />
            </motion.button>
          </motion.div>

          {/* Fade-out when entering */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      )}
    </>
  );
}

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AboutPage() {
  const router = useRouter();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const w = typeof window !== "undefined" ? window.innerWidth : 1920;
  const h = typeof window !== "undefined" ? window.innerHeight : 1080;
  const x = useSpring(useTransform(mx, [0, w], [-6, 6]), { stiffness: 40, damping: 15 });
  const y = useSpring(useTransform(my, [0, h], [-4, 4]), { stiffness: 40, damping: 15 });

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Manga grain overlay */}
      <div className="manga-grain fixed inset-0 pointer-events-none z-50" aria-hidden />
      
      {/* Dark vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      <section className="relative max-w-4xl mx-auto px-6 py-16 sm:py-24 z-20">
        {/* Back button */}
        <motion.button
          onClick={() => router.push("/")}
          className="mb-8 px-4 py-2 rounded-md border border-white/20 bg-black/60 text-white/80 text-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ← Back to Hall
        </motion.button>

        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-serif scratchy-text text-center mb-12"
          style={{ x, y }}
          animate={{ scale: [1, 1.008, 1], rotate: [0, 0.15, 0, -0.15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          About Me
        </motion.h1>

        {/* Content panels */}
        <div className="space-y-8">
          <motion.div
            className="p-8 rounded-lg manga-border bg-black/70 backdrop-blur-sm ink-bleed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="text-2xl font-serif mb-4 text-white/95">Who I Am</h2>
            <p className="leading-relaxed text-white/85 text-base">
              A creator navigating the liminal spaces between design, code, and narrative. 
              I build digital experiences that feel like walking through a manga panel—quiet, 
              unsettling, and intentional. Each project is a corridor of carefully crafted moments.
            </p>
          </motion.div>

          <motion.div
            className="p-8 rounded-lg manga-border bg-black/70 backdrop-blur-sm ink-bleed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <h2 className="text-2xl font-serif mb-4 text-white/95">My Approach</h2>
            <p className="leading-relaxed text-white/85 text-base mb-4">
              Every line, every shadow, every micro-animation serves a purpose. I'm drawn to:
            </p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start">
                <span className="mr-3 text-white/60">—</span>
                <span>Surreal horror aesthetics in web design</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-white/60">—</span>
                <span>Minimalist interactions with psychological depth</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-white/60">—</span>
                <span>Handcrafted animations that breathe and tremble</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-white/60">—</span>
                <span>Black-and-white contrast as narrative language</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="p-8 rounded-lg manga-border bg-black/70 backdrop-blur-sm ink-bleed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h2 className="text-2xl font-serif mb-4 text-white/95">Philosophy</h2>
            <p className="leading-relaxed text-white/85 text-base italic">
              "The most powerful moments are the quiet ones—the blink of an eye, 
              the shift in shadow, the slow realization that something is watching. 
              Design should feel like that: subtle, haunting, unforgettable."
            </p>
          </motion.div>
        </div>

        {/* Floating ink accent */}
        <motion.div
          className="fixed bottom-12 right-12 w-32 h-32 pointer-events-none opacity-10"
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.03, 1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" fill="white">
            <circle cx="50" cy="50" r="30" opacity="0.6" />
            <circle cx="35" cy="40" r="8" opacity="0.8" />
            <circle cx="65" cy="55" r="6" opacity="0.7" />
          </svg>
        </motion.div>
      </section>
    </main>
  );
}

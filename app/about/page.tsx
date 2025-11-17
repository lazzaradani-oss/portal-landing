"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function AboutPage() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", (e) => { mx.set(e.clientX); my.set(e.clientY); });
  }
  const w = typeof window !== "undefined" ? window.innerWidth : 1920;
  const h = typeof window !== "undefined" ? window.innerHeight : 1080;
  const x = useSpring(useTransform(mx, [0, w], [-6, 6]), { stiffness: 40, damping: 15 });
  const y = useSpring(useTransform(my, [0, h], [-4, 4]), { stiffness: 40, damping: 15 });

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="manga-grain absolute inset-0" aria-hidden />

      <section className="relative max-w-3xl mx-auto px-6 py-24">
        <motion.h1
          className="text-4xl sm:text-5xl font-serif scratchy-text text-center"
          style={{ x, y }}
          animate={{ scale: [1, 1.01, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          About Me
        </motion.h1>

        <motion.div
          className="mt-10 p-6 rounded-lg manga-border bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="leading-relaxed text-white/90">
            A quiet corridor of thoughts, etched in ink. This page holds a brief about section styled in the same Junji Ito–inspired language as the portal.
          </p>
        </motion.div>
      </section>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";

export default function UpcomingPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="manga-grain absolute inset-0" aria-hidden />
      <section className="relative max-w-3xl mx-auto px-6 py-24">
        <motion.h1
          className="text-4xl sm:text-5xl font-serif scratchy-text text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Upcoming
        </motion.h1>

        <motion.div
          className="mt-10 p-6 rounded-lg manga-border bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/90 leading-relaxed">
            Upcoming works and exhibitions will appear here—maintaining the same quiet, eerie tone of the corridor.
          </p>
        </motion.div>
      </section>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();

  const projects = [
    {
      title: "The Spiral Archive",
      description: "An interactive data visualization exploring recursive patterns in human behavior. Built with React, D3.js, and obsessive attention to detail.",
      year: "2024",
      tags: ["Data Viz", "React", "D3.js"]
    },
    {
      title: "Liminal Spaces",
      description: "A generative art project creating endless corridors and empty rooms. Each visit generates a unique psychological landscape.",
      year: "2024",
      tags: ["Generative Art", "WebGL", "GLSL"]
    },
    {
      title: "Whisper Protocol",
      description: "An encrypted messaging platform with disappearing messages and ink-like interface transitions. Privacy through ephemerality.",
      year: "2023",
      tags: ["Full-Stack", "Encryption", "Node.js"]
    },
    {
      title: "Eye Contact",
      description: "A browser extension that tracks how long you stare at the screen. The screen stares back. Uncomfortable truths about screen time.",
      year: "2023",
      tags: ["Browser Extension", "Computer Vision", "Ethics"]
    }
  ];

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

      <section className="relative max-w-5xl mx-auto px-6 py-16 sm:py-24 z-20">
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
          className="text-5xl sm:text-6xl md:text-7xl font-serif scratchy-text text-center mb-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Projects
        </motion.h1>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="p-7 rounded-lg manga-border bg-black/70 backdrop-blur-sm hover:bg-black/80 transition-colors cursor-pointer group"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ scale: 1.01, boxShadow: "0 0 25px rgba(255,255,255,0.1)" }}
            >
              {/* Year badge */}
              <div className="text-xs text-white/50 mb-3 font-mono">{project.year}</div>
              
              {/* Title */}
              <h3 className="font-serif text-2xl scratchy-text mb-3 group-hover:text-white/95 transition-colors">
                {project.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-white/75 leading-relaxed mb-4">
                {project.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 text-xs border border-white/15 rounded bg-black/40 text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover indicator */}
              <motion.div
                className="mt-4 text-xs text-white/40 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -3 }}
                whileHover={{ x: 0 }}
              >
                → View details
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-white/40 text-sm mt-16 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Each project is a door. Some lead deeper than others.
        </motion.p>
      </section>
    </main>
  );
}

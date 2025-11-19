"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function UpcomingPage() {
  const router = useRouter();

  const upcoming = [
    {
      title: "The Infinite Gallery",
      description: "An AI-generated art exhibition that never ends. Each room leads to another, each painting watches you back.",
      status: "In Development",
      timeline: "Q1 2025"
    },
    {
      title: "Echoes",
      description: "A voice-based social platform where messages degrade over time like memories. What remains after the echo fades?",
      status: "Concept Phase",
      timeline: "Q2 2025"
    },
    {
      title: "Dark Patterns Library",
      description: "Documenting manipulative UX patterns found in the wild. An archive of digital deception, reimagined as art.",
      status: "Research",
      timeline: "Q3 2025"
    }
  ];

  const goals = [
    "Master Three.js and GLSL shaders for more immersive 3D experiences",
    "Contribute to open-source projects exploring ethical AI in design",
    "Launch a monthly series exploring horror manga aesthetics in web design",
    "Collaborate with indie game developers on narrative-driven interfaces",
    "Exhibit digital art in physical spaces—bridging screen and gallery"
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
          className="text-5xl sm:text-6xl md:text-7xl font-serif scratchy-text text-center mb-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Upcoming
        </motion.h1>

        {/* Upcoming Projects */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif text-white/90 mb-6 scratchy-text">Projects in Progress</h2>
          <div className="space-y-6">
            {upcoming.map((project, i) => (
              <motion.div
                key={i}
                className="p-7 rounded-lg manga-border bg-black/70 backdrop-blur-sm ink-bleed"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <h3 className="font-serif text-2xl text-white/95 scratchy-text">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 border border-white/20 rounded bg-black/40 text-white/60">
                      {project.status}
                    </span>
                    <span className="px-2 py-1 border border-white/15 rounded bg-black/30 text-white/50">
                      {project.timeline}
                    </span>
                  </div>
                </div>
                <p className="text-white/75 leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Goals Section */}
        <motion.div
          className="p-8 rounded-lg manga-border bg-black/70 backdrop-blur-sm ink-bleed"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h2 className="text-2xl font-serif text-white/90 mb-6 scratchy-text">Goals & Aspirations</h2>
          <ul className="space-y-4">
            {goals.map((goal, i) => (
              <motion.li
                key={i}
                className="flex items-start text-white/80 leading-relaxed"
                initial={{ opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <span className="mr-3 text-white/50 mt-1">—</span>
                <span>{goal}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Closing statement */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-white/50 italic text-sm">
            The corridor continues. New doors appear as old ones close.
          </p>
        </motion.div>

        {/* Breathing ink accent */}
        <motion.div
          className="fixed bottom-16 left-12 w-24 h-24 pointer-events-none opacity-8"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.06, 0.1, 0.06],
            rotate: [0, -3, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" fill="white">
            <path d="M50,20 Q30,40 35,60 Q40,75 50,80 Q60,75 65,60 Q70,40 50,20z" opacity="0.5" />
          </svg>
        </motion.div>
      </section>
    </main>
  );
}

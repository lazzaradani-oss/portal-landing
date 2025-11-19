"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function InspirationsPage() {
  const router = useRouter();

  const inspirations = [
    {
      category: "Visual Artists",
      items: [
        { name: "Junji Ito", note: "Master of horror manga—spirals, body horror, psychological dread" },
        { name: "Zdzisław Beksiński", note: "Dystopian surrealism in paint—haunting architectural nightmares" },
        { name: "Francis Bacon", note: "Distorted figures, raw emotion, visceral portraiture" }
      ]
    },
    {
      category: "Designers & Developers",
      items: [
        { name: "Aristide Benoist", note: "Experimental web interfaces with poetic interactions" },
        { name: "Active Theory", note: "Immersive 3D experiences that blur reality and screen" },
        { name: "Bruno Simon", note: "Creative coding with personality and playfulness" }
      ]
    },
    {
      category: "Concepts & Movements",
      items: [
        { name: "Liminal Spaces", note: "Empty corridors, abandoned malls—spaces between" },
        { name: "Brutalist Design", note: "Raw, minimal, uncompromising—truth in structure" },
        { name: "Analog Horror", note: "VHS aesthetics, found footage, the uncanny mundane" }
      ]
    },
    {
      category: "Literature & Film",
      items: [
        { name: "House of Leaves", note: "A book that disorients—form as narrative" },
        { name: "David Lynch", note: "Dreamlike tension, domestic horror, surreal americana" },
        { name: "The Twilight Zone", note: "Quiet dread in everyday situations" }
      ]
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
          Inspirations
        </motion.h1>

        {/* Introduction */}
        <motion.div
          className="mb-12 p-6 rounded-lg manga-border bg-black/70 backdrop-blur-sm text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-white/80 leading-relaxed italic">
            These are the corridors I walk through. The eyes that watch me. 
            The shadows that inform every pixel, every line, every trembling animation.
          </p>
        </motion.div>

        {/* Inspiration categories */}
        <div className="space-y-10">
          {inspirations.map((section, sectionIdx) => (
            <motion.div
              key={sectionIdx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: sectionIdx * 0.1 }}
            >
              <h2 className="text-2xl font-serif text-white/90 mb-5 scratchy-text">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    className="p-5 rounded-lg manga-border bg-black/60 backdrop-blur-sm hover:bg-black/70 transition-colors"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sectionIdx * 0.1 + itemIdx * 0.05 }}
                    whileHover={{ scale: 1.005, boxShadow: "0 0 20px rgba(255,255,255,0.08)" }}
                  >
                    <h3 className="font-serif text-lg text-white/95 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-white/65 leading-relaxed">
                      {item.note}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing quote */}
        <motion.div
          className="mt-16 p-8 rounded-lg manga-border bg-black/70 backdrop-blur-sm ink-bleed text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white/75 italic leading-relaxed">
            "We are all haunted by the things we consume. I choose my ghosts carefully."
          </p>
        </motion.div>
      </section>
    </main>
  );
}

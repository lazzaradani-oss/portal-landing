"use client";

import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="manga-grain absolute inset-0" aria-hidden />
      <section className="relative max-w-4xl mx-auto px-6 py-24">
        <motion.h1
          className="text-4xl sm:text-5xl font-serif scratchy-text text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {[1,2,3,4].map((i) => (
            <motion.div
              key={i}
              className="p-5 rounded-lg manga-border bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h3 className="font-serif text-xl scratchy-text">Project {i}</h3>
              <p className="mt-2 text-sm text-white/85">Placeholder entry demonstrating the Junji Ito panel style for projects.</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

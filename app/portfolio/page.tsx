
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Noise overlay for surreal Junji Ito atmosphere
function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.18]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        mixBlendMode: "overlay",
      }}
    />
  );
}

// Portfolio section card component
interface PortfolioCardProps {
  title: string;
  description: string;
  route: string;
  index: number;
}

function PortfolioCard({ title, description, route, index }: PortfolioCardProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative p-8 rounded-lg manga-border bg-black/70 backdrop-blur-sm cursor-pointer group overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => router.push(route)}
      whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255,255,255,0.15)" }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background ink splatter on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03), transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl font-serif scratchy-text mb-4"
          animate={hovered ? { x: [0, 2, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h2>

        <p className="text-white/75 leading-relaxed mb-6 text-base">
          {description}
        </p>

        <motion.div
          className="flex items-center text-sm text-white/60 group-hover:text-white/90 transition-colors"
          animate={hovered ? { x: [0, 4, 0] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <span>Enter →</span>
        </motion.div>
      </div>

      {/* Breathing border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={hovered ? {
          boxShadow: [
            "0 0 0px rgba(255,255,255,0)",
            "0 0 20px rgba(255,255,255,0.2)",
            "0 0 0px rgba(255,255,255,0)"
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

export default function PortfolioHub() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  // Set window size on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax based on mouse
  const parallaxX = useTransform(mouseX, [0, windowSize.width], [-5, 5]);
  const parallaxY = useTransform(mouseY, [0, windowSize.height], [-3, 3]);

  // Placeholder mode: Coming Soon message instead of interactive sections

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black">
      {/* Noise overlay */}
      <NoiseOverlay />

      {/* Fog vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-30"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Grain animated background */}
      <div className="fixed inset-0 z-0 manga-grain" />

      {/* Floating ink accent */}
      <motion.div
        className="fixed top-20 right-[10%] w-32 h-32 rounded-full pointer-events-none z-10 opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 65%)",
          filter: "blur(30px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content container */}
      <motion.div
        className="relative z-20 container mx-auto px-6 py-16 sm:py-24"
        style={{
          x: parallaxX,
          y: parallaxY,
        }}
      >
        {/* Header */}
        <motion.header
          className="mb-16 sm:mb-20 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl sm:text-7xl font-serif mb-6 scratchy-text"
            animate={{
              textShadow: [
                "0 0 20px rgba(255,255,255,0.3)",
                "0 0 30px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.3)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Portfolio
          </motion.h1>
          
          <motion.p
            className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Navigate through the corridors of creativity. Each section reveals a different facet of the work and mind behind it.
          </motion.p>
        </motion.header>

        {/* Coming Soon Placeholder */}
        <motion.div
          className="mx-auto mb-20 max-w-3xl text-center p-10 rounded-lg manga-border bg-black/70 backdrop-blur-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className="absolute inset-0 opacity-0"
            animate={{
              opacity: [0, 0.12, 0],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent 70%)",
            }}
          />
          <motion.h2
            className="text-4xl sm:text-5xl font-serif scratchy-text mb-6"
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            Coming Soon
          </motion.h2>
          <motion.p
            className="text-white/70 leading-relaxed text-lg max-w-xl mx-auto"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 7, repeat: Infinity }}
          >
            The interactive portfolio hub is incubating in the void. Soon you'll traverse projects, inspirations, and unfolding works. For now, the corridor echoes with possibility.
          </motion.p>
          <motion.div
            className="mt-8 inline-flex items-center gap-2 text-sm text-white/60"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span>Materializing assets…</span>
            <span className="text-[10px] tracking-widest">██░░░░░</span>
          </motion.div>
        </motion.div>

        {/* Back to home link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm scratchy-text"
          >
            ← Return to Portal
          </a>
        </motion.div>
      </motion.div>

      {/* Floating decorative element */}
      <motion.div
        className="fixed bottom-[15%] left-[8%] pointer-events-none z-10"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-12 h-16 opacity-20"
          style={{
            clipPath: "polygon(50% 0%, 80% 30%, 60% 100%, 40% 100%, 20% 30%)",
            background: "linear-gradient(180deg, #eee, #111)",
            boxShadow: "0 0 15px rgba(255,255,255,0.1)",
          }}
        />
      </motion.div>
    </main>
  );
}

